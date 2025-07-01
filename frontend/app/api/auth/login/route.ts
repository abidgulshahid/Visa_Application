import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, comparePassword } from '../../../lib/dummyData';
import { generateToken } from '../../../lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { statusCode: 400, message: 'Email and password are required', error: 'Bad Request' },
        { status: 400 }
      );
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { statusCode: 401, message: 'Invalid credentials', error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { statusCode: 401, message: 'Invalid credentials', error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    // Return response
    return NextResponse.json({
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { statusCode: 500, message: 'Internal server error', error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 