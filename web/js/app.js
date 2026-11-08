/* ==========================================================================
   3c1c · ClipSAT Mathematical Animation Studio — Main Controller
   ========================================================================== */

import { Engine3c1c, clamp01 } from './engine.js?v=100.0';
import { FUNCTIONS, SCENE_PRESETS, generatePythonSceneCode } from './presets.js?v=100.0';

const SCENE_CATEGORIES = [
  'All',
  'Calculus',
  'Linear Algebra',
  'SAT / Algebra',
  'Geometry & Trig',
  'Probability & Stats',
  'Qudrat & Olympiad',
  'Complex & Fourier',
  'Optimization & ML',
  'Physics & ODEs',
  'Discrete & Number',
];

const state = {
  presetIndex: 0,
  params: structuredClone(SCENE_PRESETS[0].defaults),
  uiTheme: localStorage.getItem('3c1c-ui-theme') || 'dark',
  stageTheme: localStorage.getItem('3c1c-stage-theme') || 'dark',
  aspect: '16:9',
  watermark: true,
  playing: true,
  loop: true,
  speed: 1.0,
  time: 0.0,
  duration: SCENE_PRESETS[0].duration,
  serverOnline: false,
  serverInfo: null,
  recording: false,
  codeDirty: false,
  searchQuery: '',
  activeCategory: 'All',
};

const canvas = document.getElementById('stage-canvas');
const engine = new Engine3c1c(canvas);

const els = {
  sceneList: document.getElementById('scene-list'),
  sceneSearch: document.getElementById('scene-search'),
  categoryBar: document.getElementById('category-filter-bar'),
  sceneCountEyebrow: document.getElementById('scene-count-eyebrow'),
  dragHint: document.getElementById('stage-drag-hint'),
  scrubber: document.getElementById('timeline-scrubber'),
  timecode: document.getElementById('timecode-readout'),
  beatStrip: document.getElementById('beat-strip'),
  btnPlay: document.getElementById('btn-play-pause'),
  btnRestart: document.getElementById('btn-restart'),
  btnStepBack: document.getElementById('btn-step-back'),
  btnStepFwd: document.getElementById('btn-step-fwd'),
  btnLoop: document.getElementById('btn-loop'),
  selectSpeed: document.getElementById('select-speed'),
  btnStageTheme: document.getElementById('btn-stage-theme'),
  btnWatermark: document.getElementById('btn-watermark'),
  btnUiTheme: document.getElementById('btn-ui-theme'),
  btnExportPng: document.getElementById('btn-export-png'),
  btnRecordWebm: document.getElementById('btn-record-webm'),
  btnRenderMp4: document.getElementById('btn-render-mp4'),
  engineStatus: document.getElementById('engine-status'),
  engineStatusText: document.getElementById('engine-status-text'),
  controlsContainer: document.getElementById('dynamic-controls'),
  readoutGrid: document.getElementById('live-readout-grid'),
  rigorBadge: document.getElementById('rigor-badge'),
  rigorHeading: document.getElementById('rigor-heading'),
  rigorMath: document.getElementById('rigor-math'),
  rigorProse: document.getElementById('rigor-prose'),
  cliBanner: document.getElementById('cli-command-banner'),
  codeEditor: document.getElementById('python-code-editor'),
  btnValidatePy: document.getElementById('btn-validate-py'),
  btnCopyPy: document.getElementById('btn-copy-py'),
  btnDownloadPy: document.getElementById('btn-download-py'),
  validationMsg: document.getElementById('py-validation-msg'),
  dataHead: document.getElementById('data-table-head'),
  dataBody: document.getElementById('data-table-body'),
  toast: document.getElementById('studio-toast'),
};

let lastFrameTs = performance.now();
let lastTelemetryUpdate = 0;
let toastTimer = null;

function activePreset() {
  return SCENE_PRESETS[state.presetIndex];
}

function showToast(html, durationMs = 4200) {
  els.toast.innerHTML = html;
  els.toast.classList.add('visible');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.classList.remove('visible');
  }, durationMs);
}

function applyUiTheme() {
  document.body.classList.toggle('dark', state.uiTheme === 'dark');
  els.btnUiTheme.textContent = state.uiTheme === 'dark' ? 'UI: Dark' : 'UI: Paper';
  localStorage.setItem('3c1c-ui-theme', state.uiTheme);
}

function applyStageToolbar() {
  els.btnStageTheme.textContent = state.stageTheme === 'paper' ? 'Stage: Paper' : 'Stage: Dark';
  els.btnStageTheme.classList.toggle('is-on', state.stageTheme === 'paper');
  els.btnWatermark.classList.toggle('is-on', state.watermark);
  els.btnLoop.classList.toggle('is-on', state.loop);
  localStorage.setItem('3c1c-stage-theme', state.stageTheme);

  document.querySelectorAll('[data-aspect]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.aspect === state.aspect);
  });
}

function renderCategoryBar() {
  if (!els.categoryBar) return;
  els.categoryBar.innerHTML = '';
  SCENE_CATEGORIES.forEach((cat) => {
    const count =
      cat === 'All'
        ? SCENE_PRESETS.length
        : SCENE_PRESETS.filter((p) => p.category === cat).length;
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `cat-pill${state.activeCategory === cat ? ' active' : ''}`;
    pill.textContent = `${cat} (${count})`;
    pill.addEventListener('click', () => {
      state.activeCategory = cat;
      renderCategoryBar();
      renderSceneLibrary();
    });
    els.categoryBar.appendChild(pill);
  });
}

function renderSceneLibrary() {
  els.sceneList.innerHTML = '';
  const q = state.searchQuery.trim().toLowerCase();
  let visibleCount = 0;

  SCENE_PRESETS.forEach((preset, idx) => {
    if (state.activeCategory !== 'All' && preset.category !== state.activeCategory) {
      return;
    }
    const numTag = `#${String(idx + 1).padStart(3, '0')}`;
    if (q) {
      const hay = `${numTag} ${preset.id} ${preset.name} ${preset.track} ${preset.summary} ${preset.category || ''}`.toLowerCase();
      if (!hay.includes(q)) return;
    }
    visibleCount++;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = `scene-preset-${preset.id}`;
    btn.className = `scene-card${idx === state.presetIndex ? ' active' : ''}`;
    btn.innerHTML = `
      <div class="scene-card-top">
        <span class="scene-track-tag"><span class="scene-num-badge">${numTag}</span>${preset.track}</span>
        <span class="scene-glyph">${preset.glyph}</span>
      </div>
      <div class="scene-name">${preset.name}</div>
      <div class="scene-desc">${preset.summary}</div>
    `;
    btn.addEventListener('click', () => selectPreset(idx));
    els.sceneList.appendChild(btn);
  });

  if (els.sceneCountEyebrow) {
    els.sceneCountEyebrow.textContent =
      visibleCount === SCENE_PRESETS.length
        ? `Curriculum Presets · ${SCENE_PRESETS.length} Scenes`
        : `Showing ${visibleCount} of ${SCENE_PRESETS.length} Scenes`;
  }
}

function selectPreset(index) {
  state.presetIndex = index;
  const preset = activePreset();
  state.params = structuredClone(preset.defaults);
  state.duration = preset.duration;
  state.time = 0.0;
  state.playing = true;
  state.codeDirty = false;
  els.btnPlay.textContent = 'Pause';
  els.dragHint.textContent = preset.dragHint;

  renderSceneLibrary();
  renderBeatChips();
  renderDynamicControls();
  renderRigorCard();
  syncPythonEditor();
  drawImmediate();
}

function renderBeatChips() {
  const preset = activePreset();
  els.beatStrip.innerHTML = '';
  preset.beats.forEach((beat, idx) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.id = `beat-chip-${idx}`;
    chip.className = 'beat-chip';
    chip.dataset.time = String(beat.time);
    chip.textContent = beat.label;
    chip.addEventListener('click', () => {
      state.time = beat.time;
      drawImmediate();
    });
    els.beatStrip.appendChild(chip);
  });
}

function updateActiveBeatChip() {
  const beats = activePreset().beats;
  let activeIdx = 0;
  for (let i = 0; i < beats.length; i++) {
    if (state.time >= beats[i].time - 0.05) activeIdx = i;
  }
  els.beatStrip.querySelectorAll('.beat-chip').forEach((chip, i) => {
    chip.classList.toggle('active', i === activeIdx);
  });
}

function renderRigorCard() {
  const { rigor } = activePreset();
  els.rigorBadge.textContent = rigor.badge;
  els.rigorHeading.textContent = rigor.heading;
  els.rigorProse.textContent = rigor.prose;

  if (window.katex) {
    try {
      window.katex.render(rigor.latex, els.rigorMath, {
        displayMode: true,
        throwOnError: false,
      });
      return;
    } catch {
      // Fallback to plain formula
    }
  }
  els.rigorMath.textContent = rigor.latex;
}

function renderDynamicControls() {
  const preset = activePreset();
  const p = state.params;
  const parts = [];

  parts.push(`
    <div class="control-field">
      <div class="control-label-row"><label for="ctrl-track">Curriculum Track Badge</label></div>
      <input id="ctrl-track" class="input-text" type="text" value="${escapeAttr(p.track)}" />
    </div>
    <div class="control-field">
      <div class="control-label-row"><label for="ctrl-title">Scene Headline</label></div>
      <input id="ctrl-title" class="input-text" type="text" value="${escapeAttr(p.title)}" />
    </div>
  `);

  if (preset.id === 'derivative' || preset.id === 'riemann') {
    const fnOptions = Object.values(FUNCTIONS)
      .map(
        (fn) =>
          `<option value="${fn.id}" ${p.fn === fn.id ? 'selected' : ''}>${fn.label}</option>`
      )
      .join('');
    parts.push(`
      <div class="control-field">
        <div class="control-label-row"><label for="ctrl-fn">Function f(x)</label></div>
        <select id="ctrl-fn" class="input-select">${fnOptions}</select>
      </div>
    `);
  }

  if (preset.id === 'derivative') {
    parts.push(
      sliderField('ctrl-a', 'Anchor Point a', p.a, -1.5, 2.8, 0.05),
      sliderField('ctrl-h', 'Initial Secant Offset h₀', p.h, -1.8, 2.0, 0.05)
    );
  } else if (preset.id === 'riemann') {
    parts.push(
      sliderField('ctrl-b', 'Upper Bound b', p.b, 0.8, 3.4, 0.05),
      sliderField('ctrl-n', 'Target Partitions N', p.n, 4, 64, 1),
      `
      <div class="control-field">
        <div class="control-label-row"><label for="ctrl-rule">Quadrature Rule</label></div>
        <select id="ctrl-rule" class="input-select">
          <option value="left" ${p.rule === 'left' ? 'selected' : ''}>Left Endpoint</option>
          <option value="midpoint" ${p.rule === 'midpoint' ? 'selected' : ''}>Midpoint Rule</option>
          <option value="right" ${p.rule === 'right' ? 'selected' : ''}>Right Endpoint</option>
          <option value="trapezoid" ${p.rule === 'trapezoid' ? 'selected' : ''}>Trapezoidal Rule</option>
        </select>
      </div>
      `
    );
  } else if (preset.id === 'square') {
    parts.push(
      sliderField('ctrl-xval', 'Side Length x', p.xVal, 1.0, 3.4, 0.1),
      sliderField('ctrl-bval', 'Linear Coefficient b', p.bVal, 0.4, 2.8, 0.1)
    );
  } else if (preset.id === 'unitcircle') {
    parts.push(sliderField('ctrl-theta', 'Starting Angle θ₀ (deg)', p.thetaDeg, 0, 360, 5));
  } else if (preset.id === 'linalg') {
    parts.push(`
      <div class="control-field">
        <div class="control-label-row"><span>2×2 Matrix Entries A</span></div>
        <div class="matrix-grid">
          <input id="ctrl-m11" class="input-text" type="number" step="0.1" value="${p.m11}" aria-label="m11" />
          <input id="ctrl-m12" class="input-text" type="number" step="0.1" value="${p.m12}" aria-label="m12" />
          <input id="ctrl-m21" class="input-text" type="number" step="0.1" value="${p.m21}" aria-label="m21" />
          <input id="ctrl-m22" class="input-text" type="number" step="0.1" value="${p.m22}" aria-label="m22" />
        </div>
      </div>
    `);
  } else if (preset.id === 'qudrat') {
    parts.push(sliderField('ctrl-xprobe', 'Comparison Probe x₀', p.xProbe, -1.0, 4.5, 0.05));
  } else if (preset.id === 'taylor') {
    parts.push(
      sliderField('ctrl-degree', 'Taylor Degree n (odd)', p.degree, 1, 11, 2),
      sliderField('ctrl-xeval', 'Probe Point x₀', p.xEval, -3.1, 3.1, 0.05)
    );
  } else if (preset.id === 'normal') {
    parts.push(sliderField('ctrl-zcutoff', 'Z-Score Cutoff z₀', p.zCutoff, 0.2, 3.2, 0.04));
  } else if (preset.id === 'circle_thm') {
    parts.push(
      sliderField('ctrl-central', 'Central Angle ∠AOB (deg)', p.centralDeg, 40, 160, 2),
      sliderField('ctrl-pangle', 'Point P Arc Position (deg)', p.pAngleDeg, 35, 145, 2)
    );
  } else if (preset.id === 'complex') {
    parts.push(
      sliderField('ctrl-rootsn', 'Root Order n', p.rootsN, 3, 8, 1),
      sliderField('ctrl-phase', 'Principal Phase φ (deg)', p.phaseDeg, 0, 360, 5)
    );
  } else if (preset.id === 'grad_descent') {
    parts.push(
      sliderField('ctrl-xstart', 'Initial Parameter x₀', p.xStart, -2.9, 2.9, 0.05),
      sliderField('ctrl-lr', 'Learning Rate η', p.lr, 0.05, 0.55, 0.01)
    );
  } else if (Array.isArray(preset.controls)) {
    preset.controls.forEach((ctrl) => {
      parts.push(
        sliderField(ctrl.id, ctrl.label, p[ctrl.key], ctrl.min, ctrl.max, ctrl.step)
      );
    });
  }

  els.controlsContainer.innerHTML = parts.join('');
  bindControlListeners();
}

function sliderField(id, label, value, min, max, step) {
  return `
    <div class="control-field">
      <div class="control-label-row">
        <label for="${id}">${label}</label>
        <span class="control-val" id="${id}-val">${Number(value).toFixed(step >= 1 ? 0 : 2)}</span>
      </div>
      <input id="${id}" class="range-input" type="range" min="${min}" max="${max}" step="${step}" value="${value}" />
    </div>
  `;
}

function bindControlListeners() {
  const bind = (id, key, isNum = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      state.params[key] = isNum ? Number(el.value) : el.value;
      const valSpan = document.getElementById(`${id}-val`);
      if (valSpan) {
        const stepAttr = Number(el.step || 0.05);
        valSpan.textContent = Number(el.value).toFixed(stepAttr >= 1 ? 0 : 2);
      }
      if (!state.codeDirty) syncPythonEditor();
      drawImmediate();
    });
  };

  bind('ctrl-track', 'track', false);
  bind('ctrl-title', 'title', false);
  bind('ctrl-fn', 'fn', false);
  bind('ctrl-a', 'a', true);
  bind('ctrl-h', 'h', true);
  bind('ctrl-b', 'b', true);
  bind('ctrl-n', 'n', true);
  bind('ctrl-rule', 'rule', false);
  bind('ctrl-xval', 'xVal', true);
  bind('ctrl-bval', 'bVal', true);
  bind('ctrl-theta', 'thetaDeg', true);
  bind('ctrl-m11', 'm11', true);
  bind('ctrl-m12', 'm12', true);
  bind('ctrl-m21', 'm21', true);
  bind('ctrl-m22', 'm22', true);
  bind('ctrl-xprobe', 'xProbe', true);
  bind('ctrl-degree', 'degree', true);
  bind('ctrl-xeval', 'xEval', true);
  bind('ctrl-zcutoff', 'zCutoff', true);
  bind('ctrl-central', 'centralDeg', true);
  bind('ctrl-pangle', 'pAngleDeg', true);
  bind('ctrl-rootsn', 'rootsN', true);
  bind('ctrl-phase', 'phaseDeg', true);
  bind('ctrl-xstart', 'xStart', true);
  bind('ctrl-lr', 'lr', true);

  const preset = activePreset();
  if (Array.isArray(preset.controls)) {
    preset.controls.forEach((ctrl) => {
      bind(ctrl.id, ctrl.key, true);
    });
  }
}

function syncPythonEditor() {
  const preset = activePreset();
  const code = generatePythonSceneCode(
    preset,
    state.params,
    state.stageTheme,
    state.aspect,
    state.watermark
  );
  els.codeEditor.value = code;
  const firstLine = code.split('\n')[0].replace(/^#\s*CLI:\s*/, '');
  els.cliBanner.textContent = `$ ${firstLine}`;
  els.validationMsg.textContent = 'Synced with live studio parameters.';
  els.validationMsg.className = 'validation-msg';
}

function updateTelemetryDom(telemetry) {
  els.readoutGrid.innerHTML = telemetry.readouts
    .map(
      (r) => `
      <div class="readout-tile">
        <div class="readout-key">${r.key}</div>
        <div class="readout-num">${r.val}</div>
      </div>
    `
    )
    .join('');

  els.dataHead.innerHTML = `<tr>${telemetry.tableHeaders.map((h) => `<th>${h}</th>`).join('')}</tr>`;
  els.dataBody.innerHTML = telemetry.tableRows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
    .join('');
}

function drawImmediate() {
  const preset = activePreset();
  const telemetry = engine.renderFrame({
    presetId: preset.id,
    params: state.params,
    time: state.time,
    duration: state.duration,
    stageTheme: state.stageTheme,
    aspect: state.aspect,
    watermark: state.watermark,
  });

  els.scrubber.value = String(clamp01(state.time / state.duration) * 1000);
  const frameNum = Math.round(state.time * 30);
  els.timecode.textContent = `${state.time.toFixed(2)}s / ${state.duration.toFixed(2)}s · F${String(frameNum).padStart(3, '0')}`;
  updateActiveBeatChip();

  const now = performance.now();
  if (now - lastTelemetryUpdate > 90 || !state.playing) {
    updateTelemetryDom(telemetry);
    lastTelemetryUpdate = now;
  }
}

function tick(now) {
  const dt = Math.min(0.08, (now - lastFrameTs) / 1000);
  lastFrameTs = now;

  if (state.playing) {
    state.time += dt * state.speed;
    if (state.time >= state.duration) {
      if (state.loop) {
        state.time = state.time % state.duration;
      } else {
        state.time = state.duration;
        state.playing = false;
        els.btnPlay.textContent = 'Play';
      }
    }
    drawImmediate();
  }

  requestAnimationFrame(tick);
}

/* ── Direct Interactive Canvas Manipulation ── */
function setupCanvasDragging() {
  let dragging = false;

  const updateFromPointer = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * canvas.width;
    const py = ((clientY - rect.top) / rect.height) * canvas.height;
    const preset = activePreset();
    const mapper = engine.lastPlotMapper;
    if (!mapper) return;

    if (Array.isArray(preset.controls)) {
      const angleCtrl = preset.controls.find((c) => c.drag === 'angle');
      if (angleCtrl && mapper.unitCircle) {
        const { cx, cy } = mapper.unitCircle;
        let deg = (Math.atan2(cy - py, px - cx) * 180) / Math.PI;
        if (deg < 0) deg += 360;
        const clamped = Math.max(angleCtrl.min, Math.min(angleCtrl.max, Math.round(deg)));
        state.params[angleCtrl.key] = clamped;
        const input = document.getElementById(angleCtrl.id);
        const span = document.getElementById(`${angleCtrl.id}-val`);
        if (input) input.value = String(clamped);
        if (span) span.textContent = clamped.toFixed(angleCtrl.step >= 1 ? 0 : 2);
        if (!state.codeDirty) syncPythonEditor();
        drawImmediate();
        return;
      }

      if (mapper.toMath) {
        const m = mapper.toMath(px, py);
        const xCtrl = preset.controls.find((c) => c.drag === 'x');
        const yCtrl = preset.controls.find((c) => c.drag === 'y');
        if (xCtrl) {
          const step = xCtrl.step || 0.05;
          const raw = Math.round(m.x / step) * step;
          const clamped = Math.max(xCtrl.min, Math.min(xCtrl.max, Number(raw.toFixed(2))));
          state.params[xCtrl.key] = clamped;
          const input = document.getElementById(xCtrl.id);
          const span = document.getElementById(`${xCtrl.id}-val`);
          if (input) input.value = String(clamped);
          if (span) span.textContent = clamped.toFixed(step >= 1 ? 0 : 2);
        }
        if (yCtrl) {
          const step = yCtrl.step || 0.05;
          const raw = Math.round(m.y / step) * step;
          const clamped = Math.max(yCtrl.min, Math.min(yCtrl.max, Number(raw.toFixed(2))));
          state.params[yCtrl.key] = clamped;
          const input = document.getElementById(yCtrl.id);
          const span = document.getElementById(`${yCtrl.id}-val`);
          if (input) input.value = String(clamped);
          if (span) span.textContent = clamped.toFixed(step >= 1 ? 0 : 2);
        }
        if (!state.codeDirty) syncPythonEditor();
        drawImmediate();
        return;
      }
    }

    if ((preset.id === 'unitcircle' || preset.id === 'complex' || preset.id === 'circle_thm') && mapper.unitCircle) {
      const { cx, cy } = mapper.unitCircle;
      let deg = (Math.atan2(cy - py, px - cx) * 180) / Math.PI;
      if (deg < 0) deg += 360;
      if (preset.id === 'unitcircle') {
        state.params.thetaDeg = Math.round(deg);
        const input = document.getElementById('ctrl-theta');
        const span = document.getElementById('ctrl-theta-val');
        if (input) input.value = String(state.params.thetaDeg);
        if (span) span.textContent = String(state.params.thetaDeg);
      } else if (preset.id === 'complex') {
        state.params.phaseDeg = Math.round(deg);
        const input = document.getElementById('ctrl-phase');
        const span = document.getElementById('ctrl-phase-val');
        if (input) input.value = String(state.params.phaseDeg);
        if (span) span.textContent = String(state.params.phaseDeg);
      } else if (preset.id === 'circle_thm') {
        state.params.pAngleDeg = Math.max(35, Math.min(145, Math.round(deg)));
        const input = document.getElementById('ctrl-pangle');
        const span = document.getElementById('ctrl-pangle-val');
        if (input) input.value = String(state.params.pAngleDeg);
        if (span) span.textContent = String(state.params.pAngleDeg);
      }
      if (!state.codeDirty) syncPythonEditor();
      drawImmediate();
      return;
    }

    if (mapper.toMath) {
      const m = mapper.toMath(px, py);
      if (preset.id === 'derivative') {
        state.params.a = Math.max(-1.5, Math.min(2.8, Number(m.x.toFixed(2))));
        const input = document.getElementById('ctrl-a');
        const span = document.getElementById('ctrl-a-val');
        if (input) input.value = String(state.params.a);
        if (span) span.textContent = state.params.a.toFixed(2);
      } else if (preset.id === 'riemann') {
        state.params.b = Math.max(0.8, Math.min(3.4, Number(m.x.toFixed(2))));
        const input = document.getElementById('ctrl-b');
        const span = document.getElementById('ctrl-b-val');
        if (input) input.value = String(state.params.b);
        if (span) span.textContent = state.params.b.toFixed(2);
      } else if (preset.id === 'qudrat') {
        state.params.xProbe = Math.max(-1.0, Math.min(4.5, Number(m.x.toFixed(2))));
        const input = document.getElementById('ctrl-xprobe');
        const span = document.getElementById('ctrl-xprobe-val');
        if (input) input.value = String(state.params.xProbe);
        if (span) span.textContent = state.params.xProbe.toFixed(2);
      } else if (preset.id === 'taylor') {
        state.params.xEval = Math.max(-3.1, Math.min(3.1, Number(m.x.toFixed(2))));
        const input = document.getElementById('ctrl-xeval');
        const span = document.getElementById('ctrl-xeval-val');
        if (input) input.value = String(state.params.xEval);
        if (span) span.textContent = state.params.xEval.toFixed(2);
      } else if (preset.id === 'normal') {
        state.params.zCutoff = Math.max(0.2, Math.min(3.2, Number(Math.abs(m.x).toFixed(2))));
        const input = document.getElementById('ctrl-zcutoff');
        const span = document.getElementById('ctrl-zcutoff-val');
        if (input) input.value = String(state.params.zCutoff);
        if (span) span.textContent = state.params.zCutoff.toFixed(2);
      } else if (preset.id === 'grad_descent') {
        state.params.xStart = Math.max(-2.9, Math.min(2.9, Number(m.x.toFixed(2))));
        const input = document.getElementById('ctrl-xstart');
        const span = document.getElementById('ctrl-xstart-val');
        if (input) input.value = String(state.params.xStart);
        if (span) span.textContent = state.params.xStart.toFixed(2);
      }
      if (!state.codeDirty) syncPythonEditor();
      drawImmediate();
    }
  };

  canvas.addEventListener('pointerdown', (ev) => {
    dragging = true;
    canvas.setPointerCapture(ev.pointerId);
    updateFromPointer(ev.clientX, ev.clientY);
  });

  canvas.addEventListener('pointermove', (ev) => {
    if (!dragging) return;
    updateFromPointer(ev.clientX, ev.clientY);
  });

  canvas.addEventListener('pointerup', () => {
    dragging = false;
  });
}

/* ── Export & Hybrid Server Actions ── */
function exportPngFrame() {
  drawImmediate();
  const preset = activePreset();
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `3c1c_${preset.id}_${state.stageTheme}.png`;
  a.click();
  showToast(`Saved high-resolution PNG frame (${canvas.width}×${canvas.height}).`);
}

async function recordWebmClip() {
  if (state.recording) return;
  if (!canvas.captureStream || typeof MediaRecorder === 'undefined') {
    showToast('MediaRecorder is not supported in this browser.');
    return;
  }

  state.recording = true;
  els.btnRecordWebm.disabled = true;
  const origLoop = state.loop;
  state.loop = false;
  state.time = 0;
  state.playing = true;
  els.btnPlay.textContent = 'Pause';

  const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : 'video/webm';
  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, {
    mimeType: mime,
    videoBitsPerSecond: 6_000_000,
  });

  const chunks = [];
  recorder.ondataavailable = (ev) => {
    if (ev.data && ev.data.size > 0) chunks.push(ev.data);
  };

  showToast('Recording browser clip from 0.00s…');
  recorder.start();

  const waitMs = Math.ceil((state.duration / state.speed) * 1000) + 180;
  await new Promise((resolve) => setTimeout(resolve, waitMs));

  recorder.stop();
  await new Promise((resolve) => {
    recorder.onstop = resolve;
  });

  const blob = new Blob(chunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  const preset = activePreset();
  const a = document.createElement('a');
  a.href = url;
  a.download = `3c1c_${preset.id}_${state.aspect.replace(':', 'x')}.webm`;
  a.click();

  state.recording = false;
  state.loop = origLoop;
  els.btnRecordWebm.disabled = false;
  showToast(`Exported WebM video clip (${(blob.size / 1024).toFixed(0)} KB).`);
}

async function renderServerMp4() {
  if (!state.serverOnline) {
    showToast('Static mode active — recording WebM clip in browser instead.');
    await recordWebmClip();
    return;
  }

  const preset = activePreset();
  els.btnRenderMp4.disabled = true;
  els.btnRenderMp4.textContent = 'Rendering MP4…';
  showToast('Rendering H.264 MP4 on 3c1c Python server…', 10000);

  try {
    const resp = await fetch('/api/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        preset_id: preset.id,
        scene_name: preset.sceneClass,
        theme: state.stageTheme,
        aspect: state.aspect,
        watermark: state.watermark,
        duration: 4.0,
        fps: 30,
        params: state.params,
      }),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.detail || `HTTP ${resp.status}`);
    }
    const data = await resp.json();
    const link = document.createElement('a');
    link.href = data.download_url;
    link.download = data.filename;
    link.click();

    const kb = Math.round((data.size_bytes || 0) / 1024);
    showToast(
      `MP4 rendered via ${data.renderer} (${kb} KB). <a href="${data.download_url}" download="${data.filename}">Download again</a>`,
      7000
    );
  } catch (err) {
    showToast(`MP4 render failed: ${err.message}`);
  } finally {
    els.btnRenderMp4.disabled = false;
    els.btnRenderMp4.textContent = 'Render MP4';
  }
}

async function checkBackendHealth() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 2200);
  try {
    const resp = await fetch('/api/health', { signal: ctrl.signal });
    clearTimeout(timer);
    if (!resp.ok) throw new Error('offline');
    const data = await resp.json();
    state.serverOnline = true;
    state.serverInfo = data;
    els.engineStatus.classList.add('online');
    els.engineStatusText.textContent = data.mp4_ready
      ? `3c1c v${data.version} · Python MP4 Ready`
      : `3c1c v${data.version} · Connected`;
  } catch {
    state.serverOnline = false;
    els.engineStatus.classList.remove('online');
    els.engineStatusText.textContent = 'Browser Engine · Static';
  }
}

async function validatePythonScript() {
  const code = els.codeEditor.value;
  if (state.serverOnline) {
    try {
      const resp = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const res = await resp.json();
      if (res.valid) {
        els.validationMsg.textContent = `Valid Python AST · Scene classes: ${res.scenes.join(', ') || 'None'}`;
        els.validationMsg.className = 'validation-msg ok';
      } else {
        els.validationMsg.textContent = `SyntaxError — ${res.error}`;
        els.validationMsg.className = 'validation-msg err';
      }
      return;
    } catch {
      // Fallback below
    }
  }

  const hasScene = /class\s+\w+\s*\(\s*(ClipSATScene|Scene)/.test(code);
  const hasConstruct = /def\s+construct\s*\(\s*self\s*\)\s*:/.test(code);
  if (hasScene && hasConstruct) {
    els.validationMsg.textContent = 'Static check passed · ClipSATScene.construct(self) detected.';
    els.validationMsg.className = 'validation-msg ok';
  } else {
    els.validationMsg.textContent = 'Expected a ClipSATScene subclass defining construct(self).';
    els.validationMsg.className = 'validation-msg err';
  }
}

function escapeAttr(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ── Event Wiring ── */
function initEvents() {
  if (els.sceneSearch) {
    els.sceneSearch.addEventListener('input', () => {
      state.searchQuery = els.sceneSearch.value || '';
      renderSceneLibrary();
    });
  }

  els.btnPlay.addEventListener('click', () => {
    if (state.time >= state.duration) state.time = 0;
    state.playing = !state.playing;
    els.btnPlay.textContent = state.playing ? 'Pause' : 'Play';
  });

  els.btnRestart.addEventListener('click', () => {
    state.time = 0;
    state.playing = true;
    els.btnPlay.textContent = 'Pause';
    drawImmediate();
  });

  els.btnStepBack.addEventListener('click', () => {
    state.playing = false;
    els.btnPlay.textContent = 'Play';
    state.time = Math.max(0, state.time - 1 / 30);
    drawImmediate();
  });

  els.btnStepFwd.addEventListener('click', () => {
    state.playing = false;
    els.btnPlay.textContent = 'Play';
    state.time = Math.min(state.duration, state.time + 1 / 30);
    drawImmediate();
  });

  els.btnLoop.addEventListener('click', () => {
    state.loop = !state.loop;
    applyStageToolbar();
  });

  els.scrubber.addEventListener('input', () => {
    state.time = (Number(els.scrubber.value) / 1000) * state.duration;
    drawImmediate();
  });

  els.selectSpeed.addEventListener('change', () => {
    state.speed = Number(els.selectSpeed.value);
  });

  document.querySelectorAll('[data-aspect]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.aspect = btn.dataset.aspect;
      applyStageToolbar();
      if (!state.codeDirty) syncPythonEditor();
      drawImmediate();
    });
  });

  els.btnStageTheme.addEventListener('click', () => {
    state.stageTheme = state.stageTheme === 'dark' ? 'paper' : 'dark';
    applyStageToolbar();
    if (!state.codeDirty) syncPythonEditor();
    drawImmediate();
  });

  els.btnWatermark.addEventListener('click', () => {
    state.watermark = !state.watermark;
    applyStageToolbar();
    if (!state.codeDirty) syncPythonEditor();
    drawImmediate();
  });

  els.btnUiTheme.addEventListener('click', () => {
    state.uiTheme = state.uiTheme === 'dark' ? 'paper' : 'dark';
    applyUiTheme();
  });

  els.btnExportPng.addEventListener('click', exportPngFrame);
  els.btnRecordWebm.addEventListener('click', recordWebmClip);
  els.btnRenderMp4.addEventListener('click', renderServerMp4);

  // Inspector Tabs
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.tab-panel').forEach((panel) => {
        panel.classList.toggle('active', panel.id === `panel-${target}`);
      });
    });
  });

  els.codeEditor.addEventListener('input', () => {
    state.codeDirty = true;
  });

  els.btnValidatePy.addEventListener('click', validatePythonScript);

  els.btnCopyPy.addEventListener('click', async () => {
    await navigator.clipboard.writeText(els.codeEditor.value);
    showToast('Copied 3c1c Python scene script to clipboard.');
  });

  els.btnDownloadPy.addEventListener('click', () => {
    const preset = activePreset();
    const blob = new Blob([els.codeEditor.value], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${preset.sceneClass}.py`;
    a.click();
    showToast(`Downloaded ${preset.sceneClass}.py`);
  });

  // Keyboard shortcuts (Space = Play/Pause, Arrows = Step)
  window.addEventListener('keydown', (ev) => {
    const tag = (ev.target && ev.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (ev.code === 'Space') {
      ev.preventDefault();
      els.btnPlay.click();
    } else if (ev.code === 'ArrowLeft') {
      ev.preventDefault();
      els.btnStepBack.click();
    } else if (ev.code === 'ArrowRight') {
      ev.preventDefault();
      els.btnStepFwd.click();
    }
  });
}

/* ── Initialize Studio ── */
applyUiTheme();
applyStageToolbar();
renderCategoryBar();
initEvents();
setupCanvasDragging();
selectPreset(0);
checkBackendHealth();

window.addEventListener('load', () => {
  renderRigorCard();
  drawImmediate();
});

requestAnimationFrame((ts) => {
  lastFrameTs = ts;
  requestAnimationFrame(tick);
});

