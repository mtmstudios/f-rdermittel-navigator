import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const ref = useScrollAnimation();
  const glowRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMouse({ x, y });
    };
    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handler, { passive: true });
      return () => window.removeEventListener("mousemove", handler);
    }
  }, []);

  return (
    <section
      className="dark-section relative grain overflow-hidden"
      style={{
        background: "linear-gradient(170deg, #0a1628 0%, #0d1b30 40%, #0f1f38 100%)",
      }}
    >
      {/* Parallax radial glow — follows mouse on desktop */}
      <div
        ref={glowRef}
        className="absolute top-0 left-1/2 w-[600px] md:w-[800px] h-[500px] md:h-[600px] opacity-[0.07] pointer-events-none transition-transform duration-[800ms] ease-out"
        style={{
          background: "radial-gradient(ellipse at center, #307abe 0%, transparent 70%)",
          transform: `translate(calc(-50% + ${mouse.x}px), ${mouse.y}px)`,
        }}
      />

      <div className="relative pt-28 pb-36 md:pt-44 md:pb-44">
        <div className="container-main" ref={ref}>
          <div className="fade-in-up max-w-[800px] mx-auto text-center">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50 mb-6 md:mb-10">
              PCA Partners &middot; Wirtschaftsprüfungsgesellschaft
            </p>

            <h1 className="text-[27px] sm:text-[42px] md:text-[60px] font-extrabold leading-[1.08] mb-5 md:mb-7 text-white tracking-[-0.03em]">
              Bis zu 35 % Ihrer
              <br />
              Entwicklungskosten
              <br />
              <span className="bg-gradient-to-r from-[#57a7dd] to-[#307abe] bg-clip-text text-transparent">
                zurückholen.
              </span>
            </h1>

            <p className="text-[15px] sm:text-[17px] md:text-[20px] text-white/55 max-w-[560px] mx-auto mb-8 md:mb-12 leading-[1.7] font-light px-2">
              Ihr Unternehmen entwickelt Software, Produkte oder Produktionsverfahren?
              Dann könnte Ihnen die gesetzliche Forschungszulage zustehen — bis zu 1 Mio. € pro Jahr.
              <span className="block mt-2 text-white/40">Rückwirkend für 4 Geschäftsjahre. Kostenlose Ersteinschätzung.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-14 px-4 sm:px-0">
              <a href="#rechner" className="btn-cta w-full sm:w-auto text-[15px] sm:text-[16px] !py-4 sm:!py-[18px] !px-8 sm:!px-10">
                Förderung einschätzen lassen
              </a>
            </div>

            {/* Trust Signals — prominent */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-x-8 text-[12px] sm:text-[13px] text-white/60 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Wirtschaftsprüfer-Qualität
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Erfolgsbasiertes Honorar
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Ersteinschätzung in 30 Min.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade — extended for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background)/0.6)] to-transparent" />
    </section>
  );
}
