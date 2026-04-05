"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }
  return (
    <main className="min-h-screen" style={{ background: "#05050f", color: "#e8e8f0" }}>

      {/* NAV */}
      <nav
        className="flex items-center justify-between px-8 py-5 sticky top-0 z-50"
        style={{ background: "rgba(5,5,15,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a2e" }}
      >
        <span className="text-xl font-bold tracking-tight" style={{ color: "#a78bfa" }}>Sintari</span>
        <div className="hidden md:flex gap-8 text-sm" style={{ color: "#9ca3af" }}>
          <a href="#tjanster" className="hover:text-white transition-colors">Tjänster</a>
          <a href="#om" className="hover:text-white transition-colors">Om oss</a>
          <a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a>
        </div>
        <a
          href="#kontakt"
          className="px-5 py-2 rounded-lg text-sm font-medium"
          style={{ background: "#7c3aed", color: "white" }}
        >
          Boka samtal
        </a>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8"
          style={{ background: "#1a1a2e", color: "#a78bfa", border: "1px solid #2d2d4e" }}
        >
          <span style={{ background: "#7c3aed", borderRadius: "50%", width: 8, height: 8, display: "inline-block" }}></span>
          AI-konsult för svenska industriföretag
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl" style={{ letterSpacing: "-0.02em" }}>
          Spara tid med<br />
          <span style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            praktisk AI
          </span>
        </h1>
        <p className="text-xl max-w-2xl mb-10" style={{ color: "#9ca3af", lineHeight: 1.7 }}>
          Vi hjälper svenska tillverknings- och industriföretag att automatisera manuella processer,
          strukturera data och bygga smarta söksystem — utan att krångla till det.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#kontakt"
            className="px-8 py-4 rounded-xl text-base font-semibold"
            style={{ background: "#7c3aed", color: "white" }}
          >
            Boka gratis rådgivning →
          </a>
          <a
            href="#tjanster"
            className="px-8 py-4 rounded-xl text-base font-semibold"
            style={{ background: "#1a1a2e", color: "#e8e8f0", border: "1px solid #2d2d4e" }}
          >
            Se våra tjänster
          </a>
        </div>
      </section>

      {/* BRANSCHER */}
      <section className="py-12 px-6 text-center" style={{ borderTop: "1px solid #1a1a2e", borderBottom: "1px solid #1a1a2e" }}>
        <p className="text-sm mb-6" style={{ color: "#6b7280" }}>HJÄLPER FÖRETAG I SKARABORG OCH HELA SVERIGE</p>
        <div className="flex flex-wrap justify-center gap-12" style={{ color: "#4b5563" }}>
          <span className="text-lg font-semibold">Industri</span>
          <span className="text-lg font-semibold">Tillverkning</span>
          <span className="text-lg font-semibold">Logistik</span>
          <span className="text-lg font-semibold">Kommuner</span>
          <span className="text-lg font-semibold">Livsmedel</span>
        </div>
      </section>

      {/* TJÄNSTER */}
      <section id="tjanster" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Vad vi gör</h2>
          <p style={{ color: "#9ca3af" }} className="text-lg max-w-xl mx-auto">
            Tre konkreta tjänster — tydliga leveranser, fasta priser, inga överraskningar.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">

          <div className="rounded-2xl p-8 flex flex-col" style={{ background: "#0d0d1a", border: "1px solid #1a1a2e" }}>
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">AI-pilot</h3>
            <p style={{ color: "#9ca3af" }} className="mb-6 flex-1 leading-relaxed">
              Vi identifierar ett manuellt eller repetitivt problem i er verksamhet och bygger en proof-of-concept.
              Ni ser värdet innan ni bestämmer er för mer.
            </p>
            <div className="mt-auto">
              <div className="text-2xl font-bold mb-1">15 000 – 25 000 kr</div>
              <div className="text-sm mb-4" style={{ color: "#6b7280" }}>Fast pris · Leverans 2–3 veckor</div>
              <a
                href="#kontakt"
                className="block text-center py-3 rounded-xl text-sm font-medium"
                style={{ background: "#1a1a2e", color: "#a78bfa", border: "1px solid #2d2d4e" }}
              >
                Kom igång →
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-8 flex flex-col relative" style={{ background: "#1a0a2e", border: "2px solid #7c3aed" }}>
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold"
              style={{ background: "#7c3aed", color: "white" }}
            >
              POPULÄRAST
            </div>
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-3">RAG-system</h3>
            <p style={{ color: "#9ca3af" }} className="mb-6 flex-1 leading-relaxed">
              Era anställda ställer frågor — AI:n svarar från era egna dokument, manualer och rutiner.
              Slut på att leta i mappar och fråga kollegor.
            </p>
            <div className="mt-auto">
              <div className="text-2xl font-bold mb-1">30 000 – 50 000 kr</div>
              <div className="text-sm mb-4" style={{ color: "#9ca3af" }}>Fast pris · Leverans 3–6 veckor</div>
              <a
                href="#kontakt"
                className="block text-center py-3 rounded-xl text-sm font-medium"
                style={{ background: "#7c3aed", color: "white" }}
              >
                Kom igång →
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-8 flex flex-col" style={{ background: "#0d0d1a", border: "1px solid #1a1a2e" }}>
            <div className="text-3xl mb-4">🗂️</div>
            <h3 className="text-xl font-bold mb-3">Datastrukturering</h3>
            <p style={{ color: "#9ca3af" }} className="mb-6 flex-1 leading-relaxed">
              Rörig, inkonsekvent data som hindrar er från att använda AI. Vi städar, strukturerar
              och dokumenterar så att ni kan börja dra nytta av er information.
            </p>
            <div className="mt-auto">
              <div className="text-2xl font-bold mb-1">10 000 – 20 000 kr</div>
              <div className="text-sm mb-4" style={{ color: "#6b7280" }}>Fast pris · Leverans 1–2 veckor</div>
              <a
                href="#kontakt"
                className="block text-center py-3 rounded-xl text-sm font-medium"
                style={{ background: "#1a1a2e", color: "#a78bfa", border: "1px solid #2d2d4e" }}
              >
                Kom igång →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* OM OSS */}
      <section id="om" className="py-24 px-6" style={{ background: "#080810" }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Varför Sintari?</h2>
            <p style={{ color: "#9ca3af" }} className="text-lg mb-6 leading-relaxed">
              Vi är ett litet, fokuserat AI-konsultbolag baserat i Töreboda. Vi jobbar inte med
              stora, dyra implementationsprojekt som tar månader — vi levererar snabbt, konkret värde
              utan onödiga mellanhänder.
            </p>
            <p style={{ color: "#9ca3af" }} className="text-lg leading-relaxed">
              Vår specialitet är att ta er befintliga data och kunskap och göra den tillgänglig
              och användbar med modern AI-teknik.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "2–6", label: "veckor till leverans" },
              { num: "Fast", label: "pris, inga överraskningar" },
              { num: "100%", label: "fokus på ert problem" },
              { num: "Lokal", label: "konsult i Skaraborg" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-6" style={{ background: "#0d0d1a", border: "1px solid #1a1a2e" }}>
                <div className="text-2xl font-bold mb-1" style={{ color: "#a78bfa" }}>{item.num}</div>
                <div className="text-sm" style={{ color: "#9ca3af" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="py-24 px-6 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Boka ett gratis samtal</h2>
        <p style={{ color: "#9ca3af" }} className="text-lg mb-10">
          30 minuter. Inga säljpitchar. Vi lyssnar på er situation och berättar ärligt
          om vi kan hjälpa er.
        </p>
        <div className="rounded-2xl p-8 text-left" style={{ background: "#0d0d1a", border: "1px solid #1a1a2e" }}>
          {status === "sent" ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✓</div>
              <p className="text-lg font-semibold mb-2">Tack för din förfrågan!</p>
              <p style={{ color: "#9ca3af" }}>Jimmy återkommer inom 24 timmar.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Ditt namn *"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", color: "#e8e8f0" }}
                />
                <input
                  type="text"
                  placeholder="Företag"
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", color: "#e8e8f0" }}
                />
                <input
                  type="email"
                  placeholder="Din e-post *"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", color: "#e8e8f0" }}
                />
                <textarea
                  placeholder="Beskriv kortfattat vad ni brottas med (valfritt)"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", color: "#e8e8f0" }}
                />
                {status === "error" && (
                  <p className="text-sm text-red-400">Något gick fel. Maila direkt: jimmy@sintari.se</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 rounded-xl font-semibold text-base"
                  style={{ background: "#7c3aed", color: "white", opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? "Skickar..." : "Skicka →"}
                </button>
              </div>
            </form>
          )}
          <p className="text-center text-sm mt-4" style={{ color: "#6b7280" }}>
            Eller maila direkt:{" "}
            <a href="mailto:jimmy@sintari.se" style={{ color: "#a78bfa" }}>jimmy@sintari.se</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-sm" style={{ borderTop: "1px solid #1a1a2e", color: "#6b7280" }}>
        <p>
          © 2025 Sintari · Jimmy Berndtsson · Töreboda, Sverige ·{" "}
          <a href="mailto:jimmy@sintari.se" style={{ color: "#9ca3af" }}>jimmy@sintari.se</a>
        </p>
      </footer>

    </main>
  );
}
