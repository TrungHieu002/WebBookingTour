import { axiosClient } from "./config/axios-client";

export const GetStatisticOwner = async () => {
  try {
    const response = await axiosClient.get(
      `https://webbookingtourapi.azurewebsites.net/api/v1/statistic/tour-owner`
    );
    if (!response.data) {
      throw new Error("Profile not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Profile failed: ", error);
    return null;
  }
};

export const GetAllCustomer = async (current: number = 1, Keyword?: string) => {
  try {
    let url = `https://webbookingtourapi.azurewebsites.net/api/v1/customer?currentPage=${current}`;
    if (Keyword) {
      url += `&Keyword=${Keyword}`;
    }
    const response = await axiosClient.get(url);
    if (!response.data) {
      throw new Error("Tour not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Tour failed: ", error);
    return null;
  }
};
export const GetCustomerById = async (id: string) => {
  try {
    const url = `https://webbookingtourapi.azurewebsites.net/api/v1/customer/${id}`;
    const response = await axiosClient.get(url);
    if (!response.data) {
      throw new Error("Customer not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Customer failed: ", error);
    return null;
  }
};
export const GetStatisticCustomer = async () => {
  try {
    const response = await axiosClient.get(
      `https://webbookingtourapi.azurewebsites.net/api/v1/statistic/admin/customer`
    );
    if (!response.data) {
      throw new Error("Statistic Customer not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Statistic Customer failed: ", error);
    return null;
  }
};

export const GetAllTourOwner = async (
  current: number = 1,
  Keyword?: string
) => {
  try {
    let url = `https://webbookingtourapi.azurewebsites.net/api/v1/tour-owner?currentPage=${current}`;
    if (Keyword) {
      url += `&Keyword=${Keyword}`;
    }
    const response = await axiosClient.get(url);
    if (!response.data) {
      throw new Error("Tour not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Tour failed: ", error);
    return null;
  }
};
export const ActiveTourOwner = async (userId: string) => {
  try {
    const url = `https://webbookingtourapi.azurewebsites.net/api/v1/user/active?id=${userId}`;
    const response = await axiosClient.put(url);
    if (!response.data) {
      throw new Error("Tour not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Tour failed: ", error);
    return null;
  }
};
export const GetTourOwnerById = async (id: string) => {
  try {
    const url = `https://webbookingtourapi.azurewebsites.net/api/v1/tour-owner/${id}`;
    const response = await axiosClient.get(url);
    if (!response.data) {
      throw new Error("Customer not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Customer failed: ", error);
    return null;
  }
};
export const GetStatisticTourOwner = async () => {
  try {
    const response = await axiosClient.get(
      `https://webbookingtourapi.azurewebsites.net/api/v1/statistic/admin/tour-owner`
    );
    if (!response.data) {
      throw new Error("Statistic Customer not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Statistic Customer failed: ", error);
    return null;
  }
};
