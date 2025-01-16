import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../../components/dashboard/DashboardStats';
import OrdersList from '../../components/dashboard/OrdersList';
import MenuManager from '../../components/dashboard/MenuManager';
import RestaurantProfile from '../../components/dashboard/RestaurantProfile';
import { mockRestaurants } from '../../utils/mockData';
import { retrieveRestaurantOrder } from '../../api/OrdersApi';
import { useRestaurant } from '../../context/RestaurantContext';

export default function RestaurantDashboard() {
  const { user,orders:fetchedOrders,fetchOrdersRestaurant } = useAuth();
  const {menus,restaurants,retrieveMenus} = useRestaurant()
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  // const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    console.log(user)
    // if (!user || user.role !== 'restaurant') {
    //   navigate('/');
    //   return;
    // }

    // TODO: Fetch real data from API
    fetchDashboardData();
    if(user != undefined){
      retrieveMenus(user?.userId)
    }
    console.log("fetched menus ",menus)
    // setMenu(menus);
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    fetchOrdersRestaurant(user?.userId)
    // const response = await retrieveRestaurantOrder(user.userId)
    // Mock data - replace with API calls
    // const mockOrders = [
    //   {
    //     id: '1',
    //     customer: 'John Doe',
    //     items: [{ name: 'Pizza', quantity: 2, price: 12.99 }],
    //     total: 25.98,
    //     status: 'pending',
    //     createdAt: new Date().toISOString()
    //   }
    // ];
    //
    // const mockMenu = [
    //   {
    //     id: '1',
    //     name: 'Margherita Pizza',
    //     price: 12.99,
    //     category: 'Pizza',
    //     available: true
    //   }
    // ];
    // Get restaurant data from mock data (in real app, fetch from API)
    // const restaurantData = mockRestaurants[0]; // Using first restaurant as example
    // console.log("fetched order ",fetchedOrders)

    setOrders(fetchedOrders);
    //TODO : fix the right restaurant 
    // restaurant = restaurants.filter(restau=>restau.id == user?.userId)
    setRestaurant(restaurants[0])
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleUpdateRestaurant = (updatedData) => {
    setRestaurant(prev => ({
      ...prev,
      ...updatedData
    }));
    // In a real app, make API call to update restaurant data
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
              // setMenu={setMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
}
