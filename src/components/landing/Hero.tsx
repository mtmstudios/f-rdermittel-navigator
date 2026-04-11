import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Hero() {
  const ref = useScrollAnimation();

  return (
    <section
      className="dark-section relative"
      style={{
        background: "linear-gradient(170deg, #0a0909 0%, #141414 100%)",
      }}
    >
      <div className="relative pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-main text-center" ref={ref}>
          <div className="fade-in-up visible max-w-[760px] mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-8">
              PCA Partners &middot; Wirtschaftsprüfer
            </p>

            <h1 className="text-4xl md:text-[56px] font-extrabold leading-[1.08] mb-6 text-white">
              Forschungszulage für
              <br />
              den deutschen Mittelstand
            </h1>

            <p className="text-xl md:text-2xl font-semibold mb-8" style={{ color: "#57a7dd" }}>
              Bis zu 35 % Ihrer Entwicklungskosten zurück.
            </p>

            <p className="text-[17px] text-white/60 max-w-[560px] mx-auto mb-12 leading-[1.7]">
              Die Forschungszulage ist ein gesetzlicher Anspruch — kein Förderprogramm.
              Wir prüfen kostenlos, ob Ihr Unternehmen berechtigt ist.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a href="#kontakt" className="btn-cta w-full sm:w-auto">
                Kostenlose Ersteinschätzung
              </a>
              <a href="#rechner" className="btn-outline-light w-full sm:w-auto">
                Förderpotenzial berechnen
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[13px] text-white/50">
              <span>Kostenlos &amp; unverbindlich</span>
              <span className="hidden sm:inline text-white/15">|</span>
              <span>98 % Bewilligungsquote</span>
              <span className="hidden sm:inline text-white/15">|</span>
              <span>Rückwirkend bis 3 Jahre</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
