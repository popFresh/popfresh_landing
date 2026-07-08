import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "http://localhost:5001/api/v1/public",

  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================================
// RESPONSE INTERCEPTOR
// ==============================================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default api;


// import axios from "axios";

// const api = axios.create({

// //   baseURL: import.meta.env.VITE_API_URL,
//     baseURL: "http://localhost:5001/api/v1",

//   headers: {
//     "Content-Type": "application/json",
//   },

//   withCredentials: true,

// });

// // ==============================================
// // REQUEST INTERCEPTOR
// // ==============================================

// api.interceptors.request.use(

//   (config) => {

//     return config;

//   },

//   (error) => Promise.reject(error)

// );

// // ==============================================
// // RESPONSE INTERCEPTOR
// // ==============================================

// api.interceptors.response.use(

//   (response) => response,

//   (error) => {

//     if (error.response) {

//       console.error("API Error:", error.response.data);

//     } else {

//       console.error(error.message);

//     }

//     return Promise.reject(error);

//   }

// );

// export default api;