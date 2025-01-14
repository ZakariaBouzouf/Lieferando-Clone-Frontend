import React, { useEffect, useState } from 'react';
import SearchFilters from '../components/SearchFilters';
import RestaurantCard from '../components/RestaurantCard';
import { retrieveAllRestaurants } from '../api/RestaurantApi';
import { useRestaurant } from '../context/RestaurantContext';
import { prefetchMenuApi } from '../api/MenusApi';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState({
    openNow: false,
    freeDelivery: false
  });
  // const [restaurants, setRestaurants] = useState([])
  const {restaurants,prefetchMenu} = useRestaurant()

  // useEffect(() => {
  //   async function retrieveRestaurants() {
  //     try {
  //       const response = await retrieveAllRestaurants();
  //       setRestaurants(response.data)
  //       console.log(restaurants)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   retrieveRestaurants()
  // }, [])

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (filters.openNow && !restaurant.isOpen) return false;
    if (filters.freeDelivery && restaurant.deliveryFee > 0) return false;

    const searchLower = search.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
      <div className='flex items-center gap-2 pt-2 pb-2'>
        <div>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Hungry? Order food to your door
          </h1>

          <SearchFilters
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <img className='w-1/2 h-72 rounded-lg' src="../../homepage.png" alt="homepage" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard  key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
