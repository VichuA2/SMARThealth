import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'patient' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; requireOnboarding?: boolean }>;
  register: (userData: RegisterData) => Promise<boolean>;
  updateProfile: (data: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('healthMonitorUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier: string, password: string): Promise<{ success: boolean; requireOnboarding?: boolean }> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // No onboarding check needed anymore as we do it all in register
      setUser(data);
      localStorage.setItem('healthMonitorUser', JSON.stringify(data));
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return { success: false };
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      // Auto login after register, but require onboarding
      setUser(data);
      localStorage.setItem('healthMonitorUser', JSON.stringify(data));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const updateProfile = async (data: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('healthMonitorUser', JSON.stringify(updatedUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Update error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthMonitorUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};