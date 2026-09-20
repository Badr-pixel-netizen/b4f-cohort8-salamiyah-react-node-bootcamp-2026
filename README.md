# B4F Cohort 8 — Salamiyah — React/Node Bootcamp Bridge (2026)

Student-facing repository for the **B4F Hub** bridge project — the first project of B4F Bootcamp
2026, connecting the React skills from the PowerUp phase to the Bootcamp full-stack curriculum.

## What this project is

B4F Hub extends a React application you already know how to build, and pairs it with a real
Node.js/Express backend. It is deliberately a **bridge**, not a full product — it stays small and
focused so the transition between phases is clear.

**Frontend additions:** React Router (real pages/navigation), Context (a light/dark theme
example), Redux Toolkit (for the application's genuinely shared state).

**Backend:** Node.js and Express, written in TypeScript, with a clean routes/controllers/
middleware/config structure, environment-based configuration, CORS, and consistent error handling.

**Deliberately out of scope here:** no database, no authentication, no NestJS, no Next.js. Those
belong to the main Bootcamp project (`b4f-cohort8-salamiyah-next-nest-bootcamp-2026`) — this
repository stays a compact bridge.

## Learning progression

This project follows the classroom as it happens: Router → Context → Redux concepts → Redux
Toolkit → Node.js fundamentals → hardening the Express backend. Each session builds on the last.
The exact pace is flexible and led by actual classroom progress, not a fixed calendar.

## Repository structure

At this stage the repository holds only its foundation. Session-by-session application code is
added as the course actually reaches each topic — this README will be extended as that content
lands, rather than describing project structure that doesn't exist yet.

```
.
├── README.md     this file
└── .gitignore
```

## Setup

Setup instructions will be added once the first session's starting project is published here.

## Branch model

- **`main`** — protected, instructor-managed baseline. Students do not push to `main` directly.
- **Student branches** — each enrolled student receives one permanent branch in this repository,
  named after their verified GitHub username. Branch provisioning happens once the course roster
  is finalized; it has not happened yet as of this repository's creation.
- **Personal forks** — you are always welcome to fork this repository into your own GitHub account
  to freely practice feature branches, pull requests, merging, and recovering from mistakes, on
  your own time. That is separate from your assigned branch here, and has no effect on it.

## Instructor/base branch expectations

`main` is updated only by the instructor, and reflects the official state of the course at any
given point. Students work on their own assigned branch and pull instructor updates from `main`
into it as the course progresses. A full Git/GitHub handbook will be published here before student
branches are created.
