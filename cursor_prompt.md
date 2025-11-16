# cursor_prompt.md

You are an AI coding assistant working inside Cursor / Claude Code.

Your job is to build a **production-quality Next.js + Supabase web app** called **Swift Apply**, using the attached `.md` files as the main specification:

- `context.md`
- `requirements.md`
- `data_model.md`
- `api_routes.md`
- `ui.md`
- `stack_skeleton.md`

---

## High-Level Goal

Implement **Swift Apply**, a web app that:

1. Asks users about their job experience, skills, and preferences.
2. Builds an ATS-friendly resume (with generated bullet points).
3. Lets users save job postings and see a match score between their profile and the job.
4. Generates tailored resumes per job.
5. Tracks job applications and their status.

The user will paste these `.md` files into the repo and ask you to generate code. You must follow these docs closely.

---

## Tech Stack (Mandatory)

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Data & Auth:** Supabase (Postgres + Auth)
- **API:** Next.js Route Handlers under `app/api/*`
- **Language:** TypeScript for all frontend and backend code

Do **not** switch frameworks or stacks unless the user explicitly asks.

---

## Project Structure

Use the structure described in `stack_skeleton.md` as the baseline:

- `app/` for pages and API routes.
- `components/` for React components.
- `lib/` for utilities (Supabase client, match score, bullet generator, pdf export).
- `types/` for shared TypeScript types.
- `styles/` for Tailwind-related styles.

When in doubt, prefer **simple, flat structure** over over-engineering.

---

## Implementation Priorities

1. **Authentication & Profile**
   - Set up Supabase client.
   - Implement simple login/signup UI using Supabase Auth.
   - Implement `/api/auth/me` to return the current user and basic profile info.
   - Implement profile CRUD based on `data_model.md` and `api_routes.md`.

2. **Onboarding Flow**
   - Build `/onboarding` with step-by-step forms:
     - Basic info (name, location).
     - Job interests (titles, industries, salary, employment types).
     - Quick experience snapshot.
     - Skills entry.
   - On completion, create or update the user's `profile` and initial `resume_profile`.

3. **Resume Builder**
   - Implement `/dashboard` UI as described in `ui.md`.
   - Implement `/resume/[id]` page with:
     - Form controls for header, summary, experience, skills, education.
     - A **Bullet generator** button that uses `lib/bulletGenerator.ts` (and can be improved later).
     - Live preview component.

4. **Job Posts & Matching**
   - Implement:
     - `/jobs` list page.
     - `/jobs/[id]` detail page with match score card.
   - Implement `computeMatchScore` logic in `lib/matchScore.ts` and wire it into:
     - `POST /api/job-posts/:id/match` route.
   - Show "matched" vs "missing" keywords, and compute a 0–100 score.

5. **Tailored Resumes**
   - Implement `tailored_resumes` table access as per `data_model.md`.
   - Implement route:
     - `POST /api/tailored-resumes` → creates a tailored resume for a job + resume profile.
   - Frontend:
     - `tailored-resume/[id]` page with editable fields and preview.
   - Provide `export to PDF` via `/api/tailored-resumes-export/[id]` (can use a simple HTML → PDF library; initial implementation can be minimal but functional).

6. **Applications Tracker**
   - Implement `/applications` page using a simple grouped list (by status) or basic Kanban-like layout.
   - Hook into `applications` routes from `api_routes.md`:
     - Create, list, update status.

---

## Coding Style & Quality

- Use **TypeScript everywhere** (no `any` unless absolutely necessary).
- Keep components:
  - Small, focused, and reusable.
  - In `components/` with clear naming (`ResumeEditor`, `JobCard`, `ApplicationBoard`, etc).
- Prefer functional React components with hooks.
- Use Tailwind utility classes for layout and styling.
- Use simple, accessible HTML:
  - `label` + `input` pairs, `aria` attributes on important elements.

---

## Error Handling & UX

- Show inline error messages for forms (e.g., required fields missing).
- Handle Supabase errors gracefully and display readable messages.
- Use loading states (`isLoading` spinners) for async actions like:
  - Generating match scores.
  - Generating tailored resumes.
  - Exporting PDFs.

---

## How to Use the Spec Files

When generating or editing code:

1. **Cross-check**:
   - Before creating new routes or tables, verify them against `data_model.md` and `api_routes.md`.
2. **Respect the UI design** in `ui.md`:
   - Screen names.
   - Main sections.
   - Components and layout ideas.
3. **Don't contradict** `context.md` or `requirements.md`:
   - Follow the described user stories.
   - Keep the app focused on **helping users get jobs**, not building a generic job board.

If there is a conflict between files:
- **Priority order**:
  1. `requirements.md`
  2. `data_model.md`
  3. `api_routes.md`
  4. `ui.md`
  5. `stack_skeleton.md`
  6. `context.md`

---

## What NOT to Do

- Do not change the app's core purpose (resume builder + job matching + tracking).
- Do not swap out Next.js or Supabase for a different stack unless the user explicitly requests.
- Do not overcomplicate state management (no Redux; use React hooks and, if needed, simple context).
- Do not introduce a design system that conflicts with Tailwind (e.g., no heavy component libraries that fight with Tailwind).

---

## Deliverables

When the user asks you to "build" or "wire up" Swift Apply, you should:

1. **Create all necessary files and folders** as defined in `stack_skeleton.md`.
2. **Fill in reasonable starter implementations** for:
   - Pages (`app/*/page.tsx`)
   - Components (`components/**/*`)
   - API routes (`app/api/**/*`)
   - Utilities (`lib/*`)
3. Ensure the project:
   - Compiles successfully.
   - Runs locally with `npm run dev` once environment variables are set.
4. Provide **clear instructions** in `README.md`:
   - How to install dependencies.
   - How to set up Supabase.
   - How to start the dev server.

---

## Tone

Keep code and comments:

- Clear
- Practical
- Helpful to a solo developer who will iterate on top of this

Your role is to act like a senior engineer setting up the initial version of Swift Apply so the user can expand and refine it.
