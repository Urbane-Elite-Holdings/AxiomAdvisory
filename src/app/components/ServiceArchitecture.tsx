import { useNavigate } from "react-router";

type ServiceArchitectureItem = {
  num: string;
  title: string;
  strapline: string;
  description: string;
  deliverables: string[];
  engagementTypes: string;
};

type EngagementModel = {
  model: string;
  description: string;
  includes: string[];
  bestFor: string;
};

const serviceArchitecture: ServiceArchitectureItem[] = [
  {
    num: "01",
    title: "Fractional Chief of Staff",
    strapline: "The Principal's Operating System",
    description:
      "Executive-level operating leadership embedded within your organization to connect strategy, operations, and leadership execution.",
    deliverables: [
      "Own end-to-end operating rhythm across strategy, finance, people, and delivery",
      "Drive cross-functional execution from executive intent to accountable workstreams",
      "Stand up leadership dashboards, escalation pathways, and weekly performance governance",
      "Lead principal briefings, board prep, and decision memo architecture for high-stakes moments",
    ],
    engagementTypes: "Retained fractional, project-based, interim/transitional",
  },
  {
    num: "02",
    title: "Brand Infrastructure & Market Presence",
    strapline: "Built to Be Found, Designed to Be Remembered",
    description:
      "Applies governance-level rigor to positioning, category messaging, and market-facing execution architecture.",
    deliverables: [
      "Brand positioning and messaging architecture aligned to business strategy",
      "Go-to-market blueprint using product, pricing, channel, and promotion strategy",
      "Audience segmentation, ICP refinement, and competitive narrative pressure testing",
      "Narrative and content system design to keep external communications consistent",
    ],
    engagementTypes: "Brand strategy sprint, GTM advisory retainer, narrative architecture program",
  },
  {
    num: "03",
    title: "Brand Decision Studio",
    strapline: "Decide Before You Build",
    description:
      "Structured decision framework for founders and executives to lock positioning, creative direction, and launch strategy.",
    deliverables: [
      "Positioning pathway evaluation against market and operating realities",
      "Brand identity and narrative direction mapping for decision clarity",
      "Audience-fit, offer architecture, and conversion-friction assessment",
      "Decision-ready GTM recommendation with execution sequencing",
    ],
    engagementTypes: "Decision sprint, founder workshop, pre-launch strategy build",
  },
  {
    num: "04",
    title: "Digital Presence & Micro-Sites",
    strapline: "Focused Touchpoints That Convert",
    description:
      "Builds purpose-fit digital touchpoints that extend your brand without requiring a full platform rebuild.",
    deliverables: [
      "Micro-site and landing page architecture tied to specific offers and audiences",
      "Information architecture and conversion-path design for faster decision journeys",
      "Rapid content and page systems for campaigns, partnerships, and launches",
      "Measurement instrumentation with reporting loops for optimization",
    ],
    engagementTypes: "Campaign launch package, digital sprint, continuous optimization retainer",
  },
  {
    num: "05",
    title: "Strategy to Structure",
    strapline: "From Vision to Operating Model",
    description:
      "Translates strategic intent into operating models, accountability systems, and planning cadences that hold across teams.",
    deliverables: [
      "Strategic planning facilitation and multi-horizon roadmapping",
      "Operating model design and decision-rights allocation",
      "OKR/KPI governance architecture tied to executive priorities",
      "Quarterly and annual planning cadence with operating reviews",
    ],
    engagementTypes: "Strategic advisory retainer, quarterly facilitation, planning cycle support",
  },
  {
    num: "06",
    title: "End-to-End Operations Management",
    strapline: "The Infrastructure Behind the Vision",
    description:
      "Builds and manages governance infrastructure, process systems, and accountability across high-stakes initiatives.",
    deliverables: [
      "Enterprise portfolio and program governance across cross-functional initiatives",
      "Executive committee structures, escalation ladders, and decision control points",
      "PMO operating framework design with ownership and delivery standards",
      "Operational health dashboards, performance cadences, and corrective-action loops",
    ],
    engagementTypes: "Embedded operator, project-based governance, PMO buildout",
  },
  {
    num: "07",
    title: "Operations Infrastructure & Knowledge Systems",
    strapline: "Make Execution Repeatable",
    description:
      "Creates the process backbone that allows teams to execute consistently as the organization scales.",
    deliverables: [
      "SOP and process documentation architecture for core operating functions",
      "Template libraries, playbooks, and reusable execution assets",
      "Centralized knowledge repositories with ownership, versioning, and controls",
      "Workflow and handoff design to reduce rework and operational drag",
    ],
    engagementTypes: "Infrastructure buildout, process modernization project, retained optimization",
  },
  {
    num: "08",
    title: "Organizational Governance & Decision Architecture",
    strapline: "Clarity at Every Level",
    description:
      "Eliminates ownership ambiguity and restores operating momentum through explicit governance and decision systems.",
    deliverables: [
      "Decision-rights frameworks (RACI, DACI, RAPID) tied to real workflows",
      "Committee and council structure design with chartered mandates",
      "Policy and procedure architecture with control checkpoints",
      "Board and executive governance optimization for speed and accountability",
    ],
    engagementTypes: "Governance audit + design, ongoing advisory, board support",
  },
  {
    num: "09",
    title: "Executive Communications & Narrative Strategy",
    strapline: "What Gets Said, and How",
    description:
      "Develops high-stakes communication architecture that aligns stakeholders and protects executive credibility.",
    deliverables: [
      "Board and investor presentation development for pivotal decisions",
      "Transformation narratives and strategic memo frameworks",
      "Town hall and all-hands communication architecture",
      "Crisis messaging frameworks and thought leadership positioning",
    ],
    engagementTypes: "Project-based, retained communications partner, crisis surge",
  },
  {
    num: "10",
    title: "Crisis Management Infrastructure",
    strapline: "Ready Before You Need It",
    description:
      "Builds crisis readiness systems and response protocols, then supports leadership during live disruption.",
    deliverables: [
      "Crisis readiness assessments and vulnerability gap analysis",
      "Incident command structure design with role clarity",
      "Communication cascade protocols across internal and external stakeholders",
      "Tabletop exercise facilitation and post-incident hardening plans",
    ],
    engagementTypes: "Plan development, tabletop facilitation, readiness retainer, embedded crisis lead",
  },
  {
    num: "11",
    title: "AI Governance & Compliance Framework",
    strapline: "Structure for What's Coming",
    description:
      "Designs practical policy, risk, and compliance infrastructure for organizations adopting AI at speed.",
    deliverables: [
      "AI readiness assessments tied to use-case, risk, and control maturity",
      "AI use policy development, vendor risk standards, and review controls",
      "AI risk tiering with mitigation protocols and escalation thresholds",
      "Internal governance committee charters and practical AI training for business teams",
    ],
    engagementTypes: "Assessment + framework build, ongoing compliance advisory, policy refresh retainer",
  },
  {
    num: "12",
    title: "Strategic & Third-Party Risk Assessment",
    strapline: "Audit, Findings, and Remediation",
    description:
      "Conducts end-to-end operational and risk audits, then translates findings into executable remediation plans.",
    deliverables: [
      "Enterprise risk inventory and heat mapping across operations, brand, and compliance",
      "Third-party and vendor due diligence with control and dependency analysis",
      "Findings report with prioritized remediation roadmap and owner accountability",
      "Governance cadence for tracking closure, risk reduction, and control effectiveness",
    ],
    engagementTypes: "Point-in-time assessment, ongoing risk advisory, ERM buildout",
  },
  {
    num: "13",
    title: "Small Business AI Enablement",
    strapline: "Practical AI for Teams That Need a Starting Point",
    description:
      "Helps neighborhood and owner-led businesses identify simple AI use cases, select the right tools, and improve repetitive processes without enterprise complexity.",
    deliverables: [
      "AI opportunity mapping across scheduling, inboxes, customer follow-up, and internal admin",
      "Tool selection and implementation guidance sized for small-business budgets and staffing",
      "Creative workflow ideas for marketing, content, review capture, and customer communication",
      "Process cleanup recommendations that make automation usable day to day",
    ],
    engagementTypes: "Starter sprint, implementation setup, monthly optimization support",
  },
];

const engagementModels: EngagementModel[] = [
  {
    model: "Embedded Retainer",
    description: "A recurring partnership where Axiom integrates into leadership operations and drives execution in real time.",
    includes: [
      "Dedicated advisory capacity each month with standing leadership cadence",
      "Execution ownership across priorities, escalations, and decision follow-through",
      "Monthly executive reporting on outcomes, blockers, and next-cycle priorities",
    ],
    bestFor: "Fractional Chief of Staff, governance maturity, continuous operational execution",
  },
  {
    model: "Strategic Advisory",
    description: "Senior-level counsel focused on decision quality, operating posture, and leadership alignment.",
    includes: [
      "Executive and board-level advisory sessions on strategic decisions",
      "Scenario planning and option analysis before high-impact commitments",
      "Governance and risk guidance without day-to-day implementation dependency",
    ],
    bestFor: "CEOs, principals, boards, and founders navigating complex decision windows",
  },
  {
    model: "Project-Based",
    description: "Scoped engagements with clear timelines, hard deliverables, and defined success criteria.",
    includes: [
      "Statement of work with milestones, deliverables, and review checkpoints",
      "Focused buildouts such as governance architecture, crisis plans, or AI policy",
      "Executive-ready handoff package for adoption and internal rollout",
    ],
    bestFor: "Transformation initiatives, capability buildouts, and targeted strategic outcomes",
  },
  {
    model: "Surge / Interim",
    description: "High-intensity embedded support for transitions, leadership gaps, and critical inflection points.",
    includes: [
      "Rapid integration into your leadership operating model",
      "Day-to-day execution command across teams, vendors, and strategic projects",
      "Stabilization plan plus transition framework for long-term continuity",
    ],
    bestFor: "Leadership transitions, scaling moments, M&A integration, and urgent execution gaps",
  },
  {
    model: "Assessment Sprint",
    description: "2-4 week diagnostic engagement producing findings, remediation priorities, and an action-ready roadmap.",
    includes: [
      "End-to-end review of operations, governance, risk, and brand execution",
      "Executive findings readout with prioritized remediation recommendations",
      "Implementation roadmap with owner mapping, sequence, and governance checkpoints",
    ],
    bestFor: "Organizations that need immediate clarity before a major build, change, or investment",
  },
];

const proofPoints = [
  "Fortune-scale governance support across portfolio delivery, executive rhythms, and escalation structures",
  "Principal office operating-system redesigns that restore leadership bandwidth for strategic decision-making",
  "Operational and risk audits converted into remediation roadmaps with owners, milestones, and governance checkpoints",
  "Crisis readiness frameworks validated through command simulations and live-response support",
  "Integrated brand, governance, and operations architecture built for sustained execution, not one-off deliverables",
];

const industryTracks = [
  {
    title: "AI Automation for Real Estate Teams",
    description: "Stop losing leads to slow follow-up with instant reply, qualification, routing, and showing-booking systems for brokerages and high-touch sales teams.",
    href: "/contact?offer=leadflow&sector=real-estate",
  },
  {
    title: "AI Automation for Design Firms",
    description: "Convert project inquiries without chasing every email using consult scheduling, scope-fit filters, and proposal follow-up systems.",
    href: "/contact?offer=leadflow&sector=design",
  },
  {
    title: "AI Automation for Service Businesses",
    description: "Recover missed calls before the job goes cold with dispatch-ready routing, estimate follow-up, and no-show prevention.",
    href: "/contact?offer=leadflow&sector=service",
  },
  {
    title: "AI Solutions for Neighborhood Businesses",
    description: "Use practical AI, creative process fixes, and simple admin automation when you know the business could run smarter but do not know what to change first.",
    href: "/contact?offer=leadflow&sector=neighborhood",
  },
];

const leadFlowFocus = [
  "Missed call -> text/email reply -> booking",
  "New lead -> qualification -> owner assignment",
  "CRM update -> follow-up cadence -> escalation",
  "Neighborhood business admin -> scheduling -> review request automation",
  "Executive dashboard for response-time leakage",
];

export function ServiceArchitecture() {
  const navigate = useNavigate();

  return (
    <section id="architecture" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p
            className="text-[#D4AF37] mb-3"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            Service Architecture
          </p>
          <div className="flex items-center gap-6">
            <h2
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400 }}
            >
              Built for Executive-Grade Execution
            </h2>
            <div className="flex-1 h-px bg-[#D4AF37]/40" />
          </div>
        </div>

        <div className="border border-[#D4AF37]/25 bg-[#111111] px-6 py-8 lg:px-10 mb-12">
          <p className="text-white/85 max-w-4xl" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.9 }}>
            Axiom Executive Advisory delivers operational intelligence, governance
            infrastructure, and AI workflow automation without the overhead of
            permanent executive hires. We operate at the intersection of structure,
            execution, and lead-flow discipline, then translate that rigor for
            owner-led businesses running on phones, inboxes, calendars, and lean teams.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-14">
          <div className="xl:col-span-7 border border-white/15 bg-[#111111] p-6 lg:p-8">
            <p
              className="text-[#D4AF37] mb-3"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              Niche Selector
            </p>
            <h3 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 400 }}>
              Choose the workflow that needs fixing first.
            </h3>
            <p className="text-white/72 max-w-3xl" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", lineHeight: 1.85 }}>
              Explore Architecture now routes through the operating context that matters:
              real estate, design, service delivery, or neighborhood business operations.
              Start with the lead path or the process bottleneck, then move to the right audit and build sequence.
            </p>

            <div className="mt-7 divide-y divide-white/10 border-t border-white/10">
              {industryTracks.map((track) => (
                <button
                  key={track.title}
                  onClick={() => navigate(track.href)}
                  className="w-full py-5 text-left flex flex-col gap-2 hover:text-[#D4AF37] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 500 }}>
                        {track.title}
                      </p>
                      <p className="text-white/68 mt-1" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.88rem", lineHeight: 1.8 }}>
                        {track.description}
                      </p>
                    </div>
                    <span
                      className="text-[#D4AF37] shrink-0"
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
                    >
                      Request Audit
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5 border border-[#D4AF37]/25 bg-[#111111] p-6 lg:p-8">
            <p
              className="text-[#D4AF37] mb-3"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              Entry Offer
            </p>
            <h3 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 400 }}>
              LeadFlow AI Audit + Setup
            </h3>
            <p className="text-white/72" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", lineHeight: 1.85 }}>
              Two-week diagnostic and first-build engagement for teams losing revenue to slow lead response, weak routing, inconsistent follow-up, or repetitive small-business admin. No enterprise stack required.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-white/40 mb-1" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Timeline
                </p>
                <p className="text-white" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.96rem", fontWeight: 600 }}>2 weeks</p>
              </div>
              <div>
                <p className="text-white/40 mb-1" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Pricing
                </p>
                <p className="text-white" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.96rem", fontWeight: 600 }}>$2,500 + $500/mo</p>
              </div>
            </div>
            <ul className="mt-6 space-y-2.5">
              {leadFlowFocus.map((item) => (
                <li
                  key={item}
                  className="text-white/72 pl-4 relative"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", lineHeight: 1.72 }}
                >
                  <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/80" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/contact?offer=leadflow")}
              className="mt-7 px-6 py-3.5 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#c9a22f] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              Request Workflow Audit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceArchitecture.map((service) => (
            <article key={service.num} className="border border-white/15 bg-[#111111] p-6 lg:p-7 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[#D4AF37]" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                  {service.num}
                </span>
                <span className="text-[#D4AF37]/85" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {service.strapline}
                </span>
              </div>
              <h3 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", lineHeight: 1.4 }}>
                {service.title}
              </h3>
              <p className="text-white/80 mb-4" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem", lineHeight: 1.75 }}>
                {service.description}
              </p>
              <ul className="space-y-2 mb-4">
                {service.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="text-white/72 pl-4 relative"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.72 }}
                  >
                    <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/80" />
                    {deliverable}
                  </li>
                ))}
              </ul>
              <p className="text-white/68 border-t border-white/15 pt-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.7 }}>
                {service.engagementTypes}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 border border-white/15 bg-[#111111] p-6 lg:p-8">
            <h3 className="text-white mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 500 }}>
              Engagement Models
            </h3>
            <div className="space-y-4">
              {engagementModels.map((item) => (
                <div key={item.model} className="border border-white/15 p-4 lg:p-5 bg-[#131315]">
                  <p className="text-[#D4AF37]" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {item.model}
                  </p>
                  <p className="text-white/85 mt-2" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {item.includes.map((line) => (
                      <li
                        key={line}
                        className="text-white/72 pl-4 relative"
                        style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7 }}
                      >
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/80" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="text-white/70 mt-2.5 border-t border-white/15 pt-2.5" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7 }}>
                    Best for: {item.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-2 border border-white/15 bg-[#111111] p-6 lg:p-8">
            <h3 className="text-white mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 500 }}>
              Proof Points
            </h3>
            <ul className="space-y-2.5">
              {proofPoints.map((point) => (
                <li
                  key={point}
                  className="text-white/78 pl-4 relative"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8125rem", lineHeight: 1.72 }}
                >
                  <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/80" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
