import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUtmParams } from "@/hooks/useUtmParams";
import { Lock } from "lucide-react";

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
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[hsl(222,47%,16%)]/20 focus:border-[hsl(222,47%,16%)] transition-all placeholder:text-gray-300";

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
              <p className="text-[14px] text-foreground font-medium">✓ Antwort innerhalb von 24 Stunden</p>
              <p className="text-[14px] text-foreground font-medium">✓ Persönliches Gespräch mit einem Wirtschaftsprüfer</p>
              <p className="text-[14px] text-foreground font-medium">✓ Vollständig kostenlos und unverbindlich</p>
            </div>

            {/* Video placeholder */}
            <div className="bg-white rounded-lg aspect-video flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-50 border border-border flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-muted-foreground ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                  </svg>
                </div>
                <p className="text-[12px] text-muted-foreground">Erklärvideo folgt</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border border-border p-7 shadow-sm"
          >
            <h3 className="font-bold text-[17px] mb-5">Ihre Kontaktdaten</h3>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input required type="text" placeholder="Vorname" value={form.vorname}
                onChange={e => update("vorname", e.target.value)} className={inputClass} />
              <input required type="text" placeholder="Nachname" value={form.nachname}
                onChange={e => update("nachname", e.target.value)} className={inputClass} />
            </div>
            <input required type="text" placeholder="Unternehmen" value={form.unternehmen}
              onChange={e => update("unternehmen", e.target.value)} className={`${inputClass} mb-3`} />
            <input required type="email" placeholder="E-Mail-Adresse" value={form.email}
              onChange={e => update("email", e.target.value)} className={`${inputClass} mb-3`} />
            <input required type="tel" placeholder="Telefonnummer" value={form.telefon}
              onChange={e => update("telefon", e.target.value)} className={`${inputClass} mb-3`} />
            <select required value={form.mitarbeiter}
              onChange={e => update("mitarbeiter", e.target.value)} className={`${inputClass} mb-3`}>
              <option value="">Mitarbeiterzahl</option>
              <option value="Bis 9">Bis 9</option>
              <option value="10–49">10–49</option>
              <option value="50–249">50–249</option>
              <option value="250+">250+</option>
            </select>
            <select required value={form.entwicklung}
              onChange={e => update("entwicklung", e.target.value)} className={`${inputClass} mb-6`}>
              <option value="">Entwickelt Ihr Unternehmen aktiv?</option>
              <option value="Ja, regelmäßig">Ja, regelmäßig</option>
              <option value="Ja, gelegentlich">Ja, gelegentlich</option>
              <option value="Nein / Unsicher">Nein / Unsicher</option>
            </select>

            <button type="submit" disabled={submitting}
              className="btn-primary w-full text-center disabled:opacity-60 !text-[15px]">
              {submitting ? "Wird gesendet..." : "Ersteinschätzung anfordern"}
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
