<div align="center">

# CourseMind AI — Frontend

**Ask your own course PDFs anything.**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)

</div>

A React + Vite frontend for the CourseMind AI RAG backend. Sign up, log in,
upload a PDF, and ask questions grounded in your own uploaded material —
each answer shows the exact passage it came from.

## Design

The visual identity leans into the actual ritual of studying rather than a
generic SaaS look: a paper-toned background, a slab serif (Bitter) for
headings that reads like a textbook chapter title, and — the signature
detail — every cited source is rendered with a hand-highlighter mark
behind the exact sentence that answers your question, just like you'd
mark it up in a real book.

## Tech stack

- **React 18** + **Vite** — fast dev server, small production build
- **React Router v6** — client-side routing (`/` for auth, `/dashboard` for the app)
- **Tailwind CSS** — utility-first styling with a custom design token set
- **lucide-react** — icons

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and set `VITE_API_BASE_URL` to your live backend URL (no
trailing slash):

```
VITE_API_BASE_URL=https://your-backend.onrender.com
```

Run it locally:

```bash
npm run dev
```

## Building for production

```bash
npm run build
```

Output goes to `dist/` — a static site, deployable anywhere that serves
static files.

## Deploying (Vercel)

1. Push this folder to its own GitHub repo (or a `frontend/` folder in
   your existing repo)
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click
   **Add New → Project**, select this repo
3. Vercel auto-detects Vite — leave the build settings as default
   (Build Command: `npm run build`, Output Directory: `dist`)
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL` = your live backend URL
5. Click **Deploy** — you'll get a live URL like `https://coursemind-ai.vercel.app`

## Important: backend CORS

Your FastAPI backend needs to explicitly allow requests from this
frontend's domain, or the browser will block every API call. See the
main project README for the exact code to add.

## Project structure

```
src/
├── main.jsx              # entry point
├── App.jsx               # routes
├── index.css             # Tailwind + the highlighter-mark style
├── api/
│   └── client.js         # wraps all 4 backend endpoints
├── context/
│   └── AuthContext.jsx   # JWT token + email, persisted to localStorage
├── components/
│   ├── ProtectedRoute.jsx
│   ├── DocumentChip.jsx
│   ├── AnswerMessage.jsx
│   └── Spinner.jsx
└── pages/
    ├── AuthPage.jsx       # login/signup, split hero layout
    └── DashboardPage.jsx  # upload sidebar + chat interface
```

## Known limitation

There's currently no backend endpoint to fetch a user's previously
uploaded documents, so the sidebar only shows documents uploaded in the
*current* browser session — it resets on page reload. See the main
project's "future improvements" notes for the fix (an added
`GET /documents` endpoint).
