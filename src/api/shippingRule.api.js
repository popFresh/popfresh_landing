import api from "./axios";

export const getShippingRule = async () => {

  const { data } = await api.get(
    "/public/shipping-rule"
  );

  return data.data;

};