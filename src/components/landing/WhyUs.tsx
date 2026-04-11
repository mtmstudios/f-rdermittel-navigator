import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const points = [
  { title: "Wirtschaftsprüfungsgesellschaft", text: "PCA Partners ist eine zugelassene Wirtschaftsprüfungsgesellschaft — nicht nur eine Beratung. Jeder Antrag wird auf dem Qualitätsniveau einer Abschlussprüfung erstellt." },
  { title: "Prüfungssichere Dokumentation", text: "Unsere Anträge sind so aufgebaut, dass sie einer Betriebsprüfung standhalten. Wir denken den Prüfer mit." },
  { title: "Erfolgsbasiertes Modell", text: "Unser Honorar orientiert sich am tatsächlichen Ergebnis. Kein Erfolg — keine Kosten." },
  { title: "Persönliche Betreuung", text: "Ein fester Ansprechpartner für Ihr gesamtes Projekt. Keine wechselnden Kontakte." },
];

export default function WhyUs() {
  const ref = useScrollAnimation();

  return (
    <section
      className="section-padding dark-section"
      style={{ background: "#0a0909" }}
    >
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="max-w-[600px] mb-14">
            <p className="eyebrow-dark">Warum PCA Partners</p>
            <h2 className="text-2xl md:text-[36px] font-bold text-white leading-tight mb-4">
              Wirtschaftsprüfer. Nicht nur Berater.
            </h2>
            <p className="text-[16px] text-white/40 leading-[1.7]">
              Wir verbinden steuerrechtliche Expertise mit technischem Projektverständnis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {points.map((p, i) => (
              <div key={i} className="border border-white/8 rounded-lg p-7">
                <h3 className="text-[17px] font-bold text-white mb-3">{p.title}</h3>
                <p className="text-[15px] text-white/40 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
