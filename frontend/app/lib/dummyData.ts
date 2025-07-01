import bcrypt from 'bcryptjs';

export interface User {
  _id: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
  nationality: string;
  visaType: string;
  purposeOfVisit: string;
  intendedArrivalDate: string;
  intendedDepartureDate: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

// Dummy users data - passwords are "password123"
export const users: User[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    email: 'user@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    role: 'user',
    createdAt: '2024-01-07T10:30:00.000Z',
    updatedAt: '2024-01-07T10:30:00.000Z',
  },
  {
    _id: '507f1f77bcf86cd799439012',
    email: 'admin@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    role: 'admin',
    createdAt: '2024-01-07T10:30:00.000Z',
    updatedAt: '2024-01-07T10:30:00.000Z',
  },
];

// Dummy applications data
export const applications: Application[] = [
  {
    _id: '507f1f77bcf86cd799439013',
    userId: '507f1f77bcf86cd799439011',
    firstName: 'John',
    lastName: 'Doe',
    passportNumber: 'AB1234567',
    nationality: 'United States',
    visaType: 'Tourist',
    purposeOfVisit: 'Vacation',
    intendedArrivalDate: '2024-06-15T00:00:00.000Z',
    intendedDepartureDate: '2024-06-30T00:00:00.000Z',
    status: 'pending',
    adminNotes: null,
    createdAt: '2024-01-07T10:30:00.000Z',
    updatedAt: '2024-01-07T10:30:00.000Z',
  },
];

// Helper functions
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

export function findUserById(id: string): User | undefined {
  return users.find(user => user._id === id);
}

export function findApplicationsByUserId(userId: string): Application[] {
  return applications.filter(app => app.userId === userId);
}

export function addUser(user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): User {
  const newUser: User = {
    ...user,
    _id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
}

export function addApplication(application: Omit<Application, '_id' | 'createdAt' | 'updatedAt'>): Application {
  const newApplication: Application = {
    ...application,
    _id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  applications.push(newApplication);
  return newApplication;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
} 