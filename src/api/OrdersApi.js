import { apiClient } from "./ApiClient";

export function creatingOrder(restaurant_id,customer_id,items,status,restaurant_name,total){
  return apiClient.post("/orders",{restaurant_id,customer_id,items,status,restaurant_name,total})
}

export function retrieveCustomerOrder(customer_id){
  console.log(customer_id)
  return apiClient.get(`/orders/${customer_id}/customer`)
}
export function retrieveRestaurantOrder(restaurant_id){
  return apiClient.get(`/orders/${restaurant_id}/restaurant`)
}

export function updateAnOrderApi(id,status){
  return apiClient.put(`/orders/${id}`,{id,status})
}
