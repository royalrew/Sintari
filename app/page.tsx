"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Zap, Search, Database, Bot, BrainCircuit, Layers } from "lucide-react";
import GlitchIcon from "./components/GlitchIcon";
import ShinyText from "./components/ShinyText";
import SpotlightCard from "./components/SpotlightCard";
import CountUp from "./components/CountUp";

const NeuralNet = dynamic(() => import("./components/NeuralNet"), { ssr: false });

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
      icon: <Search size={28} strokeWidth={1.5} />,
      title: "AI-genomlysning",
      sub: "Börja här — låg risk, direkt värde",
      desc: "Vi sätter oss in i er verksamhet under en halv dag och levererar en skriftlig rapport: exakt var ni slösar tid idag, vad AI kan lösa och vad det skulle vara värt för er. Ni bestämmer sedan om ni vill gå vidare — ingen bindning.",
      price: "4 900 kr",
      duration: "Halvdag + rapport",
      tags: ["Godkänns utan budgetmöte", "Klar inom en vecka", "Ingen bindning"],
      highlight: false,
    },
    {
      index: "02",
      icon: <Zap size={28} strokeWidth={1.5} />,
      title: "AI-pilot",
      sub: "Bygg en konkret lösning",
      desc: "Vi tar ett av de problem som genomlysningen identifierade och bygger en färdig lösning — ett verktyg era anställda faktiskt kan använda från dag ett. Fast pris, tydlig leverans, inga överraskningar.",
      price: "35 000 – 55 000 kr",
      duration: "2–4 veckor",
      tags: ["Fast pris", "Redo att använda", "Baseras på genomlysning"],
      highlight: true,
    },
    {
      index: "03",
      icon: <BrainCircuit size={28} strokeWidth={1.5} />,
      title: "Fullt AI-system",
      sub: "AI som arbetar i hela verksamheten",
      desc: "En komplett lösning — ett system där era anställda söker i egna dokument, rutiner automatiseras och data hålls strukturerad. Bygger vidare på piloten och skalas upp efter era behov.",
      price: "75 000 – 120 000 kr",
      duration: "4–8 veckor",
      tags: ["Skräddarsytt", "Skalbart", "Långsiktig investering"],
      highlight: false,
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
            <a key={href} href={href} className="link-underline"
              style={{ transition: "color 0.15s" }}
              onMouseOver={e => e.currentTarget.style.color = "var(--fg)"}
              onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}
            >{label}</a>
          ))}
        </nav>

        <a href="#kontakt" className="btn-shimmer" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "7px 16px",
          fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em",
          borderWidth: "1px", borderStyle: "solid", borderColor: "var(--border)",
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
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "center",
        minHeight: "85vh",
      }}>
        {/* LEFT — text */}
        <div>
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
            fontSize: "clamp(48px, 7.5vw, 112px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            marginBottom: "clamp(36px, 5vh, 64px)",
          }}>
            AI som<br />
            <ShinyText text="faktiskt" speed={2.5} style={{ fontStyle: "normal", fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", lineHeight: "inherit" }} /><br />
            används.
          </h1>

          <div className="fade-up fade-up-3" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <p style={{
              fontSize: "clamp(15px, 1.6vw, 18px)", color: "var(--muted)",
              maxWidth: "40ch", lineHeight: 1.8,
            }}>
              Vi hjälper svenska företag spara tid på uppgifter som idag
              görs manuellt, tar för lång tid eller kräver att folk frågar varandra.
              Fast pris. Tydlig leverans. Inga konstigheter.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#kontakt" className="btn-shimmer" style={{
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
                borderWidth: "1px", borderStyle: "solid", borderColor: "var(--border)",
                color: "var(--fg)", fontWeight: 500, fontSize: "12px",
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
        </div>

        {/* RIGHT — neural net */}
        <div className="fade-up fade-up-4" style={{
          position: "relative",
          height: "clamp(380px, 55vh, 640px)",
          borderRadius: "2px",
          overflow: "hidden",
        }}>
          {/* Subtle border glow */}
          <div style={{
            position: "absolute", inset: 0,
            borderWidth: "1px", borderStyle: "solid",
            borderColor: "rgba(212,245,60,0.12)",
            borderRadius: "2px",
            zIndex: 2, pointerEvents: "none",
          }} />
          {/* Corner accents */}
          {[
            { top: 0, left: 0, borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" },
            { top: 0, right: 0, borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" },
            { bottom: 0, left: 0, borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" },
            { bottom: 0, right: 0, borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" },
          ].map((s, i) => (
            <div key={i} style={{
              position: "absolute", width: "20px", height: "20px", zIndex: 3,
              ...s,
            }} />
          ))}
          {/* Label */}
          <div style={{
            position: "absolute", top: "14px", left: "16px", zIndex: 4,
            fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(212,245,60,0.5)",
          }}>
            Neural · Live
          </div>
          <div style={{
            position: "absolute", top: "16px", right: "16px", zIndex: 4,
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 6px var(--accent)",
              display: "inline-block",
              animation: "pulse 2s ease infinite",
            }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.12em", color: "rgba(212,245,60,0.5)", textTransform: "uppercase" }}>Active</span>
          </div>
          <NeuralNet />
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
          { countTo: 4900, prefix: "", suffix: " kr", label: "Kom igång från", text: null },
          { countTo: null, prefix: "", suffix: "", label: "Pris, inga överraskningar", text: "Fast" },
          { countTo: 3, prefix: "", suffix: "", label: "Tydliga steg", text: null },
          { countTo: null, prefix: "", suffix: "", label: "Konsult i Skaraborg", text: "Lokal" },
        ].map((s, i, arr) => (
          <div key={i} style={{
            padding: "clamp(28px, 4vw, 48px) clamp(24px, 3vw, 40px)",
            borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{
              fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900,
              letterSpacing: "-0.03em", color: "var(--fg)", lineHeight: 1,
              marginBottom: "8px",
            }}>
              {s.countTo !== null
                ? <CountUp end={s.countTo} prefix={s.prefix} suffix={s.suffix} />
                : s.text}
            </div>
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
            Tre steg — börja där det känns rätt
          </span>
        </div>

        <div>
          {services.map((s, i) => (
            <SpotlightCard
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
              }}
            >
              {/* Steg 1 accent-linje vänster */}
              {i === 0 && (
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: "2px", background: "var(--accent)",
                }} />
              )}

              <div style={{ paddingTop: "4px" }}>
                <GlitchIcon size={28}>
                  {s.icon}
                </GlitchIcon>
              </div>

              <div>
                <div style={{ marginBottom: "12px" }}>
                  {/* Sub-etikett */}
                  <p style={{
                    fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
                    color: i === 0 ? "var(--accent)" : "var(--muted)",
                    marginBottom: "8px",
                  }}>{s.sub}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "20px", flexWrap: "wrap" }}>
                    <h3 style={{
                      fontSize: "clamp(20px, 2.8vw, 34px)", fontWeight: 800,
                      letterSpacing: "-0.02em", lineHeight: 1.1,
                      transition: "color 0.2s",
                      ...(hoveredService === i && { color: "var(--accent)" }),
                    }}>{s.title}</h3>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {s.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: "11px", padding: "3px 10px",
                          borderWidth: "1px", borderStyle: "solid",
                          borderColor: hoveredService === i ? "rgba(212,245,60,0.3)" : "var(--border)",
                          color: "var(--muted)", letterSpacing: "0.06em",
                          transition: "border-color 0.2s",
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p style={{
                  fontSize: "clamp(13px, 1.5vw, 15px)", color: "var(--muted)",
                  lineHeight: 1.75, maxWidth: "56ch",
                }}>{s.desc}</p>
              </div>

              <div style={{ textAlign: "right", paddingTop: "6px", flexShrink: 0 }}>
                <div style={{
                  fontSize: i === 0 ? "clamp(18px, 2vw, 26px)" : "clamp(14px, 1.5vw, 17px)",
                  fontWeight: 800, marginBottom: "4px", whiteSpace: "nowrap",
                  color: i === 0 ? "var(--accent)" : "var(--fg)",
                }}>{s.price}</div>
                <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "20px", whiteSpace: "nowrap" }}>{s.duration}</div>
                <a href="#kontakt" className="link-underline" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: i === 0 ? "var(--accent)" : hoveredService === i ? "var(--accent)" : "var(--muted)",
                  transition: "color 0.2s",
                }}>
                  Kom igång <span>→</span>
                </a>
              </div>
            </SpotlightCard>
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
              Sintari är ett AI-konsultbolag i Töreboda. Vi jobbar inte med
              mångelånga projekt — vi levererar avgränsade lösningar med fast
              pris och tydlig tidslinje. Ni vet vad ni betalar och vad ni får.
            </p>
            <p style={{ fontSize: "clamp(14px, 1.6vw, 16px)", color: "var(--muted)", lineHeight: 1.85 }}>
              Vi har byggt system som låter anställda söka i företagets egna dokument,
              rensat upp rörig data och automatiserat tidskrävande manuella moment —
              för industri- och tillverkningsföretag i Sverige.
            </p>
            <div style={{ display: "flex", gap: "32px", paddingTop: "16px", flexWrap: "wrap" }}>
              {[
                ["Dokumentsökning", "AI hittar rätt i era egna filer", <Search size={14} strokeWidth={1.5} key="search" />],
                ["Dataanalys", "Gör ordning på spridd information", <Database size={14} strokeWidth={1.5} key="db" />],
                ["Automatisering", "AI tar hand om det repetitiva", <Bot size={14} strokeWidth={1.5} key="bot" />],
              ].map(([label, desc, icon]) => (
                <div key={label as string}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                    <GlitchIcon size={14} color="var(--accent)">{icon}</GlitchIcon>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--fg)" }}>{label}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", maxWidth: "16ch" }}>{desc}</div>
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
                    <a href={href as string} className="link-underline" style={{ fontSize: "16px", fontWeight: 500, transition: "color 0.15s" }}
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
                  className="btn-shimmer"
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
        <a href="mailto:jimmy@sintari.se" className="link-underline" style={{
          fontSize: "12px", color: "var(--muted)", transition: "color 0.15s",
        }}
          onMouseOver={e => e.currentTarget.style.color = "var(--fg)"}
          onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}
        >jimmy@sintari.se</a>
      </footer>

    </div>
  );
}
