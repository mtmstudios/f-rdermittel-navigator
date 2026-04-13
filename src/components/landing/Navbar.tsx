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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between h-[72px]">
        <a href="/" className="flex items-center gap-3">
          <img
            src={PCA_LOGO}
            alt="PCA Partners"
            className={`h-7 transition-all duration-500 ${scrolled ? "" : "brightness-0 invert"}`}
          />
          <span className={`hidden sm:inline text-[12px] font-medium tracking-wide transition-colors duration-500 border-l pl-3 ${
            scrolled ? "text-muted-foreground border-black/[0.06]" : "text-white/35 border-white/10"
          }`}>
            Forschungszulage
          </span>
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#rechner"
            className={`hidden md:inline nav-link text-[13px] font-medium transition-colors duration-300 ${
              scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/40 hover:text-white/80"
            }`}
          >
            Förder-Rechner
          </a>
          <a
            href="#prozess"
            className={`hidden md:inline nav-link text-[13px] font-medium transition-colors duration-300 ${
              scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/40 hover:text-white/80"
            }`}
          >
            Ablauf
          </a>
          <a href="#kontakt" className="btn-primary !py-2.5 !px-6 !text-[13px] !rounded-lg">
            Ersteinschätzung
          </a>
        </div>
      </div>
    </nav>
  );
}
