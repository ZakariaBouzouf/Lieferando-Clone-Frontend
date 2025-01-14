import { apiClient } from "./ApiClient"

export function loginApi(email,password){
  return apiClient.post("/auth/login",{email,password})
}

export function signUpApi(email,password,name,role,address){
  return apiClient.post("/auth/signup",{email,password,name,role,address})
}

export function logoutApi(){
  return apiClient.get("/auth/logout")
}

export function sessionApi(){
  return apiClient.get("/auth/session")
}
