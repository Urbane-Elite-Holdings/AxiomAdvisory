import { useEffect } from "react";
import { useLocation } from "react-router";
import { Hero } from "../components/Hero";
import { ClientTestimonies } from "../components/ClientTestimonies";
import { LeadFlowOffer } from "../components/LeadFlowOffer";
import { NeighborhoodSolutions } from "../components/NeighborhoodSolutions";
import { ProofStrip } from "../components/ProofStrip";
import { QuickAuditCapture } from "../components/QuickAuditCapture";
import { HomeIntelligence } from "../components/HomeIntelligence";
import { CaseStudies } from "../components/CaseStudies";
import { EngagementBanner } from "../components/EngagementBanner";
import { scrollToSection } from "../lib/marketing";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("focus") !== "audit") return;

    let attempts = 0;
    const tryScroll = () => {
      const didScroll = scrollToSection("audit");
      if (didScroll || attempts >= 6) {
        params.delete("focus");
        const next = params.toString();
        window.history.replaceState({}, "", next ? `/?${next}` : "/");
        return;
      }

      attempts += 1;
      window.setTimeout(tryScroll, 120);
    };

    const timeout = window.setTimeout(tryScroll, 180);

    return () => window.clearTimeout(timeout);
  }, [location.search]);

  return (
    <>
      <Hero />
      <ClientTestimonies />
      <ProofStrip />
      <LeadFlowOffer />
      <NeighborhoodSolutions />
      <QuickAuditCapture
        sectionId="audit"
        source="home-quick-audit"
        title="Free AI workflow gap analysis for real estate teams and neighborhood businesses."
        subtitle="Send your CRM export, call log, inbox screenshot, booking link, or a simple description of what is slowing the business down. No CRM required. We will reply with concrete AI service ideas, creative solutions, and process improvements."
      />
      <HomeIntelligence />
      <CaseStudies />
      <EngagementBanner />
    </>
  );
}
