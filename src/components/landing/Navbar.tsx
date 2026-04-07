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
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16">
        <a href="/" className="text-xl font-bold text-primary">
          factonet
        </a>
        <a href="#kontakt" className="btn-primary !py-2.5 !px-5 !text-sm">
          Kostenlose Ersteinschätzung
        </a>
      </div>
    </nav>
  );
}
