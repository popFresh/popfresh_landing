import api from "./axios";

export const calculatePricing = async (payload) => {

  const { data } = await api.post(
    "/public/pricing/calculate",
    payload
  );

  return data.data;

};