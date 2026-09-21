# B4F Cohort 8 — Salamiyah — React/Node Bootcamp Bridge (2026)

Student-facing repository for the **B4F Hub** bridge project — the first project of B4F Bootcamp
2026, connecting the React skills from the PowerUp phase to the Bootcamp full-stack curriculum.

## What this project is

B4F Hub is a React application you already know how to build, paired with a real Node.js/Express
server that runs on its own. It is deliberately a **bridge**, not a full product — it stays small
and focused so the transition between phases is clear.

**What exists right now:**

- **`client/`** — a React + TypeScript + Vite frontend.
- **`server/`** — a simple, standalone Node.js + Express server written in plain JavaScript. Its
  data is deterministic and lives in memory only.

**What does not exist (yet, or at all in this project):** no database, no authentication, no
NestJS, no Next.js. The server is intentionally simple today; how the backend is organized will
evolve later during the Bootcamp, step by step, as we reach those topics in class. The main
Bootcamp project lives in `b4f-cohort8-salamiyah-next-nest-bootcamp-2026`.

## Repository structure

This repository holds **two separate projects**, each with its own `package.json` and its own
`node_modules`:

```
.
├── client/     the React + TypeScript + Vite frontend
├── server/     the Node.js + Express server (plain JavaScript, in-memory data)
├── README.md   this file
└── .gitignore
```

They are independent programs. You run them side by side, in two terminals.

## Setup and running

You need [Node.js](https://nodejs.org/) 18 or newer.

**Terminal 1 — the server (port 3001):**

```bash
cd server
npm install
npm start
```

**Terminal 2 — the client (port 5173):**

```bash
cd client
npm install
npm run dev
```

Then open the address Vite prints (normally http://localhost:5173). The client forwards every
request that starts with `/api` to the server on port 3001, so both must be running.

The server keeps its data in memory. Restarting it (`Ctrl+C`, then `npm start` again) resets
posts and opportunities to their original seed data.

Other client commands (run inside `client/`): `npm run build` and `npm run lint`.

## Learning progression

This project follows the classroom as it happens: Router → Context → Redux concepts → Redux
Toolkit → Node.js fundamentals → Express. Each session builds on the last. The exact pace is
flexible and led by actual classroom progress, not a fixed calendar.

## Branch model

- **`main`** — protected, instructor-managed baseline. Students do not push to `main` directly.
- **Student branches** — each enrolled student has one permanent branch in this repository,
  named `student-<your-github-username>` in lowercase (for example, GitHub user `Fadi-Habil17`
  works on `student-fadi-habil17`). You can push only to your own branch.
- **Personal forks** — you are always welcome to fork this repository into your own GitHub account
  to freely practice feature branches, pull requests, merging, and recovering from mistakes, on
  your own time. That is separate from your assigned branch here, and has no effect on it.

## Instructor/base branch expectations

`main` is updated only by the instructor, and reflects the official state of the course at any
given point. Students work on their own assigned branch and pull instructor updates from `main`
into it as the course progresses. A full Git/GitHub handbook will be published here before
students start working in their branches.
