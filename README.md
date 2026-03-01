# 🏢 Workspace Builder | Monis.rent

An interactive drag-and-drop workspace builder where users can design their dream office setup and rent it. Built as a challenge project for [monis.rent](https://monis.rent) — a company that rents out office equipment to digital nomads and startups in Bali.

Instead of scrolling through a boring product catalog, users can **drag furniture onto a canvas**, arrange it freely, and hit **Rent** when they're happy with their setup.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)

## ✨ Features

- **Drag & Drop** — Drag items from the sidebar catalog and drop them onto the canvas
- **Freeform Positioning** — Move items freely anywhere on the canvas
- **Visual Drag Overlay** — See a preview of the item while dragging
- **Cart Dropdown** — Review selected items, remove individual items, or reset everything
- **Fullscreen Canvas** — Maximized workspace area with grid background
- **Scrollable Sidebar** — Browse through available items without losing canvas space
- **Boundary Clamping** — Items stay within the canvas boundaries

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [React 19](https://react.dev) | UI library |
| [TypeScript 5](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [dnd-kit](https://dndkit.com) | Drag and drop toolkit |
| [Zustand 5](https://zustand.docs.pmnd.rs) | Lightweight state management |

## 📁 Project Structure

```
app/
├── components/
│   ├── Canvas.tsx          # Droppable canvas area
│   ├── CanvasItem.tsx      # Draggable item on canvas
│   ├── CartDropdown.tsx    # Cart dropdown with item list
│   ├── Sidebar.tsx         # Sidebar wrapper with catalog
│   └── SidebarItem.tsx     # Draggable catalog item card
├── lib/
│   ├── types.ts            # Shared type definitions
│   └── utils.ts            # Utility functions
├── store/
│   └── workspaceStore.ts   # Zustand store for workspace state
├── globals.css
├── layout.tsx
└── page.tsx                # Main page with DnD context
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd desent-test

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the workspace builder.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🧩 How It Works

1. **Browse** — Scroll through available items in the left sidebar
2. **Drag** — Pick up an item and drag it onto the canvas
3. **Arrange** — Move items freely on the canvas to design your workspace
4. **Review** — Open the cart dropdown to see your selected items
5. **Rent** — Hit the "Rent Workspace" button when you're happy

## 🤖 AI-Assisted Development

This project was built with the help of [Claude](https://claude.ai) (by Anthropic) as a coding assistant. Claude helped with architecture decisions, component structure, drag-and-drop implementation, debugging hydration issues, and overall code quality improvements.

## 📄 License

This project is private and built as a challenge submission for Desent / monis.rent.