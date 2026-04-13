import { useEffect, useRef, useState } from "react";

const cases = [
  {
    num: "01",
    sector: "Hospitality / Growth Strategy",
    client: "Cornbread Soul",
    logoImg: "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/IMG_5816.jpeg",
    headline: "65-page strategic advisory and execution roadmap for a scaling restaurant brand",
    desc: "Structured a brand, marketing, and operational growth plan around promotional architecture, KPI tracking, and location-level execution alignment.",
    impact: "Proof signal: 65-page strategic advisory, KPI framework, and phased roadmap already represented in the partner workstream.",
  },
  {
    num: "02",
    sector: "Education / Digital Infrastructure",
    client: "K2K College Prep Services",
    logoImg: "",
    headline: "15-point credibility diagnostic expanded into a full portal, brand, and systems build",
    desc: "Moved the engagement from a simple website refresh into a complete digital infrastructure program with portal architecture, brand identity, and backend planning.",
    impact: "Proof signal: 15-point review, scoped portal roadmap, and active build program documented inside the site.",
  },
  {
    num: "03",
    sector: "Enterprise Partnership Strategy",
    client: "Walmart Strategic Partnership",
    logoImg: "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/IMG_5813.png",
    headline: "Executive pitch narrative and visual package for enterprise partnership development",
    desc: "Developed the value proposition, presentation narrative, and supporting video materials for a high-stakes strategic partnership conversation.",
    impact: "Proof signal: board-ready narrative package and executive presentation system built for enterprise review.",
  },
  {
    num: "04",
    sector: "International Risk & Compliance",
    client: "Confidential India Operations Audit",
    logoImg: "",
    headline: "Multi-entity audit across IT security, branch controls, and vendor governance",
    desc: "Led an end-to-end international risk review covering operational controls, compliance exposure, and third-party governance across a complex environment.",
    impact: "Proof signal: remediation framework and risk posture assessment delivered for executive decision-making.",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function CaseStudies() {
  const { ref, inView } = useInView();

  return (
    <section id="work" className="bg-[#0A0A0A] py-20 sm:py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14 sm:mb-20 transition-all duration-700" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)" }}>
          <p className="text-[#D4AF37] mb-3 uppercase tracking-[0.2em] text-[11px] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>
            Selected Work
          </p>
          <div className="flex items-center gap-6">
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400 }}>
              Verified scope, named partners, and concrete proof signals
            </h2>
            <div className="flex-1 h-px bg-[#D4AF37]/30" />
          </div>
        </div>

        <div className="divide-y divide-white/8">
          {cases.map((c, i) => (
            <div
              key={c.num}
              className="py-10 sm:py-14 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start group"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: `opacity 0.6s ease ${0.15 + i * 0.15}s, transform 0.6s ease ${0.15 + i * 0.15}s` }}
            >
              <div className="lg:col-span-1">
                <span className="text-[#D4AF37] font-bold" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.875rem" }}>
                  {c.num}
                </span>
              </div>

              <div className="lg:col-span-3">
                <span className="text-white/35 uppercase tracking-widest" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem" }}>
                  {c.sector}
                </span>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center overflow-hidden bg-white/5 border border-white/10">
                    {c.logoImg ? (
                      <img src={c.logoImg} alt={c.client} className="w-full h-full object-contain" />
                    ) : (
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#D4AF37", letterSpacing: "0.12em" }}>
                        AX
                      </span>
                    )}
                  </div>
                  <p className="text-white/82" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    {c.client}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <h3
                  className="text-white group-hover:text-[#D4AF37] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 500, lineHeight: 1.45 }}
                >
                  {c.headline}
                </h3>
              </div>

              <div className="lg:col-span-4 space-y-3">
                <p className="text-white/50" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", lineHeight: 1.8 }}>
                  {c.desc}
                </p>
                <p className="text-[#D4AF37]" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.83rem", lineHeight: 1.75 }}>
                  {c.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
