import { createContext, useContext, useEffect, useState } from "react";
import { retrieveCustomerOrder, retrieveRestaurantOrder, updateAnOrderApi } from "../api/OrdersApi";
import { useAuth } from "./AuthContext";

const OrderContext = createContext()

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder must be user within an OrderProvider.')
  }
  return context
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user != undefined) {
      if (user?.role === "restaurant") {
        console.log("RESID", user?.restaurantId)
        fetchOrdersRestaurant(user?.restaurantId)
      } else {
        console.log("CALLEd")
        fetchOrdersCustomer(user?.userId)
      }
    }
  }, [user])

  async function fetchOrdersCustomer(id) {
    try {
      const response = await retrieveCustomerOrder(id)
      if (response.status === 200) {
        console.log("fetch orders", response)
        setOrders(response.data)
      }
    } catch (err) {
      setError(err.response)
    }
  }

  async function updateAnOrder(id, status) {
    try {
      await updateAnOrderApi(id, status)
    } catch (error) {
      throw new Error("Order didn't updated.", error)
    }
  }

  async function fetchOrdersRestaurant(id) {
    try {
      const response = await retrieveRestaurantOrder(id)
      if (response.status === 200) {
        console.log("fetch orders api", response)
        setOrders(response.data)
      }
    } catch (err) {
      setError(err.response)
    }
  }


  return (
    <OrderContext.Provider value={{ orders, fetchOrdersCustomer, fetchOrdersRestaurant, setOrders, updateAnOrder }}>
      {children}
    </OrderContext.Provider>
  )
}
