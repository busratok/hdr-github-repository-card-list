export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
};

export type GithubReposResult =
  | {
      ok: true;
      username: string;
      repos: GithubRepo[];
    }
  | {
      ok: false;
      username: string;
      message: string;
    };

const getErrorMessage = (status: number) => {
  if (status === 404) {
    return "User not found. Please check the username and try again.";
  }

  if (status === 403) {
    return "GitHub API rate limit reached. Please wait a moment and try again.";
  }

  return "Unable to fetch repositories right now. Please try again later.";
};

export const fetchGithubRepos = async (
  username?: string,
): Promise<GithubReposResult> => {
  const normalizedUsername = username?.trim() || "vercel";
  const endpoint = `https://api.github.com/users/${encodeURIComponent(
    normalizedUsername,
  )}/repos`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      return {
        ok: false,
        username: normalizedUsername,
        message: getErrorMessage(response.status),
      };
    }

    const data = (await response.json()) as GithubRepo[];

    return {
      ok: true,
      username: normalizedUsername,
      repos: data,
    };
  } catch {
    return {
      ok: false,
      username: normalizedUsername,
      message: "Network error while contacting GitHub. Please try again.",
    };
  }
};
