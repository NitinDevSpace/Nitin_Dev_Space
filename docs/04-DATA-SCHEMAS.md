# 04 — Data Schemas

**Database:** `Nitin_Dev_Space`  
**Driver:** MongoDB Node driver (`mongodb` package)

## Collection inventory

| Collection | Cardinality | Seed / migrate |
|------------|-------------|----------------|
| `Projects` | many | migrate `isKeyProject` on list GET |
| `Blogs` | many | seed if empty (`blogSeed`) |
| `messages` | many | — |
| `About_Me` | one | — |
| `Profile` | one | seed if empty (`profileSeed`) |
| `feedbacks` | many | — |
| `Intro` | one | — |
| `password` | one | provisioned manually |
| `Resume` | one | — |

---

## 1. `Projects`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | auto | Primary key |
| `title` | string | yes (UI) | Display name |
| `image` | string | no | Cover image URL |
| `overview` | string | no | Short summary for cards |
| `description` | string | no | Long body (HTML allowed) |
| `status` | string | no | `In Progress` \| `Completed` \| `Planned` \| `On Hold` |
| `techStack` | string[] | no | Technologies |
| `crousel` | string[] | no | Gallery image URLs (**legacy spelling**) |
| `liveLink` | string | no | Live demo URL |
| `github` | string | no | Repository URL |
| `isKeyProject` | boolean | yes (defaulted) | Featured on Profile |
| `createdAt` | Date | on create | Set by POST |
| `updatedAt` | Date | on update | Set by PATCH |

---

## 2. `Blogs`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | auto | |
| `slug` | string | yes | URL segment `/blogs/:slug` |
| `title` | string | yes | |
| `excerpt` | string | no | Card blurb |
| `coverImage` | string | no | |
| `tags` | string[] | no | |
| `published` | boolean | yes | Default `true` on create |
| `readTime` | string | no | e.g. `"5 min"` |
| `content` | string | yes (UI) | HTML body |
| `createdAt` | Date | | |
| `updatedAt` | Date | | |

**List projection (public):** `content` omitted when not `all=1`.

---

## 3. `messages`

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | |
| `fullName` | string | |
| `email` | string | |
| `phoneNumber` | string | Optional |
| `subject` | string | |
| `message` | string | |

No guaranteed `createdAt` field; Studio may infer time from ObjectId.

---

## 4. `About_Me`

Single document.

| Field | Type | Description |
|-------|------|-------------|
| `para` | string | Intro paragraph |
| `frontend` | string | Card copy (HTML ok) |
| `backend` | string | Card copy |
| `ai` | string | Card copy |

---

## 5. `Profile`

Single document.

### Root

| Field | Type |
|-------|------|
| `experiences` | Experience[] |
| `skillCategories` | SkillCategory[] |
| `education` | Education[] |
| `updatedAt` | Date |

### Experience

| Field | Type | Description |
|-------|------|-------------|
| `start` | string | `YYYY-MM` |
| `end` | string | `YYYY-MM` or empty if current |
| `isCurrent` | boolean | When true, UI shows Present |
| `period` | string | Derived display, e.g. `Sept 2025 - Present` |
| `title` | string | Role title |
| `company` | string | |
| `location` | string | |
| `bullets` | string[] | HTML allowed per line |

**Ordering rule:** Sort current / newest end date first (`src/utils/experienceDates.js`).

### SkillCategory

| Field | Type |
|-------|------|
| `name` | string |
| `icon` | string | Lucide-ish name used by SkillsPanel |
| `skills` | string[] |

### Education

| Field | Type |
|-------|------|
| `title` | string |
| `school` | string |
| `period` | string | Free text today |
| `details` | string |

---

## 6. `feedbacks`

| Field | Type |
|-------|------|
| `rating` | number |
| `feedback` | string |
| `date` | string (ISO, client-set) |

---

## 7. `Intro`

| Field | Type |
|-------|------|
| `imageUrl` | string |
| `bio` | string (HTML) |

---

## 8. `password`

| Field | Type | Notes |
|-------|------|-------|
| `password` | string | Compared in plaintext — harden before broader exposure |

---

## 9. `Resume`

| Field | Type | Notes |
|-------|------|-------|
| `filename` | string | Default `Nitin_Resume.pdf` |
| `contentType` | string | Default `application/pdf` |
| `data` | Binary | PDF bytes |
| `uploadedAt` | Date | |

---

## 10. Seeds

| File | Target |
|------|--------|
| `lib/data/blogSeed.js` → `blogSeed` | `Blogs` when empty |
| `lib/data/profileSeed.js` → `profileSeed` | `Profile` when empty |

Seeds are **not** re-applied if the collection already has documents.
