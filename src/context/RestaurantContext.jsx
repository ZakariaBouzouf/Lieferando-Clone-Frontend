import { createContext, useContext, useEffect,useState } from "react";
import { retrieveAllRestaurants } from "../api/RestaurantApi";
import { prefetchMenuApi,retrieveAllMenus } from "../api/MenusApi";

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
  const [menu,setMenu]=useState([])
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

  async function retrieveMenus(id){
    try {
      const response = await retrieveAllMenus(id)
      console.log(response)
      setMenus(response.data)
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
      menu,
      menus
    }}>
      {children}
    </RestaurantContext.Provider>
  )
}
