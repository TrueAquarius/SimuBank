# Plan: Abstracting the Data Layer

The core of this plan is to create an abstraction layer that decouples the application from any specific database technology. This will allow switching between MongoDB and MS Access by simply changing an environment variable.

## 1. Update Environment Configuration

Introduce a new environment variable in `.env.local` to specify the database provider and another for the MS Access connection string.

*   **`DB_PROVIDER`**: This variable will be set to either `mongodb` or `msaccess`.
*   **`MSACCESS_PATH`**: This variable will store the file path to your MS Access database (e.g., `C:/data/simubank.accdb`).

## 2. Define a Generic Repository Interface

To ensure consistency across different database implementations, a generic `IUserRepository` interface will be created. This interface will define the contract that all user repositories must follow.

*   **New File**: `src/services/db/IUserRepository.ts`

```typescript
import { User } from '@/models/user';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(userData: Omit<User, 'id'>): Promise<User>;
}
```

## 3. Create a Database Factory

A factory will be responsible for providing the correct repository implementation based on the `DB_PROVIDER` environment variable.

*   **New File**: `src/services/db/dbFactory.ts`

```typescript
import { IUserRepository } from './IUserRepository';
// These paths will be created in the following steps
import { MongoUserRepository } from './mongodb/userRepository';
import { AccessUserRepository } from './msaccess/userRepository';

export function getUserRepository(): IUserRepository {
  const dbProvider = process.env.DB_PROVIDER;

  switch (dbProvider) {
    case 'mongodb':
      return new MongoUserRepository();
    case 'msaccess':
      return new AccessUserRepository();
    default:
      // Default to MongoDB if not specified
      return new MongoUserRepository();
  }
}
```

## 4. Refactor the MongoDB Repository

The existing MongoDB user repository will be refactored into a class that implements the new `IUserRepository` interface.

*   **File to Modify**: `src/services/db/mongodb/userRepository.ts`

## 5. Create the MS Access Repository

A new repository will be created for MS Access. It will be a class that implements the same `IUserRepository` interface, but its methods will contain the logic to interact with an MS Access database, likely using a library like `node-adodb`.

*   **New Directory**: `src/services/db/msaccess/`
*   **New File**: `src/services/db/msaccess/userRepository.ts`

## 6. Update Application Code to Use the Factory

All parts of the application that currently interact directly with the `userRepository` will be updated to use the factory.

*   **File to Modify**: `src/app/api/register/route.ts`
    *   The import will change from `import { findUserByEmail, createUser } from '@/services/db/mongodb/userRepository';` to `import { getUserRepository } from '@/services/db/dbFactory';`.
    *   The code will then get the repository from the factory: `const userRepository = getUserRepository();`.

## Architectural Diagram

```mermaid
graph TD
    subgraph "API Layer"
        A[API Route: /api/register]
    end

    subgraph "Service Layer (Business Logic)"
        B(DB Factory)
        C{DB_PROVIDER}
    end

    subgraph "Data Access Layer (Repositories)"
        D[IUserRepository (Interface)]
        E[MongoUserRepository]
        F[AccessUserRepository]
    end

    subgraph "Database Drivers"
        G[MongoDB Driver]
        H[MS Access Driver (e.g., node-adodb)]
    end

    subgraph "Databases"
        I[MongoDB]
        J[MS Access (.accdb file)]
    end

    A --> B
    B -- reads env --> C
    B -- creates --> E
    B -- creates --> F
    E -- implements --> D
    F -- implements --> D
    E --> G --> I
    F --> H --> J