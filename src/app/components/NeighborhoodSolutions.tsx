import { useLocation, useNavigate } from "react-router";
import { navigateToAudit } from "../lib/marketing";

const neighborhoodOperators = [
  {
    business: "Barbershops, salons, wellness studios",
    pain: "Bookings fall through after hours, reminder workflows are inconsistent, and no-shows eat margin.",
    solution: "AI-assisted reminders, waitlist backfill, review requests, and missed-message triage tied to your calendar and phone.",
  },
  {
    business: "Contractors, med spas, service pros",
    pain: "New inquiries arrive through calls, texts, DMs, and forms, then sit too long before anyone follows up.",
    solution: "Instant text-back, lead routing, estimate follow-up, and appointment confirmation without adding headcount.",
  },
  {
    business: "Local retailers, restaurants, community businesses",
    pain: "The team is too busy running the floor to consistently handle repeat-customer outreach and operational admin.",
    solution: "Simple automations for customer reactivation, inbox sorting, FAQ replies, and recurring task reminders.",
  },
  {
    business: "Owner-led professional offices",
    pain: "Too much of the business still lives in one person's head, which makes delegation and growth fragile.",
    solution: "Process cleanup, SOP prompts, intake workflows, and AI support that makes the operation easier to train and repeat.",
  },
];

const startingPoints = [
  "No CRM required. We can start with your phone log, Gmail inbox, calendar, booking app, or spreadsheet.",
  "The first goal is clarity: what should be automated, what should be cleaned up, and what should stay human.",
  "Creative process improvements matter as much as tooling. Better handoffs often unlock automation faster than buying more software.",
  "Each recommendation is sized for a real small-business budget and the people already running the operation.",
];

export function NeighborhoodSolutions() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section className="bg-[#F4F0E8] py-20 sm:py-24 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
          <div className="xl:col-span-5">
            <p
              className="text-[#7A6218] mb-3 uppercase tracking-[0.2em] text-[11px] font-bold"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Small Business AI
            </p>
            <h2
              className="text-[#0A0A0A]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
                lineHeight: 1.08,
                fontWeight: 400,
                maxWidth: "12ch",
              }}
            >
              Practical AI for businesses still running on calls, inboxes, and instinct.
            </h2>
            <p
              className="text-[#0A0A0A]/68 mt-5 max-w-[46ch]"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.98rem", lineHeight: 1.9 }}
            >
              Many traditional neighborhood businesses know they are losing time or
              missing revenue, but they do not know which process should be fixed
              first. Axiom translates that uncertainty into simple AI services,
              workflow ideas, and process improvements that make the business easier
              to run.
            </p>

            <div className="mt-8 border-t border-[#0A0A0A]/12 pt-6 space-y-3">
              {startingPoints.map((point) => (
                <p
                  key={point}
                  className="text-[#0A0A0A]/72 pl-4 relative"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.78 }}
                >
                  <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  {point}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={() => navigateToAudit(navigate, location.pathname)}
                className="px-6 py-3.5 bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                Start With A Free Audit
              </button>
              <button
                onClick={() => navigate("/architecture")}
                className="px-6 py-3.5 border border-[#0A0A0A]/20 text-[#0A0A0A] hover:border-[#D4AF37] hover:text-[#7A6218] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                See Service Architecture
              </button>
            </div>
          </div>

          <div className="xl:col-span-7 border border-[#0A0A0A]/10 bg-white">
            <div className="px-5 sm:px-7 py-5 border-b border-[#0A0A0A]/10">
              <p
                className="text-[#0A0A0A]/55 uppercase tracking-[0.14em]"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem" }}
              >
                Where This Usually Starts
              </p>
            </div>
            <div className="divide-y divide-[#0A0A0A]/10">
              {neighborhoodOperators.map((item) => (
                <div
                  key={item.business}
                  className="px-5 sm:px-7 py-6 sm:py-7 grid grid-cols-1 md:grid-cols-[1.05fr,1fr,1.1fr] gap-4 sm:gap-6"
                >
                  <div>
                    <p
                      className="text-[#0A0A0A]"
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", lineHeight: 1.35, fontWeight: 500 }}
                    >
                      {item.business}
                    </p>
                  </div>
                  <p
                    className="text-[#0A0A0A]/62"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.78 }}
                  >
                    {item.pain}
                  </p>
                  <p
                    className="text-[#0A0A0A]/78"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", lineHeight: 1.78 }}
                  >
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
