"use client";
import { useEffect, useState } from "react";

const USERNAME = "shikhar-gupta";

interface LCStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  ranking: number;
  streak: number;
  totalSubmissions: number;
  acceptanceRate: number;
}

const topics = [
  { name: "Arrays & Hashing", color: "#6366F1" },
  { name: "Two Pointers", color: "#A78BFA" },
  { name: "Sliding Window", color: "#10B981" },
  { name: "Trees & Graphs", color: "#F59E0B" },
  { name: "Dynamic Programming", color: "#EF4444" },
  { name: "Binary Search", color: "#06B6D4" },
];

function Ring({
  solved, total, color, label, count,
}: {
  solved: number; total: number; color: string; label: string; count: number;
}) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = total > 0 ? (solved / total) * circ : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 40 40)"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
        <text x="40" y="44" textAnchor="middle" fill="var(--white)"
          style={{ fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
          {count}
        </text>
      </svg>
      <span style={{ color, fontSize: "0.8rem", fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function Skeleton({ w = "100%", h = "1rem" }: { w?: string; h?: string }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: "6px",
      background: "linear-gradient(90deg, var(--surface-2) 25%, var(--border) 50%, var(--surface-2) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
    }} />
  );
}

export default function LeetCode() {
  const [stats, setStats] = useState<LCStats | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const query = `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              profile { ranking }
              submitStats {
                acSubmissionNum { difficulty count }
                totalSubmissionNum { difficulty count }
              }
            }
            allQuestionsCount { difficulty count }
          }
        `;

        // Try direct LeetCode GraphQL first
        const res = await fetch("https://leetcode.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Referer": "https://leetcode.com",
          },
          body: JSON.stringify({ query, variables: { username: USERNAME } }),
        });

        if (!res.ok) throw new Error("Direct fetch failed");
        const { data } = await res.json();
        parseAndSet(data);
      } catch {
        // Fallback: use a CORS proxy
        try {
          const query = encodeURIComponent(`{ matchedUser(username: "${USERNAME}") { profile { ranking } submitStats { acSubmissionNum { difficulty count } totalSubmissionNum { difficulty count } } } allQuestionsCount { difficulty count } }`);
          const res = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(`https://leetcode.com/graphql?query=${query}`)}`);
          if (!res.ok) throw new Error("Proxy failed");
          const { data } = await res.json();
          parseAndSet(data);
        } catch {
          setError(true);
          setLoading(false);
        }
      }
    }

    function parseAndSet(data: Record<string, unknown>) {
      try {
        const user = data.matchedUser as {
          profile: { ranking: number };
          submitStats: {
            acSubmissionNum: { difficulty: string; count: number }[];
            totalSubmissionNum: { difficulty: string; count: number }[];
          };
        };
        const allQ = data.allQuestionsCount as { difficulty: string; count: number }[];

        const ac = user.submitStats.acSubmissionNum;
        const tot = user.submitStats.totalSubmissionNum;

        const get = (arr: { difficulty: string; count: number }[], d: string) =>
          arr.find((x) => x.difficulty === d)?.count ?? 0;

        const totalAc = get(ac, "All");
        const totalSub = get(tot, "All");

        setStats({
          totalSolved: totalAc,
          easySolved: get(ac, "Easy"),
          mediumSolved: get(ac, "Medium"),
          hardSolved: get(ac, "Hard"),
          totalEasy: allQ.find((x) => x.difficulty === "Easy")?.count ?? 850,
          totalMedium: allQ.find((x) => x.difficulty === "Medium")?.count ?? 1790,
          totalHard: allQ.find((x) => x.difficulty === "Hard")?.count ?? 780,
          ranking: user.profile.ranking,
          streak: 0,
          totalSubmissions: totalSub,
          acceptanceRate: totalSub > 0 ? Math.round((totalAc / totalSub) * 1000) / 10 : 0,
        });
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <section id="leetcode" style={{
      padding: "6rem 1.5rem",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1rem" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem",
            color: "#F59E0B", letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            // leetcode_stats
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--white)" }}>
            My LeetCode Journey
          </h2>
          {loading && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
              color: "#F59E0B", display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
              fetching live data…
            </span>
          )}
          {!loading && !error && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
              color: "#10B981", display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              ● live
            </span>
          )}
        </div>
        <p style={{ color: "var(--muted)", marginBottom: "3rem" }}>
          Consistent problem-solving to sharpen algorithmic thinking.
        </p>

        {error && (
          <div style={{
            background: "#EF444418", border: "1px solid #EF444444",
            borderRadius: "12px", padding: "1.5rem", color: "#EF4444",
            marginBottom: "2rem", fontSize: "0.875rem",
          }}>
            ⚠️ Could not load live stats (LeetCode may be blocking the request). 
            {" "}<a href={`https://leetcode.com/${USERNAME}`} target="_blank" rel="noopener noreferrer"
              style={{ color: "#F59E0B" }}>View profile directly →</a>
          </div>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem", marginBottom: "2rem",
        }}>
          {/* Overview card */}
          <div style={{
            background: "var(--bg)", border: "1px solid var(--border)",
            borderRadius: "16px", padding: "1.75rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "12px",
                background: "linear-gradient(135deg, #F59E0B, #EF4444)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem",
              }}>🧩</div>
              <div>
                <div style={{ color: "var(--white)", fontWeight: 600 }}>{USERNAME}</div>
                <div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                  {loading ? <Skeleton w="80px" h="0.85rem" /> : `Rank #${stats?.ranking?.toLocaleString() ?? "—"}`}
                </div>
              </div>
            </div>

            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "3.5rem",
              fontWeight: 700, color: "var(--white)", lineHeight: 1, marginBottom: "0.5rem",
            }}>
              {loading ? <Skeleton w="120px" h="3.5rem" /> : (
                <>{stats?.totalSolved ?? "—"}<span style={{ fontSize: "1.2rem", color: "var(--muted)", fontWeight: 400 }}> problems</span></>
              )}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              solved across all difficulties
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div style={{ background: "var(--surface)", borderRadius: "10px", padding: "0.75rem", textAlign: "center" }}>
                <div style={{ color: "#F59E0B", fontWeight: 700, fontSize: "1.2rem" }}>
                  {loading ? <Skeleton w="50px" h="1.2rem" /> : `${stats?.acceptanceRate ?? 0}%`}
                </div>
                <div style={{ color: "var(--muted)", fontSize: "0.75rem" }}>Acceptance</div>
              </div>
              <div style={{ background: "var(--surface)", borderRadius: "10px", padding: "0.75rem", textAlign: "center" }}>
                <div style={{ color: "#6366F1", fontWeight: 700, fontSize: "1.2rem" }}>
                  {loading ? <Skeleton w="50px" h="1.2rem" /> : (stats?.totalSubmissions?.toLocaleString() ?? "—")}
                </div>
                <div style={{ color: "var(--muted)", fontSize: "0.75rem" }}>Submissions</div>
              </div>
            </div>
          </div>

          {/* Difficulty rings card */}
          <div style={{
            background: "var(--bg)", border: "1px solid var(--border)",
            borderRadius: "16px", padding: "1.75rem",
          }}>
            <h3 style={{ fontSize: "1rem", color: "var(--white)", marginBottom: "1.5rem", fontWeight: 600 }}>
              By Difficulty
            </h3>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: "1.5rem" }}>
              {loading ? (
                <>
                  {["#10B981","#F59E0B","#EF4444"].map(c => (
                    <div key={c} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem" }}>
                      <div style={{ width:80,height:80,borderRadius:"50%",background:"var(--surface-2)",animation:"shimmer 1.4s infinite" }} />
                      <Skeleton w="40px" h="0.8rem" />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <Ring solved={stats?.easySolved??0} total={stats?.totalEasy??850} color="#10B981" label="Easy" count={stats?.easySolved??0} />
                  <Ring solved={stats?.mediumSolved??0} total={stats?.totalMedium??1790} color="#F59E0B" label="Medium" count={stats?.mediumSolved??0} />
                  <Ring solved={stats?.hardSolved??0} total={stats?.totalHard??780} color="#EF4444" label="Hard" count={stats?.hardSolved??0} />
                </>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Easy", solved: stats?.easySolved??0, total: stats?.totalEasy??850, color: "#10B981" },
                { label: "Medium", solved: stats?.mediumSolved??0, total: stats?.totalMedium??1790, color: "#F59E0B" },
                { label: "Hard", solved: stats?.hardSolved??0, total: stats?.totalHard??780, color: "#EF4444" },
              ].map((d) => (
                <div key={d.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: d.color }}>{d.label}</span>
                    <span style={{ color: "var(--muted)" }}>
                      {loading ? "—" : `${d.solved} / ${d.total}`}
                    </span>
                  </div>
                  <div style={{ height: "4px", background: "var(--surface-2)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: loading ? "0%" : `${d.total > 0 ? (d.solved / d.total) * 100 : 0}%`,
                      background: d.color, borderRadius: "2px",
                      transition: "width 1s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Topic mastery */}
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1rem", color: "var(--white)", marginBottom: "1.5rem", fontWeight: 600 }}>
            Topic Practice Areas
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
            {topics.map((t) => (
              <div key={t.name} style={{
                display: "flex", alignItems: "center", gap: "1rem",
                background: "var(--surface)", borderRadius: "10px", padding: "0.75rem 1rem",
              }}>
                <div style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: t.color, flexShrink: 0,
                }} />
                <span style={{ color: "var(--white)", fontSize: "0.875rem" }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a href={`https://leetcode.com/u/${USERNAME}`} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              color: "#F59E0B", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem",
              border: "1px solid #F59E0B44", padding: "0.6rem 1.4rem", borderRadius: "8px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F59E0B18")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            View Full LeetCode Profile →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
