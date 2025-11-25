import { exec } from 'child_process';
import * as util from 'util';
import { MongoClient } from 'mongodb';

const execPromise = util.promisify(exec);

export interface DatabaseConfig {
  connectionString: string;
  databaseName: string;
  dataSetPath?: string; // Optional for cleanup
}

export class DatabaseManager {
  private config: DatabaseConfig;
  private client: MongoClient | null = null;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  private async connect(): Promise<MongoClient> {
    if (this.client) {
      return this.client;
    }
    this.client = new MongoClient(this.config.connectionString);
    await this.client.connect();
    return this.client;
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  }

  /**
   * Restore a database from a dump
   */
  async restoreDatabase(): Promise<void> {
    if (!this.config.dataSetPath) {
        throw new Error("Data set path is not defined. Cannot restore database.");
    }
    const command = `mongorestore --uri="${this.config.connectionString}" --db=${this.config.databaseName} --drop "${this.config.dataSetPath}"`;
    console.log(`Executing: ${command}`);
    try {
      const { stdout, stderr } = await execPromise(command);
      console.log('Database restored successfully.');
      if (stdout) {
        console.log('stdout:', stdout);
      }
      if (stderr && !stderr.includes("don't know what to do with file")) { // mongorestore sometimes outputs benign warnings to stderr
        console.error('stderr:', stderr);
      }
    } catch (error) {
      console.error('Failed to restore database:', error);
      throw new Error(`Failed to restore database: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Delete a database
   */
  async deleteDatabase(): Promise<void> {
    try {
      const client = await this.connect();
      const db = client.db(this.config.databaseName);
      await db.dropDatabase();
      console.log(`Database ${this.config.databaseName} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete database ${this.config.databaseName}:`, error);
      // Don't throw here, as we want cleanup to be robust
    }
  }
}

/**
 * Setup database for a test suite
 */
export async function setupDatabaseForSuite(connectionString: string, databaseName: string, dataSetName: string): Promise<DatabaseManager> {
  const dataSetPath = `documents/testdata/${dataSetName}/dump`;
  
  const dbManager = new DatabaseManager({
    connectionString,
    databaseName,
    dataSetPath,
  });

  await dbManager.restoreDatabase();
  return dbManager;
}

/**
 * Cleanup database for a test suite
 */
export async function cleanupDatabaseForSuite(dbManager: DatabaseManager): Promise<void> {
    //await dbManager.deleteDatabase();
    await dbManager.disconnect();
}