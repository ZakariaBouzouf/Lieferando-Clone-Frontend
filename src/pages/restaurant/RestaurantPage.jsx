import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuList from '../../components/restaurant/MenuList';
import RestaurantHeader from '../../components/restaurant/RestaurantHeader';
import { retrieveARestaurant } from '../../api/RestaurantApi';
import { retieveAllMenus } from '../../api/MenusApi';

export default function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await retrieveARestaurant(id)
      const foundRestaurant = response.data

      setRestaurant(foundRestaurant);
    };
    fetchRestaurant();
  }, [id]);

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await retieveAllMenus(id)
      const foundMenus = response.data

      setMenu(foundMenus);
    };
    fetchMenus();
  }, [id]);

  if (!restaurant ){
    return <div>Loading...</div>;
  }

  console.log(restaurant)
  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
      {/* {restaurant !== undefined ? ( */}
        <RestaurantHeader restaurant={restaurant} />
      {/* ) : ( */}
        {/* <p>Loading...</p> */}
      {/* ) */}
      {/* } */}
      {menu.length ==0 ? <p>This restaurant propose no menu in moment </p> :
      <MenuList menu={menu} restaurantId={id} />
      }
    </div>
  );
}
