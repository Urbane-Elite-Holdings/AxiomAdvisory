import { useEffect, useState } from "react";

type Testimony = {
  quote: string;
  author: string;
  rating: number;
};

const testimonies: Testimony[] = [
  {
    quote:
      "Axiom brought executive-level structure into a chaotic phase and gave us a decision cadence we could finally trust.",
    author: "Founder, Consumer Venture",
    rating: 4.8,
  },
  {
    quote:
      "We needed speed without cutting corners. Their operating model made our leadership team sharper within weeks.",
    author: "COO, Multi-State Services Group",
    rating: 5.0,
  },
  {
    quote:
      "The Brand Decision Studio helped us stop spinning and commit to a clear go-to-market direction.",
    author: "Managing Partner, Growth Portfolio",
    rating: 4.7,
  },
  {
    quote:
      "Discreet, precise, and outcomes-first. They executed like an embedded chief of staff with board-level judgment.",
    author: "Executive Director, Mission-Led Organization",
    rating: 4.9,
  },
  {
    quote:
      "From governance cleanup to executive communications, every recommendation translated directly into action.",
    author: "President, Regional Enterprise",
    rating: 4.6,
  },
];

export function ClientTestimonies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let swapTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setVisible(false);
      swapTimeout = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonies.length);
        setVisible(true);
      }, 420);
    }, 7600);

    return () => {
      clearInterval(interval);
      if (swapTimeout) clearTimeout(swapTimeout);
    };
  }, []);

  const active = testimonies[activeIndex];
  const starCount = Math.max(4, Math.min(5, Math.round(active.rating)));

  return (
    <section className="bg-[#0A0A0A] py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <p
          className="text-[#D4AF37] uppercase tracking-[0.2em] mb-4"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", fontWeight: 700 }}
        >
          Client Testimonials
        </p>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.42s ease, transform 0.42s ease",
          }}
        >
          <p
            className="text-white mx-auto"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.2rem, 2.4vw, 1.9rem)",
              lineHeight: 1.45,
              maxWidth: "40ch",
            }}
          >
            "{active.quote}"
          </p>

          <div className="mt-6 flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={`star-${i}`}
                style={{
                  color: i < starCount ? "#D4AF37" : "rgba(212,175,55,0.25)",
                  fontSize: "1rem",
                  lineHeight: 1,
                }}
              >
                ★
              </span>
            ))}
            <span
              className="ml-2"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", letterSpacing: "0.08em" }}
            >
              {active.rating.toFixed(1)} / 5.0
            </span>
          </div>

          <p
            className="mt-4 text-white/55"
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.82rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            {active.author}
          </p>
        </div>
      </div>
    </section>
  );
}
