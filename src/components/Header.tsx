'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Logo from './Logo/Logo';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/">
            <Logo fontSize="2rem" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {status === 'loading' ? (
            <div className="text-gray-500">Loading...</div>
          ) : session ? (
            <>
              <span className="text-gray-700">Hello, {session.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}