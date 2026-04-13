import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import VideoPlayer from "./VideoPlayer";

export default function Hero() {
  const ref = useScrollAnimation();

  return (
    <section
      className="dark-section relative grain overflow-hidden"
      style={{
        background: "linear-gradient(170deg, #050505 0%, #0d0d0f 40%, #0f1118 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[500px] md:h-[600px] opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, #307abe 0%, transparent 70%)" }}
      />

      <div className="relative pt-28 pb-12 md:pt-44 md:pb-20">
        <div className="container-main" ref={ref}>
          <div className="fade-in-up max-w-[800px] mx-auto text-center">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50 mb-6 md:mb-10">
              PCA Partners &middot; Wirtschaftsprüfungsgesellschaft
            </p>

            <h1 className="text-[32px] sm:text-[44px] md:text-[64px] font-extrabold leading-[1.05] mb-5 md:mb-7 text-white tracking-[-0.03em]">
              Forschungszulage
              <br />
              <span className="bg-gradient-to-r from-[#57a7dd] to-[#307abe] bg-clip-text text-transparent">
                für den Mittelstand
              </span>
            </h1>

            <p className="text-[16px] sm:text-[18px] md:text-[21px] text-white/55 max-w-[580px] mx-auto mb-8 md:mb-12 leading-[1.7] font-light px-2">
              Bis zu 35 % Ihrer Entwicklungskosten zurück — rückwirkend bis 2020.
              Kostenlose Ersteinschätzung durch erfahrene Wirtschaftsprüfer.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-14 px-4 sm:px-0">
              <a href="#rechner" className="btn-cta w-full sm:w-auto text-[15px] sm:text-[16px] !py-4 sm:!py-[18px] !px-8 sm:!px-10">
                Förderpotenzial berechnen
              </a>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-x-8 text-[12px] sm:text-[13px] text-white/40 font-medium mb-12 md:mb-16">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                98 % Bewilligungsquote
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                500+ geprüfte Projekte
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                Erfolgsbasiertes Honorar
              </span>
            </div>

            {/* Short Pitch Video (1:15) */}
            <div className="max-w-[680px] mx-auto glow-blue">
              <VideoPlayer
                label="Kurzvorstellung ansehen"
                duration="1:15 Min."
                variant="dark"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
    </section>
  );
}
