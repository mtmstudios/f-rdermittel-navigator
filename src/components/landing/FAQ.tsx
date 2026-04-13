import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "Ist die Forschungszulage nur für Großkonzerne oder High-Tech-Unternehmen?",
    a: "Nein. Die Forschungszulage richtet sich an alle steuerpflichtigen Unternehmen in Deutschland — unabhängig von Größe oder Branche. Sie brauchen kein Labor und keine Grundlagenforschung. Eigene Softwareentwicklung, technische Produktinnovationen oder neue Produktionsverfahren reichen aus.",
  },
  {
    q: "Was genau zählt als förderfähige Forschung und Entwicklung?",
    a: "Förderfähig ist jede systematische Entwicklung mit neuartigem Charakter — überall dort, wo technische Unsicherheiten überwunden und neue Lösungen erarbeitet werden. Das umfasst neue Produkte, verbesserte Verfahren, Softwareentwicklung und Prozessinnovationen.",
  },
  {
    q: "Was passiert, wenn ich den Antrag selbst stelle und er abgelehnt wird?",
    a: "Projekte können bei der Bescheinigungsstelle nur einmal eingereicht werden. Ein abgelehnter Antrag bedeutet, dass die Förderung für dieses Projekt dauerhaft verloren ist. Deshalb ist eine professionelle, prüfungssichere Antragstellung entscheidend.",
  },
  {
    q: "Muss ich Geschäftsgeheimnisse oder vertrauliche Informationen offenlegen?",
    a: "Nein. Wir erarbeiten die Antragsdokumentation so, dass Ihre Geschäftsgeheimnisse geschützt bleiben. Die technische Beschreibung fokussiert sich auf die förderfähigen Aspekte — nicht auf proprietäre Details Ihrer Entwicklung.",
  },
  {
    q: "Wie hoch ist der Aufwand für mein Unternehmen?",
    a: "Minimal. Wir benötigen zu Beginn ein kurzes Gespräch (ca. 30 Minuten) und einige Eckdaten zu Ihren Projekten. Die gesamte Dokumentation, Aufbereitung und Antragstellung übernehmen wir.",
  },
  {
    q: "Was kostet die Beratung?",
    a: "Die Ersteinschätzung ist kostenlos und unverbindlich. Unser Vergütungsmodell ist erfolgsbasiert — Sie zahlen nur, wenn Sie tatsächlich Förderung erhalten. Kein Erfolg, keine Kosten.",
  },
  {
    q: "Kann ich die Forschungszulage rückwirkend beantragen?",
    a: "Ja. Projekte der letzten drei Geschäftsjahre können in der Regel noch berücksichtigt werden — rückwirkend bis 2020.",
  },
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
                  style={{ maxHeight: open === i ? "300px" : "0" }}
                >
                  <p className="text-[14px] md:text-[15px] text-muted-foreground leading-[1.7] pb-6">{f.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after FAQ — objections handled, time to convert */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-[15px] md:text-[17px] text-muted-foreground mb-5">
              Noch unsicher? Lassen Sie sich unverbindlich beraten.
            </p>
            <a
              href="#rechner"
              className="btn-cta text-[14px] md:text-[15px] !py-4 !px-8"
            >
              Förderpotenzial berechnen
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
