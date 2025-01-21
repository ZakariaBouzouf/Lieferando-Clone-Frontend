import React from 'react';
import { Star, Clock, Bike } from 'lucide-react';

export default function RestaurantHeader({ restaurant }) {
  return (
    <div className="flex flex-col">
      <div className="h-64 w-full overflow-hidden">
        <img
          src={restaurant?.image}
          alt={restaurant?.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
          <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {restaurant?.name}
            </h1>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{restaurant?.rating}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span>25-35 min</span>
            </div>

            <div className="flex items-center">
              <Bike className="h-4 w-4 text-gray-400 mr-1" />
              <span>
                { restaurant.restaurant !== undefined ? 
                (restaurant?.deliveryFee === 0 ? 'Free Delivery' : `${restaurant?.deliveryFee.toFixed(2)}€`) : ('loading')
                } 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
