import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Lock, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { BrandDecisionTool, type BrandBriefPayload } from "../components/BrandDecisionTool";
import { QuickAuditCapture } from "../components/QuickAuditCapture";
import { scrollToSection } from "../lib/marketing";

// ── Carousel slides — each simulates a screen inside the Brand Decision Tool ──
const slides = [
  {
    step: "01 / Welcome",
    title: "Your Brand, Your Call.",
    body: "We have done the research. We have built the options. Now it is your turn. Move through each decision at your own pace and select what aligns with your vision.",
    tag: "Introduction",
    accent: "#D4AF37",
    mockup: "welcome",
  },
  {
    step: "02 / Brand Identity",
    title: "Choose Your Visual Direction.",
    body: "Select from curated identity directions — each one grounded in your market positioning and the conversations we have had about where you want to go.",
    tag: "Identity",
    accent: "#D4AF37",
    mockup: "identity",
  },
  {
    step: "03 / Voice & Messaging",
    title: "How Should Your Brand Speak?",
    body: "Tone, language, and positioning. Select the voice that feels most authentic to your brand — from authoritative and formal to warm and conversational.",
    tag: "Messaging",
    accent: "#D4AF37",
    mockup: "voice",
  },
  {
    step: "04 / Digital Presence",
    title: "Where Do You Want to Show Up?",
    body: "Choose your primary channels and the content formats that make sense for your audience. We build the infrastructure around what you select.",
    tag: "Digital",
    accent: "#D4AF37",
    mockup: "digital",
  },
  {
    step: "05 / Review & Submit",
    title: "Your Brief Is Ready.",
    body: "Everything you have selected compiles into a clean brand brief. We receive it, review it, and begin building. No back-and-forth. No ambiguity.",
    tag: "Submission",
    accent: "#D4AF37",
    mockup: "submit",
  },
];

// ── Mock UI elements per slide ──
function MockScreen({ type }: { type: string }) {
  if (type === "welcome") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-5">
        <div className="space-y-2">
          <div className="h-1.5 w-16 bg-[#D4AF37]/60 rounded-full" />
          <div className="h-1.5 w-24 bg-white/20 rounded-full" />
        </div>
        <div className="space-y-3">
          <div className="h-8 w-3/4 bg-white/10 rounded" />
          <div className="h-3 w-full bg-white/6 rounded" />
          <div className="h-3 w-5/6 bg-white/6 rounded" />
          <div className="h-3 w-4/6 bg-white/6 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-[#D4AF37]/80 rounded" />
          <div className="h-8 w-20 bg-white/8 border border-white/15 rounded" />
        </div>
      </div>
    );
  }
  if (type === "identity") {
    return (
      <div className="w-full h-full flex flex-col gap-3 p-5">
        <div className="h-1.5 w-20 bg-[#D4AF37]/60 rounded-full mb-1" />
        <div className="grid grid-cols-2 gap-2 flex-1">
          {["Modern", "Classic", "Bold", "Minimal"].map((label, i) => (
            <div
              key={label}
              className={`rounded border flex flex-col items-center justify-center gap-1.5 p-2 ${i === 0 ? "border-[#D4AF37]/60 bg-[#D4AF37]/8" : "border-white/10 bg-white/4"}`}
            >
              <div className={`w-6 h-6 rounded-full ${i === 0 ? "bg-[#D4AF37]/40" : "bg-white/10"}`} />
              <span className="text-[9px] text-white/50" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</span>
              {i === 0 && <div className="w-3 h-3 rounded-full bg-[#D4AF37] flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" /></div>}
            </div>
          ))}
        </div>
        <div className="h-7 w-full bg-[#D4AF37]/70 rounded" />
      </div>
    );
  }
  if (type === "voice") {
    return (
      <div className="w-full h-full flex flex-col gap-3 p-5">
        <div className="h-1.5 w-20 bg-[#D4AF37]/60 rounded-full mb-1" />
        {["Authoritative", "Conversational", "Aspirational"].map((label, i) => (
          <div
            key={label}
            className={`flex items-center gap-3 p-3 rounded border ${i === 2 ? "border-[#D4AF37]/60 bg-[#D4AF37]/8" : "border-white/8 bg-white/3"}`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${i === 2 ? "border-[#D4AF37]" : "border-white/20"}`}>
              {i === 2 && <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
            </div>
            <div className="space-y-1 flex-1">
              <div className={`h-2 rounded ${i === 2 ? "w-24 bg-[#D4AF37]/60" : "w-20 bg-white/20"}`} />
              <div className="h-1.5 w-full bg-white/8 rounded" />
            </div>
          </div>
        ))}
        <div className="h-7 w-full bg-[#D4AF37]/70 rounded mt-auto" />
      </div>
    );
  }
  if (type === "digital") {
    return (
      <div className="w-full h-full flex flex-col gap-3 p-5">
        <div className="h-1.5 w-20 bg-[#D4AF37]/60 rounded-full mb-1" />
        <div className="grid grid-cols-3 gap-2">
          {["Web", "IG", "LI", "Email", "TikTok", "Other"].map((ch, i) => (
            <div
              key={ch}
              className={`aspect-square rounded border flex flex-col items-center justify-center gap-1 ${[0, 1, 3].includes(i) ? "border-[#D4AF37]/50 bg-[#D4AF37]/8" : "border-white/8 bg-white/3"}`}
            >
              <div className={`w-5 h-5 rounded ${[0, 1, 3].includes(i) ? "bg-[#D4AF37]/40" : "bg-white/10"}`} />
              <span className="text-[8px] text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>{ch}</span>
            </div>
          ))}
        </div>
        <div className="h-7 w-full bg-[#D4AF37]/70 rounded mt-auto" />
      </div>
    );
  }
  // submit
  return (
    <div className="w-full h-full flex flex-col gap-3 p-5 items-center justify-center text-center">
      <div className="w-10 h-10 rounded-full border border-[#D4AF37]/60 flex items-center justify-center mb-2">
        <div className="w-5 h-5 rounded-full bg-[#D4AF37]/40" />
      </div>
      <div className="h-3 w-32 bg-white/20 rounded" />
      <div className="space-y-1.5 w-full">
        <div className="h-2 w-full bg-white/8 rounded" />
        <div className="h-2 w-5/6 mx-auto bg-white/8 rounded" />
        <div className="h-2 w-4/6 mx-auto bg-white/8 rounded" />
      </div>
      <div className="h-8 w-36 bg-[#D4AF37]/80 rounded mt-2" />
    </div>
  );
}

export default function BrandToolPage() {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [current, setCurrent] = useState(0);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance every 3s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent(idx);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 3000);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const handleAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!clientName.trim() || !clientEmail.trim() || !code.trim()) {
      setError("Name, email, and access code are required.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      const res = await fetch("/api/brand-tool/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string; accessToken?: string };
      if (!res.ok || !data.accessToken) {
        throw new Error(data.error || "Access denied.");
      }

      setAccessToken(data.accessToken);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code. Please check with your advisor.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const slide = slides[current];

  const submitBrief = async (brief: BrandBriefPayload) => {
    if (!accessToken) {
      throw new Error("Access expired. Refresh and re-enter your code.");
    }

    const res = await fetch("/api/brand-tool/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        clientName,
        clientEmail,
        clientCompany,
        brief,
      }),
    });

    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      throw new Error(data.error || "Unable to submit brief.");
    }
  };

  if (accessToken) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-4">
          <div className="border border-[#D4AF37]/30 bg-[#131314] px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[#D4AF37]" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Partner Session Active
              </p>
              <p className="text-white/70" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem" }}>
                {clientName} · {clientEmail}{clientCompany ? ` · ${clientCompany}` : ""}
              </p>
            </div>
            <button
              onClick={() => setAccessToken(null)}
              className="px-4 py-2 border border-white/20 text-white/70 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              End Session
            </button>
          </div>
        </div>
        <BrandDecisionTool submitLabel="Submit Final Brief" onSubmitBrief={submitBrief} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero block */}
      <div className="pt-36 pb-16 px-6 lg:px-16 max-w-[1200px] mx-auto">
        <div className="max-w-2xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>
            Axiom Executive Advisory — Exclusive Tool
          </p>
          <h1 className="text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 400 }}>
            The Brand<br />
            <span style={{ color: "#D4AF37" }}>Decision Tool</span>
          </h1>
          <p className="text-white/50 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", maxWidth: "520px" }}>
            After we align on your vision, this tool gives you the final say.
            We present the options we have built around your goals — you move through them,
            make your selections, and we execute. No ambiguity. No back-and-forth.
            Just a clear brief and a clear path forward.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => scrollToSection("brand-tool-audit")}
              className="px-5 py-3 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              Need a Workflow Audit?
            </button>
            <button
              onClick={() => navigate("/architecture")}
              className="px-5 py-3 border border-white/15 text-white/75 hover:border-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              Explore Architecture
            </button>
          </div>
        </div>
      </div>

      {/* ── Carousel Preview ── */}
      <div className="px-6 lg:px-16 pb-20 max-w-[1200px] mx-auto">
        <div className="border-t border-white/8 pt-14 mb-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-bold mb-10" style={{ fontFamily: "'DM Mono', monospace" }}>
            A Look Inside
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-6">
          {/* Left: slide info */}
          <div className="space-y-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/60 font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>
              {slide.step}
            </p>
            <h2 className="text-white leading-snug" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 400, transition: "all 0.4s ease" }}>
              {slide.title}
            </h2>
            <p className="text-white/40 leading-relaxed text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {slide.body}
            </p>

            {/* Dot nav */}
            <div className="flex items-center gap-3 pt-2">
              <button onClick={prev} className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all">
                <ChevronLeft size={14} />
              </button>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="transition-all"
                    style={{
                      width: i === current ? "20px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: i === current ? "#D4AF37" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
              <button onClick={next} className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Right: mock device screen */}
          <div className="relative flex items-center justify-center">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-[#D4AF37]/6 blur-3xl" />
            </div>
            {/* Device frame */}
            <div
              className="relative w-full max-w-[320px] rounded-2xl overflow-hidden border border-white/10"
              style={{ background: "#111111", aspectRatio: "9/16", maxHeight: "420px" }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/6">
                <span className="text-[8px] text-white/30" style={{ fontFamily: "'DM Mono', monospace" }}>AXIOM</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/15" />
                </div>
                <span className="text-[8px] text-white/20" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {String(current + 1).padStart(2, "0")}/{slides.length}
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-0.5 bg-white/5">
                <div
                  className="h-full bg-[#D4AF37]/70 transition-all duration-300"
                  style={{ width: `${((current + 1) / slides.length) * 100}%` }}
                />
              </div>
              {/* Screen content */}
              <div
                className="flex-1"
                style={{ height: "calc(100% - 36px)", transition: "opacity 0.3s ease" }}
              >
                <MockScreen type={slide.mockup} />
              </div>
            </div>
          </div>
        </div>

        {/* Step pills */}
        <div className="flex flex-wrap gap-2 mb-16">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="px-3 py-1.5 text-[10px] uppercase tracking-widest transition-all"
              style={{
                fontFamily: "'DM Mono', monospace",
                border: i === current ? "1px solid rgba(212,175,55,0.5)" : "1px solid rgba(255,255,255,0.08)",
                color: i === current ? "#D4AF37" : "rgba(255,255,255,0.25)",
                background: i === current ? "rgba(212,175,55,0.06)" : "transparent",
              }}
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* How it works */}
        <div className="border-t border-white/8 pt-14 mb-14">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-bold mb-10" style={{ fontFamily: "'DM Mono', monospace" }}>
            How It Works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", label: "Receive Your Code", desc: "After your initial consultation, you will receive a unique access code tied to your engagement." },
              { num: "02", label: "Enter & Explore", desc: "Log in to find curated options — identity, positioning, voice, visual direction — built around your vision." },
              { num: "03", label: "Make Your Selections", desc: "Move through each decision at your own pace. Choose what resonates." },
              { num: "04", label: "Submit Your Brief", desc: "Your selections compile into a brand brief delivered directly to us. We build from there." },
            ].map((s) => (
              <div key={s.num} className="space-y-4">
                <span className="text-[#D4AF37] font-bold" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>{s.num}</span>
                <h3 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 500 }}>{s.label}</h3>
                <p className="text-white/35 text-sm leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Access gate */}
        <div className="border border-white/8 bg-white/[0.02] p-10 max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={15} className="text-[#D4AF37]" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>
              Partner Access
            </p>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-8" style={{ fontFamily: "'Barlow', sans-serif" }}>
            This tool is available exclusively to active Axiom Advisory engagements.
            Enter the access code provided during your consultation to continue.
          </p>
          <form onSubmit={handleAccessSubmit} className="space-y-4">
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client name"
              className="w-full bg-transparent border px-4 py-3 text-white placeholder-white/20 outline-none transition-colors"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.875rem",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            />
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Client email"
              className="w-full bg-transparent border px-4 py-3 text-white placeholder-white/20 outline-none transition-colors"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.875rem",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            />
            <input
              type="text"
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
              placeholder="Company (optional)"
              className="w-full bg-transparent border px-4 py-3 text-white placeholder-white/20 outline-none transition-colors"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.875rem",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            />
            <div style={{ animation: shake ? "shake 0.4s ease" : "none" }}>
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(null); }}
                placeholder="Enter access code"
                className="w-full bg-transparent border px-4 py-3 text-white placeholder-white/20 outline-none transition-colors"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.12)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.12)")}
              />
              {error && (
                <p className="text-red-400/70 text-xs mt-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all group"
              style={{
                fontFamily: "'Barlow', sans-serif",
                background: "transparent",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#D4AF37",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "#D4AF37"; b.style.color = "#0A0A0A"; b.style.borderColor = "#D4AF37";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "transparent"; b.style.color = "#D4AF37"; b.style.borderColor = "rgba(212,175,55,0.4)";
              }}
            >
              Access Tool
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Not a partner CTA */}
        <div className="mt-10 flex items-center gap-4">
          <p className="text-white/25 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Not yet an Axiom partner?
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Begin an engagement <ChevronRight size={13} />
          </button>
          <button
            onClick={() => navigate("/brand-tool/admin")}
            className="text-xs text-white/30 hover:text-[#D4AF37] transition-colors"
            style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Admin Portal
          </button>
        </div>
      </div>

      <QuickAuditCapture
        sectionId="brand-tool-audit"
        source="brand-tool-quick-audit"
        title="Need help implementing AI before you ever need the Brand Tool?"
        subtitle="This is for small businesses, local service companies, and founders who know they need better systems first. Send the workflow problem and we will map the first practical AI solution."
      />

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
