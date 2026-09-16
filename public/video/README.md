# Hero background loop

Drop the cinematic loop in this folder and it takes over the hero on the next build.
Nothing in the code needs to change.

- `hero.mp4` (or `hero.webm`) — the loop itself
- `hero-poster.jpg` (optional) — the first frame, shown while the video buffers

Until a file is here, the canvas scene in `components/site/hero-backdrop.tsx` renders
the background on its own. It is the designed fallback, not a placeholder: the hero is
finished either way. The video, when present, fades in over the top once it can play
through without stuttering, and falls back to the canvas if it stalls or errors.

## What to generate

16:9, 10 to 12 seconds, seamless loop, no audio, no text, no people.

> Slow aerial drift at dusk over an American suburban neighborhood, hundreds of houses
> in orderly rows stretching to the horizon. Deep blue-black night is falling. Inside
> the houses, warm lights switch on in a slow, spreading wave, not random, sequenced,
> like a system coming online block by block. Faint cool-white lines of light trace the
> streets between them, breathing softly. Thin haze, volumetric light, anamorphic lens,
> shallow depth at the edges. Muted monochrome palette: graphite, slate, silver-white,
> one warm amber note from the windows. Very slow forward dolly, almost still.
> Cinematic color grade, high contrast, deep blacks, film grain. No text, no logos, no
> people, no vehicles.

Keep the file under about 6 MB. The bottom 45% of the frame is covered by a blur veil
and the headline sits there, so keep that part of the shot dark and uncluttered.
