import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Hero() {
  const ref = useScrollAnimation();

  return (
    <section className="pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="container-main text-center" ref={ref}>
        <div className="fade-in-up visible">
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-primary border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            Für Unternehmen mit eigener Entwicklung
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-2">
            Forschungszulage für den Mittelstand
          </h1>
          <p className="text-3xl md:text-5xl font-extrabold leading-tight text-accent mb-6">
            Bis zu 35% Ihrer Entwicklungskosten zurück.
          </p>

          <p className="body-text max-w-[640px] mx-auto mb-8">
            Viele Unternehmen entwickeln Produkte, Software oder Verfahren — ohne zu wissen, dass ihnen dafür eine gesetzliche Erstattung zusteht. Wir prüfen kostenlos, ob sich ein Antrag für Sie lohnt.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a href="#kontakt" className="btn-primary w-full sm:w-auto">
              Kostenlose Ersteinschätzung →
            </a>
            <a href="#rechner" className="btn-ghost w-full sm:w-auto">
              So funktioniert's ↓
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <span>✓ Kostenlos</span>
            <span>✓ Unverbindlich</span>
            <span>✓ Durch erfahrene Wirtschaftsprüfer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
