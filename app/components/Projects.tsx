"use client";

const projects = [
  {
    title: "Blog-Vana",
    desc: "A  collaborative blog platform with great UI.Used Google authentication for authentication.",
    tags: ["Next.js", "Tailwind", "MongoDb", "GoogleAuth","React"],
    color: "#6366F1",
    emoji: "💻",
    github: "https://github.com/shikhar797/BlogVana",
    live: "blog-vana.vercel.app",
    featured: true,
  },
  {
    title: "AlgoTracker",
    desc: "Personal DSA folder covering all the topic like BitManipulation,Tree,Graph,LinkedList and games like tic-tac-toe,four-in-a-row.",
    tags: ["C++", "Java", "C"],
    color: "#A78BFA",
    emoji: "📊",
    github: "https://github.com/shikhar797/DSA-Folder",
    live: "https://github.com/shikhar797/DSA-Folder",
    featured: true,
  },
  {
    title: "Big Bear Farm",
    desc: "Full-stack e-commerce platform with real-time inventory, Stripe payments, and an admin dashboard. Handles 10k+ products.",
    tags: ["Javascript", "EJS", "MongoDB", "Tailwind"],
    color: "#10B981",
    emoji: "🛒",
    github: "https://github.com/yuggupta06/BigBearFarmCloneWebsite",
    live: "https://github.com/yuggupta06/BigBearFarmCloneWebsite",
    featured: true,
  },
  {
    title: "FlappyBird",
    desc: "I built flappy bird game in python using library Pygame.",
    tags: ["Python", "Pygame"],
    color: "#F59E0B",
    emoji: "🤖",
    github: "https://github.com/shikhar797/Easiest_FlappyBird",
    live: "https://github.com/shikhar797/Easiest_FlappyBird",
    featured: false,
  },
  {
    title: "TaskFlow",
    desc: "Kanban-style project management app with drag-and-drop, team collaboration, and deadline tracking.",
    tags: ["Next.js", "DnD Kit", "MongoDB", "Auth.js"],
    color: "#EF4444",
    emoji: "📋",
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
  {
    title: "WeatherNow",
    desc: "Beautiful weather app with animated backgrounds, hourly forecasts, and air quality index using OpenWeather API.",
    tags: ["React", "Framer Motion", "OpenWeather", "PWA"],
    color: "#06B6D4",
    emoji: "🌤️",
    github: "https://github.com/shikhar797/WeatherProject",
    live: "https://github.com/shikhar797/WeatherProject",
    featured: false,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: "6rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}
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
          // projects
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "3rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h2
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--white)", marginBottom: "0.5rem" }}
          >
            Things I&apos;ve Built
          </h2>
          <p style={{ color: "var(--muted)" }}>A selection of projects that showcase my skills.</p>
        </div>
        <a
          href="https://github.com/shikhar797?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--indigo)",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
            border: "1px solid var(--border)",
            padding: "0.5rem 1rem",
            borderRadius: "7px",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--indigo)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          View All on GitHub →
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {projects.map((p) => (
          <div
            key={p.title}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              transition: "border-color 0.2s, transform 0.2s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = p.color;
              el.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--border)";
              el.style.transform = "translateY(0)";
            }}
          >
            {p.featured && (
              <span
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: `${p.color}22`,
                  color: p.color,
                  border: `1px solid ${p.color}44`,
                  fontSize: "0.7rem",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "100px",
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                featured
              </span>
            )}

            <div
              style={{
                width: "48px",
                height: "48px",
                background: `${p.color}18`,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
              }}
            >
              {p.emoji}
            </div>

            <div>
              <h3 style={{ fontSize: "1.15rem", color: "var(--white)", marginBottom: "0.5rem" }}>
                {p.title}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                {p.desc}
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "var(--surface-2)",
                    color: "var(--muted)",
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "5px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "auto" }}>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontSize: "0.825rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                ↗ Code
              </a>
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: p.color,
                  textDecoration: "none",
                  fontSize: "0.825rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                🔗 Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
