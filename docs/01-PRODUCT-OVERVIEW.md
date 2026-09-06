# 01 — Product Overview

## 1. Purpose

**Nitin Dev Space** is a personal brand website and lightweight content platform. It presents professional work (projects, experience, blogs) to visitors and provides an authenticated **Studio** (admin) so content can be updated without redeploying the frontend.

## 2. Product goals

1. Present a polished, theme-consistent public brand site.
2. Store dynamic content in MongoDB and serve it through REST-style serverless APIs.
3. Allow a single operator to manage intro, about, profile, projects, blogs, resume, messages, and feedback from `/admin`.
4. Keep the stack simple enough for Vercel Hobby (≤ 12 serverless functions).

## 3. Personas

| Persona | Needs |
|---------|--------|
| **Visitor** | Browse home, projects, blogs, profile; contact; leave feedback; download resume |
| **Operator (Nitin)** | Authenticate to Studio; CRUD content; view analytics; read inbox |
| **Maintainer** | Understand APIs, schemas, deploy constraints, and local workflows |

## 4. Feature map

### Public

| Area | Capability |
|------|------------|
| Home | Hero, intro, about cards, My Creations slider, collaborate CTA |
| Projects | Grid of cards → detail page with cover, description, links |
| Profile | Experience timeline, skills, key projects, education, resume download |
| Blogs | Published list → post page (HTML content); ads only on post pages |
| Contact | Message form + optional feedback modal |
| Legal | Privacy, terms, cookie settings |

### Admin (Studio)

| Section | Capability |
|---------|------------|
| Overview | Stats cards, charts, navigation into sections |
| Intro / About | Edit homepage copy with live preview |
| Profile | Experience (month/year), skills, education + preview |
| Projects / Blogs | Card grids, detail modals, create/edit/delete |
| Resume | PDF upload (drag-drop), profile preview |
| Messages / Feedback | Card inbox, detail modals; feedback filters |

## 5. Non-goals (current)

- Multi-user roles / OAuth / session server
- Full markdown CMS or media asset pipeline
- Real-time collaboration
- Automated test suite as a gate (not yet established)

## 6. Product status

**Partially complete.** Core public surfaces and admin CMS paths exist. Treat remaining polish, hardening (password hashing, message timestamps), and docs maintenance as follow-on work.
