export default function SocialProof() {
  const stats = [
    { value: "500+", label: "geprüfte Projekte" },
    { value: "Ø €95.000", label: "Förderpotenzial pro Unternehmen" },
    { value: "98 %", label: "Bewilligungsquote" },
    { value: "3 Jahre", label: "rückwirkend möglich" },
  ];

  return (
    <section className="py-12 md:py-16 border-b border-border">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
