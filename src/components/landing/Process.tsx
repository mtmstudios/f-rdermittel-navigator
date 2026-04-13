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
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <p className="eyebrow">Ablauf</p>
            <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] mb-5 tracking-[-0.02em]">
              Von der Ersteinschätzung bis zur Auszahlung
            </h2>
            <p className="body-text">
              Sie konzentrieren sich auf Ihr Tagesgeschäft. Wir kümmern uns um den Rest.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-0">
            {steps.map((s, i) => (
              <div key={i} className="relative px-6 pb-10 md:pb-0 text-center md:text-left">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[18px] left-[calc(50%+20px)] right-0 h-px bg-border" />
                )}

                {/* Step number circle */}
                <div className="w-9 h-9 rounded-full bg-white border-2 border-[#307abe] flex items-center justify-center mb-5 relative z-10 mx-auto md:mx-0">
                  <span className="text-[12px] font-bold text-[#307abe]">{s.num}</span>
                </div>

                <h3 className="text-[17px] font-bold mb-2 tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-[1.7] mb-3">{s.text}</p>
                <span className="inline-block text-[12px] font-semibold text-[#307abe] bg-[#307abe]/[0.06] px-3 py-1 rounded-full">
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
