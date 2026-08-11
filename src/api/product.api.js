import api from "./axios";

// ==============================================
// PRODUCTS
// ==============================================

export const getProducts = async () => {
  const { data } = await api.get("/products");

  return data.data.products;
};


export const getProductBySlug = async (slug) => {
  const { data } = await api.get(
    `/products/slug/${slug}`
  );

  return data.data;
};


export const getProductById = async (id) => {
  const { data } = await api.get(
    `/products/${id}`
  );

  return data.data;
};


// ==============================================
// COMBO CONFIG
// ==============================================

export const getComboConfigs = async () => {
  const { data } = await api.get(
    "/combo-config"
  );

  return data.data;
};


// import api from "./axios";

// export const getProducts = async () => {

//   const { data } = await api.get("/products");

//   return data.data.products;

// };

// export const getProductBySlug = async (slug) => {

//   const { data } = await api.get(`/products/slug/${slug}`);

//   return data.data;

// };

// export const getProductById = async (id) => {

//   const { data } = await api.get(`/products/${id}`);

//   return data.data;

// };