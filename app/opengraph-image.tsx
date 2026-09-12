import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tariq Ahmed Bhatti | Sahiwal Chamber Elections 2026-28";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #07172d 0%, #0b2240 55%, #050d1b 100%)", color: "white", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", inset: 42, border: "2px solid rgba(212,175,55,0.55)", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, zIndex: 1 }}>
          <div style={{ fontSize: 82, fontWeight: 900, letterSpacing: "5px", display: "flex" }}><span style={{ color: "#d4af37" }}>TARIQ</span><span style={{ color: "white", marginLeft: 18 }}>AHMED BHATTI</span></div>
          <div style={{ width: 190, height: 4, background: "#d4af37", display: "flex" }} />
          <div style={{ fontSize: 38, color: "#f0d878", letterSpacing: "2px", display: "flex" }}>SAHIWAL CHAMBER ELECTIONS 2026-28</div>
          <div style={{ fontSize: 27, color: "rgba(255,255,255,0.86)", display: "flex" }}>Executive Committee Member · Associate Class</div>
          <div style={{ marginTop: 12, fontSize: 29, color: "white", display: "flex" }}>Tajiron ki Awaaz, Sahiwal ki Tarraqi!</div>
          <div style={{ marginTop: 16, fontSize: 22, color: "#d4af37", display: "flex" }}>Owner of Boby Shoes · Ittehad Group · Democratic Group · Apna Group</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
