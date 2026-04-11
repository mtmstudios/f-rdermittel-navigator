import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  { num: "01", title: "Ersteinschätzung", text: "In einem kurzen Gespräch klären wir, ob Ihr Unternehmen grundsätzlich förderfähig ist.", time: "30 Min." },
  { num: "02", title: "Projektanalyse", text: "Wir identifizieren alle förderfähigen Projekte und bereiten die Dokumentation prüfungssicher auf.", time: "2–4 Wochen" },
  { num: "03", title: "Antragstellung", text: "Wir übernehmen den gesamten Antragsprozess — von der Bescheinigungsstelle bis zum Finanzamt.", time: "4–8 Wochen" },
  { num: "04", title: "Auszahlung", text: "Die Forschungszulage wird mit Ihrer Steuerschuld verrechnet oder direkt ausgezahlt.", time: "Ergebnis" },
];

export default function Process() {
  const ref = useScrollAnimation();

  return (
    <section id="prozess" className="section-padding section-alt">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="max-w-[600px] mb-14">
            <p className="eyebrow">Ablauf</p>
            <h2 className="text-2xl md:text-[36px] font-bold leading-tight mb-4">
              Von der Ersteinschätzung bis zur Auszahlung
            </h2>
            <p className="body-text">
              Sie konzentrieren sich auf Ihr Tagesgeschäft. Wir kümmern uns um den Rest.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground block mb-3">{s.num}</span>
                <h3 className="text-[17px] font-bold mb-2">{s.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-3">{s.text}</p>
                <span className="text-[12px] font-semibold" style={{ color: "hsl(173 58% 39%)" }}>
                  {s.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
