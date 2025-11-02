import { User } from '@/models/user';
import { IUserRepository } from '../IUserRepository';
import ADODB from 'node-adodb';

// Force 64-bit script engine if running on a 64-bit Node.js process
// This is necessary to match the architecture of the MS Access Database Engine driver.
const is64 = process.arch === 'x64';
const connection = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${process.env.MSACCESS_PATH};Persist Security Info=False;`, is64);

export class AccessUserRepository implements IUserRepository {
  public async findUserByEmail(email: string): Promise<User | null> {
    try {
      const users: User[] = await connection.query(`SELECT id, [name], email, mobileNumber, [password] FROM users WHERE email = '${email}'`);
      if (users.length === 0) {
        return null;
      }
      return users[0];
    } catch (error) {
      console.error('Error finding user by email in MS Access:', error);
      return null;
    }
  }

  public async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const { name, email, mobileNumber, password } = userData;
    try {
      const result = await connection.execute(
        `INSERT INTO users ([name], email, mobileNumber, [password]) VALUES ('${name}', '${email}', '${mobileNumber}', '${password}')`
      );
      
      // ADODB doesn't return the created user, so we have to query for it.
      // This is not ideal, but a limitation of the library.
      const newUser = await this.findUserByEmail(email);
      if (!newUser) {
        throw new Error('Failed to create user.');
      }
      return newUser;

    } catch (error) {
      console.error('Error creating user in MS Access:', error);
      throw new Error('Failed to create user.');
    }
  }
}