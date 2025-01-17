import { createContext, useContext, useEffect,useState } from "react";
import { retrieveAllRestaurants, updateRestaurantApi } from "../api/RestaurantApi";
import { addMenuApi, prefetchMenuApi,removeMenuApi,retrieveAllMenus, updateMenuApi } from "../api/MenusApi";
import { updateAnOrderApi } from "../api/OrdersApi";

const RestaurantContext = createContext()

export function useRestaurant() {
  const context = useContext(RestaurantContext)
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProv')
  }
  return context;
}

export function RestaurantProvider({ children }) {
  const [restaurants, setRestaurants] = useState([])
  const [menus,setMenus]=useState([])
  const [fetchedMenus,setFetchedMenus]= useState([])

  useEffect(() => {
    async function retrieveRestaurants() {
      try {
        const response = await retrieveAllRestaurants();
        setRestaurants(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    retrieveRestaurants()
  }, [])

  async function updateRestaurant(id,{name,description,image,isOpen}){
    try {
      const response = await updateRestaurantApi(id,{name,description,image,isOpen})
      setRestaurants(restaurants.map(prevRestau => prevRestau.id === id ? {id,name,description,image,isOpen} : prevRestau))
    } catch (error) {
      throw new Error("Something went wrong.")
    }
  }

  async function retrieveMenus(id){
    try {
      const response = await retrieveAllMenus(id)
      setMenus(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function addMenu(id,{name,description,price,category,image,available}){
    try {
      const response = await addMenuApi(id,{name,description,price,category,image,available})
      console.log(response)
      setMenus(prevMenus=>[...prevMenus,response.data])
    } catch (error) {
      console.log(error)
    }
  }
  async function updateMenu(id,{name,description,price,category,image,available}){
    try {
      const response = await updateMenuApi(id,{name,description,price,category,image,available})
      console.log(response)
      setMenus(menus.map(i => i.id === id ? {id,name,description,price,category,image,available} : i));
    } catch (error) {
      console.log(error)
    }
  }
  async function removeMenu(id){
    try {
      await removeMenuApi(id)
      setMenus(menus.filter(item => item.id !== id));
    } catch (error) {
      console.log(error)
    }
  }
  async function prefetchMenu(id){
    if(fetchedMenus.includes(id)) {return}

    try {
      const response = await prefetchMenuApi(id)
      console.log(response.data)
      setMenus([...menus,{restaurantId:id,items: response.data }])
      setFetchedMenus([...fetchedMenus,id])
    } catch (error) {
    }
  }

  return (
    <RestaurantContext.Provider value={{
      restaurants,
      prefetchMenu,
      retrieveMenus,
      updateRestaurant,
      menus, 
      setMenus,
      addMenu,
      updateMenu,
      removeMenu
    }}>
      {children}
    </RestaurantContext.Provider>
  )
}
