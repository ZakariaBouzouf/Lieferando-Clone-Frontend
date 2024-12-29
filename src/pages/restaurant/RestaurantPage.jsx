import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuList from '../../components/restaurant/MenuList';
import RestaurantHeader from '../../components/restaurant/RestaurantHeader';
import { mockRestaurants } from '../../utils/mockData';

export default function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  // const [menu, setMenu] = useState([]);

  useEffect(() => {
    // TODO: Replace with API call
    // const fetchRestaurant = async () => {
      // Add more mock menu items
      const foundRestaurant = mockRestaurants.find(r => r.id === id);
      setRestaurant(foundRestaurant);
      // setMenu(mockMenu);
    // };
    //
    // fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RestaurantHeader restaurant={restaurant} />
      <MenuList menu={restaurant.menu} restaurantId={id} />
    </div>
  );
}
