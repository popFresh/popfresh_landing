import api from "./axios.js";

// ======================================
// Search Orders
// ======================================

export const searchFeedbackOrders = async (query) => {
  const response = await api.get(
    "/feedback/orders",
    {
      params: {
        query,
      },
    }
  );

  return response.data;
};

// ======================================
// Submit Feedback
// ======================================

export const submitFeedback = async (data) => {
  const response = await api.post(
    "/feedback",
    data
  );

  return response.data;
};