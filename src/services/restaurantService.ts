import api from "./api/axios";

export const getRestaurants = async () => {
  const res = await api.get("/api/resto?page=1&limit=20");
  return res.data;
};


export const getRecommendedRestaurants = () => {
  return api.get("/api/resto/recommended"); 
};
