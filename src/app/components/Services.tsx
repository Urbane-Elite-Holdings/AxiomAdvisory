import { useEffect, useRef, useState } from "react";

const services = [
  {
    num: "01",
    name: "Chief of Staff",
    desc: "Embedded executive leadership bridging strategy and execution — from board alignment to daily operational command.",
  },
  {
    num: "02",
    name: "Brand Infrastructure",
    desc: "The systems behind the brand — identity, voice, digital presence, and content architecture built to scale.",
  },
  {
    num: "03",
    name: "Brand Decision Studio",
    desc: "An interactive strategic tool helping founders and executives choose positioning, visual direction, and go-to-market path.",
  },
  {
    num: "04",
    name: "Digital Presence & Micro-Sites",
    desc: "Purpose-built micro-sites, landing pages, and digital touchpoints that extend your brand's reach — fast, focused, and built without the overhead of a full rebuild.",
  },
  {
    num: "05",
    name: "Strategy to Structure",
    desc: "Translating high-level vision into organizational design, workflows, and accountability frameworks that drive measurable results.",
  },
  {
    num: "06",
    name: "End-to-End Operations",
    desc: "Full-spectrum operational oversight — process architecture, vendor management, and cross-functional alignment from concept to execution.",
  },
  {
    num: "07",
    name: "Operations Infrastructure",
    desc: "Streamlining how organizations run — SOPs, process documentation, template systems, and central knowledge repositories that keep teams aligned and operations scalable.",
  },
  {
    num: "08",
    name: "Governance & Decision Architecture",
    desc: "Governance models and decision-rights frameworks that enable clarity, speed, and institutional accountability at every level.",
  },
  {
    num: "09",
    name: "Executive Communications",
    desc: "Board presentations, stakeholder narratives, and executive messaging that move audiences and secure alignment.",
  },
  {
    num: "10",
    name: "Crisis Management",
    desc: "Incident response protocols, communications playbooks, and continuity frameworks — built before disruption strikes.",
  },
  {
    num: "11",
    name: "Third-Party Risk",
    desc: "Vendor governance, partner due diligence, and supply chain risk frameworks that protect the enterprise.",
  },
  {
    num: "12",
    name: "AI Governance & Compliance",
    desc: "Responsible AI adoption policies, risk controls, and compliance structures aligned with emerging regulatory standards.",
  },
  {
    num: "13",
    name: "Small Business AI Starter",
    desc: "Practical AI implementation for local and neighborhood businesses that need creative solutions, tool selection, and process improvements without enterprise overhead.",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function Services() {
  const { ref, inView } = useInView();
  return (
    <section id="services" className="bg-white py-20 sm:py-28 lg:py-36" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div
          className="mb-14 sm:mb-20 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)" }}
        >
          <p
            className="text-[#D4AF37] mb-3 uppercase tracking-[0.2em] text-[11px] font-bold"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Capabilities
          </p>
          <div className="flex items-center gap-6">
            <h2
              className="text-[#0A0A0A]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                fontWeight: 400,
              }}
            >
              What We Build
            </h2>
            <div className="flex-1 h-px bg-[#0A0A0A]/10" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {services.map((s, i) => (
            <div
              key={s.num}
              className="bg-white p-7 sm:p-9 group hover:bg-[#0A0A0A] transition-colors duration-300 cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(30px)",
                transition: `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s, background-color 0.3s`,
              }}
            >
              <p
                className="text-[#D4AF37] mb-4 font-bold"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem" }}
              >
                {s.num}
              </p>
              <h3
                className="text-[#0A0A0A] group-hover:text-white mb-2.5 transition-colors duration-300"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                {s.name}
              </h3>
              <p
                className="text-[#0A0A0A]/55 group-hover:text-white/50 transition-colors duration-300"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", lineHeight: 1.75 }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
