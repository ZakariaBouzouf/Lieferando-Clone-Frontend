import { apiClient } from "./ApiClient";

export function retrieveAllRestaurants() {
  return apiClient.get("/restaurants");
}

export function retrieveARestaurant(id){
  return apiClient.get(`/restaurants/${id}`)
}
