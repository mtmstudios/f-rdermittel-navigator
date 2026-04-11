import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, Search, FileCheck, Banknote } from "lucide-react";

const steps = [
  { icon: MessageSquare, num: "01", title: "Kostenlose Ersteinschätzung", text: "In einem kurzen Gespräch klären wir, ob Ihr Unternehmen grundsätzlich förderfähig ist.", badge: "30 Minuten", color: "bg-accent" },
  { icon: Search, num: "02", title: "Projektanalyse & Dokumentation", text: "Wir identifizieren alle förderfähigen Projekte und bereiten die Dokumentation prüfungssicher auf.", badge: "2–4 Wochen", color: "bg-blue-500" },
  { icon: FileCheck, num: "03", title: "Antragstellung", text: "Wir übernehmen den gesamten Antragsprozess — von der Bescheinigungsstelle bis zum Finanzamt.", badge: "4–8 Wochen", color: "bg-violet-500" },
  { icon: Banknote, num: "04", title: "Auszahlung", text: "Die Forschungszulage wird direkt mit Ihrer Steuerschuld verrechnet oder ausgezahlt.", badge: "Ergebnis", color: "bg-green-500" },
];

export default function Process() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center mb-14">
            <p className="eyebrow">SO LÄUFT ES AB</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Von der Ersteinschätzung bis zur Auszahlung
            </h2>
            <p className="body-text">Sie konzentrieren sich auf Ihr Tagesgeschäft. Wir kümmern uns um den Rest.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-[1000px] mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-border" />
                )}
                <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <s.icon className="text-white" size={28} />
                </div>
                <span className="text-xs font-bold text-accent mb-2 block">{s.num}</span>
                <h3 className="text-base font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{s.text}</p>
                <span className="inline-block text-xs font-semibold bg-accent/10 text-accent rounded-full px-3 py-1">
                  {s.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
