import { NextResponse } from "next/server";

const USERNAME = "luisoleaa";

const QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }
`;

type GithubResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              weekday: number;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GitHub token not configured." },
      { status: 500 },
    );
  }

  const to = new Date();
  const from = new Date(to);
  from.setMonth(from.getMonth() - 6);

  let res: Response;
  try {
    res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: USERNAME, from: from.toISOString(), to: to.toISOString() },
      }),
      next: { revalidate: 3600 },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach GitHub API." },
      { status: 502 },
    );
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: "GitHub API returned an error." },
      { status: 502 },
    );
  }

  const json = (await res.json()) as GithubResponse;

  if (json.errors?.length) {
    console.error("[/api/github-contributions]", json.errors[0].message);
    return NextResponse.json({ error: "GitHub GraphQL error." }, { status: 502 });
  }

  const calendar =
    json.data!.user.contributionsCollection.contributionCalendar;
  return NextResponse.json(calendar);
}
