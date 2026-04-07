import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  { num: "01", title: "Kostenlose Ersteinschätzung", text: "In einem kurzen Gespräch klären wir, ob Ihr Unternehmen grundsätzlich förderfähig ist. Auf Basis weniger Eckdaten erhalten Sie eine fundierte Einschätzung.", badge: "30 Minuten" },
  { num: "02", title: "Projektanalyse & Dokumentation", text: "Wir identifizieren alle förderfähigen Projekte in Ihrem Unternehmen und bereiten die Dokumentation prüfungssicher auf.", badge: "2–4 Wochen" },
  { num: "03", title: "Antragstellung", text: "Wir übernehmen den gesamten Antragsprozess — von der Bescheinigungsstelle bis zum Finanzamt.", badge: "4–8 Wochen" },
  { num: "04", title: "Auszahlung", text: "Nach Bewilligung wird die Forschungszulage direkt mit Ihrer Steuerschuld verrechnet oder ausgezahlt.", badge: "Ergebnis" },
];

export default function Process() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="eyebrow">SO LÄUFT ES AB</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            Von der Ersteinschätzung bis zur Auszahlung
          </h2>
          <p className="body-text mb-12">Sie konzentrieren sich auf Ihr Tagesgeschäft. Wir kümmern uns um den Rest.</p>

          <div className="max-w-2xl mx-auto relative">
            {/* timeline line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border hidden md:block" />

            <div className="space-y-10">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-6 items-start relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-accent bg-background flex items-center justify-center text-accent font-bold text-sm z-10">
                    {s.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                    <p className="body-text text-base mb-2">{s.text}</p>
                    <span className="inline-block text-xs font-medium bg-accent-light text-accent rounded-full px-3 py-1">
                      {s.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
