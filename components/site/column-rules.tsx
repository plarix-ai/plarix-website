/**
 * Rules marking the shell measure on wide displays. The page is built on a fixed
 * shell and saying so plainly reads as precision rather than as decoration. They
 * fade at both ends so they never terminate abruptly.
 */
export function ColumnRules() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <div className="shell h-full">
        <div className="relative h-full">
          {(["left", "right"] as const).map((side) => (
            <span
              key={side}
              className="absolute top-0 h-full w-px"
              style={{
                [side]: "-0.5px",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 6%, rgba(255,255,255,0.07) 94%, rgba(255,255,255,0) 100%)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
