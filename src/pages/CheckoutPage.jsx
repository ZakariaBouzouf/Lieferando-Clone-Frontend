import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { creatingOrder } from '../api/OrdersApi';
import { ORDER_STATUS } from '../utils/constants';
import { useRestaurant } from '../context/RestaurantContext';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { restaurants} = useRestaurant()
  
  function findingResName(resId){
    const result = restaurants?.find((item) => item.id === resId)
    console.log('result',result)
    return result.name
  }

  function checkingOrders(orders) {
    const groupedData = Object.values(
      orders.reduce((acc, item) => {
        const { restaurantId, ...rest } = item;

        // If the restaurantId is not already in the accumulator, create it
        if (!acc[restaurantId]) {
          acc[restaurantId] = { restaurant_id: restaurantId, items: [], status: ORDER_STATUS.PENDING , customer_id:user.userId,name:findingResName(user.userId)};
        }

        // Add the current item (excluding restaurantId) to the items array
        acc[restaurantId].items.push(rest);

        return acc;
      }, {})
    );
    return groupedData
  }
  // function countingTotal(orders){
  //   orders.reduce((acc,item)=>{
  //     const {total ,...rest} = item;
  //
  //     const tot = (acc.price * acc.quantity) 
  //   },0)
  // }

  const handleCheckout = async (formData) => {
    try {
      setLoading(true);
      // TODO: Implement actual payment and order creation
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      const orders = checkingOrders(items)


      console.log("res", orders)

      orders.forEach(async (order) => {
        const response = await creatingOrder(order.restaurant_id, order.customer_id, order.items, order.status,order.name,order.total)
        if (response.status !== 200) {
          throw new Error("Failed to send data");
        }
        console.log(`Data for restaurantId ${order.restaurant_id} sent successfully.`);
      });
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CheckoutForm onSubmit={handleCheckout} loading={loading} />
        <OrderSummary items={items} total={total} />
      </div>
    </div>
  );
}
