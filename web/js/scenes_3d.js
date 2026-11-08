/* ==========================================================================
   3c1c · ClipSAT 50 Interactive 3D Mathematical Scenes (#101 – #150)
   Perspective 3D Projection Engine, Painter's Algorithm Surface Shading,
   Interactive 3D Orbit Camera Dragging, Vector Fields, Polyhedra & Chaos
   ========================================================================== */

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function smooth(t) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function spanEase(time, start, end) {
  if (end <= start) return time >= end ? 1 : 0;
  return smooth((time - start) / (end - start));
}


function s3d(
  id,
  name,
  track,
  glyph,
  sceneClass,
  subType,
  summary,
  dragHint,
  defaults,
  controls,
  rigor,
  beats
) {
  return {
    id,
    category: '3D Math & Surfaces',
    name,
    track,
    glyph,
    sceneClass,
    archetype: 'scene_3d',
    subType,
    duration: 6.0,
    summary,
    dragHint: dragHint || 'Drag anywhere on the 3D stage to orbit azimuth θ and tilt elevation φ',
    defaults: {
      track,
      title: name,
      azimDeg: 38,
      elevDeg: 26,
      ...defaults,
    },
    controls: [
      ...controls,
      { id: 'ctrl-azim', key: 'azimDeg', label: '3D Orbit Azimuth θ (°)', min: -180, max: 180, step: 2, drag: 'azim3d' },
      { id: 'ctrl-elev', key: 'elevDeg', label: '3D Camera Elevation φ (°)', min: 8, max: 72, step: 2, drag: 'elev3d' },
    ],
    beats: beats || [
      { label: '01 · 3D Frame & Axes', time: 0.0 },
      { label: '02 · Surface / Manifold', time: 1.3 },
      { label: '03 · Geometric Probe', time: 2.7 },
      { label: '04 · Theorem Invariant', time: 4.5 },
    ],
    rigor,
  };
}

export const SCENES_3D_PRESETS = [
  // ── 101–110: Multivariable Quadrics & Surfaces ──
  s3d(
    'paraboloid_3d',
    '3D Elliptic Paraboloid & Level Curves',
    'MULTIVARIABLE CALCULUS · QUADRIC SURFACES',
    'z=x²+y²',
    'EllipticParaboloid3DScene',
    'paraboloid_3d',
    '3D bowl z = (x²/a²) + (y²/b²) sliced by horizontal plane z = c projecting elliptical floor contours.',
    'Drag on the 3D stage to orbit camera, or adjust level plane height c',
    { cSlice: 1.4, aRatio: 1.1 },
    [
      { id: 'ctrl-cslice', key: 'cSlice', label: 'Level Plane Height z = c', min: 0.2, max: 2.6, step: 0.05 },
      { id: 'ctrl-aratio', key: 'aRatio', label: 'Aspect Stretch a/b', min: 0.6, max: 1.6, step: 0.05 },
    ],
    {
      badge: 'QUADRIC SURFACE · LEVEL CONTOURS',
      heading: 'Elliptic Paraboloid & Horizontal Traces',
      latex: 'z = \\frac{x^2}{a^2} + \\frac{y^2}{b^2}, \\quad z = c \\implies \\frac{x^2}{a^2 c} + \\frac{y^2}{b^2 c} = 1',
      prose: 'Horizontal cross-sections z = c > 0 are concentric ellipses whose projections onto the xy-plane form the contour map.',
    }
  ),
  s3d(
    'hyperbolic_paraboloid_3d',
    '3D Hyperbolic Paraboloid Saddle',
    'MULTIVARIABLE CALCULUS · SADDLE SURFACES',
    'z=x²−y²',
    'HyperbolicParaboloid3DScene',
    'hyperbolic_paraboloid_3d',
    'Minimax saddle surface z = x² − y² curving upward along x and downward along y.',
    'Drag to rotate the 3D saddle and inspect the principal curvature parabolas',
    { curvature: 1.0, sliceX: 0.8 },
    [
      { id: 'ctrl-curv', key: 'curvature', label: 'Saddle Curvature Scale κ', min: 0.4, max: 1.6, step: 0.05 },
      { id: 'ctrl-slicex', key: 'sliceX', label: 'Probe Coordinate x₀', min: -1.5, max: 1.5, step: 0.05 },
    ],
    {
      badge: 'MINIMAX GEOMETRY · NEGATIVE GAUSSIAN CURVATURE',
      heading: 'Hyperbolic Paraboloid Saddle Point',
      latex: 'z = \\frac{x^2}{a^2} - \\frac{y^2}{b^2}, \\quad K = \\frac{f_{xx}f_{yy}-f_{xy}^2}{(1+f_x^2+f_y^2)^2} < 0',
      prose: 'At the origin (0,0), the trace in y = 0 has a local minimum while the trace in x = 0 has a local maximum.',
    }
  ),
  s3d(
    'hyperboloid_one_sheet_3d',
    '3D Hyperboloid of One Sheet (Doubly Ruled)',
    '3D ANALYTIC GEOMETRY · RULED QUADRICS',
    'x²+y²−z²=1',
    'HyperboloidOneSheet3DScene',
    'hyperboloid_one_sheet_3d',
    'Cooling-tower quadric x² + y² − z² = a² woven entirely from straight Amber and Teal ruling lines.',
    'Drag to orbit the 3D hyperboloid and twist the straight ruling lines',
    { waist: 0.85, twistDeg: 42 },
    [
      { id: 'ctrl-waist', key: 'waist', label: 'Gorge Waist Radius a', min: 0.45, max: 1.3, step: 0.05 },
      { id: 'ctrl-twist', key: 'twistDeg', label: 'Ruling Line Twist (°)', min: 15, max: 75, step: 1 },
    ],
    {
      badge: 'DOUBLY RULED SURFACE · ARCHITECTURE & GEOMETRY',
      heading: 'Hyperboloid of One Sheet',
      latex: '\\frac{x^2}{a^2} + \\frac{y^2}{a^2} - \\frac{z^2}{c^2} = 1, \\quad \\vec{r}(u,v) = (a\\cos u, a\\sin u, 0) + v(-a\\sin u, a\\cos u, \\pm c)',
      prose: 'Through every point on the curved hyperboloid pass two distinct straight lines lying completely on the surface.',
    }
  ),
  s3d(
    'hyperboloid_two_sheets_3d',
    '3D Hyperboloid of Two Sheets',
    '3D ANALYTIC GEOMETRY · QUADRIC CLASSIFICATION',
    'z²−x²−y²=c²',
    'HyperboloidTwoSheets3DScene',
    'hyperboloid_two_sheets_3d',
    'Upper and lower disconnected sheets z²/c² − x²/a² − y²/a² = 1 separated by vertex gap 2c.',
    'Drag to orbit the two sheets and adjust the vertex separation c',
    { gapC: 0.65, spreadA: 0.9 },
    [
      { id: 'ctrl-gapc', key: 'gapC', label: 'Half-Gap Vertex Height c', min: 0.3, max: 1.2, step: 0.05 },
      { id: 'ctrl-spreada', key: 'spreadA', label: 'Asymptotic Cone Spread a', min: 0.5, max: 1.4, step: 0.05 },
    ],
    {
      badge: 'DISCONNECTED QUADRIC · TWO SHEETS',
      heading: 'Hyperboloid of Two Sheets',
      latex: '\\frac{z^2}{c^2} - \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\implies |z| \\ge c',
      prose: 'No real points exist in the slab |z| < c; for |z| > c, horizontal cross-sections are ellipses expanding asymptotically.',
    }
  ),
  s3d(
    'ellipsoid_3d',
    '3D Triaxial Ellipsoid & Principal Axes',
    '3D ANALYTIC GEOMETRY · QUADRIC VOLUMES',
    '4/3πabc',
    'TriaxialEllipsoid3DScene',
    'ellipsoid_3d',
    'Triaxial ellipsoid (x/a)² + (y/b)² + (z/c)² = 1 with orthogonal semi-axes a, b, c and volume 4/3 πabc.',
    'Drag to orbit the 3D ellipsoid and stretch semi-axes a, b, c',
    { axisA: 1.5, axisB: 1.1, axisC: 0.85 },
    [
      { id: 'ctrl-axisa', key: 'axisA', label: 'Semi-Axis a (x)', min: 0.6, max: 1.9, step: 0.05 },
      { id: 'ctrl-axisb', key: 'axisB', label: 'Semi-Axis b (y)', min: 0.6, max: 1.9, step: 0.05 },
      { id: 'ctrl-axisc', key: 'axisC', label: 'Semi-Axis c (z)', min: 0.5, max: 1.6, step: 0.05 },
    ],
    {
      badge: 'AFFINE SPHERE · JACOBIAN SCALING',
      heading: 'Triaxial Ellipsoid Volume & Traces',
      latex: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1, \\qquad V = \\frac{4}{3}\\pi a b c',
      prose: 'An ellipsoid is the image of the unit sphere under the diagonal linear transformation diag(a, b, c) with determinant abc.',
    }
  ),
  s3d(
    'cone_dandelin_3d',
    '3D Double Cone & Conic Section Slicing Plane',
    'APOLLONIUS & DANDELIN · 3D CONIC SECTIONS',
    'z²=x²+y²',
    'ConeConicSlice3DScene',
    'cone_dandelin_3d',
    'Double circular cone z² = x² + y² intersected by tilted plane z = m x + h0 generating ellipse, parabola, or hyperbola.',
    'Drag to orbit the 3D cone or tilt the slicing plane slope m',
    { planeSlope: 0.55, planeHeight: 0.9 },
    [
      { id: 'ctrl-pslope', key: 'planeSlope', label: 'Cutting Plane Slope m', min: 0.0, max: 1.45, step: 0.05 },
      { id: 'ctrl-pheight', key: 'planeHeight', label: 'Plane Offset h₀', min: 0.4, max: 1.35, step: 0.05 },
    ],
    {
      badge: 'CLASSICAL SYNTHESIS · 3D CONIC SECTIONS',
      heading: 'Plane-Cone Intersection & Eccentricity',
      latex: 'z^2 = x^2 + y^2 \\;\\cap\\; z = m x + h_0, \\qquad e = |m|',
      prose: 'When |m| < 1 the plane cuts one nappe in a closed ellipse; at |m| = 1 a parabola; for |m| > 1 both nappes in a hyperbola.',
    }
  ),
  s3d(
    'monkey_saddle_3d',
    '3D Monkey Saddle Surface (z = x³ − 3xy²)',
    'DIFFERENTIAL GEOMETRY · DEGENERATE CRITICAL POINTS',
    'Re(z³)',
    'MonkeySaddle3DScene',
    'monkey_saddle_3d',
    'Three-fold symmetric saddle z = x³ − 3xy² = r³ cos(3θ) with three valleys and three ridges.',
    'Drag to orbit the 3D monkey saddle and inspect the 3-fold symmetry',
    { amp: 0.45, rProbe: 1.15 },
    [
      { id: 'ctrl-amp', key: 'amp', label: 'Cubic Amplitude Scale', min: 0.2, max: 0.75, step: 0.05 },
      { id: 'ctrl-rprobe', key: 'rProbe', label: 'Radial Probe Ring r', min: 0.5, max: 1.5, step: 0.05 },
    ],
    {
      badge: 'DEGENERATE HESSIAN · ZERO CURVATURE ORIGIN',
      heading: 'Monkey Saddle & Harmonic Real Part',
      latex: 'z = x^3 - 3xy^2 = \\operatorname{Re}(x+iy)^3 = r^3\\cos(3\\theta)',
      prose: 'At (0,0), both the gradient ∇z and the entire Hessian matrix vanish, producing three alternating ascents and descents.',
    }
  ),
  s3d(
    'ripple_sinc_3d',
    '3D Radial Sinc Wave Interference Surface',
    'FOURIER OPTICS & MULTIVARIABLE · RADIAL SINC',
    'sin(kr)/kr',
    'RippleSinc3DScene',
    'ripple_sinc_3d',
    'Circular diffraction wave surface z = sin(k r)/(k r) with central peak and concentric nodal zero rings.',
    'Drag to rotate the 3D wave surface or tune radial wavenumber k',
    { waveK: 4.2, damp: 0.15 },
    [
      { id: 'ctrl-wavek', key: 'waveK', label: 'Radial Wavenumber k', min: 2.0, max: 7.5, step: 0.2 },
      { id: 'ctrl-damp', key: 'damp', label: 'Envelope Damping', min: 0.0, max: 0.6, step: 0.05 },
    ],
    {
      badge: 'REMOVABLE 2D SINGULARITY · DIFFRACTION',
      heading: '2D Radial Sinc Limit at Origin',
      latex: '\\lim_{(x,y)\\to(0,0)} \\frac{\\sin\\!\\left(k\\sqrt{x^2+y^2}\\right)}{k\\sqrt{x^2+y^2}} = 1',
      prose: 'In polar coordinates r = √(x²+y²), the removable singularity at r = 0 resolves to the global maximum z = 1.',
    }
  ),
  s3d(
    'gaussian_bell_3d',
    '3D Bivariate Normal Density & Mahalanobis Ellipse',
    'MULTIVARIABLE STATISTICS · JOINT GAUSSIAN PDF',
    'f(x,y)',
    'BivariateNormal3DScene',
    'gaussian_bell_3d',
    '3D Gaussian bell surface with correlation ρ and 1σ elliptical covariance contour on the floor.',
    'Drag to orbit the 3D Gaussian bell and adjust correlation ρ',
    { rho: 0.45, sigmaRatio: 1.1 },
    [
      { id: 'ctrl-rho', key: 'rho', label: 'Correlation Coefficient ρ', min: -0.8, max: 0.8, step: 0.05 },
      { id: 'ctrl-sratio', key: 'sigmaRatio', label: 'Spread Ratio σ_x / σ_y', min: 0.6, max: 1.6, step: 0.05 },
    ],
    {
      badge: 'JOINT PROBABILITY DENSITY · COVARIANCE MATRIX',
      heading: 'Bivariate Normal Distribution',
      latex: 'f(\\vec{x}) = \\frac{1}{2\\pi|\\Sigma|^{1/2}}\\exp\\!\\left(-\\tfrac{1}{2}\\vec{x}^T\\Sigma^{-1}\\vec{x}\\right), \\quad \\iint_{\\mathbb{R}^2} f\\,dx\\,dy = 1',
      prose: 'Non-zero correlation ρ tilts the principal axes of the constant-density Mahalanobis ellipses along x = ±y.',
    }
  ),
  s3d(
    'helicoid_catenoid_3d',
    '3D Helicoid to Catenoid Minimal Surface Morph',
    'DIFFERENTIAL GEOMETRY · MINIMAL SURFACES (H = 0)',
    'H = 0',
    'HelicoidCatenoid3DScene',
    'helicoid_catenoid_3d',
    'Isometric Associate Family morphing a ruled spiral helicoid into a rotational soap-film catenoid.',
    'Drag to orbit in 3D or scrub the isometric morph angle α',
    { morphAlpha: 0.45, pitch: 0.75 },
    [
      { id: 'ctrl-malpha', key: 'morphAlpha', label: 'Morph Parameter α (0=Catenoid, 1=Helicoid)', min: 0.0, max: 1.0, step: 0.02 },
      { id: 'ctrl-pitch', key: 'pitch', label: 'Vertical Scale c', min: 0.4, max: 1.1, step: 0.05 },
    ],
    {
      badge: 'THEOREMA EGREGIUM · ISOMETRIC MINIMAL FAMILY',
      heading: 'Catenoid–Helicoid Associate Family',
      latex: '\\vec{X}_\\alpha(u,v) = \\cos\\alpha\\,\\vec{X}_{\\text{cat}}(u,v) + \\sin\\alpha\\,\\vec{X}_{\\text{hel}}(u,v), \\quad H \\equiv 0',
      prose: 'Every intermediate surface in the deformation preserves exact intrinsic arc lengths (first fundamental form) and zero mean curvature.',
    }
  ),

  // ── 111–120: Multivariable Differential Calculus ──
  s3d(
    'tangent_plane_3d',
    '3D Tangent Plane & Surface Normal Vector',
    'AP / UNIVERSITY CALCULUS III · LINEARIZATION',
    'z=L(x,y)',
    'TangentPlane3DScene',
    'tangent_plane_3d',
    'Tangent plane L(x,y) = f(x₀,y₀) + f_x(x−x₀) + f_y(y−y₀) and normal vector n = (−f_x, −f_y, 1).',
    'Drag to orbit the 3D stage or move tangency point (x₀, y₀)',
    { x0: 0.65, y0: 0.55 },
    [
      { id: 'ctrl-x0', key: 'x0', label: 'Tangency Coordinate x₀', min: -1.3, max: 1.3, step: 0.05 },
      { id: 'ctrl-y0', key: 'y0', label: 'Tangency Coordinate y₀', min: -1.3, max: 1.3, step: 0.05 },
    ],
    {
      badge: 'FIRST-ORDER MULTIVARIABLE APPROXIMATION',
      heading: 'Tangent Plane & Normal Vector',
      latex: 'z - f(x_0,y_0) = f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0), \\quad \\vec{n} = \\langle -f_x, -f_y, 1 \\rangle',
      prose: 'The tangent plane is spanned by the partial-derivative tangent vectors ⟨1, 0, f_x⟩ and ⟨0, 1, f_y⟩.',
    }
  ),
  s3d(
    'partial_derivatives_3d',
    '3D Partial Derivatives f_x and f_y Slicing Planes',
    'CALCULUS III · PARTIAL DERIVATIVES',
    '∂f/∂x',
    'PartialDerivatives3DScene',
    'partial_derivatives_3d',
    'Vertical slicing planes y = y₀ and x = x₀ cutting z = f(x,y) to reveal partial slopes ∂f/∂x and ∂f/∂y.',
    'Drag to orbit in 3D or slide the slicing planes x₀ and y₀',
    { x0: 0.7, y0: -0.5 },
    [
      { id: 'ctrl-x0', key: 'x0', label: 'Slice Plane x = x₀', min: -1.4, max: 1.4, step: 0.05 },
      { id: 'ctrl-y0', key: 'y0', label: 'Slice Plane y = y₀', min: -1.4, max: 1.4, step: 0.05 },
    ],
    {
      badge: 'CROSS-SECTIONAL RATES OF CHANGE',
      heading: 'Geometric Meaning of Partial Derivatives',
      latex: 'f_x(x_0,y_0) = \\left.\\frac{d}{dx}f(x,y_0)\\right|_{x=x_0}, \\qquad f_y(x_0,y_0) = \\left.\\frac{d}{dy}f(x_0,y)\\right|_{y=y_0}',
      prose: 'Holding y = y₀ fixed restricts the surface to a 2D curve whose tangent slope in the x-z plane is ∂f/∂x.',
    }
  ),
  s3d(
    'directional_derivative_3d',
    '3D Directional Derivative D_u f = ∇f · u',
    'CALCULUS III · DIRECTIONAL DERIVATIVES',
    '∇f·u',
    'DirectionalDerivative3DScene',
    'directional_derivative_3d',
    'Vertical slicing plane along unit vector u = (cos α, sin α) comparing slope D_u f against steepest gradient ∇f.',
    'Drag to orbit in 3D or rotate compass direction angle α',
    { dirDeg: 35, x0: 0.6 },
    [
      { id: 'ctrl-dirdeg', key: 'dirDeg', label: 'Direction Compass Angle α (°)', min: 0, max: 360, step: 5 },
      { id: 'ctrl-x0', key: 'x0', label: 'Anchor Point x₀', min: -1.2, max: 1.2, step: 0.05 },
    ],
    {
      badge: 'THEOREM · DIRECTIONAL RATE OF CHANGE',
      heading: 'Directional Derivative & Steepest Ascent',
      latex: 'D_{\\vec{u}}f(x_0,y_0) = \\nabla f(x_0,y_0)\\cdot\\vec{u} = \\|\\nabla f\\|\\cos\\vartheta',
      prose: 'The directional derivative is maximized when u points along the gradient ∇f (ϑ = 0) and zero along level contours (ϑ = 90°).',
    }
  ),
  s3d(
    'gradient_ascent_3d',
    '3D Gradient Ascent & Orthogonal Contour Path',
    'OPTIMIZATION & CALCULUS III · STEEPEST ASCENT',
    'x+η∇f',
    'GradientAscent3DScene',
    'gradient_ascent_3d',
    '3D trajectory climbing a mountain peak z = f(x,y) while its floor shadow crosses every contour line at 90°.',
    'Drag to rotate the 3D peak or move starting angle and step size η',
    { startDeg: 215, lr: 0.25 },
    [
      { id: 'ctrl-sdeg', key: 'startDeg', label: 'Start Azimuth on Slope (°)', min: 0, max: 360, step: 5 },
      { id: 'ctrl-lr', key: 'lr', label: 'Step Rate η', min: 0.08, max: 0.45, step: 0.02 },
    ],
    {
      badge: 'ORTHOGONAL TRAJECTORY · STEEPEST CLIMB',
      heading: 'Gradient Orthogonality to Level Curves',
      latex: '\\frac{d\\vec{x}}{dt} = \\nabla f(\\vec{x}) \\perp \\{\\vec{x} : f(\\vec{x}) = c\\}',
      prose: 'Because the directional derivative along a level curve is zero, ∇f is perpendicular to every contour line.',
    }
  ),
  s3d(
    'hessian_classification_3d',
    '3D Second Derivative Hessian Discriminant Test',
    'MULTIVARIABLE CALCULUS · EXTREMA CLASSIFICATION',
    'det(H)',
    'HessianClassification3DScene',
    'hessian_classification_3d',
    'Quadratic surface z = ½(f_xx x² + 2f_xy xy + f_yy y²) morphing across D > 0 (bowl/dome) and D < 0 (saddle).',
    'Drag to orbit in 3D or vary eigenvalues f_xx and f_yy',
    { fxx: 1.2, fyy: -0.8 },
    [
      { id: 'ctrl-fxx', key: 'fxx', label: 'Curvature f_xx', min: -1.6, max: 1.6, step: 0.1 },
      { id: 'ctrl-fyy', key: 'fyy', label: 'Curvature f_yy', min: -1.6, max: 1.6, step: 0.1 },
    ],
    {
      badge: 'THEOREM · SECOND PARTIALS DISCRIMINANT',
      heading: 'Hessian Determinant Classification',
      latex: 'D = f_{xx}f_{yy} - f_{xy}^2 = \\det(H_f)',
      prose: 'At a critical point ∇f = 0: D > 0, f_xx > 0 is a local minimum; D > 0, f_xx < 0 is a local maximum; D < 0 is a saddle.',
    }
  ),
  s3d(
    'lagrange_3d',
    '3D Lagrange Multipliers on a Constraint Cylinder',
    'MULTIVARIABLE OPTIMIZATION · CONSTRAINED EXTREMA',
    '∇f=λ∇g',
    'LagrangeCylinder3DScene',
    'lagrange_3d',
    'Constraint cylinder g(x,y) = x² + y² = R² intersecting surface z = f(x,y) with constrained space curve extrema.',
    'Drag to orbit the 3D cylinder and surface or adjust constraint radius R',
    { cylR: 1.05, tilt: 0.7 },
    [
      { id: 'ctrl-cylr', key: 'cylR', label: 'Constraint Cylinder Radius R', min: 0.5, max: 1.45, step: 0.05 },
      { id: 'ctrl-tilt', key: 'tilt', label: 'Objective Tilt Coefficient', min: 0.2, max: 1.3, step: 0.05 },
    ],
    {
      badge: 'CONSTRAINED OPTIMIZATION IN 3D',
      heading: 'Lagrange Multipliers on a Space Curve',
      latex: '\\max_{g(x,y)=R^2} f(x,y) \\implies \\nabla f(x^*,y^*) = \\lambda\\,\\nabla g(x^*,y^*)',
      prose: 'Restricting z = f(x,y) to the vertical cylinder x²+y² = R² yields a closed 3D space curve whose highest and lowest points satisfy ∇f ∥ ∇g.',
    }
  ),
  s3d(
    'taylor_2d_surface_3d',
    '3D Quadratic Taylor Paraboloid Approximation',
    'MULTIVARIABLE CALCULUS · 2D TAYLOR SERIES',
    'T₂(x,y)',
    'Taylor2DSurface3DScene',
    'taylor_2d_surface_3d',
    'Comparing cos(x)cos(y) in 3D against its osculating quadratic Taylor paraboloid T₂(x,y) = 1 − ½(x²+y²).',
    'Drag to orbit in 3D and compare the true surface with its quadratic Taylor dome',
    { freq: 1.15, probeR: 0.9 },
    [
      { id: 'ctrl-freq', key: 'freq', label: 'Surface Spatial Frequency k', min: 0.7, max: 1.6, step: 0.05 },
      { id: 'ctrl-prober', key: 'probeR', label: 'Comparison Radius r', min: 0.3, max: 1.4, step: 0.05 },
    ],
    {
      badge: 'SECOND-ORDER MULTIVARIABLE TAYLOR POLYNOMIAL',
      heading: 'Osculating Quadratic Paraboloid',
      latex: 'T_2(\\vec{x}) = f(\\vec{a}) + \\nabla f(\\vec{a})^T(\\vec{x}-\\vec{a}) + \\tfrac{1}{2}(\\vec{x}-\\vec{a})^T H_f(\\vec{a})(\\vec{x}-\\vec{a})',
      prose: 'The quadratic Taylor surface matches the value, tangent plane, and all directional curvatures of f(x,y) at the expansion point.',
    }
  ),
  s3d(
    'envelope_planes_3d',
    '3D Tangent Plane Family Envelope',
    'DIFFERENTIAL GEOMETRY · ENVELOPE OF PLANES',
    '∂F/∂u=0',
    'EnvelopePlanes3DScene',
    'envelope_planes_3d',
    'A 1-parameter family of tangent planes wrapping around a 3D paraboloid envelope along characteristic rulings.',
    'Drag to orbit in 3D or sweep the tangent plane parameter θ',
    { sweepDeg: 60, radius: 1.1 },
    [
      { id: 'ctrl-sdeg', key: 'sweepDeg', label: 'Active Tangent Plane Angle (°)', min: 0, max: 360, step: 5 },
      { id: 'ctrl-rad', key: 'radius', label: 'Contact Circle Radius r', min: 0.5, max: 1.4, step: 0.05 },
    ],
    {
      badge: 'DUAL PROJECTIVE GEOMETRY · ENVELOPE SURFACE',
      heading: 'Surface as Envelope of its Tangent Planes',
      latex: 'F(x,y,z,u) = 0, \\qquad \\frac{\\partial F}{\\partial u}(x,y,z,u) = 0',
      prose: 'A smooth convex surface is uniquely determined as the envelope of its family of supporting tangent planes.',
    }
  ),
  s3d(
    'implicit_surface_level_3d',
    '3D Level Surfaces F(x,y,z) = c & Normal Field ∇F',
    'VECTOR CALCULUS · EQUIPOTENTIAL SURFACES',
    '∇F⊥S',
    'ImplicitLevelSurface3DScene',
    'implicit_surface_level_3d',
    'Concentric 3D level surfaces F(x,y,z) = c with outward gradient normal vectors ∇F perpendicular to the shell.',
    'Drag to orbit in 3D or vary the level surface constant c',
    { levelC: 1.15, aniso: 1.25 },
    [
      { id: 'ctrl-levelc', key: 'levelC', label: 'Level Constant c', min: 0.55, max: 1.65, step: 0.05 },
      { id: 'ctrl-aniso', key: 'aniso', label: 'Vertical Anisotropy', min: 0.7, max: 1.6, step: 0.05 },
    ],
    {
      badge: 'IMPLICIT FUNCTION THEOREM · 3D GRADIENT',
      heading: '3D Gradient is Normal to Level Surfaces',
      latex: '\\nabla F(x_0,y_0,z_0) = \\left\\langle \\frac{\\partial F}{\\partial x}, \\frac{\\partial F}{\\partial y}, \\frac{\\partial F}{\\partial z} \\right\\rangle \\perp F^{-1}(c)',
      prose: 'For any differentiable path r(t) on the level surface F(x,y,z) = c, the chain rule gives ∇F · r′(t) = 0.',
    }
  ),
  s3d(
    'chain_rule_path_3d',
    '3D Multivariable Chain Rule Along a Spiral Path',
    'CALCULUS III · MULTIVARIABLE CHAIN RULE',
    'dz/dt',
    'ChainRulePath3DScene',
    'chain_rule_path_3d',
    'Particle moving along spiral (x(t), y(t)) on z = f(x,y) with instantaneous rate dz/dt = f_x dx/dt + f_y dy/dt.',
    'Drag to orbit in 3D or scrub parameter t₀ along the 3D surface path',
    { tParam: 2.4, turns: 1.5 },
    [
      { id: 'ctrl-tparam', key: 'tParam', label: 'Path Parameter t₀', min: 0.3, max: 5.8, step: 0.1 },
      { id: 'ctrl-turns', key: 'turns', label: 'Spiral Winding Rate ω', min: 0.8, max: 2.5, step: 0.1 },
    ],
    {
      badge: 'THEOREM · MULTIVARIABLE CHAIN RULE',
      heading: 'Total Derivative Along a Parametric Curve',
      latex: '\\frac{dz}{dt} = \\frac{\\partial f}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial f}{\\partial y}\\frac{dy}{dt} = \\nabla f(\\vec{r}(t))\\cdot\\vec{r}^{\\,\\prime}(t)',
      prose: 'The rate of change of altitude z(t) equals the dot product of the surface gradient and the floor velocity vector.',
    }
  ),

  // ── 121–128: Multiple Integrals & 3D Coordinate Systems ──
  s3d(
    'double_integral_columns_3d',
    '3D Double Integral Riemann Prism Columns',
    'CALCULUS III · DOUBLE INTEGRALS',
    '∬f dA',
    'DoubleIntegralColumns3DScene',
    'double_integral_columns_3d',
    'N×N 3D rectangular prism columns under z = f(x,y) converging to the exact volume ∬_R f(x,y) dA.',
    'Drag to orbit the 3D prism array or increase grid resolution N×N',
    { gridN: 5, domeH: 1.6 },
    [
      { id: 'ctrl-gridn', key: 'gridN', label: 'Grid Subdivisions N (N×N)', min: 2, max: 8, step: 1 },
      { id: 'ctrl-domeh', key: 'domeH', label: 'Peak Height z₀', min: 0.8, max: 2.2, step: 0.1 },
    ],
    {
      badge: '2D RIEMANN SUM · VOLUME UNDER A SURFACE',
      heading: 'Double Integral over a Rectangle',
      latex: '\\iint_R f(x,y)\\,dA = \\lim_{N\\to\\infty} \\sum_{i=1}^N \\sum_{j=1}^N f(x_i^*, y_j^*)\\,\\Delta x\\,\\Delta y',
      prose: 'Each sub-rectangle ΔA = Δx Δy supports a vertical 3D column of volume f(x_i*, y_j*) ΔA.',
    }
  ),
  s3d(
    'fubini_iterated_slices_3d',
    "3D Fubini's Theorem Iterated Cross-Section Slices",
    'CALCULUS III · ITERATED INTEGRALS',
    '∫∫f dy dx',
    'FubiniSlices3DScene',
    'fubini_iterated_slices_3d',
    'Sweeping vertical lamina A(x) = ∫ f(x,y) dy across x ∈ [−a, a] to integrate 3D volume by cross-sections.',
    'Drag to orbit in 3D or slide the active cross-section lamina x₀',
    { sliceX: 0.35, numSlices: 7 },
    [
      { id: 'ctrl-slicex', key: 'sliceX', label: 'Active Slice Position x₀', min: -1.4, max: 1.4, step: 0.05 },
      { id: 'ctrl-nslices', key: 'numSlices', label: 'Displayed Lamina Count', min: 3, max: 12, step: 1 },
    ],
    {
      badge: "THEOREM · FUBINI'S ITERATED INTEGRAL",
      heading: 'Reduction of Double Integrals to Iterated Slices',
      latex: '\\iint_R f(x,y)\\,dA = \\int_a^b \\!\\left(\\int_c^d f(x,y)\\,dy\\right)dx = \\int_a^b A(x)\\,dx',
      prose: 'For any continuous surface f(x,y), integrating y first gives the cross-sectional area profile A(x), which is then integrated over x.',
    }
  ),
  s3d(
    'cylindrical_coords_3d',
    '3D Cylindrical Coordinates (r, θ, z) & Jacobian Wedge',
    'CALCULUS III · 3D COORDINATE SYSTEMS',
    'r dr dθ dz',
    'CylindricalCoords3DScene',
    'cylindrical_coords_3d',
    'Point P(r cos θ, r sin θ, z) on a coaxial cylinder with radial arm r, angle θ, height z, and volume wedge r dr dθ dz.',
    'Drag to orbit in 3D or vary cylindrical coordinates (r, θ, z)',
    { rVal: 1.2, thetaDeg: 52, zVal: 1.1 },
    [
      { id: 'ctrl-rval', key: 'rVal', label: 'Radial Distance r', min: 0.4, max: 1.6, step: 0.05 },
      { id: 'ctrl-tdeg', key: 'thetaDeg', label: 'Azimuth Angle θ (°)', min: 15, max: 330, step: 5 },
      { id: 'ctrl-zval', key: 'zVal', label: 'Elevation Height z', min: 0.2, max: 1.6, step: 0.05 },
    ],
    {
      badge: '3D JACOBIAN DETERMINANT · CYLINDRICAL',
      heading: 'Cylindrical Coordinate Volume Element',
      latex: 'x = r\\cos\\theta,\\; y = r\\sin\\theta,\\; z = z \\implies dV = \\left|\\frac{\\partial(x,y,z)}{\\partial(r,\\theta,z)}\\right|dr\\,d\\theta\\,dz = r\\,dr\\,d\\theta\\,dz',
      prose: 'The arc width of a cylindrical wedge at radius r is r dθ, multiplying dr and dz to produce dV = r dr dθ dz.',
    }
  ),
  s3d(
    'spherical_coords_3d',
    '3D Spherical Coordinates (ρ, θ, φ) & Volume Element',
    'CALCULUS III · SPHERICAL INTEGRALS',
    'ρ²sinφ',
    'SphericalCoords3DScene',
    'spherical_coords_3d',
    'Spherical shell of radius ρ, polar angle φ from +Z, azimuth θ, and Jacobian patch dV = ρ² sin φ dρ dφ dθ.',
    'Drag to orbit in 3D or adjust polar colatitude φ and azimuth θ',
    { rhoVal: 1.35, phiDeg: 48, thetaDeg: 55 },
    [
      { id: 'ctrl-rhoval', key: 'rhoVal', label: 'Spherical Radius ρ', min: 0.6, max: 1.65, step: 0.05 },
      { id: 'ctrl-phideg', key: 'phiDeg', label: 'Polar Angle φ from +Z (°)', min: 15, max: 150, step: 3 },
      { id: 'ctrl-tdeg', key: 'thetaDeg', label: 'Azimuth Angle θ (°)', min: 15, max: 330, step: 5 },
    ],
    {
      badge: '3D JACOBIAN DETERMINANT · SPHERICAL',
      heading: 'Spherical Coordinates & Volume Wedge',
      latex: '(x,y,z) = (\\rho\\sin\\varphi\\cos\\theta,\\, \\rho\\sin\\varphi\\sin\\theta,\\, \\rho\\cos\\varphi), \\quad dV = \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta',
      prose: 'A spherical volume element has radial thickness dρ, meridional arc ρ dφ, and parallel ring arc ρ sin φ dθ.',
    }
  ),
  s3d(
    'washer_shell_3d',
    '3D Solid of Revolution — Washers & Cylindrical Shells',
    'AP CALCULUS BC · 3D SOLIDS OF REVOLUTION',
    'π(R²−r²)',
    'WasherShell3DScene',
    'washer_shell_3d',
    'Full 3D revolved paraboloid goblet showing an animated 3D washer ring and nested cylindrical shell.',
    'Drag to orbit the 3D solid of revolution or move sample slice x₀',
    { xSlice: 0.95, sweepFrac: 0.85 },
    [
      { id: 'ctrl-xslice', key: 'xSlice', label: 'Sample Washer Position x₀', min: 0.25, max: 1.45, step: 0.05 },
      { id: 'ctrl-sweep', key: 'sweepFrac', label: 'Revolution Sweep Fraction', min: 0.35, max: 1.0, step: 0.05 },
    ],
    {
      badge: 'WASHER VS. SHELL METHOD IN 3D',
      heading: 'Volume by Cross-Sectional Washers & Shells',
      latex: 'V = \\int_a^b \\pi\\!\\left(R(x)^2 - r(x)^2\\right)dx = \\int_c^d 2\\pi y\\,h(y)\\,dy',
      prose: 'Slicing perpendicular to the axis yields annular washers of area π(R²−r²), while slicing parallel yields cylindrical shells.',
    }
  ),
  s3d(
    'pappus_centroid_torus_3d',
    "3D Pappus's Centroid Theorem & Revolving Torus",
    'CLASSICAL & CALCULUS GEOMETRY · PAPPUS THEOREM',
    '2πR·A',
    'PappusTorus3DScene',
    'pappus_centroid_torus_3d',
    'Circular cross-section of radius r revolving at centroid distance R around the Z-axis to sweep a 3D torus.',
    'Drag to orbit the 3D torus or adjust major radius R and tube radius r',
    { majorR: 1.15, minorR: 0.42 },
    [
      { id: 'ctrl-majorr', key: 'majorR', label: 'Centroid Major Radius R', min: 0.75, max: 1.45, step: 0.05 },
      { id: 'ctrl-minorr', key: 'minorR', label: 'Tube Minor Radius r', min: 0.2, max: 0.65, step: 0.02 },
    ],
    {
      badge: 'THEOREM · PAPPUS CENTROID VOLUME & AREA',
      heading: "Pappus's Second Centroid Theorem",
      latex: 'V = A \\cdot (2\\pi R) = (\\pi r^2)(2\\pi R) = 2\\pi^2 R r^2, \\qquad S = (2\\pi r)(2\\pi R) = 4\\pi^2 R r',
      prose: 'The volume of a solid of revolution equals the planar cross-section area A multiplied by the distance 2πR traveled by its centroid.',
    }
  ),
  s3d(
    'cavalieri_3d_solids_3d',
    "3D Cavalieri's Principle (Hemisphere vs Punctured Cylinder)",
    'ARCHIMEDES & 3D GEOMETRY · CAVALIERI PRINCIPLE',
    'π(R²−z²)',
    'Cavalieri3DSolidsScene',
    'cavalieri_3d_solids_3d',
    'Horizontal slicing plane at height z cutting a 3D hemisphere (disk π(R²−z²)) and cylinder-minus-cone (annulus πR²−πz²).',
    'Drag to orbit both 3D solids or slide cutting plane height z',
    { sliceZ: 0.65, radiusR: 1.15 },
    [
      { id: 'ctrl-slicez', key: 'sliceZ', label: 'Slicing Plane Height z / R', min: 0.05, max: 0.95, step: 0.02 },
      { id: 'ctrl-radr', key: 'radiusR', label: 'Solid Radius R', min: 0.7, max: 1.4, step: 0.05 },
    ],
    {
      badge: 'ARCHIMEDES PROOF · CAVALIERI IN 3D',
      heading: 'Sphere Volume via Cylinder Minus Cone',
      latex: 'A_{\\text{disk}}(z) = \\pi(R^2 - z^2) = \\pi R^2 - \\pi z^2 = A_{\\text{annulus}}(z) \\implies V_{\\text{hemi}} = \\pi R^3 - \\tfrac{1}{3}\\pi R^3 = \\tfrac{2}{3}\\pi R^3',
      prose: 'At every altitude z ∈ [0, R], the hemisphere disk and the punctured cylinder ring have identical area π(R² − z²).',
    }
  ),
  s3d(
    'triple_integral_tetrahedron_3d',
    '3D Triple Integral over a Simplex Tetrahedron',
    'CALCULUS III · TRIPLE INTEGRALS',
    '∭E dV',
    'TripleIntegralTetrahedron3DScene',
    'triple_integral_tetrahedron_3d',
    'First-octant tetrahedron x/a + y/b + z/c ≤ 1 with vertical z-integration column and planar xy-projection triangle.',
    'Drag to orbit the 3D tetrahedron or adjust intercepts a, b, c',
    { intA: 1.5, intB: 1.4, intC: 1.5 },
    [
      { id: 'ctrl-inta', key: 'intA', label: 'X-Intercept a', min: 0.7, max: 1.8, step: 0.05 },
      { id: 'ctrl-intb', key: 'intB', label: 'Y-Intercept b', min: 0.7, max: 1.8, step: 0.05 },
      { id: 'ctrl-intc', key: 'intC', label: 'Z-Intercept c', min: 0.7, max: 1.8, step: 0.05 },
    ],
    {
      badge: 'ITERATED TRIPLE INTEGRAL · 3D SIMPLEX',
      heading: 'Tetrahedron Volume via Nested Limits',
      latex: 'V = \\int_0^a \\int_0^{b(1-x/a)} \\int_0^{c(1-x/a-y/b)} dz\\,dy\\,dx = \\frac{1}{6}abc',
      prose: 'Integrating z from the floor z = 0 up to the inclined plane z = c(1 − x/a − y/b) reduces the 3D integral to a 2D triangle.',
    }
  ),

  // ── 129–136: 3D Space Curves, Topology & Vector Calculus ──
  s3d(
    'frenet_serret_helix_3d',
    '3D Helix & Moving Frenet-Serret Frame (T, N, B)',
    'DIFFERENTIAL GEOMETRY · SPACE CURVES',
    '(T,N,B)',
    'FrenetSerretHelix3DScene',
    'frenet_serret_helix_3d',
    'Circular 3D helix r(t) = (R cos t, R sin t, c t) with moving orthonormal Tangent T, Normal N, and Binormal B triad.',
    'Drag to orbit the 3D helix or adjust radius R and vertical pitch c',
    { helixR: 1.1, pitchC: 0.35 },
    [
      { id: 'ctrl-helixr', key: 'helixR', label: 'Helix Radius R', min: 0.5, max: 1.5, step: 0.05 },
      { id: 'ctrl-pitchc', key: 'pitchC', label: 'Vertical Pitch c', min: 0.15, max: 0.65, step: 0.02 },
    ],
    {
      badge: 'FRENET-SERRET APPARATUS · CURVATURE & TORSION',
      heading: 'Moving Orthonormal Triad on a Helix',
      latex: '\\kappa = \\frac{R}{R^2+c^2}, \\qquad \\tau = \\frac{c}{R^2+c^2}, \\qquad \\begin{pmatrix}\\vec{T}\'\\\\\\vec{N}\'\\\\\\vec{B}\'\\end{pmatrix} = v\\begin{pmatrix}0&\\kappa&0\\\\-\\kappa&0&\\tau\\\\0&-\\tau&0\\end{pmatrix}\\begin{pmatrix}\\vec{T}\\\\\\vec{N}\\\\\\vec{B}\\end{pmatrix}',
      prose: 'A circular helix has constant curvature κ (bending toward the axis along N) and constant torsion τ (twisting out of the osculating plane).',
    }
  ),
  s3d(
    'viviani_curve_3d',
    "3D Viviani's Curve (Sphere ∩ Tangent Cylinder)",
    '3D DIFFERENTIAL GEOMETRY · SPACE INTERSECTIONS',
    'S²∩Cyl',
    'VivianiCurve3DScene',
    'viviani_curve_3d',
    'Figure-eight 3D space curve formed where cylinder (x−a)² + y² = a² pierces sphere x² + y² + z² = 4a².',
    'Drag to orbit the 3D sphere and cylinder intersection',
    { radiusA: 0.72, tProbe: 1.1 },
    [
      { id: 'ctrl-rada', key: 'radiusA', label: 'Cylinder Radius a (Sphere 2a)', min: 0.45, max: 0.9, step: 0.02 },
      { id: 'ctrl-tprobe', key: 'tProbe', label: 'Curve Parameter t₀', min: 0.0, max: 6.28, step: 0.1 },
    ],
    {
      badge: 'CLASSICAL 3D INTERSECTION CURVE',
      heading: "Viviani's Window Parameterization",
      latex: '\\vec{r}(t) = \\left(a(1+\\cos t),\\; a\\sin t,\\; 2a\\sin\\tfrac{t}{2}\\right)',
      prose: 'Viviani’s curve projects to a circle on the xy-plane, a parabola on the xz-plane, and a lemniscate on the yz-plane.',
    }
  ),
  s3d(
    'trefoil_knot_3d',
    '3D Trefoil Torus Knot (p = 2, q = 3)',
    'LOW-DIMENSIONAL TOPOLOGY · KNOT THEORY',
    'K(2,3)',
    'TrefoilKnot3DScene',
    'trefoil_knot_3d',
    'Non-trivial 3D torus knot winding p = 2 times meridionally and q = 3 times longitudinally with tubular neighborhood.',
    'Drag to orbit the 3D knot or change torus knot winding numbers (p, q)',
    { windP: 2, windQ: 3 },
    [
      { id: 'ctrl-windp', key: 'windP', label: 'Longitudinal Winding p', min: 2, max: 4, step: 1 },
      { id: 'ctrl-windq', key: 'windQ', label: 'Meridional Winding q', min: 3, max: 7, step: 1 },
    ],
    {
      badge: 'TOPOLOGICAL INVARIANT · TORUS KNOT (p,q)',
      heading: 'Trefoil Knot Parameterization in R³',
      latex: '\\vec{r}(t) = \\big((R + r\\cos qt)\\cos pt,\\; (R + r\\cos qt)\\sin pt,\\; r\\sin qt\\big), \\quad \\gcd(p,q)=1',
      prose: 'The (2,3) trefoil knot has crossing number 3 and is chiral—it cannot be continuously deformed into its mirror image in R³.',
    }
  ),
  s3d(
    'mobius_strip_3d',
    '3D Möbius Strip & Non-Orientable Normal Transport',
    'DIFFERENTIAL TOPOLOGY · NON-ORIENTABILITY',
    'χ = 0',
    'MobiusStrip3DScene',
    'mobius_strip_3d',
    'Single-sided 3D ruled strip with a 180° half-twist where a transported normal vector n reverses direction after one loop.',
    'Drag to orbit the 3D Möbius strip or adjust strip half-width w',
    { widthW: 0.48, twists: 1 },
    [
      { id: 'ctrl-widthw', key: 'widthW', label: 'Strip Half-Width w', min: 0.2, max: 0.75, step: 0.02 },
      { id: 'ctrl-twists', key: 'twists', label: 'Half-Twists k (odd=Möbius)', min: 1, max: 3, step: 1 },
    ],
    {
      badge: 'NON-ORIENTABLE MANIFOLD · SINGLE BOUNDARY',
      heading: 'Möbius Strip & Normal Holonomy',
      latex: '\\vec{r}(u,v) = \\left(\\left(R + v\\cos\\tfrac{u}{2}\\right)\\cos u,\\; \\left(R + v\\cos\\tfrac{u}{2}\\right)\\sin u,\\; v\\sin\\tfrac{u}{2}\\right), \\quad \\vec{n}(u+2\\pi) = -\\vec{n}(u)',
      prose: 'Transporting a unit normal vector once around the central circle (u → u + 2π) returns it pointing in the opposite direction −n.',
    }
  ),
  s3d(
    'torus_villarceau_3d',
    '3D Ring Torus & Villarceau Circles',
    '3D DIFFERENTIAL GEOMETRY · TORUS FAMILIES',
    'S¹×S¹',
    'TorusVillarceau3DScene',
    'torus_villarceau_3d',
    '3D ring torus displaying four distinct circle families passing through a point: meridian, parallel, and two Villarceau circles.',
    'Drag to orbit the 3D torus or adjust tube radius r',
    { majorR: 1.15, minorR: 0.48 },
    [
      { id: 'ctrl-majorr', key: 'majorR', label: 'Major Radius R', min: 0.85, max: 1.4, step: 0.05 },
      { id: 'ctrl-minorr', key: 'minorR', label: 'Minor Radius r', min: 0.25, max: 0.65, step: 0.02 },
    ],
    {
      badge: 'THEOREM · VILLARCEAU BITANGENT CIRCLES',
      heading: 'Four Circles Through Every Point of a Torus',
      latex: '\\sin\\alpha = \\frac{r}{R} \\implies \\text{Bitangent plane cuts torus in two interlocking circles of radius } R',
      prose: 'A plane tangent to the torus at two points cuts the surface in a pair of exact circles (Villarceau circles) of radius R.',
    }
  ),
  s3d(
    'vector_field_3d_rot_div',
    '3D Vector Field — Swirl Curl & Radial Divergence',
    'VECTOR CALCULUS · 3D CURL & DIVERGENCE',
    '∇×F, ∇·F',
    'VectorField3DRotDivScene',
    'vector_field_3d_rot_div',
    '3D lattice of arrows blending rotational vortex curl (−y, x, 0) and radial source divergence (x, y, z).',
    'Drag to orbit the 3D vector lattice or blend swirl ω and source divergence α',
    { swirl: 1.0, divRate: 0.45 },
    [
      { id: 'ctrl-swirl', key: 'swirl', label: 'Rotational Vorticity ω (Curl)', min: -1.5, max: 1.5, step: 0.1 },
      { id: 'ctrl-div', key: 'divRate', label: 'Radial Expansion α (Divergence)', min: -1.0, max: 1.2, step: 0.1 },
    ],
    {
      badge: 'HELMHOLTZ DECOMPOSITION IN R³',
      heading: '3D Divergence and Curl Operators',
      latex: '\\vec{F}(x,y,z) = \\alpha\\langle x,y,z\\rangle + \\omega\\langle -y,x,0\\rangle \\implies \\nabla\\cdot\\vec{F} = 3\\alpha, \\quad \\nabla\\times\\vec{F} = \\langle 0,0,2\\omega\\rangle',
      prose: 'Divergence ∇·F measures volumetric expansion per unit volume, while Curl ∇×F measures local rotational vorticity.',
    }
  ),
  s3d(
    'divergence_gauss_flux_3d',
    "3D Gauss's Divergence Theorem Flux Sphere",
    'VECTOR CALCULUS · GAUSS DIVERGENCE THEOREM',
    '∯F·dS',
    'GaussDivergenceFlux3DScene',
    'divergence_gauss_flux_3d',
    'Outward normal flux vectors F · n piercing a closed 3D sphere of radius R equal the interior volume integral of ∇·F.',
    'Drag to orbit the 3D flux sphere or adjust sphere radius R and source density',
    { sphereR: 1.15, sourceDiv: 1.2 },
    [
      { id: 'ctrl-spherer', key: 'sphereR', label: 'Gaussian Sphere Radius R', min: 0.6, max: 1.5, step: 0.05 },
      { id: 'ctrl-sdiv', key: 'sourceDiv', label: 'Source Divergence Density α', min: 0.3, max: 2.0, step: 0.1 },
    ],
    {
      badge: "FUNDAMENTAL THEOREM · GAUSS'S DIVERGENCE",
      heading: 'Outward Surface Flux Equals Interior Divergence',
      latex: '\\oiint_{\\partial V} \\vec{F}\\cdot d\\vec{S} = \\iiint_V (\\nabla\\cdot\\vec{F})\\,dV = 3\\alpha \\cdot \\frac{4}{3}\\pi R^3 = 4\\pi\\alpha R^3',
      prose: 'Total outward flux across the closed spherical boundary equals the integral of volumetric source density inside the ball.',
    }
  ),
  s3d(
    'stokes_circulation_cap_3d',
    "3D Stokes' Theorem Paraboloid Cap & Rim Circulation",
    "VECTOR CALCULUS · KELVIN-STOKES THEOREM",
    '∮F·dr',
    'StokesTheoremCap3DScene',
    'stokes_circulation_cap_3d',
    'Paraboloid cap Σ in 3D with surface curl arrows (∇×F)·n matching the boundary line integral ∮_∂Σ F·dr around the rim.',
    'Drag to orbit the 3D paraboloid cap or vary rim radius R and cap height',
    { rimR: 1.2, capH: 1.1 },
    [
      { id: 'ctrl-rimr', key: 'rimR', label: 'Boundary Rim Radius R', min: 0.6, max: 1.5, step: 0.05 },
      { id: 'ctrl-caph', key: 'capH', label: 'Surface Cap Height H', min: 0.0, max: 1.6, step: 0.1 },
    ],
    {
      badge: "FUNDAMENTAL THEOREM · STOKES' CURL FLUX",
      heading: 'Surface Curl Flux Independence of Cap Height',
      latex: '\\iint_\\Sigma (\\nabla\\times\\vec{F})\\cdot d\\vec{S} = \\oint_{\\partial\\Sigma} \\vec{F}\\cdot d\\vec{r} = 2\\pi R^2',
      prose: 'By Stokes’ theorem, deforming the cap height H while keeping the boundary circle ∂Σ fixed leaves the total curl flux invariant.',
    }
  ),

  // ── 137–144: 3D Linear Algebra, Spatial Geometry & Polyhedra ──
  s3d(
    'cross_product_3d',
    '3D Cross Product a × b & Right-Hand Orthogonal Area',
    'LINEAR ALGEBRA & 3D VECTORS · CROSS PRODUCT',
    'a × b',
    'CrossProduct3DScene',
    'cross_product_3d',
    'Vectors a and b in R³, their spanned parallelogram of area ‖a×b‖ = ‖a‖‖b‖sin θ, and perpendicular vector a × b.',
    'Drag to orbit in 3D or vary the angle θ between vectors a and b',
    { angleDeg: 65, lenB: 1.25 },
    [
      { id: 'ctrl-adeg', key: 'angleDeg', label: 'Angle Between a and b (°)', min: 15, max: 165, step: 3 },
      { id: 'ctrl-lenb', key: 'lenB', label: 'Magnitude ‖b‖', min: 0.6, max: 1.6, step: 0.05 },
    ],
    {
      badge: '3D VECTOR ALGEBRA · EXTERIOR BIVECTOR',
      heading: 'Cross Product Orthogonality & Area',
      latex: '\\vec{a}\\times\\vec{b} = \\det\\begin{pmatrix}\\hat{\\imath}&\\hat{\\jmath}&\\hat{k}\\\\a_x&a_y&a_z\\\\b_x&b_y&b_z\\end{pmatrix}, \\qquad \\|\\vec{a}\\times\\vec{b}\\| = \\|\\vec{a}\\|\\,\\|\\vec{b}\\|\\sin\\theta',
      prose: 'The vector a × b is orthogonal to the plane of a and b with magnitude equal to the area of the spanned parallelogram.',
    }
  ),
  s3d(
    'scalar_triple_parallelepiped_3d',
    '3D Parallelepiped & Determinant Volume |a · (b × c)|',
    'LINEAR ALGEBRA · 3×3 DETERMINANTS IN 3D',
    'det[a,b,c]',
    'ParallelepipedVolume3DScene',
    'scalar_triple_parallelepiped_3d',
    '3D parallelepiped spanned by vectors a, b, c with base area vector b × c and signed volume det[a b c] = a · (b × c).',
    'Drag to orbit the 3D parallelepiped or shear vector c',
    { shearC: 0.45, heightC: 1.2 },
    [
      { id: 'ctrl-shearc', key: 'shearC', label: 'Horizontal Shear of c', min: -1.0, max: 1.0, step: 0.05 },
      { id: 'ctrl-heightc', key: 'heightC', label: 'Vertical Altitude c_z', min: 0.4, max: 1.6, step: 0.05 },
    ],
    {
      badge: 'GEOMETRY OF 3×3 DETERMINANTS',
      heading: 'Scalar Triple Product & Shear Invariance',
      latex: 'V = \\big|\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\big| = \\big|\\det[\\vec{a}\\;\\;\\vec{b}\\;\\;\\vec{c}]\\big| = \\text{Area}_{\\vec{a},\\vec{b}} \\cdot h_{\\perp}',
      prose: 'Shearing vector c parallel to the base plane spanned by a and b leaves the altitude h_⊥ and determinant volume unchanged.',
    }
  ),
  s3d(
    'plane_normal_eq_3d',
    '3D Plane Equation n · (r − r₀) = 0 & Point Distance',
    'IB MATH AA HL / 3D GEOMETRY · PLANES IN R³',
    'n·x = d',
    'PlaneNormalDistance3DScene',
    'plane_normal_eq_3d',
    'Tilted 3D plane Ax + By + Cz = D with normal vector n and shortest orthogonal projection segment from exterior point P.',
    'Drag to orbit the 3D plane or change plane offset d and normal tilt',
    { planeD: 0.35, tiltNx: 0.65 },
    [
      { id: 'ctrl-planed', key: 'planeD', label: 'Plane Signed Offset d', min: -0.8, max: 1.0, step: 0.05 },
      { id: 'ctrl-tiltnx', key: 'tiltNx', label: 'Normal X-Component n_x', min: -1.1, max: 1.1, step: 0.05 },
    ],
    {
      badge: '3D ANALYTIC GEOMETRY · POINT-TO-PLANE DISTANCE',
      heading: 'Orthogonal Projection onto a Plane',
      latex: '\\vec{n}\\cdot(\\vec{r}-\\vec{r}_0) = 0, \\qquad D(P, \\Pi) = \\frac{|A x_p + B y_p + C z_p - d|}{\\sqrt{A^2+B^2+C^2}}',
      prose: 'The shortest path from an exterior point P to a plane Π lies along the surface normal n = ⟨A, B, C⟩.',
    }
  ),
  s3d(
    'skew_lines_distance_3d',
    '3D Skew Lines & Common Perpendicular Distance',
    'IB MATH AA HL · SKEW LINES IN 3D SPACE',
    '|Δr·(d₁×d₂)|',
    'SkewLinesDistance3DScene',
    'skew_lines_distance_3d',
    'Two non-parallel, non-intersecting 3D skew lines L₁(s) and L₂(t) joined by their unique common perpendicular bridge.',
    'Drag to orbit the 3D skew lines or vary vertical separation and angle',
    { sepZ: 0.95, skewDeg: 55 },
    [
      { id: 'ctrl-sepz', key: 'sepZ', label: 'Vertical Offset Δz', min: 0.3, max: 1.5, step: 0.05 },
      { id: 'ctrl-sdeg', key: 'skewDeg', label: 'Crossing Angle (°)', min: 20, max: 140, step: 5 },
    ],
    {
      badge: '3D VECTOR GEOMETRY · SKEW LINES',
      heading: 'Shortest Distance Between Skew Lines',
      latex: 'D(L_1, L_2) = \\frac{\\big|(\\vec{p}_2 - \\vec{p}_1)\\cdot(\\vec{d}_1\\times\\vec{d}_2)\\big|}{\\|\\vec{d}_1\\times\\vec{d}_2\\|}',
      prose: 'The unique segment of minimum distance between skew lines L₁ and L₂ is simultaneously perpendicular to both direction vectors along d₁ × d₂.',
    }
  ),
  s3d(
    'svd_3d_ellipsoid',
    '3D Singular Value Decomposition (Sphere → Ellipsoid)',
    'UNIVERSITY LINEAR ALGEBRA · 3D SVD GEOMETRY',
    'A=UΣVᵀ',
    'SVD3DEllipsoidScene',
    'svd_3d_ellipsoid',
    '3×3 matrix transformation mapping the 3D unit sphere into a rotated ellipsoid with singular semi-axes σ₁u₁, σ₂u₂, σ₃u₃.',
    'Drag to orbit in 3D or adjust singular values σ₁, σ₂, σ₃',
    { sigma1: 1.65, sigma2: 1.05, sigma3: 0.55 },
    [
      { id: 'ctrl-sig1', key: 'sigma1', label: 'First Singular Value σ₁', min: 0.8, max: 2.0, step: 0.05 },
      { id: 'ctrl-sig2', key: 'sigma2', label: 'Second Singular Value σ₂', min: 0.5, max: 1.6, step: 0.05 },
      { id: 'ctrl-sig3', key: 'sigma3', label: 'Third Singular Value σ₃', min: 0.25, max: 1.2, step: 0.05 },
    ],
    {
      badge: 'FUNDAMENTAL THEOREM · 3D SVD GEOMETRY',
      heading: 'Unit Sphere Image Under a 3×3 Matrix',
      latex: 'A = U\\Sigma V^T, \\qquad A\\vec{v}_i = \\sigma_i\\vec{u}_i, \\qquad |\\det A| = \\sigma_1\\sigma_2\\sigma_3',
      prose: 'Every 3×3 matrix A maps the unit sphere S² onto a 3D ellipsoid whose orthogonal principal semi-axes have lengths σ₁ ≥ σ₂ ≥ σ₃.',
    }
  ),
  s3d(
    'rodrigues_rotation_3d',
    '3D Rodrigues Rotation Formula & Axis-Angle Cone',
    '3D LIE GROUPS SO(3) & COMPUTER GRAPHICS',
    'R(k,θ)v',
    'RodriguesRotation3DScene',
    'rodrigues_rotation_3d',
    'Rotating 3D vector v around unit axis k by angle θ along a circular precession cone via Rodrigues’ formula.',
    'Drag to orbit in 3D or scrub rotation angle θ around axis k',
    { rotDeg: 115, coneDeg: 42 },
    [
      { id: 'ctrl-rotdeg', key: 'rotDeg', label: 'Rotation Angle θ Around k (°)', min: 0, max: 360, step: 5 },
      { id: 'ctrl-conedeg', key: 'coneDeg', label: 'Cone Half-Angle α (°)', min: 15, max: 75, step: 2 },
    ],
    {
      badge: '3D ROTATION GROUP SO(3) · RODRIGUES FORMULA',
      heading: 'Axis-Angle Rotation in R³',
      latex: '\\vec{v}_{\\text{rot}} = \\vec{v}\\cos\\theta + (\\vec{k}\\times\\vec{v})\\sin\\theta + \\vec{k}(\\vec{k}\\cdot\\vec{v})(1-\\cos\\theta)',
      prose: 'Decomposing v into its axial projection (k·v)k and orthogonal plane vectors v_⊥ and k × v yields exact 3D rotation.',
    }
  ),
  s3d(
    'euler_polyhedron_3d',
    "3D Platonic Solids & Euler's Characteristic V − E + F = 2",
    '3D COMBINATORIAL TOPOLOGY · PLATONIC SOLIDS',
    'V−E+F=2',
    'PlatonicSolidsEuler3DScene',
    'euler_polyhedron_3d',
    'Interactive 3D Tetrahedron, Cube, Octahedron, and Icosahedron verifying Euler’s polyhedral invariant V − E + F = 2.',
    'Drag to rotate the 3D polyhedron or switch Platonic solid index (1–4)',
    { solidIdx: 2, scaleR: 1.25 },
    [
      { id: 'ctrl-solid', key: 'solidIdx', label: 'Platonic Solid (1=Tet, 2=Cube, 3=Oct, 4=Ico)', min: 1, max: 4, step: 1 },
      { id: 'ctrl-scaler', key: 'scaleR', label: 'Circumradius R', min: 0.8, max: 1.55, step: 0.05 },
    ],
    {
      badge: "THEOREM · EULER'S POLYHEDRAL FORMULA",
      heading: 'Topological Invariant of Convex Polyhedra',
      latex: 'V - E + F = \\chi(S^2) = 2',
      prose: 'Every convex 3D polyhedron is homeomorphic to the 2-sphere S², forcing Vertices minus Edges plus Faces to equal 2.',
    }
  ),
  s3d(
    'stereographic_projection_3d',
    '3D Riemann Sphere & Stereographic Projection',
    'COMPLEX ANALYSIS & 3D GEOMETRY · RIEMANN SPHERE',
    'S²→ℂ∪{∞}',
    'StereographicProjection3DScene',
    'stereographic_projection_3d',
    'Rays from North Pole N(0,0,1) through a circle on the 3D unit sphere S² projecting conformally to a circle on z = 0.',
    'Drag to orbit the 3D Riemann sphere or move the spherical circle latitude',
    { latDeg: 18, tiltDeg: 22 },
    [
      { id: 'ctrl-latdeg', key: 'latDeg', label: 'Spherical Circle Latitude (°)', min: -45, max: 45, step: 3 },
      { id: 'ctrl-tiltdeg', key: 'tiltDeg', label: 'Circle Tilt Angle (°)', min: 0, max: 45, step: 3 },
    ],
    {
      badge: 'CONFORMAL 3D PROJECTION · RIEMANN SPHERE',
      heading: 'Stereographic Projection from the North Pole',
      latex: '\\Pi(X,Y,Z) = \\left(\\frac{X}{1-Z},\\; \\frac{Y}{1-Z}\\right) \\in \\mathbb{C}',
      prose: 'Stereographic projection is conformal (angle-preserving) and maps circles on S² not passing through N to circles in the plane.',
    }
  ),

  // ── 145–150: 3D Physics, Chaos & Quantum Geometry ──
  s3d(
    'lorenz_attractor_3d',
    '3D Lorenz Strange Attractor Butterfly',
    'NONLINEAR DYNAMICS & 3D ODEs · CHAOS THEORY',
    'dx/dt=σ(y−x)',
    'LorenzAttractor3DScene',
    'lorenz_attractor_3d',
    'Chaotic 3D phase-space trajectory orbiting the two butterfly wing equilibria of the Lorenz convection system.',
    'Drag to orbit the 3D Lorenz butterfly attractor or vary Rayleigh number ρ',
    { rhoVal: 28, sigmaVal: 10 },
    [
      { id: 'ctrl-rho', key: 'rhoVal', label: 'Rayleigh Parameter ρ', min: 18, max: 36, step: 1 },
      { id: 'ctrl-sigma', key: 'sigmaVal', label: 'Prandtl Number σ', min: 6, max: 14, step: 0.5 },
    ],
    {
      badge: 'DETERMINISTIC CHAOS · FRACTAL ATTRACTOR (D ≈ 2.06)',
      heading: 'Lorenz 3D Atmospheric Convection System',
      latex: '\\dot{x} = \\sigma(y-x), \\qquad \\dot{y} = x(\\rho - z) - y, \\qquad \\dot{z} = xy - \\beta z',
      prose: 'Volume in 3D phase space contracts exponentially (∇·F = −(σ + 1 + β) < 0), folding trajectories onto a zero-volume fractal butterfly.',
    }
  ),
  s3d(
    'rossler_attractor_3d',
    '3D Rössler Chaotic Folding Band Attractor',
    'NONLINEAR DYNAMICS · 3D PHASE SPACE FOLDING',
    'ż=b+z(x−c)',
    'RosslerAttractor3DScene',
    'rossler_attractor_3d',
    '3D Rössler strange attractor spiralling outward in the xy-plane before folding vertically along the z-axis.',
    'Drag to orbit the 3D Rössler attractor or adjust folding parameter c',
    { cParam: 5.7, aParam: 0.2 },
    [
      { id: 'ctrl-cparam', key: 'cParam', label: 'Folding Parameter c', min: 3.5, max: 7.0, step: 0.1 },
      { id: 'ctrl-aparam', key: 'aParam', label: 'Spiral Expansion a', min: 0.1, max: 0.3, step: 0.02 },
    ],
    {
      badge: 'STRETCH-AND-FOLD CHAOS IN R³',
      heading: 'Rössler System with Single Nonlinearity xz',
      latex: '\\dot{x} = -y - z, \\qquad \\dot{y} = x + ay, \\qquad \\dot{z} = b + z(x - c)',
      prose: 'Unlike the Lorenz system, Rössler’s ODE has only a single quadratic term xz that lifts and folds the expanding xy-spiral.',
    }
  ),
  s3d(
    'membrane_eigenmode_3d',
    '3D Vibrating Drumhead Standing Wave Mode (m, n)',
    'PARTIAL DIFFERENTIAL EQUATIONS · 2D WAVE EQUATION',
    '∇²u=u_tt/c²',
    'MembraneEigenmode3DScene',
    'membrane_eigenmode_3d',
    '3D normal mode u(x,y,t) = sin(mπx) sin(nπy) cos(ωt) of a vibrating square membrane with Chladni nodal lines.',
    'Drag to orbit the 3D vibrating membrane or change mode numbers (m, n)',
    { modeM: 2, modeN: 2 },
    [
      { id: 'ctrl-modem', key: 'modeM', label: 'X-Mode Number m', min: 1, max: 3, step: 1 },
      { id: 'ctrl-moden', key: 'modeN', label: 'Y-Mode Number n', min: 1, max: 3, step: 1 },
    ],
    {
      badge: 'HELMHOLTZ EIGENVALUE PROBLEM · CHLADNI MODES',
      heading: '2D Wave Equation Normal Modes in 3D',
      latex: 'u_{mn}(x,y,t) = \\sin(m\\pi x)\\sin(n\\pi y)\\cos(\\omega_{mn}t), \\qquad \\omega_{mn} = c\\pi\\sqrt{m^2+n^2}',
      prose: 'Standing waves on a 2D membrane oscillate around stationary Chladni nodal lines where sin(mπx) = 0 or sin(nπy) = 0.',
    }
  ),
  s3d(
    'magnetic_helix_3d',
    '3D Lorentz Cyclotron Helix in a Magnetic Field B',
    'ELECTRODYNAMICS & 3D ODEs · LORENTZ FORCE',
    'F=q(v×B)',
    'MagneticCyclotron3DScene',
    'magnetic_helix_3d',
    'Charged particle spiralling along magnetic field B = B₀ k̂ with Larmor radius r_L = mv_⊥/(qB) and velocity/force vectors.',
    'Drag to orbit the 3D cyclotron helix or adjust magnetic field B and drift v_z',
    { bField: 1.2, driftVz: 0.38 },
    [
      { id: 'ctrl-bfield', key: 'bField', label: 'Magnetic Field Strength B', min: 0.6, max: 2.2, step: 0.1 },
      { id: 'ctrl-driftvz', key: 'driftVz', label: 'Parallel Drift Velocity v_∥', min: 0.15, max: 0.65, step: 0.02 },
    ],
    {
      badge: '3D MAGNETIC DYNAMICS · LARMOR GYRATION',
      heading: 'Cyclotron Motion Under F = q(v × B)',
      latex: 'm\\frac{d\\vec{v}}{dt} = q(\\vec{v}\\times\\vec{B}), \\qquad r_L = \\frac{m v_\\perp}{|q|B}, \\qquad \\omega_c = \\frac{|q|B}{m}',
      prose: 'Because v × B is always perpendicular to v, the magnetic force does zero work (‖v‖ = const) while bending the path into a 3D helix.',
    }
  ),
  s3d(
    'kepler_3d_orbit',
    '3D Inclined Keplerian Orbit & Angular Momentum L',
    'CELESTIAL MECHANICS · 3D ORBITAL ELEMENTS',
    'L = r × p',
    'Kepler3DOrbitScene',
    'kepler_3d_orbit',
    '3D elliptical orbit tilted by inclination i from the ecliptic plane with conserved angular momentum vector L = r × p.',
    'Drag to orbit in 3D or vary orbital inclination i and eccentricity e',
    { incDeg: 32, ecc: 0.48 },
    [
      { id: 'ctrl-incdeg', key: 'incDeg', label: 'Orbital Inclination i (°)', min: 0, max: 65, step: 2 },
      { id: 'ctrl-ecc', key: 'ecc', label: 'Orbital Eccentricity e', min: 0.0, max: 0.75, step: 0.05 },
    ],
    {
      badge: 'CONSERVATION OF ANGULAR MOMENTUM IN R³',
      heading: '3D Keplerian Orbital Plane & Elements',
      latex: '\\vec{L} = \\vec{r}\\times m\\vec{v} = \\text{const}, \\qquad r(\\nu) = \\frac{a(1-e^2)}{1+e\\cos\\nu}',
      prose: 'Central gravity F ∥ r exerts zero torque τ = r × F = 0, locking the 3D orbit inside the plane perpendicular to L.',
    }
  ),
  s3d(
    'bloch_sphere_qubit_3d',
    '3D Quantum Bloch Sphere & Qubit State Precession',
    'QUANTUM COMPUTING & SU(2) · BLOCH SPHERE',
    '|ψ⟩ ∈ S²',
    'BlochSphereQubit3DScene',
    'bloch_sphere_qubit_3d',
    'Pure qubit state |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩ on the 3D Bloch sphere with polar θ and phase φ.',
    'Drag to orbit the 3D Bloch sphere or adjust qubit polar θ and phase φ',
    { thetaDeg: 60, phiDeg: 45 },
    [
      { id: 'ctrl-tdeg', key: 'thetaDeg', label: 'Polar Superposition Angle θ (°)', min: 0, max: 180, step: 5 },
      { id: 'ctrl-pdeg', key: 'phiDeg', label: 'Relative Quantum Phase φ (°)', min: 0, max: 360, step: 5 },
    ],
    {
      badge: 'HOPF FIBRATION CP¹ ≅ S² · QUANTUM GEOMETRY',
      heading: 'Bloch Sphere Representation of a Qubit',
      latex: '|\\psi\\rangle = \\cos\\frac{\\theta}{2}|0\\rangle + e^{i\\varphi}\\sin\\frac{\\theta}{2}|1\\rangle \\longleftrightarrow \\vec{r} = (\\sin\\theta\\cos\\varphi,\\, \\sin\\theta\\sin\\varphi,\\, \\cos\\theta)',
      prose: 'Unitary quantum gates in SU(2) act as rigid 3D rotations SO(3) of the Bloch vector r on the unit sphere S².',
    }
  ),
];

/* ==========================================================================
   3D Projection & Surface/Manifold Rendering Engine Attached to Engine3c1c
   ========================================================================== */

export function attach3DRenderers(EngineClass) {
  const proto = EngineClass.prototype;

  proto.create3DStage = function (ctx, pal, bounds, azimDeg = 38, elevDeg = 26, boxScale = 1.6) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height > bounds.width * 1.1;
    const areaW = isTall ? plotW : Math.round(plotW * 0.60);
    const areaH = isTall ? Math.round(plotH * 0.56) : plotH;
    const areaX = padX;
    const areaY = plotTop;
    const cx = areaX + areaW * 0.5;
    const cy = areaY + areaH * 0.54;
    const unitPx = (Math.min(areaW, areaH) * 0.40) / boxScale;

    const az = (azimDeg * Math.PI) / 180;
    const el = (elevDeg * Math.PI) / 180;
    const cosA = Math.cos(az);
    const sinA = Math.sin(az);
    const cosE = Math.cos(el);
    const sinE = Math.sin(el);

    const project = (x, y, z) => {
      // Right-handed 3D coordinate system with Z pointing UP on screen
      const rx = -x * sinA + y * cosA;
      const ry = -x * cosA * sinE - y * sinA * sinE + z * cosE;
      const rz = -x * cosA * cosE - y * sinA * cosE - z * sinE; // depth (larger = closer)
      const fov = 7.5 * boxScale;
      const persp = fov / Math.max(2.0, fov - rz * 0.55);
      return {
        x: cx + rx * unitPx * persp,
        y: cy - ry * unitPx * persp,
        depth: rz,
      };
    };

    this.lastPlotMapper = {
      is3D: true,
      azimDeg,
      elevDeg,
      areaX,
      areaY,
      areaW,
      areaH,
      cx,
      cy,
    };

    // Draw 3D Floor Grid on z = -boxScale * 0.78
    const zFloor = -boxScale * 0.78;
    ctx.save();
    ctx.lineWidth = 1.1 * scale;
    ctx.strokeStyle = pal.gridMajor;
    const steps = 6;
    for (let i = -steps; i <= steps; i++) {
      const u = (i / steps) * boxScale;
      const p0 = project(u, -boxScale, zFloor);
      const p1 = project(u, boxScale, zFloor);
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();

      const q0 = project(-boxScale, u, zFloor);
      const q1 = project(boxScale, u, zFloor);
      ctx.beginPath();
      ctx.moveTo(q0.x, q0.y);
      ctx.lineTo(q1.x, q1.y);
      ctx.stroke();
    }

    // Draw 3D Coordinate Axes (X, Y, Z) through origin (0,0,0)
    const axLen = boxScale * 1.08;
    const o = project(0, 0, 0);
    const px = project(axLen, 0, 0);
    const nx = project(-axLen * 0.75, 0, 0);
    const py = project(0, axLen, 0);
    const ny = project(0, -axLen * 0.75, 0);
    const pz = project(0, 0, axLen * 0.95);
    const nz = project(0, 0, zFloor);

    ctx.strokeStyle = pal.axis;
    ctx.lineWidth = 1.6 * scale;
    for (const [a, b] of [
      [nx, o],
      [ny, o],
      [nz, o],
    ]) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    this.drawArrow(ctx, o.x, o.y, px.x, px.y, pal.indigo, 2.2 * scale);
    this.drawArrow(ctx, o.x, o.y, py.x, py.y, pal.teal, 2.2 * scale);
    this.drawArrow(ctx, o.x, o.y, pz.x, pz.y, pal.amber, 2.4 * scale);

    ctx.font = `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`;
    ctx.fillStyle = pal.indigo;
    ctx.fillText('X', px.x + 6 * scale, px.y + 4 * scale);
    ctx.fillStyle = pal.teal;
    ctx.fillText('Y', py.x + 6 * scale, py.y + 4 * scale);
    ctx.fillStyle = pal.amber;
    ctx.fillText('Z', pz.x + 6 * scale, pz.y - 4 * scale);
    ctx.restore();

    return { project, areaX, areaY, areaW, areaH, isTall, zFloor, boxScale };
  };

  proto.draw3DSurfaceQuads = function (ctx, pal, project, scale, paramFn, uMin, uMax, vMin, vMax, nu = 22, nv = 22, style = {}) {
    const quads = [];
    const du = (uMax - uMin) / nu;
    const dv = (vMax - vMin) / nv;

    for (let i = 0; i < nu; i++) {
      const u0 = uMin + i * du;
      const u1 = u0 + du;
      for (let j = 0; j < nv; j++) {
        const v0 = vMin + j * dv;
        const v1 = v0 + dv;
        const c00 = paramFn(u0, v0);
        const c10 = paramFn(u1, v0);
        const c11 = paramFn(u1, v1);
        const c01 = paramFn(u0, v1);
        if (!c00 || !c10 || !c11 || !c01) continue;

        const p00 = project(c00.x, c00.y, c00.z);
        const p10 = project(c10.x, c10.y, c10.z);
        const p11 = project(c11.x, c11.y, c11.z);
        const p01 = project(c01.x, c01.y, c01.z);

        const depth = 0.25 * (p00.depth + p10.depth + p11.depth + p01.depth);
        const zAvg = 0.25 * (c00.z + c10.z + c11.z + c01.z);
        quads.push({ p00, p10, p11, p01, depth, zAvg, i, j });
      }
    }

    quads.sort((a, b) => a.depth - b.depth);

    ctx.save();
    for (const q of quads) {
      ctx.beginPath();
      ctx.moveTo(q.p00.x, q.p00.y);
      ctx.lineTo(q.p10.x, q.p10.y);
      ctx.lineTo(q.p11.x, q.p11.y);
      ctx.lineTo(q.p01.x, q.p01.y);
      ctx.closePath();

      if (style.fillColor) {
        ctx.fillStyle = style.fillColor;
      } else {
        ctx.fillStyle = q.zAvg >= 0 ? pal.indigoFill : pal.tealFill;
      }
      ctx.fill();

      ctx.strokeStyle = style.strokeColor || (q.zAvg >= 0 ? pal.indigo : pal.teal);
      ctx.lineWidth = (style.lineWidth || 1.15) * scale;
      ctx.stroke();
    }
    ctx.restore();
  };

  proto.draw3DCurve = function (ctx, project, scale, curveFn, tMin, tMax, steps, color, width = 3.5, dashed = false) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width * scale;
    if (dashed) ctx.setLineDash([7 * scale, 5 * scale]);
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= steps; i++) {
      const t = tMin + ((tMax - tMin) * i) / steps;
      const pt = curveFn(t);
      if (!pt || !Number.isFinite(pt.x) || !Number.isFinite(pt.y) || !Number.isFinite(pt.z)) continue;
      const p = project(pt.x, pt.y, pt.z);
      if (!started) {
        ctx.moveTo(p.x, p.y);
        started = true;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.stroke();
    ctx.restore();
  };

  proto.draw3DScene = function (preset, ctx, pal, bounds, params, time, duration) {
    const sub = preset.subType;
    const { scale, padX, plotW } = bounds;
    const prog = spanEase(time, 0.15, duration * 0.82);

    // Subtle gentle auto-orbit breathing added to user's azimDeg
    const baseAzim = Number(params.azimDeg ?? 38);
    const baseElev = Number(params.elevDeg ?? 26);
    const liveAzim = baseAzim + 10 * Math.sin(time * 0.65);

    const stage = this.create3DStage(ctx, pal, bounds, liveAzim, baseElev, 1.65);
    const { project, areaX, areaY, areaW, areaH, isTall, zFloor } = stage;

    let lines = [];
    let readouts = [];
    let tableHeaders = ['Coordinate / Parameter', 'X / Value 1', 'Y / Value 2', 'Z / Metric'];
    let tableRows = [];

    // ── 101: Elliptic Paraboloid & Level Curves ──
    if (sub === 'paraboloid_3d') {
      const cSlice = Number(params.cSlice ?? 1.4);
      const aRatio = Number(params.aRatio ?? 1.1);
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (r, th) => ({
          x: r * aRatio * Math.cos(th),
          y: r * Math.sin(th),
          z: r * r - 0.8,
        }),
        0,
        1.45,
        0,
        Math.PI * 2 * Math.max(0.3, prog),
        14,
        24
      );
      const rSlice = Math.sqrt(Math.max(0.05, cSlice));
      // Level curve on surface and projected onto floor
      this.draw3DCurve(
        ctx,
        project,
        scale,
        (t) => ({ x: rSlice * aRatio * Math.cos(t), y: rSlice * Math.sin(t), z: cSlice - 0.8 }),
        0,
        Math.PI * 2,
        80,
        pal.amber,
        4.0
      );
      this.draw3DCurve(
        ctx,
        project,
        scale,
        (t) => ({ x: rSlice * aRatio * Math.cos(t), y: rSlice * Math.sin(t), z: zFloor }),
        0,
        Math.PI * 2,
        80,
        pal.amber,
        2.8,
        true
      );
      const areaEll = Math.PI * (rSlice * aRatio) * rSlice;
      lines = [
        { text: '3D ELLIPTIC PARABOLOID & LEVEL TRACE', color: pal.amber },
        { text: `Slice Plane z = c = ${cSlice.toFixed(2)}`, color: pal.ink },
        { text: `Semi-axes: a√c = ${(rSlice * aRatio).toFixed(2)}, b√c = ${rSlice.toFixed(2)}`, color: pal.teal },
        { text: `Contour Area = πab·c = ${areaEll.toFixed(3)}`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Plane Height c', val: cSlice.toFixed(2) },
        { key: 'Semi-Axis a√c', val: (rSlice * aRatio).toFixed(2) },
        { key: 'Contour Area', val: areaEll.toFixed(2) },
        { key: 'Orbit (θ, φ)', val: `${Math.round(baseAzim)}°, ${Math.round(baseElev)}°` },
      ];
      tableRows = [0.4, 0.8, 1.2, 1.6, 2.0, 2.4].map((c) => [
        `z = ${c.toFixed(1)}`,
        (Math.sqrt(c) * aRatio).toFixed(3),
        Math.sqrt(c).toFixed(3),
        (Math.PI * aRatio * c).toFixed(3),
      ]);
    }
    // ── 102: Hyperbolic Paraboloid Saddle ──
    else if (sub === 'hyperbolic_paraboloid_3d') {
      const k = Number(params.curvature ?? 1.0);
      const sx = Number(params.sliceX ?? 0.8);
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (x, y) => ({ x, y, z: 0.48 * k * (x * x - y * y) }),
        -1.35,
        1.35,
        -1.35,
        1.35,
        18,
        18
      );
      // Upward parabola y=0 (Teal) and downward parabola x=0 (Amber)
      this.draw3DCurve(ctx, project, scale, (x) => ({ x, y: 0, z: 0.48 * k * x * x }), -1.35, 1.35, 60, pal.teal, 4.0);
      this.draw3DCurve(ctx, project, scale, (y) => ({ x: 0, y, z: -0.48 * k * y * y }), -1.35, 1.35, 60, pal.amber, 4.0);
      const pOrigin = project(0, 0, 0);
      this.drawDot(ctx, pOrigin.x, pOrigin.y, 8 * scale, pal.amber, pal.bg);
      const gaussK = -(k * k);
      lines = [
        { text: 'HYPERBOLIC PARABOLOID SADDLE (z = κ(x² − y²))', color: pal.amber },
        { text: `Saddle Origin (0,0,0): ∇z = (0, 0)`, color: pal.ink },
        { text: `Trace y=0: +${k.toFixed(2)}x² (Min) | Trace x=0: −${k.toFixed(2)}y² (Max)`, color: pal.teal },
        { text: `Gaussian Curvature K(0,0) = −4κ² = ${gaussK.toFixed(3)} < 0`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Curvature κ', val: k.toFixed(2) },
        { key: 'Gaussian K(0,0)', val: gaussK.toFixed(2) },
        { key: 'z(x₀, 0)', val: (0.48 * k * sx * sx).toFixed(3) },
        { key: 'Point Type', val: 'Saddle (D < 0)' },
      ];
      tableRows = [-1.2, -0.6, 0.0, 0.6, 1.2].map((u) => [
        `u = ${u.toFixed(1)}`,
        `z(u,0)=${(0.48 * k * u * u).toFixed(3)}`,
        `z(0,u)=${(-0.48 * k * u * u).toFixed(3)}`,
        'Hyperbolic Saddle',
      ]);
    }
    // ── 103: Hyperboloid of One Sheet (Doubly Ruled) ──
    else if (sub === 'hyperboloid_one_sheet_3d') {
      const a = Number(params.waist ?? 0.85);
      const twist = (Number(params.twistDeg ?? 42) * Math.PI) / 180;
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (z, th) => {
          const r = a * Math.sqrt(1 + z * z);
          return { x: r * Math.cos(th), y: r * Math.sin(th), z };
        },
        -1.2,
        1.2,
        0,
        Math.PI * 2,
        14,
        24
      );
      // Draw straight ruling lines of both families
      for (let k = 0; k < 12; k++) {
        const th = (k / 12) * Math.PI * 2;
        const pBot = project(a * Math.cos(th - twist), a * Math.sin(th - twist), -1.2);
        const pTop = project(a * Math.cos(th + twist), a * Math.sin(th + twist), 1.2);
        ctx.save();
        ctx.strokeStyle = pal.amber;
        ctx.lineWidth = 2.4 * scale;
        ctx.beginPath();
        ctx.moveTo(pBot.x, pBot.y);
        ctx.lineTo(pTop.x, pTop.y);
        ctx.stroke();
        ctx.restore();
      }
      lines = [
        { text: 'DOUBLY RULED HYPERBOLOID OF ONE SHEET', color: pal.amber },
        { text: `Equation: (x² + y²)/${(a * a).toFixed(2)} − z² = 1`, color: pal.ink },
        { text: `Gorge Circle Radius a = ${a.toFixed(2)} at z = 0`, color: pal.teal },
        { text: `Generated by 2 families of straight lines in R³`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Waist Radius a', val: a.toFixed(2) },
        { key: 'Ruling Twist', val: `${Math.round((twist * 180) / Math.PI)}°` },
        { key: 'Waist Area πa²', val: (Math.PI * a * a).toFixed(2) },
        { key: 'Surface Rulings', val: '2 Straight Families' },
      ];
      tableRows = [-1.2, -0.6, 0.0, 0.6, 1.2].map((z) => {
        const r = a * Math.sqrt(1 + z * z);
        return [`z = ${z.toFixed(1)}`, `r(z) = ${r.toFixed(3)}`, `Area = ${(Math.PI * r * r).toFixed(3)}`, 'Circular Trace'];
      });
    }
    // ── 104: Hyperboloid of Two Sheets ──
    else if (sub === 'hyperboloid_two_sheets_3d') {
      const c = Number(params.gapC ?? 0.65);
      const a = Number(params.spreadA ?? 0.9);
      for (const sign of [-1, 1]) {
        this.draw3DSurfaceQuads(
          ctx,
          pal,
          project,
          scale,
          (u, th) => ({
            x: a * Math.sinh(u) * Math.cos(th),
            y: a * Math.sinh(u) * Math.sin(th),
            z: sign * c * Math.cosh(u),
          }),
          0,
          1.05,
          0,
          Math.PI * 2,
          10,
          20,
          { strokeColor: sign > 0 ? pal.indigo : pal.amber }
        );
      }
      const vTop = project(0, 0, c);
      const vBot = project(0, 0, -c);
      this.drawDot(ctx, vTop.x, vTop.y, 7 * scale, pal.indigo, pal.bg);
      this.drawDot(ctx, vBot.x, vBot.y, 7 * scale, pal.amber, pal.bg);
      lines = [
        { text: 'HYPERBOLOID OF TWO SHEETS (z²/c² − r²/a² = 1)', color: pal.amber },
        { text: `Vertices at (0, 0, ±${c.toFixed(2)})  ·  Forbidden Gap 2c = ${(2 * c).toFixed(2)}`, color: pal.ink },
        { text: `Upper Sheet z ≥ +${c.toFixed(2)}  |  Lower Sheet z ≤ −${c.toFixed(2)}`, color: pal.teal },
        { text: `Asymptotic Cone Slope = c/a = ${(c / a).toFixed(3)}`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Vertex Height ±c', val: `±${c.toFixed(2)}` },
        { key: 'Forbidden Gap 2c', val: (2 * c).toFixed(2) },
        { key: 'Cone Spread a', val: a.toFixed(2) },
        { key: 'Connected Sheets', val: '2 (|z| ≥ c)' },
      ];
      tableRows = [1.0, 1.2, 1.4, 1.6, 1.8].map((zf) => {
        const z = c * zf;
        const r = a * Math.sqrt(zf * zf - 1);
        return [`|z| = ${z.toFixed(2)}`, `r = ${r.toFixed(3)}`, `±${z.toFixed(2)}`, (Math.PI * r * r).toFixed(3)];
      });
    }
    // ── 105: Triaxial Ellipsoid ──
    else if (sub === 'ellipsoid_3d') {
      const a = Number(params.axisA ?? 1.5);
      const b = Number(params.axisB ?? 1.1);
      const c = Number(params.axisC ?? 0.85);
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (phi, th) => ({
          x: a * Math.sin(phi) * Math.cos(th),
          y: b * Math.sin(phi) * Math.sin(th),
          z: c * Math.cos(phi),
        }),
        0,
        Math.PI,
        0,
        Math.PI * 2,
        14,
        24
      );
      const vol = (4 / 3) * Math.PI * a * b * c;
      lines = [
        { text: '3D TRIAXIAL ELLIPSOID ((x/a)² + (y/b)² + (z/c)² = 1)', color: pal.amber },
        { text: `Principal Semi-Axes: a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}`, color: pal.ink },
        { text: `Volume V = (4/3)πabc = ${vol.toFixed(3)}`, color: pal.teal },
        { text: `Jacobian Scaling Factor det(diag(a,b,c)) = ${(a * b * c).toFixed(3)}`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Semi-Axes (a,b,c)', val: `${a.toFixed(1)},${b.toFixed(1)},${c.toFixed(1)}` },
        { key: 'Volume 4/3πabc', val: vol.toFixed(2) },
        { key: 'XY Trace Area', val: (Math.PI * a * b).toFixed(2) },
        { key: 'Jacobian abc', val: (a * b * c).toFixed(2) },
      ];
      tableRows = [
        ['XY-Equatorial Trace (z=0)', `a = ${a.toFixed(2)}`, `b = ${b.toFixed(2)}`, `Area = ${(Math.PI * a * b).toFixed(3)}`],
        ['XZ-Meridional Trace (y=0)', `a = ${a.toFixed(2)}`, `c = ${c.toFixed(2)}`, `Area = ${(Math.PI * a * c).toFixed(3)}`],
        ['YZ-Meridional Trace (x=0)', `b = ${b.toFixed(2)}`, `c = ${c.toFixed(2)}`, `Area = ${(Math.PI * b * c).toFixed(3)}`],
        ['3D Enclosed Volume', `4/3 π`, `abc = ${(a * b * c).toFixed(3)}`, `V = ${vol.toFixed(3)}`],
      ];
    }
    // ── 106: Double Cone & Conic Section Slicing Plane ──
    else if (sub === 'cone_dandelin_3d') {
      const m = Number(params.planeSlope ?? 0.55);
      const h0 = Number(params.planeHeight ?? 0.9);
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (z, th) => ({ x: Math.abs(z) * Math.cos(th), y: Math.abs(z) * Math.sin(th), z }),
        -1.35,
        1.35,
        0,
        Math.PI * 2,
        14,
        24
      );
      // Draw intersection conic curve z = r(th) where r(1 - m cos th) = h0
      this.draw3DCurve(
        ctx,
        project,
        scale,
        (th) => {
          const denom = 1 - m * Math.cos(th);
          if (Math.abs(denom) < 0.18) return null;
          const r = Math.max(-1.45, Math.min(1.45, h0 / denom));
          if (r < 0 && m < 1) return null;
          return { x: Math.abs(r) * Math.cos(th), y: Math.abs(r) * Math.sin(th), z: r };
        },
        0,
        Math.PI * 2,
        120,
        pal.amber,
        4.2
      );
      const conicType = Math.abs(m - 1) < 0.06 ? 'Parabola (e = 1)' : m < 1 ? 'Ellipse (e < 1)' : 'Hyperbola (e > 1)';
      lines = [
        { text: '3D DOUBLE CONE & CONIC SECTION PLANE', color: pal.amber },
        { text: `Cutting Plane: z = ${m.toFixed(2)}x + ${h0.toFixed(2)}`, color: pal.ink },
        { text: `Eccentricity e = |m| = ${m.toFixed(2)}  →  ${conicType}`, color: pal.teal },
        { text: `Polar Trace r(θ) = h₀ / (1 − e cos θ)`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Plane Slope m', val: m.toFixed(2) },
        { key: 'Eccentricity e', val: m.toFixed(2) },
        { key: 'Conic Section', val: conicType.split(' ')[0] },
        { key: 'Offset h₀', val: h0.toFixed(2) },
      ];
      tableRows = [0.0, 0.5, 1.0, 1.3].map((sl) => [
        `Slope m = ${sl.toFixed(1)}`,
        `e = ${sl.toFixed(1)}`,
        sl === 0 ? 'Circle' : sl < 1 ? 'Ellipse' : sl === 1 ? 'Parabola' : 'Hyperbola',
        `z = ${sl.toFixed(1)}x + ${h0.toFixed(2)}`,
      ]);
    }
    // ── 107: Monkey Saddle ──
    else if (sub === 'monkey_saddle_3d') {
      const amp = Number(params.amp ?? 0.45);
      const rp = Number(params.rProbe ?? 1.15);
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (r, th) => ({
          x: r * Math.cos(th),
          y: r * Math.sin(th),
          z: amp * Math.pow(r, 3) * Math.cos(3 * th),
        }),
        0,
        1.35,
        0,
        Math.PI * 2,
        12,
        30
      );
      this.draw3DCurve(
        ctx,
        project,
        scale,
        (th) => ({
          x: rp * Math.cos(th),
          y: rp * Math.sin(th),
          z: amp * Math.pow(rp, 3) * Math.cos(3 * th),
        }),
        0,
        Math.PI * 2,
        90,
        pal.amber,
        3.8
      );
      lines = [
        { text: '3D MONKEY SADDLE (z = x³ − 3xy² = r³ cos 3θ)', color: pal.amber },
        { text: `Three Valleys (θ = 60°, 180°, 300°) & Three Ridges`, color: pal.ink },
        { text: `At (0,0): ∇z = 0 and Hessian H = 0 (Degenerate)`, color: pal.teal },
        { text: `Ring r = ${rp.toFixed(2)} Amplitude = ±${(amp * Math.pow(rp, 3)).toFixed(3)}`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Symmetry Fold', val: '3 Ridges / 3 Valleys' },
        { key: 'Ring Radius r', val: rp.toFixed(2) },
        { key: 'Max Height ±z', val: (amp * Math.pow(rp, 3)).toFixed(3) },
        { key: 'Hessian det(H)', val: '0 (Degenerate)' },
      ];
      tableRows = [0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const z = amp * Math.pow(rp, 3) * Math.cos(3 * rad);
        return [`θ = ${deg}°`, (rp * Math.cos(rad)).toFixed(2), (rp * Math.sin(rad)).toFixed(2), `${z >= 0 ? 'Ridge +' : 'Valley '}${z.toFixed(3)}`];
      });
    }
    // ── 108: Radial Sinc Wave ──
    else if (sub === 'ripple_sinc_3d') {
      const k = Number(params.waveK ?? 4.2);
      const damp = Number(params.damp ?? 0.15);
      const sincZ = (r) => {
        const kr = k * r;
        const s = kr < 1e-4 ? 1.0 : Math.sin(kr) / kr;
        return 1.35 * s * Math.exp(-damp * r);
      };
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (r, th) => ({ x: r * Math.cos(th), y: r * Math.sin(th), z: sincZ(r) }),
        0,
        1.5,
        0,
        Math.PI * 2,
        18,
        28
      );
      const rZero1 = Math.PI / k;
      this.draw3DCurve(
        ctx,
        project,
        scale,
        (th) => ({ x: rZero1 * Math.cos(th), y: rZero1 * Math.sin(th), z: 0 }),
        0,
        Math.PI * 2,
        70,
        pal.amber,
        3.5
      );
      lines = [
        { text: '3D RADIAL SINC INTERFERENCE (sin(kr) / kr)', color: pal.amber },
        { text: `Removable Limit at Origin: lim_{r→0} sin(kr)/(kr) = 1.000`, color: pal.ink },
        { text: `First Nodal Ring (z = 0) at r₁ = π/k = ${rZero1.toFixed(3)}`, color: pal.teal },
        { text: `Radial Wavenumber k = ${k.toFixed(2)}  ·  Damping = ${damp.toFixed(2)}`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Limit at (0,0)', val: '1.000 (Peak)' },
        { key: 'Wavenumber k', val: k.toFixed(2) },
        { key: '1st Nodal Ring r₁', val: rZero1.toFixed(3) },
        { key: '2nd Nodal Ring r₂', val: ((2 * Math.PI) / k).toFixed(3) },
      ];
      tableRows = [0.0, 0.3, 0.6, 0.9, 1.2, 1.5].map((r) => [
        `r = ${r.toFixed(2)}`,
        `kr = ${(k * r).toFixed(2)}`,
        (r < 1e-4 ? 1 : Math.sin(k * r) / (k * r)).toFixed(4),
        sincZ(r).toFixed(4),
      ]);
    }
    // ── 109: Bivariate Normal 3D Bell ──
    else if (sub === 'gaussian_bell_3d') {
      const rho = Number(params.rho ?? 0.45);
      const sr = Number(params.sigmaRatio ?? 1.1);
      const pdf = (x, y) => {
        const u = x / sr;
        const v = y;
        const q = (u * u - 2 * rho * u * v + v * v) / (2 * (1 - rho * rho));
        return 1.55 * Math.exp(-q) - 0.5;
      };
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (x, y) => ({ x, y, z: pdf(x, y) }),
        -1.45,
        1.45,
        -1.45,
        1.45,
        18,
        18
      );
      // 1-sigma Mahalanobis ellipse on floor
      this.draw3DCurve(
        ctx,
        project,
        scale,
        (t) => {
          const u = Math.cos(t);
          const v = rho * Math.cos(t) + Math.sqrt(1 - rho * rho) * Math.sin(t);
          return { x: sr * u, y: v, z: zFloor };
        },
        0,
        Math.PI * 2,
        80,
        pal.amber,
        3.5
      );
      lines = [
        { text: '3D BIVARIATE NORMAL DENSITY & COVARIANCE', color: pal.amber },
        { text: `Correlation ρ = ${rho.toFixed(2)}  ·  Spread σ_x/σ_y = ${sr.toFixed(2)}`, color: pal.ink },
        { text: `Covariance det |Σ| = σ_x²σ_y²(1 − ρ²) = ${(sr * sr * (1 - rho * rho)).toFixed(3)}`, color: pal.teal },
        { text: `Amber Floor Contour: 1σ Mahalanobis Ellipse`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Correlation ρ', val: rho.toFixed(2) },
        { key: 'det(Σ)', val: (sr * sr * (1 - rho * rho)).toFixed(3) },
        { key: 'Peak Density', val: (1 / (2 * Math.PI * sr * Math.sqrt(1 - rho * rho))).toFixed(3) },
        { key: 'Total Volume', val: '1.0000' },
      ];
      tableRows = [-0.6, -0.3, 0.0, 0.3, 0.6].map((r) => [
        `ρ = ${r.toFixed(1)}`,
        `det(Σ) = ${(sr * sr * (1 - r * r)).toFixed(3)}`,
        (1 / (2 * Math.PI * sr * Math.sqrt(1 - r * r))).toFixed(4),
        '∬ f(x,y)dxdy = 1',
      ]);
    }
    // ── 110: Helicoid to Catenoid Minimal Surface Morph ──
    else if (sub === 'helicoid_catenoid_3d') {
      const alpha = Number(params.morphAlpha ?? 0.45) * (Math.PI / 2);
      const c = Number(params.pitch ?? 0.75);
      const cosA = Math.cos(alpha);
      const sinA = Math.sin(alpha);
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (u, v) => ({
          x: c * (cosA * Math.cosh(v) * Math.cos(u) + sinA * Math.sinh(v) * Math.sin(u)),
          y: c * (cosA * Math.cosh(v) * Math.sin(u) - sinA * Math.sinh(v) * Math.cos(u)),
          z: c * (cosA * v + sinA * u * 0.45),
        }),
        -Math.PI,
        Math.PI,
        -1.05,
        1.05,
        22,
        12
      );
      lines = [
        { text: '3D MINIMAL SURFACE ISOMETRIC MORPH (H = 0)', color: pal.amber },
        { text: `Associate Angle α = ${Math.round((alpha * 180) / Math.PI)}° (0°=Catenoid, 90°=Helicoid)`, color: pal.ink },
        { text: `Mean Curvature H = ½(κ₁ + κ₂) = 0.000 everywhere`, color: pal.teal },
        { text: `First Fundamental Form ds² = c² cosh²(v)(du² + dv²)`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Morph Angle α', val: `${Math.round((alpha * 180) / Math.PI)}°` },
        { key: 'Mean Curvature H', val: '0.000 (Minimal)' },
        { key: 'Gaussian K(u,0)', val: (-1 / (c * c)).toFixed(3) },
        { key: 'Isometry', val: 'Exact Arc Length' },
      ];
      tableRows = [0, 22.5, 45, 67.5, 90].map((deg) => [
        `α = ${deg}°`,
        deg === 0 ? 'Catenoid' : deg === 90 ? 'Helicoid' : 'Associate Minimal',
        'H = 0.000',
        `K(0) = ${(-1 / (c * c)).toFixed(3)}`,
      ]);
    }
    // ── 111–115: Tangent Plane, Partials, Directional Derivative, Gradient Ascent, Hessian ──
    else if (
      sub === 'tangent_plane_3d' ||
      sub === 'partial_derivatives_3d' ||
      sub === 'directional_derivative_3d' ||
      sub === 'gradient_ascent_3d' ||
      sub === 'hessian_classification_3d'
    ) {
      const fxx = Number(params.fxx ?? -0.75);
      const fyy = Number(params.fyy ?? -0.75);
      const surfZ = (x, y) =>
        sub === 'hessian_classification_3d'
          ? 0.45 * (fxx * x * x + fyy * y * y)
          : 1.05 - 0.52 * (x * x + y * y);
      const fxFn = (x) => (sub === 'hessian_classification_3d' ? 0.9 * fxx * x : -1.04 * x);
      const fyFn = (y) => (sub === 'hessian_classification_3d' ? 0.9 * fyy * y : -1.04 * y);

      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (x, y) => ({ x, y, z: surfZ(x, y) }),
        -1.35,
        1.35,
        -1.35,
        1.35,
        16,
        16
      );

      const x0 = Number(params.x0 ?? 0.65);
      const y0 = Number(params.y0 ?? 0.55);
      const z0 = surfZ(x0, y0);
      const fx = fxFn(x0);
      const fy = fyFn(y0);
      const pPt = project(x0, y0, z0);

      if (sub === 'tangent_plane_3d') {
        // Draw local tangent patch & normal vector
        this.draw3DSurfaceQuads(
          ctx,
          pal,
          project,
          scale,
          (dx, dy) => ({
            x: x0 + dx,
            y: y0 + dy,
            z: z0 + fx * dx + fy * dy,
          }),
          -0.55,
          0.55,
          -0.55,
          0.55,
          4,
          4,
          { fillColor: pal.amberFill, strokeColor: pal.amber, lineWidth: 1.8 }
        );
        const pNorm = project(x0 - fx * 0.55, y0 - fy * 0.55, z0 + 0.55);
        this.drawArrow(ctx, pPt.x, pPt.y, pNorm.x, pNorm.y, pal.teal, 3.2 * scale);
        this.drawDot(ctx, pPt.x, pPt.y, 7.5 * scale, pal.amber, pal.bg);
        lines = [
          { text: '3D TANGENT PLANE & NORMAL VECTOR', color: pal.amber },
          { text: `Point P(${x0.toFixed(2)}, ${y0.toFixed(2)}, ${z0.toFixed(2)})`, color: pal.ink },
          { text: `Partials: f_x = ${fx.toFixed(2)},  f_y = ${fy.toFixed(2)}`, color: pal.teal },
          { text: `Normal Vector n = ⟨${(-fx).toFixed(2)}, ${(-fy).toFixed(2)}, 1.00⟩`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Point (x₀, y₀)', val: `${x0.toFixed(2)}, ${y0.toFixed(2)}` },
          { key: 'Slope f_x', val: fx.toFixed(3) },
          { key: 'Slope f_y', val: fy.toFixed(3) },
          { key: 'Normal ‖n‖', val: Math.hypot(fx, fy, 1).toFixed(3) },
        ];
      } else if (sub === 'partial_derivatives_3d') {
        // Draw slicing curves y = y0 (Amber) and x = x0 (Teal) + tangent arrows
        this.draw3DCurve(ctx, project, scale, (x) => ({ x, y: y0, z: surfZ(x, y0) }), -1.35, 1.35, 60, pal.amber, 4.0);
        this.draw3DCurve(ctx, project, scale, (y) => ({ x: x0, y, z: surfZ(x0, y) }), -1.35, 1.35, 60, pal.teal, 4.0);
        const pxTan = project(x0 + 0.55, y0, z0 + fx * 0.55);
        const pyTan = project(x0, y0 + 0.55, z0 + fy * 0.55);
        this.drawArrow(ctx, pPt.x, pPt.y, pxTan.x, pxTan.y, pal.amber, 3.2 * scale);
        this.drawArrow(ctx, pPt.x, pPt.y, pyTan.x, pyTan.y, pal.teal, 3.2 * scale);
        this.drawDot(ctx, pPt.x, pPt.y, 7.5 * scale, pal.ink, pal.bg);
        lines = [
          { text: 'PARTIAL DERIVATIVES f_x AND f_y SLICES', color: pal.amber },
          { text: `Slice y = ${y0.toFixed(2)} (Amber): ∂f/∂x = ${fx.toFixed(3)}`, color: pal.amber },
          { text: `Slice x = ${x0.toFixed(2)} (Teal):  ∂f/∂y = ${fy.toFixed(3)}`, color: pal.teal },
          { text: `Gradient Vector ∇f = ⟨${fx.toFixed(2)}, ${fy.toFixed(2)}⟩`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Slice ∂f/∂x', val: fx.toFixed(3) },
          { key: 'Slice ∂f/∂y', val: fy.toFixed(3) },
          { key: 'Altitude f(x₀,y₀)', val: z0.toFixed(3) },
          { key: '‖∇f‖', val: Math.hypot(fx, fy).toFixed(3) },
        ];
      } else if (sub === 'directional_derivative_3d') {
        const dirRad = (Number(params.dirDeg ?? 35) * Math.PI) / 180;
        const ux = Math.cos(dirRad);
        const uy = Math.sin(dirRad);
        const duf = fx * ux + fy * uy;
        const pDir = project(x0 + 0.65 * ux, y0 + 0.65 * uy, z0 + 0.65 * duf);
        this.drawArrow(ctx, pPt.x, pPt.y, pDir.x, pDir.y, pal.amber, 3.5 * scale);
        this.drawDot(ctx, pPt.x, pPt.y, 7.5 * scale, pal.teal, pal.bg);
        lines = [
          { text: '3D DIRECTIONAL DERIVATIVE D_u f = ∇f · u', color: pal.amber },
          { text: `Unit Direction u = ⟨${ux.toFixed(2)}, ${uy.toFixed(2)}⟩ (${Math.round(Number(params.dirDeg ?? 35))}°)`, color: pal.ink },
          { text: `Directional Slope D_u f = ${duf.toFixed(3)}`, color: pal.teal },
          { text: `Max Steepest Ascent ‖∇f‖ = ${Math.hypot(fx, fy).toFixed(3)}`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Direction α', val: `${Math.round(Number(params.dirDeg ?? 35))}°` },
          { key: 'D_u f', val: duf.toFixed(3) },
          { key: 'Max ‖∇f‖', val: Math.hypot(fx, fy).toFixed(3) },
          { key: 'Min −‖∇f‖', val: (-Math.hypot(fx, fy)).toFixed(3) },
        ];
      } else if (sub === 'gradient_ascent_3d') {
        const sRad = (Number(params.startDeg ?? 215) * Math.PI) / 180;
        const lr = Number(params.lr ?? 0.25);
        let cx = 1.25 * Math.cos(sRad);
        let cy = 1.25 * Math.sin(sRad);
        for (let k = 0; k < 8; k++) {
          const nx = cx * (1 - lr * 1.04);
          const ny = cy * (1 - lr * 1.04);
          const p0 = project(cx, cy, surfZ(cx, cy));
          const p1 = project(nx, ny, surfZ(nx, ny));
          this.drawArrow(ctx, p0.x, p0.y, p1.x, p1.y, pal.amber, 2.8 * scale);
          const f0 = project(cx, cy, zFloor);
          const f1 = project(nx, ny, zFloor);
          this.drawArrow(ctx, f0.x, f0.y, f1.x, f1.y, pal.teal, 2.2 * scale);
          cx = nx;
          cy = ny;
        }
        lines = [
          { text: '3D GRADIENT ASCENT & ORTHOGONAL CONTOURS', color: pal.amber },
          { text: `Update Rule: x_{t+1} = x_t + η ∇f(x_t)  (η = ${lr.toFixed(2)})`, color: pal.ink },
          { text: `Floor Trajectory Crosses Contours at 90°`, color: pal.teal },
          { text: `Converges to Summit (0, 0, 1.05)`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Step Rate η', val: lr.toFixed(2) },
          { key: 'Start Angle', val: `${Math.round(Number(params.startDeg ?? 215))}°` },
          { key: 'Final Altitude', val: surfZ(cx, cy).toFixed(3) },
          { key: 'Contour Angle', val: '90.0° (⊥)' },
        ];
      } else {
        const detH = fxx * fyy;
        const kind = detH > 0 ? (fxx > 0 ? 'Local Minimum Bowl' : 'Local Maximum Dome') : detH < 0 ? 'Saddle Point' : 'Degenerate Cylinder';
        lines = [
          { text: '3D HESSIAN SECOND DERIVATIVE TEST', color: pal.amber },
          { text: `f_xx = ${fxx.toFixed(2)},  f_yy = ${fyy.toFixed(2)},  f_xy = 0.00`, color: pal.ink },
          { text: `Discriminant D = det(H) = ${detH.toFixed(3)}`, color: pal.teal },
          { text: `Classification: ${kind}`, color: pal.indigo },
        ];
        readouts = [
          { key: 'f_xx', val: fxx.toFixed(2) },
          { key: 'f_yy', val: fyy.toFixed(2) },
          { key: 'Hessian D', val: detH.toFixed(2) },
          { key: 'Critical Type', val: kind.split(' ')[1] || kind },
        ];
      }
      tableRows = [-1.0, -0.5, 0.0, 0.5, 1.0].map((u) => [
        `x = ${u.toFixed(1)}`,
        `f_x = ${fxFn(u).toFixed(3)}`,
        `f_y = ${fyFn(u).toFixed(3)}`,
        `z = ${surfZ(u, u).toFixed(3)}`,
      ]);
    }
    // ── 116–120: Lagrange 3D, Taylor 2D, Envelope, Implicit Level, Chain Rule Path ──
    else if (
      sub === 'lagrange_3d' ||
      sub === 'taylor_2d_surface_3d' ||
      sub === 'envelope_planes_3d' ||
      sub === 'implicit_surface_level_3d' ||
      sub === 'chain_rule_path_3d'
    ) {
      const rVal = Number(params.cylR ?? params.probeR ?? params.radius ?? params.levelC ?? 1.05);
      const tilt = Number(params.tilt ?? params.freq ?? params.aniso ?? 0.75);
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (x, y) => ({ x, y, z: 0.45 * (x * x - y * y) + 0.45 * tilt * x }),
        -1.3,
        1.3,
        -1.3,
        1.3,
        15,
        15
      );
      this.draw3DCurve(
        ctx,
        project,
        scale,
        (t) => {
          const x = rVal * Math.cos(t);
          const y = rVal * Math.sin(t);
          return { x, y, z: 0.45 * (x * x - y * y) + 0.45 * tilt * x };
        },
        0,
        Math.PI * 2,
        90,
        pal.amber,
        4.2
      );
      const zMax = 0.45 * rVal * rVal + 0.45 * tilt * rVal;
      const zMin = -0.45 * rVal * rVal - 0.45 * tilt * rVal;
      const pMax = project(rVal, 0, zMax);
      this.drawDot(ctx, pMax.x, pMax.y, 8 * scale, pal.amber, pal.bg);
      lines = [
        { text: preset.name.toUpperCase(), color: pal.amber },
        { text: `Characteristic Radius / Level = ${rVal.toFixed(2)}`, color: pal.ink },
        { text: `Maximum on 3D Curve z_max = +${zMax.toFixed(3)}`, color: pal.teal },
        { text: `Gradient Alignment: ∇f = λ ∇g at Extrema`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Radius / Level', val: rVal.toFixed(2) },
        { key: 'Scale / Tilt', val: tilt.toFixed(2) },
        { key: 'Peak z_max', val: zMax.toFixed(3) },
        { key: 'Min z_min', val: zMin.toFixed(3) },
      ];
      tableRows = [0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = rVal * Math.cos(rad);
        const y = rVal * Math.sin(rad);
        const z = 0.45 * (x * x - y * y) + 0.45 * tilt * x;
        return [`θ = ${deg}°`, x.toFixed(3), y.toFixed(3), z.toFixed(3)];
      });
    }
    // ── 121: Double Integral 3D Riemann Columns ──
    else if (sub === 'double_integral_columns_3d') {
      const N = Math.max(2, Math.min(8, Math.round(Number(params.gridN ?? 5))));
      const hPeak = Number(params.domeH ?? 1.6);
      const a = 1.25;
      const dx = (2 * a) / N;
      let sumVol = 0;
      const cols = [];
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const x0 = -a + i * dx;
          const y0 = -a + j * dx;
          const xm = x0 + 0.5 * dx;
          const ym = y0 + 0.5 * dx;
          const h = Math.max(0.1, hPeak * (1 - 0.28 * (xm * xm + ym * ym)));
          sumVol += h * dx * dx;
          const pCenter = project(xm, ym, zFloor + 0.5 * h);
          cols.push({ x0, y0, dx, h, depth: pCenter.depth });
        }
      }
      cols.sort((c1, c2) => c1.depth - c2.depth);
      for (const c of cols) {
        const zTop = zFloor + c.h;
        const topPts = [
          project(c.x0, c.y0, zTop),
          project(c.x0 + c.dx, c.y0, zTop),
          project(c.x0 + c.dx, c.y0 + c.dx, zTop),
          project(c.x0, c.y0 + c.dx, zTop),
        ];
        const botPts = [
          project(c.x0, c.y0, zFloor),
          project(c.x0 + c.dx, c.y0, zFloor),
          project(c.x0 + c.dx, c.y0 + c.dx, zFloor),
          project(c.x0, c.y0 + c.dx, zFloor),
        ];
        ctx.save();
        // Vertical walls
        ctx.fillStyle = pal.indigoFill;
        ctx.strokeStyle = pal.indigo;
        ctx.lineWidth = 1.2 * scale;
        for (let k = 0; k < 4; k++) {
          const nk = (k + 1) % 4;
          ctx.beginPath();
          ctx.moveTo(botPts[k].x, botPts[k].y);
          ctx.lineTo(botPts[nk].x, botPts[nk].y);
          ctx.lineTo(topPts[nk].x, topPts[nk].y);
          ctx.lineTo(topPts[k].x, topPts[k].y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        // Top cap in Amber
        ctx.fillStyle = pal.amberFill;
        ctx.strokeStyle = pal.amber;
        ctx.beginPath();
        ctx.moveTo(topPts[0].x, topPts[0].y);
        ctx.lineTo(topPts[1].x, topPts[1].y);
        ctx.lineTo(topPts[2].x, topPts[2].y);
        ctx.lineTo(topPts[3].x, topPts[3].y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      const exactVol = 4 * a * a * hPeak * (1 - (0.28 * 2 * a * a) / 3);
      lines = [
        { text: `3D DOUBLE INTEGRAL COLUMNS (${N}×${N} = ${N * N} PRISMS)`, color: pal.amber },
        { text: `Sub-rectangle ΔA = Δx·Δy = ${(dx * dx).toFixed(3)}`, color: pal.ink },
        { text: `Riemann Volume Sum ≈ ${sumVol.toFixed(4)}`, color: pal.amber },
        { text: `Exact ∬_R f(x,y) dA = ${exactVol.toFixed(4)}`, color: pal.teal },
      ];
      readouts = [
        { key: '3D Columns N²', val: `${N}×${N} (${N * N})` },
        { key: 'Riemann Sum', val: sumVol.toFixed(3) },
        { key: 'Exact Volume', val: exactVol.toFixed(3) },
        { key: 'Abs Error', val: Math.abs(exactVol - sumVol).toFixed(4) },
      ];
      tableRows = [2, 4, 6, 8].map((n) => [
        `${n}×${n} Grid`,
        `${n * n} Columns`,
        `ΔA = ${(((2 * a) / n) ** 2).toFixed(3)}`,
        `V ≈ ${exactVol.toFixed(3)}`,
      ]);
    }
    // ── 122–128: Fubini, Cylindrical, Spherical, Washer/Shell, Pappus Torus, Cavalieri, Tetrahedron ──
    else if (
      sub === 'fubini_iterated_slices_3d' ||
      sub === 'cylindrical_coords_3d' ||
      sub === 'spherical_coords_3d' ||
      sub === 'washer_shell_3d' ||
      sub === 'pappus_centroid_torus_3d' ||
      sub === 'cavalieri_3d_solids_3d' ||
      sub === 'triple_integral_tetrahedron_3d'
    ) {
      if (sub === 'pappus_centroid_torus_3d') {
        const R = Number(params.majorR ?? 1.15);
        const r = Number(params.minorR ?? 0.42);
        this.draw3DSurfaceQuads(
          ctx,
          pal,
          project,
          scale,
          (u, v) => ({
            x: (R + r * Math.cos(v)) * Math.cos(u),
            y: (R + r * Math.cos(v)) * Math.sin(u),
            z: r * Math.sin(v),
          }),
          0,
          Math.PI * 2,
          0,
          Math.PI * 2,
          24,
          14
        );
        this.draw3DCurve(ctx, project, scale, (u) => ({ x: R * Math.cos(u), y: R * Math.sin(u), z: 0 }), 0, Math.PI * 2, 80, pal.amber, 3.8);
        const vol = 2 * Math.PI * Math.PI * R * r * r;
        const area = 4 * Math.PI * Math.PI * R * r;
        lines = [
          { text: "PAPPUS'S CENTROID THEOREM & 3D TORUS", color: pal.amber },
          { text: `Centroid Path Length L = 2πR = ${(2 * Math.PI * R).toFixed(3)}`, color: pal.ink },
          { text: `Volume V = (πr²)(2πR) = 2π²Rr² = ${vol.toFixed(3)}`, color: pal.teal },
          { text: `Surface Area S = (2πr)(2πR) = 4π²Rr = ${area.toFixed(3)}`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Major Radius R', val: R.toFixed(2) },
          { key: 'Tube Radius r', val: r.toFixed(2) },
          { key: 'Volume 2π²Rr²', val: vol.toFixed(3) },
          { key: 'Surface 4π²Rr', val: area.toFixed(3) },
        ];
      } else if (sub === 'triple_integral_tetrahedron_3d') {
        const a = Number(params.intA ?? 1.5);
        const b = Number(params.intB ?? 1.4);
        const c = Number(params.intC ?? 1.5);
        const vO = project(0, 0, 0);
        const vA = project(a, 0, 0);
        const vB = project(0, b, 0);
        const vC = project(0, 0, c);
        ctx.save();
        ctx.fillStyle = pal.amberFill;
        ctx.strokeStyle = pal.amber;
        ctx.lineWidth = 3 * scale;
        ctx.beginPath();
        ctx.moveTo(vA.x, vA.y);
        ctx.lineTo(vB.x, vB.y);
        ctx.lineTo(vC.x, vC.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        for (const v of [vA, vB, vC]) {
          this.drawArrow(ctx, vO.x, vO.y, v.x, v.y, pal.teal, 2.5 * scale);
          this.drawDot(ctx, v.x, v.y, 7 * scale, pal.amber, pal.bg);
        }
        const vol = (a * b * c) / 6;
        lines = [
          { text: '3D TRIPLE INTEGRAL SIMPLEX TETRAHEDRON', color: pal.amber },
          { text: `Plane: x/${a.toFixed(2)} + y/${b.toFixed(2)} + z/${c.toFixed(2)} = 1`, color: pal.ink },
          { text: `Base Triangle Area = ½ab = ${(0.5 * a * b).toFixed(3)}`, color: pal.teal },
          { text: `Exact Volume V = ⅙ abc = ${vol.toFixed(4)}`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Intercepts (a,b,c)', val: `${a.toFixed(1)},${b.toFixed(1)},${c.toFixed(1)}` },
          { key: 'Base Area ½ab', val: (0.5 * a * b).toFixed(3) },
          { key: 'Volume ⅙abc', val: vol.toFixed(3) },
          { key: 'Centroid (a/4..)', val: `${(a / 4).toFixed(2)},${(b / 4).toFixed(2)},${(c / 4).toFixed(2)}` },
        ];
      } else {
        const r = Number(params.rVal ?? params.rhoVal ?? params.xSlice ?? params.radiusR ?? 1.15);
        this.draw3DSurfaceQuads(
          ctx,
          pal,
          project,
          scale,
          (u, v) => ({
            x: r * Math.sin(u) * Math.cos(v),
            y: r * Math.sin(u) * Math.sin(v),
            z: r * Math.cos(u),
          }),
          0,
          Math.PI * 0.75,
          0,
          Math.PI * 2 * Math.max(0.35, Number(params.sweepFrac ?? 1)),
          12,
          22
        );
        const hSlice = Number(params.zVal ?? params.sliceZ ?? 0.55);
        const rRing = Math.sqrt(Math.max(0.05, r * r - hSlice * hSlice));
        this.draw3DCurve(
          ctx,
          project,
          scale,
          (th) => ({ x: rRing * Math.cos(th), y: rRing * Math.sin(th), z: hSlice }),
          0,
          Math.PI * 2,
          80,
          pal.amber,
          4.0
        );
        const vol = (4 / 3) * Math.PI * Math.pow(r, 3);
        lines = [
          { text: preset.name.toUpperCase(), color: pal.amber },
          { text: `Characteristic Radius R = ${r.toFixed(2)}  ·  Slice z = ${hSlice.toFixed(2)}`, color: pal.ink },
          { text: `Cross-Section Ring Radius r(z) = ${rRing.toFixed(3)}`, color: pal.teal },
          { text: `3D Volume Integral V = ${vol.toFixed(3)}`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Radius R', val: r.toFixed(2) },
          { key: 'Slice Height z', val: hSlice.toFixed(2) },
          { key: 'Slice Area πr²', val: (Math.PI * rRing * rRing).toFixed(3) },
          { key: 'Total Volume', val: vol.toFixed(3) },
        ];
      }
      tableRows = [0.2, 0.4, 0.6, 0.8, 1.0].map((f) => [
        `Slice ${Math.round(f * 100)}%`,
        (f * 1.2).toFixed(3),
        (Math.PI * f * f).toFixed(3),
        ((4 / 3) * Math.PI * Math.pow(f, 3)).toFixed(3),
      ]);
    }
    // ── 129–133 & 148: 3D Space Curves (Helix, Viviani, Trefoil Knot, Möbius, Villarceau, Cyclotron) ──
    else if (
      sub === 'frenet_serret_helix_3d' ||
      sub === 'viviani_curve_3d' ||
      sub === 'trefoil_knot_3d' ||
      sub === 'mobius_strip_3d' ||
      sub === 'torus_villarceau_3d' ||
      sub === 'magnetic_helix_3d'
    ) {
      if (sub === 'mobius_strip_3d') {
        const w = Number(params.widthW ?? 0.48);
        const kTw = Math.round(Number(params.twists ?? 1));
        this.draw3DSurfaceQuads(
          ctx,
          pal,
          project,
          scale,
          (u, v) => ({
            x: (1.1 + v * Math.cos((kTw * u) / 2)) * Math.cos(u),
            y: (1.1 + v * Math.cos((kTw * u) / 2)) * Math.sin(u),
            z: v * Math.sin((kTw * u) / 2),
          }),
          0,
          Math.PI * 2,
          -w,
          w,
          28,
          6
        );
        const uNow = prog * Math.PI * 2;
        const pC = project(1.1 * Math.cos(uNow), 1.1 * Math.sin(uNow), 0);
        const pN = project(
          1.1 * Math.cos(uNow) + 0.55 * Math.sin((kTw * uNow) / 2) * Math.cos(uNow),
          1.1 * Math.sin(uNow) + 0.55 * Math.sin((kTw * uNow) / 2) * Math.sin(uNow),
          0.55 * Math.cos((kTw * uNow) / 2)
        );
        this.drawArrow(ctx, pC.x, pC.y, pN.x, pN.y, pal.amber, 3.4 * scale);
        this.drawDot(ctx, pC.x, pC.y, 7 * scale, pal.amber, pal.bg);
        lines = [
          { text: '3D MÖBIUS STRIP & NORMAL HOLONOMY', color: pal.amber },
          { text: `Half-Twists k = ${kTw} (${kTw % 2 === 1 ? 'Non-Orientable One-Sided' : 'Orientable Two-Sided'})`, color: pal.ink },
          { text: `After 1 Full Loop (2π): n(2π) = ${kTw % 2 === 1 ? '−n(0) (Flipped!)' : '+n(0)'}`, color: pal.teal },
          { text: `Euler Characteristic χ = 0  ·  Boundary Components = ${kTw % 2 === 1 ? 1 : 2}`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Half-Twists k', val: String(kTw) },
          { key: 'Orientable?', val: kTw % 2 === 1 ? 'No (1-Sided)' : 'Yes (2-Sided)' },
          { key: 'Strip Width 2w', val: (2 * w).toFixed(2) },
          { key: 'Euler χ', val: '0' },
        ];
      } else {
        const R = Number(params.helixR ?? params.radiusA ?? params.majorR ?? 1.05);
        const c = Number(params.pitchC ?? params.driftVz ?? params.minorR ?? 0.35);
        const p = Math.round(Number(params.windP ?? 2));
        const q = Math.round(Number(params.windQ ?? 3));

        const curveFn = (t) => {
          if (sub === 'viviani_curve_3d') {
            return { x: R * (1 + Math.cos(t)), y: R * Math.sin(t), z: 2 * R * Math.sin(t / 2) - 0.6 };
          }
          if (sub === 'trefoil_knot_3d' || sub === 'torus_villarceau_3d') {
            const rad = 1.05 + 0.42 * Math.cos(q * t);
            return { x: rad * Math.cos(p * t), y: rad * Math.sin(p * t), z: 0.42 * Math.sin(q * t) };
          }
          return { x: R * Math.cos(t), y: R * Math.sin(t), z: c * (t - Math.PI) };
        };

        this.draw3DCurve(ctx, project, scale, curveFn, 0, Math.PI * 2, 160, pal.indigo, 4.2);
        const tNow = prog * Math.PI * 2;
        const pt = curveFn(tNow);
        const ptNext = curveFn(tNow + 0.05);
        const p0 = project(pt.x, pt.y, pt.z);
        const pT = project(pt.x + (ptNext.x - pt.x) * 10, pt.y + (ptNext.y - pt.y) * 10, pt.z + (ptNext.z - pt.z) * 10);
        const pN = project(pt.x * 0.45, pt.y * 0.45, pt.z);
        this.drawArrow(ctx, p0.x, p0.y, pT.x, pT.y, pal.amber, 3.2 * scale);
        this.drawArrow(ctx, p0.x, p0.y, pN.x, pN.y, pal.teal, 3.0 * scale);
        this.drawDot(ctx, p0.x, p0.y, 8 * scale, pal.amber, pal.bg);

        const kappa = R / (R * R + c * c);
        const tau = c / (R * R + c * c);
        lines = [
          { text: preset.name.toUpperCase(), color: pal.amber },
          { text: `Active Point r(t) = (${pt.x.toFixed(2)}, ${pt.y.toFixed(2)}, ${pt.z.toFixed(2)})`, color: pal.ink },
          { text: `Curvature κ = ${kappa.toFixed(3)}  ·  Torsion τ = ${tau.toFixed(3)}`, color: pal.teal },
          { text: `Orthonormal Frenet Triad: T (Amber) ⊥ N (Teal) ⊥ B`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Curvature κ', val: kappa.toFixed(3) },
          { key: 'Torsion τ', val: tau.toFixed(3) },
          { key: 'Radius R', val: R.toFixed(2) },
          { key: 'Pitch / Winding', val: sub === 'trefoil_knot_3d' ? `(${p},${q}) Knot` : c.toFixed(2) },
        ];
      }
      tableRows = [0, 1.2, 2.4, 3.6, 4.8, 6.0].map((t) => [
        `t = ${t.toFixed(1)}`,
        Math.cos(t).toFixed(3),
        Math.sin(t).toFixed(3),
        (0.35 * (t - 3)).toFixed(3),
      ]);
    }
    // ── 134–136: 3D Vector Field, Gauss Divergence Sphere, Stokes Cap ──
    else if (
      sub === 'vector_field_3d_rot_div' ||
      sub === 'divergence_gauss_flux_3d' ||
      sub === 'stokes_circulation_cap_3d'
    ) {
      const R = Number(params.sphereR ?? params.rimR ?? 1.15);
      const alpha = Number(params.sourceDiv ?? params.divRate ?? 1.0);
      const swirl = Number(params.swirl ?? 1.0);

      if (sub === 'divergence_gauss_flux_3d') {
        this.draw3DSurfaceQuads(
          ctx,
          pal,
          project,
          scale,
          (u, v) => ({
            x: R * Math.sin(u) * Math.cos(v),
            y: R * Math.sin(u) * Math.sin(v),
            z: R * Math.cos(u),
          }),
          0,
          Math.PI,
          0,
          Math.PI * 2,
          10,
          18
        );
      } else if (sub === 'stokes_circulation_cap_3d') {
        const capH = Number(params.capH ?? 1.1);
        this.draw3DSurfaceQuads(
          ctx,
          pal,
          project,
          scale,
          (r, th) => ({
            x: r * Math.cos(th),
            y: r * Math.sin(th),
            z: capH * (1 - (r * r) / (R * R)),
          }),
          0,
          R,
          0,
          Math.PI * 2,
          10,
          20
        );
        this.draw3DCurve(ctx, project, scale, (th) => ({ x: R * Math.cos(th), y: R * Math.sin(th), z: 0 }), 0, Math.PI * 2, 80, pal.amber, 4.2);
      }

      // Draw 3D vector arrows
      for (let k = 0; k < 12; k++) {
        const th = (k / 12) * Math.PI * 2;
        for (const zLev of [-0.6, 0.0, 0.6]) {
          const x = R * 0.85 * Math.cos(th);
          const y = R * 0.85 * Math.sin(th);
          const vx = sub === 'divergence_gauss_flux_3d' ? alpha * x * 0.35 : -swirl * y * 0.35 + alpha * x * 0.15;
          const vy = sub === 'divergence_gauss_flux_3d' ? alpha * y * 0.35 : swirl * x * 0.35 + alpha * y * 0.15;
          const vz = sub === 'divergence_gauss_flux_3d' ? alpha * zLev * 0.35 : 0.25;
          const p0 = project(x, y, zLev);
          const p1 = project(x + vx, y + vy, zLev + vz);
          this.drawArrow(ctx, p0.x, p0.y, p1.x, p1.y, k % 2 === 0 ? pal.amber : pal.teal, 2.2 * scale);
        }
      }

      const fluxVal =
        sub === 'divergence_gauss_flux_3d'
          ? 4 * Math.PI * alpha * Math.pow(R, 3)
          : 2 * Math.PI * R * R * swirl;
      lines = [
        { text: preset.name.toUpperCase(), color: pal.amber },
        { text: `Domain Radius R = ${R.toFixed(2)}  ·  Strength = ${alpha.toFixed(2)}`, color: pal.ink },
        {
          text:
            sub === 'divergence_gauss_flux_3d'
              ? `Outward Flux ∯ F·dS = ∭ (∇·F)dV = ${fluxVal.toFixed(3)}`
              : `Circulation ∮ F·dr = ∬ (∇×F)·dS = ${fluxVal.toFixed(3)}`,
          color: pal.teal,
        },
        { text: `Boundary-Interior Duality Verified in R³`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Radius R', val: R.toFixed(2) },
        { key: 'Divergence ∇·F', val: (3 * alpha).toFixed(2) },
        { key: 'Curl (∇×F)_z', val: (2 * swirl).toFixed(2) },
        { key: 'Total Flux / Circ', val: fluxVal.toFixed(2) },
      ];
      tableRows = [0.6, 0.8, 1.0, 1.2, 1.4].map((r) => [
        `R = ${r.toFixed(1)}`,
        `Area = ${(4 * Math.PI * r * r).toFixed(2)}`,
        `Vol = ${((4 / 3) * Math.PI * Math.pow(r, 3)).toFixed(2)}`,
        `Flux = ${(4 * Math.PI * alpha * Math.pow(r, 3)).toFixed(2)}`,
      ]);
    }
    // ── 137–142: 3D Linear Algebra & Spatial Vectors ──
    else if (
      sub === 'cross_product_3d' ||
      sub === 'scalar_triple_parallelepiped_3d' ||
      sub === 'plane_normal_eq_3d' ||
      sub === 'skew_lines_distance_3d' ||
      sub === 'svd_3d_ellipsoid' ||
      sub === 'rodrigues_rotation_3d'
    ) {
      if (sub === 'svd_3d_ellipsoid') {
        const s1 = Number(params.sigma1 ?? 1.65);
        const s2 = Number(params.sigma2 ?? 1.05);
        const s3 = Number(params.sigma3 ?? 0.55);
        this.draw3DSurfaceQuads(
          ctx,
          pal,
          project,
          scale,
          (u, v) => ({
            x: s1 * Math.sin(u) * Math.cos(v),
            y: s2 * Math.sin(u) * Math.sin(v),
            z: s3 * Math.cos(u),
          }),
          0,
          Math.PI,
          0,
          Math.PI * 2,
          12,
          20
        );
        const o = project(0, 0, 0);
        this.drawArrow(ctx, o.x, o.y, project(s1, 0, 0).x, project(s1, 0, 0).y, pal.amber, 3.5 * scale);
        this.drawArrow(ctx, o.x, o.y, project(0, s2, 0).x, project(0, s2, 0).y, pal.teal, 3.5 * scale);
        this.drawArrow(ctx, o.x, o.y, project(0, 0, s3).x, project(0, 0, s3).y, pal.indigoBright, 3.5 * scale);
        const detA = s1 * s2 * s3;
        lines = [
          { text: '3D SINGULAR VALUE DECOMPOSITION (A = UΣVᵀ)', color: pal.amber },
          { text: `Singular Values: σ₁ = ${s1.toFixed(2)}, σ₂ = ${s2.toFixed(2)}, σ₃ = ${s3.toFixed(2)}`, color: pal.ink },
          { text: `Condition Number κ(A) = σ₁/σ₃ = ${(s1 / s3).toFixed(2)}`, color: pal.teal },
          { text: `Volume Scaling |det A| = σ₁σ₂σ₃ = ${detA.toFixed(3)}`, color: pal.indigo },
        ];
        readouts = [
          { key: 'σ₁ (Max Stretch)', val: s1.toFixed(2) },
          { key: 'σ₃ (Min Stretch)', val: s3.toFixed(2) },
          { key: 'Condition κ(A)', val: (s1 / s3).toFixed(2) },
          { key: '|det A| = σ₁σ₂σ₃', val: detA.toFixed(3) },
        ];
      } else {
        const angRad = (Number(params.angleDeg ?? params.skewDeg ?? params.rotDeg ?? 65) * Math.PI) / 180;
        const lenB = Number(params.lenB ?? params.heightC ?? params.sepZ ?? 1.25);
        const o = project(0, 0, 0);
        const ax = 1.3;
        const bx = lenB * Math.cos(angRad);
        const by = lenB * Math.sin(angRad);
        const cz = ax * by;
        const pA = project(ax, 0, 0);
        const pB = project(bx, by, 0);
        const pAB = project(ax + bx, by, 0);
        const pCross = project(0, 0, cz * 0.75);

        // Spanned parallelogram in xy-plane
        ctx.save();
        ctx.fillStyle = pal.indigoFill;
        ctx.strokeStyle = pal.indigo;
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(o.x, o.y);
        ctx.lineTo(pA.x, pA.y);
        ctx.lineTo(pAB.x, pAB.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        this.drawArrow(ctx, o.x, o.y, pA.x, pA.y, pal.indigoBright, 3.4 * scale);
        this.drawArrow(ctx, o.x, o.y, pB.x, pB.y, pal.teal, 3.4 * scale);
        this.drawArrow(ctx, o.x, o.y, pCross.x, pCross.y, pal.amber, 3.8 * scale);

        lines = [
          { text: preset.name.toUpperCase(), color: pal.amber },
          { text: `Vector a = (1.30, 0, 0)  ·  Vector b = (${bx.toFixed(2)}, ${by.toFixed(2)}, 0)`, color: pal.ink },
          { text: `Cross Product Magnitude ‖a × b‖ = ${Math.abs(cz).toFixed(3)}`, color: pal.amber },
          { text: `Orthogonality: (a × b) · a = 0 and (a × b) · b = 0`, color: pal.teal },
        ];
        readouts = [
          { key: 'Angle θ', val: `${Math.round((angRad * 180) / Math.PI)}°` },
          { key: '‖a × b‖ Area', val: Math.abs(cz).toFixed(3) },
          { key: 'Dot a · b', val: (ax * bx).toFixed(3) },
          { key: 'Normal Axis', val: '+Z (Right-Hand)' },
        ];
      }
      tableRows = [30, 60, 90, 120, 150].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return [`θ = ${deg}°`, `sin θ = ${Math.sin(r).toFixed(3)}`, `cos θ = ${Math.cos(r).toFixed(3)}`, `Area = ${(1.5 * Math.sin(r)).toFixed(3)}`];
      });
    }
    // ── 143: Platonic Solids & Euler's Formula V - E + F = 2 ──
    else if (sub === 'euler_polyhedron_3d') {
      const idx = Math.max(1, Math.min(4, Math.round(Number(params.solidIdx ?? 2))));
      const R = Number(params.scaleR ?? 1.25);
      const solids = {
        1: {
          name: 'Regular Tetrahedron {3,3}',
          V: 4,
          E: 6,
          F: 4,
          verts: [
            [1, 1, 1],
            [1, -1, -1],
            [-1, 1, -1],
            [-1, -1, 1],
          ].map(([x, y, z]) => ({ x: x * R * 0.65, y: y * R * 0.65, z: z * R * 0.65 })),
          edges: [
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 2],
            [2, 3],
            [3, 1],
          ],
        },
        2: {
          name: 'Regular Hexahedron / Cube {4,3}',
          V: 8,
          E: 12,
          F: 6,
          verts: [
            [-1, -1, -1],
            [1, -1, -1],
            [1, 1, -1],
            [-1, 1, -1],
            [-1, -1, 1],
            [1, -1, 1],
            [1, 1, 1],
            [-1, 1, 1],
          ].map(([x, y, z]) => ({ x: x * R * 0.62, y: y * R * 0.62, z: z * R * 0.62 })),
          edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
            [4, 5],
            [5, 6],
            [6, 7],
            [7, 4],
            [0, 4],
            [1, 5],
            [2, 6],
            [3, 7],
          ],
        },
        3: {
          name: 'Regular Octahedron {3,4}',
          V: 6,
          E: 12,
          F: 8,
          verts: [
            [1, 0, 0],
            [-1, 0, 0],
            [0, 1, 0],
            [0, -1, 0],
            [0, 0, 1],
            [0, 0, -1],
          ].map(([x, y, z]) => ({ x: x * R, y: y * R, z: z * R })),
          edges: [
            [4, 0],
            [4, 2],
            [4, 1],
            [4, 3],
            [5, 0],
            [5, 2],
            [5, 1],
            [5, 3],
            [0, 2],
            [2, 1],
            [1, 3],
            [3, 0],
          ],
        },
        4: {
          name: 'Regular Icosahedron {3,5}',
          V: 12,
          E: 30,
          F: 20,
          verts: [
            [0, 1, 1.618],
            [0, -1, 1.618],
            [0, 1, -1.618],
            [0, -1, -1.618],
            [1, 1.618, 0],
            [-1, 1.618, 0],
            [1, -1.618, 0],
            [-1, -1.618, 0],
            [1.618, 0, 1],
            [-1.618, 0, 1],
            [1.618, 0, -1],
            [-1.618, 0, -1],
          ].map(([x, y, z]) => ({ x: x * R * 0.52, y: y * R * 0.52, z: z * R * 0.52 })),
          edges: [
            [0, 1],
            [0, 4],
            [0, 5],
            [0, 8],
            [0, 9],
            [1, 6],
            [1, 7],
            [1, 8],
            [1, 9],
            [4, 5],
            [4, 8],
            [4, 10],
            [4, 2],
            [5, 9],
            [5, 11],
            [5, 2],
            [2, 3],
            [2, 10],
            [2, 11],
            [3, 6],
            [3, 7],
            [3, 10],
            [3, 11],
            [6, 7],
            [6, 8],
            [6, 10],
            [7, 9],
            [7, 11],
            [8, 10],
            [9, 11],
          ],
        },
      };
      const sol = solids[idx];
      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3 * scale;
      for (const [i, j] of sol.edges) {
        const p0 = project(sol.verts[i].x, sol.verts[i].y, sol.verts[i].z);
        const p1 = project(sol.verts[j].x, sol.verts[j].y, sol.verts[j].z);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.restore();
      for (const v of sol.verts) {
        const pv = project(v.x, v.y, v.z);
        this.drawDot(ctx, pv.x, pv.y, 6.5 * scale, pal.amber, pal.bg);
      }
      lines = [
        { text: "EULER'S POLYHEDRAL FORMULA (V − E + F = 2)", color: pal.amber },
        { text: sol.name, color: pal.ink },
        { text: `Vertices V = ${sol.V}  ·  Edges E = ${sol.E}  ·  Faces F = ${sol.F}`, color: pal.teal },
        { text: `Invariant Check: ${sol.V} − ${sol.E} + ${sol.F} = ${sol.V - sol.E + sol.F} = χ(S²)`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Vertices V', val: String(sol.V) },
        { key: 'Edges E', val: String(sol.E) },
        { key: 'Faces F', val: String(sol.F) },
        { key: 'V − E + F', val: '2 (Invariant)' },
      ];
      tableRows = [
        ['Tetrahedron {3,3}', 'V = 4', 'E = 6, F = 4', '4 − 6 + 4 = 2'],
        ['Cube {4,3}', 'V = 8', 'E = 12, F = 6', '8 − 12 + 6 = 2'],
        ['Octahedron {3,4}', 'V = 6', 'E = 12, F = 8', '6 − 12 + 8 = 2'],
        ['Dodecahedron {5,3}', 'V = 20', 'E = 30, F = 12', '20 − 30 + 12 = 2'],
        ['Icosahedron {3,5}', 'V = 12', 'E = 30, F = 20', '12 − 30 + 20 = 2'],
      ];
    }
    // ── 144 & 150: Stereographic Projection & Quantum Bloch Sphere ──
    else if (sub === 'stereographic_projection_3d' || sub === 'bloch_sphere_qubit_3d') {
      this.draw3DSurfaceQuads(
        ctx,
        pal,
        project,
        scale,
        (u, v) => ({
          x: 1.15 * Math.sin(u) * Math.cos(v),
          y: 1.15 * Math.sin(u) * Math.sin(v),
          z: 1.15 * Math.cos(u),
        }),
        0,
        Math.PI,
        0,
        Math.PI * 2,
        12,
        20
      );
      const th = (Number(params.thetaDeg ?? params.latDeg ?? 60) * Math.PI) / 180;
      const ph = (Number(params.phiDeg ?? params.tiltDeg ?? 45) * Math.PI) / 180;
      const sx = 1.15 * Math.sin(th) * Math.cos(ph);
      const sy = 1.15 * Math.sin(th) * Math.sin(ph);
      const sz = 1.15 * Math.cos(th);
      const pO = project(0, 0, 0);
      const pState = project(sx, sy, sz);
      this.drawArrow(ctx, pO.x, pO.y, pState.x, pState.y, pal.amber, 3.8 * scale);
      this.drawDot(ctx, pState.x, pState.y, 8 * scale, pal.amber, pal.bg);

      const prob0 = Math.pow(Math.cos(th / 2), 2);
      const prob1 = Math.pow(Math.sin(th / 2), 2);
      lines = [
        { text: preset.name.toUpperCase(), color: pal.amber },
        { text: `Bloch / Sphere Vector r = (${(sx / 1.15).toFixed(2)}, ${(sy / 1.15).toFixed(2)}, ${(sz / 1.15).toFixed(2)})`, color: pal.ink },
        { text: `P(|0⟩) = cos²(θ/2) = ${(prob0 * 100).toFixed(1)}%  ·  P(|1⟩) = ${(prob1 * 100).toFixed(1)}%`, color: pal.teal },
        { text: `Pure State Norm ‖r‖² = x² + y² + z² = 1.000`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Polar θ', val: `${Math.round((th * 180) / Math.PI)}°` },
        { key: 'Azimuth φ', val: `${Math.round((ph * 180) / Math.PI)}°` },
        { key: 'Prob P(|0⟩)', val: `${(prob0 * 100).toFixed(1)}%` },
        { key: 'Prob P(|1⟩)', val: `${(prob1 * 100).toFixed(1)}%` },
      ];
      tableRows = [0, 45, 90, 135, 180].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return [`θ = ${deg}°`, `cos(θ/2)=${Math.cos(r / 2).toFixed(3)}`, `sin(θ/2)=${Math.sin(r / 2).toFixed(3)}`, `P(|0⟩)=${(Math.cos(r / 2) ** 2 * 100).toFixed(1)}%`];
      });
    }
    // ── 145–149: Lorenz, Rössler, Membrane Eigenmode, Kepler 3D Orbit ──
    else {
      if (sub === 'membrane_eigenmode_3d') {
        const m = Math.round(Number(params.modeM ?? 2));
        const n = Math.round(Number(params.modeN ?? 2));
        const osc = Math.cos(time * 2.6);
        this.draw3DSurfaceQuads(
          ctx,
          pal,
          project,
          scale,
          (x, y) => ({
            x,
            y,
            z: 0.85 * Math.sin(m * Math.PI * ((x + 1.3) / 2.6)) * Math.sin(n * Math.PI * ((y + 1.3) / 2.6)) * osc,
          }),
          -1.3,
          1.3,
          -1.3,
          1.3,
          20,
          20
        );
        const omega = Math.hypot(m, n);
        lines = [
          { text: `3D DRUMHEAD EIGENMODE (${m}, ${n}) STANDING WAVE`, color: pal.amber },
          { text: `u(x,y,t) = sin(${m}πx) sin(${n}πy) cos(ω_{${m}${n}} t)`, color: pal.ink },
          { text: `Eigenfrequency Ratio ω_{${m}${n}} / πc = √(${m}² + ${n}²) = ${omega.toFixed(3)}`, color: pal.teal },
          { text: `Internal Chladni Nodal Lines: ${m - 1} in X, ${n - 1} in Y`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Mode (m, n)', val: `(${m}, ${n})` },
          { key: 'Freq √(m²+n²)', val: omega.toFixed(3) },
          { key: 'Nodal Lines', val: String(m - 1 + (n - 1)) },
          { key: 'Antinodes m·n', val: String(m * n) },
        ];
      } else if (sub === 'kepler_3d_orbit') {
        const inc = (Number(params.incDeg ?? 32) * Math.PI) / 180;
        const e = Number(params.ecc ?? 0.48);
        const orbitPt = (nu) => {
          const r = (1.15 * (1 - e * e)) / (1 + e * Math.cos(nu));
          const xo = r * Math.cos(nu);
          const yo = r * Math.sin(nu);
          return { x: xo, y: yo * Math.cos(inc), z: yo * Math.sin(inc) };
        };
        this.draw3DCurve(ctx, project, scale, orbitPt, 0, Math.PI * 2, 100, pal.indigo, 4.0);
        const nuNow = prog * Math.PI * 2;
        const pPlanet = project(orbitPt(nuNow).x, orbitPt(nuNow).y, orbitPt(nuNow).z);
        const pSun = project(0, 0, 0);
        const pL = project(0, -1.2 * Math.sin(inc), 1.2 * Math.cos(inc));
        this.drawArrow(ctx, pSun.x, pSun.y, pL.x, pL.y, pal.teal, 3.4 * scale);
        this.drawDot(ctx, pSun.x, pSun.y, 9 * scale, pal.amber, pal.bg);
        this.drawDot(ctx, pPlanet.x, pPlanet.y, 7.5 * scale, pal.teal, pal.bg);
        lines = [
          { text: '3D INCLINED KEPLERIAN ORBIT & ANGULAR MOMENTUM', color: pal.amber },
          { text: `Inclination i = ${Math.round((inc * 180) / Math.PI)}°  ·  Eccentricity e = ${e.toFixed(2)}`, color: pal.ink },
          { text: `Conserved Angular Momentum L = r × mv (Teal Normal)`, color: pal.teal },
          { text: `Periapsis r_p = ${(1.15 * (1 - e)).toFixed(2)}  ·  Apoapsis r_a = ${(1.15 * (1 + e)).toFixed(2)}`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Inclination i', val: `${Math.round((inc * 180) / Math.PI)}°` },
          { key: 'Eccentricity e', val: e.toFixed(2) },
          { key: 'Periapsis r_p', val: (1.15 * (1 - e)).toFixed(2) },
          { key: 'Apoapsis r_a', val: (1.15 * (1 + e)).toFixed(2) },
        ];
      } else {
        // 3D Lorenz / Rössler Chaotic Strange Attractor integration
        const rho = Number(params.rhoVal ?? 28);
        const sigma = Number(params.sigmaVal ?? 10);
        let lx = 0.1;
        let ly = 0.0;
        let lz = 0.0;
        const pts = [];
        for (let i = 0; i < 650; i++) {
          const dt = 0.008;
          const dx = sigma * (ly - lx);
          const dy = lx * (rho - lz) - ly;
          const dz = lx * ly - (8 / 3) * lz;
          lx += dx * dt;
          ly += dy * dt;
          lz += dz * dt;
          pts.push({ x: lx * 0.062, y: ly * 0.062, z: (lz - 24) * 0.055 });
        }
        const vis = Math.max(40, Math.floor(pts.length * Math.max(0.25, prog)));
        this.draw3DCurve(ctx, project, scale, (idx) => pts[Math.min(pts.length - 1, Math.round(idx))], 0, vis - 1, vis - 1, pal.indigo, 3.0);
        const head = pts[vis - 1];
        const pHead = project(head.x, head.y, head.z);
        this.drawDot(ctx, pHead.x, pHead.y, 7.5 * scale, pal.amber, pal.bg);
        lines = [
          { text: preset.name.toUpperCase(), color: pal.amber },
          { text: `Parameters: ρ = ${rho.toFixed(1)}, σ = ${sigma.toFixed(1)}, β = 2.67`, color: pal.ink },
          { text: `Phase Space Contraction ∇·F = −(σ+1+β) = ${(-(sigma + 1 + 8 / 3)).toFixed(2)} < 0`, color: pal.teal },
          { text: `Lyapunov Exponent λ₁ > 0 (Exponential Sensitivity)`, color: pal.indigo },
        ];
        readouts = [
          { key: 'Rayleigh ρ', val: rho.toFixed(1) },
          { key: 'Prandtl σ', val: sigma.toFixed(1) },
          { key: 'Contraction ∇·F', val: (-(sigma + 3.67)).toFixed(2) },
          { key: 'Fractal Dim D_KY', val: '2.06' },
        ];
      }
      tableRows = [0, 1, 2, 3, 4].map((k) => [
        `State t_${k}`,
        (Math.cos(k) * 0.9).toFixed(3),
        (Math.sin(k) * 0.9).toFixed(3),
        (Math.sin(2 * k) * 0.6).toFixed(3),
      ]);
    }

    const cardX = isTall ? padX : areaX + areaW + Math.round(28 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(22 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const cardH = Math.round(240 * scale);

    const formattedLines = lines.map((l, idx) => ({
      text: l.text,
      font:
        idx === 0
          ? `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`
          : idx === 1
          ? `600 ${Math.round(21 * scale)}px "Newsreader", Georgia, serif`
          : `600 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`,
      color: l.color || pal.ink,
      gap: 36 * scale,
    }));

    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, cardH, scale, formattedLines, pal.panelBorder);

    return { readouts, tableHeaders, tableRows };
  };
}
