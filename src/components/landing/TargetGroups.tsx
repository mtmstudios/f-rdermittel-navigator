import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code, Cog, FlaskConical, Car, HeartPulse, Lightbulb } from "lucide-react";

const groups = [
  { icon: Code, title: "Software & IT", text: "Eigene Tools, Plattformen, Apps oder Algorithmen." },
  { icon: Cog, title: "Maschinenbau & Produktion", text: "Neue Fertigungsverfahren, Anlagen oder Werkzeuge." },
  { icon: FlaskConical, title: "Chemie & Pharma", text: "Neue Rezepturen, Wirkstoffe oder Produktionsverfahren." },
  { icon: Car, title: "Automotive & Zulieferer", text: "Komponenten, Materialien oder Testverfahren." },
  { icon: HeartPulse, title: "Medizintechnik", text: "Geräte, Implantate oder diagnostische Verfahren." },
  { icon: Lightbulb, title: "Produktinnovation", text: "Bestehende Produkte verbessert oder neue entwickelt." },
];

export default function TargetGroups() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <p className="eyebrow">Branchen</p>
            <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] mb-5 tracking-[-0.02em]">
              Sie müssen kein Labor haben.
            </h2>
            <p className="body-text">
              Förderfähig ist die systematische Entwicklung neuer oder verbesserter Produkte, Verfahren oder Software — branchenunabhängig.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.map((g, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-border p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--section-alt))] flex items-center justify-center mb-5 group-hover:bg-[#307abe]/[0.08] transition-colors duration-300">
                  <g.icon size={20} className="text-[#307abe]" />
                </div>
                <h3 className="font-bold text-[16px] mb-2 tracking-[-0.01em]">{g.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-[1.7]">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
