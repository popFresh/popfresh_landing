import api from "./axios";

export const applyCoupon = async (payload) => {
  const { data } = await api.post(
    "/public/coupons/apply",
    payload
  );

  return data.data;
};