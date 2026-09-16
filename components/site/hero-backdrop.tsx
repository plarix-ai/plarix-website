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
 * The canvas draws a suburb at dusk seen from the air: rows of windows receding to a
 * horizon, lights coming on in a slow wave that sweeps across the grid. It renders on
 * its own and is the finished background when no video is present.
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
    let horizon = 0;
    let raf = 0;
    let running = true;

    type Light = {
      x: number;
      y: number;
      w: number;
      h: number;
      glow: number;
      depth: number;
      phase: number;
      warmth: number;
      order: number;
    };
    let lights: Light[] = [];

    /**
     * One glow sprite, drawn once and stamped thousands of times. Building a radial
     * gradient per light per frame is what makes this kind of scene drop frames.
     */
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 128;
    {
      const s = sprite.getContext("2d")!;
      const g = s.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255, 238, 214, 1)");
      g.addColorStop(0.12, "rgba(243, 214, 172, 0.42)");
      g.addColorStop(0.38, "rgba(198, 160, 112, 0.10)");
      g.addColorStop(1, "rgba(150, 120, 80, 0)");
      s.fillStyle = g;
      s.fillRect(0, 0, 128, 128);
    }

    // deterministic noise so the scene is identical across reloads
    const makeRand = () => {
      let seed = 0x9e3779b9;
      return () => {
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
        return ((seed >>> 0) % 1000000) / 1000000;
      };
    };

    function build() {
      const rand = makeRand();
      lights = [];
      horizon = height * 0.3;
      const rows = 46;

      for (let row = 0; row < rows; row++) {
        // depth 0 at the horizon, 1 at the bottom of the frame
        const depth = Math.pow((row + 0.6) / rows, 2.3);
        const y = horizon + depth * (height - horizon) * 1.12;
        if (y > height + 120) continue;

        const spacing = 6 + depth * 104;
        const count = Math.ceil(width / spacing) + 3;
        const offset = (rand() - 0.5) * spacing * 2;
        const rowJitter = (rand() - 0.5) * spacing * 0.3;

        for (let i = 0; i < count; i++) {
          // not every house is lit, and not every window in it
          // the field thins as it comes forward, so the copy sits on clean black
          if (rand() > 0.8 - depth * 0.42) continue;

          const x = i * spacing + offset + (rand() - 0.5) * spacing * 0.42;
          const w = Math.max(0.9, 1.1 + depth * 9);
          lights.push({
            x,
            y: y + rowJitter + (rand() - 0.5) * (2 + depth * 10),
            w,
            h: Math.max(0.8, w * (0.5 + rand() * 0.28)),
            glow: w * (5.5 + depth * 3),
            depth,
            phase: rand(),
            warmth: 0.72 + rand() * 0.28,
            // where this light sits in the wave that switches the grid on
            order: x / Math.max(width, 1) + (1 - depth) * 0.5 + (rand() - 0.5) * 0.06,
          });
        }
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = Math.max(1, Math.floor(width * dpr));
      canvas!.height = Math.max(1, Math.floor(height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function drawGround() {
      // One continuous gradient top to bottom, so no band ever seams against another.
      const g = ctx!.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, "#000000");
      g.addColorStop(0.16, "#03040a");
      g.addColorStop(0.27, "#0b1018");
      g.addColorStop(0.3, "#141a23"); // last light sitting on the horizon
      g.addColorStop(0.42, "#0a0d12");
      g.addColorStop(0.68, "#05060a");
      g.addColorStop(1, "#000000");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, width, height);

      // the warm ember the sun left behind, low and wide
      const ember = ctx!.createRadialGradient(
        width * 0.5,
        horizon + 4,
        0,
        width * 0.5,
        horizon + 4,
        Math.max(width, height) * 0.68,
      );
      ember.addColorStop(0, "rgba(150, 116, 80, 0.20)");
      ember.addColorStop(0.28, "rgba(96, 82, 76, 0.11)");
      ember.addColorStop(0.62, "rgba(40, 44, 56, 0.05)");
      ember.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx!.fillStyle = ember;
      ctx!.fillRect(0, 0, width, height);
    }

    function draw(t: number) {
      drawGround();

      /*
       * The grid is lit. A slow bloom travels across it, so the neighbourhood is
       * always populated and the motion reads as light moving through it rather
       * than as the scene switching on and off.
       */
      const cycle = 21000;
      const sweep = ((t % cycle) / cycle) * 2.6 - 0.8;

      ctx!.globalCompositeOperation = "lighter";

      /*
       * The field is brightest just below the horizon and dies out well before the
       * bottom of the frame, so the headline always sits on clean black.
       */
      // On a narrow screen the copy occupies far more of the frame, so the field
      // has to clear out higher up to keep the subhead on clean black.
      const narrow = width < 768;
      const fadeIn = height * 0.1;
      const fadeStart = height * (narrow ? 0.3 : 0.44);
      const fadeEnd = height * (narrow ? 0.5 : 0.78);

      for (const l of lights) {
        const rise = Math.min(1, (l.y - horizon) / fadeIn);
        const fall =
          l.y < fadeStart ? 1 : Math.max(0, 1 - (l.y - fadeStart) / (fadeEnd - fadeStart));
        const band = Math.max(0, rise) * fall * fall;
        if (band <= 0.01) continue;

        const d = Math.abs(l.order - sweep);
        const bloom = Math.max(0, 1 - d * 2.2);

        // a slow breath so nothing is ever perfectly still
        const breath = 0.84 + Math.sin(t * 0.00055 + l.phase * 11) * 0.16;
        const a = Math.min(1, (0.24 + bloom * 0.34) * breath * band);

        ctx!.globalAlpha = a * 0.5;
        ctx!.drawImage(sprite, l.x - l.glow, l.y - l.glow, l.glow * 2, l.glow * 2);

        ctx!.globalAlpha = Math.min(1, a * 1.5);
        ctx!.fillStyle = `rgb(255, ${Math.round(242 * l.warmth + 13)}, ${Math.round(216 * l.warmth + 24)})`;
        ctx!.fillRect(l.x - l.w / 2, l.y - l.h / 2, l.w, l.h);
      }

      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "source-over";

      // thin haze sitting on the horizon, which is what sells the distance
      const haze = ctx!.createLinearGradient(0, horizon - height * 0.07, 0, horizon + height * 0.12);
      haze.addColorStop(0, "rgba(14, 18, 26, 0)");
      haze.addColorStop(0.42, "rgba(16, 21, 30, 0.5)");
      haze.addColorStop(1, "rgba(10, 13, 19, 0)");
      ctx!.fillStyle = haze;
      ctx!.fillRect(0, horizon - height * 0.07, width, height * 0.19);
    }

    function loop(t: number) {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    }

    const still = 7600; // one composed frame, mid sweep

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

    resize();
    if (reduced) draw(still);
    else raf = requestAnimationFrame(loop);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
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
            "radial-gradient(135% 95% at 50% 42%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.62) 100%)",
        }}
      />
    </div>
  );
}
