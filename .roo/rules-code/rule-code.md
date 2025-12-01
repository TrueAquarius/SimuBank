# Coding Rules for SimuBank App

This document outlines the coding standards and best practices for the `SimuBank App` project. Adhering to these rules ensures code quality, consistency, and maintainability.

---

## 1. General Principles

- **Readability & Simplicity**: Write code that is easy to read and understand. Prefer clear, simple solutions over complex ones. Code should be self-documenting whenever possible.
- **DRY (Don't Repeat Yourself)**: Avoid duplicating code. Abstract reusable logic into utility functions, custom hooks, or shared components.
- **Comments & Documentation**:
    - Explain *why* a piece of code exists, not *what* it does. The code itself should explain the "what."
    - Use `// TODO:` to mark areas that require future attention or improvement. Include a brief description of what needs to be done.

## 2. TypeScript & JavaScript Best Practices

- **Variable Declarations**: Default to `const` for all variable declarations. Use `let` only when a variable's value needs to be reassigned. Avoid using `var`.
- **Function Style**: Prefer arrow functions, especially for component props and event handlers, to ensure a consistent `this` context and improve readability.
- **Type Safety**:
    - Strictly avoid using the `any` type. If its use is unavoidable, add a comment explaining the justification.
    - Leverage the TypeScript types and interfaces defined in the `src/models/` directory for all data structures.
- **Module Imports**: Group and sort imports in the following order to maintain consistency:
    1.  External libraries (e.g., `react`, `next`).
    2.  Absolute internal paths (e.g., `src/components/ui/Button`).
    3.  Relative paths (e.g., `../styles/brand.css`).

## 3. React & Next.js Conventions

- **Component Naming**: Use `PascalCase` for all React component files and their corresponding function names (e.g., `UserProfile.tsx` should define a component named `UserProfile`).
- **Hook Usage**:
    - Strictly adhere to the Rules of Hooks (e.g., only call hooks at the top level of a React function).
    - Encapsulate complex or reusable stateful logic within custom hooks (e.g., `useUserData`).
- **File Naming**:
    - Page routes should be named `page.tsx`.
    - Layouts should be named `layout.tsx`.
- **Props Handling**:
    - Define prop types using TypeScript interfaces. Name the interface with a `Props` suffix (e.g., `UserProfileProps`).
    - Always destructure props in the function signature for clarity and to easily identify the data a component depends on.

## 4. Styling with Tailwind CSS

- **Class Ordering**: To ensure consistency, maintain a logical order for Tailwind CSS utility classes. A recommended order is: Layout & Grid, Spacing, Sizing, Typography, Color & Background, Borders, Effects, and Transitions. Consider using an automated sorting plugin.
- **Responsive Design**: Adopt a mobile-first approach. Apply base styles for mobile and use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) to add or override styles for larger screens.

## 5. Testing

- **File Naming & Location**: Co-locate test files with the source files they are testing. Use the `.test.tsx` (for components) or `.spec.ts` (for other TS files) suffix. For example, `src/lib/utils.ts` should have a corresponding test file at `src/lib/utils.spec.ts`.
- **Test Structure**: Use a clear and consistent structure for tests, such as the "Arrange, Act, Assert" (AAA) pattern. This makes tests easier to read and maintain.

## 6. Version Control (Git)

- **Commit Messages**: Adhere to the [Conventional Commits specification](https://www.conventionalcommits.org/). This creates a clean and descriptive commit history that can be used to automate changelog generation and versioning.
    - **Format**: `<type>[optional scope]: <description>`
    - **Examples**:
        - `feat: add user authentication endpoint`
        - `fix(auth): resolve issue with password reset token`
        - `docs: update component props documentation`
- **Branching Strategy**:
    - Create new branches from the `main` branch for all new features or bug fixes.
    - Use a descriptive naming convention, such as `feature/add-profile-page` or `fix/login-validation-bug`.
    - Keep branches small, focused on a single task, and short-lived to facilitate easier code reviews and merges.