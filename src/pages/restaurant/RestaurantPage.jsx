import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuList from '../../components/restaurant/MenuList';
import RestaurantHeader from '../../components/restaurant/RestaurantHeader';
import { mockRestaurants } from '../../utils/mockData';
import { retrieveARestaurant } from '../../api/RestaurantApi';
import { retieveAllMenus } from '../../api/MenusApi';

export default function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // TODO: Replace with API call
    const fetchRestaurant = async () => {
      const response = await retrieveARestaurant(id)
      const foundRestaurant = response.data

      setRestaurant(foundRestaurant);
    };
    fetchRestaurant();
  }, [id]);

  useEffect(() => {
    // TODO: Replace with API call
    const fetchMenus = async () => {
      const response = await retieveAllMenus(id)
      const foundMenus = response.data

      setMenu(foundMenus);
    };
    fetchMenus();
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {restaurant.deliveryFee ? (
        <RestaurantHeader restaurant={restaurant} />
      ): (
      <p>Loading...</p>
      )
      }
      <MenuList menu={menu} restaurantId={id} />
    </div>
  );
}
