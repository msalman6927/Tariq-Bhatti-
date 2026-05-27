import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "A One Juice & Ice Cream — Best Fresh Juice Shop in Sahiwal, Pakistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #080810 0%, #0c0c20 50%, #080810 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,215,0,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(230,57,70,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Decorative fruit emojis */}
        <div style={{ position: "absolute", top: 40, left: 60, fontSize: 72, opacity: 0.25 }}>🍊</div>
        <div style={{ position: "absolute", top: 80, right: 80, fontSize: 60, opacity: 0.20 }}>🥭</div>
        <div style={{ position: "absolute", bottom: 60, left: 100, fontSize: 56, opacity: 0.20 }}>🍓</div>
        <div style={{ position: "absolute", bottom: 40, right: 60, fontSize: 64, opacity: 0.25 }}>🍍</div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            zIndex: 1,
          }}
        >
          {/* Brand name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "4px",
              display: "flex",
              gap: 12,
              lineHeight: 1,
            }}
          >
            <span style={{ color: "#FFD700" }}>A</span>
            <span style={{ color: "#E63946" }}>ONE</span>
            <span style={{ color: "#FFD700" }}>JUICE</span>
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.75)", fontWeight: 400, letterSpacing: "2px" }}>
            &amp; Ice Cream
          </div>

          {/* Divider */}
          <div
            style={{
              width: 180,
              height: 4,
              borderRadius: 99,
              background: "linear-gradient(90deg, #FFD700, #E63946)",
              margin: "8px 0",
            }}
          />

          {/* Tagline */}
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.85)", textAlign: "center", maxWidth: 700, lineHeight: 1.4, fontWeight: 400 }}>
            Premium Fresh Juices, Shakes &amp; Ice Cream
          </div>

          {/* Location badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,215,0,0.12)",
              border: "1px solid rgba(255,215,0,0.35)",
              borderRadius: 40,
              padding: "10px 28px",
              marginTop: 8,
            }}
          >
            <span style={{ fontSize: 22 }}>📍</span>
            <span style={{ color: "#FFD700", fontSize: 22, fontWeight: 600, letterSpacing: "1px" }}>
              Sahiwal, Punjab, Pakistan
            </span>
          </div>

          {/* WhatsApp CTA */}
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.55)", marginTop: 8 }}>
            📲 Order on WhatsApp · 50+ Menu Items
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
