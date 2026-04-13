import { useNavigate } from "react-router";

export function Footer() {
  const navigate = useNavigate();

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Architecture", path: "/architecture" },
    { label: "AI Audit", path: "/contact" },
    { label: "Brand Tool", path: "/brand-tool" },
    { label: "For Our Partners", path: "/partners" },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 bg-[#0A0A0A] border border-[#D4AF37]/40 flex items-center justify-center">
              <span style={{ fontFamily: "'Playfair Display', serif", color: "#D4AF37", fontSize: "1rem", fontWeight: 700 }}>
                A
              </span>
            </div>
            <span
              className="text-white/60"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em" }}
            >
              AXIOM EXECUTIVE ADVISORY
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className="text-white/40 hover:text-[#D4AF37] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.06em" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="text-right">
            <p
              className="text-white/30"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em" }}
            >
              Axiom Executive Advisory, LLC
            </p>
            <p
              className="text-white/20 mt-1"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5625rem", letterSpacing: "0.08em" }}
            >
              Jersey City, NJ · New York City, NY · © 2026 · Founded by Christopher DeMarkus
            </p>
          </div>
        </div>
      </div>
      <div className="h-px bg-[#D4AF37]/40" />
    </footer>
  );
}
