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
