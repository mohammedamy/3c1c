"""
Headless CPU H.264 MP4 renderer for 3c1c ClipSAT scenes.

When a Vulkan/WebGPU adapter is unavailable (e.g. headless Linux servers, CI,
or CPU cloud instances), this renderer synthesizes anti-aliased frames using
NumPy + Pillow with ClipSAT design tokens and pipes them directly into FFmpeg
(libx264, yuv420p) to produce genuine downloadable MP4 clips.
"""
from __future__ import annotations

import math
import shutil
import subprocess
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image, ImageDraw, ImageFont

THEMES: dict[str, dict[str, tuple[int, int, int]]] = {
    "dark": {
        "bg": (10, 13, 20),          # #0A0D14
        "panel": (20, 26, 40),       # #141A28
        "grid": (28, 36, 54),        # #1C2436
        "axis": (130, 146, 170),     # #8292AA
        "ink": (238, 242, 246),      # #EEF2F6
        "muted": (148, 163, 184),    # #94A3B8
        "indigo": (125, 164, 232),   # #7DA4E8
        "amber": (245, 158, 11),     # #F59E0B
        "teal": (45, 212, 191),      # #2DD4BF
        "rose": (217, 70, 86),       # #D94656
    },
    "paper": {
        "bg": (250, 247, 242),       # #FAF7F2
        "panel": (242, 236, 225),    # #F2ECE1
        "grid": (223, 215, 203),     # #DFD7CB
        "axis": (75, 86, 104),       # #4B5668
        "ink": (17, 22, 34),         # #111622
        "muted": (75, 86, 104),      # #4B5668
        "indigo": (19, 39, 70),      # #132746
        "amber": (158, 101, 21),     # #9E6515
        "teal": (12, 122, 111),      # #0C7A6F
        "rose": (217, 70, 86),       # #D94656
    },
}


def _smoothstep(t: float) -> float:
    x = max(0.0, min(1.0, t))
    return x * x * (3.0 - 2.0 * x)


def _load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        ]
        if bold
        else [
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
        ]
    )
    for path in candidates:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size=size)
            except Exception:
                continue
    return ImageFont.load_default()


def _eval_fn(fn_id: str, x: float) -> float:
    if fn_id == "cubic":
        return (x**3) / 3.0 - x
    if fn_id == "sine":
        return 2.0 * math.sin(x)
    if fn_id == "exp":
        return math.exp(0.55 * x) - 1.0
    return x * x - 2.0


def _eval_deriv(fn_id: str, x: float) -> float:
    if fn_id == "cubic":
        return x * x - 1.0
    if fn_id == "sine":
        return 2.0 * math.cos(x)
    if fn_id == "exp":
        return 0.55 * math.exp(0.55 * x)
    return 2.0 * x


def render_mp4_headless(
    output_path: Path,
    preset_id: str = "derivative",
    theme_mode: str = "dark",
    aspect: str = "16:9",
    watermark: bool = True,
    params: dict[str, Any] | None = None,
    duration: float = 4.0,
    fps: int = 30,
) -> Path:
    """Render an H.264 MP4 video clip using Pillow + FFmpeg."""
    ffmpeg_bin = shutil.which("ffmpeg")
    if not ffmpeg_bin:
        raise RuntimeError("ffmpeg binary not found on PATH")

    params = params or {}
    palette = THEMES.get(theme_mode, THEMES["dark"])

    if aspect == "9:16":
        width, height = 720, 1280
    elif aspect == "1:1":
        width, height = 960, 960
    else:
        width, height = 1280, 720

    total_frames = max(24, int(round(duration * fps)))
    output_path.parent.mkdir(parents=True, exist_ok=True)

    font_track = _load_font(max(15, width // 68), bold=True)
    font_title = _load_font(max(24, width // 38), bold=True)
    font_formula = _load_font(max(20, width // 46), bold=False)
    font_small = _load_font(max(14, width // 74), bold=False)

    track_label = str(params.get("track", "CLIPSAT · 3C1C STUDIO")).upper()
    title_label = str(params.get("title", _default_title(preset_id)))
    fn_id = str(params.get("fn", "quad"))

    cmd = [
        ffmpeg_bin,
        "-y",
        "-f",
        "rawvideo",
        "-vcodec",
        "rawvideo",
        "-s",
        f"{width}x{height}",
        "-pix_fmt",
        "rgb24",
        "-r",
        str(fps),
        "-i",
        "-",
        "-an",
        "-vcodec",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "20",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(output_path),
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    assert proc.stdin is not None

    try:
        for idx in range(total_frames):
            progress = idx / max(1, total_frames - 1)
            img = Image.new("RGB", (width, height), palette["bg"])
            draw = ImageDraw.Draw(img, "RGBA")

            pad_x = int(width * 0.07)
            pad_top = int(height * 0.16)
            pad_bot = int(height * 0.11)
            plot_w = width - 2 * pad_x
            plot_h = height - pad_top - pad_bot

            # Subtle coordinate grid
            grid_steps = 8
            for gx in range(grid_steps + 1):
                px = pad_x + int(plot_w * gx / grid_steps)
                draw.line([(px, pad_top), (px, pad_top + plot_h)], fill=palette["grid"], width=1)
            for gy in range(6 + 1):
                py = pad_top + int(plot_h * gy / 6)
                draw.line([(pad_x, py), (pad_x + plot_w, py)], fill=palette["grid"], width=1)

            # Editorial header
            draw.text((pad_x, int(height * 0.045)), track_label, fill=palette["amber"], font=font_track)
            draw.text((pad_x, int(height * 0.078)), title_label, fill=palette["ink"], font=font_title)
            draw.line(
                [(pad_x, int(height * 0.132)), (width - pad_x, int(height * 0.132))],
                fill=palette["grid"],
                width=2,
            )

            if preset_id in ("derivative", "calculus"):
                _draw_derivative_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, fn_id, params, font_formula, font_small
                )
            elif preset_id == "riemann":
                _draw_riemann_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, fn_id, params, font_formula, font_small
                )
            elif preset_id == "square":
                _draw_square_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small
                )
            elif preset_id == "unitcircle":
                _draw_unitcircle_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small
                )
            elif preset_id == "linalg":
                _draw_linalg_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small
                )
            elif preset_id == "qudrat":
                _draw_qudrat_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small
                )
            elif preset_id == "taylor":
                _draw_taylor_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small
                )
            elif preset_id == "normal":
                _draw_normal_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small
                )
            elif preset_id == "circle_thm":
                _draw_circle_thm_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small
                )
            elif preset_id == "complex":
                _draw_complex_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small
                )
            elif preset_id == "grad_descent":
                _draw_grad_descent_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small
                )
            else:
                _draw_derivative_frame(
                    draw, palette, pad_x, pad_top, plot_w, plot_h, progress, fn_id, params, font_formula, font_small
                )

            if watermark:
                wm_text = "ClipSAT · 3c1c  |  clipsat.org"
                wm_y = height - int(height * 0.055)
                wm_x = width - pad_x - 245
                draw.ellipse((wm_x - 26, wm_y + 4, wm_x - 16, wm_y + 14), fill=palette["indigo"])
                draw.ellipse((wm_x - 12, wm_y + 4, wm_x - 2, wm_y + 14), fill=palette["amber"])
                draw.text((wm_x + 4, wm_y), wm_text, fill=palette["muted"], font=font_small)

            proc.stdin.write(img.tobytes())

        proc.stdin.close()
        stderr = proc.stderr.read() if proc.stderr else b""
        ret = proc.wait(timeout=30)
        if ret != 0:
            raise RuntimeError(f"FFmpeg exited with {ret}: {stderr.decode('utf-8', errors='replace')[:400]}")
    finally:
        if proc.poll() is None:
            proc.kill()

    return output_path


def _default_title(preset_id: str) -> str:
    return {
        "derivative": "Secant Converging to Derivative Tangent f'(a)",
        "riemann": "Riemann Sum Convergence & Definite Integral",
        "square": "Completing the Square — Geometric Proof",
        "unitcircle": "Unit Circle & Exact Trigonometric Ratios",
        "linalg": "Linear Transformation & Invariant Eigenvectors",
        "qudrat": "Quantitative Comparison: 2^x vs. x^2 + 2",
        "taylor": "Taylor & Maclaurin Polynomial Approximation",
        "normal": "Normal Distribution & Empirical Z-Score Area",
        "circle_thm": "Inscribed Angle Theorem: ∠AOB = 2∠APB",
        "complex": "De Moivre's Theorem & Roots of Unity",
        "grad_descent": "Gradient Descent Optimization Trajectory",
    }.get(preset_id, "ClipSAT 3c1c Mathematical Animation")


def _make_mapper(pad_x: int, pad_top: int, plot_w: int, plot_h: int, x_min: float, x_max: float, y_min: float, y_max: float):
    def to_px(x: float, y: float) -> tuple[float, float]:
        sx = pad_x + (x - x_min) / (x_max - x_min) * plot_w
        sy = pad_top + (1.0 - (y - y_min) / (y_max - y_min)) * plot_h
        return (sx, sy)

    return to_px


def _draw_axes(draw: ImageDraw.ImageDraw, palette: dict, to_px, x_min: float, x_max: float, y_min: float, y_max: float):
    ox0, oy0 = to_px(x_min, 0.0)
    ox1, oy1 = to_px(x_max, 0.0)
    draw.line([ox0, oy0, ox1, oy1], fill=palette["axis"], width=2)
    vx0, vy0 = to_px(0.0, y_min)
    vx1, vy1 = to_px(0.0, y_max)
    draw.line([vx0, vy0, vx1, vy1], fill=palette["axis"], width=2)


def _draw_derivative_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, fn_id, params, font_formula, font_small):
    x_min, x_max, y_min, y_max = -2.2, 4.0, -3.2, 9.5
    to_px = _make_mapper(pad_x, pad_top, plot_w, plot_h, x_min, x_max, y_min, y_max)
    _draw_axes(draw, palette, to_px, x_min, x_max, y_min, y_max)

    draw_prog = _smoothstep(progress / 0.28)
    samples = max(4, int(180 * draw_prog))
    xs = np.linspace(x_min, x_max, samples)
    pts = [to_px(float(x), _eval_fn(fn_id, float(x))) for x in xs]
    if len(pts) > 1:
        draw.line(pts, fill=palette["indigo"], width=4)

    if progress > 0.22:
        a = float(params.get("a", 1.2))
        h_init = float(params.get("h", 1.5))
        conv = _smoothstep((progress - 0.25) / 0.65)
        h = h_init * (1.0 - 0.98 * conv)
        fa = _eval_fn(fn_id, a)
        fah = _eval_fn(fn_id, a + h)
        slope = (fah - fa) / h if abs(h) > 1e-3 else _eval_deriv(fn_id, a)

        lx0, lx1 = x_min, x_max
        p0 = to_px(lx0, fa + slope * (lx0 - a))
        p1 = to_px(lx1, fa + slope * (lx1 - a))
        line_col = palette["teal"] if abs(h) < 0.08 else palette["amber"]
        draw.line([p0, p1], fill=line_col, width=3)

        pa = to_px(a, fa)
        pah = to_px(a + h, fah)
        draw.ellipse((pa[0] - 6, pa[1] - 6, pa[0] + 6, pa[1] + 6), fill=palette["indigo"])
        draw.ellipse((pah[0] - 6, pah[1] - 6, pah[0] + 6, pah[1] + 6), fill=palette["amber"])

        card_x = pad_x + int(plot_w * 0.56)
        card_y = pad_top + 20
        draw.rounded_rectangle(
            (card_x, card_y, pad_x + plot_w - 10, card_y + 115),
            radius=10,
            fill=(*palette["panel"], 230),
            outline=palette["grid"],
            width=2,
        )
        draw.text((card_x + 16, card_y + 14), f"a = {a:.2f}   h = {h:.3f}", fill=palette["muted"], font=font_small)
        draw.text((card_x + 16, card_y + 42), f"Secant m = {slope:.3f}", fill=line_col, font=font_formula)
        draw.text(
            (card_x + 16, card_y + 78),
            f"Exact f'(a) = {_eval_deriv(fn_id, a):.3f}",
            fill=palette["indigo"],
            font=font_small,
        )


def _draw_riemann_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, fn_id, params, font_formula, font_small):
    x_min, x_max, y_min, y_max = -0.6, 3.6, -2.5, 9.0
    to_px = _make_mapper(pad_x, pad_top, plot_w, plot_h, x_min, x_max, y_min, y_max)
    _draw_axes(draw, palette, to_px, x_min, x_max, y_min, y_max)

    a, b = 0.0, float(params.get("b", 3.0))
    max_n = int(params.get("n", 32))
    n = max(4, int(round(4 + (max_n - 4) * _smoothstep((progress - 0.15) / 0.72))))
    dx = (b - a) / n
    approx = 0.0
    amber_rgba = (*palette["amber"], 115)
    for i in range(n):
        x0 = a + i * dx
        xm = x0 + 0.5 * dx
        val = _eval_fn(fn_id, xm)
        approx += val * dx
        p_tl = to_px(x0, max(0.0, val))
        p_br = to_px(x0 + dx, min(0.0, val))
        draw.rectangle([p_tl[0], p_tl[1], p_br[0], p_br[1]], fill=amber_rgba, outline=palette["amber"], width=1)

    xs = np.linspace(x_min, x_max, 180)
    pts = [to_px(float(x), _eval_fn(fn_id, float(x))) for x in xs]
    draw.line(pts, fill=palette["indigo"], width=4)

    card_x = pad_x + int(plot_w * 0.54)
    card_y = pad_top + 20
    draw.rounded_rectangle(
        (card_x, card_y, pad_x + plot_w - 10, card_y + 108),
        radius=10,
        fill=(*palette["panel"], 232),
        outline=palette["grid"],
        width=2,
    )
    draw.text((card_x + 16, card_y + 14), f"Partitions n = {n}  (Midpoint)", fill=palette["muted"], font=font_small)
    draw.text((card_x + 16, card_y + 44), f"Sum ≈ {approx:.4f}", fill=palette["amber"], font=font_formula)


def _draw_square_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small):
    cx = pad_x + int(plot_w * 0.34)
    cy = pad_top + int(plot_h * 0.52)
    x_side = int(min(plot_w, plot_h) * 0.38)
    b_half = int(min(plot_w, plot_h) * 0.14)
    sep = int(28 * (1.0 - _smoothstep((progress - 0.25) / 0.45)))

    x0 = cx - (x_side + b_half) // 2
    y0 = cy - (x_side + b_half) // 2

    # x^2 block
    draw.rectangle(
        (x0, y0, x0 + x_side, y0 + x_side),
        fill=(*palette["indigo"], 90),
        outline=palette["indigo"],
        width=3,
    )
    draw.text((x0 + x_side // 2 - 14, y0 + x_side // 2 - 14), "x²", fill=palette["ink"], font=font_formula)

    if progress > 0.18:
        # two (b/2)x rectangles
        draw.rectangle(
            (x0 + x_side + sep, y0, x0 + x_side + sep + b_half, y0 + x_side),
            fill=(*palette["teal"], 90),
            outline=palette["teal"],
            width=2,
        )
        draw.rectangle(
            (x0, y0 + x_side + sep, x0 + x_side, y0 + x_side + sep + b_half),
            fill=(*palette["teal"], 90),
            outline=palette["teal"],
            width=2,
        )

    if progress > 0.58:
        alpha = int(175 * _smoothstep((progress - 0.58) / 0.25))
        draw.rectangle(
            (x0 + x_side + sep, y0 + x_side + sep, x0 + x_side + sep + b_half, y0 + x_side + sep + b_half),
            fill=(*palette["amber"], alpha),
            outline=palette["amber"],
            width=3,
        )

    rx = pad_x + int(plot_w * 0.58)
    ry = pad_top + int(plot_h * 0.34)
    draw.text((rx, ry), "x² + bx + (b/2)² = (x + b/2)²", fill=palette["ink"], font=font_formula)
    draw.text((rx, ry + 42), "Amber corner completes the square", fill=palette["amber"], font=font_small)


def _draw_unitcircle_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small):
    cx = pad_x + int(plot_w * 0.36)
    cy = pad_top + int(plot_h * 0.52)
    r = int(min(plot_w, plot_h) * 0.36)
    draw.line((cx - int(r * 1.25), cy, cx + int(r * 1.25), cy), fill=palette["axis"], width=2)
    draw.line((cx, cy - int(r * 1.25), cx, cy + int(r * 1.25)), fill=palette["axis"], width=2)
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=palette["indigo"], width=3)

    theta = 0.35 + _smoothstep(progress) * (math.pi * 1.15)
    px = cx + r * math.cos(theta)
    py = cy - r * math.sin(theta)
    draw.line((cx, cy, px, cy), fill=palette["teal"], width=4)
    draw.line((px, cy, px, py), fill=palette["amber"], width=4)
    draw.line((cx, cy, px, py), fill=palette["indigo"], width=3)
    draw.ellipse((px - 6, py - 6, px + 6, py + 6), fill=palette["amber"])

    rx = pad_x + int(plot_w * 0.60)
    ry = pad_top + int(plot_h * 0.30)
    draw.text((rx, ry), f"θ = {math.degrees(theta):.1f}°", fill=palette["ink"], font=font_formula)
    draw.text((rx, ry + 38), f"cos θ = {math.cos(theta):+.3f}", fill=palette["teal"], font=font_small)
    draw.text((rx, ry + 64), f"sin θ = {math.sin(theta):+.3f}", fill=palette["amber"], font=font_small)
    draw.text((rx, ry + 98), "cos²θ + sin²θ = 1.000", fill=palette["indigo"], font=font_small)


def _draw_linalg_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small):
    cx = pad_x + plot_w * 0.42
    cy = pad_top + plot_h * 0.52
    scale = min(plot_w, plot_h) * 0.11
    t = _smoothstep((progress - 0.12) / 0.72)
    m11 = 1.0 + t * (float(params.get("m11", 1.8)) - 1.0)
    m12 = t * float(params.get("m12", 0.5))
    m21 = t * float(params.get("m21", 0.4))
    m22 = 1.0 + t * (float(params.get("m22", 1.4)) - 1.0)

    def xform(x: float, y: float) -> tuple[float, float]:
        tx = m11 * x + m12 * y
        ty = m21 * x + m22 * y
        return (cx + tx * scale, cy - ty * scale)

    for k in range(-4, 5):
        draw.line([xform(k, -3), xform(k, 3)], fill=(*palette["indigo"], 110), width=2)
    for k in range(-3, 4):
        draw.line([xform(-4, k), xform(4, k)], fill=(*palette["indigo"], 110), width=2)

    draw.line([xform(0, 0), xform(1, 0)], fill=palette["teal"], width=4)
    draw.line([xform(0, 0), xform(0, 1)], fill=palette["amber"], width=4)
    det = m11 * m22 - m12 * m21
    draw.text(
        (pad_x + int(plot_w * 0.66), pad_top + 28),
        f"det(A) = {det:.2f}",
        fill=palette["amber"],
        font=font_formula,
    )


def _draw_qudrat_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small):
    x_min, x_max, y_min, y_max = -1.5, 4.6, -1.0, 22.0
    to_px = _make_mapper(pad_x, pad_top, plot_w, plot_h, x_min, x_max, y_min, y_max)
    _draw_axes(draw, palette, to_px, x_min, x_max, y_min, y_max)

    xs = np.linspace(x_min, x_max, max(8, int(160 * _smoothstep(progress / 0.45))))
    pts_a = [to_px(float(x), float(2.0**x)) for x in xs]
    if len(pts_a) > 1:
        draw.line(pts_a, fill=palette["indigo"], width=4)

    if progress > 0.25:
        xs_b = np.linspace(x_min, x_max, max(8, int(160 * _smoothstep((progress - 0.25) / 0.45))))
        pts_b = [to_px(float(x), float(x * x + 2.0)) for x in xs_b]
        if len(pts_b) > 1:
            draw.line(pts_b, fill=palette["amber"], width=4)

    probe = float(params.get("xProbe", 3.2))
    draw.text(
        (pad_x + int(plot_w * 0.54), pad_top + 24),
        f"x₀ = {probe:.2f}:  2ˣ = {2.0**probe:.2f}  vs  x²+2 = {probe*probe+2.0:.2f}",
        fill=palette["ink"],
        font=font_small,
    )


def _draw_taylor_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small):
    x_min, x_max, y_min, y_max = -6.5, 6.5, -2.2, 2.2
    to_px = _make_mapper(pad_x, pad_top, plot_w, plot_h, x_min, x_max, y_min, y_max)
    _draw_axes(draw, palette, to_px, x_min, x_max, y_min, y_max)

    xs = np.linspace(x_min, x_max, 180)
    pts_sin = [to_px(float(x), math.sin(float(x))) for x in xs]
    draw.line(pts_sin, fill=palette["indigo"], width=4)

    max_deg = int(params.get("degree", 5))
    odds = [d for d in (1, 3, 5, 7, 9) if d <= max_deg] or [1]
    idx = min(len(odds) - 1, int(_smoothstep(progress) * len(odds)))
    deg = odds[idx]

    def taylor_sin(x: float, n: int) -> float:
        s = 0.0
        for k in range((n + 1) // 2):
            p = 2 * k + 1
            s += ((-1.0) ** k) * (x**p) / math.factorial(p)
        return max(-2.2, min(2.2, s))

    pts_poly = [to_px(float(x), taylor_sin(float(x), deg)) for x in xs]
    draw.line(pts_poly, fill=palette["amber"], width=3)
    draw.text(
        (pad_x + int(plot_w * 0.58), pad_top + 24),
        f"Maclaurin Degree n = {deg}",
        fill=palette["amber"],
        font=font_formula,
    )


def _draw_normal_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small):
    x_min, x_max, y_min, y_max = -3.6, 3.6, -0.04, 0.45
    to_px = _make_mapper(pad_x, pad_top, plot_w, plot_h, x_min, x_max, y_min, y_max)
    _draw_axes(draw, palette, to_px, x_min, x_max, y_min, y_max)

    def pdf(z: float) -> float:
        return math.exp(-0.5 * z * z) / math.sqrt(2.0 * math.pi)

    z_target = float(params.get("zCutoff", 1.96))
    z0 = 0.2 + (z_target - 0.2) * _smoothstep(progress)

    zs_fill = np.linspace(-z0, z0, 90)
    poly = [to_px(-z0, 0.0)] + [to_px(float(z), pdf(float(z))) for z in zs_fill] + [to_px(z0, 0.0)]
    draw.polygon(poly, fill=(*palette["amber"], 110), outline=palette["amber"])

    xs = np.linspace(x_min, x_max, 180)
    pts = [to_px(float(x), pdf(float(x))) for x in xs]
    draw.line(pts, fill=palette["indigo"], width=4)

    prob = math.erf(z0 / math.sqrt(2.0)) * 100.0
    draw.text(
        (pad_x + int(plot_w * 0.56), pad_top + 24),
        f"z₀ = ±{z0:.2f}  |  Area = {prob:.2f}%",
        fill=palette["amber"],
        font=font_formula,
    )


def _draw_circle_thm_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small):
    cx = pad_x + int(plot_w * 0.36)
    cy = pad_top + int(plot_h * 0.52)
    r = int(min(plot_w, plot_h) * 0.36)
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=palette["indigo"], width=3)

    central_deg = float(params.get("centralDeg", 110.0))
    p_deg = float(params.get("pAngleDeg", 95.0)) + 28.0 * math.sin(progress * math.pi * 2.0)

    half_rad = math.radians(central_deg / 2.0)
    ang_a = -math.pi / 2.0 - half_rad
    ang_b = -math.pi / 2.0 + half_rad
    ang_p = math.radians(p_deg)

    pa = (cx + r * math.cos(ang_a), cy - r * math.sin(ang_a))
    pb = (cx + r * math.cos(ang_b), cy - r * math.sin(ang_b))
    pp = (cx + r * math.cos(ang_p), cy - r * math.sin(ang_p))

    draw.line([pa, (cx, cy), pb], fill=palette["amber"], width=3)
    draw.line([pa, pp, pb], fill=palette["teal"], width=4)
    draw.text(
        (pad_x + int(plot_w * 0.58), pad_top + int(plot_h * 0.32)),
        f"∠AOB = {central_deg:.1f}°   ∠APB = {central_deg/2.0:.1f}°",
        fill=palette["ink"],
        font=font_formula,
    )


def _draw_complex_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small):
    cx = pad_x + int(plot_w * 0.36)
    cy = pad_top + int(plot_h * 0.52)
    r = int(min(plot_w, plot_h) * 0.36)
    draw.line((cx - int(r * 1.25), cy, cx + int(r * 1.25), cy), fill=palette["axis"], width=2)
    draw.line((cx, cy - int(r * 1.25), cx, cy + int(r * 1.25)), fill=palette["axis"], width=2)
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=palette["indigo"], width=3)

    n = max(3, min(8, int(params.get("rootsN", 5))))
    phase = math.radians(float(params.get("phaseDeg", 18.0)) + 36.0 * _smoothstep(progress))
    pts = [
        (cx + r * math.cos((phase + 2.0 * math.pi * k) / n), cy - r * math.sin((phase + 2.0 * math.pi * k) / n))
        for k in range(n)
    ]
    draw.polygon(pts, fill=(*palette["amber"], 75), outline=palette["amber"])
    for pt in pts:
        draw.line([(cx, cy), pt], fill=palette["teal"], width=2)
        draw.ellipse((pt[0] - 5, pt[1] - 5, pt[0] + 5, pt[1] + 5), fill=palette["amber"])

    draw.text(
        (pad_x + int(plot_w * 0.60), pad_top + int(plot_h * 0.32)),
        f"De Moivre n = {n} Roots (∑ zₖ = 0)",
        fill=palette["ink"],
        font=font_formula,
    )


def _draw_grad_descent_frame(draw, palette, pad_x, pad_top, plot_w, plot_h, progress, params, font_formula, font_small):
    x_min, x_max, y_min, y_max = -3.2, 3.2, -0.4, 8.2
    to_px = _make_mapper(pad_x, pad_top, plot_w, plot_h, x_min, x_max, y_min, y_max)
    _draw_axes(draw, palette, to_px, x_min, x_max, y_min, y_max)

    def loss_fn(x: float) -> float:
        return 0.75 * x * x + 0.3 * math.sin(2.5 * x) + 0.6

    def grad_fn(x: float) -> float:
        return 1.5 * x + 0.75 * math.cos(2.5 * x)

    xs = np.linspace(x_min, x_max, 180)
    pts = [to_px(float(x), loss_fn(float(x))) for x in xs]
    draw.line(pts, fill=palette["indigo"], width=4)

    curr_x = float(params.get("xStart", -2.4))
    lr = float(params.get("lr", 0.28))
    steps = max(1, int(round(8 * _smoothstep(progress))))
    for _ in range(steps):
        nxt_x = curr_x - lr * grad_fn(curr_x)
        p0 = to_px(curr_x, loss_fn(curr_x))
        p1 = to_px(nxt_x, loss_fn(nxt_x))
        draw.line([p0, p1], fill=palette["amber"], width=3)
        draw.ellipse((p1[0] - 5, p1[1] - 5, p1[0] + 5, p1[1] + 5), fill=palette["teal"])
        curr_x = nxt_x

    draw.text(
        (pad_x + int(plot_w * 0.56), pad_top + 24),
        f"Step {steps}: x = {curr_x:+.3f}, L(x) = {loss_fn(curr_x):.3f}",
        fill=palette["teal"],
        font=font_formula,
    )

