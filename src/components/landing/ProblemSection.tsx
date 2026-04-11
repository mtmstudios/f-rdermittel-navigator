import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ProblemSection() {
  const ref = useScrollAnimation();

  const cards = [
    {
      title: "Falsches Bild von Forschung",
      text: "Die meisten Geschäftsführer denken bei Forschung an Labore. In Wahrheit genügt systematische Produktentwicklung, Verfahrensverbesserung oder Softwareentwicklung.",
    },
    {
      title: "Kein Thema beim Steuerberater",
      text: "Die Forschungszulage wird selten proaktiv angesprochen. Sie erfordert eine technische Projektbewertung — das geht über die klassische Steuerberatung hinaus.",
    },
    {
      title: "Ein Antrag — eine Chance",
      text: "Projekte können nur einmal eingereicht werden. Ein fehlerhaft aufgesetzter Antrag bedeutet: Die Förderung ist dauerhaft verloren.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="max-w-[680px] mb-14">
            <p className="eyebrow">Das Problem</p>
            <h2 className="text-2xl md:text-[36px] font-bold leading-tight mb-4">
              Die meisten Unternehmen verschenken Fördergeld — ohne es zu wissen.
            </h2>
            <p className="body-text">
              Die Forschungszulage existiert seit 2020. Dennoch nutzen nur wenige mittelständische Unternehmen diesen gesetzlichen Anspruch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {cards.map((c, i) => (
              <div key={i} className="bg-white p-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4 block">0{i+1}</span>
                <h3 className="text-lg font-bold mb-3">{c.title}</h3>
                <p className="body-text text-[15px]">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
