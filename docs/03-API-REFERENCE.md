# 03 — API Reference

Base path: `/api`  
Format: JSON unless noted  
Database: `Nitin_Dev_Space` via `lib/db.js`

## Conventions

| Item | Convention |
|------|------------|
| Success | `{ success: true, message?, data? }` |
| Failure | `{ success: false, message }` |
| IDs | MongoDB ObjectId strings in query `id` |
| Auth | Only `/api/verifypassword` validates the Studio password; other write endpoints are **not** token-protected today |

---

## 1. Projects — `/api/projects`

**File:** `api/projects.js` · **Collection:** `Projects`

### GET

| Query | Description |
|-------|-------------|
| *(none)* | List all projects (runs key-project migrate if needed) |
| `id` | Single project by `_id` |
| `key=1` | Only `isKeyProject: true` |

**Response `200`:** `{ success, message, data }` where `data` is object or array.

### POST

Creates a project.

**Body fields (typical):**

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | |
| `image` | string | Cover URL |
| `overview` | string | Short card text |
| `description` | string | Full HTML-capable body |
| `status` | string | `In Progress` \| `Completed` \| `Planned` \| `On Hold` |
| `techStack` | string[] | |
| `crousel` | string[] | Gallery URLs (legacy spelling) |
| `liveLink` | string | |
| `github` | string | |
| `isKeyProject` | boolean | Coerced with `Boolean(...)` |

Server also sets `createdAt`, `overview` default `""`.

**Response `201`:** `{ success: true, message: "Project added successfully" }`

### PATCH — `?id=<ObjectId>`

`$set` body (strips `_id`), sets `updatedAt`.

| Status | Meaning |
|--------|---------|
| 400 | Missing/invalid id |
| 404 | Not found |
| 200 | Updated |

### DELETE — `?id=<ObjectId>`

Same 400/404/200 pattern as PATCH.

---

## 2. Blogs — `/api/blogs`

**File:** `api/blogs.js` · **Collection:** `Blogs`  
**Side effect:** Seeds from `lib/data/blogSeed.js` when collection is empty.

### GET

| Query | Description |
|-------|-------------|
| *(default)* | Published only; **excludes** `content`; sort `createdAt` desc |
| `all=1` | All blogs including drafts (admin) |
| `id` | By `_id` |
| `slug` | By `slug` |

### POST

**Body:** `title`, `slug`, `excerpt`, `coverImage`, `content`, `tags[]`, `readTime`, `published`  
`published` defaults true unless explicitly `false`. Sets `createdAt` / `updatedAt`.

**Response `201`:** blog added message.

### PATCH / DELETE — `?id=<ObjectId>`

Same validation pattern as projects.

---

## 3. Messages — `/api/message`

**File:** `api/message.js` · **Collection:** `messages`

### POST

Inserts contact payload.

| Field | Type |
|-------|------|
| `fullName` | string |
| `email` | string |
| `phoneNumber` | string (optional) |
| `subject` | string |
| `message` | string |

**Note:** No server-side `createdAt` today (timestamps may be inferred from `_id`).

### GET

Returns all messages for Studio inbox.

---

## 4. About Me — `/api/aboutMe`

**File:** `api/aboutMe.js` · **Collection:** `About_Me` (single document)

### GET

`findOne({})` → homepage about section.

### POST

Upserts fields: `para`, `frontend`, `backend`, `ai`.

`400` if no body · `201` on success.

---

## 5. Profile — `/api/profile`

**File:** `api/profile.js` · **Collection:** `Profile`  
**Side effect:** Seeds `lib/data/profileSeed.js` when missing.

### GET

Returns the single profile document.

### POST

Upserts (strips `_id`). Expected top-level keys:

- `experiences[]`
- `skillCategories[]`
- `education[]`

See [04 — Data Schemas](./04-DATA-SCHEMAS.md).

---

## 6. Feedback — `/api/feedback`

**File:** `api/feedback.js` · **Collection:** `feedbacks`

### GET

All feedback documents.

### POST

| Field | Type |
|-------|------|
| `rating` | number |
| `feedback` | string |
| `date` | ISO string (client-provided) |

---

## 7. Intro — `/api/intro`

**File:** `api/intro.js` · **Collection:** `Intro`

### GET / POST

Fields: `imageUrl`, `bio` (HTML allowed).

---

## 8. Verify password — `/api/verifypassword`

**File:** `api/verifypassword.js` · **Collection:** `password`

### POST

**Body:** `{ password: string }`

Compares to `findOne({}).password`.

| Result | Response |
|--------|----------|
| Match | `{ success: true }` |
| Mismatch | `{ success: false }` |

Both currently return HTTP 200.

---

## 9. Stats — `/api/stats`

**File:** `api/stats.js` · **Read-only** across `Projects`, `Blogs`, `messages`, `feedbacks`, `Resume`

### GET

Returns dashboard payload:

```json
{
  "success": true,
  "data": {
    "totals": {
      "projects": 0,
      "keyProjects": 0,
      "blogs": 0,
      "publishedBlogs": 0,
      "messages": 0,
      "feedbacks": 0,
      "avgRating": 0,
      "hasResume": false
    },
    "statusCounts": {},
    "projectsByStatus": [{ "name": "Completed", "value": 1 }],
    "messagesOverTime": [{ "month": "2026-09", "count": 2 }],
    "ratingBuckets": [{ "name": "5★", "value": 3 }],
    "recentMessages": [],
    "resume": { "filename": "Nitin_Resume.pdf", "uploadedAt": "..." }
  }
}
```

---

## 10. Resume — `/api/resume`

**File:** `api/resume.js` · **Collection:** `Resume`

### GET

| Query | Behavior |
|-------|----------|
| `meta=1` | JSON metadata only (`data` binary excluded) |
| *(default)* | Raw PDF bytes + `Content-Type` / `Content-Disposition` |

### POST

**Body:** `{ filename, contentType, data }` where `data` is base64 or data-URL.  
Stores MongoDB `Binary`, upserts single resume doc.

### HEAD

Returns header `X-Resume-Filename` when present.

---

## 11. Client service map

| Service module | Endpoints used |
|----------------|----------------|
| `projects.service.js` | `/api/projects` |
| `blogs.service.js` | `/api/blogs` |
| `contact.service.js` | `/api/message` |
| `aboutMe.service.js` | `/api/aboutMe` |
| `profile.service.js` | `/api/profile` |
| `feedback.service.js` | `/api/feedback` |
| `intro.service.js` | `/api/intro` |
| `password.service.js` | `/api/verifypassword` |
| `stats.service.js` | `/api/stats` |
| `resume.service.js` | `/api/resume` |

---

## 12. Error matrix (typical)

| Code | When |
|------|------|
| 400 | Missing body or invalid ObjectId |
| 404 | Document / resume not found |
| 405 | Method not allowed (where implemented) |
| 500 | Uncaught exception (`message: error.message`) |

Handlers that omit `405`: `message`, `aboutMe`, `feedback`, `verifypassword` (may fall through depending on runtime).
