import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, logoutApi, sessionApi, signUpApi, updateUserApi } from '../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import _default from 'eslint-plugin-react-refresh';
import { USER_ROLES } from '../utils/constants';

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
        if (response.data.role == USER_ROLES.RESTAURANT) {
          setUser({
            userId: response.data.userId,
            email: response.data.email,
            name: response.data.name,
            role: response.data.role,
            restaurantId: response.data.restaurantId,
            balance: response?.data?.balance.toFixed(2)
          });
        } else {
          setUser({
            userId: response.data.userId,
            email: response.data.email,
            name: response.data.name,
            role: response.data.role,
            address: response.data.address,
            // restaurantId: response.data.restaurantId,
            balance: response?.data?.balance.toFixed(2),
            zipCode: response.data.zipCode
          });
        }
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
        if (response.data.role == USER_ROLES.RESTAURANT) {
          setUser({
            userId: response.data.userId,
            name: response.data.name,
            role: response.data.role,
            restaurantId: response.data.restaurantId,
            balance: response.data.balance
          })
          navigate("/dashboard")
        } else {
          setUser({
            userId: response.data.userId,
            name: response.data.name,
            role: response.data.role,
            restaurantId: response.data.restaurantId,
            balance: response.data.balance,
            address: response.data.address,
            zipCode: response.data.zipCode
          })
          console.log("Log in", user)
          navigate("/")
        }
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

  async function updateUser(id, data) {
    try {
      const response = await updateUserApi(id, data)
      if (response.status == 200) {
        setUser({ ...user, name: response.data.name, address: response.data.address, zipCode: response.data.zipCode })
      }
    } catch (error) {
      throw new Error(error)
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
    <AuthContext.Provider value={{ user, login, logout, register, error, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
