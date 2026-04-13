import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const cards = [
  {
    num: "01",
    title: "Falsches Bild von Forschung",
    text: "Die meisten Geschäftsführer denken bei Forschung an Labore. In Wahrheit genügt systematische Produktentwicklung oder Softwareentwicklung.",
  },
  {
    num: "02",
    title: "Kein Thema beim Steuerberater",
    text: "Die Forschungszulage erfordert eine technische Projektbewertung — das geht über die klassische Steuerberatung hinaus.",
  },
  {
    num: "03",
    title: "Ein Antrag — eine Chance",
    text: "Projekte können nur einmal eingereicht werden. Ein fehlerhafter Antrag bedeutet: Die Förderung ist dauerhaft verloren.",
  },
];

export default function ProblemSection() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="max-w-[680px] mb-10 md:mb-16">
            <p className="eyebrow">Das Problem</p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[38px] font-bold leading-[1.1] mb-4 md:mb-5 tracking-[-0.02em]">
              Die meisten Unternehmen verschenken Fördergeld.
            </h2>
            <p className="body-text">
              Die Forschungszulage existiert seit 2020. Dennoch nutzen nur wenige mittelständische Unternehmen diesen gesetzlichen Anspruch.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {cards.map((c, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl border border-border p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <span className="text-[40px] md:text-[48px] font-black text-[#307abe]/[0.06] absolute top-4 right-5 leading-none select-none">
                  {c.num}
                </span>
                <div className="relative">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#307abe] mb-3 md:mb-4 block">
                    {c.num}
                  </span>
                  <h3 className="text-[16px] md:text-[18px] font-bold mb-2 md:mb-3 tracking-[-0.01em]">{c.title}</h3>
                  <p className="text-[14px] md:text-[15px] text-muted-foreground leading-[1.7]">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
