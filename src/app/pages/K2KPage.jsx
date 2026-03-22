// ============================================================
// K2K COLLEGE PREP SERVICES — PARTNER PORTAL PAGE
// Axiom Executive Advisory Site
// Generated: March 22, 2026
// Ref: k_2_k_advisory_mini_app.jsx (design system source)
// ============================================================

import { useState } from "react";

export default function K2KPartnerPortalPage() {

  // ── Design Tokens (Axiom Executive Advisory System) ──────
  const t = {
    smallMeta: "text-[10px] tracking-[0.22em] uppercase font-medium",
    base:      "text-[14px] leading-6",
    h3:        "text-[18px] leading-[1.25] font-semibold",
    h2:        "text-[18px] md:text-[24px] leading-[1.2] font-semibold",
    h1:        "text-[22px] md:text-[40px] leading-[1.15] font-semibold",
    serif:     { fontFamily: '"Playfair Display", serif' },
    sans:      { fontFamily: '"DM Sans", system-ui' },
    border:    "border border-[#C9973A33]",
  };

  // ── Calculator State ──────────────────────────────────────
  const ALL_IDS = ['tech', 'brand', 'website', 'portal', 'admin', 'qa', 'support', 'pm'];
  const [selectedIds, setSelectedIds] = useState(() => new Set(ALL_IDS));
  const [expandedId, setExpandedId]   = useState(null);
  const [expandedFinding, setExpandedFinding] = useState(null);
  const toggleFinding = (n) => setExpandedFinding(prev => prev === n ? null : n);

  const toggleService = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleExpand = (id) =>
    setExpandedId(prev => (prev === id ? null : id));

  const fmt = (n) => '$' + n.toLocaleString();

  // ── Data ──────────────────────────────────────────────────

  const stats = [
    { label: "Full Scope Value", value: "$20,750" },
    { label: "Timeline",         value: "16 Weeks" },
    { label: "Est. Go-Live",     value: "TBD" },
    { label: "Phases",           value: "6 Phases" },
  ];

  const auditResolutions = [
    { n:"01", severity:"CRITICAL", issue:"Free Wix subdomain",            fix:"Custom domain registration (k2kcollegeprepservices.com) + branded portal URL — custom domain setup is Phase 2, deliverable #1" },
    { n:"02", severity:"CRITICAL", issue:"Lorem ipsum placeholder testimonials", fix:"Authenticated Testimonial Engine: post-session feedback form feeds verified, student-consented testimonials displayed on the public Success Stories page and portal outcomes showcase" },
    { n:"03", severity:"HIGH",     issue:"Non-professional Gmail address", fix:"Google Workspace setup with branded domain email accounts (hello@, advisor@, info@k2kcollegeprepservices.com) — all client portal communications route through this system" },
    { n:"04", severity:"HIGH",     issue:"No client portal or authenticated login", fix:"The entire portal build is the resolution to this issue — student-authenticated login portal with unique access codes per student, built per Blueprint 01" },
    { n:"05", severity:"HIGH",     issue:"No progress or milestone tracking", fix:"Visual Milestone Tracker: 14-step HBCU journey roadmap, 5 phase markers, completion ring indicator, status badges per step, advisor-pushed notes — built per Blueprint 03" },
    { n:"06", severity:"HIGH",     issue:"No alumni network delivery mechanism", fix:"Alumni Network Module: searchable directory (HBCU attended, graduation year, field, mentorship availability), mentorship request modal, My Mentors widget, Legacy Package access flag — built per Blueprint 06" },
    { n:"07", severity:"MEDIUM",   issue:"About Us section truncated",    fix:"Dedicated About Page (public website): full founder story, professional bio, credentials and certifications, mission/values, team cards — no truncation possible in a proper multi-page architecture" },
    { n:"08", severity:"MEDIUM",   issue:"Broken navigation link (Learn More → /pricing)", fix:"Multi-route architecture with proper URL mapping eliminates single-page navigation dependency entirely. Each section lives on its own dedicated route" },
    { n:"09", severity:"MEDIUM",   issue:"Stock photography gallery with no K2K imagery", fix:"Authenticated portal media gallery (student success moments, HBCU tour photos); public Success Stories page features real student outcome cards — photography brief included in brand phase" },
    { n:"10", severity:"MEDIUM",   issue:"No FAQ section",               fix:"Tiered FAQ system: public-facing FAQ page (pre-sale questions, process, refund policy, HBCU context) + client-only extended knowledge base gated inside the Resource Library" },
    { n:"11", severity:"MEDIUM",   issue:"No blog or resource library",  fix:"Public Blog (CMS-powered, SEO-optimized, 3 seed articles from Axiom at launch) + Gated Resource Library (HBCU guides, scholarship databases, essay templates, financial aid checklists — filtered by package tier)" },
    { n:"12", severity:"MEDIUM",   issue:"Basic Wix Bookings with no workflow", fix:"Integrated Scheduling & Session Center: calendar booking with automated email + SMS reminders, session archive with notes, Zoom/Meet link integration, past session history" },
    { n:"13", severity:"MEDIUM",   issue:"Single-page non-scalable architecture", fix:"Full multi-route application architecture — each feature on its own route, fully extensible for new service lines, blog content, and portal modules" },
    { n:"14", severity:"MEDIUM",   issue:"Virtual HBCU tours promised but undelivered", fix:"Portal-hosted Virtual HBCU Tour Library: video library organized by school, student notes and favorites saved to profile, live alumni Q&A session scheduler with Zoom/Meet integration" },
    { n:"15", severity:"HIGH",     issue:"Zero verified social proof",   fix:"Student Outcomes Showcase: HBCU acceptance cards, scholarship amounts, stats banner ('X students helped, $Y in scholarships secured') with opt-in consent model; feeds from testimonial collection system" },
  ];

  const sitemapPublic = [
    ["/",              "Home"],
    ["/about",         "About"],
    ["/services",      "Services (4 Tiers)"],
    ["/success",       "Success Stories"],
    ["/blog",          "Blog"],
    ["/faq",           "FAQ"],
    ["/contact",       "Contact"],
  ];

  const sitemapPortal = [
    ["/login",        "Login  (Access Code Auth)"],
    ["/dashboard",    "Student Dashboard"],
    ["/milestones",   "Milestone Tracker"],
    ["/documents",    "Document Vault"],
    ["/schedule",     "Session Center"],
    ["/resources",    "Resource Library"],
    ["/alumni",       "Alumni Network"],
    ["/tours",        "HBCU Tour Library"],
  ];

  const sitemapAdmin = [
    ["/admin/dashboard",    "KPI Overview"],
    ["/admin/students",     "Student Management"],
    ["/admin/sessions",     "Session Calendar"],
    ["/admin/documents",    "Document Queue"],
    ["/admin/testimonials", "Testimonial Review"],
  ];

  const phases = [
    {
      n:"0", name:"Initial Consultation",
      dates:"March 22, 2026", duration:"1 Day",
      note:"2.5-hour intake. The 2 hours beyond the standard complimentary 30-min session were extended on the house as a gesture of goodwill.",
      bg:"bg-[#0D1B2A] text-[#FAF7F2]", label:"text-[#E4B96A]",
    },
    {
      n:"1", name:"Brand Identity & Foundation",
      dates:"TBD — pending MSA", duration:"2 Weeks",
      note:"Logo design, brand style guide, typography, color system, favicon, email signature. No development begins until brand is approved.",
      bg:"bg-[#F0E8D5] text-[#0D1B2A]", label:"text-[#C9973A]",
    },
    {
      n:"2", name:"Technical Infrastructure",
      dates:"TBD — pending MSA", duration:"2 Weeks",
      note:"Domain, hosting (Vercel), Supabase database, auth system, Google Workspace, file storage.",
      bg:"bg-white text-[#0D1B2A]", label:"text-[#C9973A]",
    },
    {
      n:"3", name:"Public Website Development",
      dates:"TBD — pending MSA", duration:"4 Weeks",
      note:"7-page responsive marketing site — Home, About, Services, Success Stories, Blog, FAQ, Contact.",
      bg:"bg-[#F0E8D5] text-[#0D1B2A]", label:"text-[#C9973A]",
    },
    {
      n:"4", name:"Client Portal Development",
      dates:"TBD — pending MSA", duration:"5 Weeks",
      note:"All 8 portal modules per Figma blueprints — login through alumni network and virtual tours.",
      bg:"bg-[#0D1B2A] text-[#FAF7F2]", label:"text-[#E4B96A]",
    },
    {
      n:"5", name:"Integration, QA & UAT",
      dates:"TBD — pending MSA", duration:"2 Weeks",
      note:"Cross-browser/device testing, auth flow testing, client UAT window, bug resolution.",
      bg:"bg-[#7C3026] text-[#FAF7F2]", label:"text-[#E4B96A]",
    },
    {
      n:"6", name:"Launch & Deployment",
      dates:"TBD — pending MSA", duration:"1 Week",
      note:"Production go-live, 301 redirects, Analytics, client onboarding session, 30-day support window opens.",
      bg:"bg-[#0D1B2A] text-[#FAF7F2]", label:"text-[#E4B96A]",
    },
  ];

  const mustHaves = [
    "Custom domain + DNS configuration",
    "Branded professional email (Google Workspace)",
    "Student login portal (access code model)",
    "Student dashboard (progress ring, tier card, session countdown)",
    "Milestone Tracker (14-step HBCU journey)",
    "Document Vault (upload, annotation, version history)",
    "Scheduling & Session Center (automated reminders)",
    "In-portal direct messaging (student ↔ advisor)",
    "Advisor Admin Dashboard",
    "Public website — 7 pages",
    "Verified Testimonial Engine",
    "Student Outcomes Showcase",
    "FAFSA checklist + deadline countdown",
    "Gated Resource Library (tier-based access)",
    "Public SEO Blog (CMS, 3 seed articles)",
    "Complete brand identity system",
  ];

  const niceToHaves = [
    "Alumni Network Module (Legacy Package)",
    "Virtual HBCU Tour Library + Q&A Scheduler",
    "HBCU Comparison Engine ✦ Axiom Recommendation",
    "Scholarship Deadline Tracker + Auto Alerts ✦ Axiom Recommendation",
    "Parent / Guardian Portal View ✦ Axiom Recommendation",
    "CRM Integration (Mailchimp / HubSpot)",
    "Webinar Registration + Recording Module",
    "Advanced Admin Analytics",
  ];

  const omitted = [
    "Native payment processing on-site",
    "Third-party live chat widget",
    "Social media feed embeds",
    "Student gamification / achievement badges",
  ];

  const milestones = [
    { id:"M1", name:"Project Kickoff",    trigger:"MSA + SOW fully executed",                  status:"pending" },
    { id:"M2", name:"Brand Delivery",     trigger:"Brand identity approved + Phase 2 live",    status:"pending" },
    { id:"M3", name:"Portal Complete",    trigger:"All portal modules delivered for UAT",       status:"pending" },
    { id:"M4", name:"Final Launch",       trigger:"Production go-live + client onboarding",     status:"pending" },
  ];

  const gaps = [
    {
      n:"01", priority:"Nice-to-Have", title:"HBCU Comparison Engine",
      body:"Interactive side-by-side comparison tool for up to 4 HBCUs — acceptance rates, cost, financial aid, top majors, campus size. K2K's core promise is guiding students toward the right HBCU; this makes that process visible and data-driven.",
      bg:"bg-[#F0E8D5] text-[#0D1B2A]", label:"text-[#C9973A]",
    },
    {
      n:"02", priority:"Borderline Must-Have", title:"Scholarship Deadline Tracker",
      body:"Personalized scholarship calendar with automated email/SMS alerts at 30/14/7/1 day intervals. Scholarship support is promised across Tiers 2–4. Missing a deadline is a service failure. This feature directly protects K2K's reputation.",
      bg:"bg-[#0D1B2A] text-[#FAF7F2]", label:"text-[#E4B96A]",
    },
    {
      n:"03", priority:"High Revenue Impact", title:"Parent / Guardian Portal View",
      body:"Read-only parent-facing dashboard showing student progress, upcoming sessions, and milestone completions. Parents are the primary decision-makers for a $750–$1,500 service. Seeing their investment work = renewals and referrals.",
      bg:"bg-[#7C3026] text-[#FAF7F2]", label:"text-[#E4B96A]",
    },
  ];

  const milestoneStatusColor = {
    complete: "bg-[#C9973A] text-white",
    active:   "bg-[#0D1B2A] text-[#E4B96A]",
    pending:  "bg-[#EEE] text-[#888]",
  };

  // ── Services with drill-down details (Budget Calculator) ──
  const services = [
    {
      id: 'tech',
      name: 'Technical Infrastructure',
      cost: 1500,
      locked: true,
      tag: 'REQUIRED',
      tagStyle: 'bg-[#0D1B2A] text-[#E4B96A]',
      summary: 'Non-negotiable foundation. The entire platform runs on this layer.',
      details: [
        'Custom domain registration + full DNS configuration',
        'Production hosting setup (Vercel — enterprise grade)',
        'Supabase database + authentication system',
        'Google Workspace branded email (professional @k2k address)',
        'File storage architecture for Document Vault',
        'SSL security certificates across all subdomains',
      ],
    },
    {
      id: 'brand',
      name: 'Brand Identity',
      cost: 2000,
      locked: false,
      tag: 'OPTIONAL',
      tagStyle: 'bg-[#EEE] text-[#666]',
      summary: 'Full visual identity — how K2K looks to the world.',
      details: [
        'Primary logo + alternate mark (light + dark versions)',
        'Brand style guide (colors, typography, spacing rules)',
        'Favicon + browser icon set',
        'Professional email signature template',
        'Brand book PDF delivered for internal/investor use',
      ],
    },
    {
      id: 'website',
      name: 'Public Website — 7 Pages',
      cost: 4500,
      locked: false,
      tag: 'OPTIONAL',
      tagStyle: 'bg-[#EEE] text-[#666]',
      summary: 'The public face of K2K. How students, parents, and partners find you.',
      details: [
        'Home, About, Services (4 tiers), Success Stories, Blog, FAQ, Contact',
        'Fully mobile-responsive across all devices and screen sizes',
        'SEO-optimized page structure + metadata',
        'Contact form with Formspree routing to your inbox',
        '3 seed blog articles written and published at launch',
      ],
    },
    {
      id: 'portal',
      name: 'Client Portal — 8 Modules',
      cost: 7500,
      locked: false,
      tag: 'OPTIONAL',
      tagStyle: 'bg-[#EEE] text-[#666]',
      summary: 'The authenticated student experience — K2K\'s core product differentiator.',
      details: [
        'Student login with access-code authentication',
        'Student dashboard (progress ring, package tier, session countdown)',
        '14-step HBCU Milestone Tracker with 5 phase markers + status badges',
        'Document Vault (upload, categorize, advisor annotation + version history)',
        'Scheduling & Session Center with automated reminder emails',
        'In-portal direct messaging (student ↔ advisor)',
        'Gated Resource Library with tier-based access control',
        'HBCU Virtual Tour Library + Live Q&A Scheduler',
      ],
    },
    {
      id: 'admin',
      name: 'Admin Dashboard',
      cost: 2000,
      locked: false,
      tag: 'OPTIONAL',
      tagStyle: 'bg-[#EEE] text-[#666]',
      summary: 'Advisor-only control center for managing every client in one place.',
      details: [
        'Student management — all active clients visible at a glance',
        'Document queue — review, annotate, and approve client uploads',
        'Session calendar + KPI statistics overview',
        'Testimonial review + approval workflow',
        'Student progress visibility across all accounts',
      ],
    },
    {
      id: 'qa',
      name: 'QA, Testing & Launch',
      cost: 1500,
      locked: false,
      tag: 'OPTIONAL',
      tagStyle: 'bg-[#EEE] text-[#666]',
      summary: 'Ensures everything built is production-ready before it goes live.',
      details: [
        'Cross-browser + device compatibility testing',
        'Authentication flow + security testing',
        'Client UAT (user acceptance testing) window before go-live',
        'Bug resolution and performance optimization',
        'Production go-live + 301 redirect configuration',
        'Google Analytics + Search Console setup',
      ],
    },
    {
      id: 'support',
      name: 'Post-Launch Support — 30 Days',
      cost: 750,
      locked: false,
      tag: 'OPTIONAL',
      tagStyle: 'bg-[#EEE] text-[#666]',
      summary: '30 days of hands-on support after the platform goes live.',
      details: [
        '30-day bug fix window after production launch',
        'Up to 3 content update requests included',
        'Emergency support response within 24 hours',
        'Admin handoff training session for advisor',
        'Handoff documentation package for internal reference',
      ],
    },
    {
      id: 'pm',
      name: 'Project Management',
      cost: 1000,
      proRated: true,
      tag: 'PRO-RATED',
      tagStyle: 'bg-[#C9973A22] text-[#C9973A] border border-[#C9973A44]',
      summary: 'Mandatory oversight fee. Scales proportionally with your selected scope.',
      details: [
        'Dedicated project manager for the full engagement',
        'Weekly progress reports + milestone tracking',
        'Centralized client communication hub',
        'Timeline management + scope change documentation',
        'Vendor and contractor coordination (where applicable)',
      ],
    },
  ];

  // ── Budget Calculator Logic ────────────────────────────────
  const lockedSvcs   = services.filter(s => s.locked);
  const optionalSvcs = services.filter(s => !s.locked && !s.proRated);
  const pmSvc        = services.find(s => s.proRated);

  const selectedOptTotal = optionalSvcs
    .filter(s => selectedIds.has(s.id))
    .reduce((sum, s) => sum + s.cost, 0);

  const fullOptTotal = optionalSvcs.reduce((sum, s) => sum + s.cost, 0);
  const lockedTotal  = lockedSvcs.reduce((sum, s) => sum + s.cost, 0);

  // Pro-rated PM: scales with optional scope selected, minimum $300
  const proRatedPM = selectedOptTotal === 0
    ? 300
    : Math.min(1000, Math.max(300, Math.round((selectedOptTotal / fullOptTotal) * pmSvc.cost)));

  const grandTotal  = lockedTotal + selectedOptTotal + proRatedPM;
  const fullTotal   = 20750;
  const savings     = fullTotal - grandTotal;
  const budgetPct   = Math.min(100, Math.round((grandTotal / fullTotal) * 100));

  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2A2A]" style={t.sans}>
      <main className="max-w-[1180px] mx-auto px-6 py-8 space-y-10">


        {/* ═══════════════════════════════════════════════════
            SECTION 1 — ENGAGEMENT HEADER
        ═══════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-8 md:p-10`}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            <div className="max-w-[780px]">
              <div className={`${t.smallMeta} text-[#E4B96A] mb-4`}>
                Axiom Executive Advisory LLC · Pending MSA Execution
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-[#E4B96A1A] border border-[#E4B96A33] text-[#E4B96A]">
                  K2K College Prep Services
                </span>
                <span className="text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D6C9A8]">
                  HBCU Education Consulting · Jersey City, NJ
                </span>
              </div>

              <h1 className={`${t.h1} mb-4`} style={t.serif}>
                From a non-functional draft to a premier HBCU admissions platform.{" "}
                <span className="text-[#E4B96A] italic">Domain to deployment.</span>
              </h1>

              <p className={`${t.base} text-[#D6C9A8] max-w-[680px]`}>
                Axiom has taken over the K2K College Prep Services digital infrastructure project following a 2.5-hour intake consultation. What began as a website refresh request has been scoped into a full-scale portal build, brand identity system, and backend architecture — the complete digital foundation for a premium educational consulting firm.
              </p>
            </div>

            <div className="flex-shrink-0">
              <span className="flex items-center gap-2 text-[11px] tracking-widest uppercase px-4 py-2 rounded-full bg-white/5 border border-white/15 text-[#AAA]">
                <span className="w-2 h-2 rounded-full bg-[#AAA]" />
                Pending MSA
              </span>
              <p className={`${t.smallMeta} text-[#666] mt-3 text-center`}>
                Project ID: AXM-K2K-2026-001
              </p>
            </div>

          </div>
        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 2 — PROJECT AT A GLANCE
        ═══════════════════════════════════════════════════ */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <div key={i} className={`rounded-xl ${t.border} bg-white p-5 text-center`}>
              <div className={`${t.smallMeta} text-[#C9973A] mb-2`}>{s.label}</div>
              <div className="text-[28px] font-semibold text-[#0D1B2A]" style={t.serif}>{s.value}</div>
            </div>
          ))}
        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 3 — CLIENT CONTEXT
        ═══════════════════════════════════════════════════ */}
        <section className="grid md:grid-cols-2 gap-5">

          <div className={`rounded-xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-6`}>
            <div className={`${t.smallMeta} text-[#E4B96A] mb-3`}>Client Profile</div>
            <h3 className={`${t.h3} mb-3`} style={t.serif}>K2K College Prep Services</h3>
            <p className={`${t.base} text-[#D6C9A8]`}>
              A Jersey City, NJ-based HBCU-focused college consulting firm offering a structured 4-tier service model ($150–$1,500). Operating on a free Wix subdomain with a non-professional Gmail address, placeholder testimonials, and zero authenticated client experience. Axiom was engaged following an audit identifying 15 critical friction points requiring full platform reconstruction.
            </p>
          </div>

          <div className={`rounded-xl ${t.border} bg-[#F0E8D5] text-[#0D1B2A] p-6`}>
            <div className={`${t.smallMeta} text-[#7C3026] mb-3`}>What We Found on Intake</div>
            <h3 className={`${t.h3} mb-3`} style={t.serif}>A snapshot of the existing site</h3>
            <ul className="space-y-1">
              {[
                "Free Wix subdomain — no custom domain",
                "Lorem ipsum placeholder testimonials",
                "Non-professional Gmail address",
                "No client portal or authenticated experience",
                "Broken navigation and single-page architecture",
                "Virtual HBCU tour promise with zero delivery mechanism",
                "No verified social proof or outcomes tracking",
              ].map((item, i) => (
                <li key={i} className={`${t.base} flex items-start gap-2`}>
                  <span className="text-[#7C3026] mt-[2px]">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 4 — SITE AUDIT & RECOMMENDATIONS
        ═══════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-6 md:p-8`}>

          <div className={`${t.smallMeta} text-[#E4B96A] mb-2`}>Site Audit & Recommendations — k2kcollegeprepservices.com</div>
          <h2 className={`${t.h2} mb-2`} style={t.serif}>
            What we found — and what we'd build to address it.
          </h2>
          <p className={`${t.base} text-[#D6C9A8] mb-6 max-w-[640px]`}>
            Before our intake consultation, Axiom conducted a full review of your existing Wix presence against 15 credibility, functionality, and client-experience indicators. Each finding is mapped to a proposed resolution. These are recommendations — not commitments. Final scope is determined by your selections.
          </p>

          {/* Consolidated accordion */}
          <div className="divide-y divide-white/8 border border-white/10 rounded-xl overflow-hidden">
            {auditResolutions.map((r) => {
              const severityColor = r.severity === "CRITICAL"
                ? "bg-[#7C3026] text-[#FAF7F2]"
                : r.severity === "HIGH"
                ? "bg-[#C9973A22] text-[#E4B96A] border border-[#C9973A55]"
                : "bg-white/8 text-[#AAA]";
              return (
                <div key={r.n}>
                  <button
                    onClick={() => toggleFinding(r.n)}
                    className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`${t.smallMeta} text-[#E4B96A] flex-shrink-0 w-6`}>{r.n}</span>
                      <span className={`text-[9px] tracking-widest uppercase font-semibold px-2 py-[2px] rounded flex-shrink-0 ${severityColor}`}>
                        {r.severity}
                      </span>
                      <span className={`${t.base} font-medium text-[#FAF7F2] truncate`}>{r.issue}</span>
                    </div>
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className={`flex-shrink-0 text-[#E4B96A] transition-transform duration-200 ${expandedFinding === r.n ? 'rotate-180' : ''}`}
                    >
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {expandedFinding === r.n && (
                    <div className="px-4 pb-4 pt-2 bg-white/5 border-t border-white/8">
                      <div className={`${t.smallMeta} text-[#E4B96A] mb-2`}>Proposed Resolution</div>
                      <p className={`${t.base} text-[#D6C9A8] leading-relaxed`}>{r.fix}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E4B96A]" />
            <span className={`${t.smallMeta} text-[#E4B96A]`}>
              15 FINDINGS · 15 PROPOSED RESOLUTIONS — SCOPE PENDING YOUR SELECTION
            </span>
          </div>

        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 5 — PLATFORM SITEMAP / ARCHITECTURE
        ═══════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-[#F0E8D5] p-6 md:p-8`}>

          <div className={`${t.smallMeta} text-[#7C3026] mb-2`}>Platform Architecture</div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-6`} style={t.serif}>
            Three-layer digital ecosystem
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            {[
              { title: "Public Website", subtitle: "7 Pages · k2kcollegeprepservices.com", routes: sitemapPublic },
              { title: "Client Portal",  subtitle: "8 Modules · portal.k2kcollegeprepservices.com", routes: sitemapPortal },
              { title: "Admin Portal",   subtitle: "Advisor-Only · portal.k2kcollegeprepservices.com/admin", routes: sitemapAdmin },
            ].map((layer, i) => (
              <div key={i} className={`rounded-xl ${t.border} bg-white p-5`}>
                <div className={`${t.smallMeta} text-[#C9973A] mb-1`}>{layer.title}</div>
                <p className="text-[11px] text-[#888] mb-3">{layer.subtitle}</p>
                <div className="space-y-[6px]">
                  {layer.routes.map(([route, label]) => (
                    <div key={route} className="flex items-baseline gap-2">
                      <code className="text-[11px] text-[#C9973A] font-mono whitespace-nowrap">{route}</code>
                      <span className="text-[12px] text-[#555] leading-5">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 6 — IMPLEMENTATION TIMELINE
        ═══════════════════════════════════════════════════ */}
        <section>

          <div className={`${t.smallMeta} text-[#C9973A] mb-2`}>Implementation Timeline</div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-6`} style={t.serif}>
            16-week path to go-live
          </h2>

          <div className="grid md:grid-cols-4 gap-5">
            {phases.map((p) => (
              <div key={p.n} className={`rounded-xl ${t.border} p-5 ${p.bg}`}>
                <div className={`${t.smallMeta} ${p.label} mb-1`}>Phase {p.n}</div>
                <h3 className={`${t.h3} mb-1`} style={t.serif}>{p.name}</h3>
                <p className="text-[11px] opacity-70 mb-3">{p.dates} · {p.duration}</p>
                <p className={`${t.base} opacity-80`}>{p.note}</p>
              </div>
            ))}
          </div>

        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 7 — FEATURE RANKINGS
        ═══════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-white p-6 md:p-8`}>

          <div className={`${t.smallMeta} text-[#C9973A] mb-2`}>Scope Transparency</div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-2`} style={t.serif}>
            Every feature ranked. Nothing hidden.
          </h2>
          <p className={`${t.base} text-[#555] mb-6`}>
            Full transparency on what is in scope, what is optional, and what was deliberately excluded.
          </p>

          <div className="grid md:grid-cols-3 gap-5">

            {/* Must-Haves */}
            <div className={`rounded-xl ${t.border} bg-[#F0E8D5] p-5`}>
              <div className={`${t.smallMeta} text-[#0D1B2A] mb-3`}>
                ✅ Must-Haves — {mustHaves.length} items
              </div>
              <ul className="space-y-2">
                {mustHaves.map((f, i) => (
                  <li key={i} className={`${t.base} text-[#0D1B2A] flex gap-2`}>
                    <span className="text-[#C9973A] flex-shrink-0">·</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice-to-Haves */}
            <div className={`rounded-xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-5`}>
              <div className={`${t.smallMeta} text-[#E4B96A] mb-3`}>
                🔶 Nice-to-Haves — {niceToHaves.length} items
              </div>
              <ul className="space-y-2">
                {niceToHaves.map((f, i) => (
                  <li key={i} className={`${t.base} text-[#D6C9A8] flex gap-2`}>
                    <span className="text-[#E4B96A] flex-shrink-0">·</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Omitted */}
            <div className={`rounded-xl ${t.border} bg-white p-5`}>
              <div className={`${t.smallMeta} text-[#888] mb-3`}>
                ❌ Omitted — {omitted.length} items
              </div>
              <ul className="space-y-2">
                {omitted.map((f, i) => (
                  <li key={i} className={`${t.base} text-[#888] flex gap-2 line-through decoration-[#CCC]`}>
                    <span className="flex-shrink-0 no-underline" style={{textDecoration:'none'}}>·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className={`${t.base} text-[#AAA] mt-4 text-[12px] not-italic`} style={{textDecoration:'none'}}>
                Each omitted feature was deliberately excluded for a documented reason — not overlooked.
              </p>
            </div>

          </div>
        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 8 — INTERACTIVE BUDGET CALCULATOR
        ═══════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-white p-6 md:p-8`}>

          <div className={`${t.smallMeta} text-[#C9973A] mb-2`}>Step 3 of 3 — Your Decision</div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-2`} style={t.serif}>
            Now select what you can build today.
          </h2>
          <p className={`${t.base} text-[#555] mb-2 max-w-[640px]`}>
            You've seen the audit findings. You've seen our recommendations. The full platform scope comes to $20,750 — and we understand that's not all available right now.
          </p>
          <p className={`${t.base} text-[#555] mb-8 max-w-[640px]`}>
            Use this calculator to select the services that fit your current budget. Check what you want to build now — and what you're intentionally deferring to a future funding round. Every line item expands to show exactly what's included. Locked items are non-negotiable regardless of scope.
          </p>

          <div className="flex flex-col lg:flex-row gap-6">

            {/* ── Service Accordion List ── */}
            <div className="flex-1 space-y-2 min-w-0">
              {services.map((svc) => {
                const isSelected = svc.locked || svc.proRated || selectedIds.has(svc.id);
                const isExpanded = expandedId === svc.id;
                const displayCost = svc.proRated ? proRatedPM : svc.cost;
                const isDeselected = !svc.locked && !svc.proRated && !selectedIds.has(svc.id);

                return (
                  <div
                    key={svc.id}
                    className={`rounded-xl border transition-all duration-200 ${
                      isDeselected
                        ? 'border-[#EEE] bg-[#FAFAFA]'
                        : 'border-[#C9973A33] bg-[#FAF7F2]'
                    }`}
                  >
                    {/* Main row */}
                    <div className="flex items-center gap-3 p-4">

                      {/* Checkbox / lock indicator */}
                      {svc.locked ? (
                        <div className="w-5 h-5 flex-shrink-0 rounded flex items-center justify-center bg-[#0D1B2A]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <rect x="2" y="4.5" width="6" height="4.5" rx="0.75" fill="#E4B96A"/>
                            <path d="M3.5 4.5V3a1.5 1.5 0 013 0v1.5" stroke="#E4B96A" strokeWidth="1" strokeLinecap="round"/>
                          </svg>
                        </div>
                      ) : svc.proRated ? (
                        <div className="w-5 h-5 flex-shrink-0 rounded flex items-center justify-center bg-[#C9973A22] border border-[#C9973A44]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 8L8 2M3 2.5h4.5V7" stroke="#C9973A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleService(svc.id)}
                          aria-label={isSelected ? `Deselect ${svc.name}` : `Select ${svc.name}`}
                          className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                            isSelected
                              ? 'bg-[#C9973A] border-[#C9973A]'
                              : 'bg-white border-[#DDD] hover:border-[#C9973A]'
                          }`}
                        >
                          {isSelected && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      )}

                      {/* Name + summary */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-[2px]">
                          <span className={`${t.base} font-medium ${isDeselected ? 'text-[#AAA] line-through decoration-[#CCC]' : 'text-[#0D1B2A]'}`}>
                            {svc.name}
                          </span>
                          <span className={`text-[9px] tracking-widest uppercase px-2 py-[2px] rounded-full font-medium ${svc.tagStyle}`}>
                            {svc.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#888] leading-4">{svc.summary}</p>
                      </div>

                      {/* Cost display */}
                      <div className="text-right flex-shrink-0 ml-2">
                        {svc.proRated ? (
                          <div>
                            <div className="text-[15px] font-semibold text-[#C9973A]" style={t.serif}>
                              {fmt(displayCost)}
                            </div>
                            <div className="text-[9px] text-[#AAA]">of {fmt(svc.cost)} base</div>
                          </div>
                        ) : (
                          <div className={`text-[15px] font-semibold ${isDeselected ? 'text-[#CCC]' : 'text-[#0D1B2A]'}`} style={t.serif}>
                            {fmt(svc.cost)}
                          </div>
                        )}
                      </div>

                      {/* Expand chevron */}
                      <button
                        onClick={() => toggleExpand(svc.id)}
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                        className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[#C9973A11] text-[#C9973A] transition-colors ml-1"
                      >
                        <svg
                          width="12" height="12" viewBox="0 0 12 12" fill="none"
                          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* Drill-down details */}
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-[#EEE]">
                        <p className={`${t.smallMeta} text-[#C9973A] mt-3 mb-2`}>What's included</p>
                        <ul className="space-y-1">
                          {svc.details.map((d, i) => (
                            <li key={i} className={`${t.base} text-[#555] flex items-start gap-2`}>
                              <span className="text-[#C9973A] flex-shrink-0 mt-[2px]">·</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                        {svc.proRated && (
                          <p className="text-[11px] text-[#AAA] mt-3 italic">
                            Pro-rated formula: (selected optional scope ÷ full optional scope) × $1,000 base fee. Minimum $300.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Budget Tracker Sidebar ── */}
            <div className="lg:w-[260px] flex-shrink-0">
              <div className="sticky top-24 space-y-3">

                {/* Selected total */}
                <div className="rounded-xl bg-[#0D1B2A] text-[#FAF7F2] p-5">
                  <div className={`${t.smallMeta} text-[#E4B96A] mb-3`}>Your Selected Total</div>
                  <div className="text-[38px] font-semibold text-[#E4B96A] leading-none mb-1" style={t.serif}>
                    {fmt(grandTotal)}
                  </div>
                  <div className="text-[11px] text-[#AAA] mb-4">of {fmt(fullTotal)} full vision</div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C9973A] rounded-full transition-all duration-300"
                      style={{ width: `${budgetPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-[#555] mt-1.5">
                    <span>$0</span>
                    <span className="text-[#C9973A]">{budgetPct}%</span>
                    <span>{fmt(fullTotal)}</span>
                  </div>
                </div>

                {/* Savings indicator */}
                {savings > 0 && (
                  <div className="rounded-xl bg-[#F0E8D5] text-[#0D1B2A] p-4">
                    <div className={`${t.smallMeta} text-[#7C3026] mb-1`}>Deferred to Future Rounds</div>
                    <div className="text-[22px] font-semibold" style={t.serif}>saves {fmt(savings)}</div>
                    <div className="text-[11px] text-[#888] mt-1 leading-4">
                      Reserved for investors or next funding phase
                    </div>
                  </div>
                )}

                {/* Budget reference */}
                <div className="rounded-xl border border-[#EEE] bg-white p-4">
                  <div className={`${t.smallMeta} text-[#888] mb-3`}>Budget Reference</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] text-[#888]">Current budget</span>
                      <span className="text-[12px] font-medium text-[#0D1B2A]">~$5,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] text-[#888]">Full vision</span>
                      <span className="text-[12px] font-medium text-[#0D1B2A]">{fmt(fullTotal)}</span>
                    </div>
                    <div className="h-px bg-[#EEE] my-1" />
                    {/* Budget gap indicator */}
                    {grandTotal > 5000 ? (
                      <div className="flex justify-between items-center">
                        <span className="text-[12px] text-[#888]">Gap to deselect</span>
                        <span className="text-[12px] font-semibold text-[#7C3026]">{fmt(grandTotal - 5000)}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <span className="text-[12px] text-[#888]">Within budget</span>
                        <span className="text-[12px] font-semibold text-[#C9973A]">✓ {fmt(5000 - grandTotal)} under</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Locked totals breakdown */}
                <div className="rounded-xl border border-[#C9973A33] bg-[#FAF7F2] p-4">
                  <div className={`${t.smallMeta} text-[#C9973A] mb-3`}>Non-Negotiable Fees</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] text-[#555]">Tech Infrastructure</span>
                      <span className="text-[12px] font-medium text-[#0D1B2A]">$1,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] text-[#555]">Project Management</span>
                      <span className="text-[12px] font-medium text-[#C9973A]">{fmt(proRatedPM)} <span className="text-[9px] text-[#AAA]">pro-rated</span></span>
                    </div>
                    <div className="h-px bg-[#EEE]" />
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-medium text-[#0D1B2A]">Minimum floor</span>
                      <span className="text-[12px] font-semibold text-[#0D1B2A]">{fmt(lockedTotal + proRatedPM)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-[#AAA] leading-relaxed px-1">
                  Locked + pro-rated fees are mandatory. Optional services can be phased into future funding rounds without penalty.
                </p>
              </div>
            </div>

          </div>

          {/* Payment Schedule — below calculator */}
          <div className="mt-8 pt-6 border-t border-[#EEE]">
            <div className={`${t.smallMeta} text-[#C9973A] mb-1`}>Payment Schedule</div>
            <p className={`${t.base} text-[#555] mb-4 max-w-[580px]`}>
              Work begins upon execution of the MSA and SOW and receipt of the initiation deposit. Project milestones are invoiced as each phase is completed and approved.
            </p>

            {/* Initiation Deposit */}
            <div className="rounded-xl bg-[#C9973A] text-white p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className={`${t.smallMeta} text-white/70 mb-1`}>Due Immediately · MSA + SOW Execution</div>
                <div className="text-[16px] font-semibold" style={t.serif}>Initiation Deposit</div>
                <div className="text-[12px] text-white/80 mt-1 leading-4">
                  Required to formally begin the engagement. Due upon signing of the Master Services Agreement and Statement of Work. This deposit confirms your commitment and initiates active project work.
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[28px] font-semibold leading-none" style={t.serif}>$750</div>
                <span className="text-[9px] tracking-widest uppercase px-2 py-1 rounded-full bg-white/20 inline-block mt-1">
                  pending MSA
                </span>
              </div>
            </div>

            {/* 4 Milestones */}
            <div className={`${t.smallMeta} text-[#888] mb-3`}>Project Milestones · 4 Payments · 25% Each</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {milestones.map((m) => (
                <div key={m.id} className="rounded-lg bg-[#0D1B2A] border border-white/10 p-4">
                  <div className={`${t.smallMeta} text-[#E4B96A] mb-1`}>{m.id}</div>
                  <div className={`${t.base} font-medium text-[#FAF7F2]`}>{m.name}</div>
                  <div className="text-[11px] text-[#AAA] mt-1 mb-3 leading-4">{m.trigger}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#E4B96A]">$5,187.50</span>
                    <span className={`text-[9px] tracking-widest uppercase px-2 py-[2px] rounded-full ${milestoneStatusColor[m.status]}`}>
                      {m.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 8B — THIRD-PARTY RECURRING EXPENSES
        ═══════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-[#F0E8D5] p-6 md:p-8`}>

          <div className={`${t.smallMeta} text-[#7C3026] mb-2`}>Third-Party Recurring Expenses — Client's Responsibility</div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-2`} style={t.serif}>
            What Axiom sets up. What you own.
          </h2>
          <p className={`${t.base} text-[#555] mb-2 max-w-[680px]`}>
            Axiom's project fees cover the one-time cost of account creation, configuration, and implementation of all third-party services. Recurring monthly or annual fees are not included in the project scope — those are the client's ongoing operating expenses.
          </p>
          <p className={`${t.base} text-[#555] mb-6 max-w-[680px]`}>
            Axiom will exhaust free-tier options wherever possible to minimize your recurring costs at launch. As your platform grows, you can upgrade services at your own pace. Once each third-party account is created during the build, you will be contacted to register your payment method directly with each provider.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#C9973A33]">
                  <th className={`${t.smallMeta} text-[#0D1B2A] text-left pb-3 pr-4`}>Service</th>
                  <th className={`${t.smallMeta} text-[#0D1B2A] text-left pb-3 pr-4`}>Purpose</th>
                  <th className={`${t.smallMeta} text-[#0D1B2A] text-left pb-3 pr-4`}>Free Tier</th>
                  <th className={`${t.smallMeta} text-[#0D1B2A] text-right pb-3`}>Est. Monthly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9973A22]">
                {[
                  { service: "Domain Registration",  purpose: "Custom branded URL (k2kcollegeprepservices.com)", free: false, freeNote: "None available", cost: "~$1–2/mo", costNote: "billed annually ~$15/yr" },
                  { service: "Vercel (Hosting)",      purpose: "Platform hosting + deployment infrastructure",   free: true,  freeNote: "Hobby tier — sufficient at launch", cost: "$0 → $20/mo", costNote: "upgrade only if traffic scales" },
                  { service: "Supabase (Database)",   purpose: "Database, authentication + file storage",        free: true,  freeNote: "Free tier — sufficient at launch", cost: "$0 → $25/mo", costNote: "upgrade at ~500MB data" },
                  { service: "Google Workspace",      purpose: "Professional branded email (@k2k...)",          free: false, freeNote: "No free professional email option", cost: "~$6/user/mo", costNote: "1 user minimum to start" },
                  { service: "Formspree",             purpose: "Contact form submissions routing",               free: true,  freeNote: "50 submissions/mo free", cost: "$0 → $19/mo", costNote: "upgrade if volume exceeds 50/mo" },
                  { service: "CMS (Blog)",            purpose: "Blog content management",                        free: true,  freeNote: "Built with free tooling or markdown", cost: "$0", costNote: "no recurring cost at launch" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className={`${t.base} font-medium text-[#0D1B2A] py-3 pr-4`}>{row.service}</td>
                    <td className={`${t.base} text-[#555] py-3 pr-4`}>{row.purpose}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-start gap-2">
                        <span className={`text-[9px] tracking-widest uppercase px-2 py-[3px] rounded-full font-medium flex-shrink-0 ${
                          row.free ? 'bg-[#C9973A22] text-[#C9973A]' : 'bg-[#7C302611] text-[#7C3026]'
                        }`}>
                          {row.free ? 'Free tier' : 'Paid only'}
                        </span>
                        <span className="text-[11px] text-[#888] leading-4">{row.freeNote}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <div className={`${t.base} font-semibold text-[#0D1B2A]`}>{row.cost}</div>
                      <div className="text-[10px] text-[#AAA]">{row.costNote}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-[#C9973A33] grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#C9973A22] border border-[#C9973A44] flex items-center justify-center flex-shrink-0 mt-[2px]">
                <span className="text-[#C9973A] text-[10px] font-bold">i</span>
              </span>
              <p className={`${t.base} text-[#555]`}>
                <span className="font-medium text-[#0D1B2A]">Axiom's role:</span> Account creation, full configuration, and implementation are included in the project fees. Axiom does not charge markup on third-party services.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#C9973A22] border border-[#C9973A44] flex items-center justify-center flex-shrink-0 mt-[2px]">
                <span className="text-[#C9973A] text-[10px] font-bold">!</span>
              </span>
              <p className={`${t.base} text-[#555]`}>
                <span className="font-medium text-[#0D1B2A]">Your responsibility:</span> Once each service is configured, you will receive an email with instructions to register your own payment method directly with the provider before the account goes live.
              </p>
            </div>
          </div>

        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 9 — AXIOM GAP RECOMMENDATIONS
        ═══════════════════════════════════════════════════ */}
        <section>

          <div className={`${t.smallMeta} text-[#C9973A] mb-2`}>
            Axiom Gap Analysis — 3 Strategic Blind Spots
          </div>
          <h2 className={`${t.h2} text-[#0D1B2A] mb-2`} style={t.serif}>
            Features the original brief missed.
          </h2>
          <p className={`${t.base} text-[#555] mb-6 max-w-[620px]`}>
            Axiom identified three high-value features absent from both the original audit and the Figma blueprints. Recommended for Phase 2 or as scope additions.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {gaps.map((g) => (
              <div key={g.n} className={`rounded-xl ${t.border} p-6 ${g.bg}`}>
                <div className={`${t.smallMeta} ${g.label} mb-1`}>Gap {g.n} · {g.priority}</div>
                <h3 className={`${t.h3} mb-3`} style={t.serif}>{g.title}</h3>
                <p className={`${t.base} opacity-80`}>{g.body}</p>
              </div>
            ))}
          </div>

        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 10 — AXIOM ADVISORY FOOTER CARD
        ═══════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-6 md:p-8`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <div className={`${t.smallMeta} text-[#E4B96A] mb-1`}>Project Lead</div>
              <div className={`text-[18px] font-semibold`} style={t.serif}>
                Axiom Executive Advisory LLC
              </div>
              <div className={`${t.base} text-[#AAA]`}>
                Active Engagement · Project ID: AXM-K2K-2026-001
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["MSA Executed", "SOW Active", "Kickoff Complete"].map((tag) => (
                <span key={tag} className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-[#C9973A22] border border-[#C9973A44] text-[#E4B96A]">
                  {tag}
                </span>
              ))}
            </div>

          </div>

          <div className="mt-5 pt-4 border-t border-white/10">
            <p className="text-[12px] text-[#666]">
              All deliverables governed by the executed Master Services Agreement dated March 21, 2026. Timeline and scope subject to the standard revision policy outlined in the MSA. Payment terms: net 14 days per invoice. Late fees: 1.5%/month after 30 days.
            </p>
          </div>
        </section>


      </main>
    </div>
  );
}
