import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { navigateToAudit } from "../lib/marketing";

export function EngagementBanner() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <section className="relative bg-[#D4AF37] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" style={{ animationDuration: "3s" }} />
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 500 }}>Ready to tighten the workflow?</h2>
          <p className="text-[#0A0A0A]/60 mt-1 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>Request a confidential audit for lead response, routing, and follow-up.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => navigateToAudit(navigate, location.pathname)}
            className="px-8 py-3.5 bg-[#0A0A0A] text-white hover:bg-[#1a1a1a] transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.04em" }}>
            Begin Engagement →
          </button>
          <button onClick={() => navigate("/architecture")}
            className="px-6 py-3.5 border border-[#0A0A0A]/40 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.04em" }}>
            Explore Architecture
          </button>
        </div>
      </div>
    </section>
  );
}
