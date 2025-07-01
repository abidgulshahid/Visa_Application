import useSWR from 'swr';
import { authApi, AuthResponse, LoginRequest, RegisterRequest } from '../api';

export function useLogin() {
  const { data, error, isLoading, mutate } = useSWR<AuthResponse | null>(
    null,
    null,
    { revalidateOnFocus: false }
  );

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authApi.login(credentials);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      mutate(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    mutate(null);
  };

  return {
    user: data?.user || null,
    token: data?.access_token || null,
    login,
    logout,
    isLoading,
    error,
  };
}

export function useRegister() {
  const { data, error, isLoading, mutate } = useSWR<AuthResponse | null>(
    null,
    null,
    { revalidateOnFocus: false }
  );

  const register = async (userData: RegisterRequest) => {
    try {
      const response = await authApi.register(userData);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      mutate(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    user: data?.user || null,
    token: data?.access_token || null,
    register,
    isLoading,
    error,
  };
}

export function useAuth() {
  const { data: user } = useSWR(
    typeof window !== 'undefined' ? 'user' : null,
    () => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
  );

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return {
    user,
    isAuthenticated,
    isAdmin,
  };
} 