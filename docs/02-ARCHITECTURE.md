# 02 — Architecture

## 1. High-level topology

```
┌──────────────────────────┐         /api/*          ┌────────────────────────────┐
│  React SPA (Vite build)  │ ──────────────────────► │  Vercel Serverless (Node)  │
│  React Router client     │                         │  api/*.js                  │
└──────────────────────────┘                         └─────────────┬──────────────┘
                                                                   │
                                                                   ▼
                                                         ┌─────────────────────┐
                                                         │ MongoDB             │
                                                         │ Nitin_Dev_Space     │
                                                         └─────────────────────┘
```

## 2. Runtime layers

| Layer | Technology | Responsibility |
|-------|------------|----------------|
| Presentation | React 19, Tailwind, Framer Motion, Three.js | UI, client routing, animations |
| Application services | `src/services/*.js` (Axios) | Typed-ish API calls from the SPA |
| Edge / serverless | Vercel Functions in `api/` | HTTP handlers, validation, CRUD |
| Shared server libs | `lib/db.js`, `lib/data/*` | Mongo client + seed payloads (**outside** `api/` so they do not count as functions) |
| Persistence | MongoDB | Content, inbox, credentials, resume binary |

## 3. Request flow

1. Browser loads static assets from Vercel CDN (`dist/`).
2. Client navigates via React Router (SPA).
3. Data fetch: Axios → same-origin `/api/<resource>`.
4. Vercel invokes the matching serverless file.
5. Handler uses `clientPromise` from `lib/db.js` → `db("Nitin_Dev_Space")`.
6. JSON (or PDF binary for resume) returns to the client.

### Local development

- Vite (`npm run dev`) serves the SPA and **proxies** `/api` → `http://localhost:3000`.
- `vercel dev` (or equivalent) must serve the serverless functions on port 3000 for APIs to work locally.

## 4. SPA routing on Vercel

`vercel.json` rewrites non-API paths to `/index.html` so deep links (`/projects/:id`, `/blogs/:slug`) work. Paths starting with `api/` are excluded from the rewrite.

## 5. Auth model

- Admin UI is gated in the **client** after `POST /api/verifypassword`.
- Password is stored in MongoDB collection `password` (plaintext compare today).
- There is **no** server session or JWT. Treat Studio as operator-only and security-sensitive for future hardening.

## 6. Serverless function budget (Hobby)

Vercel Hobby allows **at most 12** serverless functions. Every `.js` file under `api/` counts.

**Policy:**

- Only HTTP handlers live in `api/`.
- Shared code and seeds live in `lib/`.
- Current handler count: **10** (under the limit).

## 7. Seed & migration behavior

| Trigger | Action |
|---------|--------|
| `GET /api/blogs` when `Blogs` is empty | Insert `lib/data/blogSeed.js` |
| `GET /api/profile` when no profile doc | Insert `lib/data/profileSeed.js` |
| `GET /api/projects` (list) when no `isKeyProject` field exists | Backfill `isKeyProject` defaults |

## 8. Key design decisions

| Decision | Rationale |
|----------|-----------|
| File-per-resource APIs | Matches Vercel convention; simple for a small CMS |
| MongoDB Binary for resume | Avoids external object storage for a single PDF |
| Client-side admin sections | One `/admin` route; less routing complexity |
| `crousel` field spelling | Legacy field name kept for compatibility |
