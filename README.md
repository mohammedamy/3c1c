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
3. **100 Curated Interactive Curriculum Scenes ([`clipsat_scenes.py`](clipsat_scenes.py), [`web/js/scenes_catalog.js`](web/js/scenes_catalog.js), [`web/js/scenes_renderers.js`](web/js/scenes_renderers.js))**:
   - **100 Error-Free Interactive Scenes** organized across **10 Curriculum Tracks** with real-time search (`#scene-search`), category filter pills (`#category-filter-bar`), interactive canvas dragging, live parameter sliders, KaTeX rigor cards, accessible numerical data tables, and valid `ClipSATScene` Python code generation:
     - **Calculus (22 Scenes)**: Derivative Secant Limit, Riemann Sum, Taylor Series, Mean Value Theorem, Rolle's Theorem, IVT,FTC Accumulation, L'Hôpital's Rule, Epsilon-Delta Limit, Newton-Raphson, Secant Method, Bisection, Fixed-Point Iteration, Simpson's $1/3$ Rule, Improper Integral, Arc Length, Solid of Revolution Disks, Cycloid, Epicycloid, Butterfly Curve, Rose Curve, Osculating Circle.
     - **Linear Algebra (10 Scenes)**: Eigenvalue Transform, Singular Value Decomposition (SVD), Gram-Schmidt Orthogonalization, Least Squares Projection, Cayley-Hamilton & Characteristic Polynomial, LU Decomposition, Householder Reflection, Givens Rotation, Markov Chain Steady State, Positive Definite Quadratic Form.
     - **SAT / Algebra (10 Scenes)**: Completing the Square, Discriminant & Roots, Vieta's Formulas, Rational Asymptotes & Holes, Absolute Value Inequality, Exponential vs Linear Growth, System of Linear Inequalities, Parabola Focus & Directrix, Ellipse Foci & Eccentricity, Hyperbola Asymptotes.
     - **Geometry & Trig (12 Scenes)**: Unit Circle Exact Ratios, Inscribed Angle Theorem, Thales' Theorem, Power of a Point, Ceva's Theorem, Menelaus' Theorem, Euler Line ($O, G, H$), Nine-Point Circle, Law of Sines & Circumcircle, Law of Cosines, Heron's Area Formula, Ptolemy's Cyclic Quad Theorem.
     - **Probability & Stats (10 Scenes)**: Normal Distribution & Z-Score, Binomial vs Normal CLT, Poisson Rare Events, Exponential Memoryless PDF/CDF, Beta Conjugate Prior, Chi-Square Goodness of Fit, Student's $t$-Distribution, Bayes' Theorem Posterior Tree, OLS Linear Regression & Residuals, Confidence Interval Coverage.
     - **Qudrat & Olympiad (12 Scenes)**: Quantitative Comparison ($2^x$ vs $x^2+2$), Difference of Squares Shortcut, Telescoping Series Cancellation, AM-GM Inequality Semicircle Proof, Cauchy-Schwarz Vector Proof, Jensen's Convexity Inequality, Inscribed Square in Right Triangle, Shaded Crescent Lunes, Harmonic Mean Average Speed Trap, Successive Percentage Trap, Work-Rate Combined Pipes, Clock Hands Angle Formula.
     - **Complex & Fourier (8 Scenes)**: De Moivre Roots of Unity, Fourier Square Wave Synthesis, Fourier Sawtooth Gibbs Phenomenon, Fourier Epicycle Orbit, Beat Frequency & AM Modulation, Lissajous Phase Figures, Damped Driven Resonance, Convolution Moving Average.
     - **Optimization & ML (5 Scenes)**: Gradient Descent Trajectory, Saddle Point Minimax, Lagrange Multiplier Tangency, Softmax Temperature Scaling, Sigmoid vs ReLU Activation & Vanishing Gradient.
     - **Physics & ODEs (6 Scenes)**: Simple Harmonic Oscillator Phase Portrait, Lotka-Volterra Predator-Prey, Logistic Carrying Capacity Slope Field, RC Circuit Charging Curve, Projectile Motion Envelope, Snell's Law & Total Internal Reflection.
     - **Discrete & Number (5 Scenes)**: Fibonacci Golden Spiral, Pascal's Triangle Binomial Mod, Modular Multiplication Circle, Collatz $3n+1$ Stopping Trajectory, Prime Sieve Density vs $x/\ln x$.

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
