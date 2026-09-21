// B4F Hub — local assessment API.
//
// This is infrastructure for the take-home assessment, not something students
// are asked to build or modify. It loads deterministic seed data on startup;
// all mutations (new posts, likes, applications) live only in memory and are
// reset the next time this server restarts. That reset-on-restart behavior is
// intentional — it keeps the assessment reproducible for every student and
// for re-grading.
//
// Run with: node server/index.js  (already wired into `npm run dev`).

import express from "express";
import { initialPosts, initialOpportunities } from "./data.js";

const PORT = 3001;

const app = express();
app.use(express.json());

let posts = initialPosts.map((post) => ({ ...post }));
let opportunities = initialOpportunities.map((opportunity) => ({ ...opportunity }));
let nextPostId = Math.max(...posts.map((post) => post.id)) + 1;

const ALLOWED_CATEGORIES = ["announcement", "event", "community", "resource"];
const MIN_CONTENT_LENGTH = 3;
const MAX_CONTENT_LENGTH = 2000;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------- Reference-solution-only demo helper ----------
// Append ?fail=true to a GET request to force a 500 response, for easily
// demonstrating the error + Retry state on camera. This exists ONLY in the
// instructor's reference server — it is deliberately left out of the student
// starter's copy of this same file, per the assessment's own design rule
// that developer-only test switches must not reach students.
function shouldSimulateFailure(req) {
  return req.query.fail === "true";
}

// ---------- Community ----------

app.get("/api/posts", async (req, res) => {
  await delay(350);

  if (shouldSimulateFailure(req)) {
    return res.status(500).json({ error: "Simulated server error (fail=true)." });
  }

  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  res.json(sorted);
});

app.post("/api/posts", (req, res) => {
  const { content, category } = req.body ?? {};

  if (typeof content !== "string") {
    return res.status(400).json({ error: "content is required and must be a string." });
  }

  const trimmedContent = content.trim();

  if (trimmedContent.length < MIN_CONTENT_LENGTH) {
    return res
      .status(400)
      .json({ error: `content must be at least ${MIN_CONTENT_LENGTH} characters.` });
  }

  if (trimmedContent.length > MAX_CONTENT_LENGTH) {
    return res
      .status(400)
      .json({ error: `content must be ${MAX_CONTENT_LENGTH} characters or fewer.` });
  }

  if (typeof category !== "string" || !ALLOWED_CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: `category is required and must be one of: ${ALLOWED_CATEGORIES.join(", ")}.`,
    });
  }

  const newPost = {
    id: nextPostId,
    author: "You",
    avatar: "YOU",
    category,
    content: trimmedContent,
    createdAt: new Date().toISOString(),
    likes: 0,
    liked: false,
  };

  nextPostId += 1;
  posts = [newPost, ...posts];

  res.status(201).json(newPost);
});

app.patch("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const { liked } = req.body ?? {};

  if (typeof liked !== "boolean") {
    return res.status(400).json({ error: "liked is required and must be a boolean." });
  }

  const post = posts.find((candidate) => candidate.id === id);

  if (!post) {
    return res.status(404).json({ error: `No post found with id ${id}.` });
  }

  if (liked && !post.liked) {
    post.liked = true;
    post.likes += 1;
  } else if (!liked && post.liked) {
    post.liked = false;
    post.likes -= 1;
  }

  res.json(post);
});

// ---------- Opportunities ----------

app.get("/api/opportunities", async (req, res) => {
  await delay(350);

  if (shouldSimulateFailure(req)) {
    return res.status(500).json({ error: "Simulated server error (fail=true)." });
  }

  res.json(opportunities);
});

app.patch("/api/opportunities/:id", (req, res) => {
  const id = Number(req.params.id);
  const { applied } = req.body ?? {};

  if (applied !== true) {
    return res.status(400).json({ error: "applied is required and must be true." });
  }

  const opportunity = opportunities.find((candidate) => candidate.id === id);

  if (!opportunity) {
    return res.status(404).json({ error: `No opportunity found with id ${id}.` });
  }

  if (opportunity.applied) {
    return res.status(409).json({ error: "You have already applied to this opportunity." });
  }

  opportunity.applied = true;

  res.json(opportunity);
});

app.listen(PORT, () => {
  console.log(`B4F Hub local API running at http://localhost:${PORT}`);
});
