import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import MenuItemForm from './MenuItemForm';
import { useRestaurant } from '../../context/RestaurantContext';

export default function MenuManager({ menu, setMenu,restaurantId }) {
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const {addMenu,updateMenu,removeMenu} = useRestaurant()

  useEffect(()=>{

  },[menu])
  const handleSave = (item) => {
    if (editingItem) {
      console.log("update menu",item)
      updateMenu(item.id,item)
    } else {
      addMenu(restaurantId, item)
    }
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      removeMenu(id)
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Menu Items</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>

      {(isAdding || editingItem) && (
        <MenuItemForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setEditingItem(null);
            setIsAdding(false);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {menu.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-1 text-gray-400 hover:text-orange-600"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
