import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Hero() {
  const ref = useScrollAnimation();

  return (
    <section
      className="dark-section relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(220 35% 12%) 0%, hsl(220 30% 20%) 50%, hsl(210 28% 18%) 100%)",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(168 80% 36%) 0%, transparent 70%)" }}
      />

      <div className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-main text-center" ref={ref}>
          <div className="fade-in-up visible">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Für Unternehmen mit eigener Entwicklung
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-3 text-white">
              Forschungszulage
              <br />
              für den Mittelstand
            </h1>
            <p className="text-3xl md:text-5xl font-extrabold leading-tight text-gradient mb-8">
              Bis zu 35 % Ihrer Entwicklungskosten zurück.
            </p>

            <p className="text-lg md:text-xl text-white/60 max-w-[640px] mx-auto mb-10 leading-relaxed">
              Viele Unternehmen entwickeln Produkte, Software oder Verfahren — ohne zu wissen,
              dass ihnen dafür eine gesetzliche Erstattung zusteht. Wir prüfen kostenlos,
              ob sich ein Antrag für Sie lohnt.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="#kontakt" className="btn-primary w-full sm:w-auto text-lg !py-4 !px-10">
                Kostenlose Ersteinschätzung →
              </a>
              <a href="#rechner" className="btn-ghost w-full sm:w-auto">
                Förder-Rechner ausprobieren ↓
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Kostenlos
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Unverbindlich
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Durch erfahrene Wirtschaftsprüfer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V20C240 5 480 0 720 10C960 20 1200 35 1440 20V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
