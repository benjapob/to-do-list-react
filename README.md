# Kanban To-Do List

A task management board built with React and TypeScript, featuring a Kanban-style layout with drag and drop.

## Features

- Three columns: **To Do**, **In Progress**, **Done**
- Create tasks in any column with a title and optional description
- Drag and drop cards between columns
- Delete tasks
- Tasks persist across page reloads via `localStorage`

## Tech Stack

- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — static typing
- [Vite](https://vite.dev/) — build tool and dev server
- Native HTML5 Drag and Drop API — no external DnD library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── Column.tsx      # Kanban column with drop zone and inline add form
│   └── TaskCard.tsx    # Draggable task card
├── types.ts            # Shared TypeScript types
├── App.tsx             # Root component and state management
└── App.css             # Styles
```
