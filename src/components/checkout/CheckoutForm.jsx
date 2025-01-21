import React, { useState } from 'react';

export default function CheckoutForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    zipCode: '',
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Note to Restaurant</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Special instructions, allergies, preferences..."
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
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
