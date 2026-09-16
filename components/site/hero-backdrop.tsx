"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Path to the cinematic loop. When absent the canvas scene carries the hero on its own. */
  videoSrc?: string;
  posterSrc?: string;
};

/**
 * Behind the hero sit two layers.
 *
 * The canvas draws a suburb at dusk: rows of windows receding to a horizon, lights
 * coming on in a slow wave that sweeps across the grid. It renders on its own and is
 * the finished background when no video is present.
 *
 * The video, when supplied, fades in over the top once it has enough frames to play
 * without stuttering. If it 404s, stalls, or the viewer asked for reduced motion, the
 * canvas simply stays visible and nothing about the page looks unfinished.
 */
export function HeroBackdrop({ videoSrc, posterSrc }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;

    /** Rows of windows, laid out on a perspective curve toward a horizon line. */
    type Light = { x: number; y: number; r: number; depth: number; phase: number; warmth: number };
    let lights: Light[] = [];

    // deterministic noise so the scene is identical across reloads
    const rand = (() => {
      let seed = 0x9e3779b9;
      return () => {
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
        return ((seed >>> 0) % 100000) / 100000;
      };
    })();

    function build() {
      lights = [];
      const horizon = height * 0.34;
      const rows = 26;

      for (let row = 0; row < rows; row++) {
        // depth 0 at the horizon, 1 at the bottom of the frame
        const depth = Math.pow((row + 1) / rows, 2.1);
        const y = horizon + depth * (height - horizon) * 1.04;
        if (y > height + 60) continue;

        const spacing = 11 + depth * 116;
        const jitterY = (rand() - 0.5) * spacing * 0.34;
        const count = Math.ceil(width / spacing) + 2;
        const offset = (rand() - 0.5) * spacing;

        for (let i = 0; i < count; i++) {
          if (rand() > 0.62 - depth * 0.12) continue; // not every house, not every window
          lights.push({
            x: i * spacing + offset + (rand() - 0.5) * spacing * 0.5,
            y: y + jitterY + (rand() - 0.5) * 4,
            r: 0.7 + depth * 3.1,
            depth,
            phase: rand(),
            warmth: 0.72 + rand() * 0.28,
          });
        }
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function drawSky() {
      const horizon = height * 0.34;

      // night above, a cold ember of last light at the horizon
      const sky = ctx!.createLinearGradient(0, 0, 0, horizon * 1.5);
      sky.addColorStop(0, "#000000");
      sky.addColorStop(0.55, "#04050a");
      sky.addColorStop(1, "#0d1118");
      ctx!.fillStyle = sky;
      ctx!.fillRect(0, 0, width, horizon * 1.5);

      // ground falls back to black so the hero copy always has a clean bed
      const ground = ctx!.createLinearGradient(0, horizon * 1.1, 0, height);
      ground.addColorStop(0, "#0d1118");
      ground.addColorStop(0.35, "#070809");
      ground.addColorStop(1, "#000000");
      ctx!.fillStyle = ground;
      ctx!.fillRect(0, horizon * 1.1, width, height - horizon * 1.1);

      // the warm band sitting on the horizon itself
      const glow = ctx!.createRadialGradient(
        width * 0.5,
        horizon,
        0,
        width * 0.5,
        horizon,
        width * 0.62,
      );
      glow.addColorStop(0, "rgba(140, 118, 92, 0.20)");
      glow.addColorStop(0.45, "rgba(70, 64, 60, 0.08)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, width, height);
    }

    function draw(t: number) {
      drawSky();

      // the wave that switches the neighbourhood on, sweeping diagonally
      const cycle = 17000;
      const sweep = ((t % cycle) / cycle) * 2.6 - 0.5;

      ctx!.globalCompositeOperation = "lighter";

      for (const l of lights) {
        const along = l.x / width + (1 - l.y / height) * 0.45;
        const d = along - sweep;
        // a soft leading edge, a long trailing tail: lights come on and stay on a while
        const lit =
          d > 0 ? Math.max(0, 1 - d * 5.5) : Math.max(0, 1 + d * 1.25);
        if (lit <= 0.01) continue;

        // a slow breath so nothing is ever perfectly still
        const breath = 0.86 + Math.sin(t * 0.0006 + l.phase * 12) * 0.14;
        const a = lit * breath * (0.28 + l.depth * 0.5);

        const r = l.r;
        const halo = ctx!.createRadialGradient(l.x, l.y, 0, l.x, l.y, r * 7);
        halo.addColorStop(0, `rgba(255, ${Math.round(206 * l.warmth + 30)}, ${Math.round(140 * l.warmth)}, ${a * 0.55})`);
        halo.addColorStop(0.3, `rgba(226, ${Math.round(168 * l.warmth + 24)}, ${Math.round(96 * l.warmth)}, ${a * 0.16})`);
        halo.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx!.fillStyle = halo;
        ctx!.fillRect(l.x - r * 7, l.y - r * 7, r * 14, r * 14);

        ctx!.fillStyle = `rgba(255, 240, 214, ${Math.min(1, a * 1.25)})`;
        ctx!.fillRect(l.x - r * 0.5, l.y - r * 0.38, r, r * 0.76);
      }

      ctx!.globalCompositeOperation = "source-over";
    }

    function loop(t: number) {
      if (!running) return;
      draw(t);
      frame = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (reduced) draw(6200);
    };

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = requestAnimationFrame(loop);
      }
    };

    resize();
    if (reduced) {
      draw(6200); // one composed still, mid-sweep
    } else {
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]"
          style={{ opacity: videoReady ? 1 : 0, transitionTimingFunction: "var(--ease-out)" }}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />
      ) : null}

      {/* A vignette that keeps the eye centred and the corners quiet. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 38%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
