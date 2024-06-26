import { axiosClient } from "./config/axios-client";

export const GetAllBookingCustomer = async (
  current: number = 1,
  Keyword?: string,
  startDate?: string,
  endDate?: string
) => {
  try {
    let url = `${
      import.meta.env.VITE_BACKEND
    }/api/v1/order/customer?currentPage=${current}`;
    if (Keyword) {
      url += `&Keyword=${Keyword}`;
    }
    if (startDate) {
      url += `&startDate=${startDate}`;
    }
    if (endDate) {
      url += `&endDate=${endDate}`;
    }
    const response = await axiosClient.get(url);
    if (!response.data) {
      throw new Error("Booking not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get B failed: ", error);
    return null;
  }
};
export const GetBookingById = async (id: string) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND}/api/v1/order/${id}`;
    const response = await axiosClient.get(url);
    if (!response.data) {
      throw new Error("Booking not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Booking failed: ", error);
    return null;
  }
};
