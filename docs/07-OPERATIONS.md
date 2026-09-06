# 07 — Operations

## 1. Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `DB_URL` | **Yes** | MongoDB connection string used by `lib/db.js` |
| `NODE_ENV` | No | `development` enables global Mongo client cache |

**Important:** Runtime code reads `DB_URL`. Do not rely on `MONGODB_URI` unless you also update `lib/db.js`.

Admin password is **not** an env var; it lives in MongoDB collection `password` as `{ password: "<secret>" }`.

---

## 2. Local development

### Prerequisites

- Node.js + npm
- MongoDB Atlas (or local) reachable via `DB_URL`
- Vercel CLI (optional but needed for local APIs)

### Run SPA

```bash
npm install
npm run dev
```

Vite typically listens on `http://localhost:5173` and proxies `/api` → `http://localhost:3000`.

### Run APIs

```bash
npx vercel dev --listen 3000
```

Without the API process, public pages may load but data fetches fail.

### Production build

```bash
npm run build
npm run preview   # optional local preview of dist/
```

---

## 3. Deployment (Vercel)

1. Connect the GitHub repo to a Vercel project.
2. Set `DB_URL` in Project → Settings → Environment Variables.
3. Ensure a document exists in `password` for Studio login.
4. Deploy from `main` (or your configured production branch).

### Hobby plan constraint

Maximum **12** serverless functions.

- Keep only handlers in `api/`.
- Keep helpers/seeds in `lib/`.
- Current handler count: **10**.

If deploy fails with “No more than 12 Serverless Functions…”, audit `api/` for stray files.

---

## 4. Provisioning checklist

| Step | Action |
|------|--------|
| 1 | Create MongoDB database `Nitin_Dev_Space` |
| 2 | Set `DB_URL` on Vercel + local `.env` |
| 3 | Insert `password` collection with `{ password: "..." }` |
| 4 | First `GET /api/blogs` seeds blogs if empty |
| 5 | First `GET /api/profile` seeds profile if empty |
| 6 | Upload resume via Studio → Resume |
| 7 | Verify Studio login at `/admin` |

---

## 5. Known operational quirks

| Quirk | Impact | Mitigation |
|-------|--------|------------|
| Password stored plaintext | Security risk | Hash + session/JWT in a future hardening pass |
| Messages lack server `createdAt` | Sorting uses ObjectId time | Add `createdAt` on insert |
| `crousel` spelling | Confusing field name | Keep for compatibility or migrate carefully |
| Large JS bundle warning | Build noise only | Code-split later if needed |
| Admin auth is client-only | Write APIs are callable without password today | Add server auth middleware before public write exposure |

---

## 6. Shutdown / local cleanup

When finished developing:

```bash
# stop Vite / vercel if running
# ports commonly used: 5173, 5174, 3000
```

Do not leave long-running `vercel dev` or `vite` processes attached to this project when work is paused.

---

## 7. Documentation ownership

| Area | Doc |
|------|-----|
| Product intent | `01-PRODUCT-OVERVIEW.md` |
| System design | `02-ARCHITECTURE.md` |
| HTTP contracts | `03-API-REFERENCE.md` |
| Persistence | `04-DATA-SCHEMAS.md` |
| Behavior | `05-FUNCTIONAL-SPECS.md` |
| UI modules | `06-FRONTEND-MODULES.md` |
| Run / deploy | This file |
