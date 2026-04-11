import { Shield, Target, Users, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const points = [
  { icon: Shield, title: "Prüfungssichere Dokumentation", text: "Aufgebaut aus der Perspektive einer Betriebsprüfung — damit Ihre Förderung auch bei Rückfragen Bestand hat." },
  { icon: Target, title: "Erfolgsbasiertes Modell", text: "Unser Honorar orientiert sich am tatsächlichen Ergebnis. Kein Erfolg, keine Kosten." },
  { icon: Users, title: "Persönliche Betreuung", text: "Ein fester Ansprechpartner für Ihr gesamtes Projekt — kein Callcenter, keine wechselnden Kontakte." },
  { icon: TrendingUp, title: "Ganzheitlicher Ansatz", text: "Von der Ersteinschätzung über die Antragstellung bis zur Auszahlung — alles aus einer Hand." },
];

export default function WhyUs() {
  const ref = useScrollAnimation();

  return (
    <section
      className="section-padding dark-section"
      style={{
        background: "linear-gradient(135deg, hsl(220 35% 12%) 0%, hsl(220 30% 20%) 100%)",
      }}
    >
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center mb-14">
            <p className="eyebrow">WARUM WIR</p>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              Wirtschaftsprüfer. Nicht nur Berater.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {points.map((p, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/8 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                  <p.icon className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-base text-white/50 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
