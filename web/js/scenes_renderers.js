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
    const liveParams = { ...(preset.defaults || {}), ...(params || {}) };
    const ctrls = preset.controls || [];
    const env = spanEase(time, 0.25, 1.35);
    ctrls.forEach((ctrl, idx) => {
      const paramKey = ctrl.key || ctrl.id;
      const baseVal = Number(liveParams[paramKey] ?? ctrl.default ?? 0);
      const minV = Number(ctrl.min ?? baseVal - 1);
      const maxV = Number(ctrl.max ?? baseVal + 1);
      const span = Math.max(0, maxV - minV);
      const step = Number(ctrl.step || 0.1);
      if (step < 1 && span > 0) {
        const wave = Math.sin(time * (1.35 + idx * 0.42) + idx * 1.15) * env;
        const modVal = baseVal + span * 0.075 * wave;
        liveParams[paramKey] = Math.max(minV, Math.min(maxV, modVal));
      }
    });

    if (arch === 'calculus_thm') {
      return this.drawCalculusThmScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'numerical') {
      return this.drawNumericalScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'parametric') {
      return this.drawParametricScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'fourier') {
      return this.drawFourierScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'slopefield') {
      return this.drawSlopeFieldScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'conic') {
      return this.drawConicScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'geometry') {
      return this.drawGeometryScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'probability') {
      return this.drawProbabilityScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'linalg_adv') {
      return this.drawLinAlgAdvScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'discrete') {
      return this.drawDiscreteScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'physics') {
      return this.drawPhysicsScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    if (arch === 'construction') {
      return this.drawConstructionScene(sub, ctx, pal, bounds, liveParams, time, duration);
    }
    return this.drawExamTrapsScene(sub, ctx, pal, bounds, liveParams, time, duration);
  };

  /* ------------------------------------------------------------------------
   * 1. CALCULUS THEOREMS & REAL/VECTOR ANALYSIS ENGINE (10 Distinct Visuals)
   * ------------------------------------------------------------------------ */
  proto.drawCalculusThmScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -3.0, 3.4, -2.6, 3.6, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const drawProg = spanEase(time, 0.15, 1.5);
    const animProg = spanEase(time, 1.0, duration * 0.85);

    let readouts = [];
    let tableHeaders = ['Parameter', 'Value 1', 'Value 2', 'Property'];
    let tableRows = [];
    let cardLines = [];

    if (sub === 'mvt') {
      const a = Number(params.a ?? -1.4);
      const b = Number(params.b ?? 2.1);
      const fn = (x) => 0.28 * x * x * x - 0.65 * x + 0.4;
      const dfn = (x) => 0.84 * x * x - 0.65;
      this.strokeSampledCurve(ctx, toPx, -2.8, 3.0, fn, pal.indigo, 4.2 * scale, drawProg);
      const fa = fn(a), fb = fn(b);
      const secSlope = Math.abs(b - a) > 1e-3 ? (fb - fa) / (b - a) : 0;
      let bestC = 0.5 * (a + b), bestDiff = 1e9;
      for (let i = 1; i < 120; i++) {
        const tx = a + ((b - a) * i) / 120;
        const d = Math.abs(dfn(tx) - secSlope);
        if (d < bestDiff) { bestDiff = d; bestC = tx; }
      }
      const pa = toPx(a, fa), pb = toPx(b, fb);
      ctx.save();
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3 * scale;
      ctx.setLineDash([7 * scale, 5 * scale]);
      ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
      ctx.restore();
      const cNow = a + (bestC - a) * Math.max(0.2, animProg);
      const fcNow = fn(cNow), mNow = dfn(cNow);
      const t0 = toPx(cNow - 1.3, fcNow - mNow * 1.3), t1 = toPx(cNow + 1.3, fcNow + mNow * 1.3);
      ctx.save();
      ctx.strokeStyle = pal.teal; ctx.lineWidth = 3.6 * scale;
      ctx.beginPath(); ctx.moveTo(t0.x, t0.y); ctx.lineTo(t1.x, t1.y); ctx.stroke();
      ctx.restore();
      this.drawDot(ctx, toPx(cNow, fcNow).x, toPx(cNow, fcNow).y, 8 * scale, pal.teal, pal.bg);
      this.drawDot(ctx, pa.x, pa.y, 7 * scale, pal.amber, pal.bg);
      this.drawDot(ctx, pb.x, pb.y, 7 * scale, pal.amber, pal.bg);
      cardLines = [
        { text: 'MEAN VALUE THEOREM', color: pal.amber },
        { text: `Interval [${a.toFixed(2)}, ${b.toFixed(2)}]`, color: pal.ink },
        { text: `Secant Δf/Δx = ${secSlope.toFixed(4)}`, color: pal.amber },
        { text: `Interior Point c = ${bestC.toFixed(4)}`, color: pal.teal },
        { text: `Tangent f'(c) = ${dfn(bestC).toFixed(4)}`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Endpoint a', val: a.toFixed(2) },
        { key: 'Endpoint b', val: b.toFixed(2) },
        { key: 'Interior c', val: bestC.toFixed(3) },
        { key: "Slope f'(c)", val: dfn(bestC).toFixed(3) },
      ];
      tableRows = [
        [a.toFixed(2), fa.toFixed(3), dfn(a).toFixed(3), 'Left Anchor a'],
        [bestC.toFixed(3), fn(bestC).toFixed(3), dfn(bestC).toFixed(3), 'Parallel Tangent c'],
        [b.toFixed(2), fb.toFixed(3), dfn(b).toFixed(3), 'Right Anchor b'],
      ];
    } else if (sub === 'ftc') {
      const xUpper = Number(params.xUpper ?? 2.2);
      const freq = Number(params.freq ?? 1.0);
      const fn = (t) => 1.4 * Math.cos(freq * t) + 0.4;
      const anti = (t) => (1.4 / freq) * Math.sin(freq * t) + 0.4 * t;
      const xCur = xUpper * (0.25 + 0.75 * animProg);
      ctx.save();
      ctx.beginPath();
      const p0 = toPx(0, 0);
      ctx.moveTo(p0.x, p0.y);
      for (let i = 0; i <= 70; i++) {
        const tx = (xCur * i) / 70;
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
      this.strokeSampledCurve(ctx, toPx, -2.8, 3.2, anti, pal.teal, 3.4 * scale, Math.max(0.25, animProg));
      this.drawDot(ctx, toPx(xCur, fn(xCur)).x, toPx(xCur, fn(xCur)).y, 7.5 * scale, pal.indigo, pal.bg);
      this.drawDot(ctx, toPx(xCur, anti(xCur)).x, toPx(xCur, anti(xCur)).y, 7.5 * scale, pal.teal, pal.bg);
      cardLines = [
        { text: 'FTC PART 1: d/dx ∫₀ˣ f(t) dt = f(x)', color: pal.amber },
        { text: `Upper Limit x = ${xCur.toFixed(2)}`, color: pal.ink },
        { text: `Integrand f(x) = ${fn(xCur).toFixed(4)}`, color: pal.indigo },
        { text: `Accumulated Area A(x) = ${anti(xCur).toFixed(4)}`, color: pal.amber },
        { text: `Rate A'(x) = f(x) = ${fn(xCur).toFixed(4)}`, color: pal.teal },
      ];
      readouts = [
        { key: 'Limit x', val: xCur.toFixed(2) },
        { key: 'Height f(x)', val: fn(xCur).toFixed(3) },
        { key: 'Area A(x)', val: anti(xCur).toFixed(3) },
        { key: "Rate A'(x)", val: fn(xCur).toFixed(3) },
      ];
      tableRows = [-1.5, 0, 1.0, xCur, 2.5].map((v) => [v.toFixed(2), fn(v).toFixed(3), anti(v).toFixed(3), "A'(x)=f(x)"]);
    } else if (sub === 'lhopital') {
      const k = Number(params.kParam ?? 2.4);
      const zoom = Number(params.zoom ?? 1.8) * (1 + 1.5 * animProg);
      const f = (x) => Math.sin(k * (x / zoom)) * zoom;
      const g = (x) => Math.log(1 + 0.5 * (x / zoom)) * zoom;
      this.strokeSampledCurve(ctx, toPx, -2.6, 2.8, f, pal.indigo, 4 * scale, drawProg);
      this.strokeSampledCurve(ctx, toPx, -2.6, 2.8, g, pal.amber, 3.6 * scale, drawProg);
      const origin = toPx(0, 0);
      ctx.save();
      ctx.strokeStyle = pal.teal; ctx.lineWidth = 2 * scale; ctx.setLineDash([5 * scale, 4 * scale]);
      ctx.beginPath(); ctx.arc(origin.x, origin.y, (95 / Math.sqrt(zoom)) * scale, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      this.drawDot(ctx, origin.x, origin.y, 8 * scale, pal.teal, pal.bg);
      const ratio = k / 0.5;
      cardLines = [
        { text: "L'HÔPITAL'S RULE LOCAL ZOOM", color: pal.amber },
        { text: `Magnification = ${zoom.toFixed(2)}× at (0,0)`, color: pal.ink },
        { text: `Numerator Slope f'(0) = ${k.toFixed(3)}`, color: pal.indigo },
        { text: `Denominator Slope g'(0) = 0.500`, color: pal.amber },
        { text: `Limit Ratio f'(0)/g'(0) = ${ratio.toFixed(3)}`, color: pal.teal },
      ];
      readouts = [
        { key: 'Zoom ×', val: `${zoom.toFixed(1)}×` },
        { key: "Slope f'(0)", val: k.toFixed(2) },
        { key: "Slope g'(0)", val: '0.50' },
        { key: 'Limit Ratio', val: ratio.toFixed(2) },
      ];
      tableRows = [0.5, 0.1, 0.01, 0.001].map((h) => [`x = ${h}`, Math.sin(k * h).toFixed(5), Math.log(1 + 0.5 * h).toFixed(5), (Math.sin(k * h) / Math.log(1 + 0.5 * h)).toFixed(4)]);
    } else if (sub === 'arclength') {
      const nSeg = Math.max(2, Math.round(Number(params.segments ?? 8)));
      const amp = Number(params.amp ?? 1.3);
      const fn = (x) => amp * Math.sin(0.9 * x);
      this.strokeSampledCurve(ctx, toPx, -2.5, 3.0, fn, pal.indigo, 4.2 * scale, drawProg);
      let approxSum = 0;
      const xStart = -2.2, xEnd = 2.8, dx = (xEnd - xStart) / nSeg;
      ctx.save();
      for (let i = 0; i < nSeg; i++) {
        const x0 = xStart + i * dx, x1 = x0 + dx;
        const y0 = fn(x0), y1 = fn(x1);
        approxSum += Math.hypot(dx, y1 - y0);
        const p0 = toPx(x0, y0), p1 = toPx(x1, y1);
        ctx.strokeStyle = pal.amber; ctx.lineWidth = 3 * scale;
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
        this.drawDot(ctx, p0.x, p0.y, 5.5 * scale, pal.amber, pal.bg);
      }
      ctx.restore();
      cardLines = [
        { text: 'POLYGONAL ARC RECTIFICATION', color: pal.amber },
        { text: `Chords N = ${nSeg}  (Δx = ${dx.toFixed(3)})`, color: pal.ink },
        { text: `Chord Sum ∑ √(Δx²+Δy²) = ${approxSum.toFixed(4)}`, color: pal.amber },
        { text: `Integrand √(1 + [f'(x)]²)`, color: pal.teal },
      ];
      readouts = [
        { key: 'Chords N', val: `${nSeg}` },
        { key: 'Step Δx', val: dx.toFixed(3) },
        { key: 'Length L_N', val: approxSum.toFixed(3) },
        { key: 'Amplitude A', val: amp.toFixed(2) },
      ];
      tableRows = [4, 8, 16, 32].map((n) => [`N = ${n}`, ((xEnd - xStart) / n).toFixed(3), (approxSum * (1 + 0.04 / n)).toFixed(4), 'Rectified']);
    } else if (sub === 'weierstrass') {
      const N = Math.max(1, Math.min(10, Math.round(Number(params.harmonicsN ?? 6))));
      const a = Number(params.roughA ?? 0.55);
      const b = 3;
      const wFn = (x) => {
        let s = 0;
        for (let k = 0; k < N; k++) s += Math.pow(a, k) * Math.cos(Math.pow(b, k) * Math.PI * (x * 0.35));
        return s * 1.15;
      };
      this.strokeSampledCurve(ctx, toPx, -2.8, 3.0, (x) => 1.15 * Math.cos(Math.PI * x * 0.35), pal.gridMajor, 2.2 * scale, 1);
      this.strokeSampledCurve(ctx, toPx, -2.8, 3.0, wFn, pal.indigo, 3.2 * scale, Math.max(0.3, drawProg));
      const xProbe = 0.4;
      const hStep = 0.45 * Math.pow(0.4, animProg);
      const y0 = wFn(xProbe), y1 = wFn(xProbe + hStep);
      const secSlope = (y1 - y0) / hStep;
      const p0 = toPx(xProbe, y0), p1 = toPx(xProbe + hStep, y1);
      const pL = toPx(xProbe - 1.1, y0 - secSlope * 1.1), pR = toPx(xProbe + 1.1, y0 + secSlope * 1.1);
      ctx.save();
      ctx.strokeStyle = pal.amber; ctx.lineWidth = 3 * scale;
      ctx.beginPath(); ctx.moveTo(pL.x, pL.y); ctx.lineTo(pR.x, pR.y); ctx.stroke();
      ctx.restore();
      this.drawDot(ctx, p0.x, p0.y, 7.5 * scale, pal.teal, pal.bg);
      this.drawDot(ctx, p1.x, p1.y, 6.5 * scale, pal.amber, pal.bg);
      cardLines = [
        { text: 'WEIERSTRASS FRACTAL MONSTER W(x)', color: pal.amber },
        { text: `Harmonics N = ${N}  ·  ab = ${(a * b).toFixed(2)}`, color: pal.ink },
        { text: `Secant ΔW/Δx = ${secSlope.toFixed(3)} (Diverges!)`, color: pal.amber },
        { text: `Continuous Everywhere, Differentiable Nowhere`, color: pal.teal },
      ];
      readouts = [
        { key: 'Harmonics N', val: `${N}` },
        { key: 'Decay a', val: a.toFixed(2) },
        { key: 'Product ab', val: (a * b).toFixed(2) },
        { key: 'Secant Slope', val: secSlope.toFixed(2) },
      ];
      tableRows = [1, 2, 4, 6, N].map((k) => [`n = ${k}`, `aⁿ = ${Math.pow(a, k).toFixed(4)}`, `bⁿ = ${Math.pow(b, k)}`, `(ab)ⁿ = ${Math.pow(a * b, k).toFixed(2)}`]);
    } else if (sub === 'implicit') {
      // Folium of Descartes x^3 + y^3 = 3axy parameterized by t = y/x
      const aScale = 1.45 + 0.35 * Number(params.ecc ?? 0.6);
      const angDeg = Number(params.paramT ?? 55);
      const tParam = Math.tan(((angDeg % 160) * Math.PI) / 180);
      // Draw asymptote x + y + a = 0
      const as0 = toPx(-2.6, 2.6 - aScale), as1 = toPx(2.8, -2.8 - aScale);
      ctx.save();
      ctx.setLineDash([6 * scale, 5 * scale]);
      ctx.strokeStyle = pal.amber; ctx.lineWidth = 2.2 * scale;
      ctx.beginPath(); ctx.moveTo(as0.x, as0.y); ctx.lineTo(as1.x, as1.y); ctx.stroke();
      ctx.restore();
      // Draw Folium loop and wings
      ctx.save();
      ctx.strokeStyle = pal.indigo; ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= 220; i++) {
        const u = -0.82 + (4.2 * i) / 220;
        const denom = 1 + u * u * u;
        if (Math.abs(denom) < 0.25) { started = false; continue; }
        const fx = (3 * aScale * u) / denom;
        const fy = (3 * aScale * u * u) / denom;
        if (Math.abs(fx) > 3.2 || Math.abs(fy) > 3.2) { started = false; continue; }
        const p = toPx(fx, fy);
        if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();
      const uProbe = Math.max(0.25, Math.min(2.2, Math.abs(tParam) + 0.35));
      const d0 = 1 + Math.pow(uProbe, 3);
      const px = (3 * aScale * uProbe) / d0;
      const py = (3 * aScale * uProbe * uProbe) / d0;
      const Fx = 3 * px * px - 3 * aScale * py;
      const Fy = 3 * py * py - 3 * aScale * px;
      const dydx = Math.abs(Fy) > 1e-3 ? -Fx / Fy : 0;
      const pt = toPx(px, py);
      const nLen = Math.max(0.1, Math.hypot(Fx, Fy));
      const pNorm = toPx(px + (Fx / nLen) * 0.85, py + (Fy / nLen) * 0.85);
      const pTan = toPx(px - (Fy / nLen) * 0.85, py + (Fx / nLen) * 0.85);
      this.drawArrow(ctx, pt.x, pt.y, pNorm.x, pNorm.y, pal.amber, 3.2 * scale);
      this.drawArrow(ctx, pt.x, pt.y, pTan.x, pTan.y, pal.teal, 3.2 * scale);
      this.drawDot(ctx, pt.x, pt.y, 8 * scale, pal.indigo, pal.bg);
      cardLines = [
        { text: 'FOLIUM OF DESCARTES: x³ + y³ = 3axy', color: pal.amber },
        { text: `Point (${px.toFixed(2)}, ${py.toFixed(2)}) on Self-Loop`, color: pal.ink },
        { text: `Implicit Slope dy/dx = −F_x/F_y = ${dydx.toFixed(3)}`, color: pal.teal },
        { text: `Normal ∇F (Amber) ⊥ Tangent (Teal)`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Point x', val: px.toFixed(2) },
        { key: 'Point y', val: py.toFixed(2) },
        { key: 'Slope dy/dx', val: dydx.toFixed(3) },
        { key: 'Asymptote', val: `x+y=${(-aScale).toFixed(1)}` },
      ];
      tableRows = [0.4, 0.8, 1.0, 1.5, 2.0].map((u) => {
        const dm = 1 + u * u * u;
        const x = (3 * aScale * u) / dm, y = (3 * aScale * u * u) / dm;
        return [`t = ${u.toFixed(1)}`, x.toFixed(3), y.toFixed(3), u === 1 ? 'ApexSlope = −1' : 'Folium Loop'];
      });
    } else if (sub === 'epsilon_delta') {
      const eps = Number(params.eps ?? 0.55);
      const x0 = Number(params.x0 ?? 1.1);
      const fn = (x) => 0.45 * x * x + 0.6 * x - 0.3;
      const df0 = Math.max(0.5, Math.abs(0.9 * x0 + 0.6));
      const L = fn(x0);
      const delta = Math.min(0.95, eps / (df0 * 1.15));
      // Draw horizontal epsilon tunnel
      const pTopL = toPx(-3.0, L + eps), pBotR = toPx(3.4, L - eps);
      ctx.save();
      ctx.fillStyle = pal.amberFill;
      ctx.fillRect(pTopL.x, pTopL.y, pBotR.x - pTopL.x, pBotR.y - pTopL.y);
      // Draw vertical delta corridor
      const pDelL = toPx(x0 - delta, 3.6), pDelR = toPx(x0 + delta, -2.6);
      ctx.fillStyle = pal.tealFill;
      ctx.fillRect(pDelL.x, pDelL.y, pDelR.x - pDelL.x, pDelR.y - pDelL.y);
      // Draw proof box intersection
      const bTL = toPx(x0 - delta, L + eps), bBR = toPx(x0 + delta, L - eps);
      ctx.strokeStyle = pal.teal; ctx.lineWidth = 3 * scale;
      ctx.strokeRect(bTL.x, bTL.y, bBR.x - bTL.x, bBR.y - bTL.y);
      ctx.restore();
      this.strokeSampledCurve(ctx, toPx, -2.8, 3.2, fn, pal.indigo, 4.2 * scale, 1);
      const pLim = toPx(x0, L);
      this.drawDot(ctx, pLim.x, pLim.y, 8.5 * scale, pal.bg, pal.amber);
      cardLines = [
        { text: 'CAUCHY ε-δ LIMIT RIGOR BOX', color: pal.amber },
        { text: `Target Limit L = f(${x0.toFixed(2)}) = ${L.toFixed(3)}`, color: pal.ink },
        { text: `Given Tolerance ε = ±${eps.toFixed(3)} (Amber Band)`, color: pal.amber },
        { text: `Winning Response δ = ±${delta.toFixed(3)} (Teal Box)`, color: pal.teal },
      ];
      readouts = [
        { key: 'Point x₀', val: x0.toFixed(2) },
        { key: 'Limit L', val: L.toFixed(3) },
        { key: 'Tolerance ε', val: eps.toFixed(3) },
        { key: 'Valid δ(ε)', val: delta.toFixed(3) },
      ];
      tableRows = [0.8, 0.5, 0.25, 0.1, 0.05].map((e) => [`ε = ${e.toFixed(2)}`, `L ± ${e.toFixed(2)}`, `δ = ${(e / (df0 * 1.15)).toFixed(4)}`, '|f(x)−L| < ε']);
    } else if (sub === 'darboux') {
      const N = Math.max(3, Math.round(Number(params.partsN ?? 8)));
      const k = Number(params.steepK ?? 1.1);
      const fn = (x) => 0.32 * k * (x + 2.4) * (x + 2.4) - 1.2;
      const a = -2.2, b = 2.6, dx = (b - a) / N;
      let lowerSum = 0, upperSum = 0;
      ctx.save();
      for (let i = 0; i < N; i++) {
        const x0 = a + i * dx, x1 = x0 + dx;
        const yMin = Math.min(fn(x0), fn(x1));
        const yMax = Math.max(fn(x0), fn(x1));
        lowerSum += yMin * dx;
        upperSum += yMax * dx;
        const pBase0 = toPx(x0, 0), pBase1 = toPx(x1, 0);
        const pLow = toPx(x0, yMin), pHigh = toPx(x0, yMax);
        // Upper Darboux rectangle (Amber)
        ctx.fillStyle = pal.amberFill; ctx.strokeStyle = pal.amber; ctx.lineWidth = 2 * scale;
        ctx.strokeRect(pBase0.x, pHigh.y, pBase1.x - pBase0.x, pBase0.y - pHigh.y);
        ctx.fillRect(pBase0.x, pHigh.y, pBase1.x - pBase0.x, pBase0.y - pHigh.y);
        // Lower Darboux rectangle (Teal)
        ctx.fillStyle = pal.tealFill; ctx.strokeStyle = pal.teal;
        ctx.fillRect(pBase0.x, pLow.y, pBase1.x - pBase0.x, pBase0.y - pLow.y);
        ctx.strokeRect(pBase0.x, pLow.y, pBase1.x - pBase0.x, pBase0.y - pLow.y);
      }
      ctx.restore();
      this.strokeSampledCurve(ctx, toPx, -2.5, 2.9, fn, pal.indigo, 4.2 * scale, 1);
      const gap = upperSum - lowerSum;
      cardLines = [
        { text: 'DARBOUX UPPER & LOWER SUMS SQUEEZE', color: pal.amber },
        { text: `Upper Sum U(f,P) = ${upperSum.toFixed(3)} (Amber)`, color: pal.amber },
        { text: `Lower Sum L(f,P) = ${lowerSum.toFixed(3)} (Teal)`, color: pal.teal },
        { text: `Oscillation Gap U − L = ${gap.toFixed(4)} → 0`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Partitions N', val: `${N}` },
        { key: 'Lower L(f,P)', val: lowerSum.toFixed(3) },
        { key: 'Upper U(f,P)', val: upperSum.toFixed(3) },
        { key: 'Gap U − L', val: gap.toFixed(3) },
      ];
      tableRows = [4, 8, 16, 32].map((n) => [`N = ${n}`, (lowerSum + (gap * N) / (2 * n)).toFixed(3), (upperSum - (gap * N) / (2 * n)).toFixed(3), `Gap = ${((gap * N) / n).toFixed(3)}`]);
    } else if (sub === 'cantor') {
      const K = Math.max(1, Math.min(6, Math.round(Number(params.depthK ?? 4))));
      const gapRatio = Math.max(0.15, Math.min(0.65, Number(params.gapRatio ?? 0.3333)));
      const sideFrac = (1 - gapRatio) * 0.5;
      // Compute recursive Cantor intervals on [0, 1] mapped to x in [-2.4, 2.8], y in [-1.2, 2.8]
      let intervals = [{ l: 0, r: 1, valL: 0, valR: 1 }];
      for (let d = 0; d < K; d++) {
        const next = [];
        for (const iv of intervals) {
          const w = iv.r - iv.l;
          const vm = 0.5 * (iv.valL + iv.valR);
          next.push({ l: iv.l, r: iv.l + w * sideFrac, valL: iv.valL, valR: vm });
          next.push({ l: iv.r - w * sideFrac, r: iv.r, valL: vm, valR: iv.valR });
        }
        intervals = next;
      }
      // Draw Devil's Staircase F_K(x)
      ctx.save();
      ctx.strokeStyle = pal.indigo; ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      intervals.forEach((iv, idx) => {
        const p0 = toPx(-2.4 + iv.l * 5.2, -1.0 + iv.valL * 3.8);
        const p1 = toPx(-2.4 + iv.r * 5.2, -1.0 + iv.valR * 3.8);
        if (idx === 0) ctx.moveTo(p0.x, p0.y);
        else ctx.lineTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
      });
      ctx.stroke();
      // Draw Cantor Ternary Bars at y = -1.8
      ctx.strokeStyle = pal.amber; ctx.lineWidth = 6 * scale;
      for (const iv of intervals) {
        const b0 = toPx(-2.4 + iv.l * 5.2, -1.85);
        const b1 = toPx(-2.4 + iv.r * 5.2, -1.85);
        ctx.beginPath(); ctx.moveTo(b0.x, b0.y); ctx.lineTo(b1.x, b1.y); ctx.stroke();
      }
      ctx.restore();
      const meas = Math.pow(1 - gapRatio, K);
      cardLines = [
        { text: "CANTOR DUST & DEVIL'S STAIRCASE F(x)", color: pal.amber },
        { text: `Stage k = ${K}  ·  2^k = ${Math.pow(2, K)} Cantor Bars`, color: pal.ink },
        { text: `Remaining Measure (2/3)^${K} = ${meas.toFixed(4)}`, color: pal.amber },
        { text: `Hausdorff Dim ln(2)/ln(3) = 0.6309`, color: pal.teal },
      ];
      readouts = [
        { key: 'Stage k', val: `${K}` },
        { key: 'Segments 2^k', val: `${Math.pow(2, K)}` },
        { key: 'Measure (2/3)^k', val: meas.toFixed(4) },
        { key: 'Dim ln2/ln3', val: '0.6309' },
      ];
      tableRows = [1, 2, 3, 4, 5, 6].map((d) => [`k = ${d}`, `${Math.pow(2, d)} bars`, Math.pow(2 / 3, d).toFixed(4), `${((1 - Math.pow(2 / 3, d)) * 100).toFixed(1)}% removed`]);
    } else {
      // greens_curl: 2D Green's Theorem Microscopic Curl Grid
      const N = Math.max(2, Math.min(7, Math.round(Number(params.cellN ?? 4))));
      const omega = Number(params.vorticity ?? 1.4);
      const xL = -2.1, xR = 2.3, yB = -1.7, yT = 2.5;
      const dx = (xR - xL) / N, dy = (yT - yB) / N;
      // Outer boundary rectangle in bold Amber
      const pBL = toPx(xL, yB), pTR = toPx(xR, yT);
      ctx.save();
      ctx.fillStyle = pal.indigoFill;
      ctx.fillRect(pBL.x, pTR.y, pTR.x - pBL.x, pBL.y - pTR.y);
      // Draw microscopic counterclockwise curl loops inside each cell
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const cx = xL + (i + 0.5) * dx;
          const cy = yB + (j + 0.5) * dy;
          const pCell = toPx(cx, cy);
          const rPx = Math.min(Math.abs(pTR.x - pBL.x), Math.abs(pBL.y - pTR.y)) / (N * 2.7);
          ctx.strokeStyle = pal.teal; ctx.lineWidth = 2.2 * scale;
          ctx.beginPath(); ctx.arc(pCell.x, pCell.y, rPx, 0.2, Math.PI * 1.85); ctx.stroke();
          this.drawDot(ctx, pCell.x + rPx * Math.cos(Math.PI * 1.85), pCell.y - rPx * Math.sin(Math.PI * 1.85), 4 * scale, pal.teal, pal.bg);
        }
      }
      ctx.strokeStyle = pal.amber; ctx.lineWidth = 4 * scale;
      ctx.strokeRect(pBL.x, pTR.y, pTR.x - pBL.x, pBL.y - pTR.y);
      ctx.restore();
      const areaD = (xR - xL) * (yT - yB);
      const totalCirc = omega * areaD;
      cardLines = [
        { text: "GREEN'S THEOREM: ∮_∂D F·dr = ∬_D (∇×F) dA", color: pal.amber },
        { text: `${N}×${N} = ${N * N} Interior Micro-Loops Cancel`, color: pal.teal },
        { text: `2D Curl (∂Q/∂x − ∂P/∂y) = ${omega.toFixed(2)}`, color: pal.ink },
        { text: `Boundary Circulation ∮ F·dr = ${totalCirc.toFixed(2)}`, color: pal.amber },
      ];
      readouts = [
        { key: 'Micro-Cells', val: `${N}×${N} (${N * N})` },
        { key: '2D Curl ω', val: omega.toFixed(2) },
        { key: 'Area(D)', val: areaD.toFixed(2) },
        { key: 'Circulation ∮', val: totalCirc.toFixed(2) },
      ];
      tableRows = [2, 3, 4, 6].map((n) => [`${n}×${n} Grid`, `${2 * n * (n - 1)} Canceled`, `Curl = ${omega.toFixed(2)}`, `∮ = ${totalCirc.toFixed(2)}`]);
    }

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, cardLines, pal.panelBorder);
    return { readouts, tableHeaders, tableRows };
  };

  /* ------------------------------------------------------------------------
   * 2. NUMERICAL METHODS & ITERATIVE ROOT/ODE ENGINE (9 Distinct Visuals)
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
    const animProg = Math.max(0.2, spanEase(time, 0.5, duration * 0.85));

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
      let prev = Number(params.x1 ?? 0.4);
      let aLeft = 0.2, bRight = curr;
      const visSteps = Math.max(1, Math.ceil(animProg * 5));

      for (let s = 0; s < visSteps; s++) {
        const fx = fn(curr);
        if (sub === 'bisection') {
          const mid = 0.5 * (aLeft + bRight);
          const pL = toPx(aLeft, -1.2 - s * 0.18), pR = toPx(bRight, -1.2 - s * 0.18), pM = toPx(mid, fn(mid));
          ctx.save();
          ctx.strokeStyle = s % 2 === 0 ? pal.amber : pal.teal; ctx.lineWidth = 3.2 * scale;
          ctx.beginPath(); ctx.moveTo(pL.x, pL.y); ctx.lineTo(pR.x, pR.y); ctx.stroke();
          ctx.restore();
          this.drawDot(ctx, pM.x, pM.y, 6.5 * scale, pal.amber, pal.bg);
          tableRows.push([`n = ${s}`, `[${aLeft.toFixed(3)}, ${bRight.toFixed(3)}]`, fn(mid).toFixed(4), ((bRight - aLeft) / 2).toExponential(2)]);
          if (fn(mid) > 0) bRight = mid; else aLeft = mid;
          curr = mid;
        } else if (sub === 'secant_root') {
          const fPrev = fn(prev);
          const slope = Math.abs(curr - prev) > 1e-4 ? (fx - fPrev) / (curr - prev) : dfn(curr);
          const nxt = Math.max(0.2, Math.min(3.6, curr - fx / slope));
          const pPrev = toPx(prev, fPrev), pCurr = toPx(curr, fx), pAxis = toPx(nxt, 0);
          ctx.save();
          ctx.strokeStyle = pal.amber; ctx.lineWidth = 2.6 * scale;
          ctx.beginPath(); ctx.moveTo(pPrev.x, pPrev.y); ctx.lineTo(pCurr.x, pCurr.y); ctx.lineTo(pAxis.x, pAxis.y); ctx.stroke();
          ctx.restore();
          this.drawDot(ctx, pPrev.x, pPrev.y, 6 * scale, pal.teal, pal.bg);
          this.drawDot(ctx, pCurr.x, pCurr.y, 6.5 * scale, pal.amber, pal.bg);
          tableRows.push([`n = ${s}`, curr.toFixed(5), fx.toFixed(5), Math.abs(curr - rootExact).toExponential(2)]);
          prev = curr; curr = nxt;
        } else {
          const nxt = curr - fx / Math.max(0.2, dfn(curr));
          const pCurve = toPx(curr, fx), pAxis = toPx(nxt, 0), pVert = toPx(curr, 0);
          ctx.save();
          ctx.strokeStyle = pal.amber; ctx.lineWidth = 2.6 * scale;
          ctx.beginPath(); ctx.moveTo(pVert.x, pVert.y); ctx.lineTo(pCurve.x, pCurve.y); ctx.lineTo(pAxis.x, pAxis.y); ctx.stroke();
          ctx.restore();
          this.drawDot(ctx, pCurve.x, pCurve.y, 6.5 * scale, pal.indigo, pal.bg);
          this.drawDot(ctx, pAxis.x, pAxis.y, 6.5 * scale, pal.amber, pal.bg);
          tableRows.push([`n = ${s}`, curr.toFixed(5), fx.toFixed(5), Math.abs(curr - rootExact).toExponential(2)]);
          curr = nxt;
        }
      }
      const pRoot = toPx(rootExact, 0);
      this.drawDot(ctx, pRoot.x, pRoot.y, 8.5 * scale, pal.teal, pal.bg);
      cardLines = [
        { text: sub === 'bisection' ? 'BISECTION BRACKET HALVING' : sub === 'secant_root' ? 'SECANT CHORD ROOT FINDER' : 'NEWTON-RAPHSON TANGENT STEP', color: pal.amber },
        { text: `Target √${cTarget.toFixed(1)} = ${rootExact.toFixed(6)}`, color: pal.ink },
        { text: `Iterate xₙ = ${curr.toFixed(6)}`, color: pal.teal },
        { text: `Error |xₙ − r| = ${Math.abs(curr - rootExact).toExponential(2)}`, color: pal.amber },
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
      const g = sub === 'logistic_map' ? (x) => rRate * x * (1 - x) : (x) => alpha * Math.cos(x);
      this.strokeSampledCurve(ctx, toPx, 0, 1.1, (x) => x, pal.axis, 2.2 * scale, 1);
      this.strokeSampledCurve(ctx, toPx, 0, 1.1, g, pal.indigo, 4 * scale, 1);
      let x = Number(params.x0 ?? 0.2);
      const steps = Math.max(2, Math.floor(22 * animProg));
      ctx.save();
      ctx.strokeStyle = sub === 'logistic_map' ? pal.amber : pal.teal;
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      const startPt = toPx(x, 0);
      ctx.moveTo(startPt.x, startPt.y);
      for (let i = 0; i < steps; i++) {
        const y = g(x);
        const p1 = toPx(x, y), p2 = toPx(y, y);
        ctx.lineTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        if (i < 6) tableRows.push([`n = ${i}`, x.toFixed(4), y.toFixed(4), Math.abs(y - x).toFixed(4)]);
        x = y;
      }
      ctx.stroke();
      ctx.restore();
      this.drawDot(ctx, toPx(x, g(x)).x, toPx(x, g(x)).y, 8 * scale, pal.amber, pal.bg);
      cardLines = [
        { text: sub === 'logistic_map' ? 'LOGISTIC MAP PERIOD-DOUBLING' : 'BANACH CONTRACTION COBWEB', color: pal.amber },
        { text: sub === 'logistic_map' ? `Growth r = ${rRate.toFixed(2)}` : `Contraction α = ${alpha.toFixed(2)}`, color: pal.ink },
        { text: `Orbit State xₙ = ${x.toFixed(5)}`, color: pal.teal },
        { text: `Next g(xₙ) = ${g(x).toFixed(5)}`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Steps', val: `${steps}` },
        { key: 'State xₙ', val: x.toFixed(4) },
        { key: 'g(xₙ)', val: g(x).toFixed(4) },
        { key: '|g(x)−x|', val: Math.abs(g(x) - x).toFixed(4) },
      ];
    } else if (sub === 'montecarlo') {
      const totalN = Math.max(10, Math.round(Number(params.samplesN ?? 160) * animProg));
      const shift = Number(params.seedShift ?? 0.25);
      this.strokeSampledCurve(ctx, toPx, 0, 1, (x) => Math.sqrt(Math.max(0, 1 - x * x)), pal.indigo, 4 * scale, 1);
      let inside = 0;
      for (let i = 1; i <= totalN; i++) {
        let f2 = 0.5, rx = 0, n2 = i;
        while (n2 > 0) { rx += f2 * (n2 % 2); n2 = Math.floor(n2 / 2); f2 /= 2; }
        let f3 = 1 / 3, ry = 0, n3 = i;
        while (n3 > 0) { ry += f3 * (n3 % 3); n3 = Math.floor(n3 / 3); f3 /= 3; }
        rx = (rx + shift) % 1; ry = (ry + shift * 0.7) % 1;
        const isHit = rx * rx + ry * ry <= 1.0;
        if (isHit) inside++;
        const pt = toPx(rx, ry);
        this.drawDot(ctx, pt.x, pt.y, 4.2 * scale, isHit ? pal.teal : pal.amber, pal.bg);
      }
      const piEst = (4 * inside) / totalN;
      cardLines = [
        { text: 'MONTE CARLO QUADRATURE OF π', color: pal.amber },
        { text: `π̂ = 4 · (${inside} / ${totalN}) = ${piEst.toFixed(5)}`, color: pal.ink },
        { text: `Hits Inside Quarter Circle = ${inside}`, color: pal.teal },
        { text: `Error |π̂ − π| = ${Math.abs(piEst - Math.PI).toFixed(5)}`, color: pal.amber },
      ];
      readouts = [
        { key: 'Samples N', val: `${totalN}` },
        { key: 'Hits Inside', val: `${inside}` },
        { key: 'Estimate π̂', val: piEst.toFixed(4) },
        { key: '|π̂ − π|', val: Math.abs(piEst - Math.PI).toFixed(4) },
      ];
      tableRows = [25, 50, 100, totalN].map((n) => [`N = ${n}`, `${Math.round(n * 0.7854)}`, (4 * (Math.round(n * 0.7854) / n)).toFixed(4), Math.abs(4 * (Math.round(n * 0.7854) / n) - Math.PI).toFixed(4)]);
    } else if (sub === 'simpson') {
      const pairsM = Math.max(1, Math.min(6, Math.round(Number(params.panels ?? params.pairsM ?? 3))));
      const freq = Number(params.freq ?? 1.0);
      const fn = (x) => 3.5 + 2.8 * Math.sin(freq * x);
      const bEnd = Math.max(1.2, Math.min(3.5, Number(params.bMax ?? 3.0))), N = 2 * pairsM, h = bEnd / N;
      let simpSum = 0;
      ctx.save();
      for (let m = 0; m < pairsM; m++) {
        const x0 = m * 2 * h, x1 = x0 + h, x2 = x0 + 2 * h;
        const y0 = fn(x0), y1 = fn(x1), y2 = fn(x2);
        simpSum += (h / 3) * (y0 + 4 * y1 + y2);
        // Draw shaded Lagrange quadratic arch over [x0, x2]
        ctx.beginPath();
        ctx.moveTo(toPx(x0, 0).x, toPx(x0, 0).y);
        for (let j = 0; j <= 24; j++) {
          const x = x0 + (2 * h * j) / 24;
          const L0 = ((x - x1) * (x - x2)) / (2 * h * h);
          const L1 = -((x - x0) * (x - x2)) / (h * h);
          const L2 = ((x - x0) * (x - x1)) / (2 * h * h);
          const p = toPx(x, y0 * L0 + y1 * L1 + y2 * L2);
          ctx.lineTo(p.x, p.y);
        }
        ctx.lineTo(toPx(x2, 0).x, toPx(x2, 0).y);
        ctx.closePath();
        ctx.fillStyle = m % 2 === 0 ? pal.amberFill : pal.tealFill;
        ctx.fill();
        ctx.strokeStyle = pal.amber; ctx.lineWidth = 2.4 * scale; ctx.stroke();
        this.drawDot(ctx, toPx(x1, y1).x, toPx(x1, y1).y, 6.5 * scale, pal.amber, pal.bg);
        tableRows.push([`Panel ${m + 1}`, `[${x0.toFixed(2)}, ${x2.toFixed(2)}]`, `4·f(x₁)=${(4 * y1).toFixed(2)}`, ((h / 3) * (y0 + 4 * y1 + y2)).toFixed(4)]);
      }
      ctx.restore();
      this.strokeSampledCurve(ctx, toPx, 0, bEnd, fn, pal.indigo, 4 * scale, 1);
      const exactInt = 3.5 * bEnd + (2.8 / freq) * (1 - Math.cos(freq * bEnd));
      cardLines = [
        { text: "SIMPSON'S 1/3 PARABOLIC QUADRATURE", color: pal.amber },
        { text: `${pairsM} Parabolic Panels (2M = ${N} Subintervals)`, color: pal.ink },
        { text: `Simpson Sum (h/3)(y₀+4y₁+y₂) = ${simpSum.toFixed(5)}`, color: pal.amber },
        { text: `Exact Integral = ${exactInt.toFixed(5)}  (Error ${Math.abs(exactInt - simpSum).toExponential(1)})`, color: pal.teal },
      ];
      readouts = [
        { key: 'Parabolas M', val: `${pairsM}` },
        { key: 'Simpson S_N', val: simpSum.toFixed(4) },
        { key: 'Exact ∫f', val: exactInt.toFixed(4) },
        { key: 'O(h⁴) Error', val: Math.abs(exactInt - simpSum).toExponential(1) },
      ];
    } else {
      // euler vs rk4
      const stepH = Number(params.stepH ?? 0.55);
      const y0 = Number(params.y0 ?? 0.8);
      const exactFn = (x) => y0 * Math.exp(0.55 * x);
      this.strokeSampledCurve(ctx, toPx, 0, 3.4, exactFn, pal.indigo, 4 * scale, 1);
      let cx = 0, cy = y0;
      const nSteps = Math.max(1, Math.min(10, Math.floor((3.2 / stepH) * animProg)));
      for (let i = 0; i < nSteps; i++) {
        const k1 = 0.55 * cy;
        const k2 = 0.55 * (cy + 0.5 * stepH * k1);
        const k3 = 0.55 * (cy + 0.5 * stepH * k2);
        const k4 = 0.55 * (cy + stepH * k3);
        const slope = sub === 'rk4' ? (k1 + 2 * k2 + 2 * k3 + k4) / 6 : k1;
        const nx = cx + stepH, ny = cy + stepH * slope;
        const p0 = toPx(cx, cy), p1 = toPx(nx, ny);
        if (sub === 'rk4') {
          const pm = toPx(cx + 0.5 * stepH, cy + 0.5 * stepH * k1);
          this.drawArrow(ctx, p0.x, p0.y, pm.x, pm.y, pal.teal, 2.2 * scale);
        }
        this.drawArrow(ctx, p0.x, p0.y, p1.x, p1.y, pal.amber, 2.8 * scale);
        this.drawDot(ctx, p0.x, p0.y, 6 * scale, pal.teal, pal.bg);
        tableRows.push([`Step ${i + 1}`, nx.toFixed(2), ny.toFixed(4), Math.abs(exactFn(nx) - ny).toExponential(2)]);
        cx = nx; cy = ny;
      }
      cardLines = [
        { text: sub === 'rk4' ? 'RUNGE-KUTTA RK4 (4-STAGE SLOPES)' : "EULER'S FORWARD TANGENT STEP", color: pal.amber },
        { text: `Step Width h = ${stepH.toFixed(2)}`, color: pal.ink },
        { text: `Numerical yₙ = ${cy.toFixed(4)}`, color: pal.amber },
        { text: `Analytical y(xₙ) = ${exactFn(cx).toFixed(4)}`, color: pal.indigo },
      ];
      readouts = [
        { key: 'Step Size h', val: stepH.toFixed(2) },
        { key: 'Approx yₙ', val: cy.toFixed(3) },
        { key: 'Exact y(xₙ)', val: exactFn(cx).toFixed(3) },
        { key: '|Error|', val: Math.abs(exactFn(cx) - cy).toExponential(1) },
      ];
    }

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, cardLines, pal.panelBorder);
    return { readouts, tableHeaders, tableRows };
  };

  /* ------------------------------------------------------------------------
   * 3. PARAMETRIC & POLAR CURVES ENGINE (9 Distinct Constructions)
   * ------------------------------------------------------------------------ */
  proto.drawParametricScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -2.5, 2.5, -2.2, 2.2, spanEase(time, 0, 0.6), 0.60, true);
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
        const r = 1.85 / (k + 2);
        return {
          x: r * ((k + 1) * Math.cos(t) - Math.cos((k + 1) * t)),
          y: r * ((k + 1) * Math.sin(t) - Math.sin((k + 1) * t)),
        };
      }
      if (sub === 'astroid') {
        const L = Number(params.ladderL ?? 2.0) * 0.96;
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
      // curvature / osculating circle
      const x = -2.1 + (4.2 * t) / (Math.PI * 2);
      const amp = Number(params.amp ?? 1.3);
      return { x, y: amp * Math.sin(1.25 * x) };
    };

    const tHead = prog * Math.PI * 2;
    const c0 = evalCurve(tHead);
    const c1 = evalCurve(tHead + 0.02);
    const vx = (c1.x - c0.x) / 0.02;
    const vy = (c1.y - c0.y) / 0.02;
    const speed = Math.hypot(vx, vy);
    const pHead = toPx(c0.x, c0.y);

    // Subtype-specific mechanical / geometric scaffolding
    ctx.save();
    if (sub === 'lissajous') {
      // Draw bounding harmonic box and X/Y phase projection guides
      const pBL = toPx(-1.9, -1.8);
      const pTR = toPx(1.9, 1.8);
      ctx.strokeStyle = pal.gridMajor;
      ctx.setLineDash([5 * scale, 4 * scale]);
      ctx.strokeRect(pBL.x, pTR.y, pTR.x - pBL.x, pBL.y - pTR.y);
      const pTop = toPx(c0.x, 1.8);
      const pSide = toPx(1.9, c0.y);
      ctx.beginPath();
      ctx.moveTo(pTop.x, pTop.y);
      ctx.lineTo(pHead.x, pHead.y);
      ctx.lineTo(pSide.x, pSide.y);
      ctx.stroke();
      ctx.setLineDash([]);
      this.drawDot(ctx, pTop.x, pTop.y, 5.5 * scale, pal.teal, pal.bg);
      this.drawDot(ctx, pSide.x, pSide.y, 5.5 * scale, pal.amber, pal.bg);
    } else if (sub === 'rose' || sub === 'limacon') {
      // Polar radar grid rings and radial sweep ray
      const pOrig = toPx(sub === 'limacon' ? -0.3 : 0, 0);
      [0.65, 1.3, 1.95].forEach((rad) => {
        const pEdge = toPx((sub === 'limacon' ? -0.3 : 0) + rad, 0);
        ctx.strokeStyle = pal.gridMajor;
        ctx.lineWidth = 1.3 * scale;
        ctx.beginPath();
        ctx.arc(pOrig.x, pOrig.y, Math.abs(pEdge.x - pOrig.x), 0, Math.PI * 2);
        ctx.stroke();
      });
    } else if (sub === 'cycloid') {
      // Rolling wheel on flat road y = -0.8
      const R = Number(params.wheelR ?? 1.0) * 0.62;
      const u = tHead * 2;
      const cxW = R * u - 2.1;
      const cyW = R - 0.8;
      const pCenter = toPx(cxW, cyW);
      const pRim = toPx(cxW + R, cyW);
      const pRoadL = toPx(-2.4, -0.8);
      const pRoadR = toPx(2.4, -0.8);
      ctx.strokeStyle = pal.axis;
      ctx.lineWidth = 2.6 * scale;
      ctx.beginPath();
      ctx.moveTo(pRoadL.x, pRoadL.y);
      ctx.lineTo(pRoadR.x, pRoadR.y);
      ctx.stroke();
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 2.6 * scale;
      ctx.beginPath();
      ctx.arc(pCenter.x, pCenter.y, Math.abs(pRim.x - pCenter.x), 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = pal.amber;
      ctx.beginPath();
      ctx.moveTo(pCenter.x, pCenter.y);
      ctx.lineTo(pHead.x, pHead.y);
      ctx.stroke();
      this.drawDot(ctx, pCenter.x, pCenter.y, 5.5 * scale, pal.teal, pal.bg);
    } else if (sub === 'epicycloid') {
      // Fixed inner circle of radius k*r and rolling outer circle of radius r
      const k = Number(params.kRatio ?? 3);
      const r = 1.85 / (k + 2);
      const Rfix = k * r;
      const pOrig = toPx(0, 0);
      const pFixEdge = toPx(Rfix, 0);
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      ctx.arc(pOrig.x, pOrig.y, Math.abs(pFixEdge.x - pOrig.x), 0, Math.PI * 2);
      ctx.stroke();
      const cxRoll = (Rfix + r) * Math.cos(tHead);
      const cyRoll = (Rfix + r) * Math.sin(tHead);
      const pRoll = toPx(cxRoll, cyRoll);
      const pRollEdge = toPx(cxRoll + r, cyRoll);
      ctx.strokeStyle = pal.amber;
      ctx.beginPath();
      ctx.arc(pRoll.x, pRoll.y, Math.abs(pRollEdge.x - pRoll.x), 0, Math.PI * 2);
      ctx.moveTo(pRoll.x, pRoll.y);
      ctx.lineTo(pHead.x, pHead.y);
      ctx.stroke();
      this.drawDot(ctx, pRoll.x, pRoll.y, 5.5 * scale, pal.amber, pal.bg);
    } else if (sub === 'astroid') {
      // Family of sliding Trammel of Archimedes ladders
      const L = Number(params.ladderL ?? 2.0) * 0.96;
      ctx.strokeStyle = pal.teal;
      ctx.globalAlpha = 0.28;
      ctx.lineWidth = 1.4 * scale;
      for (let i = 0; i < 24; i++) {
        const ang = (i / 24) * Math.PI * 2;
        const p1 = toPx(L * Math.cos(ang), 0);
        const p2 = toPx(0, L * Math.sin(ang));
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // Active sliding ladder bar tangent at tHead
      const pLadX = toPx(L * Math.cos(tHead), 0);
      const pLadY = toPx(0, L * Math.sin(tHead));
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3.4 * scale;
      ctx.beginPath();
      ctx.moveTo(pLadX.x, pLadX.y);
      ctx.lineTo(pLadY.x, pLadY.y);
      ctx.stroke();
      this.drawDot(ctx, pLadX.x, pLadX.y, 6 * scale, pal.teal, pal.bg);
      this.drawDot(ctx, pLadY.x, pLadY.y, 6 * scale, pal.teal, pal.bg);
    } else if (sub === 'spiral') {
      // Also render dashed Archimedean spiral r = a*u for direct contrast
      ctx.strokeStyle = pal.teal;
      ctx.setLineDash([5 * scale, 4 * scale]);
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const u = (i / 200) * Math.PI * 2 * Number(params.turns ?? 2.8);
        const rA = 0.11 * u;
        const p = toPx(rA * Math.cos(u), rA * Math.sin(u));
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (sub === 'lemniscate') {
      // Draw Cassini Foci F1(-c,0) and F2(+c,0) and bipolar lines to P
      const cF = Number(params.fociC ?? 1.6) * 0.88;
      const pF1 = toPx(-cF, 0);
      const pF2 = toPx(cF, 0);
      ctx.strokeStyle = pal.teal;
      ctx.setLineDash([5 * scale, 4 * scale]);
      ctx.lineWidth = 2.2 * scale;
      ctx.beginPath();
      ctx.moveTo(pF1.x, pF1.y);
      ctx.lineTo(pHead.x, pHead.y);
      ctx.lineTo(pF2.x, pF2.y);
      ctx.stroke();
      ctx.setLineDash([]);
      this.drawDot(ctx, pF1.x, pF1.y, 7 * scale, pal.teal, pal.bg);
      this.drawDot(ctx, pF2.x, pF2.y, 7 * scale, pal.teal, pal.bg);
    } else if (sub === 'curvature') {
      // Draw kissing osculating circle of radius R = 1/kappa
      const x0 = Number(params.x0 ?? (-1.2 + 2.4 * prog));
      const amp = Number(params.amp ?? 1.3);
      const kW = 1.25;
      const y0 = amp * Math.sin(kW * x0);
      const dy = amp * kW * Math.cos(kW * x0);
      const d2y = -amp * kW * kW * Math.sin(kW * x0);
      const denom = Math.abs(d2y) > 0.08 ? d2y : (d2y >= 0 ? 0.08 : -0.08);
      const factor = (1 + dy * dy) / denom;
      const xc = x0 - dy * factor;
      const yc = y0 + factor;
      const Rosc = Math.min(2.6, Math.hypot(x0 - xc, y0 - yc));
      const pContact = toPx(x0, y0);
      const pCenter = toPx(xc, yc);
      const pRadEdge = toPx(xc + Rosc, yc);
      ctx.strokeStyle = pal.amber;
      ctx.fillStyle = pal.amberFill;
      ctx.lineWidth = 2.6 * scale;
      ctx.beginPath();
      ctx.arc(pCenter.x, pCenter.y, Math.abs(pRadEdge.x - pCenter.x), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      this.drawArrow(ctx, pContact.x, pContact.y, pCenter.x, pCenter.y, pal.teal, 2.4 * scale);
      this.drawDot(ctx, pCenter.x, pCenter.y, 6 * scale, pal.amber, pal.bg);
    }
    ctx.restore();

    // Primary curve trace
    const totalSamples = 260;
    const visSamples = sub === 'curvature' ? totalSamples : Math.max(12, Math.floor(totalSamples * prog));
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

    const pVel = toPx(c0.x + (vx / Math.max(0.5, speed)) * 0.65, c0.y + (vy / Math.max(0.5, speed)) * 0.65);
    const pOrigin = toPx(0, 0);
    if (sub !== 'cycloid' && sub !== 'astroid' && sub !== 'curvature') {
      this.drawArrow(ctx, pOrigin.x, pOrigin.y, pHead.x, pHead.y, pal.amber, 2.2 * scale);
    }
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
        { text: `PARAMETRIC LOCUS: ${sub.toUpperCase()}`, color: pal.amber, gap: 34 * scale },
        { text: `Phase Angle t = ${((tHead * 180) / Math.PI).toFixed(1)}°`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Position r(t) = (${c0.x.toFixed(3)}, ${c0.y.toFixed(3)})`, color: pal.indigo, gap: 34 * scale },
        { text: `Polar Radius |r(t)| = ${Math.hypot(c0.x, c0.y).toFixed(3)}`, color: pal.amber, gap: 34 * scale },
        { text: `Tangent Speed ‖v(t)‖ = ${speed.toFixed(3)}`, color: pal.teal, gap: 32 * scale },
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
   * 4. FOURIER SERIES, SIGNAL PROCESSING & LAPLACE ENGINE (8 Distinct Visuals)
   * ------------------------------------------------------------------------ */
  proto.drawFourierScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height > bounds.width * 1.1;

    // 1. Classic Square Wave Epicycle Chain (#042)
    if (sub === 'square_wave') {
      const N = Math.max(1, Math.min(25, Math.round(Number(params.harmonics ?? 5))));
      const freq = Number(params.freq ?? 1.0);
      const omegaT = time * freq * 1.8;
      const cx = padX + Math.round(plotW * 0.18);
      const cy = plotTop + Math.round(plotH * (isTall ? 0.28 : 0.46));
      const baseR = Math.min(plotW * 0.13, plotH * 0.26);
      this.lastPlotMapper = { unitCircle: { cx, cy, radius: baseR } };

      let ex = cx;
      let ey = cy;
      ctx.save();
      for (let k = 0; k < Math.min(N, 12); k++) {
        const n = 2 * k + 1;
        const amp = (4 / Math.PI) * (1 / n);
        const r = amp * baseR;
        const ang = n * omegaT;
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

      const waveX0 = padX + Math.round(plotW * 0.35);
      const waveW = Math.round(plotW * (isTall ? 0.62 : 0.28));
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 2.2 * scale;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(waveX0, ey);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = pal.axis;
      ctx.lineWidth = 1.8 * scale;
      ctx.beginPath();
      ctx.moveTo(waveX0, cy);
      ctx.lineTo(waveX0 + waveW, cy);
      ctx.stroke();

      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const phase = omegaT - (i / 200) * Math.PI * 2.5;
        let ySum = 0;
        for (let k = 0; k < N; k++) {
          const n = 2 * k + 1;
          ySum += (4 / (Math.PI * n)) * Math.sin(n * phase);
        }
        const wx = waveX0 + (i / 200) * waveW;
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
      const nMax = 2 * N - 1;
      const cMax = 4 / (Math.PI * nMax);
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'FOURIER SQUARE WAVE EPICYCLES', color: pal.amber, gap: 34 * scale },
        { text: `Odd Harmonics N = ${N} (up to ${nMax}ω)`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `f(t) = (4/π) ∑ sin((2k-1)ωt)/(2k-1)`, color: pal.indigo, gap: 34 * scale },
        { text: `Outer Epicycle |c_${nMax}| = ${cMax.toFixed(4)}`, color: pal.amber, gap: 34 * scale },
        { text: `Chained Phasors Trace Square Step`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Harmonics N', val: `${N}` },
          { key: 'Max Mode', val: `${nMax}ω` },
          { key: 'Coeff |c_N|', val: cMax.toFixed(3) },
          { key: 'Base ω', val: freq.toFixed(2) },
        ],
        tableHeaders: ['Term k', 'Mode (2k-1)ω', 'Amplitude cₙ', 'Power cₙ²'],
        tableRows: Array.from({ length: Math.min(5, N) }, (_, k) => {
          const n = 2 * k + 1;
          const a = 4 / (Math.PI * n);
          return [`k = ${k + 1}`, `${n}ω`, a.toFixed(4), (a * a).toFixed(4)];
        }),
      };
    }

    // All other 7 Signal Processing scenes use a coordinate plot area
    const plot = this.createPlotArea(ctx, pal, bounds, 0, 4.0, -1.6, 1.6, spanEase(time, 0, 0.5), 0.60);
    const { toPx, areaX, areaY, areaW, areaH } = plot;
    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;

    if (sub === 'nyquist_aliasing') {
      const fSig = Number(params.fSignal ?? 1.8);
      const fSamp = Number(params.fSample ?? 1.3);
      const kFold = Math.round(fSig / fSamp);
      const fAlias = Math.abs(fSig - kFold * fSamp);
      const phaseShift = time * 0.7;

      // 1. True high-frequency cosine (faint indigo)
      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.globalAlpha = 0.48;
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) {
        const t = (4.0 * i) / 240;
        const y = 1.25 * Math.cos(2 * Math.PI * fSig * t - phaseShift);
        const p = toPx(t, y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // 2. Reconstructed low-frequency alias wave (thick amber)
      ctx.globalAlpha = 1;
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 4.0 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 220; i++) {
        const t = (4.0 * i) / 220;
        const sign = fSig - kFold * fSamp >= 0 ? 1 : -1;
        const y = 1.25 * Math.cos(2 * Math.PI * fAlias * t - sign * phaseShift);
        const p = toPx(t, y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // 3. Discrete ADC lollipop sample stems at multiples of Ts = 1/fSamp
      const dt = 1 / Math.max(0.4, fSamp);
      for (let t = 0; t <= 4.0; t += dt) {
        const y = 1.25 * Math.cos(2 * Math.PI * fSig * t - phaseShift);
        const p0 = toPx(t, 0);
        const p1 = toPx(t, y);
        ctx.strokeStyle = pal.teal;
        ctx.lineWidth = 2.4 * scale;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        this.drawDot(ctx, p1.x, p1.y, 6.5 * scale, pal.teal, pal.bg);
      }
      ctx.restore();

      const nyquistOk = fSamp >= 2 * fSig;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'NYQUIST-SHANNON SAMPLING & ALIASING', color: pal.amber, gap: 34 * scale },
        { text: `f_sig = ${fSig.toFixed(2)} Hz, f_s = ${fSamp.toFixed(2)} Hz`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Nyquist Limit 2·f_sig = ${(2 * fSig).toFixed(2)} Hz`, color: pal.indigo, gap: 34 * scale },
        { text: `Folded Alias f_a = |f - k·f_s| = ${fAlias.toFixed(2)} Hz`, color: pal.amber, gap: 34 * scale },
        { text: nyquistOk ? '✓ Exact Reconstruction (No Aliasing)' : '⚠ Undersampled! Phantom Alias Wave', color: nyquistOk ? pal.teal : pal.amber, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Signal f₀', val: `${fSig.toFixed(2)} Hz` },
          { key: 'Sample f_s', val: `${fSamp.toFixed(2)} Hz` },
          { key: 'Alias f_a', val: `${fAlias.toFixed(2)} Hz` },
          { key: 'Regime', val: nyquistOk ? 'Exact' : 'Aliased' },
        ],
        tableHeaders: ['Sample k', 'Time k·T_s', 'x(k·T_s)', 'Alias Cos'],
        tableRows: [0, 1, 2, 3, 4].map((k) => {
          const t = k * dt;
          const v = Math.cos(2 * Math.PI * fSig * t);
          return [`k = ${k}`, `${t.toFixed(2)} s`, v.toFixed(4), v.toFixed(4)];
        }),
      };
    }

    if (sub === 'hilbert_analytic') {
      const fC = Number(params.carrierF ?? 3.2);
      const bw = Number(params.modBW ?? 1.1);
      const tMid = 2.0;

      ctx.save();
      // Upper/Lower Analytic Envelope ±A(t)
      [1, -1].forEach((sgn) => {
        ctx.strokeStyle = pal.amber;
        ctx.setLineDash([6 * scale, 4 * scale]);
        ctx.lineWidth = 2.8 * scale;
        ctx.beginPath();
        for (let i = 0; i <= 180; i++) {
          const t = (4.0 * i) / 180;
          const env = sgn * 1.35 * Math.exp(-bw * (t - tMid) * (t - tMid));
          const p = toPx(t, env);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Quadrature Hilbert 90°-shifted component x_hat(t) (teal)
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 220; i++) {
        const t = (4.0 * i) / 220;
        const env = 1.35 * Math.exp(-bw * (t - tMid) * (t - tMid));
        const yH = env * Math.sin(2 * Math.PI * fC * (t - tMid) - time * 2.2);
        const p = toPx(t, yH);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Real In-phase wave packet x(t) (indigo)
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 220; i++) {
        const t = (4.0 * i) / 220;
        const env = 1.35 * Math.exp(-bw * (t - tMid) * (t - tMid));
        const yR = env * Math.cos(2 * Math.PI * fC * (t - tMid) - time * 2.2);
        const p = toPx(t, yR);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'HILBERT TRANSFORM & ANALYTIC SIGNAL', color: pal.amber, gap: 34 * scale },
        { text: `z(t) = x(t) + i·x̂(t) = A(t)e^{iφ(t)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `In-Phase Signal x(t) (Indigo)`, color: pal.indigo, gap: 34 * scale },
        { text: `Quadrature -90° Shift x̂(t) (Teal)`, color: pal.teal, gap: 34 * scale },
        { text: `Envelope A(t) = √(x² + x̂²) (Amber)`, color: pal.amber, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Carrier f_c', val: `${fC.toFixed(1)} Hz` },
          { key: 'Pulse BW', val: bw.toFixed(2) },
          { key: 'Phase Shift', val: '-90° (-π/2)' },
          { key: 'Peak |z(t)|', val: '1.350' },
        ],
        tableHeaders: ['Time t', 'x(t)', 'Hilbert x̂(t)', 'Envelope A(t)'],
        tableRows: [0.8, 1.4, 2.0, 2.6, 3.2].map((t) => {
          const env = 1.35 * Math.exp(-bw * (t - tMid) * (t - tMid));
          const xR = env * Math.cos(2 * Math.PI * fC * (t - tMid));
          const xH = env * Math.sin(2 * Math.PI * fC * (t - tMid));
          return [t.toFixed(1), xR.toFixed(3), xH.toFixed(3), env.toFixed(3)];
        }),
      };
    }

    if (sub === 'gibbs') {
      const N = Math.max(1, Math.round(Number(params.harmonics ?? 9)));
      const freq = Number(params.freq ?? 1.0);
      ctx.save();
      // Ideal square wave step (dashed teal)
      ctx.strokeStyle = pal.teal;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 2.4 * scale;
      const pS1 = toPx(0, -1.0);
      const pS2 = toPx(2.0, -1.0);
      const pS3 = toPx(2.0, 1.0);
      const pS4 = toPx(4.0, 1.0);
      ctx.beginPath();
      ctx.moveTo(pS1.x, pS1.y);
      ctx.lineTo(pS2.x, pS2.y);
      ctx.lineTo(pS3.x, pS3.y);
      ctx.lineTo(pS4.x, pS4.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Partial sum with ringing overshoot horns
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      let maxOver = 1.0;
      let overX = 2.1;
      for (let i = 0; i <= 260; i++) {
        const t = (4.0 * i) / 260;
        const u = (t - 2.0) * 1.5 * freq;
        let sum = 0;
        for (let k = 0; k < N; k++) {
          const n = 2 * k + 1;
          sum += (4 / (Math.PI * n)) * Math.sin(n * u);
        }
        if (sum > maxOver) {
          maxOver = sum;
          overX = t;
        }
        const p = toPx(t, sum);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();

      const pHorn = toPx(overX, maxOver);
      this.drawDot(ctx, pHorn.x, pHorn.y, 7.5 * scale, pal.amber, pal.bg);

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'GIBBS PHENOMENON (~8.95% OVERSHOOT)', color: pal.amber, gap: 34 * scale },
        { text: `Truncation Order N = ${N} Harmonics`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Peak Horn Amplitude = ${maxOver.toFixed(4)}`, color: pal.amber, gap: 34 * scale },
        { text: `Wilbraham-Gibbs Constant = 1.17898`, color: pal.indigo, gap: 34 * scale },
        { text: `Overshoot Never Vanishes as N → ∞`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Terms N', val: `${N}` },
          { key: 'Peak Horn', val: maxOver.toFixed(4) },
          { key: 'Overshoot %', val: '8.949%' },
          { key: 'Si(π)/π', val: '0.58949' },
        ],
        tableHeaders: ['Order N', 'Horn Peak', 'Jump %', 'Convergence'],
        tableRows: [3, 7, 15, 25].map((n) => [`N = ${n}`, '1.1790', '+8.95%', 'L² Only (Not Uniform)']),
      };
    }

    if (sub === 'beats') {
      const f1 = Number(params.f1 ?? 5.0);
      const f2 = Number(params.f2 ?? 5.8);
      const fBeat = Math.abs(f1 - f2);
      const fAvg = 0.5 * (f1 + f2);

      ctx.save();
      // Slow beat modulation envelope ±2*cos(pi*(f1-f2)*t)
      [1, -1].forEach((sgn) => {
        ctx.strokeStyle = pal.amber;
        ctx.setLineDash([6 * scale, 4 * scale]);
        ctx.lineWidth = 2.6 * scale;
        ctx.beginPath();
        for (let i = 0; i <= 180; i++) {
          const t = (4.0 * i) / 180;
          const env = sgn * 1.35 * Math.cos(Math.PI * fBeat * t - time * 0.6);
          const p = toPx(t, env);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Rapid carrier inside beat packets
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.6 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 260; i++) {
        const t = (4.0 * i) / 260;
        const y = 1.35 * Math.cos(Math.PI * fBeat * t - time * 0.6) * Math.cos(2 * Math.PI * fAvg * 0.85 * t - time * 2);
        const p = toPx(t, y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'ACOUSTIC BEATS & WAVE INTERFERENCE', color: pal.amber, gap: 34 * scale },
        { text: `f₁ = ${f1.toFixed(2)} Hz, f₂ = ${f2.toFixed(2)} Hz`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Carrier ½(f₁+f₂) = ${fAvg.toFixed(2)} Hz`, color: pal.indigo, gap: 34 * scale },
        { text: `Beat Envelope |f₁-f₂| = ${fBeat.toFixed(2)} Hz`, color: pal.amber, gap: 34 * scale },
        { text: `Constructive / Destructive Nodes`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Tone f₁', val: `${f1.toFixed(1)} Hz` },
          { key: 'Tone f₂', val: `${f2.toFixed(1)} Hz` },
          { key: 'Beat |Δf|', val: `${fBeat.toFixed(2)} Hz` },
          { key: 'Avg Carrier', val: `${fAvg.toFixed(2)} Hz` },
        ],
        tableHeaders: ['Metric', 'Formula', 'Frequency', 'Period T'],
        tableRows: [
          ['Tone 1', 'f₁', `${f1.toFixed(2)} Hz`, `${(1 / f1).toFixed(3)} s`],
          ['Tone 2', 'f₂', `${f2.toFixed(2)} Hz`, `${(1 / f2).toFixed(3)} s`],
          ['Beat Node', '|f₁ - f₂|', `${fBeat.toFixed(2)} Hz`, `${(1 / Math.max(0.05, fBeat)).toFixed(2)} s`],
        ],
      };
    }

    if (sub === 'am_fm') {
      const mIdx = Number(params.modIndex ?? 0.65);
      const fc = Number(params.carrierF ?? 4.0);
      ctx.save();
      // Upper trace: AM wave around y = +0.75
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.2 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) {
        const t = (4.0 * i) / 240;
        const env = 0.45 * (1 + mIdx * Math.cos(2 * Math.PI * 0.5 * t - time));
        const y = 0.78 + env * Math.cos(2 * Math.PI * fc * 0.7 * t);
        const p = toPx(t, y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Lower trace: FM wave (constant amplitude, compressed/rarefied frequency) around y = -0.75
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 3.2 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) {
        const t = (4.0 * i) / 240;
        const phase = 2 * Math.PI * fc * 0.7 * t + 3.2 * mIdx * Math.sin(2 * Math.PI * 0.5 * t - time);
        const y = -0.78 + 0.55 * Math.cos(phase);
        const p = toPx(t, y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'AM VS. FM MODULATION COMPARISON', color: pal.amber, gap: 34 * scale },
        { text: `Modulation Index m = ${mIdx.toFixed(2)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Top (Indigo): AM Varies Amplitude`, color: pal.indigo, gap: 34 * scale },
        { text: `Bottom (Teal): FM Varies Instant Freq`, color: pal.teal, gap: 34 * scale },
        { text: `FM Constant Envelope Resists Noise`, color: pal.amber, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Mod Index m', val: mIdx.toFixed(2) },
          { key: 'Carrier f_c', val: `${fc.toFixed(1)} Hz` },
          { key: 'AM Sidebands', val: 'f_c ± f_m' },
          { key: 'FM Spectrum', val: 'Bessel J_n(β)' },
        ],
        tableHeaders: ['Scheme', 'Signal Equation', 'Envelope', 'Bandwidth'],
        tableRows: [
          ['AM (Top)', '[1 + m·cos(ω_m t)]cos(ω_c t)', 'Varies ±m', '2·f_m'],
          ['FM (Bot)', 'cos(ω_c t + β·sin(ω_m t))', 'Constant 1.0', '2(Δf + f_m)'],
        ],
      };
    }

    if (sub === 'dirichlet') {
      const N = Math.max(1, Math.round(Number(params.harmonics ?? params.orderN ?? 6)));
      const freq = Number(params.freq ?? 1.0);
      ctx.save();
      ctx.fillStyle = pal.indigoFill;
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      const pLeft = toPx(0, 0);
      ctx.moveTo(pLeft.x, pLeft.y);
      for (let i = 0; i <= 240; i++) {
        const t = (4.0 * i) / 240;
        const theta = (t - 2.0) * 1.45 * freq;
        const val =
          Math.abs(theta) < 1e-4
            ? 1.4
            : (1.4 * Math.sin((N + 0.5) * theta)) / ((2 * N + 1) * Math.sin(0.5 * theta));
        const p = toPx(t, val);
        ctx.lineTo(p.x, p.y);
      }
      const pRight = toPx(4.0, 0);
      ctx.lineTo(pRight.x, pRight.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      const pPeak = toPx(2.0, 1.4);
      this.drawDot(ctx, pPeak.x, pPeak.y, 7.5 * scale, pal.amber, pal.bg);

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'DIRICHLET KERNEL & SINC SPECTRUM', color: pal.amber, gap: 34 * scale },
        { text: `Kernel Order N = ${N} (Width 2N+1 = ${2 * N + 1})`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `D_N(θ) = sin((N+½)θ) / sin(½θ)`, color: pal.indigo, gap: 34 * scale },
        { text: `Main Lobe Width Δθ = 4π/(2N+1)`, color: pal.amber, gap: 34 * scale },
        { text: `Alternating Side-Lobes Cause Gibbs`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Order N', val: `${N}` },
          { key: 'Peak D_N(0)', val: `${2 * N + 1}` },
          { key: 'Null θ₁', val: `${(2 * Math.PI / (2 * N + 1)).toFixed(3)}` },
          { key: 'Side-Lobe', val: '-21.7%' },
        ],
        tableHeaders: ['Feature', 'Angle θ', 'Normalized Value', 'Role'],
        tableRows: [
          ['Main Peak', 'θ = 0', '1.0000', 'Dirac Delta Limit'],
          ['First Null', `2π/${2 * N + 1}`, '0.0000', 'Resolution Limit'],
          ['1st Side-Lobe', `3π/${2 * N + 1}`, '-0.2172', 'Spectral Leakage'],
        ],
      };
    }

    // Default: laplace_splane (#049) — Split view: Left s-plane poles + Right h(t) impulse response
    const sigma = Number(params.sigma ?? -0.35);
    const omega = Number(params.omega ?? 3.5);
    ctx.save();
    // Draw left s-plane box in x ∈ [0.15, 1.45], y ∈ [-1.3, 1.3]
    const pReL = toPx(0.15, 0);
    const pReR = toPx(1.45, 0);
    const pImB = toPx(0.95, -1.35);
    const pImT = toPx(0.95, 1.35);
    // Shade LHP stable zone
    ctx.fillStyle = pal.tealFill;
    ctx.fillRect(pReL.x, pImT.y, pImB.x - pReL.x, pImB.y - pImT.y);
    ctx.strokeStyle = pal.axis;
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(pReL.x, pReL.y);
    ctx.lineTo(pReR.x, pReR.y);
    ctx.moveTo(pImB.x, pImB.y);
    ctx.lineTo(pImT.x, pImT.y);
    ctx.stroke();

    // Conjugate pole locations in s-plane
    const poleX = 0.95 + sigma * 0.55;
    const pPole1 = toPx(poleX, Math.min(1.25, omega * 0.22));
    const pPole2 = toPx(poleX, -Math.min(1.25, omega * 0.22));
    const poleColor = sigma <= 0 ? pal.teal : pal.amber;
    [pPole1, pPole2].forEach((pp) => {
      ctx.strokeStyle = poleColor;
      ctx.lineWidth = 3.2 * scale;
      const s = 8 * scale;
      ctx.beginPath();
      ctx.moveTo(pp.x - s, pp.y - s);
      ctx.lineTo(pp.x + s, pp.y + s);
      ctx.moveTo(pp.x + s, pp.y - s);
      ctx.lineTo(pp.x - s, pp.y + s);
      ctx.stroke();
    });

    // Right region x ∈ [1.7, 3.95]: Impulse response h(t) = e^{sigma*t} cos(omega*t)
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 3.6 * scale;
    ctx.beginPath();
    for (let i = 0; i <= 180; i++) {
      const u = (i / 180) * 2.25;
      const x = 1.7 + u;
      const env = Math.min(1.45, 0.85 * Math.exp(sigma * u * 1.4));
      const y = env * Math.cos(omega * u * 1.4 - time * 1.8);
      const p = toPx(x, y);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();

    const regime = sigma < -0.02 ? 'Asymptotically Stable (LHP)' : sigma > 0.02 ? 'Unstable Runaway (RHP)' : 'Marginally Stable (iω Axis)';
    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
      { text: 'LAPLACE s-PLANE POLES & IMPULSE RESPONSE', color: pal.amber, gap: 34 * scale },
      { text: `Poles s = ${sigma.toFixed(2)} ± ${omega.toFixed(2)}i`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
      { text: `h(t) = e^{${sigma.toFixed(2)}t} cos(${omega.toFixed(2)}t)`, color: pal.indigo, gap: 34 * scale },
      { text: regime, color: sigma <= 0 ? pal.teal : pal.amber, gap: 34 * scale },
      { text: `Left: s-Plane × Poles | Right: h(t)`, color: pal.teal, gap: 32 * scale },
    ], pal.panelBorder);

    return {
      readouts: [
        { key: 'Real σ', val: sigma.toFixed(2) },
        { key: 'Imag ω', val: omega.toFixed(2) },
        { key: '|s| Pole', val: Math.hypot(sigma, omega).toFixed(2) },
        { key: 'Stability', val: sigma <= 0 ? 'Stable' : 'Unstable' },
      ],
      tableHeaders: ['Time t', 'Envelope e^{σt}', 'Impulse h(t)', 'Region'],
      tableRows: [0, 0.5, 1.0, 1.5, 2.0].map((t) => {
        const env = Math.exp(sigma * t);
        return [t.toFixed(1), env.toFixed(4), (env * Math.cos(omega * t)).toFixed(4), sigma <= 0 ? 'Re(s) ≤ 0' : 'Re(s) > 0'];
      }),
    };
  };


  /* ------------------------------------------------------------------------
   * 5. DIFFERENTIAL EQUATIONS, SLOPE FIELDS & PHASE PORTRAITS ENGINE (8 Distinct Visuals)
   * ------------------------------------------------------------------------ */
  proto.drawSlopeFieldScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const { scale, padX, plotW } = bounds;
    const prog = Math.max(0.18, spanEase(time, 0.25, duration * 0.85));

    // Phase-plane 2D systems: predator_prey, vanderpol, pendulum
    if (sub === 'predator_prey' || sub === 'vanderpol' || sub === 'pendulum') {
      const plot = this.createPlotArea(ctx, pal, bounds, -2.6, 2.6, -2.2, 2.2, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;

      const fieldVec = (x, y) => {
        if (sub === 'predator_prey') {
          const alpha = Number(params.alpha ?? 1.2);
          const beta = Number(params.beta ?? 0.8);
          const X = x + 1.6;
          const Y = y + 1.4;
          return { dx: alpha * X - beta * X * Y, dy: 0.7 * X * Y - 1.0 * Y };
        }
        if (sub === 'vanderpol') {
          const mu = Number(params.mu ?? 1.2);
          return { dx: y, dy: mu * (1 - x * x) * y - x };
        }
        // pendulum: dx = omega, dy = -sin(theta) - b*omega
        const damp = Number(params.damping ?? 0.12);
        return { dx: y, dy: -1.8 * Math.sin(x * 1.2) - damp * y };
      };

      // 2D Phase Vector Field
      ctx.save();
      ctx.strokeStyle = pal.muted;
      ctx.globalAlpha = 0.52;
      ctx.lineWidth = 1.6 * scale;
      for (let gx = -2.2; gx <= 2.2; gx += 0.55) {
        for (let gy = -1.8; gy <= 1.8; gy += 0.55) {
          const { dx, dy } = fieldVec(gx, gy);
          const mag = Math.max(0.25, Math.hypot(dx, dy));
          const len = 0.18;
          const p0 = toPx(gx - (dx / mag) * len * 0.5, gy - (dy / mag) * len * 0.5);
          const p1 = toPx(gx + (dx / mag) * len * 0.5, gy + (dy / mag) * len * 0.5);
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Background structure specific to each phase portrait
      ctx.save();
      if (sub === 'predator_prey') {
        // Equilibrium nullcline crosshairs
        const pEqH1 = toPx(-2.4, 0.1);
        const pEqH2 = toPx(2.4, 0.1);
        const pEqV1 = toPx(-0.2, -2.0);
        const pEqV2 = toPx(-0.2, 2.0);
        ctx.strokeStyle = pal.teal;
        ctx.setLineDash([5 * scale, 4 * scale]);
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(pEqH1.x, pEqH1.y);
        ctx.lineTo(pEqH2.x, pEqH2.y);
        ctx.moveTo(pEqV1.x, pEqV1.y);
        ctx.lineTo(pEqV2.x, pEqV2.y);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (sub === 'pendulum') {
        // Separatrix eye curves ±sqrt(2*(1 + cos(x)))
        [1, -1].forEach((sgn) => {
          ctx.strokeStyle = pal.teal;
          ctx.setLineDash([5 * scale, 4 * scale]);
          ctx.lineWidth = 2.2 * scale;
          ctx.beginPath();
          for (let i = 0; i <= 140; i++) {
            const x = -2.5 + (5.0 * i) / 140;
            const y = sgn * 1.35 * Math.sqrt(Math.max(0, 1 + Math.cos(x * 1.2)));
            const p = toPx(x, y);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
        });
        ctx.setLineDash([]);
      }
      ctx.restore();

      // Integrate 2D phase trajectory
      let px = sub === 'predator_prey' ? 0.5 : Number(params.rInit ?? params.theta0 ?? 1.6) - 0.3;
      let py = sub === 'predator_prey' ? -0.6 : Number(params.omegaInit ?? 0.9);
      const dt = 0.035;
      const steps = Math.floor(170 * prog);
      const orb = [];
      for (let i = 0; i <= steps; i++) {
        orb.push({ x: px, y: py });
        const v1 = fieldVec(px, py);
        const v2 = fieldVec(px + 0.5 * dt * v1.dx, py + 0.5 * dt * v1.dy);
        px = Math.max(-2.4, Math.min(2.4, px + dt * v2.dx));
        py = Math.max(-2.0, Math.min(2.0, py + dt * v2.dy));
      }

      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      orb.forEach((pt, idx) => {
        const p = toPx(pt.x, pt.y);
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      ctx.restore();

      const last = orb[orb.length - 1] || { x: px, y: py };
      const pHead = toPx(last.x, last.y);
      this.drawDot(ctx, pHead.x, pHead.y, 8 * scale, pal.amber, pal.bg);

      const titleMap = {
        predator_prey: 'LOTKA-VOLTERRA PREDATOR-PREY ORBIT',
        vanderpol: 'VAN DER POL LIMIT CYCLE ATTRACTOR',
        pendulum: 'NONLINEAR PENDULUM SEPARATRIX EYE',
      };
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: titleMap[sub], color: pal.amber, gap: 34 * scale },
        { text: `Phase State = (${last.x.toFixed(2)}, ${last.y.toFixed(2)})`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: sub === 'predator_prey' ? 'Closed Conservative Loop V(x,y)=C' : sub === 'vanderpol' ? 'Self-Sustained Limit Cycle (μ > 0)' : 'Inside Eye: Libration | Outside: Rotation', color: pal.indigo, gap: 34 * scale },
        { text: `Speed ‖(ẋ, ẏ)‖ = ${Math.hypot(fieldVec(last.x, last.y).dx, fieldVec(last.x, last.y).dy).toFixed(3)}`, color: pal.teal, gap: 34 * scale },
        { text: `2D Phase Portrait Flow`, color: pal.amber, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'State X', val: last.x.toFixed(2) },
          { key: 'State Y', val: last.y.toFixed(2) },
          { key: 'Radius r', val: Math.hypot(last.x, last.y).toFixed(2) },
          { key: 'Portrait', val: sub === 'vanderpol' ? 'Limit Cycle' : 'Phase Orbit' },
        ],
        tableHeaders: ['Step', 'State x(t)', 'State y(t)', 'Phase Radius'],
        tableRows: [0, 0.25, 0.5, 0.75, 1.0].map((f) => {
          const st = orb[Math.min(orb.length - 1, Math.floor(f * (orb.length - 1)))] || last;
          return [`${Math.round(f * 100)}%`, st.x.toFixed(3), st.y.toFixed(3), Math.hypot(st.x, st.y).toFixed(3)];
        }),
      };
    }

    // Epidemic SIR 3-Curve Compartment Model (#056)
    if (sub === 'sir') {
      const plot = this.createPlotArea(ctx, pal, bounds, 0, 10.0, -0.05, 1.08, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
      const beta = Number(params.beta ?? 0.65);
      const gamma = Number(params.gamma ?? 0.22);
      const R0 = beta / Math.max(0.05, gamma);

      let S = 0.96;
      let I = 0.04;
      let R = 0.0;
      const dt = 0.08;
      const steps = Math.floor(125 * prog);
      const hist = [];
      let peakI = I;
      let peakT = 0;
      for (let i = 0; i <= steps; i++) {
        const t = i * dt;
        hist.push({ t, S, I, R });
        if (I > peakI) {
          peakI = I;
          peakT = t;
        }
        const dS = -beta * S * I;
        const dI = beta * S * I - gamma * I;
        const dR = gamma * I;
        S = Math.max(0, S + dt * dS);
        I = Math.max(0, I + dt * dI);
        R = Math.min(1, R + dt * dR);
      }

      const drawComp = (key, color) => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3.8 * scale;
        ctx.beginPath();
        hist.forEach((h, idx) => {
          const p = toPx(h.t, h[key]);
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.restore();
      };
      drawComp('S', pal.indigo);
      drawComp('I', pal.amber);
      drawComp('R', pal.teal);

      const pPeak = toPx(peakT, peakI);
      this.drawDot(ctx, pPeak.x, pPeak.y, 7.5 * scale, pal.amber, pal.bg);

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'SIR EPIDEMIC COMPARTMENT DYNAMICS', color: pal.amber, gap: 34 * scale },
        { text: `Basic Reproduction R₀ = β/γ = ${R0.toFixed(2)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Indigo: Susceptible S(t) | Amber: Infected I(t)`, color: pal.indigo, gap: 34 * scale },
        { text: `Teal: Recovered R(t) (S + I + R = 1)`, color: pal.teal, gap: 34 * scale },
        { text: `Peak Infection I_max = ${(peakI * 100).toFixed(1)}% at t=${peakT.toFixed(1)}`, color: pal.amber, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'R₀ = β/γ', val: R0.toFixed(2) },
          { key: 'Peak I_max', val: `${(peakI * 100).toFixed(1)}%` },
          { key: 'Herd Thresh', val: `${(Math.max(0, 1 - 1 / R0) * 100).toFixed(0)}%` },
          { key: 'Final R(∞)', val: `${(R * 100).toFixed(1)}%` },
        ],
        tableHeaders: ['Time t', 'Susceptible S', 'Infectious I', 'Recovered R'],
        tableRows: [0, 0.25, 0.5, 0.75, 1.0].map((f) => {
          const st = hist[Math.min(hist.length - 1, Math.floor(f * (hist.length - 1)))] || { t: 0, S: 1, I: 0, R: 0 };
          return [st.t.toFixed(1), st.S.toFixed(3), st.I.toFixed(3), st.R.toFixed(3)];
        }),
      };
    }

    // Supercritical Pitchfork Bifurcation Diagram (#057)
    if (sub === 'pitchfork') {
      const plot = this.createPlotArea(ctx, pal, bounds, -1.5, 2.5, -1.8, 1.8, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
      const rP = Number(params.rParam ?? 1.3);

      ctx.save();
      // Stable y = 0 for r < 0
      const pL0 = toPx(-1.4, 0);
      const pC0 = toPx(0, 0);
      const pR0 = toPx(2.4, 0);
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      ctx.moveTo(pL0.x, pL0.y);
      ctx.lineTo(pC0.x, pC0.y);
      ctx.stroke();

      // Unstable y = 0 for r > 0 (dashed amber)
      ctx.strokeStyle = pal.amber;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(pC0.x, pC0.y);
      ctx.lineTo(pR0.x, pR0.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Symmetric stable pitchfork branches y = ±sqrt(r) for r > 0
      [1, -1].forEach((sgn) => {
        ctx.strokeStyle = pal.indigo;
        ctx.lineWidth = 4 * scale;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const r = (2.4 * i) / 120;
          const y = sgn * Math.sqrt(r);
          const p = toPx(r, y);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });

      // Vertical slice at active control parameter r = rP
      const pSliceB = toPx(rP, -1.65);
      const pSliceT = toPx(rP, 1.65);
      ctx.strokeStyle = pal.gridMajor;
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(pSliceB.x, pSliceB.y);
      ctx.lineTo(pSliceT.x, pSliceT.y);
      ctx.stroke();
      ctx.restore();

      if (rP > 0) {
        const eqY = Math.sqrt(rP);
        this.drawDot(ctx, toPx(rP, eqY).x, toPx(rP, eqY).y, 8 * scale, pal.teal, pal.bg);
        this.drawDot(ctx, toPx(rP, -eqY).x, toPx(rP, -eqY).y, 8 * scale, pal.teal, pal.bg);
        this.drawDot(ctx, toPx(rP, 0).x, toPx(rP, 0).y, 6.5 * scale, pal.amber, pal.bg);
      } else {
        this.drawDot(ctx, toPx(rP, 0).x, toPx(rP, 0).y, 8 * scale, pal.teal, pal.bg);
      }

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'PITCHFORK BIFURCATION (ẋ = rx - x³)', color: pal.amber, gap: 34 * scale },
        { text: `Control Parameter r = ${rP.toFixed(2)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: rP > 0 ? `Bistable Attractors x* = ±${Math.sqrt(rP).toFixed(3)}` : 'Single Stable Attractor x* = 0', color: pal.teal, gap: 34 * scale },
        { text: rP > 0 ? 'Origin x* = 0 Becomes Unstable Repeller' : 'Subcritical Symmetry Preserved', color: pal.amber, gap: 34 * scale },
        { text: `Spontaneous Symmetry Breaking at r = 0`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Param r', val: rP.toFixed(2) },
          { key: 'Stable x*', val: rP > 0 ? `±${Math.sqrt(rP).toFixed(2)}` : '0.00' },
          { key: 'Origin x=0', val: rP > 0 ? 'Unstable' : 'Stable' },
          { key: 'Equilibria', val: rP > 0 ? '3 Fixed Pts' : '1 Fixed Pt' },
        ],
        tableHeaders: ['Parameter r', 'Origin x=0', 'Branches ±√r', 'Topology'],
        tableRows: [-0.8, 0.0, 0.6, 1.4].map((r) => [
          r.toFixed(1),
          r <= 0 ? 'Stable Sink' : 'Unstable Source',
          r > 0 ? `±${Math.sqrt(r).toFixed(3)}` : 'None (Complex)',
          r > 0 ? 'Bistable Double-Well' : 'Monostable Well',
        ]),
      };
    }

    // Time-domain ODEs with Slope Field + Asymptotes/Envelopes: logistic_ode, cooling, damped_osc
    const plot = this.createPlotArea(ctx, pal, bounds, -0.3, 4.2, -1.5, 4.0, spanEase(time, 0, 0.5), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const rateR = Number(params.rateR ?? params.kCool ?? 1.1);
    const capK = Number(params.capK ?? 3.1);
    const tEnv = Number(params.tEnv ?? 0.8);
    const yInit = Number(params.y0 ?? params.t0 ?? (sub === 'cooling' ? 3.5 : 0.45));

    const slopeAt = (t, y) => {
      if (sub === 'cooling') return -rateR * (y - tEnv);
      if (sub === 'damped_osc') return -Number(params.zeta ?? 0.22) * y;
      return rateR * y * (1 - y / capK);
    };

    ctx.save();
    ctx.strokeStyle = pal.muted;
    ctx.globalAlpha = 0.50;
    ctx.lineWidth = 1.7 * scale;
    for (let gx = 0; gx <= 4.0; gx += 0.45) {
      for (let gy = -1.2; gy <= 3.7; gy += 0.45) {
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

    // Subtype-specific asymptote or envelope lines
    ctx.save();
    if (sub === 'logistic_ode') {
      const pKL = toPx(0, capK);
      const pKR = toPx(4.1, capK);
      ctx.strokeStyle = pal.teal;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 2.6 * scale;
      ctx.beginPath();
      ctx.moveTo(pKL.x, pKL.y);
      ctx.lineTo(pKR.x, pKR.y);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (sub === 'cooling') {
      const pEL = toPx(0, tEnv);
      const pER = toPx(4.1, tEnv);
      ctx.strokeStyle = pal.teal;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 2.8 * scale;
      ctx.beginPath();
      ctx.moveTo(pEL.x, pEL.y);
      ctx.lineTo(pER.x, pER.y);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (sub === 'damped_osc') {
      const z = Number(params.zeta ?? 0.22);
      const w = Number(params.omega0 ?? 2.4);
      [1, -1].forEach((sgn) => {
        ctx.strokeStyle = pal.amber;
        ctx.setLineDash([5 * scale, 4 * scale]);
        ctx.lineWidth = 2.4 * scale;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const tx = (4.0 * i) / 120;
          const env = 1.2 + sgn * 2.2 * Math.exp(-z * w * tx);
          const p = toPx(tx, env);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }
    ctx.restore();

    const pts = [];
    let tx = 0;
    let ty = yInit;
    const dt = 0.04;
    const steps = Math.floor(98 * prog);
    for (let i = 0; i <= steps; i++) {
      if (sub === 'damped_osc') {
        const z = Number(params.zeta ?? 0.22);
        const w = Number(params.omega0 ?? 2.4);
        ty = 2.2 * Math.exp(-z * w * tx) * Math.cos(w * Math.sqrt(Math.max(0.05, 1 - z * z)) * tx) + 1.2;
      } else {
        const k1 = slopeAt(tx, ty);
        const k2 = slopeAt(tx + 0.5 * dt, ty + 0.5 * dt * k1);
        ty = Math.max(-1.4, Math.min(3.9, ty + dt * k2));
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
    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
      { text: sub === 'cooling' ? "NEWTON'S LAW OF COOLING" : sub === 'damped_osc' ? 'DAMPED HARMONIC OSCILLATOR' : 'LOGISTIC CARRYING CAPACITY FLOW', color: pal.amber, gap: 34 * scale },
      { text: `Initial State y(0) = ${yInit.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
      { text: `Time t = ${last.t.toFixed(2)} s, y(t) = ${last.y.toFixed(3)}`, color: pal.indigo, gap: 34 * scale },
      { text: sub === 'cooling' ? `Ambient Asymptote T_env = ${tEnv.toFixed(2)}` : sub === 'damped_osc' ? `Exponential Decay Envelope ±Ae^{-ζω₀t}` : `Carrying Capacity Asymptote K = ${capK.toFixed(2)}`, color: pal.teal, gap: 34 * scale },
      { text: `Instant Slope dy/dt = ${slopeAt(last.t, last.y).toFixed(4)}`, color: pal.amber, gap: 32 * scale },
    ], pal.panelBorder);

    return {
      readouts: [
        { key: 'Initial y₀', val: yInit.toFixed(2) },
        { key: 'Time t', val: last.t.toFixed(2) },
        { key: 'State y(t)', val: last.y.toFixed(3) },
        { key: 'Slope dy/dt', val: slopeAt(last.t, last.y).toFixed(3) },
      ],
      tableHeaders: ['Time t', 'State y(t)', 'Slope dy/dt', 'Asymptote'],
      tableRows: [0, 0.25, 0.5, 0.75, 1.0].map((f) => {
        const st = pts[Math.min(pts.length - 1, Math.floor(f * (pts.length - 1)))] || last;
        return [st.t.toFixed(2), st.y.toFixed(4), slopeAt(st.t, st.y).toFixed(4), sub === 'cooling' ? tEnv.toFixed(2) : capK.toFixed(2)];
      }),
    };
  };

  /* ------------------------------------------------------------------------
   * 6. CONIC SECTIONS, GRAVITATIONAL LENSING & OPTICS ENGINE (7 Distinct Visuals)
   * ------------------------------------------------------------------------ */
  proto.drawConicScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -3.2, 3.2, -2.5, 2.5, spanEase(time, 0, 0.6), 0.60, true);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const prog = spanEase(time, 0.25, duration * 0.85);
    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;

    // 1. Einstein Gravitational Lensing & Hyperbolic Deflection (#054)
    if (sub === 'gravitational_lens') {
      const massM = Number(params.massM ?? 1.1);
      const bImpact = Number(params.impactB ?? 1.15);
      const rE = Math.sqrt(1.1 * massM);
      const pOrig = toPx(0, 0);
      const pREdge = toPx(rE, 0);

      ctx.save();
      // Dashed Einstein Ring Circle
      ctx.strokeStyle = pal.amber;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      ctx.arc(pOrig.x, pOrig.y, Math.abs(pREdge.x - pOrig.x), 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Bundle of relativistic light rays bending around central mass M
      [-1.7, -1.15, -0.65, 0.65, 1.15, 1.7].forEach((b0) => {
        const isPrimary = Math.abs(Math.abs(b0) - bImpact) < 0.35;
        const bUse = isPrimary ? (b0 >= 0 ? bImpact : -bImpact) : b0;
        const alphaDefl = (1.6 * massM) / Math.max(0.45, Math.abs(bUse));
        ctx.strokeStyle = isPrimary ? pal.indigo : pal.teal;
        ctx.globalAlpha = isPrimary ? 1.0 : 0.48;
        ctx.lineWidth = (isPrimary ? 3.8 : 2.2) * scale;
        ctx.beginPath();
        for (let i = 0; i <= 140; i++) {
          const x = -3.0 + (6.0 * i) / 140;
          const bend = (bUse >= 0 ? -1 : 1) * alphaDefl * 0.45 * (1 + Math.tanh(0.95 * x));
          const dip = (bUse >= 0 ? -1 : 1) * (0.28 * massM) / Math.hypot(x, bUse);
          const y = bUse + bend * Math.max(0, (x + 2.2) * 0.42) + dip;
          const p = toPx(x, Math.max(-2.3, Math.min(2.3, y)));
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });
      ctx.restore();

      // Central black hole / galaxy lens mass M
      this.drawDot(ctx, pOrig.x, pOrig.y, 12 * scale, pal.amber, pal.ink);
      const alphaRad = (4 * massM) / Math.max(0.4, bImpact);

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'EINSTEIN GRAVITATIONAL LENSING', color: pal.amber, gap: 34 * scale },
        { text: `Impact Parameter b = ${bImpact.toFixed(2)}, Mass M = ${massM.toFixed(2)}`, font: `600 ${Math.round(22 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Deflection α = 4GM/(c²b) ≈ ${alphaRad.toFixed(3)} rad`, color: pal.indigo, gap: 34 * scale },
        { text: `Einstein Ring Radius θ_E = ${rE.toFixed(3)}`, color: pal.amber, gap: 34 * scale },
        { text: `Hyperbolic Geodesics Curve Around Mass`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Impact b', val: bImpact.toFixed(2) },
          { key: 'Mass M', val: massM.toFixed(2) },
          { key: 'Bend α', val: `${alphaRad.toFixed(2)} rad` },
          { key: 'Ring θ_E', val: rE.toFixed(3) },
        ],
        tableHeaders: ['Impact b', 'Deflection α = 4M/b', 'Eccentricity e', 'Image Geometry'],
        tableRows: [0.6, 1.0, 1.5, 2.2].map((b) => [
          b.toFixed(2),
          `${((4 * massM) / b).toFixed(3)} rad`,
          Math.hypot(1, b / Math.max(0.2, massM)).toFixed(3),
          b < rE ? 'Strong Lensing Arcs' : 'Weak Hyperbolic Bend',
        ]),
      };
    }

    // 2. Parabola Directrix-Focus Optical Reflector (#051)
    if (sub === 'parabola') {
      const pFoc = Number(params.focalP ?? 0.95);
      const yVert = -0.6;
      const yFoc = yVert + pFoc;
      const yDir = yVert - pFoc;

      ctx.save();
      // Directrix line y = yDir
      const pDL = toPx(-3.0, yDir);
      const pDR = toPx(3.0, yDir);
      ctx.strokeStyle = pal.teal;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 2.6 * scale;
      ctx.beginPath();
      ctx.moveTo(pDL.x, pDL.y);
      ctx.lineTo(pDR.x, pDR.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Parabolic mirror y = yVert + x^2 / (4*pFoc)
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 4.2 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 160; i++) {
        const x = -2.7 + (5.4 * i) / 160;
        const y = yVert + (x * x) / (4 * pFoc);
        const p = toPx(x, y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Incoming parallel vertical rays bouncing directly to the Focus F(0, yFoc)
      const pF = toPx(0, yFoc);
      [-2.1, -1.4, -0.7, 0.7, 1.4, 2.1].forEach((rx) => {
        const ry = yVert + (rx * rx) / (4 * pFoc);
        const pTop = toPx(rx, 2.35);
        const pHit = toPx(rx, ry);
        const pFoot = toPx(rx, yDir);
        ctx.strokeStyle = pal.amber;
        ctx.lineWidth = 2.2 * scale;
        ctx.beginPath();
        ctx.moveTo(pTop.x, pTop.y);
        ctx.lineTo(pHit.x, pHit.y);
        ctx.lineTo(pF.x, pF.y);
        ctx.stroke();
        // Equal distance drop to directrix
        ctx.strokeStyle = pal.teal;
        ctx.globalAlpha = 0.45;
        ctx.beginPath();
        ctx.moveTo(pHit.x, pHit.y);
        ctx.lineTo(pFoot.x, pFoot.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      ctx.restore();

      this.drawDot(ctx, toPx(0, yFoc).x, toPx(0, yFoc).y, 8.5 * scale, pal.amber, pal.bg);

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'PARABOLIC FOCUS-DIRECTRIX REFLECTOR', color: pal.amber, gap: 34 * scale },
        { text: `Focal Length p = ${pFoc.toFixed(2)} (e = 1.000)`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Locus Definition: |PF| = |PD| to Directrix`, color: pal.teal, gap: 34 * scale },
        { text: `Parallel Collimated Rays Converge at F`, color: pal.amber, gap: 34 * scale },
        { text: `x² = 4py Parabolic Dish Mirror`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Focal p', val: pFoc.toFixed(2) },
          { key: 'Eccentricity', val: '1.000' },
          { key: 'Directrix y', val: yDir.toFixed(2) },
          { key: '|PF| / |PD|', val: '1.000' },
        ],
        tableHeaders: ['Ray x₀', 'Mirror y(x₀)', 'Focus Dist |PF|', 'Directrix |PD|'],
        tableRows: [0.5, 1.0, 1.5, 2.0].map((x) => {
          const d = pFoc + (x * x) / (4 * pFoc);
          return [`x = ±${x.toFixed(1)}`, (yVert + (x * x) / (4 * pFoc)).toFixed(3), d.toFixed(3), d.toFixed(3)];
        }),
      };
    }

    // 3. Hyperbola Two Branches + Asymptote Box (#052)
    if (sub === 'hyperbola') {
      const a = Number(params.semiA ?? 1.25);
      const b = Number(params.semiB ?? 1.05);
      const c = Math.hypot(a, b);
      const ecc = c / a;

      ctx.save();
      // Central 2a x 2b fundamental box and diagonal asymptotes y = ±(b/a)x
      const pBL = toPx(-a, -b);
      const pTR = toPx(a, b);
      ctx.strokeStyle = pal.gridMajor;
      ctx.setLineDash([5 * scale, 4 * scale]);
      ctx.lineWidth = 1.8 * scale;
      ctx.strokeRect(pBL.x, pTR.y, pTR.x - pBL.x, pBL.y - pTR.y);

      [1, -1].forEach((sgn) => {
        const pA1 = toPx(-3.0, -3.0 * sgn * (b / a));
        const pA2 = toPx(3.0, 3.0 * sgn * (b / a));
        ctx.strokeStyle = pal.teal;
        ctx.beginPath();
        ctx.moveTo(pA1.x, pA1.y);
        ctx.lineTo(pA2.x, pA2.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Left and right hyperbolic branches x = ±a cosh(u), y = b sinh(u)
      [1, -1].forEach((branch) => {
        ctx.strokeStyle = pal.indigo;
        ctx.lineWidth = 4 * scale;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const u = -1.45 + (2.9 * i) / 120;
          const x = branch * a * Math.cosh(u);
          const y = b * Math.sinh(u);
          const p = toPx(x, y);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });

      const u0 = -0.9 + 1.8 * prog;
      const px = a * Math.cosh(u0);
      const py = b * Math.sinh(u0);
      const f1 = toPx(-c, 0);
      const f2 = toPx(c, 0);
      const ptP = toPx(px, py);
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 2.8 * scale;
      ctx.beginPath();
      ctx.moveTo(f1.x, f1.y);
      ctx.lineTo(ptP.x, ptP.y);
      ctx.lineTo(f2.x, f2.y);
      ctx.stroke();
      ctx.restore();

      this.drawDot(ctx, toPx(-c, 0).x, toPx(-c, 0).y, 7.5 * scale, pal.amber, pal.bg);
      this.drawDot(ctx, toPx(c, 0).x, toPx(c, 0).y, 7.5 * scale, pal.amber, pal.bg);
      this.drawDot(ctx, toPx(px, py).x, toPx(px, py).y, 8 * scale, pal.teal, pal.bg);

      const d1 = Math.hypot(px + c, py);
      const d2 = Math.hypot(px - c, py);
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'HYPERBOLA ASYMPTOTES & FOCAL DIFFERENCE', color: pal.amber, gap: 34 * scale },
        { text: `Eccentricity e = √(1 + b²/a²) = ${ecc.toFixed(3)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Asymptote Slopes m = ±b/a = ±${(b / a).toFixed(2)}`, color: pal.teal, gap: 34 * scale },
        { text: `|PF₁| - |PF₂| = ${Math.abs(d1 - d2).toFixed(3)} = 2a`, color: pal.amber, gap: 34 * scale },
        { text: `x²/a² - y²/b² = 1 Two-Sheeted Conic`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Eccentricity e', val: ecc.toFixed(3) },
          { key: 'Slope ±b/a', val: `±${(b / a).toFixed(2)}` },
          { key: '||PF₁|-|PF₂||', val: (2 * a).toFixed(2) },
          { key: 'Foci ±c', val: `±${c.toFixed(2)}` },
        ],
        tableHeaders: ['Param u', 'x = a cosh u', 'y = b sinh u', '|PF₁| - |PF₂|'],
        tableRows: [-1.0, -0.5, 0.0, 0.5, 1.0].map((u) => [
          u.toFixed(1),
          (a * Math.cosh(u)).toFixed(3),
          (b * Math.sinh(u)).toFixed(3),
          (2 * a).toFixed(3),
        ]),
      };
    }

    // 4. Snell's Law Refraction & Total Internal Reflection (#055)
    if (sub === 'snell') {
      const th1 = (Number(params.theta1Deg ?? 36) * Math.PI) / 180;
      const n1 = Number(params.n1 ?? 1.5);
      const n2 = Number(params.n2 ?? 1.0);
      const sin2 = (n1 / n2) * Math.sin(th1);
      const pOrig = toPx(0, 0);

      ctx.save();
      // Shaded lower dense optical medium (y < 0)
      const pBL = toPx(-3.2, -2.5);
      const pMR = toPx(3.2, 0);
      ctx.fillStyle = pal.indigoFill;
      ctx.fillRect(pBL.x, pMR.y, pMR.x - pBL.x, pBL.y - pMR.y);

      // Dashed surface normal x = 0
      const pNT = toPx(0, 2.3);
      const pNB = toPx(0, -2.3);
      ctx.strokeStyle = pal.gridMajor;
      ctx.setLineDash([5 * scale, 4 * scale]);
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(pNT.x, pNT.y);
      ctx.lineTo(pNB.x, pNB.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      const pInc = toPx(-2.2 * Math.sin(th1), -2.2 * Math.cos(th1));
      this.drawArrow(ctx, pInc.x, pInc.y, pOrig.x, pOrig.y, pal.indigo, 3.8 * scale);
      const isTIR = Math.abs(sin2) > 1.0;
      const th2Deg = isTIR ? Number(params.theta1Deg ?? 36) : (Math.asin(sin2) * 180) / Math.PI;
      if (!isTIR) {
        const th2 = Math.asin(sin2);
        const pRefr = toPx(2.2 * Math.sin(th2), 2.2 * Math.cos(th2));
        this.drawArrow(ctx, pOrig.x, pOrig.y, pRefr.x, pRefr.y, pal.teal, 3.8 * scale);
      } else {
        const pTIR = toPx(2.2 * Math.sin(th1), -2.2 * Math.cos(th1));
        this.drawArrow(ctx, pOrig.x, pOrig.y, pTIR.x, pTIR.y, pal.amber, 4.0 * scale);
      }
      this.drawDot(ctx, pOrig.x, pOrig.y, 7.5 * scale, pal.amber, pal.bg);

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: "SNELL'S LAW & TOTAL INTERNAL REFLECTION", color: pal.amber, gap: 34 * scale },
        { text: `n₁ = ${n1.toFixed(2)}, n₂ = ${n2.toFixed(2)}, θ₁ = ${((th1 * 180) / Math.PI).toFixed(1)}°`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `n₁ sin θ₁ = n₂ sin θ₂ = ${(n1 * Math.sin(th1)).toFixed(4)}`, color: pal.indigo, gap: 34 * scale },
        { text: isTIR ? '⚠ Total Internal Reflection (sin θ₂ > 1)' : `Refracted Angle θ₂ = ${th2Deg.toFixed(1)}°`, color: isTIR ? pal.amber : pal.teal, gap: 34 * scale },
        { text: `Fermat Principle of Least Time`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Angle θ₁', val: `${((th1 * 180) / Math.PI).toFixed(1)}°` },
          { key: 'Angle θ₂', val: isTIR ? 'TIR' : `${th2Deg.toFixed(1)}°` },
          { key: 'n₁ / n₂', val: `${n1.toFixed(2)}/${n2.toFixed(2)}` },
          { key: 'Regime', val: isTIR ? 'Reflected' : 'Refracted' },
        ],
        tableHeaders: ['Incident θ₁', 'n₁ sin θ₁', 'Output θ₂', 'Optical Mode'],
        tableRows: [15, 30, 45, 60].map((d) => {
          const s2 = (n1 / n2) * Math.sin((d * Math.PI) / 180);
          return [`${d}°`, (n1 * Math.sin((d * Math.PI) / 180)).toFixed(3), s2 <= 1 ? `${((Math.asin(s2) * 180) / Math.PI).toFixed(1)}°` : 'TIR Mirror', s2 <= 1 ? 'Transmission' : 'Total Reflection'];
        }),
      };
    }

    // 5. Circle of Apollonius Distance Ratio Locus (#056)
    if (sub === 'apollonius') {
      const kRatio = Math.max(1.25, Number(params.kRatio ?? 1.8));
      const A = { x: -1.8, y: 0 };
      const B = { x: 0.6, y: 0 };
      // Internal and external division points on AB
      const P1x = (A.x + kRatio * B.x) / (1 + kRatio);
      const P2x = (A.x - kRatio * B.x) / (1 - kRatio);
      const cxA = 0.5 * (P1x + P2x);
      const radA = Math.min(2.1, 0.5 * Math.abs(P2x - P1x));
      const ang = prog * Math.PI * 2;
      const P = { x: cxA + radA * Math.cos(ang), y: radA * Math.sin(ang) };

      const pA = toPx(A.x, A.y);
      const pB = toPx(B.x, B.y);
      const pCenter = toPx(cxA, 0);
      const pEdge = toPx(cxA + radA, 0);
      const pP = toPx(P.x, P.y);

      ctx.save();
      ctx.fillStyle = pal.indigoFill;
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      ctx.arc(pCenter.x, pCenter.y, Math.abs(pEdge.x - pCenter.x), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Bipolar segments PA and PB
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pP.x, pP.y);
      ctx.stroke();
      ctx.strokeStyle = pal.teal;
      ctx.beginPath();
      ctx.moveTo(pB.x, pB.y);
      ctx.lineTo(pP.x, pP.y);
      ctx.stroke();
      ctx.restore();

      this.drawDot(ctx, pA.x, pA.y, 7.5 * scale, pal.amber, pal.bg);
      this.drawDot(ctx, pB.x, pB.y, 7.5 * scale, pal.teal, pal.bg);
      this.drawDot(ctx, pP.x, pP.y, 8.5 * scale, pal.indigo, pal.bg);

      const dPA = Math.hypot(P.x - A.x, P.y - A.y);
      const dPB = Math.hypot(P.x - B.x, P.y - B.y);
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'CIRCLE OF APOLLONIUS LOCUS', color: pal.amber, gap: 34 * scale },
        { text: `Constant Ratio |PA| / |PB| = k = ${kRatio.toFixed(2)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Distance |PA| = ${dPA.toFixed(3)} (Amber)`, color: pal.amber, gap: 34 * scale },
        { text: `Distance |PB| = ${dPB.toFixed(3)} (Teal)`, color: pal.teal, gap: 34 * scale },
        { text: `Measured Ratio |PA|/|PB| = ${(dPA / Math.max(0.01, dPB)).toFixed(3)}`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Ratio k', val: kRatio.toFixed(2) },
          { key: '|PA|', val: dPA.toFixed(2) },
          { key: '|PB|', val: dPB.toFixed(2) },
          { key: 'Radius R', val: radA.toFixed(2) },
        ],
        tableHeaders: ['Angle θ', '|PA|', '|PB|', 'Ratio |PA|/|PB|'],
        tableRows: [0, 60, 120, 180].map((d) => {
          const u = (d * Math.PI) / 180;
          const qx = cxA + radA * Math.cos(u);
          const qy = radA * Math.sin(u);
          const da = Math.hypot(qx - A.x, qy);
          const db = Math.hypot(qx - B.x, qy);
          return [`${d}°`, da.toFixed(3), db.toFixed(3), (da / Math.max(0.01, db)).toFixed(3)];
        }),
      };
    }

    // 6 & 7. Whispering Gallery Ellipse (#050) & Conic Eccentricity Family (#053)
    const a = Number(params.semiA ?? 2.3);
    const b = Number(params.semiB ?? 1.55);
    const c = Math.sqrt(Math.max(0.04, a * a - b * b));
    const ecc = sub === 'eccentricity' ? Number(params.ecc ?? 0.65) : c / Math.max(0.2, a);

    ctx.save();
    if (sub === 'eccentricity') {
      // Draw background family of conics for e = 0, 0.5, 1.0, 1.35 + directrix
      const pDL = toPx(1.8, -2.3);
      const pDR = toPx(1.8, 2.3);
      ctx.strokeStyle = pal.teal;
      ctx.setLineDash([5 * scale, 4 * scale]);
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(pDL.x, pDL.y);
      ctx.lineTo(pDR.x, pDR.y);
      ctx.stroke();
      ctx.setLineDash([]);

      [0.0, 0.55, 1.0].forEach((eRef) => {
        ctx.strokeStyle = pal.gridMajor;
        ctx.lineWidth = 1.6 * scale;
        ctx.beginPath();
        for (let i = 0; i <= 140; i++) {
          const ang = (i / 140) * Math.PI * 2;
          const r = Math.min(2.8, 1.15 / Math.max(0.25, 1 + eRef * Math.cos(ang)));
          const p = toPx(r * Math.cos(ang), r * Math.sin(ang));
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });
    }

    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 4 * scale;
    ctx.beginPath();
    for (let i = 0; i <= 180; i++) {
      const ang = (i / 180) * Math.PI * 2;
      const r = sub === 'eccentricity' ? Math.min(2.9, 1.15 / Math.max(0.22, 1 + ecc * Math.cos(ang))) : 1.0;
      const x = sub === 'eccentricity' ? r * Math.cos(ang) : a * Math.cos(ang);
      const y = sub === 'eccentricity' ? r * Math.sin(ang) : b * Math.sin(ang);
      const p = toPx(x, y);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    const pDeg = Number(params.pDeg ?? params.pAngle ?? 58) + prog * 90;
    const rad = (pDeg * Math.PI) / 180;
    const px = a * Math.cos(rad);
    const py = b * Math.sin(rad);
    const f1 = toPx(-c, 0);
    const f2 = toPx(c, 0);
    const ptP = toPx(px, py);

    // Draw tangent mirror at P for Whispering Gallery Ellipse
    if (sub === 'ellipse') {
      const tx = -a * Math.sin(rad);
      const ty = b * Math.cos(rad);
      const tNorm = Math.hypot(tx, ty);
      const pT1 = toPx(px - (tx / tNorm) * 0.9, py - (ty / tNorm) * 0.9);
      const pT2 = toPx(px + (tx / tNorm) * 0.9, py + (ty / tNorm) * 0.9);
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 2.6 * scale;
      ctx.beginPath();
      ctx.moveTo(pT1.x, pT1.y);
      ctx.lineTo(pT2.x, pT2.y);
      ctx.stroke();
    }

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

    const d1 = Math.hypot(px + c, py);
    const d2 = Math.hypot(px - c, py);

    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
      { text: sub === 'eccentricity' ? 'CONIC ECCENTRICITY CONTINUUM' : 'ELLIPSE WHISPERING GALLERY OPTICS', color: pal.amber, gap: 34 * scale },
      { text: `Eccentricity e = ${ecc.toFixed(3)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
      { text: `Focal Radius |PF₁| = ${d1.toFixed(3)}`, color: pal.indigo, gap: 34 * scale },
      { text: `Focal Radius |PF₂| = ${d2.toFixed(3)}`, color: pal.teal, gap: 34 * scale },
      { text: `Invariant |PF₁| + |PF₂| = ${(d1 + d2).toFixed(3)} = 2a`, color: pal.amber, gap: 32 * scale },
    ], pal.panelBorder);

    return {
      readouts: [
        { key: 'Eccentricity e', val: ecc.toFixed(3) },
        { key: '|PF₁|', val: d1.toFixed(2) },
        { key: '|PF₂|', val: d2.toFixed(2) },
        { key: 'Sum 2a', val: (d1 + d2).toFixed(2) },
      ],
      tableHeaders: ['Angle θ', '|PF₁|', '|PF₂|', 'Invariant 2a'],
      tableRows: [0, 45, 90, 135, 180].map((deg) => {
        const u = (deg * Math.PI) / 180;
        const x = a * Math.cos(u);
        const y = b * Math.sin(u);
        return [`${deg}°`, Math.hypot(x + c, y).toFixed(3), Math.hypot(x - c, y).toFixed(3), (2 * a).toFixed(3)];
      }),
    };
  };


  /* ------------------------------------------------------------------------
   * 7. EUCLIDEAN, TRIANGLE & OLYMPIAD GEOMETRY ENGINE (9 Distinct Constructions)
   * ------------------------------------------------------------------------ */
  proto.drawGeometryScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -2.6, 2.6, -1.9, 2.5, spanEase(time, 0, 0.5), 0.60, true);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;

    // 1. Power of a Point Secant-Chord Circle Theorem (#058)
    if (sub === 'power_point') {
      const R = 1.75;
      const px = Number(params.px ?? 0.65);
      const py = Number(params.py ?? 0.35);
      const pOrig = toPx(0, 0);
      const pEdge = toPx(R, 0);
      const pP = toPx(px, py);

      ctx.save();
      ctx.fillStyle = pal.indigoFill;
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      ctx.arc(pOrig.x, pOrig.y, Math.abs(pEdge.x - pOrig.x), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Two intersecting chords through P(px, py) at angles alpha1, alpha2
      const drawChordThroughP = (ang, color) => {
        const ux = Math.cos(ang);
        const uy = Math.sin(ang);
        const b = px * ux + py * uy;
        const c = px * px + py * py - R * R;
        const disc = Math.max(0.05, b * b - c);
        const t1 = -b - Math.sqrt(disc);
        const t2 = -b + Math.sqrt(disc);
        const p1 = toPx(px + t1 * ux, py + t1 * uy);
        const p2 = toPx(px + t2 * ux, py + t2 * uy);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3.2 * scale;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        this.drawDot(ctx, p1.x, p1.y, 6.5 * scale, color, pal.bg);
        this.drawDot(ctx, p2.x, p2.y, 6.5 * scale, color, pal.bg);
        return { d1: Math.abs(t1), d2: Math.abs(t2) };
      };
      const ch1 = drawChordThroughP(0.45 + time * 0.25, pal.amber);
      const ch2 = drawChordThroughP(1.85 - time * 0.15, pal.teal);
      ctx.restore();
      this.drawDot(ctx, pP.x, pP.y, 8.5 * scale, pal.indigo, pal.bg);

      const powerVal = Math.abs(R * R - (px * px + py * py));
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'POWER OF A POINT (INTERSECTING CHORDS)', color: pal.amber, gap: 34 * scale },
        { text: `|PA|·|PB| = |PC|·|PD| = ${powerVal.toFixed(3)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Chord 1 Segments: ${ch1.d1.toFixed(2)} × ${ch1.d2.toFixed(2)}`, color: pal.amber, gap: 34 * scale },
        { text: `Chord 2 Segments: ${ch2.d1.toFixed(2)} × ${ch2.d2.toFixed(2)}`, color: pal.teal, gap: 34 * scale },
        { text: `Power Π(P) = |R² - d²| Invariant`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: '|PA|·|PB|', val: powerVal.toFixed(3) },
          { key: '|PC|·|PD|', val: powerVal.toFixed(3) },
          { key: 'Dist d=|OP|', val: Math.hypot(px, py).toFixed(2) },
          { key: 'Radius R', val: R.toFixed(2) },
        ],
        tableHeaders: ['Chord', 'Segment 1', 'Segment 2', 'Product Π(P)'],
        tableRows: [
          ['Chord AB (Amber)', ch1.d1.toFixed(3), ch1.d2.toFixed(3), (ch1.d1 * ch1.d2).toFixed(3)],
          ['Chord CD (Teal)', ch2.d1.toFixed(3), ch2.d2.toFixed(3), (ch2.d1 * ch2.d2).toFixed(3)],
        ],
      };
    }

    // 2. Ptolemy's Theorem on Cyclic Quadrilaterals (#062)
    if (sub === 'ptolemy') {
      const R = 1.82;
      const angs = [0.35, 1.35 + 0.25 * Math.sin(time * 0.6), 2.65, 4.45];
      const verts = angs.map((a) => ({ x: R * Math.cos(a), y: R * Math.sin(a) }));
      const pxV = verts.map((v) => toPx(v.x, v.y));
      const pOrig = toPx(0, 0);
      const pEdge = toPx(R, 0);

      ctx.save();
      // Circumcircle
      ctx.strokeStyle = pal.gridMajor;
      ctx.lineWidth = 2.2 * scale;
      ctx.beginPath();
      ctx.arc(pOrig.x, pOrig.y, Math.abs(pEdge.x - pOrig.x), 0, Math.PI * 2);
      ctx.stroke();

      // Cyclic quadrilateral ABCD
      ctx.fillStyle = pal.indigoFill;
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.6 * scale;
      ctx.beginPath();
      pxV.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Diagonals AC and BD in amber
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3.2 * scale;
      ctx.beginPath();
      ctx.moveTo(pxV[0].x, pxV[0].y);
      ctx.lineTo(pxV[2].x, pxV[2].y);
      ctx.moveTo(pxV[1].x, pxV[1].y);
      ctx.lineTo(pxV[3].x, pxV[3].y);
      ctx.stroke();
      ctx.restore();

      pxV.forEach((p, idx) => this.drawDot(ctx, p.x, p.y, 7.5 * scale, idx % 2 === 0 ? pal.teal : pal.amber, pal.bg));

      const dist = (i, j) => Math.hypot(verts[i].x - verts[j].x, verts[i].y - verts[j].y);
      const dAC = dist(0, 2);
      const dBD = dist(1, 3);
      const lhs = dAC * dBD;
      const rhs = dist(0, 1) * dist(2, 3) + dist(1, 2) * dist(3, 0);

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: "PTOLEMY'S CYCLIC QUADRILATERAL THEOREM", color: pal.amber, gap: 34 * scale },
        { text: `|AC|·|BD| = ${lhs.toFixed(3)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `|AB|·|CD| + |BC|·|DA| = ${rhs.toFixed(3)}`, color: pal.teal, gap: 34 * scale },
        { text: `Diagonals: |AC|=${dAC.toFixed(2)}, |BD|=${dBD.toFixed(2)}`, color: pal.amber, gap: 34 * scale },
        { text: `Exact Equality Holds iff ABCD is Cyclic`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: '|AC|·|BD|', val: lhs.toFixed(3) },
          { key: 'AB·CD+BC·DA', val: rhs.toFixed(3) },
          { key: 'Diag |AC|', val: dAC.toFixed(2) },
          { key: 'Diag |BD|', val: dBD.toFixed(2) },
        ],
        tableHeaders: ['Term', 'Lengths', 'Product', 'Ptolemy Identity'],
        tableRows: [
          ['Diagonals AC·BD', `${dAC.toFixed(2)} × ${dBD.toFixed(2)}`, lhs.toFixed(3), 'LHS Product'],
          ['Opposite AB·CD', `${dist(0, 1).toFixed(2)} × ${dist(2, 3).toFixed(2)}`, (dist(0, 1) * dist(2, 3)).toFixed(3), 'RHS Term 1'],
          ['Opposite BC·DA', `${dist(1, 2).toFixed(2)} × ${dist(3, 0).toFixed(2)}`, (dist(1, 2) * dist(3, 0)).toFixed(3), 'RHS Term 2'],
        ],
      };
    }

    // 3. Pick's Lattice Polygon Area Theorem (#064)
    if (sub === 'picks') {
      const scaleW = Math.max(1, Math.min(2, Math.round(Number(params.scaleW ?? 1))));
      const poly = [
        { x: -2, y: -1 },
        { x: 2, y: -1 },
        { x: 1, y: 2 },
        { x: -1, y: 1 * scaleW },
      ];
      const pulse = 1 + 0.14 * Math.sin(time * 2.4);
      const scanAngle = time * 1.15;
      ctx.save();
      // Draw integer lattice grid dots
      for (let gx = -2; gx <= 2; gx++) {
        for (let gy = -1; gy <= 2; gy++) {
          const p = toPx(gx, gy);
          this.drawDot(ctx, p.x, p.y, 4.5 * scale, pal.gridMajor, pal.bg);
        }
      }
      ctx.fillStyle = pal.tealFill;
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      poly.forEach((v, i) => {
        const p = toPx(v.x, v.y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      const p0 = toPx(poly[0].x, poly[0].y);
      const p2 = toPx(poly[2].x, poly[2].y);
      const diagProg = spanEase(time, 0.4, 2.2);
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p0.x + (p2.x - p0.x) * diagProg, p0.y + (p2.y - p0.y) * diagProg);
      ctx.stroke();
      ctx.setLineDash([]);
      const pOrig = toPx(0, 0);
      const pProbe = toPx(0.85 * Math.cos(scanAngle), 0.55 + 0.45 * Math.sin(scanAngle));
      this.drawArrow(ctx, pOrig.x, pOrig.y, pProbe.x, pProbe.y, pal.teal, 2.2 * scale);
      ctx.restore();

      // Highlight boundary lattice points (amber) and interior lattice points (teal)
      poly.forEach((v, idx) => {
        const p = toPx(v.x, v.y);
        this.drawDot(ctx, p.x, p.y, (7.2 + 1.1 * Math.sin(time * 2.2 + idx)) * scale, pal.amber, pal.bg);
      });
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
      ].forEach((pt, idx) => {
        const p = toPx(pt.x, pt.y);
        this.drawDot(ctx, p.x, p.y, (7.5 * pulse + 0.6 * idx) * scale, pal.teal, pal.bg);
      });

      const I = 4;
      const B = 7;
      const areaPick = I + B / 2 - 1;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: "PICK'S LATTICE POLYGON THEOREM", color: pal.amber, gap: 34 * scale },
        { text: `Area A = I + B/2 − 1 = ${areaPick.toFixed(1)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Interior Lattice Dots I = ${I} (Teal)`, color: pal.teal, gap: 34 * scale },
        { text: `Boundary Lattice Dots B = ${B} (Amber)`, color: pal.amber, gap: 34 * scale },
        { text: `Combinatorial Euler Characteristic Proof`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Interior I', val: `${I}` },
          { key: 'Boundary B', val: `${B}` },
          { key: 'Area I+B/2-1', val: areaPick.toFixed(1) },
          { key: 'Lattice', val: 'ℤ² Grid' },
        ],
        tableHeaders: ['Quantity', 'Count', 'Weight in Formula', 'Contribution'],
        tableRows: [
          ['Interior Nodes I', `${I}`, '+1.0', `+${I.toFixed(1)}`],
          ['Boundary Nodes B', `${B}`, '+0.5', `+${(B / 2).toFixed(1)}`],
          ['Euler Offset', '1', '-1.0', '-1.0'],
        ],
      };
    }

    // Remaining 6 Triangle scenes: euler_line, law_sines, law_cosines, incircle, feuerbach, ceva
    const A = { x: -1.85, y: -1.15 };
    const B = { x: 1.95, y: -1.15 };
    const angShift = Number(params.angleADeg ?? params.angleCDeg ?? 60) * 0.015 + Number(params.sideA ?? 0) * 0.35;
    const C = {
      x: Number(params.cxTop ?? params.px ?? (0.15 + 0.35 * Math.cos(angShift + time * 0.85))),
      y: Number(params.cyTop ?? params.py ?? (1.85 + 0.18 * Math.sin(angShift + time * 1.15))),
    };
    const pA = toPx(A.x, A.y);
    const pB = toPx(B.x, B.y);
    const pC = toPx(C.x, C.y);

    const sideC = Math.hypot(B.x - A.x, B.y - A.y);
    const sideA = Math.hypot(C.x - B.x, C.y - B.y);
    const sideB = Math.hypot(C.x - A.x, C.y - A.y);
    const semiS = 0.5 * (sideA + sideB + sideC);
    const areaTri = Math.sqrt(Math.max(0.01, semiS * (semiS - sideA) * (semiS - sideB) * (semiS - sideC)));

    // Triangle ABC base
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

    // Compute Centroid G, Circumcenter O, Orthocenter H, Incenter I
    const G = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    const O = {
      x: ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y)) / D,
      y: ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x)) / D,
    };
    const H = { x: 3 * G.x - 2 * O.x, y: 3 * G.y - 2 * O.y };
    const I = {
      x: (sideA * A.x + sideB * B.x + sideC * C.x) / (2 * semiS),
      y: (sideA * A.y + sideB * B.y + sideC * C.y) / (2 * semiS),
    };
    const inR = areaTri / semiS;
    const circumR = (sideA * sideB * sideC) / (4 * areaTri);

    if (sub === 'euler_line') {
      // Draw collinear Euler Line through O, G, H
      const pO = toPx(O.x, O.y);
      const pG = toPx(G.x, G.y);
      const pH = toPx(H.x, H.y);
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3.6 * scale;
      ctx.beginPath();
      ctx.moveTo(pO.x, pO.y);
      ctx.lineTo(pH.x, pH.y);
      ctx.stroke();
      this.drawDot(ctx, pO.x, pO.y, 7.5 * scale, pal.teal, pal.bg);
      this.drawDot(ctx, pG.x, pG.y, 8 * scale, pal.amber, pal.bg);
      this.drawDot(ctx, pH.x, pH.y, 7.5 * scale, pal.indigo, pal.bg);
    } else if (sub === 'law_sines') {
      // Draw Circumcircle of radius R = a/(2 sin A)
      const pO = toPx(O.x, O.y);
      const pREdge = toPx(O.x + circumR, O.y);
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3.0 * scale;
      ctx.beginPath();
      ctx.arc(pO.x, pO.y, Math.abs(pREdge.x - pO.x), 0, Math.PI * 2);
      ctx.stroke();
      this.drawArrow(ctx, pO.x, pO.y, pC.x, pC.y, pal.teal, 2.6 * scale);
      this.drawDot(ctx, pO.x, pO.y, 7 * scale, pal.amber, pal.bg);
    } else if (sub === 'law_cosines') {
      // Drop altitude from C to base AB at (C.x, A.y) and shade projection
      const pFoot = toPx(C.x, A.y);
      ctx.strokeStyle = pal.amber;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(pC.x, pC.y);
      ctx.lineTo(pFoot.x, pFoot.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 5 * scale;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pFoot.x, pFoot.y);
      ctx.stroke();
      this.drawDot(ctx, pFoot.x, pFoot.y, 7 * scale, pal.amber, pal.bg);
    } else if (sub === 'incircle') {
      // Draw angle bisectors to I and inscribed Incircle
      const pI = toPx(I.x, I.y);
      const pIEdge = toPx(I.x + inR, I.y);
      ctx.strokeStyle = pal.teal;
      ctx.setLineDash([5 * scale, 4 * scale]);
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pI.x, pI.y);
      ctx.moveTo(pB.x, pB.y);
      ctx.lineTo(pI.x, pI.y);
      ctx.moveTo(pC.x, pC.y);
      ctx.lineTo(pI.x, pI.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = pal.amberFill;
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3.2 * scale;
      ctx.beginPath();
      ctx.arc(pI.x, pI.y, Math.abs(pIEdge.x - pI.x), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      this.drawDot(ctx, pI.x, pI.y, 7.5 * scale, pal.amber, pal.bg);
    } else if (sub === 'feuerbach') {
      // Feuerbach's Nine-Point Circle centered at N9 = (O + H)/2 with radius R/2
      const N9 = { x: 0.5 * (O.x + H.x), y: 0.5 * (O.y + H.y) };
      const r9 = 0.5 * circumR;
      const pN9 = toPx(N9.x, N9.y);
      const pR9 = toPx(N9.x + r9, N9.y);
      ctx.fillStyle = pal.amberFill;
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3.4 * scale;
      ctx.beginPath();
      ctx.arc(pN9.x, pN9.y, Math.abs(pR9.x - pN9.x), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Highlight the 3 side midpoints + altitude foot on AB + 3 Euler midpoints
      [
        { x: 0.5 * (A.x + B.x), y: 0.5 * (A.y + B.y) },
        { x: 0.5 * (B.x + C.x), y: 0.5 * (B.y + C.y) },
        { x: 0.5 * (C.x + A.x), y: 0.5 * (C.y + A.y) },
        { x: C.x, y: A.y },
        { x: 0.5 * (A.x + H.x), y: 0.5 * (A.y + H.y) },
        { x: 0.5 * (B.x + H.x), y: 0.5 * (B.y + H.y) },
        { x: 0.5 * (C.x + H.x), y: 0.5 * (C.y + H.y) },
      ].forEach((pt, idx) => {
        const p = toPx(pt.x, pt.y);
        this.drawDot(ctx, p.x, p.y, 6 * scale, idx < 3 ? pal.teal : pal.amber, pal.bg);
      });
      this.drawDot(ctx, pN9.x, pN9.y, 7 * scale, pal.indigo, pal.bg);
    } else {
      // ceva: 3 Cevians AD, BE, CF concurrent at interior point P
      const P = { x: G.x + 0.25 * Math.cos(time), y: G.y + 0.18 * Math.sin(time) };
      const intersectRaySeg = (V, Q, S1, S2) => {
        const dx1 = Q.x - V.x;
        const dy1 = Q.y - V.y;
        const dx2 = S2.x - S1.x;
        const dy2 = S2.y - S1.y;
        const det = dx1 * dy2 - dy1 * dx2;
        const t = ((S1.x - V.x) * dy2 - (S1.y - V.y) * dx2) / (Math.abs(det) < 1e-5 ? 1e-5 : det);
        return { x: V.x + t * dx1, y: V.y + t * dy1 };
      };
      const Dpt = intersectRaySeg(A, P, B, C);
      const Ept = intersectRaySeg(B, P, C, A);
      const Fpt = intersectRaySeg(C, P, A, B);
      const pD = toPx(Dpt.x, Dpt.y);
      const pE = toPx(Ept.x, Ept.y);
      const pF = toPx(Fpt.x, Fpt.y);
      const pP = toPx(P.x, P.y);
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 2.8 * scale;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pD.x, pD.y);
      ctx.moveTo(pB.x, pB.y);
      ctx.lineTo(pE.x, pE.y);
      ctx.moveTo(pC.x, pC.y);
      ctx.lineTo(pF.x, pF.y);
      ctx.stroke();
      [pD, pE, pF].forEach((p) => this.drawDot(ctx, p.x, p.y, 6.5 * scale, pal.teal, pal.bg));
      this.drawDot(ctx, pP.x, pP.y, 8 * scale, pal.amber, pal.bg);
    }
    ctx.restore();

    this.drawDot(ctx, pA.x, pA.y, 7.5 * scale, pal.indigo, pal.bg);
    this.drawDot(ctx, pB.x, pB.y, 7.5 * scale, pal.indigo, pal.bg);
    this.drawDot(ctx, pC.x, pC.y, 8.5 * scale, pal.amber, pal.bg);

    const titleMap = {
      euler_line: 'EULER LINE COLLINEARITY (HG = 2·GO)',
      law_sines: 'LAW OF SINES & CIRCUMCIRCLE (a/sinA = 2R)',
      law_cosines: 'LAW OF COSINES PROJECTION (c²=a²+b²-2ab cosC)',
      incircle: 'INCIRCLE & ANGLE BISECTOR CONCURRENCY',
      feuerbach: "FEUERBACH'S NINE-POINT CIRCLE (R₉ = R/2)",
      ceva: "CEVA'S CONCURRENT CEVIANS THEOREM",
    };

    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
      { text: titleMap[sub] || 'EUCLIDEAN TRIANGLE INVARIANTS', color: pal.amber, gap: 34 * scale },
      { text: `Area(△ABC) = ${areaTri.toFixed(3)}, R = ${circumR.toFixed(2)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
      { text: `Sides: a=${sideA.toFixed(2)}, b=${sideB.toFixed(2)}, c=${sideC.toFixed(2)}`, color: pal.indigo, gap: 34 * scale },
      { text: sub === 'feuerbach' ? `9-Point Radius R₉ = R/2 = ${(0.5 * circumR).toFixed(3)}` : `Centroid G = (${G.x.toFixed(2)}, ${G.y.toFixed(2)})`, color: pal.teal, gap: 34 * scale },
      { text: `Inradius r = A/s = ${inR.toFixed(3)}`, color: pal.amber, gap: 32 * scale },
    ], pal.panelBorder);

    return {
      readouts: [
        { key: 'Area △ABC', val: areaTri.toFixed(2) },
        { key: 'Circum R', val: circumR.toFixed(2) },
        { key: 'Inradius r', val: inR.toFixed(3) },
        { key: 'Centroid G', val: `(${G.x.toFixed(1)},${G.y.toFixed(1)})` },
      ],
      tableHeaders: ['Element', 'Formula', 'Value', 'Geometric Property'],
      tableRows: [
        ['Side a = |BC|', '√(Δx²+Δy²)', sideA.toFixed(3), 'Opposite Vertex A'],
        ['Side b = |AC|', '√(Δx²+Δy²)', sideB.toFixed(3), 'Opposite Vertex B'],
        ['Circumradius R', 'abc / (4·Area)', circumR.toFixed(3), 'Law of Sines 2R'],
        ['Inradius r', 'Area / s', inR.toFixed(3), 'Tangent Incircle'],
      ],
    };
  };

  /* ------------------------------------------------------------------------
   * 8. PROBABILITY, STATISTICS & BAYESIAN ENGINE (9 Distinct Visuals)
   * ------------------------------------------------------------------------ */
  proto.drawProbabilityScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const { scale, padX, plotW } = bounds;
    const prog = Math.max(0.25, spanEase(time, 0.2, duration * 0.85));

    // 1. Bayes' Theorem 2x2 Conditional Probability Square (#068)
    if (sub === 'bayes') {
      const plot = this.createPlotArea(ctx, pal, bounds, 0, 1.0, 0, 1.0, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
      const prior = Math.max(0.05, Math.min(0.95, Number(params.prior ?? 0.25)));
      const sens = Math.max(0.1, Math.min(0.99, Number(params.sens ?? 0.88)));
      const fpr = Math.max(0.02, Math.min(0.85, Number(params.fpr ?? 0.14)));

      const pBL = toPx(0, 0);
      const pSplitX = toPx(prior, 0);
      const pTP = toPx(prior, sens);
      const pFP = toPx(1.0, fpr);
      const pTR = toPx(1.0, 1.0);

      ctx.save();
      // Left Column: Hypothesis True H (width = prior), Bottom part = True Positive P(H ∩ E)
      ctx.fillStyle = pal.tealFill;
      ctx.fillRect(pBL.x, pTP.y, pSplitX.x - pBL.x, pBL.y - pTP.y);
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 3 * scale;
      ctx.strokeRect(pBL.x, pTP.y, pSplitX.x - pBL.x, pBL.y - pTP.y);

      // Right Column: Hypothesis False ¬H (width = 1-prior), Bottom part = False Positive P(¬H ∩ E)
      ctx.fillStyle = pal.amberFill;
      ctx.fillRect(pSplitX.x, pFP.y, pTR.x - pSplitX.x, pBL.y - pFP.y);
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3 * scale;
      ctx.strokeRect(pSplitX.x, pFP.y, pTR.x - pSplitX.x, pBL.y - pFP.y);

      // Outer unit square
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 2.6 * scale;
      ctx.strokeRect(pBL.x, pTR.y, pTR.x - pBL.x, pBL.y - pTR.y);
      ctx.restore();

      const tpArea = prior * sens;
      const fpArea = (1 - prior) * fpr;
      const post = tpArea / Math.max(1e-5, tpArea + fpArea);

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: "BAYES' THEOREM PROPORTIONAL AREA", color: pal.amber, gap: 34 * scale },
        { text: `Posterior P(H|E) = ${(post * 100).toFixed(1)}%`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `True Positive Area P(H∩E) = ${tpArea.toFixed(3)} (Teal)`, color: pal.teal, gap: 34 * scale },
        { text: `False Positive Area P(¬H∩E) = ${fpArea.toFixed(3)} (Amber)`, color: pal.amber, gap: 34 * scale },
        { text: `P(H|E) = Teal / (Teal + Amber)`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Prior P(H)', val: `${(prior * 100).toFixed(0)}%` },
          { key: 'True Pos TP', val: tpArea.toFixed(3) },
          { key: 'False Pos FP', val: fpArea.toFixed(3) },
          { key: 'Post P(H|E)', val: `${(post * 100).toFixed(1)}%` },
        ],
        tableHeaders: ['Region', 'Formula', 'Joint Area', 'Share of E'],
        tableRows: [
          ['True Positive (Teal)', 'P(H)·P(E|H)', tpArea.toFixed(4), `${(post * 100).toFixed(1)}%`],
          ['False Positive (Amber)', 'P(¬H)·P(E|¬H)', fpArea.toFixed(4), `${((1 - post) * 100).toFixed(1)}%`],
          ['Total Evidence P(E)', 'TP + FP', (tpArea + fpArea).toFixed(4), '100.0%'],
        ],
      };
    }

    // 2. Ordinary Least Squares Regression & Residual Squares (#069)
    if (sub === 'ols') {
      const plot = this.createPlotArea(ctx, pal, bounds, 0, 5.0, 0, 5.0, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
      const slopeM = Number(params.slopeM ?? 0.78);
      const intB = Number(params.interceptB ?? 0.65);
      const data = [
        { x: 0.7, y: 1.4 },
        { x: 1.5, y: 1.6 },
        { x: 2.3, y: 2.8 },
        { x: 3.2, y: 2.9 },
        { x: 4.1, y: 4.1 },
      ];

      ctx.save();
      let rss = 0;
      data.forEach((pt) => {
        const yHat = slopeM * pt.x + intB;
        const res = pt.y - yHat;
        rss += res * res;
        const pData = toPx(pt.x, pt.y);
        const pFit = toPx(pt.x, yHat);
        const sidePx = Math.abs(pData.y - pFit.y);
        // Geometric residual square
        ctx.fillStyle = pal.amberFill;
        ctx.strokeStyle = pal.amber;
        ctx.lineWidth = 2 * scale;
        ctx.fillRect(pData.x, Math.min(pData.y, pFit.y), sidePx, sidePx);
        ctx.strokeRect(pData.x, Math.min(pData.y, pFit.y), sidePx, sidePx);
        this.drawDot(ctx, pData.x, pData.y, 7 * scale, pal.indigo, pal.bg);
      });

      // Regression line y = m*x + b
      const pL = toPx(0.2, slopeM * 0.2 + intB);
      const pR = toPx(4.8, slopeM * 4.8 + intB);
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      ctx.moveTo(pL.x, pL.y);
      ctx.lineTo(pR.x, pR.y);
      ctx.stroke();
      ctx.restore();

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'OLS REGRESSION & RESIDUAL SQUARES', color: pal.amber, gap: 34 * scale },
        { text: `ŷ = ${slopeM.toFixed(2)}x + ${intB.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Sum of Squared Residuals SSR = ${rss.toFixed(3)}`, color: pal.amber, gap: 34 * scale },
        { text: `Amber Squares = Individual eᵢ² = (yᵢ - ŷᵢ)²`, color: pal.indigo, gap: 34 * scale },
        { text: `Normal Equations XᵀXβ = Xᵀy Minimize SSR`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Slope β₁', val: slopeM.toFixed(2) },
          { key: 'Intercept β₀', val: intB.toFixed(2) },
          { key: 'SSR ∑eᵢ²', val: rss.toFixed(3) },
          { key: 'RMSE', val: Math.sqrt(rss / data.length).toFixed(3) },
        ],
        tableHeaders: ['Point xᵢ', 'Observed yᵢ', 'Fitted ŷᵢ', 'Sq Error eᵢ²'],
        tableRows: data.map((d) => {
          const yh = slopeM * d.x + intB;
          return [d.x.toFixed(1), d.y.toFixed(2), yh.toFixed(2), Math.pow(d.y - yh, 2).toFixed(4)];
        }),
      };
    }

    // 3. Confidence Interval Coverage Simulation (#070)
    if (sub === 'ci_coverage') {
      const plot = this.createPlotArea(ctx, pal, bounds, -2.5, 2.5, 0, 16, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
      const confLevel = Number(params.confLevel ?? 0.90);
      const zStar = confLevel >= 0.98 ? 2.58 : confLevel >= 0.94 ? 1.96 : 1.645;
      const halfW = zStar * 0.42;

      ctx.save();
      // True population mean vertical line at mu = 0
      const pMuB = toPx(0, 0);
      const pMuT = toPx(0, 16);
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(pMuB.x, pMuB.y);
      ctx.lineTo(pMuT.x, pMuT.y);
      ctx.stroke();

      let hits = 0;
      const nBars = 15;
      const barSpan = Math.max(0.25, spanEase(time, 0.25, 3.2));
      for (let i = 1; i <= nBars; i++) {
        const drift = 0.14 * Math.sin(time * 1.45 + i * 0.65) * spanEase(time, 0.4, 1.8);
        const sampleMean = 0.68 * Math.sin(i * 2.1 + 0.5) + 0.35 * Math.cos(i * 3.7) + drift;
        const curHalf = halfW * barSpan;
        const lo = sampleMean - curHalf;
        const hi = sampleMean + curHalf;
        const covers = lo <= 0 && hi >= 0;
        if (covers) hits++;
        const pL = toPx(lo, i);
        const pR = toPx(hi, i);
        const pM = toPx(sampleMean, i);
        ctx.strokeStyle = covers ? pal.teal : pal.amber;
        ctx.lineWidth = 3.2 * scale;
        ctx.beginPath();
        ctx.moveTo(pL.x, pL.y);
        ctx.lineTo(pR.x, pR.y);
        ctx.stroke();
        this.drawDot(ctx, pM.x, pM.y, 5 * scale, covers ? pal.teal : pal.amber, pal.bg);
      }
      ctx.restore();

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'CONFIDENCE INTERVAL REPEATED COVERAGE', color: pal.amber, gap: 34 * scale },
        { text: `Captured True μ: ${hits} / ${nBars} (${((hits / nBars) * 100).toFixed(0)}%)`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Critical Multiplier z* = ${zStar.toFixed(2)} (±${halfW.toFixed(2)})`, color: pal.indigo, gap: 34 * scale },
        { text: `Teal Intervals Capture μ=0 | Amber Miss`, color: pal.teal, gap: 34 * scale },
        { text: `x̄ ± z*·(σ/√n) Frequentist Interpretation`, color: pal.amber, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Conf Level', val: `${Math.round(confLevel * 100)}%` },
          { key: 'Critical z*', val: zStar.toFixed(2) },
          { key: 'Captured μ', val: `${hits}/${nBars}` },
          { key: 'Half-Width', val: `±${halfW.toFixed(2)}` },
        ],
        tableHeaders: ['Sample #', 'Center x̄ᵢ', 'Interval [L, U]', 'Covers μ=0?'],
        tableRows: [1, 2, 3, 4].map((i) => {
          const m = 0.68 * Math.sin(i * 2.1 + 0.5) + 0.35 * Math.cos(i * 3.7);
          const ok = m - halfW <= 0 && m + halfW >= 0;
          return [`Sample ${i}`, m.toFixed(2), `[${(m - halfW).toFixed(2)}, ${(m + halfW).toFixed(2)}]`, ok ? '✓ Captures' : '✗ Misses'];
        }),
      };
    }

    // 4. Student-t vs Normal Heavy Tails (#071), Beta Conjugate (#072), Exponential (#073), Markov (#074)
    if (sub === 'student_t' || sub === 'beta' || sub === 'exponential') {
      const xMin = sub === 'student_t' ? -3.5 : 0;
      const xMax = sub === 'student_t' ? 3.5 : sub === 'beta' ? 1.0 : 4.0;
      const yMax = sub === 'beta' ? 2.8 : 1.15;
      const plot = this.createPlotArea(ctx, pal, bounds, xMin, xMax, -0.05, yMax, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;

      if (sub === 'student_t') {
        const nu = Math.max(1, Number(params.dfNu ?? 2.5));
        const zFn = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x) * 2.4;
        const tFn = (x) => Math.pow(1 + (x * x) / nu, -0.5 * (nu + 1)) * 2.1;
        this.strokeSampledCurve(ctx, toPx, -3.4, 3.4, zFn, pal.teal, 2.8 * scale, 1);
        this.strokeSampledCurve(ctx, toPx, -3.4, 3.4, tFn, pal.amber, 4.0 * scale, prog);
      } else if (sub === 'beta') {
        const a = Math.max(0.5, Number(params.alpha ?? 2.5));
        const b = Math.max(0.5, Number(params.beta ?? 4.0));
        const modeX = a > 1 && b > 1 ? (a - 1) / (a + b - 2) : a / (a + b);
        const peakRaw = Math.pow(Math.max(0.05, modeX), a - 1) * Math.pow(Math.max(0.05, 1 - modeX), b - 1);
        const betaFn = (x) => (2.3 * Math.pow(Math.max(0.001, x), a - 1) * Math.pow(Math.max(0.001, 1 - x), b - 1)) / Math.max(1e-4, peakRaw);
        this.strokeSampledCurve(ctx, toPx, 0.01, 0.99, betaFn, pal.indigo, 4.2 * scale, prog);
        const pMode = toPx(modeX, betaFn(modeX));
        this.drawDot(ctx, pMode.x, pMode.y, 8 * scale, pal.amber, pal.bg);
      } else {
        // exponential PDF + CDF
        const lam = Math.max(0.3, Number(params.lambda ?? 1.1));
        const pdfFn = (x) => lam * Math.exp(-lam * x);
        const cdfFn = (x) => 1 - Math.exp(-lam * x);
        this.strokeSampledCurve(ctx, toPx, 0, 3.9, pdfFn, pal.indigo, 4.0 * scale, prog);
        this.strokeSampledCurve(ctx, toPx, 0, 3.9, cdfFn, pal.teal, 3.4 * scale, prog);
        const med = Math.LN2 / lam;
        const pMed = toPx(med, 0.5);
        this.drawDot(ctx, pMed.x, pMed.y, 7.5 * scale, pal.amber, pal.bg);
      }

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: sub === 'student_t' ? 'STUDENT-t HEAVY TAILS VS. GAUSSIAN Z' : sub === 'beta' ? 'BETA(α, β) CONJUGATE PRIOR DENSITY' : 'EXPONENTIAL MEMORYLESS PDF & CDF', color: pal.amber, gap: 34 * scale },
        { text: sub === 'student_t' ? `Degrees of Freedom ν = ${Number(params.dfNu ?? 2.5).toFixed(1)}` : sub === 'beta' ? `Mean E[θ] = α/(α+β) = ${(Number(params.alpha ?? 2.5) / (Number(params.alpha ?? 2.5) + Number(params.beta ?? 4.0))).toFixed(3)}` : `Rate λ = ${Number(params.lambda ?? 1.1).toFixed(2)}, Mean 1/λ = ${(1 / Number(params.lambda ?? 1.1)).toFixed(2)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: sub === 'student_t' ? 'Amber: Heavy-Tailed t_ν | Teal: Normal Z' : sub === 'beta' ? 'Defined on Compact Support θ ∈ [0, 1]' : 'Indigo: PDF λe^{-λt} | Teal: CDF 1-e^{-λt}', color: pal.indigo, gap: 34 * scale },
        { text: `Exact Continuous Parametric Density`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Model', val: sub.toUpperCase() },
          { key: 'Param 1', val: Number(params.dfNu ?? params.alpha ?? params.lambda ?? 2.0).toFixed(2) },
          { key: 'Support', val: sub === 'beta' ? '[0, 1]' : sub === 'student_t' ? '(-∞, ∞)' : '[0, ∞)' },
          { key: 'Integral', val: '1.000' },
        ],
        tableHeaders: ['x', 'Density f(x)', 'Tail Behavior', 'Property'],
        tableRows: [0.2, 0.5, 0.8].map((x) => [x.toFixed(2), 'Continuous PDF', 'Normalized', 'Exact Analytic']),
      };
    }

    // 5. Markov Chain Stationary Convergence (#074), Binomial CLT (#066), Poisson (#067)
    const plot = this.createPlotArea(ctx, pal, bounds, -0.5, 14.5, -0.02, 0.36, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const lambda = Number(params.lambda ?? params.alpha ?? 4.2);
    const nTrials = Math.max(4, Math.round(Number(params.trialsN ?? 14)));
    const pProb = Number(params.probP ?? params.pStayA ?? 0.45);
    const meanVal = sub === 'binomial_clt' ? nTrials * pProb : lambda;
    const sdVal = sub === 'binomial_clt' ? Math.sqrt(nTrials * pProb * (1 - pProb)) : Math.sqrt(lambda);

    const fact = (m) => {
      let r = 1;
      for (let i = 2; i <= m; i++) r *= i;
      return r;
    };

    const pmf = (k) => {
      if (sub === 'markov') {
        const pA = Number(params.pStayA ?? (1 - Number(params.pAToB ?? 0.3)));
        const pB = Number(params.pStayB ?? (1 - Number(params.pBToA ?? 0.45)));
        const eq = (1 - pB) / Math.max(0.05, 2 - pA - pB);
        return Math.min(0.34, eq * 0.45 + 0.16 * Math.pow(pA + pB - 1, k));
      }
      if (sub === 'binomial_clt') {
        if (k > nTrials) return 0;
        const comb = fact(nTrials) / (fact(k) * fact(nTrials - k));
        return comb * Math.pow(pProb, k) * Math.pow(1 - pProb, nTrials - k);
      }
      return (Math.pow(lambda, k) * Math.exp(-lambda)) / fact(k);
    };

    const tableRows = [];
    for (let k = 0; k <= 14; k++) {
      const pk = pmf(k) * prog;
      if (sub === 'poisson') {
        // Lollipop stem plot for Poisson rare events
        const p0 = toPx(k, 0);
        const p1 = toPx(k, pk);
        ctx.save();
        ctx.strokeStyle = pal.amber;
        ctx.lineWidth = 3 * scale;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctx.restore();
        this.drawDot(ctx, p1.x, p1.y, 6.5 * scale, pal.teal, pal.bg);
      } else {
        const pTL = toPx(k - 0.36, pk);
        const pBR = toPx(k + 0.36, 0);
        ctx.save();
        ctx.fillStyle = sub === 'markov' ? pal.tealFill : Math.abs(k - meanVal) <= sdVal ? pal.amberFill : pal.indigoFill;
        ctx.strokeStyle = sub === 'markov' ? pal.teal : Math.abs(k - meanVal) <= sdVal ? pal.amber : pal.indigo;
        ctx.lineWidth = 2.2 * scale;
        ctx.beginPath();
        ctx.rect(pTL.x, pTL.y, pBR.x - pTL.x, pBR.y - pTL.y);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      if (k <= 5) {
        tableRows.push([`k = ${k}`, pmf(k).toFixed(4), ((k - meanVal) / Math.max(0.1, sdVal)).toFixed(2), k <= meanVal ? 'Lower Half' : 'Upper Tail']);
      }
    }

    if (sub === 'binomial_clt') {
      const gauss = (x) =>
        (1 / (Math.max(0.4, sdVal) * Math.sqrt(2 * Math.PI))) *
        Math.exp(-0.5 * Math.pow((x - meanVal) / Math.max(0.4, sdVal), 2));
      this.strokeSampledCurve(ctx, toPx, 0, 14, gauss, pal.teal, 3.6 * scale, prog);
    } else if (sub === 'markov') {
      this.strokeSampledCurve(ctx, toPx, 0, 14, (x) => pmf(x) * prog, pal.amber, 3.0 * scale, prog);
    }

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
      { text: sub === 'markov' ? 'MARKOV CHAIN STATIONARY EQUILIBRIUM' : sub === 'poisson' ? 'POISSON RARE-EVENT ARRIVAL STEMS' : 'BINOMIAL PMF & GAUSSIAN CLT LIMIT', color: pal.amber, gap: 34 * scale },
      { text: `Expected Value E[X] = ${meanVal.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
      { text: `Variance Var(X) = ${(sdVal * sdVal).toFixed(3)}`, color: pal.indigo, gap: 34 * scale },
      { text: `Std Deviation σ = ${sdVal.toFixed(3)}`, color: pal.amber, gap: 34 * scale },
      { text: sub === 'markov' ? 'Spectral Gap |λ₂| < 1 Drives Mixing' : 'Exact Discrete Probability Law', color: pal.teal, gap: 32 * scale },
    ], pal.panelBorder);

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
   * 9. ADVANCED LINEAR ALGEBRA & MATRIX DECOMPOSITIONS ENGINE (8 Distinct Visuals)
   * ------------------------------------------------------------------------ */
  proto.drawLinAlgAdvScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -2.8, 2.8, -2.4, 2.4, spanEase(time, 0, 0.5), 0.60, true);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const tProg = Math.max(0.2, spanEase(time, 0.25, duration * 0.82));
    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const pOrig = toPx(0, 0);

    // 1. Gershgorin Circle Theorem Eigenvalue Discs (#075)
    if (sub === 'gershgorin') {
      const d1 = -1.1;
      const d2 = Number(params.diagSpread ?? 1.25);
      const r = Number(params.offDiagR ?? 0.85);
      const pC1 = toPx(d1, 0);
      const pR1 = toPx(d1 + r, 0);
      const pC2 = toPx(d2, 0);
      const pR2 = toPx(d2 + r, 0);

      ctx.save();
      // Disc 1 around a11 = d1
      ctx.fillStyle = pal.indigoFill;
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.2 * scale;
      ctx.beginPath();
      ctx.arc(pC1.x, pC1.y, Math.abs(pR1.x - pC1.x), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Disc 2 around a22 = d2
      ctx.fillStyle = pal.tealFill;
      ctx.strokeStyle = pal.teal;
      ctx.beginPath();
      ctx.arc(pC2.x, pC2.y, Math.abs(pR2.x - pC2.x), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Exact eigenvalues of [[d1, r], [0.6*r, d2]]
      const tr = d1 + d2;
      const det = d1 * d2 - 0.6 * r * r;
      const disc = tr * tr - 4 * det;
      const l1Re = disc >= 0 ? 0.5 * (tr - Math.sqrt(disc)) : 0.5 * tr;
      const l2Re = disc >= 0 ? 0.5 * (tr + Math.sqrt(disc)) : 0.5 * tr;
      const lIm = disc < 0 ? 0.5 * Math.sqrt(-disc) : 0;

      this.drawDot(ctx, pC1.x, pC1.y, 6 * scale, pal.indigo, pal.bg);
      this.drawDot(ctx, pC2.x, pC2.y, 6 * scale, pal.teal, pal.bg);
      this.drawDot(ctx, toPx(l1Re, lIm).x, toPx(l1Re, lIm).y, 8.5 * scale, pal.amber, pal.bg);
      this.drawDot(ctx, toPx(l2Re, -lIm).x, toPx(l2Re, -lIm).y, 8.5 * scale, pal.amber, pal.bg);

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'GERSHGORIN EIGENVALUE DISCS D(aᵢᵢ, Rᵢ)', color: pal.amber, gap: 34 * scale },
        { text: `Centers a₁₁ = ${d1.toFixed(2)}, a₂₂ = ${d2.toFixed(2)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Radii Rᵢ = ∑_{j≠i} |aᵢⱼ| = ${r.toFixed(2)}`, color: pal.indigo, gap: 34 * scale },
        { text: `Eigenvalues λ₁=${l1Re.toFixed(2)}, λ₂=${l2Re.toFixed(2)} (Amber)`, color: pal.amber, gap: 34 * scale },
        { text: `Every Eigenvalue Lies Inside ⋃ D(aᵢᵢ, Rᵢ)`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Center a₁₁', val: d1.toFixed(2) },
          { key: 'Center a₂₂', val: d2.toFixed(2) },
          { key: 'Radius Rᵢ', val: r.toFixed(2) },
          { key: 'λ₁, λ₂', val: `${l1Re.toFixed(1)}, ${l2Re.toFixed(1)}` },
        ],
        tableHeaders: ['Disc i', 'Center aᵢᵢ', 'Radius Rᵢ', 'Bound Interval'],
        tableRows: [
          ['Disc D₁', d1.toFixed(2), r.toFixed(2), `[${(d1 - r).toFixed(2)}, ${(d1 + r).toFixed(2)}]`],
          ['Disc D₂', d2.toFixed(2), r.toFixed(2), `[${(d2 - r).toFixed(2)}, ${(d2 + r).toFixed(2)}]`],
        ],
      };
    }

    // 2. Trace-Determinant (tr A, det A) Bifurcation Plane (#077)
    if (sub === 'cayley_trace_det') {
      const trA = Number(params.traceTau ?? params.traceT ?? 1.1);
      const detA = Number(params.detDelta ?? params.detD ?? 0.85);
      const critDet = 0.25 * trA * trA;

      ctx.save();
      // Shade Spiral region above parabola det = tr^2 / 4
      ctx.fillStyle = pal.indigoFill;
      ctx.beginPath();
      for (let i = 0; i <= 140; i++) {
        const t = -2.6 + (5.2 * i) / 140;
        const d = Math.min(2.3, 0.25 * t * t);
        const p = toPx(t, d);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.lineTo(toPx(2.6, 2.3).x, toPx(2.6, 2.3).y);
      ctx.lineTo(toPx(-2.6, 2.3).x, toPx(-2.6, 2.3).y);
      ctx.closePath();
      ctx.fill();

      // Critical Discriminant Parabola Δ = τ² / 4
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 140; i++) {
        const t = -2.6 + (5.2 * i) / 140;
        const d = 0.25 * t * t;
        if (d <= 2.35) {
          const p = toPx(t, d);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();
      ctx.restore();

      const pState = toPx(trA, detA);
      this.drawDot(ctx, pState.x, pState.y, 9 * scale, pal.amber, pal.bg);

      const regime =
        detA < 0
          ? 'Saddle Point (Real Opposite-Sign λ)'
          : detA > critDet
            ? trA < 0
              ? 'Stable Spiral Sink (Complex λ)'
              : 'Unstable Spiral Source (Complex λ)'
            : trA < 0
              ? 'Stable Node Sink (Real λ < 0)'
              : 'Unstable Node Source (Real λ > 0)';

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'TRACE-DETERMINANT (τ, Δ) STABILITY PLANE', color: pal.amber, gap: 34 * scale },
        { text: `tr(A) = ${trA.toFixed(2)}, det(A) = ${detA.toFixed(2)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Parabola Boundary τ² - 4Δ = ${(trA * trA - 4 * detA).toFixed(3)}`, color: pal.indigo, gap: 34 * scale },
        { text: regime, color: trA < 0 && detA > 0 ? pal.teal : pal.amber, gap: 34 * scale },
        { text: `λ² − tr(A)λ + det(A) = 0 Characteristic Eq`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Trace τ', val: trA.toFixed(2) },
          { key: 'Det Δ', val: detA.toFixed(2) },
          { key: 'Disc τ²-4Δ', val: (trA * trA - 4 * detA).toFixed(2) },
          { key: 'Portrait', val: detA < 0 ? 'Saddle' : detA > critDet ? 'Spiral' : 'Node' },
        ],
        tableHeaders: ['Region', 'Condition', 'Eigenvalues', 'Phase Portrait'],
        tableRows: [
          ['Lower Half', 'det(A) < 0', 'λ₁ < 0 < λ₂', 'Hyperbolic Saddle'],
          ['Above Parabola', 'det(A) > tr(A)²/4', 'α ± iω Complex', 'Spiral Sink / Source'],
          ['Below Parabola', '0 < det(A) < tr(A)²/4', 'Real Same Sign', 'Node Sink / Source'],
        ],
      };
    }

    // 3. Gram-Schmidt Orthogonalization (#076)
    if (sub === 'gram_schmidt') {
      const ang2 = (Number(params.vec2Deg ?? 52) * Math.PI) / 180;
      const v1 = { x: 2.2, y: 0.0 };
      const v2 = { x: 2.0 * Math.cos(ang2), y: 2.0 * Math.sin(ang2) };
      const projX = v2.x;
      const u2 = { x: 0, y: v2.y * tProg };

      const pV1 = toPx(v1.x, v1.y);
      const pV2 = toPx(v2.x, v2.y);
      const pProj = toPx(projX, 0);
      const pU2 = toPx(u2.x, u2.y);

      ctx.save();
      // Dashed drop line from v2 to proj_{v1}(v2)
      ctx.strokeStyle = pal.amber;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 2.6 * scale;
      ctx.beginPath();
      ctx.moveTo(pV2.x, pV2.y);
      ctx.lineTo(pProj.x, pProj.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      this.drawArrow(ctx, pOrig.x, pOrig.y, pV1.x, pV1.y, pal.indigo, 3.8 * scale);
      this.drawArrow(ctx, pOrig.x, pOrig.y, pV2.x, pV2.y, pal.amber, 3.4 * scale);
      this.drawArrow(ctx, pOrig.x, pOrig.y, pU2.x, pU2.y, pal.teal, 4.2 * scale);

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: 'GRAM-SCHMIDT ORTHOGONALIZATION', color: pal.amber, gap: 34 * scale },
        { text: `u₂ = v₂ − proj_{u₁}(v₂)`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Projection Component = ${projX.toFixed(3)} û₁`, color: pal.amber, gap: 34 * scale },
        { text: `Orthogonal Residual ‖u₂‖ = ${v2.y.toFixed(3)} (Teal)`, color: pal.teal, gap: 34 * scale },
        { text: `Inner Product ⟨u₁, u₂⟩ = 0.0000`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Angle θ', val: `${Math.round((ang2 * 180) / Math.PI)}°` },
          { key: '‖proj(v₂)‖', val: Math.abs(projX).toFixed(2) },
          { key: '‖u₂‖', val: Math.abs(v2.y).toFixed(2) },
          { key: '⟨u₁, u₂⟩', val: '0.000' },
        ],
        tableHeaders: ['Vector', 'Coordinates', 'Norm', 'Role'],
        tableRows: [
          ['Basis u₁', '(2.20, 0.00)', '2.200', 'Reference Axis'],
          ['Input v₂', `(${v2.x.toFixed(2)}, ${v2.y.toFixed(2)})`, '2.000', 'Skew Input'],
          ['Orthogonal u₂', `(0.00, ${v2.y.toFixed(2)})`, Math.abs(v2.y).toFixed(3), 'QR Column q₂'],
        ],
      };
    }

    // 4. Orthogonal Projection (#078) & 5. Householder Reflection (#079)
    if (sub === 'projection' || sub === 'reflection') {
      const deg = Number(params.lineDeg ?? params.mirrorDeg ?? 32);
      const th = (deg * Math.PI) / 180;
      const ux = Math.cos(th);
      const uy = Math.sin(th);

      ctx.save();
      // Subspace / Mirror Line through origin
      const pL1 = toPx(-2.6 * ux, -2.6 * uy);
      const pL2 = toPx(2.6 * ux, 2.6 * uy);
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.4 * scale;
      ctx.beginPath();
      ctx.moveTo(pL1.x, pL1.y);
      ctx.lineTo(pL2.x, pL2.y);
      ctx.stroke();

      // Input vector v
      const v = { x: Number(params.vx ?? 0.75), y: Number(params.vy ?? 1.95) };
      const dot = v.x * ux + v.y * uy;
      const proj = { x: dot * ux, y: dot * uy };
      const refl = { x: 2 * proj.x - v.x, y: 2 * proj.y - v.y };
      const target = sub === 'projection' ? proj : refl;

      const pV = toPx(v.x, v.y);
      const pT = toPx(target.x, target.y);
      ctx.strokeStyle = pal.amber;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 2.6 * scale;
      ctx.beginPath();
      ctx.moveTo(pV.x, pV.y);
      ctx.lineTo(pT.x, pT.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      this.drawArrow(ctx, pOrig.x, pOrig.y, toPx(v.x, v.y).x, toPx(v.x, v.y).y, pal.amber, 3.6 * scale);
      this.drawArrow(ctx, pOrig.x, pOrig.y, toPx(target.x, target.y).x, toPx(target.x, target.y).y, pal.teal, 4.0 * scale);

      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: sub === 'projection' ? 'RANK-1 ORTHOGONAL PROJECTION P = uuᵀ' : 'HOUSEHOLDER REFLECTION H = I − 2nnᵀ', color: pal.amber, gap: 34 * scale },
        { text: `Subspace Angle θ = ${deg.toFixed(1)}°`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Input v = (${v.x.toFixed(2)}, ${v.y.toFixed(2)}) (Amber)`, color: pal.amber, gap: 34 * scale },
        { text: `Output = (${target.x.toFixed(2)}, ${target.y.toFixed(2)}) (Teal)`, color: pal.teal, gap: 34 * scale },
        { text: sub === 'projection' ? 'Idempotent P² = P, Eigenvalues {1, 0}' : 'Orthogonal Involution H² = I, det(H) = -1', color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Angle θ', val: `${deg.toFixed(1)}°` },
          { key: 'det', val: sub === 'projection' ? '0.000' : '-1.000' },
          { key: 'trace', val: sub === 'projection' ? '1.000' : '0.000' },
          { key: 'Spectrum', val: sub === 'projection' ? '{1, 0}' : '{1, -1}' },
        ],
        tableHeaders: ['Property', 'Formula', 'Value', 'Invariant'],
        tableRows: [
          ['Input Vector v', '(x, y)', `(${v.x.toFixed(2)}, ${v.y.toFixed(2)})`, `‖v‖ = ${Math.hypot(v.x, v.y).toFixed(2)}`],
          ['Transformed', sub === 'projection' ? 'P·v' : 'H·v', `(${target.x.toFixed(2)}, ${target.y.toFixed(2)})`, `Norm = ${Math.hypot(target.x, target.y).toFixed(2)}`],
        ],
      };
    }

    // 6. Perron-Frobenius Positive Cone Contraction (#080) & 7. Power Iteration (#081)
    if (sub === 'perron_frobenius' || sub === 'power_iter') {
      const c = Number(params.mixAlpha ?? params.ratioLambda ?? params.mixEps ?? 0.35);
      // Positive matrix [[1.2, c], [0.8*c, 0.9]]
      const a11 = 1.25;
      const a12 = c;
      const a21 = 0.85 * c;
      const a22 = 0.85;

      ctx.save();
      if (sub === 'perron_frobenius') {
        // Shade contracted image of positive quadrant cone in 1st quadrant
        const pC1 = toPx(2.3, (2.3 * a21) / a11);
        const pC2 = toPx((2.1 * a12) / a22, 2.1);
        ctx.fillStyle = pal.tealFill;
        ctx.beginPath();
        ctx.moveTo(pOrig.x, pOrig.y);
        ctx.lineTo(pC1.x, pC1.y);
        ctx.lineTo(pC2.x, pC2.y);
        ctx.closePath();
        ctx.fill();
        this.drawArrow(ctx, pOrig.x, pOrig.y, pC1.x, pC1.y, pal.indigo, 3.0 * scale);
        this.drawArrow(ctx, pOrig.x, pOrig.y, pC2.x, pC2.y, pal.indigo, 3.0 * scale);
      }

      // Draw sequence of normalized power-iteration vectors rotating toward dominant eigenvector
      let vx = 0.15;
      let vy = 2.1;
      for (let k = 0; k <= 6; k++) {
        const norm = Math.hypot(vx, vy);
        const rx = (vx / norm) * 2.15;
        const ry = (vy / norm) * 2.15;
        const pTip = toPx(rx, ry);
        this.drawArrow(ctx, pOrig.x, pOrig.y, pTip.x, pTip.y, k === 6 ? pal.amber : pal.teal, (k === 6 ? 4.2 : 2.2) * scale);
        const nx = a11 * vx + a12 * vy;
        const ny = a21 * vx + a22 * vy;
        vx = nx;
        vy = ny;
      }
      ctx.restore();

      const domAng = (Math.atan2(vy, vx) * 180) / Math.PI;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
        { text: sub === 'perron_frobenius' ? 'PERRON-FROBENIUS POSITIVE CONE' : 'POWER ITERATION EIGENVECTOR CONVERGENCE', color: pal.amber, gap: 34 * scale },
        { text: `Dominant Perron Angle θ* = ${domAng.toFixed(1)}°`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `v^{(k+1)} = A v^{(k)} / ‖A v^{(k)}‖`, color: pal.indigo, gap: 34 * scale },
        { text: `Strictly Positive Eigenvector v_PF > 0`, color: pal.teal, gap: 34 * scale },
        { text: `Rate |λ₂ / λ₁|^k Geometric Convergence`, color: pal.amber, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Perron θ*', val: `${domAng.toFixed(1)}°` },
          { key: 'Coupling ε', val: c.toFixed(2) },
          { key: 'Cone Image', val: '⊂ ℝ₊²' },
          { key: 'Spectral Gap', val: '|λ₁| > |λ₂|' },
        ],
        tableHeaders: ['Iteration k', 'Direction θ_k', 'Rayleigh Quotient', 'Status'],
        tableRows: [0, 1, 2, 4, 6].map((k) => [`k = ${k}`, `${(85 - (85 - domAng) * (1 - Math.pow(0.55, k))).toFixed(1)}°`, (1.25 + 0.35 * c).toFixed(3), k >= 4 ? 'Converged' : 'Contracting']),
      };
    }

    // 8. Cramer's Rule Geometric Area Ratio (#082)
    const a1 = { x: 1.8, y: 0.4 };
    const a2 = { x: 0.5, y: 1.7 };
    const bVec = { x: Number(params.bx ?? 1.9), y: Number(params.by ?? 1.5) };
    const detA = a1.x * a2.y - a1.y * a2.x;
    const detX1 = bVec.x * a2.y - bVec.y * a2.x;
    const x1Sol = detX1 / detA;

    ctx.save();
    // Base determinant parallelogram [a1, a2] in indigo
    const pA1 = toPx(a1.x, a1.y);
    const pA2 = toPx(a2.x, a2.y);
    const pSumA = toPx(a1.x + a2.x, a1.y + a2.y);
    ctx.fillStyle = pal.indigoFill;
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 3 * scale;
    ctx.beginPath();
    ctx.moveTo(pOrig.x, pOrig.y);
    ctx.lineTo(pA1.x, pA1.y);
    ctx.lineTo(pSumA.x, pSumA.y);
    ctx.lineTo(pA2.x, pA2.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Replaced parallelogram [b, a2] in amber
    const pB = toPx(bVec.x, bVec.y);
    const pSumB = toPx(bVec.x + a2.x, bVec.y + a2.y);
    ctx.fillStyle = pal.amberFill;
    ctx.strokeStyle = pal.amber;
    ctx.setLineDash([6 * scale, 4 * scale]);
    ctx.beginPath();
    ctx.moveTo(pOrig.x, pOrig.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.lineTo(pSumB.x, pSumB.y);
    ctx.lineTo(pA2.x, pA2.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    this.drawArrow(ctx, pOrig.x, pOrig.y, pA1.x, pA1.y, pal.indigo, 3.6 * scale);
    this.drawArrow(ctx, pOrig.x, pOrig.y, pA2.x, pA2.y, pal.teal, 3.6 * scale);
    this.drawArrow(ctx, pOrig.x, pOrig.y, pB.x, pB.y, pal.amber, 4.0 * scale);

    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(275 * scale), scale, [
      { text: "CRAMER'S RULE PARALLELOGRAM AREA RATIO", color: pal.amber, gap: 34 * scale },
      { text: `x₁ = det([b, a₂]) / det(A) = ${x1Sol.toFixed(3)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
      { text: `Base Area det([a₁, a₂]) = ${detA.toFixed(3)} (Indigo)`, color: pal.indigo, gap: 34 * scale },
      { text: `Target Area det([b, a₂]) = ${detX1.toFixed(3)} (Amber)`, color: pal.amber, gap: 34 * scale },
      { text: `Shared Height ⇒ Area Ratio Equals Coordinate x₁`, color: pal.teal, gap: 32 * scale },
    ], pal.panelBorder);

    return {
      readouts: [
        { key: 'det(A)', val: detA.toFixed(3) },
        { key: 'det([b,a₂])', val: detX1.toFixed(3) },
        { key: 'Coord x₁', val: x1Sol.toFixed(3) },
        { key: 'Target b', val: `(${bVec.x.toFixed(1)},${bVec.y.toFixed(1)})` },
      ],
      tableHeaders: ['Parallelogram', 'Columns', 'Signed Area', 'Ratio'],
      tableRows: [
        ['Base det(A)', '[a₁, a₂]', detA.toFixed(3), '1.000×'],
        ['Numerator det(A₁)', '[b, a₂]', detX1.toFixed(3), `x₁ = ${x1Sol.toFixed(3)}`],
      ],
    };
  };

  /* ------------------------------------------------------------------------
   * 10. DISCRETE MATH, NUMBER THEORY & COMBINATORICS ENGINE (6 Distinct Visuals)
   * ------------------------------------------------------------------------ */
  proto.drawDiscreteScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height > bounds.width * 1.1;
    const prog = Math.max(0.2, spanEase(time, 0.2, duration * 0.85));

    // 1. Modular Arithmetic Multiplication Circle Caustic (#083)
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
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(265 * scale), scale, [
        { text: 'MODULAR ARITHMETIC CAUSTIC', color: pal.amber, gap: 34 * scale },
        { text: `Ring ℤ / ${N}ℤ   (Multiplier m = ${m})`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Active Chords = ${visN} / ${N}`, color: pal.teal, gap: 34 * scale },
        { text: `Interior Caustic Cusps = ${Math.max(1, Math.round(m) - 1)}`, color: pal.amber, gap: 34 * scale },
        { text: `Mapping x ↦ (${m}x) mod ${N}`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

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

    // 2. Euclidean GCD Square Tiling of an a x b Rectangle (#084)
    if (sub === 'euclid_gcd') {
      const A0 = Math.max(6, Math.round(Number(params.rectA ?? 21)));
      const B0 = Math.max(4, Math.round(Number(params.rectB ?? 13)));
      const plot = this.createPlotArea(ctx, pal, bounds, 0, A0, 0, B0, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH } = plot;

      ctx.save();
      let x0 = 0;
      let y0 = 0;
      let w = A0;
      let h = B0;
      let stepIdx = 0;
      const steps = [];
      const tileSweep = spanEase(time, 0.25, 4.2);
      while (w > 0.01 && h > 0.01 && stepIdx < 16) {
        const palCol = stepIdx % 3 === 0 ? pal.indigo : stepIdx % 3 === 1 ? pal.teal : pal.amber;
        const palFill = stepIdx % 3 === 0 ? pal.indigoFill : stepIdx % 3 === 1 ? pal.tealFill : pal.amberFill;
        const stepVis = clamp01(tileSweep * 6 - stepIdx * 0.45);
        if (w >= h) {
          const sq = h;
          const pTL = toPx(x0, y0 + sq);
          const pBR = toPx(x0 + sq * Math.max(0.2, stepVis), y0);
          ctx.fillStyle = palFill;
          ctx.strokeStyle = palCol;
          ctx.lineWidth = (2.4 + 0.5 * Math.sin(time * 2.2 + stepIdx)) * scale;
          ctx.fillRect(pTL.x, pTL.y, pBR.x - pTL.x, pBR.y - pTL.y);
          ctx.strokeRect(pTL.x, pTL.y, pBR.x - pTL.x, pBR.y - pTL.y);
          ctx.beginPath();
          ctx.moveTo(pTL.x, pBR.y);
          ctx.lineTo(
            pTL.x + (pBR.x - pTL.x) * (0.5 + 0.5 * Math.sin(time * 1.8 + stepIdx)),
            pBR.y + (pTL.y - pBR.y) * (0.5 + 0.5 * Math.sin(time * 1.8 + stepIdx))
          );
          ctx.stroke();
          steps.push([`Step ${stepIdx + 1}`, `${Math.round(w)} × ${Math.round(h)}`, `Square ${Math.round(sq)}×${Math.round(sq)}`, `Rem ${Math.round(w - sq)}`]);
          x0 += sq;
          w -= sq;
        } else {
          const sq = w;
          const pTL = toPx(x0, y0 + sq * Math.max(0.2, stepVis));
          const pBR = toPx(x0 + sq, y0);
          ctx.fillStyle = palFill;
          ctx.strokeStyle = palCol;
          ctx.lineWidth = (2.4 + 0.5 * Math.sin(time * 2.2 + stepIdx)) * scale;
          ctx.fillRect(pTL.x, pTL.y, pBR.x - pTL.x, pBR.y - pTL.y);
          ctx.strokeRect(pTL.x, pTL.y, pBR.x - pTL.x, pBR.y - pTL.y);
          steps.push([`Step ${stepIdx + 1}`, `${Math.round(w)} × ${Math.round(h)}`, `Square ${Math.round(sq)}×${Math.round(sq)}`, `Rem ${Math.round(h - sq)}`]);
          y0 += sq;
          h -= sq;
        }
        stepIdx++;
      }
      ctx.restore();

      const gcdFn = (a, b) => (b === 0 ? a : gcdFn(b, a % b));
      const gVal = gcdFn(A0, B0);
      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(270 * scale), scale, [
        { text: 'EUCLIDEAN GCD SQUARE TILING', color: pal.amber, gap: 34 * scale },
        { text: `gcd(${A0}, ${B0}) = ${gVal}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Rectangle ${A0} × ${B0} Tiled by ${stepIdx} Squares`, color: pal.indigo, gap: 34 * scale },
        { text: `Smallest Terminal Tile = ${gVal} × ${gVal}`, color: pal.teal, gap: 34 * scale },
        { text: `gcd(a, b) = gcd(b, a mod b)`, color: pal.amber, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Side a', val: `${A0}` },
          { key: 'Side b', val: `${B0}` },
          { key: 'gcd(a,b)', val: `${gVal}` },
          { key: 'Squares', val: `${stepIdx}` },
        ],
        tableHeaders: ['Step', 'Remaining Box', 'Extracted Square', 'Remainder'],
        tableRows: steps.slice(0, 5),
      };
    }

    // 3. Fibonacci Golden Spiral & Squares (#085)
    if (sub === 'fibonacci') {
      const plot = this.createPlotArea(ctx, pal, bounds, -4.5, 9.5, -5.5, 4.5, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH } = plot;
      // Golden squares layout: F1=1, F2=1, F3=2, F4=3, F5=5, F6=8
      const boxes = [
        { x: 0, y: 0, s: 1, col: pal.teal },
        { x: 0, y: 1, s: 1, col: pal.amber },
        { x: -2, y: 0, s: 2, col: pal.indigo },
        { x: -2, y: -3, s: 3, col: pal.teal },
        { x: 1, y: -3, s: 5, col: pal.amber },
        { x: 1, y: 2, s: 3, col: pal.indigo },
      ];
      ctx.save();
      boxes.forEach((b) => {
        const pTL = toPx(b.x, b.y + b.s);
        const pBR = toPx(b.x + b.s, b.y);
        ctx.fillStyle = pal.indigoFill;
        ctx.strokeStyle = b.col;
        ctx.lineWidth = 2.6 * scale;
        ctx.fillRect(pTL.x, pTL.y, pBR.x - pTL.x, pBR.y - pTL.y);
        ctx.strokeRect(pTL.x, pTL.y, pBR.x - pTL.x, pBR.y - pTL.y);
      });

      // Overlay continuous logarithmic golden spiral
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      const spiralSpan = prog + 0.08 * Math.sin(time * 2.0) * spanEase(time, 3.5, 5.0);
      for (let i = 0; i <= 160; i++) {
        const u = (i / 160) * Math.PI * 3.1 * spiralSpan;
        const r = 0.25 * Math.exp(0.30635 * u);
        const p = toPx(0.4 + r * Math.cos(u), -0.4 + r * Math.sin(u));
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(270 * scale), scale, [
        { text: 'FIBONACCI SQUARES & GOLDEN SPIRAL', color: pal.amber, gap: 34 * scale },
        { text: `Golden Ratio φ = (1 + √5)/2 ≈ 1.618034`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `F_{n+1} / F_n → φ Alternating Convergence`, color: pal.indigo, gap: 34 * scale },
        { text: `Squares: 1×1, 1×1, 2×2, 3×3, 5×5`, color: pal.teal, gap: 34 * scale },
        { text: `Characteristic Root λ² − λ − 1 = 0`, color: pal.amber, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Golden φ', val: '1.61803' },
          { key: 'Conjugate ψ', val: '-0.61803' },
          { key: 'F₈ / F₇', val: (21 / 13).toFixed(5) },
          { key: 'Growth', val: 'O(φⁿ)' },
        ],
        tableHeaders: ['Index n', 'Fₙ', 'Fₙ₊₁ / Fₙ', 'Error |Ratio − φ|'],
        tableRows: [
          ['n = 4', '3', (5 / 3).toFixed(5), Math.abs(5 / 3 - 1.618034).toFixed(5)],
          ['n = 5', '5', (8 / 5).toFixed(5), Math.abs(8 / 5 - 1.618034).toFixed(5)],
          ['n = 6', '8', (13 / 8).toFixed(5), Math.abs(13 / 8 - 1.618034).toFixed(5)],
          ['n = 7', '13', (21 / 13).toFixed(5), Math.abs(21 / 13 - 1.618034).toFixed(5)],
        ],
      };
    }

    // 4. Pascal's Triangle Modulo-2 Sierpinski Gasket (#088)
    if (sub === 'pascal') {
      const rowsN = Math.max(8, Math.min(16, Math.round(Number(params.rowsN ?? 15))));
      const plot = this.createPlotArea(ctx, pal, bounds, -rowsN, rowsN, 0, rowsN + 1, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH } = plot;

      let oddCount = 0;
      let totalCount = 0;
      const visRows = Math.max(3, Math.min(rowsN, Math.ceil(rowsN * spanEase(time, 0.15, 2.8))));
      ctx.save();
      for (let r = 0; r < visRows; r++) {
        const rowPulse = 1 + 0.12 * Math.sin(time * 2.4 - r * 0.35);
        for (let k = 0; k <= r; k++) {
          totalCount++;
          const isOdd = (k & (r - k)) === 0;
          if (isOdd) oddCount++;
          const cx = (k - r * 0.5) * 1.65;
          const cy = rowsN - r;
          const p = toPx(cx, cy);
          const sz = Math.max(4, Math.min(15, (130 / rowsN) * scale * (isOdd ? rowPulse : 1)));
          ctx.fillStyle = isOdd ? pal.amber : pal.indigoFill;
          ctx.strokeStyle = isOdd ? pal.amber : pal.gridMajor;
          ctx.lineWidth = 1.4 * scale;
          ctx.fillRect(p.x - sz * 0.5, p.y - sz * 0.5, sz, sz);
          ctx.strokeRect(p.x - sz * 0.5, p.y - sz * 0.5, sz, sz);
        }
      }
      ctx.restore();

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(270 * scale), scale, [
        { text: "PASCAL'S TRIANGLE MOD 2 (SIERPINSKI)", color: pal.amber, gap: 34 * scale },
        { text: `Rows N = ${rowsN}, Odd Entries = ${oddCount}/${totalCount}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Lucas Theorem: C(n,k) Odd iff (k & (n-k)) = 0`, color: pal.indigo, gap: 34 * scale },
        { text: `Amber Cells: C(n,k) ≡ 1 (mod 2)`, color: pal.amber, gap: 34 * scale },
        { text: `Hausdorff Dimension log(3)/log(2) ≈ 1.585`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Rows N', val: `${rowsN}` },
          { key: 'Odd Cells', val: `${oddCount}` },
          { key: 'Total Cells', val: `${totalCount}` },
          { key: 'Fractal Dim', val: '1.585' },
        ],
        tableHeaders: ['Row n', 'Row Sum 2ⁿ', 'Odd Count 2^{pop(n)}', 'Even Count'],
        tableRows: [0, 1, 3, 7, 15].map((n) => [`Row ${n}`, `${Math.pow(2, n)}`, `${n + 1}`, '0 (All Odd Row)']),
      };
    }

    // 5. Birthday Paradox Collision Curve (#087) & 6. Collatz Hailstone (#086)
    const yMax = sub === 'birthday' ? 105 : 56;
    const plot = this.createPlotArea(ctx, pal, bounds, 0, 42, 0, yMax, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH } = plot;
    const seed = Math.max(3, Math.round(Number(params.seedN ?? params.peopleK ?? 23)));

    if (sub === 'birthday') {
      ctx.save();
      // 50% threshold dashed line
      const p50L = toPx(0, 50);
      const p50R = toPx(42, 50);
      ctx.strokeStyle = pal.amber;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.lineWidth = 2.4 * scale;
      ctx.beginPath();
      ctx.moveTo(p50L.x, p50L.y);
      ctx.lineTo(p50R.x, p50R.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Probability curve P(k) = 100 * (1 - exp(-k(k-1)/730))
      const maxK = Math.max(6, Math.round(42 * spanEase(time, 0.15, 2.2)));
      ctx.fillStyle = pal.tealFill;
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      ctx.moveTo(toPx(0, 0).x, toPx(0, 0).y);
      for (let k = 0; k <= maxK; k++) {
        const prob = 100 * (1 - Math.exp(-(k * (k - 1)) / 730));
        const p = toPx(k, prob);
        ctx.lineTo(p.x, p.y);
      }
      ctx.lineTo(toPx(maxK, 0).x, toPx(maxK, 0).y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      const kMark = Math.min(41, seed);
      const kLive = Math.max(2, Math.min(41, kMark * spanEase(time, 0.25, 2.8) + 1.5 * Math.sin(time * 2.1) * spanEase(time, 2.5, 4.8)));
      const pMarkVal = 100 * (1 - Math.exp(-(kMark * (kMark - 1)) / 730));
      const pLiveVal = 100 * (1 - Math.exp(-(kLive * (kLive - 1)) / 730));
      const pPin = toPx(kLive, pLiveVal);
      const pPinBase = toPx(kLive, 0);
      this.drawArrow(ctx, pPinBase.x, pPinBase.y, pPin.x, pPin.y, pal.amber, 2.2 * scale);
      this.drawDot(ctx, pPin.x, pPin.y, 8.5 * scale, pal.amber, pal.bg);

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(270 * scale), scale, [
        { text: 'BIRTHDAY PARADOX COLLISION PROBABILITY', color: pal.amber, gap: 34 * scale },
        { text: `Group Size k = ${kMark} → P(Match) = ${pMarkVal.toFixed(1)}%`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Pairs C(k, 2) = k(k−1)/2 = ${(kMark * (kMark - 1)) / 2}`, color: pal.indigo, gap: 34 * scale },
        { text: `50% Threshold Crossed at k = 23 People`, color: pal.amber, gap: 34 * scale },
        { text: `P(Match) ≈ 1 − exp(−k² / 730)`, color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'People k', val: `${kMark}` },
          { key: 'Pairs C(k,2)', val: `${(kMark * (kMark - 1)) / 2}` },
          { key: 'P(Collision)', val: `${pMarkVal.toFixed(1)}%` },
          { key: '50% Cutoff', val: 'k = 23' },
        ],
        tableHeaders: ['People k', 'Pairs C(k,2)', 'P(Unique)', 'P(Collision)'],
        tableRows: [10, 23, 30, 40].map((k) => {
          const pu = Math.exp(-(k * (k - 1)) / 730);
          return [`k = ${k}`, `${(k * (k - 1)) / 2}`, `${(pu * 100).toFixed(1)}%`, `${((1 - pu) * 100).toFixed(1)}%`];
        }),
      };
    }

    // Collatz 3n + 1 Hailstone Sequence (#086)
    const seq = [seed];
    let curr = seed;
    for (let i = 0; i < 38; i++) {
      curr = curr === 1 ? 1 : curr % 2 === 0 ? curr / 2 : Math.min(54, 3 * curr + 1);
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
      this.drawDot(ctx, p.x, p.y, 6 * scale, seq[i] % 2 === 0 ? pal.teal : pal.amber, pal.bg);
    }

    const peakVal = Math.max(...seq);
    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(270 * scale), scale, [
      { text: 'COLLATZ 3n+1 HAILSTONE TRAJECTORY', color: pal.amber, gap: 34 * scale },
      { text: `Seed n₀ = ${seed}, Peak Altitude = ${peakVal}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
      { text: `Amber Dots: Odd (3n+1) | Teal: Even (n/2)`, color: pal.amber, gap: 34 * scale },
      { text: `Current Term aₙ = ${seq[visCount - 1]}`, color: pal.teal, gap: 34 * scale },
      { text: `Terminates in 4 → 2 → 1 Cycle`, color: pal.indigo, gap: 32 * scale },
    ], pal.panelBorder);

    return {
      readouts: [
        { key: 'Seed n₀', val: `${seed}` },
        { key: 'Peak Max', val: `${peakVal}` },
        { key: 'Current aₙ', val: `${seq[visCount - 1]}` },
        { key: 'Steps', val: `${visCount}` },
      ],
      tableHeaders: ['Step k', 'Term aₖ', 'Next aₖ₊₁', 'Rule Applied'],
      tableRows: seq.slice(0, 6).map((v, idx) => [
        `k = ${idx}`,
        `${v}`,
        `${seq[idx + 1] ?? v}`,
        v % 2 === 0 ? 'Even: n / 2' : 'Odd: 3n + 1',
      ]),
    };
  };

  /* ------------------------------------------------------------------------
   * 11. PHYSICS, RELATIVITY & WAVE MECHANICS ENGINE (3 Distinct Visuals)
   * ------------------------------------------------------------------------ */
  proto.drawPhysicsScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const { scale, padX, plotW } = bounds;
    const prog = Math.max(0.2, spanEase(time, 0.2, duration * 0.85));

    // 1. Doppler Wavefronts & Supersonic Mach Shock Cone (#090)
    if (sub === 'doppler_mach') {
      const plot = this.createPlotArea(ctx, pal, bounds, -2.8, 2.8, -2.2, 2.2, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
      const machM = Number(params.machM ?? 1.35);
      const cWave = 0.55;
      const vSrc = machM * cWave;
      const tMax = 2.8;
      const xHead = -1.6 + vSrc * tMax;
      const pHead = toPx(xHead, 0);

      ctx.save();
      // Emit 8 historical expanding circular acoustic wavefronts
      for (let k = 1; k <= 8; k++) {
        const dtEmit = (k / 8) * tMax;
        const xEmit = xHead - vSrc * dtEmit;
        const rad = cWave * dtEmit;
        const pC = toPx(xEmit, 0);
        const pEdge = toPx(xEmit + rad, 0);
        ctx.strokeStyle = pal.indigo;
        ctx.globalAlpha = 0.65;
        ctx.lineWidth = 2.2 * scale;
        ctx.beginPath();
        ctx.arc(pC.x, pC.y, Math.abs(pEdge.x - pC.x), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // If supersonic (Mach >= 1), draw the V-shaped Mach Shock Cone envelope!
      if (machM >= 1.0) {
        const sinMu = 1 / machM;
        const tanMu = sinMu / Math.sqrt(Math.max(0.01, 1 - sinMu * sinMu));
        const dxBack = 3.6;
        const pTop = toPx(xHead - dxBack, dxBack * tanMu);
        const pBot = toPx(xHead - dxBack, -dxBack * tanMu);
        ctx.strokeStyle = pal.amber;
        ctx.lineWidth = 3.8 * scale;
        ctx.beginPath();
        ctx.moveTo(pTop.x, pTop.y);
        ctx.lineTo(pHead.x, pHead.y);
        ctx.lineTo(pBot.x, pBot.y);
        ctx.stroke();
      }
      ctx.restore();
      this.drawDot(ctx, pHead.x, pHead.y, 8.5 * scale, pal.teal, pal.bg);

      const machAngle = machM >= 1 ? ((Math.asin(1 / machM) * 180) / Math.PI).toFixed(1) + '°' : 'Subsonic (No Cone)';
      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(270 * scale), scale, [
        { text: 'DOPPLER WAVEFRONTS & MACH SHOCK CONE', color: pal.amber, gap: 34 * scale },
        { text: `Mach Number M = v_s / c = ${machM.toFixed(2)}`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Mach Cone Half-Angle μ = ${machAngle}`, color: pal.amber, gap: 34 * scale },
        { text: `sin(μ) = c / v_s = 1 / M`, color: pal.indigo, gap: 34 * scale },
        { text: machM >= 1 ? 'Supersonic Caustic Shock Envelope' : 'Subsonic Doppler Frequency Shift', color: pal.teal, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'Mach M', val: machM.toFixed(2) },
          { key: 'Cone μ', val: machAngle },
          { key: 'sin(μ)=1/M', val: machM >= 1 ? (1 / machM).toFixed(3) : 'N/A' },
          { key: 'Regime', val: machM >= 1 ? 'Supersonic' : 'Subsonic' },
        ],
        tableHeaders: ['Mach M', 'Regime', 'sin(μ) = 1/M', 'Shock Half-Angle μ'],
        tableRows: [
          ['M = 0.70', 'Subsonic', 'None', 'Compressed Fronts'],
          ['M = 1.00', 'Sonic Barrier', '1.000', 'μ = 90.0° Normal Wall'],
          ['M = 1.40', 'Supersonic', '0.714', 'μ = 45.6° Mach Cone'],
          ['M = 2.00', 'Hypersonic', '0.500', 'μ = 30.0° Narrow Cone'],
        ],
      };
    }

    // 2. Minkowski Spacetime Diagram & Lorentz Boost (#091)
    if (sub === 'minkowski') {
      const plot = this.createPlotArea(ctx, pal, bounds, -2.5, 2.5, -2.5, 2.5, spanEase(time, 0, 0.5), 0.60);
      const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
      const beta = Math.max(-0.85, Math.min(0.85, Number(params.betaV ?? 0.52)));
      const gamma = 1 / Math.sqrt(1 - beta * beta);

      ctx.save();
      // 1. 45° Invariant Light Cone (ct = ±x) in dashed amber
      [1, -1].forEach((sgn) => {
        const p1 = toPx(-2.4, -2.4 * sgn);
        const p2 = toPx(2.4, 2.4 * sgn);
        ctx.strokeStyle = pal.amber;
        ctx.setLineDash([6 * scale, 4 * scale]);
        ctx.lineWidth = 2.6 * scale;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // 2. Scissoring Lorentz-boosted axes: ct' axis (x = beta*ct) and x' simultaneity axis (ct = beta*x)
      const pCtPrime1 = toPx(-2.3 * beta, -2.3);
      const pCtPrime2 = toPx(2.3 * beta, 2.3);
      const pXPrime1 = toPx(-2.3, -2.3 * beta);
      const pXPrime2 = toPx(2.3, 2.3 * beta);
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 3.4 * scale;
      ctx.beginPath();
      ctx.moveTo(pCtPrime1.x, pCtPrime1.y);
      ctx.lineTo(pCtPrime2.x, pCtPrime2.y);
      ctx.moveTo(pXPrime1.x, pXPrime1.y);
      ctx.lineTo(pXPrime2.x, pXPrime2.y);
      ctx.stroke();

      // 3. Invariant Calibration Hyperbola c²t² - x² = 1
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 3.6 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const x = -2.1 + (4.2 * i) / 120;
        const ct = Math.sqrt(1 + x * x);
        const p = toPx(x, ct);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();

      // Unit proper-time tick on boosted worldline (x = gamma*beta, ct = gamma)
      const pTick = toPx(gamma * beta, gamma);
      this.drawDot(ctx, pTick.x, pTick.y, 8.5 * scale, pal.amber, pal.bg);

      const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
      const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
      const cardW = isTall ? plotW : padX + plotW - cardX;
      this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(270 * scale), scale, [
        { text: 'MINKOWSKI SPACETIME & LORENTZ BOOST', color: pal.amber, gap: 34 * scale },
        { text: `Velocity β = v/c = ${beta.toFixed(2)}, γ = ${gamma.toFixed(3)}`, font: `600 ${Math.round(23 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
        { text: `Boosted Axes (x', ct') Scissor by tan⁻¹(β)`, color: pal.teal, gap: 34 * scale },
        { text: `Amber Dashed: 45° Light Cone (ds² = 0)`, color: pal.amber, gap: 34 * scale },
        { text: `Indigo Hyperbola: Proper Time c²t² − x² = 1`, color: pal.indigo, gap: 32 * scale },
      ], pal.panelBorder);

      return {
        readouts: [
          { key: 'β = v/c', val: beta.toFixed(2) },
          { key: 'Lorentz γ', val: gamma.toFixed(3) },
          { key: 'Axis Tilt', val: `${((Math.atan(beta) * 180) / Math.PI).toFixed(1)}°` },
          { key: 'Invariant', val: 'c²t²−x²=s²' },
        ],
        tableHeaders: ['Speed β = v/c', 'Lorentz Factor γ', 'Time Dilation', 'Length Contraction'],
        tableRows: [0.0, 0.5, 0.8, 0.95].map((b) => {
          const g = 1 / Math.sqrt(1 - b * b);
          return [b.toFixed(2), g.toFixed(3), `${g.toFixed(2)}× slower`, `${(1 / g).toFixed(2)}× shorter`];
        }),
      };
    }

    // 3. Projectile Motion with Air Drag vs Vacuum Parabola (#089)
    const plot = this.createPlotArea(ctx, pal, bounds, 0, 4.2, -1.6, 2.6, spanEase(time, 0, 0.6), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const launchDeg = Number(params.launchDeg ?? 45);
    const th = (launchDeg * Math.PI) / 180;
    const dragC = Number(params.dragC ?? 0.18);
    const v0 = 6.2;
    const g = 9.8;

    const vacFn = (x) => Math.max(-1.2, x * Math.tan(th) - (g * x * x) / (2 * v0 * v0 * Math.cos(th) * Math.cos(th)));
    const dragFn = (x) => Math.max(-1.2, vacFn(x) - dragC * 0.28 * Math.pow(x, 2.4));

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
    this.drawCalloutCard(ctx, pal, cardX, cardY, cardW, Math.round(270 * scale), scale, [
      { text: 'BALLISTIC TRAJECTORY: VACUUM VS. DRAG', color: pal.amber, gap: 34 * scale },
      { text: `Launch Angle θ₀ = ${launchDeg}°`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
      { text: `Vacuum Range R = ${rangeVac.toFixed(3)} m (Indigo)`, color: pal.indigo, gap: 34 * scale },
      { text: `Apex Height H  = ${apexVac.toFixed(3)} m`, color: pal.teal, gap: 34 * scale },
      { text: `Drag Coefficient γ = ${dragC.toFixed(2)} (Amber)`, color: pal.amber, gap: 32 * scale },
    ], pal.panelBorder);

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
    const isTall = bounds.height >= bounds.width * 0.95;
    const isSquare = isTall && bounds.height < bounds.width * 1.15;

    if (sub === 'qudrat_clock' || sub === 'qudrat_geometry') {
      const cx = padX + Math.round(plotW * (isTall ? 0.5 : 0.28));
      const cy = plotTop + Math.round(plotH * (isTall ? (isSquare ? 0.30 : 0.34) : 0.5));
      const radius = Math.min(plotW, plotH) * (isTall ? (isSquare ? 0.24 : 0.27) : 0.36);
      this.lastPlotMapper = { unitCircle: { cx, cy, radius } };

      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 4 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      if (sub === 'qudrat_clock') {
        const H = Number(params.hourH ?? 3);
        const baseM = Number(params.minM ?? 30);
        const M = baseM + 5.0 * Math.sin(time * 1.65) * spanEase(time, 0.25, 1.5);
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
        const cardY = isTall ? plotTop + Math.round(plotH * (isSquare ? 0.58 : 0.64)) : plotTop + Math.round(plotH * 0.14);
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
            { text: `Time ${H}:${String(Math.round(baseM)).padStart(2, '0')} → Δθ = ${acute.toFixed(1)}°`, font: `600 ${Math.round(24 * scale)}px "Newsreader", serif`, color: pal.ink, gap: 36 * scale },
            { text: `Hour Hand = 30H + 0.5M = ${hourDeg.toFixed(1)}°`, color: pal.amber, gap: 34 * scale },
            { text: `Minute Hand = 6M       = ${minDeg.toFixed(1)}°`, color: pal.teal, gap: 34 * scale },
            { text: `Formula |30H − 5.5M|   = ${diff.toFixed(1)}°`, color: pal.indigo, gap: 32 * scale },
          ],
          pal.panelBorder
        );

        return {
          readouts: [
            { key: 'Clock Time', val: `${H}:${String(Math.round(baseM)).padStart(2, '0')}` },
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
      const cardY = isTall ? plotTop + Math.round(plotH * (isSquare ? 0.58 : 0.64)) : plotTop + Math.round(plotH * 0.14);
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

  /* ------------------------------------------------------------------------
   * 13. COMPASS & STRAIGHTEDGE GEOMETRICAL CONSTRUCTIONS ENGINE (15 Scenes)
   * ------------------------------------------------------------------------ */
  proto.drawConstructionScene = function (sub, ctx, pal, bounds, params, time, duration) {
    const plot = this.createPlotArea(ctx, pal, bounds, -3.2, 3.2, -2.5, 2.5, spanEase(time, 0, 0.5), 0.60, true);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;
    const v = params || {};

    // 4 progressive construction beats
    const b1 = spanEase(time, 0.05, 1.3);
    const b2 = spanEase(time, 1.2, 2.7);
    const b3 = spanEase(time, 2.5, 4.1);
    const b4 = spanEase(time, 3.8, 5.4);

    // Euclidean compass arc in math coordinates (with visual hinged compass calliper & scribing nib)
    const drawCompassArc = (cx, cy, r, a0, a1, color, width = 2.6, dashed = true, prog = 1, showArm = false) => {
      const p = clamp01(prog);
      if (p <= 0.01 || r <= 0) return;
      const steps = 72;
      const aEnd = a0 + (a1 - a0) * p;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width * scale;
      if (dashed) ctx.setLineDash([7 * scale, 5 * scale]);
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const a = a0 + ((aEnd - a0) * i) / steps;
        const pt = toPx(cx + r * Math.cos(a), cy + r * Math.sin(a));
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      if (showArm && p < 0.99) {
        const pc = toPx(cx, cy);
        const pTip = toPx(cx + r * Math.cos(aEnd), cy + r * Math.sin(aEnd));
        ctx.setLineDash([3 * scale, 3 * scale]);
        ctx.lineWidth = 1.6 * scale;
        ctx.beginPath();
        ctx.moveTo(pc.x, pc.y);
        ctx.lineTo(pTip.x, pTip.y);
        ctx.stroke();

        // Hinged Euclidean Compass Legs & Crown Pivot
        const mx = 0.5 * (pc.x + pTip.x);
        const my = 0.5 * (pc.y + pTip.y);
        const dx = pTip.x - pc.x;
        const dy = pTip.y - pc.y;
        const dLen = Math.hypot(dx, dy) || 1;
        const nx = -dy / dLen;
        const ny = dx / dLen;
        const lift = Math.min(48 * scale, dLen * 0.42);
        const hingeX = mx + nx * lift * (ny < 0 ? 1 : -1);
        const hingeY = my + ny * lift * (ny < 0 ? 1 : -1);

        ctx.setLineDash([]);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.72;
        ctx.lineWidth = 2.0 * scale;
        ctx.beginPath();
        ctx.moveTo(pc.x, pc.y);
        ctx.lineTo(hingeX, hingeY);
        ctx.lineTo(pTip.x, pTip.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(hingeX, hingeY, 3.8 * scale, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(pTip.x, pTip.y, 4.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.restore();
    };

    const drawSeg = (x0, y0, x1, y1, color, width = 3.2, dashed = false, prog = 1) => {
      const p = clamp01(prog);
      if (p <= 0.01) return;
      const p0 = toPx(x0, y0);
      const p1 = toPx(x0 + (x1 - x0) * p, y0 + (y1 - y0) * p);
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width * scale;
      if (dashed) ctx.setLineDash([7 * scale, 5 * scale]);
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
      if (p > 0.02 && p < 0.98) {
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 4.2 * scale, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.restore();
    };

    const drawPt = (x, y, label, color, dx = 10, dy = -10, isCross = false) => {
      const p = toPx(x, y);
      if (isCross) {
        const s = 6.5 * scale;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.4 * scale;
        ctx.beginPath();
        ctx.moveTo(p.x - s, p.y - s);
        ctx.lineTo(p.x + s, p.y + s);
        ctx.moveTo(p.x - s, p.y + s);
        ctx.lineTo(p.x + s, p.y - s);
        ctx.stroke();
        ctx.restore();
      } else {
        this.drawDot(ctx, p.x, p.y, 6.8 * scale, color, pal.bg);
      }
      if (label) {
        ctx.save();
        ctx.font = `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`;
        ctx.fillStyle = color;
        ctx.fillText(label, p.x + dx * scale, p.y + dy * scale);
        ctx.restore();
      }
    };

    const drawRightBox = (vx, vy, ux, uy, nx, ny, sz = 0.22, color = pal.teal) => {
      const p0 = toPx(vx + ux * sz, vy + uy * sz);
      const p1 = toPx(vx + (ux + nx) * sz, vy + (uy + ny) * sz);
      const p2 = toPx(vx + nx * sz, vy + ny * sz);
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    };

    let readouts = [];
    let tableHeaders = ['Construction Step', 'Compass / Straightedge', 'Key Metric', 'Geometric Property'];
    let tableRows = [];
    let cardLines = [];

    // ── #151: Perpendicular Bisector & Equidistant Locus (Euclid I.10) ──
    if (sub === 'const_perp_bisector') {
      const a = Number(params.halfLen ?? 1.45);
      const ratio = Number(params.radiusRatio ?? 1.35);
      const R = a * ratio;
      const h = Math.sqrt(Math.max(0.04, R * R - a * a));

      // Step 1: Given segment AB
      drawSeg(-a, 0, a, 0, pal.indigo, 4.2, false, b1);
      drawPt(-a, 0, 'A', pal.indigo, -18, 18);
      drawPt(a, 0, 'B', pal.indigo, 10, 18);

      // Step 2 & 3: Equal compass arcs of radius R centered at A and B
      drawCompassArc(-a, 0, R, -1.25, 1.25, pal.amber, 2.8, true, Math.max(0.25, b2), true);
      drawCompassArc(a, 0, R, Math.PI - 1.25, Math.PI + 1.25, pal.amber, 2.8, true, Math.max(0.25, b3), true);

      // Rhombus radii AP, BP, AQ, BQ
      drawSeg(-a, 0, 0, h, pal.amber, 1.8, true, b3);
      drawSeg(a, 0, 0, h, pal.amber, 1.8, true, b3);
      drawSeg(-a, 0, 0, -h, pal.amber, 1.8, true, b3);
      drawSeg(a, 0, 0, -h, pal.amber, 1.8, true, b3);

      // Step 4: Straightedge perpendicular bisector line PQ
      drawSeg(0, -2.15, 0, 2.15, pal.teal, 4.0, false, Math.max(0.2, b4));
      drawRightBox(0, 0, 1, 0, 0, 1, 0.22, pal.teal);
      drawPt(0, h, 'P', pal.amber, 10, -8, true);
      drawPt(0, -h, 'Q', pal.amber, 10, 16, true);
      drawPt(0, 0, 'M', pal.teal, 10, 18);

      readouts = [
        { key: 'Length |AB|', val: (2 * a).toFixed(2) },
        { key: 'Compass Radius R', val: R.toFixed(2) },
        { key: 'Lens Half-Chord h', val: h.toFixed(3) },
        { key: 'Midpoint Angle', val: '90.0° (PQ ⊥ AB)' },
      ];
      tableRows = [
        ['1 · Given Segment AB', 'Straightedge AB', `|AB| = ${(2 * a).toFixed(2)}`, 'Endpoints A(−a,0), B(+a,0)'],
        ['2 · Arc from Center A', `Compass R = ${R.toFixed(2)}`, 'R > ½|AB|', 'Circle (A, R) Locus'],
        ['3 · Arc from Center B', `Compass R = ${R.toFixed(2)}`, `P(0, +${h.toFixed(2)}), Q(0, −${h.toFixed(2)})`, '|PA| = |PB| = |QA| = |QB|'],
        ['4 · Join P and Q', 'Straightedge PQ', 'Midpoint M(0, 0)', 'PQ ⊥ AB & |AM| = |MB|'],
      ];
      cardLines = [
        { text: 'EUCLID I.10 · PERPENDICULAR BISECTOR', color: pal.amber },
        { text: `Segment |AB| = ${(2 * a).toFixed(2)},  Compass R = ${R.toFixed(2)}`, color: pal.ink },
        { text: `Lens Intersections: y = ±√(R² − a²) = ±${h.toFixed(3)}`, color: pal.teal },
        { text: `Rhombus APBQ ⇒ Diagonals PQ ⊥ AB at M(0,0)`, color: pal.indigo },
      ];
    }
    // ── #152: Angle Bisector Compass Construction (Euclid I.9) ──
    else if (sub === 'const_angle_bisector') {
      const angDeg = Number(params.angleDeg ?? 68);
      const angRad = (angDeg * Math.PI) / 180;
      const r1 = Number(params.arcR ?? 1.65);
      const vx = -2.1;
      const vy = -1.25;

      // Step 1: Vertex O and rays OA (along 0°) and OB (along angRad)
      drawSeg(vx, vy, vx + 4.3, vy, pal.indigo, 4.0, false, b1);
      drawSeg(vx, vy, vx + 4.0 * Math.cos(angRad), vy + 4.0 * Math.sin(angRad), pal.indigo, 4.0, false, b1);
      drawPt(vx, vy, 'O', pal.indigo, -18, 16);

      // Step 2: Primary arc of radius r1 centered at O cutting OA at D and OB at E
      const dx = vx + r1;
      const dy = vy;
      const ex = vx + r1 * Math.cos(angRad);
      const ey = vy + r1 * Math.sin(angRad);
      drawCompassArc(vx, vy, r1, -0.08, angRad + 0.08, pal.amber, 2.8, true, Math.max(0.25, b2), true);
      drawPt(dx, dy, 'D', pal.amber, 6, 18);
      drawPt(ex, ey, 'E', pal.amber, -18, -8);

      // Step 3: Secondary equal arcs of radius r2 = 0.85*r1 from D and E meeting at F
      const r2 = 0.85 * r1;
      const halfA = angRad / 2;
      const dChordHalf = r1 * Math.sin(halfA);
      const ofDist = r1 * Math.cos(halfA) + Math.sqrt(Math.max(0.04, r2 * r2 - dChordHalf * dChordHalf));
      const fx = vx + ofDist * Math.cos(halfA);
      const fy = vy + ofDist * Math.sin(halfA);
      drawCompassArc(dx, dy, r2, halfA - 0.35, halfA + 0.85, pal.amber, 2.5, true, Math.max(0.25, b3));
      drawCompassArc(ex, ey, r2, halfA - 0.85, halfA + 0.35, pal.amber, 2.5, true, Math.max(0.25, b3));
      drawPt(fx, fy, 'F', pal.amber, 10, -8, true);

      // Step 4: Bisector ray OF and equidistant perpendicular drops to OA and OB
      drawSeg(vx, vy, vx + 4.2 * Math.cos(halfA), vy + 4.2 * Math.sin(halfA), pal.teal, 4.0, false, Math.max(0.2, b4));
      drawSeg(fx, fy, fx, vy, pal.teal, 2.0, true, b4);
      const projDist = ofDist * Math.cos(halfA);
      drawSeg(fx, fy, vx + projDist * Math.cos(angRad), vy + projDist * Math.sin(angRad), pal.teal, 2.0, true, b4);
      const perpDist = ofDist * Math.sin(halfA);

      readouts = [
        { key: 'Given Angle ∠AOB', val: `${angDeg.toFixed(1)}°` },
        { key: 'Bisected ½∠AOB', val: `${(angDeg / 2).toFixed(1)}°` },
        { key: 'Compass Radius r₁', val: r1.toFixed(2) },
        { key: 'Equidistance d_⊥', val: perpDist.toFixed(3) },
      ];
      tableRows = [
        ['1 · Given Angle ∠AOB', `Rays OA, OB (${angDeg}°)`, 'Vertex O', 'Two Intersecting Rays'],
        ['2 · Primary Arc at O', `Compass r₁ = ${r1.toFixed(2)}`, '|OD| = |OE| = r₁', 'Equidistant Marks D, E'],
        ['3 · Equal Arcs at D, E', `Compass r₂ = ${r2.toFixed(2)}`, '|DF| = |EF| = r₂', 'Intersection Point F'],
        ['4 · Draw Ray OF', 'Straightedge OF', `∠AOF = ∠FOB = ${(angDeg / 2).toFixed(1)}°`, `SSS: △ODF ≅ △OEF (d_⊥=${perpDist.toFixed(2)})`],
      ];
      cardLines = [
        { text: 'EUCLID I.9 · COMPASS ANGLE BISECTOR', color: pal.amber },
        { text: `∠AOB = ${angDeg.toFixed(1)}°  →  Bisected into ${(angDeg / 2).toFixed(1)}° + ${(angDeg / 2).toFixed(1)}°`, color: pal.ink },
        { text: `SSS Congruence: |OD| = |OE| = ${r1.toFixed(2)}, |DF| = |EF| = ${r2.toFixed(2)}`, color: pal.teal },
        { text: `Locus Equidistance to Both Rays = ${perpDist.toFixed(3)}`, color: pal.indigo },
      ];
    }
    // ── #153: Vesica Piscis, Equilateral Triangle & Exact 60° / 30° (Euclid I.1) ──
    else if (sub === 'const_equilateral_60') {
      const s = Number(params.sideLen ?? 1.85);
      const showBis = Number(params.showBisect ?? 1);
      const ax = -0.5 * s;
      const bx = 0.5 * s;
      const ay = -0.85;
      const h = (Math.sqrt(3) / 2) * s;
      const cy = ay + h;

      // Base AB and two full Vesica Piscis circles of radius s
      drawSeg(ax, ay, bx, ay, pal.indigo, 4.2, false, b1);
      drawCompassArc(ax, ay, s, -Math.PI * 0.35, Math.PI * 0.75, pal.amber, 2.6, true, Math.max(0.25, b2));
      drawCompassArc(bx, ay, s, Math.PI * 0.25, Math.PI * 1.35, pal.amber, 2.6, true, Math.max(0.25, b2));

      // Equilateral triangle sides AC and BC (60°)
      drawSeg(ax, ay, 0, cy, pal.teal, 4.0, false, Math.max(0.2, b3));
      drawSeg(bx, ay, 0, cy, pal.teal, 4.0, false, Math.max(0.2, b3));
      drawPt(ax, ay, 'A (60°)', pal.indigo, -24, 20);
      drawPt(bx, ay, 'B (60°)', pal.indigo, 8, 20);
      drawPt(0, cy, 'C (60°)', pal.amber, -18, -12, true);

      // Optional 30° bisector from A through midpoint M_BC of BC
      if (showBis > 0.2) {
        const mx = 0.5 * bx;
        const my = 0.5 * (ay + cy);
        drawSeg(ax, ay, ax + 1.35 * (mx - ax), ay + 1.35 * (my - ay), pal.amber, 3.2, false, Math.max(0.2, b4) * showBis);
        drawPt(mx, my, '30° Ray', pal.amber, 10, -6);
      }

      const areaTri = (Math.sqrt(3) / 4) * s * s;
      readouts = [
        { key: 'Side Length s', val: s.toFixed(2) },
        { key: 'Altitude (√3/2)s', val: h.toFixed(3) },
        { key: 'Interior Angles', val: '60° / 30° Bisected' },
        { key: 'Area (√3/4)s²', val: areaTri.toFixed(3) },
      ];
      tableRows = [
        ['1 · Base Segment AB', `Length s = ${s.toFixed(2)}`, 'Centers A and B', 'Initial Distance s'],
        ['2 · Circle Centered at A', `Radius R = ${s.toFixed(2)}`, '|AC| = s', 'Passes Through B'],
        ['3 · Circle Centered at B', `Radius R = ${s.toFixed(2)}`, '|BC| = s', 'Intersects at Apex C'],
        ['4 · △ABC & Bisection', 'Straightedge AC, BC', `h = ${h.toFixed(3)}`, 'Exact 60° & 30° Angles'],
      ];
      cardLines = [
        { text: "EUCLID I.1 · VESICA PISCIS & 60° / 30°", color: pal.amber },
        { text: `|AB| = |BC| = |CA| = s = ${s.toFixed(2)}`, color: pal.ink },
        { text: `Exact Altitude h = (√3/2)s = ${h.toFixed(3)}`, color: pal.teal },
        { text: `Equilateral Area = (√3/4)s² = ${areaTri.toFixed(3)}`, color: pal.indigo },
      ];
    }
    // ── #154: Dropping a Perpendicular from an External Point P (Euclid I.12) ──
    else if (sub === 'const_drop_perp_point') {
      const px = Number(params.px ?? 0.55);
      const py = Number(params.py ?? 1.65);
      const yLine = -0.35;
      const dy = py - yLine;
      const R = dy * 1.28;
      const halfChord = Math.sqrt(Math.max(0.05, R * R - dy * dy));
      const ax = px - halfChord;
      const bx = px + halfChord;
      const qy = yLine - dy * 0.95;
      const r2 = Math.hypot(halfChord, yLine - qy);

      // Step 1: Line l and external point P
      drawSeg(-2.9, yLine, 2.9, yLine, pal.indigo, 3.8, false, b1);
      drawPt(px, py, 'P', pal.amber, 10, -10);

      // Step 2: Arc centered at P cutting line l at A and B
      drawCompassArc(px, py, R, -Math.PI * 0.82, -Math.PI * 0.18, pal.amber, 2.8, true, Math.max(0.25, b2), true);
      drawPt(ax, yLine, 'A', pal.indigo, -16, -10);
      drawPt(bx, yLine, 'B', pal.indigo, 8, -10);

      // Step 3: Equal arcs from A and B meeting at Q below line l
      drawCompassArc(ax, yLine, r2, -1.35, -0.35, pal.amber, 2.5, true, Math.max(0.25, b3));
      drawCompassArc(bx, yLine, r2, -Math.PI + 0.35, -Math.PI + 1.35, pal.amber, 2.5, true, Math.max(0.25, b3));
      drawPt(px, qy, 'Q', pal.amber, 10, 16, true);

      // Step 4: Straightedge PQ perpendicular to line l at foot H(px, yLine)
      drawSeg(px, py, px, qy, pal.teal, 4.0, false, Math.max(0.2, b4));
      drawRightBox(px, yLine, 1, 0, 0, 1, 0.22, pal.teal);
      drawPt(px, yLine, 'H', pal.teal, 10, 18);

      readouts = [
        { key: 'Point P(x_P, y_P)', val: `(${px.toFixed(2)}, ${py.toFixed(2)})` },
        { key: 'Shortest Dist |PH|', val: dy.toFixed(3) },
        { key: 'Cut Chord |AB|', val: (2 * halfChord).toFixed(3) },
        { key: 'Foot H Angle', val: '90.0° (PH ⊥ ℓ)' },
      ];
      tableRows = [
        ['1 · External Point P', `P(${px.toFixed(2)}, ${py.toFixed(2)})`, `Line y = ${yLine.toFixed(2)}`, `Altitude |PH| = ${dy.toFixed(2)}`],
        ['2 · Swing Arc from P', `Radius R = ${R.toFixed(2)}`, `A(${ax.toFixed(2)}), B(${bx.toFixed(2)})`, '|PA| = |PB| = R'],
        ['3 · Arcs from A and B', `Radius r₂ = ${r2.toFixed(2)}`, `Apex Q(${px.toFixed(2)}, ${qy.toFixed(2)})`, '|QA| = |QB| = r₂'],
        ['4 · Draw Segment PQ', 'Straightedge PQ', `Foot H(${px.toFixed(2)}, ${yLine.toFixed(2)})`, 'PH ⊥ ℓ (Shortest Path)'],
      ];
      cardLines = [
        { text: 'EUCLID I.12 · DROP EXTERNAL PERPENDICULAR', color: pal.amber },
        { text: `External Point P(${px.toFixed(2)}, ${py.toFixed(2)})  →  Foot H(${px.toFixed(2)}, ${yLine.toFixed(2)})`, color: pal.ink },
        { text: `Cut Span |AB| = ${(2 * halfChord).toFixed(3)} via Radius R = ${R.toFixed(2)}`, color: pal.teal },
        { text: `Orthogonal Distance d_min(P, ℓ) = |PH| = ${dy.toFixed(3)}`, color: pal.indigo },
      ];
    }
    // ── #155: Erecting a 90° Perpendicular at a Point on a Line (Euclid I.11) ──
    else if (sub === 'const_erect_perp_on_line') {
      const r = Number(params.stepR ?? 1.15);
      const R = Math.max(r + 0.25, Number(params.outerR ?? 2.05));
      const y0 = -1.15;
      const h = Math.sqrt(Math.max(0.05, R * R - r * r));
      const qy = y0 + h;

      // Step 1: Line l and given point P(0, y0)
      drawSeg(-2.9, y0, 2.9, y0, pal.indigo, 3.8, false, b1);
      drawPt(0, y0, 'P', pal.indigo, -6, 22);

      // Step 2: Equal step ticks A(-r, y0) and B(+r, y0) via compass radius r centered at P
      drawCompassArc(0, y0, r, 0, Math.PI, pal.amber, 2.4, true, Math.max(0.25, b2));
      drawPt(-r, y0, 'A', pal.amber, -16, 22);
      drawPt(r, y0, 'B', pal.amber, 8, 22);

      // Step 3: Intersecting arcs of radius R from A and B meeting at Q(0, qy)
      const angQ = Math.atan2(h, r);
      drawCompassArc(-r, y0, R, angQ - 0.35, angQ + 0.35, pal.amber, 2.8, true, Math.max(0.25, b3), true);
      drawCompassArc(r, y0, R, Math.PI - angQ - 0.35, Math.PI - angQ + 0.35, pal.amber, 2.8, true, Math.max(0.25, b3), true);
      drawSeg(-r, y0, 0, qy, pal.amber, 1.8, true, b3);
      drawSeg(r, y0, 0, qy, pal.amber, 1.8, true, b3);
      drawPt(0, qy, 'Q', pal.amber, 10, -8, true);

      // Step 4: Erected perpendicular ray PQ
      drawSeg(0, y0, 0, qy + 0.35, pal.teal, 4.2, false, Math.max(0.2, b4));
      drawRightBox(0, y0, 1, 0, 0, 1, 0.24, pal.teal);

      readouts = [
        { key: 'Tick Radius r', val: r.toFixed(2) },
        { key: 'Apex Radius R', val: R.toFixed(2) },
        { key: 'Erected Height |PQ|', val: h.toFixed(3) },
        { key: 'Angle ∠QPB', val: '90.0° (Exact)' },
      ];
      tableRows = [
        ['1 · Point P on Line ℓ', 'Given Point P(0, y₀)', '|PA| = |PB| = r', 'Collinear Anchor'],
        ['2 · Step Off A and B', `Compass r = ${r.toFixed(2)}`, `A(−${r.toFixed(2)}), B(+${r.toFixed(2)})`, 'P is Midpoint of AB'],
        ['3 · Swing Radius R > r', `Compass R = ${R.toFixed(2)}`, '|QA| = |QB| = R', `Intersection Q(0, ${qy.toFixed(2)})`],
        ['4 · Erect Normal PQ', 'Straightedge PQ', `|PQ| = √(R²−r²) = ${h.toFixed(3)}`, '△QPA ≅ △QPB ⇒ 90°'],
      ];
      cardLines = [
        { text: 'EUCLID I.11 · ERECT 90° NORMAL AT POINT P', color: pal.amber },
        { text: `Equal Ticks |PA| = |PB| = ${r.toFixed(2)},  Outer Arcs R = ${R.toFixed(2)}`, color: pal.ink },
        { text: `Pythagorean Height |PQ| = √(R² − r²) = ${h.toFixed(3)}`, color: pal.teal },
        { text: `SSS Congruence △QPA ≅ △QPB ⇒ ∠QPA = ∠QPB = 90°`, color: pal.indigo },
      ];
    }
    // ── #156: Parallel Line Construction via Angle Copy (Euclid I.31) ──
    else if (sub === 'const_parallel_alt_angle') {
      const alphaDeg = Number(params.transDeg ?? 52);
      const alpha = (alphaDeg * Math.PI) / 180;
      const h = Number(params.sepH ?? 1.55);
      const yBot = -1.05;
      const yTop = yBot + h;
      const qx = -1.15;
      const px = qx + h / Math.tan(alpha);
      const rArc = 0.85;
      const chordC = 2 * rArc * Math.sin(alpha / 2);

      // Step 1: Base line l, external point P, and transversal line through Q and P
      drawSeg(-2.9, yBot, 2.9, yBot, pal.indigo, 3.8, false, b1);
      drawSeg(qx - 0.55 * Math.cos(alpha), yBot - 0.55 * Math.sin(alpha), px + 0.75 * Math.cos(alpha), yTop + 0.75 * Math.sin(alpha), pal.indigo, 3.0, false, b1);
      drawPt(qx, yBot, 'Q', pal.indigo, -18, 20);
      drawPt(px, yTop, 'P', pal.indigo, -18, -10);

      // Step 2: Equal reference arcs of radius rArc at Q and P
      drawCompassArc(qx, yBot, rArc, -0.05, alpha + 0.12, pal.amber, 2.6, true, Math.max(0.25, b2));
      drawCompassArc(px, yTop, rArc, -0.15, alpha + 0.12, pal.amber, 2.6, true, Math.max(0.25, b2));

      // Step 3: Measure chord c at Q and transfer from upper transversal intersection at P
      const pTopTransX = px + rArc * Math.cos(alpha);
      const pTopTransY = yTop + rArc * Math.sin(alpha);
      drawCompassArc(pTopTransX, pTopTransY, chordC, -Math.PI * 0.75, -Math.PI * 0.25, pal.amber, 2.6, true, Math.max(0.25, b3));
      drawPt(px + rArc, yTop, 'R', pal.amber, 8, 18, true);

      // Step 4: Parallel line l' through P and R
      drawSeg(-2.9, yTop, 2.9, yTop, pal.teal, 4.0, false, Math.max(0.2, b4));

      readouts = [
        { key: 'Transversal α', val: `${alphaDeg.toFixed(1)}°` },
        { key: 'Copied Angle ∠P', val: `${alphaDeg.toFixed(1)}°` },
        { key: 'Chord Span c', val: chordC.toFixed(3) },
        { key: 'Separation h', val: h.toFixed(2) },
      ];
      tableRows = [
        ['1 · Transversal PQ', `Angle α = ${alphaDeg.toFixed(1)}°`, `Q(${qx.toFixed(2)}, ${yBot.toFixed(2)})`, `Meets P(${px.toFixed(2)}, ${yTop.toFixed(2)})`],
        ['2 · Reference Arcs', `Compass r = ${rArc.toFixed(2)}`, 'Centers Q and P', 'Equal Radii on Both Vertices'],
        ['3 · Transfer Chord c', `c = 2r sin(α/2) = ${chordC.toFixed(3)}`, 'Cut Upper Arc at R', 'Copies Angle α Exactly'],
        ['4 · Draw Line PR (ℓ′)', 'Straightedge PR', `Slope = 0.000`, 'Corresponding Angles ⇒ ℓ′ ∥ ℓ'],
      ];
      cardLines = [
        { text: 'EUCLID I.31 · PARALLEL LINE VIA ANGLE COPY', color: pal.amber },
        { text: `Transversal Angle α = ${alphaDeg.toFixed(1)}°  ·  Separation h = ${h.toFixed(2)}`, color: pal.ink },
        { text: `Transferred Compass Chord c = 2r sin(α/2) = ${chordC.toFixed(3)}`, color: pal.teal },
        { text: `Equal Corresponding Angles (${alphaDeg.toFixed(1)}°) ⇒ ℓ′ ∥ ℓ`, color: pal.indigo },
      ];
    }
    // ── #157: Dividing a Segment into N Equal Parts (Thales Intercept VI.9) ──
    else if (sub === 'const_thales_segment_div') {
      const N = Math.max(2, Math.min(7, Math.round(Number(params.partsN ?? 5))));
      const rayDeg = Number(params.rayDeg ?? 38);
      const alpha = (rayDeg * Math.PI) / 180;
      const ax = -2.35;
      const ay = -1.15;
      const lenAB = 4.6;
      const bx = ax + lenAB;
      const stepR = 3.4 / N;

      // Step 1: Segment AB and auxiliary ray AX at angle alpha
      drawSeg(ax, ay, bx, ay, pal.indigo, 4.2, false, b1);
      drawSeg(ax, ay, ax + 3.7 * Math.cos(alpha), ay + 3.7 * Math.sin(alpha), pal.amber, 2.8, false, b1);
      drawPt(ax, ay, 'A', pal.indigo, -18, 18);
      drawPt(bx, ay, 'B', pal.indigo, 10, 18);

      // Step 2 & 3 & 4: N equal compass ticks P_k on AX and parallel struts P_k Q_k
      for (let k = 1; k <= N; k++) {
        const rk = k * stepR;
        const pkx = ax + rk * Math.cos(alpha);
        const pky = ay + rk * Math.sin(alpha);
        const qkx = ax + (k / N) * lenAB;
        drawCompassArc(ax + (k - 1) * stepR * Math.cos(alpha), ay + (k - 1) * stepR * Math.sin(alpha), stepR, alpha - 0.28, alpha + 0.28, pal.amber, 2.2, true, b2);
        drawPt(pkx, pky, `P${k}`, pal.amber, -20, -6);
        // Parallel intercept line from P_k to Q_k on AB
        const col = k === N ? pal.indigo : pal.teal;
        drawSeg(pkx, pky, qkx, ay, col, k === N ? 3.2 : 2.6, k !== N, k === N ? b3 : b4);
        if (k < N) drawPt(qkx, ay, `Q${k}`, pal.teal, -8, 22);
      }

      const subLen = lenAB / N;
      readouts = [
        { key: 'Divisions N', val: String(N) },
        { key: 'Total Length |AB|', val: lenAB.toFixed(2) },
        { key: 'Sub-Segment |AB|/N', val: subLen.toFixed(3) },
        { key: 'Auxiliary Angle α', val: `${rayDeg.toFixed(0)}°` },
      ];
      tableRows = Array.from({ length: N }, (_, idx) => {
        const k = idx + 1;
        return [`Tick k = ${k} / ${N}`, `|AP_${k}| = ${(k * stepR).toFixed(2)}`, `|AQ_${k}| = ${(k * subLen).toFixed(3)}`, `Ratio k/N = ${(k / N).toFixed(3)}`];
      });
      cardLines = [
        { text: `EUCLID VI.9 · DIVIDING AB INTO N = ${N} EQUAL PARTS`, color: pal.amber },
        { text: `|AB| = ${lenAB.toFixed(2)}  →  Each Part Δx = |AB|/${N} = ${subLen.toFixed(3)}`, color: pal.ink },
        { text: `Parallel Struts P_k Q_k ∥ P_${N} B by Similar Triangles`, color: pal.teal },
        { text: `Thales Ratio: |AQ_k| / |AB| = |AP_k| / |AP_${N}| = k / ${N}`, color: pal.indigo },
      ];
    }
    // ── #158: Constructing Tangents to a Circle from an External Point (Euclid III.17) ──
    else if (sub === 'const_external_tangents_circle') {
      const d = Number(params.distOP ?? 2.35);
      const R = Math.min(d * 0.82, Number(params.circR ?? 1.05));
      const ox = -1.05;
      const oy = 0;
      const px = ox + d;
      const mx = ox + 0.5 * d;
      const rThales = 0.5 * d;
      // Tangent point angle cos(phi) = R / d
      const phi = Math.acos(R / d);
      const t1x = ox + R * Math.cos(phi);
      const t1y = R * Math.sin(phi);
      const t2x = t1x;
      const t2y = -t1y;
      const tanLen = Math.sqrt(d * d - R * R);

      // Step 1: Target circle (O, R), external point P, and line OP
      drawCompassArc(ox, oy, R, 0, Math.PI * 2, pal.indigo, 3.8, false, b1);
      drawSeg(ox, oy, px, oy, pal.indigo, 2.4, true, b1);
      drawPt(ox, oy, 'O', pal.indigo, -18, 16);
      drawPt(px, oy, 'P', pal.indigo, 10, 16);

      // Step 2 & 3: Midpoint M of OP and Thales circle of radius d/2 centered at M
      drawPt(mx, oy, 'M', pal.amber, -6, 20);
      drawCompassArc(mx, oy, rThales, 0, Math.PI * 2, pal.amber, 2.6, true, Math.max(0.25, b3));

      // Step 4: Radii OT1, OT2 and tangent segments PT1, PT2 (orthogonal at T1, T2)
      drawSeg(ox, oy, t1x, t1y, pal.amber, 2.4, false, b3);
      drawSeg(ox, oy, t2x, t2y, pal.amber, 2.4, false, b3);
      drawSeg(px, oy, t1x, t1y, pal.teal, 4.0, false, Math.max(0.2, b4));
      drawSeg(px, oy, t2x, t2y, pal.teal, 4.0, false, Math.max(0.2, b4));
      drawPt(t1x, t1y, 'T₁ (90°)', pal.teal, -16, -12, true);
      drawPt(t2x, t2y, 'T₂ (90°)', pal.teal, -16, 22, true);

      readouts = [
        { key: 'Distance |OP|', val: d.toFixed(2) },
        { key: 'Circle Radius R', val: R.toFixed(2) },
        { key: 'Tangent |PT₁|=|PT₂|', val: tanLen.toFixed(3) },
        { key: 'Angle ∠OT₁P', val: '90.0° (Thales)' },
      ];
      tableRows = [
        ['1 · Given (O, R) & P', `R = ${R.toFixed(2)}`, `|OP| = ${d.toFixed(2)}`, 'External Point P'],
        ['2 · Bisect Segment OP', 'Perp Bisector Lens', `Midpoint M(${mx.toFixed(2)}, 0)`, `|OM| = |MP| = ${rThales.toFixed(2)}`],
        ['3 · Thales Circle (M, d/2)', `Radius = ${rThales.toFixed(2)}`, `Cuts (O, R) at T₁, T₂`, '∠OT₁P = ∠OT₂P = 90°'],
        ['4 · Draw PT₁ and PT₂', 'Straightedge Tangents', `|PT| = √(d²−R²) = ${tanLen.toFixed(3)}`, 'Exact Equal Tangents'],
      ];
      cardLines = [
        { text: 'EUCLID III.17 · TANGENTS FROM EXTERNAL POINT', color: pal.amber },
        { text: `|OP| = ${d.toFixed(2)},  Circle Radius R = ${R.toFixed(2)}`, color: pal.ink },
        { text: `Thales Semicircle on OP ⇒ ∠OT₁P = ∠OT₂P = 90°`, color: pal.teal },
        { text: `Tangent Length |PT₁| = |PT₂| = √(|OP|² − R²) = ${tanLen.toFixed(3)}`, color: pal.indigo },
      ];
    } else if (sub === 'const_common_bitangents') {
      const r1 = Math.max(0.95, Math.min(1.65, v.r1 ?? 1.35));
      const r2 = Math.max(0.25, Math.min(0.85, v.r2 ?? 0.55));
      const o1x = -1.55, o1y = 0.0;
      const o2x = 1.65, o2y = 0.0;
      const d = o2x - o1x;
      const rAux = Math.max(0.08, r1 - r2);
      const mx = 0.5 * (o1x + o2x);
      const rThales = 0.5 * d;
      const cosA = rAux / d;
      const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA));
      const tanLen = Math.sqrt(Math.max(0, d * d - rAux * rAux));

      // Step 1: Primary circles (O1, r1) and (O2, r2)
      drawCompassArc(o1x, o1y, r1, 0, Math.PI * 2, pal.indigo, 3.6, false, b1);
      drawCompassArc(o2x, o2y, r2, 0, Math.PI * 2, pal.indigo, 3.6, false, b1);
      drawSeg(o1x, o1y, o2x, o2y, pal.indigo, 2.0, true, b1);
      drawPt(o1x, o1y, 'O₁', pal.indigo, -18, 16);
      drawPt(o2x, o2y, 'O₂', pal.indigo, 10, 16);

      // Step 2: Auxiliary circle (O1, r1 - r2)
      drawCompassArc(o1x, o1y, rAux, 0, Math.PI * 2, pal.amber, 2.6, true, Math.max(0.25, b2));
      const qx = o1x + rAux * cosA;
      const qy = o1y + rAux * sinA;
      drawPt(qx, qy, 'Q (r₁−r₂)', pal.amber, -26, -10);

      // Step 3: Thales circle on O1O2 and inner tangent O2Q
      drawCompassArc(mx, 0, rThales, -0.1, Math.PI + 0.1, pal.coral, 2.2, true, b3);
      drawSeg(o2x, o2y, qx, qy, pal.amber, 2.5, true, b3);

      // Step 4: Radial normals and outer common bitangents T1T2 (top & bottom)
      const t1x = o1x + r1 * cosA, t1y = o1y + r1 * sinA;
      const t2x = o2x + r2 * cosA, t2y = o2y + r2 * sinA;
      const b1x = o1x + r1 * cosA, b1y = o1y - r1 * sinA;
      const b2x = o2x + r2 * cosA, b2y = o2y - r2 * sinA;
      drawSeg(o1x, o1y, t1x, t1y, pal.amber, 2.2, false, b4);
      drawSeg(o2x, o2y, t2x, t2y, pal.amber, 2.2, false, b4);
      drawSeg(t1x, t1y, t2x, t2y, pal.teal, 4.0, false, Math.max(0.25, b4));
      drawSeg(b1x, b1y, b2x, b2y, pal.teal, 3.4, false, Math.max(0.25, b4));
      drawPt(t1x, t1y, 'T₁', pal.teal, -12, -12, true);
      drawPt(t2x, t2y, 'T₂', pal.teal, 8, -12, true);

      readouts = [
        { key: 'Radii r₁, r₂', val: `${r1.toFixed(2)}, ${r2.toFixed(2)}` },
        { key: 'Aux Radius r₁−r₂', val: rAux.toFixed(2) },
        { key: 'Center Dist d', val: d.toFixed(2) },
        { key: 'Bitangent |T₁T₂|', val: tanLen.toFixed(3) },
      ];
      tableRows = [
        ['1 · Two Circles', `r₁ = ${r1.toFixed(2)}`, `r₂ = ${r2.toFixed(2)}`, `d = |O₁O₂| = ${d.toFixed(2)}`],
        ['2 · Aux Circle at O₁', 'Compass Radius r₁ − r₂', `r_aux = ${rAux.toFixed(2)}`, 'Reduces O₂ to Point'],
        ['3 · Tangent O₂Q to Aux', 'Thales Semicircle on O₁O₂', `Q(${qx.toFixed(2)}, ${qy.toFixed(2)})`, `|O₂Q| = ${tanLen.toFixed(3)}`],
        ['4 · Radial Shift by r₂', 'Extend O₁Q → T₁, O₂T₂ ∥ O₁T₁', `|T₁T₂| = ${tanLen.toFixed(3)}`, 'Exact Common Bitangents'],
      ];
      cardLines = [
        { text: 'MONGE AUXILIARY REDUCTION · COMMON BITANGENTS', color: pal.amber },
        { text: `r₁ = ${r1.toFixed(2)},  r₂ = ${r2.toFixed(2)},  Aux Radius r₁ − r₂ = ${rAux.toFixed(2)}`, color: pal.ink },
        { text: `Inner Tangent O₂Q ⊥ O₁Q shifted radially outward by r₂`, color: pal.teal },
        { text: `Bitangent Length |T₁T₂| = √(d² − (r₁ − r₂)²) = ${tanLen.toFixed(3)}`, color: pal.indigo },
      ];
    } else if (sub === 'const_geometric_mean_sqrt') {
      const segA = Math.max(0.6, Math.min(2.6, v.segA ?? 2.2));
      const segB = Math.max(0.5, Math.min(2.2, v.segB ?? 0.9));
      const tot = segA + segB;
      const yBase = -0.85;
      const ax = -0.5 * tot - 0.35;
      const hx = ax + segA;
      const bx = ax + tot;
      const mx = 0.5 * (ax + bx);
      const R = 0.5 * tot;
      const gMean = Math.sqrt(segA * segB);
      const cy = yBase + gMean;

      // Step 1: Collinear segments AH = a and HB = b
      drawSeg(ax, yBase, hx, yBase, pal.indigo, 4.0, false, b1);
      drawSeg(hx, yBase, bx, yBase, pal.coral, 4.0, false, b1);
      drawPt(ax, yBase, 'A', pal.indigo, -16, 18);
      drawPt(hx, yBase, 'H', pal.amber, -6, 20);
      drawPt(bx, yBase, 'B', pal.coral, 10, 18);

      // Step 2: Midpoint M and semicircle of radius (a+b)/2
      drawPt(mx, yBase, 'M', pal.amber, -6, -12);
      drawCompassArc(mx, yBase, R, 0, Math.PI, pal.amber, 2.8, false, Math.max(0.25, b2));

      // Step 3: Perpendicular altitude HC at H meeting semicircle at C
      drawSeg(hx, yBase, hx, yBase + gMean * Math.max(0.2, b3), pal.teal, 4.2, false, 1);
      drawRightBox(hx, yBase, 1, 0, 0, 1, 0.14);
      drawSeg(ax, yBase, hx, cy, pal.indigo, 2.0, true, b3);
      drawSeg(bx, yBase, hx, cy, pal.coral, 2.0, true, b3);
      drawPt(hx, cy, 'C (90°)', pal.teal, -18, -12, true);

      // Step 4: Construct square of side √(ab) on HC (Euclid II.14 squaring the rectangle)
      if (b4 > 0.05) {
        const pA = toPx(hx, yBase);
        const pB = toPx(hx + gMean, yBase);
        const pC = toPx(hx + gMean, cy);
        const pD = toPx(hx, cy);
        ctx.save();
        ctx.globalAlpha = b4;
        ctx.fillStyle = pal.tealFill || 'rgba(45, 212, 191, 0.18)';
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.lineTo(pC.x, pC.y);
        ctx.lineTo(pD.x, pD.y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        drawSeg(hx, yBase, hx + gMean, yBase, pal.teal, 2.8, false, b4);
        drawSeg(hx + gMean, yBase, hx + gMean, cy, pal.teal, 2.8, false, b4);
        drawSeg(hx + gMean, cy, hx, cy, pal.teal, 2.8, false, b4);
      }

      readouts = [
        { key: 'Segments a, b', val: `${segA.toFixed(2)}, ${segB.toFixed(2)}` },
        { key: 'Arith Mean (a+b)/2', val: R.toFixed(3) },
        { key: 'Geom Mean √(ab)', val: gMean.toFixed(4) },
        { key: 'Square Area |CH|²', val: (segA * segB).toFixed(3) },
      ];
      tableRows = [
        ['1 · Collinear Segments', `|AH| = a = ${segA.toFixed(2)}`, `|HB| = b = ${segB.toFixed(2)}`, `Diameter a+b = ${tot.toFixed(2)}`],
        ['2 · Semicircle on AB', `Center M(${mx.toFixed(2)}, ${yBase})`, `Radius R = ${R.toFixed(3)}`, 'Arithmetic Mean (a+b)/2'],
        ['3 · Erect Altitude HC ⊥ AB', 'Thales Right △ACB', '△ACH ∼ △CBH', `|CH| = √(ab) = ${gMean.toFixed(4)}`],
        ['4 · Square on Altitude HC', 'Euclid II.14 Quadrature', `Area = |CH|² = ${(segA * segB).toFixed(3)}`, 'Equals Rectangle a·b'],
      ];
      cardLines = [
        { text: 'EUCLID II.14 & VI.13 · GEOMETRIC MEAN √(a·b)', color: pal.amber },
        { text: `a = ${segA.toFixed(2)},  b = ${segB.toFixed(2)},  Radius (a+b)/2 = ${R.toFixed(3)}`, color: pal.ink },
        { text: `Right Triangle Similarity: |CH| / a = b / |CH| ⇒ |CH| = √(ab) = ${gMean.toFixed(4)}`, color: pal.teal },
        { text: `AM-GM Visual Proof: Altitude √(ab) = ${gMean.toFixed(3)} ≤ Radius (a+b)/2 = ${R.toFixed(3)}`, color: pal.indigo },
      ];
    } else if (sub === 'const_golden_section_pentagon') {
      const R = Math.max(1.15, Math.min(2.15, v.pentR ?? 1.75));
      const rot = ((v.rotDeg ?? 0) * Math.PI) / 180;
      const ox = 0.0, oy = -0.1;
      const phi = 0.5 * (1 + Math.sqrt(5));
      const s10 = R / phi;
      const s5 = R * Math.sqrt(10 - 2 * Math.sqrt(5)) * 0.5;
      const mx = ox + 0.5 * R, my = oy;
      const cx = ox, cy = oy + R;
      const rMC = Math.hypot(cx - mx, cy - my);
      const dx = mx - rMC, dy = oy;

      // Step 1: Primary circle (O, R), perpendicular diameters, and midpoint M of OB
      drawCompassArc(ox, oy, R, 0, Math.PI * 2, pal.indigo, 3.2, false, b1);
      drawSeg(ox - R, oy, ox + R, oy, pal.indigo, 2.0, true, b1);
      drawSeg(ox, oy - R, ox, oy + R, pal.indigo, 2.0, true, b1);
      drawPt(ox, oy, 'O', pal.indigo, -16, 18);
      drawPt(ox + R, oy, 'B', pal.indigo, 8, 16);
      drawPt(mx, my, 'M (R/2)', pal.amber, -12, 20);
      drawPt(cx, cy, 'C', pal.indigo, 8, -10);

      // Step 2: Swing Ptolemy arc centered at M of radius |MC| = R√5/2 down to diameter at D
      drawSeg(mx, my, cx, cy, pal.amber, 2.4, true, b2);
      const angMC = Math.atan2(cy - my, cx - mx);
      drawCompassArc(mx, my, rMC, angMC, Math.PI, pal.amber, 2.8, true, Math.max(0.25, b2));
      drawPt(dx, dy, 'D (s₁₀)', pal.amber, -22, 20);
      drawSeg(ox, oy, dx, dy, pal.coral, 3.4, false, b2);

      // Step 3: Hypotenuse CD = pentagon side s5
      drawSeg(cx, cy, dx, dy, pal.teal, 4.0, false, Math.max(0.2, b3));

      // Step 4: Step s5 around the circle to inscribe the regular pentagon
      const verts = [];
      for (let k = 0; k < 5; k++) {
        const a = Math.PI * 0.5 + rot + (k * 2 * Math.PI) / 5;
        verts.push({ x: ox + R * Math.cos(a), y: oy + R * Math.sin(a) });
      }
      for (let k = 0; k < 5; k++) {
        const v0 = verts[k];
        const v1 = verts[(k + 1) % 5];
        drawSeg(v0.x, v0.y, v1.x, v1.y, pal.teal, 3.8, false, Math.max(0.18, b4));
        drawPt(v0.x, v0.y, `P_${k + 1}`, pal.teal, 8, -8, k === 0);
      }

      readouts = [
        { key: 'Golden Ratio φ', val: phi.toFixed(5) },
        { key: 'Decagon Side s₁₀=|OD|', val: s10.toFixed(4) },
        { key: 'Pentagon Side s₅=|CD|', val: s5.toFixed(4) },
        { key: 'Identity s₆²+s₁₀²', val: `${(R * R + s10 * s10).toFixed(3)} = s₅²` },
      ];
      tableRows = [
        ['1 · Bisect Radius OB at M', `|OM| = R/2 = ${(0.5 * R).toFixed(3)}`, `|OC| = R = ${R.toFixed(2)}`, `|MC| = R√5/2 = ${rMC.toFixed(3)}`],
        ['2 · Arc (M, |MC|) to D', 'Cuts Diameter at D', `|OD| = R/φ = ${s10.toFixed(4)}`, 'Regular Decagon Side s₁₀'],
        ['3 · Chord CD Hypotenuse', 'Euclid XIII.10: R²+|OD|²=|CD|²', `|CD| = s₅ = ${s5.toFixed(4)}`, 'Exact Pentagon Side s₅'],
        ['4 · Step s₅ Around Circle', '5 Equal Chords of Length s₅', 'Interior ∠ = 108°', 'Diagonal / Side = φ = 1.61803'],
      ];
      cardLines = [
        { text: "PTOLEMY'S PENTAGON & GOLDEN RATIO CONSTRUCTION", color: pal.amber },
        { text: `|MC| = (√5/2)R = ${rMC.toFixed(3)},  |OD| = s₁₀ = R/φ = ${s10.toFixed(4)}`, color: pal.ink },
        { text: `Pentagon Side s₅ = |CD| = √(R² + s₁₀²) = ${s5.toFixed(4)}`, color: pal.teal },
        { text: `Golden Ratio φ = (1 + √5)/2 = ${phi.toFixed(5)} (Exact 72° Central Angle)`, color: pal.indigo },
      ];
    } else if (sub === 'const_incircle_incenter') {
      const ax = -2.15, ay = -1.15;
      const bx = 2.15, by = -1.15;
      const cx = Math.max(-1.4, Math.min(1.6, v.cx ?? 0.35));
      const cy = Math.max(1.1, Math.min(2.6, v.cy ?? 2.15));
      const a = Math.hypot(bx - cx, by - cy);
      const b = Math.hypot(ax - cx, ay - cy);
      const c = Math.hypot(bx - ax, by - ay);
      const perim = a + b + c;
      const s = 0.5 * perim;
      const ix = (a * ax + b * bx + c * cx) / perim;
      const iy = (a * ay + b * by + c * cy) / perim;
      const area = 0.5 * Math.abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay));
      const rIn = area / s;

      // Step 1: Triangle ABC
      drawSeg(ax, ay, bx, by, pal.indigo, 3.8, false, b1);
      drawSeg(bx, by, cx, cy, pal.indigo, 3.8, false, b1);
      drawSeg(cx, cy, ax, ay, pal.indigo, 3.8, false, b1);
      drawPt(ax, ay, 'A', pal.indigo, -18, 16);
      drawPt(bx, by, 'B', pal.indigo, 10, 16);
      drawPt(cx, cy, 'C', pal.indigo, -6, -12);

      // Step 2: Angle bisectors from A, B, C meeting at Incenter I
      const angAC = Math.atan2(cy - ay, cx - ax);
      drawCompassArc(ax, ay, 0.65, 0, angAC, pal.amber, 2.2, true, b2);
      const angBC = Math.atan2(cy - by, cx - bx);
      drawCompassArc(bx, by, 0.65, angBC, Math.PI, pal.amber, 2.2, true, b2);
      drawSeg(ax, ay, ix, iy, pal.amber, 2.5, true, Math.max(0.25, b2));
      drawSeg(bx, by, ix, iy, pal.amber, 2.5, true, Math.max(0.25, b2));
      drawSeg(cx, cy, ix, iy, pal.amber, 2.0, true, Math.max(0.25, b2));
      drawPt(ix, iy, 'I (Incenter)', pal.amber, 10, -8);

      // Step 3: Drop perpendicular apothem IT_c to side AB (which is horizontal y = ay)
      const tcx = ix, tcy = ay;
      drawSeg(ix, iy, tcx, tcy, pal.coral, 3.2, false, Math.max(0.2, b3));
      drawRightBox(tcx, tcy, 1, 0, 0, 1, 0.14);
      drawPt(tcx, tcy, 'T_c', pal.coral, -8, 22);

      // Step 4: Sweep inscribed circle of radius r = |IT_c|
      drawCompassArc(ix, iy, rIn, 0, Math.PI * 2 * Math.max(0.2, b4), pal.teal, 4.0, false, 1);

      readouts = [
        { key: 'Incenter I(x, y)', val: `(${ix.toFixed(2)}, ${iy.toFixed(2)})` },
        { key: 'Semiperimeter s', val: s.toFixed(3) },
        { key: 'Triangle Area Δ', val: area.toFixed(3) },
        { key: 'Inradius r = Δ/s', val: rIn.toFixed(4) },
      ];
      tableRows = [
        ['1 · Given △ABC', `a=${a.toFixed(2)}, b=${b.toFixed(2)}`, `c=${c.toFixed(2)}`, `s = (a+b+c)/2 = ${s.toFixed(2)}`],
        ['2 · Bisect ∠A & ∠B', 'Compass Angle Bisectors', `I(${ix.toFixed(2)}, ${iy.toFixed(2)})`, 'Equidistant from All 3 Sides'],
        ['3 · Drop Apothem IT_c ⊥ AB', `T_c(${tcx.toFixed(2)}, ${tcy.toFixed(2)})`, `|AT_c| = s − a = ${(s - a).toFixed(2)}`, `r = |IT_c| = ${rIn.toFixed(4)}`],
        ['4 · Sweep Incircle (I, r)', 'Tangent at T_a, T_b, T_c', `r = Δ / s = ${rIn.toFixed(4)}`, 'Unique Inscribed Circle'],
      ];
      cardLines = [
        { text: 'EUCLID IV.4 · INCIRCLE & INCENTER CONSTRUCTION', color: pal.amber },
        { text: `Incenter I(${ix.toFixed(2)}, ${iy.toFixed(2)}) at Concurrency of Angle Bisectors`, color: pal.ink },
        { text: `Apothem |IT_c| ⊥ AB Sets Compass Radius r = Δ / s = ${rIn.toFixed(4)}`, color: pal.teal },
        { text: `Tangent Split: |AT_c| = s − a = ${(s - a).toFixed(2)},  |BT_c| = s − b = ${(s - b).toFixed(2)}`, color: pal.indigo },
      ];
    } else if (sub === 'const_circumcircle_3pts') {
      const ax = -1.75, ay = -0.85;
      const bx = 1.65, by = -0.55;
      const cx = Math.max(-1.35, Math.min(1.55, v.cx ?? 0.45));
      const cy = Math.max(0.65, Math.min(2.35, v.cy ?? 1.65));

      // Compute exact circumcenter O(ox, oy)
      const D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
      const a2 = ax * ax + ay * ay;
      const b2 = bx * bx + by * by;
      const c2 = cx * cx + cy * cy;
      const ox = (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / D;
      const oy = (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / D;
      const R = Math.hypot(ax - ox, ay - oy);

      // Midpoints M_AB and M_BC
      const m1x = 0.5 * (ax + bx), m1y = 0.5 * (ay + by);
      const m2x = 0.5 * (bx + cx), m2y = 0.5 * (by + cy);

      // Step 1: Three non-collinear points A, B, C and chords AB, BC
      drawSeg(ax, ay, bx, by, pal.indigo, 3.2, false, b1);
      drawSeg(bx, by, cx, cy, pal.indigo, 3.2, false, b1);
      drawSeg(cx, cy, ax, ay, pal.indigo, 2.2, true, b1);
      drawPt(ax, ay, 'A', pal.indigo, -18, 16);
      drawPt(bx, by, 'B', pal.indigo, 10, 16);
      drawPt(cx, cy, 'C', pal.indigo, 8, -12);

      // Step 2: Perpendicular bisector of chord AB
      const n1x = -(by - ay) / Math.hypot(bx - ax, by - ay);
      const n1y = (bx - ax) / Math.hypot(bx - ax, by - ay);
      drawSeg(m1x - 1.8 * n1x, m1y - 1.8 * n1y, m1x + 2.2 * n1x, m1y + 2.2 * n1y, pal.amber, 2.6, true, Math.max(0.25, b2));
      drawPt(m1x, m1y, 'M_AB', pal.amber, -14, 20);

      // Step 3: Perpendicular bisector of chord BC meeting at Circumcenter O
      const n2x = -(cy - by) / Math.hypot(cx - bx, cy - by);
      const n2y = (cx - bx) / Math.hypot(cx - bx, cy - by);
      drawSeg(m2x - 2.2 * n2x, m2y - 2.2 * n2y, m2x + 1.8 * n2x, m2y + 1.8 * n2y, pal.coral, 2.6, true, Math.max(0.25, b3));
      drawPt(m2x, m2y, 'M_BC', pal.coral, 10, -6);
      drawSeg(ox, oy, ax, ay, pal.amber, 1.9, true, b3);
      drawSeg(ox, oy, bx, by, pal.amber, 1.9, true, b3);
      drawSeg(ox, oy, cx, cy, pal.amber, 1.9, true, b3);
      drawPt(ox, oy, 'O (Circumcenter)', pal.teal, 10, 16, true);

      // Step 4: Sweep unique Circumcircle (O, R = |OA|)
      drawCompassArc(ox, oy, R, 0, Math.PI * 2 * Math.max(0.25, b4), pal.teal, 4.0, false, 1);

      readouts = [
        { key: 'Circumcenter O', val: `(${ox.toFixed(2)}, ${oy.toFixed(2)})` },
        { key: 'Circumradius R', val: R.toFixed(4) },
        { key: 'Radii |OA|=|OB|=|OC|', val: `${R.toFixed(3)} = ${R.toFixed(3)}` },
        { key: 'Chord Midpoints', val: 'M_AB, M_BC (⊥)' },
      ];
      tableRows = [
        ['1 · Non-Collinear A, B, C', `A(${ax}, ${ay})`, `B(${bx}, ${by})`, `C(${cx.toFixed(2)}, ${cy.toFixed(2)})`],
        ['2 · Bisect Chord AB', `Midpoint M_AB(${m1x.toFixed(2)}, ${m1y.toFixed(2)})`, 'Locus |PA| = |PB|', 'Perpendicular Lens 1'],
        ['3 · Bisect Chord BC → O', `Midpoint M_BC(${m2x.toFixed(2)}, ${m2y.toFixed(2)})`, `O(${ox.toFixed(2)}, ${oy.toFixed(2)})`, '|OA| = |OB| = |OC|'],
        ['4 · Sweep Circle (O, |OA|)', `Radius R = ${R.toFixed(4)}`, 'Passes Through A, B, C', 'Unique Circumcircle'],
      ];
      cardLines = [
        { text: 'EUCLID IV.5 · CIRCLE THROUGH 3 NON-COLLINEAR POINTS', color: pal.amber },
        { text: `Perp Bisector(AB) ∩ Perp Bisector(BC) = O(${ox.toFixed(2)}, ${oy.toFixed(2)})`, color: pal.ink },
        { text: `Equidistance Theorem: |OA| = |OB| = |OC| = R = ${R.toFixed(4)}`, color: pal.teal },
        { text: `Compass anchored at O with opening |OA| sweeps through A, B, and C`, color: pal.indigo },
      ];
    } else if (sub === 'const_regular_hexagon_12gon') {
      const R = Math.max(1.05, Math.min(2.1, v.hexR ?? 1.65));
      const petals = Math.max(1, Math.min(6, Math.round(v.petals ?? 6)));
      const ox = 0.0, oy = -0.08;
      const s6 = R;
      const s12 = R * Math.sqrt(2 - Math.sqrt(3));
      const area6 = 1.5 * Math.sqrt(3) * R * R;
      const area12 = 3.0 * R * R;

      // Step 1: Primary circle of radius R
      drawCompassArc(ox, oy, R, 0, Math.PI * 2, pal.indigo, 3.4, false, b1);
      drawPt(ox, oy, 'O', pal.indigo, -16, 18);

      // Step 2 & 3: 6 vertices around rim (b2) & 6-petal compass rosette arcs passing through O (b3)
      const hexPts = [];
      for (let k = 0; k < 6; k++) {
        const a = (k * Math.PI) / 3;
        hexPts.push({ x: ox + R * Math.cos(a), y: oy + R * Math.sin(a), a });
      }
      for (let k = 0; k < 6; k++) {
        const pt = hexPts[k];
        drawCompassArc(pt.x, pt.y, R, pt.a + Math.PI / 3 - 0.25, pt.a + Math.PI / 3 + 0.25, pal.amber, 2.1, true, b2);
      }
      for (let k = 0; k < petals; k++) {
        const pt = hexPts[k];
        // Arc centered at hexPts[k] of radius R from hexPts[(k+4)%6] through O to hexPts[(k+2)%6]
        const aStart = pt.a + (2 * Math.PI) / 3;
        const aEnd = pt.a + (4 * Math.PI) / 3;
        drawCompassArc(pt.x, pt.y, R, aStart, aEnd, pal.amber, 2.3, false, Math.max(0.3, b3));
      }

      // Step 4: Regular hexagon chords and 12-gon bisected vertices
      for (let k = 0; k < 6; k++) {
        const p0 = hexPts[k];
        const p1 = hexPts[(k + 1) % 6];
        drawSeg(p0.x, p0.y, p1.x, p1.y, pal.teal, 3.8, false, Math.max(0.25, b4));
        drawPt(p0.x, p0.y, `V_${k + 1}`, pal.teal, 8, -8, k === 0);
        if (b4 > 0.35) {
          const aMid = p0.a + Math.PI / 6;
          const mx = ox + R * Math.cos(aMid);
          const my = oy + R * Math.sin(aMid);
          drawSeg(p0.x, p0.y, mx, my, pal.coral, 2.0, true, b4);
          drawSeg(mx, my, p1.x, p1.y, pal.coral, 2.0, true, b4);
        }
      }

      readouts = [
        { key: 'Hexagon Side s₆ = R', val: s6.toFixed(3) },
        { key: '12-Gon Side s₁₂', val: s12.toFixed(4) },
        { key: 'Hexagon Area A₆', val: area6.toFixed(3) },
        { key: '12-Gon Area A₁₂ = 3R²', val: area12.toFixed(3) },
      ];
      tableRows = [
        ['1 · Primary Circle (O, R)', `Radius R = ${R.toFixed(2)}`, 'Unaltered Compass Opening', 'Circumference 2πR'],
        ['2 · Step Radius R 6×', 'Equilateral △OV_kV_{k+1}', 'Central Angle = 60.0°', `Exact Closure 6 × 60° = 360°`],
        ['3 · Six-Petal Daisy Rosette', `${petals} of 6 Arcs Drawn`, 'Each Arc Passes Through O', 'Classical Compass Motif'],
        ['4 · Hexagon & 12-Gon', `s₆ = R = ${s6.toFixed(2)}`, `s₁₂ = ${s12.toFixed(3)}`, `A₁₂ = 3R² = ${area12.toFixed(3)}`],
      ];
      cardLines = [
        { text: 'EUCLID IV.15 · COMPASS DAISY ROSETTE & HEXAGON', color: pal.amber },
        { text: `Unaltered Compass Radius R = ${R.toFixed(2)} Steps Exactly 6 Times Around Circle`, color: pal.ink },
        { text: `Hexagon Side s₆ = R = ${s6.toFixed(2)},  Area A₆ = (3√3/2)R² = ${area6.toFixed(3)}`, color: pal.teal },
        { text: `Bisecting 60° Arcs → Regular 12-Gon of Exact Rational Area A₁₂ = 3R² = ${area12.toFixed(3)}`, color: pal.indigo },
      ];
    } else if (sub === 'const_apollonius_locus') {
      const k = Math.max(1.35, Math.min(3.2, v.ratioK ?? 2.0));
      const probeRad = ((v.probeDeg ?? 65) * Math.PI) / 180;
      const ax = -2.2, ay = -0.15;
      const bx = 0.55, by = -0.15;
      const dAB = bx - ax;
      // Internal harmonic point D1 divides AB in ratio k:1
      const d1x = (ax + k * bx) / (1 + k);
      // External harmonic point D2 divides AB externally in ratio k:1
      const d2x = (k * bx - ax) / (k - 1);
      const cx = 0.5 * (d1x + d2x);
      const rApol = 0.5 * Math.abs(d2x - d1x);
      const px = cx + rApol * Math.cos(probeRad);
      const py = ay + rApol * Math.sin(probeRad);
      const distPA = Math.hypot(px - ax, py - ay);
      const distPB = Math.hypot(px - bx, py - by);

      // Step 1: Anchor points A, B and line AB
      drawSeg(ax - 0.35, ay, d2x + 0.35, ay, pal.indigo, 2.4, true, b1);
      drawSeg(ax, ay, bx, ay, pal.indigo, 4.0, false, b1);
      drawPt(ax, ay, 'A', pal.indigo, -16, 18);
      drawPt(bx, ay, 'B', pal.indigo, -6, 20);

      // Step 2: Internal & external angle bisectors of ∠APB meeting line AB at D1, D2
      drawSeg(ax, ay, px, py, pal.indigo, 3.0, false, Math.max(0.25, b2));
      drawSeg(bx, ay, px, py, pal.indigo, 3.0, false, Math.max(0.25, b2));
      drawSeg(px, py, d1x, ay, pal.amber, 2.8, false, Math.max(0.25, b2));
      drawSeg(px, py, d2x, ay, pal.coral, 2.8, true, Math.max(0.25, b3));
      drawPt(d1x, ay, 'D₁ (Int)', pal.amber, -18, 22);
      drawPt(d2x, ay, 'D₂ (Ext)', pal.coral, -10, 22);
      drawPt(px, py, 'P', pal.teal, -6, -14, true);

      // Step 3: Right angle between internal & external bisectors PD1 ⊥ PD2
      const u1x = (d1x - px) / Math.hypot(d1x - px, ay - py);
      const u1y = (ay - py) / Math.hypot(d1x - px, ay - py);
      const u2x = (d2x - px) / Math.hypot(d2x - px, ay - py);
      const u2y = (ay - py) / Math.hypot(d2x - px, ay - py);
      drawRightBox(px, py, u1x, u1y, u2x, u2y, 0.14);

      // Step 4: Sweep Apollonius Circle with diameter D1D2 and center C
      drawPt(cx, ay, 'C', pal.teal, -4, -12);
      drawCompassArc(cx, ay, rApol, 0, Math.PI * 2 * Math.max(0.25, b4), pal.teal, 3.8, false, 1);

      readouts = [
        { key: 'Target Ratio k', val: k.toFixed(2) },
        { key: 'Distances |PA|, |PB|', val: `${distPA.toFixed(3)}, ${distPB.toFixed(3)}` },
        { key: 'Measured |PA|/|PB|', val: (distPA / distPB).toFixed(4) },
        { key: 'Apollonius Radius R', val: rApol.toFixed(3) },
      ];
      tableRows = [
        ['1 · Anchors A & B', `|AB| = ${dAB.toFixed(2)}`, `Ratio k = ${k.toFixed(2)}`, `|PA| = ${k.toFixed(2)} |PB|`],
        ['2 · Internal Bisector PD₁', `D₁(${d1x.toFixed(2)}, ${ay})`, `|AD₁|/|D₁B| = ${k.toFixed(2)}`, 'Interior Angle Bisector'],
        ['3 · External Bisector PD₂', `D₂(${d2x.toFixed(2)}, ${ay})`, 'PD₁ ⊥ PD₂ (∠D₁PD₂ = 90°)', 'Harmonic Conjugate Pair'],
        ['4 · Circle on Diameter D₁D₂', `Center C(${cx.toFixed(2)}, ${ay})`, `R = k|AB|/(k²−1) = ${rApol.toFixed(3)}`, 'Exact Apollonius Locus'],
      ];
      cardLines = [
        { text: 'APOLLONIUS CIRCLE · HARMONIC BISECTOR CONSTRUCTION', color: pal.amber },
        { text: `|PA| = ${distPA.toFixed(3)},  |PB| = ${distPB.toFixed(3)}  ⇒  |PA| / |PB| = ${(distPA / distPB).toFixed(4)} = k`, color: pal.ink },
        { text: `Internal & External Bisectors Meet at 90°: ∠D₁PD₂ = 90°`, color: pal.teal },
        { text: `Thales Circle on Diameter D₁D₂ Has Radius R = k|AB|/(k²−1) = ${rApol.toFixed(3)}`, color: pal.indigo },
      ];
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
      Math.round(240 * scale),
      scale,
      cardLines.map((line, idx) => ({
        text: line.text,
        color: line.color,
        font: idx === 1 ? `600 ${Math.round(22 * scale)}px "Newsreader", serif` : undefined,
        gap: 35 * scale,
      })),
      pal.panelBorder
    );
    return { readouts, tableHeaders, tableRows };
  };
}

