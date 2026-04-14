import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";
import { ArrowRight, Info } from "lucide-react";

const myths = [
  {
    num: "01",
    title: "\u201EUnsere Arbeit ist nicht forschungsnah genug.\u201C",
    text: "Der h\u00E4ufigste Irrtum. Sie m\u00FCssen kein High-Tech-Konzern sein. Wenn Sie ein Produkt oder eine L\u00F6sung entwickeln, die es so noch nicht auf dem Markt gibt \u2014 Software, Produktinnovationen, neue Verfahren \u2014 sind Sie grunds\u00E4tzlich f\u00F6rderf\u00E4hig.",
  },
  {
    num: "02",
    title: "\u201EDas ist nur f\u00FCr Gro\u00DFkonzerne.\u201C",
    text: "Falsch. Die Forschungszulage richtet sich gezielt an den Mittelstand. Gerade Unternehmen mit 10\u2013250 Mitarbeitern profitieren \u00FCberproportional \u2014 mit bis zu 35 % F\u00F6rderquote.",
  },
];

export default function ProblemSection() {
  const ref = useScrollAnimation();
  const staggerRef = useStaggerAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center max-w-[680px] mx-auto mb-10 md:mb-14">
            <p className="eyebrow">Warum die meisten leer ausgehen</p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[38px] font-bold leading-[1.1] mb-4 md:mb-5 tracking-[-0.02em]">
              Die meisten Unternehmen verschenken Fördergeld.
            </h2>
            <p className="body-text">
              Jedes Jahr bleiben Millionen an Forschungszulage ungenutzt — weil
              Geschäftsführer glauben, ihre Arbeit sei nicht förderfähig. Zwei
              Irrtümer halten sich besonders hartnäckig:
            </p>
          </div>

          {/* Two myth cards */}
          <div ref={staggerRef} className="stagger-children grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 max-w-[860px] mx-auto">
            {myths.map((c, i) => (
              <div
                key={i}
                className="group relative rounded-2xl p-px bg-gradient-to-b from-border to-transparent hover:from-[#307abe]/30 hover:to-[#307abe]/5 transition-all duration-500"
              >
                <div className="relative bg-white rounded-2xl p-6 md:p-8 h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <span className="text-[40px] md:text-[48px] font-black text-[#307abe]/[0.06] absolute top-4 right-5 leading-none select-none">
                    {c.num}
                  </span>
                  <div className="relative">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#307abe] mb-3 md:mb-4 block">
                      Mythos {c.num}
                    </span>
                    <h3 className="text-[16px] md:text-[18px] font-bold mb-2 md:mb-3 tracking-[-0.01em]">{c.title}</h3>
                    <p className="text-[14px] md:text-[15px] text-muted-foreground leading-[1.7]">{c.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* One-Shot Hinweis — dezent */}
          <div className="flex items-start gap-3 bg-[#307abe]/[0.04] border border-[#307abe]/10 rounded-xl p-5 md:p-6 mb-8 md:mb-10 max-w-[860px] mx-auto">
            <Info size={17} className="text-[#307abe]/60 flex-shrink-0 mt-0.5" />
            <p className="text-[13px] md:text-[14px] text-muted-foreground leading-[1.7]">
              <span className="font-semibold text-foreground/80">Gut zu wissen:</span> Sie haben nur einmal die Möglichkeit, den Antrag zu stellen. Wird er abgelehnt, gibt es keine
              zweite Chance für diese Projekte. Deshalb übernehmen wir die komplette Antragstellung — prüfungssicher und auf WP-Niveau.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="#rechner"
              className="inline-flex items-center gap-2 text-[14px] md:text-[15px] font-semibold text-[#307abe] hover:text-[#2968a3] transition-colors"
            >
              Lassen Sie Ihren Anspruch kostenlos prüfen
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
