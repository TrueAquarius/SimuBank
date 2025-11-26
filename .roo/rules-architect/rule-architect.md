# Architectural Principles for SimuBank App

This document outlines the high-level architectural rules for this Next.js project. These principles should be followed to ensure consistency, scalability, and maintainability.

---

## 1. Directory Structure (App Router)

- **`src/app/`**: All routes, pages, layouts, and API endpoints must be defined within this directory, following the Next.js App Router conventions.
- **`src/components/`**: All shared React components (both Server and Client) should be located here.
    - **UI Primitives**: Basic, reusable UI elements (e.g., Button, Input) should be in `src/components/ui/`.
    - **Feature-Specific**: Components related to a specific feature should be co-located within a feature-specific subdirectory (e.g., `src/components/auth/`).
- **`src/lib/`**: Contains utility functions, helper scripts, and library configurations (e.g., `src/lib/utils.ts`).
- **`src/models/`**: Contains TypeScript types and interfaces for all data entities (e.g., `user.ts`, `product.ts`).
- **`src/services/`**: Houses business logic and abstraction layers.
    - **`src/services/db/`**: Contains the database abstraction layer (repositories).
        - **`src/services/db/mongodb/`**: Holds all MongoDB-specific implementations of the repositories.
        - **`src/services/db/postgresql/`**: Reserved for future PostgreSQL implementations.
- **`src/styles/`**: Contains reusable or shared CSS files, such as `brand.css`. The primary global styling file is `src/app/globals.css`.

## 2. Component Architecture

- **Server Components by Default**: To leverage server-side rendering and reduce the client-side bundle size, components should be Server Components by default.
- **Opt-in to Client Components**: Only use the `"use client"` directive for components that require interactivity (e.g., event handlers like `onClick`, or hooks like `useState`, `useEffect`). Isolate client-side logic to leaf components as much as possible.

## 3. Styling

- **Tailwind CSS First**: All styling must be implemented using Tailwind CSS utility classes. It is the primary and preferred styling method for this project.
- **Centralized Color Palette**: All colors must be defined as CSS variables within `src/styles/brand.css`. This file should then be imported at the top of `src/app/globals.css`. Components should use these variables via Tailwind's `theme()` function.
- **No CSS-in-JS**: Avoid introducing CSS-in-JS libraries (e.g., styled-components, Emotion) to maintain a consistent styling approach.
- **Minimal Global CSS**: Add styles to `globals.css` only for base element resets or styles that are truly global in scope.

## 4. Data Fetching & Persistence

- **Database**: All data shall be stored in a single database. Right now, this single database is a MongoDB. All code shall be written for that MongoDB. At a later time other databases may be chosen. No need to create the code yet.
- **Repository Pattern**: All database operations must be abstracted behind a repository layer. The interfaces for these repositories should be defined, while the concrete implementations must be located in a provider-specific subdirectory within `src/services/db/` (e.g., `src/services/db/mongodb/`). Application code (e.g., API routes, Server Components) must not interact directly with the database driver. This ensures the database can be swapped in the future with minimal refactoring.
- **Server-Side Fetching**: All primary data fetching should be performed on the server within Server Components, calling the repository layer. This is the preferred method for fetching data for initial page loads.
- **Client-Side Fetching**: For data that needs to be fetched on the client (e.g., after user interaction), use a dedicated data fetching hook. While not yet in the project, a library like SWR or TanStack Query is recommended for this purpose.

## 5. State Management

- **React Hooks for Local State**: For component-level state, use React's built-in hooks (`useState`, `useReducer`).
- **URL for Global State**: For global state that should be shareable and persistent (e.g., filters, tabs), prefer using the URL (`searchParams`).
- **Avoid Heavy Libraries**: Do not introduce complex state management libraries like Redux unless the application's complexity grows to a point where it is explicitly justified and approved.

## 6. TypeScript and Code Quality

- **Strict TypeScript**: All new code must be written in TypeScript with strict type checking enabled.
- **Minimize `any`**: The use of the `any` type is strongly discouraged. If it must be used, it requires a comment explaining the justification.
- **ESLint for Linting**: Adhere to the existing ESLint rules defined in the project configuration.

## 7. Deployment & Containerization

- **Stateless Application**: The application must be stateless. Do not store session state or any other persistent data in the application's memory or on the local filesystem. State should be externalized to a database or a dedicated cache (like Redis).
- **Configuration via Environment Variables**: All configuration, including database connection strings, API keys, and feature flags, must be supplied via environment variables. Do not hardcode secrets or environment-specific values in the codebase.
- **Graceful Shutdown**: The application should handle `SIGINT` and `SIGTERM` signals to shut down gracefully, allowing in-flight requests to complete and closing database connections properly.