import { NextRequest, NextResponse } from 'next/server';
import { applications, findUserById } from '../../../lib/dummyData';
import { requireAdmin } from '../../../lib/middleware';

export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const auth = await requireAdmin(request);
    if (auth instanceof NextResponse) {
      return auth;
    }

    // Get all applications with user information
    const applicationsWithUser = applications.map(app => {
      const user = findUserById(app.userId);
      return {
        ...app,
        userId: {
          _id: user?._id || app.userId,
          email: user?.email || 'Unknown',
        },
      };
    });

    return NextResponse.json(applicationsWithUser);
  } catch (error) {
    console.error('Get admin applications error:', error);
    return NextResponse.json(
      { statusCode: 500, message: 'Internal server error', error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 