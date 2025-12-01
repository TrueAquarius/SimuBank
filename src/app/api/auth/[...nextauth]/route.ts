import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserRepository } from '@/services/db/dbFactory';
import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';

async function getAuthOptions(): Promise<NextAuthOptions> {
  const authOptions: NextAuthOptions = {
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

          const userRepository = await getUserRepository();
          const user = await userRepository.findUserByEmail(credentials.email);

          if (user && user.password) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordValid && user.id) {
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
    secret: process.env.NEXTAUTH_SECRET || 'super-secret-dev-key',
    pages: {
      signIn: '/login',
    },
  };


  return authOptions;
}

let handler: any;

async function initialize() {
  if (!handler) {
    const authOptions = await getAuthOptions();
    handler = NextAuth(authOptions);
  }
  return handler;
}

export async function GET(...args: any[]) {
  const h = await initialize();
  return h(...args);
}

export async function POST(...args: any[]) {
  const h = await initialize();
  return h(...args);
}