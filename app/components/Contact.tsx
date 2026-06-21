"use client";
import { useState } from "react";

const socials = [
  { label: "GitHub", href: "https://github.com/shikhar797", icon: "⌨️" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shikhargupta74/", icon: "💼" },
  { label: "LeetCode", href: "https://leetcode.com/u/shikhar-gupta/", icon: "🧩" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    width: "100%",
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    color: "var(--white)",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <>
      <section
        id="contact"
        style={{ padding: "6rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem",
              color: "var(--indigo)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            // contact
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            marginBottom: "0.5rem",
            color: "var(--white)",
          }}
        >
          Let&apos;s Work Together
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "3rem", maxWidth: "480px" }}>
          Have a project in mind or want to chat? I&apos;m always open to interesting opportunities.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {sent && (
              <div
                style={{
                  background: "#10B98120",
                  border: "1px solid #10B981",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  color: "#10B981",
                  fontSize: "0.875rem",
                }}
              >
                ✓ Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            <div>
              <label style={{ display: "block", color: "var(--muted)", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--indigo)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--muted)", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--indigo)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--muted)", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                Message
              </label>
              <textarea
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--indigo)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
            <button
              type="submit"
              style={{
                background: "var(--indigo)",
                color: "var(--white)",
                border: "none",
                borderRadius: "8px",
                padding: "0.8rem 1.5rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "opacity 0.2s, transform 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Send Message
            </button>
          </form>

          {/* Contact info */}
          <div>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ color: "var(--white)", marginBottom: "1rem", fontSize: "1rem" }}>
                Direct Contact
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href="mailto:hello@alexdev.com"
                  style={{
                    color: "var(--muted)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  ✉️ gshikhar134@gmail.com
                </a>
                <span style={{ color: "var(--muted)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  📍 Jhansi,Uttar Pradesh,India
                </span>
                <span style={{ color: "var(--muted)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  ⏰ Available: Always
                </span>
              </div>
            </div>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.5rem",
              }}
            >
              <h3 style={{ color: "var(--white)", marginBottom: "1rem", fontSize: "1rem" }}>
                Find Me Online
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "var(--muted)",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "0.6rem 0.8rem",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--indigo)";
                      e.currentTarget.style.color = "var(--white)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--muted)";
                    }}
                  >
                    <span>{s.icon}</span> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem 1.5rem",
          textAlign: "center",
          color: "var(--muted)",
          fontSize: "0.85rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p>
            Designed & built by{" "}
            <span style={{ color: "var(--indigo)", fontWeight: 600 }}>Shikhar Gupta</span> with Next.js
          </p>
          <p style={{ marginTop: "0.4rem", fontSize: "0.75rem", opacity: 0.6 }}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
