# Sai Teja Mukkera — Portfolio

Personal portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark/light theme, an interactive guestbook backed by Supabase, and a contact form powered by EmailJS.

**Live:** [saitejamukkera.dev](https://saitejamukkera.dev)

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4 + shadcn/ui + Framer Motion
- **Routing:** React Router DOM 7
- **Backend Services:** Supabase (Guestbook auth & storage), EmailJS (Contact form)
- **Validation:** Zod + React Hook Form
- **Analytics:** Vercel Analytics + Rybbit
- **Testing:** Vitest + React Testing Library

## Features

- **Hero** — Animated greeting with profile photo, tech stack pills, and "Open to work" status badge
- **Specializations** — Cards highlighting core engineering areas (API Design, Event-Driven Architecture, Cloud & Infrastructure, Performance Engineering, CI/CD & Quality)
- **Projects** — Featured project showcase with theme-aware thumbnails (light/dark variants), tech badges, and links to live demos / source code
- **Projects Page** (`/projects`) — Dedicated page displaying all projects in a responsive grid
- **Skills** — Interactive filterable skill pills with category tabs (Languages, Backend, Data & Messaging, Cloud & DevOps, Testing & Observability, Frontend) and animated transitions
- **Experience & Education** — Professional timeline with role highlights, plus education cards with location info
- **Contact** — Form with Zod validation that sends emails via EmailJS, plus social links
- **Guestbook** (`/guestbook`) — OAuth sign-in (GitHub / Google) via Supabase, real-time message entries with admin controls
- **Dark / Light Theme** — Toggle with system preference detection, flicker-free initial load, and theme-aware project images via `ThemedImage` component
- **Responsive Navbar** — Floating pill navbar with animated hover states, moving border effect, and mobile menu
- **Footer** — Social links (GitHub, X/Twitter, LinkedIn, Email) with copyright
- **Grid Background** — Subtle grid pattern that adapts between light and dark themes
- **Lazy Loading** — Route-level code splitting for Guestbook and Projects pages

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/saitejamukkera/Portfolio.git
cd Portfolio
npm install
```

### Environment Variables

Create a `.env` file in the project root (see `.env.example`):
cp .env.example .env

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_ADMIN_USER_ID=your-supabase-user-id-after-first-login (Used for admin tag)
```

The Supabase variables are required for the Guestbook feature. The app will still run without them, but the Guestbook won't function.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Testing

```bash
npm run test            # single run
npm run test:watch      # watch mode
npm run test:coverage   # with coverage report
```

## Project Structure

```
src/
├── assets/             # Static assets imported as Vite modules
│   ├── light/          # Light-theme project thumbnails
│   ├── dark/           # Dark-theme project thumbnails
│   └── profile_photo.webp
├── components/         # UI components (Hero, Navbar, Projects, Skills, etc.)
│   ├── ui/             # shadcn/ui primitives (Button, Badge, Avatar, Form, etc.)
│   └── __tests__/      # Component tests
├── context/            # React context providers (ScrollContext)
├── data/               # Resume data (projects, experience, skills, education)
├── Icons/              # Custom SVG icon components (LocationIcon, tech icons)
├── lib/                # Utilities (Supabase client, static links, cn helper)
├── pages/              # Route pages (HomePage, ProjectsPage, GuestbookPage)
└── __tests__/          # Test setup
```

## License

This project is open source and available for reference. Feel free to take inspiration, but please don't copy it directly as your own.
