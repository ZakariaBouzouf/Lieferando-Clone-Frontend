import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../context/AuthContext';

export default function OrdersList({ orders, onUpdateStatus }) {
  const {user,fetchOrdersRestaurant}= useAuth()
  useEffect(() => {
    if (user != undefined) {
      fetchOrdersRestaurant(user?.userId)
    }
  }, [user]);
  console.log("orders", orders)
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    orderId: null,
    newStatus: null
  });

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

  const handleStatusChange = (orderId, newStatus) => {
    setConfirmationState({
      isOpen: true,
      orderId,
      newStatus
    });
  };

  const handleConfirm = () => {
    onUpdateStatus(confirmationState.orderId, confirmationState.newStatus);
    setConfirmationState({ isOpen: false, orderId: null, newStatus: null });
  };

  const handleCancel = () => {
    setConfirmationState({ isOpen: false, orderId: null, newStatus: null });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md relative">
      {/* Confirmation Dialog */}
      {confirmationState.isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Status Change
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to change the order status to{' '}
              <span className="font-medium">{confirmationState.newStatus}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders List */}
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
                    {/* {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })} */}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <div className="text-sm text-gray-900">
                  Customer: {order.customer_id}
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
                  {/* Total: ${order.total.toFixed(2)} */}
                </p>
                <div className="flex items-center space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
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
