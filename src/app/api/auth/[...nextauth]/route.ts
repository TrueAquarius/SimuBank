import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByEmail } from '@/services/db/mongodb/userRepository';
import bcrypt from 'bcrypt';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await findUserByEmail(credentials.email);

        if (user && user.password) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordValid && user.id) {
            // Return user object without the password
            return { id: user.id, name: user.name, email: user.email };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };