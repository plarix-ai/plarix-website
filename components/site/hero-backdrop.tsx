"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero surface.
 *
 * A full-viewport fragment shader rendering light raking across brushed metal:
 * the logo's own material at viewport scale. It is drawn live at the device pixel
 * ratio, so it is genuinely sharp on a 4K or 5K panel in a way no encoded video is,
 * and it carries no download weight at all.
 *
 * The surface is graded in the shader rather than under a scrim: brightness falls
 * toward the lower left, which is exactly where the headline sits. Output is
 * dithered, because an eight bit near-black gradient bands badly without it.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uDpr;
uniform float uNarrow;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise1(float x) {
  float i = floor(x);
  float f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash11(i), hash11(i + 1.0), f);
}

float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise2(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

/* What the metal reflects: a few soft bars of light on an otherwise dark room. */
float env(float r, float t) {
  float v = 0.010;
  v += 0.46 * exp(-pow((r - (0.22 + 0.26 * sin(t * 0.061))) * 4.6, 2.0));
  v += 0.15 * exp(-pow((r - (-0.78 + 0.30 * sin(t * 0.047 + 2.1))) * 2.6, 2.0));
  v += 0.10 * exp(-pow((r - (1.12 + 0.20 * sin(t * 0.038 + 4.0))) * 5.0, 2.0));
  return v;
}

void main() {
  vec2 frag = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime;

  /* The panel is formed, not flat, so the highlights bend as they travel. */
  vec2 warp = vec2(
    fbm(p * 1.05 + vec2(t * 0.013, 0.0)),
    fbm(p * 1.05 + vec2(5.2, -t * 0.011))
  );
  vec2 q = p + (warp - 0.5) * 0.26;

  /* Brush direction: a slow diagonal that drifts a little across the surface. */
  float ang = 0.30 + (fbm(p * 0.55) - 0.5) * 0.28;
  vec2 dir = vec2(cos(ang), sin(ang));
  vec2 perp = vec2(-dir.y, dir.x);

  float across = dot(q, perp);
  float along = dot(q, dir);

  /*
   * The grain. Kept in CSS pixels rather than device pixels so the brush reads at
   * the same density on a retina panel as on a standard one, instead of aliasing
   * into noise.
   */
  float gc = dot(gl_FragCoord.xy, perp) / uDpr;
  float grain = noise1(gc * 0.62 + along * 40.0) - 0.5;
  grain += (noise1(gc * 0.17 + 11.0) - 0.5) * 0.75;
  grain += (noise1(gc * 2.30 + 41.0) - 0.5) * 0.30;
  /* One octave finer than a CSS pixel, so a retina panel resolves detail a
     standard one cannot. On a 1x display it averages away harmlessly. */
  grain += (noise1(dot(gl_FragCoord.xy, perp) * 1.15 + 77.0) - 0.5) * 0.18;

  float r = across * 2.25 + grain * 0.115;

  float spec = env(r, t);

  /* A faint second bounce, offset, which is what stops it reading as a flat ramp. */
  spec += 0.09 * env(r * 1.7 - 0.6, t * 0.8);

  /* Broad, very dim ambient so the darkest areas are not perfectly dead. */
  float amb = 0.022 + 0.022 * fbm(q * 1.6 + vec2(0.0, t * 0.02));

  /*
   * Grade the surface instead of laying a scrim over it. Brightness rises toward
   * the upper right; the lower left, where the headline sits, falls to near black.
   */
  float axis = frag.x * 0.44 + frag.y * 0.80;
  float bed = smoothstep(0.06, 1.02, axis);
  bed = pow(bed, mix(2.10, 2.90, uNarrow));

  /*
   * The navigation sits in the top strip and has to stay legible, so the surface
   * is held down there no matter where the highlight has travelled to.
   */
  float navGuard = smoothstep(1.0, 0.80, frag.y);
  navGuard = mix(0.34, 1.0, navGuard);

  float lum = (spec * bed + amb * (0.30 + 0.70 * bed)) * navGuard;

  /* Corners quieten so the frame holds together. */
  float vig = 1.0 - 0.42 * pow(length(p * vec2(0.82, 1.18)), 2.4);
  lum *= clamp(vig, 0.0, 1.0);

  /* Monochrome, with the faintest warm bias in the highlight. Never a colour cast. */
  vec3 col = vec3(lum);
  col.r += lum * lum * 0.055;
  col.g += lum * lum * 0.022;

  /* Dither. Without this an eight bit near-black ramp bands into visible steps. */
  col += (hash21(gl_FragCoord.xy + fract(t) * 17.0) - 0.5) / 255.0;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
      }) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uDpr = gl.getUniformLocation(prog, "uDpr");
    const uNarrow = gl.getUniformLocation(prog, "uNarrow");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas!.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas!.clientHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uRes, w, h);
      gl!.uniform1f(uDpr, dpr);
      gl!.uniform1f(uNarrow, canvas!.clientWidth < 768 ? 1 : 0);
    }

    function draw(seconds: number) {
      gl!.uniform1f(uTime, seconds);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    const still = 21.5; // one composed frame, highlight mid travel

    function loop(ms: number) {
      if (!running) return;
      draw(ms / 1000 + still);
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (reduced) draw(still);
    };

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onLost = (e: Event) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
      setFailed(true);
    };

    resize();
    if (reduced) draw(still);
    else raf = requestAnimationFrame(loop);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black" aria-hidden="true">
      {/*
        The still fallback, and what shows underneath before the first frame lands.
        Same material read, built from gradients, so a machine without WebGL gets a
        composed surface rather than a flat rectangle.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 8%, #23262b 0%, #101216 26%, #06070a 58%, #000 82%)",
        }}
      />
      {failed ? null : (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
