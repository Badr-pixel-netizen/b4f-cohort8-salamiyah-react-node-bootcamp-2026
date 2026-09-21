import type { Opportunity, Post, PostCategory } from "./types";

const POSTS_URL = "/api/posts";
const OPPORTUNITIES_URL = "/api/opportunities";

async function readErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const data = await response.json();
    if (data && typeof data.error === "string") {
      return data.error;
    }
  } catch {
    // Response body wasn't JSON — fall back to the generic message below.
  }

  return fallback;
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(POSTS_URL);

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Could not load posts."));
  }

  return (await response.json()) as Post[];
}

export async function createPost(content: string, category: PostCategory): Promise<Post> {
  const response = await fetch(POSTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, category }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Could not publish your post."));
  }

  return (await response.json()) as Post;
}

export async function setPostLiked(id: number, liked: boolean): Promise<Post> {
  const response = await fetch(`${POSTS_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ liked }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Could not update this post."));
  }

  return (await response.json()) as Post;
}

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const response = await fetch(OPPORTUNITIES_URL);

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Could not load opportunities."));
  }

  return (await response.json()) as Opportunity[];
}

export async function applyToOpportunity(id: number): Promise<Opportunity> {
  const response = await fetch(`${OPPORTUNITIES_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applied: true }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Could not submit your application."));
  }

  return (await response.json()) as Opportunity;
}
