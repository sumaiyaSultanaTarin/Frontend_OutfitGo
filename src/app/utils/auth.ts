
import api from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (email: string, password : string, confirmPassword: string) => {
    const response = await api.post("/auth/register", { email, password, confirmPassword});
    return response.data;
};
  

export const isAuthenticated = (): boolean => {
  return typeof window !== "undefined" && !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth/login";
};
