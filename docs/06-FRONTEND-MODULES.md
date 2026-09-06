# 06 — Frontend Modules

## 1. Routing (`src/App.jsx`)

| Path | Module |
|------|--------|
| `/` | `pages/Home` |
| `/profile` | `pages/Profile` |
| `/projects` | `pages/Projects` |
| `/projects/:id` | `pages/Projects/ProjectPage` |
| `/blogs` | `pages/Blogs` |
| `/blogs/:slug` | `pages/Blogs/BlogPost` |
| `/contact` | `pages/Contact` |
| `/admin` | `pages/Admin` (section state machine) |
| `/privacy-policies` | `components/PrivacyPolicies` |
| `/terms-conditions` | `components/TermsConditions` |
| `/cookie-settings` | `components/CookieSetting` |
| `*` | `components/404NotFound` |

Global chrome: `NavBar`, `MouseTrail`.

---

## 2. Admin sections (`pages/Admin/index.jsx`)

Client-only section ids (not nested URLs):

`overview` · `intro` · `about` · `profile` · `projects` · `blogs` · `resume` · `messages` · `feedback`

---

## 3. Service layer (`src/services/`)

| File | Responsibility |
|------|----------------|
| `index.js` | Shared Axios instance |
| `projects.service.js` | Project CRUD |
| `blogs.service.js` | Blog CRUD |
| `profile.service.js` | Profile get/update |
| `intro.service.js` | Intro get/update |
| `aboutMe.service.js` | About get/update |
| `contact.service.js` | Messages send/list |
| `feedback.service.js` | Feedback submit/list |
| `resume.service.js` | Meta + upload + file URL |
| `stats.service.js` | Dashboard analytics |
| `password.service.js` | Admin password verify |

---

## 4. Notable UI components

| Component | Role |
|-----------|------|
| `3D/CreationsCarousel.jsx` | Flat RTL marquee of project cards |
| `ExperienceTimeline.jsx` | Profile experience (sorted) |
| `SkillsPanel.jsx` | Skill categories |
| `Projects-Card.jsx` | Public project tile |
| `Loading.jsx` | Skeleton primitives + page skeletons |
| `MouseTrail.jsx` | Canvas cursor trail |
| `Modals/ProjectsModal.jsx` | Project create/edit + preview |
| `Modals/BlogsModal.jsx` | Blog create/edit + preview |
| `Modals/DeleteModal.jsx` | Confirm delete |
| `AdSlot.jsx` | Blog-post ads only |
| `StatusChip.jsx` | Project status badge |

---

## 5. Utilities

| File | Role |
|------|------|
| `utils/text.js` | HTML strip, slugify, overview helpers, newest-first sort |
| `utils/experienceDates.js` | Month/year parse, format, normalize, sort experiences |
| `utils/ads.js` | Ad helpers |

---

## 6. Styling

- Tailwind utility classes throughout
- Theme tokens via Tailwind config (`primary`, `accent1`, `accent2`, …)
- Shared form class: `.admin-field` / `.dark-input` in `App.css`
- Skeleton shimmer: `.nd-loading-shimmer`
