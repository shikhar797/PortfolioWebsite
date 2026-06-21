import { NextResponse } from "next/server";

const USERNAME = "shikhar-gupta";

const QUERY = `
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

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Origin": "https://leetcode.com",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`LeetCode API responded with ${res.status}`);
    }

    const { data } = await res.json();
    const user = data?.matchedUser;
    const allQ: { difficulty: string; count: number }[] = data?.allQuestionsCount ?? [];

    if (!user) {
      throw new Error("User not found");
    }

    const ac: { difficulty: string; count: number }[] = user.submitStats.acSubmissionNum;
    const tot: { difficulty: string; count: number }[] = user.submitStats.totalSubmissionNum;

    const get = (arr: { difficulty: string; count: number }[], d: string) =>
      arr.find((x) => x.difficulty === d)?.count ?? 0;

    const totalSolved = get(ac, "All");
    const totalSubmissions = get(tot, "All");

    const stats = {
      username: USERNAME,
      totalSolved,
      easySolved: get(ac, "Easy"),
      mediumSolved: get(ac, "Medium"),
      hardSolved: get(ac, "Hard"),
      totalEasy: allQ.find((x) => x.difficulty === "Easy")?.count ?? 850,
      totalMedium: allQ.find((x) => x.difficulty === "Medium")?.count ?? 1790,
      totalHard: allQ.find((x) => x.difficulty === "Hard")?.count ?? 780,
      ranking: user.profile.ranking,
      totalSubmissions,
      acceptanceRate:
        totalSubmissions > 0
          ? Math.round((totalSolved / totalSubmissions) * 1000) / 10
          : 0,
    };

    return NextResponse.json(stats, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate" },
    });
  } catch (err) {
    console.error("LeetCode fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode stats" },
      { status: 500 }
    );
  }
}
