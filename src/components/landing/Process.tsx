import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";
import { ArrowRight, Phone, FileSearch, Send, BadgeEuro } from "lucide-react";

const steps = [
  { icon: Phone, title: "Ersteinschätzung", text: "In einem kurzen Gespräch klären wir, ob Ihr Unternehmen grundsätzlich förderfähig ist.", time: "30 Min." },
  { icon: FileSearch, title: "Projektanalyse", text: "Wir identifizieren alle förderfähigen Projekte und bereiten die Dokumentation prüfungssicher auf.", time: "2–4 Wochen" },
  { icon: Send, title: "Antragstellung", text: "Wir übernehmen den gesamten Antragsprozess — von der Bescheinigungsstelle bis zum Finanzamt.", time: "4–8 Wochen" },
  { icon: BadgeEuro, title: "Auszahlung", text: "Die Forschungszulage wird mit Ihrer Steuerschuld verrechnet oder direkt ausgezahlt.", time: "Ergebnis" },
];

export default function Process() {
  const ref = useScrollAnimation();
  const staggerRef = useStaggerAnimation();

  return (
    <section id="prozess" className="section-padding section-alt">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center max-w-[600px] mx-auto mb-12 md:mb-16">
            <p className="eyebrow">Ablauf</p>
            <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] mb-5 tracking-[-0.02em]">
              Von der Ersteinschätzung bis zur Auszahlung
            </h2>
            <p className="body-text">
              Sie konzentrieren sich auf Ihr Tagesgeschäft. Wir kümmern uns um den Rest.
            </p>
          </div>

          <div ref={staggerRef} className="stagger-children grid md:grid-cols-4 gap-0 max-w-[960px] mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="relative px-5 md:px-6 pb-10 md:pb-0 text-center">
                {/* Connector line — horizontal on desktop, vertical on mobile */}
                {i < steps.length - 1 && (
                  <>
                    <div className="hidden md:block absolute top-[22px] left-[calc(50%+24px)] right-0 h-px bg-gradient-to-r from-[#307abe]/20 to-border/50" />
                    <div className="md:hidden absolute left-1/2 top-[44px] w-px h-[calc(100%-44px)] bg-gradient-to-b from-[#307abe]/15 to-transparent" />
                  </>
                )}

                {/* Step icon circle */}
                <div className="w-11 h-11 rounded-full bg-[#307abe]/[0.08] border border-[#307abe]/20 flex items-center justify-center mb-5 relative z-10 mx-auto"
                  style={{ boxShadow: "0 0 20px rgba(48,122,190,0.08)" }}>
                  <s.icon size={18} className="text-[#307abe]" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#307abe]/60 mb-2 block">
                  Schritt {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] font-bold mb-2 tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[13px] md:text-[14px] text-muted-foreground leading-[1.7] mb-3">{s.text}</p>
                <span className="inline-block text-[12px] font-semibold text-[#307abe] bg-[#307abe]/[0.06] px-3 py-1 rounded-full">
                  {s.time}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 md:mt-16">
            <a
              href="#rechner"
              className="btn-cta text-[13px] sm:text-[14px] md:text-[15px] !py-4 !px-8"
            >
              Kostenlose Ersteinschätzung anfordern
              <ArrowRight size={16} className="ml-2" />
            </a>
            <p className="text-[12px] text-muted-foreground mt-3">30 Minuten · unverbindlich · erfolgsbasiert</p>
          </div>
        </div>
      </div>
    </section>
  );
}
