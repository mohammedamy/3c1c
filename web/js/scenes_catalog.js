/* ==========================================================================
   3c1c · ClipSAT Extended Curriculum Scene Catalog (Scenes #12 – #100)
   Zero-Redundancy Edition: Every Scene Has a Unique Concept & Bespoke Visual
   ========================================================================== */

export const EXTENDED_SCENE_PRESETS = [
  {
    "id": "mvt",
    "category": "Calculus",
    "name": "Mean Value Theorem (MVT)",
    "track": "AP Calculus AB · Theorem",
    "glyph": "f′(c)",
    "sceneClass": "MeanValueTheoremScene",
    "archetype": "calculus_thm",
    "subType": "mvt",
    "duration": 6,
    "summary": "Finds point c ∈ (a,b) where instantaneous tangent slope equals average secant slope.",
    "dragHint": "Drag endpoint b horizontally to update secant slope and witness c shift automatically",
    "defaults": {
      "track": "AP CALCULUS AB · MEAN VALUE THEOREM",
      "title": "Lagrange's Mean Value Theorem: f'(c) = [f(b) − f(a)] / (b − a)",
      "a": -1.4,
      "b": 2.1
    },
    "controls": [
      {
        "id": "ctrl-a",
        "key": "a",
        "label": "Left Endpoint a",
        "min": -2.2,
        "max": 0.5,
        "step": 0.05,
        "drag": "x2"
      },
      {
        "id": "ctrl-b",
        "key": "b",
        "label": "Right Endpoint b",
        "min": 0.6,
        "max": 2.6,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Smooth Curve",
        "time": 0
      },
      {
        "label": "2 · SecantChord AB",
        "time": 1.4
      },
      {
        "label": "3 · Parallel Sweep",
        "time": 2.8
      },
      {
        "label": "4 · Tangent Point c",
        "time": 4.4
      }
    ],
    "rigor": {
      "badge": "EXISTENCE THEOREM",
      "heading": "Mean Value Theorem for Derivatives",
      "latex": "f'(c) = \\frac{f(b) - f(a)}{b - a} \\quad \\text{for some } c \\in (a, b)",
      "prose": "If f is continuous on [a,b] and differentiable on (a,b), at least one interior point c has an instantaneous tangent parallel to the secant chord."
    }
  },
  {
    "id": "ftc_accum",
    "category": "Calculus",
    "name": "Fundamental Theorem Accumulation",
    "track": "AP Calculus AB/BC · FTC Part 1",
    "glyph": "∫→d/dx",
    "sceneClass": "FTCAccumulationScene",
    "archetype": "calculus_thm",
    "subType": "ftc",
    "duration": 6.2,
    "summary": "Links the signed area function A(x) = ∫₀ˣ f(t) dt directly to its derivative A′(x) = f(x).",
    "dragHint": "Drag upper limit x across the axis to watch accumulation A(x) and slope A′(x) = f(x)",
    "defaults": {
      "track": "AP CALCULUS · FUNDAMENTAL THEOREM PART 1",
      "title": "Accumulation Function A(x) = ∫ f(t) dt & Rate A′(x) = f(x)",
      "xUpper": 2.2,
      "freq": 1
    },
    "controls": [
      {
        "id": "ctrl-xupper",
        "key": "xUpper",
        "label": "Upper Limit x",
        "min": -2.8,
        "max": 3.2,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-freq",
        "key": "freq",
        "label": "Wave Frequency ω",
        "min": 0.5,
        "max": 1.8,
        "step": 0.05
      }
    ],
    "beats": [
      {
        "label": "1 · Integrand f(t)",
        "time": 0
      },
      {
        "label": "2 · Area Sweep",
        "time": 1.5
      },
      {
        "label": "3 · Antiderivative A(x)",
        "time": 3.1
      },
      {
        "label": "4 · A′(x) = f(x)",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "BRIDGE OF CALCULUS",
      "heading": "Fundamental Theorem of Calculus (Part 1)",
      "latex": "\\frac{d}{dx}\\left[\\int_0^x f(t)\\,dt\\right] = f(x)",
      "prose": "The instantaneous rate at which signed area accumulates under f(t) at boundary x is equal to the height of the curve f(x) itself."
    }
  },
  {
    "id": "lhopital",
    "category": "Calculus",
    "name": "L'Hôpital's Rule Local Zoom",
    "track": "AP Calculus BC · Limits",
    "glyph": "0/0",
    "sceneClass": "LHopitalLocalZoomScene",
    "archetype": "calculus_thm",
    "subType": "lhopital",
    "duration": 6,
    "summary": "Zooms into an indeterminate 0/0 limit at x = a to reveal the ratio of tangent slopes f′(a)/g′(a).",
    "dragHint": "Drag zoom factor or frequency k to compare sin(kx) vs. ln(1+x) near x = 0",
    "defaults": {
      "track": "AP CALCULUS · L'HÔPITAL'S RULE",
      "title": "Indeterminate 0/0 Limit via Local Tangent Linearization",
      "kParam": 2.4,
      "zoom": 1.8
    },
    "controls": [
      {
        "id": "ctrl-kparam",
        "key": "kParam",
        "label": "Numerator Slope k",
        "min": 0.6,
        "max": 4,
        "step": 0.1,
        "drag": "y"
      },
      {
        "id": "ctrl-zoom",
        "key": "zoom",
        "label": "Microscope Zoom ×",
        "min": 1,
        "max": 5,
        "step": 0.1,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · f(x) & g(x) at 0",
        "time": 0
      },
      {
        "label": "2 · 0/0 Crossing",
        "time": 1.5
      },
      {
        "label": "3 · Local Zoom",
        "time": 3
      },
      {
        "label": "4 · Slope Ratio f′/g′",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "INDETERMINATE FORMS",
      "heading": "L'Hôpital's Rule via Linear Approximation",
      "latex": "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(a)(x-a)}{g'(a)(x-a)} = \\frac{f'(a)}{g'(a)}",
      "prose": "When both functions vanish at x = a, zooming in makes both curves indistinguishable from their tangent lines, reducing their ratio to the ratio of slopes."
    }
  },
  {
    "id": "arclength",
    "category": "Calculus",
    "name": "Arc Length Polygonal Rectification",
    "track": "AP Calculus BC · Integration",
    "glyph": "∫ds",
    "sceneClass": "ArcLengthRectificationScene",
    "archetype": "calculus_thm",
    "subType": "arclength",
    "duration": 6.2,
    "summary": "Approximates curve length using N hypotenuse chords √(Δx² + Δy²) converging to ∫√(1 + f′(x)²) dx.",
    "dragHint": "Drag segment count N or amplitude A to watch polygonal chords hug the curve",
    "defaults": {
      "track": "AP CALCULUS BC · ARC LENGTH",
      "title": "Polygonal Chord Rectification: ds = √(1 + [f′(x)]²) dx",
      "segments": 8,
      "amp": 1.4
    },
    "controls": [
      {
        "id": "ctrl-segments",
        "key": "segments",
        "label": "Polygonal Chords N",
        "min": 2,
        "max": 32,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-amp",
        "key": "amp",
        "label": "Curve Amplitude A",
        "min": 0.4,
        "max": 2.2,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Smooth Curve",
        "time": 0
      },
      {
        "label": "2 · Coarse Chords",
        "time": 1.4
      },
      {
        "label": "3 · Δs = √(dx²+dy²)",
        "time": 3
      },
      {
        "label": "4 · Exact Integral",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "RECTIFICATION",
      "heading": "Arc Length Differential Element",
      "latex": "L = \\int_a^b \\sqrt{1 + \\left[f'(x)\\right]^2}\\,dx = \\lim_{N\\to\\infty}\\sum_{i=1}^N \\sqrt{\\Delta x^2 + \\Delta y_i^2}",
      "prose": "Applying the Pythagorean theorem to each infinitesimal run dx and rise dy = f′(x)dx yields the arc length integrand."
    }
  },
  {
    "id": "weierstrass_fractal",
    "category": "Calculus",
    "name": "Weierstrass Nowhere-Differentiable Monster Curve",
    "track": "Real Analysis · Pathological Functions",
    "glyph": "∑aⁿcos",
    "sceneClass": "WeierstrassFractalScene",
    "archetype": "calculus_thm",
    "subType": "weierstrass",
    "duration": 6.4,
    "summary": "Constructs Weierstrass’s everywhere-continuous, nowhere-differentiable fractal curve ∑ aⁿ cos(bⁿ π x) where secant slopes diverge at every scale.",
    "dragHint": "Drag harmonic depth N or roughness factor a to witness fractal secant slope oscillation",
    "defaults": {
      "track": "REAL ANALYSIS · PATHOLOGICAL CONTINUITY",
      "title": "Weierstrass Function: Continuous Everywhere, Differentiable Nowhere",
      "harmonicsN": 6,
      "roughA": 0.55
    },
    "controls": [
      {
        "id": "ctrl-harmonicsn",
        "key": "harmonicsN",
        "label": "Fractal Harmonics N",
        "min": 1,
        "max": 10,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-rougha",
        "key": "roughA",
        "label": "Amplitude Decay a",
        "min": 0.35,
        "max": 0.75,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Base Cosine k=0",
        "time": 0
      },
      {
        "label": "2 · High-Freq Cascade",
        "time": 1.5
      },
      {
        "label": "3 · ab > 1 + 3π/2",
        "time": 3.1
      },
      {
        "label": "4 · Divergent Secants",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "REAL ANALYSIS MONSTER",
      "heading": "Weierstrass Nondifferentiable Series (1872)",
      "latex": "W(x) = \\sum_{n=0}^{\\infty} a^n \\cos(b^n \\pi x), \\quad 0 < a < 1,\\; ab > 1 + \\frac{3}{2}\\pi",
      "prose": "Because each frequency multiplier bⁿ amplifies the derivative by (ab)ⁿ > 1, the difference quotient [W(x+h)−W(x)]/h oscillates without limit as h → 0 at every point x."
    }
  },
  {
    "id": "implicit_diff",
    "category": "Calculus",
    "name": "Implicit Differentiation on Folium",
    "track": "AP Calculus AB · Derivatives",
    "glyph": "dy/dx",
    "sceneClass": "ImplicitFoliumScene",
    "archetype": "calculus_thm",
    "subType": "implicit",
    "duration": 6,
    "summary": "Traces tangent vectors along the level curve x² + 2xy + 3y² = C where y is not a single function of x.",
    "dragHint": "Drag angle parameter t around the tilted ellipse to inspect dy/dx = −Fₓ / Fᵧ",
    "defaults": {
      "track": "AP CALCULUS · IMPLICIT DIFFERENTIATION",
      "title": "Implicit Curve Tangents: dy/dx = −(∂F/∂x) / (∂F/∂y)",
      "paramT": 55,
      "ecc": 0.6
    },
    "controls": [
      {
        "id": "ctrl-paramt",
        "key": "paramT",
        "label": "Curve Parameter θ (deg)",
        "min": 0,
        "max": 360,
        "step": 3,
        "drag": "angle"
      },
      {
        "id": "ctrl-ecc",
        "key": "ecc",
        "label": "Cross-Term Coupling c",
        "min": 0,
        "max": 1.2,
        "step": 0.05
      }
    ],
    "beats": [
      {
        "label": "1 · Implicit Locus",
        "time": 0
      },
      {
        "label": "2 · Normal Gradient ∇F",
        "time": 1.5
      },
      {
        "label": "3 · Orthogonal Tangent",
        "time": 3
      },
      {
        "label": "4 · Horizontal/Vertical Crit",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "IMPLICIT CALCULUS",
      "heading": "Chain Rule on Level Curves F(x, y) = C",
      "latex": "\\frac{\\partial F}{\\partial x} + \\frac{\\partial F}{\\partial y}\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{F_x(x,y)}{F_y(x,y)}",
      "prose": "Differentiating both sides with respect to x treats y as an implicit function y(x), revealing horizontal tangents where Fₓ = 0 and vertical tangents where Fᵧ = 0."
    }
  },
  {
    "id": "epsilon_delta_game",
    "category": "Calculus",
    "name": "Cauchy ε-δ Limit Rigor Challenge",
    "track": "AP Calculus BC · Foundations of Analysis",
    "glyph": "∀ε∃δ",
    "sceneClass": "EpsilonDeltaLimitScene",
    "archetype": "calculus_thm",
    "subType": "epsilon_delta",
    "duration": 6.2,
    "summary": "Visualizes the adversarial ∀ε > 0 ∃δ > 0 game: shrinking the horizontal ε-band around L forces a tighter vertical δ-corridor around x₀.",
    "dragHint": "Drag tolerance ε or probe point x₀ to see the maximal valid δ-corridor update automatically",
    "defaults": {
      "track": "REAL ANALYSIS · CAUCHY-WEIERSTRASS LIMIT DEFINITION",
      "title": "The ε-δ Limit Game: 0 < |x − x₀| < δ ⟹ |f(x) − L| < ε",
      "eps": 0.55,
      "x0": 1.1
    },
    "controls": [
      {
        "id": "ctrl-eps",
        "key": "eps",
        "label": "Target Tolerance ε",
        "min": 0.15,
        "max": 1.1,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-x0",
        "key": "x0",
        "label": "Limit Point x₀",
        "min": -1.2,
        "max": 1.8,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Target Limit (x₀, L)",
        "time": 0
      },
      {
        "label": "2 · Challenger Sets ε-Band",
        "time": 1.5
      },
      {
        "label": "3 · Prover Finds δ-Box",
        "time": 3.1
      },
      {
        "label": "4 · Graph Trapped in Box",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "FORMAL LIMIT PROOF",
      "heading": "Cauchy-Weierstrass ε-δ Definition of a Limit",
      "latex": "\\forall \\varepsilon > 0\\;\\exists \\delta > 0 \\text{ s.t. } 0 < |x - x_0| < \\delta \\implies |f(x) - L| < \\varepsilon",
      "prose": "No matter how narrow the horizontal Amber tolerance tunnel (L−ε, L+ε) is chosen, a non-zero Teal corridor (x₀−δ, x₀+δ) keeps the entire curve segment strictly inside the proof rectangle."
    }
  },
  {
    "id": "darboux_squeeze",
    "category": "Calculus",
    "name": "Darboux Upper & Lower Sums Squeeze",
    "track": "Real Analysis · Riemann Integrability",
    "glyph": "U−L→0",
    "sceneClass": "DarbouxSumsSqueezeScene",
    "archetype": "calculus_thm",
    "subType": "darboux",
    "duration": 6,
    "summary": "Traps the exact integral between inscribed Lower Darboux rectangles L(f,P) = ∑ mᵢΔx and circumscribed Upper Darboux rectangles U(f,P) = ∑ MᵢΔx.",
    "dragHint": "Drag partition count N to squeeze the Amber oscillation gap U(f,P) − L(f,P) → 0",
    "defaults": {
      "track": "REAL ANALYSIS · DARBOUX INTEGRABILITY CRITERION",
      "title": "Darboux Squeeze: L(f, P) ≤ ∫ f(x) dx ≤ U(f, P)",
      "partsN": 8,
      "steepK": 1.1
    },
    "controls": [
      {
        "id": "ctrl-partsn",
        "key": "partsN",
        "label": "Partition Subintervals N",
        "min": 3,
        "max": 24,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-steepk",
        "key": "steepK",
        "label": "Curve Steepness k",
        "min": 0.5,
        "max": 1.8,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Monotone Curve",
        "time": 0
      },
      {
        "label": "2 · Infimum Sum L(f,P)",
        "time": 1.4
      },
      {
        "label": "3 · Supremum Sum U(f,P)",
        "time": 2.9
      },
      {
        "label": "4 · Oscillation Gap U−L→0",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "INTEGRABILITY CRITERION",
      "heading": "Upper and Lower Darboux Integrals",
      "latex": "U(f,P) - L(f,P) = \\sum_{i=1}^N \\left(\\sup_{[x_{i-1},x_i]} f - \\inf_{[x_{i-1},x_i]} f\\right)\\Delta x_i < \\varepsilon",
      "prose": "A bounded function is Riemann integrable on [a,b] if and only if the difference between its upper supremum step sum and lower infimum step sum vanishes as the partition mesh refines."
    }
  },
  {
    "id": "cantor_staircase",
    "category": "Calculus",
    "name": "Cantor Set & The Devil’s Staircase",
    "track": "Real Analysis · Measure Theory & Fractals",
    "glyph": "ln2/ln3",
    "sceneClass": "CantorDevilsStaircaseScene",
    "archetype": "calculus_thm",
    "subType": "cantor",
    "duration": 6.2,
    "summary": "Removes middle thirds recursively to build the zero-measure Cantor dust alongside the continuous Devil’s Staircase F(x) with F′(x) = 0 almost everywhere.",
    "dragHint": "Drag recursion depth k to subdivide the middle-third terraces of the Devil’s Staircase",
    "defaults": {
      "track": "MEASURE THEORY · SINGULAR CONTINUOUS FUNCTIONS",
      "title": "Cantor Ternary Function: Derivative 0 Almost Everywhere Yet ΔF = 1",
      "depthK": 4,
      "gapRatio": 0.33
    },
    "controls": [
      {
        "id": "ctrl-depthk",
        "key": "depthK",
        "label": "Cantor Recursion Stage k",
        "min": 1,
        "max": 6,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-gapratio",
        "key": "gapRatio",
        "label": "Removed Middle Fraction",
        "min": 0.2,
        "max": 0.5,
        "step": 0.02,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Middle-Third Removal",
        "time": 0
      },
      {
        "label": "2 · Cantor Bars (2/3)^k",
        "time": 1.5
      },
      {
        "label": "3 · Binary Terrace Steps",
        "time": 3.1
      },
      {
        "label": "4 · Singular Staircase",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "SINGULAR MEASURE",
      "heading": "Cantor Ternary Set & Devil’s Staircase",
      "latex": "\\mu(\\mathcal{C}) = \\lim_{k\\to\\infty}\\left(\\frac{2}{3}\\right)^k = 0, \\qquad \\dim_H(\\mathcal{C}) = \\frac{\\ln 2}{\\ln 3} \\approx 0.6309",
      "prose": "Although the removed open middle thirds have total length 1/3 + 2/9 + 4/27 + ⋯ = 1, the remaining Cantor set is uncountable and supports a continuous CDF that climbs from 0 to 1 with zero derivative almost everywhere."
    }
  },
  {
    "id": "greens_theorem_curl",
    "category": "Calculus",
    "name": "Green’s Theorem Microscopic Curl Cancellation",
    "track": "Vector Calculus · Circulation & Curl",
    "glyph": "∮=∬∇×F",
    "sceneClass": "GreensTheoremCurlScene",
    "archetype": "calculus_thm",
    "subType": "greens_curl",
    "duration": 6.2,
    "summary": "Decomposes a 2D domain D into a grid of microscopic counterclockwise curl loops whose shared interior edges cancel, leaving only the outer boundary integral ∮ F·dr.",
    "dragHint": "Drag grid resolution N or curl vorticity ω to watch interior edges cancel in opposite pairs",
    "defaults": {
      "track": "VECTOR CALCULUS · GREEN'S CIRCULATION THEOREM",
      "title": "Green's Theorem: ∮_∂D (P dx + Q dy) = ∬_D (∂Q/∂x − ∂P/∂y) dA",
      "cellN": 4,
      "vorticity": 1.4
    },
    "controls": [
      {
        "id": "ctrl-celln",
        "key": "cellN",
        "label": "Micro-Loop Grid N×N",
        "min": 2,
        "max": 7,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-vorticity",
        "key": "vorticity",
        "label": "2D Curl (∂Q/∂x − ∂P/∂y)",
        "min": 0.4,
        "max": 2.5,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Macroscopic Rim ∂D",
        "time": 0
      },
      {
        "label": "2 · Microscopic Curl Cells",
        "time": 1.5
      },
      {
        "label": "3 · Interior Edge Cancellation",
        "time": 3.1
      },
      {
        "label": "4 · Boundary Circulation",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "BOUNDARY-INTERIOR DUALITY",
      "heading": "Green’s Theorem in the Plane",
      "latex": "\\oint_{\\partial D} \\left(P\\,dx + Q\\,dy\\right) = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dA",
      "prose": "Every interior grid edge is traversed in opposite directions by two adjacent micro-cells and cancels out, proving that summing microscopic 2D curl over the interior equals macroscopic circulation around the boundary."
    }
  },
  {
    "id": "newton_raphson",
    "category": "Calculus",
    "name": "Newton-Raphson Tangent Root Finder",
    "track": "Numerical Analysis · Calculus",
    "glyph": "xₙ₊₁",
    "sceneClass": "NewtonRaphsonScene",
    "archetype": "numerical",
    "subType": "newton",
    "duration": 6.2,
    "summary": "Iterates xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ) via tangent x-intercepts with quadratic convergence.",
    "dragHint": "Drag initial guess x₀ along the x-axis to see the tangent staircase converge to √c",
    "defaults": {
      "track": "NUMERICAL ANALYSIS · NEWTON-RAPHSON METHOD",
      "title": "Newton's Method: xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)",
      "x0": 3.1,
      "cTarget": 2
    },
    "controls": [
      {
        "id": "ctrl-x0",
        "key": "x0",
        "label": "Initial Guess x₀",
        "min": 0.5,
        "max": 3.6,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-ctarget",
        "key": "cTarget",
        "label": "Target Constant c (x² − c = 0)",
        "min": 0.5,
        "max": 5,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Initial Guess x₀",
        "time": 0
      },
      {
        "label": "2 · Tangent 1 → x₁",
        "time": 1.5
      },
      {
        "label": "3 · Tangent 2 → x₂",
        "time": 3.1
      },
      {
        "label": "4 · Quadratic Lock √c",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "QUADRATIC CONVERGENCE",
      "heading": "Newton-Raphson Linearization Step",
      "latex": "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}, \\qquad |e_{n+1}| \\approx \\left|\\frac{f''(r)}{2f'(r)}\\right| e_n^2",
      "prose": "Each step replaces the nonlinear curve with its local tangent line and jumps to its x-intercept, roughly doubling the number of correct digits per step."
    }
  },
  {
    "id": "secant_method",
    "category": "Calculus",
    "name": "Secant Method Derivative-Free Root Finder",
    "track": "Numerical Analysis · Roots",
    "glyph": "Δx/Δf",
    "sceneClass": "SecantRootMethodScene",
    "archetype": "numerical",
    "subType": "secant_root",
    "duration": 6,
    "summary": "Finds roots without derivatives using two-point secant chords xₙ₊₁ = xₙ − f(xₙ)(xₙ−xₙ₋₁)/(f(xₙ)−f(xₙ₋₁)).",
    "dragHint": "Drag starting anchor x₀ to watch successive secant lines zero in on the root",
    "defaults": {
      "track": "NUMERICAL ANALYSIS · SECANT ROOT METHOD",
      "title": "Derivative-Free Secant Iteration (Order φ ≈ 1.618)",
      "x0": 3.3,
      "x1": 2.4
    },
    "controls": [
      {
        "id": "ctrl-x0",
        "key": "x0",
        "label": "First Anchor x₀",
        "min": 1.6,
        "max": 3.6,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-x1",
        "key": "x1",
        "label": "Second Anchor x₁",
        "min": 0.4,
        "max": 2.8,
        "step": 0.05,
        "drag": "x2"
      }
    ],
    "beats": [
      {
        "label": "1 · Anchor Pair (x₀,x₁)",
        "time": 0
      },
      {
        "label": "2 · Chord Intercept x₂",
        "time": 1.5
      },
      {
        "label": "3 · Chord Intercept x₃",
        "time": 3
      },
      {
        "label": "4 · Golden Order φ",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "SUPERLINEAR CONVERGENCE",
      "heading": "Secant Finite-Difference Recurrence",
      "latex": "x_{n+1} = x_n - f(x_n)\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}",
      "prose": "Approximating f′(xₙ) by the secant slope between the two most recent iterates avoids derivative evaluation while achieving convergence order φ = (1+√5)/2 ≈ 1.618."
    }
  },
  {
    "id": "bisection",
    "category": "Calculus",
    "name": "Bisection Method & Intermediate Value Theorem",
    "track": "AP Calculus · IVT & Roots",
    "glyph": "[a,b]/2",
    "sceneClass": "BisectionIVTScene",
    "archetype": "numerical",
    "subType": "bisection",
    "duration": 6,
    "summary": "Repeatedly halves bracket [a,b] where f(a)·f(b) < 0, cutting the maximum error in half every step.",
    "dragHint": "Drag step depth k or right bracket b to watch the sign-change bracket narrow",
    "defaults": {
      "track": "AP CALCULUS · INTERMEDIATE VALUE THEOREM",
      "title": "Bisection Bracket Halving: f(a)·f(b) < 0 ⟹ |eₙ| ≤ (b−a)/2ⁿ",
      "stepsK": 6,
      "bRight": 3
    },
    "controls": [
      {
        "id": "ctrl-stepsk",
        "key": "stepsK",
        "label": "Bisection Halvings k",
        "min": 1,
        "max": 9,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-bright",
        "key": "bRight",
        "label": "Initial Upper Bound b",
        "min": 1.8,
        "max": 3.6,
        "step": 0.05
      }
    ],
    "beats": [
      {
        "label": "1 · Opposite Signs",
        "time": 0
      },
      {
        "label": "2 · Midpoint m₁",
        "time": 1.5
      },
      {
        "label": "3 · Bracket Cascade",
        "time": 3
      },
      {
        "label": "4 · Guaranteed Bound",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "GUARANTEED BRACKET",
      "heading": "Intermediate Value Theorem & Bisection Error",
      "latex": "f(a)f(b) < 0 \\implies |r - m_n| \\le \\frac{b - a}{2^n}",
      "prose": "Each midpoint evaluation discards the half-interval where signs match, guaranteeing linear convergence of 1 bit of precision per iteration."
    }
  },
  {
    "id": "simpson_rule",
    "category": "Calculus",
    "name": "Simpson's 1/3 Parabolic Quadrature",
    "track": "AP Calculus BC · Numerical Integration",
    "glyph": "1-4-1",
    "sceneClass": "SimpsonsQuadratureScene",
    "archetype": "numerical",
    "subType": "simpson",
    "duration": 6.2,
    "summary": "Fits quadratic parabolas through triples of points with weights (1, 4, 1) × Δx/3 for fourth-order accuracy.",
    "dragHint": "Drag panel count N or upper limit b to compare parabolic caps against ∫ f(x) dx",
    "defaults": {
      "track": "NUMERICAL INTEGRATION · SIMPSON 1/3 RULE",
      "title": "Simpson's Parabolic Rule: (Δx/3)[f(x₀) + 4f(x₁) + f(x₂)]",
      "panels": 4,
      "bMax": 3
    },
    "controls": [
      {
        "id": "ctrl-panels",
        "key": "panels",
        "label": "Parabolic Pairs (N/2)",
        "min": 1,
        "max": 8,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-bmax",
        "key": "bMax",
        "label": "Upper Bound b",
        "min": 1.4,
        "max": 3.6,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Sample Nodes",
        "time": 0
      },
      {
        "label": "2 · Lagrange Parabolas",
        "time": 1.5
      },
      {
        "label": "3 · 1-4-2-4-1 Weights",
        "time": 3.1
      },
      {
        "label": "4 · O(h⁴) Precision",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "PARABOLIC QUADRATURE",
      "heading": "Simpson's 1/3 Composite Formula",
      "latex": "\\int_a^b f(x)\\,dx \\approx \\frac{\\Delta x}{3}\\left[f(x_0) + 4\\sum_{\\text{odd}} f(x_i) + 2\\sum_{\\text{even}} f(x_i) + f(x_n)\\right]",
      "prose": "Replacing flat rectangles with quadratic interpolating polynomials cancels cubic error terms, yielding O(Δx⁴) accuracy."
    }
  },
  {
    "id": "euler_ode",
    "category": "Calculus",
    "name": "Euler's Forward ODE Step Method",
    "track": "AP Calculus BC · Differential Equations",
    "glyph": "yₙ₊₁",
    "sceneClass": "EulerODEScene",
    "archetype": "numerical",
    "subType": "euler",
    "duration": 6.2,
    "summary": "Steps along tangent slopes yₙ₊₁ = yₙ + h·f(xₙ, yₙ) and compares against the exact analytical solution.",
    "dragHint": "Drag step size h to watch polygonal Euler segments converge to the exact curve as h → 0",
    "defaults": {
      "track": "AP CALCULUS BC · EULER'S METHOD",
      "title": "Euler's Polygonal ODE Approximation: yₙ₊₁ = yₙ + h·f(xₙ, yₙ)",
      "stepH": 0.45,
      "y0": 0.8
    },
    "controls": [
      {
        "id": "ctrl-steph",
        "key": "stepH",
        "label": "Step Size h",
        "min": 0.1,
        "max": 0.8,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-y0",
        "key": "y0",
        "label": "Initial Value y(0)",
        "min": 0.3,
        "max": 1.6,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Initial State (0,y₀)",
        "time": 0
      },
      {
        "label": "2 · Tangent Steps h",
        "time": 1.5
      },
      {
        "label": "3 · Exact Analytical Curve",
        "time": 3.1
      },
      {
        "label": "4 · Global Error O(h)",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "FIRST-ORDER SOLVER",
      "heading": "Forward Euler Explicit Time-Stepping",
      "latex": "y_{n+1} = y_n + h\\,f(x_n, y_n), \\qquad |y(x_n) - y_n| = \\mathcal{O}(h)",
      "prose": "Extrapolating along the local slope at the start of each step accumulates truncation error proportional to step size h."
    }
  },
  {
    "id": "rk4_ode",
    "category": "Calculus",
    "name": "Runge-Kutta (RK4) Multi-Stage Slope Averaging",
    "track": "Differential Equations · Scientific Computing",
    "glyph": "RK4",
    "sceneClass": "RungeKuttaRK4Scene",
    "archetype": "numerical",
    "subType": "rk4",
    "duration": 6.4,
    "summary": "Combines four trial slopes (k₁, k₂, k₃, k₄) with weights (1,2,2,1)/6 to achieve fourth-order accuracy.",
    "dragHint": "Drag step width h to compare single-step RK4 weighted slope against Forward Euler",
    "defaults": {
      "track": "SCIENTIFIC COMPUTING · RUNGE-KUTTA RK4",
      "title": "Fourth-Order Runge-Kutta: yₙ₊₁ = yₙ + (h/6)(k₁ + 2k₂ + 2k₃ + k₄)",
      "stepH": 0.7,
      "rateK": 0.65
    },
    "controls": [
      {
        "id": "ctrl-steph",
        "key": "stepH",
        "label": "Macro Step h",
        "min": 0.2,
        "max": 1.2,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-ratek",
        "key": "rateK",
        "label": "Growth Parameter k",
        "min": 0.3,
        "max": 0.9,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Start Slope k₁",
        "time": 0
      },
      {
        "label": "2 · Midpoint Slopes k₂,k₃",
        "time": 1.6
      },
      {
        "label": "3 · Endpoint Slope k₄",
        "time": 3.2
      },
      {
        "label": "4 · Weighted Step O(h⁴)",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "FOURTH-ORDER SOLVER",
      "heading": "Classical RK4 Weighted Slope Formula",
      "latex": "y_{n+1} = y_n + \\frac{h}{6}\\left(k_1 + 2k_2 + 2k_3 + k_4\\right)",
      "prose": "Sampling slopes at the beginning, midpoint (twice), and end of the interval mirrors Simpson’s rule, matching the Taylor expansion through O(h⁴)."
    }
  },
  {
    "id": "cobweb_fixed",
    "category": "Calculus",
    "name": "Fixed-Point Cobweb Iteration x = cos(x)",
    "track": "Dynamical Systems · Numerical Analysis",
    "glyph": "x=g(x)",
    "sceneClass": "FixedPointCobwebScene",
    "archetype": "numerical",
    "subType": "cobweb_cos",
    "duration": 6.2,
    "summary": "Traces the staircase/spiral cobweb between y = g(x) and y = x converging to the Dottie number x* ≈ 0.739085.",
    "dragHint": "Drag starting value x₀ or damping scale α to watch the cobweb spiral into the attractor",
    "defaults": {
      "track": "DYNAMICAL SYSTEMS · FIXED-POINT ITERATION",
      "title": "Banach Contraction Cobweb: xₙ₊₁ = α cos(xₙ) → x*",
      "x0": 0.1,
      "alpha": 1
    },
    "controls": [
      {
        "id": "ctrl-x0",
        "key": "x0",
        "label": "Initial Seed x₀",
        "min": -1.2,
        "max": 1.5,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-alpha",
        "key": "alpha",
        "label": "Scale Factor α",
        "min": 0.4,
        "max": 1.3,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · y = g(x) & y = x",
        "time": 0
      },
      {
        "label": "2 · Vertical Evaluation",
        "time": 1.5
      },
      {
        "label": "3 · Horizontal Reflection",
        "time": 3
      },
      {
        "label": "4 · Fixed-Point Attractor",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "CONTRACTION MAPPING",
      "heading": "Banach Fixed-Point Stability Criterion",
      "latex": "x_{n+1} = g(x_n), \\qquad |g'(x^*)| < 1 \\implies \\lim_{n\\to\\infty} x_n = x^*",
      "prose": "When the slope magnitude |g′(x*)| at the intersection with y = x is strictly less than 1, nearby orbits spiral or step inward to x*."
    }
  },
  {
    "id": "logistic_chaos",
    "category": "Calculus",
    "name": "Logistic Map Cobweb & Period-Doubling Chaos",
    "track": "Nonlinear Dynamics · Chaos Theory",
    "glyph": "rx(1−x)",
    "sceneClass": "LogisticChaosCobwebScene",
    "archetype": "numerical",
    "subType": "logistic_map",
    "duration": 6.4,
    "summary": "Explores xₙ₊₁ = r xₙ(1 − xₙ) as growth parameter r transitions from stable fixed point to 2-cycle, 4-cycle, and chaos.",
    "dragHint": "Drag growth rate r between 2.4 and 3.95 to trigger period doubling and chaos",
    "defaults": {
      "track": "NONLINEAR DYNAMICS · LOGISTIC MAP",
      "title": "Feigenbaum Period-Doubling Cascade: xₙ₊₁ = r xₙ(1 − xₙ)",
      "rRate": 3.45,
      "x0": 0.2
    },
    "controls": [
      {
        "id": "ctrl-rrate",
        "key": "rRate",
        "label": "Growth Parameter r",
        "min": 2,
        "max": 3.95,
        "step": 0.02,
        "drag": "y"
      },
      {
        "id": "ctrl-x0",
        "key": "x0",
        "label": "Initial Population x₀",
        "min": 0.05,
        "max": 0.95,
        "step": 0.02,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Parabola rx(1−x)",
        "time": 0
      },
      {
        "label": "2 · Transient Steps",
        "time": 1.5
      },
      {
        "label": "3 · Limit Cycle / Chaos",
        "time": 3.2
      },
      {
        "label": "4 · Lyapunov Sensitivity",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "BIFURCATION & CHAOS",
      "heading": "Logistic Map Fixed Point & Stability Thresholds",
      "latex": "x_{n+1} = r x_n(1 - x_n), \\qquad x^* = 1 - \\frac{1}{r} \\quad (\\text{stable for } 1 < r < 3)",
      "prose": "At r = 3 the fixed point loses stability into a period-2 orbit, bifurcating at r ≈ 3.449 and entering deterministic chaos beyond r ≈ 3.5699."
    }
  },
  {
    "id": "monte_carlo_pi",
    "category": "Probability & Stats",
    "name": "Monte Carlo Stochastic Integration of π",
    "track": "Stochastic Methods · Probability",
    "glyph": "4·N_in/N",
    "sceneClass": "MonteCarloPiScene",
    "archetype": "numerical",
    "subType": "montecarlo",
    "duration": 6.2,
    "summary": "Estimates π ≈ 4 × (points inside quarter circle) / N with deterministic Halton low-discrepancy sampling.",
    "dragHint": "Drag sample count N to watch the ratio 4·(inside/total) converge toward π = 3.14159…",
    "defaults": {
      "track": "STOCHASTIC COMPUTING · MONTE CARLO INTEGRATION",
      "title": "Monte Carlo Quarter-Circle Quadrature: π ≈ 4 · (N_inside / N_total)",
      "samplesN": 160,
      "seedShift": 0.25
    },
    "controls": [
      {
        "id": "ctrl-samplesn",
        "key": "samplesN",
        "label": "Sample Dart Count N",
        "min": 20,
        "max": 400,
        "step": 10,
        "drag": "x"
      },
      {
        "id": "ctrl-seedshift",
        "key": "seedShift",
        "label": "Quasi-Random Lattice Phase",
        "min": 0,
        "max": 1,
        "step": 0.05
      }
    ],
    "beats": [
      {
        "label": "1 · Unit Square & Arc",
        "time": 0
      },
      {
        "label": "2 · Sample Cascade",
        "time": 1.5
      },
      {
        "label": "3 · Hit/Miss Classification",
        "time": 3.1
      },
      {
        "label": "4 · O(1/√N) Estimator",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "STOCHASTIC QUADRATURE",
      "heading": "Law of Large Numbers Area Estimator",
      "latex": "\\hat{\\pi}_N = \\frac{4}{N}\\sum_{i=1}^N \\mathbf{1}_{\\{x_i^2 + y_i^2 \\le 1\\}}, \\qquad \\sigma(\\hat{\\pi}_N) = \\sqrt{\\frac{\\pi(16-\\pi)}{N}}",
      "prose": "Because a quarter unit circle has area π/4 inside a 1×1 square, four times the fraction of uniform samples landing inside converges to π."
    }
  },
  {
    "id": "lissajous",
    "category": "Geometry & Trig",
    "name": "Lissajous Harmonic Figures",
    "track": "Parametric Curves · Trigonometry",
    "glyph": "ωₓ:ωᵧ",
    "sceneClass": "LissajousHarmonicScene",
    "archetype": "parametric",
    "subType": "lissajous",
    "duration": 6.4,
    "summary": "Plots x(t) = sin(a t + δ), y(t) = sin(b t) showing rational frequency knots and phase rotation.",
    "dragHint": "Drag phase shift δ or frequency ratio a:b to rotate the 3D-like harmonic knot",
    "defaults": {
      "track": "PARAMETRIC CURVES · LISSAJOUS FIGURES",
      "title": "Harmonic Superposition: x(t) = sin(a t + δ), y(t) = sin(b t)",
      "freqA": 3,
      "freqB": 2,
      "deltaDeg": 60
    },
    "controls": [
      {
        "id": "ctrl-freqa",
        "key": "freqA",
        "label": "Horizontal Frequency a",
        "min": 1,
        "max": 6,
        "step": 1
      },
      {
        "id": "ctrl-freqb",
        "key": "freqB",
        "label": "Vertical Frequency b",
        "min": 1,
        "max": 6,
        "step": 1
      },
      {
        "id": "ctrl-deltadeg",
        "key": "deltaDeg",
        "label": "Phase Shift δ (deg)",
        "min": 0,
        "max": 180,
        "step": 5,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Orthogonal Drivers",
        "time": 0
      },
      {
        "label": "2 · Parametric Trace",
        "time": 1.5
      },
      {
        "label": "3 · Velocity Vector v(t)",
        "time": 3.1
      },
      {
        "label": "4 · Closed Resonance",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "HARMONIC RESONANCE",
      "heading": "Parametric Lissajous Equations",
      "latex": "x(t) = \\sin(a t + \\delta), \\quad y(t) = \\sin(b t), \\quad \\frac{dy}{dx} = \\frac{b\\cos(bt)}{a\\cos(at+\\delta)}",
      "prose": "A Lissajous curve closes into a periodic knot if and only if the frequency ratio a/b is rational, with lobe counts equal to a and b."
    }
  },
  {
    "id": "rose_curve",
    "category": "Geometry & Trig",
    "name": "Polar Rose Curves r = cos(kθ)",
    "track": "AP Calculus BC · Polar Coordinates",
    "glyph": "r(θ)",
    "sceneClass": "PolarRoseCurveScene",
    "archetype": "parametric",
    "subType": "rose",
    "duration": 6.2,
    "summary": "Draws polar petals r(θ) = a cos(kθ), demonstrating k petals for odd k and 2k petals for even k.",
    "dragHint": "Drag petal frequency k or sweep angle θ to inspect radial and tangential vectors",
    "defaults": {
      "track": "AP CALCULUS BC · POLAR CURVES",
      "title": "Rhodonea Polar Rose: r(θ) = a cos(kθ) & Area = ½ ∫ r² dθ",
      "kPetals": 5,
      "sweepDeg": 360
    },
    "controls": [
      {
        "id": "ctrl-kpetals",
        "key": "kPetals",
        "label": "Angular Multiplier k",
        "min": 2,
        "max": 8,
        "step": 1,
        "drag": "y"
      },
      {
        "id": "ctrl-sweepdeg",
        "key": "sweepDeg",
        "label": "Polar Sweep θ (deg)",
        "min": 45,
        "max": 360,
        "step": 5,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Polar Grid",
        "time": 0
      },
      {
        "label": "2 · Radial Vector r(θ)",
        "time": 1.5
      },
      {
        "label": "3 · Petal Symmetry",
        "time": 3.1
      },
      {
        "label": "4 · Polar Sector Area",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "POLAR CALCULUS",
      "heading": "Polar Area & Symmetry of Rose Curves",
      "latex": "r(\\theta) = a\\cos(k\\theta), \\qquad A = \\frac{1}{2}\\int_0^{2\\pi} r(\\theta)^2\\,d\\theta",
      "prose": "When k is odd, opposing half-cycles trace the same k petals twice over [0, 2π]; when k is even, all 2k petals are distinct."
    }
  },
  {
    "id": "cardioid_limacon",
    "category": "Geometry & Trig",
    "name": "Cardioid & Limaçon Family r = a + b cos(θ)",
    "track": "AP Calculus BC · Polar Geometry",
    "glyph": "a+bcosθ",
    "sceneClass": "CardioidLimaconScene",
    "archetype": "parametric",
    "subType": "limacon",
    "duration": 6,
    "summary": "Morphs between convex limaçon (a > 2b), dimpled, cardioid cusp (a = b), and inner-loop limaçon (a < b).",
    "dragHint": "Drag parameter a relative to b to create a cardioid cusp or inner loop",
    "defaults": {
      "track": "POLAR GEOMETRY · LIMAÇON OF PASCAL",
      "title": "Limaçon Classification: r(θ) = a + b cos(θ)",
      "aVal": 1,
      "bVal": 1.3
    },
    "controls": [
      {
        "id": "ctrl-aval",
        "key": "aVal",
        "label": "Offset Constant a",
        "min": 0.3,
        "max": 1.8,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-bval",
        "key": "bVal",
        "label": "Cosine Amplitude b",
        "min": 0.5,
        "max": 1.8,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Polar Origin O",
        "time": 0
      },
      {
        "label": "2 · Outer Envelope",
        "time": 1.5
      },
      {
        "label": "3 · Cusp / Inner Loop",
        "time": 3
      },
      {
        "label": "4 · Ratio a/b Classification",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "POLAR MORPHOLOGY",
      "heading": "Limaçon Loop & Cusp Criterion",
      "latex": "r(\\theta) = a + b\\cos\\theta \\implies \\begin{cases} a/b < 1 & \\text{Inner Loop} \\\\ a/b = 1 & \\text{Cardioid Cusp} \\\\ a/b > 1 & \\text{Simple Closed} \\end{cases}",
      "prose": "An inner loop forms whenever r(θ) changes sign (a < b), passing twice through the pole where a + b cos θ = 0."
    }
  },
  {
    "id": "cycloid",
    "category": "Geometry & Trig",
    "name": "Rolling Wheel Cycloid & Brachistochrone",
    "track": "Parametric Calculus · Kinematics",
    "glyph": "r(t−sin t)",
    "sceneClass": "RollingCycloidScene",
    "archetype": "parametric",
    "subType": "cycloid",
    "duration": 6.2,
    "summary": "Traces a rim point on a rolling circle of radius R: x = R(t − sin t), y = R(1 − cos t) with arc length 8R.",
    "dragHint": "Drag roll angle t to roll the wheel and observe instantaneous center of rotation",
    "defaults": {
      "track": "PARAMETRIC KINEMATICS · CYCLOID ARCH",
      "title": "Rolling Wheel Locus: x = R(t − sin t), y = R(1 − cos t)",
      "rollRad": 4.5,
      "wheelR": 1
    },
    "controls": [
      {
        "id": "ctrl-rollrad",
        "key": "rollRad",
        "label": "Roll Angle t (rad)",
        "min": 0.5,
        "max": 6.28,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-wheelr",
        "key": "wheelR",
        "label": "Wheel Radius R",
        "min": 0.6,
        "max": 1.4,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Contact Cusp",
        "time": 0
      },
      {
        "label": "2 · Rolling Wheel",
        "time": 1.5
      },
      {
        "label": "3 · Apex Height 2R",
        "time": 3.1
      },
      {
        "label": "4 · Full Arch L = 8R",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "CLASSICAL CURVES",
      "heading": "Cycloid Arc Length & Area Theorems",
      "latex": "L_{\\text{arch}} = \\int_0^{2\\pi} R\\sqrt{2 - 2\\cos t}\\,dt = 8R, \\qquad A_{\\text{arch}} = 3\\pi R^2",
      "prose": "Galileo and Torricelli proved that the area under one cycloid arch is exactly three times the area of the generating circle, and its length is 8R."
    }
  },
  {
    "id": "epicycloid",
    "category": "Geometry & Trig",
    "name": "Epicycloid & Nephroid Caustics",
    "track": "Parametric Geometry · Envelopes",
    "glyph": "(R+r)",
    "sceneClass": "EpicycloidCausticScene",
    "archetype": "parametric",
    "subType": "epicycloid",
    "duration": 6.4,
    "summary": "Rolls a circle of radius r outside a fixed circle of radius R = k·r, creating k sharp cusps.",
    "dragHint": "Drag cusp integer k or orbit angle t to trace cardioid (k=1), nephroid (k=2), or ranunculoid (k=5)",
    "defaults": {
      "track": "PARAMETRIC GEOMETRY · EPICYCLOID CUSPS",
      "title": "Epicycloid Planetary Trace (Cusp Ratio k = R / r)",
      "kRatio": 3,
      "orbitDeg": 360
    },
    "controls": [
      {
        "id": "ctrl-kratio",
        "key": "kRatio",
        "label": "Radius Ratio k = R/r",
        "min": 1,
        "max": 7,
        "step": 1,
        "drag": "y"
      },
      {
        "id": "ctrl-orbitdeg",
        "key": "orbitDeg",
        "label": "Orbit Sweep (deg)",
        "min": 60,
        "max": 360,
        "step": 5,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Fixed Stator Circle",
        "time": 0
      },
      {
        "label": "2 · Rolling Epicycle",
        "time": 1.5
      },
      {
        "label": "3 · Cusp Formation",
        "time": 3.1
      },
      {
        "label": "4 · Complete k-Cusp Orbit",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "EPICYCLIC LOCUS",
      "heading": "Parametric Epicycloid Equations",
      "latex": "x(t) = r(k+1)\\cos t - r\\cos((k+1)t), \\quad y(t) = r(k+1)\\sin t - r\\sin((k+1)t)",
      "prose": "When k = 1 the curve is a cardioid; when k = 2 it is the coffee-cup nephroid optical caustic."
    }
  },
  {
    "id": "astroid_envelope",
    "category": "Geometry & Trig",
    "name": "Astroid & Sliding Ladder Envelope x^(2/3)+y^(2/3)=a^(2/3)",
    "track": "Differential Geometry · Envelopes",
    "glyph": "x²/³+y²/³",
    "sceneClass": "AstroidEnvelopeScene",
    "archetype": "parametric",
    "subType": "astroid",
    "duration": 6,
    "summary": "Shows how a family of sliding segments of constant length L in the axes envelopes the four-cusped astroid.",
    "dragHint": "Drag ladder density or probe angle θ to verify constant tangent intercept length L",
    "defaults": {
      "track": "DIFFERENTIAL GEOMETRY · ASTROID ENVELOPE",
      "title": "Sliding Ladder Hypocycloid: x = L cos³θ, y = L sin³θ",
      "ladders": 16,
      "probeDeg": 40
    },
    "controls": [
      {
        "id": "ctrl-ladders",
        "key": "ladders",
        "label": "Envelope Tangent Lines",
        "min": 6,
        "max": 32,
        "step": 2,
        "drag": "x"
      },
      {
        "id": "ctrl-probedeg",
        "key": "probeDeg",
        "label": "Active Ladder Angle θ",
        "min": 5,
        "max": 85,
        "step": 2,
        "drag": "angle"
      }
    ],
    "beats": [
      {
        "label": "1 · Sliding Ladder Segments",
        "time": 0
      },
      {
        "label": "2 · Envelope Emergence",
        "time": 1.5
      },
      {
        "label": "3 · cos³θ, sin³θ Curve",
        "time": 3
      },
      {
        "label": "4 · Constant Intercept L",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "TANGENT ENVELOPE",
      "heading": "Trammel of Archimedes & Astroid Identity",
      "latex": "x^{2/3} + y^{2/3} = L^{2/3} \\iff (x, y) = \\left(L\\cos^3\\theta,\\, L\\sin^3\\theta\\right)",
      "prose": "Every tangent line to the astroid cuts a segment of constant length L between the coordinate axes."
    }
  },
  {
    "id": "osculating_circle",
    "category": "Calculus",
    "name": "Curvature κ(x) & Osculating Circle",
    "track": "Differential Geometry · Multivariable",
    "glyph": "R=1/κ",
    "sceneClass": "OsculatingCircleScene",
    "archetype": "parametric",
    "subType": "curvature",
    "duration": 6.2,
    "summary": "Computes curvature κ = |f″|/(1+f′²)^(3/2) and draws the kissing circle of radius R = 1/κ along y = sin(x).",
    "dragHint": "Drag point x₀ along the wave to watch the osculating circle shrink at peaks and grow at inflections",
    "defaults": {
      "track": "DIFFERENTIAL GEOMETRY · CURVATURE & EVOLUTE",
      "title": "Osculating Circle: κ(x) = |f″(x)| / (1 + [f′(x)]²)^(3/2)",
      "xPos": 1.25,
      "amp": 1.3
    },
    "controls": [
      {
        "id": "ctrl-xpos",
        "key": "xPos",
        "label": "Curve Point x₀",
        "min": -2.8,
        "max": 2.8,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-amp",
        "key": "amp",
        "label": "Wave Amplitude A",
        "min": 0.5,
        "max": 2,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Smooth Trajectory",
        "time": 0
      },
      {
        "label": "2 · Unit Tangent & Normal",
        "time": 1.5
      },
      {
        "label": "3 · Kissing Circle R=1/κ",
        "time": 3.1
      },
      {
        "label": "4 · Inflection κ → 0",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "SECOND-ORDER CONTACT",
      "heading": "Curvature & Radius of Osculation",
      "latex": "\\kappa(x) = \\frac{|f''(x)|}{\\left(1 + [f'(x)]^2\\right)^{3/2}}, \\qquad R(x) = \\frac{1}{\\kappa(x)}",
      "prose": "The osculating circle shares both the first and second derivatives with the curve at x₀, with center located at distance R along the unit normal."
    }
  },
  {
    "id": "archimedes_spiral",
    "category": "Geometry & Trig",
    "name": "Archimedean vs. Logarithmic Equiangular Spiral",
    "track": "Polar Geometry · Classical Curves",
    "glyph": "r=a·e^(bθ)",
    "sceneClass": "PolarSpiralsScene",
    "archetype": "parametric",
    "subType": "spiral",
    "duration": 6,
    "summary": "Compares constant-spacing Archimedean spiral r = aθ against self-similar logarithmic spiral r = a·e^(bθ).",
    "dragHint": "Drag growth rate b or turns count to compare arithmetic vs. geometric turn spacing",
    "defaults": {
      "track": "POLAR GEOMETRY · SPIRALS",
      "title": "Archimedean (r = aθ) vs. Bernoulli Equiangular Spiral (r = e^(bθ))",
      "bGrowth": 0.16,
      "turns": 2.8
    },
    "controls": [
      {
        "id": "ctrl-bgrowth",
        "key": "bGrowth",
        "label": "Logarithmic Growth b",
        "min": 0.08,
        "max": 0.26,
        "step": 0.01,
        "drag": "y"
      },
      {
        "id": "ctrl-turns",
        "key": "turns",
        "label": "Spiral Revolutions",
        "min": 1,
        "max": 4,
        "step": 0.1,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Archimedean r = aθ",
        "time": 0
      },
      {
        "label": "2 · Logarithmic r = e^(bθ)",
        "time": 1.5
      },
      {
        "label": "3 · Constant Pitch Angle ψ",
        "time": 3
      },
      {
        "label": "4 · Spira Mirabilis",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "EQUIANGULAR PROPERTY",
      "heading": "Jakob Bernoulli's Spira Mirabilis",
      "latex": "r(\\theta) = a e^{b\\theta} \\implies \\cot\\psi = \\frac{1}{r}\\frac{dr}{d\\theta} = b = \\text{const}",
      "prose": "A logarithmic spiral intersects every radial ray from the origin at the exact same constant pitch angle ψ = arccot(b)."
    }
  },
  {
    "id": "lemniscate",
    "category": "Geometry & Trig",
    "name": "Lemniscate of Bernoulli & Cassini Ovals",
    "track": "Algebraic Curves · Polar Loci",
    "glyph": "r²=a²cos2θ",
    "sceneClass": "LemniscateBernoulliScene",
    "archetype": "parametric",
    "subType": "lemniscate",
    "duration": 6,
    "summary": "Plots the locus of points where the product of distances to two foci (±c, 0) equals b².",
    "dragHint": "Drag ratio b/c across 1.0 to split the figure-eight lemniscate into two disjoint ovals",
    "defaults": {
      "track": "ALGEBRAIC GEOMETRY · CASSINI OVALS & LEMNISCATE",
      "title": "Product of Focal Distances: |PF₁| · |PF₂| = b²",
      "ratioBC": 1,
      "fociC": 1.6
    },
    "controls": [
      {
        "id": "ctrl-ratiobc",
        "key": "ratioBC",
        "label": "Shape Ratio b / c",
        "min": 0.75,
        "max": 1.45,
        "step": 0.02,
        "drag": "y"
      },
      {
        "id": "ctrl-focic",
        "key": "fociC",
        "label": "Focal Distance c",
        "min": 1,
        "max": 2.2,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Foci F₁(−c,0), F₂(+c,0)",
        "time": 0
      },
      {
        "label": "2 · Figure-8 Lemniscate (b=c)",
        "time": 1.5
      },
      {
        "label": "3 · Focal Radii Product",
        "time": 3
      },
      {
        "label": "4 · Cassini Topological Split",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "BIPOLAR LOCUS",
      "heading": "Lemniscate of Bernoulli (b = c)",
      "latex": "\\left[(x+c)^2 + y^2\\right]\\left[(x-c)^2 + y^2\\right] = b^4 \\xrightarrow{b=c} r^2 = 2c^2\\cos(2\\theta)",
      "prose": "Whereas an ellipse keeps the sum of focal distances constant, Cassini ovals keep their product constant, pinching into a figure-eight at b = c."
    }
  },
  {
    "id": "fourier_square",
    "category": "Complex & Fourier",
    "name": "Fourier Square Wave Epicycle Synthesis",
    "track": "Fourier Analysis · Signal Processing",
    "glyph": "∑sin(nx)/n",
    "sceneClass": "FourierSquareWaveScene",
    "archetype": "fourier",
    "subType": "square_wave",
    "duration": 6.5,
    "summary": "Synthesizes a square wave from odd harmonics (4/π) ∑ sin((2k−1)t)/(2k−1) using chained rotating phasors.",
    "dragHint": "Drag harmonic count N to add rotating epicycles and sharpen the square wave edges",
    "defaults": {
      "track": "FOURIER SERIES · EPICYCLE SYNTHESIS",
      "title": "Square Wave Harmonics: (4/π) ∑ sin((2k−1)t) / (2k−1)",
      "harmonics": 5,
      "freq": 1
    },
    "controls": [
      {
        "id": "ctrl-harmonics",
        "key": "harmonics",
        "label": "Odd Harmonics N",
        "min": 1,
        "max": 15,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-freq",
        "key": "freq",
        "label": "Base Frequency ω",
        "min": 0.5,
        "max": 2,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Fundamental n=1",
        "time": 0
      },
      {
        "label": "2 · Chained Epicycles",
        "time": 1.6
      },
      {
        "label": "3 · Waveform Projection",
        "time": 3.2
      },
      {
        "label": "4 · Square Convergence",
        "time": 4.9
      }
    ],
    "rigor": {
      "badge": "HARMONIC SYNTHESIS",
      "heading": "Fourier Series of a Periodic Square Wave",
      "latex": "f_N(t) = \\frac{4}{\\pi}\\sum_{k=1}^{N} \\frac{\\sin\\left((2k-1)\\omega t\\right)}{2k-1}",
      "prose": "Each term corresponds to a circle of radius 4/(π(2k−1)) rotating at odd multiple frequency (2k−1)ω whose vertical tip traces the partial sum."
    }
  },
  {
    "id": "nyquist_aliasing",
    "category": "Complex & Fourier",
    "name": "Nyquist-Shannon Sampling & Wagon-Wheel Aliasing",
    "track": "Signal Processing · Sampling Theorem",
    "glyph": "f_s > 2B",
    "sceneClass": "NyquistAliasingScene",
    "archetype": "fourier",
    "subType": "nyquist_aliasing",
    "duration": 6.2,
    "summary": "Samples a high-frequency continuous wave cos(2π f t) at discrete rate f_s, exposing the phantom low-frequency alias wave cos(2π |f − f_s| t) when f > f_s/2.",
    "dragHint": "Drag signal frequency f past the Nyquist folding limit f_s/2 to trigger frequency aliasing",
    "defaults": {
      "track": "SIGNAL PROCESSING · NYQUIST-SHANNON THEOREM",
      "title": "Wagon-Wheel Aliasing: f_alias = |f_signal − k · f_s|",
      "sigFreq": 1.75,
      "sampRate": 2
    },
    "controls": [
      {
        "id": "ctrl-sigfreq",
        "key": "sigFreq",
        "label": "True Signal Frequency f (Hz)",
        "min": 0.3,
        "max": 2.8,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-samprate",
        "key": "sampRate",
        "label": "Sampling Rate f_s (Hz)",
        "min": 1.2,
        "max": 3.6,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · True Analog Wave",
        "time": 0
      },
      {
        "label": "2 · Discrete Sample Stems",
        "time": 1.5
      },
      {
        "label": "3 · Nyquist Folding f > f_s/2",
        "time": 3.1
      },
      {
        "label": "4 · Reconstructed Alias",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "SAMPLING THEOREM",
      "heading": "Nyquist Folding & Spectral Aliasing",
      "latex": "f_{\\text{nyquist}} = \\frac{f_s}{2}, \\qquad f_{\\text{alias}} = \\left|f - \\operatorname{round}\\!\\left(\\frac{f}{f_s}\\right) f_s\\right|",
      "prose": "When a bandlimited signal is sampled below twice its highest frequency (f_s < 2f), shifted spectral copies overlap and fold high frequencies into indistinguishable low-frequency aliases."
    }
  },
  {
    "id": "hilbert_analytic_phasor",
    "category": "Complex & Fourier",
    "name": "Hilbert Transform & Analytic Signal Envelope",
    "track": "Complex Analysis · Quadrature Signals",
    "glyph": "x+iH[x]",
    "sceneClass": "HilbertAnalyticEnvelopeScene",
    "archetype": "fourier",
    "subType": "hilbert_analytic",
    "duration": 6,
    "summary": "Shifts every positive frequency component by −90° via the Hilbert transform H[x](t) to extract the exact instantaneous amplitude envelope A(t) = √(x² + H[x]²).",
    "dragHint": "Drag carrier frequency ω_c or packet width σ to inspect the 90° quadrature partner and envelope",
    "defaults": {
      "track": "COMPLEX SIGNAL ANALYSIS · HILBERT QUADRATURE",
      "title": "Analytic Signal z(t) = x(t) + i x̂(t) & Instantaneous Envelope",
      "carrierW": 3.6,
      "envWidth": 1.25
    },
    "controls": [
      {
        "id": "ctrl-carrierw",
        "key": "carrierW",
        "label": "Carrier Frequency ω_c",
        "min": 1.5,
        "max": 6,
        "step": 0.15,
        "drag": "x"
      },
      {
        "id": "ctrl-envwidth",
        "key": "envWidth",
        "label": "Wave Packet Spread σ",
        "min": 0.6,
        "max": 2.2,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Real Wave Packet x(t)",
        "time": 0
      },
      {
        "label": "2 · 90° Quadrature H[x](t)",
        "time": 1.5
      },
      {
        "label": "3 · Envelope √(x²+x̂²)",
        "time": 3
      },
      {
        "label": "4 · Instantaneous Phase",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "QUADRATURE OPERATOR",
      "heading": "Cauchy Principal Value Hilbert Transform",
      "latex": "\\hat{x}(t) = \\mathcal{H}\\{x\\}(t) = \\frac{1}{\\pi}\\,\\mathrm{p.v.}\\!\\int_{-\\infty}^{\\infty}\\frac{x(\\tau)}{t-\\tau}\\,d\\tau, \\quad A(t)=\\sqrt{x(t)^2+\\hat{x}(t)^2}",
      "prose": "Convolving with 1/(πt) acts as an ideal −90° phase shifter in the frequency domain, turning cosines into sines so the complex modulus recovers the exact energy envelope."
    }
  },
  {
    "id": "gibbs_overshoot",
    "category": "Complex & Fourier",
    "name": "Gibbs Phenomenon 9% Jump Overshoot",
    "track": "Fourier Analysis · Convergence",
    "glyph": "≈8.95%",
    "sceneClass": "GibbsPhenomenonScene",
    "archetype": "fourier",
    "subType": "gibbs",
    "duration": 6.4,
    "summary": "Highlights the persistent ≈ 8.95% Wilbraham-Gibbs overshoot horn near a jump discontinuity as N → ∞.",
    "dragHint": "Drag harmonic truncation N up to 25 — watch the overshoot horn compress horizontally but stay at +1.18!",
    "defaults": {
      "track": "FOURIER CONVERGENCE · GIBBS PHENOMENON",
      "title": "Wilbraham-Gibbs Overshoot: ∫₀^π (sin t / t) dt ≈ 1.8519 (8.95% Horn)",
      "harmonics": 11,
      "freq": 1
    },
    "controls": [
      {
        "id": "ctrl-harmonics",
        "key": "harmonics",
        "label": "Truncation Order N",
        "min": 1,
        "max": 25,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-freq",
        "key": "freq",
        "label": "Wave Scale",
        "min": 0.6,
        "max": 1.6,
        "step": 0.1
      }
    ],
    "beats": [
      {
        "label": "1 · Step Jump ±1",
        "time": 0
      },
      {
        "label": "2 · Ringing Ripples",
        "time": 1.5
      },
      {
        "label": "3 · Peak Horn at π/2N",
        "time": 3.1
      },
      {
        "label": "4 · 8.95% Asymptote",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "NON-UNIFORM LIMIT",
      "heading": "Wilbraham-Gibbs Constant",
      "latex": "\\lim_{N\\to\\infty} S_N\\left(\\frac{\\pi}{2N}\\right) = \\frac{2}{\\pi}\\int_0^\\pi \\frac{\\sin t}{t}\\,dt \\approx 1.17898 \\quad (+8.95\\%\\text{ of jump})",
      "prose": "At any jump discontinuity, truncated Fourier sums overshoot the jump by ~8.95%; increasing N moves the horn closer to the jump without reducing its height."
    }
  },
  {
    "id": "acoustic_beats",
    "category": "Physics & Differential Eq",
    "name": "Acoustic Beats & Wave Interference",
    "track": "Wave Physics · Trigonometry",
    "glyph": "Δω/2",
    "sceneClass": "AcousticBeatsScene",
    "archetype": "fourier",
    "subType": "beats",
    "duration": 6.2,
    "summary": "Superposes cos(ω₁t) + cos(ω₂t) = 2 cos((Δω/2)t) cos((ω̄)t) to reveal slow amplitude modulation envelopes.",
    "dragHint": "Drag frequency detuning Δω to control the beat envelope period",
    "defaults": {
      "track": "WAVE PHYSICS · ACOUSTIC BEATS",
      "title": "Sum-to-Product Modulation: cos(ω₁t) + cos(ω₂t) = 2 cos(½Δω t) cos(ω̄ t)",
      "harmonics": 5,
      "freq": 1.25
    },
    "controls": [
      {
        "id": "ctrl-harmonics",
        "key": "harmonics",
        "label": "Carrier Frequency ω₁",
        "min": 3,
        "max": 12,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-freq",
        "key": "freq",
        "label": "Beat Envelope Ratio",
        "min": 0.5,
        "max": 2.5,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Two Close Tones",
        "time": 0
      },
      {
        "label": "2 · Phasor Precession",
        "time": 1.5
      },
      {
        "label": "3 · Envelope Nodes",
        "time": 3.1
      },
      {
        "label": "4 · f_beat = |f₁ − f₂|",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "TRIGONOMETRIC IDENTITY",
      "heading": "Sum-to-Product Beat Envelope",
      "latex": "\\cos(\\omega_1 t) + \\cos(\\omega_2 t) = 2\\cos\\!\\left(\\frac{\\omega_1 - \\omega_2}{2}t\\right)\\cos\\!\\left(\\frac{\\omega_1 + \\omega_2}{2}t\\right)",
      "prose": "Two waves of slightly different frequencies alternate between constructive and destructive interference at the difference frequency |f₁ − f₂|."
    }
  },
  {
    "id": "am_fm_mod",
    "category": "Complex & Fourier",
    "name": "Amplitude vs. Frequency Modulation (AM / FM)",
    "track": "Signal Processing · Harmonics",
    "glyph": "AM/FM",
    "sceneClass": "AMFMModulationScene",
    "archetype": "fourier",
    "subType": "am_fm",
    "duration": 6,
    "summary": "Visualizes carrier sidebands (1 + m cos(ωₘt))cos(ω_ct) alongside instantaneous frequency compression.",
    "dragHint": "Drag modulation depth m or carrier ratio to inspect sideband envelopes",
    "defaults": {
      "track": "SIGNAL PROCESSING · MODULATION",
      "title": "Amplitude Modulation: y(t) = [1 + m cos(ωₘt)] cos(ω_c t)",
      "harmonics": 7,
      "freq": 0.7
    },
    "controls": [
      {
        "id": "ctrl-harmonics",
        "key": "harmonics",
        "label": "Carrier Multiple N_c",
        "min": 3,
        "max": 14,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-freq",
        "key": "freq",
        "label": "Modulation Index m",
        "min": 0.1,
        "max": 1.3,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · High-Freq Carrier",
        "time": 0
      },
      {
        "label": "2 · Baseband Message",
        "time": 1.5
      },
      {
        "label": "3 · Upper/Lower Sidebands",
        "time": 3
      },
      {
        "label": "4 · Overmodulation m>1",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "SPECTRAL SIDEBANDS",
      "heading": "Three-Tone Decomposition of AM Signals",
      "latex": "(1 + m\\cos\\omega_m t)\\cos\\omega_c t = \\cos\\omega_c t + \\frac{m}{2}\\cos(\\omega_c+\\omega_m)t + \\frac{m}{2}\\cos(\\omega_c-\\omega_m)t",
      "prose": "Multiplying a carrier by a sinusoid splits its spectrum into the carrier plus two symmetric sideband phasors at ω_c ± ω_m."
    }
  },
  {
    "id": "dirichlet_kernel",
    "category": "Complex & Fourier",
    "name": "Dirichlet Kernel & Sinc Convolution",
    "track": "Fourier Analysis · Harmonic Analysis",
    "glyph": "D_N(x)",
    "sceneClass": "DirichletKernelScene",
    "archetype": "fourier",
    "subType": "dirichlet",
    "duration": 6,
    "summary": "Sums symmetric complex exponentials ∑_{k=−N}^N e^(ikx) = sin((N+½)x) / sin(x/2).",
    "dragHint": "Drag bandwidth N to sharpen the central main lobe of height 2N + 1",
    "defaults": {
      "track": "HARMONIC ANALYSIS · DIRICHLET KERNEL",
      "title": "Dirichlet Kernel: D_N(x) = ∑ cos(kx) = sin((N + ½)x) / sin(x/2)",
      "harmonics": 6,
      "freq": 1
    },
    "controls": [
      {
        "id": "ctrl-harmonics",
        "key": "harmonics",
        "label": "Kernel Order N",
        "min": 1,
        "max": 14,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-freq",
        "key": "freq",
        "label": "Phase Scale",
        "min": 0.5,
        "max": 1.8,
        "step": 0.05
      }
    ],
    "beats": [
      {
        "label": "1 · Cosine Modes cos(kx)",
        "time": 0
      },
      {
        "label": "2 · In-Phase Peak at 0",
        "time": 1.5
      },
      {
        "label": "3 · Destructive Sidelobes",
        "time": 3
      },
      {
        "label": "4 · Closed Trigonometric Form",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "FOURIER CONVOLUTION",
      "heading": "Closed-Form Dirichlet Kernel Identity",
      "latex": "D_N(x) = 1 + 2\\sum_{k=1}^N \\cos(kx) = \\frac{\\sin\\left((N + \\tfrac{1}{2})x\\right)}{\\sin(x/2)}",
      "prose": "Every N-th Fourier partial sum of a function f is the convolution of f with the Dirichlet kernel D_N(x)."
    }
  },
  {
    "id": "laplace_splane_poles",
    "category": "Complex & Fourier",
    "name": "Laplace Transform s-Plane Poles & Impulse Stability",
    "track": "Differential Equations · Control & Systems",
    "glyph": "s=σ±iω",
    "sceneClass": "LaplaceSPlanePolesScene",
    "archetype": "fourier",
    "subType": "laplace_splane",
    "duration": 6.2,
    "summary": "Maps complex conjugate poles s = σ ± iω_d in the complex s-plane directly to the time-domain impulse response h(t) = e^(σt) cos(ω_d t).",
    "dragHint": "Drag real damping σ across the imaginary axis to switch between stable decay (σ < 0) and unstable blowup (σ > 0)",
    "defaults": {
      "track": "SYSTEMS & CONTROL · LAPLACE s-PLANE STABILITY",
      "title": "s-Plane Pole Location s = σ ± iω_d ⟺ Time Response e^(σt) cos(ω_d t)",
      "sigmaReal": -0.45,
      "omegaImag": 3.2
    },
    "controls": [
      {
        "id": "ctrl-sigmareal",
        "key": "sigmaReal",
        "label": "Real Pole Part σ (Damping)",
        "min": -1.2,
        "max": 0.45,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-omegaimag",
        "key": "omegaImag",
        "label": "Imaginary Part ω_d (Freq)",
        "min": 0.8,
        "max": 5.5,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Complex s-Plane Map",
        "time": 0
      },
      {
        "label": "2 · Conjugate Poles σ±iω",
        "time": 1.5
      },
      {
        "label": "3 · Envelope e^(σt)",
        "time": 3
      },
      {
        "label": "4 · BIBO Stability Boundary",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "SPECTRAL STABILITY",
      "heading": "Laplace Transfer Function Poles & Time Domain",
      "latex": "H(s) = \\frac{s-\\sigma}{(s-\\sigma)^2 + \\omega_d^2} \\;\\stackrel{\\mathcal{L}^{-1}}{\\Longleftrightarrow}\\; h(t) = e^{\\sigma t}\\cos(\\omega_d t)\\,u(t)",
      "prose": "A linear time-invariant system is asymptotically stable if and only if all poles of H(s) lie strictly in the Open Left-Half Plane (Re(s) = σ < 0)."
    }
  },
  {
    "id": "logistic_ode",
    "category": "Physics & Differential Eq",
    "name": "Logistic Growth Slope Field & Carrying Capacity",
    "track": "AP Calculus BC · Differential Equations",
    "glyph": "ry(1−y/K)",
    "sceneClass": "LogisticSlopeFieldScene",
    "archetype": "slopefield",
    "subType": "logistic_ode",
    "duration": 6.2,
    "summary": "Plots the slope field dy/dt = r y(1 − y/K) with inflection at y = K/2 and asymptotic equilibrium y → K.",
    "dragHint": "Drag initial population y₀ vertically to compare sub-capacity S-curves vs. super-capacity decay",
    "defaults": {
      "track": "AP CALCULUS BC · LOGISTIC DIFFERENTIAL EQUATION",
      "title": "Logistic Carrying Capacity: dy/dt = r y (1 − y / K)",
      "y0": 0.4,
      "capK": 3.2,
      "rateR": 1.1
    },
    "controls": [
      {
        "id": "ctrl-y0",
        "key": "y0",
        "label": "Initial Population y(0)",
        "min": 0.15,
        "max": 4.2,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-capk",
        "key": "capK",
        "label": "Carrying Capacity K",
        "min": 1.5,
        "max": 4,
        "step": 0.1
      },
      {
        "id": "ctrl-rater",
        "key": "rateR",
        "label": "Intrinsic Growth Rate r",
        "min": 0.4,
        "max": 2,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Direction Slope Field",
        "time": 0
      },
      {
        "label": "2 · Exponential Takeoff",
        "time": 1.5
      },
      {
        "label": "3 · Inflection at K/2",
        "time": 3.1
      },
      {
        "label": "4 · Asymptote y → K",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "POPULATION DYNAMICS",
      "heading": "Verhulst Logistic Solution & Inflection Point",
      "latex": "y(t) = \\frac{K}{1 + \\left(\\frac{K - y_0}{y_0}\\right)e^{-rt}}, \\qquad \\max \\frac{dy}{dt} = \\frac{rK}{4} \\text{ at } y = \\frac{K}{2}",
      "prose": "Growth accelerates until the population reaches exactly half the carrying capacity (y = K/2), where the second derivative changes sign."
    }
  },
  {
    "id": "lotka_volterra",
    "category": "Physics & Differential Eq",
    "name": "Lotka-Volterra Predator-Prey Phase Portrait",
    "track": "Differential Equations · Dynamical Systems",
    "glyph": "dx/dt,dy/dt",
    "sceneClass": "LotkaVolterraPhaseScene",
    "archetype": "slopefield",
    "subType": "predator_prey",
    "duration": 6.4,
    "summary": "Traces closed phase-plane orbits of prey x and predators y around the coexistence equilibrium (γ/δ, α/β).",
    "dragHint": "Drag initial state (x₀, y₀) on the phase plane to launch a new predator-prey cycle",
    "defaults": {
      "track": "NONLINEAR ODEs · LOTKA-VOLTERRA PHASE PLANE",
      "title": "Predator-Prey Closed Phase Orbits: dx/dt = αx − βxy, dy/dt = δxy − γy",
      "x0": 2.2,
      "y0": 1.1
    },
    "controls": [
      {
        "id": "ctrl-x0",
        "key": "x0",
        "label": "Initial Prey Density x₀",
        "min": 0.5,
        "max": 3.4,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-y0",
        "key": "y0",
        "label": "Initial Predator Density y₀",
        "min": 0.4,
        "max": 3.2,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Vector Field & Nullclines",
        "time": 0
      },
      {
        "label": "2 · Prey Boom Phase",
        "time": 1.5
      },
      {
        "label": "3 · Predator Peak & Crash",
        "time": 3.1
      },
      {
        "label": "4 · Conserved Integral V(x,y)",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "CONSERVED PHASE ORBITS",
      "heading": "Lotka-Volterra First Integral of Motion",
      "latex": "\\frac{dx}{dt} = x(\\alpha - \\beta y), \\quad \\frac{dy}{dt} = y(\\delta x - \\gamma) \\implies \\delta x - \\gamma\\ln x + \\beta y - \\alpha\\ln y = C",
      "prose": "Trajectories form closed counterclockwise loops around the equilibrium (γ/δ, α/β), with predator peaks lagging behind prey peaks by a quarter cycle."
    }
  },
  {
    "id": "damped_oscillator",
    "category": "Physics & Differential Eq",
    "name": "Damped Harmonic Oscillator (Under/Crit/Over)",
    "track": "Differential Equations · Mechanics",
    "glyph": "ζ<1,ζ=1",
    "sceneClass": "DampedOscillatorScene",
    "archetype": "slopefield",
    "subType": "damped_osc",
    "duration": 6.2,
    "summary": "Solves x″ + 2ζω₀x′ + ω₀²x = 0 showing exponential decay envelope e^(−ζω₀t) and critical damping at ζ = 1.",
    "dragHint": "Drag damping ratio ζ across 1.0 to transition from decaying oscillations to critical damping",
    "defaults": {
      "track": "SECOND-ORDER ODEs · DAMPED OSCILLATOR",
      "title": "Damping Regimes: x″ + 2ζω₀x′ + ω₀²x = 0",
      "zeta": 0.22,
      "omega0": 2.4
    },
    "controls": [
      {
        "id": "ctrl-zeta",
        "key": "zeta",
        "label": "Damping Ratio ζ",
        "min": 0.02,
        "max": 1.6,
        "step": 0.02,
        "drag": "y"
      },
      {
        "id": "ctrl-omega0",
        "key": "omega0",
        "label": "Natural Frequency ω₀",
        "min": 1.2,
        "max": 3.8,
        "step": 0.1,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Decay Envelope ±e^(−ζω₀t)",
        "time": 0
      },
      {
        "label": "2 · Ringdown Response",
        "time": 1.5
      },
      {
        "label": "3 · Damped Freq ω_d",
        "time": 3.1
      },
      {
        "label": "4 · Critical Threshold ζ=1",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "CHARACTERISTIC ROOTS",
      "heading": "Underdamped vs. Critically Damped Discriminant",
      "latex": "\\lambda_{1,2} = -\\zeta\\omega_0 \\pm \\omega_0\\sqrt{\\zeta^2 - 1}, \\qquad \\omega_d = \\omega_0\\sqrt{1 - \\zeta^2}",
      "prose": "For ζ < 1 complex conjugate roots produce oscillations inside ±e^(−ζω₀t); at ζ = 1 repeated real roots return to equilibrium fastest without overshoot."
    }
  },
  {
    "id": "pendulum_phase",
    "category": "Physics & Differential Eq",
    "name": "Nonlinear Pendulum Phase Portrait & Separatrix",
    "track": "Classical Mechanics · Phase Space",
    "glyph": "θ″+sinθ=0",
    "sceneClass": "PendulumSeparatrixScene",
    "archetype": "slopefield",
    "subType": "pendulum",
    "duration": 6.4,
    "summary": "Maps (θ, ω) phase space showing closed libration eyes inside the energy separatrix E = 2 and rotation waves outside.",
    "dragHint": "Drag initial angular velocity ω₀ across ω_crit = 2.0 to switch from oscillation to full 360° overturning",
    "defaults": {
      "track": "NONLINEAR MECHANICS · PENDULUM PHASE PORTRAIT",
      "title": "Nonlinear Pendulum Separatrix: ½ω² − cos θ = E",
      "omegaInit": 1.55,
      "thetaInit": 0
    },
    "controls": [
      {
        "id": "ctrl-omegainit",
        "key": "omegaInit",
        "label": "Initial Angular Velocity ω₀",
        "min": 0.3,
        "max": 2.6,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-thetainit",
        "key": "thetaInit",
        "label": "Initial Angle θ₀ (rad)",
        "min": -2.2,
        "max": 2.2,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Phase Vector Field",
        "time": 0
      },
      {
        "label": "2 · Separatrix Eye (E=1)",
        "time": 1.5
      },
      {
        "label": "3 · Libration vs Rotation",
        "time": 3.1
      },
      {
        "label": "4 · Saddle Points (±π, 0)",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "HAMILTONIAN CONTOURS",
      "heading": "Energy Conservation & Homoclinic Separatrix",
      "latex": "\\frac{d^2\\theta}{dt^2} + \\sin\\theta = 0 \\implies E = \\frac{1}{2}\\omega^2 + (1 - \\cos\\theta) = 2\\text{ on separatrix}",
      "prose": "Trajectories with E < 2 oscillate back and forth around stable center (0,0), while E > 2 whirls continuously over the top past unstable saddles (±π,0)."
    }
  },
  {
    "id": "sir_epidemic",
    "category": "Physics & Differential Eq",
    "name": "SIR Epidemic Compartmental Model & Herd Threshold",
    "track": "Mathematical Biology · Coupled ODEs",
    "glyph": "R₀=β/γ",
    "sceneClass": "SIREpidemicModelScene",
    "archetype": "slopefield",
    "subType": "sir",
    "duration": 6.2,
    "summary": "Integrates Susceptible S(t), Infectious I(t), and Recovered R(t) curves showing peak infection when S/N = 1/R₀.",
    "dragHint": "Drag transmission rate β or recovery rate γ to shift basic reproduction number R₀ = β/γ",
    "defaults": {
      "track": "MATHEMATICAL EPIDEMIOLOGY · SIR COMPARTMENTAL ODEs",
      "title": "Kermack-McKendrick SIR Dynamics & Reproduction Number R₀ = β / γ",
      "beta": 0.75,
      "gamma": 0.25
    },
    "controls": [
      {
        "id": "ctrl-beta",
        "key": "beta",
        "label": "Transmission Rate β",
        "min": 0.2,
        "max": 1.4,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-gamma",
        "key": "gamma",
        "label": "Recovery Rate γ",
        "min": 0.1,
        "max": 0.7,
        "step": 0.02,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Susceptible S(t)",
        "time": 0
      },
      {
        "label": "2 · Infectious Wave I(t)",
        "time": 1.5
      },
      {
        "label": "3 · Peak at S = γ/β",
        "time": 3.1
      },
      {
        "label": "4 · Recovered Plateau R(t)",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "COUPLED SYSTEM",
      "heading": "SIR Differential Equations & Peak Threshold",
      "latex": "\\frac{dS}{dt} = -\\beta SI,\\quad \\frac{dI}{dt} = \\beta SI - \\gamma I,\\quad \\frac{dI}{dt} = 0 \\iff S = \\frac{\\gamma}{\\beta} = \\frac{1}{R_0}",
      "prose": "An outbreak grows only when R₀ = β/γ > 1, peaking at the exact instant the susceptible fraction drops to 1/R₀."
    }
  },
  {
    "id": "newton_cooling",
    "category": "Physics & Differential Eq",
    "name": "Newton's Law of Cooling & Thermal Equilibrium",
    "track": "AP Calculus AB · Separable ODEs",
    "glyph": "dT/dt",
    "sceneClass": "NewtonCoolingScene",
    "archetype": "slopefield",
    "subType": "cooling",
    "duration": 5.8,
    "summary": "Solves dT/dt = −k(T − T_env) showing exponential relaxation toward ambient temperature T_env.",
    "dragHint": "Drag initial temperature T₀ or ambient T_env to observe symmetric cooling and heating curves",
    "defaults": {
      "track": "AP CALCULUS AB · NEWTON'S LAW OF COOLING",
      "title": "Exponential Thermal Relaxation: T(t) = T_env + (T₀ − T_env) e^(−kt)",
      "t0": 3.6,
      "tEnv": 1,
      "kCool": 0.65
    },
    "controls": [
      {
        "id": "ctrl-t0",
        "key": "t0",
        "label": "Initial Temp T₀ (×25°C)",
        "min": 0.2,
        "max": 4,
        "step": 0.1,
        "drag": "y"
      },
      {
        "id": "ctrl-tenv",
        "key": "tEnv",
        "label": "Ambient Temp T_env (×25°C)",
        "min": 0.4,
        "max": 3,
        "step": 0.1
      },
      {
        "id": "ctrl-kcool",
        "key": "kCool",
        "label": "Conductance Rate k",
        "min": 0.2,
        "max": 1.5,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Ambient Asymptote T_env",
        "time": 0
      },
      {
        "label": "2 · Slope Field −k(T−T_env)",
        "time": 1.4
      },
      {
        "label": "3 · Time Constant τ = 1/k",
        "time": 2.9
      },
      {
        "label": "4 · Thermal Equilibrium",
        "time": 4.4
      }
    ],
    "rigor": {
      "badge": "SEPARABLE ODE",
      "heading": "Newton's Law of Cooling & Time Constant τ",
      "latex": "\\frac{dT}{dt} = -k(T - T_{\\text{env}}) \\implies T(t) = T_{\\text{env}} + (T_0 - T_{\\text{env}})e^{-kt}",
      "prose": "After one thermal time constant τ = 1/k, the temperature gap T − T_env decays to 1/e ≈ 36.8% of its initial value."
    }
  },
  {
    "id": "vanderpol",
    "category": "Physics & Differential Eq",
    "name": "Van der Pol Nonlinear Limit Cycle Oscillator",
    "track": "Nonlinear Dynamics · Limit Cycles",
    "glyph": "μ(1−x²)x′",
    "sceneClass": "VanDerPolLimitCycleScene",
    "archetype": "slopefield",
    "subType": "vanderpol",
    "duration": 6.4,
    "summary": "Demonstrates self-sustained relaxation oscillations where small amplitudes pump energy in and large amplitudes dissipate it.",
    "dragHint": "Drag nonlinearity parameter μ or initial state to watch inner and outer trajectories lock onto the limit cycle",
    "defaults": {
      "track": "NONLINEAR DYNAMICS · VAN DER POL OSCILLATOR",
      "title": "Self-Sustained Limit Cycle: x″ − μ(1 − x²)x′ + x = 0",
      "mu": 1.2,
      "rInit": 0.5
    },
    "controls": [
      {
        "id": "ctrl-mu",
        "key": "mu",
        "label": "Nonlinear Damping μ",
        "min": 0.2,
        "max": 2.6,
        "step": 0.1,
        "drag": "y"
      },
      {
        "id": "ctrl-rinit",
        "key": "rInit",
        "label": "Initial Radius r₀",
        "min": 0.2,
        "max": 2.8,
        "step": 0.1,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Active Core |x| < 1",
        "time": 0
      },
      {
        "label": "2 · Dissipative Outer Zone",
        "time": 1.5
      },
      {
        "label": "3 · Spiral Convergence",
        "time": 3.1
      },
      {
        "label": "4 · Stable Limit Cycle",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "LIÉNARD SYSTEM",
      "heading": "Poincaré-Bendixson Limit Cycle Attractor",
      "latex": "\\frac{d^2x}{dt^2} - \\mu(1 - x^2)\\frac{dx}{dt} + x = 0",
      "prose": "When |x| < 1 damping is negative (injecting energy), and when |x| > 1 damping is positive (dissipating energy), trapping all non-zero orbits on a unique limit cycle."
    }
  },
  {
    "id": "bifurcation_pitchfork",
    "category": "Physics & Differential Eq",
    "name": "Supercritical Pitchfork Bifurcation dx/dt = rx − x³",
    "track": "Dynamical Systems · Bifurcations",
    "glyph": "rx−x³",
    "sceneClass": "PitchforkBifurcationScene",
    "archetype": "slopefield",
    "subType": "pitchfork",
    "duration": 6,
    "summary": "Shows how a single stable equilibrium x* = 0 for r ≤ 0 splits into two symmetric attractors ±√r for r > 0.",
    "dragHint": "Drag control parameter r across 0 to trigger symmetry breaking into ±√r",
    "defaults": {
      "track": "BIFURCATION THEORY · SYMMETRY BREAKING",
      "title": "Supercritical Pitchfork: dx/dt = r x − x³ (Equilibria x* = 0, ±√r)",
      "rParam": 1.4,
      "xProbe": 0.8
    },
    "controls": [
      {
        "id": "ctrl-rparam",
        "key": "rParam",
        "label": "Bifurcation Parameter r",
        "min": -1.5,
        "max": 2.5,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-xprobe",
        "key": "xprobe",
        "label": "Test State x",
        "min": -2,
        "max": 2,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Subcritical r < 0",
        "time": 0
      },
      {
        "label": "2 · Critical Point r = 0",
        "time": 1.5
      },
      {
        "label": "3 · Pitchfork Branches ±√r",
        "time": 3
      },
      {
        "label": "4 · Double-Well Potential",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "PHASE TRANSITION",
      "heading": "Normal Form of Supercritical Pitchfork Bifurcation",
      "latex": "\\frac{dx}{dt} = rx - x^3 = -V'(x), \\qquad V(x) = -\\frac{r}{2}x^2 + \\frac{1}{4}x^4",
      "prose": "As r crosses zero from below, the single-well potential V(x) buckles into a symmetric double well with two stable minima at x* = ±√r."
    }
  },
  {
    "id": "ellipse_optics",
    "category": "Geometry & Trig",
    "name": "Ellipse Foci & Whispering Gallery Acoustic Reflection",
    "track": "Conic Sections · Analytic Geometry",
    "glyph": "PF₁+PF₂=2a",
    "sceneClass": "EllipseWhisperingGalleryScene",
    "archetype": "conic",
    "subType": "ellipse",
    "duration": 6.2,
    "summary": "Proves that any ray emitted from focus F₁ reflects off the ellipse tangent directly through focus F₂ with constant path 2a.",
    "dragHint": "Drag boundary point P around the ellipse to verify |PF₁| + |PF₂| = 2a and equal reflection angles",
    "defaults": {
      "track": "CONIC SECTIONS · ELLIPSE REFLECTIVE PROPERTY",
      "title": "Ellipse Focal Reflection: |PF₁| + |PF₂| = 2a & ∠₁ = ∠₂",
      "semiA": 2.6,
      "semiB": 1.7,
      "pDeg": 58
    },
    "controls": [
      {
        "id": "ctrl-semia",
        "key": "semiA",
        "label": "Semi-Major Axis a",
        "min": 1.8,
        "max": 3,
        "step": 0.05
      },
      {
        "id": "ctrl-semib",
        "key": "semiB",
        "label": "Semi-Minor Axis b",
        "min": 0.9,
        "max": 2.4,
        "step": 0.05
      },
      {
        "id": "ctrl-pdeg",
        "key": "pDeg",
        "label": "Point P Angle θ (deg)",
        "min": 0,
        "max": 360,
        "step": 3,
        "drag": "angle"
      }
    ],
    "beats": [
      {
        "label": "1 · Foci ±c = ±√(a²−b²)",
        "time": 0
      },
      {
        "label": "2 · String Sum 2a",
        "time": 1.5
      },
      {
        "label": "3 · Tangent & Normal at P",
        "time": 3.1
      },
      {
        "label": "4 · Equal Angle Reflection",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "OPTICAL INVARIANT",
      "heading": "Focal String Property & Tangent Bisector Theorem",
      "latex": "\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, \\qquad c = \\sqrt{a^2 - b^2}, \\qquad |PF_1| + |PF_2| = 2a",
      "prose": "By Fermat’s principle of stationary path length, because |PF₁| + |PF₂| = 2a is constant along the ellipse, a ray from F₁ reflects directly into F₂."
    }
  },
  {
    "id": "parabola_focus",
    "category": "Geometry & Trig",
    "name": "Parabola Focus-Directrix & Parabolic Dish Reflector",
    "track": "Conic Sections · Digital SAT / Precalc",
    "glyph": "x²=4py",
    "sceneClass": "ParabolaFocusDirectrixScene",
    "archetype": "conic",
    "subType": "parabola",
    "duration": 6,
    "summary": "Equates distance |PF| to focus (0, p) with perpendicular distance |PD| to directrix y = −p, collimating parallel rays.",
    "dragHint": "Drag ray x-coordinate or focal length p to trace incoming parallel rays reflecting into the focus",
    "defaults": {
      "track": "CONIC SECTIONS · PARABOLA FOCUS & DIRECTRIX",
      "title": "Parabolic Reflector: x² = 4py  (|PF| = |y + p|)",
      "focalP": 1.1,
      "xRay": 1.9
    },
    "controls": [
      {
        "id": "ctrl-focalp",
        "key": "focalP",
        "label": "Focal Length p",
        "min": 0.5,
        "max": 2,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-xray",
        "key": "xRay",
        "label": "Probe Ray Position x₀",
        "min": -2.8,
        "max": 2.8,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Focus (0,p) & Directrix",
        "time": 0
      },
      {
        "label": "2 · Equidistant Locus |PF|=|PD|",
        "time": 1.5
      },
      {
        "label": "3 · Parallel Incoming Rays",
        "time": 3
      },
      {
        "label": "4 · Focal Convergence",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "CONIC DEFINITION",
      "heading": "Equidistance from Focus and Directrix",
      "latex": "\\sqrt{x^2 + (y - p)^2} = |y + p| \\iff x^2 = 4py",
      "prose": "Every point on a parabola is equidistant from the focus (0,p) and the line y = −p, causing axial rays to reflect through the focus."
    }
  },
  {
    "id": "hyperbola_asymptotes",
    "category": "Geometry & Trig",
    "name": "Hyperbola Focal Difference & Asymptote Box",
    "track": "Conic Sections · Precalculus",
    "glyph": "||PF₁|−|PF₂||=2a",
    "sceneClass": "HyperbolaAsymptotesScene",
    "archetype": "conic",
    "subType": "hyperbola",
    "duration": 6.2,
    "summary": "Plots x²/a² − y²/b² = 1 with fundamental box 2a × 2b, diagonal asymptotes y = ±(b/a)x, and foci ±√(a²+b²).",
    "dragHint": "Drag parameter t or semi-axes (a, b) to verify ||PF₁| − |PF₂|| = 2a along both branches",
    "defaults": {
      "track": "CONIC SECTIONS · HYPERBOLA GEOMETRY",
      "title": "Hyperbola Branches & Asymptotes: x²/a² − y²/b² = 1",
      "semiA": 1.5,
      "semiB": 1.2,
      "tParam": 1.1
    },
    "controls": [
      {
        "id": "ctrl-semia",
        "key": "semiA",
        "label": "Transverse Semi-Axis a",
        "min": 0.8,
        "max": 2.2,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-semib",
        "key": "semiB",
        "label": "Conjugate Semi-Axis b",
        "min": 0.6,
        "max": 2,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-tparam",
        "key": "tParam",
        "label": "Hyperbolic Parameter u",
        "min": -1.5,
        "max": 1.5,
        "step": 0.05
      }
    ],
    "beats": [
      {
        "label": "1 · Fundamental 2a×2b Box",
        "time": 0
      },
      {
        "label": "2 · Asymptotes y = ±(b/a)x",
        "time": 1.5
      },
      {
        "label": "3 · Hyperbolic Branches",
        "time": 3.1
      },
      {
        "label": "4 · ||PF₁| − |PF₂|| = 2a",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "HYPERBOLIC LOCUS",
      "heading": "Focal Difference & Eccentricity e > 1",
      "latex": "\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1, \\qquad c = \\sqrt{a^2 + b^2}, \\qquad \\big||PF_1| - |PF_2|\\big| = 2a",
      "prose": "The diagonal distance from the origin to a corner of the 2a×2b box equals c = √(a²+b²), giving the exact location of the foci on the transverse axis."
    }
  },
  {
    "id": "eccentricity_morph",
    "category": "Geometry & Trig",
    "name": "Conic Eccentricity Unified Polar Equation",
    "track": "Conic Sections · Celestial Mechanics",
    "glyph": "r=ed/(1+ecosθ)",
    "sceneClass": "ConicEccentricityMorphScene",
    "archetype": "conic",
    "subType": "eccentricity",
    "duration": 6.2,
    "summary": "Continuously morphs a conic r(θ) = l / (1 + e cos θ) from circle (e=0) to ellipse (e<1), parabola (e=1), and hyperbola (e>1).",
    "dragHint": "Drag eccentricity e across e = 1.0 to witness the orbit break open from ellipse to hyperbola",
    "defaults": {
      "track": "UNIFIED CONICS · FOCUS-DIRECTRIX ECCENTRICITY",
      "title": "Polar Conic Unification: r(θ) = p / (1 + e cos θ)",
      "ecc": 0.65,
      "latusP": 1.5
    },
    "controls": [
      {
        "id": "ctrl-ecc",
        "key": "ecc",
        "label": "Eccentricity e = |PF|/|PD|",
        "min": 0,
        "max": 1.65,
        "step": 0.02,
        "drag": "x"
      },
      {
        "id": "ctrl-latusp",
        "key": "latusP",
        "label": "Semi-Latus Rectum p",
        "min": 0.8,
        "max": 2.2,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Circle e = 0",
        "time": 0
      },
      {
        "label": "2 · Ellipse 0 < e < 1",
        "time": 1.5
      },
      {
        "label": "3 · Parabola Escape e = 1",
        "time": 3.1
      },
      {
        "label": "4 · Hyperbola e > 1",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "PAPPUS-KEPLER UNIFICATION",
      "heading": "Eccentricity Ratio |PF| / |PD| = e",
      "latex": "r(\\theta) = \\frac{p}{1 + e\\cos\\theta}, \\qquad E_{\\text{orbital}} \\propto e^2 - 1",
      "prose": "A single ratio e governs all conic sections and all two-body gravitational orbits: bound ellipses have e < 1, parabolic escape has e = 1, and hyperbolic flybys have e > 1."
    }
  },
  {
    "id": "gravitational_lensing",
    "category": "SAT / Algebra",
    "name": "Einstein Gravitational Lensing & Hyperbolic Deflection",
    "track": "Astrophysics & Conics · Hyperbolic Optics",
    "glyph": "α=4GM/c²b",
    "sceneClass": "GravitationalLensingScene",
    "archetype": "conic",
    "subType": "gravitational_lens",
    "duration": 6.2,
    "summary": "Bends parallel light rays along hyperbolic trajectories around a central mass M with impact parameter b, forming magnified virtual Einstein ring images.",
    "dragHint": "Drag impact parameter b or lens mass M to bend light rays and align the Einstein ring",
    "defaults": {
      "track": "RELATIVISTIC OPTICS · HYPERBOLIC DEFLECTION",
      "title": "Einstein Deflection Angle α = 4GM / (c²b) & Einstein Ring",
      "impactB": 1.05,
      "lensMass": 1.2
    },
    "controls": [
      {
        "id": "ctrl-impactb",
        "key": "impactB",
        "label": "Impact Parameter b",
        "min": 0.45,
        "max": 2,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-lensmass",
        "key": "lensMass",
        "label": "Gravitational Mass M",
        "min": 0.4,
        "max": 2.2,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Central Lens Mass M",
        "time": 0
      },
      {
        "label": "2 · Impact Parameter b",
        "time": 1.4
      },
      {
        "label": "3 · Hyperbolic Bending α",
        "time": 2.9
      },
      {
        "label": "4 · Einstein Ring θ_E",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "GENERAL RELATIVITY",
      "heading": "Einstein Deflection & Ring Radius",
      "latex": "\\hat{\\alpha} = \\frac{4GM}{c^2 b}, \\qquad \\theta_E = \\sqrt{\\frac{4GM}{c^2}\\frac{D_{LS}}{D_L D_S}}",
      "prose": "Light grazing a massive body at impact distance b follows a hyperbolic null geodesic deflected by twice the Newtonian value, focusing coaxial sources into an Einstein ring."
    }
  },
  {
    "id": "snell_refraction",
    "category": "Physics & Differential Eq",
    "name": "Snell's Law of Refraction & Total Internal Reflection",
    "track": "Optics · Fermat Least Time Principle",
    "glyph": "n₁sinθ₁=n₂sinθ₂",
    "sceneClass": "SnellRefractionScene",
    "archetype": "conic",
    "subType": "snell",
    "duration": 6,
    "summary": "Traces incident, refracted, and reflected rays across an optical interface, triggering total internal reflection past θ_c = arcsin(n₂/n₁).",
    "dragHint": "Drag incident angle θ₁ past the critical angle θ_c to trigger Total Internal Reflection",
    "defaults": {
      "track": "GEOMETRIC OPTICS · SNELL'S LAW & CRITICAL ANGLE",
      "title": "Fermat's Principle of Least Time: n₁ sin θ₁ = n₂ sin θ₂",
      "theta1Deg": 36,
      "n1": 1.5,
      "n2": 1
    },
    "controls": [
      {
        "id": "ctrl-theta1deg",
        "key": "theta1Deg",
        "label": "Incident Angle θ₁ (deg)",
        "min": 2,
        "max": 82,
        "step": 1,
        "drag": "angle"
      },
      {
        "id": "ctrl-n1",
        "key": "n1",
        "label": "Lower Medium Index n₁",
        "min": 1.1,
        "max": 2.4,
        "step": 0.05
      },
      {
        "id": "ctrl-n2",
        "key": "n2",
        "label": "Upper Medium Index n₂",
        "min": 1,
        "max": 1.8,
        "step": 0.05
      }
    ],
    "beats": [
      {
        "label": "1 · Optical Interface",
        "time": 0
      },
      {
        "label": "2 · Refracted Ray θ₂",
        "time": 1.5
      },
      {
        "label": "3 · Critical Angle θ_c",
        "time": 3
      },
      {
        "label": "4 · Total Internal Reflection",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "VARIATIONAL OPTICS",
      "heading": "Snell's Law & Critical Angle θ_c",
      "latex": "n_1\\sin\\theta_1 = n_2\\sin\\theta_2, \\qquad \\theta_c = \\arcsin\\!\\left(\\frac{n_2}{n_1}\\right) \\quad (n_1 > n_2)",
      "prose": "Minimizing optical travel time T = L₁/v₁ + L₂/v₂ yields Snell’s law; when n₁ sin θ₁ > n₂, no real refracted angle exists and 100% of light reflects internally."
    }
  },
  {
    "id": "apollonius_circle",
    "category": "Geometry & Trig",
    "name": "Circle of Apollonius (Constant Distance Ratio |PA|/|PB| = k)",
    "track": "Euclidean & Analytic Geometry · Loci",
    "glyph": "|PA|=k|PB|",
    "sceneClass": "ApolloniusCircleScene",
    "archetype": "conic",
    "subType": "apollonius",
    "duration": 6,
    "summary": "Proves that the locus of points P with constant distance ratio |PA| / |PB| = k ≠ 1 to two fixed points is a circle.",
    "dragHint": "Drag distance ratio k across k = 1 (perpendicular bisector) to invert the Apollonius circle",
    "defaults": {
      "track": "CLASSICAL GEOMETRY · CIRCLE OF APOLLONIUS",
      "title": "Bipolar Ratio Locus: |PA| / |PB| = k  (Circle of Apollonius)",
      "kRatio": 1.8,
      "pAngle": 55
    },
    "controls": [
      {
        "id": "ctrl-kratio",
        "key": "kRatio",
        "label": "Distance Ratio k = |PA|/|PB|",
        "min": 0.4,
        "max": 2.8,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-pangle",
        "key": "pAngle",
        "label": "Locus Point Angle (deg)",
        "min": 0,
        "max": 360,
        "step": 5,
        "drag": "angle"
      }
    ],
    "beats": [
      {
        "label": "1 · Anchors A and B",
        "time": 0
      },
      {
        "label": "2 · Internal/External Bisectors",
        "time": 1.5
      },
      {
        "label": "3 · Circular Locus |PA|=k|PB|",
        "time": 3
      },
      {
        "label": "4 · Limit k → 1 Bisector",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "HARMONIC DIVISION",
      "heading": "Apollonius Locus & Angle Bisector Theorem",
      "latex": "\\frac{|PA|}{|PB|} = k \\neq 1 \\iff \\left(x - \\frac{k^2 x_B - x_A}{k^2 - 1}\\right)^2 + y^2 = \\left(\\frac{k\\,|AB|}{|k^2 - 1|}\\right)^2",
      "prose": "The diameter endpoints of the Apollonius circle divide segment AB internally and externally in ratio k:1."
    }
  },
  {
    "id": "euler_line",
    "category": "Geometry & Trig",
    "name": "Euler Line: Orthocenter H, Centroid G, Circumcenter O",
    "track": "Olympiad Geometry · Triangle Centers",
    "glyph": "HG = 2·GO",
    "sceneClass": "EulerLineTriangleScene",
    "archetype": "geometry",
    "subType": "euler_line",
    "duration": 6.2,
    "summary": "Shows that Orthocenter H, Centroid G, and Circumcenter O are always collinear with exact 2:1 ratio |HG| = 2|GO|.",
    "dragHint": "Drag top vertex C horizontally to deform the triangle and see H, G, O stay strictly collinear!",
    "defaults": {
      "track": "EUCLIDEAN GEOMETRY · THE EULER LINE",
      "title": "Collinearity of Triangle Centers: Orthocenter H, Centroid G, Circumcenter O",
      "cxTop": 0.55,
      "cyTop": 2.1
    },
    "controls": [
      {
        "id": "ctrl-cxtop",
        "key": "cxTop",
        "label": "Apex Vertex x_C",
        "min": -1.8,
        "max": 2,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-cytop",
        "key": "cyTop",
        "label": "Apex Vertex y_C",
        "min": 1.1,
        "max": 2.5,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Circumcenter O",
        "time": 0
      },
      {
        "label": "2 · Medians → Centroid G",
        "time": 1.5
      },
      {
        "label": "3 · Altitudes → Orthocenter H",
        "time": 3.1
      },
      {
        "label": "4 · Euler Line |HG| = 2|GO|",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "EULER (1765)",
      "heading": "Homothety at the Centroid G",
      "latex": "\\overrightarrow{OH} = \\overrightarrow{OA} + \\overrightarrow{OB} + \\overrightarrow{OC} = 3\\overrightarrow{OG} \\implies |HG| : |GO| = 2 : 1",
      "prose": "A dilation of factor −1/2 centered at the centroid G maps the vertices of △ABC to the medial triangle, carrying the orthocenter H directly onto the circumcenter O."
    }
  },
  {
    "id": "power_of_point",
    "category": "Geometry & Trig",
    "name": "Power of a Point: Secant-Tangent Theorem",
    "track": "Digital SAT / Olympiad · Circle Geometry",
    "glyph": "PT²=PA·PB",
    "sceneClass": "PowerOfAPointScene",
    "archetype": "geometry",
    "subType": "power_point",
    "duration": 6,
    "summary": "Demonstrates that for any secant line from exterior point P cutting a circle at A and B, PA · PB = PT² = d² − R².",
    "dragHint": "Drag secant angle α or exterior distance d to verify PA × PB remains invariant",
    "defaults": {
      "track": "CIRCLE GEOMETRY · POWER OF A POINT",
      "title": "Secant-Tangent Invariant: |PA| · |PB| = |PT|² = d² − R²",
      "distD": 2.5,
      "secDeg": 18
    },
    "controls": [
      {
        "id": "ctrl-distd",
        "key": "distD",
        "label": "Exterior Distance d = |PO|",
        "min": 1.45,
        "max": 3.2,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-secdeg",
        "key": "secDeg",
        "label": "Secant Ray Angle α (deg)",
        "min": -24,
        "max": 24,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Exterior Point P",
        "time": 0
      },
      {
        "label": "2 · Tangent Length PT",
        "time": 1.5
      },
      {
        "label": "3 · Secant Chord AB",
        "time": 3
      },
      {
        "label": "4 · Similar △PAT ∼ △PTB",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "CIRCLE INVARIANT",
      "heading": "Steiner Power of a Point Π(P)",
      "latex": "\\Pi(P) = |PO|^2 - R^2 = |PA|\\cdot|PB| = |PT|^2",
      "prose": "By the inscribed angle theorem, △PAT is similar to △PTB, so |PA|/|PT| = |PT|/|PB| regardless of the secant’s angle."
    }
  },
  {
    "id": "law_of_sines",
    "category": "Geometry & Trig",
    "name": "Extended Law of Sines & Circumcircle Diameter 2R",
    "track": "IGCSE / Precalculus · Trigonometry",
    "glyph": "a/sinA=2R",
    "sceneClass": "ExtendedLawOfSinesScene",
    "archetype": "geometry",
    "subType": "law_sines",
    "duration": 6,
    "summary": "Proves a/sin A = b/sin B = c/sin C = 2R by rotating vertex A around the circumcircle until BC subtends a right triangle on diameter 2R.",
    "dragHint": "Drag vertex angle A along the circumcircle to verify a / sin(A) equals the diameter 2R",
    "defaults": {
      "track": "TRIGONOMETRY · EXTENDED LAW OF SINES",
      "title": "Circumdiameter Identity: a / sin A = b / sin B = c / sin C = 2R",
      "angleADeg": 52,
      "chordSpan": 116
    },
    "controls": [
      {
        "id": "ctrl-angleadeg",
        "key": "angleADeg",
        "label": "Opposite Angle A (deg)",
        "min": 25,
        "max": 135,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-chordspan",
        "key": "chordSpan",
        "label": "Apex Position on Arc",
        "min": 40,
        "max": 150,
        "step": 2,
        "drag": "angle"
      }
    ],
    "beats": [
      {
        "label": "1 · Circumscribed △ABC",
        "time": 0
      },
      {
        "label": "2 · Diameter 2R Construction",
        "time": 1.5
      },
      {
        "label": "3 · Thales Right Triangle",
        "time": 3
      },
      {
        "label": "4 · a = 2R sin A",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "TRIGONOMETRIC DUALITY",
      "heading": "Extended Law of Sines via Thales Diameter",
      "latex": "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R",
      "prose": "Moving vertex A to A′ so that A′B is a diameter of length 2R preserves the inscribed angle ∠A′ = ∠A while making ∠A′CB = 90°, so a = 2R sin A."
    }
  },
  {
    "id": "law_of_cosines",
    "category": "Geometry & Trig",
    "name": "Law of Cosines & Generalized Pythagorean Squares",
    "track": "Digital SAT / IGCSE · Trigonometry",
    "glyph": "c²=a²+b²−2abcosC",
    "sceneClass": "LawOfCosinesScene",
    "archetype": "geometry",
    "subType": "law_cosines",
    "duration": 6,
    "summary": "Decomposes c² into a² + b² minus the altitude projection correction 2ab cos C across acute, right, and obtuse angles.",
    "dragHint": "Drag included angle C across 90° to watch −2ab cos C switch from negative (acute) to positive (obtuse)",
    "defaults": {
      "track": "TRIGONOMETRY · LAW OF COSINES",
      "title": "Al-Kashi Law of Cosines: c² = a² + b² − 2ab cos C",
      "angleCDeg": 68,
      "sideA": 2.2,
      "sideB": 1.8
    },
    "controls": [
      {
        "id": "ctrl-anglecdeg",
        "key": "angleCDeg",
        "label": "Included Angle C (deg)",
        "min": 25,
        "max": 145,
        "step": 1,
        "drag": "angle"
      },
      {
        "id": "ctrl-sidea",
        "key": "sideA",
        "label": "Side Length a",
        "min": 1.2,
        "max": 2.8,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-sideb",
        "key": "sideB",
        "label": "Side Length b",
        "min": 1,
        "max": 2.6,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Sides a, b & Angle C",
        "time": 0
      },
      {
        "label": "2 · Altitude h = b sin C",
        "time": 1.5
      },
      {
        "label": "3 · Projection b cos C",
        "time": 3
      },
      {
        "label": "4 · Pythagoras at C = 90°",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "AL-KASHI THEOREM",
      "heading": "Generalized Pythagorean Identity",
      "latex": "c^2 = (a - b\\cos C)^2 + (b\\sin C)^2 = a^2 + b^2 - 2ab\\cos C",
      "prose": "Dropping an altitude decomposes △ABC into two right triangles; expanding (a − b cos C)² + (b sin C)² via cos²C + sin²C = 1 yields the Law of Cosines."
    }
  },
  {
    "id": "heron_incircle",
    "category": "Geometry & Trig",
    "name": "Heron's Formula & Incircle Tangency Area A = r·s",
    "track": "Olympiad / SAT · Triangle Geometry",
    "glyph": "A=r·s",
    "sceneClass": "HeronIncircleScene",
    "archetype": "geometry",
    "subType": "incircle",
    "duration": 6,
    "summary": "Splits △ABC into three sub-triangles around incenter I with common altitude r (inradius), proving Area = r·s = √(s(s−a)(s−b)(s−c)).",
    "dragHint": "Drag apex vertex C to reshape the triangle and see the inscribed circle stay tangent to all 3 sides",
    "defaults": {
      "track": "TRIANGLE GEOMETRY · INCIRCLE & HERON FORMULA",
      "title": "Inradius Area Partition: Area = ½ r(a + b + c) = r · s",
      "cxTop": 0.3,
      "cyTop": 2
    },
    "controls": [
      {
        "id": "ctrl-cxtop",
        "key": "cxTop",
        "label": "Apex Vertex x_C",
        "min": -1.6,
        "max": 1.8,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-cytop",
        "key": "cyTop",
        "label": "Apex Vertex y_C",
        "min": 1,
        "max": 2.5,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Angle Bisectors → I",
        "time": 0
      },
      {
        "label": "2 · Inscribed Circle r",
        "time": 1.5
      },
      {
        "label": "3 · Three Sub-Triangles",
        "time": 3
      },
      {
        "label": "4 · A = r·s = √(s(s−a)(s−b)(s−c))",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "INSCRIBED CIRCLE",
      "heading": "Inradius & Semiperimeter Identity",
      "latex": "s = \\frac{a+b+c}{2}, \\qquad A = \\frac{1}{2}ar + \\frac{1}{2}br + \\frac{1}{2}cr = r s = \\sqrt{s(s-a)(s-b)(s-c)}",
      "prose": "Connecting incenter I to the three vertices partitions △ABC into three triangles of height r and bases a, b, c, whose areas sum to r·s."
    }
  },
  {
    "id": "ptolemy_cyclic",
    "category": "Geometry & Trig",
    "name": "Ptolemy's Cyclic Quadrilateral Diagonal Theorem",
    "track": "Olympiad Geometry · Cyclic Polygons",
    "glyph": "ef=ac+bd",
    "sceneClass": "PtolemyCyclicQuadScene",
    "archetype": "geometry",
    "subType": "ptolemy",
    "duration": 6.2,
    "summary": "In any cyclic quadrilateral ABCD inscribed in a circle, the product of diagonals equals the sum of opposite side products: |AC|·|BD| = |AB|·|CD| + |BC|·|DA|.",
    "dragHint": "Drag vertex C along the circle arc to verify |AC|·|BD| = |AB|·|CD| + |BC|·|DA| identically",
    "defaults": {
      "track": "OLYMPIAD GEOMETRY · PTOLEMY'S THEOREM",
      "title": "Cyclic Quadrilateral Identity: |AC| · |BD| = |AB|·|CD| + |BC|·|DA|",
      "cAngleDeg": 52,
      "dAngleDeg": 138
    },
    "controls": [
      {
        "id": "ctrl-cangledeg",
        "key": "cAngleDeg",
        "label": "Vertex C Arc Angle (deg)",
        "min": 15,
        "max": 105,
        "step": 2,
        "drag": "angle"
      },
      {
        "id": "ctrl-dangledeg",
        "key": "dAngleDeg",
        "label": "Vertex D Arc Angle (deg)",
        "min": 110,
        "max": 175,
        "step": 2
      }
    ],
    "beats": [
      {
        "label": "1 · Inscribed Quad ABCD",
        "time": 0
      },
      {
        "label": "2 · Opposite Side Pairs",
        "time": 1.5
      },
      {
        "label": "3 · Diagonals AC & BD",
        "time": 3.1
      },
      {
        "label": "4 · Exact Equality e·f = ac + bd",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "ALMAGEST GEOMETRY",
      "heading": "Ptolemy's Theorem & Sum-Difference Trig Proof",
      "latex": "|AC|\\cdot|BD| = |AB|\\cdot|CD| + |BC|\\cdot|DA|",
      "prose": "When ABCD is a rectangle, Ptolemy’s theorem reduces directly to the Pythagorean theorem; on the unit circle it encodes sin(α+β) = sin α cos β + cos α sin β."
    }
  },
  {
    "id": "feuerbach_nine_point",
    "category": "Geometry & Trig",
    "name": "Feuerbach’s Nine-Point Circle Theorem",
    "track": "Olympiad Geometry · Triangle Centers",
    "glyph": "9-Point",
    "sceneClass": "FeuerbachNinePointScene",
    "archetype": "geometry",
    "subType": "feuerbach",
    "duration": 6.2,
    "summary": "Proves that the 3 side midpoints, 3 altitude feet, and 3 Euler vertex-orthocenter midpoints of any triangle all lie on a single circle of radius R/2.",
    "dragHint": "Drag apex vertex C to deform △ABC and watch all 9 concyclic points stay locked on the Nine-Point Circle",
    "defaults": {
      "track": "OLYMPIAD GEOMETRY · NINE-POINT CIRCLE",
      "title": "Feuerbach's Circle: 3 Midpoints + 3 Altitude Feet + 3 Euler Points",
      "cxTop": 0.55,
      "cyTop": 1.95
    },
    "controls": [
      {
        "id": "ctrl-cxtop",
        "key": "cxTop",
        "label": "Apex Vertex x_C",
        "min": -1.4,
        "max": 1.6,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-cytop",
        "key": "cyTop",
        "label": "Apex Vertex y_C",
        "min": 0.8,
        "max": 2.3,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Triangle △ABC",
        "time": 0
      },
      {
        "label": "2 · 3 Side Midpoints",
        "time": 1.4
      },
      {
        "label": "3 · 3 Altitude Feet",
        "time": 2.8
      },
      {
        "label": "4 · Nine-Point Circle R/2",
        "time": 4.4
      }
    ],
    "rigor": {
      "badge": "OLYMPIAD THEOREM",
      "heading": "Nine-Point Circle & Homothety at H",
      "latex": "R_{9} = \\frac{R}{2}, \\qquad N_9 = \\frac{O + H}{2}",
      "prose": "A homothety centered at the orthocenter H (or centroid G) with scale factor 1/2 maps the circumcircle of radius R onto the Nine-Point Circle of radius R/2 centered at the midpoint of OH."
    }
  },
  {
    "id": "shoelace_pick",
    "category": "Discrete & Number Theory",
    "name": "Pick's Lattice Theorem & Gauss Shoelace Area",
    "track": "Combinatorial Geometry · Olympiad",
    "glyph": "A=I+B/2−1",
    "sceneClass": "PicksLatticeTheoremScene",
    "archetype": "geometry",
    "subType": "picks",
    "duration": 6,
    "summary": "Computes exact polygon area on an integer lattice from interior dots I and boundary dots B via A = I + B/2 − 1.",
    "dragHint": "Drag lattice vertex (x, y) to snap onto integer grid coordinates and verify A = I + B/2 − 1",
    "defaults": {
      "track": "COMBINATORIAL GEOMETRY · PICK'S THEOREM",
      "title": "Pick's Lattice Polygon Formula: Area = I + B/2 − 1",
      "vx": 3,
      "vy": 3
    },
    "controls": [
      {
        "id": "ctrl-vx",
        "key": "vx",
        "label": "Top-Right Lattice Vertex X",
        "min": 1,
        "max": 5,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-vy",
        "key": "vy",
        "label": "Top-Right Lattice Vertex Y",
        "min": 1,
        "max": 4,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Integer Grid ℤ²",
        "time": 0
      },
      {
        "label": "2 · Boundary Lattice Nodes B",
        "time": 1.5
      },
      {
        "label": "3 · Interior Lattice Nodes I",
        "time": 3
      },
      {
        "label": "4 · Shoelace = I + B/2 − 1",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "LATTICE GEOMETRY",
      "heading": "Pick's Theorem (1899) & Gauss Shoelace Identity",
      "latex": "\\text{Area}(P) = I + \\frac{B}{2} - 1 = \\frac{1}{2}\\left|\\sum_{i=1}^n (x_i y_{i+1} - x_{i+1} y_i)\\right|",
      "prose": "Every simple polygon whose vertices lie on integer grid points has an area that is a half-integer determined purely by counting interior and boundary lattice points."
    }
  },
  {
    "id": "ceva_menelaus",
    "category": "Geometry & Trig",
    "name": "Ceva's Concurrency & Centroid/Gergonne Point",
    "track": "Olympiad Geometry · Cevians",
    "glyph": "∏(AF/FB)=1",
    "sceneClass": "CevaConcurrencyScene",
    "archetype": "geometry",
    "subType": "ceva",
    "duration": 6,
    "summary": "Three cevians AD, BE, CF concur at a single interior point P if and only if (AF/FB)·(BD/DC)·(CE/EA) = 1.",
    "dragHint": "Drag concurrency point P inside △ABC to see the three side-division ratios multiply to 1.000",
    "defaults": {
      "track": "OLYMPIAD GEOMETRY · CEVA'S THEOREM",
      "title": "Ceva's Concurrency Criterion: (AF/FB) · (BD/DC) · (CE/EA) = 1",
      "wA": 1.4,
      "wB": 1
    },
    "controls": [
      {
        "id": "ctrl-wa",
        "key": "wA",
        "label": "Barycentric Mass m_A",
        "min": 0.4,
        "max": 3,
        "step": 0.1,
        "drag": "x"
      },
      {
        "id": "ctrl-wb",
        "key": "wB",
        "label": "Barycentric Mass m_B",
        "min": 0.4,
        "max": 3,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Triangle & Cevians",
        "time": 0
      },
      {
        "label": "2 · Side Division Ratios",
        "time": 1.5
      },
      {
        "label": "3 · Concurrent Point P",
        "time": 3
      },
      {
        "label": "4 · Product = 1.000",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "BARYCENTRIC BALANCE",
      "heading": "Ceva's Theorem (1678)",
      "latex": "\\frac{|AF|}{|FB|} \\cdot \\frac{|BD|}{|DC|} \\cdot \\frac{|CE|}{|EA|} = \\frac{m_B}{m_A}\\cdot\\frac{m_C}{m_B}\\cdot\\frac{m_A}{m_C} = 1",
      "prose": "Placing masses m_A, m_B, m_C at the vertices makes each cevian pass through the center of mass of the opposite side, telescoping the product of ratios to 1."
    }
  },
  {
    "id": "clt_galton",
    "category": "Probability & Stats",
    "name": "Central Limit Theorem & Binomial-to-Gaussian Convergence",
    "track": "AP Statistics · Sampling Distributions",
    "glyph": "B(n,p)→N",
    "sceneClass": "CentralLimitGaltonScene",
    "archetype": "probability",
    "subType": "binomial_clt",
    "duration": 6.2,
    "summary": "Overlays the discrete Binomial PMF B(n, p) and continuous Gaussian envelope N(np, np(1−p)) as trials n increase.",
    "dragHint": "Drag trial count n or success probability p to watch the binomial histogram approach the bell curve",
    "defaults": {
      "track": "AP STATISTICS · CENTRAL LIMIT THEOREM",
      "title": "De Moivre-Laplace CLT: Binomial B(n, p) → Normal N(np, np(1−p))",
      "trialsN": 18,
      "probP": 0.5
    },
    "controls": [
      {
        "id": "ctrl-trialsn",
        "key": "trialsN",
        "label": "Bernoulli Trials n",
        "min": 4,
        "max": 36,
        "step": 2,
        "drag": "x"
      },
      {
        "id": "ctrl-probp",
        "key": "probP",
        "label": "Success Probability p",
        "min": 0.15,
        "max": 0.85,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Galton Peg Cascade",
        "time": 0
      },
      {
        "label": "2 · Binomial Bars C(n,k)p^k",
        "time": 1.5
      },
      {
        "label": "3 · Mean np & SD √(npq)",
        "time": 3.1
      },
      {
        "label": "4 · Gaussian Limit Curve",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "DE MOIVRE-LAPLACE",
      "heading": "Normal Approximation to the Binomial Distribution",
      "latex": "P(X = k) = \\binom{n}{k}p^k(1-p)^{n-k} \\approx \\frac{1}{\\sqrt{2\\pi np(1-p)}}\\exp\\!\\left(-\\frac{(k-np)^2}{2np(1-p)}\\right)",
      "prose": "By the Central Limit Theorem, the standardized sum of n independent Bernoulli trials converges in distribution to the standard normal N(0,1)."
    }
  },
  {
    "id": "poisson_dist",
    "category": "Probability & Stats",
    "name": "Poisson Rare-Event Distribution P(k) = λ^k e^(−λ) / k!",
    "track": "Probability & Statistics · Discrete Laws",
    "glyph": "λᵏe⁻λ/k!",
    "sceneClass": "PoissonDistributionScene",
    "archetype": "probability",
    "subType": "poisson",
    "duration": 6,
    "summary": "Visualizes the Poisson PMF where mean and variance both equal λ, transitioning from skewed rare events to symmetric hump.",
    "dragHint": "Drag arrival rate λ horizontally to watch the PMF shift and widen with σ = √λ",
    "defaults": {
      "track": "PROBABILITY THEORY · POISSON PROCESS",
      "title": "Law of Rare Events: P(X = k) = λᵏ e^(−λ) / k!  (E[X] = Var(X) = λ)",
      "lambda": 3.6,
      "kHighlight": 4
    },
    "controls": [
      {
        "id": "ctrl-lambda",
        "key": "lambda",
        "label": "Rate Parameter λ",
        "min": 0.5,
        "max": 10,
        "step": 0.2,
        "drag": "x"
      },
      {
        "id": "ctrl-khighlight",
        "key": "kHighlight",
        "label": "Query Count k",
        "min": 0,
        "max": 14,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Arrival Rate λ",
        "time": 0
      },
      {
        "label": "2 · Discrete Mass Bars",
        "time": 1.5
      },
      {
        "label": "3 · Mode at ⌊λ⌋",
        "time": 3
      },
      {
        "label": "4 · Mean = Variance = λ",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "COUNTING PROCESS",
      "heading": "Poisson Limit of Binomial as n → ∞, np = λ",
      "latex": "\\lim_{n\\to\\infty}\\binom{n}{k}\\left(\\frac{\\lambda}{n}\\right)^k\\left(1-\\frac{\\lambda}{n}\\right)^{n-k} = \\frac{\\lambda^k e^{-\\lambda}}{k!}",
      "prose": "Counting independent arrivals occurring at constant average rate λ per unit interval produces the Poisson distribution with equal mean and variance λ."
    }
  },
  {
    "id": "bayes_square",
    "category": "Probability & Stats",
    "name": "Bayes' Theorem Area Partition & Base-Rate Fallacy",
    "track": "AP Statistics / Data Science · Conditional Prob",
    "glyph": "P(A|B)",
    "sceneClass": "BayesAreaPartitionScene",
    "archetype": "probability",
    "subType": "bayes",
    "duration": 6.2,
    "summary": "Partitions the unit probability square into True Positives (Teal) vs. False Positives (Amber) to show P(D|+) visually.",
    "dragHint": "Drag prior prevalence P(D) or specificity to see why rare diseases have low PPV despite 95% sensitivity",
    "defaults": {
      "track": "CONDITIONAL PROBABILITY · BAYES' THEOREM",
      "title": "Geometric Bayes Partition: P(A|B) = P(B|A)P(A) / [P(B|A)P(A) + P(B|¬A)P(¬A)]",
      "prior": 0.15,
      "sens": 0.92,
      "spec": 0.88
    },
    "controls": [
      {
        "id": "ctrl-prior",
        "key": "prior",
        "label": "Prior Prevalence P(A)",
        "min": 0.02,
        "max": 0.7,
        "step": 0.02,
        "drag": "x"
      },
      {
        "id": "ctrl-sens",
        "key": "sens",
        "label": "Sensitivity P(+|A)",
        "min": 0.5,
        "max": 0.99,
        "step": 0.01,
        "drag": "y"
      },
      {
        "id": "ctrl-spec",
        "key": "spec",
        "label": "Specificity P(−|¬A)",
        "min": 0.5,
        "max": 0.99,
        "step": 0.01
      }
    ],
    "beats": [
      {
        "label": "1 · Prior Split P(A) vs P(¬A)",
        "time": 0
      },
      {
        "label": "2 · True Positives (Teal)",
        "time": 1.5
      },
      {
        "label": "3 · False Positives (Amber)",
        "time": 3.1
      },
      {
        "label": "4 · Posterior Ratio PPV",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "BAYESIAN INFERENCE",
      "heading": "Bayes' Rule & Positive Predictive Value (PPV)",
      "latex": "P(A \\mid +) = \\frac{\\text{Area}(\\text{True }+ )}{\\text{Area}(\\text{True }+) + \\text{Area}(\\text{False }+)} = \\frac{P(+\\mid A)P(A)}{P(+)}",
      "prose": "When the base rate P(A) is small, even a small false-positive rate on the large complementary column ¬A can outweigh true positives."
    }
  },
  {
    "id": "ols_regression",
    "category": "Probability & Stats",
    "name": "Ordinary Least Squares (OLS) & Residual Squares",
    "track": "AP Statistics / Digital SAT · Linear Regression",
    "glyph": "min ∑eᵢ²",
    "sceneClass": "OLSRegressionResidualsScene",
    "archetype": "probability",
    "subType": "ols",
    "duration": 6.2,
    "summary": "Draws literal geometric squares on each vertical residual eᵢ = yᵢ − (β₀ + β₁xᵢ) and minimizes their total area at β̂₁ = r(sᵧ/sₓ).",
    "dragHint": "Drag trial slope m away from optimal β̂₁ to watch the Amber residual squares balloon in area!",
    "defaults": {
      "track": "STATISTICAL MODELING · LEAST SQUARES REGRESSION",
      "title": "Minimizing Sum of Squared Residuals: SSE(m) = ∑ [yᵢ − (ȳ + m(xᵢ − x̄))]²",
      "slopeM": 0.85,
      "noiseSpread": 0.5
    },
    "controls": [
      {
        "id": "ctrl-slopem",
        "key": "slopeM",
        "label": "Candidate Line Slope m",
        "min": -0.4,
        "max": 1.9,
        "step": 0.02,
        "drag": "y"
      },
      {
        "id": "ctrl-noisespread",
        "key": "noiseSpread",
        "label": "Scatter Dispersion s_e",
        "min": 0.1,
        "max": 1.2,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Scatter & Centroid (x̄,ȳ)",
        "time": 0
      },
      {
        "label": "2 · Vertical Residuals eᵢ",
        "time": 1.5
      },
      {
        "label": "3 · Geometric eᵢ² Squares",
        "time": 3.1
      },
      {
        "label": "4 · Optimal Slope β̂₁ = Cov/Var",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "GAUSS-MARKOV",
      "heading": "Closed-Form OLS Estimators & Centroid Pivot",
      "latex": "\\hat{\\beta}_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2} = r\\frac{s_y}{s_x}, \\qquad \\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1\\bar{x}",
      "prose": "Every least-squares regression line passes through the center of mass (x̄, ȳ) and chooses the unique slope that minimizes the sum of squared vertical residuals."
    }
  },
  {
    "id": "confidence_intervals",
    "category": "Probability & Stats",
    "name": "Confidence Interval Coverage Simulation (x̄ ± z* σ/√n)",
    "track": "AP Statistics · Statistical Inference",
    "glyph": "x̄ ± z*SE",
    "sceneClass": "ConfidenceIntervalCoverageScene",
    "archetype": "probability",
    "subType": "ci_coverage",
    "duration": 6.2,
    "summary": "Displays 20 repeated sample intervals x̄ᵢ ± z* σ/√n around true population mean μ, highlighting hits (Teal) vs. misses (Rose).",
    "dragHint": "Drag confidence level (80% to 99%) or sample size n to see interval width and miss rate adjust",
    "defaults": {
      "track": "STATISTICAL INFERENCE · CONFIDENCE INTERVAL COVERAGE",
      "title": "Repeated Sampling Coverage: x̄ᵢ ± z* (σ / √n) Capturing True μ",
      "confLevel": 95,
      "sampleN": 25
    },
    "controls": [
      {
        "id": "ctrl-conflevel",
        "key": "confLevel",
        "label": "Confidence Level C (%)",
        "min": 70,
        "max": 99,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-samplen",
        "key": "sampleN",
        "label": "Sample Size n",
        "min": 9,
        "max": 100,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · True Parameter μ",
        "time": 0
      },
      {
        "label": "2 · Sample Means x̄ᵢ",
        "time": 1.5
      },
      {
        "label": "3 · Margin of Error ±z*SE",
        "time": 3.1
      },
      {
        "label": "4 · Long-Run Capture Rate",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "FREQUENTIST COVERAGE",
      "heading": "Margin of Error & √n Precision Scaling",
      "latex": "\\text{CI} = \\bar{x} \\pm z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}}, \\qquad P\\left(\\mu \\in \\left[\\bar{X} - \\text{ME},\\, \\bar{X} + \\text{ME}\\right]\\right) = 1 - \\alpha",
      "prose": "Increasing confidence C widens the intervals to capture μ more often; quadrupling sample size n cuts the margin of error in half."
    }
  },
  {
    "id": "student_t",
    "category": "Probability & Stats",
    "name": "Student's t-Distribution Heavy Tails vs. Normal Z",
    "track": "AP Statistics · t-Tests & Degrees of Freedom",
    "glyph": "t_ν → Z",
    "sceneClass": "StudentTDistributionScene",
    "archetype": "probability",
    "subType": "student_t",
    "duration": 6,
    "summary": "Compares Gosset’s heavy-tailed Student t(ν) density against N(0,1) as degrees of freedom ν = n − 1 grow from 1 (Cauchy) to 30.",
    "dragHint": "Drag degrees of freedom ν from 1 to 30 to watch heavy tails pull into the standard normal curve",
    "defaults": {
      "track": "AP STATISTICS · STUDENT'S t-DISTRIBUTION",
      "title": "Heavy Tails from Estimating σ by s: t_ν Density vs. Standard Normal φ(z)",
      "dfNu": 3,
      "tCut": 2.1
    },
    "controls": [
      {
        "id": "ctrl-dfnu",
        "key": "dfNu",
        "label": "Degrees of Freedom ν = n−1",
        "min": 1,
        "max": 30,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-tcut",
        "key": "tCut",
        "label": "Critical Cutoff |t|",
        "min": 0.5,
        "max": 3.4,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Standard Normal N(0,1)",
        "time": 0
      },
      {
        "label": "2 · Cauchy Limit ν = 1",
        "time": 1.5
      },
      {
        "label": "3 · Heavy Tail Excess Area",
        "time": 3
      },
      {
        "label": "4 · Convergence ν → ∞",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "SMALL-SAMPLE INFERENCE",
      "heading": "Gosset's Student t Probability Density",
      "latex": "f_\\nu(t) = \\frac{\\Gamma\\!\\left(\\frac{\\nu+1}{2}\\right)}{\\sqrt{\\nu\\pi}\\,\\Gamma\\!\\left(\\frac{\\nu}{2}\\right)}\\left(1 + \\frac{t^2}{\\nu}\\right)^{-(\\nu+1)/2} \\xrightarrow{\\nu\\to\\infty} \\frac{1}{\\sqrt{2\\pi}}e^{-t^2/2}",
      "prose": "Replacing unknown population σ with noisy sample standard deviation s inflates tail probabilities, requiring a larger critical value t* > z* for small samples."
    }
  },
  {
    "id": "beta_bayesian",
    "category": "Probability & Stats",
    "name": "Beta(α, β) Conjugate Bayesian Updating",
    "track": "Bayesian Statistics · Machine Learning",
    "glyph": "x^(α−1)(1−x)^(β−1)",
    "sceneClass": "BetaConjugateUpdateScene",
    "archetype": "probability",
    "subType": "beta",
    "duration": 6,
    "summary": "Updates a Beta(α, β) belief density over coin bias p ∈ [0,1] as observed successes α and failures β accumulate.",
    "dragHint": "Drag successes α or failures β to sharpen the posterior peak around α / (α + β)",
    "defaults": {
      "track": "BAYESIAN STATISTICS · CONJUGATE BETA POSTERIOR",
      "title": "Beta-Binomial Conjugate Update: f(p; α, β) ∝ p^(α−1) (1 − p)^(β−1)",
      "alpha": 6,
      "beta": 3
    },
    "controls": [
      {
        "id": "ctrl-alpha",
        "key": "alpha",
        "label": "Alpha (Successes + Prior α)",
        "min": 1,
        "max": 20,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-beta",
        "key": "beta",
        "label": "Beta (Failures + Prior β)",
        "min": 1,
        "max": 20,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Flat Prior Beta(1,1)",
        "time": 0
      },
      {
        "label": "2 · Likelihood Evidence",
        "time": 1.5
      },
      {
        "label": "3 · Posterior Mean α/(α+β)",
        "time": 3
      },
      {
        "label": "4 · Credible Concentration",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "CONJUGATE PRIOR",
      "heading": "Beta Posterior Moments & MAP Estimate",
      "latex": "\\mathbb{E}[p] = \\frac{\\alpha}{\\alpha + \\beta}, \\qquad \\text{Mode}(p) = \\frac{\\alpha - 1}{\\alpha + \\beta - 2}, \\qquad \\text{Var}(p) = \\frac{\\alpha\\beta}{(\\alpha+\\beta)^2(\\alpha+\\beta+1)}",
      "prose": "Starting from Beta(α₀, β₀) and observing s heads and f tails in a binomial experiment yields the exact posterior Beta(α₀ + s, β₀ + f)."
    }
  },
  {
    "id": "exp_memoryless",
    "category": "Probability & Stats",
    "name": "Exponential Waiting-Time Density & CDF 1 − e^(−λt)",
    "track": "Probability & Calculus · Continuous Laws",
    "glyph": "λe^(−λt)",
    "sceneClass": "ExponentialWaitingTimeScene",
    "archetype": "probability",
    "subType": "exponential",
    "duration": 5.8,
    "summary": "Plots density f(t) = λe^(−λt) and survival probability P(T > t) = e^(−λt), illustrating the memoryless property.",
    "dragHint": "Drag hazard rate λ or cutoff time t₀ to inspect cumulative probability 1 − e^(−λt₀)",
    "defaults": {
      "track": "CONTINUOUS PROBABILITY · EXPONENTIAL WAITING TIME",
      "title": "Memoryless Survival Law: f(t) = λ e^(−λt) & P(T ≤ t₀) = 1 − e^(−λt₀)",
      "lambda": 0.85,
      "tCut": 1.8
    },
    "controls": [
      {
        "id": "ctrl-lambda",
        "key": "lambda",
        "label": "Hazard Rate λ",
        "min": 0.25,
        "max": 2,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-tcut",
        "key": "tCut",
        "label": "Wait Horizon t₀",
        "min": 0.3,
        "max": 4.5,
        "step": 0.1,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Density λe^(−λt)",
        "time": 0
      },
      {
        "label": "2 · Cumulative Area 1−e^(−λt₀)",
        "time": 1.4
      },
      {
        "label": "3 · Mean Wait μ = 1/λ",
        "time": 2.9
      },
      {
        "label": "4 · Memoryless Shift",
        "time": 4.4
      }
    ],
    "rigor": {
      "badge": "MEMORYLESS PROPERTY",
      "heading": "Inter-Arrival Time of a Poisson Process",
      "latex": "P(T > s + t \\mid T > s) = \\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} = e^{-\\lambda t} = P(T > t)",
      "prose": "The exponential distribution is the unique continuous law whose conditional future waiting time is independent of how much time has already elapsed."
    }
  },
  {
    "id": "markov_chain",
    "category": "Probability & Stats",
    "name": "Markov Chain Convergence to Stationary Distribution πP = π",
    "track": "Stochastic Processes · Linear Algebra",
    "glyph": "π = πP",
    "sceneClass": "MarkovStationaryScene",
    "archetype": "probability",
    "subType": "markov",
    "duration": 6,
    "summary": "Iterates state distribution pₜ₊₁ = pₜ P for a two-state transition matrix, converging exponentially to π₁ = q / (p + q).",
    "dragHint": "Drag switching probabilities α (A→B) and β (B→A) to shift the stationary equilibrium π*",
    "defaults": {
      "track": "STOCHASTIC PROCESSES · MARKOV CHAIN EQUILIBRIUM",
      "title": "Ergodic Convergence: pₜ₊₁ = pₜ P → π* = (β / (α+β), α / (α+β))",
      "pAToB": 0.3,
      "pBToA": 0.45
    },
    "controls": [
      {
        "id": "ctrl-patob",
        "key": "pAToB",
        "label": "Transition Rate α = P(A → B)",
        "min": 0.05,
        "max": 0.9,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-pbtoa",
        "key": "pBToA",
        "label": "Transition Rate β = P(B → A)",
        "min": 0.05,
        "max": 0.9,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Initial State p₀=(1,0)",
        "time": 0
      },
      {
        "label": "2 · Matrix Powers Pᵗ",
        "time": 1.5
      },
      {
        "label": "3 · Eigenvalue λ₂ = 1−α−β",
        "time": 3
      },
      {
        "label": "4 · Stationary Fixed Point π*",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "PERRON-FROBENIUS",
      "heading": "Two-State Stationary Eigenvector (λ₁ = 1)",
      "latex": "P = \\begin{pmatrix} 1-\\alpha & \\alpha \\\\ \\beta & 1-\\beta \\end{pmatrix} \\implies \\pi^* = \\left(\\frac{\\beta}{\\alpha+\\beta},\\, \\frac{\\alpha}{\\alpha+\\beta}\\right)",
      "prose": "At equilibrium the probability flux leaving state A (π_A · α) balances the flux entering from state B (π_B · β), with decay rate |1 − α − β|^t."
    }
  },
  {
    "id": "gershgorin_discs",
    "category": "Linear Algebra",
    "name": "Gershgorin Circle Theorem Eigenvalue Discs",
    "track": "Numerical Linear Algebra · Spectral Bounds",
    "glyph": "|λ−aᵢᵢ|≤Rᵢ",
    "sceneClass": "GershgorinDiscsScene",
    "archetype": "linalg_adv",
    "subType": "gershgorin",
    "duration": 6,
    "summary": "Bounds every eigenvalue λ of a complex matrix A inside the union of Gershgorin discs centered at diagonal entries aᵢᵢ with off-diagonal radii Rᵢ = ∑_{j≠i} |aᵢⱼ|.",
    "dragHint": "Drag off-diagonal coupling ε to watch the Gershgorin discs expand and merge around the exact eigenvalues",
    "defaults": {
      "track": "NUMERICAL LINEAR ALGEBRA · SPECTRAL LOCALIZATION",
      "title": "Gershgorin Disc Theorem: Every Eigenvalue Lies in ⋃ D(a_ii, R_i)",
      "coupling": 0.65,
      "diagSpread": 1.45
    },
    "controls": [
      {
        "id": "ctrl-coupling",
        "key": "coupling",
        "label": "Off-Diagonal Perturbation ε",
        "min": 0.05,
        "max": 1.35,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-diagspread",
        "key": "diagSpread",
        "label": "Diagonal Center Separation",
        "min": 0.7,
        "max": 2.1,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Diagonal Centers a_ii",
        "time": 0
      },
      {
        "label": "2 · Row Radii R_i = ∑|a_ij|",
        "time": 1.5
      },
      {
        "label": "3 · Trapped Eigenvalues λ_k",
        "time": 3
      },
      {
        "label": "4 · Disc Coalescence",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "SPECTRAL BOUND",
      "heading": "Gershgorin Circle Theorem (1931)",
      "latex": "\\sigma(A) \\subset \\bigcup_{i=1}^n \\left\\{z \\in \\mathbb{C} : |z - a_{ii}| \\le \\sum_{j \\ne i} |a_{ij}|\\right\\}",
      "prose": "Applying the triangle inequality to the dominant component of an eigenvector Ax = λx proves that every eigenvalue λ must lie within distance Rᵢ = ∑_{j≠i}|aᵢⱼ| of at least one diagonal entry aᵢᵢ."
    }
  },
  {
    "id": "gram_schmidt",
    "category": "Linear Algebra",
    "name": "Gram-Schmidt Orthogonalization & QR Decomposition",
    "track": "Linear Algebra · Orthonormal Bases",
    "glyph": "v₂−proj(v₂)",
    "sceneClass": "GramSchmidtQRScene",
    "archetype": "linalg_adv",
    "subType": "gram_schmidt",
    "duration": 6.2,
    "summary": "Subtracts the parallel projection proj_{u₁}(v₂) from v₂ to construct orthogonal vector u₂ ⊥ u₁ and orthonormal basis (q₁, q₂).",
    "dragHint": "Drag second vector angle θ₂ to see its parallel shadow removed to leave perpendicular residual u₂",
    "defaults": {
      "track": "LINEAR ALGEBRA · GRAM-SCHMIDT ORTHOGONALIZATION",
      "title": "Orthogonal Rejection: u₂ = v₂ − [(v₂ · u₁) / ‖u₁‖²] u₁",
      "vec2Deg": 52,
      "vec2Len": 2.3
    },
    "controls": [
      {
        "id": "ctrl-vec2deg",
        "key": "vec2Deg",
        "label": "Vector v₂ Angle θ (deg)",
        "min": 15,
        "max": 165,
        "step": 2,
        "drag": "angle"
      },
      {
        "id": "ctrl-vec2len",
        "key": "vec2Len",
        "label": "Vector ‖v₂‖ Length",
        "min": 1,
        "max": 2.8,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Non-Orthogonal (v₁,v₂)",
        "time": 0
      },
      {
        "label": "2 · Parallel Shadow proj_{u₁}v₂",
        "time": 1.5
      },
      {
        "label": "3 · Perpendicular Rejection u₂",
        "time": 3.1
      },
      {
        "label": "4 · Orthonormal Frame Q",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "QR FACTORIZATION",
      "heading": "Gram-Schmidt Projection & Rejection Identity",
      "latex": "\\mathbf{u}_1 = \\mathbf{v}_1, \\qquad \\mathbf{u}_2 = \\mathbf{v}_2 - \\frac{\\mathbf{v}_2 \\cdot \\mathbf{u}_1}{\\|\\mathbf{u}_1\\|^2}\\mathbf{u}_1 \\implies \\mathbf{u}_1 \\cdot \\mathbf{u}_2 = 0",
      "prose": "Removing the component of v₂ parallel to u₁ leaves purely the orthogonal altitude of the parallelogram, yielding A = QR."
    }
  },
  {
    "id": "cayley_trace_det",
    "category": "Linear Algebra",
    "name": "Trace-Determinant (tr A, det A) Bifurcation Plane",
    "track": "Linear Algebra & Dynamical Systems · Classification",
    "glyph": "Δ=τ²/4",
    "sceneClass": "TraceDeterminantPlaneScene",
    "archetype": "linalg_adv",
    "subType": "cayley_trace_det",
    "duration": 6.2,
    "summary": "Classifies all 2×2 linear systems dx/dt = Ax across the Poincaré (τ = tr A, Δ = det A) plane partitioned by the critical discriminant parabola Δ = τ²/4.",
    "dragHint": "Drag point (τ, Δ) across the parabola Δ = τ²/4 to morph between saddles, spirals, and nodes",
    "defaults": {
      "track": "LINEAR DYNAMICAL SYSTEMS · POINCARÉ CLASSIFICATION",
      "title": "Trace-Determinant Plane: λ = ½(τ ± √(τ² − 4Δ))",
      "traceTau": -0.9,
      "detDelta": 1.25
    },
    "controls": [
      {
        "id": "ctrl-tracetau",
        "key": "traceTau",
        "label": "Matrix Trace τ = tr(A)",
        "min": -2.4,
        "max": 2.4,
        "step": 0.1,
        "drag": "x"
      },
      {
        "id": "ctrl-detdelta",
        "key": "detDelta",
        "label": "Determinant Δ = det(A)",
        "min": -1.8,
        "max": 2.2,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · (τ, Δ) Coordinate Plane",
        "time": 0
      },
      {
        "label": "2 · Critical Parabola Δ=τ²/4",
        "time": 1.4
      },
      {
        "label": "3 · Eigenvalue Discriminant",
        "time": 2.9
      },
      {
        "label": "4 · Live Phase Portrait",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "SPECTRAL BIFURCATION",
      "heading": "Characteristic Polynomial & Poincaré Diagram",
      "latex": "\\lambda^2 - \\tau\\lambda + \\Delta = 0 \\implies \\lambda_{1,2} = \\frac{\\tau \\pm \\sqrt{\\tau^2 - 4\\Delta}}{2}",
      "prose": "Negative determinant (Δ < 0) always yields a hyperbolic saddle; above the parabola Δ > τ²/4 eigenvalues are complex conjugates producing spirals (stable for τ < 0, unstable for τ > 0)."
    }
  },
  {
    "id": "projection_subspace",
    "category": "Linear Algebra",
    "name": "Orthogonal Projection Matrix P = uuᵀ (P² = P)",
    "track": "Linear Algebra · Subspaces & Least Squares",
    "glyph": "P² = P",
    "sceneClass": "SubspaceProjectionScene",
    "archetype": "linalg_adv",
    "subType": "projection",
    "duration": 6,
    "summary": "Projects 2D space onto a 1D line at angle θ via rank-1 idempotent matrix P = u uᵀ with eigenvalues λ = 1 and λ = 0.",
    "dragHint": "Drag subspace line angle θ to project vectors onto the line and inspect nullspace kernel",
    "defaults": {
      "track": "LINEAR ALGEBRA · IDEMPOTENT PROJECTION MATRICES",
      "title": "Rank-1 Orthogonal Projection: P = u uᵀ  (P² = P, Pᵀ = P, det P = 0)",
      "lineDeg": 32,
      "vx": 1.9,
      "vy": 2.1
    },
    "controls": [
      {
        "id": "ctrl-linedeg",
        "key": "lineDeg",
        "label": "Subspace Line Angle θ (deg)",
        "min": 0,
        "max": 180,
        "step": 2,
        "drag": "angle"
      },
      {
        "id": "ctrl-vx",
        "key": "vx",
        "label": "Input Vector v_x",
        "min": -2.5,
        "max": 2.5,
        "step": 0.1,
        "drag": "x"
      },
      {
        "id": "ctrl-vy",
        "key": "vy",
        "label": "Input Vector v_y",
        "min": -2.5,
        "max": 2.5,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Subspace Line span(u)",
        "time": 0
      },
      {
        "label": "2 · Orthogonal Collapse Pv",
        "time": 1.5
      },
      {
        "label": "3 · Residual (I−P)v ⊥ u",
        "time": 3
      },
      {
        "label": "4 · Idempotence P(Pv) = Pv",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "IDEMPOTENT OPERATOR",
      "heading": "Projection Matrix onto Unit Direction u = (cos θ, sin θ)",
      "latex": "P = \\mathbf{u}\\mathbf{u}^T = \\begin{pmatrix}\\cos^2\\theta & \\cos\\theta\\sin\\theta \\\\ \\cos\\theta\\sin\\theta & \\sin^2\\theta\\end{pmatrix}, \\qquad P^2 = P, \\quad \\text{tr}(P) = 1",
      "prose": "Applying a projection matrix a second time does nothing (P² = P) because any vector already on the subspace line maps to itself."
    }
  },
  {
    "id": "householder_refl",
    "category": "Linear Algebra",
    "name": "Householder Reflection Matrix H = I − 2nnᵀ",
    "track": "Linear Algebra · Numerical Linear Algebra",
    "glyph": "I−2nnᵀ",
    "sceneClass": "HouseholderReflectionScene",
    "archetype": "linalg_adv",
    "subType": "reflection",
    "duration": 6,
    "summary": "Reflects vectors across a mirror line at angle θ via symmetric orthogonal involution H (H² = I, det H = −1).",
    "dragHint": "Drag mirror angle θ to watch vector v and its mirror image Hv flip orientation",
    "defaults": {
      "track": "LINEAR ALGEBRA · HOUSEHOLDER REFLECTION",
      "title": "Mirror Reflection Operator: H = I − 2 n nᵀ  (det H = −1, H² = I)",
      "mirrorDeg": 28,
      "vx": 1.2,
      "vy": 2.1
    },
    "controls": [
      {
        "id": "ctrl-mirrordeg",
        "key": "mirrorDeg",
        "label": "Mirror Line Angle θ (deg)",
        "min": 0,
        "max": 180,
        "step": 2,
        "drag": "angle"
      },
      {
        "id": "ctrl-vx",
        "key": "vx",
        "label": "Vector v_x",
        "min": -2.4,
        "max": 2.4,
        "step": 0.1,
        "drag": "x"
      },
      {
        "id": "ctrl-vy",
        "key": "vy",
        "label": "Vector v_y",
        "min": -2.4,
        "max": 2.4,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Mirror Line & Normal n",
        "time": 0
      },
      {
        "label": "2 · Normal Component (n·v)n",
        "time": 1.5
      },
      {
        "label": "3 · Double Jump −2(n·v)n",
        "time": 3
      },
      {
        "label": "4 · Orientation Reversal det=−1",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "ORTHOGONAL INVOLUTION",
      "heading": "Householder Reflector Spectrum (λ₁ = +1, λ₂ = −1)",
      "latex": "H = I - 2\\mathbf{n}\\mathbf{n}^T = \\begin{pmatrix}\\cos 2\\theta & \\sin 2\\theta \\\\ \\sin 2\\theta & -\\cos 2\\theta\\end{pmatrix}, \\qquad \\det H = -1",
      "prose": "Subtracting twice the normal projection flips the component perpendicular to the mirror while leaving the mirror axis invariant."
    }
  },
  {
    "id": "perron_frobenius_cone",
    "category": "Linear Algebra",
    "name": "Perron-Frobenius Positive Cone Contraction",
    "track": "Applied Linear Algebra · Spectral Theory",
    "glyph": "Ax>0",
    "sceneClass": "PerronFrobeniusConeScene",
    "archetype": "linalg_adv",
    "subType": "perron_frobenius",
    "duration": 6,
    "summary": "Shows how a strictly positive matrix A > 0 maps the entire first quadrant ℝ₊² into a narrower interior sector, contracting Hilbert’s projective metric onto the unique positive Perron eigenvector.",
    "dragHint": "Drag off-diagonal mixing α to contract the positive quadrant cone around the Perron ray",
    "defaults": {
      "track": "SPECTRAL THEORY · PERRON-FROBENIUS THEOREM",
      "title": "Positive Matrix Cone Contraction & Dominant Perron Eigenvector",
      "mixAlpha": 0.55,
      "asymRatio": 1.35
    },
    "controls": [
      {
        "id": "ctrl-mixalpha",
        "key": "mixAlpha",
        "label": "Off-Diagonal Mixing α",
        "min": 0.15,
        "max": 1.2,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-asymratio",
        "key": "asymRatio",
        "label": "Diagonal Weight Ratio",
        "min": 0.6,
        "max": 2.2,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Positive Quadrant ℝ₊²",
        "time": 0
      },
      {
        "label": "2 · Image Cone A(ℝ₊²)",
        "time": 1.5
      },
      {
        "label": "3 · Nested Cone Contraction",
        "time": 3
      },
      {
        "label": "4 · Unique Perron Ray v₁",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "POSITIVE OPERATORS",
      "heading": "Perron-Frobenius Theorem for Positive Matrices",
      "latex": "A > 0 \\implies \\exists!\\,\\lambda_{\\text{PF}} = \\rho(A) > 0 \\text{ with } A\\mathbf{v}_{\\text{PF}} = \\lambda_{\\text{PF}}\\mathbf{v}_{\\text{PF}},\\;\\mathbf{v}_{\\text{PF}} > \\mathbf{0}",
      "prose": "Because columns of A > 0 lie strictly inside the positive orthant, repeated application Aᵏ(ℝ₊²) nests strictly shrinking cones whose intersection is the unique positive Perron eigenvector."
    }
  },
  {
    "id": "power_iteration",
    "category": "Linear Algebra",
    "name": "Power Iteration Converging to Dominant Eigenvector",
    "track": "Numerical Linear Algebra · PageRank",
    "glyph": "Aᵏv₀/‖Aᵏv₀‖",
    "sceneClass": "PowerIterationEigenScene",
    "archetype": "linalg_adv",
    "subType": "power_iter",
    "duration": 6.2,
    "summary": "Repeatedly applies vₖ₊₁ = A vₖ / ‖A vₖ‖, rotating any initial seed vector toward the dominant eigenvector v₁ at rate |λ₂/λ₁|ᵏ.",
    "dragHint": "Drag initial vector angle θ₀ to watch successive normalized iterates snap onto the dominant axis",
    "defaults": {
      "track": "NUMERICAL LINEAR ALGEBRA · POWER ITERATION",
      "title": "Dominant Eigenvector Convergence: vₖ = Aᵏv₀ / ‖Aᵏv₀‖ → q₁",
      "initDeg": 118,
      "ratioLambda": 2.4
    },
    "controls": [
      {
        "id": "ctrl-initdeg",
        "key": "initDeg",
        "label": "Seed Vector Angle θ₀ (deg)",
        "min": 10,
        "max": 170,
        "step": 2,
        "drag": "angle"
      },
      {
        "id": "ctrl-ratiolambda",
        "key": "ratioLambda",
        "label": "Eigenvalue Ratio λ₁ / λ₂",
        "min": 1.2,
        "max": 4,
        "step": 0.1,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Seed Vector v₀",
        "time": 0
      },
      {
        "label": "2 · Multiply & Normalize",
        "time": 1.5
      },
      {
        "label": "3 · Decay of (λ₂/λ₁)ᵏ",
        "time": 3.1
      },
      {
        "label": "4 · Rayleigh Quotient → λ₁",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "SPECTRAL DOMINANCE",
      "heading": "Power Method & Rayleigh Quotient",
      "latex": "A^k \\mathbf{v}_0 = \\lambda_1^k\\left(c_1\\mathbf{q}_1 + c_2\\left(\\frac{\\lambda_2}{\\lambda_1}\\right)^k\\mathbf{q}_2\\right), \\qquad \\mu_k = \\frac{\\mathbf{v}_k^T A\\mathbf{v}_k}{\\mathbf{v}_k^T\\mathbf{v}_k} \\to \\lambda_1",
      "prose": "When |λ₁| > |λ₂|, repeated multiplication amplifies the dominant eigen-component exponentially faster than all others."
    }
  },
  {
    "id": "cramers_rule",
    "category": "Linear Algebra",
    "name": "Cramer's Rule: Solution Coordinates as Determinant Area Ratios",
    "track": "Linear Algebra · Systems of Equations",
    "glyph": "x₁=det(A₁)/det(A)",
    "sceneClass": "CramersRuleAreaScene",
    "archetype": "linalg_adv",
    "subType": "cramer",
    "duration": 6.2,
    "summary": "Visualizes 3b1b’s geometric proof of Cramer’s Rule: replacing column a₁ with target b scales the parallelogram area by exactly x₁!",
    "dragHint": "Drag target vector b = (bₓ, bᵧ) on the plane to see Area(b, a₂) / Area(a₁, a₂) yield coordinate x₁",
    "defaults": {
      "track": "LINEAR ALGEBRA · GEOMETRIC CRAMER'S RULE",
      "title": "Cramer's Rule via Signed Areas: x₁ = Area(b, a₂) / Area(a₁, a₂)",
      "bx": 2.1,
      "by": 1.6
    },
    "controls": [
      {
        "id": "ctrl-bx",
        "key": "bx",
        "label": "Target Vector b_x",
        "min": 0.4,
        "max": 2.8,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-by",
        "key": "by",
        "label": "Target Vector b_y",
        "min": 0.4,
        "max": 2.6,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Basis Parallelogram det(A)",
        "time": 0
      },
      {
        "label": "2 · Target Vector b = x₁a₁+x₂a₂",
        "time": 1.5
      },
      {
        "label": "3 · Sheared Area det([b, a₂])",
        "time": 3.1
      },
      {
        "label": "4 · Ratio x₁ = det(A₁)/det(A)",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "GEOMETRIC DETERMINANTS",
      "heading": "Cramer's Rule (1750) via Multilinear Area",
      "latex": "\\det([\\mathbf{b},\\, \\mathbf{a}_2]) = \\det([x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2,\\, \\mathbf{a}_2]) = x_1\\det([\\mathbf{a}_1,\\, \\mathbf{a}_2]) \\implies x_1 = \\frac{\\det A_1}{\\det A}",
      "prose": "Adding x₂a₂ parallel to the base vector a₂ shears the parallelogram without changing its altitude, so its area is strictly x₁ times det(A)."
    }
  },
  {
    "id": "modular_circle",
    "category": "Discrete & Number Theory",
    "name": "Modular Multiplication Circle (Times-Table Cardioid/Nephroid)",
    "track": "Number Theory · Modular Arithmetic",
    "glyph": "k·x mod N",
    "sceneClass": "ModularTimesCircleScene",
    "archetype": "discrete",
    "subType": "mod_circle",
    "duration": 6.4,
    "summary": "Connects each residue x ∈ {0,…,N−1} on a circle to (m · x) mod N, revealing caustic cardioid (m=2) and nephroid (m=3) envelopes.",
    "dragHint": "Drag multiplier m or modulus N to morph the modular chord web across caustic envelopes",
    "defaults": {
      "track": "NUMBER THEORY · MODULAR ARITHMETIC CHORDS",
      "title": "Residue Ring Mapping: x ↦ (m · x) mod N  (Caustic Envelope of (m−1) Cusps)",
      "modN": 72,
      "multM": 2
    },
    "controls": [
      {
        "id": "ctrl-modn",
        "key": "modN",
        "label": "Modulus Ring Size N",
        "min": 16,
        "max": 120,
        "step": 4,
        "drag": "x"
      },
      {
        "id": "ctrl-multm",
        "key": "multM",
        "label": "Multiplier Factor m",
        "min": 2,
        "max": 9,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · N Roots on Circle",
        "time": 0
      },
      {
        "label": "2 · Residue Chords x → mx",
        "time": 1.5
      },
      {
        "label": "3 · (m−1)-Cusp Caustic",
        "time": 3.1
      },
      {
        "label": "4 · Ring Symmetry",
        "time": 4.8
      }
    ],
    "rigor": {
      "badge": "MODULAR RESIDUES",
      "heading": "Envelope of Chords Connecting θ to m·θ",
      "latex": "x \\mapsto (m\\cdot x)\\bmod N \\implies \\text{Envelope has } (m - 1) \\text{ interior cusps}",
      "prose": "Doubling angles around a circle (m = 2) produces the exact tangent envelope of a cardioid; tripling angles (m = 3) produces a two-cusped nephroid."
    }
  },
  {
    "id": "euclidean_gcd",
    "category": "Discrete & Number Theory",
    "name": "Euclidean Algorithm GCD via Square Tiling",
    "track": "Number Theory · Discrete Mathematics",
    "glyph": "gcd(a,b)",
    "sceneClass": "EuclideanGCDTilingScene",
    "archetype": "discrete",
    "subType": "euclid_gcd",
    "duration": 6,
    "summary": "Tiles an a × b rectangle with the largest possible squares at each step (a = q·b + r) until the final square side reveals gcd(a, b).",
    "dragHint": "Drag rectangle dimensions a and b to see the Euclidean square dissection compute gcd(a, b)",
    "defaults": {
      "track": "NUMBER THEORY · EUCLIDEAN GCD DISSECTION",
      "title": "Euclid's Elements Book VII: gcd(a, b) = gcd(b, a mod b) via Square Tiling",
      "rectA": 21,
      "rectB": 13
    },
    "controls": [
      {
        "id": "ctrl-recta",
        "key": "rectA",
        "label": "Rectangle Width a",
        "min": 6,
        "max": 36,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-rectb",
        "key": "rectB",
        "label": "Rectangle Height b",
        "min": 4,
        "max": 28,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · a × b Rectangle",
        "time": 0
      },
      {
        "label": "2 · Quotient Squares ⌊a/b⌋",
        "time": 1.5
      },
      {
        "label": "3 · Remainder Sub-Rectangles",
        "time": 3
      },
      {
        "label": "4 · Terminal Square = gcd(a,b)",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "DIVISION ALGORITHM",
      "heading": "Geometric Invariance of Common Divisors",
      "latex": "a = q b + r \\implies \\gcd(a, b) = \\gcd(b, r) \\quad (0 \\le r < b)",
      "prose": "Any square tile that evenly divides both a and b must also divide the remainder r = a − qb, so removing b×b squares preserves the greatest common divisor."
    }
  },
  {
    "id": "fibonacci_golden",
    "category": "Discrete & Number Theory",
    "name": "Fibonacci Ratios F_{n+1}/F_n Converging to Golden Ratio φ",
    "track": "Sequences & Series · Number Theory",
    "glyph": "Fₙ₊₁/Fₙ→φ",
    "sceneClass": "FibonacciGoldenSpiralScene",
    "archetype": "discrete",
    "subType": "fibonacci",
    "duration": 6,
    "summary": "Plots the alternating convergence of F_{n+1}/F_n above and below φ = (1+√5)/2 ≈ 1.61803 alongside golden whirling squares.",
    "dragHint": "Drag term index N to step through the Fibonacci spiral and Cassini identity error (−1)ⁿ/Fₙ²",
    "defaults": {
      "track": "SEQUENCES & SERIES · FIBONACCI & GOLDEN RATIO",
      "title": "Golden Ratio Convergence: lim (Fₙ₊₁ / Fₙ) = φ = (1 + √5) / 2 ≈ 1.618034",
      "maxTerm": 9,
      "seedB": 1
    },
    "controls": [
      {
        "id": "ctrl-maxterm",
        "key": "maxTerm",
        "label": "Fibonacci Step n",
        "min": 3,
        "max": 12,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-seedb",
        "key": "seedB",
        "label": "Second Seed F₂ (Lucas/Fib)",
        "min": 1,
        "max": 4,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Whirling Golden Squares",
        "time": 0
      },
      {
        "label": "2 · Quarter-Circle Spiral",
        "time": 1.5
      },
      {
        "label": "3 · Alternating Ratios Fₙ₊₁/Fₙ",
        "time": 3
      },
      {
        "label": "4 · Binet Eigenvalue φ",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "KEPLER-BINET LIMIT",
      "heading": "Characteristic Equation x² − x − 1 = 0 & Cassini's Identity",
      "latex": "F_{n+1}F_{n-1} - F_n^2 = (-1)^n \\implies \\frac{F_{n+1}}{F_n} - \\varphi = \\mathcal{O}(\\varphi^{-2n})",
      "prose": "Regardless of positive starting seeds, consecutive terms of F_{n+1} = F_n + F_{n−1} converge to the dominant root φ = (1+√5)/2 of x² = x + 1."
    }
  },
  {
    "id": "collatz_orbit",
    "category": "Discrete & Number Theory",
    "name": "Collatz 3n + 1 Hailstone Stopping-Time Trajectory",
    "track": "Number Theory · Unsolved Conjectures",
    "glyph": "3n+1, n/2",
    "sceneClass": "CollatzHailstoneScene",
    "archetype": "discrete",
    "subType": "collatz",
    "duration": 6.2,
    "summary": "Traces the hailstone sequence (n/2 if even, 3n+1 if odd) from seed n₀ through its peak altitude down to the 4 → 2 → 1 cycle.",
    "dragHint": "Drag starting integer n₀ (try n₀ = 27!) to watch the hailstone altitude soar before crashing to 1",
    "defaults": {
      "track": "NUMBER THEORY · COLLATZ 3n + 1 CONJECTURE",
      "title": "Hailstone Orbit: f(n) = n/2 (even) or 3n + 1 (odd) → 4 → 2 → 1",
      "seedN": 19,
      "logScale": 0
    },
    "controls": [
      {
        "id": "ctrl-seedn",
        "key": "seedN",
        "label": "Starting Integer Seed n₀",
        "min": 3,
        "max": 35,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-logscale",
        "key": "logScale",
        "label": "Display Mode (0=Linear, 1=Log)",
        "min": 0,
        "max": 1,
        "step": 1
      }
    ],
    "beats": [
      {
        "label": "1 · Seed Integer n₀",
        "time": 0
      },
      {
        "label": "2 · 3n+1 Odd Climbs",
        "time": 1.5
      },
      {
        "label": "3 · Peak Hailstone Altitude",
        "time": 3.1
      },
      {
        "label": "4 · Power-of-2 Descent → 1",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "OPEN PROBLEM (1937)",
      "heading": "Collatz Parity Map & Stopping Time",
      "latex": "T(n) = \\begin{cases} n/2 & n \\equiv 0 \\pmod 2 \\\\ 3n+1 & n \\equiv 1 \\pmod 2 \\end{cases}",
      "prose": "Every odd step 3n+1 produces an even integer that is immediately halved at least once; heuristically, geometric drift (3/4)^(1/2) < 1 drives orbits toward 1."
    }
  },
  {
    "id": "birthday_paradox",
    "category": "Discrete & Number Theory",
    "name": "Birthday Paradox Collision Probability Curve",
    "track": "Combinatorics & Probability · Pigeonhole",
    "glyph": "k=23→50.7%",
    "sceneClass": "BirthdayParadoxScene",
    "archetype": "discrete",
    "subType": "birthday",
    "duration": 6,
    "summary": "Plots P(collision) = 1 − ∏_{i=0}^{k−1}(1 − i/365) ≈ 1 − e^(−k(k−1)/730), crossing 50% at just k = 23 people!",
    "dragHint": "Drag group size k across k = 23 to see the quadratic number of pairs k(k−1)/2 drive collision past 50%",
    "defaults": {
      "track": "COMBINATORIAL PROBABILITY · BIRTHDAY PARADOX",
      "title": "Quadratic Pair Collisions: P(match) = 1 − 365! / [(365−k)! 365ᵏ]",
      "peopleK": 23,
      "daysN": 365
    },
    "controls": [
      {
        "id": "ctrl-peoplek",
        "key": "peopleK",
        "label": "Room Group Size k",
        "min": 2,
        "max": 65,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-daysn",
        "key": "daysN",
        "label": "Hash Bucket Space N",
        "min": 100,
        "max": 500,
        "step": 5
      }
    ],
    "beats": [
      {
        "label": "1 · Complementary No-Match",
        "time": 0
      },
      {
        "label": "2 · C(k,2) = k(k−1)/2 Pairs",
        "time": 1.5
      },
      {
        "label": "3 · 50.7% Threshold at k=23",
        "time": 3
      },
      {
        "label": "4 · 99.9% Certainty at k=70",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "QUADRATIC PAIRS",
      "heading": "Gaussian Decay of Collision-Free Probability",
      "latex": "P(\\text{match}) = 1 - \\prod_{i=1}^{k-1}\\left(1 - \\frac{i}{N}\\right) \\approx 1 - \\exp\\!\\left(-\\frac{k(k-1)}{2N}\\right)",
      "prose": "Because k people form k(k−1)/2 distinct pairs, the 50% collision threshold occurs at k ≈ √(2N ln 2) ≈ 1.177√N (23 for N = 365)."
    }
  },
  {
    "id": "pascal_sierpinski",
    "category": "Discrete & Number Theory",
    "name": "Pascal's Triangle Binomial Coefficients & Lucas Mod-2 Sierpinski",
    "track": "Combinatorics · Binomial Theorem",
    "glyph": "C(n,k) mod 2",
    "sceneClass": "PascalSierpinskiScene",
    "archetype": "discrete",
    "subType": "pascal",
    "duration": 6,
    "summary": "Highlights odd vs. even binomial coefficients C(n, k) across rows of Pascal’s triangle, unveiling the self-similar Sierpinski gasket.",
    "dragHint": "Drag row depth N or modulus p to see Lucas’s Theorem fractal self-similarity emerge",
    "defaults": {
      "track": "COMBINATORICS · PASCAL'S TRIANGLE & LUCAS THEOREM",
      "title": "Binomial Parity Fractal: C(n, k) = C(n−1, k−1) + C(n−1, k) (mod p)",
      "rowsN": 16,
      "modP": 2
    },
    "controls": [
      {
        "id": "ctrl-rowsn",
        "key": "rowsN",
        "label": "Pascal Triangle Rows N",
        "min": 6,
        "max": 16,
        "step": 2,
        "drag": "x"
      },
      {
        "id": "ctrl-modp",
        "key": "modP",
        "label": "Prime Modulus p",
        "min": 2,
        "max": 5,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Binomial Recurrence",
        "time": 0
      },
      {
        "label": "2 · Row Sums ∑ C(n,k) = 2ⁿ",
        "time": 1.5
      },
      {
        "label": "3 · Odd Parity Highlighting",
        "time": 3
      },
      {
        "label": "4 · Sierpinski Fractal Limit",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "KUMMER-LUCAS THEOREM",
      "heading": "Binary Parity of Binomial Coefficients",
      "latex": "\\binom{n}{k} \\equiv 1 \\pmod 2 \\iff (k \\;\\ \\& \\;\\ (n - k)) = 0 \\text{ in base 2}",
      "prose": "By Kummer’s theorem, C(n,k) is odd if and only if adding k and n−k in binary produces zero carries, generating the Sierpinski triangle."
    }
  },
  {
    "id": "projectile_drag",
    "category": "Physics & Differential Eq",
    "name": "Projectile Ballistics: Vacuum Parabola vs. Quadratic Drag",
    "track": "AP Physics C / Mechanics · Kinematics",
    "glyph": "v₀cosθ,v₀sinθ",
    "sceneClass": "ProjectileBallisticsScene",
    "archetype": "physics",
    "subType": "projectile",
    "duration": 6.2,
    "summary": "Compares the ideal vacuum trajectory y = x tan θ − gx²/(2v₀²cos²θ) against air-resistance asymmetry and max-range angle θ = 45°.",
    "dragHint": "Drag launch angle θ₀ (try complementary angles 30° & 60°!) or drag coefficient c_d",
    "defaults": {
      "track": "CLASSICAL MECHANICS · PROJECTILE BALLISTICS",
      "title": "Ballistic Parabola & Complementary Range: R = (v₀² / g) sin(2θ₀)",
      "launchDeg": 45,
      "dragC": 0.18
    },
    "controls": [
      {
        "id": "ctrl-launchdeg",
        "key": "launchDeg",
        "label": "Launch Angle θ₀ (deg)",
        "min": 15,
        "max": 80,
        "step": 1,
        "drag": "angle"
      },
      {
        "id": "ctrl-dragc",
        "key": "dragC",
        "label": "Air Drag Coefficient γ",
        "min": 0,
        "max": 0.6,
        "step": 0.02,
        "drag": "x"
      }
    ],
    "beats": [
      {
        "label": "1 · Velocity Decomposition",
        "time": 0
      },
      {
        "label": "2 · Apex H = v₀²sin²θ / 2g",
        "time": 1.5
      },
      {
        "label": "3 · Vacuum vs Drag Asymmetry",
        "time": 3.1
      },
      {
        "label": "4 · Max Range at 2θ = 90°",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "GALILEAN KINEMATICS",
      "heading": "Trajectory Elimination & Range Symmetry",
      "latex": "y(x) = x\\tan\\theta_0 - \\frac{g x^2}{2v_0^2\\cos^2\\theta_0}, \\qquad R_{\\text{vac}} = \\frac{v_0^2}{g}\\sin(2\\theta_0)",
      "prose": "Because sin(2(90°−θ)) = sin(2θ), complementary angles like 30° and 60° achieve the exact same horizontal range in a vacuum, maximized at 45°."
    }
  },
  {
    "id": "doppler_mach_shock",
    "category": "Physics & ODEs",
    "name": "Doppler Wavefronts & Supersonic Mach Shock Cone",
    "track": "Wave Physics & Fluid Mechanics · Acoustics",
    "glyph": "sinμ=1/M",
    "sceneClass": "DopplerMachConeScene",
    "archetype": "physics",
    "subType": "doppler_mach",
    "duration": 6.2,
    "summary": "Emits expanding circular wavefronts from a moving source to demonstrate Doppler wavelength compression (M < 1), the sonic barrier (M = 1), and the V-shaped Mach shock cone (M > 1).",
    "dragHint": "Drag Mach number M = v_s / c past 1.0 to break the sound barrier and form a Mach cone",
    "defaults": {
      "track": "WAVE MECHANICS · DOPPLER SHIFT & MACH ENVELOPE",
      "title": "Supersonic Mach Cone: sin(μ) = c / v_s = 1 / M",
      "machM": 1.45,
      "waveCount": 7
    },
    "controls": [
      {
        "id": "ctrl-machm",
        "key": "machM",
        "label": "Mach Number M = v_s / c",
        "min": 0.3,
        "max": 2.4,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-wavecount",
        "key": "waveCount",
        "label": "Emitted Wavefront Pulses",
        "min": 4,
        "max": 10,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Moving Wave Emitter",
        "time": 0
      },
      {
        "label": "2 · Compressed Front λ'",
        "time": 1.5
      },
      {
        "label": "3 · Sonic Barrier M = 1",
        "time": 3
      },
      {
        "label": "4 · Mach Cone Envelope",
        "time": 4.6
      }
    ],
    "rigor": {
      "badge": "WAVE KINEMATICS",
      "heading": "Doppler Shift & Mach Shock Half-Angle",
      "latex": "f_{\\text{front}} = \\frac{f_0}{1 - M}, \\qquad \\sin\\mu = \\frac{c\\,t}{v_s\\,t} = \\frac{1}{M} \\quad (M > 1)",
      "prose": "When source speed v_s exceeds wave speed c (M > 1), spherical wavefronts lag behind the source and form a conical Huygens tangent envelope with half-angle μ = arcsin(1/M)."
    }
  },
  {
    "id": "minkowski_light_cone",
    "category": "Physics & ODEs",
    "name": "Minkowski Spacetime Diagram & Lorentz Boost",
    "track": "Modern Physics · Special Relativity & Hyperbolic Geometry",
    "glyph": "ds²=c²dt²−dx²",
    "sceneClass": "MinkowskiSpacetimeScene",
    "archetype": "physics",
    "subType": "minkowski",
    "duration": 6.2,
    "summary": "Tilts the moving observer’s (ct′, x′) axes symmetrically toward the 45° invariant light cone x = ±ct as velocity β = v/c increases, preserving the spacetime hyperbola c²t² − x² = s².",
    "dragHint": "Drag relativistic velocity β = v/c to scissor the boosted axes (ct′, x′) toward the light cone",
    "defaults": {
      "track": "SPECIAL RELATIVITY · LORENTZ TRANSFORMATION GEOMETRY",
      "title": "Minkowski Diagram: Boosted Simultaneity & Invariant Hyperbolas",
      "betaV": 0.52,
      "intervalS": 1.25
    },
    "controls": [
      {
        "id": "ctrl-betav",
        "key": "betaV",
        "label": "Relativistic Speed β = v/c",
        "min": -0.82,
        "max": 0.82,
        "step": 0.04,
        "drag": "x"
      },
      {
        "id": "ctrl-intervals",
        "key": "intervalS",
        "label": "Invariant Proper Time τ",
        "min": 0.6,
        "max": 1.8,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      {
        "label": "1 · Rest Frame & Light Cone",
        "time": 0
      },
      {
        "label": "2 · Scissoring Axes (ct',x')",
        "time": 1.5
      },
      {
        "label": "3 · Invariant Hyperbola",
        "time": 3.1
      },
      {
        "label": "4 · Relativity of Simultaneity",
        "time": 4.7
      }
    ],
    "rigor": {
      "badge": "HYPERBOLIC SPACETIME",
      "heading": "Lorentz Boost & Minkowski Metric Invariance",
      "latex": "\\begin{pmatrix}ct'\\\\x'\\end{pmatrix} = \\gamma\\begin{pmatrix}1 & -\\beta\\\\-\\beta & 1\\end{pmatrix}\\begin{pmatrix}ct\\\\x\\end{pmatrix}, \\quad \\gamma = \\frac{1}{\\sqrt{1-\\beta^2}}",
      "prose": "Unlike Euclidean rotation which moves axes in the same direction along a circle, a Lorentz boost tilts the time axis ct′ and space axis x′ symmetrically by angle arctan(β) toward the invariant 45° light cone along a hyperbola."
    }
  },
  {
    "id": "sat_vertex_parabola",
    "category": "SAT / Algebra",
    "name": "Digital SAT Parabola Vertex & Discriminant Explorer",
    "track": "Digital SAT Math · Passport to Advanced Math",
    "glyph": "a(x−h)²+k",
    "sceneClass": "SATVertexDiscriminantScene",
    "archetype": "exam_traps",
    "subType": "sat_parabola",
    "duration": 6,
    "summary": "Links vertex form f(x) = a(x − h)² + k directly to axis of symmetry x = h, extremum k, and discriminant Δ = b² − 4ac.",
    "dragHint": "Drag vertex (h, k) anywhere on the coordinate plane to see roots appear/vanish as Δ = −4ak changes sign!",
    "defaults": {
      "track": "DIGITAL SAT MATH · QUADRATIC VERTEX & DISCRIMINANT",
      "title": "Vertex Form & Real Root Count: y = a(x − h)² + k  (Δ = −4ak)",
      "hVert": 1.2,
      "kVert": -1.6,
      "aScale": 0.8
    },
    "controls": [
      {
        "id": "ctrl-hvert",
        "key": "hVert",
        "label": "Vertex x-Coordinate h",
        "min": -2.4,
        "max": 2.6,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-kvert",
        "key": "kVert",
        "label": "Vertex y-Coordinate k",
        "min": -2.6,
        "max": 2.4,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-ascale",
        "key": "aScale",
        "label": "Concavity Coefficient a",
        "min": -1.6,
        "max": 1.6,
        "step": 0.1
      }
    ],
    "beats": [
      {
        "label": "1 · Axis of Symmetry x = h",
        "time": 0
      },
      {
        "label": "2 · Vertex Extremum (h, k)",
        "time": 1.5
      },
      {
        "label": "3 · Symmetric Roots h ± √(−k/a)",
        "time": 3
      },
      {
        "label": "4 · Vieta Sum 2h & Product",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "DIGITAL SAT CORE",
      "heading": "Vertex Form, Discriminant Δ, and Vieta’s Formulas",
      "latex": "y = a(x - h)^2 + k \\implies x_{1,2} = h \\pm \\sqrt{-\\frac{k}{a}}, \\qquad x_1 + x_2 = 2h = -\\frac{b}{a}",
      "prose": "A parabola has two distinct real x-intercepts when a and k have opposite signs (Δ > 0), one tangent double root when k = 0 (Δ = 0), and no real roots when a·k > 0."
    }
  },
  {
    "id": "qudrat_shaded_area",
    "category": "Qudrat & Olympiad",
    "name": "Qudrat Geometric Comparison: Inscribed Square vs. Circle Ratio",
    "track": "Qiyas GAT Qudrat · الهندسة والمقارنات",
    "glyph": "π/2 vs 4/π",
    "sceneClass": "QudratInscribedAreaScene",
    "archetype": "exam_traps",
    "subType": "qudrat_geometry",
    "duration": 6,
    "summary": "Compares a circle circumscribed around a square (Area ratio π : 2) with an inscribed circle inside the square (Area ratio π : 4).",
    "dragHint": "Drag radius R to verify that the outer circle is ALWAYS exactly 2× the area of the inner inscribed circle!",
    "defaults": {
      "track": "QIYAS GAT QUDRAT · المساحات المظللة في الدائرة والمربع",
      "title": "Concentric Circle-Square-Circle Ratio: A_outer / A_inner = 2.000 Exactly",
      "radiusR": 1.8,
      "rotDeg": 0
    },
    "controls": [
      {
        "id": "ctrl-radiusr",
        "key": "radiusR",
        "label": "Outer Circle Radius R",
        "min": 0.8,
        "max": 2.4,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-rotdeg",
        "key": "rotDeg",
        "label": "Square Rotation Angle (deg)",
        "min": 0,
        "max": 90,
        "step": 2,
        "drag": "angle"
      }
    ],
    "beats": [
      {
        "label": "1 · Outer Circle πR²",
        "time": 0
      },
      {
        "label": "2 · Inscribed Square 2R²",
        "time": 1.5
      },
      {
        "label": "3 · Inner Circle π(R/√2)²",
        "time": 3
      },
      {
        "label": "4 · Exact 2 : 1 Area Ratio",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "QUDRAT SHORTCUT",
      "heading": "Universal 2:1 Scaling of Concentric Inscribed Figures",
      "latex": "A_{\\text{outer }\\bigcirc} = \\pi R^2, \\quad A_{\\square} = 2R^2, \\quad A_{\\text{inner }\\bigcirc} = \\frac{\\pi R^2}{2} \\implies \\frac{A_{\\text{outer }\\bigcirc}}{A_{\\text{inner }\\bigcirc}} = 2",
      "prose": "Because the square’s diagonal is 2R, its side is R√2 and the inner circle’s radius is r = R/√2; squaring the radius ratio (1/√2)² = 1/2 makes the inner circle exactly half the outer circle."
    }
  },
  {
    "id": "qudrat_clock_angle",
    "category": "Qudrat & Olympiad",
    "name": "Qudrat Clock Hands Angle Formula |30H − 5.5M|",
    "track": "Qiyas GAT Qudrat · مسائل الساعة والزوايا",
    "glyph": "|30H−5.5M|",
    "sceneClass": "QudratClockAngleScene",
    "archetype": "exam_traps",
    "subType": "qudrat_clock",
    "duration": 6,
    "summary": "Visualizes why the hour hand advances 0.5° per minute while the minute hand advances 6° per minute, yielding Δθ = |30H − 5.5M|.",
    "dragHint": "Drag minutes M around the clock dial to see the hour hand creep by +0.5°/min and update |30H − 5.5M|",
    "defaults": {
      "track": "QIYAS GAT QUDRAT · قانون زاوية عقارب الساعة",
      "title": "Clock Hands Relative Angular Speed: θ = |30°·H − 5.5°·M|",
      "hourH": 3,
      "minM": 30
    },
    "controls": [
      {
        "id": "ctrl-hourh",
        "key": "hourH",
        "label": "Hour Hand Mark H (1–12)",
        "min": 1,
        "max": 12,
        "step": 1
      },
      {
        "id": "ctrl-minm",
        "key": "minM",
        "label": "Minutes Elapsed M (0–59)",
        "min": 0,
        "max": 59,
        "step": 1,
        "drag": "angle"
      }
    ],
    "beats": [
      {
        "label": "1 · Hour Mark 30°·H",
        "time": 0
      },
      {
        "label": "2 · Minute Sweep 6°·M",
        "time": 1.5
      },
      {
        "label": "3 · Hour Creep +0.5°·M",
        "time": 3
      },
      {
        "label": "4 · Exact Angle |30H−5.5M|",
        "time": 4.5
      }
    ],
    "rigor": {
      "badge": "QUDRAT CLASSIC TRAP",
      "heading": "Relative Angular Velocity (6°/min − 0.5°/min = 5.5°/min)",
      "latex": "\\theta_{\\text{hour}} = 30^\\circ H + 0.5^\\circ M, \\quad \\theta_{\\text{min}} = 6^\\circ M \\implies \\Delta\\theta = \\left|30^\\circ H - \\frac{11^\\circ}{2}M\\right|",
      "prose": "At 3:30 the angle is NOT 90°: the hour hand has moved halfway toward 4 (+15°), leaving an acute angle of |90° − 165°| = 75°."
    }
  },
  {
    "id": "const_perp_bisector",
    "category": "Geometrical Constructions",
    "name": "Perpendicular Bisector & Equidistant Locus (PA = PB)",
    "track": "Euclid Elements I.10 · IGCSE 0580 Construction",
    "glyph": "⊥",
    "sceneClass": "PerpendicularBisectorConstructionScene",
    "archetype": "construction",
    "subType": "const_perp_bisector",
    "duration": 6,
    "summary": "Sweeps two equal-radius compass arcs centered at A and B (R > ½|AB|) to locate intersections P and Q, constructing the straightedge perpendicular bisector PQ ⊥ AB.",
    "dragHint": "Drag segment half-length a or compass radius ratio R/a to watch the two lens arcs intersect at P and Q",
    "defaults": {
      "track": "EUCLID ELEMENTS I.10 · IGCSE 0580 LOCUS CONSTRUCTION",
      "title": "Compass & Straightedge Perpendicular Bisector: PA = PB",
      "halfLen": 1.45,
      "radiusRatio": 1.35
    },
    "controls": [
      {
        "id": "ctrl-halflen",
        "key": "halfLen",
        "label": "Segment Half-Length a = ½|AB|",
        "min": 0.8,
        "max": 2.1,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-radratio",
        "key": "radiusRatio",
        "label": "Compass Radius Ratio R / a (> 1)",
        "min": 1.08,
        "max": 1.85,
        "step": 0.02,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Given Segment AB", "time": 0 },
      { "label": "2 · Arc Centered at A", "time": 1.4 },
      { "label": "3 · Arc Centered at B", "time": 2.8 },
      { "label": "4 · Straightedge Bisector PQ", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK I PROP. 10",
      "heading": "Rhombus Congruence & Equidistant Locus Theorem",
      "latex": "|AP| = |BP| = |AQ| = |BQ| = R \\implies \\triangle APQ \\cong \\triangle BPQ \\implies PQ \\perp AB \\;\\text{at midpoint } M",
      "prose": "Because the four compass radii form a rhombus APBQ, its diagonals PQ and AB bisect each other at 90°. Every point on line PQ is equidistant from A and B."
    }
  },
  {
    "id": "const_angle_bisector",
    "category": "Geometrical Constructions",
    "name": "Angle Bisector Compass Construction & Equidistant Rays",
    "track": "Euclid Elements I.9 · IGCSE 0580 Locus",
    "glyph": "∠/2",
    "sceneClass": "AngleBisectorConstructionScene",
    "archetype": "construction",
    "subType": "const_angle_bisector",
    "duration": 6,
    "summary": "Strikes a primary compass arc from vertex O cutting the rays at D and E, then equal arcs from D and E meeting at F so straightedge ray OF bisects ∠AOB.",
    "dragHint": "Drag opening angle θ or primary compass radius r₁ to bisect ∠AOB and verify equal distances to both arms",
    "defaults": {
      "track": "EUCLID ELEMENTS I.9 · ANGLE BISECTOR CONSTRUCTION",
      "title": "Compass Angle Bisector & Locus Equidistant from Two Intersecting Lines",
      "angleDeg": 68,
      "arcR": 1.65
    },
    "controls": [
      {
        "id": "ctrl-angdeg",
        "key": "angleDeg",
        "label": "Given Vertex Angle θ (deg)",
        "min": 24,
        "max": 136,
        "step": 2,
        "drag": "angle"
      },
      {
        "id": "ctrl-arcr",
        "key": "arcR",
        "label": "Primary Compass Radius r₁",
        "min": 1.0,
        "max": 2.2,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      { "label": "1 · Vertex O & Rays OA, OB", "time": 0 },
      { "label": "2 · Primary Arc D, E", "time": 1.4 },
      { "label": "3 · Equal Arcs from D & E → F", "time": 2.8 },
      { "label": "4 · Bisector Ray OF (θ/2)", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK I PROP. 9",
      "heading": "SSS Triangle Congruence (△ODF ≅ △OEF)",
      "latex": "|OD| = |OE| = r_1,\\; |DF| = |EF| = r_2,\\; |OF| = |OF| \\implies \\angle DOF = \\angle EOF = \\frac{\\theta}{2}",
      "prose": "By Side-Side-Side congruence, ray OF divides ∠AOB into two equal halves, and orthogonal projections from F onto OA and OB have equal length r₁ sin(θ/2)."
    }
  },
  {
    "id": "const_equilateral_60",
    "category": "Geometrical Constructions",
    "name": "Vesica Piscis, Equilateral Triangle & Exact 60° / 30°",
    "track": "Euclid Elements I.1 · Classical Construction",
    "glyph": "60°",
    "sceneClass": "EquilateralSixtyConstructionScene",
    "archetype": "construction",
    "subType": "const_equilateral_60",
    "duration": 6,
    "summary": "Constructs Euclid's Proposition I.1 Vesica Piscis from two full circles of radius |AB| to form equilateral △ABC (60°) and bisects it to construct an exact 30° ray.",
    "dragHint": "Drag base length s = |AB| or toggle the 30° bisector step to inspect the Vesica Piscis almond geometry",
    "defaults": {
      "track": "EUCLID ELEMENTS PROPOSITION I.1 · VESICA PISCIS",
      "title": "Equilateral Triangle △ABC & Exact 60° / 30° Compass Construction",
      "sideLen": 1.85,
      "showBisect": 1
    },
    "controls": [
      {
        "id": "ctrl-sidelen",
        "key": "sideLen",
        "label": "Base Segment Length s = |AB|",
        "min": 1.1,
        "max": 2.3,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-showbisect",
        "key": "showBisect",
        "label": "30° Bisection Overlay (0–1)",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Base Segment AB (s)", "time": 0 },
      { "label": "2 · Circle A & Circle B", "time": 1.4 },
      { "label": "3 · Apex C & 60° Triangle", "time": 2.8 },
      { "label": "4 · Exact 30° Bisector Ray", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK I PROP. 1",
      "heading": "The First Proposition of Euclid's Elements",
      "latex": "|AC| = |AB| = s \\;\\land\\; |BC| = |BA| = s \\implies |AB| = |BC| = |CA|, \\quad h = \\frac{\\sqrt{3}}{2}s",
      "prose": "Because C lies on both circles of radius s centered at A and B, all three sides equal s, yielding exact 60° interior angles without any protractor."
    }
  },
  {
    "id": "const_drop_perp_point",
    "category": "Geometrical Constructions",
    "name": "Dropping a Perpendicular from an External Point to a Line",
    "track": "Euclid Elements I.12 · Orthogonal Projection",
    "glyph": "P⊥ℓ",
    "sceneClass": "DropPerpendicularPointScene",
    "archetype": "construction",
    "subType": "const_drop_perp_point",
    "duration": 6,
    "summary": "Swings a compass arc from external point P cutting line ℓ at A and B, then equal arcs from A and B meeting at Q below ℓ so straightedge PQ meets ℓ at 90°.",
    "dragHint": "Drag external point P(x_P, y_P) to watch the compass chord AB and orthogonal foot H update live",
    "defaults": {
      "track": "EUCLID ELEMENTS I.12 · EXTERNAL PERPENDICULAR",
      "title": "Dropping a Perpendicular from External Point P onto Line ℓ",
      "px": 0.55,
      "py": 1.65
    },
    "controls": [
      {
        "id": "ctrl-px",
        "key": "px",
        "label": "External Point X-Position x_P",
        "min": -1.4,
        "max": 1.4,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-py",
        "key": "py",
        "label": "External Point Height y_P",
        "min": 0.85,
        "max": 2.35,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Line ℓ & External Point P", "time": 0 },
      { "label": "2 · Arc from P Cuts ℓ at A, B", "time": 1.4 },
      { "label": "3 · Arcs from A, B Meet at Q", "time": 2.8 },
      { "label": "4 · Orthogonal Foot H (PH ⊥ ℓ)", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK I PROP. 12",
      "heading": "Shortest Distance & Orthogonal Projection Foot",
      "latex": "|PA| = |PB| = R,\\; |QA| = |QB| \\implies PQ \\perp AB \\;\\text{at } H(x_P, y_\\ell), \\quad d_{\\min}(P,\\ell) = |PH|",
      "prose": "Constructing points A and B equidistant from P reduces the external perpendicular problem to bisecting chord AB via symmetric lower intersection Q."
    }
  },
  {
    "id": "const_erect_perp_on_line",
    "category": "Geometrical Constructions",
    "name": "Erecting a 90° Perpendicular at a Point on a Line",
    "track": "Euclid Elements I.11 · Right-Angle Construction",
    "glyph": "90°",
    "sceneClass": "ErectPerpendicularOnLineScene",
    "archetype": "construction",
    "subType": "const_erect_perp_on_line",
    "duration": 6,
    "summary": "Steps off equal compass segments PA = PB = r along line ℓ from point P, then swings larger arcs of radius R > r from A and B to intersect at apex Q directly above P.",
    "dragHint": "Drag base step radius r or apex compass radius R to adjust the right-triangle construction height |PQ|",
    "defaults": {
      "track": "EUCLID ELEMENTS I.11 · RIGHT ANGLE AT POINT ON LINE",
      "title": "Erecting a Perpendicular PQ ⊥ ℓ at Given Point P on Line ℓ",
      "stepR": 1.15,
      "outerR": 2.05
    },
    "controls": [
      {
        "id": "ctrl-stepr",
        "key": "stepR",
        "label": "Collinear Step Radius r = |PA| = |PB|",
        "min": 0.65,
        "max": 1.65,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-outerr",
        "key": "outerR",
        "label": "Upper Compass Radius R (> r)",
        "min": 1.45,
        "max": 2.65,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Point P on Line ℓ", "time": 0 },
      { "label": "2 · Tick Equal Steps A & B", "time": 1.4 },
      { "label": "3 · Intersecting Arcs at Q", "time": 2.8 },
      { "label": "4 · Erected Normal PQ ⊥ ℓ", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK I PROP. 11",
      "heading": "Pythagorean Altitude & Congruent Adjacent Angles",
      "latex": "|PA| = |PB| = r,\\; |QA| = |QB| = R \\implies \\angle QPA = \\angle QPB = 90^\\circ, \\quad |PQ| = \\sqrt{R^2 - r^2}",
      "prose": "Because supplementary angles ∠QPA and ∠QPB are congruent by SSS (△QPA ≅ △QPB), each is an exact right angle of 90°."
    }
  },
  {
    "id": "const_parallel_alt_angle",
    "category": "Geometrical Constructions",
    "name": "Parallel Line Construction via Copying an Angle",
    "track": "Euclid Elements I.31 · Parallel Postulate",
    "glyph": "ℓ′∥ℓ",
    "sceneClass": "ParallelLineAngleCopyScene",
    "archetype": "construction",
    "subType": "const_parallel_alt_angle",
    "duration": 6,
    "summary": "Draws a transversal through P meeting line ℓ at Q at angle α, then copies ∠α at vertex P using two compass arcs (reference radius r and chord span c) to construct ℓ′ ∥ ℓ.",
    "dragHint": "Drag transversal angle α or vertical separation h to watch the compass chord-transfer arcs align ℓ′ ∥ ℓ",
    "defaults": {
      "track": "EUCLID ELEMENTS I.31 · PARALLEL LINE CONSTRUCTION",
      "title": "Constructing ℓ′ ∥ ℓ Through Point P by Copying Corresponding Angle α",
      "transDeg": 52,
      "sepH": 1.55
    },
    "controls": [
      {
        "id": "ctrl-transdeg",
        "key": "transDeg",
        "label": "Transversal Angle α (deg)",
        "min": 28,
        "max": 78,
        "step": 2,
        "drag": "angle"
      },
      {
        "id": "ctrl-seph",
        "key": "sepH",
        "label": "Parallel Line Separation h",
        "min": 0.95,
        "max": 2.15,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Transversal PQ at Angle α", "time": 0 },
      { "label": "2 · Equal Reference Arcs at Q & P", "time": 1.4 },
      { "label": "3 · Measure & Transfer Chord c", "time": 2.8 },
      { "label": "4 · Parallel Straightedge ℓ′ ∥ ℓ", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK I PROP. 23 & 31",
      "heading": "Chord-Length Angle Copy & Corresponding Angles",
      "latex": "c = 2r\\sin\\left(\\frac{\\alpha}{2}\\right) \\implies \\angle_{\\text{upper}} = \\angle_{\\text{lower}} = \\alpha \\implies \\ell' \\parallel \\ell",
      "prose": "Two arcs of equal radius r have equal central angles if and only if their subtended chords c are equal; transferring chord c with the compass copies α exactly."
    }
  },
  {
    "id": "const_thales_segment_div",
    "category": "Geometrical Constructions",
    "name": "Dividing a Segment into N Equal Parts (Thales Intercept)",
    "track": "Euclid Elements VI.9 · Intercept Construction",
    "glyph": "AB/N",
    "sceneClass": "ThalesSegmentDivisionScene",
    "archetype": "construction",
    "subType": "const_thales_segment_div",
    "duration": 6,
    "summary": "Steps N equal compass marks P₁…P_N along an auxiliary ray AX, joins P_N to B, and constructs parallel rays through each P_k to partition AB into N exact parts.",
    "dragHint": "Adjust division count N (2–7) or auxiliary ray angle α to see parallel intercepts partition AB evenly",
    "defaults": {
      "track": "EUCLID ELEMENTS VI.9 · THALES SEGMENT DIVISION",
      "title": "Compass & Straightedge Division of Segment AB into N Equal Sub-Segments",
      "partsN": 5,
      "rayDeg": 38
    },
    "controls": [
      {
        "id": "ctrl-partsn",
        "key": "partsN",
        "label": "Equal Divisions N (2–7)",
        "min": 2,
        "max": 7,
        "step": 1,
        "drag": "x"
      },
      {
        "id": "ctrl-raydeg",
        "key": "rayDeg",
        "label": "Auxiliary Ray Angle α (deg)",
        "min": 22,
        "max": 58,
        "step": 2,
        "drag": "angle"
      }
    ],
    "beats": [
      { "label": "1 · Segment AB & Auxiliary Ray AX", "time": 0 },
      { "label": "2 · Step N Equal Compass Ticks P_k", "time": 1.4 },
      { "label": "3 · Connect Terminal Strut P_N B", "time": 2.8 },
      { "label": "4 · Parallel Intercepts Divide AB", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK VI PROP. 9",
      "heading": "Thales' Intercept Theorem & Similar Triangles",
      "latex": "P_k Q_k \\parallel P_N B \\implies \\frac{|AQ_k|}{|AB|} = \\frac{|AP_k|}{|AP_N|} = \\frac{k}{N} \\quad (k = 1, \\dots, N)",
      "prose": "Because ΔAP_k Q_k ~ ΔAP_N B with scale factor k/N, the equally spaced compass marks on the auxiliary ray project onto exact 1/N divisions of AB."
    }
  },
  {
    "id": "const_external_tangents_circle",
    "category": "Geometrical Constructions",
    "name": "Tangents to a Circle from an External Point (Thales Circle)",
    "track": "Euclid Elements III.17 · IGCSE / Olympiad",
    "glyph": "PT⊥OT",
    "sceneClass": "CircleExternalTangentsConstructionScene",
    "archetype": "construction",
    "subType": "const_external_tangents_circle",
    "duration": 6,
    "summary": "Bisects OP to find midpoint M, sweeps the Thales circle of diameter OP centered at M, and connects P to intersections T₁, T₂ where ∠OT₁P = ∠OT₂P = 90°.",
    "dragHint": "Drag external distance d = |OP| or circle radius R to see the Thales circle locate tangent points T₁ and T₂",
    "defaults": {
      "track": "EUCLID ELEMENTS III.17 · EXTERNAL TANGENTS CONSTRUCTION",
      "title": "Constructing Exact Tangents PT₁, PT₂ to Circle (O, R) via Thales Semicircle",
      "distOP": 2.35,
      "circR": 1.05
    },
    "controls": [
      {
        "id": "ctrl-distop",
        "key": "distOP",
        "label": "External Center-Point Distance |OP|",
        "min": 1.55,
        "max": 2.85,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-circr",
        "key": "circR",
        "label": "Target Circle Radius R",
        "min": 0.65,
        "max": 1.4,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Circle (O, R) & External Point P", "time": 0 },
      { "label": "2 · Bisect OP at Midpoint M", "time": 1.4 },
      { "label": "3 · Thales Circle Cuts (O,R) at T₁, T₂", "time": 2.8 },
      { "label": "4 · Tangent Rays PT₁ & PT₂ (90°)", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK III PROP. 17",
      "heading": "Thales' Semicircle Right-Angle Guarantee",
      "latex": "|MO| = |MP| = |MT_i| = \\frac{|OP|}{2} \\implies \\angle OT_i P = 90^\\circ \\implies |PT_1| = |PT_2| = \\sqrt{|OP|^2 - R^2}",
      "prose": "Any angle inscribed in the circle with diameter OP is 90°; thus the intersections T₁ and T₂ automatically satisfy OT_i ⊥ PT_i, making PT₁ and PT₂ exact tangents."
    }
  },
  {
    "id": "const_common_bitangents",
    "category": "Geometrical Constructions",
    "name": "External Common Bitangents to Two Circles (Auxiliary r₁ − r₂)",
    "track": "Monge's Circle Construction · Homothety",
    "glyph": "r₁−r₂",
    "sceneClass": "TwoCirclesCommonTangentsScene",
    "archetype": "construction",
    "subType": "const_common_bitangents",
    "duration": 6,
    "summary": "Constructs an auxiliary concentric circle of radius r₁ − r₂ at O₁, draws tangents from O₂ via the Thales circle on O₁O₂, and shifts radially by r₂ to get the common bitangents.",
    "dragHint": "Adjust larger radius r₁ or smaller radius r₂ to watch the auxiliary (r₁ − r₂) reduction circle and bitangents",
    "defaults": {
      "track": "MONGE'S AUXILIARY CIRCLE · COMMON BITANGENTS",
      "title": "Constructing External Common Tangents to Two Circles via Radius Reduction (r₁ − r₂)",
      "r1": 1.35,
      "r2": 0.55
    },
    "controls": [
      {
        "id": "ctrl-r1",
        "key": "r1",
        "label": "Left Circle Radius r₁",
        "min": 0.95,
        "max": 1.65,
        "step": 0.05,
        "drag": "y"
      },
      {
        "id": "ctrl-r2",
        "key": "r2",
        "label": "Right Circle Radius r₂",
        "min": 0.25,
        "max": 0.85,
        "step": 0.05,
        "drag": "x"
      }
    ],
    "beats": [
      { "label": "1 · Two Circles (O₁, r₁) & (O₂, r₂)", "time": 0 },
      { "label": "2 · Auxiliary Circle (O₁, r₁ − r₂)", "time": 1.4 },
      { "label": "3 · Thales Tangent from O₂ to Aux", "time": 2.8 },
      { "label": "4 · Parallel Shift by r₂ → Bitangents", "time": 4.2 }
    ],
    "rigor": {
      "badge": "CLASSICAL REDUCTION",
      "heading": "Reducing Two-Circle Tangency to Point-Circle Tangency",
      "latex": "r_{\\text{aux}} = r_1 - r_2, \\quad L_{\\text{tangent}} = \\sqrt{d^2 - (r_1 - r_2)^2}, \\quad \\sin\\alpha = \\frac{r_1 - r_2}{d}",
      "prose": "Shrinking both circles by r₂ reduces (O₂, r₂) to a single point O₂ and (O₁, r₁) to radius r₁ − r₂; translating the resulting tangent outward along the normal by r₂ restores both circles."
    }
  },
  {
    "id": "const_geometric_mean_sqrt",
    "category": "Geometrical Constructions",
    "name": "Geometric Mean √(a·b) & Squaring the Rectangle (Euclid II.14)",
    "track": "Euclid Elements II.14 & VI.13 · Geometric Mean",
    "glyph": "√ab",
    "sceneClass": "GeometricMeanSqrtConstructionScene",
    "archetype": "construction",
    "subType": "const_geometric_mean_sqrt",
    "duration": 6,
    "summary": "Places segments a and b end-to-end, sweeps a semicircle of diameter a + b, and erects a perpendicular at their junction H to construct altitude |CH| = √(ab).",
    "dragHint": "Drag segment lengths a and b to see altitude |CH| = √(ab) construct the exact square of area a·b",
    "defaults": {
      "track": "EUCLID ELEMENTS II.14 & VI.13 · GEOMETRIC MEAN √(ab)",
      "title": "Compass Construction of √(a·b) & Squaring a Rectangle via Semicircle Altitude",
      "segA": 2.2,
      "segB": 0.9
    },
    "controls": [
      {
        "id": "ctrl-sega",
        "key": "segA",
        "label": "Left Segment Length a",
        "min": 0.6,
        "max": 2.6,
        "step": 0.1,
        "drag": "x"
      },
      {
        "id": "ctrl-segb",
        "key": "segB",
        "label": "Right Segment Length b",
        "min": 0.5,
        "max": 2.2,
        "step": 0.1,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Collinear Segments a & b", "time": 0 },
      { "label": "2 · Bisect a+b & Draw Semicircle", "time": 1.4 },
      { "label": "3 · Erect Perpendicular CH at Junction", "time": 2.8 },
      { "label": "4 · Altitude |CH| = √(ab) & Square", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK VI PROP. 13",
      "heading": "Right-Triangle Altitude Theorem & Constructible Square Roots",
      "latex": "\\triangle ACH \\sim \\triangle CBH \\implies \\frac{a}{|CH|} = \\frac{|CH|}{b} \\implies |CH| = \\sqrt{ab} \\le \\frac{a+b}{2}",
      "prose": "Setting b = 1 constructs √a for any constructible length a, proving that compass and straightedge can extract arbitrary nested square roots."
    }
  },
  {
    "id": "const_golden_section_pentagon",
    "category": "Geometrical Constructions",
    "name": "Golden Ratio φ & Ptolemy's Regular Pentagon Construction",
    "track": "Euclid Elements IV.11 · Ptolemy's Pentagon",
    "glyph": "φ, s₅",
    "sceneClass": "GoldenRatioPentagonConstructionScene",
    "archetype": "construction",
    "subType": "const_golden_section_pentagon",
    "duration": 6,
    "summary": "Bisects radius OB at M, swings an arc of radius |MC| = R√5/2 from M to cut the diameter at D, constructing both the Golden Ratio |OD|/R = φ⁻¹ and pentagon side |CD| = s₅.",
    "dragHint": "Adjust circumradius R or step progress to watch Ptolemy's arc |MC| simultaneously construct s₅ and s₁₀",
    "defaults": {
      "track": "EUCLID IV.11 & PTOLEMY'S ALMAGEST · REGULAR PENTAGON",
      "title": "Ptolemy's Compass Construction of the Golden Ratio φ & Regular Pentagon",
      "pentR": 1.75,
      "rotDeg": 0
    },
    "controls": [
      {
        "id": "ctrl-pentr",
        "key": "pentR",
        "label": "Circumcircle Radius R",
        "min": 1.15,
        "max": 2.15,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-rotdeg",
        "key": "rotDeg",
        "label": "Pentagon Inspection Rotation (deg)",
        "min": 0,
        "max": 72,
        "step": 2,
        "drag": "angle"
      }
    ],
    "beats": [
      { "label": "1 · Circle (O, R) & Midpoint M of OB", "time": 0 },
      { "label": "2 · Swing Arc |MC| = R√5/2 to D", "time": 1.4 },
      { "label": "3 · Chord |CD| = Pentagon Side s₅", "time": 2.8 },
      { "label": "4 · Step s₅ Around Circle → Pentagon", "time": 4.2 }
    ],
    "rigor": {
      "badge": "PTOLEMY'S ALMAGEST I.10",
      "heading": "Simultaneous Construction of Decagon (s₁₀) & Pentagon (s₅)",
      "latex": "|MC| = \\frac{\\sqrt{5}}{2}R,\\quad s_{10} = |OD| = \\frac{\\sqrt{5}-1}{2}R = \\frac{R}{\\varphi},\\quad s_5 = |CD| = R\\sqrt{1 + \\varphi^{-2}} = \\frac{\\sqrt{10-2\\sqrt{5}}}{2}R",
      "prose": "In right triangle △COD, legs R = s₆ (hexagon) and |OD| = s₁₀ (decagon) have hypotenuse |CD| = s₅, because s₆² + s₁₀² = s₅² (Euclid Book XIII Proposition 10)."
    }
  },
  {
    "id": "const_incircle_incenter",
    "category": "Geometrical Constructions",
    "name": "Incircle of a Triangle via Angle Bisectors & Apothem",
    "track": "Euclid Elements IV.4 · Inscribed Circle",
    "glyph": "r=Δ/s",
    "sceneClass": "IncircleTriangleConstructionScene",
    "archetype": "construction",
    "subType": "const_incircle_incenter",
    "duration": 6,
    "summary": "Constructs two compass angle bisectors meeting at Incenter I, drops a perpendicular from I to side AB at T_c, and sweeps the unique inscribed circle of radius r = |IT_c|.",
    "dragHint": "Drag apex C(x_C, y_C) to see the compass angle bisectors, Incenter I, and tangent points T_a, T_b, T_c update",
    "defaults": {
      "track": "EUCLID ELEMENTS IV.4 · INCIRCLE & INCENTER CONSTRUCTION",
      "title": "Compass Construction of Incenter I, Apothem IT ⊥ AB, and Inscribed Circle",
      "cx": 0.35,
      "cy": 2.15
    },
    "controls": [
      {
        "id": "ctrl-incx",
        "key": "cx",
        "label": "Apex X-Coordinate x_C",
        "min": -1.4,
        "max": 1.6,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-incy",
        "key": "cy",
        "label": "Apex Y-Coordinate y_C",
        "min": 1.1,
        "max": 2.6,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Given Triangle △ABC", "time": 0 },
      { "label": "2 · Bisect ∠A and ∠B → Incenter I", "time": 1.4 },
      { "label": "3 · Drop Apothem IT_c ⊥ AB", "time": 2.8 },
      { "label": "4 · Sweep Incircle (I, r = Δ/s)", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK IV PROP. 4",
      "heading": "Concurrency of Angle Bisectors & Inradius r = Δ / s",
      "latex": "|IT_a| = |IT_b| = |IT_c| = r = \\frac{\\Delta}{s}, \\quad s = \\frac{a+b+c}{2}, \\quad |AT_b| = |AT_c| = s - a",
      "prose": "Because I lies on the bisectors of ∠A and ∠B, it is equidistant from all three sides; dropping the perpendicular IT_c determines the exact compass opening r for the incircle."
    }
  },
  {
    "id": "const_circumcircle_3pts",
    "category": "Geometrical Constructions",
    "name": "Circle Through Three Non-Collinear Points (Circumcircle)",
    "track": "Euclid Elements IV.5 · Circumcenter Construction",
    "glyph": "◯ABC",
    "sceneClass": "CircumcircleThreePointsScene",
    "archetype": "construction",
    "subType": "const_circumcircle_3pts",
    "duration": 6,
    "summary": "Constructs the compass perpendicular bisectors of segments AB and BC, locates their intersection at Circumcenter O, and sweeps the unique circle passing through A, B, and C.",
    "dragHint": "Drag third point C(x_C, y_C) to watch the two perpendicular bisector lenses intersect at Circumcenter O",
    "defaults": {
      "track": "EUCLID ELEMENTS IV.5 · CIRCLE THROUGH 3 POINTS",
      "title": "Constructing the Unique Circle Through A, B, C via Two Perpendicular Bisectors",
      "cx": 0.45,
      "cy": 1.65
    },
    "controls": [
      {
        "id": "ctrl-ccx",
        "key": "cx",
        "label": "Third Point X-Coordinate x_C",
        "min": -1.35,
        "max": 1.55,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-ccy",
        "key": "cy",
        "label": "Third Point Y-Coordinate y_C",
        "min": 0.65,
        "max": 2.35,
        "step": 0.05,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Three Non-Collinear Points A, B, C", "time": 0 },
      { "label": "2 · Perp Bisector of Chord AB", "time": 1.4 },
      { "label": "3 · Perp Bisector of Chord BC → O", "time": 2.8 },
      { "label": "4 · Sweep Circumcircle (O, R = |OA|)", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK IV PROP. 5",
      "heading": "Uniqueness of the Circumcircle via Equidistant Loci",
      "latex": "O \\in \\text{perp}(AB) \\implies |OA|=|OB|,\\quad O \\in \\text{perp}(BC) \\implies |OB|=|OC| \\implies |OA|=|OB|=|OC|=R",
      "prose": "Any three non-collinear points determine two non-parallel chords AB and BC whose perpendicular bisectors intersect at a unique point O equidistant from A, B, and C."
    }
  },
  {
    "id": "const_regular_hexagon_12gon",
    "category": "Geometrical Constructions",
    "name": "Regular Hexagon & Dodecagon Compass Daisy Rosette",
    "track": "Euclid Elements IV.15 · Six-Petal Rosette",
    "glyph": "s₆=R",
    "sceneClass": "HexagonDodecagonConstructionScene",
    "archetype": "construction",
    "subType": "const_regular_hexagon_12gon",
    "duration": 6,
    "summary": "Steps the circle's own radius R around its circumference 6 times (s₆ = R) to sweep the classic 6-petal compass rosette and regular hexagon, then bisects arcs for the 12-gon.",
    "dragHint": "Adjust compass radius R or petal count k (1–6) to trace the 6-petal rosette, regular hexagon, and 12-gon",
    "defaults": {
      "track": "EUCLID ELEMENTS IV.15 · COMPASS ROSETTE & HEXAGON",
      "title": "Six-Petal Compass Daisy Rosette, Regular Hexagon (s₆ = R) & Dodecagon",
      "hexR": 1.65,
      "petals": 6
    },
    "controls": [
      {
        "id": "ctrl-hexr",
        "key": "hexR",
        "label": "Compass Opening Radius R",
        "min": 1.05,
        "max": 2.1,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-petals",
        "key": "petals",
        "label": "Constructed Rosette Arcs (1–6)",
        "min": 1,
        "max": 6,
        "step": 1,
        "drag": "y"
      }
    ],
    "beats": [
      { "label": "1 · Primary Circle of Radius R", "time": 0 },
      { "label": "2 · Walk Radius R Around Rim (6×)", "time": 1.4 },
      { "label": "3 · Six-Petal Compass Daisy Rosette", "time": 2.8 },
      { "label": "4 · Regular Hexagon & 12-Gon Chord", "time": 4.2 }
    ],
    "rigor": {
      "badge": "EUCLID BOOK IV PROP. 15",
      "heading": "Six Equilateral Sectors & Archimedes' Polygon Doubling",
      "latex": "s_6 = R,\\quad A_6 = \\frac{3\\sqrt{3}}{2}R^2,\\quad s_{12} = R\\sqrt{2 - \\sqrt{3}},\\quad A_{12} = 3R^2",
      "prose": "Because a chord of length R subtends a 60° equilateral triangle at the center, six unaltered compass steps close around 360°; bisecting each 60° arc yields the regular 12-gon of exact area 3R²."
    }
  },
  {
    "id": "const_apollonius_locus",
    "category": "Geometrical Constructions",
    "name": "Circle of Apollonius (|PA| / |PB| = k) Harmonic Construction",
    "track": "Apollonius of Perga · Harmonic Locus",
    "glyph": "|PA|=k|PB|",
    "sceneClass": "ApolloniusCircleConstructionScene",
    "archetype": "construction",
    "subType": "const_apollonius_locus",
    "duration": 6,
    "summary": "Constructs internal and external angle bisectors of ∠APB meeting line AB at harmonic conjugates D₁ and D₂, sweeping the Apollonius circle with diameter D₁D₂ where |PA|/|PB| = k.",
    "dragHint": "Drag distance ratio k = |PA|/|PB| or probe angle φ around the Apollonius circle to verify |PA| = k|PB|",
    "defaults": {
      "track": "APOLLONIUS OF PERGA · HARMONIC RATIO LOCUS",
      "title": "Constructing the Circle of Apollonius {P : |PA| / |PB| = k} via Bisector Diameter D₁D₂",
      "ratioK": 2.0,
      "probeDeg": 65
    },
    "controls": [
      {
        "id": "ctrl-ratiok",
        "key": "ratioK",
        "label": "Distance Ratio k = |PA| / |PB| (> 1)",
        "min": 1.35,
        "max": 3.2,
        "step": 0.05,
        "drag": "x"
      },
      {
        "id": "ctrl-probedeg",
        "key": "probeDeg",
        "label": "Locus Point Angle φ on Circle (deg)",
        "min": 15,
        "max": 165,
        "step": 3,
        "drag": "angle"
      }
    ],
    "beats": [
      { "label": "1 · Anchors A, B & Ratio k : 1", "time": 0 },
      { "label": "2 · Internal & External Bisectors D₁, D₂", "time": 1.4 },
      { "label": "3 · Orthogonal Bisectors ∠D₁PD₂ = 90°", "time": 2.8 },
      { "label": "4 · Apollonius Circle on Diameter D₁D₂", "time": 4.2 }
    ],
    "rigor": {
      "badge": "APOLLONIUS LOCUS THEOREM",
      "heading": "Orthogonal Internal & External Angle Bisectors",
      "latex": "\\frac{|AD_1|}{|D_1 B|} = \\frac{|AD_2|}{|D_2 B|} = k,\\quad PD_1 \\perp PD_2 \\implies R_{\\text{Apollonius}} = \\frac{k}{k^2 - 1}|AB|",
      "prose": "By the internal and external angle bisector theorems, P satisfies |PA|/|PB| = k if and only if PD₁ and PD₂ bisect the interior and exterior angles at P; since adjacent supplementary bisectors meet at 90°, P traces the circle with diameter D₁D₂."
    }
  }
];

