import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../../components/dashboard/DashboardStats';
import OrdersList from '../../components/dashboard/OrdersList';
import MenuManager from '../../components/dashboard/MenuManager';
import RestaurantProfile from '../../components/dashboard/RestaurantProfile';
import { useRestaurant } from '../../context/RestaurantContext';
import { useOrder } from '../../context/OrderContext';

export default function RestaurantDashboard() {
  const { user } = useAuth();
  const{updateAnOrder,fetchOrdersRestaurant,orders,setOrders}=useOrder()
  const {menus,restaurants,retrieveMenus,updateRestaurant} = useRestaurant()
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  // const [orders, setOrders] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    console.log(user)
    // if (!user || user.role !== 'restaurant') {
    //   navigate('/');
    //   return;
    // }
    //TODO: still need to fix the right restaurant for the right user
    setRestaurant(restaurants[0])
    if(user != undefined){
      retrieveMenus(user?.userId)
      fetchOrdersRestaurant(user?.userId)
    }
    console.log("fetched menus ",menus)
  }, [user, navigate]);

  const handleUpdateOrderStatus =async (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    updateAnOrder(orderId,newStatus)
  };

  const handleUpdateRestaurant = (updatedData) => {
    setRestaurant(prev => ({
      ...prev,
      ...updatedData
    }));
    updateRestaurant(user.userId,updatedData)
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-bold mb-8">Restaurant Dashboard</h1>

      <DashboardStats orders={orders} />

      <div className="mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${activeTab === 'profile'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${activeTab === 'orders'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`${activeTab === 'menu'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Menu
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'profile' ? (
            <RestaurantProfile
              restaurant={restaurant}
              onUpdate={handleUpdateRestaurant}
            />
          ) : activeTab === 'orders' ? (
            <OrdersList
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          ) : (
            <MenuManager
              menu={menus}
              restaurantId={user.userId}
              // setMenu={setMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
}
