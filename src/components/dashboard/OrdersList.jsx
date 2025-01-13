import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function OrdersList({ orders, onUpdateStatus }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statuses = ['pending', 'preparing', 'ready', 'delivered'];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {orders.map(order => (
          <li key={order.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-orange-600 truncate">
                    Order #{order.id}
                  </p>
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="text-sm text-gray-900">
                  Customer: {order.customer}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.quantity}x {item.name}
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900">
                  Total: ${order.total.toFixed(2)}
                </p>
                <div className="flex items-center space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                    className="block w-32 pl-3 pr-10 py-1 text-sm border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
