# Profilely — Candidate Profile Manager

Profilely is a responsive React application for creating, reviewing, saving, and managing professional candidate profiles. It uses browser localStorage, so saved profiles and in-progress drafts persist after a refresh without requiring a backend.

## Features

- Six-step candidate profile form
- Multiple experience, education, and project entries
- Dynamic skill addition and removal
- Step-by-step validation and required-field indicators
- Automatic draft saving
- Professional resume-style review
- Saved candidate search, view, edit, and delete
- Confirmation modal and React Toastify notifications
- Shared responsive layout
- Light and dark themes
- Desktop and mobile support

## Technology Stack

- React.js and JavaScript
- React Router
- Tailwind CSS
- React Toastify
- Lucide React
- Vite
- Browser localStorage

## Routes

| Route | Purpose |
| --- | --- |
| `/candidates` | View and search saved candidates |
| `/candidates/new` | Create a candidate profile |
| `/candidates/:id` | View a completed profile |
| `/candidates/:id/edit` | Edit an existing profile |

## Folder Structure

```text
src/
├── components/
│   ├── form/           # Reusable controls and form-step content
│   ├── layout/         # Shared application layout
│   ├── profile/        # Resume-style profile preview
│   └── Header.jsx      # Shared responsive header
├── context/            # Shared candidate state and actions
├── data/               # Candidate model and step configuration
├── hooks/              # Context access and form-state logic
├── pages/              # Routed pages
├── utils/              # Storage and formatting helpers
├── App.jsx             # Route definitions
├── index.css           # Tailwind setup and reusable primitives
└── main.jsx            # Application entry point
```

## Local Storage

The application stores saved profiles, the current form draft, and the selected theme in the browser. No backend or external database is required.

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Commands

```bash
npm run dev       # Start development
npm run lint      # Run ESLint
```

Required fields are marked with a red asterisk and each step is validated before continuing.
