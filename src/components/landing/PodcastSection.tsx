import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

const chapters = [
  { time: "0:00", title: "Mythos Forschungszulage" },
  { time: "3:12", title: "Wer ist förderfähig?" },
  { time: "6:30", title: "Aufwand & Bürokratie" },
  { time: "9:45", title: "Warum Anträge scheitern" },
  { time: "12:20", title: "Unsere Arbeitsweise" },
  { time: "15:00", title: "Nächste Schritte" },
];

export default function PodcastSection() {
  const ref = useScrollAnimation();

  return (
    <section
      className="py-16 md:py-32 dark-section relative grain overflow-hidden"
      style={{ background: "linear-gradient(170deg, #050505 0%, #0d0d0f 40%, #0f1118 100%)" }}
    >
      <div className="container-main relative" ref={ref}>
        <div className="fade-in-up">
          {/* Header */}
          <div className="text-center max-w-[540px] mx-auto mb-8 md:mb-12">
            <p className="eyebrow-dark">Deep Dive</p>
            <h2 className="text-[22px] sm:text-[26px] md:text-[34px] font-bold text-white leading-[1.1] mb-4 tracking-[-0.02em]">
              Forschungszulage — <br /> ausführlich erklärt
            </h2>
            <p className="text-[14px] md:text-[16px] text-white/40 leading-[1.7]">
              Im Gespräch beantworten unsere Wirtschaftsprüfer die häufigsten Fragen zum Ablauf, den Voraussetzungen und typischen Fehlern.
            </p>
          </div>

          {/* Video + Chapters Side by Side on Desktop */}
          <div className="max-w-[960px] mx-auto grid md:grid-cols-[1fr,260px] gap-5 md:gap-8 items-start">
            {/* Video */}
            <div className="glow-blue">
              <VideoPlayer
                /* TODO: Replace with YouTube/Vimeo URL after upload of "Podcast Video.mp4" */
                label="Gespräch ansehen"
                duration="17:47 Min."
                variant="dark"
              />
            </div>

            {/* Chapter List — compact grid on mobile, sidebar on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-1.5 md:gap-2">
              {chapters.map((ch, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-3 bg-white/[0.04] border border-white/[0.06] rounded-lg md:rounded-xl px-2.5 py-2 md:px-3.5 md:py-2.5 hover:bg-white/[0.07] transition-colors duration-200 cursor-pointer"
                >
                  <span className="text-[10px] md:text-[11px] font-mono text-[#57a7dd] font-semibold flex-shrink-0">
                    {ch.time}
                  </span>
                  <span className="text-[11px] md:text-[13px] text-white/50 font-medium leading-tight">
                    {ch.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10 md:mt-14">
            <a
              href="#rechner"
              className="inline-flex items-center gap-2 text-[14px] md:text-[15px] font-semibold text-[#57a7dd] hover:text-[#7bbce8] transition-colors"
            >
              Jetzt Förderpotenzial berechnen
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
