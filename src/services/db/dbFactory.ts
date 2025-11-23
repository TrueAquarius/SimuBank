import { IUserRepository } from './IUserRepository';

export async function getUserRepository(): Promise<IUserRepository> {
  const dbProvider = process.env.DB_PROVIDER;
  console.log(`[dbFactory] DB_PROVIDER: ${dbProvider}`);
  switch (dbProvider) {
    case 'mongodb':
      const { MongoUserRepository } = await import('./mongodb/userRepository');
      return new MongoUserRepository();
    default:
      const { MongoUserRepository: DefaultMongoRepo } = await import('./mongodb/userRepository');
      // Default to MongoDB if not specified
      return new DefaultMongoRepo();
  }
}