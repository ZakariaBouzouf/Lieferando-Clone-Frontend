import { apiClient } from "./ApiClient";

export function creatingOrder(orderDetails){
  return apiClient.post("/orders",orderDetails)
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
