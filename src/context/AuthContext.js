import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (mobileNumber, code) => {
    try {
      let role = '';
      
      if (code === 'AAHAR2024') {
        role = 'admin';
      } else if (code === 'CUSTOMER24') {
        role = 'customer';
      } else {
        throw new Error('Invalid code. Please try again.');
      }

      const userData = {
        mobileNumber,
        role,
        loginTime: new Date().toISOString()
      };

      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return { success: true, role };
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};