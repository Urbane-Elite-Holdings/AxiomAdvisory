import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { navigateToAudit } from "../lib/marketing";

const heroImg = "https://pub-1312916bb6854ae6baff9ad5ab8e55db.r2.dev/Firefly_Gemini%20Flash%20(1).png";

export function Hero() {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section
      className="relative"
      style={{
        minHeight: "100svh",
        background:
          "radial-gradient(circle at 82% 18%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.04) 16%, transparent 32%), linear-gradient(135deg, #090909 0%, #151515 48%, #0c0c0c 100%)",
        zIndex: 0,
        isolation: "isolate",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(12,12,12,0.96) 0%, rgba(12,12,12,0.68) 30%, rgba(12,12,12,0.18) 62%, transparent 100%)",
          opacity: imgLoaded ? 0.25 : 1,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* ── LAYER 1: Subject photo — full width, centered, with subtle zoom settle ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: visible && imgLoaded ? 1 : 0,
          transform: visible && imgLoaded ? "scale(1)" : "scale(1.04)",
          transition: "opacity 1.2s ease 0.2s, transform 1.8s ease 0.2s",
        }}
      >
        <img
          src={heroImg}
          alt="Christopher DeMarkus — Axiom Executive Advisory"
          className="w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
          loading="eager"
          onLoad={() => setImgLoaded(true)}
        />
        {/* Bottom fade to dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(15,15,15,0.78) 0%, rgba(15,15,15,0.2) 24%, transparent 52%)",
          }}
        />
      </div>

      {/* ── LAYER 2: Full-width background bottom-fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "50%",
          background:
            "linear-gradient(to top, rgba(12,12,12,0.95) 0%, rgba(12,12,12,0.5) 24%, transparent 78%)",
        }}
      />

      {/* ── LAYER 3: All copy — sits over the dark bottom gradient ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          padding: "clamp(1.2rem, 3vw, 2.5rem) clamp(1.2rem, 4vw, 3rem)",
          paddingBottom: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Two-column on desktop, stacked & centered on mobile */}
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-end md:justify-between gap-4 items-center md:items-end text-center md:text-left">
          <div className="mx-auto md:mx-0" style={{ maxWidth: "520px" }}>
            {/* Eyebrow — company name */}
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase" as const,
                marginBottom: "0.4rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
              }}
            >Axiom Executive Advisory</p>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                lineHeight: 1.15,
                color: "#ffffff",
                marginBottom: "0.3rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s",
              }}
            >
              Executive advisory.
            </h1>
            {/* Headline — supporting line */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                lineHeight: 1.15,
                color: "#ffffff",
                marginBottom: "1rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.7s ease 0.8s, transform 0.7s ease 0.8s",
              }}
            >
              <span style={{ color: "#D4AF37" }}>For</span> strategy, systems, and intelligent execution.
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.45)",
                maxWidth: "42ch",
                margin: "0 auto",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s ease 0.95s, transform 0.6s ease 0.95s",
              }}
            >
              Axiom Executive Advisory helps small and mid-sized businesses implement
              practical AI, creative process improvements, and revenue-saving
              systems. From real estate teams to neighborhood businesses, we help
              leaders identify what to automate, what to refine, and what to keep
              human.
            </p>
          </div>

          {/* CTA Buttons — centered on mobile, right-aligned on desktop */}
          <div
            className="flex flex-wrap gap-3 justify-center md:justify-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 1.1s, transform 0.6s ease 1.1s",
            }}
          >
            <button
              onClick={() => navigate("/architecture")}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.7rem, 1vw, 0.82rem)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "#D4AF37",
                border: "1.5px solid rgba(212,175,55,0.65)",
                padding: "0.7rem 1.4rem",
                background: "transparent",
                cursor: "pointer",
                transition: "background 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#D4AF37";
                el.style.color = "#0a0a0a";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "transparent";
                el.style.color = "#D4AF37";
              }}
            >
              Explore Architecture
            </button>

            <button
              onClick={() => navigateToAudit(navigate, location.pathname)}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(0.7rem, 1vw, 0.82rem)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "#0a0a0a",
                background: "#D4AF37",
                border: "1.5px solid #D4AF37",
                padding: "0.7rem 1.4rem",
                cursor: "pointer",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#c9a227";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#D4AF37";
              }}
            >
              Begin Engagement
            </button>
          </div>
        </div>

        {/* Service category pills — below CTAs */}
        <div
          className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease 1.25s, transform 0.5s ease 1.25s",
          }}
        >
          {["AI Automation", "Real Estate", "Neighborhood Business", "Design", "Process Improvement"].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(0.5rem, 1vw, 0.62rem)",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.5)",
                padding: "0.2rem 0.6rem",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
