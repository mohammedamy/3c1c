/* ==========================================================================
   3c1c · Client-Side Mathematical Canvas & Mobject Animation Engine
   Renders high-DPI Manim-style mathematical animations in Dark & Paper modes
   ========================================================================== */

import { FUNCTIONS, SCENE_PRESETS } from './presets.js?v=169.0';
import { attachExtendedRenderers } from './scenes_renderers.js?v=169.0';
import { attach3DRenderers } from './scenes_3d.js?v=169.0';

export const STAGE_PALETTES = {
  dark: {
    bg: '#0A0D14',
    bgGrad: '#101624',
    panel: 'rgba(20, 26, 40, 0.90)',
    panelBorder: '#26324B',
    gridMajor: 'rgba(148, 163, 184, 0.12)',
    gridMinor: 'rgba(148, 163, 184, 0.05)',
    axis: '#8292AA',
    ink: '#EEF2F6',
    inkSub: '#CBD5E1',
    muted: '#94A3B8',
    indigo: '#7DA4E8',
    indigoBright: '#93B8FA',
    indigoFill: 'rgba(125, 164, 232, 0.18)',
    amber: '#F59E0B',
    amberBright: '#FBBF24',
    amberFill: 'rgba(245, 158, 11, 0.24)',
    teal: '#2DD4BF',
    tealFill: 'rgba(45, 212, 191, 0.20)',
    rose: '#F46474',
    ok: '#34D399',
  },
  paper: {
    bg: '#FAF7F2',
    bgGrad: '#F2ECE1',
    panel: 'rgba(255, 255, 255, 0.93)',
    panelBorder: '#D5CBB9',
    gridMajor: 'rgba(19, 39, 70, 0.09)',
    gridMinor: 'rgba(19, 39, 70, 0.04)',
    axis: '#4B5668',
    ink: '#111622',
    inkSub: '#283244',
    muted: '#4B5668',
    indigo: '#132746',
    indigoBright: '#1E3E70',
    indigoFill: 'rgba(19, 39, 70, 0.14)',
    amber: '#9E6515',
    amberBright: '#B8781B',
    amberFill: 'rgba(158, 101, 21, 0.20)',
    teal: '#0C7A6F',
    tealFill: 'rgba(12, 122, 111, 0.16)',
    rose: '#C83747',
    ok: '#19633E',
  },
};

export function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

export function smooth(t) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export function spanEase(time, start, end) {
  if (end <= start) return time >= end ? 1 : 0;
  return smooth((time - start) / (end - start));
}

export class Engine3c1c {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.markImg = new Image();
    this.markLoaded = false;
    this.markImg.onload = () => {
      this.markLoaded = true;
    };
    this.markImg.src = 'web/assets/clipsat-mark.png';
    this.lastPlotMapper = null;
  }

  getDimensions(aspect) {
    if (aspect === '9:16') return { width: 1080, height: 1920 };
    if (aspect === '1:1') return { width: 1080, height: 1080 };
    return { width: 1920, height: 1080 };
  }

  syncCanvasSize(aspect) {
    const { width, height } = this.getDimensions(aspect);
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    return { width, height };
  }

  renderFrame(state) {
    const { presetId, params, time, duration, stageTheme, aspect, watermark } = state;
    const { width, height } = this.syncCanvasSize(aspect);
    const ctx = this.ctx;
    const pal = STAGE_PALETTES[stageTheme] || STAGE_PALETTES.dark;
    const scale = Math.min(width, height) / 1080;

    ctx.save();
    // 1. Editorial Stage Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, pal.bg);
    bgGrad.addColorStop(1, pal.bgGrad);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Background Coordinate Mesh
    const cell = Math.round(60 * scale);
    ctx.lineWidth = 1;
    ctx.strokeStyle = pal.gridMinor;
    ctx.beginPath();
    for (let x = cell; x < width; x += cell) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = cell; y < height; y += cell) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // 3. Stage Safe Margins & Non-Overlapping Header / Footer Zones
    const padX = Math.round(width * 0.062);
    const headerTop = Math.min(Math.round(68 * scale), Math.round(height * 0.048));
    const headerRuleY = headerTop + Math.round(56 * scale);
    const safeTopY = headerRuleY + Math.round(10 * scale);
    const footerH = Math.max(Math.round(58 * scale), Math.round(height * 0.058));
    const safeBotY = watermark ? height - footerH : height - Math.round(18 * scale);
    const plotTop = safeTopY + Math.round(10 * scale);
    const plotW = width - padX * 2;
    const plotH = safeBotY - plotTop - Math.round(10 * scale);

    this.currentSafeTopY = safeTopY;
    this.currentSafeBotY = safeBotY;

    // 4. Dispatch Scene-Specific Mobjects (Hardware-Clipped to Safe Stage Zone)
    const viewZoom = Number(state.viewZoom || 1.0);
    const panX = Number(state.panX || 0.0);
    const panY = Number(state.panY || 0.0);
    const bounds = {
      padX,
      plotTop,
      plotW,
      plotH,
      width,
      height,
      scale,
      viewZoom,
      panX,
      panY,
      safeTopY,
      safeBotY,
    };
    let telemetry = { readouts: [], tableHeaders: [], tableRows: [] };

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, safeTopY, width, Math.max(10, safeBotY - safeTopY));
    ctx.clip();

    if (presetId === 'derivative') {
      telemetry = this.drawDerivativeScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'riemann') {
      telemetry = this.drawRiemannScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'square') {
      telemetry = this.drawSquareScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'unitcircle') {
      telemetry = this.drawUnitCircleScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'linalg') {
      telemetry = this.drawLinAlgScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'qudrat') {
      telemetry = this.drawQudratScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'taylor') {
      telemetry = this.drawTaylorScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'normal') {
      telemetry = this.drawNormalScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'circle_thm') {
      telemetry = this.drawCircleThmScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'complex') {
      telemetry = this.drawComplexScene(ctx, pal, bounds, params, time, duration);
    } else if (presetId === 'grad_descent') {
      telemetry = this.drawGradDescentScene(ctx, pal, bounds, params, time, duration);
    } else {
      const preset = SCENE_PRESETS.find((p) => p.id === presetId);
      if (preset && preset.archetype === 'scene_3d' && this.draw3DScene) {
        telemetry = this.draw3DScene(preset, ctx, pal, bounds, params, time, duration);
      } else if (preset && preset.archetype && this.renderExtendedScene) {
        telemetry = this.renderExtendedScene(preset, ctx, pal, bounds, params, time, duration);
      }
    }

    ctx.restore();

    // 5. Protected Top Header Banner (CLIPSAT Track & Scene Title)
    const headerAlpha = spanEase(time, 0, 0.55);
    ctx.save();
    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, width, safeTopY - Math.round(2 * scale));
    ctx.globalAlpha = Math.max(0.25, headerAlpha);
    ctx.font = `700 ${Math.round(17 * scale)}px "JetBrains Mono", monospace`;
    ctx.fillStyle = pal.amber;
    ctx.fillText((params.track || 'CLIPSAT MATHEMATICS').toUpperCase(), padX, headerTop, plotW);

    ctx.font = `600 ${Math.round(33 * scale)}px "Newsreader", Georgia, serif`;
    ctx.fillStyle = pal.ink;
    ctx.fillText(params.title || '', padX, headerTop + Math.round(38 * scale), plotW);

    ctx.strokeStyle = pal.panelBorder;
    ctx.lineWidth = Math.max(1.5, 2 * scale);
    ctx.beginPath();
    ctx.moveTo(padX, headerRuleY);
    ctx.lineTo(padX + plotW * clamp01(time / 0.8 + 0.15), headerRuleY);
    ctx.stroke();
    ctx.restore();

    // 6. Protected ClipSAT · 3c1c Footer Watermark Band
    if (watermark) {
      this.drawWatermark(ctx, pal, width, height, padX, scale, safeBotY);
    }

    ctx.restore();
    return telemetry;
  }

  createPlotArea(ctx, pal, bounds, xMin, xMax, yMin, yMax, axisAlpha = 1, widthFrac = 0.62, isotropic = false) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height >= bounds.width * 0.95;
    const isSquare = Math.abs(bounds.height - bounds.width) < bounds.width * 0.1;
    const areaW = isTall ? plotW : Math.round(plotW * widthFrac);
    const areaH = isTall ? Math.round(plotH * (isSquare ? 0.50 : 0.54)) : plotH;
    const areaX = padX;
    const areaY = plotTop;

    if (isotropic && areaW > 0 && areaH > 0) {
      const xSpan0 = xMax - xMin;
      const ySpan0 = yMax - yMin;
      const xMid = 0.5 * (xMin + xMax);
      const yMid = 0.5 * (yMin + yMax);
      const pxAspect = areaW / areaH;
      const mathAspect = xSpan0 / ySpan0;
      if (pxAspect > mathAspect) {
        const newXSpan = ySpan0 * pxAspect;
        xMin = xMid - 0.5 * newXSpan;
        xMax = xMid + 0.5 * newXSpan;
      } else if (pxAspect < mathAspect) {
        const newYSpan = xSpan0 / pxAspect;
        yMin = yMid - 0.5 * newYSpan;
        yMax = yMid + 0.5 * newYSpan;
      }
    }

    const vz = Math.max(0.45, Math.min(3.5, Number(bounds.viewZoom || 1.0)));
    const pxOff = Number(bounds.panX || 0);
    const pyOff = Number(bounds.panY || 0);
    if (vz !== 1 || pxOff !== 0 || pyOff !== 0) {
      const xSpanZ = (xMax - xMin) / vz;
      const ySpanZ = (yMax - yMin) / vz;
      const xCenter = 0.5 * (xMin + xMax) - pxOff * xSpanZ;
      const yCenter = 0.5 * (yMin + yMax) + pyOff * ySpanZ;
      xMin = xCenter - 0.5 * xSpanZ;
      xMax = xCenter + 0.5 * xSpanZ;
      yMin = yCenter - 0.5 * ySpanZ;
      yMax = yCenter + 0.5 * ySpanZ;
    }

    const toPx = (x, y) => ({
      x: areaX + ((x - xMin) / (xMax - xMin)) * areaW,
      y: areaY + (1 - (y - yMin) / (yMax - yMin)) * areaH,
    });

    const toMath = (px, py) => ({
      x: xMin + ((px - areaX) / areaW) * (xMax - xMin),
      y: yMin + (1 - (py - areaY) / areaH) * (yMax - yMin),
    });

    this.lastPlotMapper = { toPx, toMath, areaX, areaY, areaW, areaH, xMin, xMax, yMin, yMax };

    ctx.save();
    ctx.globalAlpha = axisAlpha;

    // Subtle Plot Viewport Backdrop & Border
    ctx.fillStyle = pal.bg === '#0A0D14' ? 'rgba(16, 22, 36, 0.38)' : 'rgba(255, 255, 255, 0.42)';
    ctx.strokeStyle = pal.gridMajor;
    ctx.lineWidth = 1.2 * scale;
    this.roundRect(ctx, areaX, areaY, areaW, areaH, 10 * scale);
    ctx.fill();
    ctx.stroke();

    // Grid lines
    ctx.lineWidth = 1 * scale;
    ctx.strokeStyle = pal.gridMajor;
    for (let gx = Math.ceil(xMin); gx <= Math.floor(xMax); gx++) {
      const p = toPx(gx, 0);
      if (p.x < areaX || p.x > areaX + areaW) continue;
      ctx.beginPath();
      ctx.moveTo(p.x, areaY);
      ctx.lineTo(p.x, areaY + areaH);
      ctx.stroke();
    }
    const yStep = yMax - yMin > 12 ? 4 : 2;
    for (let gy = Math.ceil(yMin / yStep) * yStep; gy <= Math.floor(yMax); gy += yStep) {
      const p = toPx(0, gy);
      if (p.y < areaY || p.y > areaY + areaH) continue;
      ctx.beginPath();
      ctx.moveTo(areaX, p.y);
      ctx.lineTo(areaX + areaW, p.y);
      ctx.stroke();
    }

    // Main Axes
    ctx.strokeStyle = pal.axis;
    ctx.lineWidth = 2.2 * scale;
    const x0 = toPx(xMin, 0);
    const x1 = toPx(xMax, 0);
    if (x0.y >= areaY && x0.y <= areaY + areaH) {
      ctx.beginPath();
      ctx.moveTo(areaX, x0.y);
      ctx.lineTo(areaX + areaW, x1.y);
      ctx.stroke();
    }

    const y0 = toPx(0, yMin);
    const y1 = toPx(0, yMax);
    if (y0.x >= areaX && y0.x <= areaX + areaW) {
      ctx.beginPath();
      ctx.moveTo(y0.x, areaY);
      ctx.lineTo(y1.x, areaY + areaH);
      ctx.stroke();
    }

    // Origin Ring Marker
    const orig = toPx(0, 0);
    if (orig.x >= areaX && orig.x <= areaX + areaW && orig.y >= areaY && orig.y <= areaY + areaH) {
      ctx.beginPath();
      ctx.arc(orig.x, orig.y, 3.8 * scale, 0, Math.PI * 2);
      ctx.fillStyle = pal.axis;
      ctx.fill();
    }

    // Tick labels
    ctx.fillStyle = pal.muted;
    ctx.font = `500 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`;
    for (let gx = Math.ceil(xMin); gx <= Math.floor(xMax); gx++) {
      if (gx === 0) continue;
      const p = toPx(gx, 0);
      if (p.x < areaX + 14 * scale || p.x > areaX + areaW - 14 * scale) continue;
      const ty = Math.min(areaY + areaH - 6 * scale, Math.max(areaY + 18 * scale, p.y + 20 * scale));
      ctx.fillText(String(gx), p.x - 6 * scale, ty);
    }
    for (let gy = Math.ceil(yMin / yStep) * yStep; gy <= Math.floor(yMax); gy += yStep) {
      if (gy === 0) continue;
      const p = toPx(0, gy);
      if (p.y < areaY + 14 * scale || p.y > areaY + areaH - 14 * scale) continue;
      const tx = Math.min(areaX + areaW - 30 * scale, Math.max(areaX + 6 * scale, p.x + 8 * scale));
      ctx.fillText(String(gy), tx, p.y + 5 * scale);
    }

    ctx.restore();
    return { toPx, toMath, areaX, areaY, areaW, areaH, isTall };
  }

  drawCalloutCard(ctx, pal, x, y, w, h, scale, lines, accentColor) {
    ctx.save();
    const canvasW = (ctx.canvas && ctx.canvas.width) || 1920;
    const canvasH = (ctx.canvas && ctx.canvas.height) || 1080;
    const safeTopY = this.currentSafeTopY || Math.round(120 * scale);
    const safeBotY =
      this.currentSafeBotY || (canvasH - Math.max(Math.round(58 * scale), Math.round(canvasH * 0.058)));

    let totalNeededH = 28 * scale;
    for (const item of lines) {
      totalNeededH += item.gap || 32 * scale;
    }
    const rawCardH = Math.max(h, totalNeededH + 12 * scale);

    // Clamp horizontal bounds inside canvas margins
    const minPadX = Math.round(16 * scale);
    w = Math.max(Math.round(180 * scale), Math.min(w, canvasW - minPadX * 2));
    x = Math.max(minPadX, Math.min(x, canvasW - w - minPadX));

    // Clamp vertical bounds strictly inside [safeTopY + 6*scale, safeBotY - 8*scale]
    const topLimit = safeTopY + Math.round(6 * scale);
    const botLimit = safeBotY - Math.round(8 * scale);
    if (y < topLimit) y = topLimit;
    if (botLimit - y < Math.round(145 * scale)) {
      y = Math.max(topLimit, botLimit - Math.min(rawCardH, Math.round(220 * scale)));
    }
    const maxAvailH = Math.max(Math.round(110 * scale), botLimit - y);
    const vCompress = rawCardH > maxAvailH ? maxAvailH / rawCardH : 1;
    const cardH = Math.min(rawCardH, maxAvailH);

    this.lastCalloutRect = { x, y, w, h: cardH, safeTopY, safeBotY };

    // Opaque canvas under-fill so curves/axes never bleed through card text
    ctx.fillStyle = pal.bg;
    this.roundRect(ctx, x, y, w, cardH, 14 * scale);
    ctx.fill();

    ctx.fillStyle = pal.panel;
    ctx.strokeStyle = accentColor || pal.panelBorder;
    ctx.lineWidth = 2 * scale;
    this.roundRect(ctx, x, y, w, cardH, 14 * scale);
    ctx.fill();
    ctx.stroke();

    // Accent left stripe
    ctx.fillStyle = accentColor || pal.indigo;
    this.roundRect(ctx, x, y, 5.5 * scale, cardH, 3 * scale);
    ctx.fill();

    const maxTextW = Math.max(110 * scale, w - 42 * scale);
    let curY = y + 30 * scale * vCompress;
    lines.forEach((item, idx) => {
      ctx.font = item.font || `500 ${Math.round(20 * scale * Math.max(0.82, vCompress))}px "JetBrains Mono", monospace`;
      ctx.fillStyle = item.color || pal.ink;
      ctx.fillText(item.text, x + 22 * scale, curY, maxTextW);
      if (idx === 0 && lines.length > 1) {
        ctx.save();
        ctx.strokeStyle = pal.gridMajor;
        ctx.lineWidth = 1 * scale;
        ctx.beginPath();
        ctx.moveTo(x + 22 * scale, curY + 9 * scale * vCompress);
        ctx.lineTo(x + w - 18 * scale, curY + 9 * scale * vCompress);
        ctx.stroke();
        ctx.restore();
      }
      curY += (item.gap || 32 * scale) * vCompress;
    });
    ctx.restore();
  }

  drawDerivativeScene(ctx, pal, bounds, params, time, duration) {
    const fnObj = FUNCTIONS[params.fn || 'quad'] || FUNCTIONS.quad;
    const xMin = -2.0;
    const xMax = 3.8;
    const yMin = -3.0;
    const yMax = 9.5;

    const axisProg = spanEase(time, 0, 0.8);
    const plot = this.createPlotArea(ctx, pal, bounds, xMin, xMax, yMin, yMax, axisProg, 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;

    // 1. ShowCreation of primary Indigo function curve
    const curveProg = spanEase(time, 0.2, 1.4);
    if (curveProg > 0) {
      const steps = Math.max(4, Math.floor(200 * curveProg));
      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 4.5 * scale;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const x = xMin + ((xMax - xMin) * (i / 200));
        const p = toPx(x, fnObj.eval(x));
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // 2. Animated secant offset h(t) converging toward 0
    const a = Number(params.a ?? 1.2);
    const hInit = Number(params.h ?? 1.4);
    const limitProg = spanEase(time, 2.4, 5.0);
    const hNow = Math.abs(hInit) < 0.02 ? hInit : hInit * (1 - 0.985 * limitProg);
    const fa = fnObj.eval(a);
    const fah = fnObj.eval(a + hNow);
    const exactSlope = fnObj.deriv(a);
    const secantSlope = Math.abs(hNow) > 1e-3 ? (fah - fa) / hNow : exactSlope;
    const isConverged = Math.abs(hNow) < 0.06;

    const secantAlpha = spanEase(time, 1.1, 1.8);
    if (secantAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = secantAlpha;

      // Exact tangent reference (dashed Indigo)
      ctx.save();
      ctx.setLineDash([8 * scale, 6 * scale]);
      ctx.strokeStyle = pal.indigoBright;
      ctx.lineWidth = 2.2 * scale;
      const t0 = toPx(xMin, fa + exactSlope * (xMin - a));
      const t1 = toPx(xMax, fa + exactSlope * (xMax - a));
      ctx.beginPath();
      ctx.moveTo(t0.x, t0.y);
      ctx.lineTo(t1.x, t1.y);
      ctx.stroke();
      ctx.restore();

      // Rise / Run triangle
      const pa = toPx(a, fa);
      const pah = toPx(a + hNow, fah);
      const pCorner = toPx(a + hNow, fa);

      if (Math.abs(hNow) > 0.05) {
        ctx.fillStyle = pal.amberFill;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pCorner.x, pCorner.y);
        ctx.lineTo(pah.x, pah.y);
        ctx.closePath();
        ctx.fill();

        ctx.setLineDash([5 * scale, 4 * scale]);
        ctx.strokeStyle = pal.amber;
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pCorner.x, pCorner.y);
        ctx.lineTo(pah.x, pah.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Active Secant Line (Amber -> Teal on convergence)
      const lineCol = isConverged ? pal.teal : pal.amber;
      const s0 = toPx(xMin, fa + secantSlope * (xMin - a));
      const s1 = toPx(xMax, fa + secantSlope * (xMax - a));
      ctx.strokeStyle = lineCol;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      ctx.moveTo(s0.x, s0.y);
      ctx.lineTo(s1.x, s1.y);
      ctx.stroke();

      // Points a and a+h
      this.drawDot(ctx, pa.x, pa.y, 8.5 * scale, pal.indigo, pal.bg);
      this.drawDot(ctx, pah.x, pah.y, 8.5 * scale, lineCol, pal.bg);

      ctx.font = `600 ${Math.round(20 * scale)}px "Newsreader", Georgia, serif`;
      ctx.fillStyle = pal.ink;
      ctx.fillText(`a = ${a.toFixed(2)}`, pa.x - 30 * scale, pa.y + 30 * scale);
      ctx.restore();
    }

    // 3. Rigor & Symbolic Readout Card on Stage
    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const cardH = Math.round(290 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'DIFFERENCE QUOTIENT → DERIVATIVE',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `Function: ${fnObj.label}`,
          font: `600 ${Math.round(25 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.ink,
          gap: 38 * scale,
        },
        {
          text: `Point a = ${a.toFixed(2)}   |   Offset h = ${hNow.toFixed(3)}`,
          font: `500 ${Math.round(19 * scale)}px "JetBrains Mono", monospace`,
          color: pal.muted,
          gap: 36 * scale,
        },
        {
          text: `Secant m = Δf/h = ${secantSlope.toFixed(3)}`,
          font: `600 ${Math.round(22 * scale)}px "JetBrains Mono", monospace`,
          color: isConverged ? pal.teal : pal.amber,
          gap: 36 * scale,
        },
        {
          text: `Exact Derivative f'(a) = ${exactSlope.toFixed(3)}`,
          font: `600 ${Math.round(22 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 34 * scale,
        },
        {
          text: `Tangent: y = ${fa.toFixed(2)} + ${exactSlope.toFixed(2)}(x − ${a.toFixed(2)})`,
          font: `500 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`,
          color: pal.inkSub,
          gap: 26 * scale,
        },
      ],
      isConverged ? pal.teal : pal.panelBorder
    );

    // Sampled table for Accessible View as Data
    const sampleXs = [-1.0, -0.25, 0.5, 1.2, 1.8, 2.4, 3.0];
    const tableRows = sampleXs.map((sx) => [
      sx.toFixed(2),
      fnObj.eval(sx).toFixed(3),
      (fa + exactSlope * (sx - a)).toFixed(3),
      (fa + secantSlope * (sx - a)).toFixed(3),
    ]);

    return {
      readouts: [
        { key: 'f(a)', val: fa.toFixed(3) },
        { key: 'Offset h(t)', val: hNow.toFixed(3) },
        { key: 'Secant Slope', val: secantSlope.toFixed(3) },
        { key: "Exact f'(a)", val: exactSlope.toFixed(3) },
      ],
      tableHeaders: ['x', 'f(x)', 'Tangent y', 'Secant y'],
      tableRows,
    };
  }

  drawRiemannScene(ctx, pal, bounds, params, time, duration) {
    const fnObj = FUNCTIONS[params.fn || 'quad'] || FUNCTIONS.quad;
    const xMin = -0.5;
    const xMax = 3.6;
    const yMin = -2.5;
    const yMax = 9.0;

    const plot = this.createPlotArea(ctx, pal, bounds, xMin, xMax, yMin, yMax, spanEase(time, 0, 0.7), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;

    const a = 0.0;
    const b = Number(params.b ?? 3.0);
    const targetN = Math.max(2, Math.round(Number(params.n ?? 24)));
    const rule = params.rule || 'left';

    const refProg = spanEase(time, 1.0, 5.6);
    const activeN = Math.max(2, Math.round(4 + (targetN - 4) * refProg));
    const dx = (b - a) / activeN;

    let approxSum = 0;
    const tableRows = [];
    const rectAlpha = Math.max(0.18, spanEase(time, 0.9, 1.6));

    ctx.save();
    ctx.globalAlpha = rectAlpha;
    for (let i = 0; i < activeN; i++) {
      const x0 = a + i * dx;
      const x1 = x0 + dx;
      let sampleX = x0;
      if (rule === 'right') sampleX = x1;
      else if (rule === 'midpoint') sampleX = 0.5 * (x0 + x1);

      const hVal =
        rule === 'trapezoid' ? 0.5 * (fnObj.eval(x0) + fnObj.eval(x1)) : fnObj.eval(sampleX);
      const area = hVal * dx;
      approxSum += area;

      if (i < 10) {
        tableRows.push([
          String(i + 1),
          `[${x0.toFixed(2)}, ${x1.toFixed(2)}]`,
          sampleX.toFixed(2),
          hVal.toFixed(3),
          area.toFixed(3),
        ]);
      }

      const pTopLeft = toPx(x0, Math.max(0, hVal));
      const pBotRight = toPx(x1, Math.min(0, hVal));
      ctx.fillStyle = hVal >= 0 ? pal.amberFill : pal.indigoFill;
      ctx.strokeStyle = hVal >= 0 ? pal.amber : pal.indigo;
      ctx.lineWidth = 1.4 * scale;

      if (rule === 'trapezoid') {
        const p0Base = toPx(x0, 0);
        const p0Top = toPx(x0, fnObj.eval(x0));
        const p1Top = toPx(x1, fnObj.eval(x1));
        const p1Base = toPx(x1, 0);
        ctx.beginPath();
        ctx.moveTo(p0Base.x, p0Base.y);
        ctx.lineTo(p0Top.x, p0Top.y);
        ctx.lineTo(p1Top.x, p1Top.y);
        ctx.lineTo(p1Base.x, p1Base.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(
          pTopLeft.x,
          pTopLeft.y,
          pBotRight.x - pTopLeft.x,
          pBotRight.y - pTopLeft.y
        );
        ctx.strokeRect(
          pTopLeft.x,
          pTopLeft.y,
          pBotRight.x - pTopLeft.x,
          pBotRight.y - pTopLeft.y
        );
      }
    }
    ctx.restore();

    // Curve on top + live quadrature scan probe
    ctx.save();
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 4.5 * scale;
    ctx.beginPath();
    for (let i = 0; i <= 180; i++) {
      const x = xMin + ((xMax - xMin) * i) / 180;
      const p = toPx(x, fnObj.eval(x));
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    const xScan = a + (b - a) * (0.5 + 0.45 * Math.sin(time * 1.65));
    const pScan = toPx(xScan, fnObj.eval(xScan));
    this.drawDot(ctx, pScan.x, pScan.y, 7.2 * scale, pal.teal, pal.bg);
    ctx.restore();

    const exactVal = fnObj.anti(b) - fnObj.anti(a);
    const errVal = Math.abs(exactVal - approxSum);

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const cardH = Math.round(285 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: `RIEMANN PARTITION · ${rule.toUpperCase()} RULE`,
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `Interval [0.00, ${b.toFixed(2)}]  ·  n = ${activeN}`,
          font: `600 ${Math.round(24 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.ink,
          gap: 36 * scale,
        },
        {
          text: `Subinterval width Δx = ${dx.toFixed(4)}`,
          font: `500 ${Math.round(19 * scale)}px "JetBrains Mono", monospace`,
          color: pal.muted,
          gap: 36 * scale,
        },
        {
          text: `Riemann Sum ≈ ${approxSum.toFixed(4)}`,
          font: `600 ${Math.round(22 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 36 * scale,
        },
        {
          text: `Exact ∫ f(x)dx = ${exactVal.toFixed(4)}`,
          font: `600 ${Math.round(22 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 34 * scale,
        },
        {
          text: `Absolute Error |E_n| = ${errVal.toFixed(4)}`,
          font: `500 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`,
          color: errVal < 0.15 ? pal.teal : pal.inkSub,
          gap: 26 * scale,
        },
      ],
      errVal < 0.15 ? pal.teal : pal.panelBorder
    );

    return {
      readouts: [
        { key: 'Partitions n', val: String(activeN) },
        { key: 'Width Δx', val: dx.toFixed(3) },
        { key: 'Riemann Sum', val: approxSum.toFixed(3) },
        { key: 'Exact ∫f(x)dx', val: exactVal.toFixed(3) },
      ],
      tableHeaders: ['i', '[x, x+Δx]', 'x*', 'f(x*)', 'Area'],
      tableRows,
    };
  }

  drawSquareScene(ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height >= bounds.width * 0.95;
    const isSquare = isTall && bounds.height < bounds.width * 1.15;
    const xVal = Number(params.xVal ?? 2.2);
    const bVal = Number(params.bVal ?? 1.6);
    const bHalf = bVal / 2;

    const unitPx = Math.min(plotW * (isTall ? 0.60 : 0.42), plotH * (isTall ? (isSquare ? 0.39 : 0.43) : 0.68)) / (xVal + bHalf + 0.8);
    const xPx = xVal * unitPx;
    const bHalfPx = bHalf * unitPx;

    const splitProg = spanEase(time, 1.0, 3.2);
    const gapPx = (1 - splitProg) * 28 * scale + (6 + 2.2 * Math.sin(time * 2.1)) * scale;
    const cornerProg = spanEase(time, 2.6, 5.4);

    const originX = padX + Math.round(plotW * (isTall ? 0.20 : 0.08));
    const originY = plotTop + Math.round(plotH * (isTall ? 0.06 : 0.14));

    // 1. x^2 Indigo Square
    const x2Alpha = spanEase(time, 0, 1.0);
    ctx.save();
    ctx.globalAlpha = x2Alpha;
    ctx.fillStyle = pal.indigoFill;
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 3.5 * scale;
    this.roundRect(ctx, originX, originY, xPx, xPx, 8 * scale);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = pal.ink;
    ctx.font = `600 ${Math.round(32 * scale)}px "Newsreader", Georgia, serif`;
    ctx.fillText('x²', originX + xPx * 0.43, originY + xPx * 0.54);
    ctx.font = `500 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`;
    ctx.fillStyle = pal.muted;
    ctx.fillText(`=${(xVal * xVal).toFixed(2)}`, originX + xPx * 0.36, originY + xPx * 0.68);
    ctx.restore();

    // 2. Two Teal (b/2)x rectangles
    const stripAlpha = spanEase(time, 1.1, 2.2);
    if (stripAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = stripAlpha;
      ctx.fillStyle = pal.tealFill;
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 3 * scale;

      // Right strip
      this.roundRect(ctx, originX + xPx + gapPx, originY, bHalfPx, xPx, 6 * scale);
      ctx.fill();
      ctx.stroke();

      // Bottom strip
      this.roundRect(ctx, originX, originY + xPx + gapPx, xPx, bHalfPx, 6 * scale);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = pal.ink;
      ctx.font = `600 ${Math.round(20 * scale)}px "Newsreader", Georgia, serif`;
      ctx.fillText('(b/2)x', originX + xPx + gapPx + bHalfPx * 0.14, originY + xPx * 0.52);
      ctx.fillText('(b/2)x', originX + xPx * 0.40, originY + xPx + gapPx + bHalfPx * 0.62);
      ctx.restore();
    }

    // 3. Completing the Amber (b/2)^2 corner square
    if (cornerProg > 0) {
      ctx.save();
      ctx.globalAlpha = cornerProg;
      ctx.fillStyle = pal.amberFill;
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3.5 * scale;
      this.roundRect(
        ctx,
        originX + xPx + gapPx,
        originY + xPx + gapPx,
        bHalfPx,
        bHalfPx,
        6 * scale
      );
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = pal.amber;
      ctx.font = `700 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`;
      ctx.fillText(
        '(b/2)²',
        originX + xPx + gapPx + bHalfPx * 0.12,
        originY + xPx + gapPx + bHalfPx * 0.58
      );
      ctx.restore();
    }

    const totalSquare = Math.pow(xVal + bHalf, 2);
    const cardX = isTall ? padX : padX + Math.round(plotW * 0.54);
    const cardY = isTall ? plotTop + Math.round(plotH * (isSquare ? 0.55 : 0.60)) : originY;
    const cardW = isTall ? plotW : Math.round(plotW * 0.46);
    const cardH = Math.round(285 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'DIGITAL SAT · ALGEBRAIC STRUCTURE',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: 'x² + bx + (b/2)² = (x + b/2)²',
          font: `600 ${Math.round(26 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.ink,
          gap: 38 * scale,
        },
        {
          text: `x = ${xVal.toFixed(2)}   |   b = ${bVal.toFixed(2)}   |   b/2 = ${bHalf.toFixed(2)}`,
          font: `500 ${Math.round(19 * scale)}px "JetBrains Mono", monospace`,
          color: pal.muted,
          gap: 36 * scale,
        },
        {
          text: `Indigo x² Area = ${(xVal * xVal).toFixed(3)}`,
          font: `500 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 34 * scale,
        },
        {
          text: `Two Teal Strips 2·(b/2)x = ${(bVal * xVal).toFixed(3)}`,
          font: `500 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.teal,
          gap: 34 * scale,
        },
        {
          text: `Amber Corner (b/2)² = ${(bHalf * bHalf).toFixed(3)} → Total = ${totalSquare.toFixed(3)}`,
          font: `600 ${Math.round(19 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 28 * scale,
        },
      ],
      cornerProg > 0.8 ? pal.amber : pal.panelBorder
    );

    return {
      readouts: [
        { key: 'Core x²', val: (xVal * xVal).toFixed(2) },
        { key: 'Linear bx', val: (bVal * xVal).toFixed(2) },
        { key: 'Corner (b/2)²', val: (bHalf * bHalf).toFixed(2) },
        { key: '(x + b/2)²', val: totalSquare.toFixed(2) },
      ],
      tableHeaders: ['Region', 'Symbolic', 'Dimensions', 'Area'],
      tableRows: [
        ['Core Square', 'x²', `${xVal.toFixed(2)} × ${xVal.toFixed(2)}`, (xVal * xVal).toFixed(3)],
        ['Right Strip', '(b/2)x', `${bHalf.toFixed(2)} × ${xVal.toFixed(2)}`, (bHalf * xVal).toFixed(3)],
        ['Bottom Strip', '(b/2)x', `${xVal.toFixed(2)} × ${bHalf.toFixed(2)}`, (bHalf * xVal).toFixed(3)],
        ['Missing Corner', '(b/2)²', `${bHalf.toFixed(2)} × ${bHalf.toFixed(2)}`, (bHalf * bHalf).toFixed(3)],
        ['Completed Square', '(x+b/2)²', `${(xVal + bHalf).toFixed(2)}²`, totalSquare.toFixed(3)],
      ],
    };
  }

  drawUnitCircleScene(ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height >= bounds.width * 0.95;
    const isSquare = isTall && bounds.height < bounds.width * 1.15;
    const baseDeg = Number(params.thetaDeg ?? 60);
    const sweepProg = spanEase(time, 0.8, 5.8);
    const degNow = baseDeg + sweepProg * 120 + 6 * Math.sin(time * 2.0);
    const rad = (degNow * Math.PI) / 180;
    const cosV = Math.cos(rad);
    const sinV = Math.sin(rad);

    const cx = padX + Math.round(plotW * (isTall ? 0.50 : 0.25));
    const cy = plotTop + Math.round(plotH * (isTall ? (isSquare ? 0.27 : 0.29) : 0.50));
    const radius = Math.round(Math.min(plotW * (isTall ? 0.30 : 0.22), plotH * (isTall ? (isSquare ? 0.20 : 0.23) : 0.38)));

    this.lastPlotMapper = {
      unitCircle: { cx, cy, radius },
    };

    // Axes & Unit Circle
    ctx.save();
    ctx.strokeStyle = pal.axis;
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(cx - radius * 1.25, cy);
    ctx.lineTo(cx + radius * 1.25, cy);
    ctx.moveTo(cx, cy - radius * 1.25);
    ctx.lineTo(cx, cy + radius * 1.25);
    ctx.stroke();

    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 3.8 * scale;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    const px = cx + radius * cosV;
    const py = cy - radius * sinV;

    // Reference triangle
    ctx.fillStyle = pal.amberFill;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, cy);
    ctx.lineTo(px, py);
    ctx.closePath();
    ctx.fill();

    // cos (Teal) & sin (Amber) & radius (Indigo)
    ctx.strokeStyle = pal.teal;
    ctx.lineWidth = 4.5 * scale;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, cy);
    ctx.stroke();

    ctx.strokeStyle = pal.amber;
    ctx.beginPath();
    ctx.moveTo(px, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    ctx.strokeStyle = pal.indigoBright;
    ctx.lineWidth = 3.5 * scale;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    this.drawDot(ctx, px, py, 8.5 * scale, pal.amber, pal.bg);
    ctx.restore();

    const cardX = isTall ? padX : padX + Math.round(plotW * 0.54);
    const cardY = isTall ? plotTop + Math.round(plotH * (isSquare ? 0.55 : 0.58)) : plotTop + Math.round(24 * scale);
    const cardW = isTall ? plotW : Math.round(plotW * 0.46);
    const cardH = Math.round(285 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'UNIT CIRCLE · PYTHAGOREAN IDENTITY',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `Angle θ = ${degNow.toFixed(1)}°  (${(rad / Math.PI).toFixed(2)}π rad)`,
          font: `600 ${Math.round(25 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.ink,
          gap: 38 * scale,
        },
        {
          text: `cos θ (Teal horizontal) = ${cosV.toFixed(4)}`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.teal,
          gap: 35 * scale,
        },
        {
          text: `sin θ (Amber vertical)  = ${sinV.toFixed(4)}`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 35 * scale,
        },
        {
          text: `tan θ = sin θ / cos θ   = ${(Math.abs(cosV) > 1e-3 ? sinV / cosV : Infinity).toFixed(4)}`,
          font: `500 ${Math.round(19 * scale)}px "JetBrains Mono", monospace`,
          color: pal.muted,
          gap: 35 * scale,
        },
        {
          text: `cos²θ + sin²θ = ${(cosV * cosV + sinV * sinV).toFixed(4)} ✓`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 28 * scale,
        },
      ],
      pal.panelBorder
    );

    const specialAngles = [0, 30, 45, 60, 90, 120, 180];
    const tableRows = specialAngles.map((deg) => {
      const r = (deg * Math.PI) / 180;
      return [
        `${deg}°`,
        Math.cos(r).toFixed(3),
        Math.sin(r).toFixed(3),
        (Math.pow(Math.cos(r), 2) + Math.pow(Math.sin(r), 2)).toFixed(3),
      ];
    });

    return {
      readouts: [
        { key: 'Angle θ', val: `${degNow.toFixed(1)}°` },
        { key: 'cos θ', val: cosV.toFixed(3) },
        { key: 'sin θ', val: sinV.toFixed(3) },
        { key: 'cos²θ + sin²θ', val: '1.000' },
      ],
      tableHeaders: ['Angle θ', 'cos θ', 'sin θ', 'cos²θ + sin²θ'],
      tableRows,
    };
  }

  drawLinAlgScene(ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height >= bounds.width * 0.95;
    const isSquare = isTall && bounds.height < bounds.width * 1.15;
    const warpProg = clamp01(spanEase(time, 0.6, 5.4) - 0.03 * Math.sin(time * 2.1));

    const m11 = 1 + warpProg * (Number(params.m11 ?? 1.8) - 1);
    const m12 = warpProg * Number(params.m12 ?? 0.6);
    const m21 = warpProg * Number(params.m21 ?? 0.4);
    const m22 = 1 + warpProg * (Number(params.m22 ?? 1.4) - 1);
    const det = m11 * m22 - m12 * m21;

    const cx = padX + Math.round(plotW * (isTall ? 0.50 : 0.30));
    const cy = plotTop + Math.round(plotH * (isTall ? (isSquare ? 0.27 : 0.29) : 0.52));
    const unit = Math.min(plotW, plotH) * (isTall ? (isSquare ? 0.068 : 0.076) : 0.105);

    const mapVec = (x, y) => ({
      x: cx + (m11 * x + m12 * y) * unit,
      y: cy - (m21 * x + m22 * y) * unit,
    });

    // Transformed coordinate lattice
    ctx.save();
    ctx.strokeStyle = pal.indigoFill;
    ctx.lineWidth = 2 * scale;
    for (let k = -3; k <= 3; k++) {
      const a0 = mapVec(k, -3);
      const a1 = mapVec(k, 3);
      ctx.beginPath();
      ctx.moveTo(a0.x, a0.y);
      ctx.lineTo(a1.x, a1.y);
      ctx.stroke();

      const b0 = mapVec(-3, k);
      const b1 = mapVec(3, k);
      ctx.beginPath();
      ctx.moveTo(b0.x, b0.y);
      ctx.lineTo(b1.x, b1.y);
      ctx.stroke();
    }

    // Determinant parallelogram for unit square
    const p00 = mapVec(0, 0);
    const p10 = mapVec(1, 0);
    const p11 = mapVec(1, 1);
    const p01 = mapVec(0, 1);
    ctx.fillStyle = pal.amberFill;
    ctx.strokeStyle = pal.amber;
    ctx.lineWidth = 2.5 * scale;
    ctx.beginPath();
    ctx.moveTo(p00.x, p00.y);
    ctx.lineTo(p10.x, p10.y);
    ctx.lineTo(p11.x, p11.y);
    ctx.lineTo(p01.x, p01.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Basis vectors e1 (Teal) and e2 (Amber)
    this.drawArrow(ctx, p00.x, p00.y, p10.x, p10.y, pal.teal, 4.5 * scale);
    this.drawArrow(ctx, p00.x, p00.y, p01.x, p01.y, pal.amber, 4.5 * scale);
    ctx.restore();

    const trace = m11 + m22;
    const disc = trace * trace - 4 * det;
    const eigText =
      disc >= 0
        ? `λ₁ = ${((trace + Math.sqrt(disc)) / 2).toFixed(2)},  λ₂ = ${((trace - Math.sqrt(disc)) / 2).toFixed(2)}`
        : 'Complex eigenvalues (rotation)';

    const cardX = isTall ? padX : padX + Math.round(plotW * 0.56);
    const cardY = isTall ? plotTop + Math.round(plotH * 0.57) : plotTop + Math.round(24 * scale);
    const cardW = isTall ? plotW : Math.round(plotW * 0.44);
    const cardH = Math.round(285 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'LINEAR ALGEBRA · MATRIX WARP',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `A(t) = [ [${m11.toFixed(2)}, ${m12.toFixed(2)}], [${m21.toFixed(2)}, ${m22.toFixed(2)}] ]`,
          font: `600 ${Math.round(21 * scale)}px "JetBrains Mono", monospace`,
          color: pal.ink,
          gap: 38 * scale,
        },
        {
          text: `î → (${m11.toFixed(2)}, ${m21.toFixed(2)})  [Teal Basis]`,
          font: `500 ${Math.round(19 * scale)}px "JetBrains Mono", monospace`,
          color: pal.teal,
          gap: 34 * scale,
        },
        {
          text: `ĵ → (${m12.toFixed(2)}, ${m22.toFixed(2)})  [Amber Basis]`,
          font: `500 ${Math.round(19 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 36 * scale,
        },
        {
          text: `Area Scale det(A) = ${det.toFixed(3)}`,
          font: `600 ${Math.round(22 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 34 * scale,
        },
        {
          text: `Spectrum: ${eigText}`,
          font: `500 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`,
          color: pal.inkSub,
          gap: 28 * scale,
        },
      ],
      pal.panelBorder
    );

    const sampleVecs = [
      [1, 0],
      [0, 1],
      [1, 1],
      [-1, 1],
      [2, -1],
    ];
    const tableRows = sampleVecs.map(([vx, vy]) => [
      `(${vx}, ${vy})`,
      `(${(m11 * vx + m12 * vy).toFixed(2)}, ${(m21 * vx + m22 * vy).toFixed(2)})`,
      Math.hypot(vx, vy).toFixed(2),
      Math.hypot(m11 * vx + m12 * vy, m21 * vx + m22 * vy).toFixed(2),
    ]);

    return {
      readouts: [
        { key: 'det(A)', val: det.toFixed(3) },
        { key: 'trace(A)', val: trace.toFixed(3) },
        { key: 'Image of î', val: `(${m11.toFixed(1)}, ${m21.toFixed(1)})` },
        { key: 'Image of ĵ', val: `(${m12.toFixed(1)}, ${m22.toFixed(1)})` },
      ],
      tableHeaders: ['Vector v', 'Image Av', '||v||', '||Av||'],
      tableRows,
    };
  }

  drawQudratScene(ctx, pal, bounds, params, time, duration) {
    const xMin = -1.5;
    const xMax = 4.6;
    const yMin = -1.0;
    const yMax = 22.0;

    const plot = this.createPlotArea(ctx, pal, bounds, xMin, xMax, yMin, yMax, spanEase(time, 0, 0.7), 0.60);
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;

    const fnA = (x) => Math.pow(2, x);
    const fnB = (x) => x * x + 2;

    // Curve A: 2^x (Indigo)
    const progA = spanEase(time, 0.2, 1.5);
    ctx.save();
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 4.5 * scale;
    ctx.beginPath();
    for (let i = 0; i <= Math.floor(180 * progA); i++) {
      const x = xMin + ((xMax - xMin) * i) / 180;
      const p = toPx(x, fnA(x));
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    // Curve B: x^2 + 2 (Amber)
    const progB = spanEase(time, 1.2, 2.5);
    if (progB > 0) {
      ctx.strokeStyle = pal.amber;
      ctx.beginPath();
      for (let i = 0; i <= Math.floor(180 * progB); i++) {
        const x = xMin + ((xMax - xMin) * i) / 180;
        const p = toPx(x, fnB(x));
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.restore();

    const baseProbe = Number(params.xProbe ?? 3.2);
    const xProbe = Math.max(-1.0, Math.min(4.45, baseProbe + 0.65 * Math.sin(time * 1.45) * spanEase(time, 1.8, 3.0)));
    const valA = fnA(xProbe);
    const valB = fnB(xProbe);
    const pA = toPx(xProbe, valA);
    const pB = toPx(xProbe, valB);

    if (time > 1.8) {
      ctx.save();
      ctx.setLineDash([6 * scale, 5 * scale]);
      ctx.strokeStyle = pal.teal;
      ctx.lineWidth = 2.5 * scale;
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
      ctx.restore();

      this.drawDot(ctx, pA.x, pA.y, 8 * scale, pal.indigo, pal.bg);
      this.drawDot(ctx, pB.x, pB.y, 8 * scale, pal.amber, pal.bg);
    }

    const verdict =
      Math.abs(valA - valB) < 0.05
        ? 'Choice C (Equal at x₀)'
        : valA > valB
        ? 'Column A > Column B at x₀'
        : 'Column B > Column A at x₀';

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const cardH = Math.round(285 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'QIYAS GAT QUDRAT · قارن بين القيمتين',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `Test Probe x₀ = ${xProbe.toFixed(2)}`,
          font: `600 ${Math.round(25 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.ink,
          gap: 38 * scale,
        },
        {
          text: `Column A (2ˣ)     = ${valA.toFixed(3)}`,
          font: `600 ${Math.round(21 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 35 * scale,
        },
        {
          text: `Column B (x² + 2) = ${valB.toFixed(3)}`,
          font: `600 ${Math.round(21 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 35 * scale,
        },
        {
          text: `At x₀: ${verdict}`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.teal,
          gap: 34 * scale,
        },
        {
          text: 'Global on ℝ: Choice D (crosses near x ≈ 4.26)',
          font: `500 ${Math.round(17 * scale)}px "JetBrains Mono", monospace`,
          color: pal.inkSub,
          gap: 26 * scale,
        },
      ],
      pal.panelBorder
    );

    const probes = [0, 1, 2, 3, 4, 4.26, 4.5];
    const tableRows = probes.map((px) => {
      const a = fnA(px);
      const b = fnB(px);
      return [px.toFixed(2), a.toFixed(2), b.toFixed(2), a > b ? 'A > B' : a < b ? 'B > A' : 'A = B'];
    });

    return {
      readouts: [
        { key: 'Probe x₀', val: xProbe.toFixed(2) },
        { key: 'Column A (2ˣ)', val: valA.toFixed(2) },
        { key: 'Column B (x²+2)', val: valB.toFixed(2) },
        { key: 'Global Answer', val: 'Choice D' },
      ],
      tableHeaders: ['x', 'Col A: 2ˣ', 'Col B: x²+2', 'Comparison'],
      tableRows,
    };
  }

  /* ========================================================================
   * 7. TAYLOR SERIES & MACLAURIN POLYNOMIAL APPROXIMATION
   * ======================================================================== */
  drawTaylorScene(ctx, pal, bounds, params, time, duration) {
    const xMin = -6.5;
    const xMax = 6.5;
    const yMin = -2.2;
    const yMax = 2.2;

    const plot = this.createPlotArea(
      ctx,
      pal,
      bounds,
      xMin,
      xMax,
      yMin,
      yMax,
      spanEase(time, 0, 0.7),
      0.60
    );
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;

    const maxDeg = Math.max(1, Math.min(9, Number(params.degree ?? 5) | 1));
    const baseEval = Math.max(-5.5, Math.min(5.5, Number(params.xEval ?? 2.2)));
    const xEval = Math.max(-5.5, Math.min(5.5, baseEval + 0.75 * Math.sin(time * 1.4) * spanEase(time, 2.0, 3.2)));

    const fact = (m) => {
      let r = 1;
      for (let i = 2; i <= m; i++) r *= i;
      return r;
    };
    const taylorSin = (x, deg) => {
      let sum = 0;
      const terms = Math.floor((deg + 1) / 2);
      for (let k = 0; k < terms; k++) {
        const p = 2 * k + 1;
        sum += (k % 2 === 0 ? 1 : -1) * Math.pow(x, p) / fact(p);
      }
      return sum;
    };

    // 1. Primary Indigo sin(x) curve
    const pDraw = spanEase(time, 0.15, 1.4);
    if (pDraw > 0) {
      const steps = Math.max(8, Math.floor(200 * pDraw));
      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 4.2 * scale;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const x = xMin + ((xMax - xMin) * i) / 200;
        const p = toPx(x, Math.sin(x));
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // 2. Maclaurin polynomial T_n(x)
    const polyProg = spanEase(time, duration * 0.16, duration * 0.78);
    const oddDegrees = [1, 3, 5, 7, 9].filter((d) => d <= maxDeg);
    const activeIdx = Math.min(
      oddDegrees.length - 1,
      Math.floor(polyProg * oddDegrees.length)
    );
    const activeDeg = time >= duration * 0.78 ? maxDeg : oddDegrees[activeIdx] || 1;

    if (time > duration * 0.14) {
      for (const d of oddDegrees) {
        if (d < activeDeg) {
          ctx.save();
          ctx.globalAlpha = 0.28;
          ctx.strokeStyle = pal.teal;
          ctx.lineWidth = 2.2 * scale;
          ctx.beginPath();
          for (let i = 0; i <= 200; i++) {
            const x = xMin + ((xMax - xMin) * i) / 200;
            const y = Math.max(-2.6, Math.min(2.6, taylorSin(x, d)));
            const p = toPx(x, y);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
          ctx.restore();
        }
      }

      ctx.save();
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 3.8 * scale;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const x = xMin + ((xMax - xMin) * i) / 200;
        const y = Math.max(-2.6, Math.min(2.6, taylorSin(x, activeDeg)));
        const p = toPx(x, y);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    const exactVal = Math.sin(xEval);
    const approxVal = taylorSin(xEval, activeDeg);
    const absErr = Math.abs(exactVal - approxVal);

    const pExact = toPx(xEval, exactVal);
    const pApprox = toPx(xEval, Math.max(yMin, Math.min(yMax, approxVal)));

    ctx.save();
    ctx.strokeStyle = pal.rose;
    ctx.lineWidth = 2.4 * scale;
    ctx.setLineDash([5 * scale, 4 * scale]);
    ctx.beginPath();
    ctx.moveTo(pExact.x, pExact.y);
    ctx.lineTo(pApprox.x, pApprox.y);
    ctx.stroke();
    ctx.restore();

    this.drawDot(ctx, pExact.x, pExact.y, 7.5 * scale, pal.indigo, pal.bg);
    this.drawDot(ctx, pApprox.x, pApprox.y, 7.5 * scale, pal.amber, pal.bg);

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const cardH = Math.round(280 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'MACLAURIN POLYNOMIAL FOR sin(x)',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `Active Degree n = ${activeDeg}  (Target ${maxDeg})`,
          font: `600 ${Math.round(24 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.ink,
          gap: 36 * scale,
        },
        {
          text: `Probe x₀       = ${xEval.toFixed(2)} rad`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.teal,
          gap: 34 * scale,
        },
        {
          text: `Exact sin(x₀)  = ${exactVal >= 0 ? '+' : ''}${exactVal.toFixed(5)}`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 34 * scale,
        },
        {
          text: `Poly T_${activeDeg}(x₀)   = ${approxVal >= 0 ? '+' : ''}${approxVal.toFixed(5)}`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `Error |R_${activeDeg}(x₀)| = ${absErr.toExponential(2)}`,
          font: `500 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`,
          color: pal.rose,
          gap: 26 * scale,
        },
      ],
      pal.panelBorder
    );

    const tableRows = [1, 3, 5, 7, 9].map((d) => {
      const tv = taylorSin(xEval, d);
      const err = Math.abs(exactVal - tv);
      return [`T_${d}(x)`, tv.toFixed(5), exactVal.toFixed(5), err.toExponential(2)];
    });

    return {
      readouts: [
        { key: 'Degree n', val: `${activeDeg}` },
        { key: 'Probe x₀', val: xEval.toFixed(2) },
        { key: 'Tₙ(x₀)', val: approxVal.toFixed(4) },
        { key: '|Error|', val: absErr.toExponential(2) },
      ],
      tableHeaders: ['Order', 'Tₙ(x₀)', 'sin(x₀)', '|Error|'],
      tableRows,
    };
  }

  /* ========================================================================
   * 8. NORMAL DISTRIBUTION & EMPIRICAL Z-SCORE AREA
   * ======================================================================== */
  drawNormalScene(ctx, pal, bounds, params, time, duration) {
    const xMin = -3.6;
    const xMax = 3.6;
    const yMin = -0.05;
    const yMax = 0.46;

    const plot = this.createPlotArea(
      ctx,
      pal,
      bounds,
      xMin,
      xMax,
      yMin,
      yMax,
      spanEase(time, 0, 0.7),
      0.60
    );
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;

    const pdf = (z) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
    const erf = (x) => {
      const sign = x >= 0 ? 1 : -1;
      const ax = Math.abs(x);
      const t = 1 / (1 + 0.3275911 * ax);
      const y =
        1 -
        (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
          0.254829592) *
          t) *
          Math.exp(-ax * ax);
      return sign * y;
    };

    const targetZ = Math.max(0.2, Math.min(3.2, Number(params.zCutoff ?? 1.96)));
    const sweepProg = spanEase(time, duration * 0.14, duration * 0.78);
    const zBreath = 0.08 * Math.sin(time * 1.8) * spanEase(time, 3.2, 4.6);
    const z0 = Math.max(0.15, time < duration * 0.12 ? 0.15 + time * 0.4 : 0.15 + (targetZ - 0.15) * sweepProg + zBreath);

    if (time > duration * 0.05) {
      ctx.save();
      ctx.beginPath();
      const steps = 120;
      const pStart = toPx(-z0, 0);
      ctx.moveTo(pStart.x, pStart.y);
      for (let i = 0; i <= steps; i++) {
        const z = -z0 + (2 * z0 * i) / steps;
        const pt = toPx(z, pdf(z));
        ctx.lineTo(pt.x, pt.y);
      }
      const pEnd = toPx(z0, 0);
      ctx.lineTo(pEnd.x, pEnd.y);
      ctx.closePath();
      ctx.fillStyle = pal.amberFill;
      ctx.fill();
      ctx.strokeStyle = pal.amber;
      ctx.lineWidth = 2.2 * scale;
      ctx.stroke();
      ctx.restore();
    }

    const pCurve = spanEase(time, 0.15, 1.4);
    if (pCurve > 0) {
      const steps = Math.max(8, Math.floor(180 * pCurve));
      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 4.2 * scale;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const z = xMin + ((xMax - xMin) * i) / 180;
        const p = toPx(z, pdf(z));
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    const pLeft = toPx(-z0, pdf(-z0));
    const pRight = toPx(z0, pdf(z0));
    this.drawDot(ctx, pLeft.x, pLeft.y, 7 * scale, pal.amber, pal.bg);
    this.drawDot(ctx, pRight.x, pRight.y, 7 * scale, pal.amber, pal.bg);

    const centralProb = erf(z0 / Math.sqrt(2));
    const tailProb = 1 - centralProb;

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const cardH = Math.round(280 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'STANDARD NORMAL Z-SCORE TABLE',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `Bounds: [−${z0.toFixed(2)}σ, +${z0.toFixed(2)}σ]`,
          font: `600 ${Math.round(24 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.ink,
          gap: 36 * scale,
        },
        {
          text: `P(|Z| ≤ z₀)   = ${(centralProb * 100).toFixed(2)}%`,
          font: `600 ${Math.round(21 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 35 * scale,
        },
        {
          text: `Cumulative Φ  = ${(0.5 + 0.5 * centralProb).toFixed(4)}`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.teal,
          gap: 34 * scale,
        },
        {
          text: `Two-Tail Area = ${(tailProb * 100).toFixed(2)}%`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 34 * scale,
        },
        {
          text: 'Empirical Rule: 68.27% (1σ) · 95.45% (2σ) · 99.73% (3σ)',
          font: `500 ${Math.round(16 * scale)}px "JetBrains Mono", monospace`,
          color: pal.inkSub,
          gap: 26 * scale,
        },
      ],
      pal.panelBorder
    );

    const benchmarks = [0.67, 1.0, 1.645, 1.96, 2.576, 3.0];
    const tableRows = benchmarks.map((bz) => {
      const cp = erf(bz / Math.sqrt(2));
      return [
        `±${bz.toFixed(2)}`,
        `${(cp * 100).toFixed(2)}%`,
        (0.5 + 0.5 * cp).toFixed(4),
        `${((1 - cp) * 100).toFixed(2)}%`,
      ];
    });

    return {
      readouts: [
        { key: 'Cutoff z₀', val: `±${z0.toFixed(2)}` },
        { key: 'P(|Z| ≤ z₀)', val: `${(centralProb * 100).toFixed(2)}%` },
        { key: 'Φ(z₀)', val: (0.5 + 0.5 * centralProb).toFixed(4) },
        { key: '2-Tail α', val: `${(tailProb * 100).toFixed(2)}%` },
      ],
      tableHeaders: ['±z₀', 'Central %', 'Φ(z₀)', 'Two-Tail %'],
      tableRows,
    };
  }

  /* ========================================================================
   * 9. CIRCLE INSCRIBED vs. CENTRAL ANGLE THEOREM
   * ======================================================================== */
  drawCircleThmScene(ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height >= bounds.width * 0.95;
    const isSquare = isTall && bounds.height < bounds.width * 1.15;
    const cx = isTall ? padX + plotW * 0.5 : padX + plotW * 0.28;
    const cy = isTall ? plotTop + plotH * (isSquare ? 0.30 : 0.34) : plotTop + plotH * 0.50;
    const radius = Math.min(plotW, plotH) * (isTall ? (isSquare ? 0.24 : 0.27) : 0.36);

    this.lastPlotMapper = { unitCircle: { cx, cy, radius } };

    const centralDeg = Math.max(40, Math.min(160, Number(params.centralDeg ?? 110)));
    const basePDeg = Number(params.pAngleDeg ?? 95);
    const sweep = Math.sin((time / duration) * Math.PI * 2) * 32;
    const pDeg = time > 0.05 && time < duration - 0.05 ? basePDeg + sweep : basePDeg;

    // Chord endpoints A and B placed symmetrically around -90° (bottom arc)
    const halfRad = ((centralDeg / 2) * Math.PI) / 180;
    const angA = -Math.PI / 2 - halfRad;
    const angB = -Math.PI / 2 + halfRad;
    const angP = (pDeg * Math.PI) / 180;

    const ptA = { x: cx + radius * Math.cos(angA), y: cy - radius * Math.sin(angA) };
    const ptB = { x: cx + radius * Math.cos(angB), y: cy - radius * Math.sin(angB) };
    const ptP = { x: cx + radius * Math.cos(angP), y: cy - radius * Math.sin(angP) };

    // Circle outline
    ctx.save();
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 3.5 * scale;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Central sector OA - OB
    ctx.fillStyle = pal.amberFill;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ptA.x, ptA.y);
    ctx.lineTo(ptB.x, ptB.y);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = pal.amber;
    ctx.lineWidth = 3 * scale;
    ctx.beginPath();
    ctx.moveTo(ptA.x, ptA.y);
    ctx.lineTo(cx, cy);
    ctx.lineTo(ptB.x, ptB.y);
    ctx.stroke();

    // Inscribed chords PA and PB
    ctx.strokeStyle = pal.teal;
    ctx.lineWidth = 3.5 * scale;
    ctx.beginPath();
    ctx.moveTo(ptA.x, ptA.y);
    ctx.lineTo(ptP.x, ptP.y);
    ctx.lineTo(ptB.x, ptB.y);
    ctx.stroke();

    // Labels
    ctx.font = `700 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`;
    ctx.fillStyle = pal.ink;
    ctx.fillText('O', cx + 10 * scale, cy - 8 * scale);
    ctx.fillText('A', ptA.x - 24 * scale, ptA.y + 18 * scale);
    ctx.fillText('B', ptB.x + 12 * scale, ptB.y + 18 * scale);
    ctx.fillStyle = pal.teal;
    ctx.fillText(`P (θ = ${(centralDeg / 2).toFixed(1)}°)`, ptP.x - 45 * scale, ptP.y - 16 * scale);
    ctx.restore();

    this.drawDot(ctx, cx, cy, 6.5 * scale, pal.amber, pal.bg);
    this.drawDot(ctx, ptA.x, ptA.y, 7.5 * scale, pal.indigo, pal.bg);
    this.drawDot(ctx, ptB.x, ptB.y, 7.5 * scale, pal.indigo, pal.bg);
    this.drawDot(ctx, ptP.x, ptP.y, 8.5 * scale, pal.teal, pal.bg);

    const inscribedDeg = centralDeg / 2;

    const cardX = isTall ? padX : padX + Math.round(plotW * 0.54);
    const cardY = isTall ? plotTop + Math.round(plotH * (isSquare ? 0.58 : 0.64)) : plotTop + Math.round(plotH * 0.14);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const cardH = Math.round(270 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'INSCRIBED ANGLE THEOREM',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `∠AOB = 2θ = ${centralDeg.toFixed(1)}°`,
          font: `600 ${Math.round(25 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.amber,
          gap: 38 * scale,
        },
        {
          text: `∠APB = θ  = ${inscribedDeg.toFixed(1)}°`,
          font: `600 ${Math.round(22 * scale)}px "JetBrains Mono", monospace`,
          color: pal.teal,
          gap: 35 * scale,
        },
        {
          text: `Vertex P Position = ${(((pDeg % 360) + 360) % 360).toFixed(1)}°`,
          font: `600 ${Math.round(19 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 34 * scale,
        },
        {
          text: 'Ratio ∠AOB / ∠APB = 2.000 (Constant)',
          font: `500 ${Math.round(18 * scale)}px "JetBrains Mono", monospace`,
          color: pal.inkSub,
          gap: 28 * scale,
        },
      ],
      pal.panelBorder
    );

    const sampleArcs = [60, 90, 110, 120, 150, 180];
    const tableRows = sampleArcs.map((cDeg) => [
      `${cDeg}°`,
      `${(cDeg / 2).toFixed(1)}°`,
      '2.000',
      cDeg === 180 ? 'Thales Right ∠ (90°)' : 'Constant on Major Arc',
    ]);

    return {
      readouts: [
        { key: 'Central ∠AOB', val: `${centralDeg.toFixed(1)}°` },
        { key: 'Inscribed ∠APB', val: `${inscribedDeg.toFixed(1)}°` },
        { key: 'Vertex P Arc', val: `${pDeg.toFixed(0)}°` },
        { key: 'Ratio 2θ / θ', val: '2.000' },
      ],
      tableHeaders: ['Central ∠AOB', 'Inscribed ∠APB', 'Ratio', 'Geometric Note'],
      tableRows,
    };
  }

  /* ========================================================================
   * 10. COMPLEX PLANE & DE MOIVRE n-TH ROOTS OF UNITY
   * ======================================================================== */
  drawComplexScene(ctx, pal, bounds, params, time, duration) {
    const { padX, plotTop, plotW, plotH, scale } = bounds;
    const isTall = bounds.height >= bounds.width * 0.95;
    const isSquare = isTall && bounds.height < bounds.width * 1.15;
    const cx = isTall ? padX + plotW * 0.5 : padX + plotW * 0.28;
    const cy = isTall ? plotTop + plotH * (isSquare ? 0.30 : 0.34) : plotTop + plotH * 0.50;
    const radius = Math.min(plotW, plotH) * (isTall ? (isSquare ? 0.24 : 0.27) : 0.36);

    this.lastPlotMapper = { unitCircle: { cx, cy, radius } };

    const n = Math.max(3, Math.min(8, Math.round(Number(params.rootsN ?? 5))));
    const basePhaseDeg = Number(params.phaseDeg ?? 18);
    const animRot = spanEase(time, duration * 0.12, duration * 0.85) * 36 + 8 * Math.sin(time * 1.6) * spanEase(time, 3.2, 4.6);
    const phaseDeg = basePhaseDeg + (time > 0.05 && time < duration - 0.05 ? animRot : 0);
    const phaseRad = (phaseDeg * Math.PI) / 180;

    // Axes
    ctx.save();
    ctx.strokeStyle = pal.axis;
    ctx.lineWidth = 1.8 * scale;
    ctx.beginPath();
    ctx.moveTo(cx - radius * 1.25, cy);
    ctx.lineTo(cx + radius * 1.25, cy);
    ctx.moveTo(cx, cy - radius * 1.25);
    ctx.lineTo(cx, cy + radius * 1.25);
    ctx.stroke();

    // Unit Circle |z| = 1
    ctx.strokeStyle = pal.indigo;
    ctx.lineWidth = 3 * scale;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    const roots = [];
    for (let k = 0; k < n; k++) {
      const ang = (phaseRad + 2 * Math.PI * k) / n;
      roots.push({
        k,
        ang,
        re: Math.cos(ang),
        im: Math.sin(ang),
        x: cx + radius * Math.cos(ang),
        y: cy - radius * Math.sin(ang),
      });
    }

    // Regular n-gon connecting roots
    ctx.fillStyle = pal.amberFill;
    ctx.strokeStyle = pal.amber;
    ctx.lineWidth = 2.8 * scale;
    ctx.beginPath();
    roots.forEach((rt, idx) => {
      if (idx === 0) ctx.moveTo(rt.x, rt.y);
      else ctx.lineTo(rt.x, rt.y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Phasor spokes from origin
    roots.forEach((rt, idx) => {
      this.drawArrow(
        ctx,
        cx,
        cy,
        rt.x,
        rt.y,
        idx === 0 ? pal.teal : pal.indigo,
        (idx === 0 ? 3.2 : 2) * scale
      );
      this.drawDot(
        ctx,
        rt.x,
        rt.y,
        (idx === 0 ? 8 : 6.5) * scale,
        idx === 0 ? pal.teal : pal.amber,
        pal.bg
      );
      ctx.font = `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`;
      ctx.fillStyle = idx === 0 ? pal.teal : pal.ink;
      const lx = cx + (radius + 24 * scale) * Math.cos(rt.ang) - 10 * scale;
      const ly = cy - (radius + 24 * scale) * Math.sin(rt.ang) + 5 * scale;
      ctx.fillText(`z${idx}`, lx, ly);
    });
    ctx.restore();

    const r0 = roots[0];
    const cardX = isTall ? padX : padX + Math.round(plotW * 0.54);
    const cardY = isTall ? plotTop + Math.round(plotH * (isSquare ? 0.58 : 0.64)) : plotTop + Math.round(plotH * 0.14);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const cardH = Math.round(275 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'DE MOIVRE n-TH ROOTS ON ARGAND PLANE',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `Order n = ${n}   (Δθ = ${(360 / n).toFixed(1)}°)`,
          font: `600 ${Math.round(24 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.ink,
          gap: 36 * scale,
        },
        {
          text: `Principal z₀ = ${r0.re.toFixed(3)} ${r0.im >= 0 ? '+' : '−'} ${Math.abs(r0.im).toFixed(3)}i`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.teal,
          gap: 34 * scale,
        },
        {
          text: `Phase φ      = ${(((phaseDeg % 360) + 360) % 360).toFixed(1)}°`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: 'Symmetry Sum ∑ zₖ = 0.000 + 0.000i',
          font: `600 ${Math.round(19 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 32 * scale,
        },
      ],
      pal.panelBorder
    );

    const tableRows = roots.map((rt) => [
      `z_${rt.k}`,
      `${(((rt.ang * 180) / Math.PI) % 360).toFixed(1)}°`,
      rt.re.toFixed(4),
      `${rt.im >= 0 ? '+' : ''}${rt.im.toFixed(4)}i`,
    ]);

    return {
      readouts: [
        { key: 'Roots n', val: `${n}` },
        { key: 'Angular Step', val: `${(360 / n).toFixed(1)}°` },
        { key: 'z₀ = cos+i sin', val: `${r0.re.toFixed(2)}+${r0.im.toFixed(2)}i` },
        { key: '∑ zₖ', val: '0' },
      ],
      tableHeaders: ['Root', 'Angle θₖ', 'Re(zₖ)', 'Im(zₖ)'],
      tableRows,
    };
  }

  /* ========================================================================
   * 11. GRADIENT DESCENT OPTIMIZATION TRAJECTORY
   * ======================================================================== */
  drawGradDescentScene(ctx, pal, bounds, params, time, duration) {
    const xMin = -3.2;
    const xMax = 3.2;
    const yMin = -0.4;
    const yMax = 8.2;

    const plot = this.createPlotArea(
      ctx,
      pal,
      bounds,
      xMin,
      xMax,
      yMin,
      yMax,
      spanEase(time, 0, 0.7),
      0.60
    );
    const { toPx, areaX, areaY, areaW, areaH, isTall } = plot;
    const { scale, padX, plotW } = bounds;

    const lossFn = (x) => 0.75 * x * x + 0.3 * Math.sin(2.5 * x) + 0.6;
    const gradFn = (x) => 1.5 * x + 0.75 * Math.cos(2.5 * x);

    const pCurve = spanEase(time, 0.15, 1.4);
    if (pCurve > 0) {
      const steps = Math.max(8, Math.floor(180 * pCurve));
      ctx.save();
      ctx.strokeStyle = pal.indigo;
      ctx.lineWidth = 4.2 * scale;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const x = xMin + ((xMax - xMin) * i) / 180;
        const p = toPx(x, lossFn(x));
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    const xStart = Math.max(-2.8, Math.min(2.8, Number(params.xStart ?? -2.4)));
    const lr = Math.max(0.05, Math.min(0.85, Number(params.lr ?? 0.28)));
    const totalSteps = 8;

    const trajectory = [];
    let currX = xStart;
    for (let s = 0; s <= totalSteps; s++) {
      const lVal = lossFn(currX);
      const gVal = gradFn(currX);
      trajectory.push({ step: s, x: currX, loss: lVal, grad: gVal });
      currX = currX - lr * gVal;
    }

    const stepProg = spanEase(time, duration * 0.16, duration * 0.92);
    const exactStep = stepProg * totalSteps;
    const visibleSteps = Math.max(1, Math.min(totalSteps, Math.ceil(exactStep)));
    const fullSteps = Math.min(totalSteps - 1, Math.floor(exactStep));
    const subFrac = exactStep - fullSteps;

    for (let i = 0; i < visibleSteps; i++) {
      const p0 = toPx(trajectory[i].x, trajectory[i].loss);
      const p1 = toPx(trajectory[i + 1].x, trajectory[i + 1].loss);
      const frac = i < fullSteps ? 1 : Math.max(0.15, subFrac);
      this.drawArrow(
        ctx,
        p0.x,
        p0.y,
        p0.x + (p1.x - p0.x) * frac,
        p0.y + (p1.y - p0.y) * frac,
        pal.amber,
        2.6 * scale
      );
      this.drawDot(ctx, p0.x, p0.y, 6.5 * scale, i === 0 ? pal.indigo : pal.amber, pal.bg);
    }

    const activeState = trajectory[visibleSteps];
    const interpX = trajectory[fullSteps].x + (trajectory[fullSteps + 1].x - trajectory[fullSteps].x) * subFrac + 0.04 * Math.sin(time * 2.4) * spanEase(time, 4.2, 5.2);
    const pActive = toPx(interpX, lossFn(interpX));
    this.drawDot(ctx, pActive.x, pActive.y, (8.5 + 1.2 * Math.sin(time * 3.0)) * scale, pal.teal, pal.bg);

    const cardX = isTall ? padX : areaX + areaW + Math.round(34 * scale);
    const cardY = isTall ? areaY + areaH + Math.round(28 * scale) : areaY + Math.round(14 * scale);
    const cardW = isTall ? plotW : padX + plotW - cardX;
    const cardH = Math.round(280 * scale);

    this.drawCalloutCard(
      ctx,
      pal,
      cardX,
      cardY,
      cardW,
      cardH,
      scale,
      [
        {
          text: 'GRADIENT DESCENT: xₜ₊₁ = xₜ − η ∇L(xₜ)',
          font: `700 ${Math.round(15 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text: `Step t = ${activeState.step} / ${totalSteps}   (η = ${lr.toFixed(2)})`,
          font: `600 ${Math.round(24 * scale)}px "Newsreader", Georgia, serif`,
          color: pal.ink,
          gap: 36 * scale,
        },
        {
          text: `Current xₜ    = ${activeState.x >= 0 ? '+' : ''}${activeState.x.toFixed(4)}`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.teal,
          gap: 34 * scale,
        },
        {
          text: `Loss L(xₜ)    = ${activeState.loss.toFixed(4)}`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.indigo,
          gap: 34 * scale,
        },
        {
          text: `Grad L'(xₜ)   = ${activeState.grad >= 0 ? '+' : ''}${activeState.grad.toFixed(4)}`,
          font: `600 ${Math.round(20 * scale)}px "JetBrains Mono", monospace`,
          color: pal.amber,
          gap: 34 * scale,
        },
        {
          text:
            Math.abs(activeState.grad) < 0.08
              ? 'Status: Converged to Local Minimum'
              : 'Status: Descending along −∇L',
          font: `500 ${Math.round(17 * scale)}px "JetBrains Mono", monospace`,
          color: pal.inkSub,
          gap: 26 * scale,
        },
      ],
      pal.panelBorder
    );

    const tableRows = trajectory.slice(0, 7).map((st) => [
      `t = ${st.step}`,
      st.x.toFixed(4),
      st.loss.toFixed(4),
      st.grad.toFixed(4),
    ]);

    return {
      readouts: [
        { key: 'Learning Rate η', val: lr.toFixed(2) },
        { key: 'Current xₜ', val: activeState.x.toFixed(3) },
        { key: 'Loss L(xₜ)', val: activeState.loss.toFixed(3) },
        { key: "Grad L'(xₜ)", val: activeState.grad.toFixed(3) },
      ],
      tableHeaders: ['Step t', 'Parameter xₜ', 'Loss L(xₜ)', "Gradient L'(xₜ)"],
      tableRows,
    };
  }

  drawWatermark(ctx, pal, width, height, padX, scale, safeBotY) {
    ctx.save();
    const botTop = safeBotY || (height - Math.max(Math.round(58 * scale), Math.round(height * 0.058)));

    // Clear and separate the dedicated footer band so zero scene pixels can ever touch the brand mark
    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, botTop, width, height - botTop);

    ctx.strokeStyle = pal.gridMajor;
    ctx.lineWidth = Math.max(1, 1.2 * scale);
    ctx.beginPath();
    ctx.moveTo(padX, botTop + Math.round(2 * scale));
    ctx.lineTo(width - padX, botTop + Math.round(2 * scale));
    ctx.stroke();

    const text = 'ClipSAT · 3c1c   |   clipsat.org';
    ctx.font = `600 ${Math.round(16 * scale)}px "Plus Jakarta Sans", sans-serif`;
    const metrics = ctx.measureText(text);
    const iconSize = Math.round(22 * scale);
    const pillPadX = Math.round(14 * scale);
    const pillH = Math.round(34 * scale);
    const pillW = Math.round(metrics.width + iconSize + 10 * scale + pillPadX * 2);
    const pillX = width - padX - pillW;
    const footerCenterY = Math.round((botTop + height) * 0.5) + Math.round(2 * scale);
    const pillY = footerCenterY - Math.round(pillH * 0.5);

    ctx.fillStyle = pal.panel;
    ctx.strokeStyle = pal.panelBorder;
    ctx.lineWidth = 1.2 * scale;
    this.roundRect(ctx, pillX, pillY, pillW, pillH, Math.round(pillH * 0.5));
    ctx.fill();
    ctx.stroke();

    const iconX = pillX + pillPadX;
    const textX = iconX + iconSize + Math.round(9 * scale);
    const textY = footerCenterY + Math.round(5.5 * scale);

    if (this.markLoaded) {
      ctx.drawImage(this.markImg, iconX, footerCenterY - Math.round(iconSize * 0.5), iconSize, iconSize);
    } else {
      this.drawDot(ctx, iconX + 6 * scale, footerCenterY, 4.5 * scale, pal.indigo, pal.bg);
      this.drawDot(ctx, iconX + 16 * scale, footerCenterY, 4.5 * scale, pal.amber, pal.bg);
    }

    ctx.fillStyle = pal.muted;
    ctx.fillText(text, textX, textY);
    ctx.restore();
  }

  drawDot(ctx, x, y, r, fill, stroke) {
    ctx.save();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = Math.max(2, r * 0.28);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawArrow(ctx, x0, y0, x1, y1, color, width) {
    const headLen = width * 3.1;
    const angle = Math.atan2(y1 - y0, x1 - x0);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - headLen * Math.cos(angle - Math.PI / 6), y1 - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x1 - headLen * Math.cos(angle + Math.PI / 6), y1 - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.rect(x, y, w, h);
    }
  }
}

attachExtendedRenderers(Engine3c1c);
attach3DRenderers(Engine3c1c);


