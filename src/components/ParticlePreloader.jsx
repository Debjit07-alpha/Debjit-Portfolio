import { useEffect, useRef, useState } from "react";

/**
 * ParticlePreloader — cinematic red particle-face initial loader.
 *
 * BLACK + CRIMSON (#FF1F3D / #E5092F) + near-black #050505.
 * Canvas owns all per-frame rendering (no React state per frame).
 * React only owns lifecycle: mount → lock scroll → animate → fade → unmount.
 *
 * Face targets: procedural human-face density field by default (no image
 * shown). If /portrait.png loads fast enough, targets are smoothly morphed
 * toward luminance-sampled coordinates from that asset (hidden source data).
 */

const T_CONVERGE_END = 1.7; // particles arrive
const T_HOLD_END = 3.4; // face holds with living motion
const T_DISSOLVE_END = 4.3; // particles disperse
const T_EXIT = 4.8; // wrapper fade begins
const EXIT_FADE_MS = 500;

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// deterministic rng so the face is stable, not random mush each load
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ellipse(x, y, cx, cy, rx, ry) {
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  const d2 = dx * dx + dy * dy;
  if (d2 >= 1) return 0;
  return 1 - d2; // 0..1 falloff
}

/** Density field for a frontal abstract human face in normalized coords. */
function faceDensity(nx, ny) {
  // base head mass
  let d = 0.34 * ellipse(nx, ny, 0, 0.02, 0.62, 0.86);

  // hair silhouette — top cap + sides
  d += 0.55 * ellipse(nx, ny, 0, -0.62, 0.6, 0.34);
  d += 0.3 * ellipse(nx, ny, -0.52, -0.2, 0.16, 0.42);
  d += 0.3 * ellipse(nx, ny, 0.52, -0.2, 0.16, 0.42);

  // forehead plane
  d += 0.3 * ellipse(nx, ny, 0, -0.36, 0.36, 0.16);

  // brows + eyes (strongest features)
  d += 0.85 * ellipse(nx, ny, -0.235, -0.2, 0.15, 0.045);
  d += 0.85 * ellipse(nx, ny, 0.235, -0.2, 0.15, 0.045);
  d += 1.25 * ellipse(nx, ny, -0.235, -0.075, 0.125, 0.06);
  d += 1.25 * ellipse(nx, ny, 0.235, -0.075, 0.125, 0.06);

  // nose ridge + nostrils
  d += 0.55 * ellipse(nx, ny, 0, 0.1, 0.055, 0.17);
  d += 0.9 * ellipse(nx, ny, -0.075, 0.29, 0.055, 0.045);
  d += 0.9 * ellipse(nx, ny, 0.075, 0.29, 0.055, 0.045);
  d += 0.4 * ellipse(nx, ny, 0, 0.27, 0.1, 0.05);

  // cheekbones
  d += 0.42 * ellipse(nx, ny, -0.33, 0.14, 0.12, 0.09);
  d += 0.42 * ellipse(nx, ny, 0.33, 0.14, 0.12, 0.09);

  // lips — upper strong, lower soft
  d += 1.15 * ellipse(nx, ny, 0, 0.45, 0.14, 0.048);
  d += 0.5 * ellipse(nx, ny, 0, 0.53, 0.1, 0.035);

  // chin
  d += 0.6 * ellipse(nx, ny, 0, 0.7, 0.12, 0.09);

  // jawline edge emphasis (ellipse boundary, lower half)
  const jx = nx / 0.62;
  const jy = (ny - 0.02) / 0.86;
  const r = Math.sqrt(jx * jx + jy * jy);
  if (ny > 0.05 && Math.abs(r - 1) < 0.1) d += 0.9 * (1 - Math.abs(r - 1) / 0.1);

  return d;
}

function sampleProceduralFace(count, cx, cy, scale, rng) {
  const pts = [];
  let guard = count * 40;
  while (pts.length < count && guard-- > 0) {
    const nx = (rng() * 2 - 1) * 0.78;
    const ny = (rng() * 2 - 1) * 1.05 - 0.05;
    const dens = faceDensity(nx, ny);
    if (dens <= 0.02) continue;
    if (rng() > dens / 2.6) continue;
    pts.push({ x: cx + nx * scale, y: cy + ny * scale, w: Math.min(1, dens / 1.6) });
  }
  // fallback: fill remainder on head ellipse
  while (pts.length < count) {
    const a = rng() * Math.PI * 2;
    const r = Math.sqrt(rng());
    pts.push({
      x: cx + Math.cos(a) * r * 0.55 * scale,
      y: cy + Math.sin(a) * r * 0.75 * scale,
      w: 0.3,
    });
  }
  return pts;
}

/** Sample hidden portrait asset -> face-rect target points. Returns null on failure. */
function samplePortraitTargets(img, count, cx, cy, faceW, faceH, rng) {
  try {
    const SW = 150;
    const SH = 190;
    const off = document.createElement("canvas");
    off.width = SW;
    off.height = SH;
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return null;
    // cover-crop the source into the sample box
    const ir = img.width / img.height;
    const sr = SW / SH;
    let dw = SW;
    let dh = SH;
    let dx = 0;
    let dy = 0;
    if (ir > sr) {
      dh = SH;
      dw = SH * ir;
      dx = (SW - dw) / 2;
    } else {
      dw = SW;
      dh = SW / ir;
      dy = (SH - dh) / 2 - SH * 0.04;
    }
    octx.fillStyle = "#000";
    octx.fillRect(0, 0, SW, SH);
    octx.drawImage(img, dx, dy, dw, dh);
    const data = octx.getImageData(0, 0, SW, SH).data;

    const lum = new Float32Array(SW * SH);
    for (let i = 0; i < SW * SH; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      lum[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    // weight: luminance (skin/hair mass) + edge boost, masked to center oval
    const weights = new Float32Array(SW * SH);
    let total = 0;
    for (let y = 0; y < SH; y++) {
      for (let x = 0; x < SW; x++) {
        const i = y * SW + x;
        const ex = (x / SW - 0.5) * 2;
        const ey = (y / SH - 0.52) * 2;
        const mask = Math.max(0, 1 - (ex * ex * 1.15 + ey * ey * 0.95));
        if (mask <= 0 || lum[i] < 12) continue;
        const xm = Math.min(SW - 2, Math.max(1, x));
        const ym = Math.min(SH - 2, Math.max(1, y));
        const gx =
          lum[ym * SW + xm + 1] -
          lum[ym * SW + xm - 1];
        const gy =
          lum[(ym + 1) * SW + xm] -
          lum[(ym - 1) * SW + xm];
        const edge = Math.min(90, Math.sqrt(gx * gx + gy * gy));
        const w = (0.25 + (lum[i] / 255) * 0.9 + (edge / 90) * 0.9) * mask * mask;
        weights[i] = w;
        total += w;
      }
    }
    if (total <= 0) return null;
    // cumulative sampling
    const cum = new Float32Array(SW * SH);
    let acc = 0;
    for (let i = 0; i < weights.length; i++) {
      acc += weights[i];
      cum[i] = acc;
    }
    const pts = [];
    for (let k = 0; k < count; k++) {
      const v = rng() * acc;
      let lo = 0;
      let hi = cum.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] < v) lo = mid + 1;
        else hi = mid;
      }
      const sx = lo % SW;
      const sy = Math.floor(lo / SW);
      pts.push({
        x: cx + (sx / SW - 0.5) * faceW,
        y: cy + (sy / SH - 0.5) * faceH,
        w: 0.35 + (lum[lo] / 255) * 0.65,
      });
    }
    return pts;
  } catch {
    return null;
  }
}

function makeDotSprite(stops) {
  const S = 32;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  for (const [o, col] of stops) g.addColorStop(o, col);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return c;
}

export function ParticlePreloader({ onDone }) {
  const canvasRef = useRef(null);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      onDoneRef.current && onDoneRef.current();
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      onDoneRef.current && onDoneRef.current();
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const kTime = reduced ? 0.28 : 1; // shorten timeline for reduced motion

    // scroll / interaction lock
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    let raf = 0;
    let exitTimer = 0;
    let safetyTimer = 0;
    let lastProgUpdate = 0;
    const setProg = (v) => {
      const now = performance.now();
      if (now - lastProgUpdate > 120 || v >= 99) {
        lastProgUpdate = now;
        setProgress(v);
      }
    };

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setProgress(100);
      setExiting(true);
      exitTimer = window.setTimeout(() => {
        onDoneRef.current && onDoneRef.current();
      }, EXIT_FADE_MS);
    };

    const finishRef = { current: finish };

    // ---- sizing ----
    let W = 0;
    let H = 0;
    let DPR = 1;
    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.5 : 2);
      W = Math.floor(window.innerWidth);
      H = Math.floor(window.innerHeight);
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildScene();
    };

    // ---- sprites (red identity only: #FF163D / #E5092F / #FF4058) ----
    const spriteHot = makeDotSprite([
      [0, "rgba(255,240,243,1)"],
      [0.25, "rgba(255,64,88,0.9)"],
      [0.6, "rgba(255,22,61,0.28)"],
      [1, "rgba(229,9,47,0)"],
    ]);
    const spriteRed = makeDotSprite([
      [0, "rgba(255,90,108,1)"],
      [0.35, "rgba(255,22,61,0.75)"],
      [0.65, "rgba(210,10,42,0.22)"],
      [1, "rgba(180,0,30,0)"],
    ]);
    const spriteDeep = makeDotSprite([
      [0, "rgba(255,64,88,0.95)"],
      [0.4, "rgba(229,9,47,0.6)"],
      [0.7, "rgba(140,5,25,0.18)"],
      [1, "rgba(120,0,20,0)"],
    ]);
    const spriteDim = makeDotSprite([
      [0, "rgba(200,60,75,0.7)"],
      [0.5, "rgba(150,12,32,0.3)"],
      [1, "rgba(130,5,22,0)"],
    ]);

    // ---- scene ----
    let face = []; // particle objects
    let ambient = [];
    let faceCx = 0;
    let faceCy = 0;
    let faceScale = 0;
    const rng = mulberry32(20260214);

    function buildScene() {
      if (!W || !H) return;
      const mobile = W < 640;
      // density per spec: desktop ~8k-15k, mobile ~4k-7k (small 0.7-1.6px dots)
      const FACE_N = reduced ? 900 : mobile ? 4500 : 9000;
      const AMB_N = reduced ? 200 : mobile ? 700 : 1400;
      faceCx = W / 2;
      faceCy = H * 0.46;
      faceScale = Math.min(W, H) * (mobile ? 0.335 : 0.35);

      const targets = sampleProceduralFace(FACE_N, faceCx, faceCy, faceScale, rng);
      face = new Array(FACE_N);
      for (let i = 0; i < FACE_N; i++) {
        const t = targets[i];
        const roll = rng();
        const sprite = roll < 0.06 ? spriteHot : roll < 0.72 ? spriteRed : roll < 0.92 ? spriteDeep : spriteDim;
        const bright = roll < 0.06 ? 1 : 0.55 + t.w * 0.45;
        // outward dissolve vector: radial from face center + jitter
        const ox = t.x - faceCx;
        const oy = t.y - faceCy;
        const ol = Math.sqrt(ox * ox + oy * oy) || 1;
        const spread = 60 + rng() * 130;
        const jx = (rng() - 0.5) * 90;
        const jy = (rng() - 0.5) * 90 - 20;
        // depth layer: foreground (dense features) moves least, outer drifts most
        const depth = Math.min(1, Math.max(0, 0.25 + (1 - t.w) * 0.55 + rng() * 0.35));
        // multi-frequency flow params (slow 0.2-0.5, mid 0.5-1.0, fine 1.0-1.5)
        const f1 = 0.2 + rng() * 0.3;
        const f2 = 0.5 + rng() * 0.5;
        const f3 = 1.0 + rng() * 0.5;
        const a1 = (1.6 + rng() * 2.2) * (0.35 + depth * 0.9);
        const a2 = (0.7 + rng() * 1.3) * (0.35 + depth * 0.9);
        // tangential flow direction around face center (fluid-cloud feel)
        const tx0 = -(t.y - faceCy) / (faceScale || 1);
        const tx1 = (t.x - faceCx) / (faceScale || 1);
        const tl = Math.sqrt(tx0 * tx0 + tx1 * tx1) || 1;
        face[i] = {
          sx: rng() * W,
          sy: rng() * H,
          tx: t.x,
          ty: t.y,
          bx: t.x, // blend-from (portrait morph)
          by: t.y,
          mx: t.x, // morphed target
          my: t.y,
          ox: (ox / ol) * spread + jx,
          oy: (oy / ol) * spread + jy,
          size:
            roll < 0.06
              ? 1.3 + rng() * 0.9 // hot feature accents slightly larger
              : 0.7 + rng() * 0.9, // spec: 0.7-1.6px
          alpha: (0.5 + rng() * 0.5) * bright,
          sprite,
          d1: rng() * 0.45,
          dur1: 0.85 + rng() * 0.4,
          d2: rng() * 0.35,
          dur2: 0.5 + rng() * 0.4,
          phase: rng() * Math.PI * 2,
          phase2: rng() * Math.PI * 2,
          flick: 2 + rng() * 4,
          depth,
          f1,
          f2,
          f3,
          a1,
          a2,
          // tangential unit vector for slow orbital flow
          fx: tx0 / tl,
          fy: tx1 / tl,
          flowAmp: (1.2 + rng() * 2.6) * (0.3 + depth),
        };
      }
      // ambient field: denser near face, sparse at edges
      const maxR = Math.hypot(W, H) / 2;
      ambient = new Array(AMB_N);
      for (let i = 0; i < AMB_N; i++) {
        let x;
        let y;
        if (rng() < 0.62) {
          const a = rng() * Math.PI * 2;
          const r = maxR * Math.pow(rng(), 1.7);
          x = faceCx + Math.cos(a) * r;
          y = faceCy + Math.sin(a) * r * 0.9;
        } else {
          x = rng() * W;
          y = rng() * H;
        }
        ambient[i] = {
          x: Math.max(-20, Math.min(W + 20, x)),
          y: Math.max(-20, Math.min(H + 20, y)),
          size: 0.7 + rng() * 1.3,
          alpha: 0.12 + rng() * 0.33,
          phase: rng() * Math.PI * 2,
          speed: 0.3 + rng() * 0.7,
          sprite: rng() < 0.8 ? spriteDeep : spriteDim,
        };
      }
    }

    // ---- hidden portrait enhance (never displayed, only sampled) ----
    let morph = null; // { from, to, start }
    try {
      const img = new Image();
      img.decoding = "async";
      const onImg = () => {
        try {
          if (!face.length || !W) return;
          const el = (performance.now() - t0) / 1000;
          if (el > 1.1 * kTime) return; // too late — avoid popping the formed face
          const targets = samplePortraitTargets(
            img,
            face.length,
            faceCx,
            faceCy,
            faceScale * 1.55,
            faceScale * 2.1,
            mulberry32(77)
          );
          if (!targets || targets.length !== face.length) return;
          // blend procedural -> portrait over ~0.45s inside the rAF loop
          morph = { to: targets, start: performance.now() / 1000 };
          for (let i = 0; i < face.length; i++) {
            face[i].bx = face[i].mx;
            face[i].by = face[i].my;
          }
        } catch {
          /* keep procedural face */
        }
      };
      img.onload = onImg;
      img.src = "/portrait.png";
    } catch {
      /* keep procedural face */
    }

    // ---- main loop ----
    const t0 = performance.now();
    let frame = 0;

    function draw(nowMs) {
      const el = (nowMs - t0) / 1000 / kTime;
      frame++;

      // portrait morph blending
      if (morph) {
        const mp = clamp01((nowMs / 1000 - morph.start) / 0.45);
        const e = easeInOutCubic(mp);
        const to = morph.to;
        for (let i = 0; i < face.length; i++) {
          const p = face[i];
          const tt = to[i];
          p.mx = p.bx + (tt.x - p.bx) * e;
          p.my = p.by + (tt.y - p.by) * e;
        }
        if (mp >= 1) morph = null;
      }

      // bg
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);

      // faint red bloom behind face (single gradient — cheap, pulses with breath)
      const bloomR = faceScale * 1.9;
      const bloom = ctx.createRadialGradient(faceCx, faceCy, 0, faceCx, faceCy, bloomR);
      const breathPulse = 0.5 + 0.5 * Math.sin(el * 0.6);
      const bloomBase =
        el < T_CONVERGE_END ? 0.02 + 0.05 * (el / T_CONVERGE_END) : 0.06 + 0.015 * breathPulse;
      const fadeBloom =
        el > T_HOLD_END
          ? Math.max(0, bloomBase * (1 - (el - T_HOLD_END) / (T_DISSOLVE_END - T_HOLD_END)))
          : bloomBase;
      bloom.addColorStop(0, `rgba(255,21,56,${fadeBloom.toFixed(3)})`);
      bloom.addColorStop(1, "rgba(255,21,56,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(faceCx - bloomR, faceCy - bloomR, bloomR * 2, bloomR * 2);

      // particles (additive)
      ctx.globalCompositeOperation = "lighter";

      const tSec = el;
      const dissolving = tSec > T_HOLD_END;
      const dq = dissolving ? clamp01((tSec - T_HOLD_END) / (T_DISSOLVE_END - T_HOLD_END)) : 0;

      // whole-face breath: ±1.2% scale oscillation around face center (alive, stable)
      const breath = 1 + 0.012 * Math.sin(tSec * 0.7);

      for (let i = 0; i < face.length; i++) {
        const p = face[i];
        // converge
        const cp = clamp01((tSec - p.d1) / p.dur1);
        const ce = easeInOutCubic(cp);
        // base target with breath applied around face center
        const bx = faceCx + (p.mx - faceCx) * breath;
        const by = faceCy + (p.my - faceCy) * breath;
        let hx = p.sx + (bx - p.sx) * ce;
        let hy = p.sy + (by - p.sy) * ce;
        // LIVING MOTION: base + noise + flow + depth (smooth sinusoids only —
        // no jitter, no teleporting; face stays ~90% recognizable)
        // slow drift layer (0.2-0.5) + mid layer (0.5-1.0) + fine layer (1.0-1.5)
        const n1x = Math.sin(tSec * p.f1 * 2 + p.phase) * p.a1;
        const n1y = Math.cos(tSec * p.f1 * 1.7 + p.phase * 1.3) * p.a1;
        const n2 = Math.sin(tSec * p.f2 * 2 + p.phase2 + p.my * 0.015);
        const n2x = n2 * p.a2;
        const n2y = Math.cos(tSec * p.f2 * 1.6 + p.phase2 + p.mx * 0.012) * p.a2;
        const n3x = Math.sin(tSec * p.f3 * 2 + p.phase * 0.6 + p.my * 0.03) * 0.7;
        const n3y = Math.cos(tSec * p.f3 * 1.8 + p.phase2 * 0.7) * 0.7;
        // slow tangential flow around the face (fluid digital cloud)
        const fl = Math.sin(tSec * 0.45 + p.phase2) * p.flowAmp;
        const flowX = p.fx * fl;
        const flowY = p.fy * fl;
        // traveling morph wave sweeping down the face (surface movement)
        const wave = Math.sin(p.my * 0.02 - tSec * 1.1 + p.phase * 0.3) * (1 + p.depth * 2);
        hx += (n1x + n2x + n3x + flowX) * ce + wave * ce * 0.6;
        hy += (n1y + n2y + n3y + flowY) * ce + Math.cos(p.mx * 0.018 - tSec * 0.9) * ce * 0.8;
        let alpha = p.alpha * (0.25 + 0.75 * ce);
        // subtle flicker during hold
        if (cp >= 1) alpha *= 0.84 + 0.16 * Math.sin(tSec * p.flick + p.phase);
        if (((i * 7919 + frame * 13) % 311 === 0)) alpha *= 0.35;
        // dissolve: outward + fade (particles themselves disperse)
        if (dissolving) {
          const qp = clamp01((tSec - T_HOLD_END - p.d2 * 0.6) / p.dur2);
          const qe = easeOutCubic(qp);
          hx += p.ox * qe;
          hy += p.oy * qe + qe * 24;
          alpha *= 1 - qe;
        }
        if (alpha <= 0.004) continue;
        const s = p.size * (1 + 0.25 * Math.sin(tSec * 1.3 + p.phase));
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.drawImage(p.sprite, hx - s, hy - s, s * 2, s * 2);
      }

      // ambient drift (never forms the face; occasionally breathes toward/away)
      for (let i = 0; i < ambient.length; i++) {
        const a = ambient[i];
        const toward = Math.sin(tSec * 0.3 * a.speed + a.phase * 2.1); // -1..1 radial
        const dx = faceCx - a.x;
        const dy = faceCy - a.y;
        const dl = Math.sqrt(dx * dx + dy * dy) || 1;
        const ax =
          a.x +
          Math.sin(tSec * 0.35 * a.speed + a.phase) * 14 +
          (dx / dl) * toward * 16;
        const ay =
          a.y +
          Math.cos(tSec * 0.28 * a.speed + a.phase * 1.7) * 12 +
          (dy / dl) * toward * 14;
        let alpha = a.alpha * (0.7 + 0.3 * Math.sin(tSec * 0.8 + a.phase));
        if (dissolving) alpha *= 1 - dq;
        if (alpha <= 0.004) continue;
        ctx.globalAlpha = alpha;
        const s = a.size;
        ctx.drawImage(a.sprite, ax - s, ay - s, s * 2, s * 2);
      }
      ctx.globalAlpha = 1;

      // ultra-subtle scanline sweep
      ctx.globalCompositeOperation = "source-over";
      const scanH = 110;
      const scanY = ((el * 0.22) % 1.3 - 0.15) * H;
      if (!dissolving && scanY > -scanH && scanY < H + scanH) {
        const g = ctx.createLinearGradient(0, scanY - scanH / 2, 0, scanY + scanH / 2);
        g.addColorStop(0, "rgba(255,21,56,0)");
        g.addColorStop(0.5, "rgba(255,21,56,0.045)");
        g.addColorStop(1, "rgba(255,21,56,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, scanY - scanH / 2, W, scanH);
      }

      setProg(Math.min(99, Math.round((el / T_EXIT) * 100)));

      if (el >= T_EXIT) {
        finishRef.current();
        return;
      }
      raf = requestAnimationFrame(draw);
    }

    resize(); // sizes canvas + builds scene (W/H start at 0, so buildScene alone would no-op)
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    safetyTimer = window.setTimeout(() => finish(), (T_EXIT * kTime + 1.5) * 1000);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
      window.clearTimeout(safetyTimer);
      window.removeEventListener("resize", resize);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#050505] transition-opacity duration-500"
      style={{ opacity: exiting ? 0 : 1, pointerEvents: exiting ? "none" : "auto" }}
      role="status"
      aria-label="Loading portfolio"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" aria-hidden="true" />
      {/* minimal status line — no spinners, no imagery */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
        <div className="w-48 md:w-64 h-px bg-[#1C1C1C] relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#FF1538]"
            style={{ width: `${progress}%`, transition: "width 120ms linear" }}
          />
        </div>
        <p className="font-mono-tech text-[10px] tracking-[0.35em] text-[#6B6B6B] uppercase">
          Particle scan <span className="text-[#F5F5F5]">{progress}%</span>
        </p>
      </div>
    </div>
  );
}
