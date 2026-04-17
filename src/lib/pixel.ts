/**
 * Meta Pixel Helper — zentrale Stelle für alle fbq-Calls.
 *
 * Die Base-Pixel-Initialisierung läuft in index.html (Page-Load-Event).
 * Hier nur die Custom-Funnel-Events:
 *
 *   - trackCalculatorStart  — User interagiert erstmals mit dem Rechner (Upper-Funnel)
 *   - trackCalculatorResult — Rechner hat Ergebnis angezeigt (Mid-Funnel)
 *   - trackLead             — Formular abgesendet (Primary Goal)
 *   - trackCompleteRegistration — Danke-Seite geladen (Ground Truth)
 *
 * Alle Events sind idempotent pro Session (feuern max. 1×), damit
 * Refreshes / Remounts die Meta-Optimierung nicht verzerren.
 */

type FbqFn = (command: string, event: string, params?: Record<string, unknown>) => void;

const fired = new Set<string>();

function fbq(): FbqFn | null {
  if (typeof window === "undefined") return null;
  const fn = (window as unknown as { fbq?: FbqFn }).fbq;
  return typeof fn === "function" ? fn : null;
}

function track(eventName: string, params?: Record<string, unknown>, once = true) {
  if (once && fired.has(eventName)) return;
  fired.add(eventName);
  const f = fbq();
  if (!f) return;
  f("track", eventName, params);
}

export const trackCalculatorStart = () =>
  track("ViewContent", {
    content_name: "Förder-Rechner Start",
    content_category: "calculator_start",
  });

export const trackCalculatorResult = () =>
  track("ViewContent", {
    content_name: "Förder-Rechner Ergebnis",
    content_category: "calculator_result",
  });

export const trackLead = (params?: { value?: number; currency?: string }) =>
  track("Lead", {
    content_name: "Forschungszulage Ersteinschätzung",
    content_category: "lead_form",
    currency: params?.currency ?? "EUR",
    ...(params?.value != null && { value: params.value }),
  });

export const trackCompleteRegistration = () =>
  track("CompleteRegistration", {
    content_name: "Lead bestätigt (Danke-Seite)",
    content_category: "thank_you",
  });
