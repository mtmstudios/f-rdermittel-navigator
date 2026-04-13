import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, AlertTriangle } from "lucide-react";

const myths = [
  {
    num: "01",
    title: "„Unsere Arbeit ist nicht forschungsnah genug."",
    text: "Der häufigste Irrtum. Sie brauchen kein Labor und keine Grundlagenforschung. Eigene Softwareentwicklung, technische Produktinnovationen oder neue Produktionsverfahren reichen aus.",
  },
  {
    num: "02",
    title: "„Das ist nur für Großkonzerne."",
    text: "Falsch. Die Forschungszulage richtet sich gezielt an den Mittelstand. Gerade Unternehmen mit 10–250 Mitarbeitern profitieren überproportional — mit bis zu 35 % Förderquote.",
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
              Die Forschungszulage existiert seit 2020. Dennoch schließen sich viele mittelständische
              Unternehmen selbst aus — obwohl sie förderfähige Entwicklungsarbeit leisten.
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
                  Projekte können bei der Bescheinigungsstelle nur <span className="text-white font-semibold">einmal eingereicht</span> werden.
                  Ein fehlerhafter Eigenantrag bedeutet: Die Förderung für dieses Projekt ist <span className="text-white font-semibold">dauerhaft verloren</span>.
                  Deshalb setzen wir jeden Antrag von Anfang an prüfungssicher auf.
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
