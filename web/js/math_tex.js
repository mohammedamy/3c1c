/* ==========================================================================
   3c1c · ClipSAT Universal LaTeX / KaTeX Mathematical Typesetting Engine
   Converts symbolic strings, callout cards, telemetry readouts, prose,
   controls, data tables, and canvas plot labels into publication-grade
   LaTeX / KaTeX across all 165 2D & 3D mathematical scenes.
   ========================================================================== */

const SUPERSCRIPT_MAP = {
  '⁰': '0',
  '¹': '1',
  '²': '2',
  '³': '3',
  '⁴': '4',
  '⁵': '5',
  '⁶': '6',
  '⁷': '7',
  '⁸': '8',
  '⁹': '9',
  '⁺': '+',
  '⁻': '-',
  '⁼': '=',
  '⁽': '(',
  '⁾': ')',
  'ⁿ': 'n',
  'ᵏ': 'k',
  'ᵗ': 't',
  'ˣ': 'x',
  'ʸ': 'y',
  'ᵀ': '\\top ',
  'ⁱ': 'i',
  'ᵐ': 'm',
  'ᵖ': 'p',
};

const SUBSCRIPT_MAP = {
  '₀': '0',
  '₁': '1',
  '₂': '2',
  '₃': '3',
  '₄': '4',
  '₅': '5',
  '₆': '6',
  '₇': '7',
  '₈': '8',
  '₉': '9',
  '₊': '+',
  '₋': '-',
  '₌': '=',
  '₍': '(',
  '₎': ')',
  'ₐ': 'a',
  'ₑ': 'e',
  'ₕ': 'h',
  'ᵢ': 'i',
  'ⱼ': 'j',
  'ₖ': 'k',
  'ₗ': 'l',
  'ₘ': 'm',
  'ₙ': 'n',
  'ₒ': 'o',
  'ₚ': 'p',
  'ᵣ': 'r',
  'ₛ': 's',
  'ₜ': 't',
  'ᵤ': 'u',
  'ᵥ': 'v',
  'ₓ': 'x',
};

const GREEK_LATEX_MAP = {
  'α': '\\alpha',
  'β': '\\beta',
  'γ': '\\gamma',
  'δ': '\\delta',
  'ε': '\\varepsilon',
  'ζ': '\\zeta',
  'η': '\\eta',
  'θ': '\\theta',
  'ϑ': '\\vartheta',
  'ι': '\\iota',
  'κ': '\\kappa',
  'λ': '\\lambda',
  'μ': '\\mu',
  'ν': '\\nu',
  'ξ': '\\xi',
  'π': '\\pi',
  'ρ': '\\rho',
  'σ': '\\sigma',
  'τ': '\\tau',
  'υ': '\\upsilon',
  'φ': '\\varphi',
  'ϕ': '\\phi',
  'χ': '\\chi',
  'ψ': '\\psi',
  'ω': '\\omega',
  'Γ': '\\Gamma',
  'Δ': '\\Delta',
  'Θ': '\\Theta',
  'Λ': '\\Lambda',
  'Ξ': '\\Xi',
  'Π': '\\Pi',
  'Σ': '\\Sigma',
  'Φ': '\\Phi',
  'Ψ': '\\Psi',
  'Ω': '\\Omega',
};

const SYMBOL_LATEX_MAP = {
  '∭': '\\iiint ',
  '∬': '\\iint ',
  '∫': '\\int ',
  '∮': '\\oint ',
  '∑': '\\sum ',
  '∏': '\\prod ',
  '∇': '\\nabla ',
  '∂': '\\partial ',
  '∆': '\\Delta ',
  '≤': '\\le ',
  '≥': '\\ge ',
  '≠': '\\ne ',
  '≈': '\\approx ',
  '≡': '\\equiv ',
  '≅': '\\cong ',
  '∼': '\\sim ',
  '∝': '\\propto ',
  '⟹': '\\implies ',
  '⇒': '\\Rightarrow ',
  '⟺': '\\iff ',
  '⇔': '\\Leftrightarrow ',
  '↦': '\\mapsto ',
  '→': '\\to ',
  '←': '\\leftarrow ',
  '↔': '\\leftrightarrow ',
  '⊥': '\\perp ',
  '∥': '\\parallel ',
  '∠': '\\angle ',
  '△': '\\triangle ',
  '∩': '\\cap ',
  '∪': '\\cup ',
  '∈': '\\in ',
  '∉': '\\notin ',
  '⊂': '\\subset ',
  '⊆': '\\subseteq ',
  '±': '\\pm ',
  '∓': '\\mp ',
  '×': '\\times ',
  '·': '\\cdot ',
  '•': '\\cdot ',
  '÷': '\\div ',
  '∞': '\\infty ',
  '∅': '\\varnothing ',
  '∀': '\\forall ',
  '∃': '\\exists ',
  'ℝ': '\\mathbb{R}',
  'ℂ': '\\mathbb{C}',
  'ℤ': '\\mathbb{Z}',
  'ℕ': '\\mathbb{N}',
  'ℚ': '\\mathbb{Q}',
  'ℓ': '\\ell ',
  'ℏ': '\\hbar ',
  '✓': '\\checkmark ',
  '−': '-',
  '–': '-',
  '′': "'",
  '″': "''",
  '‴': "'''",
  '‖': '\\|',
  '½': '\\tfrac{1}{2}',
  '⅓': '\\tfrac{1}{3}',
  '⅔': '\\tfrac{2}{3}',
  '¼': '\\tfrac{1}{4}',
  '¾': '\\tfrac{3}{4}',
};

const TWO_LETTER_MATH_TERMS = new Set([
  'ax', 'ay', 'az', 'bx', 'by', 'bz', 'cx', 'cy', 'cz',
  'dx', 'dy', 'dz', 'dt', 'dr', 'ds', 'du', 'dv', 'dw', 'dA', 'dV', 'dS',
  'ab', 'bc', 'ac', 'xy', 'yz', 'xz', 'uv', 'kx', 'nx', 'mx', 'rx',
  'ix', 'iy', 'ik', 'np', 'pq', 'qr',
]);

const ENGLISH_PROSE_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'axis', 'bar', 'bars', 'base', 'basis',
  'between', 'bisector', 'both', 'bound', 'bounds', 'box', 'by', 'card', 'center',
  'choice', 'chord', 'circle', 'circles', 'circumcenter', 'clock', 'col', 'column',
  'columns', 'common', 'compare', 'comparison', 'cone', 'conic', 'constant',
  'converges', 'converging', 'copying', 'core', 'corner', 'count', 'cross',
  'crosses', 'cumulative', 'curl', 'current', 'curve', 'curves', 'cutoff',
  'cylinder', 'damping', 'data', 'deg', 'degree', 'depth', 'derivative',
  'descent', 'determinant', 'diameter', 'difference', 'direct', 'directly',
  'distance', 'division', 'domain', 'dot', 'drag', 'dual', 'each', 'eccentricity',
  'edge', 'edges', 'eigenmode', 'eigenvalue', 'eigenvalues', 'elev', 'elevation',
  'ellipse', 'ellipsoid', 'empirical', 'endpoint', 'energy', 'envelope', 'equal',
  'equation', 'equidistant', 'equilateral', 'error', 'euler', 'exact', 'exactly',
  'ext', 'external', 'face', 'faces', 'factor', 'family', 'field', 'fill',
  'fixed', 'flow', 'flux', 'focus', 'fold', 'folding', 'folium', 'for', 'force',
  'form', 'formula', 'fourier', 'frame', 'frequency', 'from', 'full', 'function',
  'fundamental', 'game', 'gap', 'gauss', 'general', 'generating', 'geometric',
  'geometry', 'given', 'global', 'golden', 'grad', 'gradient', 'graph', 'green',
  'grid', 'group', 'growth', 'half', 'halving', 'harmonic', 'hausdorff', 'heat',
  'height', 'helicoid', 'helix', 'hemisphere', 'hessian', 'hexagon', 'high',
  'horizontal', 'hull', 'hyperbola', 'hyperbolic', 'hyperboloid', 'identity',
  'image', 'implicit', 'in', 'incenter', 'incircle', 'inclined', 'index',
  'indigo', 'inequality', 'initial', 'inner', 'inscribed', 'instantaneous',
  'int', 'integral', 'integrals', 'intercept', 'interior', 'intermediate',
  'intersecting', 'intersection', 'interval', 'invariant', 'inverse', 'is',
  'isocline', 'isolated', 'iterated', 'iteration', 'jacobian', 'jump', 'kepler',
  'kernel', 'knot', 'lagrange', 'laplace', 'law', 'leaf', 'learning', 'least',
  'left', 'length', 'level', 'limit', 'line', 'linear', 'linearization', 'lines',
  'linked', 'local', 'locus', 'logistic', 'loop', 'lorenz', 'loss', 'low',
  'lower', 'mach', 'maclaurin', 'magnetic', 'major', 'manifold', 'map', 'mapping',
  'mass', 'match', 'matrix', 'max', 'maximum', 'mean', 'measure', 'mechanics',
  'median', 'membrane', 'method', 'mid', 'midpoint', 'min', 'minimal', 'minimum',
  'minor', 'missing', 'mode', 'modular', 'modulus', 'moment', 'momentum',
  'monkey', 'morph', 'moving', 'multivariable', 'natural', 'near', 'net',
  'newton', 'node', 'nodes', 'non', 'normal', 'norm', 'null', 'number', 'numeric',
  'numerical', 'odd', 'of', 'offset', 'oloid', 'on', 'one', 'only', 'open',
  'operator', 'optimal', 'optimization', 'orbit', 'orbital', 'order', 'origin',
  'orthogonal', 'orthocenter', 'oscillation', 'oscillator', 'outer', 'over',
  'pair', 'parabola', 'parabolic', 'paraboloid', 'parallel', 'parallelepiped',
  'parameter', 'parametric', 'parity', 'part', 'partial', 'partition',
  'partitions', 'pascal', 'path', 'peak', 'pendulum', 'pentagon', 'percent',
  'perimeter', 'period', 'periodic', 'perpendicular', 'petal', 'phase', 'pitch',
  'plane', 'planes', 'platonic', 'plot', 'point', 'points', 'polar', 'pole',
  'poly', 'polygon', 'polygonal', 'polyhedron', 'polynomial', 'population',
  'position', 'positive', 'potential', 'power', 'precession', 'prime',
  'principal', 'principle', 'prism', 'probability', 'probe', 'product',
  'profile', 'projection', 'proof', 'property', 'proposition', 'punctured',
  'pythagorean', 'quadratic', 'quadrature', 'quadric', 'quantum', 'qubit',
  'quotient', 'rad', 'radial', 'radian', 'radians', 'radius', 'random', 'range',
  'rate', 'ratio', 'ray', 'rays', 'real', 'rectangle', 'rectangular',
  'rectification', 'recursion', 'recursive', 'reduction', 'reference',
  'reflection', 'region', 'regression', 'regular', 'relative', 'relativity',
  'remaining', 'removed', 'residue', 'resonance', 'response', 'revolving',
  'middle', 'riemann', 'right', 'rigid', 'rim', 'ring', 'rise', 'rodrigues',
  'root', 'roots', 'rosette', 'rotation', 'rotational', 'row', 'rows', 'rule',
  'ruled', 'run', 'saddle', 'sample', 'sampled', 'sat', 'scalar', 'scale',
  'scaling', 'scatter', 'schwarz', 'score', 'scrub', 'secant', 'second',
  'section', 'sector', 'segment', 'segments', 'select', 'self', 'semicircle',
  'separatrix', 'sequence', 'series', 'set', 'shaded', 'shape', 'shear', 'sheet',
  'sheets', 'shift', 'short', 'side', 'sides', 'sieve', 'signal', 'similar',
  'simpson', 'simultaneity', 'sine', 'singular', 'sink', 'size', 'skew', 'slice',
  'slices', 'slicing', 'slider', 'slope', 'smooth', 'snell', 'solid', 'solids',
  'solution', 'source', 'space', 'span', 'spatial', 'special', 'spectral',
  'spectrum', 'speed', 'sphere', 'spherical', 'spiral', 'split', 'spring',
  'square', 'squared', 'squares', 'squaring', 'squeeze', 'stability', 'stable',
  'stage', 'staircase', 'standard', 'standing', 'star', 'start', 'starting',
  'state', 'stationary', 'statistics', 'steep', 'steepness', 'step', 'steps',
  'stereographic', 'stiffness', 'stokes', 'straightedge', 'strange', 'stream',
  'strength', 'stretching', 'strip', 'strips', 'structure', 'sub', 'subinterval',
  'subintervals', 'subspace', 'sum', 'sums', 'superposition', 'supersonic',
  'support', 'surface', 'surfaces', 'sweep', 'swirl', 'symbolic', 'symmetric',
  'symmetry', 'system', 'table', 'tail', 'tangent', 'tangents', 'target',
  'taylor', 'teal', 'term', 'terms', 'ternary', 'test', 'tetrahedron', 'that',
  'the', 'theorem', 'theory', 'thermal', 'through', 'time', 'to', 'tolerance',
  'top', 'topology', 'torus', 'total', 'trace', 'track', 'trajectory',
  'transfer', 'transform', 'transformation', 'transition', 'translation',
  'transport', 'trapezoid', 'trapezoidal', 'trefoil', 'tree', 'triad',
  'triangle', 'triangles', 'triaxial', 'trig', 'trigonometric', 'trigonometry',
  'triple', 'true', 'tube', 'tunnel', 'turn', 'turning', 'twist', 'two', 'type',
  'unbounded', 'under', 'uniform', 'union', 'unique', 'unit', 'universal',
  'unstable', 'upper', 'valid', 'value', 'values', 'vanishing', 'variable',
  'variance', 'variation', 'vector', 'vectors', 'velocity', 'verhulst',
  'vertex', 'vertical', 'vertices', 'vesica', 'via', 'vibrating', 'view',
  'villarceau', 'viviani', 'volume', 'volumes', 'vortex', 'vorticity', 'walk',
  'warp', 'wave', 'wavelength', 'waves', 'wedge', 'weierstrass', 'weight',
  'well', 'when', 'where', 'width', 'winding', 'window', 'winning', 'with',
  'work', 'worldline', 'wrap', 'zero', 'zeros', 'zone', 'zoom', 'amber',
]);

const latexCache = new Map();

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Convert a symbolic mathematical expression string into clean LaTeX.
 */
export function exprToLatex(raw) {
  if (!raw) return '';
  let s = String(raw).trim();
  if (!s) return '';

  // 0. Newton over-dots (ẋ, ẏ, ż, θ̇, ẍ, ÿ)
  s = s
    .replace(/ż/g, '\\dot{z}')
    .replace(/ẋ/g, '\\dot{x}')
    .replace(/ẍ/g, '\\ddot{x}')
    .replace(/ẏ/g, '\\dot{y}');
  s = s.replace(/([A-Za-zα-ωΑ-Ω])\u0308/g, '\\ddot{$1}');
  s = s.replace(/([A-Za-zα-ωΑ-Ω])\u0307/g, '\\dot{$1}');

  // 1. 2x2 Matrix bracket notation: [ [a, b], [c, d] ]
  s = s.replace(
    /\[\s*\[\s*([^\],]+)\s*,\s*([^\]]+)\s*\]\s*,\s*\[\s*([^\],]+)\s*,\s*([^\]]+)\s*\]\s*\]/g,
    '\\begin{bmatrix} $1 & $2 \\\\ $3 & $4 \\end{bmatrix}'
  );

  // 2. Unit basis vectors î, ĵ, k̂
  s = s
    .replace(/î'/g, "\\hat{\\imath}'")
    .replace(/ĵ'/g, "\\hat{\\jmath}'")
    .replace(/î/g, '\\hat{\\imath}')
    .replace(/ĵ/g, '\\hat{\\jmath}')
    .replace(/k̂/g, '\\hat{k}');

  // 3. Unicode superscripts -> ^{...}
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿᵏᵗˣʸᵀⁱᵐᵖ]+/g, (match) => {
    const mapped = Array.from(match)
      .map((ch) => SUPERSCRIPT_MAP[ch] ?? ch)
      .join('');
    return `^{${mapped}}`;
  });

  // 4. Unicode subscripts -> _{...}
  s = s.replace(/[₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ]+/g, (match) => {
    const mapped = Array.from(match)
      .map((ch) => SUBSCRIPT_MAP[ch] ?? ch)
      .join('');
    return `_{${mapped}}`;
  });

  // 5. Underscore subscripts: _(∂D), _outer, _AB, _0, etc.
  s = s.replace(/_\(([^)]+)\)/g, '_{$1}');
  s = s.replace(/_([A-Za-z0-9∂+-]+)/g, (_, sub) => {
    if (sub.length > 2 && /^[a-zA-Z]+$/.test(sub)) {
      return `_{\\text{${sub}}}`;
    }
    return `_{${sub}}`;
  });

  // 6. Caret superscripts: ^(iθ), ^k, ^2, etc.
  s = s.replace(/\^\(([^)]+)\)/g, '^{$1}');
  s = s.replace(/\^([A-Za-z0-9+-]+)/g, '^{$1}');

  // 7. Common variable+digit shorthand (z0, P1, Q1, T1, V1, d1, r1, e1)
  s = s.replace(/\b([zPQTVdrseL])([0-9]+)\b/g, '$1_{$2}');

  // 8. Square roots: √(expr) or √x
  s = s.replace(/√\(([^)]+)\)/g, '\\sqrt{$1}');
  s = s.replace(/√([A-Za-z0-9α-ωΑ-Ω]+)/g, '\\sqrt{$1}');

  // 9. Common derivative, trig & partial ratios -> \frac{...}{...}
  s = s.replace(/\bd\s*\/\s*d([xytuvrθφs])\b/g, '\\frac{d}{d$1}');
  s = s.replace(/\(∂([A-Za-z])/g, '(\\partial $1');
  s = s.replace(/∂([A-Za-z])\s*\/\s*∂([A-Za-z])/g, '\\frac{\\partial $1}{\\partial $2}');
  s = s.replace(/\b(d[A-Za-zθφρrxyzftVAs])\s*\/\s*(d[A-Za-zθφρrxyzft])\b/g, '\\frac{$1}{$2}');
  s = s.replace(/Δ([A-Za-zθφxyfF])\s*\/\s*Δ([A-Za-zθφxyt])/g, '\\frac{\\Delta $1}{\\Delta $2}');
  s = s.replace(/Δ([A-Za-zθφxyfF])\s*\/\s*([hntΔx]+)/g, '\\frac{\\Delta $1}{$2}');
  s = s.replace(/([Fdf])_\{([xyrθt])\}\s*\/\s*([Fdf])_\{([xyrθt])\}/g, '\\frac{$1_{$2}}{$3_{$4}}');
  s = s.replace(/sin\s*θ\s*\/\s*cos\s*θ/g, '\\frac{\\sin\\theta}{\\cos\\theta}');
  s = s.replace(/∠([A-Z]{3})\s*\/\s*∠([A-Z]{3})/g, '\\frac{\\angle $1}{\\angle $2}');
  s = s.replace(/\(b\/2\)/g, '\\left(\\tfrac{b}{2}\\right)');
  s = s.replace(/\bb\/2\b/g, '\\tfrac{b}{2}');
  s = s.replace(/\((\d+)\/(\d+)\)/g, '\\left(\\tfrac{$1}{$2}\\right)');
  s = s.replace(/ln\((\d+)\)\s*\/\s*ln\((\d+)\)/g, '\\frac{\\ln($1)}{\\ln($2)}');

  // 10. Units inside math (rad, deg)
  s = s.replace(/\b(rad|deg)\b/g, '\\,\\text{$1}');

  // 11. Standard mathematical function names (not preceded by \)
  s = s.replace(
    /(?<!\\)\b(arcsin|arccos|arctan|sinh|cosh|tanh|sin|cos|tan|sec|csc|cot|ln|log|exp|lim|det|dim|gcd|lcm|mod|max|min|sup|inf)\b/g,
    '\\$1'
  );
  s = s.replace(
    /(?<!\\)\b(sinc|tr|rank|proj|curl|div|grad|erf|Var|Cov)\b/g,
    '\\operatorname{$1}'
  );

  // 12. Degree & percent symbols
  s = s.replace(/°/g, '^{\\circ}');
  s = s.replace(/(?<!\\)%/g, '\\%');

  // 13. Unicode mathematical operators & symbols
  for (const [uni, tex] of Object.entries(SYMBOL_LATEX_MAP)) {
    if (s.includes(uni)) {
      s = s.split(uni).join(tex);
    }
  }

  // 14. Greek characters (not preceded by \)
  for (const [gr, tex] of Object.entries(GREEK_LATEX_MAP)) {
    if (s.includes(gr)) {
      s = s.split(gr).join(`${tex} `);
    }
  }

  // 15. Spacing before differentials dx, dy, dt, dr, dθ, dA, dV, ds
  s = s.replace(/(\)|[xytuvrθφ])(\s*)(d[xytuvrθφAVs])\b/g, '$1\\,$3');

  return s.replace(/\s+/g, ' ').trim();
}

/**
 * Render a LaTeX string to HTML via KaTeX with caching and graceful fallback.
 */
export function renderLatexToHtml(latex, displayMode = false) {
  const clean = String(latex ?? '').trim();
  if (!clean) return '';
  const key = `${displayMode ? 'D:' : 'I:'}${clean}`;
  if (latexCache.has(key)) return latexCache.get(key);

  if (typeof window !== 'undefined' && window.katex) {
    try {
      const html = window.katex.renderToString(clean, {
        displayMode,
        throwOnError: false,
        strict: 'ignore',
        trust: false,
      });
      latexCache.set(key, html);
      return html;
    } catch {
      // Fallback below
    }
  }
  return `<span class="math-fallback">${escapeHtml(clean)}</span>`;
}

/**
 * Convert a scene glyph badge (e.g. "f'(a)", "∫dx", "∮F·dr", "a × b") into KaTeX HTML.
 */
export function renderGlyphKatex(glyph) {
  const g = String(glyph ?? '').trim();
  if (!g) return '';
  if (g === '[A]v') return renderLatexToHtml('A\\vec{v}', false);
  if (g === '∮F·dr') return renderLatexToHtml('\\oint\\vec{F}\\cdot d\\vec{r}', false);
  if (g === 'a × b') return renderLatexToHtml('\\vec{a}\\times\\vec{b}', false);
  if (g === 'det[a,b,c]') return renderLatexToHtml('\\det[\\vec{a},\\vec{b},\\vec{c}]', false);
  if (g === 'n·x = d') return renderLatexToHtml('\\vec{n}\\cdot\\vec{x}=d', false);
  if (g === '|Δr·(d₁×d₂)|') return renderLatexToHtml('|\\Delta\\vec{r}\\cdot(\\vec{d}_1\\times\\vec{d}_2)|', false);
  return renderLatexToHtml(exprToLatex(g), false);
}

/**
 * Determine whether a token or short chunk is mathematical rather than plain English prose.
 */
export function isMathChunk(token) {
  const t = String(token ?? '').trim();
  if (!t) return false;
  if (/[\u0600-\u06FF]/.test(t)) return false;
  if (/^[234]D$/i.test(t)) return false;

  // 2x2 Matrix bracket
  if (/^\[\s*\[/.test(t)) return true;

  // Combining dot/ddot (ẋ, ẏ, ż)
  if (/[\u0307\u0308żẋẍẏ]/.test(t)) return true;

  // Contains explicit math symbols, Greek, sub/superscripts, operators
  if (
    /[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿᵏᵗˣʸᵀⁱᵐᵖ₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓα-ωΑ-Ω∫∬∭∮∑∏∇∂∆≤≥≠≈≡≅∼∝⟹⇒⟺⇔↦→←↔⊥∥∠△∩∪∈∉⊂⊆±∓×÷∞∅∀∃ℝℂℤℕℚℓℏ✓√½⅓⅔¼¾îĵ−‖]/.test(
      t
    )
  ) {
    return true;
  }
  if (/[_^=<>+]/.test(t)) return true;
  if (/^\d+(\.\d+)?([eE][+-]?\d+)?[%°!]?$/.test(t)) return true;
  if (/^[+-]?\d+(\.\d+)?/.test(t)) return true;
  // Function evaluations or coefficient+paren like f(x), f'(a), 2.40(x − 1.20), T_1(x), sin(x)
  if (/^[A-Za-z0-9_.+-/*']+\([^)]*\)[⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉'^0-9A-Za-z]*$/.test(t)) return true;
  // Absolute value |...| or norm ‖...‖
  if (/^(\|[^|]+\||‖[^‖]+‖)$/.test(t)) return true;
  // Interval or vector [a, b] or [a b c] or (a, b)
  if (/^[\[(][-+]?\d.*[\])]$/.test(t) || /^\[[a-zA-Z](\s+[a-zA-Z])+\]$/.test(t)) return true;

  const stripped = t.replace(/^[(["']+|[)\]"'.,;:]+$/g, '');
  if (!stripped) return false;

  if (TWO_LETTER_MATH_TERMS.has(stripped)) return true;

  if (/^[A-Za-z]'*$/.test(stripped)) {
    const low = stripped.toLowerCase();
    if (low === 'a' || low === 'i') return stripped === 'A' || stripped === 'I';
    return true;
  }
  // Slash ratios like dy/dx, d/dx, b/2, 1/2, A_outer/A_inner
  if (/^[A-Za-z0-9_()]+\/[A-Za-z0-9_()]+$/.test(stripped) && !/^(and\/or|w\/o|i\/o)$/i.test(stripped)) {
    return true;
  }
  return false;
}

/**
 * Tokenize a line by whitespace while keeping balanced parentheses/brackets/norms attached
 * to any prefix/suffix (e.g., "2.40(x − 1.20)", "P(|Z| ≤ z₀)", "‖a × b‖").
 */
function tokenizeBalanced(str) {
  const tokens = [];
  let cur = '';
  let parenDepth = 0;
  let bracketDepth = 0;
  let normOpen = false;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '(') parenDepth++;
    else if (ch === ')' && parenDepth > 0) parenDepth--;
    else if (ch === '[') bracketDepth++;
    else if (ch === ']' && bracketDepth > 0) bracketDepth--;
    else if (ch === '‖') normOpen = !normOpen;

    if (/\s/.test(ch) && parenDepth === 0 && bracketDepth === 0 && !normOpen) {
      if (cur) {
        tokens.push(cur);
        cur = '';
      }
    } else {
      cur += ch;
    }
  }
  if (cur) tokens.push(cur);
  return tokens;
}

/**
 * Render a mixed prose/label/callout string into HTML where all mathematical
 * formulas, variables, equations, and numbers are rendered in inline KaTeX.
 */
export function renderMixedMathHtml(rawText) {
  const str = String(rawText ?? '');
  if (!str.trim()) return '';

  // Split by pipe or double-space middle-dot separators first
  if (str.includes('   |   ') || str.includes('  |  ')) {
    return str
      .split(/\s{2,}\|\s{2,}/)
      .map((part) => renderMixedMathHtml(part))
      .join(' <span class="katex-pipe-sep">|</span> ');
  }
  if (str.includes('  ·  ')) {
    return str
      .split(/\s{2}·\s{2}/)
      .map((part) => renderMixedMathHtml(part))
      .join(' <span class="katex-dot-sep">·</span> ');
  }

  const rawTokens = tokenizeBalanced(str);
  const segments = [];

  for (let i = 0; i < rawTokens.length; i++) {
    const tok = rawTokens[i];
    const cleanWord = tok.replace(/^[(["']+|[)\]"'.,;:!?]+$/g, '');
    const lowerWord = cleanWord.toLowerCase();

    if (/^[234]D$/i.test(cleanWord)) {
      segments.push({ type: 'text', val: tok });
      continue;
    }

    // Parenthesized color/UI tags like (Amber), (Teal horizontal), [Teal Basis], (Constant)
    if (
      /^\((Amber|Teal|Indigo|Constant|Left|Right|Midpoint|Trapezoid|Int|Ext|Circumcenter|Incenter|Orthocenter|Centroid|deg|odd|even|bars|removed|match|Target|Choice|Shear)[^)]*\)$/i.test(
        tok
      ) ||
      /^\[(Teal|Amber|Indigo)[^\]]*\]$/i.test(tok)
    ) {
      segments.push({ type: 'text', val: tok });
      continue;
    }

    // Standalone middle dot '·' between uppercase header words stays text; between math stays math
    if (tok === '·') {
      const prevType = segments.length ? segments[segments.length - 1].type : 'text';
      segments.push({ type: prevType === 'math' ? 'math' : 'text', val: tok });
      continue;
    }

    // Standalone '/' or '−' or '-' between math chunks stays math
    if (tok === '/' || tok === '−' || tok === '-') {
      const prevType = segments.length ? segments[segments.length - 1].type : 'text';
      const nextTok = rawTokens[i + 1] || '';
      if (prevType === 'math' || isMathChunk(nextTok)) {
        segments.push({ type: 'math', val: tok });
        continue;
      }
    }

    // Single letter 'a' check
    if (cleanWord === 'a') {
      const prev = (rawTokens[i - 1] || '').replace(/[^A-Za-z]/g, '').toLowerCase();
      const next = rawTokens[i + 1] || '';
      const isVarA =
        /^(point|anchor|parameter|side|coefficient|bound|at|from|where|value|radius|semi|axis|constant|vector)$/.test(
          prev
        ) || /^[=,<>+\-−*/^·×)]/.test(next);
      segments.push({ type: isVarA ? 'math' : 'text', val: tok });
      continue;
    }

    // Standard math function calls (e.g., "sin θ", "cos θ", "tan θ", "det(A)", "det [a b c]")
    const isMathFuncCall =
      /^(sin|cos|tan|sec|csc|cot|sinh|cosh|tanh|arcsin|arccos|arctan|ln|log|exp|lim|det|dim|gcd|lcm|mod|max|min|sup|inf|sinc|tr|rank|curl|div|grad|erf)\b/.test(
        cleanWord
      ) &&
      (tok.includes('(') ||
        tok.includes('[') ||
        tok.includes('^') ||
        /[⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉]/.test(tok) ||
        (i + 1 < rawTokens.length && isMathChunk(rawTokens[i + 1])));

    if (isMathFuncCall) {
      segments.push({ type: 'math', val: tok });
      continue;
    }

    if (TWO_LETTER_MATH_TERMS.has(cleanWord)) {
      segments.push({ type: 'math', val: tok });
      continue;
    }

    if (
      cleanWord.length >= 2 &&
      /^[A-Za-z'-]+$/.test(cleanWord) &&
      !isMathChunk(tok) &&
      (ENGLISH_PROSE_WORDS.has(lowerWord) || /^[A-Z][a-z]{2,}$/.test(cleanWord) || /^[A-Z]{3,}$/.test(cleanWord))
    ) {
      segments.push({ type: 'text', val: tok });
      continue;
    }

    if (isMathChunk(tok)) {
      segments.push({ type: 'math', val: tok });
    } else {
      segments.push({ type: 'text', val: tok });
    }
  }

  // Merge adjacent segments of the same type
  const merged = [];
  for (const seg of segments) {
    const last = merged[merged.length - 1];
    if (last && last.type === seg.type) {
      last.val += ` ${seg.val}`;
    } else {
      merged.push({ ...seg });
    }
  }

  return merged
    .map((seg) => {
      if (seg.type === 'text') {
        return `<span class="mixed-prose-text">${escapeHtml(seg.val)}</span>`;
      }
      let mVal = seg.val;
      let trailingPunct = '';
      const punctMatch = mVal.match(/([,:;]+)$/);
      if (punctMatch) {
        trailingPunct = punctMatch[1];
        mVal = mVal.slice(0, -trailingPunct.length);
      }
      const tex = exprToLatex(mVal);
      return `${renderLatexToHtml(tex, false)}${escapeHtml(trailingPunct)}`;
    })
    .join(' ');
}

/**
 * Canvas-level KaTeX-Font Mathematical Typesetter:
 * Renders mathematical expressions with proper KaTeX_Math italic variables,
 * upright KaTeX_Main numbers/operators/functions, and true raised/lowered
 * superscripts and subscripts directly onto a 2D CanvasRenderingContext2D.
 */
export function drawCanvasMathText(ctx, rawFillText, text, x, y, maxWidth) {
  const str = String(text ?? '');
  if (!str) return;

  const fontStr = ctx.font || '500 18px "Plus Jakarta Sans", sans-serif';
  // Keep uppercase tracking badges & ClipSAT watermark in their native geometric/mono font
  if (
    str === 'ClipSAT · 3c1c' ||
    str === 'clipsat.org' ||
    str.trim() === '|' ||
    (/^[A-Z0-9\s·•—–\-:&/()']+$/.test(str) && str.length > 4)
  ) {
    if (maxWidth !== undefined) rawFillText.call(ctx, str, x, y, maxWidth);
    else rawFillText.call(ctx, str, x, y);
    return;
  }

  const sizeMatch = fontStr.match(/(\d+(?:\.\d+)?)px/);
  const basePx = sizeMatch ? Number(sizeMatch[1]) : 18;
  const weightMatch = fontStr.match(/\b([45678]00|bold)\b/);
  const weight = weightMatch ? weightMatch[1] : '600';

  const tokens = tokenizeCanvasMath(str);
  if (tokens.length === 1 && tokens[0].kind === 'plain') {
    ctx.save();
    ctx.font = `${weight} ${Math.round(basePx)}px "KaTeX_Main", "Newsreader", Georgia, serif`;
    if (maxWidth !== undefined) rawFillText.call(ctx, str, x, y, maxWidth);
    else rawFillText.call(ctx, str, x, y);
    ctx.restore();
    return;
  }

  ctx.save();
  const getFontForKind = (kind) => {
    const subPx = Math.max(9, Math.round(basePx * 0.72));
    if (kind === 'sup' || kind === 'sub') {
      return `600 ${subPx}px "KaTeX_Main", "Newsreader", Georgia, serif`;
    }
    if (kind === 'var') {
      return `italic ${weight} ${Math.round(basePx)}px "KaTeX_Math", "Newsreader", Georgia, serif`;
    }
    return `${weight} ${Math.round(basePx)}px "KaTeX_Main", "Newsreader", Georgia, serif`;
  };

  let totalW = 0;
  for (const tk of tokens) {
    ctx.font = getFontForKind(tk.kind);
    totalW += ctx.measureText(tk.text).width;
  }

  const hScale = maxWidth && totalW > maxWidth && totalW > 0 ? maxWidth / totalW : 1;
  let curX = x;

  for (const tk of tokens) {
    ctx.font = getFontForKind(tk.kind);
    const dy =
      tk.kind === 'sup'
        ? -Math.round(basePx * 0.34)
        : tk.kind === 'sub'
        ? Math.round(basePx * 0.22)
        : 0;
    const w = ctx.measureText(tk.text).width * hScale;
    if (hScale < 0.999) {
      rawFillText.call(ctx, tk.text, curX, y + dy, Math.max(4, w));
    } else {
      rawFillText.call(ctx, tk.text, curX, y + dy);
    }
    curX += w;
  }
  ctx.restore();
}

function tokenizeCanvasMath(str) {
  const normalized = str
    .replace(/\^\(([^)]+)\)/g, (_, g) => `^{${g}}`)
    .replace(/\^([A-Za-z0-9+-]+)/g, (_, g) => `^{${g}}`)
    .replace(/_\(([^)]+)\)/g, (_, g) => `_{${g}}`)
    .replace(/_([A-Za-z0-9∂+-]+)/g, (_, g) => `_{${g}}`);

  const out = [];
  let i = 0;
  while (i < normalized.length) {
    const ch = normalized[i];
    if ((ch === '^' || ch === '_') && normalized[i + 1] === '{') {
      const end = normalized.indexOf('}', i + 2);
      if (end > i + 2) {
        out.push({
          kind: ch === '^' ? 'sup' : 'sub',
          text: normalized.slice(i + 2, end),
        });
        i = end + 1;
        continue;
      }
    }
    if (SUPERSCRIPT_MAP[ch]) {
      let run = '';
      while (i < normalized.length && SUPERSCRIPT_MAP[normalized[i]]) {
        const mapped = SUPERSCRIPT_MAP[normalized[i]];
        run += mapped === '\\top ' ? 'T' : mapped;
        i++;
      }
      out.push({ kind: 'sup', text: run });
      continue;
    }
    if (SUBSCRIPT_MAP[ch]) {
      let run = '';
      while (i < normalized.length && SUBSCRIPT_MAP[normalized[i]]) {
        run += SUBSCRIPT_MAP[normalized[i]];
        i++;
      }
      out.push({ kind: 'sub', text: run });
      continue;
    }
    if (/[A-Za-z]/.test(ch)) {
      let word = '';
      while (i < normalized.length && /[A-Za-z]/.test(normalized[i])) {
        word += normalized[i];
        i++;
      }
      if (word.length === 1 && !/^[OI]$/.test(word)) {
        out.push({ kind: 'var', text: word });
      } else {
        out.push({ kind: 'plain', text: word });
      }
      continue;
    }
    let plainRun = '';
    while (
      i < normalized.length &&
      !/[A-Za-z^_]/.test(normalized[i]) &&
      !SUPERSCRIPT_MAP[normalized[i]] &&
      !SUBSCRIPT_MAP[normalized[i]]
    ) {
      plainRun += normalized[i];
      i++;
    }
    if (!plainRun) {
      plainRun = normalized[i];
      i++;
    }
    out.push({ kind: 'plain', text: plainRun });
  }
  return out;
}
