# Visa Application System

A modern visa application management system built with Next.js, TypeScript, and PrimeReact. This application allows users to submit visa applications and administrators to manage and review them.

## Features

- **User Authentication**: Secure login/register system with JWT tokens
- **Visa Application Form**: Multi-step form for submitting visa applications
- **Admin Dashboard**: Administrative interface for managing applications
- **Real-time Status Tracking**: Users can track their application status
- **Responsive Design**: Modern UI built with PrimeReact and Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: PrimeReact, PrimeIcons, PrimeFlex
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit, SWR
- **Authentication**: JWT tokens with bcryptjs
- **Form Validation**: Zod
- **Development**: ESLint, PostCSS

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** (package manager)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Visa_Application
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# JWT Secret (required for authentication)
JWT_SECRET=your-super-secret-jwt-key-here

# API Base URL (optional - defaults to http://localhost:3000)
NEXT_PUBLIC_API_BASE=http://localhost:3000

# API URL for admin operations (optional)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important**: Replace `your-super-secret-jwt-key-here` with a strong, unique secret key for production use.

### 4. Run the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

### 5. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Default User Accounts

The application comes with pre-configured dummy accounts for testing:

### Regular User

- **Email**: `user@example.com`
- **Password**: `password123`
- **Role**: User

### Administrator

- **Email**: `admin@example.com`
- **Password**: `password123`
- **Role**: Admin

## Project Structure

```
Visa_Application/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── applications/  # Application management
│   │   └── users/         # User management
│   ├── components/        # React components
│   ├── dashboard/         # User dashboard
│   ├── lib/               # Utility functions and configurations
│   │   ├── features/      # Redux store and API slices
│   │   └── hooks/         # Custom React hooks
│   ├── login/             # Login page
│   └── signup/            # Registration page
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## API Documentation

For detailed API documentation, see [README_API.md](./README_API.md).

## Key Features

### User Features

- Register and login with email/password
- Submit visa applications through a multi-step form
- Track application status
- View application history

### Admin Features

- View all submitted applications
- Approve or reject applications
- Add admin notes to applications
- Create new admin accounts

## Development Notes

- **Data Storage**: Currently uses in-memory dummy data. No database setup required for development.
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **CORS**: Configured for local development
- **TypeScript**: Strict mode enabled with comprehensive type definitions

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**

   ```bash
   # Kill the process using port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Environment variables not loading**

   - Ensure `.env.local` file is in the root directory
   - Restart the development server after adding environment variables

3. **TypeScript errors**
   ```bash
   # Clear TypeScript cache
   rm -rf .next
   npm run dev
   ```

### Performance Optimization

- The application uses SWR for data fetching with optimized caching
- Redux Toolkit provides efficient state management
- Next.js automatic code splitting and optimization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.
