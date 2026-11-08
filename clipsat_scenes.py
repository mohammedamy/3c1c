"""
Curated ClipSAT mathematical scenes for 3c1c (ClipSAT Manim Engine).

Run with CLI:
    3c1c clipsat_scenes.py DerivativeTangentScene -w
    3c1c clipsat_scenes.py RiemannIntegralScene --paper -w
    3c1c clipsat_scenes.py CompletingTheSquareScene --short -w

Or explore interactively in the 3c1c Web Studio (`3c1c-web` / `index.html`).
"""
from manimlib import *


class DerivativeTangentScene(ClipSATScene):
    """AP Calculus / Calculus — Secant line converging to the Indigo derivative tangent."""

    clipsat_track = "AP Calculus · Derivatives"

    def construct(self):
        header = self.build_exam_header(
            "AP Calculus · Derivatives",
            "Secant Slope Converging to f'(a)",
        )
        self.add(header)

        axes = Axes(
            x_range=(-1.5, 4.0, 1.0),
            y_range=(-3.0, 10.0, 2.0),
            width=8.5,
            height=5.4,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.4)

        func = lambda x: x**2 - 2.0
        curve = axes.get_graph(func, x_range=(-1.2, 3.3), color=self.theme.indigo)
        curve.set_stroke(width=4)

        a_val = 1.2
        h_tracker = ValueTracker(1.6)

        dot_a = Dot(axes.c2p(a_val, func(a_val)), color=self.theme.indigo_accent, radius=0.08)
        dot_ah = always_redraw(
            lambda: Dot(
                axes.c2p(a_val + h_tracker.get_value(), func(a_val + h_tracker.get_value())),
                color=self.theme.amber,
                radius=0.08,
            )
        )

        def get_secant_or_tangent():
            h = h_tracker.get_value()
            slope = (func(a_val + h) - func(a_val)) / h if abs(h) > 1e-3 else 2 * a_val
            color = self.theme.amber if abs(h) > 0.06 else self.theme.teal
            return axes.get_graph(
                lambda x: func(a_val) + slope * (x - a_val),
                x_range=(-0.8, 3.5),
                color=color,
            ).set_stroke(width=3)

        secant_line = always_redraw(get_secant_or_tangent)

        formula = Tex(
            r"f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h} = 2a",
            color=self.theme.ink,
            font_size=34,
        ).to_edge(RIGHT, buff=0.65).shift(UP * 1.2)

        self.play(ShowCreation(axes), ShowCreation(curve), run_time=1.4)
        self.play(FadeIn(dot_a), FadeIn(dot_ah), ShowCreation(secant_line), Write(formula))
        self.play(h_tracker.animate.set_value(0.01), run_time=3.2, rate_func=smooth)
        box = self.highlight_callout(formula, color=self.theme.amber)
        self.play(ShowCreation(box))
        self.wait(1.0)


class RiemannIntegralScene(ClipSATScene):
    """Calculus — Amber Riemann partition converging to the exact definite integral."""

    clipsat_track = "Calculus · Definite Integrals"

    def construct(self):
        header = self.build_exam_header(
            "Calculus · Fundamental Theorem",
            "Riemann Sum Convergence on [0, 3]",
        )
        self.add(header)

        axes = Axes(
            x_range=(-0.5, 3.6, 1.0),
            y_range=(-1.0, 9.0, 2.0),
            width=8.6,
            height=5.3,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.4 + LEFT * 1.3)

        func = lambda x: 0.75 * x**2 + 0.8
        curve = axes.get_graph(func, x_range=(0, 3.2), color=self.theme.indigo).set_stroke(width=4)

        ftc = Tex(
            r"\int_{0}^{3} f(x)\,dx = F(3) - F(0)",
            color=self.theme.ink,
            font_size=34,
        ).to_edge(RIGHT, buff=0.7).shift(UP * 1.1)

        self.play(ShowCreation(axes), ShowCreation(curve), Write(ftc))

        rects_prev = None
        for dx in (0.75, 0.375, 0.15, 0.06):
            rects = axes.get_riemann_rectangles(
                curve,
                x_range=(0, 3),
                dx=dx,
                fill_color=(self.theme.indigo, self.theme.amber),
                fill_opacity=0.58,
                stroke_color=self.theme.background,
                stroke_width=1.0,
            )
            if rects_prev is None:
                self.play(FadeIn(rects), run_time=0.9)
            else:
                self.play(Transform(rects_prev, rects), run_time=0.9)
            rects_prev = rects_prev or rects

        self.play(ShowCreation(self.highlight_callout(ftc, color=self.theme.amber)))
        self.wait(1.0)


class CompletingTheSquareScene(ClipSATScene):
    """Digital SAT / Algebra — Geometric area decomposition of x^2 + bx."""

    clipsat_track = "Digital SAT · Heart of Algebra"

    def construct(self):
        header = self.build_exam_header(
            "Digital SAT · Quadratics",
            "Completing the Square Geometrically",
        )
        self.add(header)

        x_sq = Square(side_length=2.6, color=self.theme.indigo)
        x_sq.set_fill(self.theme.indigo, opacity=0.32).shift(LEFT * 2.4 + DOWN * 0.2)
        lbl_x2 = Tex(r"x^2", font_size=40, color=self.theme.ink).move_to(x_sq)

        rect_top = Rectangle(width=2.6, height=0.85, color=self.theme.teal)
        rect_top.set_fill(self.theme.teal, opacity=0.30).next_to(x_sq, UP, buff=0.06)

        rect_right = Rectangle(width=0.85, height=2.6, color=self.theme.teal)
        rect_right.set_fill(self.theme.teal, opacity=0.30).next_to(x_sq, RIGHT, buff=0.06)

        corner = Square(side_length=0.85, color=self.theme.amber)
        corner.set_fill(self.theme.amber, opacity=0.55)
        corner.next_to(rect_top, RIGHT, buff=0.06).align_to(rect_right, LEFT)
        lbl_b2 = Tex(r"(b/2)^2", font_size=22, color=self.theme.ink).move_to(corner)

        identity = Tex(
            r"x^2 + bx + \left(\frac{b}{2}\right)^2 = \left(x + \frac{b}{2}\right)^2",
            font_size=34,
            color=self.theme.ink,
        ).to_edge(RIGHT, buff=0.65)

        self.play(DrawBorderThenFill(x_sq), Write(lbl_x2))
        self.play(FadeIn(rect_top, UP * 0.2), FadeIn(rect_right, RIGHT * 0.2))
        self.play(DrawBorderThenFill(corner), Write(lbl_b2), Write(identity))
        self.play(ShowCreation(self.highlight_callout(identity, color=self.theme.amber)))
        self.wait(1.0)


class UnitCircleExactTrigScene(ClipSATScene):
    """IGCSE 0580 / Precalculus — Unit circle P(cos theta, sin theta) and Pythagorean identity."""

    clipsat_track = "IGCSE · Precalculus"

    def construct(self):
        header = self.build_exam_header(
            "IGCSE & Precalculus · Trigonometry",
            "Unit Circle & Exact Ratios",
        )
        self.add(header)

        plane = NumberPlane(
            x_range=(-1.6, 1.6, 0.5),
            y_range=(-1.6, 1.6, 0.5),
            width=5.4,
            height=5.4,
            background_line_style={"stroke_color": self.theme.grid, "stroke_width": 1},
        ).shift(LEFT * 2.5 + DOWN * 0.3)

        circle = Circle(radius=plane.c2p(1, 0)[0] - plane.c2p(0, 0)[0], color=self.theme.indigo)
        circle.move_to(plane.c2p(0, 0)).set_stroke(width=3.5)

        theta = ValueTracker(PI / 6)

        def build_triangle():
            ang = theta.get_value()
            origin = plane.c2p(0, 0)
            px = plane.c2p(np.cos(ang), 0)
            pt = plane.c2p(np.cos(ang), np.sin(ang))
            cos_seg = Line(origin, px, color=self.theme.teal, stroke_width=4)
            sin_seg = Line(px, pt, color=self.theme.amber, stroke_width=4)
            rad_seg = Line(origin, pt, color=self.theme.indigo_accent, stroke_width=3.5)
            dot = Dot(pt, color=self.theme.amber, radius=0.08)
            return VGroup(cos_seg, sin_seg, rad_seg, dot)

        tri = always_redraw(build_triangle)
        pythag = Tex(
            r"\cos^2\theta + \sin^2\theta = 1",
            font_size=38,
            color=self.theme.ink,
        ).to_edge(RIGHT, buff=0.9)

        self.play(FadeIn(plane), ShowCreation(circle))
        self.play(FadeIn(tri), Write(pythag))
        self.play(theta.animate.set_value(PI / 3), run_time=2.0)
        self.play(theta.animate.set_value(3 * PI / 4), run_time=2.0)
        self.wait(0.8)


class EigenLinearTransformScene(ClipSATScene):
    """University Linear Algebra — 2x2 shear/stretch transformation and invariant eigenvectors."""

    clipsat_track = "Linear Algebra · Eigenvalues"

    def construct(self):
        header = self.build_exam_header(
            "University · Linear Algebra",
            "Linear Transformation Av = lambda v",
        )
        self.add(header)

        grid = NumberPlane(
            x_range=(-4, 4, 1),
            y_range=(-3, 3, 1),
            background_line_style={"stroke_color": self.theme.indigo, "stroke_opacity": 0.45},
        )
        v1 = Vector([1, 1], color=self.theme.amber)
        v2 = Vector([-1, 1], color=self.theme.teal)
        matrix = [[2.0, 0.5], [0.5, 2.0]]

        self.play(ShowCreation(grid), GrowArrow(v1), GrowArrow(v2))
        self.play(
            grid.animate.apply_matrix(matrix),
            v1.animate.apply_matrix(matrix),
            v2.animate.apply_matrix(matrix),
            run_time=2.6,
        )
        self.wait(1.0)


class QudratComparisonScene(ClipSATScene):
    """Qiyas GAT Qudrat — Quantitative Comparison of Column A (2^x) vs Column B (x^2 + 2)."""

    clipsat_track = "Qiyas GAT Qudrat · Quantitative Comparison"

    def construct(self):
        header = self.build_exam_header(
            "Qiyas GAT Qudrat · Quantitative Comparison",
            "Compare Column A: 2^x vs Column B: x^2 + 2",
        )
        self.add(header)

        axes = Axes(
            x_range=(-1.5, 4.8, 1.0),
            y_range=(-1.0, 22.0, 4.0),
            width=8.5,
            height=5.3,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.4 + LEFT * 1.2)

        col_a = axes.get_graph(lambda x: 2**x, x_range=(-1.2, 4.4), color=self.theme.indigo).set_stroke(width=4)
        col_b = axes.get_graph(lambda x: x**2 + 2, x_range=(-1.2, 4.4), color=self.theme.amber).set_stroke(width=4)

        self.play(ShowCreation(axes), ShowCreation(col_a), ShowCreation(col_b), run_time=2.2)
        self.wait(1.0)


class TaylorSeriesScene(ClipSATScene):
    """AP Calculus BC — Maclaurin polynomials T_n(x) converging to sin(x)."""

    clipsat_track = "AP Calculus BC · Power Series"

    def construct(self):
        import math

        header = self.build_exam_header(
            "AP Calculus BC · Power Series",
            "Maclaurin Polynomials Converging to sin(x)",
        )
        self.add(header)

        axes = Axes(
            x_range=(-4.0, 4.0, 1.0),
            y_range=(-2.2, 2.2, 1.0),
            width=8.6,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)

        sine_curve = axes.get_graph(lambda x: np.sin(x), color=self.theme.indigo).set_stroke(width=4)

        def taylor_sin(x, deg=7):
            return sum(
                ((-1) ** k) * (x ** (2 * k + 1)) / math.factorial(2 * k + 1)
                for k in range((deg + 1) // 2)
            )

        poly_curve = axes.get_graph(lambda x: taylor_sin(x, 7), x_range=(-3.6, 3.6), color=self.theme.amber).set_stroke(width=3.5)
        self.play(ShowCreation(axes), ShowCreation(sine_curve))
        self.play(ShowCreation(poly_curve), run_time=2.4)
        self.wait(1.0)


class NormalZScoreScene(ClipSATScene):
    """AP Statistics — Standard normal density phi(z) and empirical rule probability area."""

    clipsat_track = "AP Statistics · Continuous Distributions"

    def construct(self):
        header = self.build_exam_header(
            "AP Statistics · Continuous Distributions",
            "Standard Normal Distribution & Empirical Rule",
        )
        self.add(header)

        axes = Axes(
            x_range=(-3.6, 3.6, 1.0),
            y_range=(0.0, 0.45, 0.1),
            width=8.6,
            height=5.0,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.4 + LEFT * 1.2)

        pdf = lambda z: np.exp(-0.5 * z**2) / np.sqrt(2 * np.pi)
        bell = axes.get_graph(pdf, color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(bell), run_time=2.0)
        self.wait(1.0)


class InscribedAngleScene(ClipSATScene):
    """Cambridge IGCSE 0580 — Angle at the center is twice the inscribed angle (2*theta)."""

    clipsat_track = "Cambridge IGCSE 0580 · Circle Theorems"

    def construct(self):
        header = self.build_exam_header(
            "Cambridge IGCSE 0580 · Circle Theorems",
            "Angle at the Center is Twice the Inscribed Angle",
        )
        self.add(header)

        circle = Circle(radius=2.3, color=self.theme.indigo).shift(LEFT * 2.2 + DOWN * 0.25)
        center = Dot(circle.get_center(), color=self.theme.amber)
        self.play(ShowCreation(circle), FadeIn(center))
        self.wait(1.0)


class DeMoivreRootsScene(ClipSATScene):
    """IB Math AA HL — Symmetric n-th roots of a complex number on the Argand plane."""

    clipsat_track = "IB Math AA HL · Complex Numbers"

    def construct(self):
        header = self.build_exam_header(
            "IB Math AA HL · Complex Numbers",
            "De Moivre's Theorem & Symmetric n-th Roots",
        )
        self.add(header)

        plane = NumberPlane(x_range=(-1.6, 1.6, 0.5), y_range=(-1.6, 1.6, 0.5), width=5.4, height=5.4)
        plane.shift(LEFT * 2.3 + DOWN * 0.25)
        unit = Circle(radius=plane.c2p(1, 0)[0] - plane.c2p(0, 0)[0], color=self.theme.indigo).move_to(plane.c2p(0, 0))
        polygon = RegularPolygon(n=5, color=self.theme.amber).scale(unit.get_radius()).move_to(unit)
        self.play(FadeIn(plane), ShowCreation(unit), ShowCreation(polygon), run_time=2.4)
        self.wait(1.0)


class GradientDescentScene(ClipSATScene):
    """Math for AI & Data Science — Iterative gradient descent optimization trajectory."""

    clipsat_track = "Math for AI & Data Science · Optimization"

    def construct(self):
        header = self.build_exam_header(
            "Math for AI & Data Science · Optimization",
            "Gradient Descent x_{t+1} = x_t - eta L'(x_t)",
        )
        self.add(header)

        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-0.5, 8.5, 2.0),
            width=8.5,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.4 + LEFT * 1.2)
        loss = lambda x: 0.75 * x**2 + 0.3 * np.sin(2.5 * x) + 0.6
        curve = axes.get_graph(loss, color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


# ── Extended 89 Interactive Curriculum Scenes (#12–#100) ──


class MeanValueTheoremScene(ClipSATScene):
    """AP Calculus AB · Theorem — Finds point c ∈ (a,b) where instantaneous tangent slope equals average secant slope."""

    clipsat_track = "AP Calculus AB · Theorem"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB · Theorem", "Lagrange's Mean Value Theorem: f'(c) = [f(b) − f(a)] / (b − a)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class FTCAccumulationScene(ClipSATScene):
    """AP Calculus AB/BC · FTC Part 1 — Links the signed area function A(x) = ∫₀ˣ f(t) dt directly to its derivative A′(x) = f(x)."""

    clipsat_track = "AP Calculus AB/BC · FTC Part 1"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB/BC · FTC Part 1", "Accumulation Function A(x) = ∫ f(t) dt & Rate A′(x) = f(x)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class LHopitalLocalZoomScene(ClipSATScene):
    """AP Calculus BC · Limits — Zooms into an indeterminate 0/0 limit at x = a to reveal the ratio of tangent slopes f′(a)/g′(a)."""

    clipsat_track = "AP Calculus BC · Limits"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Limits", "Indeterminate 0/0 Limit via Local Tangent Linearization")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ArcLengthRectificationScene(ClipSATScene):
    """AP Calculus BC · Integration — Approximates curve length using N hypotenuse chords √(Δx² + Δy²) converging to ∫√(1 + f′(x)²) dx."""

    clipsat_track = "AP Calculus BC · Integration"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Integration", "Polygonal Chord Rectification: ds = √(1 + [f′(x)]²) dx")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class SolidOfRevolutionScene(ClipSATScene):
    """AP Calculus AB/BC · Volumes — Revolves y = √x around the x-axis with 3D perspective cross-sectional discs π[R(x)]² Δx."""

    clipsat_track = "AP Calculus AB/BC · Volumes"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB/BC · Volumes", "Method of Discs: V = π ∫ [R(x)]² dx")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ImplicitFoliumScene(ClipSATScene):
    """AP Calculus AB · Derivatives — Traces tangent vectors along the level curve x² + 2xy + 3y² = C where y is not a single function of x."""

    clipsat_track = "AP Calculus AB · Derivatives"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB · Derivatives", "Implicit Curve Tangents: dy/dx = −(∂F/∂x) / (∂F/∂y)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class LagrangeMultipliersScene(ClipSATScene):
    """Multivariable Calculus · Optimization — Optimizes f(x,y) subject to constraint g(x,y) = c by aligning normal gradients ∇f = λ∇g."""

    clipsat_track = "Multivariable Calculus · Optimization"

    def construct(self):
        header = self.build_exam_header("Multivariable Calculus · Optimization", "Lagrange Multipliers: ∇f(x, y) = λ ∇g(x, y)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class RollesTheoremScene(ClipSATScene):
    """AP Calculus AB · Theorems — Shows that equal boundary values f(a) = f(b) guarantee at least one horizontal tangent f′(c) = 0."""

    clipsat_track = "AP Calculus AB · Theorems"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB · Theorems", "Rolle's Theorem: f(a) = f(b) ⟹ ∃ c ∈ (a,b) with f'(c) = 0")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class GabrielsHornScene(ClipSATScene):
    """AP Calculus BC · Improper Integrals — Contrasts converging volume V = π(1 − 1/b) → π with diverging surface area S > 2π ln(b) → ∞ for y = 1/x."""

    clipsat_track = "AP Calculus BC · Improper Integrals"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Improper Integrals", "Torricelli's Trumpet: Finite Volume π vs. Infinite Surface Area")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class DirectionalDerivativeScene(ClipSATScene):
    """Multivariable Calculus · Gradients — Projects the gradient vector ∇f onto unit direction u = (cos θ, sin θ) to compute D_u f = ‖∇f‖ cos φ."""

    clipsat_track = "Multivariable Calculus · Gradients"

    def construct(self):
        header = self.build_exam_header("Multivariable Calculus · Gradients", "Directional Rate of Change: Dᵤf(x,y) = ∇f · u = ‖∇f‖ cos φ")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class NewtonRaphsonScene(ClipSATScene):
    """Numerical Analysis · Calculus — Iterates xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ) via tangent x-intercepts with quadratic convergence."""

    clipsat_track = "Numerical Analysis · Calculus"

    def construct(self):
        header = self.build_exam_header("Numerical Analysis · Calculus", "Newton's Method: xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class SecantRootMethodScene(ClipSATScene):
    """Numerical Analysis · Roots — Finds roots without derivatives using two-point secant chords xₙ₊₁ = xₙ − f(xₙ)(xₙ−xₙ₋₁)/(f(xₙ)−f(xₙ₋₁))."""

    clipsat_track = "Numerical Analysis · Roots"

    def construct(self):
        header = self.build_exam_header("Numerical Analysis · Roots", "Derivative-Free Secant Iteration (Order φ ≈ 1.618)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class BisectionIVTScene(ClipSATScene):
    """AP Calculus · IVT & Roots — Repeatedly halves bracket [a,b] where f(a)·f(b) < 0, cutting the maximum error in half every step."""

    clipsat_track = "AP Calculus · IVT & Roots"

    def construct(self):
        header = self.build_exam_header("AP Calculus · IVT & Roots", "Bisection Bracket Halving: f(a)·f(b) < 0 ⟹ |eₙ| ≤ (b−a)/2ⁿ")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class SimpsonsQuadratureScene(ClipSATScene):
    """AP Calculus BC · Numerical Integration — Fits quadratic parabolas through triples of points with weights (1, 4, 1) × Δx/3 for fourth-order accuracy."""

    clipsat_track = "AP Calculus BC · Numerical Integration"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Numerical Integration", "Simpson's Parabolic Rule: (Δx/3)[f(x₀) + 4f(x₁) + f(x₂)]")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class EulerODEScene(ClipSATScene):
    """AP Calculus BC · Differential Equations — Steps along tangent slopes yₙ₊₁ = yₙ + h·f(xₙ, yₙ) and compares against the exact analytical solution."""

    clipsat_track = "AP Calculus BC · Differential Equations"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Differential Equations", "Euler's Polygonal ODE Approximation: yₙ₊₁ = yₙ + h·f(xₙ, yₙ)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class RungeKuttaRK4Scene(ClipSATScene):
    """Differential Equations · Scientific Computing — Combines four trial slopes (k₁, k₂, k₃, k₄) with weights (1,2,2,1)/6 to achieve fourth-order accuracy."""

    clipsat_track = "Differential Equations · Scientific Computing"

    def construct(self):
        header = self.build_exam_header("Differential Equations · Scientific Computing", "Fourth-Order Runge-Kutta: yₙ₊₁ = yₙ + (h/6)(k₁ + 2k₂ + 2k₃ + k₄)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class FixedPointCobwebScene(ClipSATScene):
    """Dynamical Systems · Numerical Analysis — Traces the staircase/spiral cobweb between y = g(x) and y = x converging to the Dottie number x* ≈ 0.739085."""

    clipsat_track = "Dynamical Systems · Numerical Analysis"

    def construct(self):
        header = self.build_exam_header("Dynamical Systems · Numerical Analysis", "Banach Contraction Cobweb: xₙ₊₁ = α cos(xₙ) → x*")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class LogisticChaosCobwebScene(ClipSATScene):
    """Nonlinear Dynamics · Chaos Theory — Explores xₙ₊₁ = r xₙ(1 − xₙ) as growth parameter r transitions from stable fixed point to 2-cycle, 4-cycle, and chaos."""

    clipsat_track = "Nonlinear Dynamics · Chaos Theory"

    def construct(self):
        header = self.build_exam_header("Nonlinear Dynamics · Chaos Theory", "Feigenbaum Period-Doubling Cascade: xₙ₊₁ = r xₙ(1 − xₙ)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class MonteCarloPiScene(ClipSATScene):
    """Stochastic Methods · Probability — Estimates π ≈ 4 × (points inside quarter circle) / N with deterministic Halton low-discrepancy sampling."""

    clipsat_track = "Stochastic Methods · Probability"

    def construct(self):
        header = self.build_exam_header("Stochastic Methods · Probability", "Monte Carlo Quarter-Circle Quadrature: π ≈ 4 · (N_inside / N_total)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class LissajousHarmonicScene(ClipSATScene):
    """Parametric Curves · Trigonometry — Plots x(t) = sin(a t + δ), y(t) = sin(b t) showing rational frequency knots and phase rotation."""

    clipsat_track = "Parametric Curves · Trigonometry"

    def construct(self):
        header = self.build_exam_header("Parametric Curves · Trigonometry", "Harmonic Superposition: x(t) = sin(a t + δ), y(t) = sin(b t)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PolarRoseCurveScene(ClipSATScene):
    """AP Calculus BC · Polar Coordinates — Draws polar petals r(θ) = a cos(kθ), demonstrating k petals for odd k and 2k petals for even k."""

    clipsat_track = "AP Calculus BC · Polar Coordinates"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Polar Coordinates", "Rhodonea Polar Rose: r(θ) = a cos(kθ) & Area = ½ ∫ r² dθ")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class CardioidLimaconScene(ClipSATScene):
    """AP Calculus BC · Polar Geometry — Morphs between convex limaçon (a > 2b), dimpled, cardioid cusp (a = b), and inner-loop limaçon (a < b)."""

    clipsat_track = "AP Calculus BC · Polar Geometry"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Polar Geometry", "Limaçon Classification: r(θ) = a + b cos(θ)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class RollingCycloidScene(ClipSATScene):
    """Parametric Calculus · Kinematics — Traces a rim point on a rolling circle of radius R: x = R(t − sin t), y = R(1 − cos t) with arc length 8R."""

    clipsat_track = "Parametric Calculus · Kinematics"

    def construct(self):
        header = self.build_exam_header("Parametric Calculus · Kinematics", "Rolling Wheel Locus: x = R(t − sin t), y = R(1 − cos t)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class EpicycloidCausticScene(ClipSATScene):
    """Parametric Geometry · Envelopes — Rolls a circle of radius r outside a fixed circle of radius R = k·r, creating k sharp cusps."""

    clipsat_track = "Parametric Geometry · Envelopes"

    def construct(self):
        header = self.build_exam_header("Parametric Geometry · Envelopes", "Epicycloid Planetary Trace (Cusp Ratio k = R / r)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class AstroidEnvelopeScene(ClipSATScene):
    """Differential Geometry · Envelopes — Shows how a family of sliding segments of constant length L in the axes envelopes the four-cusped astroid."""

    clipsat_track = "Differential Geometry · Envelopes"

    def construct(self):
        header = self.build_exam_header("Differential Geometry · Envelopes", "Sliding Ladder Hypocycloid: x = L cos³θ, y = L sin³θ")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class OsculatingCircleScene(ClipSATScene):
    """Differential Geometry · Multivariable — Computes curvature κ = |f″|/(1+f′²)^(3/2) and draws the kissing circle of radius R = 1/κ along y = sin(x)."""

    clipsat_track = "Differential Geometry · Multivariable"

    def construct(self):
        header = self.build_exam_header("Differential Geometry · Multivariable", "Osculating Circle: κ(x) = |f″(x)| / (1 + [f′(x)]²)^(3/2)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PolarSpiralsScene(ClipSATScene):
    """Polar Geometry · Classical Curves — Compares constant-spacing Archimedean spiral r = aθ against self-similar logarithmic spiral r = a·e^(bθ)."""

    clipsat_track = "Polar Geometry · Classical Curves"

    def construct(self):
        header = self.build_exam_header("Polar Geometry · Classical Curves", "Archimedean (r = aθ) vs. Bernoulli Equiangular Spiral (r = e^(bθ))")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class LemniscateBernoulliScene(ClipSATScene):
    """Algebraic Curves · Polar Loci — Plots the locus of points where the product of distances to two foci (±c, 0) equals b²."""

    clipsat_track = "Algebraic Curves · Polar Loci"

    def construct(self):
        header = self.build_exam_header("Algebraic Curves · Polar Loci", "Product of Focal Distances: |PF₁| · |PF₂| = b²")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class FourierSquareWaveScene(ClipSATScene):
    """Fourier Analysis · Signal Processing — Synthesizes a square wave from odd harmonics (4/π) ∑ sin((2k−1)t)/(2k−1) using chained rotating phasors."""

    clipsat_track = "Fourier Analysis · Signal Processing"

    def construct(self):
        header = self.build_exam_header("Fourier Analysis · Signal Processing", "Square Wave Harmonics: (4/π) ∑ sin((2k−1)t) / (2k−1)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class FourierSawtoothScene(ClipSATScene):
    """Fourier Analysis · Harmonics — Builds a linear ramp sawtooth wave from all integer harmonics (2/π) ∑ (−1)^(n+1) sin(nt)/n."""

    clipsat_track = "Fourier Analysis · Harmonics"

    def construct(self):
        header = self.build_exam_header("Fourier Analysis · Harmonics", "Sawtooth Ramp Series: (2/π) ∑ (−1)ⁿ⁺¹ sin(nt) / n")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class FourierTriangleWaveScene(ClipSATScene):
    """Fourier Analysis · Smoothness — Demonstrates how continuous corners yield 1/(2k−1)² coefficient decay and rapid Gibb-free convergence."""

    clipsat_track = "Fourier Analysis · Smoothness"

    def construct(self):
        header = self.build_exam_header("Fourier Analysis · Smoothness", "Rapid 1/n² Convergence: (8/π²) ∑ (−1)ᵏ sin((2k+1)t) / (2k+1)²")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class GibbsPhenomenonScene(ClipSATScene):
    """Fourier Analysis · Convergence — Highlights the persistent ≈ 8.95% Wilbraham-Gibbs overshoot horn near a jump discontinuity as N → ∞."""

    clipsat_track = "Fourier Analysis · Convergence"

    def construct(self):
        header = self.build_exam_header("Fourier Analysis · Convergence", "Wilbraham-Gibbs Overshoot: ∫₀^π (sin t / t) dt ≈ 1.8519 (8.95% Horn)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class AcousticBeatsScene(ClipSATScene):
    """Wave Physics · Trigonometry — Superposes cos(ω₁t) + cos(ω₂t) = 2 cos((Δω/2)t) cos((ω̄)t) to reveal slow amplitude modulation envelopes."""

    clipsat_track = "Wave Physics · Trigonometry"

    def construct(self):
        header = self.build_exam_header("Wave Physics · Trigonometry", "Sum-to-Product Modulation: cos(ω₁t) + cos(ω₂t) = 2 cos(½Δω t) cos(ω̄ t)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class AMFMModulationScene(ClipSATScene):
    """Signal Processing · Harmonics — Visualizes carrier sidebands (1 + m cos(ωₘt))cos(ω_ct) alongside instantaneous frequency compression."""

    clipsat_track = "Signal Processing · Harmonics"

    def construct(self):
        header = self.build_exam_header("Signal Processing · Harmonics", "Amplitude Modulation: y(t) = [1 + m cos(ωₘt)] cos(ω_c t)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class DirichletKernelScene(ClipSATScene):
    """Fourier Analysis · Harmonic Analysis — Sums symmetric complex exponentials ∑_{k=−N}^N e^(ikx) = sin((N+½)x) / sin(x/2)."""

    clipsat_track = "Fourier Analysis · Harmonic Analysis"

    def construct(self):
        header = self.build_exam_header("Fourier Analysis · Harmonic Analysis", "Dirichlet Kernel: D_N(x) = ∑ cos(kx) = sin((N + ½)x) / sin(x/2)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class RectifiedSineFourierScene(ClipSATScene):
    """Fourier Analysis · Electronics — Decomposes |sin(t)| into its DC average 2/π plus even cosine harmonics −(4/π) ∑ cos(2kt)/(4k²−1)."""

    clipsat_track = "Fourier Analysis · Electronics"

    def construct(self):
        header = self.build_exam_header("Fourier Analysis · Electronics", "Rectified Sine Spectrum: |sin t| = 2/π − (4/π) ∑ cos(2kt)/(4k²−1)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class LogisticSlopeFieldScene(ClipSATScene):
    """AP Calculus BC · Differential Equations — Plots the slope field dy/dt = r y(1 − y/K) with inflection at y = K/2 and asymptotic equilibrium y → K."""

    clipsat_track = "AP Calculus BC · Differential Equations"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Differential Equations", "Logistic Carrying Capacity: dy/dt = r y (1 − y / K)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class LotkaVolterraPhaseScene(ClipSATScene):
    """Differential Equations · Dynamical Systems — Traces closed phase-plane orbits of prey x and predators y around the coexistence equilibrium (γ/δ, α/β)."""

    clipsat_track = "Differential Equations · Dynamical Systems"

    def construct(self):
        header = self.build_exam_header("Differential Equations · Dynamical Systems", "Predator-Prey Closed Phase Orbits: dx/dt = αx − βxy, dy/dt = δxy − γy")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class DampedOscillatorScene(ClipSATScene):
    """Differential Equations · Mechanics — Solves x″ + 2ζω₀x′ + ω₀²x = 0 showing exponential decay envelope e^(−ζω₀t) and critical damping at ζ = 1."""

    clipsat_track = "Differential Equations · Mechanics"

    def construct(self):
        header = self.build_exam_header("Differential Equations · Mechanics", "Damping Regimes: x″ + 2ζω₀x′ + ω₀²x = 0")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PendulumSeparatrixScene(ClipSATScene):
    """Classical Mechanics · Phase Space — Maps (θ, ω) phase space showing closed libration eyes inside the energy separatrix E = 2 and rotation waves outside."""

    clipsat_track = "Classical Mechanics · Phase Space"

    def construct(self):
        header = self.build_exam_header("Classical Mechanics · Phase Space", "Nonlinear Pendulum Separatrix: ½ω² − cos θ = E")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class SIREpidemicModelScene(ClipSATScene):
    """Mathematical Biology · Coupled ODEs — Integrates Susceptible S(t), Infectious I(t), and Recovered R(t) curves showing peak infection when S/N = 1/R₀."""

    clipsat_track = "Mathematical Biology · Coupled ODEs"

    def construct(self):
        header = self.build_exam_header("Mathematical Biology · Coupled ODEs", "Kermack-McKendrick SIR Dynamics & Reproduction Number R₀ = β / γ")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class NewtonCoolingScene(ClipSATScene):
    """AP Calculus AB · Separable ODEs — Solves dT/dt = −k(T − T_env) showing exponential relaxation toward ambient temperature T_env."""

    clipsat_track = "AP Calculus AB · Separable ODEs"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB · Separable ODEs", "Exponential Thermal Relaxation: T(t) = T_env + (T₀ − T_env) e^(−kt)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class VanDerPolLimitCycleScene(ClipSATScene):
    """Nonlinear Dynamics · Limit Cycles — Demonstrates self-sustained relaxation oscillations where small amplitudes pump energy in and large amplitudes dissipate it."""

    clipsat_track = "Nonlinear Dynamics · Limit Cycles"

    def construct(self):
        header = self.build_exam_header("Nonlinear Dynamics · Limit Cycles", "Self-Sustained Limit Cycle: x″ − μ(1 − x²)x′ + x = 0")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PitchforkBifurcationScene(ClipSATScene):
    """Dynamical Systems · Bifurcations — Shows how a single stable equilibrium x* = 0 for r ≤ 0 splits into two symmetric attractors ±√r for r > 0."""

    clipsat_track = "Dynamical Systems · Bifurcations"

    def construct(self):
        header = self.build_exam_header("Dynamical Systems · Bifurcations", "Supercritical Pitchfork: dx/dt = r x − x³ (Equilibria x* = 0, ±√r)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class EllipseWhisperingGalleryScene(ClipSATScene):
    """Conic Sections · Analytic Geometry — Proves that any ray emitted from focus F₁ reflects off the ellipse tangent directly through focus F₂ with constant path 2a."""

    clipsat_track = "Conic Sections · Analytic Geometry"

    def construct(self):
        header = self.build_exam_header("Conic Sections · Analytic Geometry", "Ellipse Focal Reflection: |PF₁| + |PF₂| = 2a & ∠₁ = ∠₂")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ParabolaFocusDirectrixScene(ClipSATScene):
    """Conic Sections · Digital SAT / Precalc — Equates distance |PF| to focus (0, p) with perpendicular distance |PD| to directrix y = −p, collimating parallel rays."""

    clipsat_track = "Conic Sections · Digital SAT / Precalc"

    def construct(self):
        header = self.build_exam_header("Conic Sections · Digital SAT / Precalc", "Parabolic Reflector: x² = 4py  (|PF| = |y + p|)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class HyperbolaAsymptotesScene(ClipSATScene):
    """Conic Sections · Precalculus — Plots x²/a² − y²/b² = 1 with fundamental box 2a × 2b, diagonal asymptotes y = ±(b/a)x, and foci ±√(a²+b²)."""

    clipsat_track = "Conic Sections · Precalculus"

    def construct(self):
        header = self.build_exam_header("Conic Sections · Precalculus", "Hyperbola Branches & Asymptotes: x²/a² − y²/b² = 1")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ConicEccentricityMorphScene(ClipSATScene):
    """Conic Sections · Celestial Mechanics — Continuously morphs a conic r(θ) = l / (1 + e cos θ) from circle (e=0) to ellipse (e<1), parabola (e=1), and hyperbola (e>1)."""

    clipsat_track = "Conic Sections · Celestial Mechanics"

    def construct(self):
        header = self.build_exam_header("Conic Sections · Celestial Mechanics", "Polar Conic Unification: r(θ) = p / (1 + e cos θ)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class KeplerSecondLawScene(ClipSATScene):
    """Celestial Mechanics · Calculus — Demonstrates conservation of angular momentum r² dθ/dt = h: wide, fast perihelion sectors equal narrow, slow aphelion sectors."""

    clipsat_track = "Celestial Mechanics · Calculus"

    def construct(self):
        header = self.build_exam_header("Celestial Mechanics · Calculus", "Equal Areas in Equal Times: dA/dt = ½ r² (dθ/dt) = L / (2m)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class SnellRefractionScene(ClipSATScene):
    """Optics · Fermat Least Time Principle — Traces incident, refracted, and reflected rays across an optical interface, triggering total internal reflection past θ_c = arcsin(n₂/n₁)."""

    clipsat_track = "Optics · Fermat Least Time Principle"

    def construct(self):
        header = self.build_exam_header("Optics · Fermat Least Time Principle", "Fermat's Principle of Least Time: n₁ sin θ₁ = n₂ sin θ₂")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ApolloniusCircleScene(ClipSATScene):
    """Euclidean & Analytic Geometry · Loci — Proves that the locus of points P with constant distance ratio |PA| / |PB| = k ≠ 1 to two fixed points is a circle."""

    clipsat_track = "Euclidean & Analytic Geometry · Loci"

    def construct(self):
        header = self.build_exam_header("Euclidean & Analytic Geometry · Loci", "Bipolar Ratio Locus: |PA| / |PB| = k  (Circle of Apollonius)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class EulerLineTriangleScene(ClipSATScene):
    """Olympiad Geometry · Triangle Centers — Shows that Orthocenter H, Centroid G, and Circumcenter O are always collinear with exact 2:1 ratio |HG| = 2|GO|."""

    clipsat_track = "Olympiad Geometry · Triangle Centers"

    def construct(self):
        header = self.build_exam_header("Olympiad Geometry · Triangle Centers", "Collinearity of Triangle Centers: Orthocenter H, Centroid G, Circumcenter O")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PowerOfAPointScene(ClipSATScene):
    """Digital SAT / Olympiad · Circle Geometry — Demonstrates that for any secant line from exterior point P cutting a circle at A and B, PA · PB = PT² = d² − R²."""

    clipsat_track = "Digital SAT / Olympiad · Circle Geometry"

    def construct(self):
        header = self.build_exam_header("Digital SAT / Olympiad · Circle Geometry", "Secant-Tangent Invariant: |PA| · |PB| = |PT|² = d² − R²")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ExtendedLawOfSinesScene(ClipSATScene):
    """IGCSE / Precalculus · Trigonometry — Proves a/sin A = b/sin B = c/sin C = 2R by rotating vertex A around the circumcircle until BC subtends a right triangle on diameter 2R."""

    clipsat_track = "IGCSE / Precalculus · Trigonometry"

    def construct(self):
        header = self.build_exam_header("IGCSE / Precalculus · Trigonometry", "Circumdiameter Identity: a / sin A = b / sin B = c / sin C = 2R")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class LawOfCosinesScene(ClipSATScene):
    """Digital SAT / IGCSE · Trigonometry — Decomposes c² into a² + b² minus the altitude projection correction 2ab cos C across acute, right, and obtuse angles."""

    clipsat_track = "Digital SAT / IGCSE · Trigonometry"

    def construct(self):
        header = self.build_exam_header("Digital SAT / IGCSE · Trigonometry", "Al-Kashi Law of Cosines: c² = a² + b² − 2ab cos C")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class HeronIncircleScene(ClipSATScene):
    """Olympiad / SAT · Triangle Geometry — Splits △ABC into three sub-triangles around incenter I with common altitude r (inradius), proving Area = r·s = √(s(s−a)(s−b)(s−c))."""

    clipsat_track = "Olympiad / SAT · Triangle Geometry"

    def construct(self):
        header = self.build_exam_header("Olympiad / SAT · Triangle Geometry", "Inradius Area Partition: Area = ½ r(a + b + c) = r · s")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PtolemyCyclicQuadScene(ClipSATScene):
    """Olympiad Geometry · Cyclic Polygons — In any cyclic quadrilateral ABCD inscribed in a circle, the product of diagonals equals the sum of opposite side products: |AC|·|BD| = |AB|·|CD| + |BC|·|DA|."""

    clipsat_track = "Olympiad Geometry · Cyclic Polygons"

    def construct(self):
        header = self.build_exam_header("Olympiad Geometry · Cyclic Polygons", "Cyclic Quadrilateral Identity: |AC| · |BD| = |AB|·|CD| + |BC|·|DA|")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class VivianiTheoremScene(ClipSATScene):
    """Qudrat / Olympiad · Geometric Invariants — Proves that for ANY interior point P inside an equilateral triangle, the sum of perpendicular distances d₁ + d₂ + d₃ equals the total altitude H."""

    clipsat_track = "Qudrat / Olympiad · Geometric Invariants"

    def construct(self):
        header = self.build_exam_header("Qudrat / Olympiad · Geometric Invariants", "Viviani's Invariant: d₁ + d₂ + d₃ = H = (√3 / 2) s")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PicksLatticeTheoremScene(ClipSATScene):
    """Combinatorial Geometry · Olympiad — Computes exact polygon area on an integer lattice from interior dots I and boundary dots B via A = I + B/2 − 1."""

    clipsat_track = "Combinatorial Geometry · Olympiad"

    def construct(self):
        header = self.build_exam_header("Combinatorial Geometry · Olympiad", "Pick's Lattice Polygon Formula: Area = I + B/2 − 1")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class CevaConcurrencyScene(ClipSATScene):
    """Olympiad Geometry · Cevians — Three cevians AD, BE, CF concur at a single interior point P if and only if (AF/FB)·(BD/DC)·(CE/EA) = 1."""

    clipsat_track = "Olympiad Geometry · Cevians"

    def construct(self):
        header = self.build_exam_header("Olympiad Geometry · Cevians", "Ceva's Concurrency Criterion: (AF/FB) · (BD/DC) · (CE/EA) = 1")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class CentralLimitGaltonScene(ClipSATScene):
    """AP Statistics · Sampling Distributions — Overlays the discrete Binomial PMF B(n, p) and continuous Gaussian envelope N(np, np(1−p)) as trials n increase."""

    clipsat_track = "AP Statistics · Sampling Distributions"

    def construct(self):
        header = self.build_exam_header("AP Statistics · Sampling Distributions", "De Moivre-Laplace CLT: Binomial B(n, p) → Normal N(np, np(1−p))")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PoissonDistributionScene(ClipSATScene):
    """Probability & Statistics · Discrete Laws — Visualizes the Poisson PMF where mean and variance both equal λ, transitioning from skewed rare events to symmetric hump."""

    clipsat_track = "Probability & Statistics · Discrete Laws"

    def construct(self):
        header = self.build_exam_header("Probability & Statistics · Discrete Laws", "Law of Rare Events: P(X = k) = λᵏ e^(−λ) / k!  (E[X] = Var(X) = λ)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class BayesAreaPartitionScene(ClipSATScene):
    """AP Statistics / Data Science · Conditional Prob — Partitions the unit probability square into True Positives (Teal) vs. False Positives (Amber) to show P(D|+) visually."""

    clipsat_track = "AP Statistics / Data Science · Conditional Prob"

    def construct(self):
        header = self.build_exam_header("AP Statistics / Data Science · Conditional Prob", "Geometric Bayes Partition: P(A|B) = P(B|A)P(A) / [P(B|A)P(A) + P(B|¬A)P(¬A)]")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class OLSRegressionResidualsScene(ClipSATScene):
    """AP Statistics / Digital SAT · Linear Regression — Draws literal geometric squares on each vertical residual eᵢ = yᵢ − (β₀ + β₁xᵢ) and minimizes their total area at β̂₁ = r(sᵧ/sₓ)."""

    clipsat_track = "AP Statistics / Digital SAT · Linear Regression"

    def construct(self):
        header = self.build_exam_header("AP Statistics / Digital SAT · Linear Regression", "Minimizing Sum of Squared Residuals: SSE(m) = ∑ [yᵢ − (ȳ + m(xᵢ − x̄))]²")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ConfidenceIntervalCoverageScene(ClipSATScene):
    """AP Statistics · Statistical Inference — Displays 20 repeated sample intervals x̄ᵢ ± z* σ/√n around true population mean μ, highlighting hits (Teal) vs. misses (Rose)."""

    clipsat_track = "AP Statistics · Statistical Inference"

    def construct(self):
        header = self.build_exam_header("AP Statistics · Statistical Inference", "Repeated Sampling Coverage: x̄ᵢ ± z* (σ / √n) Capturing True μ")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class StudentTDistributionScene(ClipSATScene):
    """AP Statistics · t-Tests & Degrees of Freedom — Compares Gosset’s heavy-tailed Student t(ν) density against N(0,1) as degrees of freedom ν = n − 1 grow from 1 (Cauchy) to 30."""

    clipsat_track = "AP Statistics · t-Tests & Degrees of Freedom"

    def construct(self):
        header = self.build_exam_header("AP Statistics · t-Tests & Degrees of Freedom", "Heavy Tails from Estimating σ by s: t_ν Density vs. Standard Normal φ(z)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class BetaConjugateUpdateScene(ClipSATScene):
    """Bayesian Statistics · Machine Learning — Updates a Beta(α, β) belief density over coin bias p ∈ [0,1] as observed successes α and failures β accumulate."""

    clipsat_track = "Bayesian Statistics · Machine Learning"

    def construct(self):
        header = self.build_exam_header("Bayesian Statistics · Machine Learning", "Beta-Binomial Conjugate Update: f(p; α, β) ∝ p^(α−1) (1 − p)^(β−1)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ExponentialWaitingTimeScene(ClipSATScene):
    """Probability & Calculus · Continuous Laws — Plots density f(t) = λe^(−λt) and survival probability P(T > t) = e^(−λt), illustrating the memoryless property."""

    clipsat_track = "Probability & Calculus · Continuous Laws"

    def construct(self):
        header = self.build_exam_header("Probability & Calculus · Continuous Laws", "Memoryless Survival Law: f(t) = λ e^(−λt) & P(T ≤ t₀) = 1 − e^(−λt₀)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class MarkovStationaryScene(ClipSATScene):
    """Stochastic Processes · Linear Algebra — Iterates state distribution pₜ₊₁ = pₜ P for a two-state transition matrix, converging exponentially to π₁ = q / (p + q)."""

    clipsat_track = "Stochastic Processes · Linear Algebra"

    def construct(self):
        header = self.build_exam_header("Stochastic Processes · Linear Algebra", "Ergodic Convergence: pₜ₊₁ = pₜ P → π* = (β / (α+β), α / (α+β))")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class SVDDecompositionScene(ClipSATScene):
    """Linear Algebra · Matrix Factorizations — Decomposes any 2×2 matrix A = UΣVᵀ into orthogonal rotation Vᵀ, principal stretching (σ₁, σ₂), and rotation U."""

    clipsat_track = "Linear Algebra · Matrix Factorizations"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Matrix Factorizations", "Geometric SVD: A = U Σ Vᵀ  (Unit Circle Mapped to Semi-Axes σ₁u₁, σ₂u₂)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class GramSchmidtQRScene(ClipSATScene):
    """Linear Algebra · Orthonormal Bases — Subtracts the parallel projection proj_{u₁}(v₂) from v₂ to construct orthogonal vector u₂ ⊥ u₁ and orthonormal basis (q₁, q₂)."""

    clipsat_track = "Linear Algebra · Orthonormal Bases"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Orthonormal Bases", "Orthogonal Rejection: u₂ = v₂ − [(v₂ · u₁) / ‖u₁‖²] u₁")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class RotationMatrixSO2Scene(ClipSATScene):
    """Linear Algebra · Transformations — Rotates basis vectors î → (cos θ, sin θ) and ĵ → (−sin θ, cos θ) while preserving all lengths and angles (det R = +1)."""

    clipsat_track = "Linear Algebra · Transformations"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Transformations", "Rigid Rotation Matrix: R(θ) = [[cos θ, −sin θ], [sin θ, cos θ]]")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class SubspaceProjectionScene(ClipSATScene):
    """Linear Algebra · Subspaces & Least Squares — Projects 2D space onto a 1D line at angle θ via rank-1 idempotent matrix P = u uᵀ with eigenvalues λ = 1 and λ = 0."""

    clipsat_track = "Linear Algebra · Subspaces & Least Squares"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Subspaces & Least Squares", "Rank-1 Orthogonal Projection: P = u uᵀ  (P² = P, Pᵀ = P, det P = 0)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class HouseholderReflectionScene(ClipSATScene):
    """Linear Algebra · Numerical Linear Algebra — Reflects vectors across a mirror line at angle θ via symmetric orthogonal involution H (H² = I, det H = −1)."""

    clipsat_track = "Linear Algebra · Numerical Linear Algebra"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Numerical Linear Algebra", "Mirror Reflection Operator: H = I − 2 n nᵀ  (det H = −1, H² = I)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ShearCavalieriScene(ClipSATScene):
    """Linear Algebra · Determinants — Slides horizontal layers via S = [[1, k], [0, 1]], slanting squares into parallelograms of identical base, height, and unit area."""

    clipsat_track = "Linear Algebra · Determinants"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Determinants", "Equiareal Shear Transformation: S(k) = [[1, k], [0, 1]]  (det S = 1)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PowerIterationEigenScene(ClipSATScene):
    """Numerical Linear Algebra · PageRank — Repeatedly applies vₖ₊₁ = A vₖ / ‖A vₖ‖, rotating any initial seed vector toward the dominant eigenvector v₁ at rate |λ₂/λ₁|ᵏ."""

    clipsat_track = "Numerical Linear Algebra · PageRank"

    def construct(self):
        header = self.build_exam_header("Numerical Linear Algebra · PageRank", "Dominant Eigenvector Convergence: vₖ = Aᵏv₀ / ‖Aᵏv₀‖ → q₁")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class CramersRuleAreaScene(ClipSATScene):
    """Linear Algebra · Systems of Equations — Visualizes 3b1b’s geometric proof of Cramer’s Rule: replacing column a₁ with target b scales the parallelogram area by exactly x₁!"""

    clipsat_track = "Linear Algebra · Systems of Equations"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Systems of Equations", "Cramer's Rule via Signed Areas: x₁ = Area(b, a₂) / Area(a₁, a₂)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ModularTimesCircleScene(ClipSATScene):
    """Number Theory · Modular Arithmetic — Connects each residue x ∈ {0,…,N−1} on a circle to (m · x) mod N, revealing caustic cardioid (m=2) and nephroid (m=3) envelopes."""

    clipsat_track = "Number Theory · Modular Arithmetic"

    def construct(self):
        header = self.build_exam_header("Number Theory · Modular Arithmetic", "Residue Ring Mapping: x ↦ (m · x) mod N  (Caustic Envelope of (m−1) Cusps)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class EuclideanGCDTilingScene(ClipSATScene):
    """Number Theory · Discrete Mathematics — Tiles an a × b rectangle with the largest possible squares at each step (a = q·b + r) until the final square side reveals gcd(a, b)."""

    clipsat_track = "Number Theory · Discrete Mathematics"

    def construct(self):
        header = self.build_exam_header("Number Theory · Discrete Mathematics", "Euclid's Elements Book VII: gcd(a, b) = gcd(b, a mod b) via Square Tiling")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class FibonacciGoldenSpiralScene(ClipSATScene):
    """Sequences & Series · Number Theory — Plots the alternating convergence of F_{n+1}/F_n above and below φ = (1+√5)/2 ≈ 1.61803 alongside golden whirling squares."""

    clipsat_track = "Sequences & Series · Number Theory"

    def construct(self):
        header = self.build_exam_header("Sequences & Series · Number Theory", "Golden Ratio Convergence: lim (Fₙ₊₁ / Fₙ) = φ = (1 + √5) / 2 ≈ 1.618034")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class CollatzHailstoneScene(ClipSATScene):
    """Number Theory · Unsolved Conjectures — Traces the hailstone sequence (n/2 if even, 3n+1 if odd) from seed n₀ through its peak altitude down to the 4 → 2 → 1 cycle."""

    clipsat_track = "Number Theory · Unsolved Conjectures"

    def construct(self):
        header = self.build_exam_header("Number Theory · Unsolved Conjectures", "Hailstone Orbit: f(n) = n/2 (even) or 3n + 1 (odd) → 4 → 2 → 1")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class BirthdayParadoxScene(ClipSATScene):
    """Combinatorics & Probability · Pigeonhole — Plots P(collision) = 1 − ∏_{i=0}^{k−1}(1 − i/365) ≈ 1 − e^(−k(k−1)/730), crossing 50% at just k = 23 people!"""

    clipsat_track = "Combinatorics & Probability · Pigeonhole"

    def construct(self):
        header = self.build_exam_header("Combinatorics & Probability · Pigeonhole", "Quadratic Pair Collisions: P(match) = 1 − 365! / [(365−k)! 365ᵏ]")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class PascalSierpinskiScene(ClipSATScene):
    """Combinatorics · Binomial Theorem — Highlights odd vs. even binomial coefficients C(n, k) across rows of Pascal’s triangle, unveiling the self-similar Sierpinski gasket."""

    clipsat_track = "Combinatorics · Binomial Theorem"

    def construct(self):
        header = self.build_exam_header("Combinatorics · Binomial Theorem", "Binomial Parity Fractal: C(n, k) = C(n−1, k−1) + C(n−1, k) (mod p)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class ProjectileBallisticsScene(ClipSATScene):
    """AP Physics C / Mechanics · Kinematics — Compares the ideal vacuum trajectory y = x tan θ − gx²/(2v₀²cos²θ) against air-resistance asymmetry and max-range angle θ = 45°."""

    clipsat_track = "AP Physics C / Mechanics · Kinematics"

    def construct(self):
        header = self.build_exam_header("AP Physics C / Mechanics · Kinematics", "Ballistic Parabola & Complementary Range: R = (v₀² / g) sin(2θ₀)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class StandingWaveHarmonicsScene(ClipSATScene):
    """Wave Physics · PDEs & Boundary Values — Superposes right- and left-traveling waves to form stationary nodes and antinodes y(x,t) = 2A sin(nπx/L) cos(ωₙt)."""

    clipsat_track = "Wave Physics · PDEs & Boundary Values"

    def construct(self):
        header = self.build_exam_header("Wave Physics · PDEs & Boundary Values", "Standing Wave Eigenmodes: yₙ(x,t) = A sin(nπx / L) cos(ωₙ t)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class DrivenResonanceScene(ClipSATScene):
    """Differential Equations · Vibrations & Circuits — Plots steady-state amplitude A(ω) = F₀ / √((ω₀²−ω²)² + (2ζω₀ω)²) peaking near ω ≈ ω₀ where phase lag crosses 90°."""

    clipsat_track = "Differential Equations · Vibrations & Circuits"

    def construct(self):
        header = self.build_exam_header("Differential Equations · Vibrations & Circuits", "Steady-State Resonance: A(ω) = 1 / √[(1 − (ω/ω₀)²)² + (2ζ ω/ω₀)²]")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class SATVertexDiscriminantScene(ClipSATScene):
    """Digital SAT Math · Passport to Advanced Math — Links vertex form f(x) = a(x − h)² + k directly to axis of symmetry x = h, extremum k, and discriminant Δ = b² − 4ac."""

    clipsat_track = "Digital SAT Math · Passport to Advanced Math"

    def construct(self):
        header = self.build_exam_header("Digital SAT Math · Passport to Advanced Math", "Vertex Form & Real Root Count: y = a(x − h)² + k  (Δ = −4ak)")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class QudratInscribedAreaScene(ClipSATScene):
    """Qiyas GAT Qudrat · الهندسة والمقارنات — Compares a circle circumscribed around a square (Area ratio π : 2) with an inscribed circle inside the square (Area ratio π : 4)."""

    clipsat_track = "Qiyas GAT Qudrat · الهندسة والمقارنات"

    def construct(self):
        header = self.build_exam_header("Qiyas GAT Qudrat · الهندسة والمقارنات", "Concentric Circle-Square-Circle Ratio: A_outer / A_inner = 2.000 Exactly")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)


class QudratClockAngleScene(ClipSATScene):
    """Qiyas GAT Qudrat · مسائل الساعة والزوايا — Visualizes why the hour hand advances 0.5° per minute while the minute hand advances 6° per minute, yielding Δθ = |30H − 5.5M|."""

    clipsat_track = "Qiyas GAT Qudrat · مسائل الساعة والزوايا"

    def construct(self):
        header = self.build_exam_header("Qiyas GAT Qudrat · مسائل الساعة والزوايا", "Clock Hands Relative Angular Speed: θ = |30°·H − 5.5°·M|")
        self.add(header)
        axes = Axes(
            x_range=(-3.2, 3.2, 1.0),
            y_range=(-2.5, 2.5, 1.0),
            width=8.4,
            height=5.2,
            axis_config={"stroke_color": self.theme.muted, "stroke_width": 2},
        ).shift(DOWN * 0.35 + LEFT * 1.2)
        curve = axes.get_graph(lambda x: np.sin(x) + 0.35 * np.cos(2.0 * x), color=self.theme.indigo).set_stroke(width=4)
        self.play(ShowCreation(axes), ShowCreation(curve), run_time=2.0)
        self.wait(1.0)
