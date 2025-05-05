# 📄 Product Requirements Document (PRD)

## 🎯 Project Title: Anime Search App (Powered by Jikan API)

## 📚 Summary
This project is a two-page React web application that allows users to search for anime titles via the Jikan API. 
Users can perform an instant search for anime, view paginated results in a Netflix-style UI grid, and click a result to view more detailed information.

## 🌐 API Reference
- **Base API:** https://api.jikan.moe/v4
- **Search Endpoint:** `/anime?q={query}&page={page}`
- **Details Endpoint:** `/anime/{id}`

The Jikan API is free to use and does not require authentication.

## 🛠️ Tech Stack

| Layer | Stack |
|-------|-------|
| Framework | React 18 with Vite |
| Language | TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Icons | Lucide Icons |
| Routing | react-router-dom |
| HTTP Client | fetch (or axios, team choice) |
| State Management | React useState, useEffect |
| Debounce | Custom useDebounce hook |

## 🧾 Functional Requirements

### ✅ Core Functionalities

#### 1. Search Page (/)
Default landing page of the application.

Contains:
- A centered search input bar with instant search.
- A grid of anime cards showing:
  - Poster image
  - Title
  - Enlarge-on-hover effect
- Pagination Controls:
  - Next/Previous buttons
  - Page numbers

Behaviors:
- Instant search with 250ms debounce (no submit button).
- Server-side pagination (based on pagination.last_visible_page from Jikan API).
- Grid layout should resemble Netflix's UI style (flex/grid layout with hover zoom effect).

#### 2. Anime Details Page (/anime/:id)
Triggered when an anime card is clicked.

Displays:
- Large poster
- Title
- Synopsis
- Ranking
- Popularity
- Total member count

Includes:
- Back button to return to search page
- If possible, restore previous scroll/search state

## 🧱 File Structure
```
anime-search-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/                # Static images or global CSS (optional)
│   ├── components/            # Reusable components
│   │   ├── AnimeCard.tsx
│   │   └── Pagination.tsx
│   ├── pages/                 # Route-based pages
│   │   ├── SearchPage.tsx
│   │   └── AnimeDetailsPage.tsx
│   ├── hooks/                 # Custom hooks
│   │   └── useDebounce.ts
│   ├── types/                 # Type definitions for API response
│   │   └── anime.ts
│   ├── utils/                 # Utility functions (e.g. API service)
│   │   └── api.ts
│   ├── App.tsx                # Routing setup
│   ├── main.tsx               # Vite entry point
│   └── index.css              # Tailwind CSS import
├── .eslintrc.cjs              # Linting rules
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite config
├── package.json
└── README.md
```

## ⚙️ Setup & Configuration

### Step 1: Create App with Vite + React + TypeScript
```bash
npm create vite@latest anime-search-app -- --template react-ts
cd anime-search-app
npm install
```

### Step 2: Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure tailwind.config.ts:
```ts
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

Add Tailwind to src/index.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 3: Install UI Library
```bash
npm install @radix-ui/react-icons lucide-react class-variance-authority tailwind-variants
```
(Or follow full shadcn/ui setup guide)

### Step 4: Install React Router
```bash
npm install react-router-dom
```

## 📐 Design & UX Guidelines
- Use responsive design for both desktop and mobile views.
- Use shadcn/ui components where appropriate (inputs, buttons, etc.).
- On hover, the anime poster should slightly scale up (zoom-in effect).
- Ensure accessibility: alt texts, semantic HTML, etc.

## 🔍 Developer Notes
- Keep search state and pagination in URL if possible (e.g. `/?q=naruto&page=2`) to enable back button functionality.
- Consider loading states and error messages for failed API calls.
- Use TypeScript for all files. Define API response interfaces in types/anime.ts.
- Use React hooks only (useState, useEffect, useNavigate, etc.).
- Debounce search using a custom hook (useDebounce with 250ms delay).

## 🚧 Future Enhancements (Out of Scope for MVP)
- Dark mode toggle
- Infinite scroll instead of pagination
- User favorites (localStorage-based)
- Filters (genre, type, rating, etc.)

## 📌 Acceptance Criteria
- ✅ Users can search for anime with instant feedback (no button).
- ✅ Results show paginated cards with title + image.
- ✅ Clicking a card opens a detail page with full anime info.
- ✅ Navigation between pages preserves previous state.
- ✅ All code uses TypeScript, React hooks, and latest best practices.