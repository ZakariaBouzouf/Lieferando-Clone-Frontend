import { apiClient } from "./ApiClient";

export function retieveAllMenus(id){
  return apiClient.get(`/menu/${id}`)
}
