import { useLocation, useNavigate } from "react-router";
import { navigateToAudit } from "../lib/marketing";

const industryTracks = [
  {
    title: "Real Estate Teams",
    pain: "Stop losing listings and buyer inquiries to slow follow-up.",
    workflow:
      "Instant text-back, qualification, broker routing, and showing-booking flows for inbound leads, missed calls, and portal inquiries.",
  },
  {
    title: "Design Firms",
    pain: "Turn new project inquiries into qualified consultations faster.",
    workflow:
      "Automated intake, scope-fit screening, calendar holds, and proposal follow-up for studios that sell trust and responsiveness.",
  },
  {
    title: "Service Businesses",
    pain: "Catch revenue that falls through nights, weekends, and handoffs.",
    workflow:
      "Missed-call recovery, lead assignment, estimate coordination, and no-show prevention for firms running on phone, CRM, and scheduler chaos.",
  },
  {
    title: "Neighborhood Businesses",
    pain: "Use practical AI even if you do not know where to start.",
    workflow:
      "Simple automation for scheduling, customer follow-up, review requests, inbox triage, and repetitive admin for local shops and owner-operated teams.",
  },
];

const deliverables = [
  "Workflow gap analysis for one revenue-critical path",
  "Lead routing, qualification, and follow-up automation design",
  "CRM, phone, inbox, and scheduling handoff map",
  "Small-business AI starter recommendations for local process improvements",
  "Executive readout with implementation priorities and retention path",
];

export function LeadFlowOffer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-10 sm:mb-12">
          <p
            className="text-[#D4AF37] mb-3 uppercase tracking-[0.2em] text-[11px] font-bold"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            AI-Powered Operations
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <h2
                className="text-[#0A0A0A]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.9rem, 3.6vw, 3.25rem)",
                  lineHeight: 1.08,
                  fontWeight: 400,
                  maxWidth: "14ch",
                }}
              >
                AI automation for real estate teams and local businesses that cannot afford slow follow-up.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p
                className="text-[#0A0A0A]/70"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "0.98rem",
                  lineHeight: 1.9,
                  maxWidth: "46ch",
                }}
              >
                Axiom designs executive-grade AI workflow systems for real estate,
                design, service, and neighborhood businesses that need faster
                response times, cleaner routing, and creative process improvements
                without adding operational drag.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          <div className="xl:col-span-7 border border-[#0A0A0A]/10">
            <div className="px-5 sm:px-7 py-5 border-b border-[#0A0A0A]/10">
              <p
                className="text-[#0A0A0A]/55 uppercase tracking-[0.14em]"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem" }}
              >
                Use Cases
              </p>
            </div>
            <div className="divide-y divide-[#0A0A0A]/10">
              {industryTracks.map((track) => (
                <div
                  key={track.title}
                  className="px-5 sm:px-7 py-6 sm:py-7 grid grid-cols-1 md:grid-cols-[1.1fr,1.6fr] gap-4 sm:gap-6"
                >
                  <div>
                    <h3
                      className="text-[#0A0A0A] mb-2"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.2rem",
                        fontWeight: 500,
                      }}
                    >
                      {track.title}
                    </h3>
                    <p
                      className="text-[#0A0A0A]/72"
                      style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.92rem", lineHeight: 1.75 }}
                    >
                      {track.pain}
                    </p>
                  </div>
                  <p
                    className="text-[#0A0A0A]/60"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.82 }}
                  >
                    {track.workflow}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5 border border-[#D4AF37]/35 bg-[#0F0F10] text-white px-5 sm:px-7 py-6 sm:py-7">
            <p
              className="text-[#D4AF37] uppercase tracking-[0.14em] mb-3"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem" }}
            >
              First Offer
            </p>
            <h3
              className="mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.55rem, 2.3vw, 2.1rem)",
                lineHeight: 1.15,
                fontWeight: 400,
              }}
            >
              LeadFlow AI Audit + Setup
            </h3>
            <p
              className="text-white/72"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", lineHeight: 1.85 }}
            >
              A two-week engagement that diagnoses one lead workflow, installs the
              first automation layer, and shows exactly where manual follow-up is
              leaking revenue.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <p
                  className="text-white/40 uppercase tracking-[0.08em] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem" }}
                >
                  Timeline
                </p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.96rem", fontWeight: 600 }}>
                  2 weeks
                </p>
              </div>
              <div>
                <p
                  className="text-white/40 uppercase tracking-[0.08em] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem" }}
                >
                  Setup Fee
                </p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.96rem", fontWeight: 600 }}>
                  $2,500
                </p>
              </div>
              <div>
                <p
                  className="text-white/40 uppercase tracking-[0.08em] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem" }}
                >
                  Retainer
                </p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.96rem", fontWeight: 600 }}>
                  $500/mo
                </p>
              </div>
              <div>
                <p
                  className="text-white/40 uppercase tracking-[0.08em] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem" }}
                >
                  Best Fit
                </p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.96rem", fontWeight: 600 }}>
                  50+ monthly leads
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5">
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="text-white/72 pl-4 relative"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.86rem", lineHeight: 1.75 }}
                >
                  <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={() => navigateToAudit(navigate, location.pathname)}
                className="px-6 py-3.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#caa62f] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                Request Workflow Audit
              </button>
              <button
                onClick={() => navigate("/architecture")}
                className="px-6 py-3.5 border border-white/20 text-white hover:border-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                Explore Architecture
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
