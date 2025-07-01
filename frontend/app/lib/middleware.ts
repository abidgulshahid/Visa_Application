import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from './jwt';
import { findUserById } from './dummyData';

export async function authenticateUser(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader || undefined);
    const payload = verifyToken(token);
    
    const user = findUserById(payload.userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    return { user, payload };
  } catch (error) {
    return null;
  }
}

export async function requireAuth(request: NextRequest) {
  const auth = await authenticateUser(request);
  if (!auth) {
    return NextResponse.json(
      { statusCode: 401, message: 'Unauthorized', error: 'Unauthorized' },
      { status: 401 }
    );
  }
  return auth;
}

export async function requireAdmin(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) {
    return auth;
  }
  
  if (auth.user.role !== 'admin') {
    return NextResponse.json(
      { statusCode: 403, message: 'Forbidden resource', error: 'Forbidden' },
      { status: 403 }
    );
  }
  
  return auth;
} 