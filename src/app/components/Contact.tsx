import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { CONTACT_INBOX_EMAIL, FORMSPREE_ENDPOINT } from "../lib/marketing";

const serviceOptions = [
  "LeadFlow AI Audit + Setup",
  "AI Workflow Automation",
  "Small Business AI Starter",
  "Fractional Chief of Staff",
  "Strategy to Structure",
  "Operations Management",
  "AI Governance & Compliance",
  "Brand Strategy & Market Presence",
  "Strategic Risk Assessment",
];

const sectorOptions = [
  "Real Estate",
  "Design Firm",
  "Service Business",
  "Neighborhood Business",
  "Property Management",
  "Other",
];

const leadVolumeOptions = [
  "1-25 leads / month",
  "26-50 leads / month",
  "51-100 leads / month",
  "101-250 leads / month",
  "250+ leads / month",
];

const nextStepOptions = [
  "5-Min Workflow Audit",
  "LeadFlow AI Setup",
  "Executive Strategy Call",
  "General Advisory Inquiry",
];

type ContactFormState = {
  name: string;
  company: string;
  email: string;
  service: string;
  sector: string;
  monthlyLeads: string;
  stack: string;
  auditAsset: string;
  desiredNextStep: string;
  message: string;
};

const emptyForm: ContactFormState = {
  name: "",
  company: "",
  email: "",
  service: "",
  sector: "",
  monthlyLeads: "",
  stack: "",
  auditAsset: "",
  desiredNextStep: "",
  message: "",
};

const sectorMap: Record<string, string> = {
  "real-estate": "Real Estate",
  design: "Design Firm",
  service: "Service Business",
  neighborhood: "Neighborhood Business",
  "property-management": "Property Management",
};

const buildPrefill = (search: string): Partial<ContactFormState> => {
  const params = new URLSearchParams(search);
  const offer = params.get("offer");
  const sector = params.get("sector");
  const mappedSector = sector ? sectorMap[sector] ?? "" : "";

  return {
    service: offer === "leadflow" ? "LeadFlow AI Audit + Setup" : "",
    sector: mappedSector,
    desiredNextStep: offer === "leadflow" ? "5-Min Workflow Audit" : "",
    message: mappedSector
      ? `We want to tighten our ${mappedSector.toLowerCase()} lead response and follow-up workflow.`
      : "",
  };
};

export function Contact() {
  const location = useLocation();
  const prefill = useMemo(() => buildPrefill(location.search), [location.search]);
  const [form, setForm] = useState<ContactFormState>(() => ({ ...emptyForm, ...prefill }));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    setForm((current) => ({
      ...current,
      service: prefill.service || current.service,
      sector: prefill.sector || current.sector,
      desiredNextStep: prefill.desiredNextStep || current.desiredNextStep,
      message: current.message || prefill.message || "",
    }));
    setStatus("idle");
  }, [prefill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const payload = {
        ...form,
        _replyto: form.email,
        _subject: `New Axiom workflow inquiry${form.service ? `: ${form.service}` : ""}`,
        _to: CONTACT_INBOX_EMAIL,
        contactInbox: CONTACT_INBOX_EMAIL,
        sourcePath: `${window.location.pathname}${window.location.search}`,
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ ...emptyForm, ...prefill });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.9375rem",
  };

  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p
              className="text-[#D4AF37] mb-3"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Workflow Audit
            </p>
            <h2
              className="text-[#0A0A0A] mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.85rem, 3vw, 2.9rem)", fontWeight: 400, lineHeight: 1.08 }}
            >
              Request a confidential AI workflow gap analysis.
            </h2>
            <p
              className="text-[#0A0A0A]/70 max-w-[44ch]"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.9 }}
            >
              Share the lead path that is breaking, the tools your team already uses,
              and where handoffs slow down. If the business is still running on a phone,
              inbox, spreadsheet, or booking app, that is enough. We will review the
              workflow and reply with the fastest path to a stronger response system.
            </p>

            <div className="space-y-6 mt-10">
              <div>
                <p
                  className="text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Best Fit
                </p>
                <p className="text-[#0A0A0A]" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.75 }}>
                  Real estate teams, design firms, service businesses, neighborhood businesses, and property operators handling high-trust leads.
                </p>
              </div>
              <div>
                <p
                  className="text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Helpful Inputs
                </p>
                <p className="text-[#0A0A0A]" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.75 }}>
                  CRM export link, call log, inbox screenshot, loom walkthrough, lead source summary, or a plain-English description of where follow-up or day-to-day process work keeps breaking.
                </p>
              </div>
              <div>
                <p
                  className="text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Response Window
                </p>
                <p className="text-[#0A0A0A]" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.75 }}>
                  New inquiries are reviewed within one business day.
                </p>
              </div>
              <div>
                <p
                  className="text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Inbox
                </p>
                <p className="text-[#0A0A0A]" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem" }}>
                  {CONTACT_INBOX_EMAIL}
                </p>
              </div>
            </div>
          </div>

          <div>
            {status === "success" ? (
              <div className="h-full flex items-center justify-center border border-[#0A0A0A]/10 p-8">
                <div className="text-center max-w-md">
                  <div className="w-12 h-12 border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#D4AF37" }}>✓</span>
                  </div>
                  <p className="text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", lineHeight: 1.35 }}>
                    Audit request received.
                  </p>
                  <p className="text-[#0A0A0A]/65 mt-3" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.96rem", lineHeight: 1.8 }}>
                    We will review the workflow details and reply with the best next step.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 border border-[#0A0A0A]/10 p-6 sm:p-8 lg:p-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A]"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A]"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A]"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Business Type
                    </label>
                    <select
                      value={form.sector}
                      onChange={(e) => setForm({ ...form, sector: e.target.value })}
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A] appearance-none cursor-pointer"
                      style={inputStyle}
                    >
                      <option value="">Select one</option>
                      {sectorOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Monthly Lead Volume
                    </label>
                    <select
                      value={form.monthlyLeads}
                      onChange={(e) => setForm({ ...form, monthlyLeads: e.target.value })}
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A] appearance-none cursor-pointer"
                      style={inputStyle}
                    >
                      <option value="">Select range</option>
                      {leadVolumeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Service Interest
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A] appearance-none cursor-pointer"
                      style={inputStyle}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Current Stack
                    </label>
                    <input
                      type="text"
                      value={form.stack}
                      onChange={(e) => setForm({ ...form, stack: e.target.value })}
                      placeholder="HubSpot, Follow Up Boss, Gmail, Calendly, Square Appointments, or mostly phone and email..."
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A]"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-[#0A0A0A]/40"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Desired Next Step
                    </label>
                    <select
                      value={form.desiredNextStep}
                      onChange={(e) => setForm({ ...form, desiredNextStep: e.target.value })}
                      className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A] appearance-none cursor-pointer"
                      style={inputStyle}
                    >
                      <option value="">Select next step</option>
                      {nextStepOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block mb-2 text-[#0A0A0A]/40"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    CRM Export, Screenshot, or Loom Link
                  </label>
                  <input
                    type="url"
                    value={form.auditAsset}
                    onChange={(e) => setForm({ ...form, auditAsset: e.target.value })}
                    placeholder="Optional link to a CRM export, call log folder, spreadsheet, screenshot set, or walkthrough"
                    className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A]"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-[#0A0A0A]/40"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Where Is the Workflow Breaking?
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    placeholder="Example: web leads wait 45 minutes for follow-up, broker assignment is manual, and no-shows are not being reconfirmed."
                    className="w-full border-b border-gray-200 pb-3 bg-transparent focus:border-[#D4AF37] focus:outline-none transition-colors text-[#0A0A0A] resize-none"
                    style={inputStyle}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Something went wrong. Please email us directly at {CONTACT_INBOX_EMAIL}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-8 py-3.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-colors mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}
                >
                  {status === "submitting" ? "Sending..." : "Request Audit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
