// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user
    const loadUser = () => {
      try {
        // Try localStorage first (remember me)
        const localUser = localStorage.getItem('user');
        if (localUser) {
          console.log('Found user in localStorage');
          setUser(JSON.parse(localUser));
          setLoading(false);
          return;
        }
        
        // Try sessionStorage
        const sessionUser = sessionStorage.getItem('user');
        if (sessionUser) {
          console.log('Found user in sessionStorage');
          setUser(JSON.parse(sessionUser));
        } else {
          console.log('No user found in storage');
        }
      } catch (e) {
        console.error('Failed to parse user data', e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []); // Empty dependency array is correct

  const login = async (userData, rememberMe = false) => {
    try {
      setLoading(true);
      console.log('Login called with rememberMe:', rememberMe);
      
      // Mock user data
      const mockUser = {
        id: 1,
        name: userData.name || 'Shakib Ahmed',
        email: userData.email || 'shakib@example.com',
        phone: userData.phone,
        walletBalance: 2450.75,
        greenPoints: 1250,
        memberSince: '2023-06-15',
        totalTrips: 24,
        tier: 'Gold Member',
        address: 'Visakhapatnam, Andhra Pradesh'
      };
      
      console.log('Setting user:', mockUser);
      setUser(mockUser);
      
      // Store based on remember me
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(mockUser));
        sessionStorage.removeItem('user');
        console.log('User saved to localStorage');
      } else {
        sessionStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.removeItem('user');
        console.log('User saved to sessionStorage');
      }
      
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out');
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  console.log('AuthProvider state - isAuthenticated:', !!user, 'loading:', loading);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};