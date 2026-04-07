import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Plus, X } from "lucide-react";

const faqs = [
  { q: "Ist die Forschungszulage nur für große Konzerne?", a: "Nein. Die Forschungszulage richtet sich ausdrücklich an alle Unternehmen in Deutschland — unabhängig von Größe oder Branche. Gerade mittelständische Unternehmen mit eigener Produktentwicklung, Softwareentwicklung oder Verfahrensinnovation sind häufig förderfähig, ohne es zu wissen." },
  { q: "Was genau zählt als förderfähige Forschung und Entwicklung?", a: "Es geht nicht um Grundlagenforschung oder Labore. Förderfähig ist die systematische Entwicklung neuer oder verbesserter Produkte, Verfahren oder Software — überall dort, wo technische Unsicherheiten überwunden und neue Lösungen erarbeitet werden." },
  { q: "Wie hoch ist der Aufwand für mein Unternehmen?", a: "Minimal. Wir benötigen zu Beginn einige Eckdaten und ein kurzes Gespräch über Ihre Projekte. Die gesamte Dokumentation, Aufbereitung und Antragstellung übernehmen wir. Sie müssen kein Förderexperte werden." },
  { q: "Was passiert, wenn der Antrag abgelehnt wird?", a: "Ein Projekt kann in der Regel nur einmal eingereicht werden. Deshalb ist es entscheidend, von Anfang an professionell vorzugehen. Als Wirtschaftsprüfer setzen wir jeden Antrag so auf, dass er einer Betriebsprüfung standhält." },
  { q: "Was kostet die Beratung?", a: "Die Ersteinschätzung ist vollständig kostenlos und unverbindlich. Unser Vergütungsmodell orientiert sich maßgeblich am tatsächlichen Erfolg — Sie zahlen nur, wenn Sie auch tatsächlich Förderung erhalten." },
  { q: "Kann ich die Forschungszulage rückwirkend beantragen?", a: "Ja. Projekte der letzten 3 Geschäftsjahre können in der Regel noch berücksichtigt werden. Das bedeutet: Auch wenn Sie das Thema bisher nicht auf dem Schirm hatten, kann sich eine Prüfung für vergangene Jahre lohnen." },
];

export default function FAQ() {
  const ref = useScrollAnimation();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-alt section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="eyebrow">HÄUFIGE FRAGEN</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-10">
            Das werden wir am häufigsten gefragt
          </h2>

          <div className="max-w-[800px] mx-auto">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-base">{f.q}</span>
                  {open === i ? <X size={18} className="text-muted-foreground flex-shrink-0" /> : <Plus size={18} className="text-muted-foreground flex-shrink-0" />}
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open === i ? "300px" : "0" }}
                >
                  <p className="body-text text-base pb-5">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
