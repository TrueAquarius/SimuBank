// src/types/odbc.d.ts

/**
 * This is a custom type declaration file for the 'odbc' module,
 * as no official @types/odbc package exists.
 * It provides basic type information for the parts of the library
 * used in this project.
 */
declare module 'odbc' {
  // Allow a global property to be set on the module.
  export let SQL_DESC_PARAMETER: boolean;

  export interface Connection {
    query<T>(sql: string, params?: any[]): Promise<T[]>;
    close(): Promise<void>;
  }

  export function connect(connectionString: string): Promise<Connection>;
}