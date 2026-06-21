"use client";
import { useState, useEffect } from "react";

const links = ["About", "Skills", "Projects", "LeetCode", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 1.5rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,15,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <a
        href="#hero"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1.2rem",
          color: "var(--indigo)",
          textDecoration: "none",
          letterSpacing: "-0.03em",
        }}
      >
        &lt;Dev /&gt;
      </a>

      {/* Desktop links */}
      <ul
        style={{
          display: "flex",
          gap: "2rem",
          listStyle: "none",
          alignItems: "center",
        }}
        className="desktop-nav"
      >
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "color 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {l}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            style={{
              background: "var(--indigo)",
              color: "var(--white)",
              padding: "0.45rem 1.1rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Hire Me
          </a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="hamburger"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          display: "none",
          flexDirection: "column",
          gap: "5px",
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "var(--white)",
              borderRadius: "2px",
              transition: "all 0.2s",
              transform:
                open && i === 0
                  ? "rotate(45deg) translate(5px, 5px)"
                  : open && i === 1
                  ? "scaleX(0)"
                  : open && i === 2
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            padding: "1rem 1.5rem",
          }}
          className="mobile-menu"
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                color: "var(--muted)",
                textDecoration: "none",
                padding: "0.75rem 0",
                borderBottom: "1px solid var(--border)",
                fontSize: "0.95rem",
                fontWeight: 500,
              }}
            >
              {l}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
