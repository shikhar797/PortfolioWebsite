"use client";
import { useEffect, useState } from "react";

const roles = ["Full Stack Developer", "Problem Solver", "Open Source Contributor", "DSA Enthusiast","AI/Machine Learning Enthusiast"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const cursorTimer = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    const target = roles[roleIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        }}
      />
      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
          bottom: "15%",
          right: "15%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", textAlign: "center", maxWidth: "800px" }}>
        {/* Terminal badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "100px",
            padding: "0.4rem 1rem",
            marginBottom: "1.5rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            color: "var(--muted)",
          }}
        >
          <span style={{ color: "var(--green)", fontSize: "0.6rem" }}>●</span>
          Available for opportunities
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: 1.1,
            marginBottom: "1rem",
            color: "var(--white)",
          }}
        >
          Hi, I&apos;m{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--indigo) 0%, var(--violet) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Shikhar Gupta
          </span>
        </h1>

        <div
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
            color: "var(--muted)",
            marginBottom: "2rem",
            minHeight: "2.2em",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
          }}
        >
          <span style={{ color: "var(--violet)" }}>&gt;</span>{" "}
          <span style={{ color: "var(--white)" }}>{displayed}</span>
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.2em",
              background: "var(--indigo)",
              marginLeft: "2px",
              verticalAlign: "middle",
              opacity: cursor ? 1 : 0,
              transition: "opacity 0.1s",
            }}
          />
        </div>

        <p
          style={{
            color: "var(--muted)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
          }}
        >
          I build scalable web applications, solve complex algorithmic problems, and
          turn ideas into clean, performant code.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              background: "var(--indigo)",
              color: "var(--white)",
              padding: "0.8rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(99,102,241,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              background: "transparent",
              color: "var(--white)",
              padding: "0.8rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "1px solid var(--border)",
              transition: "border-color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--indigo)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            marginTop: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--muted)",
            fontSize: "0.75rem",
          }}
        >
          <span>scroll down</span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, var(--indigo), transparent)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
