import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import BrandToolPage from "./pages/BrandToolPage";
import BrandToolAdminPage from "./pages/BrandToolAdminPage";
import PartnersPage from "./pages/PartnersPage";
import CornbreadPage from "./pages/CornbreadPage";
import LockedClientPage from "./pages/LockedClientPage";
import K2KPage from "./pages/K2KPage";
import AxiomAdminPage from "./pages/AxiomAdminPage";

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <Navbar />
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<Navigate to="/" replace />} />
        <Route path="/brand-tool" element={<BrandToolPage />} />
        <Route path="/brand-tool/admin" element={<BrandToolAdminPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/partners/cornbread" element={<CornbreadPage />} />
        <Route path="/partners/walmart" element={<LockedClientPage name="Walmart" code="walmart" />} />
        <Route path="/partners/rori-project" element={<LockedClientPage name="R.O.R.I. Project" code="rori" />} />
        <Route path="/partners/nphc-hudson" element={<LockedClientPage name="NPHC of Hudson County" code="nphc" />} />
        <Route path="/partners/k2k" element={<LockedClientPage name="K2K College Prep Services" code="k2k" redirect="/partners/k2k/portal" />} />
        <Route path="/partners/k2k/portal" element={<K2KPage />} />
        <Route path="/axiom-admin" element={<LockedClientPage name="Axiom Internal" code="AdminAxiom8706" redirect="/axiom-admin/dashboard" />} />
        <Route path="/axiom-admin/dashboard" element={<AxiomAdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
