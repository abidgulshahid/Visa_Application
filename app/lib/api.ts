const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: string;
}

export interface ApplicationRequest {
  firstName: string;
  lastName: string;
  passportNumber: string;
  nationality: string;
  visaType: string;
  purposeOfVisit: string;
  intendedArrivalDate: string;
  intendedDepartureDate: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
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

export interface AdminApplication extends Omit<Application, 'userId'> {
  userId: {
    _id: string;
    email: string;
  };
}

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Authentication APIs
export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE}auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json();
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE}auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  },

  createAdmin: async (data: { email: string; password: string }): Promise<User> => {
    const response = await fetch(`${API_BASE}users/admin`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Admin creation failed');
    }
    
    return response.json();
  },

  getCurrentUser: async (token: string): Promise<User> => {
    const response = await fetch(`${API_BASE}users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user info');
    }
    return response.json();
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE}users/all`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch users');
    }
    return response.json();
  },
};

// Application APIs
export const applicationApi = {
  getApplications: async (): Promise<Application[]> => {
    const response = await fetch(`${API_BASE}/applications`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch applications');
    }
    
    return response.json();
  },

  submitApplication: async (data: ApplicationRequest): Promise<Application> => {
    const response = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(Array.isArray(error.message) ? error.message.join(', ') : error.message || 'Failed to submit application');
    }
    
    return response.json();
  },

  getAdminApplications: async (): Promise<AdminApplication[]> => {
    const response = await fetch(`${API_BASE}admin/applications`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch admin applications');
    }
    
    return response.json();
  },
}; 