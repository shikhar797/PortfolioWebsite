"use client";
import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "HTML / CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "Python / Django", level: 78 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Prisma ORM", level: 78 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: "🛠️",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 68 },
      { name: "CI/CD", level: 72 },
    ],
  },
  {
    title: "Low Level Design",
    icon: "🛠️",
    skills: [
      { name: "OPPS", level: 92 },
      { name: "Design Priciples", level: 75 },
      { name: "Design Pattern", level: 68 },
      { name: "SOLID", level: 72 },
    ],
  },
   {
    title: "AI/Machine Learning and Data Science",
    icon: "🛠️",
    skills: [
      { name: "AI/ML", level: 92 },
      { name: "Data Science", level: 75 },
      { name: "NLP", level: 68 },
      { name: "SQL", level: 72 },
    ],
  },
];

const techBadges = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL",
  "MongoDB", "Docker", "AWS", "Git", "Tailwind", "GraphQL", "Redis", "Prisma",
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 100);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.4rem",
          fontSize: "0.875rem",
        }}
      >
        <span style={{ color: "var(--white)", fontWeight: 500 }}>{name}</span>
        <span
          style={{
            color: "var(--indigo)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: "6px",
          background: "var(--surface-2)",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: "linear-gradient(90deg, var(--indigo), var(--violet))",
            borderRadius: "3px",
            transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
            // skills
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            marginBottom: "0.75rem",
            color: "var(--white)",
          }}
        >
          What I Work With
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "3rem", maxWidth: "500px" }}>
          Technologies I use daily to build products people love.
        </p>

        {/* Tech badge cloud */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginBottom: "3.5rem",
          }}
        >
          {techBadges.map((t) => (
            <span
              key={t}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--violet)",
                padding: "0.3rem 0.75rem",
                borderRadius: "100px",
                fontSize: "0.8rem",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "border-color 0.2s, color 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--indigo)";
                (e.currentTarget as HTMLSpanElement).style.color = "var(--white)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLSpanElement).style.color = "var(--violet)";
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Skill bars grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.5rem",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--indigo)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1.2rem",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{cat.icon}</span>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--white)",
                  }}
                >
                  {cat.title}
                </h3>
              </div>
              {cat.skills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
