/**
 * Experience v1 — the glue between the passage and the world.
 *
 * The engine (scrollcraft.js) pins the acts and cues the type. This file turns
 * the scroll position into ONE continuous timeline t ∈ [0, 4) for the world in
 * scene.js, so the four acts are states of the same environment rather than
 * four scenes. Inside a pinned act, p 0..1 maps to [i, i + 0.85]; the one
 * viewport where one stage slides out and the next slides in maps to
 * [i + 0.85, i + 1], so the world keeps moving through the seam.
 *
 * Fallbacks: before the WebGL library has loaded, without WebGL, on low-power
 * devices, and under reduced motion, the stage shows stills rendered from the
 * same world (assets/stills), stepped by t.
 *
 * ?t=2.6 renders that timeline value alone (used to render the stills).
 */
(function () {
  'use strict';
  var worldEl = document.getElementById('world');
  var canvas = document.getElementById('stage');
  var poster = document.getElementById('poster');
  var labelsEl = document.getElementById('labels');
  var stateEl = document.getElementById('state');
  var stateText = document.getElementById('state-text');
  var acts = Array.prototype.slice.call(document.querySelectorAll('[data-x-act]'));
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var params = new URLSearchParams(location.search);
  var stillT = params.has('t') ? parseFloat(params.get('t')) : null;
  var webgl = (function () { try { var c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } })();
  var lowPower = (navigator.deviceMemory && navigator.deviceMemory < 3) || (navigator.connection && navigator.connection.saveData);
  var useStills = stillT === null && (reduce || !webgl || lowPower);
  var TOTAL = acts.length;
  var SEAM = 0.85;

  /* ---------------------------------------------------------------- timeline */
  var geo = [];
  function layout() {
    geo = acts.map(function (el) {
      var r = el.getBoundingClientRect();
      return { top: r.top + scrollY, height: r.height };
    });
  }
  function timeline() {
    var y = scrollY || pageYOffset, vh = innerHeight;
    if (!geo.length) return 0;
    if (y <= geo[0].top) return 0;
    for (var i = 0; i < geo.length; i++) {
      var g = geo[i], pinEnd = g.top + g.height - vh, next = i + 1 < geo.length ? geo[i + 1].top : g.top + g.height;
      if (y < pinEnd) return i + SEAM * Math.max(0, (y - g.top) / Math.max(pinEnd - g.top, 1));
      if (y < next) return i + SEAM + (1 - SEAM) * Math.min(1, (y - pinEnd) / Math.max(next - pinEnd, 1));
    }
    return TOTAL - 0.001;
  }

  /* --------------------------------------------------------------- readout */
  function readout(t, s) {
    var st, txt;
    if (t < 1) { st = 'dawn'; txt = '7:40 · Tuesday'; }
    else if (t < 1.9) { st = 'exposed'; txt = 'what’s underneath'; }
    else if (t < 2.45) { st = 'drift'; txt = 'heading <b>348°</b>'; }
    else if (t < 2.9) { st = 'de'; txt = 'heading <b>' + (s ? s.heading : 348) + '°</b>'; }
    else { st = 'level'; txt = 'heading <b>360°</b> · on course'; }
    if (stateEl.dataset.s !== st) stateEl.dataset.s = st;
    if (stateText.dataset.txt !== txt) { stateText.dataset.txt = txt; stateText.innerHTML = txt; }
  }

  /* ---------------------------------------------------------------- poster */
  var posterImgs = Array.prototype.slice.call(poster.querySelectorAll('img'));
  function posterFor(t) { return t < 1 ? 0 : t < 2 ? 1 : t < 2.45 ? 2 : t < 3 ? 3 : 4; }
  function showPoster(t) {
    var k = posterFor(t);
    posterImgs.forEach(function (img, i) { img.classList.toggle('on', i === k); });
  }

  /* ---------------------------------------------------------------- labels */
  var LABELS = [
    { key: 'identity', text: 'identity', from: 1.1, to: 2.42 },
    { key: 'devices', text: 'devices', from: 1.17, to: 2.42 },
    { key: 'email', text: 'email', from: 1.25, to: 2.42, m: true },
    { key: 'data', text: 'data', from: 1.3, to: 2.42, m: true },
    { key: 'network', text: 'network', from: 1.36, to: 2.42 },
    { key: 'applications', text: 'applications', from: 1.41, to: 2.42, m: true },
    { key: 'customers', text: 'customers', from: 1.47, to: 2.42 },
    { key: 'vendor0', text: 'vendor', from: 1.52, to: 2.42, cls: 'vendor', m: true },
    { key: 'vendor1', text: 'vendor', from: 1.56, to: 2.42, cls: 'vendor', m: true },
    { key: 'vendor2', text: 'vendor · carrier', from: 1.6, to: 2.42, cls: 'vendor' },
    { key: 'exc0', text: 'backup untested', from: 1.78, to: 2.62, cls: 'amber' },
    { key: 'exc1', text: 'unpatched', from: 1.83, to: 2.66, cls: 'amber', m: true },
    { key: 'exc2', text: 'shared mailbox', from: 1.88, to: 2.7, cls: 'amber', m: true },
    { key: 'exc3', text: 'guest network open', from: 1.93, to: 2.74, cls: 'amber' },
    { key: 'de', html: '<b>DE</b> · taking the heading', from: 2.58, to: 3.35, cls: 'de' },
  ];
  var labelNodes = LABELS.map(function (l) {
    var el = document.createElement('div');
    el.className = 'x-label' + (l.cls ? ' ' + l.cls : '') + (l.m ? ' m-hide' : '');
    if (l.html) el.innerHTML = l.html; else el.textContent = l.text;
    labelsEl.appendChild(el); return el;
  });
  var pt = { x: 0, y: 0, behind: false };
  function placeLabels(t, world) {
    var w = innerWidth, h = innerHeight;
    LABELS.forEach(function (l, i) {
      var el = labelNodes[i];
      var on = t >= l.from && t <= l.to;
      var a = world.anchors[l.key];
      if (!on || !a) { if (el.style.opacity !== '0') el.style.opacity = '0'; return; }
      world.project(a, pt);
      var vis = !pt.behind && pt.x > 12 && pt.x < w - 12 && pt.y > 60 && pt.y < h - 40;
      el.style.transform = 'translate(' + pt.x.toFixed(1) + 'px,' + pt.y.toFixed(1) + 'px) translate(-50%,-100%)';
      var fade = Math.min(1, (t - l.from) / 0.06, (l.to - t) / 0.08);
      el.style.opacity = vis ? Math.max(0, fade).toFixed(2) : '0';
    });
  }

  /* ------------------------------------------------------------------ boot */
  layout();
  addEventListener('resize', function () { layout(); if (world) world.resize(); }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  addEventListener('load', layout);

  var world = null, lastT = -1, lastTime = 0, running = false;
  // frame accounting for the prototype report: window.__xStats = { n, ms }
  var stats = { n: 0, ms: 0 }; window.__xStats = stats;

  function frame(now) {
    running = false;
    var t = stillT !== null ? stillT : timeline();
    var dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 0.016; lastTime = now;
    var onScreen = stillT !== null || scrollY < geo[geo.length - 1].top + geo[geo.length - 1].height;
    if (!onScreen) { lastT = t; return; }
    var t0 = performance.now();
    var s = world.update(t, dt);
    world.render();
    stats.n++; stats.ms += performance.now() - t0;
    placeLabels(t, world);
    readout(t, s);
    lastT = t;
    if (stillT !== null) { document.documentElement.setAttribute('data-still-ready', '1'); return; }
    schedule();
  }
  function schedule() { if (!running) { running = true; requestAnimationFrame(frame); } }

  function startStills() {
    worldEl.classList.remove('live');
    var tick = function () { var t = timeline(); showPoster(t); readout(t, null); };
    addEventListener('scroll', tick, { passive: true }); tick();
  }

  if (useStills) { startStills(); return; }

  // Stills carry the first paint; the world takes over once the library and
  // the scene have loaded and rendered their first frame.
  showPoster(timeline());
  // The single-file artifact build inlines scene.js as a module that announces
  // itself on window.__sceneModule; the served build imports it lazily.
  function loadScene() {
    if (window.__sceneModule) return Promise.resolve(window.__sceneModule);
    if (window.__xArtifact) return new Promise(function (resolve, reject) {
      document.addEventListener('x-scene', function () { resolve(window.__sceneModule); }, { once: true });
      setTimeout(function () { if (!window.__sceneModule) reject(new Error('scene module did not load')); }, 20000);
    });
    return import('./scene.js');
  }
  loadScene().then(function (mod) {
    var isPhone = innerWidth < 640;
    world = mod.createWorld(canvas, { maxDpr: isPhone ? 1.25 : 1.5, shadows: !isPhone });
    if (stillT !== null) document.documentElement.setAttribute('data-still', '1');
    world.resize();
    world.update(stillT !== null ? stillT : timeline(), 0.016);
    world.render();
    worldEl.classList.add('live');
    addEventListener('scroll', schedule, { passive: true });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) schedule(); });
    schedule();
  }).catch(function (err) {
    console.warn('[experience] world unavailable, stills only', err);
    startStills();
  });
})();
