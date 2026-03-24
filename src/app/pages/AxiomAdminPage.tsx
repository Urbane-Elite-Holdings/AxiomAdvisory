import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Lock, Unlock, ExternalLink, Send, CheckCircle, AlertCircle,
  Clock, FileText, Edit3, Users, LogOut, ChevronRight, Plus,
} from "lucide-react";

/* ─── Typography ─────────────────────────────────────────── */
const SERIF = { fontFamily: "'Playfair Display', serif" };
const SANS  = { fontFamily: "'DM Sans', system-ui, sans-serif" };
const MONO  = { fontFamily: "'DM Mono', monospace" };

/* ─── Types ──────────────────────────────────────────────── */
interface Portal {
  label: string;
  type: "partner" | "product";
  url: string;
  external?: boolean;
  note: string;
  released: boolean;
}

interface Engagement {
  id: string;
  client: string;
  descriptor: string;
  type: string;
  status: "proposal" | "pending" | "active" | "complete";
  statusLabel: string;
  statusColor: string;
  initiated: string;
  lastActivity: string;
  passCode: string;
  metrics: { label: string; value: string }[];
  flags: string[];
  accent: string;
  portals: Portal[];
  agreementsSent: boolean;
  agreementsUrl: string | null;
  clientLegalName: string;
  clientLegalNameConfirmed: boolean;
  sowApplicable: boolean;
  sowScope: string[];
  msaNote?: string;
}

/* ─── Data ───────────────────────────────────────────────── */
const INITIAL_ENGAGEMENTS: Engagement[] = [
  {
    id: "AXM-CBS-2026-001",
    client: "Cornbread Soul Food",
    descriptor: "Fast-Casual / Hospitality",
    type: "Brand & Operational Strategy",
    status: "proposal",
    statusLabel: "Proposal Delivered",
    statusColor: "#C9973A",
    initiated: "February 2026",
    lastActivity: "Strategic advisory delivered — 65-page diagnostic report",
    passCode: "cornbread123",
    metrics: [
      { label: "Report Pages", value: "65"    },
      { label: "Audit Areas",  value: "6"     },
      { label: "Locations",    value: "4"     },
      { label: "Market Size",  value: "$4.22B" },
    ],
    flags: ["No MSA executed", "No fees collected", "Awaiting client decision"],
    accent: "#C9973A",
    portals: [
      {
        label: "Partner Portal",
        type: "partner",
        url: "/partners/cornbread",
        note: "Axiom-hosted engagement page · brand diagnostic + strategic report",
        released: false,
      },
    ],
    agreementsSent: false,
    agreementsUrl: null,
    clientLegalName: "",
    clientLegalNameConfirmed: false,
    sowApplicable: false,
    sowScope: [],
    msaNote: "No SOW applicable. This engagement is advisory-only — no platform or product build is in scope. A SOW will be generated if the client moves forward with a service build.",
  },
  {
    id: "AXM-K2K-2026-001",
    client: "K2K College Prep Services",
    descriptor: "HBCU Education Consulting",
    type: "Full-Scale Portal Build · Brand Identity · Digital Infrastructure",
    status: "pending",
    statusLabel: "Pending MSA Execution",
    statusColor: "#888",
    initiated: "March 22, 2026",
    lastActivity: "2.5-hour intake completed · Scope + budget calculator delivered",
    passCode: "k2k",
    metrics: [
      { label: "Full Scope Value", value: "$20,750" },
      { label: "Audit Findings",  value: "15"      },
      { label: "Timeline",        value: "16 Wks"  },
      { label: "Initiation Dep.", value: "$750"    },
    ],
    flags: ["No MSA executed", "No fees collected", "All dates TBD"],
    accent: "#C9973A",
    portals: [
      {
        label: "Partner Portal",
        type: "partner",
        url: "/partners/k2k/portal",
        note: "Axiom-hosted engagement page · scope, audit findings & budget calculator",
        released: false,
      },
      {
        label: "Student Portal",
        type: "product",
        url: "https://www.figma.com/make/UMAjL97ud2fduZ7yQYrbmg/K2K-COLLEGE-PREP-SERVICES?p=f&t=bu6LnwuANAret5Yq-0",
        external: true,
        note: "Product Axiom is building for K2K · currently in early development on Figma",
        released: false,
      },
    ],
    agreementsSent: false,
    agreementsUrl: null,
    clientLegalName: "",
    clientLegalNameConfirmed: false,
    sowApplicable: true,
    sowScope: [
      "Brand Identity System",
      "Public Website — 7 Pages",
      "Authenticated Client Portal — 8 Modules",
      "Advisor Admin Dashboard",
      "Technical Infrastructure (Domain, Hosting, Database, Auth)",
      "QA, Testing & Production Launch",
      "Post-Launch Support — 30 Days",
      "Project Management",
    ],
  },
];

/* ─── Component ──────────────────────────────────────────── */
export default function AxiomAdminPage() {
  const navigate = useNavigate();

  // ── Auth guard — redirect if not unlocked via /axiom-admin ──
  useEffect(() => {
    const auth = sessionStorage.getItem("portal_auth_/axiom-admin/dashboard");
    if (!auth) navigate("/axiom-admin", { replace: true });
  }, [navigate]);

  const [engagements, setEngagements] = useState<Engagement[]>(INITIAL_ENGAGEMENTS);
  const [activeId, setActiveId] = useState<string>(INITIAL_ENGAGEMENTS[0].id);
  const eng = engagements.find(e => e.id === activeId)!;

  // ── K2K Portal Activity ──────────────────────────────────
  const [k2kActivity, setK2kActivity] = useState({
    firstAccess: null as string | null,
    lastAccess: null as string | null,
    scopeSelections: null as string[] | null,
    availabilitySubmitted: null as string | null,
    availabilitySlots: null as string[] | null,
  });
  const [callConfirmed, setCallConfirmed] = useState(false);
  const [callDateTime, setCallDateTime] = useState("");

  useEffect(() => {
    const first     = localStorage.getItem("k2k_first_access");
    const last      = localStorage.getItem("k2k_last_access");
    const scope     = localStorage.getItem("k2k_scope_selections");
    const submitted = localStorage.getItem("k2k_availability_submitted");
    const slots     = localStorage.getItem("k2k_availability_slots");
    setK2kActivity({
      firstAccess:           first     ? new Date(first).toLocaleString()     : null,
      lastAccess:            last      ? new Date(last).toLocaleString()      : null,
      scopeSelections:       scope     ? JSON.parse(scope)                    : null,
      availabilitySubmitted: submitted ? new Date(submitted).toLocaleString() : null,
      availabilitySlots:     slots     ? JSON.parse(slots)                    : null,
    });
  }, []);

  // ── Handlers ─────────────────────────────────────────────
  const togglePortal = (engId: string, portalLabel: string) => {
    setEngagements(prev => prev.map(e =>
      e.id !== engId ? e : {
        ...e,
        portals: e.portals.map(p =>
          p.label === portalLabel ? { ...p, released: !p.released } : p
        ),
      }
    ));
  };

  const updateClientLegalName = (engId: string, name: string) => {
    setEngagements(prev => prev.map(e =>
      e.id === engId ? { ...e, clientLegalName: name, clientLegalNameConfirmed: false } : e
    ));
  };

  const confirmClientLegalName = (engId: string) => {
    setEngagements(prev => prev.map(e =>
      e.id === engId && e.clientLegalName.trim() ? { ...e, clientLegalNameConfirmed: true } : e
    ));
  };

  const sendAgreements = (engId: string) => {
    setEngagements(prev => prev.map(e =>
      e.id === engId ? { ...e, agreementsSent: true } : e
    ));
  };

  const pendingCount = engagements.filter(e => e.status === "pending").length;
  const fmtSlot = (key: string) =>
    new Date(key).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="flex min-h-screen" style={SANS}>

      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0D1B2A] flex flex-col z-40 overflow-y-auto">

        {/* Logo */}
        <div className="px-6 pt-8 pb-6 border-b border-white/8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-7 h-7 bg-[#C9973A] flex items-center justify-center rounded-sm flex-shrink-0">
              <span className="text-[#0D1B2A] text-[11px] font-black" style={SERIF}>A</span>
            </div>
            <span className="text-white text-[13px] font-semibold tracking-wide" style={SERIF}>
              Axiom Advisory
            </span>
          </div>
          <p className="text-white/30 text-[10px] tracking-widest uppercase ml-10" style={MONO}>
            Client Manager
          </p>
        </div>

        {/* Stats strip */}
        <div className="px-6 py-4 border-b border-white/8 flex gap-4">
          <div>
            <p className="text-white/30 text-[9px] tracking-widest uppercase" style={MONO}>Clients</p>
            <p className="text-white text-lg font-semibold" style={SERIF}>{engagements.length}</p>
          </div>
          {pendingCount > 0 && (
            <div>
              <p className="text-[#C9973A]/60 text-[9px] tracking-widest uppercase" style={MONO}>Pending</p>
              <p className="text-[#C9973A] text-lg font-semibold" style={SERIF}>{pendingCount}</p>
            </div>
          )}
        </div>

        {/* Client list */}
        <nav className="flex-1 px-3 py-4">
          <p className="text-white/25 text-[9px] tracking-widest uppercase px-3 mb-3" style={MONO}>
            Engagements
          </p>
          <div className="space-y-1">
            {engagements.map(e => {
              const isActive = e.id === activeId;
              return (
                <button
                  key={e.id}
                  onClick={() => setActiveId(e.id)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-all group ${
                    isActive
                      ? "bg-white/10 border border-white/15"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[12px] font-medium leading-tight ${isActive ? "text-white" : "text-white/60 group-hover:text-white/80"}`}
                      style={SANS}
                    >
                      {e.client}
                    </span>
                    {isActive && <ChevronRight size={11} className="text-[#C9973A] flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: e.statusColor }}
                    />
                    <span className="text-[9px] uppercase tracking-widest text-white/30" style={MONO}>
                      {e.statusLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Add client placeholder */}
          <button className="w-full mt-4 flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-white/10 text-white/25 hover:text-white/40 hover:border-white/20 transition-all text-[11px] tracking-wide">
            <Plus size={11} />
            <span style={SANS}>Add Client</span>
          </button>
        </nav>

        {/* Sidebar footer */}
        <div className="px-4 py-5 border-t border-white/8 space-y-1">
          <button
            onClick={() => { sessionStorage.removeItem("portal_auth_/axiom-admin/dashboard"); navigate("/axiom-admin"); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/30 hover:text-white/50 hover:bg-white/5 transition-all text-[11px]"
          >
            <LogOut size={11} />
            <span style={SANS}>Lock & Exit</span>
          </button>
          <p className="text-white/15 text-[9px] text-center tracking-wide pt-1" style={MONO}>
            Internal Use Only · Do Not Share
          </p>
        </div>
      </aside>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <main className="ml-64 flex-1 bg-[#F5F2EE] min-h-screen pb-20">

        {/* Top bar */}
        <div className="bg-white border-b border-[#E8E0D4] px-8 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full border font-medium"
                  style={{ color: eng.statusColor, borderColor: eng.statusColor + "44", backgroundColor: eng.statusColor + "11", ...MONO }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
                    style={{ backgroundColor: eng.statusColor }}
                  />
                  {eng.statusLabel}
                </span>
                <span className="text-[10px] text-[#AAA] tracking-widest uppercase" style={MONO}>
                  {eng.id}
                </span>
              </div>
              <h1 className="text-[26px] font-semibold text-[#0D1B2A]" style={SERIF}>
                {eng.client}
              </h1>
              <p className="text-[13px] text-[#888] mt-0.5" style={SANS}>{eng.type}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 pt-1">
              <Users size={13} className="text-[#AAA]" />
              <span className="text-[11px] text-[#AAA]" style={MONO}>
                Since {eng.initiated}
              </span>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-6 max-w-[900px]">

          {/* ── Metrics ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {eng.metrics.map((m, i) => (
              <div key={i} className="bg-white border border-[#E8E0D4] rounded-xl p-4">
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#AAA] mb-1.5" style={MONO}>
                  {m.label}
                </p>
                <p className="text-[22px] font-semibold text-[#0D1B2A]" style={SERIF}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* ── Portal Access ──────────────────────────────────── */}
          <div className="bg-white border border-[#E8E0D4] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F0EAE0]">
              <p className="text-[10px] uppercase tracking-widest text-[#AAA] font-medium" style={MONO}>
                Portal Access
              </p>
            </div>
            <div className="divide-y divide-[#F5F0E8]">
              {eng.portals.map((portal) => (
                <div key={portal.label} className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[12px] font-medium text-[#0D1B2A]" style={SANS}>
                        {portal.label}
                      </span>
                      <span className={`text-[9px] uppercase tracking-widest px-2 py-[2px] rounded border ${
                        portal.type === "product"
                          ? "text-[#C9973A] border-[#C9973A33] bg-[#C9973A0A]"
                          : "text-[#888] border-[#DDD] bg-[#F8F5F0]"
                      }`} style={MONO}>
                        {portal.type === "product" ? "Product Build" : "Engagement Page"}
                      </span>
                      <span className={`text-[9px] uppercase tracking-widest px-2 py-[2px] rounded border flex items-center gap-1 ${
                        portal.released
                          ? "text-[#2A7A4A] border-[#2A7A4A33] bg-[#2A7A4A0A]"
                          : "text-[#888] border-[#DDD] bg-[#F8F5F0]"
                      }`} style={MONO}>
                        {portal.released ? <Unlock size={8} /> : <Lock size={8} />}
                        {portal.released ? "Released" : "Locked"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#999] leading-4" style={SANS}>{portal.note}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => portal.external ? window.open(portal.url, "_blank") : navigate(portal.url)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DDD] text-[#666] text-[10px] tracking-widest uppercase hover:border-[#C9973A] hover:text-[#C9973A] transition-all"
                      style={MONO}
                    >
                      <ExternalLink size={9} />
                      Preview
                    </button>
                    <button
                      onClick={() => togglePortal(eng.id, portal.label)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] tracking-widest uppercase transition-all border ${
                        portal.released
                          ? "border-[#2A7A4A33] text-[#2A7A4A] hover:bg-[#2A7A4A0A]"
                          : "border-[#C9973A44] text-[#C9973A] hover:bg-[#C9973A0A]"
                      }`}
                      style={MONO}
                    >
                      {portal.released ? <Unlock size={9} /> : <Lock size={9} />}
                      {portal.released ? "Lock" : "Release"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {!eng.portals.every(p => p.released) && (
              <div className="px-6 py-3 bg-[#FAF7F2]">
                <p className="text-[10px] text-[#BBB]" style={SANS}>
                  Releasing a portal does not notify the client automatically. Use Send Agreements below to trigger an email.
                </p>
              </div>
            )}
          </div>

          {/* ── Agreements ─────────────────────────────────────── */}
          <div className="bg-white border border-[#E8E0D4] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F0EAE0]">
              <p className="text-[10px] uppercase tracking-widest text-[#AAA] font-medium" style={MONO}>
                MSA + SOW
              </p>
            </div>
            <div className="p-6 space-y-4">

              {/* Documents */}
              <div className={`grid gap-3 ${eng.sowApplicable ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                <div className="flex items-start gap-3 bg-[#FAF7F2] border border-[#EDE5D8] rounded-lg p-4">
                  <FileText size={13} className="text-[#C9973A] mt-[2px] flex-shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-[#333] mb-0.5" style={SANS}>
                      Master Services Agreement
                    </p>
                    <p className="text-[9px] uppercase tracking-widest text-[#AAA]" style={MONO}>
                      Draft on file
                    </p>
                  </div>
                </div>

                {eng.sowApplicable ? (
                  <div className="flex items-start gap-3 bg-[#FAF7F2] border border-[#EDE5D8] rounded-lg p-4">
                    <FileText size={13} className="text-[#C9973A] mt-[2px] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-[#333] mb-0.5" style={SANS}>
                        Statement of Work — {eng.id}
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-[#AAA] mb-2" style={MONO}>
                        Draft on file
                      </p>
                      <div className="space-y-[3px]">
                        {eng.sowScope.map((item, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-[#C9973A] text-[9px] flex-shrink-0 mt-[1px]">·</span>
                            <span className="text-[10px] text-[#777] leading-[1.4]" style={SANS}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FAF7F2] border border-dashed border-[#DDD] rounded-lg p-4">
                    <p className="text-[9px] uppercase tracking-widest text-[#CCC] mb-1.5" style={MONO}>
                      Statement of Work — N/A
                    </p>
                    <p className="text-[11px] text-[#AAA] leading-relaxed" style={SANS}>
                      {eng.msaNote}
                    </p>
                  </div>
                )}
              </div>

              {/* Client legal name */}
              {eng.sowApplicable && (
                <div className="bg-[#FAF7F2] border border-[#EDE5D8] rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Edit3 size={10} className={eng.clientLegalNameConfirmed ? "text-[#2A7A4A]" : "text-[#AAA]"} />
                    <p className="text-[9px] uppercase tracking-widest text-[#AAA]" style={MONO}>
                      Client Legal Entity Name
                      {eng.clientLegalNameConfirmed && (
                        <span className="ml-2 text-[#2A7A4A]">· Confirmed</span>
                      )}
                    </p>
                  </div>

                  {eng.clientLegalNameConfirmed ? (
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[14px] font-medium text-[#0D1B2A]" style={SANS}>
                        {eng.clientLegalName}
                      </p>
                      <button
                        onClick={() => setEngagements(prev => prev.map(e =>
                          e.id === eng.id ? { ...e, clientLegalNameConfirmed: false } : e
                        ))}
                        className="text-[9px] uppercase tracking-widest text-[#BBB] hover:text-[#666] transition-colors"
                        style={MONO}
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={eng.clientLegalName}
                        onChange={(e) => updateClientLegalName(eng.id, e.target.value)}
                        placeholder="e.g. K2K College Prep Services LLC"
                        className="flex-1 bg-white border border-[#DDD] text-[#333] text-[13px] px-3 py-2 rounded-lg placeholder-[#CCC] focus:outline-none focus:border-[#C9973A] transition-colors"
                        style={SANS}
                      />
                      <button
                        onClick={() => confirmClientLegalName(eng.id)}
                        disabled={!eng.clientLegalName.trim()}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] tracking-widest uppercase transition-all flex-shrink-0 ${
                          eng.clientLegalName.trim()
                            ? "bg-[#C9973A] text-white hover:bg-[#b8882f]"
                            : "bg-[#EEE] text-[#CCC] cursor-not-allowed"
                        }`}
                        style={MONO}
                      >
                        <CheckCircle size={9} />
                        Confirm
                      </button>
                    </div>
                  )}
                  <p className="text-[10px] text-[#BBB] leading-relaxed" style={SANS}>
                    Must match the client's registered legal entity name exactly as it will appear in the MSA and SOW.
                  </p>
                </div>
              )}

              {/* Send button */}
              {eng.sowApplicable && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                  <div>
                    {eng.agreementsSent ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={13} className="text-[#2A7A4A]" />
                        <p className="text-[13px] text-[#2A7A4A]" style={SANS}>
                          Agreements sent — awaiting client acknowledgment
                        </p>
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#BBB] leading-relaxed max-w-sm" style={SANS}>
                        Sends agreements via email and shows a notification banner in the client portal. Requires confirmed legal name.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => eng.clientLegalNameConfirmed && !eng.agreementsSent && sendAgreements(eng.id)}
                    disabled={!eng.clientLegalNameConfirmed || eng.agreementsSent}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[11px] tracking-widest uppercase transition-all flex-shrink-0 ${
                      eng.agreementsSent
                        ? "bg-[#F0F0F0] text-[#AAA] cursor-default"
                        : eng.clientLegalNameConfirmed
                          ? "bg-[#0D1B2A] text-white hover:bg-[#1a2d42]"
                          : "bg-[#EEE] text-[#CCC] cursor-not-allowed"
                    }`}
                    style={MONO}
                  >
                    <Send size={10} />
                    {eng.agreementsSent ? "Agreements Sent" : "Send Agreements"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Activity + Flags ────────────────────────────────── */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E8E0D4] rounded-xl p-5 flex items-start gap-3">
              <Clock size={14} className="text-[#C9973A] mt-[2px] flex-shrink-0" />
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#AAA] mb-1" style={MONO}>
                  Last Activity · {eng.initiated}
                </p>
                <p className="text-[13px] text-[#444] leading-relaxed" style={SANS}>
                  {eng.lastActivity}
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#E8E0D4] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={12} className="text-[#C9973A]" />
                <p className="text-[9px] uppercase tracking-widest text-[#AAA]" style={MONO}>
                  Status Flags
                </p>
              </div>
              <div className="space-y-2">
                {eng.flags.map((flag, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9973A] flex-shrink-0" />
                    <span className="text-[12px] text-[#666]" style={SANS}>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── K2K Portal Activity ─────────────────────────────── */}
          {eng.id === "AXM-K2K-2026-001" && (
            <div className="bg-white border border-[#E8E0D4] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#F0EAE0] flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-widest text-[#AAA] font-medium" style={MONO}>
                  Client Portal Activity · Tina
                </p>
                <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded border ${
                  k2kActivity.firstAccess
                    ? "text-[#2A7A4A] border-[#2A7A4A33] bg-[#2A7A4A0A]"
                    : "text-[#AAA] border-[#DDD] bg-[#FAF7F2]"
                }`} style={MONO}>
                  {k2kActivity.firstAccess ? "Portal Accessed" : "Not Yet Visited"}
                </span>
              </div>
              <div className="p-6 space-y-5">

                {/* Status grid */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "First Access",
                      value: k2kActivity.firstAccess ?? "—",
                      done: !!k2kActivity.firstAccess,
                    },
                    {
                      label: "Last Access",
                      value: k2kActivity.lastAccess ?? "—",
                      done: !!k2kActivity.lastAccess,
                    },
                    {
                      label: "Scope Selections",
                      value: k2kActivity.scopeSelections
                        ? `${k2kActivity.scopeSelections.length} services selected`
                        : "No selections saved",
                      done: !!k2kActivity.scopeSelections,
                    },
                    {
                      label: "Availability Submitted",
                      value: k2kActivity.availabilitySubmitted ?? "Not submitted",
                      done: !!k2kActivity.availabilitySubmitted,
                    },
                  ].map((item, i) => (
                    <div key={i} className={`rounded-lg p-4 border ${
                      item.done
                        ? "bg-[#F5FBF7] border-[#2A7A4A22]"
                        : "bg-[#FAF7F2] border-[#EDE5D8]"
                    }`}>
                      <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: item.done ? "#2A7A4A" : "#AAA", ...MONO }}>
                        {item.label}
                      </p>
                      <p className="text-[12px] text-[#444]" style={SANS}>{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Scope selections */}
                {k2kActivity.scopeSelections && (
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#AAA] mb-2" style={MONO}>
                      Selected Services
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {k2kActivity.scopeSelections.map((id, i) => (
                        <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-[#C9973A11] border border-[#C9973A33] text-[#C9973A]" style={MONO}>
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Availability slots */}
                {k2kActivity.availabilitySlots && k2kActivity.availabilitySlots.length > 0 && (
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#AAA] mb-2" style={MONO}>
                      Available Times Submitted
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {k2kActivity.availabilitySlots.map((slot, i) => (
                        <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#DDD] text-[#666]" style={MONO}>
                          {fmtSlot(slot)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirm call */}
                {k2kActivity.availabilitySlots && k2kActivity.availabilitySlots.length > 0 && (
                  <div className="border-t border-[#F0EAE0] pt-4">
                    <p className="text-[9px] uppercase tracking-widest text-[#AAA] mb-3" style={MONO}>
                      Confirm Discovery Call
                    </p>
                    {callConfirmed ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-[#2A7A4A]" />
                        <p className="text-[13px] text-[#2A7A4A]" style={SANS}>
                          Call confirmed — {callDateTime}
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={callDateTime}
                          onChange={e => setCallDateTime(e.target.value)}
                          placeholder="e.g. Wednesday, April 2 · 7:00 PM"
                          className="flex-1 bg-white border border-[#DDD] text-[#333] text-[13px] px-3 py-2 rounded-lg placeholder-[#CCC] focus:outline-none focus:border-[#C9973A] transition-colors"
                          style={SANS}
                        />
                        <button
                          onClick={() => callDateTime.trim() && setCallConfirmed(true)}
                          disabled={!callDateTime.trim()}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] tracking-widest uppercase flex-shrink-0 transition-all ${
                            callDateTime.trim()
                              ? "bg-[#0D1B2A] text-white hover:bg-[#1a2d42]"
                              : "bg-[#EEE] text-[#CCC] cursor-not-allowed"
                          }`}
                          style={MONO}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* No activity yet */}
                {!k2kActivity.firstAccess && (
                  <p className="text-[11px] text-[#BBB] leading-relaxed" style={SANS}>
                    Activity will appear here once Tina accesses her portal. Access timestamps, scope selections, and availability submissions are tracked automatically via localStorage — full Supabase sync coming when the backend is connected.
                  </p>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
