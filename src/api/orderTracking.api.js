import api from "./axios.js";

export const trackOrder = async (params) => {
  const response = await api.get(
    "/orders/track",
    {
      params,
    }
  );

  return response.data;
};