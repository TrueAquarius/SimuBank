import { User } from '@/models/user';
import { IUserRepository } from '../IUserRepository';
import ADODB from 'node-adodb';

// Connection string for the ADODB provider.
// It uses the Microsoft ACE OLEDB provider to connect to the Access database.
const connection = ADODB.open(`Provider=Microsoft.ACE.OLEDB.16.0;Data Source=${process.env.MSACCESS_PATH};`);

export class AccessUserRepository implements IUserRepository {
  public async findUserByEmail(email: string): Promise<User | null> {
    try {
      const users: User[] = await connection.query(
        `SELECT id, [name], email, mobileNumber, [password] FROM users WHERE email = '${email}'`
      );
      
      if (users.length === 0) {
        return null;
      }
      return users[0];
    } catch (error) {
      console.error('Error finding user by email in MS Access (ADODB):', error);
      return null;
    }
  }

  public async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const { name, email, mobileNumber, password } = userData;
    try {
      // node-adodb does not support parameterized queries for INSERT statements with @@IDENTITY.
      // We must manually construct the SQL string.
      await connection.execute(
        `INSERT INTO users ([name], email, mobileNumber, [password]) VALUES ('${name}', '${email}', '${mobileNumber}', '${password}')`
      );
      
      // Retrieve the ID of the last inserted record
      const result = (await connection.query(`SELECT @@IDENTITY AS id`)) as { id: number }[];

      if (!result || result.length === 0) {
        throw new Error('Failed to retrieve ID after insertion.');
      }
      const newId = result[0].id;

      // The user model expects a string ID.
      return { id: newId.toString(), ...userData };

    } catch (error) {
      console.error('Error creating user in MS Access (ADODB):', error);
      throw new Error('Failed to create user.');
    }
  }
}