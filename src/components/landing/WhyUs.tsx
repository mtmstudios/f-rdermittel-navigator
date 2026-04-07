import { Shield, Target, Users, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const points = [
  { icon: Shield, text: "Prüfungssichere Dokumentation — aufgebaut aus der Perspektive einer Betriebsprüfung." },
  { icon: Target, text: "Erfolgsbasiertes Modell — unser Honorar orientiert sich am tatsächlichen Ergebnis." },
  { icon: Users, text: "Persönliche Betreuung — ein fester Ansprechpartner für Ihr gesamtes Projekt." },
  { icon: TrendingUp, text: "Ganzheitlicher Ansatz — von der Ersteinschätzung über die Antragstellung bis zur Auszahlung." },
];

export default function WhyUs() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <p className="text-xs font-medium uppercase tracking-widest text-accent mb-3">WARUM WIR</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-10">
            Wirtschaftsprüfer. Nicht nur Berater.
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {points.map((p, i) => (
              <div key={i} className="flex gap-4 items-start">
                <p.icon className="text-accent flex-shrink-0 mt-1" size={24} />
                <p className="text-base leading-relaxed opacity-90">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
