# Project Tracker Mobile App

A stable and predictable React Native mobile application for tracking project statuses, built with Expo and Expo Router.

## Objective

This app demonstrates clean React Native structure, correct API integration, state management, and reliable handling of various UI states (loading, error, empty).

## Features

- **Project List**: Search by name or client, filter by status, and pull-to-refresh.
- **Project Details**: Comprehensive view of project metadata including an additional 'Description' field.
- **Status Updates**: Real-time status updates that reflect immediately in the UI.
- **Robust State Handling**: dedicated states for loading, error, and empty search results.

## Tech Stack

- **React Native (Expo)**: Core framework.
- **Expo Router**: File-based navigation.
- **Lucide React Native**: Iconography.
- **TypeScript**: Type safety and predictability.

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd p_tracker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npx expo start
   ```

## API / Mocking Approach

The app uses a simulated API service located in `src/services/api.ts`.

- **Latency**: Each request has an artificial 1-second delay to demonstrate loading states.
- **Error Simulation**: The `getProjects` endpoint has a small random chance to fail, allowing verification of the Error UI and retry mechanism.
- **Persistence**: Status updates are persisted in a local session variable within the service, ensuring immediate UI updates and consistency while the app is running.

## Assumptions and Trade-offs

- **Navigation**: Chose Expo Router for its modern file-based routing and seamless integration with the Expo ecosystem.
- **State Management**: Used a custom hook (`useProjects`) combining `useState`, `useEffect`, and `useMemo`. For an app of this scale, a full state management library like Redux or Zustand was avoided to reduce over-engineering and keep the logic explicit.
- **Status Selection**: Implemented a custom grid of buttons for status updates rather than a native picker. This provides a more consistent, predictable, and "premium" user experience across platforms without adding extra dependencies.
- **UI Kits**: Avoided heavy UI kits (like NativeBase or Paper) to show raw component responsibility and clean CSS-in-JS (StyleSheet) implementation.

## AI Usage Disclosure

- **Tool used**: Antigravity (Advanced Agentic AI).
- **Parts generated**: Scaffolding, core logic (hooks, API simulation), and UI components.
- **Modifications**: Adjusted the default Expo template to remove tabs and focus on a clean stack navigation. Custom-designed the Status Selection UI to be more intuitive than a standard dropdown.
- **Understanding**: Full understanding of the entire codebase, including navigation flow, memoized filtering logic, and the relationship between the service layer and the UI.
