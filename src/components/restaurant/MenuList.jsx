import React from 'react';
import MenuItem from './MenuItem';

export default function MenuList({ menu, restaurantId }) {
  const categories = [...new Set(menu.map(item => item.category))];

  return (
    <div className="mt-8">
      {categories.map(category => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menu
              .filter(item => item.category === category)
              .map(item => (
                <MenuItem 
                  key={item.id} 
                  item={item}
                  restaurantId={restaurantId}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}