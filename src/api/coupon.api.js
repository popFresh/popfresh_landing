import api from "./axios";

export const applyCoupon = async (payload) => {
  const { data } = await api.post(
    "/coupons/apply",
    payload
  );

  return data.data;
};