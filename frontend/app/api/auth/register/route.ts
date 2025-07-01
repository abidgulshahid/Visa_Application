import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, addUser, hashPassword } from '../../../lib/dummyData';
import { generateToken } from '../../../lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role = 'user' } = body;

    if (!email || !password) {
      return NextResponse.json(
        { statusCode: 400, message: 'Email and password are required', error: 'Bad Request' },
        { status: 400 }
      );
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { statusCode: 409, message: 'Email already registered', error: 'Conflict' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = addUser({
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken({
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

    return NextResponse.json({
      access_token: token,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { statusCode: 500, message: 'Internal server error', error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 