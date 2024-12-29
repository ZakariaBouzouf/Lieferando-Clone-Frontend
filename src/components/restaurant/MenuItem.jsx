import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function MenuItem({ item, restaurantId }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      ...item,
      quantity,
      restaurantId
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-600 mt-1">{item.description}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
        
        <div className="flex items-center space-x-2">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="block w-20 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          
          <button
            onClick={handleAddToCart}
            disabled={!item.available}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}