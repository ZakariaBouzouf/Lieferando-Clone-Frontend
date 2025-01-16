import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, logoutApi, sessionApi, signUpApi } from '../api/AuthApi';
import {  useNavigate } from 'react-router-dom';
import _default from 'eslint-plugin-react-refresh';
import { retrieveCustomerOrder, retrieveRestaurantOrder } from '../api/OrdersApi';

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
  const [orders, setOrders] = useState([])
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
        });
        // if (response.status ===200 ){
        //   fetchOrders(response.data.userId)
        // }
      } catch (error) {
        console.error("No active session:", error.response?.data?.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  useEffect(()=>{
    if(user != undefined){
      if(user.status ==="restaurant"){
        fetchOrdersRestaurant(user?.userId)
      }else{
        fetchOrdersCustomer(user?.userId)
      }
    }
  },[user])

  async function login({ email, password }) {

    try {
      const response = await loginApi(email, password)
      console.log(response)
      if (response.status == 200) {
        setUser({ userId: response.data.userId, role: response.data.role })
        console.log("Log in", user)
        navigate("/")
      }
    } catch (err) {
      setError(err.response.data.message)
    }
    // fetchOrders(user?.userId)
    //store token in localStorage
  };

  async function fetchOrdersCustomer(id) {
    try {
      const response = await retrieveCustomerOrder(id)
      if (response.status === 200) {
        console.log("fetch orders",response)
        setOrders(response.data)
      }
    } catch (err) {
      setError(err.response)
    }
  }

  async function fetchOrdersRestaurant(id) {
    try {
      const response = await retrieveRestaurantOrder(id)
      if (response.status === 200) {
        console.log("fetch orders api",response)
        setOrders(response.data)
      }
    } catch (err) {
      setError(err.response)
    }
  }

  async function register({ email, password, name, role, address }) {
    try {
      const response = await signUpApi(email, password, name, role, address)
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
    <AuthContext.Provider value={{ user, login, logout, register, error, fetchOrdersCustomer,fetchOrdersRestaurant,orders }}>
      {children}
    </AuthContext.Provider>
  );
}
