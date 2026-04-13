import type { NavigateFunction } from "react-router";

export const CONTACT_INBOX_EMAIL = "engage@axiomexecutiveadvisory.com";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqedjekk";
export const LEAD_MAGNET_PDF_PATH = "/downloads/5-ai-workflows-small-businesses-need-in-2026.pdf";
export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL?.trim() || "";
export const LINKEDIN_PARTNER_ID = import.meta.env.VITE_LINKEDIN_PARTNER_ID?.trim() || "";

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return false;
  const fixedHeaderOffset = 112;
  const top = Math.max(0, window.scrollY + element.getBoundingClientRect().top - fixedHeaderOffset);
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

export function navigateToAudit(navigate: NavigateFunction, pathname: string) {
  if (pathname === "/" && scrollToSection("audit")) return;
  navigate("/?focus=audit");
}
