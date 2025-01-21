import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuList from '../../components/restaurant/MenuList';
import RestaurantHeader from '../../components/restaurant/RestaurantHeader';
import { useRestaurant } from '../../context/RestaurantContext';

export default function RestaurantPage() {
  const params = useParams();
  const id = Number(params.id);
  const [menu, setMenu] = useState(null);
  const { restaurants, menus, retrieveMenus, menu: fetchedMenu } = useRestaurant()
  const restaurant = restaurants.filter(i => i.id == id)[0]

  useEffect(() => {
    if (menus.length !== 0) {
      const foundedMenu = menus.filter(item => item.restaurantId === Number(id))
      if (foundedMenu.length === 0) {
        retrieveMenus(id)
        setMenu(fetchedMenu[0])
      } else {
        setMenu(foundedMenu[0].items)
      }
    }
  }, [menus, id])

  if (!restaurant) {
    return <div>Loading...</div>;
  }
  if (!menu) {
    return <div>Loading...</div>;
  }

  // console.log("menu", menu)
  console.log("fetchedMenu", fetchedMenu)
  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
      <RestaurantHeader restaurant={restaurant} />
      <MenuList menu={menu} restaurantId={id} />
    </div>
  );
}
