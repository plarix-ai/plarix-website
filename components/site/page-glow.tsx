/**
 * A whisper of the hero's material at the top of an inner page. Static, cheap, and
 * dithered by a fine noise mask so a wide near-black gradient cannot band.
 *
 * Its only job is to stop inner pages reading as plain documents while keeping the
 * live shader a signature the home page alone gets to spend.
 */
export function PageGlow() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 62% at 76% -12%, rgba(150,162,180,0.16) 0%, rgba(92,102,120,0.07) 34%, rgba(0,0,0,0) 72%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(196deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 42%)",
        }}
      />
      {/* Dither, which is what keeps a wide dark ramp from stepping into bands. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: "url(/brand/dither.png)", backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
