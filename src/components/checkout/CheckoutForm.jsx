import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CheckoutForm({ onSubmit, loading }) {
  const {user}= useAuth()
  // const [showNewAddress, setShowNewAddress] = useState(false);
  // const [mainAddess, setMainAddress] = useState({
  //   id: '',
  //   name: '',
  //   address: '',
  //   zipCode: '',
  // })
  const [formData, setFormData] = useState({
    name: user?.name ||'',
    street: user?.street ||'',
    zipCode: user?.zipCode ||'',
    note: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-6">Delivery Information</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 pl-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-700">Delivery Address</h3>
            <button
              type="button"
              onClick={() => setShowNewAddress(true)}
              className="flex items-center text-sm text-orange-600 hover:text-orange-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New Address
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              name="street"
              required
              value={formData.street}
              onChange={handleChange}
              className="my-1 pl-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              required
              value={formData.zipCode}
              onChange={handleChange}
              className="my-1 pl-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Note to Restaurant</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Special instructions, allergies, preferences..."
            rows={3}
            className="mt-1 pl-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}
