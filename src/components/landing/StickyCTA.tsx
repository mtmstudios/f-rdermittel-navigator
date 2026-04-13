import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      // Show after scrolling past hero (500px) and hide near footer
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const nearBottom = scrollY + viewportHeight > pageHeight - 300;

      setVisible(scrollY > 500 && !nearBottom);
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-xl border-t border-black/[0.06] px-4 py-3 safe-area-pb">
        <a
          href="#kontakt"
          className="btn-cta w-full text-center block !py-3.5 !text-[15px] !rounded-xl"
        >
          Kostenlose Ersteinschätzung
        </a>
      </div>
    </div>
  );
}
