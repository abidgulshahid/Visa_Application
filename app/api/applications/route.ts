import { NextRequest, NextResponse } from 'next/server';
import { findApplicationsByUserId, addApplication } from '../../lib/dummyData';
import { requireAuth } from '../../lib/middleware';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) {
      return auth;
    }

    // Get user's applications
    const applications = findApplicationsByUserId(auth.user._id);

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { statusCode: 500, message: 'Internal server error', error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) {
      return auth;
    }

    const body = await request.json();
    const {
      firstName,
      lastName,
      passportNumber,
      nationality,
      visaType,
      purposeOfVisit,
      intendedArrivalDate,
      intendedDepartureDate,
    } = body;

    // Validation
    const errors: string[] = [];
    if (!firstName) errors.push('firstName should not be empty');
    if (!lastName) errors.push('lastName should not be empty');
    if (!passportNumber) errors.push('passportNumber should not be empty');
    if (!nationality) errors.push('nationality should not be empty');
    if (!visaType) errors.push('visaType should not be empty');
    if (!purposeOfVisit) errors.push('purposeOfVisit should not be empty');
    if (!intendedArrivalDate) errors.push('intendedArrivalDate should not be empty');
    if (!intendedDepartureDate) errors.push('intendedDepartureDate should not be empty');

    // Validate date format
    if (intendedArrivalDate && !Date.parse(intendedArrivalDate)) {
      errors.push('intendedArrivalDate must be a valid ISO 8601 date string');
    }
    if (intendedDepartureDate && !Date.parse(intendedDepartureDate)) {
      errors.push('intendedDepartureDate must be a valid ISO 8601 date string');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { statusCode: 400, message: errors, error: 'Bad Request' },
        { status: 400 }
      );
    }

    // Create application
    const newApplication = addApplication({
      userId: auth.user._id,
      firstName,
      lastName,
      passportNumber,
      nationality,
      visaType,
      purposeOfVisit,
      intendedArrivalDate: new Date(intendedArrivalDate).toISOString(),
      intendedDepartureDate: new Date(intendedDepartureDate).toISOString(),
      status: 'pending',
      adminNotes: null,
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error('Submit application error:', error);
    return NextResponse.json(
      { statusCode: 500, message: 'Internal server error', error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 