import { apiClient } from "./ApiClient";

export function retrieveAllMenus(id){
  return apiClient.get(`/menu/${id}`)
}
export function prefetchMenuApi(id){
  return apiClient.get(`/menu/${id}`)
}
