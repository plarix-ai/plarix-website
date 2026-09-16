import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * One social card layout, rendered at build time per route. A shared card means every
 * link to this site looks identical in a feed; a card that carries the page's own
 * title is the difference between a link and a result.
 *
 * Drawn rather than screenshotted so it stays crisp and costs no runtime.
 */
export function ogImage({
  title,
  kicker,
  footer = "plarix.dev",
}: {
  title: string;
  kicker?: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          backgroundImage:
            "radial-gradient(1100px 620px at 78% -14%, rgba(168,178,196,0.22) 0%, rgba(86,96,114,0.09) 38%, rgba(0,0,0,0) 74%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "linear-gradient(140deg, #ffffff 0%, #9aa3b2 46%, #1b1f26 100%)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 27,
              letterSpacing: 10,
              color: "#ffffff",
              fontWeight: 500,
              display: "flex",
            }}
          >
            PLARIX
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {kicker ? (
            <div
              style={{
                fontSize: 21,
                letterSpacing: 3.4,
                textTransform: "uppercase",
                color: "#7d848f",
                marginBottom: 24,
                display: "flex",
              }}
            >
              {kicker}
            </div>
          ) : null}
          <div
            style={{
              fontSize: title.length > 52 ? 62 : 78,
              lineHeight: 1.04,
              letterSpacing: -2.6,
              color: "#ffffff",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#7d848f",
            borderTop: "1px solid rgba(255,255,255,0.11)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex" }}>{footer}</div>
          <div style={{ display: "flex" }}>Operational AI for home services</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
