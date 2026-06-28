import api from "./axios";

export const createOrder = async (payload) => {

  const { data } = await api.post(
    "/checkout/create-order",
    payload
  );

  return data.data;

};

export const verifyPayment = async (payload) => {

  const { data } = await api.post(
    "/checkout/verify-payment",
    payload
  );

  return data.data;

};