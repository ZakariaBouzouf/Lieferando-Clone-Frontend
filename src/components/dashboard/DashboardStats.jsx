import React from 'react';
import { DollarSign, ShoppingBag, Clock, CheckCircle } from 'lucide-react';

export default function DashboardStats({ orders }) {
  const stats = {
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    completedOrders: orders.filter(order => order.status === 'delivered').length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Revenue</p>
            <p className="text-lg font-semibold">{stats.revenue.toFixed(2)}€</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-lg font-semibold">{stats.totalOrders}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Pending Orders</p>
            <p className="text-lg font-semibold">{stats.pendingOrders}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <CheckCircle className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Completed Orders</p>
            <p className="text-lg font-semibold">{stats.completedOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
