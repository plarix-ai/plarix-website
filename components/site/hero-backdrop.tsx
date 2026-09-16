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
uniform float uCssScale;
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

/* One octave. The warp only needs to bend a highlight, not describe terrain. */
float fbm2(vec2 p) {
  return noise2(p);
}

/* What the metal reflects: a few soft bars of light on an otherwise dark room. */
float gauss(float x) {
  /* pow(x, 2.0) compiles to a transcendental call on some drivers for something
     that is one multiply. This is called six times per pixel. */
  return exp(-(x * x));
}

float env(float r, float t) {
  float v = 0.010;
  v += 0.46 * gauss((r - (0.22 + 0.26 * sin(t * 0.061))) * 4.6);
  v += 0.15 * gauss((r - (-0.78 + 0.30 * sin(t * 0.047 + 2.1))) * 2.6);
  v += 0.10 * gauss((r - (1.12 + 0.20 * sin(t * 0.038 + 4.0))) * 5.0);
  return v;
}

void main() {
  vec2 frag = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime;

  /*
   * The panel is formed, not flat, so the highlights bend as they travel. Two
   * octaves of noise carry that, and the brush direction is a constant with one
   * cheap variation on it. An earlier version ran four separate four-octave fbm
   * calls per pixel, which is roughly a hundred noise samples for every pixel of
   * a full-screen quad, every frame. That is what made this unusable.
   */
  vec2 warp = vec2(
    fbm2(p * 1.05 + vec2(t * 0.013, 0.0)),
    fbm2(p * 1.05 + vec2(5.2, -t * 0.011))
  );
  vec2 q = p + (warp - 0.5) * 0.26;

  float ang = 0.30 + p.y * 0.16 - p.x * 0.05;
  vec2 dir = vec2(cos(ang), sin(ang));
  vec2 perp = vec2(-dir.y, dir.x);

  float across = dot(q, perp);
  float along = dot(q, dir);

  /*
   * The grain, in CSS pixels so the brush holds one density on any panel. Pitched
   * a little coarser than before so it still resolves when the canvas renders
   * below device resolution, which is what keeps this cheap.
   */
  float gc = dot(gl_FragCoord.xy, perp) / uCssScale;
  float grain = noise1(gc * 0.42 + along * 40.0) - 0.5;
  grain += (noise1(gc * 0.13 + 11.0) - 0.5) * 0.75;
  grain += (noise1(gc * 1.30 + 41.0) - 0.5) * 0.30;

  float r = across * 2.25 + grain * 0.115;

  float spec = env(r, t);

  /* A faint second bounce, offset, which is what stops it reading as a flat ramp. */
  spec += 0.09 * env(r * 1.7 - 0.6, t * 0.8);

  /* Broad, very dim ambient so the darkest areas are not perfectly dead. */
  float amb = 0.026;

  /*
   * Grade the surface instead of laying a scrim over it. Brightness rises toward
   * the upper right; the lower left, where the headline sits, falls to near black.
   * A phone gives the copy far more of the frame, so the band clears out harder
   * there and the facts row keeps its contrast.
   */
  float axis = frag.x * 0.44 + frag.y * 0.80;
  float bed = smoothstep(0.06, 1.02, axis);
  /* Was pow(bed, 2.1) and pow(bed, 3.7). Squaring twice is the same curve to the eye
     and is two multiplies instead of a transcendental. */
  float b2 = bed * bed;
  bed = mix(b2, b2 * b2, uNarrow);

  /*
   * The navigation sits in the top strip and has to stay legible, so the surface
   * is held down there no matter where the highlight has travelled to.
   */
  float navGuard = smoothstep(1.0, 0.80, frag.y);
  navGuard = mix(0.34, 1.0, navGuard);

  float lum = (spec * bed + amb * (0.30 + 0.70 * bed)) * navGuard;

  /* Corners quieten so the frame holds together. */
  vec2 vp = p * vec2(0.82, 1.18);
  float d2 = dot(vp, vp);
  float vig = 1.0 - 0.42 * d2 * sqrt(d2) * 0.9;
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
    const uCssScale = gl.getUniformLocation(prog, "uCssScale");
    const uNarrow = gl.getUniformLocation(prog, "uNarrow");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let scale = 1;

    function resize() {
      /*
       * The surface is soft. It does not need device resolution, and asking for it
       * costs four times the pixels for a difference nobody can point at. Render at
       * CSS resolution, capped by total pixel count so a very large window does not
       * quietly become expensive.
       */
      const cssW = canvas!.clientWidth;
      const cssH = canvas!.clientHeight;
      const MAX_PIXELS = 760_000;
      scale = Math.min(1, Math.sqrt(MAX_PIXELS / Math.max(1, cssW * cssH)));
      const w = Math.max(1, Math.floor(cssW * scale));
      const h = Math.max(1, Math.floor(cssH * scale));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uRes, w, h);
      gl!.uniform1f(uCssScale, scale);
      gl!.uniform1f(uNarrow, cssW < 768 ? 1 : 0);
    }

    function draw(seconds: number) {
      gl!.uniform1f(uTime, seconds);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    const still = 21.5; // one composed frame, highlight mid travel

    /*
     * Half rate. The highlight travels on a hundred second cycle, so thirty frames a
     * second is indistinguishable from sixty and costs half as much.
     */
    const FRAME_MS = 1000 / 30;
    let lastFrame = 0;

    function loop(ms: number) {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (ms - lastFrame < FRAME_MS) return;
      lastFrame = ms;
      draw(ms / 1000 + still);
    }

    const onResize = () => {
      resize();
      if (reduced) draw(still);
    };

    /* Scrolled past the hero, there is nothing to render. Without this the shader
       keeps running the whole way down the page. */
    let onScreen = true;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              if (reduced) return;
              if (!onScreen) {
                running = false;
                cancelAnimationFrame(raf);
              } else if (!running && !document.hidden) {
                running = true;
                lastFrame = 0;
                raf = requestAnimationFrame(loop);
              }
            },
            { rootMargin: "120px" },
          )
        : null;

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running && onScreen) {
        running = true;
        lastFrame = 0;
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

    io?.observe(canvas);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io?.disconnect();
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
