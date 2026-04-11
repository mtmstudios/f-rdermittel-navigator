import { Building2, Clock, AlertTriangle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const cards = [
  {
    icon: Building2,
    title: "Falsches Bild von Forschung",
    text: "Viele Geschäftsführer denken bei Forschungszulage an Labore und Grundlagenforschung. In Wahrheit reicht systematische Produktentwicklung oder Softwareentwicklung.",
    num: "01",
  },
  {
    icon: Clock,
    title: "Keine Zeit, sich damit zu befassen",
    text: "Im Tagesgeschäft bleibt das Thema liegen. Der Steuerberater fokussiert sich auf die Steuererklärung — nicht auf Fördermöglichkeiten.",
    num: "02",
  },
  {
    icon: AlertTriangle,
    title: "Ein Antrag, eine Chance",
    text: "Projekte können nur einmal eingereicht werden. Ein falsch aufgesetzter Antrag bedeutet: Das Geld ist dauerhaft verloren.",
    num: "03",
  },
];

export default function ProblemSection() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center mb-14">
            <p className="eyebrow">DAS PROBLEM</p>
            <h2 className="text-2xl md:text-4xl font-bold max-w-3xl mx-auto">
              Die meisten Unternehmen verschenken Fördergeld — ohne es zu wissen.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((c, i) => (
              <div key={i} className="card-subtle group relative overflow-hidden">
                <span className="absolute top-4 right-4 text-5xl font-extrabold text-accent/5 group-hover:text-accent/10 transition-colors">{c.num}</span>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <c.icon className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-3">{c.title}</h3>
                <p className="body-text text-base">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
