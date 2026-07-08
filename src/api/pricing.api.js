import api from "./axios";

export const calculatePricing = async (payload) => {

  const { data } = await api.post(
    "/pricing/calculate",
    payload
  );

  return data.data;

};