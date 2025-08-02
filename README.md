# 🧑‍💻 Nitin Dev Space - Fullstack Developer Portfolio

Welcome to **Nitin Dev Space**, a cutting-edge, interactive, animated developer portfolio showcasing technical skills, featured projects, and backend integration with admin controls.

---

## 🚀 Overview

This project is a **fully responsive, dark-themed portfolio** for a software developer. It is built using the latest tech stack, including **React**, **Framer Motion**, **Tailwind CSS**, and **MongoDB**. The goal is to deliver a smooth, fast, and engaging experience for visitors while allowing the developer to manage content through an admin panel.

### 🎯 Key Features

- 💻 **Modern UI** with smooth animations and transitions using Framer Motion
- 🛠️ **Admin Dashboard** to add/update/delete content directly from the frontend
- 🌐 **Serverless API routes** using Vercel functions (deployed backend)
- 🔒 Scroll locking and route-based animations
- 🖼️ Dynamic project cards carousel with infinite scroll & manual controls
- 📱 Fully responsive and accessible layout
- 🛡️ Form submission protection via disable logic
- ✉️ Contact form integrated with backend
- 🎨 Custom hover effects with tooltips

---

## 🧾 Folder Structure

```
nitin-dev-space/
├── api/                      # Vercel serverless backend API functions
│   └── intro.js              # Example route: handles intro section data
│   └── projects.js           # Route for fetching/updating projects
├── public/                   # Static files and favicons
├── src/
│   ├── components/           # Reusable UI components (Header, Footer, Buttons, etc.)
│   ├── pages/
│   │   ├── Admin/            # Admin-only pages (ProjectsAdmin.jsx, IntroAdmin.jsx)
│   │   ├── Home/             # Main portfolio pages (Hero, About, Projects, Contact)
│   ├── services/             # Axios API service functions (getProjects, postIntro, etc.)
│   ├── App.jsx               # App layout and routes
│   ├── main.jsx              # Root file (entry point)
├── .env                      # Environment variables for local dev (Mongo URI, etc.)
├── vercel.json              # Vercel route config
├── tailwind.config.js       # Tailwind CSS custom config
└── README.md                # Project documentation
```

---

## 🧑‍🔧 How to Use This Portfolio for Yourself

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/your-username/nitin-dev-space.git
cd nitin-dev-space
```

### 2. 📁 Install Dependencies

```bash
npm install
```

### 3. 🔐 Set Up Environment Variables

Create a `.env` file in the root and add:

```
MONGODB_URI=your_mongo_connection_string
```

For production, you will add this via Vercel dashboard.

### 4. 🧪 Run Locally

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

To run API locally, use:

```bash
npx vercel dev
```

Or setup `vite.config.js` with proxy for `/api`.

### 5. 🌐 Deploy to Vercel

Push to GitHub and import the project on [Vercel](https://vercel.com/). It will automatically deploy both frontend and API routes.

Make sure to add the same `.env` variables in the Vercel project settings.

---

## ✨ Pages & Routing

- `/` → Home page (Hero, About, Projects, Contact)
- `/admin` → Admin dashboard
- `/admin/projects` → Manage Projects
- `/admin/intro` → Update Hero/About Info
- `/404` → Custom Not Found page with animated UI

---

## 📌 Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion, Three JS  
**Backend:** MongoDB (via Vercel serverless functions)  
**Deployment:** Vercel  
**Icons & Fonts:** Lucide Icons, Google Fonts  

---

## 📬 Contact

For questions or contributions, reach out to me on [LinkedIn](https://www.linkedin.com/in/nitindevspace/) or raise an issue!

---
