const USERNAME = "luisoleaa";
const DAYS = 84;

const QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
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
          weeks: {
            contributionDays: { date: string; contributionCount: number }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

/** The last 84 days of GitHub contribution activity, oldest first. */
export async function getContributionDays(): Promise<boolean[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GitHub token not configured.");
  }

  const to = new Date();
  const from = new Date(to);
  from.setDate(from.getDate() - (DAYS + 7));

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        login: USERNAME,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("GitHub API returned an error.");
  }

  const json = (await res.json()) as GithubResponse;

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  const allDays = json
    .data!.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays,
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  return allDays.slice(-DAYS).map((d) => d.contributionCount > 0);
}
