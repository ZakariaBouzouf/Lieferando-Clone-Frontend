import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { USER_ROLES } from '../../utils/constants';
import { Clock } from 'lucide-react';

export default function AuthForm({ type, onSubmit, error }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    zipCode: '',
    role: USER_ROLES.CUSTOMER,
    // Restaurant specific fields
    restaurantName: '',
    description: '',
    deliveryFee:'',
    image: '',
    cuisine: [],
    minOrder: '',
    isOpen: true,
    openingTime: '09:00',
    closingTime: '22:00',
    deliveryRadius: ''
  });

  const [tempCuisine, setTempCuisine] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    
    if (formData.role === USER_ROLES.RESTAURANT) {
      submitData.restaurant = {
        name: formData.restaurantName,
        description: formData.description,
        image: formData.image,
        cuisine: formData.cuisine,
        minOrder: parseFloat(formData.minOrder),
        isOpen: formData.isOpen,
        openingTime: formData.openingTime,
        closingTime: formData.closingTime,
        address: formData.address,
        zipCode: formData.zipCode,
        deliveryRadius: parseInt(formData.deliveryRadius)
      };
    }
    console.log('data',submitData)

    onSubmit(submitData);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleAddCuisine = () => {
    if (tempCuisine.trim() && !formData.cuisine.includes(tempCuisine.trim())) {
      setFormData(prev => ({
        ...prev,
        cuisine: [...prev.cuisine, tempCuisine.trim()]
      }));
      setTempCuisine('');
    }
  };

  const handleRemoveCuisine = (cuisineToRemove) => {
    setFormData(prev => ({
      ...prev,
      cuisine: prev.cuisine.filter(c => c !== cuisineToRemove)
    }));
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {type === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        
        {type === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {type === 'register' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account type</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              >
                <option value={USER_ROLES.CUSTOMER}>Customer</option>
                <option value={USER_ROLES.RESTAURANT}>Restaurant Owner</option>
              </select>
            </div>

            {formData.role === USER_ROLES.RESTAURANT && (
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900">Restaurant Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                  <input
                    type="text"
                    name="restaurantName"
                    required
                    value={formData.restaurantName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Restaurant Image URL</label>
                  <input
                    type="url"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Restaurant preview"
                      className="mt-2 h-32 w-full object-cover rounded-md"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cuisine Types</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="text"
                      value={tempCuisine}
                      onChange={(e) => setTempCuisine(e.target.value)}
                      placeholder="Add cuisine type"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddCuisine}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.cuisine.map((cuisine, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                      >
                        {cuisine}
                        <button
                          type="button"
                          onClick={() => handleRemoveCuisine(cuisine)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-orange-400 hover:bg-orange-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Order Amount ($)</label>
                  <input
                    type="number"
                    name="minOrder"
                    required
                    min="0"
                    step="0.01"
                    value={formData.minOrder}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Opening Time</label>
                    <input
                      type="time"
                      name="openingTime"
                      required
                      value={formData.openingTime}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Closing Time</label>
                    <input
                      type="time"
                      name="closingTime"
                      required
                      value={formData.closingTime}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isOpen"
                    checked={formData.isOpen}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Restaurant is currently open</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Delivery Fee</label>
                  <input
                    name="deliveryFee"
                    required
                    value={formData.deliveryFee}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Delivery Radius (km)</label>
                    <input
                      type="number"
                      name="deliveryRadius"
                      required
                      min="1"
                      value={formData.deliveryRadius}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {type === 'login' ? 'Sign in' : 'Sign up'}
          </button>
        </div>

        <div className="text-sm text-center">
          {type === 'login' ? (
            <Link to="/register" className="font-medium text-orange-600 hover:text-orange-500">
              Don't have an account? Sign up
            </Link>
          ) : (
            <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
              Already have an account? Sign in
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
