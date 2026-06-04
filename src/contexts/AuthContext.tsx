import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { usuariosIniciales } from '../utils/mockData';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'bloqueado'>) => boolean;
  updateUser: (userId: string, userData: Partial<User>) => void;
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => User;
  deleteUser: (userId: string) => void;
  toggleUserBlock: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Cargar datos del localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('sassblum_users');
    const storedCurrentUser = localStorage.getItem('sassblum_current_user');

    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      // Convertir fechas de string a Date
      const usersWithDates = parsedUsers.map((user: any) => ({
        ...user,
        createdAt: new Date(user.createdAt)
      }));
      setUsers(usersWithDates);
    } else {
      setUsers(usuariosIniciales);
      localStorage.setItem('sassblum_users', JSON.stringify(usuariosIniciales));
    }

    if (storedCurrentUser) {
      const parsedUser = JSON.parse(storedCurrentUser);
      setCurrentUser({
        ...parsedUser,
        createdAt: new Date(parsedUser.createdAt)
      });
    }
  }, []);

  // Guardar usuarios en localStorage cuando cambian
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('sassblum_users', JSON.stringify(users));
    }
  }, [users]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user && !user.bloqueado) {
      setCurrentUser(user);
      localStorage.setItem('sassblum_current_user', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sassblum_current_user');
  };

  const register = (userData: Omit<User, 'id' | 'createdAt' | 'bloqueado'>): boolean => {
    // Verificar si el email ya existe
    if (users.some(u => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      bloqueado: false,
      createdAt: new Date()
    };

    setUsers(prev => [...prev, newUser]);
    return true;
  };

  const updateUser = (userId: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...userData } : user
    ));

    // Si es el usuario actual, actualizar también
    if (currentUser?.id === userId) {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      localStorage.setItem('sassblum_current_user', JSON.stringify(updatedUser));
    }
  };

  const createUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date()
    };

    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const toggleUserBlock = (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, bloqueado: !user.bloqueado } : user
    ));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      logout,
      register,
      updateUser,
      createUser,
      deleteUser,
      toggleUserBlock
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
