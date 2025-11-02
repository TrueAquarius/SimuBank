import { IUserRepository } from './IUserRepository';
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