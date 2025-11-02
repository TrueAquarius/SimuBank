import { User } from '@/models/user';
import { IUserRepository } from '../IUserRepository';
import odbc from 'odbc';

// The MS Access ODBC driver does not support SQLDescribeParam, which the odbc library
// uses by default. We must disable it globally to prevent an error.
odbc.SQL_DESC_PARAMETER = false;

// Connection string for the installed 64-bit Microsoft Access ODBC driver
const connectionString = `Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=${process.env.MSACCESS_PATH};`;

export class AccessUserRepository implements IUserRepository {
  public async findUserByEmail(email: string): Promise<User | null> {
    let connection;
    try {
      connection = await odbc.connect(connectionString);
      const users: User[] = await connection.query(`SELECT id, [name], email, mobileNumber, [password] FROM users WHERE email = ?`, [email]);
      
      if (users.length === 0) {
        return null;
      }
      return users[0];
    } catch (error) {
      console.error('Error finding user by email in MS Access (ODBC):', error);
      return null;
    } finally {
      if (connection) await connection.close();
    }
  }

  public async createUser(userData: Omit<User, 'id'>): Promise<User> {
    let connection;
    const { name, email, mobileNumber, password } = userData;
    try {
      connection = await odbc.connect(connectionString);

      await connection.query(
        `INSERT INTO users ([name], email, mobileNumber, [password]) VALUES (?, ?, ?, ?)`,
        [name, email, mobileNumber, password]
      );
      
      // Retrieve the ID of the last inserted record
      const result = await connection.query<{ id: number }>(`SELECT @@IDENTITY AS id`);

      if (!result || result.length === 0) {
        throw new Error('Failed to retrieve ID after insertion.');
      }
      const newId = result[0].id;

      // The user model expects a string ID.
      return { id: newId.toString(), ...userData };

    } catch (error) {
      console.error('Error creating user in MS Access (ODBC):', error);
      throw new Error('Failed to create user.');
    } finally {
      if (connection) await connection.close();
    }
  }
}