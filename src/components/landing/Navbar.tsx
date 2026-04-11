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
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16">
        <a href="/" className={`text-xl font-extrabold tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
          facto<span className="text-accent">net</span>
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#rechner"
            className={`hidden sm:inline text-sm font-medium transition-colors ${scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Förder-Rechner
          </a>
          <a
            href="#kontakt"
            className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg"
          >
            Kostenlose Ersteinschätzung
          </a>
        </div>
      </div>
    </nav>
  );
}
