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

          {/* One-Shot Warning — prominent callout */}
          <div className="relative bg-[#0a1628] rounded-2xl p-6 md:p-8 overflow-hidden mb-8 md:mb-10">
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
            />
            <div className="relative flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-[16px] md:text-[18px] font-bold text-white mb-2 tracking-[-0.01em]">
                  Ein Antrag — eine Chance.
                </h3>
                <p className="text-[14px] md:text-[15px] text-white/55 leading-[1.7]">
                  Man hat nur <span className="text-white font-semibold">einmal die Möglichkeit</span>, den Antrag zu stellen — ein klassischer One-Shot-Ansatz.
                  Wenn der Antrag abgelehnt wird, hat man <span className="text-white font-semibold">keine weitere Möglichkeit</span>, diese Projekte fördern zu lassen.
                  Eigenanträge entsprechen oft nicht der nötigen Qualität. Deshalb übernehmen wir die komplette Antragstellung.
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
