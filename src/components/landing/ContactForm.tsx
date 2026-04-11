import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUtmParams } from "@/hooks/useUtmParams";
import { Lock, Check } from "lucide-react";
import CustomSelect from "./CustomSelect";

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
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Forschungszulage Ersteinschätzung",
          content_category: "lead_form",
        });
      }
      navigate("/danke");
    } catch {
      navigate("/danke");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#307abe]/10 focus:border-[#307abe] transition-all duration-200 placeholder:text-gray-400";

  return (
    <section id="kontakt" className="section-padding section-alt">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up grid md:grid-cols-2 gap-14 items-start max-w-[960px] mx-auto">
          {/* Left */}
          <div>
            <p className="eyebrow">Kontakt</p>
            <h2 className="text-2xl md:text-[32px] font-bold leading-tight mb-5">
              Kostenlose Ersteinschätzung anfragen
            </h2>
            <p className="body-text mb-8">
              In einem kurzen Gespräch prüfen wir, ob und in welchem Umfang die Forschungszulage für Ihr Unternehmen relevant ist. Keine Verpflichtung, keine Kosten.
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-[14px] text-foreground font-medium flex items-center gap-2">
                <Check size={16} className="text-[#307abe] flex-shrink-0" /> Antwort innerhalb von 24 Stunden
              </p>
              <p className="text-[14px] text-foreground font-medium flex items-center gap-2">
                <Check size={16} className="text-[#307abe] flex-shrink-0" /> Persönliches Gespräch mit einem Wirtschaftsprüfer
              </p>
              <p className="text-[14px] text-foreground font-medium flex items-center gap-2">
                <Check size={16} className="text-[#307abe] flex-shrink-0" /> Vollständig kostenlos und unverbindlich
              </p>
            </div>

            {/* Video placeholder */}
            <div
              role="button"
              tabIndex={0}
              aria-label="Erklärvideo abspielen"
              className="bg-white rounded-lg aspect-video flex items-center justify-center border border-border group cursor-pointer hover:shadow-md transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#307abe]"
            >
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-gray-50 border border-border flex items-center justify-center mx-auto mb-2 group-hover:bg-[hsl(222,47%,16%)] group-hover:border-transparent transition-all duration-300">
                  <svg className="w-5 h-5 text-muted-foreground ml-0.5 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                  </svg>
                </div>
                <p className="text-[12px] text-muted-foreground">Erklärvideo</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border border-border p-7 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="font-bold text-[17px] mb-5">Ihre Kontaktdaten</h3>

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
              className="btn-primary w-full text-center disabled:opacity-60 !text-[15px] group relative overflow-hidden">
              <span className="relative z-10">
                {submitting ? "Wird gesendet..." : "Ersteinschätzung anfordern"}
              </span>
            </button>

            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-4 justify-center">
              <Lock size={11} /> Ihre Daten werden vertraulich behandelt.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
