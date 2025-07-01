# Visa Application API Documentation

This document describes the API endpoints implemented for the Visa Application system using Next.js API routes with dummy data.

## Base URL

All API endpoints are prefixed with `/api`

## Authentication

### 1. User Registration

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

**Response (200):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Error Response (409 - Email already exists):**

```json
{
  "statusCode": 409,
  "message": "Email already registered",
  "error": "Conflict"
}
```

### 2. User Login

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Error Response (401 - Invalid credentials):**

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### 3. Create Admin (Admin Only)

**POST** `/api/users/admin`

**Headers:**

```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "email": "admin@example.com",
  "role": "admin",
  "createdAt": "2024-01-07T10:30:00.000Z",
  "updatedAt": "2024-01-07T10:30:00.000Z"
}
```

**Error Response (403 - Not admin):**

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

## Applications

### 1. Get User's Applications

**GET** `/api/applications`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "passportNumber": "AB1234567",
    "nationality": "United States",
    "visaType": "Tourist",
    "purposeOfVisit": "Vacation",
    "intendedArrivalDate": "2024-06-15T00:00:00.000Z",
    "intendedDepartureDate": "2024-06-30T00:00:00.000Z",
    "status": "pending",
    "adminNotes": null,
    "createdAt": "2024-01-07T10:30:00.000Z",
    "updatedAt": "2024-01-07T10:30:00.000Z"
  }
]
```

### 2. Submit New Application

**POST** `/api/applications`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "passportNumber": "AB1234567",
  "nationality": "United States",
  "visaType": "Tourist",
  "purposeOfVisit": "Vacation",
  "intendedArrivalDate": "2024-06-15",
  "intendedDepartureDate": "2024-06-30"
}
```

**Response (201):**

```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "passportNumber": "AB1234567",
  "nationality": "United States",
  "visaType": "Tourist",
  "purposeOfVisit": "Vacation",
  "intendedArrivalDate": "2024-06-15T00:00:00.000Z",
  "intendedDepartureDate": "2024-06-30T00:00:00.000Z",
  "status": "pending",
  "adminNotes": null,
  "createdAt": "2024-01-07T10:30:00.000Z",
  "updatedAt": "2024-01-07T10:30:00.000Z"
}
```

**Error Response (400 - Validation error):**

```json
{
  "statusCode": 400,
  "message": [
    "firstName should not be empty",
    "intendedArrivalDate must be a valid ISO 8601 date string"
  ],
  "error": "Bad Request"
}
```

### 3. Get All Applications (Admin Only)

**GET** `/api/admin/applications`

**Headers:**

```
Authorization: Bearer <admin_jwt_token>
```

**Response (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com"
    },
    "firstName": "John",
    "lastName": "Doe",
    "passportNumber": "AB1234567",
    "nationality": "United States",
    "visaType": "Tourist",
    "purposeOfVisit": "Vacation",
    "intendedArrivalDate": "2024-06-15T00:00:00.000Z",
    "intendedDepartureDate": "2024-06-30T00:00:00.000Z",
    "status": "pending",
    "adminNotes": null,
    "createdAt": "2024-01-07T10:30:00.000Z",
    "updatedAt": "2024-01-07T10:30:00.000Z"
  }
]
```

## SWR Hooks

The application includes SWR hooks for data fetching:

### Authentication Hooks

- `useLogin()` - Handle user login
- `useRegister()` - Handle user registration
- `useAuth()` - Get current authentication status

### Application Hooks

- `useApplications()` - Get and submit user applications
- `useAdminApplications()` - Get all applications (admin only)

## Test Credentials

For testing purposes, the following credentials are available:

- **User**: `user@example.com` / `password123`
- **Admin**: `admin@example.com` / `password123`

## Testing

Visit `/api-test` to test all API endpoints with a user-friendly interface.

## Implementation Details

- **Backend**: Next.js API routes with dummy data storage
- **Authentication**: JWT tokens with bcrypt password hashing
- **Data Fetching**: SWR for client-side data management
- **Validation**: Server-side validation with detailed error messages
- **Authorization**: Role-based access control (user/admin)

## File Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   └── register/route.ts
│   ├── users/
│   │   └── admin/route.ts
│   ├── applications/route.ts
│   └── admin/
│       └── applications/route.ts
├── lib/
│   ├── api.ts (API client)
│   ├── jwt.ts (JWT utilities)
│   ├── dummyData.ts (Mock data store)
│   ├── middleware.ts (Auth middleware)
│   └── hooks/
│       ├── useAuth.ts
│       └── useApplications.ts
└── api-test/page.tsx (Test interface)
```
