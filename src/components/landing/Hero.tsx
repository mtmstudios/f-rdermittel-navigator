import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CalculatorCard from "./CalculatorCard";

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
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[800px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, #307abe 0%, transparent 70%)" }}
      />

      <div className="relative pt-24 pb-8 md:pt-36 md:pb-16">
        <div className="container-main" ref={ref}>
          <div className="fade-in-up">
            {/* ─── Text Block ─── */}
            <div className="text-center max-w-[800px] mx-auto mb-8 md:mb-12">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50 mb-5 md:mb-8">
                PCA Partners &middot; Wirtschaftsprüfungsgesellschaft
              </p>

              <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-extrabold leading-[1.05] mb-4 md:mb-6 text-white tracking-[-0.03em]">
                Forschungszulage
                <br />
                <span className="bg-gradient-to-r from-[#57a7dd] to-[#307abe] bg-clip-text text-transparent">
                  für den Mittelstand
                </span>
              </h1>

              <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white/50 max-w-[520px] mx-auto leading-[1.7] font-light px-2">
                Bis zu 35 % Ihrer Entwicklungskosten zurück — rückwirkend bis 2020. Berechnen Sie jetzt Ihr Förderpotenzial.
              </p>
            </div>

            {/* ─── Calculator Card ─── */}
            <div className="max-w-[620px] mx-auto mb-8 md:mb-12">
              <CalculatorCard />
            </div>

            {/* ─── Trust Signals ─── */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-x-8 text-[12px] sm:text-[13px] text-white/35 font-medium pb-4">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                98 % Bewilligungsquote
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                500+ geprüfte Projekte
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                Erfolgsbasiertes Honorar
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="relative pb-6 md:pb-10">
        <p className="text-center text-[10px] text-white/15 max-w-sm mx-auto leading-relaxed px-4">
          Unverbindliche Erstschätzung. Keine Steuerberatung. Das tatsächliche Förderpotenzial hängt von der individuellen Prüfung ab.
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
    </section>
  );
}
