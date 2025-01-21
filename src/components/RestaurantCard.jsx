import React from 'react';
import { Star, Clock, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';

export default function RestaurantCard({ restaurant }) {
  const {prefetchMenu}= useRestaurant()

  return (
    <Link to={`/restaurant/${restaurant.id}`} onMouseEnter={()=>prefetchMenu(restaurant.id)}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Closed</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
          
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span>25-35 min</span>
            </div>
            
            <div className="flex items-center">
              <Bike className="h-4 w-4 text-gray-400 mr-1" />
              <span>
                {restaurant.deliveryFee === 0 ? 'Free Delivery' : `${restaurant.deliveryFee.toFixed(2)}€`}
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {restaurant.cuisine.map((type, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
