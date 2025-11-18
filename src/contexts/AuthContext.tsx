import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer' | 'admin';
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'candidate' | 'employer') => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'candidate' | 'employer', companyName?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('jobportal_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'candidate' | 'employer') => {
    // Simulate login
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
    };
    
    if (role === 'employer') {
      mockUser.companyName = 'Миний Компани';
    }
    
    // Admin login
    if (email === 'admin@jobportal.mn' && password === 'admin123') {
      mockUser.role = 'admin';
      mockUser.name = 'Админ';
    }
    
    setUser(mockUser);
    localStorage.setItem('jobportal_user', JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, name: string, role: 'candidate' | 'employer', companyName?: string) => {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      companyName: role === 'employer' ? companyName : undefined,
    };
    
    setUser(mockUser);
    localStorage.setItem('jobportal_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobportal_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
