import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Ist die Forschungszulage nur für große Konzerne?", a: "Nein. Die Forschungszulage richtet sich an alle steuerpflichtigen Unternehmen in Deutschland — unabhängig von Größe oder Branche. Gerade mittelständische Unternehmen mit eigener Produktentwicklung sind häufig förderfähig." },
  { q: "Was zählt als förderfähige Forschung und Entwicklung?", a: "Förderfähig ist die systematische Entwicklung neuer oder verbesserter Produkte, Verfahren oder Software — überall dort, wo technische Unsicherheiten überwunden und neue Lösungen erarbeitet werden. Es muss kein Labor involviert sein." },
  { q: "Wie hoch ist der Aufwand für mein Unternehmen?", a: "Minimal. Wir benötigen zu Beginn einige Eckdaten und ein kurzes Gespräch über Ihre Projekte. Die gesamte Dokumentation, Aufbereitung und Antragstellung übernehmen wir." },
  { q: "Was passiert, wenn der Antrag abgelehnt wird?", a: "Ein Projekt kann nur einmal eingereicht werden. Deshalb setzen wir jeden Antrag von Anfang an so auf, dass er einer Betriebsprüfung standhält. Unsere Bewilligungsquote liegt bei 98 %." },
  { q: "Was kostet die Beratung?", a: "Die Ersteinschätzung ist kostenlos und unverbindlich. Unser Vergütungsmodell ist erfolgsbasiert — Sie zahlen nur, wenn Sie tatsächlich Förderung erhalten." },
  { q: "Kann ich die Forschungszulage rückwirkend beantragen?", a: "Ja. Projekte der letzten drei Geschäftsjahre können in der Regel noch berücksichtigt werden." },
];

export default function FAQ() {
  const ref = useScrollAnimation();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding section-alt">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <p className="eyebrow">Häufige Fragen</p>
            <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] tracking-[-0.02em]">
              Was Sie wissen sollten
            </h2>
          </div>

          <div className="max-w-[740px] mx-auto">
            {faqs.map((f, i) => (
              <div key={i} className={`border-b border-border ${i === 0 ? "border-t" : ""}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left gap-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#307abe] focus-visible:ring-offset-2 rounded-sm"
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-[16px] font-semibold tracking-[-0.01em]">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open === i ? "300px" : "0" }}
                >
                  <p className="text-[15px] text-muted-foreground leading-[1.7] pb-6">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
