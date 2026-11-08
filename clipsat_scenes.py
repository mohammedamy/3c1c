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



# ── Extended 89 Interactive 2D Curriculum Scenes (#12–#100) ──


class MeanValueTheoremScene(ClipSATScene):
    """AP Calculus AB · Theorem — """

    clipsat_track = "AP Calculus AB · Theorem"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB · Theorem", "")
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
    """AP Calculus AB/BC · FTC Part 1 — """

    clipsat_track = "AP Calculus AB/BC · FTC Part 1"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB/BC · FTC Part 1", "")
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
    """AP Calculus BC · Limits — """

    clipsat_track = "AP Calculus BC · Limits"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Limits", "")
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
    """AP Calculus BC · Integration — """

    clipsat_track = "AP Calculus BC · Integration"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Integration", "")
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


class WeierstrassFractalScene(ClipSATScene):
    """Real Analysis · Pathological Functions — """

    clipsat_track = "Real Analysis · Pathological Functions"

    def construct(self):
        header = self.build_exam_header("Real Analysis · Pathological Functions", "")
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
    """AP Calculus AB · Derivatives — """

    clipsat_track = "AP Calculus AB · Derivatives"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB · Derivatives", "")
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


class EpsilonDeltaLimitScene(ClipSATScene):
    """AP Calculus BC · Foundations of Analysis — """

    clipsat_track = "AP Calculus BC · Foundations of Analysis"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Foundations of Analysis", "")
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


class DarbouxSumsSqueezeScene(ClipSATScene):
    """Real Analysis · Riemann Integrability — """

    clipsat_track = "Real Analysis · Riemann Integrability"

    def construct(self):
        header = self.build_exam_header("Real Analysis · Riemann Integrability", "")
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


class CantorDevilsStaircaseScene(ClipSATScene):
    """Real Analysis · Measure Theory & Fractals — """

    clipsat_track = "Real Analysis · Measure Theory & Fractals"

    def construct(self):
        header = self.build_exam_header("Real Analysis · Measure Theory & Fractals", "")
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


class GreensTheoremCurlScene(ClipSATScene):
    """Vector Calculus · Circulation & Curl — """

    clipsat_track = "Vector Calculus · Circulation & Curl"

    def construct(self):
        header = self.build_exam_header("Vector Calculus · Circulation & Curl", "")
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
    """Numerical Analysis · Calculus — """

    clipsat_track = "Numerical Analysis · Calculus"

    def construct(self):
        header = self.build_exam_header("Numerical Analysis · Calculus", "")
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
    """Numerical Analysis · Roots — """

    clipsat_track = "Numerical Analysis · Roots"

    def construct(self):
        header = self.build_exam_header("Numerical Analysis · Roots", "")
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
    """AP Calculus · IVT & Roots — """

    clipsat_track = "AP Calculus · IVT & Roots"

    def construct(self):
        header = self.build_exam_header("AP Calculus · IVT & Roots", "")
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
    """AP Calculus BC · Numerical Integration — """

    clipsat_track = "AP Calculus BC · Numerical Integration"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Numerical Integration", "")
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
    """AP Calculus BC · Differential Equations — """

    clipsat_track = "AP Calculus BC · Differential Equations"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Differential Equations", "")
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
    """Differential Equations · Scientific Computing — """

    clipsat_track = "Differential Equations · Scientific Computing"

    def construct(self):
        header = self.build_exam_header("Differential Equations · Scientific Computing", "")
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
    """Dynamical Systems · Numerical Analysis — """

    clipsat_track = "Dynamical Systems · Numerical Analysis"

    def construct(self):
        header = self.build_exam_header("Dynamical Systems · Numerical Analysis", "")
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
    """Nonlinear Dynamics · Chaos Theory — """

    clipsat_track = "Nonlinear Dynamics · Chaos Theory"

    def construct(self):
        header = self.build_exam_header("Nonlinear Dynamics · Chaos Theory", "")
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
    """Stochastic Methods · Probability — """

    clipsat_track = "Stochastic Methods · Probability"

    def construct(self):
        header = self.build_exam_header("Stochastic Methods · Probability", "")
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
    """Parametric Curves · Trigonometry — """

    clipsat_track = "Parametric Curves · Trigonometry"

    def construct(self):
        header = self.build_exam_header("Parametric Curves · Trigonometry", "")
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
    """AP Calculus BC · Polar Coordinates — """

    clipsat_track = "AP Calculus BC · Polar Coordinates"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Polar Coordinates", "")
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
    """AP Calculus BC · Polar Geometry — """

    clipsat_track = "AP Calculus BC · Polar Geometry"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Polar Geometry", "")
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
    """Parametric Calculus · Kinematics — """

    clipsat_track = "Parametric Calculus · Kinematics"

    def construct(self):
        header = self.build_exam_header("Parametric Calculus · Kinematics", "")
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
    """Parametric Geometry · Envelopes — """

    clipsat_track = "Parametric Geometry · Envelopes"

    def construct(self):
        header = self.build_exam_header("Parametric Geometry · Envelopes", "")
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
    """Differential Geometry · Envelopes — """

    clipsat_track = "Differential Geometry · Envelopes"

    def construct(self):
        header = self.build_exam_header("Differential Geometry · Envelopes", "")
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
    """Differential Geometry · Multivariable — """

    clipsat_track = "Differential Geometry · Multivariable"

    def construct(self):
        header = self.build_exam_header("Differential Geometry · Multivariable", "")
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
    """Polar Geometry · Classical Curves — """

    clipsat_track = "Polar Geometry · Classical Curves"

    def construct(self):
        header = self.build_exam_header("Polar Geometry · Classical Curves", "")
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
    """Algebraic Curves · Polar Loci — """

    clipsat_track = "Algebraic Curves · Polar Loci"

    def construct(self):
        header = self.build_exam_header("Algebraic Curves · Polar Loci", "")
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
    """Fourier Analysis · Signal Processing — """

    clipsat_track = "Fourier Analysis · Signal Processing"

    def construct(self):
        header = self.build_exam_header("Fourier Analysis · Signal Processing", "")
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


class NyquistAliasingScene(ClipSATScene):
    """Signal Processing · Sampling Theorem — """

    clipsat_track = "Signal Processing · Sampling Theorem"

    def construct(self):
        header = self.build_exam_header("Signal Processing · Sampling Theorem", "")
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


class HilbertAnalyticEnvelopeScene(ClipSATScene):
    """Complex Analysis · Quadrature Signals — """

    clipsat_track = "Complex Analysis · Quadrature Signals"

    def construct(self):
        header = self.build_exam_header("Complex Analysis · Quadrature Signals", "")
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
    """Fourier Analysis · Convergence — """

    clipsat_track = "Fourier Analysis · Convergence"

    def construct(self):
        header = self.build_exam_header("Fourier Analysis · Convergence", "")
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
    """Wave Physics · Trigonometry — """

    clipsat_track = "Wave Physics · Trigonometry"

    def construct(self):
        header = self.build_exam_header("Wave Physics · Trigonometry", "")
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
    """Signal Processing · Harmonics — """

    clipsat_track = "Signal Processing · Harmonics"

    def construct(self):
        header = self.build_exam_header("Signal Processing · Harmonics", "")
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
    """Fourier Analysis · Harmonic Analysis — """

    clipsat_track = "Fourier Analysis · Harmonic Analysis"

    def construct(self):
        header = self.build_exam_header("Fourier Analysis · Harmonic Analysis", "")
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


class LaplaceSPlanePolesScene(ClipSATScene):
    """Differential Equations · Control & Systems — """

    clipsat_track = "Differential Equations · Control & Systems"

    def construct(self):
        header = self.build_exam_header("Differential Equations · Control & Systems", "")
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
    """AP Calculus BC · Differential Equations — """

    clipsat_track = "AP Calculus BC · Differential Equations"

    def construct(self):
        header = self.build_exam_header("AP Calculus BC · Differential Equations", "")
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
    """Differential Equations · Dynamical Systems — """

    clipsat_track = "Differential Equations · Dynamical Systems"

    def construct(self):
        header = self.build_exam_header("Differential Equations · Dynamical Systems", "")
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
    """Differential Equations · Mechanics — """

    clipsat_track = "Differential Equations · Mechanics"

    def construct(self):
        header = self.build_exam_header("Differential Equations · Mechanics", "")
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
    """Classical Mechanics · Phase Space — """

    clipsat_track = "Classical Mechanics · Phase Space"

    def construct(self):
        header = self.build_exam_header("Classical Mechanics · Phase Space", "")
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
    """Mathematical Biology · Coupled ODEs — """

    clipsat_track = "Mathematical Biology · Coupled ODEs"

    def construct(self):
        header = self.build_exam_header("Mathematical Biology · Coupled ODEs", "")
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
    """AP Calculus AB · Separable ODEs — """

    clipsat_track = "AP Calculus AB · Separable ODEs"

    def construct(self):
        header = self.build_exam_header("AP Calculus AB · Separable ODEs", "")
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
    """Nonlinear Dynamics · Limit Cycles — """

    clipsat_track = "Nonlinear Dynamics · Limit Cycles"

    def construct(self):
        header = self.build_exam_header("Nonlinear Dynamics · Limit Cycles", "")
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
    """Dynamical Systems · Bifurcations — """

    clipsat_track = "Dynamical Systems · Bifurcations"

    def construct(self):
        header = self.build_exam_header("Dynamical Systems · Bifurcations", "")
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
    """Conic Sections · Analytic Geometry — """

    clipsat_track = "Conic Sections · Analytic Geometry"

    def construct(self):
        header = self.build_exam_header("Conic Sections · Analytic Geometry", "")
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
    """Conic Sections · Digital SAT / Precalc — """

    clipsat_track = "Conic Sections · Digital SAT / Precalc"

    def construct(self):
        header = self.build_exam_header("Conic Sections · Digital SAT / Precalc", "")
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
    """Conic Sections · Precalculus — """

    clipsat_track = "Conic Sections · Precalculus"

    def construct(self):
        header = self.build_exam_header("Conic Sections · Precalculus", "")
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
    """Conic Sections · Celestial Mechanics — """

    clipsat_track = "Conic Sections · Celestial Mechanics"

    def construct(self):
        header = self.build_exam_header("Conic Sections · Celestial Mechanics", "")
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


class GravitationalLensingScene(ClipSATScene):
    """Astrophysics & Conics · Hyperbolic Optics — """

    clipsat_track = "Astrophysics & Conics · Hyperbolic Optics"

    def construct(self):
        header = self.build_exam_header("Astrophysics & Conics · Hyperbolic Optics", "")
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
    """Optics · Fermat Least Time Principle — """

    clipsat_track = "Optics · Fermat Least Time Principle"

    def construct(self):
        header = self.build_exam_header("Optics · Fermat Least Time Principle", "")
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
    """Euclidean & Analytic Geometry · Loci — """

    clipsat_track = "Euclidean & Analytic Geometry · Loci"

    def construct(self):
        header = self.build_exam_header("Euclidean & Analytic Geometry · Loci", "")
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
    """Olympiad Geometry · Triangle Centers — """

    clipsat_track = "Olympiad Geometry · Triangle Centers"

    def construct(self):
        header = self.build_exam_header("Olympiad Geometry · Triangle Centers", "")
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
    """Digital SAT / Olympiad · Circle Geometry — """

    clipsat_track = "Digital SAT / Olympiad · Circle Geometry"

    def construct(self):
        header = self.build_exam_header("Digital SAT / Olympiad · Circle Geometry", "")
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
    """IGCSE / Precalculus · Trigonometry — """

    clipsat_track = "IGCSE / Precalculus · Trigonometry"

    def construct(self):
        header = self.build_exam_header("IGCSE / Precalculus · Trigonometry", "")
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
    """Digital SAT / IGCSE · Trigonometry — """

    clipsat_track = "Digital SAT / IGCSE · Trigonometry"

    def construct(self):
        header = self.build_exam_header("Digital SAT / IGCSE · Trigonometry", "")
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
    """Olympiad / SAT · Triangle Geometry — """

    clipsat_track = "Olympiad / SAT · Triangle Geometry"

    def construct(self):
        header = self.build_exam_header("Olympiad / SAT · Triangle Geometry", "")
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
    """Olympiad Geometry · Cyclic Polygons — """

    clipsat_track = "Olympiad Geometry · Cyclic Polygons"

    def construct(self):
        header = self.build_exam_header("Olympiad Geometry · Cyclic Polygons", "")
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


class FeuerbachNinePointScene(ClipSATScene):
    """Olympiad Geometry · Triangle Centers — """

    clipsat_track = "Olympiad Geometry · Triangle Centers"

    def construct(self):
        header = self.build_exam_header("Olympiad Geometry · Triangle Centers", "")
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
    """Combinatorial Geometry · Olympiad — """

    clipsat_track = "Combinatorial Geometry · Olympiad"

    def construct(self):
        header = self.build_exam_header("Combinatorial Geometry · Olympiad", "")
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
    """Olympiad Geometry · Cevians — """

    clipsat_track = "Olympiad Geometry · Cevians"

    def construct(self):
        header = self.build_exam_header("Olympiad Geometry · Cevians", "")
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
    """AP Statistics · Sampling Distributions — """

    clipsat_track = "AP Statistics · Sampling Distributions"

    def construct(self):
        header = self.build_exam_header("AP Statistics · Sampling Distributions", "")
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
    """Probability & Statistics · Discrete Laws — """

    clipsat_track = "Probability & Statistics · Discrete Laws"

    def construct(self):
        header = self.build_exam_header("Probability & Statistics · Discrete Laws", "")
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
    """AP Statistics / Data Science · Conditional Prob — """

    clipsat_track = "AP Statistics / Data Science · Conditional Prob"

    def construct(self):
        header = self.build_exam_header("AP Statistics / Data Science · Conditional Prob", "")
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
    """AP Statistics / Digital SAT · Linear Regression — """

    clipsat_track = "AP Statistics / Digital SAT · Linear Regression"

    def construct(self):
        header = self.build_exam_header("AP Statistics / Digital SAT · Linear Regression", "")
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
    """AP Statistics · Statistical Inference — """

    clipsat_track = "AP Statistics · Statistical Inference"

    def construct(self):
        header = self.build_exam_header("AP Statistics · Statistical Inference", "")
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
    """AP Statistics · t-Tests & Degrees of Freedom — """

    clipsat_track = "AP Statistics · t-Tests & Degrees of Freedom"

    def construct(self):
        header = self.build_exam_header("AP Statistics · t-Tests & Degrees of Freedom", "")
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
    """Bayesian Statistics · Machine Learning — """

    clipsat_track = "Bayesian Statistics · Machine Learning"

    def construct(self):
        header = self.build_exam_header("Bayesian Statistics · Machine Learning", "")
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
    """Probability & Calculus · Continuous Laws — """

    clipsat_track = "Probability & Calculus · Continuous Laws"

    def construct(self):
        header = self.build_exam_header("Probability & Calculus · Continuous Laws", "")
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
    """Stochastic Processes · Linear Algebra — """

    clipsat_track = "Stochastic Processes · Linear Algebra"

    def construct(self):
        header = self.build_exam_header("Stochastic Processes · Linear Algebra", "")
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


class GershgorinDiscsScene(ClipSATScene):
    """Numerical Linear Algebra · Spectral Bounds — """

    clipsat_track = "Numerical Linear Algebra · Spectral Bounds"

    def construct(self):
        header = self.build_exam_header("Numerical Linear Algebra · Spectral Bounds", "")
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
    """Linear Algebra · Orthonormal Bases — """

    clipsat_track = "Linear Algebra · Orthonormal Bases"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Orthonormal Bases", "")
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


class TraceDeterminantPlaneScene(ClipSATScene):
    """Linear Algebra & Dynamical Systems · Classification — """

    clipsat_track = "Linear Algebra & Dynamical Systems · Classification"

    def construct(self):
        header = self.build_exam_header("Linear Algebra & Dynamical Systems · Classification", "")
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
    """Linear Algebra · Subspaces & Least Squares — """

    clipsat_track = "Linear Algebra · Subspaces & Least Squares"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Subspaces & Least Squares", "")
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
    """Linear Algebra · Numerical Linear Algebra — """

    clipsat_track = "Linear Algebra · Numerical Linear Algebra"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Numerical Linear Algebra", "")
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


class PerronFrobeniusConeScene(ClipSATScene):
    """Applied Linear Algebra · Spectral Theory — """

    clipsat_track = "Applied Linear Algebra · Spectral Theory"

    def construct(self):
        header = self.build_exam_header("Applied Linear Algebra · Spectral Theory", "")
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
    """Numerical Linear Algebra · PageRank — """

    clipsat_track = "Numerical Linear Algebra · PageRank"

    def construct(self):
        header = self.build_exam_header("Numerical Linear Algebra · PageRank", "")
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
    """Linear Algebra · Systems of Equations — """

    clipsat_track = "Linear Algebra · Systems of Equations"

    def construct(self):
        header = self.build_exam_header("Linear Algebra · Systems of Equations", "")
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
    """Number Theory · Modular Arithmetic — """

    clipsat_track = "Number Theory · Modular Arithmetic"

    def construct(self):
        header = self.build_exam_header("Number Theory · Modular Arithmetic", "")
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
    """Number Theory · Discrete Mathematics — """

    clipsat_track = "Number Theory · Discrete Mathematics"

    def construct(self):
        header = self.build_exam_header("Number Theory · Discrete Mathematics", "")
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
    """Sequences & Series · Number Theory — """

    clipsat_track = "Sequences & Series · Number Theory"

    def construct(self):
        header = self.build_exam_header("Sequences & Series · Number Theory", "")
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
    """Number Theory · Unsolved Conjectures — """

    clipsat_track = "Number Theory · Unsolved Conjectures"

    def construct(self):
        header = self.build_exam_header("Number Theory · Unsolved Conjectures", "")
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
    """Combinatorics & Probability · Pigeonhole — """

    clipsat_track = "Combinatorics & Probability · Pigeonhole"

    def construct(self):
        header = self.build_exam_header("Combinatorics & Probability · Pigeonhole", "")
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
    """Combinatorics · Binomial Theorem — """

    clipsat_track = "Combinatorics · Binomial Theorem"

    def construct(self):
        header = self.build_exam_header("Combinatorics · Binomial Theorem", "")
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
    """AP Physics C / Mechanics · Kinematics — """

    clipsat_track = "AP Physics C / Mechanics · Kinematics"

    def construct(self):
        header = self.build_exam_header("AP Physics C / Mechanics · Kinematics", "")
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


class DopplerMachConeScene(ClipSATScene):
    """Wave Physics & Fluid Mechanics · Acoustics — """

    clipsat_track = "Wave Physics & Fluid Mechanics · Acoustics"

    def construct(self):
        header = self.build_exam_header("Wave Physics & Fluid Mechanics · Acoustics", "")
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


class MinkowskiSpacetimeScene(ClipSATScene):
    """Modern Physics · Special Relativity & Hyperbolic Geometry — """

    clipsat_track = "Modern Physics · Special Relativity & Hyperbolic Geometry"

    def construct(self):
        header = self.build_exam_header("Modern Physics · Special Relativity & Hyperbolic Geometry", "")
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
    """Digital SAT Math · Passport to Advanced Math — """

    clipsat_track = "Digital SAT Math · Passport to Advanced Math"

    def construct(self):
        header = self.build_exam_header("Digital SAT Math · Passport to Advanced Math", "")
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
    """Qiyas GAT Qudrat · الهندسة والمقارنات — """

    clipsat_track = "Qiyas GAT Qudrat · الهندسة والمقارنات"

    def construct(self):
        header = self.build_exam_header("Qiyas GAT Qudrat · الهندسة والمقارنات", "")
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
    """Qiyas GAT Qudrat · مسائل الساعة والزوايا — """

    clipsat_track = "Qiyas GAT Qudrat · مسائل الساعة والزوايا"

    def construct(self):
        header = self.build_exam_header("Qiyas GAT Qudrat · مسائل الساعة والزوايا", "")
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


# ── 50 Interactive 3D Multivariable, Spatial & Topological Scenes (#101–#150) ──


class EllipticParaboloid3DScene(ClipSATScene):
    """MULTIVARIABLE CALCULUS · QUADRIC SURFACES — """

    clipsat_track = "MULTIVARIABLE CALCULUS · QUADRIC SURFACES"

    def construct(self):
        header = self.build_exam_header("MULTIVARIABLE CALCULUS · QUADRIC SURFACES", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class HyperbolicParaboloid3DScene(ClipSATScene):
    """MULTIVARIABLE CALCULUS · SADDLE SURFACES — """

    clipsat_track = "MULTIVARIABLE CALCULUS · SADDLE SURFACES"

    def construct(self):
        header = self.build_exam_header("MULTIVARIABLE CALCULUS · SADDLE SURFACES", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class HyperboloidOneSheet3DScene(ClipSATScene):
    """3D ANALYTIC GEOMETRY · RULED QUADRICS — """

    clipsat_track = "3D ANALYTIC GEOMETRY · RULED QUADRICS"

    def construct(self):
        header = self.build_exam_header("3D ANALYTIC GEOMETRY · RULED QUADRICS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class HyperboloidTwoSheets3DScene(ClipSATScene):
    """3D ANALYTIC GEOMETRY · QUADRIC CLASSIFICATION — """

    clipsat_track = "3D ANALYTIC GEOMETRY · QUADRIC CLASSIFICATION"

    def construct(self):
        header = self.build_exam_header("3D ANALYTIC GEOMETRY · QUADRIC CLASSIFICATION", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class TriaxialEllipsoid3DScene(ClipSATScene):
    """3D ANALYTIC GEOMETRY · QUADRIC VOLUMES — """

    clipsat_track = "3D ANALYTIC GEOMETRY · QUADRIC VOLUMES"

    def construct(self):
        header = self.build_exam_header("3D ANALYTIC GEOMETRY · QUADRIC VOLUMES", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class ConeConicSlice3DScene(ClipSATScene):
    """APOLLONIUS & DANDELIN · 3D CONIC SECTIONS — """

    clipsat_track = "APOLLONIUS & DANDELIN · 3D CONIC SECTIONS"

    def construct(self):
        header = self.build_exam_header("APOLLONIUS & DANDELIN · 3D CONIC SECTIONS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class MonkeySaddle3DScene(ClipSATScene):
    """DIFFERENTIAL GEOMETRY · DEGENERATE CRITICAL POINTS — """

    clipsat_track = "DIFFERENTIAL GEOMETRY · DEGENERATE CRITICAL POINTS"

    def construct(self):
        header = self.build_exam_header("DIFFERENTIAL GEOMETRY · DEGENERATE CRITICAL POINTS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class RippleSinc3DScene(ClipSATScene):
    """FOURIER OPTICS & MULTIVARIABLE · RADIAL SINC — """

    clipsat_track = "FOURIER OPTICS & MULTIVARIABLE · RADIAL SINC"

    def construct(self):
        header = self.build_exam_header("FOURIER OPTICS & MULTIVARIABLE · RADIAL SINC", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class HopfFibrationS3Scene(ClipSATScene):
    """DIFFERENTIAL TOPOLOGY · HOPF BUNDLE S¹ → S³ → S² — """

    clipsat_track = "DIFFERENTIAL TOPOLOGY · HOPF BUNDLE S¹ → S³ → S²"

    def construct(self):
        header = self.build_exam_header("DIFFERENTIAL TOPOLOGY · HOPF BUNDLE S¹ → S³ → S²", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class HelicoidCatenoid3DScene(ClipSATScene):
    """DIFFERENTIAL GEOMETRY · MINIMAL SURFACES (H = 0) — """

    clipsat_track = "DIFFERENTIAL GEOMETRY · MINIMAL SURFACES (H = 0)"

    def construct(self):
        header = self.build_exam_header("DIFFERENTIAL GEOMETRY · MINIMAL SURFACES (H = 0)", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class TangentPlane3DScene(ClipSATScene):
    """AP / UNIVERSITY CALCULUS III · LINEARIZATION — """

    clipsat_track = "AP / UNIVERSITY CALCULUS III · LINEARIZATION"

    def construct(self):
        header = self.build_exam_header("AP / UNIVERSITY CALCULUS III · LINEARIZATION", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class PartialDerivatives3DScene(ClipSATScene):
    """CALCULUS III · PARTIAL DERIVATIVES — """

    clipsat_track = "CALCULUS III · PARTIAL DERIVATIVES"

    def construct(self):
        header = self.build_exam_header("CALCULUS III · PARTIAL DERIVATIVES", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class DirectionalDerivative3DScene(ClipSATScene):
    """CALCULUS III · DIRECTIONAL DERIVATIVES — """

    clipsat_track = "CALCULUS III · DIRECTIONAL DERIVATIVES"

    def construct(self):
        header = self.build_exam_header("CALCULUS III · DIRECTIONAL DERIVATIVES", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class SphericalGeodesicTriangleScene(ClipSATScene):
    """RIEMANNIAN GEOMETRY · GAUSS-BONNET ON S² — """

    clipsat_track = "RIEMANNIAN GEOMETRY · GAUSS-BONNET ON S²"

    def construct(self):
        header = self.build_exam_header("RIEMANNIAN GEOMETRY · GAUSS-BONNET ON S²", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class HessianClassification3DScene(ClipSATScene):
    """MULTIVARIABLE CALCULUS · EXTREMA CLASSIFICATION — """

    clipsat_track = "MULTIVARIABLE CALCULUS · EXTREMA CLASSIFICATION"

    def construct(self):
        header = self.build_exam_header("MULTIVARIABLE CALCULUS · EXTREMA CLASSIFICATION", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class LagrangeCylinder3DScene(ClipSATScene):
    """MULTIVARIABLE OPTIMIZATION · CONSTRAINED EXTREMA — """

    clipsat_track = "MULTIVARIABLE OPTIMIZATION · CONSTRAINED EXTREMA"

    def construct(self):
        header = self.build_exam_header("MULTIVARIABLE OPTIMIZATION · CONSTRAINED EXTREMA", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class EnneperMinimalSurfaceScene(ClipSATScene):
    """WEIERSTRASS-ENNEPER REPRESENTATION · H = 0 — """

    clipsat_track = "WEIERSTRASS-ENNEPER REPRESENTATION · H = 0"

    def construct(self):
        header = self.build_exam_header("WEIERSTRASS-ENNEPER REPRESENTATION · H = 0", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class OloidDevelopableHullScene(ClipSATScene):
    """CONVEX & KINEMATIC 3D GEOMETRY · PAUL SCHATZ OLOID — """

    clipsat_track = "CONVEX & KINEMATIC 3D GEOMETRY · PAUL SCHATZ OLOID"

    def construct(self):
        header = self.build_exam_header("CONVEX & KINEMATIC 3D GEOMETRY · PAUL SCHATZ OLOID", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class ImplicitLevelSurface3DScene(ClipSATScene):
    """VECTOR CALCULUS · EQUIPOTENTIAL SURFACES — """

    clipsat_track = "VECTOR CALCULUS · EQUIPOTENTIAL SURFACES"

    def construct(self):
        header = self.build_exam_header("VECTOR CALCULUS · EQUIPOTENTIAL SURFACES", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class ChainRulePath3DScene(ClipSATScene):
    """CALCULUS III · MULTIVARIABLE CHAIN RULE — """

    clipsat_track = "CALCULUS III · MULTIVARIABLE CHAIN RULE"

    def construct(self):
        header = self.build_exam_header("CALCULUS III · MULTIVARIABLE CHAIN RULE", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class DoubleIntegralColumns3DScene(ClipSATScene):
    """CALCULUS III · DOUBLE INTEGRALS — """

    clipsat_track = "CALCULUS III · DOUBLE INTEGRALS"

    def construct(self):
        header = self.build_exam_header("CALCULUS III · DOUBLE INTEGRALS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class FubiniSlices3DScene(ClipSATScene):
    """CALCULUS III · ITERATED INTEGRALS — """

    clipsat_track = "CALCULUS III · ITERATED INTEGRALS"

    def construct(self):
        header = self.build_exam_header("CALCULUS III · ITERATED INTEGRALS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class CylindricalCoords3DScene(ClipSATScene):
    """CALCULUS III · 3D COORDINATE SYSTEMS — """

    clipsat_track = "CALCULUS III · 3D COORDINATE SYSTEMS"

    def construct(self):
        header = self.build_exam_header("CALCULUS III · 3D COORDINATE SYSTEMS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class SphericalCoords3DScene(ClipSATScene):
    """CALCULUS III · SPHERICAL INTEGRALS — """

    clipsat_track = "CALCULUS III · SPHERICAL INTEGRALS"

    def construct(self):
        header = self.build_exam_header("CALCULUS III · SPHERICAL INTEGRALS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class SteinmetzBicylinderScene(ClipSATScene):
    """ARCHIMEDEAN SOLID GEOMETRY · INTERSECTING CYLINDERS — """

    clipsat_track = "ARCHIMEDEAN SOLID GEOMETRY · INTERSECTING CYLINDERS"

    def construct(self):
        header = self.build_exam_header("ARCHIMEDEAN SOLID GEOMETRY · INTERSECTING CYLINDERS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class PappusTorus3DScene(ClipSATScene):
    """CLASSICAL & CALCULUS GEOMETRY · PAPPUS THEOREM — """

    clipsat_track = "CLASSICAL & CALCULUS GEOMETRY · PAPPUS THEOREM"

    def construct(self):
        header = self.build_exam_header("CLASSICAL & CALCULUS GEOMETRY · PAPPUS THEOREM", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class Cavalieri3DSolidsScene(ClipSATScene):
    """ARCHIMEDES & 3D GEOMETRY · CAVALIERI PRINCIPLE — """

    clipsat_track = "ARCHIMEDES & 3D GEOMETRY · CAVALIERI PRINCIPLE"

    def construct(self):
        header = self.build_exam_header("ARCHIMEDES & 3D GEOMETRY · CAVALIERI PRINCIPLE", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class TripleIntegralTetrahedron3DScene(ClipSATScene):
    """CALCULUS III · TRIPLE INTEGRALS — """

    clipsat_track = "CALCULUS III · TRIPLE INTEGRALS"

    def construct(self):
        header = self.build_exam_header("CALCULUS III · TRIPLE INTEGRALS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class FrenetSerretHelix3DScene(ClipSATScene):
    """DIFFERENTIAL GEOMETRY · SPACE CURVES — """

    clipsat_track = "DIFFERENTIAL GEOMETRY · SPACE CURVES"

    def construct(self):
        header = self.build_exam_header("DIFFERENTIAL GEOMETRY · SPACE CURVES", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class VivianiCurve3DScene(ClipSATScene):
    """3D DIFFERENTIAL GEOMETRY · SPACE INTERSECTIONS — """

    clipsat_track = "3D DIFFERENTIAL GEOMETRY · SPACE INTERSECTIONS"

    def construct(self):
        header = self.build_exam_header("3D DIFFERENTIAL GEOMETRY · SPACE INTERSECTIONS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class TrefoilKnot3DScene(ClipSATScene):
    """LOW-DIMENSIONAL TOPOLOGY · KNOT THEORY — """

    clipsat_track = "LOW-DIMENSIONAL TOPOLOGY · KNOT THEORY"

    def construct(self):
        header = self.build_exam_header("LOW-DIMENSIONAL TOPOLOGY · KNOT THEORY", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class MobiusStrip3DScene(ClipSATScene):
    """DIFFERENTIAL TOPOLOGY · NON-ORIENTABILITY — """

    clipsat_track = "DIFFERENTIAL TOPOLOGY · NON-ORIENTABILITY"

    def construct(self):
        header = self.build_exam_header("DIFFERENTIAL TOPOLOGY · NON-ORIENTABILITY", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class TorusVillarceau3DScene(ClipSATScene):
    """3D DIFFERENTIAL GEOMETRY · TORUS FAMILIES — """

    clipsat_track = "3D DIFFERENTIAL GEOMETRY · TORUS FAMILIES"

    def construct(self):
        header = self.build_exam_header("3D DIFFERENTIAL GEOMETRY · TORUS FAMILIES", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class VectorField3DRotDivScene(ClipSATScene):
    """VECTOR CALCULUS · 3D CURL & DIVERGENCE — """

    clipsat_track = "VECTOR CALCULUS · 3D CURL & DIVERGENCE"

    def construct(self):
        header = self.build_exam_header("VECTOR CALCULUS · 3D CURL & DIVERGENCE", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class GaussDivergenceFlux3DScene(ClipSATScene):
    """VECTOR CALCULUS · GAUSS DIVERGENCE THEOREM — """

    clipsat_track = "VECTOR CALCULUS · GAUSS DIVERGENCE THEOREM"

    def construct(self):
        header = self.build_exam_header("VECTOR CALCULUS · GAUSS DIVERGENCE THEOREM", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class StokesTheoremCap3DScene(ClipSATScene):
    """VECTOR CALCULUS · KELVIN-STOKES THEOREM — """

    clipsat_track = "VECTOR CALCULUS · KELVIN-STOKES THEOREM"

    def construct(self):
        header = self.build_exam_header("VECTOR CALCULUS · KELVIN-STOKES THEOREM", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class CrossProduct3DScene(ClipSATScene):
    """LINEAR ALGEBRA & 3D VECTORS · CROSS PRODUCT — """

    clipsat_track = "LINEAR ALGEBRA & 3D VECTORS · CROSS PRODUCT"

    def construct(self):
        header = self.build_exam_header("LINEAR ALGEBRA & 3D VECTORS · CROSS PRODUCT", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class ParallelepipedVolume3DScene(ClipSATScene):
    """LINEAR ALGEBRA · 3×3 DETERMINANTS IN 3D — """

    clipsat_track = "LINEAR ALGEBRA · 3×3 DETERMINANTS IN 3D"

    def construct(self):
        header = self.build_exam_header("LINEAR ALGEBRA · 3×3 DETERMINANTS IN 3D", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class PlaneNormalDistance3DScene(ClipSATScene):
    """IB MATH AA HL / 3D GEOMETRY · PLANES IN R³ — """

    clipsat_track = "IB MATH AA HL / 3D GEOMETRY · PLANES IN R³"

    def construct(self):
        header = self.build_exam_header("IB MATH AA HL / 3D GEOMETRY · PLANES IN R³", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class SkewLinesDistance3DScene(ClipSATScene):
    """IB MATH AA HL · SKEW LINES IN 3D SPACE — """

    clipsat_track = "IB MATH AA HL · SKEW LINES IN 3D SPACE"

    def construct(self):
        header = self.build_exam_header("IB MATH AA HL · SKEW LINES IN 3D SPACE", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class SVD3DEllipsoidScene(ClipSATScene):
    """UNIVERSITY LINEAR ALGEBRA · 3D SVD GEOMETRY — """

    clipsat_track = "UNIVERSITY LINEAR ALGEBRA · 3D SVD GEOMETRY"

    def construct(self):
        header = self.build_exam_header("UNIVERSITY LINEAR ALGEBRA · 3D SVD GEOMETRY", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class RodriguesRotation3DScene(ClipSATScene):
    """3D LIE GROUPS SO(3) & COMPUTER GRAPHICS — """

    clipsat_track = "3D LIE GROUPS SO(3) & COMPUTER GRAPHICS"

    def construct(self):
        header = self.build_exam_header("3D LIE GROUPS SO(3) & COMPUTER GRAPHICS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class PlatonicSolidsEuler3DScene(ClipSATScene):
    """3D COMBINATORIAL TOPOLOGY · PLATONIC SOLIDS — """

    clipsat_track = "3D COMBINATORIAL TOPOLOGY · PLATONIC SOLIDS"

    def construct(self):
        header = self.build_exam_header("3D COMBINATORIAL TOPOLOGY · PLATONIC SOLIDS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class StereographicProjection3DScene(ClipSATScene):
    """COMPLEX ANALYSIS & 3D GEOMETRY · RIEMANN SPHERE — """

    clipsat_track = "COMPLEX ANALYSIS & 3D GEOMETRY · RIEMANN SPHERE"

    def construct(self):
        header = self.build_exam_header("COMPLEX ANALYSIS & 3D GEOMETRY · RIEMANN SPHERE", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class LorenzAttractor3DScene(ClipSATScene):
    """NONLINEAR DYNAMICS & 3D ODEs · CHAOS THEORY — """

    clipsat_track = "NONLINEAR DYNAMICS & 3D ODEs · CHAOS THEORY"

    def construct(self):
        header = self.build_exam_header("NONLINEAR DYNAMICS & 3D ODEs · CHAOS THEORY", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class RosslerAttractor3DScene(ClipSATScene):
    """NONLINEAR DYNAMICS · 3D PHASE SPACE FOLDING — """

    clipsat_track = "NONLINEAR DYNAMICS · 3D PHASE SPACE FOLDING"

    def construct(self):
        header = self.build_exam_header("NONLINEAR DYNAMICS · 3D PHASE SPACE FOLDING", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class MembraneEigenmode3DScene(ClipSATScene):
    """PARTIAL DIFFERENTIAL EQUATIONS · 2D WAVE EQUATION — """

    clipsat_track = "PARTIAL DIFFERENTIAL EQUATIONS · 2D WAVE EQUATION"

    def construct(self):
        header = self.build_exam_header("PARTIAL DIFFERENTIAL EQUATIONS · 2D WAVE EQUATION", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class MagneticCyclotron3DScene(ClipSATScene):
    """ELECTRODYNAMICS & 3D ODEs · LORENTZ FORCE — """

    clipsat_track = "ELECTRODYNAMICS & 3D ODEs · LORENTZ FORCE"

    def construct(self):
        header = self.build_exam_header("ELECTRODYNAMICS & 3D ODEs · LORENTZ FORCE", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class Kepler3DOrbitScene(ClipSATScene):
    """CELESTIAL MECHANICS · 3D ORBITAL ELEMENTS — """

    clipsat_track = "CELESTIAL MECHANICS · 3D ORBITAL ELEMENTS"

    def construct(self):
        header = self.build_exam_header("CELESTIAL MECHANICS · 3D ORBITAL ELEMENTS", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)


class BlochSphereQubit3DScene(ClipSATScene):
    """QUANTUM COMPUTING & SU(2) · BLOCH SPHERE — """

    clipsat_track = "QUANTUM COMPUTING & SU(2) · BLOCH SPHERE"

    def construct(self):
        header = self.build_exam_header("QUANTUM COMPUTING & SU(2) · BLOCH SPHERE", "")
        self.add(header)
        axes = ThreeDAxes(
            x_range=(-3.0, 3.0, 1.0),
            y_range=(-3.0, 3.0, 1.0),
            z_range=(-2.5, 2.5, 1.0),
            width=7.5,
            height=7.5,
            depth=5.5,
        ).shift(DOWN * 0.35 + LEFT * 1.1)
        surface = ParametricSurface(
            lambda u, v: axes.c2p(u, v, 0.45 * (u**2 - v**2)),
            u_range=(-1.6, 1.6),
            v_range=(-1.6, 1.6),
            color=self.theme.indigo,
            opacity=0.82,
        )
        self.play(ShowCreation(axes), ShowCreation(surface), run_time=2.4)
        self.wait(1.0)
