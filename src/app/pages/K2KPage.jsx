// ============================================================
// K2K COLLEGE PREP SERVICES — PARTNER PORTAL PAGE
// Axiom Executive Advisory Site
// Generated: March 22, 2026
// Ref: k_2_k_advisory_mini_app.jsx (design system source)
// ============================================================

import { useState, useEffect } from "react";

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

  // ── Welcome Modal (first-visit only) ─────────────────────
  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => {
    const seen = localStorage.getItem("k2k_portal_welcomed");
    if (!seen) setShowWelcome(true);
    // Log access for admin tracking
    if (!localStorage.getItem("k2k_first_access")) {
      localStorage.setItem("k2k_first_access", new Date().toISOString());
    }
    localStorage.setItem("k2k_last_access", new Date().toISOString());
  }, []);
  const dismissWelcome = () => {
    localStorage.setItem("k2k_portal_welcomed", "1");
    setShowWelcome(false);
  };

  // ── Calculator State ──────────────────────────────────────
  const ALL_IDS = ['tech', 'brand', 'website', 'portal', 'admin', 'qa', 'support', 'pm'];
  const [selectedIds, setSelectedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("k2k_scope_selections");
      return saved ? new Set(JSON.parse(saved)) : new Set(ALL_IDS);
    } catch { return new Set(ALL_IDS); }
  });
  const [expandedId, setExpandedId]   = useState(null);
  const [expandedFinding, setExpandedFinding] = useState(null);
  const toggleFinding = (n) => setExpandedFinding(prev => prev === n ? null : n);

  // Save selections whenever they change
  useEffect(() => {
    localStorage.setItem("k2k_scope_selections", JSON.stringify([...selectedIds]));
  }, [selectedIds]);

  // ── Availability Picker State ─────────────────────────────
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [submitted, setSubmitted] = useState(() =>
    !!localStorage.getItem("k2k_availability_submitted")
  );
  const toggleSlot = (key) => setSelectedSlots(prev => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });
  const submitAvailability = () => {
    localStorage.setItem("k2k_availability_submitted", new Date().toISOString());
    localStorage.setItem("k2k_availability_slots", JSON.stringify([...selectedSlots]));
    setSubmitted(true);
  };

  // Available call windows — next 14 days from today
  const availableSlots = (() => {
    const slots = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const day = d.getDay();
      const isWeekend = day === 0 || day === 6;
      slots.push({
        key: d.toISOString().split("T")[0],
        label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        time: isWeekend ? "1:00 – 8:00 PM" : "After 6:00 PM",
        isWeekend,
      });
    }
    return slots;
  })();

  // ── Deselection modal (shown once per service) ───────────
  const [deselModal, setDeselModal] = useState(null); // { id, name, impact }
  const [deselSeen, setDeselSeen] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("k2k_desel_seen") || "[]")); }
    catch { return new Set(); }
  });

  const toggleService = (id) => {
    const isRemoving = selectedIds.has(id);
    if (isRemoving && !deselSeen.has(id)) {
      const svc = services.find(s => s.id === id);
      setDeselModal({ id, name: svc.name, impact: svc.deselImpact });
      return; // wait for modal confirmation
    }
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const confirmDesel = () => {
    const id = deselModal.id;
    const next = new Set(selectedIds);
    next.delete(id);
    setSelectedIds(next);
    const seen = new Set(deselSeen);
    seen.add(id);
    setDeselSeen(seen);
    localStorage.setItem("k2k_desel_seen", JSON.stringify([...seen]));
    setDeselModal(null);
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
    { n:"01", severity:"CRITICAL", issue:"Free Wix subdomain",
      fix:"Phase 2 (Technical Infrastructure) will include custom domain registration for k2kcollegeprepservices.com with full DNS configuration, and setup of the portal subdomain (portal.k2kcollegeprepservices.com). This would eliminate the free Wix subdomain and establish a fully branded, professional web presence." },
    { n:"02", severity:"CRITICAL", issue:"Lorem ipsum placeholder testimonials",
      fix:"Phase 3 (Public Website) will include a dedicated Success Stories page with a rotating verified testimonial carousel. A post-session feedback form would collect student-consented testimonials for display on the public site and within the portal's outcomes showcase — no placeholder content at launch." },
    { n:"03", severity:"HIGH",     issue:"Non-professional Gmail address",
      fix:"Phase 2 (Technical Infrastructure) will include Google Workspace configuration with up to five branded email accounts — hello@, advisor@, info@, scholarship@, and support@k2kcollegeprepservices.com. All client-facing communications would route through this system." },
    { n:"04", severity:"HIGH",     issue:"No client portal or authenticated login",
      fix:"Phase 4 (Client Portal) is the direct response to this gap — an authenticated student experience built across 8 modules, beginning with Blueprint 01: split-screen login with brand imagery and email + unique access code authentication. Each student would receive a unique access code tied to their package." },
    { n:"05", severity:"HIGH",     issue:"No progress or milestone tracking",
      fix:"Phase 4 (Client Portal) will include the Milestone Tracker (Blueprint 03): a full-screen roadmap with a horizontal 5-phase progress bar, 14 individually tracked milestones with status badges (Completed / In Progress / Upcoming / Overdue), due dates, and advisor-pushed notes with reply functionality." },
    { n:"06", severity:"HIGH",     issue:"No alumni network delivery mechanism",
      fix:"Phase 4 (Client Portal) will include the Alumni Network Module (Blueprint 06), gated to Legacy Package holders: a searchable directory filterable by HBCU attended, graduation year, field, and mentorship availability — along with a mentorship request modal and My Mentors widget." },
    { n:"07", severity:"MEDIUM",   issue:"About Us section truncated",
      fix:"Phase 3 (Public Website) will include a dedicated About Page: full founder story, professional biography, credentials, certifications, mission and values statement, and team profile cards. A proper multi-page architecture eliminates content truncation by design." },
    { n:"08", severity:"MEDIUM",   issue:"Broken navigation link (Learn More → /pricing)",
      fix:"Phase 3 (Public Website) will deliver a full multi-route application with correct URL mapping. Each section — Services, Blog, FAQ, Success Stories, Contact — would live on its own dedicated route. Broken navigation links are not possible in this architecture." },
    { n:"09", severity:"MEDIUM",   issue:"Stock photography gallery with no K2K imagery",
      fix:"Phase 3 (Public Website) will include a Success Stories page with real student outcome cards. Phase 4 (Client Portal) will include a portal media gallery for student success moments and HBCU tour content. A photography brief is included in the Brand Identity phase to guide K2K's photo collection." },
    { n:"10", severity:"MEDIUM",   issue:"No FAQ section",
      fix:"Phase 3 (Public Website) will include an accordion-style FAQ page addressing pre-sale objections, the consultation process, package details, refund policy, HBCU overview questions, and financial aid process overview. An extended knowledge base would be gated inside the Resource Library in Phase 4." },
    { n:"11", severity:"MEDIUM",   issue:"No blog or resource library",
      fix:"Phase 3 (Public Website) will include a CMS-powered, SEO-optimized blog with category tagging and social sharing. Axiom would deliver three seed articles at launch. Phase 4 (Client Portal) will include a Gated Resource Library with HBCU guides, scholarship databases, essay templates, and financial aid checklists — filtered by package tier." },
    { n:"12", severity:"MEDIUM",   issue:"Basic Wix Bookings with no workflow",
      fix:"Phase 4 (Client Portal) will include an integrated Scheduling & Session Center: calendar booking with available time slot selection, automated email + SMS reminders at 24 hours and 1 hour before sessions, Zoom/Meet link integration per session, and a past sessions archive with advisor notes." },
    { n:"13", severity:"MEDIUM",   issue:"Single-page non-scalable architecture",
      fix:"The full engagement will deliver a multi-route application architecture where every feature — each public page, portal module, and admin view — lives on its own dedicated route. The platform would be fully extensible for new service lines, blog content, and additional portal modules beyond the initial scope." },
    { n:"14", severity:"MEDIUM",   issue:"Virtual HBCU tours promised but undelivered",
      fix:"Phase 4 (Client Portal) will include a Virtual HBCU Tour Library: a curated video library organized by school with a thumbnail grid, student-saved notes and favorites per profile, and a live alumni Q&A session scheduler with Zoom/Meet integration." },
    { n:"15", severity:"HIGH",     issue:"Zero verified social proof",
      fix:"Phase 3 (Public Website) will include a Student Outcomes Showcase: HBCU acceptance cards, scholarship amounts secured, and an opt-in stats banner. A Testimonial Engine would collect post-session, student-consented feedback to populate both the public Success Stories page and the portal's outcomes showcase." },
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
      deselImpact: null,
      lineItems: [
        { label: 'Custom domain registration + DNS (k2kcollegeprepservices.com, 1 yr)', cost: 50 },
        { label: 'Vercel hosting — staging + production environments, CI/CD pipeline', cost: 200 },
        { label: 'Supabase (PostgreSQL) database schema design + initialization', cost: 300 },
        { label: 'Authentication system — access code model per student', cost: 350 },
        { label: 'Google Workspace — up to 5 branded email accounts', cost: 300 },
        { label: 'File storage architecture (Supabase Storage) for Document Vault', cost: 300 },
      ],
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
      deselImpact: 'Without a brand identity system, your website and portal will launch without a defined logo, color palette, or visual language. This means generic typography, inconsistent presentation, and no brand book for future use. A $1,500 service charging families deserves a brand that reflects that.',
      details: [
        'Primary logo + alternate mark (light + dark versions)',
        'Brand style guide (colors, typography, spacing rules)',
        'Favicon + browser icon set',
        'Professional email signature template',
        'Brand book PDF delivered for internal/investor use',
      ],
      lineItems: [
        { label: 'Logo design — 2–3 concepts, 1 final direction', cost: 800 },
        { label: 'Brand style guide (colors, type, spacing, rules)', cost: 500 },
        { label: 'Favicon + browser/mobile icon set', cost: 150 },
        { label: 'Email signature template (all accounts)', cost: 200 },
        { label: 'Brand book PDF for internal/investor use', cost: 350 },
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
      deselImpact: 'Removing the website means K2K has no public-facing presence beyond the portal login. No SEO, no discovery, no trust-building for prospective families. Parents researching a $1,500 service need to find you and vet you before they ever sign up.',
      details: [
        'Home, About, Services (4 tiers), Success Stories, Blog, FAQ, Contact',
        'Fully mobile-responsive across all devices and screen sizes',
        'SEO-optimized page structure + metadata',
        'Contact form with Formspree routing to your inbox',
        '3 seed blog articles written and published at launch',
      ],
      lineItems: [
        { label: 'Home page (hero, stats bar, services preview, CTAs)', cost: 800 },
        { label: 'About page (founder story, bio, credentials, mission)', cost: 400 },
        { label: 'Services page (4 tiers, comparison table, add-ons)', cost: 500 },
        { label: 'Success Stories page (testimonial carousel, outcome cards)', cost: 500 },
        { label: 'Blog — CMS setup + 3 Axiom-written SEO seed articles', cost: 700 },
        { label: 'FAQ page — accordion style, pre-sale + process questions', cost: 350 },
        { label: 'Contact page — form, calendar embed, auto-confirmation email', cost: 450 },
        { label: 'Mobile responsiveness, SEO structure, sitemap', cost: 800 },
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
      deselImpact: 'The portal is the product K2K is selling. Without it, students have no secure login, no milestone tracking, no document vault, and no way to experience the service they paid $750–$1,500 for. This is the primary deliverable that separates K2K from a basic Wix site.',
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
      lineItems: [
        { label: 'Login page — split-screen, access code auth (Blueprint 01)', cost: 600 },
        { label: 'Student dashboard — progress ring, tier card, sessions (Blueprint 02)', cost: 900 },
        { label: 'Milestone Tracker — 14 steps, 5 phases, advisor notes (Blueprint 03)', cost: 1000 },
        { label: 'Document Vault — upload, annotation, version history (Blueprint 04)', cost: 1200 },
        { label: 'Scheduling & Session Center — booking, reminders, Zoom links', cost: 1100 },
        { label: 'Resource Library — tier-gated content, category filters (Blueprint 05)', cost: 900 },
        { label: 'Alumni Network Module — directory, mentorship requests (Blueprint 06)', cost: 900 },
        { label: 'Virtual HBCU Tour Library — video grid, favorites, Q&A scheduler', cost: 900 },
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
      deselImpact: 'Without the admin dashboard you\'d manage every student manually — no unified view, no document review queue, no session calendar. As your student count grows this becomes unmanageable. This is what allows you to scale without adding staff.',
      details: [
        'Student management — all active clients visible at a glance',
        'Document queue — review, annotate, and approve client uploads',
        'Session calendar + KPI statistics overview',
        'Testimonial review + approval workflow',
        'Student progress visibility across all accounts',
      ],
      lineItems: [
        { label: 'KPI stats row (active students, sessions, documents, progress)', cost: 400 },
        { label: 'Student management table — view, message, schedule per student', cost: 600 },
        { label: 'Document review queue — review, annotate, approve uploads', cost: 400 },
        { label: 'Session calendar widget + today\'s schedule view', cost: 350 },
        { label: 'Quick message widget + Add New Student workflow', cost: 250 },
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
      deselImpact: 'Skipping QA means going live without verified cross-browser testing, security checks, or a structured UAT window. Issues found by your first real students reflect directly on the service. QA is the difference between a professional launch and an embarrassing one.',
      details: [
        'Cross-browser + device compatibility testing',
        'Authentication flow + security testing',
        'Client UAT (user acceptance testing) window before go-live',
        'Bug resolution and performance optimization',
        'Production go-live + 301 redirect configuration',
        'Google Analytics + Search Console setup',
      ],
      lineItems: [
        { label: 'Cross-browser + device testing (Chrome, Safari, Firefox; iOS + Android)', cost: 400 },
        { label: 'Auth + access control security testing', cost: 300 },
        { label: 'Client UAT window + structured review form', cost: 200 },
        { label: 'Production deployment + 301 redirects from Wix URL', cost: 250 },
        { label: 'Google Analytics 4 + Search Console setup + sitemap submission', cost: 200 },
        { label: 'SSL verification, HTTPS enforcement, post-launch check', cost: 150 },
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
      deselImpact: 'Without post-launch support, any bugs or issues that surface after go-live fall on you to identify and communicate without a dedicated response window. The first 30 days after launch are typically the highest-activity period — students onboarding, parents logging in, content being added.',
      details: [
        '30-day bug fix window after production launch',
        'Up to 3 content update requests included',
        'Emergency support response within 24 hours',
        'Admin handoff training session for advisor',
        'Handoff documentation package for internal reference',
      ],
      lineItems: [
        { label: '30-day bug fix window — reported bugs resolved at no extra charge', cost: 350 },
        { label: 'Up to 3 content update requests (copy, images, layout tweaks)', cost: 150 },
        { label: 'Emergency support — 24-hour response SLA for critical issues', cost: 100 },
        { label: 'Admin handoff training session (1-hour video walkthrough)', cost: 100 },
        { label: 'Handoff documentation package for internal reference', cost: 50 },
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
      deselImpact: null,
      lineItems: [],
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

  const tourSteps = [
    {
      id: "tour-header",
      label: "Your Engagement Overview",
      body: "This is your home base. You'll see your project status, full scope value, timeline, and current phase — everything you need to know about where the engagement stands at a glance.",
    },
    {
      id: "tour-audit",
      label: "Site Audit & Recommendations",
      body: "Before our consultation, we reviewed your current Wix site against 15 credibility and functionality indicators. Each finding has a severity rating and Axiom's proposed recommendation for how we'd address it. Tap any row to expand it.",
    },
    {
      id: "tour-architecture",
      label: "What We'd Build",
      body: "This maps out every page, portal module, and admin view included in the full scope — your public website, the student-facing client portal, and the advisor admin dashboard. It's the blueprint before the build.",
    },
    {
      id: "tour-budget",
      label: "Your Budget & Scope Calculator",
      body: "Every service is itemized here with its cost. Technical Infrastructure is the only required piece — everything else is optional. Toggle services on or off and the total updates in real time. We'll build your number together, so don't worry about the full figure.",
    },
    {
      id: "tour-timeline",
      label: "Implementation Timeline",
      body: "Your 6-phase timeline lives here. Dates are TBD until your MSA and SOW are signed, but this shows you the full arc — from brand identity through launch. Nothing kicks off until we've aligned on scope.",
    },
  ];

  const [tourStep, setTourStep] = useState(null);

  useEffect(() => {
    if (tourStep === null) return;
    const el = document.getElementById(tourSteps[tourStep].id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [tourStep]);

  // Active section gets a gold ring; all others get blurred while tour runs
  const tourStyle = (id) => {
    if (tourStep === null) return {};
    const isActive = id !== null && tourSteps[tourStep].id === id;
    if (isActive) return {
      boxShadow: "0 0 0 3px #C9973A, 0 0 0 10px #C9973A44",
      transition: "box-shadow 0.3s ease, filter 0.3s ease, opacity 0.3s ease",
    };
    return {
      filter: "blur(3px)",
      opacity: 0.25,
      pointerEvents: "none",
      transition: "filter 0.3s ease, opacity 0.3s ease",
    };
  };

  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2A2A]" style={t.sans}>

      {/* ── Deselection Warning Modal ──────────────────────── */}
      {deselModal && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-[#0D1B2A]/70 backdrop-blur-sm">
          <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-1 w-full bg-[#C9973A]" />
            <div className="p-6">
              <p className={`${t.smallMeta} text-[#C9973A] mb-2`}>Before you remove this</p>
              <h3 className="text-[17px] font-semibold text-[#0D1B2A] mb-3" style={t.serif}>
                {deselModal.name}
              </h3>
              <p className="text-[13px] leading-6 text-[#555] mb-5">
                {deselModal.impact}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeselModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DDD] text-[#555] text-[12px] font-medium hover:border-[#C9973A] hover:text-[#C9973A] transition-colors"
                >
                  Keep it
                </button>
                <button
                  onClick={confirmDesel}
                  className="flex-1 py-2.5 rounded-xl bg-[#0D1B2A] text-[#FAF7F2] text-[12px] font-medium hover:bg-[#1a2d42] transition-colors"
                >
                  Remove anyway
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Welcome Modal ──────────────────────────────────── */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1B2A]/80 backdrop-blur-sm">
          <div className="relative w-full max-w-[480px] bg-[#FAF7F2] rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-1 w-full bg-[#C9973A]" />
            <div className="p-7 md:p-9">
              <div className={`${t.smallMeta} text-[#C9973A] mb-3`}>
                Axiom Executive Advisory LLC · K2K College Prep Services
              </div>
              <h2 className="text-[26px] md:text-[32px] leading-[1.15] font-semibold text-[#0D1B2A] mb-3" style={t.serif}>
                Welcome, Tina.
              </h2>
              <p className="text-[14px] leading-6 text-[#555] mb-6">
                Your portal is ready. Everything Axiom has prepared — the site audit, the proposed platform, and your custom scope — is right here. Take a quick tour so you know exactly where to find everything.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { dismissWelcome(); setTourStep(0); }}
                  className="w-full py-3 rounded-xl bg-[#0D1B2A] text-[#FAF7F2] text-[13px] tracking-widest uppercase font-semibold hover:bg-[#1a2d42] transition-colors"
                >
                  Take the tour →
                </button>
                <button
                  onClick={dismissWelcome}
                  className="w-full py-2 text-[12px] text-[#888] hover:text-[#444] transition-colors"
                >
                  Skip — I'll explore on my own
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Guided Tour Card ───────────────────────────────── */}
      {tourStep !== null && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[500px]">
          <div className="bg-[#0D1B2A] text-[#FAF7F2] rounded-2xl shadow-2xl border border-[#C9973A44] overflow-hidden">
            <div className="h-[3px] bg-[#C9973A]" style={{ width: `${((tourStep + 1) / tourSteps.length) * 100}%`, transition: "width 0.4s ease" }} />
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={`${t.smallMeta} text-[#E4B96A]`}>
                  Step {tourStep + 1} of {tourSteps.length}
                </span>
                <button
                  onClick={() => setTourStep(null)}
                  className="text-[11px] text-[#666] hover:text-[#AAA] transition-colors uppercase tracking-widest"
                >
                  Exit tour
                </button>
              </div>
              <div className="text-[16px] font-semibold mb-1" style={t.serif}>
                {tourSteps[tourStep].label}
              </div>
              <p className="text-[13px] text-[#D6C9A8] leading-relaxed mb-4">
                {tourSteps[tourStep].body}
              </p>
              <div className="flex gap-2">
                {tourStep > 0 && (
                  <button
                    onClick={() => setTourStep(p => p - 1)}
                    className="flex-1 py-2 rounded-lg border border-white/20 text-[12px] text-[#D6C9A8] hover:bg-white/5 transition-colors"
                  >
                    ← Back
                  </button>
                )}
                {tourStep < tourSteps.length - 1 ? (
                  <button
                    onClick={() => setTourStep(p => p + 1)}
                    className="flex-1 py-2 rounded-lg bg-[#C9973A] text-white text-[12px] font-semibold hover:bg-[#b8882f] transition-colors"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={() => setTourStep(null)}
                    className="flex-1 py-2 rounded-lg bg-[#C9973A] text-white text-[12px] font-semibold hover:bg-[#b8882f] transition-colors"
                  >
                    Finish tour ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-[1180px] mx-auto px-6 py-8 space-y-10">


        {/* ═══════════════════════════════════════════════════
            SECTION 1 — ENGAGEMENT HEADER
        ═══════════════════════════════════════════════════ */}
        <section
          id="tour-header"
          className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-8 md:p-10 transition-shadow duration-300`}
          style={tourStyle("tour-header")}
        >
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
        <section className="grid grid-cols-2 md:grid-cols-4 gap-5 transition-all duration-300 rounded-2xl" style={tourStyle(null)}>
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
        <section className="grid md:grid-cols-2 gap-5 transition-all duration-300 rounded-2xl" style={tourStyle(null)}>

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
        <section
          id="tour-audit"
          className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-6 md:p-8 transition-shadow duration-300`}
          style={tourStyle("tour-audit")}
        >

          <div className={`${t.smallMeta} text-[#E4B96A] mb-2`}>Site Audit & Recommendations — k2kcollegeprepservices.com</div>
          <h2 className={`${t.h2} mb-2`} style={t.serif}>
            What we found — and what we'd build to address it.
          </h2>
          <p className={`${t.base} text-[#D6C9A8] mb-6 max-w-[640px]`}>
            Before our intake consultation, Axiom conducted a full review of your existing Wix presence against 15 credibility, functionality, and client-experience indicators. Each finding below includes its severity rating and Axiom's proposed recommendation for how it would be addressed in the build. These are proposals — no work has been performed. Final scope is confirmed upon MSA and SOW execution.
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
        <section
          id="tour-architecture"
          className={`rounded-2xl ${t.border} bg-[#F0E8D5] p-6 md:p-8 transition-shadow duration-300`}
          style={tourStyle("tour-architecture")}
        >

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
        <section
          id="tour-timeline"
          className="transition-shadow duration-300 rounded-2xl"
          style={tourStyle("tour-timeline")}
        >

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
        <section className={`rounded-2xl ${t.border} bg-white p-6 md:p-8 transition-all duration-300`} style={tourStyle(null)}>

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
        <section
          id="tour-budget"
          className={`rounded-2xl ${t.border} bg-white p-6 md:p-8 transition-shadow duration-300`}
          style={tourStyle("tour-budget")}
        >

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
                        {/* Line item cost breakdown */}
                        {svc.lineItems && svc.lineItems.length > 0 && (
                          <div className="mt-3 mb-3">
                            <p className={`${t.smallMeta} text-[#C9973A] mb-2`}>Cost breakdown</p>
                            <div className="divide-y divide-[#F0EAE0] border border-[#EDE5D8] rounded-xl overflow-hidden">
                              {svc.lineItems.map((item, i) => (
                                <div key={i} className="flex items-center justify-between gap-3 px-3 py-2.5 bg-white">
                                  <span className="text-[12px] text-[#555] leading-snug flex-1">{item.label}</span>
                                  <span className="text-[12px] font-semibold text-[#0D1B2A] flex-shrink-0 tabular-nums">
                                    {fmt(item.cost)}
                                  </span>
                                </div>
                              ))}
                              <div className="flex items-center justify-between px-3 py-2.5 bg-[#FAF7F2]">
                                <span className={`${t.smallMeta} text-[#888]`}>Total</span>
                                <span className="text-[13px] font-bold text-[#C9973A] tabular-nums">
                                  {fmt(svc.proRated ? proRatedPM : svc.cost)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {svc.proRated && (
                          <p className="text-[11px] text-[#AAA] mt-2 mb-2 italic">
                            Pro-rated: scales with your selected scope. Minimum $300, maximum $1,000.
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

            {/* 4 Milestones — grayed until scope is confirmed */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`${t.smallMeta} text-[#888]`}>Project Milestones · 4 Payments · 25% Each</div>
              <span className="text-[9px] tracking-widest uppercase px-2 py-[2px] rounded-full bg-white/8 text-[#666] border border-white/10">
                pending scope confirmation
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 opacity-50">
              {milestones.map((m) => (
                <div key={m.id} className="rounded-lg bg-white/5 border border-white/8 p-4">
                  <div className={`${t.smallMeta} text-[#666] mb-1`}>{m.id}</div>
                  <div className={`${t.base} font-medium text-[#AAA]`}>{m.name}</div>
                  <div className="text-[11px] text-[#555] mt-1 mb-3 leading-4">{m.trigger}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#666]">TBD</span>
                    <span className="text-[9px] tracking-widest uppercase px-2 py-[2px] rounded-full bg-white/8 text-[#555]">
                      pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#666] mt-3 leading-5">
              Milestone amounts and payment dates are finalized once you've confirmed your scope and your MSA + SOW are executed.
            </p>
          </div>

        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 8B — THIRD-PARTY RECURRING EXPENSES
        ═══════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-[#F0E8D5] p-6 md:p-8 transition-all duration-300`} style={tourStyle(null)}>

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
            SECTION — NEXT STEPS
        ═══════════════════════════════════════════════════ */}
        <section className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-6 md:p-8 transition-all duration-300`} style={tourStyle(null)}>

          <div className={`${t.smallMeta} text-[#E4B96A] mb-2`}>What Happens Next</div>
          <h2 className={`${t.h2} mb-2`} style={t.serif}>You've reviewed the scope. Here's how we move forward.</h2>
          <p className={`${t.base} text-[#D6C9A8] mb-8 max-w-[600px]`}>
            No commitment required yet — this is a conversation. Let us know when you're available and Axiom will reach out to confirm.
          </p>

          {/* 3-step progress */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { n: "01", label: "Axiom reviews your selections", body: "Your scope choices and any notes are sent to Axiom for review before the call.", done: false },
              { n: "02", label: "We schedule a call to discuss", body: "We'll confirm a time from your availability and walk through the scope, pricing, and any questions.", done: false },
              { n: "03", label: "MSA + SOW are generated", body: "Once aligned, Axiom drafts and sends your Master Services Agreement and Statement of Work.", done: false },
            ].map((s) => (
              <div key={s.n} className="rounded-xl bg-white/5 border border-white/10 p-5">
                <div className={`${t.smallMeta} text-[#E4B96A] mb-2`}>Step {s.n}</div>
                <div className="text-[14px] font-semibold mb-2 leading-5">{s.label}</div>
                <p className="text-[12px] text-[#D6C9A8] leading-5">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Availability picker */}
          {!submitted ? (
            <>
              <div className={`${t.smallMeta} text-[#E4B96A] mb-1`}>Select times that work for you</div>
              <p className="text-[12px] text-[#888] mb-4">Select all that apply. Weekdays are available after 6 PM. Weekends are open 1–8 PM.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
                {availableSlots.map((s) => {
                  const active = selectedSlots.has(s.key);
                  return (
                    <button
                      key={s.key}
                      onClick={() => toggleSlot(s.key)}
                      className={`rounded-lg p-3 text-left border transition-colors ${
                        active
                          ? "bg-[#C9973A] border-[#C9973A] text-white"
                          : "bg-white/5 border-white/10 text-[#D6C9A8] hover:bg-white/10"
                      }`}
                    >
                      <div className="text-[11px] font-semibold leading-4">{s.label}</div>
                      <div className={`text-[9px] tracking-wide mt-1 ${active ? "text-white/80" : "text-[#666]"}`}>{s.time}</div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={submitAvailability}
                disabled={selectedSlots.size === 0}
                className={`px-6 py-3 rounded-xl text-[13px] tracking-widest uppercase font-semibold transition-colors ${
                  selectedSlots.size > 0
                    ? "bg-[#C9973A] text-white hover:bg-[#b8882f]"
                    : "bg-white/8 text-[#555] cursor-not-allowed"
                }`}
              >
                Submit my availability →
              </button>
              {selectedSlots.size > 0 && (
                <p className="text-[11px] text-[#888] mt-2">{selectedSlots.size} time{selectedSlots.size > 1 ? "s" : ""} selected</p>
              )}
            </>
          ) : (
            <div className="rounded-xl bg-[#C9973A22] border border-[#C9973A44] p-6">
              <div className={`${t.smallMeta} text-[#E4B96A] mb-2`}>Availability Received</div>
              <p className={`${t.base} text-[#D6C9A8]`}>
                Thank you, Tina — Axiom has your availability and will follow up to confirm a time. Keep an eye out for a message from{" "}
                <span className="text-[#E4B96A]">hello@axiomexecutiveadvisory.com</span>.
              </p>
            </div>
          )}

        </section>


        {/* ═══════════════════════════════════════════════════
            SECTION 9 — AXIOM GAP RECOMMENDATIONS
        ═══════════════════════════════════════════════════ */}
        <section className="transition-all duration-300 rounded-2xl" style={tourStyle(null)}>

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
        <section className={`rounded-2xl ${t.border} bg-[#0D1B2A] text-[#FAF7F2] p-6 md:p-8 transition-all duration-300`} style={tourStyle(null)}>
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
