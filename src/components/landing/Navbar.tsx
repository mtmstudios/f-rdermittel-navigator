import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const PCA_LOGO_COLOR = "/pca-logo-color.svg";
const PCA_LOGO_WHITE = "/pca-logo-white.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div className="container-main flex items-center justify-between h-[72px]">
        <a href="/" className="flex items-center">
          <img
            src={scrolled ? PCA_LOGO_COLOR : PCA_LOGO_WHITE}
            alt="PCA Partners"
            className="h-7 transition-all duration-500"
          />
        </a>

        {/* Desktop nav + CTA */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#rechner"
            className={`nav-link text-[13px] font-medium transition-colors duration-300 ${
              scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/40 hover:text-white/80"
            }`}
          >
            Förder-Rechner
          </a>
          <a
            href="#prozess"
            className={`nav-link text-[13px] font-medium transition-colors duration-300 ${
              scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/40 hover:text-white/80"
            }`}
          >
            Ablauf
          </a>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-form"));
            }}
            className={`btn-shimmer flex items-center gap-1.5 text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 cursor-pointer ${
              scrolled
                ? "bg-[#307abe] text-white shadow-sm hover:bg-[#2968a3]"
                : "bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm hover:bg-white/15"
            }`}
          >
            Erstgespräch vereinbaren
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile CTA */}
        <a
          href="#rechner"
          className={`md:hidden flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
            scrolled
              ? "bg-[#307abe] text-white shadow-sm"
              : "bg-white/10 text-white/80 border border-white/15 backdrop-blur-sm"
          }`}
        >
          Berechnen
          <ArrowRight size={13} />
        </a>
      </div>
    </nav>
  );
}
