import { apiClient } from "./ApiClient";

export function retrieveAllRestaurants() {
  return apiClient.get("/restaurants");
}

export function retrieveARestaurant(id){
  return apiClient.get(`/restaurants/${id}`)
}

export function removeRestaurantApi(id){
  return apiClient.remove(`/restaurants/${id}`)
}

export function updateRestaurantApi(id,{name,description,image,isOpen}){
  return apiClient.put(`/restaurants/${id}`,{name,description,image,isOpen})
}
