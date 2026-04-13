import { useEffect } from "react";
import { LINKEDIN_PARTNER_ID } from "../lib/marketing";

declare global {
  interface Window {
    _linkedin_data_partner_ids?: string[];
    lintrk?: ((event: string, payload?: Record<string, unknown>) => void) & { q?: unknown[] };
  }
}

export function MarketingIntegrations() {
  useEffect(() => {
    if (!LINKEDIN_PARTNER_ID || typeof window === "undefined") return;

    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    if (!window._linkedin_data_partner_ids.includes(LINKEDIN_PARTNER_ID)) {
      window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
    }

    if (!window.lintrk) {
      const lintrk = function (event: string, payload?: Record<string, unknown>) {
        (lintrk.q = lintrk.q || []).push([event, payload]);
      } as NonNullable<typeof window.lintrk>;
      lintrk.q = [];
      window.lintrk = lintrk;
    }

    if (document.querySelector('script[data-linkedin-insight="true"]')) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    script.dataset.linkedinInsight = "true";
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
