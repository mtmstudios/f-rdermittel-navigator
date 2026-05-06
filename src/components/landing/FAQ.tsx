import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Welche Art von Unternehmen ist förderfähig?",
    a: "Jedes Unternehmen, das Produkte, Software oder Verfahren entwickelt, die es so noch nicht gibt. Branche und Größe spielen keine Rolle — vom 10-Mann-Betrieb bis zum Konzern. Entscheidend ist, dass technische Herausforderungen gelöst werden.",
  },
  {
    q: "Was genau zählt als förderfähige Entwicklung?",
    a: "Projekte, bei denen technische Unsicherheiten überwunden werden: neue Softwaremodule, Produktverbesserungen, optimierte Fertigungsprozesse. Es muss keine Grundlagenforschung sein — angewandte Entwicklungsarbeit reicht.",
  },
  {
    q: "Was passiert, wenn der Antrag abgelehnt wird?",
    a: "Dann ist er für diese Projekte endgültig abgelehnt. Es gibt keinen zweiten Versuch. Genau deshalb setzen wir jeden Antrag auf dem Qualitätsniveau einer Wirtschaftsprüfung auf — nicht auf Beraterniveau.",
  },
  {
    q: "Muss ich vertrauliche Informationen offenlegen?",
    a: "Nein. Wir dokumentieren die förderfähigen Aspekte Ihrer Projekte, ohne proprietäre Details oder Geschäftsgeheimnisse preiszugeben. Das ist Teil unserer Expertise.",
  },
  {
    q: "Wie viel Zeit muss ich investieren?",
    a: "Ein Erstgespräch von ca. 30 Minuten und einige Eckdaten zu Ihren Projekten. Den Rest — Dokumentation, Aufbereitung, Einreichung — übernehmen wir komplett.",
  },
  {
    q: "Welche Kosten entstehen bei der Erstprüfung?",
    a: "Für die Erstprüfung berechnen wir eine einmalige Gebühr von 2.000 €. Danach arbeiten wir überwiegend erfolgsabhängig — der Großteil unseres Honorars fällt nur an, wenn die Förderung tatsächlich bewilligt wird.",
  },
  {
    q: "Was kostet das insgesamt?",
    a: "Die telefonische Ersteinschätzung ist kostenlos. Für die anschließende Erstprüfung fällt eine einmalige Gebühr von 2.000 € an. Das eigentliche Honorar ist überwiegend erfolgsabhängig.",
  },
  {
    q: "Für welchen Zeitraum gilt die Forschungszulage?",
    a: "Die Forschungszulage gilt für insgesamt 8 Jahre. Davon können bis zu 4 Jahre rückwirkend geltend gemacht werden — Projekte aus den letzten vier Geschäftsjahren lassen sich also noch einreichen. Das ist oft der größte Hebel.",
  },
];

export default function FAQ() {
  const ref = useScrollAnimation();
  const staggerRef = useStaggerAnimation();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding section-alt">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <p className="eyebrow">Häufige Fragen</p>
            <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] tracking-[-0.02em]">
              Ist mein Unternehmen förderfähig?
            </h2>
          </div>

          <div ref={staggerRef} className="stagger-children max-w-[740px] mx-auto">
            {faqs.map((f, i) => (
              <div key={i} className={`border-b border-border ${i === 0 ? "border-t" : ""}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left gap-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#307abe] focus-visible:ring-offset-2 rounded-sm"
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-[15px] md:text-[16px] font-semibold tracking-[-0.01em]">{f.q}</span>
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
                  style={{ maxHeight: open === i ? "500px" : "0" }}
                >
                  <p className="text-[14px] md:text-[15px] text-muted-foreground leading-[1.7] pb-6">{f.a}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
