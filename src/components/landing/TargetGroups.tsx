import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const groups = [
  { title: "Software & IT", text: "Eigene Tools, Plattformen, Apps oder Algorithmen — häufig förderfähig." },
  { title: "Maschinenbau & Produktion", text: "Neue Fertigungsverfahren, Anlagen oder Werkzeuge." },
  { title: "Chemie & Pharma", text: "Neue Rezepturen, Wirkstoffe oder Produktionsverfahren." },
  { title: "Automotive & Zulieferer", text: "Komponenten, Materialien oder Testverfahren." },
  { title: "Medizintechnik", text: "Geräte, Implantate oder diagnostische Verfahren." },
  { title: "Produktinnovation", text: "Bestehende Produkte verbessert oder neue entwickelt — branchenübergreifend." },
];

export default function TargetGroups() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="max-w-[600px] mb-14">
            <p className="eyebrow">Branchen</p>
            <h2 className="text-2xl md:text-[36px] font-bold leading-tight mb-4">
              Sie müssen kein Labor haben.
            </h2>
            <p className="body-text">
              Förderfähig ist die systematische Entwicklung neuer oder verbesserter Produkte, Verfahren oder Software — unabhängig von der Branche.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {groups.map((g, i) => (
              <div key={i} className="bg-white p-7">
                <h3 className="font-bold mb-2">{g.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
