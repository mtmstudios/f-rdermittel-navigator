import { useEffect, useState } from "react";

const PCA_LOGO = "https://pca-partners.de/wp-content/uploads/2025/03/PCA_Logo_horizontal-1.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e6e6ef]"
          : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between h-[64px]">
        <a href="/" className="flex items-center gap-3">
          <img
            src={PCA_LOGO}
            alt="PCA Partners"
            className={`h-7 transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}
          />
          <span className={`hidden sm:inline text-[13px] font-medium transition-colors border-l pl-3 ${
            scrolled ? "text-muted-foreground border-[#e6e6ef]" : "text-white/40 border-white/15"
          }`}>
            Forschungszulage
          </span>
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#rechner"
            className={`hidden md:inline nav-link text-[13px] font-medium transition-colors ${
              scrolled ? "text-[#2b2b2b] hover:text-[#0a0909]" : "text-white/50 hover:text-white"
            }`}
          >
            Förder-Rechner
          </a>
          <a
            href="#prozess"
            className={`hidden md:inline nav-link text-[13px] font-medium transition-colors ${
              scrolled ? "text-[#2b2b2b] hover:text-[#0a0909]" : "text-white/50 hover:text-white"
            }`}
          >
            Ablauf
          </a>
          <a href="#kontakt" className="btn-primary !py-2 !px-5 !text-[13px]">
            Ersteinschätzung anfragen
          </a>
        </div>
      </div>
    </nav>
  );
}
