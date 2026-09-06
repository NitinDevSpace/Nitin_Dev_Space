# 05 — Functional Specifications (FS)

This document describes expected product behavior for public and Studio surfaces.

---

## FS-PUB-01 — Home

**Route:** `/`

| ID | Requirement |
|----|-------------|
| FS-PUB-01.1 | Hero displays brand title and typewriter tagline |
| FS-PUB-01.2 | Intro loads `imageUrl` + `bio` from `/api/intro` |
| FS-PUB-01.3 | About section loads `para` / three cards from `/api/aboutMe` |
| FS-PUB-01.4 | My Creations shows horizontal right→left sliding project cards; hover pauses; click → `/projects/:id` |
| FS-PUB-01.5 | At least ~2 full cards + partial third visible on wide layouts |
| FS-PUB-01.6 | Collaborate CTA navigates to `/contact` |
| FS-PUB-01.7 | Optional sitewide mouse trail uses brand palette |

---

## FS-PUB-02 — Projects

**Routes:** `/projects`, `/projects/:id`

| ID | Requirement |
|----|-------------|
| FS-PUB-02.1 | Grid loads all projects from `/api/projects` |
| FS-PUB-02.2 | Cards show cover, title, overview, status, tech chips |
| FS-PUB-02.3 | Detail page shows large cover, full description, links, gallery (`crousel`) |
| FS-PUB-02.4 | Loading states use layout-matched skeletons (not a single blank block) |

---

## FS-PUB-03 — Profile

**Route:** `/profile`

| ID | Requirement |
|----|-------------|
| FS-PUB-03.1 | Loads `/api/profile` + key projects (`/api/projects?key=1`) |
| FS-PUB-03.2 | Experience timeline sorted newest / current first |
| FS-PUB-03.3 | Period display uses month–year formatting (`Sept 2025 - Present`) |
| FS-PUB-03.4 | Skills and education render from profile document |
| FS-PUB-03.5 | Download Resume fetches `/api/resume` (or static fallback) |

---

## FS-PUB-04 — Blogs

**Routes:** `/blogs`, `/blogs/:slug`

| ID | Requirement |
|----|-------------|
| FS-PUB-04.1 | List shows published posts only |
| FS-PUB-04.2 | Post page renders HTML `content` and optional ad slots |
| FS-PUB-04.3 | Drafts never appear on public list |

---

## FS-PUB-05 — Contact & Feedback

**Route:** `/contact`

| ID | Requirement |
|----|-------------|
| FS-PUB-05.1 | Form submits to `POST /api/message` |
| FS-PUB-05.2 | Success state replaces form with confirmation |
| FS-PUB-05.3 | Leave Feedback opens modal → `POST /api/feedback` |
| FS-PUB-05.4 | Layout sits below navbar (not vertically centered on full viewport) |

---

## FS-ADM-01 — Authentication

**Route:** `/admin`

| ID | Requirement |
|----|-------------|
| FS-ADM-01.1 | Password gate before Studio content |
| FS-ADM-01.2 | Calls `POST /api/verifypassword` |
| FS-ADM-01.3 | Sign out clears client auth state |
| FS-ADM-01.4 | Desktop sidebar sticky; Sign out always visible |

---

## FS-ADM-02 — Overview

| ID | Requirement |
|----|-------------|
| FS-ADM-02.1 | Loads `/api/stats` |
| FS-ADM-02.2 | Stat cards navigate to related sections |
| FS-ADM-02.3 | Feedback pie always shows rating labels; hover expands segment |
| FS-ADM-02.4 | No “Brand health” filler widget |

---

## FS-ADM-03 — Content editors (Intro / About / Profile)

| ID | Requirement |
|----|-------------|
| FS-ADM-03.1 | Forms use subtle `admin-field` inputs |
| FS-ADM-03.2 | Live preview shows where public content appears |
| FS-ADM-03.3 | Experience uses month pickers + “Currently working here” |
| FS-ADM-03.4 | New experience / skill / education rows insert at **top** |
| FS-ADM-03.5 | Experiences auto-sort by date |

---

## FS-ADM-04 — Projects & Blogs management

| ID | Requirement |
|----|-------------|
| FS-ADM-04.1 | Card grid (not raw list rows), newest first |
| FS-ADM-04.2 | Click card → detail modal → Edit / Delete |
| FS-ADM-04.3 | Edit/create modals include live card preview |
| FS-ADM-04.4 | Delete confirms via modal; APIs use DELETE with id |

---

## FS-ADM-05 — Messages & Feedback

| ID | Requirement |
|----|-------------|
| FS-ADM-05.1 | Card grids with detail modals |
| FS-ADM-05.2 | Messages searchable |
| FS-ADM-05.3 | Feedback filterable (All, 1–5★, With text, Rating only) |
| FS-ADM-05.4 | Newest first ordering |

---

## FS-ADM-06 — Resume

| ID | Requirement |
|----|-------------|
| FS-ADM-06.1 | Drag-drop or file picker for PDF |
| FS-ADM-06.2 | Stores via `POST /api/resume` |
| FS-ADM-06.3 | Preview explains Profile download CTA |

---

## Cross-cutting FS

| ID | Requirement |
|----|-------------|
| FS-X-01 | Skeletons mirror final layout chunks sitewide |
| FS-X-02 | No artificial loading delays in data fetch paths |
| FS-X-03 | Responsive layouts avoid fixed widths that overflow phones |
| FS-X-04 | Hobby deploy stays ≤ 12 serverless functions (`lib/` for helpers) |
