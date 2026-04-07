import { Building2, Clock, AlertTriangle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const cards = [
  {
    icon: Building2,
    title: "Falsches Bild von Forschung",
    text: "Viele Geschäftsführer denken bei Forschungszulage an Labore und Grundlagenforschung. In Wahrheit reicht systematische Produktentwicklung oder Softwareentwicklung.",
  },
  {
    icon: Clock,
    title: "Keine Zeit, sich damit zu befassen",
    text: "Im Tagesgeschäft bleibt das Thema liegen. Der Steuerberater fokussiert sich auf die Steuererklärung — nicht auf Fördermöglichkeiten.",
  },
  {
    icon: AlertTriangle,
    title: "Ein Antrag, eine Chance",
    text: "Projekte können nur einmal eingereicht werden. Ein falsch aufgesetzter Antrag bedeutet: Das Geld ist dauerhaft verloren.",
  },
];

export default function ProblemSection() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="eyebrow">DAS PROBLEM</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-10 max-w-3xl">
            Die meisten Unternehmen verschenken Fördergeld — ohne es zu wissen.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((c, i) => (
              <div key={i} className="card-subtle">
                <c.icon className="text-accent mb-4" size={28} />
                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <p className="body-text text-base">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
