# 3c1c · ClipSAT Mathematical Animation Engine & Web Studio

<p align="center">
  <img src="web/assets/clipsat-mark.png" alt="ClipSAT 3c1c Emblem" width="84" />
</p>

**3c1c** is **[ClipSAT](https://clipsat.org)**'s mathematical animation engine and hybrid web studio, customized from Grant Sanderson's [`3b1b/manim`](https://github.com/3b1b/manim) (`manimgl`) for **Mr. Mohamed Abdallah's** international and national exam curricula (**AP Calculus AB/BC, Digital SAT, Cambridge IGCSE & A-Level, IB Mathematics, University Linear Algebra, and Saudi GAT Qudrat / SAAT Tahsili**).

---

## ✨ What's Customized for ClipSAT (`3c1c`)

1. **Hybrid Web Studio ([`index.html`](index.html), [`web/`](web/), [`server/app.py`](server/app.py))**:
   - **Zero-Install Browser Engine ([`web/js/engine.js`](web/js/engine.js))**: 60 FPS high-DPI HTML5 Canvas mathematical animation studio with interactive point dragging, timeline keyframe scrubbing, KaTeX rigor cards, accessible *"View as Data"* numerical tables, client-side **PNG** & **WebM** clip recording, and 100% static GitHub Pages compatibility.
   - **Python FastAPI Render Backend ([`server/app.py`](server/app.py), [`server/headless_renderer.py`](server/headless_renderer.py))**: Discovers `ClipSATScene` classes, AST-validates custom Python scene scripts, and renders downloadable **H.264 `.mp4`** clips (using native `manimlib` WebGPU/Vulkan when available or the built-in CPU/FFmpeg headless renderer).
2. **ClipSAT Design System & Visual Grammar ([`manimlib/default_config.yml`](manimlib/default_config.yml), [`manimlib/constants.py`](manimlib/constants.py), [`manimlib/clipsat.py`](manimlib/clipsat.py))**:
   - **Dual Editorial Themes**: **Dark Slate (`#0A0D14`)** and **Editorial Paper (`#FAF7F2`)** (`--paper` CLI flag or one-click toggle in the studio).
   - **ClipSAT Color Tokens**: `CLIPSAT_INDIGO` (`#132746` / `#7DA4E8` for primary curves & derivatives), `CLIPSAT_AMBER` (`#9E6515` / `#F59E0B` for integrals, Riemann partitions & secants), `CLIPSAT_TEAL` (`#0C7A6F` / `#2DD4BF` for exact convergence & basis vectors), and `COLORMAP_CLIPSAT`.
   - **Multi-Format Aspect Presets**: `16:9` Lesson (`1920×1080`), `9:16` Vertical Short (`--short`, `1080×1920`), and `1:1` Exam Card (`--square`, `1080×1080`).
   - **`ClipSATScene` Base Class ([`manimlib/clipsat.py`](manimlib/clipsat.py))**: Built-in `build_exam_header(track, title)`, `build_clipsat_watermark()`, and `highlight_callout(mobject)`.
3. **Curated Curriculum Scenes ([`clipsat_scenes.py`](clipsat_scenes.py) — 11 Scenes)**:
   - `DerivativeTangentScene` — Secant line converging to the Indigo derivative tangent $f'(a)$.
   - `RiemannIntegralScene` — Amber Riemann partition converging to $\int_a^b f(x)\,dx = F(b)-F(a)$.
   - `CompletingTheSquareScene` — Geometric area decomposition of $x^2 + bx + (b/2)^2 = (x + b/2)^2$.
   - `UnitCircleExactTrigScene` — Rotating terminal ray $P(\cos\theta, \sin\theta)$ and $\cos^2\theta + \sin^2\theta = 1$.
   - `EigenLinearTransformScene` — $2\times 2$ linear transformation $A\vec{v} = \lambda\vec{v}$ and determinant scaling.
   - `QudratComparisonScene` — Quantitative Comparison of Column A ($2^x$) vs Column B ($x^2 + 2$).
   - `TaylorSeriesScene` — Maclaurin partial sums $T_n(x)$ progressively converging to $\sin(x)$.
   - `NormalZScoreScene` — Standard normal Gaussian density $\varphi(z)$ and empirical Z-score probability.
   - `InscribedAngleScene` — Circle theorem: central angle $\angle AOB = 2\angle APB$ arc invariance.
   - `DeMoivreRootsScene` — Symmetric $n$-th complex roots of unity on the Argand plane.
   - `GradientDescentScene` — Iterative optimization $x_{t+1} = x_t - \eta \nabla L(x_t)$ on a loss landscape.

---

## 🚀 Quick Start

### 1. Launch the Hybrid Web Studio (Browser + Python MP4 Backend)

```bash
python3 -m server.app --host 0.0.0.0 --port 8000
# Or via uvicorn directly:
uvicorn server.app:app --host 0.0.0.0 --port 8000
```

Then open `http://localhost:8000` (or open [`index.html`](index.html) directly as a static site / on GitHub Pages).

### 2. Render Scenes from the `3c1c` CLI

```bash
# Install in editable mode (with optional FastAPI web studio extras)
pip install -e ".[web]"

# Render in ClipSAT Dark Slate (1080p 16:9)
3c1c clipsat_scenes.py DerivativeTangentScene -w --hd

# Render on ClipSAT Editorial Paper (#FAF7F2)
3c1c clipsat_scenes.py RiemannIntegralScene -w --paper

# Render a 9:16 vertical short clip (1080x1920)
3c1c clipsat_scenes.py CompletingTheSquareScene -w --short
```

---

## 📄 License & Credits

- **ClipSAT Customization & Web Studio (`3c1c`)**: Designed for **[ClipSAT](https://clipsat.org)** by **Mr. Mohamed Abdallah**.
- **Upstream `manimgl` Engine**: Copyright (c) [3Blue1Brown LLC (Grant Sanderson)](https://github.com/3b1b/manim), MIT License.
