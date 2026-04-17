import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUtmParams } from "@/hooks/useUtmParams";
import { Lock, Check, ArrowRight } from "lucide-react";
import CustomSelect from "./CustomSelect";
import VideoPlayer from "./VideoPlayer";
import { trackLead } from "@/lib/pixel";

export default function ContactForm() {
  const ref = useScrollAnimation();
  const navigate = useNavigate();
  const utm = useUtmParams();

  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    unternehmen: "",
    email: "",
    telefon: "",
    mitarbeiter: "",
    entwicklung: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.mitarbeiter || !form.entwicklung) return;
    setSubmitting(true);
    const payload = { ...form, ...utm };
    try {
      const res = await fetch("https://mtmstudios.app.n8n.cloud/webhook/factonet-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Webhook error");
      trackLead();
      navigate("/danke");
    } catch {
      navigate("/danke");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#307abe]/15 focus:border-[#307abe] transition-all duration-200 placeholder:text-gray-400";

  return (
    <section
      id="kontakt"
      className="py-16 md:py-32 dark-section relative grain overflow-hidden"
      style={{ background: "linear-gradient(170deg, #050505 0%, #0d0d0f 40%, #0f1118 100%)" }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #307abe 0%, transparent 70%)" }}
      />

      <div className="container-main relative" ref={ref}>
        <div className="fade-in-up">
          {/* Header */}
          <div className="text-center max-w-[600px] mx-auto mb-8 md:mb-14">
            <p className="eyebrow-dark">Kontakt</p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[38px] font-bold text-white leading-[1.1] mb-4 md:mb-5 tracking-[-0.02em]">
              Kostenlose Ersteinschätzung
            </h2>
            <p className="text-[15px] md:text-[17px] text-white/50 leading-[1.7]">
              In einem kurzen Gespräch prüfen wir, ob die Forschungszulage für Ihr Unternehmen relevant ist.
            </p>
          </div>

          <div className="grid md:grid-cols-[1.1fr,1fr] gap-8 md:gap-12 items-start max-w-[1000px] mx-auto">
            {/* Form — shows first on mobile */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl order-1 md:order-2"
            >
              <h3 className="font-bold text-[17px] sm:text-[18px] mb-5 md:mb-6 tracking-[-0.01em]">Ihre Kontaktdaten</h3>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="vorname" className="sr-only">Vorname</label>
                  <input id="vorname" required type="text" placeholder="Vorname" value={form.vorname}
                    onChange={e => update("vorname", e.target.value)} className={inputClass} autoComplete="given-name" />
                </div>
                <div>
                  <label htmlFor="nachname" className="sr-only">Nachname</label>
                  <input id="nachname" required type="text" placeholder="Nachname" value={form.nachname}
                    onChange={e => update("nachname", e.target.value)} className={inputClass} autoComplete="family-name" />
                </div>
              </div>
              <label htmlFor="unternehmen" className="sr-only">Unternehmen</label>
              <input id="unternehmen" required type="text" placeholder="Unternehmen" value={form.unternehmen}
                onChange={e => update("unternehmen", e.target.value)} className={`${inputClass} mb-3`} autoComplete="organization" />
              <label htmlFor="email" className="sr-only">E-Mail-Adresse</label>
              <input id="email" required type="email" inputMode="email" placeholder="E-Mail-Adresse" value={form.email}
                onChange={e => update("email", e.target.value)} className={`${inputClass} mb-3`} autoComplete="email" />
              <label htmlFor="telefon" className="sr-only">Telefonnummer</label>
              <input id="telefon" required type="tel" inputMode="tel" placeholder="Telefonnummer" value={form.telefon}
                onChange={e => update("telefon", e.target.value)} className={`${inputClass} mb-3`} autoComplete="tel" />

              <div className="mb-3">
                <CustomSelect
                  placeholder="Mitarbeiterzahl wählen"
                  value={form.mitarbeiter}
                  onChange={v => update("mitarbeiter", v)}
                  required
                  options={[
                    { value: "Bis 9", label: "Bis 9 Mitarbeiter" },
                    { value: "10–49", label: "10–49 Mitarbeiter" },
                    { value: "50–249", label: "50–249 Mitarbeiter" },
                    { value: "250+", label: "250+ Mitarbeiter" },
                  ]}
                />
              </div>

              <div className="mb-6">
                <CustomSelect
                  placeholder="Entwickelt Ihr Unternehmen aktiv?"
                  value={form.entwicklung}
                  onChange={v => update("entwicklung", v)}
                  required
                  options={[
                    { value: "Ja, regelmäßig", label: "Ja, regelmäßig" },
                    { value: "Ja, gelegentlich", label: "Ja, gelegentlich" },
                    { value: "Nein / Unsicher", label: "Nein / Unsicher" },
                  ]}
                />
              </div>

              <button type="submit" disabled={submitting}
                className="btn-cta w-full text-center disabled:opacity-60 !text-[15px] group !py-4">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? "Wird gesendet..." : (
                    <>
                      Ersteinschätzung anfordern
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </span>
              </button>

              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-3 sm:mt-4 justify-center">
                <Lock size={11} /> Ihre Daten werden vertraulich behandelt.
              </p>
            </form>

            {/* Video + Trust — shows second on mobile */}
            <div className="order-2 md:order-1">
              {/* VSL Video */}
              <div className="mb-6 md:mb-8">
                <VideoPlayer
                  /* TODO: Replace with YouTube/Vimeo URL after upload of "Long Version ohne Logo.mp4" */
                  label="Erklärvideo ansehen"
                  duration="1:15 Min."
                  variant="dark"
                />
              </div>

              {/* Trust Signals */}
              <div className="space-y-3 md:space-y-4">
                {[
                  { bold: "Antwort innerhalb von 24 Stunden", sub: "— persönlich, kein Autoresponder" },
                  { bold: "Gespräch mit einem Wirtschaftsprüfer", sub: "— keine Vertriebler" },
                  { bold: "Vollständig kostenlos und unverbindlich", sub: "— keine versteckten Kosten" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#307abe]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-[#57a7dd]" />
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-white/50 leading-relaxed">
                      <span className="text-white/70 font-medium">{item.bold}</span> {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
