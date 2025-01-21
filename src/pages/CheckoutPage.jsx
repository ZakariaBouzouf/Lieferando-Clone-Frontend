import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { creatingOrder } from '../api/OrdersApi';
import { ORDER_STATUS } from '../utils/constants';
import { useRestaurant } from '../context/RestaurantContext';
import { balanceCheck } from '../api/AuthApi';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { restaurants } = useRestaurant()

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

  }, [navigate])

  function findingResName(resId) {
    console.log(resId)
    const result = restaurants?.filter(item => item.id == resId)
    console.log('result', result)
    return result[0].name
  }
  function countingTotal(orders) {
    return orders.reduce((acc, item) => {
      return acc + (item.quantity * item.price)
    }, 0)
  }

  function checkingOrders(orders) {
    const groupedData = Object.values(
      orders.reduce((acc, item) => {
        const { restaurantId, ...rest } = item;

        // If the restaurantId is not already in the accumulator, create it
        if (!acc[restaurantId]) {
          acc[restaurantId] = { restaurant_id: restaurantId, items: [], status: ORDER_STATUS.PENDING, customer_id: user.userId, restaurant_name: findingResName(Number(restaurantId)) };
        }

        // Add the current item (excluding restaurantId) to the items array
        acc[restaurantId].items.push(rest);

        return acc;
      }, {})
    );
    console.log("Grouped",groupedData)
    groupedData.map(order => {
      order.total = countingTotal(order.items)
    })
    console.log("Grouped2",groupedData)
    return groupedData
  }

  const handleCheckout = async (formData) => {
    console.log("data", formData)
    try {
      setLoading(true);
      // TODO: Implement actual payment and order creation
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      const orders = checkingOrders(items)
      // orders.map(ord=>[...ord,...formData])
      let total_orders = 0
      if (orders.length >1 ){
         total_orders = orders.reduce((acc,item)=> acc.total + item.total)
      }else{
        total_orders = orders[0].total
      }
      console.log(total_orders)

      console.log("res", orders)
      const response = await balanceCheck(total_orders)
      if( response.status == 200){
      orders.forEach(async (order) => {
        const response = await creatingOrder({restaurant_id:order.restaurant_id,customer_id: order.customer_id,items: order.items,status: order.status,restaurant_name: order.restaurant_name,total: order.total,note: order.note,...formData})

        if (response.status !== 200) {
          throw new Error("Failed to send data");
        }
        console.log(`Data for restaurantId ${order.restaurant_id} sent successfully.`);
        toast.success('Your order has been created.')
      });
      }
      clearCart();
      navigate('/profile');
    } catch (error) {
      console.error('Checkout failed:', error);
      console.log("message",error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };


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
