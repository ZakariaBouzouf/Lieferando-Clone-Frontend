import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow mb-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
        <div className="mt-2 flex items-center space-x-4">
          <select
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            className="block w-20 pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={() => removeItem(item.id)}
        className="text-gray-400 hover:text-red-500"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}