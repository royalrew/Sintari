"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const services = [
    {
      index: "01",
      title: "AI-pilot",
      desc: "Vi identifierar ett manuellt eller repetitivt problem och bygger en proof-of-concept. Ni ser värdet innan ni bestämmer er för mer.",
      price: "15 000 – 25 000 kr",
      duration: "2–3 veckor",
      tags: ["Automatisering", "Processer", "POC"],
    },
    {
      index: "02",
      title: "RAG-system",
      desc: "Era anställda frågar — AI:n svarar från era egna dokument, manualer och rutiner. Slut på att leta och fråga runt.",
      price: "30 000 – 50 000 kr",
      duration: "3–6 veckor",
      tags: ["Dokumentsökning", "Kunskapsbas", "LLM"],
    },
    {
      index: "03",
      title: "Datastrukturering",
      desc: "Rörig data hindrar er från att använda AI. Vi städar, strukturerar och dokumenterar så att informationen kan börja arbeta.",
      price: "10 000 – 20 000 kr",
      duration: "1–2 veckor",
      tags: ["Datakvalitet", "ETL", "Analys"],
    },
  ];

  const marqueeItems = [
    "Industri", "·", "Tillverkning", "·", "Logistik", "·",
    "Livsmedel", "·", "Kommuner", "·", "Fastighet", "·",
    "Industri", "·", "Tillverkning", "·", "Logistik", "·",
    "Livsmedel", "·", "Kommuner", "·", "Fastighet", "·",
  ];

  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>

      {/* ─── NAV ─── */}
      <header style={{
        position: "fixed", inset: "0 0 auto 0", zIndex: 100,
        height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(24px, 5vw, 64px)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(8,8,8,0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
      }}>
        <span style={{ fontWeight: 800, fontSize: "14px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Sintari
        </span>

        <nav style={{ display: "flex", gap: "36px", fontSize: "13px", color: "var(--muted)" }}>
          {[["Tjänster", "#tjanster"], ["Om", "#om"], ["Kontakt", "#kontakt"]].map(([label, href]) => (
            <a key={href} href={href}
              style={{ transition: "color 0.15s" }}
              onMouseOver={e => e.currentTarget.style.color = "var(--fg)"}
              onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}
            >{label}</a>
          ))}
        </nav>

        <a href="#kontakt" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "7px 16px",
          fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em",
          border: "1px solid var(--border)",
          transition: "border-color 0.15s, color 0.15s",
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--fg)"; }}
        >
          Boka samtal
          <span style={{ fontSize: "14px" }}>↗</span>
        </a>
      </header>

      {/* ─── HERO ─── */}
      <section style={{
        paddingTop: "clamp(120px, 18vh, 180px)",
        paddingBottom: "clamp(80px, 12vh, 140px)",
        paddingLeft: "clamp(24px, 5vw, 64px)",
        paddingRight: "clamp(24px, 5vw, 64px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <p className="fade-up fade-up-1" style={{
          fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--muted)", marginBottom: "clamp(32px, 5vh, 56px)",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{
            display: "inline-block", width: "6px", height: "6px",
            borderRadius: "50%", background: "var(--accent)",
            boxShadow: "0 0 8px var(--accent)",
          }} />
          Töreboda, Sverige — AI-konsult
        </p>

        <h1 className="fade-up fade-up-2" style={{
          fontSize: "clamp(52px, 10vw, 128px)",
          fontWeight: 900,
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          marginBottom: "clamp(40px, 6vh, 72px)",
          maxWidth: "14ch",
        }}>
          AI som<br />
          <em style={{ fontStyle: "normal", color: "var(--accent)" }}>faktiskt</em><br />
          används.
        </h1>

        <div className="fade-up fade-up-3" style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", flexWrap: "wrap", gap: "40px",
        }}>
          <p style={{
            fontSize: "clamp(15px, 2vw, 19px)", color: "var(--muted)",
            maxWidth: "44ch", lineHeight: 1.75,
          }}>
            Praktisk AI för svenska industri- och tillverkningsföretag.
            Inga mångelånga projekt — konkret resultat på 2 till 6 veckor, fast pris.
          </p>

          <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
            <a href="#kontakt" style={{
              padding: "14px 28px",
              background: "var(--accent)", color: "var(--bg)",
              fontWeight: 800, fontSize: "12px",
              letterSpacing: "0.08em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: "10px",
              transition: "opacity 0.15s",
            }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.88"}
              onMouseOut={e => e.currentTarget.style.opacity = "1"}
            >
              Gratis rådgivning
              <span style={{ fontSize: "16px" }}>→</span>
            </a>
            <a href="#tjanster" style={{
              padding: "14px 28px",
              border: "1px solid var(--border)", color: "var(--fg)",
              fontWeight: 500, fontSize: "12px",
              letterSpacing: "0.08em", textTransform: "uppercase",
              transition: "border-color 0.15s",
            }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--muted)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              Tjänster
            </a>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div style={{
        overflow: "hidden", borderBottom: "1px solid var(--border)",
        padding: "20px 0",
      }}>
        <div className="marquee-track" style={{ display: "flex", gap: "32px", width: "max-content" }}>
          {marqueeItems.map((item, i) => (
            <span key={i} style={{
              fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase",
              color: item === "·" ? "var(--border)" : "var(--muted)",
              whiteSpace: "nowrap",
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        borderBottom: "1px solid var(--border)",
      }}>
        {[
          { value: "2–6", label: "Veckor till leverans" },
          { value: "Fast", label: "Pris, inga överraskningar" },
          { value: "3", label: "Fokuserade tjänster" },
          { value: "Lokal", label: "Konsult i Skaraborg" },
        ].map((s, i, arr) => (
          <div key={i} style={{
            padding: "clamp(28px, 4vw, 48px) clamp(24px, 3vw, 40px)",
            borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{
              fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900,
              letterSpacing: "-0.03em", color: "var(--fg)", lineHeight: 1,
              marginBottom: "8px",
            }}>{s.value}</div>
            <div style={{ fontSize: "12px", color: "var(--muted)", letterSpacing: "0.04em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─── SERVICES ─── */}
      <section id="tjanster" style={{
        padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          marginBottom: "clamp(48px, 7vh, 80px)",
          paddingBottom: "24px", borderBottom: "1px solid var(--border)",
        }}>
          <h2 style={{
            fontSize: "clamp(13px, 2vw, 15px)", fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)",
          }}>Tjänster</h2>
          <span style={{ fontSize: "12px", color: "var(--muted)", letterSpacing: "0.06em" }}>
            Tre avgränsade leveranser
          </span>
        </div>

        <div>
          {services.map((s, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredService(i)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "clamp(40px, 6vw, 72px) 1fr auto",
                gap: "clamp(16px, 3vw, 40px)",
                padding: "clamp(28px, 4vh, 44px) 0",
                borderBottom: "1px solid var(--border)",
                cursor: "default",
                transition: "background 0.2s",
                background: hoveredService === i ? "rgba(212,245,60,0.02)" : "transparent",
              }}
            >
              <div style={{
                fontSize: "12px", color: "var(--muted)", paddingTop: "6px",
                letterSpacing: "0.06em", transition: "color 0.2s",
                ...(hoveredService === i && { color: "var(--accent)" }),
              }}>{s.index}</div>

              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "24px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <h3 style={{
                    fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800,
                    letterSpacing: "-0.02em", lineHeight: 1.1,
                    transition: "color 0.2s",
                    ...(hoveredService === i && { color: "var(--accent)" }),
                  }}>{s.title}</h3>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {s.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: "11px", padding: "3px 10px",
                        border: "1px solid var(--border)",
                        color: "var(--muted)", letterSpacing: "0.06em",
                        transition: "border-color 0.2s",
                        ...(hoveredService === i && { borderColor: "rgba(212,245,60,0.3)" }),
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <p style={{
                  fontSize: "clamp(13px, 1.5vw, 15px)", color: "var(--muted)",
                  lineHeight: 1.75, maxWidth: "56ch",
                }}>{s.desc}</p>
              </div>

              <div style={{ textAlign: "right", paddingTop: "6px", flexShrink: 0 }}>
                <div style={{
                  fontSize: "clamp(14px, 1.5vw, 17px)", fontWeight: 700,
                  marginBottom: "4px", whiteSpace: "nowrap",
                }}>{s.price}</div>
                <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "20px", whiteSpace: "nowrap" }}>{s.duration}</div>
                <a href="#kontakt" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: hoveredService === i ? "var(--accent)" : "var(--muted)",
                  borderBottom: `1px solid ${hoveredService === i ? "var(--accent)" : "transparent"}`,
                  paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s",
                }}>
                  Kom igång <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── OM ─── */}
      <section id="om" style={{
        padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
          gap: "clamp(48px, 8vw, 100px)",
        }}>
          <div>
            <p style={{
              fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--muted)", marginBottom: "40px",
            }}>Om Sintari</p>
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 900,
              letterSpacing: "-0.03em", lineHeight: 1.05,
              marginBottom: "32px",
            }}>
              Ingen onödig<br />
              komplexitet.<br />
              <span style={{ color: "var(--accent)" }}>Bara resultat.</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "24px" }}>
            <p style={{ fontSize: "clamp(14px, 1.6vw, 16px)", color: "var(--muted)", lineHeight: 1.85 }}>
              Sintari är ett AI-konsultbolag i Töreboda. Vi jobbar inte med mångelånga
              projekt med osäkert utfall — vi levererar avgränsade lösningar med fast
              pris och tydlig tidslinje.
            </p>
            <p style={{ fontSize: "clamp(14px, 1.6vw, 16px)", color: "var(--muted)", lineHeight: 1.85 }}>
              Vår erfarenhet ligger i RAG-system, datastädning och AI-automatisering —
              tekniker som fungerar i produktion. Vi riktar oss till industri- och
              tillverkningsföretag i Skaraborg och hela Sverige.
            </p>
            <div style={{ display: "flex", gap: "40px", paddingTop: "16px" }}>
              {[["RAG", "Retrieval-Augmented Generation"], ["ETL", "Datastrukturering"], ["LLM", "Språkmodeller"]].map(([abbr, full]) => (
                <div key={abbr}>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--fg)", marginBottom: "4px" }}>{abbr}</div>
                  <div style={{ fontSize: "11px", color: "var(--muted)" }}>{full}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── KONTAKT ─── */}
      <section id="kontakt" style={{
        padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
          gap: "clamp(48px, 8vw, 100px)",
          alignItems: "start",
        }}>
          <div>
            <p style={{
              fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--muted)", marginBottom: "40px",
            }}>Kontakt</p>
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 900,
              letterSpacing: "-0.03em", lineHeight: 1.05,
              marginBottom: "32px",
            }}>
              Boka ett gratis<br />
              30-minuterssamtal.
            </h2>
            <p style={{ fontSize: "clamp(14px, 1.6vw, 16px)", color: "var(--muted)", lineHeight: 1.85, marginBottom: "48px" }}>
              Vi lyssnar på er situation och berättar ärligt om vi kan hjälpa er.
              Inga säljpitchar, inga förpliktelser.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                ["E-post", "jimmy@sintari.se", "mailto:jimmy@sintari.se"],
                ["Plats", "Töreboda, Skaraborg", null],
              ].map(([label, value, href]) => (
                <div key={label as string}>
                  <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>{label}</div>
                  {href ? (
                    <a href={href as string} style={{ fontSize: "16px", fontWeight: 500, transition: "color 0.15s" }}
                      onMouseOver={e => e.currentTarget.style.color = "var(--accent)"}
                      onMouseOut={e => e.currentTarget.style.color = "var(--fg)"}
                    >{value}</a>
                  ) : (
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div>
            {status === "sent" ? (
              <div style={{
                padding: "clamp(40px, 6vw, 64px)",
                border: "1px solid var(--border)",
                display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px",
              }}>
                <div style={{ fontSize: "40px", fontWeight: 900, color: "var(--accent)", letterSpacing: "-0.03em" }}>Tack.</div>
                <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>
                  Din förfrågan är mottagen. Jimmy återkommer inom 24 timmar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {[
                  { key: "name", label: "Namn", required: true, type: "text" },
                  { key: "company", label: "Företag", required: false, type: "text" },
                  { key: "email", label: "E-post", required: true, type: "email" },
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: 0, borderBottom: "1px solid var(--border)" }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      paddingTop: "20px", paddingBottom: "6px",
                    }}>
                      <label style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>
                        {field.label}
                      </label>
                      {field.required && <span style={{ fontSize: "10px", color: "var(--muted)" }}>Krävs</span>}
                    </div>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={{
                        width: "100%", background: "transparent", border: "none", outline: "none",
                        color: "var(--fg)", fontSize: "16px", paddingBottom: "20px",
                        caretColor: "var(--accent)",
                      }}
                    />
                  </div>
                ))}

                <div style={{ borderBottom: "1px solid var(--border)" }}>
                  <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", padding: "20px 0 6px" }}>
                    Meddelande
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Beskriv kortfattat vad ni brottas med..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{
                      width: "100%", background: "transparent", border: "none", outline: "none",
                      color: "var(--fg)", fontSize: "15px", paddingBottom: "20px",
                      resize: "none", caretColor: "var(--accent)",
                    }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#ff5555", fontSize: "13px", marginTop: "16px" }}>
                    Något gick fel. Maila <a href="mailto:jimmy@sintari.se" style={{ textDecoration: "underline" }}>jimmy@sintari.se</a> direkt.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    marginTop: "32px",
                    display: "inline-flex", alignItems: "center", gap: "12px",
                    padding: "16px 32px",
                    background: "var(--accent)", color: "var(--bg)",
                    border: "none", cursor: "pointer",
                    fontWeight: 800, fontSize: "12px",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    transition: "opacity 0.15s",
                    opacity: status === "sending" ? 0.6 : 1,
                  }}
                  onMouseOver={e => { if (status !== "sending") e.currentTarget.style.opacity = "0.85"; }}
                  onMouseOut={e => { e.currentTarget.style.opacity = status === "sending" ? "0.6" : "1"; }}
                >
                  {status === "sending" ? "Skickar..." : "Skicka förfrågan"}
                  {status !== "sending" && <span style={{ fontSize: "16px" }}>→</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "28px clamp(24px, 5vw, 64px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "16px",
      }}>
        <span style={{ fontWeight: 800, fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Sintari</span>
        <span style={{ fontSize: "12px", color: "var(--muted)" }}>© 2025 Jimmy Berndtsson · Töreboda</span>
        <a href="mailto:jimmy@sintari.se" style={{
          fontSize: "12px", color: "var(--muted)", transition: "color 0.15s",
        }}
          onMouseOver={e => e.currentTarget.style.color = "var(--fg)"}
          onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}
        >jimmy@sintari.se</a>
      </footer>

    </div>
  );
}
