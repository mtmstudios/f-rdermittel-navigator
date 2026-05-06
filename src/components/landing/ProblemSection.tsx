import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";
import { ArrowRight, ShieldCheck } from "lucide-react";

const myths = [
  {
    num: "01",
    title: "\u201EUnsere Arbeit ist nicht forschungsnah genug.\u201C",
    text: "Der häufigste Irrtum. Sie müssen kein Labor betreiben. Wenn Sie Software entwickeln, Produkte verbessern oder neue Fertigungsverfahren erarbeiten, sind Sie grundsätzlich förderfähig.",
  },
  {
    num: "02",
    title: "\u201EDas lohnt sich nur für Großkonzerne.\u201C",
    text: "Das Gegenteil ist der Fall. Unternehmen mit 10–250 Mitarbeitern erhalten bis zu 35 % Förderquote — Großkonzerne nur 25 %. Der Mittelstand profitiert am stärksten.",
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
              Zwei Irrtümer kosten den Mittelstand
              <span className="block">jedes Jahr Millionen.</span>
            </h2>
            <p className="body-text">
              Die meisten Geschäftsführer glauben, ihre Entwicklungsarbeit sei nicht förderfähig.
              In über 90 % der Fälle liegen sie falsch.
            </p>
          </div>

          {/* Two myth cards */}
          <div ref={staggerRef} className="stagger-children grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 max-w-[860px] mx-auto">
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

          {/* Qualität entscheidet — neutral, vertrauensbildend */}
          <div className="relative max-w-[860px] mx-auto mb-8 md:mb-10 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#307abe]/[0.04] to-[#307abe]/[0.02]" />
            <div className="relative flex items-start gap-4 p-6 md:p-7 border border-[#307abe]/15 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-[#307abe]/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={18} className="text-[#307abe]" />
              </div>
              <div>
                <p className="text-[14px] md:text-[15px] font-semibold text-foreground mb-1 tracking-[-0.01em]">
                  Ein gescheiterter Antrag ist verlorenes Geld.
                </p>
                <p className="text-[13px] md:text-[14px] text-muted-foreground leading-[1.7]">
                  Die Qualität des Antrags entscheidet. Durch die Bearbeitung über eine
                  Wirtschaftsprüfer-Kanzlei (PCA) erhöht sich die Erfolgswahrscheinlichkeit
                  deutlich gegenüber Eigenanträgen.
                </p>
              </div>
            </div>
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
