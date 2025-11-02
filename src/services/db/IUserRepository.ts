import { User } from '@/models/user';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(userData: Omit<User, 'id'>): Promise<User>;
}