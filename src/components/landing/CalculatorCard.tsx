import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useUtmParams } from "@/hooks/useUtmParams";
import { ArrowRight, ArrowLeft, TrendingUp, Users, Coins, Building2, Lock, ChevronDown, Check, Info } from "lucide-react";
import { trackCalculatorStart, trackLead } from "@/lib/pixel";

/* ── Smooth count-up ── */
function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;
    const t0 = performance.now();
    function tick(now: number) {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(start + diff * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
      else prev.current = target;
    }
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

function fmt(v: number) {
  return v.toLocaleString("de-DE") + " €";
}
function fmtShort(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(".", ",") + " Mio. €";
  if (v >= 1_000) return Math.round(v / 1_000) + "k €";
  return fmt(v);
}

export default function CalculatorSection() {
  const ref = useScrollAnimation();
  const navigate = useNavigate();
  const utm = useUtmParams();

  /* Calculator state */
  const [mitarbeiter, setMitarbeiter] = useState(50);
  const [kostenPersonal, setKostenPersonal] = useState(400000);
  const [kostenSonstige, setKostenSonstige] = useState(0);
  const [kostenExtern, setKostenExtern] = useState(0);
  const [showExtern, setShowExtern] = useState(false);
  const [showSonstige, setShowSonstige] = useState(false);
  const [hasFired, setHasFired] = useState(false);

  /* Form state */
  const [view, setView] = useState<"calc" | "form">("calc");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", unternehmen: "", email: "", telefon: "" });
  const sectionRef = useRef<HTMLElement>(null);

  /* Calculation
     - Interne F&E-Personalkosten + sonstige F&E-Kosten: Ø 35 % (KMU) / 25 % (Großunternehmen)
     - Externe / beauftragte F&E-Kosten: Ø 21 % (KMU) / 15 % (Großunternehmen) */
  const isKmu = mitarbeiter < 250;
  const rateInternal = isKmu ? 0.35 : 0.25;
  const rateExtern = isKmu ? 0.21 : 0.15;
  const basisInternal = Math.min(kostenPersonal + kostenSonstige, 4_000_000);
  const perYear = Math.min(
    Math.round((basisInternal * rateInternal + kostenExtern * rateExtern) / 100) * 100,
    1_000_000,
  );
  const total3y = perYear * 3;

  const animPerYear = useCountUp(perYear);
  const animTotal = useCountUp(total3y);

  /* Pixel — CalculatorStart fires on first slider interaction (Upper-Funnel) */
  useEffect(() => {
    if (!hasFired && (mitarbeiter !== 50 || kostenPersonal !== 400000)) {
      setHasFired(true);
      trackCalculatorStart();
    }
  }, [mitarbeiter, kostenPersonal, hasFired]);

  const formCardRef = useRef<HTMLDivElement>(null);

  const switchToForm = () => {
    setView("form");
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  /* Listen for navbar CTA click — navbar already scrolled, just switch view */
  useEffect(() => {
    const handler = () => {
      setView("form");
    };
    window.addEventListener("open-form", handler);
    return () => window.removeEventListener("open-form", handler);
  }, []);

  const switchToCalc = () => {
    setView("calc");
    if (window.innerWidth >= 768) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      name: form.name,
      unternehmen: form.unternehmen,
      email: form.email,
      telefon: form.telefon,
      mitarbeiter: String(mitarbeiter),
      kostenPersonal: String(kostenPersonal),
      kostenExtern: String(kostenExtern),
      foerderpotenzial: String(perYear),
      ...utm,
    };
    try {
      const res = await fetch("https://mtmstudios.app.n8n.cloud/webhook/factonet-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Webhook error");
      trackLead({ value: perYear, currency: "EUR" });
      navigate("/danke");
    } catch {
      navigate("/danke");
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <section
      id="rechner"
      ref={sectionRef}
      className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[hsl(var(--background))]"
    >
      <div className="container-main" ref={ref}>
        <div className="fade-in-up">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#307abe] mb-2 md:mb-3">
              Förder-Rechner
            </p>
            <h2 className="text-[20px] sm:text-[28px] md:text-[40px] font-extrabold tracking-[-0.02em] mb-1.5 md:mb-3">
              Wie hoch könnte Ihre Förderung sein?
            </h2>
            <p className="text-[12px] sm:text-[15px] text-muted-foreground max-w-md mx-auto">
              Zwei Angaben genügen — Sie sehen Ihre Einschätzung sofort.
            </p>
          </div>

          {/* ═══════════════════════════════════════════════
              DESKTOP LAYOUT (md+)
              ═══════════════════════════════════════════════ */}
          <div className="hidden md:block">
            <div className="max-w-[960px] mx-auto grid md:grid-cols-[1fr,380px] gap-8 items-start">
              {/* Left: Sliders */}
              <div className="space-y-4">
                <SliderCard
                  icon={<Users size={18} className="text-[#307abe]" />}
                  label="Mitarbeiter"
                  value={mitarbeiter}
                  displayValue={String(mitarbeiter)}
                  min={1} max={500} step={1}
                  onChange={setMitarbeiter}
                  badge={isKmu ? "KMU — Ø 35 % Förderquote" : "Großunternehmen — 25 %"}
                  badgeVariant={isKmu ? "green" : "gray"}
                  minLabel="1" maxLabel="500+"
                />
                <SliderCard
                  icon={<Coins size={18} className="text-[#307abe]" />}
                  label="Personalkosten Entwicklung / Jahr"
                  value={kostenPersonal}
                  displayValue={fmtShort(kostenPersonal)}
                  min={50000} max={4000000} step={10000}
                  onChange={setKostenPersonal}
                  minLabel="50k €" maxLabel="4 Mio. €"
                />
                {!showSonstige ? (
                  <button
                    onClick={() => setShowSonstige(true)}
                    className="flex items-center gap-2 text-[13px] text-[#307abe] font-medium hover:text-[#2968a3] transition-colors pl-1 cursor-pointer"
                  >
                    <ChevronDown size={14} />
                    Sonstige Entwicklungs- und Forschungskosten hinzufügen
                  </button>
                ) : (
                  <div>
                    <SliderCard
                      icon={<Coins size={18} className="text-[#307abe]" />}
                      label="Sonstige Entwicklungs- und Forschungskosten"
                      sublabel="(gleiche Förderquote wie Personalkosten)"
                      value={kostenSonstige}
                      displayValue={kostenSonstige === 0 ? "—" : fmtShort(kostenSonstige)}
                      min={0} max={2000000} step={10000}
                      onChange={setKostenSonstige}
                      minLabel="0 €" maxLabel="2 Mio. €"
                    />
                    <button
                      onClick={() => { setShowSonstige(false); setKostenSonstige(0); }}
                      className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mt-2 pl-1 cursor-pointer"
                    >
                      <ChevronDown size={13} className="rotate-180" />
                      Sonstige Kosten entfernen
                    </button>
                  </div>
                )}
                {!showExtern ? (
                  <button
                    onClick={() => setShowExtern(true)}
                    className="flex items-center gap-2 text-[13px] text-[#307abe] font-medium hover:text-[#2968a3] transition-colors pl-1 cursor-pointer"
                  >
                    <ChevronDown size={14} />
                    Externe oder beauftragte F&E-Kosten hinzufügen
                  </button>
                ) : (
                  <div>
                    <SliderCard
                      icon={<Building2 size={18} className="text-[#307abe]" />}
                      label="Externe oder beauftragte F&E-Kosten"
                      sublabel="(Ø 21 % Förderquote)"
                      value={kostenExtern}
                      displayValue={kostenExtern === 0 ? "—" : fmtShort(kostenExtern)}
                      min={0} max={2000000} step={10000}
                      onChange={setKostenExtern}
                      minLabel="0 €" maxLabel="2 Mio. €"
                    />
                    <button
                      onClick={() => { setShowExtern(false); setKostenExtern(0); }}
                      className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mt-2 pl-1 cursor-pointer"
                    >
                      <ChevronDown size={13} className="rotate-180" />
                      Externe Kosten entfernen
                    </button>
                  </div>
                )}

                {/* Disclaimer — directly under sliders */}
                <div className="flex items-start gap-2.5 pt-2">
                  <Info size={13} className="text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-muted-foreground/60 leading-[1.6]">
                    <span className="font-semibold text-muted-foreground/80">Indikative Schätzung — kein verbindlicher Wert.</span>{" "}
                    Die tatsächliche Förderhöhe hängt von der individuellen Prüfung Ihrer Projekte ab. Keine Steuerberatung.
                  </p>
                </div>
              </div>

              {/* Right: Result Card (sticky) */}
              <div className="sticky top-24">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/[0.06]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a30] via-[#102442] to-[#0c1a30]" />
                  <div className="absolute top-0 right-0 w-48 h-48 opacity-15 pointer-events-none"
                    style={{ background: "radial-gradient(circle, #307abe 0%, transparent 70%)" }} />

                  <div className="relative p-7">
                    {view === "calc" ? (
                      <>
                        {/* Estimate badge */}
                        <div className="flex justify-center mb-5">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#57a7dd]/60 bg-[#57a7dd]/[0.08] px-3 py-1 rounded-full border border-[#57a7dd]/10">
                            Indikative Schätzung — kein verbindlicher Wert
                          </span>
                        </div>

                        {/* Result Display */}
                        <div className="mb-5 text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <TrendingUp size={14} className="text-[#57a7dd]" />
                            <p className="text-[11px] text-white/40 uppercase tracking-wider font-medium">Pro Jahr</p>
                          </div>
                          <p className="text-[44px] font-extrabold text-white tracking-tight leading-none">
                            {fmt(animPerYear)}
                          </p>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

                        <div className="grid grid-cols-2 gap-4 mb-5">
                          <div className="bg-white/[0.04] rounded-xl px-3 py-3 text-center border border-white/[0.04]">
                            <p className="text-[10px] text-white/35 mb-1">3 Jahre gesamt</p>
                            <p className="text-[19px] font-bold text-white">{fmtShort(animTotal)}</p>
                          </div>
                          <div className="bg-white/[0.04] rounded-xl px-3 py-3 text-center border border-white/[0.04]">
                            <p className="text-[10px] text-white/35 mb-1">Förderquote</p>
                            <p className="text-[19px] font-bold text-white">{isKmu ? "35" : "25"} %</p>
                          </div>
                        </div>

                        <div className="bg-white/[0.05] rounded-xl px-4 py-3 mb-6 border border-white/[0.06]">
                          <p className="text-[12px] text-white/55 leading-relaxed">
                            <span className="text-[#57a7dd] font-semibold">Bis zu 4 Jahre rückwirkend</span> —
                            bis zu <span className="text-white font-semibold">{fmtShort(perYear * 4)}</span> möglich.
                          </p>
                        </div>

                        <button
                          onClick={switchToForm}
                          className="btn-shimmer flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#307abe]/20 cursor-pointer"
                        >
                          Kostenlose Ersteinschätzung anfordern
                          <ArrowRight size={16} />
                        </button>
                        <p className="text-center text-[11px] text-white/25 mt-3">Unverbindlich · Antwort innerhalb von 48h</p>
                      </>
                    ) : (
                      /* ── Form View ── */
                      <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <p className="text-[10px] text-white/35 uppercase tracking-wider font-medium mb-0.5">Geschätzte Förderung</p>
                            <p className="text-[28px] font-extrabold text-white tracking-tight leading-none">{fmt(animPerYear)}<span className="text-[14px] text-white/35 font-medium"> / Jahr</span></p>
                          </div>
                        </div>

                        <div className="h-px bg-white/10 mb-5" />

                        <p className="text-[14px] text-white/55 font-medium mb-4">
                          Lassen Sie Ihre Projekte von einem Wirtschaftsprüfer prüfen:
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-3">
                          <input required type="text" placeholder="Ihr Name" value={form.name}
                            onChange={e => update("name", e.target.value)}
                            className="calc-input" autoComplete="name" autoFocus />
                          <input required type="text" placeholder="Unternehmen" value={form.unternehmen}
                            onChange={e => update("unternehmen", e.target.value)}
                            className="calc-input" autoComplete="organization" />
                          <input required type="tel" inputMode="tel" placeholder="Telefonnummer" value={form.telefon}
                            onChange={e => update("telefon", e.target.value)}
                            className="calc-input" autoComplete="tel" />
                          <input required type="email" inputMode="email" placeholder="E-Mail-Adresse" value={form.email}
                            onChange={e => update("email", e.target.value)}
                            className="calc-input" autoComplete="email" />
                          <button type="submit" disabled={submitting}
                            className="btn-shimmer flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#307abe]/20 disabled:opacity-60 cursor-pointer">
                            {submitting ? "Wird gesendet..." : (
                              <>Ersteinschätzung anfordern<ArrowRight size={16} /></>
                            )}
                          </button>
                        </form>

                        <p className="flex items-center gap-1.5 text-[11px] text-white/25 justify-center mt-3">
                          <Lock size={11} /> Kostenlos & unverbindlich
                        </p>

                        <button onClick={switchToCalc}
                          className="flex items-center gap-1.5 text-[12px] text-white/25 hover:text-white/45 transition-colors mt-4 mx-auto cursor-pointer">
                          <ArrowLeft size={12} /> Zurück zum Rechner
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              MOBILE LAYOUT — View Switch
              ═══════════════════════════════════════════════ */}
          <div className="md:hidden max-w-[480px] mx-auto" ref={formCardRef}>
            {view === "calc" ? (
              <div className="animate-fade-in" key="calc">
                {/* Result Card */}
                <div className="rotating-border mb-5">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "linear-gradient(160deg, #0c1a30 0%, #102442 50%, #0c1a30 100%)" }}
                >
                  <div className="px-5 py-5 text-center">
                    {/* Estimate badge */}
                    <span className="inline-block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#57a7dd]/60 bg-[#57a7dd]/[0.08] px-2.5 py-0.5 rounded-full border border-[#57a7dd]/10 mb-3">
                      Indikative Schätzung — kein verbindlicher Wert
                    </span>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp size={13} className="text-[#57a7dd]" />
                      <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Pro Jahr</p>
                    </div>
                    <p className="text-[34px] sm:text-[40px] font-extrabold text-white tracking-tight leading-none mb-3 overflow-hidden">
                      {fmt(animPerYear)}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-[12px] mb-3">
                      <span className="text-white/40">
                        3 Jahre: <span className="text-white font-semibold">{fmtShort(animTotal)}</span>
                      </span>
                      <span className="text-white/40">
                        Quote: <span className="text-white font-semibold">{isKmu ? "35" : "25"} %</span>
                      </span>
                    </div>
                    <div className="bg-white/[0.06] rounded-lg px-3 py-2 border border-white/[0.06]">
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        <span className="text-[#57a7dd] font-semibold">Bis zu 4 Jahre rückwirkend</span> — bis zu <span className="text-white font-semibold">{fmtShort(perYear * 4)}</span> möglich
                      </p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Sliders */}
                <div className="space-y-3 mb-5">
                  <SliderCard
                    icon={<Users size={16} className="text-[#307abe]" />}
                    label="Mitarbeiter"
                    value={mitarbeiter}
                    displayValue={String(mitarbeiter)}
                    min={1} max={500} step={1}
                    onChange={setMitarbeiter}
                    badge={isKmu ? "KMU · Ø 35 %" : "25 %"}
                    badgeVariant={isKmu ? "green" : "gray"}
                    compact
                  />
                  <SliderCard
                    icon={<Coins size={16} className="text-[#307abe]" />}
                    label="Personalkosten Entwicklung"
                    value={kostenPersonal}
                    displayValue={fmtShort(kostenPersonal)}
                    min={50000} max={4000000} step={10000}
                    onChange={setKostenPersonal}
                    compact
                  />
                  {!showSonstige ? (
                    <button
                      onClick={() => setShowSonstige(true)}
                      className="flex items-center gap-1.5 text-[12px] text-[#307abe] font-medium hover:text-[#2968a3] transition-colors cursor-pointer"
                    >
                      <ChevronDown size={13} />
                      Sonstige Entwicklungs- und Forschungskosten hinzufügen
                    </button>
                  ) : (
                    <div>
                      <SliderCard
                        icon={<Coins size={16} className="text-[#307abe]" />}
                        label="Sonstige F&E-Kosten"
                        sublabel="gleiche Quote wie Personal"
                        value={kostenSonstige}
                        displayValue={kostenSonstige === 0 ? "—" : fmtShort(kostenSonstige)}
                        min={0} max={2000000} step={10000}
                        onChange={setKostenSonstige}
                        compact
                      />
                      <button
                        onClick={() => { setShowSonstige(false); setKostenSonstige(0); }}
                        className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors mt-1.5 cursor-pointer"
                      >
                        <ChevronDown size={12} className="rotate-180" />
                        Sonstige entfernen
                      </button>
                    </div>
                  )}
                  {!showExtern ? (
                    <button
                      onClick={() => setShowExtern(true)}
                      className="flex items-center gap-1.5 text-[12px] text-[#307abe] font-medium hover:text-[#2968a3] transition-colors cursor-pointer"
                    >
                      <ChevronDown size={13} />
                      Externe oder beauftragte F&E-Kosten hinzufügen
                    </button>
                  ) : (
                    <div>
                      <SliderCard
                        icon={<Building2 size={16} className="text-[#307abe]" />}
                        label="Externe / beauftragte F&E"
                        sublabel="Ø 21 % Förderquote"
                        value={kostenExtern}
                        displayValue={kostenExtern === 0 ? "—" : fmtShort(kostenExtern)}
                        min={0} max={2000000} step={10000}
                        onChange={setKostenExtern}
                        compact
                      />
                      <button
                        onClick={() => { setShowExtern(false); setKostenExtern(0); }}
                        className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors mt-1.5 cursor-pointer"
                      >
                        <ChevronDown size={12} className="rotate-180" />
                        Externe entfernen
                      </button>
                    </div>
                  )}
                </div>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-4 mb-4 text-[11px] text-muted-foreground/70">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Wirtschaftsprüfer
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Erfolgsbasiert
                  </span>
                </div>

                <button
                  onClick={switchToForm}
                  className="btn-shimmer flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[15px] transition-all duration-200 shadow-lg cursor-pointer"
                >
                  Kostenlose Ersteinschätzung
                  <ArrowRight size={16} />
                </button>
                <p className="text-center text-[10px] text-muted-foreground/50 mt-3">
                  Unverbindlich · Antwort innerhalb von 48h
                </p>
              </div>
            ) : (
              <div className="animate-fade-in" key="form">
                {/* Glow wrapper */}
                <div className="rounded-2xl p-px bg-gradient-to-b from-[#307abe]/30 via-[#307abe]/10 to-transparent">
                  <div
                    className="rounded-2xl overflow-hidden shadow-2xl"
                    style={{ background: "linear-gradient(160deg, #0c1a30 0%, #102442 50%, #0c1a30 100%)" }}
                  >
                    <div className="p-5">
                      {/* Result reminder */}
                      <div className="text-center mb-4">
                        <p className="text-[10px] text-white/35 uppercase tracking-wider font-medium mb-1">Geschätzte Förderung</p>
                        <p className="text-[28px] font-extrabold text-white tracking-tight leading-none">
                          {fmt(animPerYear)}<span className="text-[13px] text-white/30 font-medium"> / Jahr</span>
                        </p>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

                      <p className="text-[12px] text-white/40 text-center mb-4 font-medium">
                        Lassen Sie Ihre Projekte von einem Wirtschaftsprüfer prüfen:
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-2.5">
                          <input required type="text" placeholder="Name" value={form.name}
                            onChange={e => update("name", e.target.value)}
                            className="calc-input !py-3 !text-[14px]" autoComplete="name" />
                          <input required type="text" placeholder="Firma" value={form.unternehmen}
                            onChange={e => update("unternehmen", e.target.value)}
                            className="calc-input !py-3 !text-[14px]" autoComplete="organization" />
                        </div>
                        <input required type="tel" inputMode="tel" placeholder="Telefonnummer" value={form.telefon}
                          onChange={e => update("telefon", e.target.value)}
                          className="calc-input !py-3 !text-[14px]" autoComplete="tel" />
                        <input required type="email" inputMode="email" placeholder="E-Mail-Adresse" value={form.email}
                          onChange={e => update("email", e.target.value)}
                          className="calc-input !py-3 !text-[14px]" autoComplete="email" />
                        <button type="submit" disabled={submitting}
                          className="btn-shimmer flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#307abe] hover:bg-[#2968a3] text-white font-semibold text-[15px] transition-all duration-200 disabled:opacity-60 cursor-pointer">
                          {submitting ? "Wird gesendet..." : (
                            <>Ersteinschätzung anfordern<ArrowRight size={16} /></>
                          )}
                        </button>
                      </form>

                      <div className="flex items-center justify-center gap-5 mt-3.5">
                        <span className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium">
                          <Lock size={10} className="text-white/20" /> Vertraulich
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium">
                          <Check size={10} className="text-emerald-400/50" /> Kostenlos
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium">
                          <Check size={10} className="text-emerald-400/50" /> Unverbindlich
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={switchToCalc}
                  className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mt-4 mx-auto cursor-pointer">
                  <ArrowLeft size={12} /> Werte anpassen
                </button>
              </div>
            )}

            {/* Mobile disclaimer */}
            <p className="text-center text-[10px] text-muted-foreground/40 mt-4 px-4 leading-[1.6]">
              Unverbindliche Einschätzung auf Basis Ihrer Angaben. Die tatsächliche Förderhöhe wird individuell geprüft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SLIDER CARD COMPONENT
   ═══════════════════════════════════════════════ */
interface SliderCardProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  badge?: string;
  badgeVariant?: "green" | "gray";
  minLabel?: string;
  maxLabel?: string;
  compact?: boolean;
}

function SliderCard({
  icon, label, sublabel, value, displayValue, min, max, step, onChange,
  badge, badgeVariant = "green", minLabel, maxLabel, compact,
}: SliderCardProps) {
  const padding = compact ? "p-4" : "p-5 sm:p-6";
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`bg-white rounded-2xl border border-border/60 ${padding} shadow-sm hover:shadow-md transition-shadow duration-300`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`${compact ? "w-8 h-8" : "w-9 h-9"} rounded-xl bg-[#307abe]/10 flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`${compact ? "text-[12px]" : "text-[13px] sm:text-[14px]"} font-semibold text-foreground leading-tight`}>
            {label}
            {sublabel && <span className="text-muted-foreground font-normal text-[11px] ml-1.5">{sublabel}</span>}
          </p>
        </div>
        <span className={`${compact ? "text-[17px]" : "text-[20px] sm:text-[26px]"} font-bold text-foreground tabular-nums whitespace-nowrap`}>
          {displayValue}
        </span>
      </div>
      <div className="relative">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full accent-[#307abe] relative z-10" aria-label={label}
          style={{
            background: `linear-gradient(to right, hsl(210 60% 46%) ${pct}%, hsl(var(--border)) ${pct}%)`
          }}
        />
      </div>
      {(minLabel || maxLabel || badge) && (
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[10px] text-muted-foreground">{minLabel}</span>
          {badge && (
            <span className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              badgeVariant === "green"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-gray-100 text-gray-600"
            }`}>
              {badge}
            </span>
          )}
          <span className="text-[10px] text-muted-foreground">{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
