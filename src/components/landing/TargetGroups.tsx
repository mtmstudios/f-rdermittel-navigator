import { Code2, Cog, Cpu, FlaskConical, Car, Package } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const groups = [
  { icon: Code2, title: "Software-Entwicklung", text: "Eigene Tools, Plattformen, Apps oder Algorithmen entwickelt? Häufig förderfähig." },
  { icon: Cog, title: "Maschinenbau & Produktion", text: "Neue Fertigungsverfahren, Anlagen oder Werkzeuge? Typischer Förderfall." },
  { icon: Cpu, title: "IT-Dienstleistungen", text: "Kundenspezifische Systeme, Integrationen oder Datenbank-Architekturen." },
  { icon: FlaskConical, title: "Chemie & Pharma", text: "Neue Rezepturen, Wirkstoffe oder Verfahren in der Produktion." },
  { icon: Car, title: "Automotive & Zulieferer", text: "Komponenten, Materialien oder Testverfahren weiterentwickelt." },
  { icon: Package, title: "Produktinnovation", text: "Bestehende Produkte verbessert oder neue entwickelt — branchenübergreifend." },
];

export default function TargetGroups() {
  const ref = useScrollAnimation();

  return (
    <section className="section-alt section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center mb-12">
            <p className="eyebrow">ZIELGRUPPEN</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Sie müssen kein Labor haben.<br />Sie müssen Probleme lösen.
            </h2>
            <p className="body-text max-w-2xl mx-auto">
              Die Forschungszulage gilt für alle Unternehmen, die systematisch entwickeln, verbessern oder innovieren.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.map((g, i) => (
              <div key={i} className="card-subtle flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <g.icon className="text-accent" size={22} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
