import api from "./axios";

export const login = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const register = async (
  name: string,
  email: string,
  phone: string,
  password: string,
) => {
  const res = await api.post("/register", { name, email, phone, password });
  return res.data;
};
