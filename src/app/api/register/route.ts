import { NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/services/db/mongodb/userRepository';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { name, email, mobileNumber, password } = await request.json();

    // Basic validation
    if (!name || !email || !mobileNumber || !password) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          message:
            'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.',
        },
        { status: 400 }
      );
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'User registered successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}