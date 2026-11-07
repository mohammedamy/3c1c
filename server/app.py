"""
FastAPI hybrid server for 3c1c — ClipSAT Mathematical Animation Engine & Web Studio.

Serves the static web studio (`index.html` & `web/`) and exposes endpoints to
inspect `manimlib` ClipSAT configuration, discover Python `ClipSATScene` classes,
validate custom Python scene scripts, and render downloadable H.264 MP4 clips.
"""
from __future__ import annotations

import argparse
import ast
import shutil
import subprocess
import sys
import uuid
from pathlib import Path
from typing import Any

import yaml
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from server.headless_renderer import render_mp4_headless

ROOT_DIR = Path(__file__).resolve().parent.parent
WEB_DIR = ROOT_DIR / "web"
RENDERS_DIR = ROOT_DIR / "videos" / "web_renders"
RENDERS_DIR.mkdir(parents=True, exist_ok=True)


def _load_default_config() -> dict[str, Any]:
    cfg_path = ROOT_DIR / "manimlib" / "default_config.yml"
    if cfg_path.exists():
        with cfg_path.open("r", encoding="utf-8") as fh:
            return yaml.safe_load(fh) or {}
    return {}


def _detect_gpu_wgpu() -> bool:
    vulkan_icds = list(Path("/usr/share/vulkan/icd.d").glob("*.json"))
    if not vulkan_icds and sys.platform.startswith("linux"):
        return False
    try:
        import wgpu  # noqa: F401
        return True
    except Exception:
        return False


def _discover_scenes_in_file(py_path: Path) -> list[dict[str, Any]]:
    if not py_path.exists():
        return []
    source = py_path.read_text(encoding="utf-8")
    tree = ast.parse(source, filename=str(py_path))
    lines = source.splitlines()
    scenes: list[dict[str, Any]] = []

    scene_bases = {
        "Scene",
        "ClipSATScene",
        "InteractiveScene",
        "ThreeDScene",
        "GraphScene",
    }

    for node in tree.body:
        if isinstance(node, ast.ClassDef):
            bases = [ast.unparse(b) for b in node.bases]
            if any(b.split(".")[-1] in scene_bases for b in bases):
                start = node.lineno - 1
                end = getattr(node, "end_lineno", node.lineno + 20)
                snippet = "\n".join(lines[start:end])
                track = "ClipSAT Mathematics"
                for stmt in node.body:
                    if isinstance(stmt, ast.Assign):
                        for target in stmt.targets:
                            if isinstance(target, ast.Name) and target.id == "clipsat_track":
                                if isinstance(stmt.value, ast.Constant) and isinstance(stmt.value.value, str):
                                    track = stmt.value.value
                scenes.append(
                    {
                        "name": node.name,
                        "file": py_path.name,
                        "bases": bases,
                        "docstring": ast.get_docstring(node) or "",
                        "track": track,
                        "lineno": node.lineno,
                        "code": snippet,
                    }
                )
    return scenes


class ValidateRequest(BaseModel):
    code: str = Field(..., max_length=60000)


class RenderRequest(BaseModel):
    preset_id: str = Field(default="derivative")
    scene_name: str = Field(default="DerivativeTangentScene")
    theme: str = Field(default="dark", pattern="^(dark|paper)$")
    aspect: str = Field(default="16:9", pattern="^(16:9|9:16|1:1)$")
    watermark: bool = Field(default=True)
    duration: float = Field(default=4.0, ge=1.5, le=12.0)
    fps: int = Field(default=30, ge=15, le=60)
    params: dict[str, Any] = Field(default_factory=dict)


app = FastAPI(
    title="3c1c · ClipSAT Animation Studio API",
    version="1.8.0",
    description="Hybrid Python + Browser studio API for ClipSAT's customized Manim engine (3c1c).",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/api/health")
def api_health() -> dict[str, Any]:
    cfg = _load_default_config()
    colors = cfg.get("colors", {})
    clipsat_colors = {k: v for k, v in colors.items() if k.startswith("clipsat_")}
    return {
        "status": "ok",
        "engine": "3c1c",
        "version": "1.8.0",
        "ffmpeg": bool(shutil.which("ffmpeg")),
        "pdflatex": bool(shutil.which("pdflatex")),
        "wgpu_gpu_available": _detect_gpu_wgpu(),
        "mp4_ready": bool(shutil.which("ffmpeg")),
        "clipsat": cfg.get("clipsat", {}),
        "palette": clipsat_colors,
    }


@app.get("/api/scenes")
def api_scenes() -> dict[str, Any]:
    clipsat = _discover_scenes_in_file(ROOT_DIR / "clipsat_scenes.py")
    examples = _discover_scenes_in_file(ROOT_DIR / "example_scenes.py")[:8]
    return {
        "clipsat_scenes": clipsat,
        "upstream_examples": examples,
    }


@app.post("/api/validate")
def api_validate(req: ValidateRequest) -> dict[str, Any]:
    try:
        tree = ast.parse(req.code)
    except SyntaxError as exc:
        return {
            "valid": False,
            "error": f"Line {exc.lineno}: {exc.msg}",
            "lineno": exc.lineno,
            "scenes": [],
        }

    found_scenes: list[str] = []
    for node in tree.body:
        if isinstance(node, ast.ClassDef) and node.bases:
            found_scenes.append(node.name)
    return {
        "valid": True,
        "error": None,
        "scenes": found_scenes,
    }


@app.post("/api/render")
def api_render(req: RenderRequest) -> dict[str, Any]:
    job_id = uuid.uuid4().hex[:10]
    out_file = RENDERS_DIR / f"3c1c_{req.preset_id}_{job_id}.mp4"
    renderer_used = "3c1c-headless-ffmpeg"

    # Attempt native wgpu manimlib render when GPU adapter is present and scene is in clipsat_scenes.py
    known_scenes = {s["name"] for s in _discover_scenes_in_file(ROOT_DIR / "clipsat_scenes.py")}
    if _detect_gpu_wgpu() and req.scene_name in known_scenes:
        cmd = [
            sys.executable,
            "-m",
            "manimlib",
            str(ROOT_DIR / "clipsat_scenes.py"),
            req.scene_name,
            "-w",
            "-q",
            "--video_dir",
            str(RENDERS_DIR),
            "--file_name",
            out_file.stem,
        ]
        if req.theme == "paper":
            cmd.append("--paper")
        if req.aspect == "9:16":
            cmd.append("--short")
        elif req.aspect == "1:1":
            cmd.append("--square")
        else:
            cmd.append("-m")
        env = dict(**__import__("os").environ, MANIM_PARSE_CLI="1")
        res = subprocess.run(cmd, cwd=str(ROOT_DIR), env=env, capture_output=True, text=True, timeout=60)
        if res.returncode == 0 and out_file.exists():
            renderer_used = "manimlib-wgpu"

    if not out_file.exists():
        try:
            render_mp4_headless(
                output_path=out_file,
                preset_id=req.preset_id,
                theme_mode=req.theme,
                aspect=req.aspect,
                watermark=req.watermark,
                params=req.params,
                duration=req.duration,
                fps=req.fps,
            )
        except Exception as exc:
            raise HTTPException(status_code=500, detail=str(exc)) from exc

    return {
        "status": "rendered",
        "job_id": job_id,
        "renderer": renderer_used,
        "filename": out_file.name,
        "size_bytes": out_file.stat().st_size,
        "download_url": f"/renders/{out_file.name}",
    }


app.mount("/renders", StaticFiles(directory=str(RENDERS_DIR)), name="renders")
if WEB_DIR.exists():
    app.mount("/web", StaticFiles(directory=str(WEB_DIR)), name="web")


@app.get("/")
def serve_index() -> FileResponse:
    index_path = ROOT_DIR / "index.html"
    if not index_path.exists():
        raise HTTPException(status_code=404, detail="index.html not found")
    return FileResponse(index_path)


def run_cli() -> None:
    import uvicorn

    parser = argparse.ArgumentParser(description="Launch 3c1c ClipSAT Animation Web Studio")
    parser.add_argument("--host", default="127.0.0.1", help="Bind host (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=8000, help="Bind port (default: 8000)")
    parser.add_argument("--reload", action="store_true", help="Enable auto-reload")
    args = parser.parse_args()
    uvicorn.run("server.app:app", host=args.host, port=args.port, reload=args.reload)


if __name__ == "__main__":
    run_cli()
