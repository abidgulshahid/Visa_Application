import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, addUser, hashPassword } from '../../../lib/dummyData';
import { requireAdmin } from '../../../lib/middleware';

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) {
      return auth;
    }

    const body = await request.json();
    const { email, password } = body;


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

    const newAdmin = addUser({
      email,
      password: hashedPassword,
      role: 'admin',
    });

    const { password: _, ...adminWithoutPassword } = newAdmin;
    return NextResponse.json(adminWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Admin creation error:', error);
    return NextResponse.json(
      { statusCode: 500, message: 'Internal server error', error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 