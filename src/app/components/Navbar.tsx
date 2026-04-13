import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { navigateToAudit } from "../lib/marketing";

const logoUrl = "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/logo.gif";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoFailed, setLogoFailed] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isHome = location.pathname === "/";

  useEffect(() => {
    setNavVisible(true);
    lastScrollY.current = window.scrollY;
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 32) {
        setNavVisible(true);
      } else if (delta > 6) {
        setNavVisible(false);
      } else if (delta < -6) {
        setNavVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Architecture", path: "/architecture" },
    { label: "AI Audit", path: "/contact" },
    { label: "For Our Partners", path: "/partners" },
  ];

  const bgStyle: React.CSSProperties = isHome
    ? {
        background: "rgba(10,10,10,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }
    : {
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      };

  const linkColor = isHome ? "rgba(255,255,255,0.6)" : "rgba(10,10,10,0.5)";
  const activeLinkColor = isHome ? "#FFFFFF" : "#0A0A0A";
  const partnerColor = "#D4AF37";

  const isActive = (path: string) => (
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0"
        style={{
          ...bgStyle,
          zIndex: 20000,
          opacity: navVisible ? 1 : 0,
          transform: navVisible ? "translateY(0)" : "translateY(-120%)",
          pointerEvents: navVisible ? "auto" : "none",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, transform 0.28s ease, opacity 0.22s ease",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group shrink-0">
            {!logoFailed ? (
              <img
                src={logoUrl}
                alt="Axiom Executive Advisory"
                className="h-7 sm:h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div className="w-8 h-8 bg-[#0A0A0A] border border-[#D4AF37]/60 flex items-center justify-center">
                <span style={{ fontFamily: "'Playfair Display', serif", color: "#D4AF37", fontSize: "1.05rem", fontWeight: 700 }}>
                  A
                </span>
              </div>
            )}
            <span
              className="font-semibold tracking-wide transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.68rem", color: isHome ? "rgba(255,255,255,0.85)" : "#0A0A0A", letterSpacing: "0.06em" }}
            >
              AXIOM EXECUTIVE ADVISORY
            </span>
          </button>

          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const isPartner = link.label === "For Our Partners";
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className="relative group transition-all duration-200"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: active ? "0.8rem" : "0.68rem",
                    fontWeight: active ? 700 : isPartner ? 600 : 500,
                    color: active ? activeLinkColor : isPartner ? partnerColor : linkColor,
                    letterSpacing: "0.03em",
                    textTransform: "uppercase" as const,
                    transition: "font-size 0.25s ease, color 0.2s, font-weight 0.2s",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                    style={{
                      width: active ? "100%" : "0",
                      background: "#D4AF37",
                    }}
                  />
                  {!active && (
                    <span
                      className="absolute -bottom-1 left-0 w-0 group-hover:w-full transition-all duration-300 h-px"
                      style={{ background: "rgba(212,175,55,0.5)" }}
                    />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => navigateToAudit(navigate, location.pathname)}
              className="group relative px-3 py-1.5 font-semibold overflow-hidden transition-all duration-300"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.65rem",
                border: "1px solid rgba(212,175,55,0.5)",
                color: "#D4AF37",
                letterSpacing: "0.05em",
                textTransform: "uppercase" as const,
                transition: "background 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "#D4AF37";
                b.style.color = "#0A0A0A";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "transparent";
                b.style.color = "#D4AF37";
              }}
            >
              Begin Engagement
            </button>
          </div>

          <button
            className="md:hidden px-3 py-1.5 border"
            style={{
              borderColor: isHome ? "rgba(212,175,55,0.55)" : "rgba(212,175,55,0.7)",
              background: "#D4AF37",
              color: "#0A0A0A",
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}
            onClick={() => navigateToAudit(navigate, location.pathname)}
          >
            Engage
          </button>
        </div>
      </nav>

      <div
        className="md:hidden fixed left-2 right-2 z-[19998]"
        style={{
          top: "3.75rem",
          opacity: navVisible ? 1 : 0,
          transform: navVisible ? "translateY(0)" : "translateY(-140%)",
          pointerEvents: navVisible ? "auto" : "none",
          background: "rgba(10,10,10,0.94)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "999px",
          padding: "0.45rem 0.6rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          transition: "transform 0.28s ease, opacity 0.22s ease",
        }}
      >
        <div
          className="overflow-x-auto whitespace-nowrap"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "contain",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex items-center gap-1.5 w-max min-w-full justify-start pr-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const isPartner = link.label === "For Our Partners";
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className="transition-all duration-200"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: active ? "0.72rem" : "0.56rem",
                    fontWeight: active ? 700 : isPartner ? 600 : 500,
                    color: active ? "#FFFFFF" : isPartner ? "#D4AF37" : "rgba(255,255,255,0.6)",
                    letterSpacing: "0.045em",
                    textTransform: "uppercase" as const,
                    padding: "0.35rem 0.55rem",
                    borderRadius: "999px",
                    borderBottom: active ? "1.5px solid #D4AF37" : "1.5px solid transparent",
                    background: active ? "rgba(255,255,255,0.07)" : "transparent",
                    transition: "font-size 0.25s ease, color 0.2s, font-weight 0.2s",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
