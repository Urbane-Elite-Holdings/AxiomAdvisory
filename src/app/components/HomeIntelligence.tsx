import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { navigateToAudit } from "../lib/marketing";

type FeedItem = {
  title: string;
  link: string;
  date: string;
  source: string;
  topic: string;
};

const fallbackItems: FeedItem[] = [
  {
    title: "AI strategy now requires operating models, not just tooling decisions",
    link: "https://openai.com/news/",
    date: "2026-01-15",
    source: "OpenAI",
    topic: "AI",
  },
  {
    title: "Why brand governance is becoming a board-level conversation",
    link: "https://blog.hubspot.com/marketing",
    date: "2026-01-07",
    source: "HubSpot",
    topic: "Branding",
  },
  {
    title: "Execution architecture: what separates strategic plans from strategic outcomes",
    link: "https://mitsloan.mit.edu/ideas-made-to-matter",
    date: "2025-12-22",
    source: "MIT Sloan",
    topic: "Strategy",
  },
];

const facts = [
  "Manual lead response usually breaks first at nights, weekends, and ownership handoffs.",
  "Teams with documented decision rights can cut rework by reducing approval bottlenecks and duplicate effort.",
  "High-growth organizations often stall from operational lag, not idea scarcity.",
  "AI adoption creates value only when routing, escalation, and accountability are explicit.",
  "Premium brands lose revenue when the experience after first inquiry feels slow or improvised.",
];

const formatDate = (input: string) => {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return "Recent";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export function HomeIntelligence() {
  const navigate = useNavigate();
  const location = useLocation();
  const [feedItems] = useState<FeedItem[]>(fallbackItems);
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * facts.length));
  const [factVisible, setFactVisible] = useState(true);

  useEffect(() => {
    let swapTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setFactVisible(false);
      swapTimeout = setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % facts.length);
        setFactVisible(true);
      }, 260);
    }, 9000);

    return () => {
      clearInterval(interval);
      if (swapTimeout) clearTimeout(swapTimeout);
    };
  }, []);

  return (
    <section className="bg-[#E8E8E8] py-20 sm:py-24 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-7">
          <p
            className="text-[#0A0A0A]/50 uppercase tracking-[0.16em]"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.66rem" }}
          >
            Field Intelligence
          </p>
          <h2
            className="text-[#0A0A0A]"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.35rem, 2.5vw, 2.15rem)", lineHeight: 1.25 }}
          >
            Popular insights across AI automation, small-business operations, and strategic execution
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 border border-black/10 bg-white">
            <div className="px-5 py-4 border-b border-black/10 flex items-center justify-between">
              <p
                className="text-[#0A0A0A]"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.86rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" as const }}
              >
                Curated Field Notes
              </p>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "rgba(10,10,10,0.55)" }}>
                Curated
              </span>
            </div>
            <div className="divide-y divide-black/8">
              {feedItems.map((item) => (
                <a
                  key={`${item.source}-${item.link}`}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-5 py-4 hover:bg-[#F6F6F6] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="px-2 py-0.5 border border-[#D4AF37]/50 text-[#7A6218]"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.05em", textTransform: "uppercase" as const }}
                    >
                      {item.topic}
                    </span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "rgba(10,10,10,0.45)" }}>
                      {item.source} · {formatDate(item.date)}
                    </span>
                  </div>
                  <p
                    className="text-[#0A0A0A]"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.45 }}
                  >
                    {item.title}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="border border-black/10 bg-[#0F0F10] text-white p-5">
              <p
                className="text-[#D4AF37] mb-3"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem", letterSpacing: "0.1em", textTransform: "uppercase" as const }}
              >
                Did You Know?
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.12rem",
                  lineHeight: 1.45,
                  opacity: factVisible ? 1 : 0,
                  transform: factVisible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.26s ease, transform 0.26s ease",
                }}
              >
                {facts[factIndex]}
              </p>
              <button
                onClick={() => setFactIndex((prev) => (prev + 1) % facts.length)}
                className="mt-4 px-3 py-2 border border-[#D4AF37]/40 text-[#D4AF37]"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" as const }}
              >
                Show Another
              </button>
            </div>

            <div className="border border-black/10 bg-white p-5 space-y-3">
              <p
                className="text-[#0A0A0A]/55"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase" as const }}
              >
                Next Actions
              </p>
              <button
                onClick={() => navigate("/architecture")}
                className="w-full text-left px-3 py-2.5 border border-[#0A0A0A]/15 hover:border-[#D4AF37]/70 hover:bg-[#FAFAFA] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}
              >
                Compare Industry Architectures
              </button>
              <button
                onClick={() => navigate("/brand-tool")}
                className="w-full text-left px-3 py-2.5 border border-[#0A0A0A]/15 hover:border-[#D4AF37]/70 hover:bg-[#FAFAFA] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}
              >
                Partner Brand Tool Access
              </button>
              <button
                onClick={() => navigateToAudit(navigate, location.pathname)}
                className="w-full text-left px-3 py-2.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c5a12f] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", fontWeight: 700 }}
              >
                Begin Engagement
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
