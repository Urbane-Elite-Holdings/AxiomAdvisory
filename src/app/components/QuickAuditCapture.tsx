import { useEffect, useRef, useState } from "react";
import { CALENDLY_URL, CONTACT_INBOX_EMAIL, FORMSPREE_ENDPOINT, LEAD_MAGNET_PDF_PATH } from "../lib/marketing";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement; prefill?: Record<string, string> }) => void;
    };
  }
}

const businessTypes = [
  "Real Estate Team",
  "Design Firm",
  "Service Business",
  "Neighborhood Business",
  "Retail / Shop",
  "Wellness / Beauty",
  "Home Services",
  "Property Management",
  "Other",
];

const workflows = [
  "Missed-call recovery",
  "Lead routing and follow-up",
  "Scheduling and reminders",
  "Review requests and customer reactivation",
  "Admin automation and process cleanup",
];

type QuickAuditCaptureProps = {
  sectionId: string;
  source: string;
  title?: string;
  subtitle?: string;
};

function InlineCalendly({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url || !containerRef.current || typeof window === "undefined") return;

    const existingStylesheet = document.querySelector('link[data-calendly-widget="true"]');
    if (!existingStylesheet) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://assets.calendly.com/assets/external/widget.css";
      stylesheet.dataset.calendlyWidget = "true";
      document.head.appendChild(stylesheet);
    }

    const initWidget = () => {
      if (!containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
      });
    };

    const existingScript = document.querySelector('script[data-calendly-widget="true"]') as HTMLScriptElement | null;
    if (existingScript) {
      if (window.Calendly) initWidget();
      else existingScript.addEventListener("load", initWidget, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.dataset.calendlyWidget = "true";
    script.addEventListener("load", initWidget, { once: true });
    document.body.appendChild(script);
  }, [url]);

  return <div ref={containerRef} className="mt-5 min-h-[700px]" />;
}

export function QuickAuditCapture({
  sectionId,
  source,
  title = "Upload your CRM export, call log, or booking link for a free workflow gap analysis.",
  subtitle = "For real estate teams, neighborhood businesses, design firms, and service companies that know AI can help but need a practical starting point. No CRM required.",
}: QuickAuditCaptureProps) {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    businessType: "",
    website: "",
    auditAsset: "",
    bottleneck: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const payload = {
        ...form,
        source,
        leadMagnet: "5 AI Workflows Small Businesses Need in 2026",
        _replyto: form.email,
        _subject: `New Axiom quick audit request: ${source}`,
        _to: CONTACT_INBOX_EMAIL,
        contactInbox: CONTACT_INBOX_EMAIL,
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Unable to submit audit request.");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.92rem",
  };

  return (
    <section id={sectionId} className="bg-[#0A0A0A] py-20 sm:py-24 lg:py-28" style={{ scrollMarginTop: "7rem" }}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
          <div className="xl:col-span-5 space-y-6">
            <div>
              <p
                className="text-[#D4AF37] mb-3 uppercase tracking-[0.2em] text-[11px] font-bold"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Free Workflow Audit
              </p>
              <h2
                className="text-white"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 3.2vw, 2.9rem)",
                  lineHeight: 1.08,
                  fontWeight: 400,
                  maxWidth: "14ch",
                }}
              >
                {title}
              </h2>
            </div>

            <p
              className="text-white/68 max-w-[48ch]"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.98rem", lineHeight: 1.9 }}
            >
              {subtitle}
            </p>

            <div className="border border-[#D4AF37]/25 bg-[#111111] p-5 sm:p-6">
              <p
                className="text-[#D4AF37] uppercase tracking-[0.14em] mb-3"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem" }}
              >
                Free Field Guide
              </p>
              <h3
                className="text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 400 }}
              >
                5 AI Workflows Small Businesses Need in 2026
              </h3>
              <p
                className="text-white/66"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.8 }}
              >
                A short field guide covering practical automations for local and neighborhood businesses that need creative process improvements, not enterprise complexity.
              </p>
              <ul className="mt-4 space-y-2">
                {workflows.map((workflow) => (
                  <li
                    key={workflow}
                    className="text-white/72 pl-4 relative"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", lineHeight: 1.75 }}
                  >
                    <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    {workflow}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="xl:col-span-7 border border-white/12 bg-[#111111] p-6 sm:p-8 lg:p-9">
            {status === "success" ? (
              <div className="space-y-6">
                <div className="border border-[#D4AF37]/30 bg-[#0F0F10] p-5 sm:p-6">
                  <p
                    className="text-[#D4AF37] uppercase tracking-[0.14em] mb-3"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem" }}
                  >
                    Request Received
                  </p>
                  <h3
                    className="text-white mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.45rem", fontWeight: 400 }}
                  >
                    Your guide is unlocked.
                  </h3>
                  <p className="text-white/66" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.94rem", lineHeight: 1.8 }}>
                    Download the PDF now. If you want immediate booking, use the scheduler below when available.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-5">
                    <a
                      href={LEAD_MAGNET_PDF_PATH}
                      download
                      className="px-6 py-3.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
                    >
                      Download PDF
                    </a>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-3.5 border border-white/20 text-white hover:border-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}
                    >
                      Send Another Request
                    </button>
                  </div>
                </div>

                {CALENDLY_URL ? (
                  <div className="border border-white/12 bg-[#0F0F10] p-5 sm:p-6">
                    <p
                      className="text-[#D4AF37] uppercase tracking-[0.14em] mb-3"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem" }}
                    >
                      Instant Booking
                    </p>
                    <h3
                      className="text-white"
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 400 }}
                    >
                      Book your strategy call.
                    </h3>
                    <InlineCalendly url={CALENDLY_URL} />
                  </div>
                ) : null}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block mb-2 text-white/38"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full border-b border-white/12 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-white"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-white/38"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Business
                    </label>
                    <input
                      type="text"
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      required
                      className="w-full border-b border-white/12 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-white"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block mb-2 text-white/38"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full border-b border-white/12 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-white"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-white/38"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Business Type
                    </label>
                    <select
                      value={form.businessType}
                      onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                      className="w-full border-b border-white/12 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-white appearance-none"
                      style={inputStyle}
                    >
                      <option value="">Select one</option>
                      {businessTypes.map((option) => (
                        <option key={option} value={option} className="text-black">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block mb-2 text-white/38"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Website or Booking Link
                    </label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="Optional"
                      className="w-full border-b border-white/12 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-white"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-white/38"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      CRM Export, Call Log, or Share Link
                    </label>
                    <input
                      type="url"
                      value={form.auditAsset}
                      onChange={(e) => setForm({ ...form, auditAsset: e.target.value })}
                      placeholder="Drive, Dropbox, screenshot folder, booking app, or spreadsheet link"
                      className="w-full border-b border-white/12 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-white"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block mb-2 text-white/38"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    What Is Breaking Right Now?
                  </label>
                  <textarea
                    value={form.bottleneck}
                    onChange={(e) => setForm({ ...form, bottleneck: e.target.value })}
                    rows={4}
                    placeholder="Example: missed calls go unanswered, quote requests are manual, and no one is following up on abandoned inquiries."
                    className="w-full border-b border-white/12 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-white resize-none"
                    style={inputStyle}
                  />
                </div>

                {status === "error" ? (
                  <p className="text-red-400" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem" }}>
                    Something went wrong. Email {CONTACT_INBOX_EMAIL} and we will send the guide directly.
                  </p>
                ) : null}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="px-8 py-3.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
                  >
                    {status === "submitting" ? "Sending..." : "Get Audit + PDF"}
                  </button>
                  <p className="text-white/44" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", lineHeight: 1.7 }}>
                    No generic AI pitch. You get a practical improvement path for lead flow, process cleanup, and creative automation opportunities.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
