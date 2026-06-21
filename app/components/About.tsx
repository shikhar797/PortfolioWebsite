"use client";

const stats = [
  { label: "Projects Built", value: "20+" },
  { label: "LeetCode Solved", value: "300+" },
  { label: "GitHub Repos", value: "40+" },
  { label: "Years Coding", value: "3+" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
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
          // about_me
        </span>
      </div>
      <h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          marginBottom: "3rem",
          color: "var(--white)",
        }}
      >
        Who I Am
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Text */}
        <div>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.2rem" }}>
            I&apos;m a passionate Full Stack Developer and AI/ML Enthusiast who loves building things that live on the
            internet. I specialize in crafting clean, performant applications with modern
            technologies like React, Next.js, Node.js, and TypeScript.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.2rem" }}>
            Beyond web dev, I&apos;m deeply into competitive programming — solving data structure
            and algorithm problems on LeetCode keeps my problem-solving sharp. I believe
            great software is built at the intersection of creativity and analytical thinking.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            When I&apos;m not coding, you&apos;ll find me contributing to open source, writing
            technical blogs, or exploring new frameworks. I&apos;m always open to exciting
            opportunities and collaborations.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="https://drive.google.com/file/d/1dS-qHejj1_5rlH2hSaAMmbtBqSxgZAgH/view?usp=sharing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--white)",
                padding: "0.6rem 1.2rem",
                borderRadius: "7px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--indigo)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              📄 Download Resume
            </a>
            <a
              href="https://github.com/shikhar797"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--white)",
                padding: "0.6rem 1.2rem",
                borderRadius: "7px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--indigo)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              ⭐ GitHub Profile
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "1.5rem",
                textAlign: "center",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--indigo)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--indigo)",
                  marginBottom: "0.3rem",
                }}
              >
                {s.value}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
