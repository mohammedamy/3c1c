/* ==========================================================================
   3c1c · ClipSAT Curriculum Scene Presets & Python Code Generator
   ========================================================================== */

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

export const SCENE_PRESETS = [
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
];

export function generatePythonSceneCode(preset, params, stageTheme, aspect, watermark) {
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
        b_half = ${ (Number(params.bVal) / 2).toFixed(2) }

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
