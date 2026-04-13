import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, AlertTriangle } from "lucide-react";

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

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center max-w-[680px] mx-auto mb-10 md:mb-14">
            <p className="eyebrow">Das Problem</p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[38px] font-bold leading-[1.1] mb-4 md:mb-5 tracking-[-0.02em]">
              Die meisten Unternehmen verschenken Fördergeld.
            </h2>
            <p className="body-text">
              Die Forschungszulage ist ein gesetzlich verankertes Förderinstrument.
              Dennoch schließen sich viele mittelständische Unternehmen selbst aus —
              obwohl sie genau die Art von Arbeit leisten, die förderfähig ist.
            </p>
          </div>

          {/* Two myth cards */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {myths.map((c, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl border border-border p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
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
            ))}
          </div>

          {/* One-Shot Warning — high-impact visual */}
          <div className="relative rounded-2xl overflow-hidden mb-8 md:mb-10">
            {/* Full dark background with red accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0a0a] to-[#0a0a0a]" />
            <div
              className="absolute -top-20 -left-20 w-60 h-60 opacity-[0.08] pointer-events-none"
              style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-10 -right-10 w-40 h-40 opacity-[0.05] pointer-events-none"
              style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
            />

            <div className="relative px-6 py-8 md:px-10 md:py-10">
              {/* Warning badge */}
              <div className="flex items-center justify-center mb-5">
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5">
                  <AlertTriangle size={14} className="text-red-400" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-400">Wichtiger Hinweis</span>
                </div>
              </div>

              {/* Big headline centered */}
              <h3 className="text-[22px] sm:text-[26px] md:text-[32px] font-extrabold text-white text-center mb-4 tracking-[-0.02em] leading-[1.15]">
                Ein Antrag.<br />
                <span className="text-red-400">Eine Chance.</span>
              </h3>

              <p className="text-[14px] md:text-[16px] text-white/50 leading-[1.8] text-center max-w-[560px] mx-auto mb-6">
                Man hat nur <span className="text-white font-semibold">einmal die Möglichkeit</span>, den Antrag zu stellen.
                Wird er abgelehnt, gibt es <span className="text-white font-semibold">keine zweite Chance</span> für diese Projekte.
              </p>

              {/* Visual separator */}
              <div className="w-12 h-px bg-red-500/30 mx-auto mb-6" />

              <p className="text-[13px] md:text-[14px] text-white/35 text-center max-w-[480px] mx-auto">
                Eigenanträge entsprechen oft nicht der nötigen Qualität.
                Deshalb übernehmen wir die komplette Antragstellung — prüfungssicher und auf WP-Niveau.
              </p>
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
