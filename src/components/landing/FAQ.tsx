import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Ist die Forschungszulage nur für Großkonzerne oder High-Tech-Unternehmen?",
    a: "Nein. Es muss kein High-Tech-Unternehmen und kein Großkonzern sein. Wenn Sie ein Produkt oder eine Lösung entwickeln, die es so noch nicht auf dem Markt gibt — Software, Produktinnovationen, neue Verfahren — sind Sie grundsätzlich förderfähig. Gerade mittelständische Unternehmen schließen sich hier oft selbst aus, obwohl sie genau diese Art von Arbeit leisten.",
  },
  {
    q: "Was genau zählt als förderfähige Forschung und Entwicklung?",
    a: "Gefördert werden Projekte, bei denen technische Unsicherheiten überwunden und neue Lösungen erarbeitet werden. Das kann Softwareentwicklung betreffen, Produktinnovationen oder neue Verfahren im Produktionsprozess. Entscheidend ist der neuartige Charakter — keine Grundlagenforschung, keine Labore nötig.",
  },
  {
    q: "Was passiert, wenn ich den Antrag selbst stelle und er abgelehnt wird?",
    a: "Man hat nur einmal die Möglichkeit, den Antrag zu stellen — ein klassischer One-Shot-Ansatz. Wird der Antrag abgelehnt, hat man keine weitere Möglichkeit, diese Projekte fördern zu lassen. Eigenanträge entsprechen oft nicht der Qualität, die für eine Bewilligung nötig ist. Deshalb übernehmen wir die komplette Antragstellung.",
  },
  {
    q: "Muss ich Geschäftsgeheimnisse oder vertrauliche Informationen offenlegen?",
    a: "Viele Unternehmen haben Bedenken, dass sie Geschäftsgeheimnisse oder Trade Secrets preisgeben müssen. Wir erarbeiten die Antragsdokumentation so, dass Ihre vertraulichen Informationen geschützt bleiben. Die Beschreibung fokussiert sich auf die förderfähigen Aspekte — nicht auf proprietäre Details.",
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
    a: "Ja. Projekte der letzten vier Geschäftsjahre können in der Regel noch berücksichtigt werden — bis zu vier Jahre rückwirkend.",
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

        </div>
      </div>
    </section>
  );
}
