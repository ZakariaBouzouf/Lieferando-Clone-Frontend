import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, logoutApi, sessionApi, signUpApi } from '../api/AuthApi';
import {  useNavigate } from 'react-router-dom';
import _default from 'eslint-plugin-react-refresh';

const AuthContext = createContext(undefined);


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await sessionApi()
        setUser({
          userId: response.data.userId,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          restaurantId: response.data.restaurantId,
        });
      } catch (error) {
        console.error("No active session:", error.response?.data?.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  async function login({ email, password }) {

    try {
      const response = await loginApi(email, password)
      console.log(response)
      if (response.status == 200) {
        setUser({ userId: response.data.userId, role: response.data.role,restaurantId:response.data.restaurantId })
        console.log("Log in", user)
        navigate("/")
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  };

  async function register(registrationForm) {
    try {
      const response = await signUpApi(registrationForm)
      if (response.status == 200) {
        console.log("Done", response)
        navigate("/login")
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  async function logout() {
    setUser(null);
    try {
      const response = await logoutApi()
      if (response.status === 200) {
        navigate("/")
      }
    } catch (err) {
      console.log(err)
      // setError(err.response.data.message)
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  );
}
