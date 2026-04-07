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

    // TODO: Replace with webhook URL
    console.log("Form submission:", JSON.stringify(payload, null, 2));

    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 500));
    navigate("/danke");
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <section id="kontakt" className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <p className="eyebrow">NÄCHSTER SCHRITT</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Kostenlose Ersteinschätzung anfragen
            </h2>
            <p className="body-text mb-6">
              In einem kurzen Gespräch prüfen wir, ob und in welchem Umfang die Forschungszulage für Ihr Unternehmen relevant ist. Keine Verpflichtung, keine Kosten — sondern eine fundierte Einschätzung durch erfahrene Wirtschaftsprüfer.
            </p>
            <div className="space-y-2 text-base">
              <p className="text-foreground">✓ Antwort innerhalb von 24 Stunden</p>
              <p className="text-foreground">✓ Vollständig kostenlos und unverbindlich</p>
              <p className="text-foreground">✓ Persönliches Gespräch, kein Callcenter</p>
            </div>
          </div>

          {/* Right — Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl border border-border p-6 md:p-8"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                required
                type="text"
                placeholder="Max"
                value={form.vorname}
                onChange={(e) => update("vorname", e.target.value)}
                className={inputClass}
                aria-label="Vorname"
              />
              <input
                required
                type="text"
                placeholder="Mustermann"
                value={form.nachname}
                onChange={(e) => update("nachname", e.target.value)}
                className={inputClass}
                aria-label="Nachname"
              />
            </div>

            <input
              required
              type="text"
              placeholder="Musterfirma GmbH"
              value={form.unternehmen}
              onChange={(e) => update("unternehmen", e.target.value)}
              className={`${inputClass} mb-4`}
              aria-label="Unternehmen"
            />

            <input
              required
              type="email"
              placeholder="max@musterfirma.de"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={`${inputClass} mb-4`}
              aria-label="E-Mail"
            />

            <input
              required
              type="tel"
              placeholder="+49 123 456789"
              value={form.telefon}
              onChange={(e) => update("telefon", e.target.value)}
              className={`${inputClass} mb-4`}
              aria-label="Telefon"
            />

            <select
              required
              value={form.mitarbeiter}
              onChange={(e) => update("mitarbeiter", e.target.value)}
              className={`${inputClass} mb-4`}
              aria-label="Mitarbeiterzahl"
            >
              <option value="">Mitarbeiterzahl wählen...</option>
              <option value="Bis 9">Bis 9</option>
              <option value="10–49">10–49</option>
              <option value="50–249">50–249</option>
              <option value="250+">250+</option>
            </select>

            <select
              required
              value={form.entwicklung}
              onChange={(e) => update("entwicklung", e.target.value)}
              className={`${inputClass} mb-6`}
              aria-label="Entwickelt Ihr Unternehmen aktiv?"
            >
              <option value="">Entwickelt Ihr Unternehmen aktiv?</option>
              <option value="Ja, regelmäßig">Ja, regelmäßig</option>
              <option value="Ja, gelegentlich">Ja, gelegentlich</option>
              <option value="Nein / Unsicher">Nein / Unsicher</option>
            </select>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full text-center disabled:opacity-60"
            >
              {submitting ? "Wird gesendet..." : "Ersteinschätzung anfordern →"}
            </button>

            <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3 justify-center">
              <Lock size={12} />
              Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
