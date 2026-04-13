import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const pillars = [
  { label: "Precision", desc: "Every recommendation is grounded in evidence, not assumption. We do not guess — we analyze, stress-test, and deliver." },
  { label: "Discretion", desc: "We operate with the confidentiality your organization demands. What happens inside an engagement stays there." },
  { label: "Accountability", desc: "We are measured by outcomes, not deliverables. If the work does not move the needle, it does not leave our desk." },
];

const founderCredentials = [
  { label: "PMP", tooltip: "Project Management Professional" },
  { label: "CCOS", tooltip: "Certified Chief of Staff" },
  { label: "CFE", tooltip: "Certified Fraud Examiner" },
  { label: "EMBA", tooltip: "Executive Master of Business Administration" },
  { label: "16+ years Fortune 500 operations" },
];

export function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" className="bg-[#F9F7F3] py-20 sm:py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Firm + Founder */}
          <div
            className="space-y-7"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(-30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div>
              <p className="text-[#D4AF37] mb-3 uppercase tracking-[0.2em] text-[11px] font-bold"
                style={{ fontFamily: "'DM Mono', monospace" }}>
                About the Firm
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400, color: "#0A0A0A", lineHeight: 1.2 }}>
                Built for the Complexity<br />
                <em style={{ color: "#D4AF37" }}>Others Avoid</em>
              </h2>
            </div>

            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(10,10,10,0.65)" }}>
              Axiom Executive Advisory, LLC is a boutique strategic advisory firm delivering institutional-grade counsel
              with the agility of a trusted partner. We embed where it matters — at the intersection of strategy,
              operations, and organizational leadership.
            </p>

            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(10,10,10,0.65)" }}>
              As a minority-owned firm headquartered in the Tri-State Area — Jersey City, NJ and New York City —
              we are committed to delivering the kind of advisory that moves organizations, not just advises them.
            </p>

            {/* Founder callout */}
            <div className="border-l-2 border-[#D4AF37] pl-5 py-1 mt-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#D4AF37] font-bold mb-2"
                style={{ fontFamily: "'DM Mono', monospace" }}>
                Founder & Principal Advisor
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 500, color: "#0A0A0A" }}>
                Christopher DeMarkus
              </p>
              <p className="mt-2" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(10,10,10,0.6)" }}>
                Christopher brings a rare combination of corporate leadership and creative strategy to every engagement.
                With a background spanning Chief of Staff operations, international third-party risk management,
                enterprise portfolio oversight, and national brand campaigns, he operates at the intersection of
                execution and vision — embedding directly with leadership teams to drive outcomes that last.
              </p>
              <div className="mt-4">
                <p
                  className="text-[10px] uppercase tracking-[0.16em] text-[#0A0A0A]/45 mb-2"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Credentials
                </p>
                <div className="flex flex-wrap gap-2">
                  {founderCredentials.map((credential) => (
                    credential.tooltip ? (
                      <span
                        key={credential.label}
                        className="relative group px-2.5 py-1 border border-[#D4AF37]/45 text-[#0A0A0A] cursor-help"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
                        tabIndex={0}
                        title={credential.tooltip}
                        aria-label={`${credential.label}: ${credential.tooltip}`}
                      >
                        {credential.label}
                        <span
                          className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[220px] -translate-x-1/2 rounded-sm border border-[#D4AF37]/35 bg-[#0A0A0A] px-3 py-2 text-center text-white opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100"
                          style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: "0.72rem",
                            letterSpacing: "0.02em",
                            lineHeight: 1.5,
                            textTransform: "none",
                          }}
                        >
                          {credential.tooltip}
                        </span>
                      </span>
                    ) : (
                      <span
                        key={credential.label}
                        className="px-2.5 py-1 border border-[#D4AF37]/45 text-[#0A0A0A]"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
                      >
                        {credential.label}
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Pillars */}
          <div
            className="space-y-0 divide-y divide-[#0A0A0A]/8"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {pillars.map((p, i) => (
              <div
                key={p.label}
                className="py-7 flex gap-6 items-start"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.12}s, transform 0.5s ease ${0.3 + i * 0.12}s`,
                }}
              >
                <div className="w-1 h-8 bg-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "#0A0A0A" }}>
                    {p.label}
                  </p>
                  <p className="mt-1" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(10,10,10,0.55)" }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
