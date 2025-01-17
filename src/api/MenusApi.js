import { apiClient } from "./ApiClient";

export function retrieveAllMenus(id){
  return apiClient.get(`/menu/${id}`)
}
export function prefetchMenuApi(id){
  return apiClient.get(`/menu/${id}`)
}

export function addMenuApi(restaurantId,{name,description,price,category,image,available}){
  return apiClient.post(`/menu/${restaurantId}`,{name,description,price,category,image,available})
  }

export function updateMenuApi(id,{name,description,price,category,image,available}){
  return apiClient.put(`/menu/${id}`,{name,description,price,category,image,available})
  }

export function removeMenuApi(id){
  return apiClient.delete(`/menu/${id}`)
  }
