import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../lib/middleware';
import { User } from '../../../lib/dummyData';

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) {
    return auth;
  }
  const userWithoutPassword: Partial<User> = { ...auth.user };
  if (userWithoutPassword.password) {
    delete userWithoutPassword.password;
  }
  return NextResponse.json(userWithoutPassword);
} 