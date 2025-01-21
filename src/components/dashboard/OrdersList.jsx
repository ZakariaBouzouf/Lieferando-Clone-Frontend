import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, ArrowUpDown,MessageSquare } from 'lucide-react';

export default function OrdersList({ orders, onUpdateStatus }) {
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    orderId: null,
    newStatus: null
  });

  // Filter states
  const [filters, setFilters] = useState({
    status: 'all',
    sortOrder: 'desc'
  });
  // const [showFilters, setShowFilters] = useState(false);

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


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSortOrder = () => {
    setFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };
  // Filter and sort orders
  const filteredOrders = [...orders]
  .filter(order => {
    // Status filter
    if (filters.status !== 'all' && order.status !== filters.status) {
      return false;
    }
    return true;
  })
  .sort((a, b) => {
    // Sort by creation time
    const dateA = new Date(a.datetime_added).getTime();
    const dateB = new Date(b.datetime_added).getTime();
    return filters.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md relative">
      {/* Filter and Sort Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={toggleSortOrder}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>{filters.sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>
      </div>
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
        {filteredOrders.map(order => (
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
                    {formatDistanceToNow(new Date(order.datetime_added), { addSuffix: true })}
                  </p>
                </div>
              </div>
              
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <div className="mr-6">
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">Customer:</span> {order.customer_name}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>
                        {order.address}
                        {order.zipCode && <span className="ml-1">({order.zipCode})</span>}
                      </p>
                    </div>
                    {order.note && (
                      <div className="mt-2 flex items-start text-sm text-gray-500">
                        <MessageSquare className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 mt-0.5" />
                        <p className="whitespace-pre-wrap">{order.note}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm sm:mt-0">
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

              <div className="mt-4">
                <div className="bg-gray-50 rounded-md p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="text-gray-600">{(item.price * item.quantity).toFixed(2)}€</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>{order.total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
