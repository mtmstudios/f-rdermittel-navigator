import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import VideoPlayer from "./VideoPlayer";

export default function PodcastSection() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          <div className="text-center max-w-[600px] mx-auto mb-10 md:mb-14">
            <p className="eyebrow">Deep Dive</p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold leading-[1.1] mb-4 md:mb-5 tracking-[-0.02em]">
              Alles zur Forschungszulage — ausführlich erklärt
            </h2>
            <p className="body-text">
              Für alle, die es genauer wissen wollen: Im ausführlichen Gespräch erklären unsere Wirtschaftsprüfer die häufigsten Fragen, Mythen und den konkreten Ablauf.
            </p>
          </div>

          <div className="max-w-[800px] mx-auto">
            <VideoPlayer
              /* TODO: Replace with YouTube/Vimeo URL after upload of "Podcast Video.mp4" */
              label="Ausführliches Gespräch ansehen"
              duration="17:47 Min."
              variant="light"
            />

            {/* Chapter markers */}
            <div className="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { time: "0:00", title: "Mythos Forschungszulage" },
                { time: "3:12", title: "Wer ist förderfähig?" },
                { time: "6:30", title: "Aufwand & Bürokratie" },
                { time: "9:45", title: "Warum Anträge scheitern" },
                { time: "12:20", title: "Unsere Arbeitsweise" },
                { time: "15:00", title: "Nächste Schritte" },
              ].map((ch, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white rounded-xl border border-border px-4 py-3 text-left"
                >
                  <span className="text-[12px] font-mono text-[#307abe] font-semibold flex-shrink-0">
                    {ch.time}
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-foreground font-medium leading-tight">
                    {ch.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
