import { useEffect } from "react";
import { CheckCircle, Clock, FileSearch, Send, Mail, ArrowRight, Calendar } from "lucide-react";
import VideoPlayer from "@/components/landing/VideoPlayer";

const PCA_LOGO = "https://pca-partners.de/wp-content/uploads/2025/03/PCA_Logo_horizontal-1.svg";

const steps = [
  {
    icon: Clock,
    title: "Rückmeldung innerhalb von 48 Stunden",
    text: "Wir prüfen Ihre Angaben und melden uns telefonisch oder per E-Mail bei Ihnen.",
  },
  {
    icon: FileSearch,
    title: "Kostenlose Ersteinschätzung",
    text: "In ca. 30 Minuten klären wir gemeinsam, ob und in welchem Umfang Ihr Unternehmen förderfähig ist.",
  },
  {
    icon: Send,
    title: "Antragstellung & Begleitung",
    text: "Wir übernehmen den gesamten Prozess — von der Dokumentation bis zur Auszahlung. Erfolgsbasiert.",
  },
];

const chapters = [
  { time: "0:00", title: "Mythos Forschungszulage" },
  { time: "3:12", title: "Wer ist förderfähig?" },
  { time: "6:30", title: "Aufwand & Bürokratie" },
  { time: "9:45", title: "Warum Anträge scheitern" },
  { time: "12:20", title: "Unsere Arbeitsweise" },
  { time: "15:00", title: "Nächste Schritte" },
];

export default function Danke() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* ═══ HERO: Confirmation ═══ */}
      <section
        className="dark-section relative grain overflow-hidden"
        style={{ background: "linear-gradient(170deg, #050505 0%, #0d0d0f 40%, #0f1118 100%)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[500px] opacity-[0.07] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, #307abe 0%, transparent 70%)" }}
        />

        <div className="relative pt-20 pb-36 md:pt-28 md:pb-44">
          <div className="max-w-[700px] mx-auto px-6 md:px-8">
            {/* Logo */}
            <div className="flex justify-center mb-10 md:mb-14">
              <img src={PCA_LOGO} alt="PCA Partners" className="h-7 md:h-8 brightness-0 invert opacity-50" />
            </div>

            {/* Confirmation */}
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 md:mb-8"
                style={{ boxShadow: "0 0 40px rgba(16,185,129,0.12)" }}>
                <CheckCircle size={32} className="text-emerald-400 md:w-10 md:h-10" />
              </div>

              <h1 className="text-[26px] sm:text-[34px] md:text-[44px] font-extrabold text-white leading-[1.08] mb-4 md:mb-6 tracking-[-0.03em]">
                Ihre Anfrage ist eingegangen.
              </h1>

              <p className="text-[15px] sm:text-[17px] md:text-[19px] text-white/50 max-w-[520px] mx-auto leading-[1.7] font-light mb-8 md:mb-10">
                Vielen Dank für Ihr Interesse. Wir prüfen Ihre Angaben und melden uns innerhalb von 48 Stunden bei Ihnen.
              </p>

              {/* Termin buchen CTA */}
              <a
                href="#termin"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#307abe]/20"
              >
                <Calendar size={17} />
                Jetzt Termin buchen
              </a>
              <p className="text-[12px] text-white/25 mt-3">
                Oder wir melden uns bei Ihnen — Sie müssen nichts weiter tun.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background)/0.6)] to-transparent" />
      </section>

      {/* ═══ NEXT STEPS + EMAIL INFO ═══ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />

        <div className="max-w-[800px] mx-auto px-6 md:px-8 relative">
          {/* Email + Termin — two cards side by side */}
          <div className="grid sm:grid-cols-2 gap-4 mb-14 md:mb-18">
            {/* Email notification */}
            <div className="rounded-2xl p-px bg-gradient-to-b from-[#307abe]/20 to-transparent">
              <div className="bg-white rounded-2xl p-5 md:p-6 h-full">
                <div className="w-10 h-10 rounded-xl bg-[#307abe]/10 flex items-center justify-center mb-4">
                  <Mail size={18} className="text-[#307abe]" />
                </div>
                <p className="text-[14px] md:text-[15px] font-semibold text-foreground mb-1.5">
                  Informationsflyer per E-Mail
                </p>
                <p className="text-[13px] text-muted-foreground leading-[1.7]">
                  Sie erhalten in wenigen Minuten unseren ausführlichen Flyer — inklusive Rechenbeispiele und Checkliste.
                </p>
              </div>
            </div>

            {/* Termin buchen */}
            <div className="rounded-2xl p-px bg-gradient-to-b from-[#307abe]/20 to-transparent">
              <div className="bg-white rounded-2xl p-5 md:p-6 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-[#307abe]/10 flex items-center justify-center mb-4">
                  <Calendar size={18} className="text-[#307abe]" />
                </div>
                <p className="text-[14px] md:text-[15px] font-semibold text-foreground mb-1.5">
                  Sie möchten nicht warten?
                </p>
                <p className="text-[13px] text-muted-foreground leading-[1.7] mb-4">
                  Buchen Sie direkt einen Termin für Ihre kostenlose Ersteinschätzung.
                </p>
                <a
                  href="#termin"
                  className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-[#307abe] hover:text-[#2968a3] transition-colors"
                >
                  Termin vereinbaren
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* How it continues */}
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#307abe] mb-3">
              So geht es weiter
            </p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[34px] font-bold tracking-[-0.02em]">
              Die nächsten Schritte
            </h2>
          </div>

          {/* Steps as cards */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
            {steps.map((s, i) => (
              <div key={i} className="relative bg-white rounded-2xl border border-border/60 p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                {/* Step number watermark */}
                <span className="absolute top-3 right-4 text-[36px] font-black text-[#307abe]/[0.05] leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-10 h-10 rounded-full bg-[#307abe]/[0.08] border border-[#307abe]/20 flex items-center justify-center mb-4"
                  style={{ boxShadow: "0 0 16px rgba(48,122,190,0.08)" }}>
                  <s.icon size={17} className="text-[#307abe]" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#307abe]/60 mb-1.5 block">
                  Schritt {i + 1}
                </span>
                <h3 className="text-[15px] md:text-[16px] font-bold mb-2 tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[13px] md:text-[14px] text-muted-foreground leading-[1.7]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM + DEEP DIVE — combined dark section into footer ═══ */}
      <section
        className="dark-section relative grain overflow-hidden"
        style={{ background: "linear-gradient(170deg, #050505 0%, #0d0d0f 30%, #0f1118 60%, #050505 100%)" }}
      >
        {/* Team */}
        <div className="pt-16 md:pt-24 pb-14 md:pb-20">
          <div className="max-w-[700px] mx-auto px-6 md:px-8">
            <div className="text-center mb-8 md:mb-10">
              <p className="eyebrow-dark">PCA Partners</p>
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-white tracking-[-0.02em]">
                Ihre Ansprechpartner
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {/* Alexander Bernauer */}
              <div className="glass-card text-center">
                <div className="w-16 h-16 rounded-full bg-[#307abe]/15 flex items-center justify-center border border-white/10 mx-auto mb-4">
                  <span className="text-[20px] font-bold text-[#57a7dd]">AB</span>
                </div>
                <p className="text-[16px] font-bold text-white mb-1">Alexander Bernauer</p>
                <p className="text-[12px] text-[#57a7dd] font-semibold mb-2">Geschäftsführender Gesellschafter</p>
                <p className="text-[13px] text-white/40 leading-[1.7]">
                  Verantwortet die strategische Beratung und Qualitätssicherung aller Anträge.
                </p>
              </div>

              {/* Elias von der Linden */}
              <div className="glass-card text-center">
                <div className="w-16 h-16 rounded-full bg-[#307abe]/15 flex items-center justify-center border border-white/10 mx-auto mb-4">
                  <span className="text-[20px] font-bold text-[#57a7dd]">EvdL</span>
                </div>
                <p className="text-[16px] font-bold text-white mb-1">Elias von der Linden</p>
                <p className="text-[12px] text-[#57a7dd] font-semibold mb-2">Forschungs- & Entwicklungszulage</p>
                <p className="text-[13px] text-white/40 leading-[1.7]">
                  Spezialisiert auf die fachliche Einordnung und Dokumentation förderfähiger Projekte.
                </p>
              </div>
            </div>

            <p className="text-center text-[12px] text-white/20 mt-5 font-medium tracking-wide">
              München & Passau
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-[700px] mx-auto px-6 md:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* Deep Dive Video */}
        <div className="pt-14 md:pt-20 pb-16 md:pb-24">
          <div className="max-w-[900px] mx-auto px-6 md:px-8">
            <div className="text-center max-w-[540px] mx-auto mb-8 md:mb-12">
              <p className="eyebrow-dark">Vorbereitung für Ihr Gespräch</p>
              <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-white leading-[1.1] mb-4 tracking-[-0.02em]">
                Erfahren Sie vorab, wie die Forschungszulage funktioniert
              </h2>
              <p className="text-[14px] md:text-[15px] text-white/40 leading-[1.7]">
                In 17 Minuten erklären unsere Wirtschaftsprüfer alles Wichtige — Voraussetzungen, Ablauf und typische Fehler.
              </p>
            </div>

            <div className="grid md:grid-cols-[1fr,240px] gap-5 md:gap-6 items-start">
              <div className="glow-blue">
                <VideoPlayer
                  label="Gespräch ansehen"
                  duration="17:47 Min."
                  variant="dark"
                />
              </div>

              <div className="grid grid-cols-3 md:grid-cols-1 gap-1.5 md:gap-2">
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
          </div>
        </div>

        {/* Footer — flows directly from dark section */}
        <div className="border-t border-white/[0.04] py-10">
          <div className="max-w-[700px] mx-auto px-6 md:px-8 text-center">
            <img src={PCA_LOGO} alt="PCA Partners" className="h-6 brightness-0 invert opacity-30 mx-auto mb-4" />
            <p className="text-[11px] text-white/15">
              © 2026 PCA Audit & Tax GmbH WPG StBG. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
