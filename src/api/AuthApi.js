import { apiClient } from "./ApiClient"

export function loginApi(email,password){
  return apiClient.post("/auth/login",{email,password})
}

export function signUpApi(registrationForm){
  return apiClient.post("/auth/signup",registrationForm)
}

export function logoutApi(){
  return apiClient.get("/auth/logout")
}

export function sessionApi(){
  return apiClient.get("/auth/session")
}
export function balanceCheck(total){
  console.log(total)
  return apiClient.post("/auth/balance_check",{"total":total})
}
