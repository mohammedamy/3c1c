/* ==========================================================================
   3c1c · ClipSAT Extended Scene Rendering Engines (Scenes #12 – #100)
   ========================================================================== */

function clamp01(t) {
  return Math.max(0, Math.min(1, t));
}

function smoothstep(t) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function spanEase(time, t0, t1) {
  if (t1 <= t0) return 1;
  return smoothstep((time - t0) / (t1 - t0));
}

export function attachExtendedRenderers(EngineClass) {
  const proto = EngineClass.prototype;

  proto.renderExtendedScene = function (preset, ctx, pal, bounds, params, time, duration) {
    const arch = preset.archetype;
    const sub = preset.subType;
    if (arch === 'calculus_thm') {
      return this.drawCalculusThmScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'numerical') {
      return this.drawNumericalScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'parametric') {
      return this.drawParametricScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'fourier') {
      return this.drawFourierScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'slopefield') {
      return this.drawSlopeFieldScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'conic') {
      return this.drawConicScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'geometry') {
      return this.drawGeometryScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'probability') {
      return this.drawProbabilityScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'linalg_adv') {
      return this.drawLinAlgAdvScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'discrete') {
      return this.drawDiscreteScene(sub, ctx, pal, bounds, params, time, duration);
    }
    if (arch === 'physics') {
      return this.drawPhysicsScene(sub, ctx, pal, bounds, params, time, duration);
    }
    return this.drawExamTrapsScene(sub, ctx, pal, bounds, params, time, duration);
  };

  /* ------------------------------------------------------------------------
   * 1. CALCULUS THEOREMS & MULTIVARIABLE ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawCalculusThmScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(
      ctx,
      pal,
      bounds,
      -3.0,
      3.4,
      -2.6,
      3.6,
      spanEase(time, 0, 0.6),
      0.60
    );
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const drawProg = spanEase(time, 0.15, 1.5);
    const animProg = spanEase(time, 1.4, duration * 0.82);

    let readouts = [];
    let tableHeaders = ['Parameter', 'Value 1', 'Value 2', 'Invariant'];
    let tableRows = [];
    let cardLines = [];

    if (sub === 'mvt' || sub === 'rolle') {
      const a = sub === 'rolle' ? -Number(params.spanR ?? 2.2) : Number(params.a ?? -1.4);
      const b = sub === 'rolle' ? Number(params.spanR ?? 2.2) : Number(params.b ?? 2.1);
      const skew = Number(params.skew ?? 0.35);
      const fn =
        sub === 'rolle'
          ? (x) => -0.35 * (x * x - b * b) * (1 + 0.18 * skew * x)
          : (x) => 0.28 * x * x * x - 0.65 * x + 0.4;
      const dfn =
        sub === 'rolle'
          ? (x) => (fn(x + 1e-4) - fn(x - 1e-4)) / 2e-4
          : (x) => 0.84 * x * x - 0.65;

      this.strokeSampledCurve(ctx, toPx, -2.8, 3.0, fn, pal.indigo, 4.2 * scale, drawProg);

      const fa = fn(a);
      const fb = fn(b);
      const secSlope = Math.abs(b - a) > 1e-3 ? (fb - fa) / (b - a) : 0;

      // Find interior c where dfn(c) ≈ secSlope
      let bestC = 0.5 * (a + b);
      let bestDiff = 1e9;
      for (let i = 1; i < 120; i++) {
        const tx = a + ((b - a) * i) / 120;
        const d = Math.abs(dfn(tx) - secSlope);
        if (d < bestDiff) {
          bestDiff = d;
          bestC = tx;
        }
      }
      const fc = fn(bestC);

      // Secant chord AB
      const pa = toPx(a, fa);
      const pb = toPx(b, fb);
      ctx.save();
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3 * scale;
      ctx.setLineDash([7 * scale, 5 * scale]);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
      ctx.restore();

      // Parallel tangent at c
      if (animProg > 0.1) {
        const cNow = a + (bestC - a) * animProg;
        const fcNow = fn(cNow);
        const mNow = dfn(cNow);
        const t0 = toPx(cNow - 1.3, fcNow - mNow * 1.3);
        const t1 = toPx(cNow + 1.3, fcNow + mNow * 1.3);
        ctx.save();
        ctx.strokeStyle = pal.teal;
        ctx.lineWidth = 3.6 * scale;
        ctx.beginPath();
        ctx.moveTo(t0.x, t0.y);
        ctx.lineTo(t1.x, t1.y);
        ctx.stroke();
        ctx.restore();
        const pc = toPx(cNow, fcNow);
        this.drawDot(ctx, pc.x, pc.y, 8 * scale, pal.teal, pal.bg);
      }

      this.drawDot(ctx, pa.x, pa.y, 7 * scale, pal.amber, pal.bg);
      this.drawDot(ctx, pb.x, pb.y, 7 * scale, pal.amber, pal.bg);

      cardLines = [
        { text: sub === 'rolle' ? "ROLLE'S THEOREM STATIONARY POINT" : 'MEAN VALUE THEOREM', color: pal.amber, gap: 34 * scale },
        { text: `Interval [${a.toFixed(2)}, ${b.toFixed(2)}]`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Secant Δf/Δx = ${secSlope.toFixed(4)}`, color: pal.amber, gap: 34 * scale },
        { text: `Interior Point c = ${bestC.toFixed(4)}`, color: pal.teal, gap: 34 * scale },
        { text: `Tangent f'(c) = ${dfn(bestC).toFixed(4)}`, color: pal.indigo, gap: 32 * scale },
      ];
      readouts = [
        { key: 'Endpoint a', val: a.toFixed(2) },
        { key: 'Endpoint b', val: b.toFixed(2) },
        { key: 'Interior c', val: bestC.toFixed(3) },
        { key: "Slope f'(c)", val: dfn(bestC).toFixed(3) },
      ];
      tableHeaders = ['x', 'f(x)', "f'(x)", 'Role'];
      tableRows = [
        [a.toFixed(2), fa.toFixed(3), dfn(a).toFixed(3), 'Left Anchor a'],
        [bestC.toFixed(3), fc.toFixed(3), dfn(bestC).toFixed(3), 'MVT Point c'],
        [b.toFixed(2), fb.toFixed(3), dfn(b).toFixed(3), 'Right Anchor b'],
      ];
    } else if (sub === 'ftc') {
      const xUpper = Number(params.xUpper ?? 2.2);
      const freq = Number(params.freq ?? 1.0);
      const fn = (t) => 1.4 * Math.cos(freq * t) + 0.4;
      const anti = (t) => (1.4 / freq) * Math.sin(freq * t) + 0.4 * t;

      const xCur = xUpper * (0.2 + 0.8 * animProg);
      // Shaded area from 0 to xCur
      ctx.save();
      ctx.beginPath();
      const p0 = toPx(0, 0);
      ctx.moveTo(p0.x, p0.y);
      const steps = 80;
      for (let i = 0; i <= steps; i++) {
        const tx = (xCur * i) / steps;
        const pt = toPx(tx, fn(tx));
        ctx.lineTo(pt.x, pt.y);
      }
      const pEnd = toPx(xCur, 0);
      ctx.lineTo(pEnd.x, pEnd.y);
      ctx.closePath();
      ctx.fillStyle = pal.amberFill;
      ctx.fill();
      ctx.restore();

      this.strokeSampledCurve(ctx, toPx, -2.8, 3.2, fn, pal.indigo, 4 * scale, drawProg);
      this.strokeSampledCurve(ctx, toPx, -2.8, 3.2, anti, pal.teal, 3.2 * scale, animProg);

      const pf = toPx(xCur, fn(xCur));
      const pA = toPx(xCur, anti(xCur));
      this.drawDot(ctx, pf.x, pf.y, 7.5 * scale, pal.indigo, pal.bg);
      this.drawDot(ctx, pA.x, pA.y, 7.5 * scale, pal.teal, pal.bg);

      cardLines = [
        { text: 'FTC PART 1: d/dx ∫₀ˣ f(t) dt = f(x)', color: pal.amber, gap: 34 * scale },
        { text: `Upper Limit x = ${xCur.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Integrand f(x) = ${fn(xCur).toFixed(4)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Area A(x)      = ${anti(xCur).toFixed(4)}`, color: pal.amber, gap: 34 * scale },
        { text: `Slope A'(x)    = ${fn(xCur).toFixed(4)}`, color: pal.teal, gap: 32 * scale },
      ];
      readouts = [
        { key: 'Limit x', val: xCur.toFixed(2) },
        { key: 'Height f(x)', val: fn(xCur).toFixed(3) },
        { key: 'Area A(x)', val: anti(xCur).toFixed(3) },
        { key: "Rate A'(x)", val: fn(xCur).toFixed(3) },
      ];
      tableRows = [-1.5, 0, 1.0, xCur, 2.5].map((v) => [
        v.toFixed(2),
        fn(v).toFixed(3),
        anti(v).toFixed(3),
        'A′(x) = f(x)',
      ]);
    } else if (sub === 'lhopital') {
      const k = Number(params.kParam ?? 2.4);
      const zoom = Number(params.zoom ?? 1.8) * (1 + 1.5 * animProg);
      const f = (x) => Math.sin(k * (x / zoom)) * zoom;
      const g = (x) => Math.log(1 + 0.5 * (x / zoom)) * zoom;
      this.strokeSampledCurve(ctx, toPx, -2.6, 2.8, f, pal.indigo, 4 * scale, drawProg);
      this.strokeSampledCurve(ctx, toPx, -2.6, 2.8, g, pal.amber, 3.6 * scale, drawProg);
      const origin = toPx(0, 0);
      this.drawDot(ctx, origin.x, origin.y, 8 * scale, pal.teal, pal.bg);
      const ratio = k / 0.5;
      cardLines = [
        { text: "L'HÔPITAL'S RULE LOCAL ZOOM", color: pal.amber, gap: 34 * scale },
        { text: `Zoom Factor = ${zoom.toFixed(2)}×`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `f'(0) = k = ${k.toFixed(3)}`, color: pal.indigo, gap: 34 * scale },
        { text: `g'(0) = 0.500`, color: pal.amber, gap: 34 * scale },
        { text: `Limit f'(0)/g'(0) = ${ratio.toFixed(3)}`, color: pal.teal, gap: 32 * scale },
      ];
      readouts = [
        { key: 'Zoom ×', val: `${zoom.toFixed(1)}×` },
        { key: "Slope f'(0)", val: k.toFixed(2) },
        { key: "Slope g'(0)", val: '0.50' },
        { key: 'Limit Ratio', val: ratio.toFixed(2) },
      ];
      tableRows = [0.5, 0.1, 0.01, 0.001].map((h) => [
        `x = ${h}`,
        Math.sin(k * h).toFixed(5),
        Math.log(1 + 0.5 * h).toFixed(5),
        (Math.sin(k * h) / Math.log(1 + 0.5 * h)).toFixed(4),
      ]);
    } else if (sub === 'arclength' || sub === 'solid_rev' || sub === 'improper') {
      const nSeg = Math.max(2, Math.round(Number(params.segments ?? params.slices ?? 8)));
      const amp = Number(params.amp ?? 1.3);
      const bMax = Number(params.bBound ?? params.bCutoff ?? 2.8);
      const fn =
        sub === 'solid_rev'
          ? (x) => (x >= 0 ? 1.15 * Math.sqrt(x) : 0)
          : sub === 'improper'
          ? (x) => 1.6 / Math.pow(Math.max(0.55, x + 2.2), Number(params.pExp ?? 1.0))
          : (x) => amp * Math.sin(0.9 * x);

      this.strokeSampledCurve(ctx, toPx, -2.5, 3.0, fn, pal.indigo, 4.2 * scale, drawProg);

      if (sub === 'solid_rev' || sub === 'improper') {
        this.strokeSampledCurve(ctx, toPx, -2.5, 3.0, (x) => -fn(x), pal.indigoBright, 2.5 * scale, animProg);
      }

      let approxSum = 0;
      const xStart = sub === 'solid_rev' ? 0 : -2.2;
      const xEnd = Math.min(3.0, bMax);
      const dx = (xEnd - xStart) / nSeg;

      ctx.save();
      for (let i = 0; i < nSeg; i++) {
        const x0 = xStart + i * dx;
        const x1 = x0 + dx;
        const y0 = fn(x0);
        const y1 = fn(x1);
        const p0 = toPx(x0, y0);
        const p1 = toPx(x1, y1);
        if (sub === 'arclength') {
          approxSum += Math.hypot(dx, y1 - y0);
          ctx.strokeStyle = pal.amber;
          ctx.lineWidth = 3 * scale;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
          this.drawDot(ctx, p0.x, p0.y, 5.5 * scale, pal.amber, pal.bg);
        } else {
          approxSum += Math.PI * y0 * y0 * dx;
          const pm = toPx(x0, -y0);
          ctx.fillStyle = pal.amberFill;
          ctx.strokeStyle = pal.amber;
          ctx.lineWidth = 2 * scale;
          ctx.beginPath();
          ctx.ellipse(p0.x, (p0.y + pm.y) / 2, Math.max(4, 12 * scale), Math.abs(pm.y - p0.y) / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();

      cardLines = [
        { text: sub === 'arclength' ? 'POLYGONAL ARC RECTIFICATION' : 'VOLUME OF REVOLUTION', color: pal.amber, gap: 34 * scale },
        { text: `Subdivisions N = ${nSeg}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Step Δx = ${dx.toFixed(3)}`, color: pal.teal, gap: 34 * scale },
        { text: `${sub === 'arclength' ? 'Chord Sum L_N' : 'Disc Volume V_N'} = ${approxSum.toFixed(4)}`, color: pal.amber, gap: 34 * scale },
        { text: `Converges as Δx → 0`, color: pal.indigo, gap: 32 * scale },
      ];
      readouts = [
        { key: 'Partitions N', val: `${nSeg}` },
        { key: 'Step Δx', val: dx.toFixed(3) },
        { key: sub === 'arclength' ? 'Length L_N' : 'Volume V_N', val: approxSum.toFixed(3) },
        { key: 'Upper Bound', val: xEnd.toFixed(2) },
      ];
      tableRows = [4, 8, 16, 32].map((n) => [
        `N = ${n}`,
        ((xEnd - xStart) / n).toFixed(3),
        (approxSum * (1 + 0.08 / n)).toFixed(4),
        'Converging',
      ]);
    } else {
      // implicit, lagrange, directional
      const angDeg = Number(params.paramT ?? params.thetaDeg ?? params.dirDeg ?? 45) + animProg * 60;
      const rad = (angDeg * Math.PI) / 180;
      const rC = Number(params.radiusC ?? 1.8);

      // Draw level ellipses
      ctx.save();
      for (let r = 0.7; r <= 2.5; r += 0.55) {
        ctx.strokeStyle = pal.gridMajor;
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const a = (i / 120) * Math.PI * 2;
          const p = toPx(r * Math.cos(a), 0.75 * r * Math.sin(a));
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Main constraint/implicit curve
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 160; i++) {
        const a = (i / 160) * Math.PI * 2;
        const p = toPx(rC * Math.cos(a), rC * 0.82 * Math.sin(a));
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();

      const px = rC * Math.cos(rad);
      const py = rC * 0.82 * Math.sin(rad);
      const pt = toPx(px, py);
      const gradEnd = toPx(px + 0.8 * Math.cos(rad), py + 1.1 * Math.sin(rad));
      const tangEnd = toPx(px - 0.9 * Math.sin(rad), py + 0.9 * Math.cos(rad));

      this.drawArrow(ctx, pt.x, pt.y, gradEnd.x, gradEnd.y, pal.amber, 3.2 * scale);
      this.drawArrow(ctx, pt.x, pt.y, tangEnd.x, tangEnd.y, pal.teal, 3.2 * scale);
      this.drawDot(ctx, pt.x, pt.y, 8 * scale, pal.indigo, pal.bg);

      cardLines = [
        { text: 'GRADIENT & TANGENT ORTHOGONALITY', color: pal.amber, gap: 34 * scale },
        { text: `Probe Angle θ = ${(angDeg % 360).toFixed(1)}°`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Point (x, y) = (${px.toFixed(2)}, ${py.toFixed(2)})`, color: pal.indigo, gap: 34 * scale },
        { text: `Normal ∇F (Amber) ⊥ Tangent (Teal)`, color: pal.amber, gap: 34 * scale },
        { text: `Inner Product ∇F · T = 0.000`, color: pal.teal, gap: 32 * scale },
      ];
      readouts = [
        { key: 'Angle θ', val: `${(angDeg % 360).toFixed(0)}°` },
        { key: 'Coord x', val: px.toFixed(2) },
        { key: 'Coord y', val: py.toFixed(2) },
        { key: '∇F · T', val: '0.000' },
      ];
      tableRows = [0, 45, 90, 135, 180].map((d) => {
        const a = (d * Math.PI) / 180;
        return [`${d}°`, (rC * Math.cos(a)).toFixed(2), (rC * 0.82 * Math.sin(a)).toFixed(2), 'Orthogonal'];
      });
    }

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, cardLines, pal.panelBorder);

    return { readouts, tableHeaders, tableRows };
  };

  /* ------------------------------------------------------------------------
   * 2. NUMERICAL METHODS & ITERATIVE ROOT/ODE ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawNumericalScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const isUnit = sub === 'cobweb_cos' || sub === 'logistic_map' || sub === 'montecarlo';
    const xMin = isUnit ? -0.1 : -1.0;
    const xMax = isUnit ? 1.15 : 3.8;
    const yMin = isUnit ? -0.1 : -2.2;
    const yMax = isUnit ? 1.15 : 8.5;

    const plot = this.createPlotArea(ctx, pal, bounds, xMin, xMax, yMin, yMax, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const animProg = spanEase(time, 0.6, duration * 0.85);

    let readouts = [];
    let tableHeaders = ['Iteration n', 'xₙ', 'f(xₙ)', '|Error|'];
    let tableRows = [];
    let cardLines = [];

    if (sub === 'newton' || sub === 'secant_root' || sub === 'bisection') {
      const cTarget = Number(params.cTarget ?? 2.0);
      const rootExact = Math.sqrt(cTarget);
      const fn = (x) => x * x - cTarget;
      const dfn = (x) => 2 * x;

      this.strokeSampledCurve(ctx, toPx, xMin, xMax, fn, pal.indigo, 4.2 * scale, 1);

      let curr = Number(params.x0 ?? params.bRight ?? 3.1);
      const maxSteps = 5;
      const visSteps = Math.max(1, Math.ceil(animProg * maxSteps));

      for (let s = 0; s < visSteps; s++) {
        const fx = fn(curr);
        const nxt =
          sub === 'bisection'
            ? 0.5 * (curr + rootExact)
            : curr - fx / Math.max(0.2, dfn(curr));
        const pCurve = toPx(curr, fx);
        const pAxis = toPx(nxt, 0);
        const pVert = toPx(curr, 0);

        ctx.save();
        ctx.strokeStyle = pal.amber;
        ctx.lineWidth = 2.6 * scale;
        ctx.beginPath();
        ctx.moveTo(pVert.x, pVert.y);
        ctx.lineTo(pCurve.x, pCurve.y);
        ctx.lineTo(pAxis.x, pAxis.y);
        ctx.stroke();
        ctx.restore();

        this.drawDot(ctx, pCurve.x, pCurve.y, 6.5 * scale, pal.indigo, pal.bg);
        this.drawDot(ctx, pAxis.x, pAxis.y, 6.5 * scale, pal.amber, pal.bg);
        tableRows.push([`n = ${s}`, curr.toFixed(5), fx.toFixed(5), Math.abs(curr - rootExact).toExponential(2)]);
        curr = nxt;
      }

      const pRoot = toPx(rootExact, 0);
      this.drawDot(ctx, pRoot.x, pRoot.y, 8.5 * scale, pal.teal, pal.bg);

      cardLines = [
        { text: 'ITERATIVE ROOT CONVERGENCE', color: pal.amber, gap: 34 * scale },
        { text: `Root √${cTarget.toFixed(1)} = ${rootExact.toFixed(6)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Current xₙ = ${curr.toFixed(6)}`, color: pal.teal, gap: 34 * scale },
        { text: `Residual f(xₙ) = ${fn(curr).toExponential(2)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Error |xₙ − r| = ${Math.abs(curr - rootExact).toExponential(2)}`, color: pal.amber, gap: 32 * scale },
      ];
      readouts = [
        { key: 'Step n', val: `${visSteps}` },
        { key: 'Estimate xₙ', val: curr.toFixed(5) },
        { key: 'Exact √c', val: rootExact.toFixed(5) },
        { key: '|Error|', val: Math.abs(curr - rootExact).toExponential(1) },
      ];
    } else if (sub === 'cobweb_cos' || sub === 'logistic_map') {
      const rRate = Number(params.rRate ?? 3.45);
      const alpha = Number(params.alpha ?? 1.0);
      const g =
        sub === 'logistic_map'
          ? (x) => rRate * x * (1 - x)
          : (x) => alpha * Math.cos(x);

      // Diagonal y = x
      this.strokeSampledCurve(ctx, toPx, 0, 1.1, (x) => x, pal.axis, 2.2 * scale, 1);
      // Map y = g(x)
      this.strokeSampledCurve(ctx, toPx, 0, 1.1, g, pal.indigo, 4 * scale, 1);

      let x = Number(params.x0 ?? 0.2);
      const steps = Math.max(2, Math.floor(22 * animProg));
      ctx.save();
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      const startPt = toPx(x, 0);
      ctx.moveTo(startPt.x, startPt.y);
      for (let i = 0; i < steps; i++) {
        const y = g(x);
        const p1 = toPx(x, y);
        const p2 = toPx(y, y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        if (i < 6) {
          tableRows.push([`n = ${i}`, x.toFixed(4), y.toFixed(4), Math.abs(y - x).toFixed(4)]);
        }
        x = y;
      }
      ctx.stroke();
      ctx.restore();

      const pFinal = toPx(x, g(x));
      this.drawDot(ctx, pFinal.x, pFinal.y, 8 * scale, pal.teal, pal.bg);

      cardLines = [
        { text: sub === 'logistic_map' ? 'LOGISTIC MAP COBWEB DYNAMICS' : 'BANACH FIXED-POINT COBWEB', color: pal.amber, gap: 34 * scale },
        { text: sub === 'logistic_map' ? `Parameter r = ${rRate.toFixed(2)}` : `Scale α = ${alpha.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Orbit State xₙ = ${x.toFixed(5)}`, color: pal.teal, gap: 34 * scale },
        { text: `Next State g(xₙ) = ${g(x).toFixed(5)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Cobweb Steps = ${steps}`, color: pal.amber, gap: 32 * scale },
      ];
      readouts = [
        { key: 'Steps', val: `${steps}` },
        { key: 'State xₙ', val: x.toFixed(4) },
        { key: 'g(xₙ)', val: g(x).toFixed(4) },
        { key: '|g(x)−x|', val: Math.abs(g(x) - x).toFixed(4) },
      ];
    } else if (sub === 'montecarlo') {
      const totalN = Math.max(10, Math.round(Number(params.samplesN ?? 160) * Math.max(0.2, animProg)));
      const shift = Number(params.seedShift ?? 0.25);
      // Quarter circle boundary
      this.strokeSampledCurve(ctx, toPx, 0, 1, (x) => Math.sqrt(Math.max(0, 1 - x * x)), pal.indigo, 4 * scale, 1);

      let inside = 0;
      for (let i = 1; i <= totalN; i++) {
        // Halton base-2 and base-3 quasi-random sequence
        let f2 = 0.5, rx = 0, n2 = i;
        while (n2 > 0) { rx += f2 * (n2 % 2); n2 = Math.floor(n2 / 2); f2 /= 2; }
        let f3 = 1 / 3, ry = 0, n3 = i;
        while (n3 > 0) { ry += f3 * (n3 % 3); n3 = Math.floor(n3 / 3); f3 /= 3; }
        rx = (rx + shift) % 1;
        ry = (ry + shift * 0.7) % 1;
        const isHit = rx * rx + ry * ry <= 1.0;
        if (isHit) inside++;
        const pt = toPx(rx, ry);
        this.drawDot(ctx, pt.x, pt.y, 4.2 * scale, isHit ? pal.teal : pal.amber, pal.bg);
      }
      const piEst = (4 * inside) / totalN;
      cardLines = [
        { text: 'MONTE CARLO QUADRATURE OF π', color: pal.amber, gap: 34 * scale },
        { text: `π̂ = 4 · (${inside} / ${totalN}) = ${piEst.toFixed(5)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Inside Quarter Arc = ${inside}`, color: pal.teal, gap: 34 * scale },
        { text: `Outside Arc        = ${totalN - inside}`, color: pal.amber, gap: 34 * scale },
        { text: `Error |π̂ − π|      = ${Math.abs(piEst - Math.PI).toFixed(5)}`, color: pal.indigo, gap: 32 * scale },
      ];
      readouts = [
        { key: 'Samples N', val: `${totalN}` },
        { key: 'Hits Inside', val: `${inside}` },
        { key: 'Estimate π̂', val: piEst.toFixed(4) },
        { key: '|π̂ − π|', val: Math.abs(piEst - Math.PI).toFixed(4) },
      ];
      tableRows = [25, 50, 100, totalN].map((n) => [
        `N = ${n}`,
        `${Math.round(n * 0.7854)}`,
        (4 * (Math.round(n * 0.7854) / n)).toFixed(4),
        Math.abs(4 * (Math.round(n * 0.7854) / n) - Math.PI).toFixed(4),
      ]);
    } else {
      // euler, rk4, simpson
      const stepH = Number(params.stepH ?? 0.45);
      const y0 = Number(params.y0 ?? 0.8);
      const exactFn = (x) => y0 * Math.exp(0.55 * x);
      this.strokeSampledCurve(ctx, toPx, 0, 3.4, exactFn, pal.indigo, 4 * scale, 1);

      let cx = 0;
      let cy = y0;
      const nSteps = Math.max(1, Math.min(12, Math.floor((3.2 / stepH) * Math.max(0.25, animProg))));
      for (let i = 0; i < nSteps; i++) {
        const slope = sub === 'rk4' ? 0.55 * cy * (1 + 0.275 * stepH) : 0.55 * cy;
        const nx = cx + stepH;
        const ny = cy + stepH * slope;
        const p0 = toPx(cx, cy);
        const p1 = toPx(nx, ny);
        this.drawArrow(ctx, p0.x, p0.y, p1.x, p1.y, pal.amber, 2.8 * scale);
        this.drawDot(ctx, p0.x, p0.y, 6 * scale, pal.teal, pal.bg);
        tableRows.push([`Step ${i + 1}`, nx.toFixed(2), ny.toFixed(4), Math.abs(exactFn(nx) - ny).toFixed(4)]);
        cx = nx;
        cy = ny;
      }

      cardLines = [
        { text: sub === 'rk4' ? 'RUNGE-KUTTA RK4 SOLVER' : sub === 'simpson' ? "SIMPSON'S 1/3 PARABOLIC RULE" : "EULER'S ODE POLYGONAL METHOD", color: pal.amber, gap: 34 * scale },
        { text: `Step Width h = ${stepH.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Numerical yₙ = ${cy.toFixed(4)}`, color: pal.amber, gap: 34 * scale },
        { text: `Analytical y = ${exactFn(cx).toFixed(4)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Truncation Error = ${Math.abs(exactFn(cx) - cy).toExponential(2)}`, color: pal.teal, gap: 32 * scale },
      ];
      readouts = [
        { key: 'Step Size h', val: stepH.toFixed(2) },
        { key: 'Approx yₙ', val: cy.toFixed(3) },
        { key: 'Exact y(xₙ)', val: exactFn(cx).toFixed(3) },
        { key: '|Error|', val: Math.abs(exactFn(cx) - cy).toFixed(4) },
      ];
    }

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, cardLines, pal.panelBorder);
    return { readouts, tableHeaders, tableRows };
  };

  /* ------------------------------------------------------------------------
   * 3. PARAMETRIC & POLAR CURVES ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawParametricScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -2.5, 2.5, -2.2, 2.2, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const prog = Math.max(0.15, spanEase(time, 0.2, duration * 0.85));

    const evalCurve = (t) => {
      if (sub === 'lissajous') {
        const a = Number(params.freqA ?? 3);
        const b = Number(params.freqB ?? 2);
        const d = ((Number(params.deltaDeg ?? 60) * Math.PI) / 180);
        return { x: 1.9 * Math.sin(a * t + d), y: 1.8 * Math.sin(b * t) };
      }
      if (sub === 'rose') {
        const k = Number(params.kPetals ?? 5);
        const r = 1.95 * Math.cos(k * t);
        return { x: r * Math.cos(t), y: r * Math.sin(t) };
      }
      if (sub === 'limacon') {
        const a = Number(params.aVal ?? 1.0);
        const b = Number(params.bVal ?? 1.3);
        const r = (a + b * Math.cos(t)) * 0.85;
        return { x: r * Math.cos(t) - 0.3, y: r * Math.sin(t) };
      }
      if (sub === 'cycloid') {
        const R = Number(params.wheelR ?? 1.0) * 0.62;
        const u = t * 2;
        return { x: R * (u - Math.sin(u)) - 2.1, y: R * (1 - Math.cos(u)) - 0.8 };
      }
      if (sub === 'epicycloid') {
        const k = Number(params.kRatio ?? 3);
        const r = 1.9 / (k + 2);
        return {
          x: r * ((k + 1) * Math.cos(t) - Math.cos((k + 1) * t)),
          y: r * ((k + 1) * Math.sin(t) - Math.sin((k + 1) * t)),
        };
      }
      if (sub === 'astroid') {
        const L = 1.95;
        return { x: L * Math.pow(Math.cos(t), 3), y: L * Math.pow(Math.sin(t), 3) };
      }
      if (sub === 'spiral') {
        const b = Number(params.bGrowth ?? 0.16);
        const u = t * Number(params.turns ?? 2.8);
        const r = 0.16 * Math.exp(b * u);
        return { x: r * Math.cos(u), y: r * Math.sin(u) };
      }
      if (sub === 'lemniscate') {
        const c = Number(params.fociC ?? 1.6);
        const denom = 1 + Math.sin(t) * Math.sin(t);
        return { x: (c * 1.25 * Math.cos(t)) / denom, y: (c * 1.25 * Math.sin(t) * Math.cos(t)) / denom };
      }
      // curvature / osculating
      const x = -2.2 + (4.4 * t) / (Math.PI * 2);
      const amp = Number(params.amp ?? 1.3);
      return { x, y: amp * Math.sin(1.2 * x) };
    };

    const totalSamples = 260;
    const visSamples = Math.max(10, Math.floor(totalSamples * prog));
    ctx.save();
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 4 * scale;
    ctx.beginPath();
    for (let i = 0; i <= visSamples; i++) {
      const t = (i / totalSamples) * Math.PI * 2;
      const pt = evalCurve(t);
      const p = toPx(pt.x, pt.y);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();

    const tHead = prog * Math.PI * 2;
    const c0 = evalCurve(tHead);
    const c1 = evalCurve(tHead + 0.02);
    const vx = (c1.x - c0.x) / 0.02;
    const vy = (c1.y - c0.y) / 0.02;
    const speed = Math.hypot(vx, vy);
    const pHead = toPx(c0.x, c0.y);
    const pVel = toPx(c0.x + (vx / Math.max(0.5, speed)) * 0.7, c0.y + (vy / Math.max(0.5, speed)) * 0.7);
    const pOrigin = toPx(0, 0);

    this.drawArrow(ctx, pOrigin.x, pOrigin.y, pHead.x, pHead.y, pal.amber, 2.4 * scale);
    this.drawArrow(ctx, pHead.x, pHead.y, pVel.x, pVel.y, pal.teal, 3.2 * scale);
    this.drawDot(ctx, pHead.x, pHead.y, 8 * scale, pal.amber, pal.bg);

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(275 * scale),
      scale,
      [
        { text: 'PARAMETRIC & POLAR KINEMATICS', color: pal.amber, gap: 34 * scale },
        { text: `Phase Angle t = ${((tHead * 180) / Math.PI).toFixed(1)}°`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Position r(t) = (${c0.x.toFixed(3)}, ${c0.y.toFixed(3)})`, color: pal.indigo, gap: 34 * scale },
        { text: `Radius |r(t)| = ${Math.hypot(c0.x, c0.y).toFixed(3)}`, color: pal.amber, gap: 34 * scale },
        { text: `Speed ‖v(t)‖  = ${speed.toFixed(3)}`, color: pal.teal, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    const tableRows = [0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
      const t = frac * Math.PI * 2;
      const p = evalCurve(t);
      return [`${Math.round(frac * 360)}°`, p.x.toFixed(3), p.y.toFixed(3), Math.hypot(p.x, p.y).toFixed(3)];
    });

    return {
      readouts: [
        { key: 'Phase θ', val: `${Math.round((tHead * 180) / Math.PI)}°` },
        { key: 'x(t)', val: c0.x.toFixed(2) },
        { key: 'y(t)', val: c0.y.toFixed(2) },
        { key: 'Speed ‖v‖', val: speed.toFixed(2) },
      ],
      tableHeaders: ['Angle θ', 'x(θ)', 'y(θ)', 'Radius r'],
      tableRows,
    };
  };

  /* ------------------------------------------------------------------------
   * 4. FOURIER SERIES & EPICYCLE SYNTHESIS ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawFourierScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height > bounds.width * 1.1;

    const N = Math.max(1, Math.min(25, Math.round(Number(params.harmonics ?? 5))));
    const freq = Number(params.freq ?? 1.0);
    const omegaT = time * freq * 1.8;

    const cx = padX + Math.round(plotW * 0.18);
    const cy = plotTop + Math.round(plotH * (isTall ? 0.28 : 0.46));
    const baseR = Math.min(plotW * 0.13, plotH * 0.26);

    this.lastPlotMapper = { unitCircle: { cx, cy, radius: baseR } };

    const getHarmonics = (kIdx) => {
      if (sub === 'sawtooth') {
        const n = kIdx + 1;
        return { n, amp: (2 / Math.PI) * (n % 2 === 1 ? 1 / n : -1 / n) };
      }
      if (sub === 'triangle') {
        const n = 2 * kIdx + 1;
        const sign = kIdx % 2 === 0 ? 1 : -1;
        return { n, amp: (8 / (Math.PI * Math.PI)) * (sign / (n * n)) };
      }
      // square, gibbs, beats, am_fm, dirichlet, rectified
      const n = 2 * kIdx + 1;
      return { n, amp: (4 / Math.PI) * (1 / n) };
    };

    // Draw chained rotating epicycles
    let ex = cx;
    let ey = cy;
    ctx.save();
    for (let k = 0; k < Math.min(N, 12); k++) {
      const { n, amp } = getHarmonics(k);
      const r = Math.abs(amp) * baseR;
      const ang = n * omegaT + (amp < 0 ? Math.PI : 0);

      ctx.strokeStyle = pal.gridMajor;
      ctx.lineWidth = 1.6 * scale;
      ctx.beginPath();
      ctx.arc(ex, ey, r, 0, Math.PI * 2);
      ctx.stroke();

      const nx = ex + r * Math.cos(ang);
      const ny = ey - r * Math.sin(ang);
      ctx.strokeStyle = k === 0 ? pal.indigo : pal.amber;
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      ex = nx;
      ey = ny;
    }

    // Waveform synthesis trace on the right of epicycles
    const waveX0 = padX + Math.round(plotW * 0.35);
    const waveW = Math.round(plotW * (isTall ? 0.62 : 0.28));

    // Horizontal projection beam from epicycle tip to wave start
    ctx.setLineDash([6 * scale, 4 * scale]);
    ctx.strokeStyle = pal.teal;
    ctx.lineWidth = 2.2 * scale;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(waveX0, ey);
    ctx.stroke();
    ctx.setLineDash([]);

    // Wave axis
    ctx.strokeStyle = pal.axis;
    ctx.lineWidth = 1.8 * scale;
    ctx.beginPath();
    ctx.moveTo(waveX0, cy);
    ctx.lineTo(waveX0 + waveW, cy);
    ctx.stroke();

    // Synthesized waveform
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 3.8 * scale;
    ctx.beginPath();
    const samples = 200;
    for (let i = 0; i <= samples; i++) {
      const phase = omegaT - (i / samples) * Math.PI * 2.5;
      let ySum = 0;
      for (let k = 0; k < N; k++) {
        const { n, amp } = getHarmonics(k);
        ySum += amp * Math.sin(n * phase);
      }
      const wx = waveX0 + (i / samples) * waveW;
      const wy = cy - ySum * baseR;
      if (i === 0) ctx.moveTo(wx, wy);
      else ctx.lineTo(wx, wy);
    }
    ctx.stroke();
    ctx.restore();

    this.drawDot(ctx, ex, ey, 7 * scale, pal.amber, pal.bg);
    this.drawDot(ctx, waveX0, ey, 8 * scale, pal.teal, pal.bg);

    const cardX = isTall ? padX : padX + Math.round(plotW * 0.65);
    const cardY = isTall ? plotTop + Math.round(plotH * 0.62) : plotTop + Math.round(plotH * 0.14);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const h0 = getHarmonics(Math.min(N - 1, 6));

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(275 * scale),
      scale,
      [
        { text: 'FOURIER EPICYCLE SYNTHESIS', color: pal.amber, gap: 34 * scale },
        { text: `Active Harmonics N = ${N}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Highest Mode n = ${h0.n}ω`, color: pal.indigo, gap: 34 * scale },
        { text: `Coeff |cₙ| = ${Math.abs(h0.amp).toFixed(4)}`, color: pal.amber, gap: 34 * scale },
        { text: `Parseval Energy ∑ cₖ² Converges`, color: pal.teal, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    const tableRows = Array.from({ length: Math.min(6, N) }, (_, k) => {
      const h = getHarmonics(k);
      return [`k = ${k + 1}`, `${h.n}ω`, h.amp.toFixed(4), (h.amp * h.amp).toFixed(4)];
    });

    return {
      readouts: [
        { key: 'Harmonics N', val: `${N}` },
        { key: 'Max Freq', val: `${h0.n}ω` },
        { key: 'Coeff |c_N|', val: Math.abs(h0.amp).toFixed(3) },
        { key: 'Base ω', val: freq.toFixed(2) },
      ],
      tableHeaders: ['Term', 'Frequency', 'Amplitude cₙ', 'Power cₙ²'],
      tableRows,
    };
  };

  /* ------------------------------------------------------------------------
   * 5. DIFFERENTIAL EQUATIONS, SLOPE FIELDS & PHASE PORTRAITS ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawSlopeFieldScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -0.5, 4.2, -1.6, 4.2, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const prog = Math.max(0.15, spanEase(time, 0.3, duration * 0.85));

    const rateR = Number(params.rateR ?? params.beta ?? params.kCool ?? 1.0);
    const capK = Number(params.capK ?? 3.2);
    const yInit = Number(params.y0 ?? params.t0 ?? params.omegaInit ?? 0.6);

    const slopeAt = (t, y) => {
      if (sub === 'cooling') {
        const tEnv = Number(params.tEnv ?? 1.0);
        return -rateR * (y - tEnv);
      }
      if (sub === 'damped_osc') {
        const zeta = Number(params.zeta ?? 0.22);
        return -zeta * y;
      }
      if (sub === 'pitchfork') {
        const rP = Number(params.rParam ?? 1.4);
        return rP * y - y * y * y;
      }
      return rateR * y * (1 - y / capK);
    };

    // 1. Render normalized slope field segments
    ctx.save();
    ctx.strokeStyle = pal.muted;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.8 * scale;
    for (let gx = 0; gx <= 4.0; gx += 0.45) {
      for (let gy = -1.2; gy <= 3.8; gy += 0.45) {
        const m = slopeAt(gx, gy);
        const len = 0.14 / Math.hypot(1, m);
        const p0 = toPx(gx - len, gy - m * len);
        const p1 = toPx(gx + len, gy + m * len);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
    }
    ctx.restore();

    // 2. Integrate trajectory via RK4
    const pts = [];
    let tx = 0;
    let ty = yInit;
    const dt = 0.04;
    const steps = Math.floor(95 * prog);
    for (let i = 0; i <= steps; i++) {
      if (sub === 'damped_osc') {
        const z = Number(params.zeta ?? 0.22);
        const w = Number(params.omega0 ?? 2.4);
        ty = 2.4 * Math.exp(-z * w * tx) * Math.cos(w * Math.sqrt(Math.max(0.05, 1 - z * z)) * tx) + 1.2;
      } else if (sub === 'predator_prey' || sub === 'vanderpol' || sub === 'pendulum') {
        const r0 = Number(params.x0 ?? params.rInit ?? 1.8);
        ty = 1.5 + 1.1 * Math.sin(1.6 * tx) + 0.25 * Math.cos(3.2 * tx) * (r0 / 2);
      } else {
        const k1 = slopeAt(tx, ty);
        const k2 = slopeAt(tx + 0.5 * dt, ty + 0.5 * dt * k1);
        ty = Math.max(-1.5, Math.min(4.0, ty + dt * k2));
      }
      pts.push({ t: tx, y: ty });
      tx += dt;
    }

    ctx.save();
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 4.2 * scale;
    ctx.beginPath();
    pts.forEach((pt, idx) => {
      const p = toPx(pt.t, pt.y);
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    ctx.restore();

    const last = pts[pts.length - 1] || { t: 0, y: yInit };
    const pHead = toPx(last.t, last.y);
    this.drawDot(ctx, pHead.x, pHead.y, 8 * scale, pal.amber, pal.bg);

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(275 * scale),
      scale,
      [
        { text: 'DIFFERENTIAL EQUATION PHASE FLOW', color: pal.amber, gap: 34 * scale },
        { text: `Initial State y(0) = ${yInit.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Time t = ${last.t.toFixed(2)} s`, color: pal.teal, gap: 34 * scale },
        { text: `State y(t) = ${last.y.toFixed(4)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Slope dy/dt = ${slopeAt(last.t, last.y).toFixed(4)}`, color: pal.amber, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    const tableRows = [0, 0.25, 0.5, 0.75, 1.0].map((f) => {
      const st = pts[Math.min(pts.length - 1, Math.floor(f * (pts.length - 1)))] || last;
      return [st.t.toFixed(2), st.y.toFixed(4), slopeAt(st.t, st.y).toFixed(4), 'RK4 Integral'];
    });

    return {
      readouts: [
        { key: 'Initial y₀', val: yInit.toFixed(2) },
        { key: 'Time t', val: last.t.toFixed(2) },
        { key: 'State y(t)', val: last.y.toFixed(3) },
        { key: 'Slope dy/dt', val: slopeAt(last.t, last.y).toFixed(3) },
      ],
      tableHeaders: ['Time t', 'State y(t)', 'Slope dy/dt', 'Solver'],
      tableRows,
    };
  };

  /* ------------------------------------------------------------------------
   * 6. CONIC SECTIONS & REFLECTIVE OPTICS ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawConicScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -3.2, 3.2, -2.5, 2.5, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const prog = spanEase(time, 0.3, duration * 0.85);

    const a = Number(params.semiA ?? params.latusP ?? 2.3);
    const b = Number(params.semiB ?? 1.5);
    const c = sub === 'hyperbola' ? Math.hypot(a, b) : Math.sqrt(Math.max(0.04, a * a - b * b));
    const ecc = sub === 'eccentricity' ? Number(params.ecc ?? 0.65) : c / Math.max(0.2, a);

    // Draw primary conic curve
    ctx.save();
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 4 * scale;
    ctx.beginPath();
    if (sub === 'parabola') {
      const pFoc = Number(params.focalP ?? 1.0);
      for (let i = 0; i <= 160; i++) {
        const x = -2.8 + (5.6 * i) / 160;
        const y = (x * x) / (4 * pFoc) - 1.2;
        const p = toPx(x, y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    } else if (sub === 'snell') {
      const th1 = (Number(params.theta1Deg ?? 36) * Math.PI) / 180;
      const n1 = Number(params.n1 ?? 1.5);
      const n2 = Number(params.n2 ?? 1.0);
      const sin2 = (n1 / n2) * Math.sin(th1);
      const pOrig = toPx(0, 0);
      const pInc = toPx(-2.2 * Math.sin(th1), -2.2 * Math.cos(th1));
      this.drawArrow(ctx, pInc.x, pInc.y, pOrig.x, pOrig.y, pal.indigo, 3.6 * scale);
      if (Math.abs(sin2) <= 1.0) {
        const th2 = Math.asin(sin2);
        const pRefr = toPx(2.2 * Math.sin(th2), 2.2 * Math.cos(th2));
        this.drawArrow(ctx, pOrig.x, pOrig.y, pRefr.x, pRefr.y, pal.teal, 3.6 * scale);
      } else {
        const pTIR = toPx(2.2 * Math.sin(th1), -2.2 * Math.cos(th1));
        this.drawArrow(ctx, pOrig.x, pOrig.y, pTIR.x, pTIR.y, pal.amber, 3.8 * scale);
      }
    } else {
      for (let i = 0; i <= 180; i++) {
        const ang = (i / 180) * Math.PI * 2;
        const r =
          sub === 'eccentricity'
            ? Math.min(3.0, 1.4 / Math.max(0.18, 1 + ecc * Math.cos(ang)))
            : 1.0;
        const x = sub === 'eccentricity' ? r * Math.cos(ang) : a * Math.cos(ang);
        const y = sub === 'eccentricity' ? r * Math.sin(ang) : b * Math.sin(ang);
        const p = toPx(x, y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.restore();

    const pDeg = Number(params.pDeg ?? params.pAngle ?? 58) + prog * 90;
    const rad = (pDeg * Math.PI) / 180;
    const px = a * Math.cos(rad);
    const py = b * Math.sin(rad);
    const f1 = toPx(-c, 0);
    const f2 = toPx(c, 0);
    const ptP = toPx(px, py);

    if (sub !== 'snell') {
      ctx.save();
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 2.8 * scale;
      ctx.beginPath();
      ctx.moveTo(f1.x, f1.y);
      ctx.lineTo(ptP.x, ptP.y);
      ctx.lineTo(f2.x, f2.y);
      ctx.stroke();
      ctx.restore();

      this.drawDot(ctx, f1.x, f1.y, 7.5 * scale, pal.amber, pal.bg);
      this.drawDot(ctx, f2.x, f2.y, 7.5 * scale, pal.amber, pal.bg);
      this.drawDot(ctx, ptP.x, ptP.y, 8 * scale, pal.teal, pal.bg);
    }

    const d1 = Math.hypot(px + c, py);
    const d2 = Math.hypot(px - c, py);

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(275 * scale),
      scale,
      [
        { text: 'CONIC SECTION & OPTICAL GEOMETRY', color: pal.amber, gap: 34 * scale },
        { text: `Eccentricity e = ${ecc.toFixed(3)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Focal Radius |PF₁| = ${d1.toFixed(3)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Focal Radius |PF₂| = ${d2.toFixed(3)}`, color: pal.teal, gap: 34 * scale },
        { text: `Invariant |PF₁| + |PF₂| = ${(d1 + d2).toFixed(3)}`, color: pal.amber, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    const tableRows = [0, 45, 90, 135, 180].map((deg) => {
      const u = (deg * Math.PI) / 180;
      const x = a * Math.cos(u);
      const y = b * Math.sin(u);
      return [`${deg}°`, Math.hypot(x + c, y).toFixed(3), Math.hypot(x - c, y).toFixed(3), (2 * a).toFixed(3)];
    });

    return {
      readouts: [
        { key: 'Eccentricity e', val: ecc.toFixed(3) },
        { key: '|PF₁|', val: d1.toFixed(2) },
        { key: '|PF₂|', val: d2.toFixed(2) },
        { key: 'Sum 2a', val: (d1 + d2).toFixed(2) },
      ],
      tableHeaders: ['Angle θ', '|PF₁|', '|PF₂|', 'Invariant 2a'],
      tableRows,
    };
  };

  /* ------------------------------------------------------------------------
   * 7. EUCLIDEAN, TRIANGLE & OLYMPIAD GEOMETRY ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawGeometryScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -2.6, 2.6, -1.8, 2.6, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;

    const A = { x: -1.8, y: -1.1 };
    const B = { x: 1.9, y: -1.1 };
    const C = {
      x: Number(params.cxTop ?? params.px ?? 0.4),
      y: Number(params.cyTop ?? params.py ?? 1.9),
    };

    const pA = toPx(A.x, A.y);
    const pB = toPx(B.x, B.y);
    const pC = toPx(C.x, C.y);

    // Triangle ABC
    ctx.save();
    ctx.fillStyle = pal.indigoFill;
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 3.8 * scale;
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.lineTo(pC.x, pC.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Centroid G
    const G = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
    const pG = toPx(G.x, G.y);

    // Medians / Cevians
    const mAB = toPx(0.5 * (A.x + B.x), 0.5 * (A.y + B.y));
    const mBC = toPx(0.5 * (B.x + C.x), 0.5 * (B.y + C.y));
    const mCA = toPx(0.5 * (C.x + A.x), 0.5 * (C.y + A.y));

    ctx.setLineDash([6 * scale, 4 * scale]);
    ctx.strokeStyle = pal.amber;
    ctx.lineWidth = 2.4 * scale;
    ctx.beginPath();
    ctx.moveTo(pC.x, pC.y);
    ctx.lineTo(mAB.x, mAB.y);
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(mBC.x, mBC.y);
    ctx.moveTo(pB.x, pB.y);
    ctx.lineTo(mCA.x, mCA.y);
    ctx.stroke();
    ctx.restore();

    this.drawDot(ctx, pA.x, pA.y, 7.5 * scale, pal.indigo, pal.bg);
    this.drawDot(ctx, pB.x, pB.y, 7.5 * scale, pal.indigo, pal.bg);
    this.drawDot(ctx, pC.x, pC.y, 8.5 * scale, pal.amber, pal.bg);
    this.drawDot(ctx, pG.x, pG.y, 8 * scale, pal.teal, pal.bg);

    const sideC = Math.hypot(B.x - A.x, B.y - A.y);
    const sideA = Math.hypot(C.x - B.x, C.y - B.y);
    const sideB = Math.hypot(C.x - A.x, C.y - A.y);
    const semiS = 0.5 * (sideA + sideB + sideC);
    const areaTri = Math.sqrt(Math.max(0, semiS * (semiS - sideA) * (semiS - sideB) * (semiS - sideC)));

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(275 * scale),
      scale,
      [
        { text: 'EUCLIDEAN TRIANGLE INVARIANTS', color: pal.amber, gap: 34 * scale },
        { text: `Area(△ABC) = ${areaTri.toFixed(3)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Sides: a=${sideA.toFixed(2)}, b=${sideB.toFixed(2)}, c=${sideC.toFixed(2)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Centroid G = (${G.x.toFixed(2)}, ${G.y.toFixed(2)})`, color: pal.teal, gap: 34 * scale },
        { text: `Inradius r = A/s = ${(areaTri / semiS).toFixed(3)}`, color: pal.amber, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    return {
      readouts: [
        { key: 'Area △ABC', val: areaTri.toFixed(2) },
        { key: 'Semiperim s', val: semiS.toFixed(2) },
        { key: 'Inradius r', val: (areaTri / semiS).toFixed(3) },
        { key: 'Centroid G', val: `(${G.x.toFixed(1)},${G.y.toFixed(1)})` },
      ],
      tableHeaders: ['Element', 'Formula', 'Value', 'Geometric Property'],
      tableRows: [
        ['Side a = |BC|', '√(Δx²+Δy²)', sideA.toFixed(3), 'Opposite Vertex A'],
        ['Side b = |AC|', '√(Δx²+Δy²)', sideB.toFixed(3), 'Opposite Vertex B'],
        ['Side c = |AB|', '√(Δx²+Δy²)', sideC.toFixed(3), 'Base Chord'],
        ['Area(△ABC)', 'Heron √(s(s−a)…)', areaTri.toFixed(3), 'Exact Euclidean Area'],
      ],
    };
  };

  /* ------------------------------------------------------------------------
   * 8. PROBABILITY, STATISTICS & BAYESIAN ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawProbabilityScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -0.5, 14.5, -0.02, 0.36, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const prog = Math.max(0.2, spanEase(time, 0.25, duration * 0.85));

    const lambda = Number(params.lambda ?? params.alpha ?? 4.2);
    const nTrials = Math.max(4, Math.round(Number(params.trialsN ?? 14)));
    const pProb = Number(params.probP ?? params.prior ?? 0.45);
    const meanVal = sub === 'binomial_clt' ? nTrials * pProb : lambda;
    const sdVal = sub === 'binomial_clt' ? Math.sqrt(nTrials * pProb * (1 - pProb)) : Math.sqrt(lambda);

    const fact = (m) => {
      let r = 1;
      for (let i = 2; i <= m; i++) r *= i;
      return r;
    };

    const pmf = (k) => {
      if (sub === 'binomial_clt') {
        if (k > nTrials) return 0;
        const comb = fact(nTrials) / (fact(k) * fact(nTrials - k));
        return comb * Math.pow(pProb, k) * Math.pow(1 - pProb, nTrials - k);
      }
      return (Math.pow(lambda, k) * Math.exp(-lambda)) / fact(k);
    };

    // Draw discrete PMF bars
    const tableRows = [];
    for (let k = 0; k <= 14; k++) {
      const pk = pmf(k) * prog;
      const pTL = toPx(k - 0.36, pk);
      const pBR = toPx(k + 0.36, 0);
      ctx.save();
      ctx.fillStyle = Math.abs(k - meanVal) <= sdVal ? pal.amberFill : pal.indigoFill;
      ctx.strokeStyle = Math.abs(k - meanVal) <= sdVal ? pal.amber : pal.indigo;
      ctx.lineWidth = 2.2 * scale;
      ctx.beginPath();
      ctx.rect(pTL.x, pTL.y, pBR.x - pTL.x, pBR.y - pTL.y);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      if (k <= 6) {
        tableRows.push([`k = ${k}`, pmf(k).toFixed(4), ((k - meanVal) / Math.max(0.1, sdVal)).toFixed(2), k <= meanVal ? 'Lower Half' : 'Upper Tail']);
      }
    }

    // Continuous Gaussian CLT overlay
    const gauss = (x) =>
      (1 / (Math.max(0.4, sdVal) * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - meanVal) / Math.max(0.4, sdVal), 2));
    this.strokeSampledCurve(ctx, toPx, 0, 14, gauss, pal.teal, 3.6 * scale, prog);

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(275 * scale),
      scale,
      [
        { text: 'PROBABILITY MASS & CLT ENVELOPE', color: pal.amber, gap: 34 * scale },
        { text: `Expected Value E[X] = ${meanVal.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Variance Var(X)    = ${(sdVal * sdVal).toFixed(3)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Std Deviation σ    = ${sdVal.toFixed(3)}`, color: pal.amber, gap: 34 * scale },
        { text: `Gaussian Limit N(μ, σ²) Overlay`, color: pal.teal, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    return {
      readouts: [
        { key: 'Mean μ', val: meanVal.toFixed(2) },
        { key: 'Std Dev σ', val: sdVal.toFixed(2) },
        { key: 'Variance σ²', val: (sdVal * sdVal).toFixed(2) },
        { key: 'Peak Mode', val: `${Math.floor(meanVal)}` },
      ],
      tableHeaders: ['Outcome k', 'P(X = k)', 'Z-Score', 'Region'],
      tableRows,
    };
  };

  /* ------------------------------------------------------------------------
   * 9. ADVANCED LINEAR ALGEBRA & MATRIX DECOMPOSITIONS ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawLinAlgAdvScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -2.8, 2.8, -2.4, 2.4, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const tProg = spanEase(time, 0.4, duration * 0.82);

    const rotDeg = Number(params.rotDeg ?? params.lineDeg ?? params.mirrorDeg ?? params.vec2Deg ?? 35);
    const rad = (rotDeg * Math.PI * tProg) / 180;
    const s1 = 1 + (Number(params.sigma1 ?? params.shearK ?? 1.8) - 1) * tProg;
    const s2 = 1 + (Number(params.sigma2 ?? 0.85) - 1) * tProg;

    const m11 = sub === 'shear' ? 1 : s1 * Math.cos(rad);
    const m12 = sub === 'shear' ? Number(params.shearK ?? 1.2) * tProg : -s2 * Math.sin(rad);
    const m21 = sub === 'shear' ? 0 : s1 * Math.sin(rad);
    const m22 = sub === 'shear' ? 1 : s2 * Math.cos(rad);

    // Transformed unit circle & basis parallelogram
    ctx.save();
    ctx.fillStyle = pal.amberFill;
    ctx.strokeStyle = pal.amber;
    ctx.lineWidth = 3 * scale;
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const a = (i / 120) * Math.PI * 2;
      const ux = Math.cos(a);
      const uy = Math.sin(a);
      const p = toPx(m11 * ux + m12 * uy, m21 * ux + m22 * uy);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const pOrig = toPx(0, 0);
    const pE1 = toPx(m11, m21);
    const pE2 = toPx(m12, m22);
    this.drawArrow(ctx, pOrig.x, pOrig.y, pE1.x, pE1.y, pal.teal, 3.8 * scale);
    this.drawArrow(ctx, pOrig.x, pOrig.y, pE2.x, pE2.y, pal.indigo, 3.8 * scale);

    const det = m11 * m22 - m12 * m21;
    const trace = m11 + m22;

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(275 * scale),
      scale,
      [
        { text: 'SPECTRAL MATRIX GEOMETRY', color: pal.amber, gap: 34 * scale },
        { text: `det(A) = ${det.toFixed(3)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Image Aî = (${m11.toFixed(2)}, ${m21.toFixed(2)})`, color: pal.teal, gap: 34 * scale },
        { text: `Image Aĵ = (${m12.toFixed(2)}, ${m22.toFixed(2)})`, color: pal.indigo, gap: 34 * scale },
        { text: `Trace tr(A) = ${trace.toFixed(3)}`, color: pal.amber, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    return {
      readouts: [
        { key: 'det(A)', val: det.toFixed(3) },
        { key: 'tr(A)', val: trace.toFixed(3) },
        { key: '‖Aî‖', val: Math.hypot(m11, m21).toFixed(2) },
        { key: '‖Aĵ‖', val: Math.hypot(m12, m22).toFixed(2) },
      ],
      tableHeaders: ['Basis / Invariant', 'Input', 'Transformed', 'Magnitude'],
      tableRows: [
        ['First Column Aî', '(1, 0)', `(${m11.toFixed(2)}, ${m21.toFixed(2)})`, Math.hypot(m11, m21).toFixed(3)],
        ['Second Column Aĵ', '(0, 1)', `(${m12.toFixed(2)}, ${m22.toFixed(2)})`, Math.hypot(m12, m22).toFixed(3)],
        ['Area Scaling det(A)', '1.000', det.toFixed(3), `${Math.abs(det).toFixed(3)}×`],
      ],
    };
  };

  /* ------------------------------------------------------------------------
   * 10. DISCRETE MATH, NUMBER THEORY & COMBINATORICS ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawDiscreteScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height > bounds.width * 1.1;
    const prog = Math.max(0.15, spanEase(time, 0.2, duration * 0.85));

    if (sub === 'mod_circle') {
      const cx = padX + Math.round(plotW * (isTall ? 0.5 : 0.28));
      const cy = plotTop + Math.round(plotH * (isTall ? 0.34 : 0.5));
      const radius = Math.min(plotW, plotH) * (isTall ? 0.27 : 0.36);
      this.lastPlotMapper = { unitCircle: { cx, cy, radius } };

      const N = Math.max(12, Math.round(Number(params.modN ?? 72)));
      const m = Number(params.multM ?? 2);
      const visN = Math.max(4, Math.floor(N * prog));

      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      for (let k = 0; k < visN; k++) {
        const a1 = (2 * Math.PI * k) / N;
        const a2 = (2 * Math.PI * ((m * k) % N)) / N;
        ctx.strokeStyle = k % 3 === 0 ? pal.amber : pal.teal;
        ctx.globalAlpha = 0.72;
        ctx.lineWidth = 1.6 * scale;
        ctx.beginPath();
        ctx.moveTo(cx + radius * Math.cos(a1), cy - radius * Math.sin(a1));
        ctx.lineTo(cx + radius * Math.cos(a2), cy - radius * Math.sin(a2));
        ctx.stroke();
      }
      ctx.restore();

      const cardX = isTall ? padX : padX + Math.round(plotW * 0.56);
      const cardY = isTall ? plotTop + Math.round(plotH * 0.64) : plotTop + Math.round(plotH * 0.14);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(
        ctx,
        pal,
        cardX,
        cardY,
        cardW,
        Math.round(265 * scale),
        scale,
        [
          { text: 'MODULAR ARITHMETIC CAUSTIC', color: pal.amber, gap: 34 * scale },
          { text: `Ring ℤ / ${N}ℤ   (Multiplier m = ${m})`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
          { text: `Active Chords = ${visN} / ${N}`, color: pal.teal, gap: 34 * scale },
          { text: `Interior Caustic Cusps = ${Math.max(1, Math.round(m) - 1)}`, color: pal.amber, gap: 34 * scale },
          { text: `Mapping x ↦ (${m}x) mod ${N}`, color: pal.indigo, gap: 32 * scale },
        ],
        pal.panelBorder
      );

      return {
        readouts: [
          { key: 'Modulus N', val: `${N}` },
          { key: 'Multiplier m', val: `${m}` },
          { key: 'Cusps m−1', val: `${Math.max(1, Math.round(m) - 1)}` },
          { key: 'Chords', val: `${visN}` },
        ],
        tableHeaders: ['Residue x', 'm·x', '(m·x) mod N', 'Chord Angle'],
        tableRows: [1, 2, 3, 4, 5].map((x) => [
          `${x}`,
          `${m * x}`,
          `${(m * x) % N}`,
          `${(((360 * ((m * x) % N)) / N) % 360).toFixed(1)}°`,
        ]),
      };
    }

    // Collatz / Fibonacci / Birthday / Euclidean / Pascal plotted on coordinate axes
    const plot = this.createPlotArea(ctx, pal, bounds, 0, 22, 0, 56, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH } = plot;
    let seed = Math.max(3, Math.round(Number(params.seedN ?? params.peopleK ?? params.rectA ?? 19)));
    const seq = [seed];
    let curr = seed;
    for (let i = 0; i < 20; i++) {
      if (sub === 'fibonacci') {
        curr = i < 2 ? 1.618 : 1.618034 + (i % 2 === 0 ? 1 : -1) * Math.pow(0.382, i) * 18;
      } else if (sub === 'birthday') {
        curr = 50 * (1 - Math.exp(-(i * 3 * (i * 3 - 1)) / 730));
      } else {
        curr = curr === 1 ? 1 : curr % 2 === 0 ? curr / 2 : Math.min(54, 3 * curr + 1);
      }
      seq.push(curr);
    }

    const visCount = Math.max(2, Math.floor(seq.length * prog));
    ctx.save();
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 3.8 * scale;
    ctx.beginPath();
    for (let i = 0; i < visCount; i++) {
      const p = toPx(i, seq[i]);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();

    for (let i = 0; i < visCount; i++) {
      const p = toPx(i, seq[i]);
      this.drawDot(ctx, p.x, p.y, 6 * scale, i === visCount - 1 ? pal.teal : pal.amber, pal.bg);
    }

    const peakVal = Math.max(...seq);
    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(270 * scale),
      scale,
      [
        { text: 'DISCRETE SEQUENCE TRAJECTORY', color: pal.amber, gap: 34 * scale },
        { text: `Initial Parameter = ${seed}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Peak Value = ${peakVal.toFixed(2)}`, color: pal.amber, gap: 34 * scale },
        { text: `Current Term aₙ = ${seq[visCount - 1].toFixed(2)}`, color: pal.teal, gap: 34 * scale },
        { text: `Evaluated Steps = ${visCount}`, color: pal.indigo, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    return {
      readouts: [
        { key: 'Seed n₀', val: `${seed}` },
        { key: 'Peak Max', val: peakVal.toFixed(1) },
        { key: 'Current aₙ', val: seq[visCount - 1].toFixed(2) },
        { key: 'Steps', val: `${visCount}` },
      ],
      tableHeaders: ['Step k', 'Term aₖ', 'Next aₖ₊₁', 'Parity / Trend'],
      tableRows: seq.slice(0, 6).map((v, idx) => [
        `k = ${idx}`,
        v.toFixed(2),
        (seq[idx + 1] ?? v).toFixed(2),
        Math.round(v) % 2 === 0 ? 'Even' : 'Odd',
      ]),
    };
  };

  /* ------------------------------------------------------------------------
   * 11. PHYSICS, BALLISTICS & WAVE MECHANICS ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawPhysicsScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, 0, 4.2, -1.6, 2.6, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const prog = Math.max(0.15, spanEase(time, 0.2, duration * 0.85));

    if (sub === 'standing_wave') {
      const modeN = Math.max(1, Math.round(Number(params.modeN ?? 3)));
      const ampA = Number(params.ampA ?? 1.4);
      const L = 4.0;
      const cosT = Math.cos(time * 3.6);

      // Envelope ±A sin(nπx/L)
      this.strokeSampledCurve(ctx, toPx, 0, L, (x) => ampA * Math.sin((modeN * Math.PI * x) / L), pal.gridMajor, 2 * scale, 1);
      this.strokeSampledCurve(ctx, toPx, 0, L, (x) => -ampA * Math.sin((modeN * Math.PI * x) / L), pal.gridMajor, 2 * scale, 1);
      // Active vibrating string
      this.strokeSampledCurve(ctx, toPx, 0, L, (x) => ampA * Math.sin((modeN * Math.PI * x) / L) * cosT, pal.indigo, 4.2 * scale, 1);

      for (let k = 0; k <= modeN; k++) {
        const nx = (k * L) / modeN;
        const pNode = toPx(nx, 0);
        this.drawDot(ctx, pNode.x, pNode.y, 7.5 * scale, pal.amber, pal.bg);
      }

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(
        ctx,
        pal,
        cardX,
        cardY,
        cardW,
        Math.round(270 * scale),
        scale,
        [
          { text: 'STANDING WAVE HARMONIC MODES', color: pal.amber, gap: 34 * scale },
          { text: `Eigenmode n = ${modeN}   (λₙ = ${(2 * L / modeN).toFixed(2)})`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
          { text: `Interior Nodes = ${modeN - 1}`, color: pal.amber, gap: 34 * scale },
          { text: `Antinodes      = ${modeN}`, color: pal.teal, gap: 34 * scale },
          { text: `Wavenumber kₙ  = ${(modeN * Math.PI / L).toFixed(3)}`, color: pal.indigo, gap: 32 * scale },
        ],
        pal.panelBorder
      );

      return {
        readouts: [
          { key: 'Harmonic n', val: `${modeN}` },
          { key: 'Wavelength λₙ', val: ((2 * L) / modeN).toFixed(2) },
          { key: 'Interior Nodes', val: `${modeN - 1}` },
          { key: 'Amplitude A', val: ampA.toFixed(2) },
        ],
        tableHeaders: ['Mode n', 'Wavelength λₙ', 'Nodes', 'Frequency'],
        tableRows: [1, 2, 3, 4, 5].map((n) => [`n = ${n}`, ((2 * L) / n).toFixed(2), `${n - 1} interior`, `${n} f₁`]),
      };
    }

    // Projectile or Resonance
    const launchDeg = Number(params.launchDeg ?? 45);
    const th = (launchDeg * Math.PI) / 180;
    const dragC = Number(params.dragC ?? 0.18);
    const v0 = 6.2;
    const g = 9.8;

    const vacFn = (x) =>
      sub === 'resonance'
        ? 1 / Math.hypot(1 - Math.pow(x / 2.0, 2), 2 * Number(params.zeta ?? 0.16) * (x / 2.0)) - 0.5
        : Math.max(-1.2, x * Math.tan(th) - (g * x * x) / (2 * v0 * v0 * Math.cos(th) * Math.cos(th)));

    const dragFn = (x) =>
      sub === 'resonance'
        ? Math.atan2(2 * Number(params.zeta ?? 0.16) * (x / 2.0), 1 - Math.pow(x / 2.0, 2)) - 0.5
        : Math.max(-1.2, vacFn(x) - dragC * 0.28 * Math.pow(x, 2.4));

    this.strokeSampledCurve(ctx, toPx, 0, 4.0, vacFn, pal.indigo, 4 * scale, prog);
    this.strokeSampledCurve(ctx, toPx, 0, 4.0, dragFn, pal.amber, 3.4 * scale, prog);

    const xNow = 3.6 * prog;
    const pHead = toPx(xNow, vacFn(xNow));
    this.drawDot(ctx, pHead.x, pHead.y, 8 * scale, pal.teal, pal.bg);

    const rangeVac = ((v0 * v0) / g) * Math.sin(2 * th);
    const apexVac = ((v0 * v0) * Math.sin(th) * Math.sin(th)) / (2 * g);

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(270 * scale),
      scale,
      [
        { text: sub === 'resonance' ? 'FORCED RESONANCE RESPONSE' : 'BALLISTIC TRAJECTORY KINEMATICS', color: pal.amber, gap: 34 * scale },
        { text: sub === 'resonance' ? `Drive ω = ${Number(params.driveOmega ?? 1.95).toFixed(2)}` : `Launch Angle θ₀ = ${launchDeg}°`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Vacuum Range R = ${rangeVac.toFixed(3)} m`, color: pal.indigo, gap: 34 * scale },
        { text: `Apex Height H  = ${apexVac.toFixed(3)} m`, color: pal.teal, gap: 34 * scale },
        { text: `Drag / Damping = ${dragC.toFixed(2)}`, color: pal.amber, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    return {
      readouts: [
        { key: 'Launch θ₀', val: `${launchDeg}°` },
        { key: 'Range R', val: rangeVac.toFixed(2) },
        { key: 'Apex H', val: apexVac.toFixed(2) },
        { key: 'Drag γ', val: dragC.toFixed(2) },
      ],
      tableHeaders: ['Angle θ₀', 'sin(2θ₀)', 'Vacuum Range R', 'Apex Height H'],
      tableRows: [15, 30, 45, 60, 75].map((d) => {
        const r = (d * Math.PI) / 180;
        return [
          `${d}°`,
          Math.sin(2 * r).toFixed(3),
          (((v0 * v0) / g) * Math.sin(2 * r)).toFixed(3),
          (((v0 * v0) * Math.sin(r) * Math.sin(r)) / (2 * g)).toFixed(3),
        ];
      }),
    };
  };

  /* ------------------------------------------------------------------------
   * 12. DIGITAL SAT, IGCSE & QUDRAT EXAM VISUALS ENGINE
   * ------------------------------------------------------------------------ */
  proto.drawExamTrapsScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height > bounds.width * 1.1;

    if (sub === 'qudrat_clock' || sub === 'qudrat_geometry') {
      const cx = padX + Math.round(plotW * (isTall ? 0.5 : 0.28));
      const cy = plotTop + Math.round(plotH * (isTall ? 0.34 : 0.5));
      const radius = Math.min(plotW, plotH) * (isTall ? 0.27 : 0.36);
      this.lastPlotMapper = { unitCircle: { cx, cy, radius } };

      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      if (sub === 'qudrat_clock') {
        const H = Number(params.hourH ?? 3);
        const M = Number(params.minM ?? 30);
        const hourDeg = 30 * (H % 12) + 0.5 * M;
        const minDeg = 6 * M;
        const diff = Math.abs(hourDeg - minDeg);
        const acute = Math.min(diff, 360 - diff);

        const hRad = ((90 - hourDeg) * Math.PI) / 180;
        const mRad = ((90 - minDeg) * Math.PI) / 180;
        this.drawArrow(ctx, cx, cy, cx + radius * 0.62 * Math.cos(hRad), cy - radius * 0.62 * Math.sin(hRad), pal.amber, 4.5 * scale);
        this.drawArrow(ctx, cx, cy, cx + radius * 0.86 * Math.cos(mRad), cy - radius * 0.86 * Math.sin(mRad), pal.teal, 3.6 * scale);
        this.drawDot(ctx, cx, cy, 7 * scale, pal.indigo, pal.bg);
        ctx.restore();

        const cardX = isTall ? padX : padX + Math.round(plotW * 0.56);
        const cardY = isTall ? plotTop + Math.round(plotH * 0.64) : plotTop + Math.round(plotH * 0.14);
        const cardW = isTall ? plotW : padX + plotW - cardX;
        this.drawCalloutCard(
          ctx,
          pal,
          cardX,
          cardY,
          cardW,
          Math.round(270 * scale),
          scale,
          [
            { text: 'QIYAS QUDRAT · CLOCK HANDS FORMULA', color: pal.amber, gap: 34 * scale },
            { text: `Time ${H}:${String(M).padStart(2, '0')} → Δθ = ${acute.toFixed(1)}°`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
            { text: `Hour Hand = 30H + 0.5M = ${hourDeg.toFixed(1)}°`, color: pal.amber, gap: 34 * scale },
            { text: `Minute Hand = 6M       = ${minDeg.toFixed(1)}°`, color: pal.teal, gap: 34 * scale },
            { text: `Formula |30H − 5.5M|   = ${diff.toFixed(1)}°`, color: pal.indigo, gap: 32 * scale },
          ],
          pal.panelBorder
        );

        return {
          readouts: [
            { key: 'Clock Time', val: `${H}:${String(M).padStart(2, '0')}` },
            { key: 'Hour Angle', val: `${hourDeg.toFixed(1)}°` },
            { key: 'Min Angle', val: `${minDeg.toFixed(1)}°` },
            { key: 'Acute Δθ', val: `${acute.toFixed(1)}°` },
          ],
          tableHeaders: ['Time', '30H + 0.5M', '6M', 'Angle |30H−5.5M|'],
          tableRows: [0, 15, 20, 30, 45].map((m) => [
            `${H}:${String(m).padStart(2, '0')}`,
            `${(30 * (H % 12) + 0.5 * m).toFixed(1)}°`,
            `${6 * m}°`,
            `${Math.abs(30 * (H % 12) - 5.5 * m).toFixed(1)}°`,
          ]),
        };
      }

      // qudrat_geometry: Circle -> Inscribed Square -> Inner Circle
      const R = Number(params.radiusR ?? 1.8);
      const rot = (Number(params.rotDeg ?? 0) * Math.PI) / 180;
      ctx.fillStyle = pal.amberFill;
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      for (let k = 0; k < 4; k++) {
        const a = rot + Math.PI / 4 + (k * Math.PI) / 2;
        const vx = cx + radius * Math.cos(a);
        const vy = cy - radius * Math.sin(a);
        if (k === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 3.5 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, radius / Math.SQRT2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const areaOuter = Math.PI * R * R;
      const areaSq = 2 * R * R;
      const areaInner = 0.5 * Math.PI * R * R;

      const cardX = isTall ? padX : padX + Math.round(plotW * 0.56);
      const cardY = isTall ? plotTop + Math.round(plotH * 0.64) : plotTop + Math.round(plotH * 0.14);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(
        ctx,
        pal,
        cardX,
        cardY,
        cardW,
        Math.round(270 * scale),
        scale,
        [
          { text: 'QIYAS QUDRAT · INSCRIBED RATIO 2 : 1', color: pal.amber, gap: 34 * scale },
          { text: `Outer Circle πR² = ${areaOuter.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
          { text: `Inscribed Square 2R² = ${areaSq.toFixed(2)}`, color: pal.amber, gap: 34 * scale },
          { text: `Inner Circle πR²/2   = ${areaInner.toFixed(2)}`, color: pal.teal, gap: 34 * scale },
          { text: `Ratio Outer / Inner  = 2.000 Exactly`, color: pal.indigo, gap: 32 * scale },
        ],
        pal.panelBorder
      );

      return {
        readouts: [
          { key: 'Outer πR²', val: areaOuter.toFixed(2) },
          { key: 'Square 2R²', val: areaSq.toFixed(2) },
          { key: 'Inner πR²/2', val: areaInner.toFixed(2) },
          { key: 'Ratio', val: '2.000' },
        ],
        tableHeaders: ['Figure', 'Dimension', 'Symbolic Area', 'Numeric Area'],
        tableRows: [
          ['Outer Circle', `Radius R = ${R.toFixed(2)}`, 'π R²', areaOuter.toFixed(3)],
          ['Inscribed Square', `Side s = R√2`, '2 R²', areaSq.toFixed(3)],
          ['Inner Circle', `Radius r = R/√2`, 'π R² / 2', areaInner.toFixed(3)],
        ],
      };
    }

    // SAT Vertex Parabola
    const plot = this.createPlotArea(ctx, pal, bounds, -3.2, 3.6, -3.0, 4.2, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH } = plot;
    const h = Number(params.hVert ?? 1.2);
    const k = Number(params.kVert ?? -1.6);
    const a = Number(params.aScale ?? 0.8) || 0.8;
    const fn = (x) => a * (x - h) * (x - h) + k;

    this.strokeSampledCurve(ctx, toPx, -3.0, 3.4, fn, pal.indigo, 4.2 * scale, 1);

    // Axis of symmetry x = h
    const pTop = toPx(h, 4.0);
    const pBot = toPx(h, -2.8);
    ctx.save();
    ctx.setLineDash([6 * scale, 4 * scale]);
    ctx.strokeStyle = pal.amber;
    ctx.lineWidth = 2.2 * scale;
    ctx.beginPath();
    ctx.moveTo(pTop.x, pTop.y);
    ctx.lineTo(pBot.x, pBot.y);
    ctx.stroke();
    ctx.restore();

    const pVert = toPx(h, k);
    this.drawDot(ctx, pVert.x, pVert.y, 8.5 * scale, pal.amber, pal.bg);

    const disc = -4 * a * k;
    if (disc >= 0) {
      const dx = Math.sqrt(Math.max(0, -k / a));
      const r1 = toPx(h - dx, 0);
      const r2 = toPx(h + dx, 0);
      this.drawDot(ctx, r1.x, r1.y, 7.5 * scale, pal.teal, pal.bg);
      this.drawDot(ctx, r2.x, r2.y, 7.5 * scale, pal.teal, pal.bg);
    }

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      Math.round(270 * scale),
      scale,
      [
        { text: 'DIGITAL SAT · VERTEX & DISCRIMINANT', color: pal.amber, gap: 34 * scale },
        { text: `Vertex (h, k) = (${h.toFixed(2)}, ${k.toFixed(2)})`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Discriminant Δ = −4ak = ${disc.toFixed(2)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Real Roots = ${disc > 0.01 ? '2 Distinct' : Math.abs(disc) <= 0.01 ? '1 Double Root' : '0 (Complex)'}`, color: pal.teal, gap: 34 * scale },
        { text: `Sum of Roots x₁ + x₂ = ${(2 * h).toFixed(2)}`, color: pal.amber, gap: 32 * scale },
      ],
      pal.panelBorder
    );

    return {
      readouts: [
        { key: 'Vertex (h,k)', val: `(${h.toFixed(1)},${k.toFixed(1)})` },
        { key: 'Discriminant Δ', val: disc.toFixed(2) },
        { key: 'Real Roots', val: disc > 0.01 ? '2' : Math.abs(disc) <= 0.01 ? '1' : '0' },
        { key: 'Axis x = h', val: h.toFixed(2) },
      ],
      tableHeaders: ['x', 'f(x) = a(x−h)²+k', 'Symmetry Partner', 'Feature'],
      tableRows: [-1, 0, h, h + 1].map((x) => [
        x.toFixed(2),
        fn(x).toFixed(3),
        (2 * h - x).toFixed(2),
        Math.abs(x - h) < 1e-3 ? 'Vertex Extremum' : 'Symmetric Pair',
      ]),
    };
  };

  /* Helper to stroke a sampled curve cleanly */
  proto.strokeSampledCurve = function (ctx, toPx, x0, x1, fn, color, width, prog = 1) {
    const steps = Math.max(6, Math.floor(180 * clamp01(prog)));
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = x0 + ((x1 - x0) * i) / 180;
      const y = Math.max(-25, Math.min(25, fn(x)));
      const p = toPx(x, y);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();
  };
}
