/* ==========================================================================
   3c1c · ClipSAT Curriculum Scene Presets & Python Code Generator
   ========================================================================== */

import { EXTENDED_SCENE_PRESETS } from './scenes_catalog.js?v=100.0';

export const FUNCTIONS = {
  quad: {
    id: 'quad',
    label: 'f(x) = x² − 2',
    tex: 'f(x) = x^2 - 2',
    py: 'lambda x: x**2 - 2.0',
    pyDeriv: 'lambda x: 2.0 * x',
    eval: (x) => x * x - 2.0,
    deriv: (x) => 2.0 * x,
    anti: (x) => (x * x * x) / 3.0 - 2.0 * x,
  },
  cubic: {
    id: 'cubic',
    label: 'f(x) = ⅓x³ − x',
    tex: 'f(x) = \\tfrac{1}{3}x^3 - x',
    py: 'lambda x: (x**3) / 3.0 - x',
    pyDeriv: 'lambda x: x**2 - 1.0',
    eval: (x) => (x * x * x) / 3.0 - x,
    deriv: (x) => x * x - 1.0,
    anti: (x) => Math.pow(x, 4) / 12.0 - 0.5 * x * x,
  },
  sine: {
    id: 'sine',
    label: 'f(x) = 2 sin(x)',
    tex: 'f(x) = 2\\sin(x)',
    py: 'lambda x: 2.0 * np.sin(x)',
    pyDeriv: 'lambda x: 2.0 * np.cos(x)',
    eval: (x) => 2.0 * Math.sin(x),
    deriv: (x) => 2.0 * Math.cos(x),
    anti: (x) => -2.0 * Math.cos(x),
  },
  exp: {
    id: 'exp',
    label: 'f(x) = ⅓ eˣ',
    tex: 'f(x) = \\tfrac{1}{3}e^x',
    py: 'lambda x: np.exp(x) / 3.0',
    pyDeriv: 'lambda x: np.exp(x) / 3.0',
    eval: (x) => Math.exp(x) / 3.0,
    deriv: (x) => Math.exp(x) / 3.0,
    anti: (x) => Math.exp(x) / 3.0,
  },
};

const CORE_SCENE_PRESETS = [
  {
    id: 'derivative',
    sceneClass: 'DerivativeTangentScene',
    track: 'AP CALCULUS · DERIVATIVES',
    glyph: "f'(a)",
    name: 'Derivative & Secant Limit',
    summary: 'Secant through a and a+h converging to the Indigo tangent slope.',
    duration: 6.0,
    dragHint: 'Drag point a directly on the curve or scrub the limit h → 0',
    beats: [
      { label: '01 · Axes & Curve', time: 0.0 },
      { label: '02 · Secant Δy/Δx', time: 1.4 },
      { label: '03 · Limit h → 0', time: 2.6 },
      { label: '04 · Exact Tangent', time: 4.8 },
    ],
    defaults: {
      track: 'AP CALCULUS · DERIVATIVES',
      title: "Secant Slope Converging to Derivative f'(a)",
      fn: 'quad',
      a: 1.2,
      h: 1.4,
    },
    rigor: {
      badge: 'THEOREM · DIFFERENCE QUOTIENT LIMIT',
      heading: 'Instantaneous Rate of Change',
      latex: "f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}",
      prose:
        'As the secant offset h approaches 0, the Amber secant line through (a, f(a)) and (a+h, f(a+h)) rotates into the exact Indigo tangent line.',
    },
  },
  {
    id: 'riemann',
    sceneClass: 'RiemannIntegralScene',
    track: 'CALCULUS · INTEGRALS',
    glyph: '∫dx',
    name: 'Riemann Sum & Definite Integral',
    summary: 'Amber partition rectangles converging to exact signed area under f(x).',
    duration: 6.0,
    dragHint: 'Drag upper bound b on the x-axis or increase partition count n',
    beats: [
      { label: '01 · Curve on [a, b]', time: 0.0 },
      { label: '02 · Coarse Partition', time: 1.2 },
      { label: '03 · Refinement n → N', time: 2.5 },
      { label: '04 · FTC Exact Area', time: 4.7 },
    ],
    defaults: {
      track: 'CALCULUS · FUNDAMENTAL THEOREM',
      title: 'Riemann Sum Convergence on [0, b]',
      fn: 'quad',
      b: 3.0,
      n: 24,
      rule: 'left',
    },
    rigor: {
      badge: 'THEOREM · FUNDAMENTAL THEOREM OF CALCULUS',
      heading: 'Definite Integral as Partition Limit',
      latex: '\\lim_{n\\to\\infty}\\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x = \\int_a^b f(x)\\,dx = F(b) - F(a)',
      prose:
        'Each subinterval of width Δx = (b−a)/n contributes an Amber rectangle. As n grows, discretization error vanishes.',
    },
  },
  {
    id: 'square',
    sceneClass: 'CompletingTheSquareScene',
    track: 'DIGITAL SAT · ALGEBRA',
    glyph: 'x²+bx',
    name: 'Completing the Square',
    summary: 'Geometric area proof splitting bx into two symmetric strips plus (b/2)².',
    duration: 6.0,
    dragHint: 'Adjust x and b to resize the geometric algebra tiles in real time',
    beats: [
      { label: '01 · x² Core Tile', time: 0.0 },
      { label: '02 · Split bx Strips', time: 1.5 },
      { label: '03 · Add (b/2)² Corner', time: 3.3 },
      { label: '04 · (x + b/2)² Square', time: 4.8 },
    ],
    defaults: {
      track: 'DIGITAL SAT · HEART OF ALGEBRA',
      title: 'Completing the Square — Geometric Proof',
      xVal: 2.2,
      bVal: 1.6,
    },
    rigor: {
      badge: 'IDENTITY · PERFECT-SQUARE TRINOMIAL',
      heading: 'Completing the Square',
      latex: 'x^2 + bx + \\left(\\frac{b}{2}\\right)^2 = \\left(x + \\frac{b}{2}\\right)^2',
      prose:
        'Halving the linear coefficient b into two Teal strips of width b/2 leaves an exact Amber corner square of area (b/2)².',
    },
  },
  {
    id: 'unitcircle',
    sceneClass: 'UnitCircleExactTrigScene',
    track: 'IGCSE 0580 · PRECALCULUS',
    glyph: 'sin θ',
    name: 'Unit Circle & Exact Trig',
    summary: 'Rotating terminal ray P(cos θ, sin θ) coupled with live harmonic wave.',
    duration: 6.0,
    dragHint: 'Drag point P around the unit circle to inspect exact trigonometric ratios',
    beats: [
      { label: '01 · Unit Circle', time: 0.0 },
      { label: '02 · Reference Triangle', time: 1.2 },
      { label: '03 · Sweep Angle θ', time: 2.4 },
      { label: '04 · Pythagorean Identity', time: 4.8 },
    ],
    defaults: {
      track: 'IGCSE 0580 & PRECALCULUS · TRIGONOMETRY',
      title: 'Unit Circle P(cos θ, sin θ) & Wave Trace',
      thetaDeg: 60,
    },
    rigor: {
      badge: 'THEOREM · PYTHAGOREAN IDENTITY',
      heading: 'Sine & Cosine on the Unit Circle',
      latex: 'P = (\\cos\\theta, \\sin\\theta), \\quad \\cos^2\\theta + \\sin^2\\theta = 1',
      prose:
        'The horizontal Teal leg measures cos θ and the vertical Amber leg measures sin θ on the circle x² + y² = 1.',
    },
  },
  {
    id: 'linalg',
    sceneClass: 'EigenLinearTransformScene',
    track: 'UNIVERSITY · LINEAR ALGEBRA',
    glyph: '[A]v',
    name: '2×2 Linear Transformation',
    summary: 'Animated matrix warp of R² showing basis images, det(A), and eigenvectors.',
    duration: 6.0,
    dragHint: 'Modify matrix entries [m11, m12; m21, m22] to warp the coordinate plane',
    beats: [
      { label: '01 · Standard Basis', time: 0.0 },
      { label: '02 · Apply Matrix A', time: 1.4 },
      { label: '03 · Determinant Area', time: 3.4 },
      { label: '04 · Eigenspace Av = λv', time: 4.8 },
    ],
    defaults: {
      track: 'UNIVERSITY · LINEAR ALGEBRA',
      title: 'Linear Transformation & Determinant Scaling',
      m11: 1.8,
      m12: 0.6,
      m21: 0.4,
      m22: 1.4,
    },
    rigor: {
      badge: 'THEOREM · SPECTRAL & DETERMINANT GEOMETRY',
      heading: 'Area Scaling & Invariant Directions',
      latex: 'A\\vec{v} = \\lambda\\vec{v}, \\quad \\det(A) = m_{11}m_{22} - m_{12}m_{21}',
      prose:
        'A 2×2 matrix maps the unit square to a parallelogram of signed area det(A), while eigenvectors stay on their own span.',
    },
  },
  {
    id: 'qudrat',
    sceneClass: 'QudratComparisonScene',
    track: 'GAT QUDRAT · QUANTITATIVE',
    glyph: 'A ≷ B',
    name: 'Qudrat Quantitative Comparison',
    summary: 'Visual growth comparison of Column A (2ˣ) vs Column B (x² + 2) across domains.',
    duration: 6.0,
    dragHint: 'Drag test value x₀ along the axis to compare Column A and Column B',
    beats: [
      { label: '01 · Column A: 2ˣ', time: 0.0 },
      { label: '02 · Column B: x² + 2', time: 1.4 },
      { label: '03 · Crossover Points', time: 3.0 },
      { label: '04 · Domain Verdict', time: 4.6 },
    ],
    defaults: {
      track: 'QIYAS GAT QUDRAT · QUANTITATIVE COMPARISON',
      title: 'Compare Column A: 2ˣ vs Column B: x² + 2',
      xProbe: 3.2,
    },
    rigor: {
      badge: 'STRATEGY · QUDRAT QUANTITATIVE COMPARISON',
      heading: 'Testing Boundary & Crossover Values',
      latex: 'A(x) = 2^x \\;\\text{ vs }\\; B(x) = x^2 + 2',
      prose:
        'When two expressions cross on the domain, the relationship is Indeterminate (Choice D) unless the domain restricts x to one side of the root.',
    },
  },
  {
    id: 'taylor',
    sceneClass: 'TaylorSeriesScene',
    track: 'AP CALCULUS BC · SERIES',
    glyph: 'Tₙ(x)',
    name: 'Taylor Polynomial Convergence',
    summary: 'Maclaurin partial sums Tₙ(x) progressively hugging sin(x) across [-π, π].',
    duration: 6.0,
    dragHint: 'Drag evaluation point x₀ or increase polynomial degree n (1 → 9)',
    beats: [
      { label: '01 · Target sin(x)', time: 0.0 },
      { label: '02 · Linear T₁(x) = x', time: 1.2 },
      { label: '03 · Cubic & Quintic', time: 2.6 },
      { label: '04 · Degree-n Fit', time: 4.5 },
    ],
    defaults: {
      track: 'AP CALCULUS BC · POWER SERIES',
      title: 'Maclaurin Polynomials Tₙ(x) Converging to sin(x)',
      degree: 7,
      xEval: 2.1,
    },
    rigor: {
      badge: 'THEOREM · TAYLOR & MACLAURIN SERIES',
      heading: 'Local Polynomial Approximation',
      latex: '\\sin(x) = \\sum_{k=0}^{\\infty} \\frac{(-1)^k x^{2k+1}}{(2k+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots',
      prose:
        'Matching higher-order derivatives at x = 0 bends the Amber polynomial Tₙ(x) onto the true Indigo curve over an expanding radius.',
    },
  },
  {
    id: 'normal',
    sceneClass: 'NormalZScoreScene',
    track: 'AP STATISTICS · PROBABILITY',
    glyph: 'Φ(z)',
    name: 'Gaussian Bell Curve & Z-Score',
    summary: 'Standard normal density φ(z) with shaded central probability P(|Z| ≤ z₀).',
    duration: 6.0,
    dragHint: 'Drag cutoff z₀ along the horizontal axis to sweep empirical probabilities',
    beats: [
      { label: '01 · Density φ(z)', time: 0.0 },
      { label: '02 · 68% (±1σ)', time: 1.4 },
      { label: '03 · 95% (±2σ)', time: 2.9 },
      { label: '04 · Custom Cutoff z₀', time: 4.5 },
    ],
    defaults: {
      track: 'AP STATISTICS · CONTINUOUS DISTRIBUTIONS',
      title: 'Standard Normal Distribution & Empirical Rule',
      zCutoff: 1.96,
    },
    rigor: {
      badge: 'DEFINITION · STANDARD NORMAL CDF',
      heading: 'Gaussian Density & Z-Score Area',
      latex: '\\varphi(z) = \\frac{1}{\\sqrt{2\\pi}}e^{-z^2/2}, \\quad P(|Z| \\le z_0) = \\int_{-z_0}^{z_0}\\varphi(z)\\,dz',
      prose:
        'The 68–95–99.7 rule benchmarks 1, 2, and 3 standard deviations; z₀ = 1.96 encloses exactly 95.0% of the total probability mass.',
    },
  },
  {
    id: 'circle_thm',
    sceneClass: 'InscribedAngleScene',
    track: 'IGCSE 0580 · GEOMETRY',
    glyph: '2θ',
    name: 'Inscribed Angle Circle Theorem',
    summary: 'Central angle ∠AOB = 2∠APB remains invariant as P glides along the major arc.',
    duration: 6.0,
    dragHint: 'Drag point P around the upper arc or adjust chord opening angle',
    beats: [
      { label: '01 · Chord AB & Center O', time: 0.0 },
      { label: '02 · Central Angle 2θ', time: 1.3 },
      { label: '03 · Inscribed Angle θ', time: 2.5 },
      { label: '04 · Arc Invariance', time: 4.2 },
    ],
    defaults: {
      track: 'CAMBRIDGE IGCSE 0580 · CIRCLE THEOREMS',
      title: 'Angle at the Center is Twice the Inscribed Angle',
      centralDeg: 116,
      pAngleDeg: 95,
    },
    rigor: {
      badge: 'THEOREM · INSCRIBED ANGLE INVARIANCE',
      heading: 'Central vs. Circumference Angle',
      latex: '\\angle AOB = 2\\,\\angle APB \\quad (\\text{for all } P \\text{ on the major arc})',
      prose:
        'Splitting ΔOAP and ΔOBP into isosceles triangles of radius R proves the central Amber angle is always twice the Teal angle at P.',
    },
  },
  {
    id: 'complex',
    sceneClass: 'DeMoivreRootsScene',
    track: 'IB MATH HL · COMPLEX',
    glyph: 'zⁿ=w',
    name: 'De Moivre & Complex Roots',
    summary: 'n-th roots of a complex number forming a regular polygon on the Argand plane.',
    duration: 6.0,
    dragHint: 'Change root order n (3 → 8) or phase angle φ to rotate the Argand polygon',
    beats: [
      { label: '01 · Argand Circle', time: 0.0 },
      { label: '02 · Principal Root z₀', time: 1.2 },
      { label: '03 · Uniform Phase 2πk/n', time: 2.5 },
      { label: '04 · Regular n-gon', time: 4.4 },
    ],
    defaults: {
      track: 'IB MATH AA HL · COMPLEX NUMBERS',
      title: "De Moivre's Theorem & Symmetric n-th Roots",
      rootsN: 5,
      phaseDeg: 24,
    },
    rigor: {
      badge: "THEOREM · DE MOIVRE'S ROOTS FORMULA",
      heading: 'Symmetric Roots in the Argand Plane',
      latex: 'z_k = r^{1/n}\\exp\\!\\left(i\\,\\frac{\\varphi + 2\\pi k}{n}\\right), \\quad k = 0,1,\\dots,n-1',
      prose:
        'Every non-zero complex number has n distinct n-th roots spaced by Δθ = 2π/n radians, inscribing a regular n-gon.',
    },
  },
  {
    id: 'grad_descent',
    sceneClass: 'GradientDescentScene',
    track: 'MATH FOR AI · OPTIMIZATION',
    glyph: '−η∇L',
    name: 'Gradient Descent Trajectory',
    summary: 'Iterative parameter updates xₜ₊₁ = xₜ − ηL′(xₜ) descending a convex loss bowl.',
    duration: 6.0,
    dragHint: 'Drag starting point x₀ on the loss curve or tune learning rate η',
    beats: [
      { label: '01 · Loss Landscape L(x)', time: 0.0 },
      { label: '02 · Initial Gradient L′(x₀)', time: 1.2 },
      { label: '03 · Step Updates −η∇L', time: 2.4 },
      { label: '04 · Minimum Convergence', time: 4.6 },
    ],
    defaults: {
      track: 'MATH FOR AI & DATA SCIENCE · OPTIMIZATION',
      title: 'Gradient Descent xₜ₊₁ = xₜ − η L′(xₜ)',
      xStart: -2.6,
      lr: 0.22,
    },
    rigor: {
      badge: 'ALGORITHM · FIRST-ORDER OPTIMIZATION',
      heading: 'Gradient Descent Update Rule',
      latex: 'x_{t+1} = x_t - \\eta\\,\\nabla L(x_t), \\quad \\lim_{t\\to\\infty} L\'(x_t) = 0',
      prose:
        'Stepping opposite the local derivative L′(xₜ) scaled by learning rate η monotonically decreases loss when 0 < η < 2/L″.',
    },
  },
];

const CORE_CATEGORIES = {
  derivative: 'Calculus',
  riemann: 'Calculus',
  square: 'SAT / Algebra',
  unitcircle: 'Geometry & Trig',
  linalg: 'Linear Algebra',
  qudrat: 'Qudrat & Olympiad',
  taylor: 'Calculus',
  normal: 'Probability & Stats',
  circle_thm: 'Geometry & Trig',
  complex: 'Complex & Fourier',
  grad_descent: 'Optimization & ML',
};

CORE_SCENE_PRESETS.forEach((s) => {
  s.category = CORE_CATEGORIES[s.id] || 'Calculus';
});

export const SCENE_PRESETS = [...CORE_SCENE_PRESETS, ...EXTENDED_SCENE_PRESETS];

export function generatePythonSceneCode(preset, params = {}, stageTheme = 'dark', aspect = '16:9', watermark = true) {
  const merged = { ...(preset.defaults || {}), ...(params || {}) };
  params = merged;
  const cliFlags = [
    `3c1c clipsat_scenes.py ${preset.sceneClass} -w`,
    stageTheme === 'paper' ? '--paper' : '',
    aspect === '9:16' ? '--short' : aspect === '1:1' ? '--square' : '--hd',
  ]
    .filter(Boolean)
    .join(' ');

  const modeLiteral = stageTheme === 'paper' ? '"paper"' : '"dark"';
  const wmLiteral = watermark ? 'True' : 'False';
  const fnObj = FUNCTIONS[params.fn || 'quad'] || FUNCTIONS.quad;

  if (preset.id === 'derivative') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        axes = Axes(
            x_range=(-2.0, 4.0, 1.0),
            y_range=(-3.0, 10.0, 2.0),
            width=8.5,
            height=5.4,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.3)

        func = ${fnObj.py}
        deriv = ${fnObj.pyDeriv}
        curve = axes.get_graph(func, x_range=(-1.6, 3.4), color=self.theme.indigo)
        curve.set_stroke(width=4)

        a_val = ${Number(params.a).toFixed(2)}
        h_tracker = ValueTracker(${Number(params.h).toFixed(2)})

        dot_a = Dot(axes.c2p(a_val, func(a_val)), color=self.theme.indigo, radius=0.08)
        dot_ah = always_redraw(
            lambda: Dot(
                axes.c2p(a_val + h_tracker.get_value(), func(a_val + h_tracker.get_value())),
                color=self.theme.amber,
                radius=0.08,
            )
        )

        def get_secant():
            h = h_tracker.get_value()
            m = (func(a_val + h) - func(a_val)) / h if abs(h) > 1e-3 else deriv(a_val)
            col = self.theme.amber if abs(h) > 0.06 else self.theme.teal
            return axes.get_graph(
                lambda x: func(a_val) + m * (x - a_val),
                x_range=(-1.2, 3.6),
                color=col,
            ).set_stroke(width=3)

        secant_line = always_redraw(get_secant)
        formula = Tex(
            r"f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}",
            color=self.theme.ink,
            font_size=34,
        ).to_edge(RIGHT, buff=0.65).shift(UP * 1.1)

        self.play(ShowCreation(axes), ShowCreation(curve), run_time=1.4)
        self.play(FadeIn(dot_a), FadeIn(dot_ah), ShowCreation(secant_line), Write(formula))
        self.play(h_tracker.animate.set_value(0.01), run_time=3.2, rate_func=smooth)
        self.play(ShowCreation(self.highlight_callout(formula, color=self.theme.amber)))
        self.wait(1.0)
`;
  }

  if (preset.id === 'riemann') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        axes = Axes(
            x_range=(-0.5, 3.8, 1.0),
            y_range=(-2.5, 9.5, 2.0),
            width=8.6,
            height=5.3,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.4 + LEFT * 1.3)

        func = ${fnObj.py}
        curve = axes.get_graph(func, x_range=(-0.2, 3.4), color=self.theme.indigo).set_stroke(width=4)

        ftc = Tex(
            r"\\int_0^{${Number(params.b).toFixed(1)}} f(x)\\,dx = F(${Number(params.b).toFixed(1)}) - F(0)",
            color=self.theme.ink,
            font_size=34,
        ).to_edge(RIGHT, buff=0.65).shift(UP * 1.1)

        self.play(ShowCreation(axes), ShowCreation(curve), Write(ftc))

        b_bound = ${Number(params.b).toFixed(2)}
        target_dx = b_bound / ${Number(params.n)}
        rects = axes.get_riemann_rectangles(
            curve,
            x_range=(0, b_bound),
            dx=target_dx,
            input_sample_type="${params.rule || 'left'}",
            fill_color=(self.theme.indigo, self.theme.amber),
            fill_opacity=0.58,
        )
        self.play(FadeIn(rects), run_time=2.2)
        self.play(ShowCreation(self.highlight_callout(ftc, color=self.theme.amber)))
        self.wait(1.0)
`;
  }

  if (preset.id === 'square') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        x_len = ${Number(params.xVal).toFixed(2)}
        b_half = ${(Number(params.bVal) / 2).toFixed(2)}

        x_sq = Square(side_length=x_len, color=self.theme.indigo)
        x_sq.set_fill(self.theme.indigo, opacity=0.32).shift(LEFT * 2.4 + DOWN * 0.2)

        rect_top = Rectangle(width=x_len, height=b_half, color=self.theme.teal)
        rect_top.set_fill(self.theme.teal, opacity=0.30).next_to(x_sq, UP, buff=0.05)

        rect_right = Rectangle(width=b_half, height=x_len, color=self.theme.teal)
        rect_right.set_fill(self.theme.teal, opacity=0.30).next_to(x_sq, RIGHT, buff=0.05)

        corner = Square(side_length=b_half, color=self.theme.amber)
        corner.set_fill(self.theme.amber, opacity=0.58)
        corner.next_to(rect_top, RIGHT, buff=0.05).align_to(rect_right, LEFT)

        identity = Tex(
            r"x^2 + bx + \\left(\\frac{b}{2}\\right)^2 = \\left(x + \\frac{b}{2}\\right)^2",
            font_size=34,
            color=self.theme.ink,
        ).to_edge(RIGHT, buff=0.65)

        self.play(DrawBorderThenFill(x_sq))
        self.play(FadeIn(rect_top), FadeIn(rect_right))
        self.play(DrawBorderThenFill(corner), Write(identity))
        self.play(ShowCreation(self.highlight_callout(identity, color=self.theme.amber)))
        self.wait(1.0)
`;
  }

  if (preset.id === 'unitcircle') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        plane = NumberPlane(x_range=(-1.5, 1.5, 0.5), y_range=(-1.5, 1.5, 0.5), width=5.2, height=5.2)
        plane.shift(LEFT * 2.4 + DOWN * 0.3)
        circle = Circle(radius=plane.c2p(1, 0)[0] - plane.c2p(0, 0)[0], color=self.theme.indigo)
        circle.move_to(plane.c2p(0, 0))

        theta = ValueTracker(${Number(params.thetaDeg)} * DEG)
        self.play(FadeIn(plane), ShowCreation(circle))
        self.play(theta.animate.set_value(240 * DEG), run_time=3.5)
        self.wait(1.0)
`;
  }

  if (preset.id === 'linalg') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        grid = NumberPlane(x_range=(-4, 4, 1), y_range=(-3, 3, 1))
        matrix = [[${Number(params.m11).toFixed(2)}, ${Number(params.m12).toFixed(2)}], [${Number(params.m21).toFixed(2)}, ${Number(params.m22).toFixed(2)}]]
        self.play(ShowCreation(grid))
        self.play(grid.animate.apply_matrix(matrix), run_time=2.8)
        self.wait(1.0)
`;
  }

  if (preset.id === 'taylor') {
    return `# CLI: ${cliFlags}
from manimlib import *
import math


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        axes = Axes(x_range=(-4.0, 4.0, 1.0), y_range=(-2.2, 2.2, 1.0), width=8.6, height=5.2)
        axes.shift(DOWN * 0.35 + LEFT * 1.2)
        sine_curve = axes.get_graph(lambda x: np.sin(x), color=self.theme.indigo).set_stroke(width=4)

        def taylor_sin(x, deg=${Number(params.degree ?? 7)}):
            total = 0.0
            for k in range((deg + 1) // 2):
                p = 2 * k + 1
                total += ((-1) ** k) * (x ** p) / math.factorial(p)
            return total

        poly_curve = axes.get_graph(taylor_sin, x_range=(-3.6, 3.6), color=self.theme.amber).set_stroke(width=3.5)
        self.play(ShowCreation(axes), ShowCreation(sine_curve))
        self.play(ShowCreation(poly_curve), run_time=2.4)
        self.wait(1.0)
`;
  }

  if (preset.id === 'normal') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        axes = Axes(x_range=(-3.6, 3.6, 1.0), y_range=(0, 0.45, 0.1), width=8.6, height=5.0)
        axes.shift(DOWN * 0.4 + LEFT * 1.2)
        pdf = lambda z: np.exp(-0.5 * z**2) / np.sqrt(2 * np.pi)
        bell = axes.get_graph(pdf, color=self.theme.indigo).set_stroke(width=4)
        z0 = ${Number(params.zCutoff ?? 1.96).toFixed(2)}
        area = axes.get_area_under_graph(bell, x_range=(-z0, z0), fill_color=self.theme.amber, fill_opacity=0.48)
        self.play(ShowCreation(axes), ShowCreation(bell))
        self.play(FadeIn(area), run_time=2.0)
        self.wait(1.0)
`;
  }

  if (preset.id === 'circle_thm') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        circle = Circle(radius=2.3, color=self.theme.indigo).shift(LEFT * 2.2 + DOWN * 0.25)
        center_dot = Dot(circle.get_center(), color=self.theme.amber)
        self.play(ShowCreation(circle), FadeIn(center_dot))
        self.wait(1.0)
`;
  }

  if (preset.id === 'complex') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        plane = ComplexPlane(x_range=(-1.6, 1.6, 0.5), y_range=(-1.6, 1.6, 0.5), width=5.4, height=5.4)
        plane.shift(LEFT * 2.3 + DOWN * 0.25)
        unit = Circle(radius=plane.c2p(1, 0)[0] - plane.c2p(0, 0)[0], color=self.theme.indigo).move_to(plane.c2p(0, 0))
        polygon = RegularPolygon(n=${Number(params.rootsN ?? 5)}, color=self.theme.amber).scale(unit.get_radius()).move_to(unit)
        self.play(FadeIn(plane), ShowCreation(unit), ShowCreation(polygon), run_time=2.4)
        self.wait(1.0)
`;
  }

  if (preset.id === 'grad_descent') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)

        axes = Axes(x_range=(-3.2, 3.2, 1.0), y_range=(-0.5, 8.5, 2.0), width=8.5, height=5.2)
        axes.shift(DOWN * 0.4 + LEFT * 1.2)
        loss = lambda x: 0.75 * x**2 + 0.3 * np.sin(2.5 * x) + 0.6
        curve = axes.get_graph(loss, color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve))
        self.wait(1.0)
`;
  }

  if (preset.id === 'qudrat') {
    return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${params.track}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${params.track}", "${params.title}")
        self.add(header)
        axes = Axes(x_range=(-1, 5, 1), y_range=(0, 20, 4), width=8.4, height=5.2)
        col_a = axes.get_graph(lambda x: 2**x, color=self.theme.indigo)
        col_b = axes.get_graph(lambda x: x**2 + 2, color=self.theme.amber)
        self.play(ShowCreation(axes), ShowCreation(col_a), ShowCreation(col_b))
        self.wait(1.0)
`;
  }

  const pyReserved = new Set(['lambda', 'def', 'class', 'from', 'import', 'in', 'is', 'for', 'while', 'return', 'yield', 'with', 'pass', 'global']);
  const paramLines = Object.entries(params)
    .filter(([k]) => k !== 'track' && k !== 'title')
    .map(([k, v]) => {
      const safeKey = pyReserved.has(k) ? `${k}_val` : k;
      return `        ${safeKey} = ${typeof v === 'number' ? Number(v).toFixed(3) : JSON.stringify(v)}`;
    })
    .join('\n');

  const safeTrack = String(params.track || preset.track).replace(/"/g, '\\"');
  const safeTitle = String(params.title || preset.name).replace(/"/g, '\\"');
  const safeLatex = String((preset.rigor && preset.rigor.latex) || 'f(x)').replace(/\\/g, '\\\\').replace(/"/g, '\\"');

  return `# CLI: ${cliFlags}
from manimlib import *


class ${preset.sceneClass}(ClipSATScene):
    """${preset.summary}"""
    clipsat_mode = ${modeLiteral}
    clipsat_track = "${safeTrack}"
    clipsat_watermark = ${wmLiteral}

    def construct(self):
        header = self.build_exam_header("${safeTrack}", "${safeTitle}")
        self.add(header)

        # Interactive studio parameters
${paramLines || '        pass'}

        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.25)

        primary = axes.get_graph(
            lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x),
            color=self.theme.indigo,
        ).set_stroke(width=4)

        theorem = Tex(
            "${safeLatex}",
            color=self.theme.ink,
            font_size=30,
        ).to_edge(RIGHT, buff=0.6)

        self.play(ShowCreation(axes), ShowCreation(primary), Write(theorem), run_time=1.8)
        self.play(ShowCreation(self.highlight_callout(theorem, color=self.theme.amber)))
        self.wait(1.0)
`;
}

