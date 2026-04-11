import { useEffect, useState } from "react";

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
          ? "bg-white/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between h-[60px]">
        <a href="/" className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
          factonet
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#rechner"
            className={`hidden sm:inline text-[13px] font-medium transition-colors ${scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/50 hover:text-white"}`}
          >
            Förder-Rechner
          </a>
          <a
            href="#prozess"
            className={`hidden sm:inline text-[13px] font-medium transition-colors ${scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/50 hover:text-white"}`}
          >
            Ablauf
          </a>
          <a
            href="#kontakt"
            className="btn-primary !py-2 !px-5 !text-[13px]"
          >
            Ersteinschätzung anfragen
          </a>
        </div>
      </div>
    </nav>
  );
}
