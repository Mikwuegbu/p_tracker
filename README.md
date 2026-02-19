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

## Features

| Requirement                              | Implementation                                             |
| ---------------------------------------- | ---------------------------------------------------------- |
| Project list with name / client / status | `ProjectCard` component with `StatusBadge`                 |
| Pull-to-refresh                          | `FlatList` + `RefreshControl`                              |
| Long name handling                       | `numberOfLines={1}` on name Text                           |
| Filter by status                         | Collapsible chip row                                       |
| Search by name or client                 | Live `TextInput` filter                                    |
| Filters work together                    | Single `useMemo` in context combines both                  |
| Original dataset intact                  | Filters applied to read-only copy; mutation only on update |
| Project detail screen                    | Full detail card with all fields                           |
| Update project status                    | Three-button grid on detail screen                         |
| Immediate UI update                      | Shared context; no refetch needed                          |
| Loading state                            | `ActivityIndicator` on initial load and status update      |
| Empty list state                         | Full-screen `EmptyState` component                         |
| No results after filter                  | Separate `EmptyState` type                                 |
| API failure state                        | Full-screen `ErrorMessage` with "Try Again"                |

---

## Assumptions & Trade-offs

- **Navigation**: Expo Router (file-based). Chosen for seamless Expo integration and type-safe route params.
- **State management**: React Context with `useState` / `useMemo`. At this scale, Redux or Zustand would be over-engineering.
- **No UI kit**: All styles are raw `StyleSheet.create`. This makes component responsibility transparent.
- **Status update UI**: Three-button grid rather than a native Picker — consistent cross-platform and no additional dependency.
- **`description` field**: Added as the one justified extra field. Projects almost always have a description; it justifies the detail screen.

---

## AI Usage Disclosure

**Tool used**: Antigravity (Advanced Agentic AI — Google DeepMind)

| Part                        | AI Involvement                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------- |
| Initial scaffolding         | AI generated folder structure, mock data, base components                             |
| Filtering logic (`useMemo`) | AI generated; reviewed and understood                                                 |
| Context architecture        | AI proposed + generated after identifying the shared-state bug                        |
| Status update UI            | AI designed (rejected native Picker in favour of custom grid)                         |
| Bug fixes                   | AI identified: empty types file, independent hook instances, missing `updating` state |

**What was changed or rejected**:

- Rejected Zustand / Redux — unnecessary complexity for this scope.
- Rejected heavy UI kits (NativeBase, React Native Paper) — hides component logic.
- Rejected random 20% error rate — reduced to 5% for a more realistic demo without constant failures.

**Full understanding**: Every file in the codebase is understood — navigation flow, memoized filter logic, context provider/consumer pattern, and mock API session persistence.
