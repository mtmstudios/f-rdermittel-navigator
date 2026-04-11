import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUtmParams } from "@/hooks/useUtmParams";
import { Lock, Clock, CheckCircle2, Phone } from "lucide-react";

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
    } catch (err) {
      console.error("Submission failed:", err);
      navigate("/danke");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-gray-300";

  const benefits = [
    { icon: Clock, text: "Antwort innerhalb von 24 Stunden" },
    { icon: CheckCircle2, text: "Vollständig kostenlos und unverbindlich" },
    { icon: Phone, text: "Persönliches Gespräch, kein Callcenter" },
  ];

  return (
    <section id="kontakt" className="section-padding">
      <div className="container-main" ref={ref}>
        <div className="fade-in-up grid md:grid-cols-2 gap-12 items-start max-w-[1000px] mx-auto">
          {/* Left */}
          <div className="md:sticky md:top-24">
            <p className="eyebrow">NÄCHSTER SCHRITT</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Kostenlose Ersteinschätzung anfragen
            </h2>
            <p className="body-text mb-8">
              In einem kurzen Gespräch prüfen wir, ob und in welchem Umfang die Forschungszulage für Ihr Unternehmen relevant ist.
            </p>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="text-accent" size={20} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xl"
          >
            <h3 className="font-bold text-lg mb-5">Ihre Daten</h3>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                required
                type="text"
                placeholder="Vorname"
                value={form.vorname}
                onChange={(e) => update("vorname", e.target.value)}
                className={inputClass}
                aria-label="Vorname"
              />
              <input
                required
                type="text"
                placeholder="Nachname"
                value={form.nachname}
                onChange={(e) => update("nachname", e.target.value)}
                className={inputClass}
                aria-label="Nachname"
              />
            </div>

            <input
              required
              type="text"
              placeholder="Unternehmen"
              value={form.unternehmen}
              onChange={(e) => update("unternehmen", e.target.value)}
              className={`${inputClass} mb-3`}
              aria-label="Unternehmen"
            />

            <input
              required
              type="email"
              placeholder="E-Mail"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={`${inputClass} mb-3`}
              aria-label="E-Mail"
            />

            <input
              required
              type="tel"
              placeholder="Telefon"
              value={form.telefon}
              onChange={(e) => update("telefon", e.target.value)}
              className={`${inputClass} mb-3`}
              aria-label="Telefon"
            />

            <select
              required
              value={form.mitarbeiter}
              onChange={(e) => update("mitarbeiter", e.target.value)}
              className={`${inputClass} mb-3`}
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
              className="btn-primary w-full text-center disabled:opacity-60 !text-base !py-4"
            >
              {submitting ? "Wird gesendet..." : "Ersteinschätzung anfordern →"}
            </button>

            <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-4 justify-center">
              <Lock size={12} />
              Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
