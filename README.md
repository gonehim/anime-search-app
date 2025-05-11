# 🎬 Anime Search App

A modern React application that allows users to search and discover anime titles using the Jikan API. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🔍 Instant anime search with debouncing
- 🎨 Netflix-style grid layout with hover effects
- 📱 Responsive design for all devices
- 📄 Detailed anime information pages
- 🔄 Pagination support
- 🎯 TypeScript for type safety
- 💅 Modern UI with Tailwind CSS and shadcn/ui

## 🚀 Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide Icons
- **Routing:** react-router-dom
- **API:** Jikan API (https://api.jikan.moe/v4)

## 📁 Project Structure

```
anime-search-app/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   ├── pages/          # Route-based pages
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
```

## 🎯 Key Features

### Search Page
- Instant search with 250ms debounce
- Netflix-style grid layout
- Pagination controls
- Responsive design

### Anime Details Page
- Comprehensive anime information
- Back navigation
- State preservation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [Jikan API](https://jikan.moe/) for providing the anime data
- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
