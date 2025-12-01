import clientPromise from '@/lib/mongodb';
import { User } from '@/models/user';
import { Collection, Db, ObjectId } from 'mongodb';
import { IUserRepository } from '../IUserRepository';

interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  mobileNumber: string;
  password?: string;
}

const DB_NAME = process.env.MONGODB_NAME || 'simubank';
const COLLECTION_NAME = 'users';

async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

async function getCollection(): Promise<Collection<UserDocument>> {
  const db = await getDb();
  return db.collection<UserDocument>(COLLECTION_NAME);
}

export class MongoUserRepository implements IUserRepository {
  public async findUserByEmail(email: string): Promise<User | null> {
    const collection = await getCollection();
    const userDoc = await collection.findOne({ email });

    if (!userDoc || !userDoc._id) {
      return null;
    }

    return {
      id: userDoc._id.toHexString(),
      name: userDoc.name,
      email: userDoc.email,
      mobileNumber: userDoc.mobileNumber,
      password: userDoc.password,
    };
  }

  public async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const collection = await getCollection();
    const { name, email, mobileNumber, password } = userData;

    const userDocument: Omit<UserDocument, '_id'> = {
      name,
      email,
      mobileNumber,
      password,
    };

    const result = await collection.insertOne(userDocument);

    return {
      ...userData,
      id: result.insertedId.toHexString(),
    };
  }
}