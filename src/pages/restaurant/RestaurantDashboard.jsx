import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '../../components/dashboard/DashboardStats';
import OrdersList from '../../components/dashboard/OrdersList';
import MenuManager from '../../components/dashboard/MenuManager';

export default function RestaurantDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // if (!user || user.role !== 'restaurant') {
    //   navigate('/');
    //   return;
    // }

    // TODO: Fetch real data from API
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    // Mock data - replace with API calls
    const mockOrders = [
      {
        id: '1',
        customer: 'John Doe',
        items: [{ name: 'Pizza', quantity: 2, price: 12.99 }],
        total: 25.98,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ];

    const mockMenu = [
      {
        id: '1',
        name: 'Margherita Pizza',
        price: 12.99,
        category: 'Pizza',
        available: true
      }
    ];

    setOrders(mockOrders);
    setMenu(mockMenu);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-bold mb-8">Restaurant Dashboard</h1>
      
      <DashboardStats orders={orders} />
      
      <div className="mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`${
                activeTab === 'menu'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Menu
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'orders' ? (
            <OrdersList orders={orders} />
          ) : (
            <MenuManager menu={menu} setMenu={setMenu} />
          )}
        </div>
      </div>
    </div>
  );
}
