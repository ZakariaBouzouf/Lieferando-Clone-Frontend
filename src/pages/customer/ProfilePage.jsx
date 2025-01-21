import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, User, MapPin, Phone, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useOrder } from '../../context/OrderContext';

export default function ProfilePage() {
  const { user, login, updateUser } = useAuth();
  const { fetchOrdersCustomer, orders } = useOrder();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    zipCode: user?.zipCode || ''
  });

  useEffect(() => {
    if (user != undefined) {
      fetchOrdersCustomer(user?.userId)
    }
  }, [user, navigate])

  // Filters state
  const [filters, setFilters] = useState({
    status: 'all',
    sortOrder: 'desc' // 'desc' for newest first, 'asc' for oldest first
  });

  console.log('orders', orders)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditing) {
      login({ ...user, ...formData });
    } else {
      updateUser(user.userId, formData)
    }
    setIsEditing(false);
    console.log(formData)
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

  const filteredOrders = [...orders]
    .filter(order => {
      if (filters.status !== 'all' && order.status !== filters.status) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.datetime_added).getTime();
      const dateB = new Date(b.datetime_added).getTime();
      return filters.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'delivering': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            {!isEditing ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{user.address || 'No address provided'}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{user.zipCode || 'Zip code  provided'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                  <input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Order History</h2>
            {/* Filter Controls */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="delivering">Delivering</option>
                  <option value="delivered">Delivered</option>
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

            <div className="space-y-6">
              {filteredOrders?.map(order => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{order.restaurant_name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDistanceToNow(new Date(order.datetime_added), { addSuffix: true })}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order?.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity} x {item.name}</span>
                        <span>{(item.price * item.quantity).toFixed(2)}€</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>{order?.total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
