# Nitin Dev Space — Product Documentation

**Product:** Nitin Dev Space (personal brand / portfolio platform)  
**Status:** Partial production — public site + CMS-lite admin  
**Last updated:** 2026-09-02  
**Audience:** Engineers, maintainers, and future collaborators

---

## Document index

| Document | Description |
|----------|-------------|
| [01 — Product Overview](./01-PRODUCT-OVERVIEW.md) | Vision, personas, feature map, non-goals |
| [02 — Architecture](./02-ARCHITECTURE.md) | System design, runtime topology, data flow |
| [03 — API Reference](./03-API-REFERENCE.md) | Full HTTP API for all serverless endpoints |
| [04 — Data Schemas](./04-DATA-SCHEMAS.md) | MongoDB collections, field contracts, seeds |
| [05 — Functional Specs](./05-FUNCTIONAL-SPECS.md) | Public + admin feature behavior (FS) |
| [06 — Frontend Modules](./06-FRONTEND-MODULES.md) | Routes, services, key UI modules |
| [07 — Operations](./07-OPERATIONS.md) | Env vars, local run, deploy notes, limits |

---

## Quick facts

| Item | Value |
|------|--------|
| Database | MongoDB — `Nitin_Dev_Space` |
| Frontend | Vite + React 19 + React Router 6 + Tailwind |
| Backend | Vercel Serverless Functions (`api/*.js`) |
| Hosting | Vercel (Hobby) — max **12** serverless functions |
| Admin auth | Shared password stored in MongoDB `password` collection |
| Env (DB) | `DB_URL` (not `MONGODB_URI`) |

---

## Related source paths

```
api/                 → Serverless HTTP handlers
lib/                 → Shared DB client + seed data (not counted as functions)
src/pages/           → Public + Admin UI
src/services/        → Axios API clients
src/components/      → Shared UI
docs/                → This documentation set
```

---

## Change control

Treat these docs as the source of truth for contracts. When you change an API field, collection shape, or admin behavior, update the matching document in the same PR/commit whenever possible.
