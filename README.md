# Project Tracker — React Native Mobile App

A focused, stable React Native app for tracking project statuses. Built with **Expo** and **TypeScript**.

---

## Setup Instructions

### Prerequisites

- Node.js ≥ 18
- [Expo Go](https://expo.dev/client) on your device, or an Android Emulator / iOS Simulator

### Steps

```bash
# 1. Clone the repo
git clone <repository-url>
cd p_tracker

# 2. Install dependencies
npm install

# 3. Start the dev server
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS). Press `a` for Android emulator or `i` for iOS simulator.

---

## API / Mocking Approach

**Chosen approach: Local mock service with simulated network behaviour.**

The backend is a pure TypeScript module at `src/services/api.ts` backed by seed data in `src/services/mockData.ts`.

| Behaviour            | Detail                                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Latency**          | 1-second artificial delay on every call                                                                                                                             |
| **Error simulation** | ~5% random failure on `getProjects` to exercise the error UI                                                                                                        |
| **Persistence**      | Updates are stored in a module-level variable — changes survive navigation within the session                                                                       |
| **Shared state**     | All screens read from a single React Context (`src/context/ProjectsContext.tsx`), so a status update on the detail screen is immediately visible on the list screen |

---

## Project Structure

```
p_tracker/
├── app/
│   ├── _layout.tsx          # Root layout — wraps app with ProjectsProvider
│   ├── index.tsx            # Project List Screen
│   └── project/
│       └── [id].tsx         # Project Detail Screen
└── src/
    ├── components/
    │   ├── EmptyState.tsx   # Empty list / no results UI
    │   ├── ErrorMessage.tsx # Error + retry UI
    │   ├── ProjectCard.tsx  # List item card
    │   └── StatusBadge.tsx  # Colour-coded status pill
    ├── context/
    │   └── ProjectsContext.tsx  # Shared state for all screens
    ├── hooks/
    │   └── useProjects.ts   # (kept for reference; logic now lives in context)
    ├── services/
    │   ├── api.ts           # Simulated API methods
    │   └── mockData.ts      # Seed data
    └── types/
        └── project.ts       # Project & ProjectStatus types
```

---
