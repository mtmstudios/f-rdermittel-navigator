import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const cards = [
  {
    num: "01",
    title: "Falsches Bild von Forschung",
    text: "Die meisten Geschäftsführer denken bei Forschung an Labore. In Wahrheit genügt systematische Produktentwicklung, Verfahrensverbesserung oder Softwareentwicklung.",
  },
  {
    num: "02",
    title: "Kein Thema beim Steuerberater",
    text: "Die Forschungszulage wird selten proaktiv angesprochen. Sie erfordert eine technische Projektbewertung — das geht über die klassische Steuerberatung hinaus.",
  },
  {
    num: "03",
    title: "Ein Antrag — eine Chance",
    text: "Projekte können nur einmal eingereicht werden. Ein fehlerhaft aufgesetzter Antrag bedeutet: Die Förderung ist dauerhaft verloren.",
  },
];

export default function ProblemSection() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="max-w-[680px] mb-16">
            <p className="eyebrow">Das Problem</p>
            <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] mb-5 tracking-[-0.02em]">
              Die meisten Unternehmen verschenken Fördergeld — ohne es zu wissen.
            </h2>
            <p className="body-text">
              Die Forschungszulage existiert seit 2020. Dennoch nutzen nur wenige mittelständische Unternehmen diesen gesetzlichen Anspruch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((c, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl border border-border p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <span className="text-[48px] font-black text-[#307abe]/[0.07] absolute top-5 right-6 leading-none select-none">
                  {c.num}
                </span>
                <div className="relative">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#307abe] mb-4 block">
                    {c.num}
                  </span>
                  <h3 className="text-[18px] font-bold mb-3 tracking-[-0.01em]">{c.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.7]">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
