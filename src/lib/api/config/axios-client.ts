import axios from "axios";
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    "Content-type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage hoặc từ bất kỳ nơi nào bạn lưu trữ token
    const userStorage = localStorage.getItem("userStorage");
    if (userStorage) {
      const parsedUser = JSON.parse(userStorage);
      const token = parsedUser?.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
