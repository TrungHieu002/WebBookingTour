import axios from "axios";
import { axiosClient } from "./config/axios-client";
interface schedulesItem {
  startTime: string;
  Date: number;
  Description: string;
}
interface filePathItem {
  FilePath: string;
}
export interface TourData {
  name: string;
  description: string;
  price: string;
  location: string;
  startDate: string;
  endDate: string;
  lastRegisterDate: string;
  status: number;
  vehicle: string;
  hotel: string;
  schedules: schedulesItem[];
  images: filePathItem[];
}
interface TourOder {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  participants: number;
  totalPrice: number;
  tourId: string;
  paymentMethod: string;
  amount: number;
  note: string;
}
export interface TourUpdateData {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  startDate: string;
  endDate: string;
  lastRegisterDate: string;
  vehicle: string;
  hotel: string;
  schedules: schedulesItem[];
  images: filePathItem[];
}
export const AddTour = async (formData: TourData) => {
  const formDataTour = new FormData();
  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      const value = formData[key as keyof TourData];

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (key === "schedules") {
            const scheduleItem = item as schedulesItem;
            formDataTour.append(
              `${key}[${index}][startTime]`,
              scheduleItem.startTime
            );
            formDataTour.append(
              `${key}[${index}][Date]`,
              scheduleItem.Date.toString()
            );
            formDataTour.append(
              `${key}[${index}][Description]`,
              scheduleItem.Description
            );
          } else if (key === "images") {
            const imageItem = item as filePathItem;
            formDataTour.append(
              `${key}[${index}][FilePath]`,
              imageItem.FilePath
            );
          }
        });
      } else {
        formDataTour.append(key, value as string);
      }
    }
  }
  try {
    const response = await axiosClient.post(
      `https://webbookingtourapi.azurewebsites.net/api/v1/tour`,
      formDataTour,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response.data) {
      throw new Error("Add Tour Failed");
    }
    return response.data;
  } catch (error) {
    console.warn("Add Tour Failed: ", error);
    return null;
  }
};
export const GetAllTourByTourOwner = async (
  current: number = 1,
  Keyword?: string,
  startDate?: string,
  endDate?: string
) => {
  try {
    let url = `https://webbookingtourapi.azurewebsites.net/api/v1/tour/tour-owner/?currentPage=${current}`;
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
      throw new Error("Tour not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Tour failed: ", error);
    return null;
  }
};

export const GetTourHome = async (OrderBy: boolean = false) => {
  try {
    let url = `https://webbookingtourapi.azurewebsites.net/api/v1/tour?pageSize=4&isExport=false`;
    if (OrderBy) {
      url += `&OrderBy=Price`;
    }
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Tour not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Tour failed: ", error);
    return null;
  }
};
export const GetTourById = async (id: string) => {
  try {
    const url = `https://webbookingtourapi.azurewebsites.net/api/v1/tour/${id}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Tour not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Tour failed: ", error);
    return null;
  }
};
export const AddTourOder = async (formData: TourOder) => {
  const formTourOrder = new FormData();
  console.log(formData);
  Object.entries(formData).forEach(([key, value]) => {
    formTourOrder.append(key, value);
  });
  try {
    const response = await axiosClient.post(
      `https://webbookingtourapi.azurewebsites.net/api/v1/order`,
      formTourOrder,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response.data) {
      throw new Error("Edit Profile Failed");
    }
    return response.data;
  } catch (error) {
    console.warn("Edit Profile Failed: ", error);
    return null;
  }
};

export const GetAllByAll = async (
  current: number = 1,
  Keyword?: string,
  startDate?: string,
  endDate?: string
) => {
  try {
    let url = `https://webbookingtourapi.azurewebsites.net/api/v1/tour/?currentPage=${current}`;
    if (Keyword) {
      url += `&Keyword=${Keyword}`;
    }
    if (startDate) {
      url += `&startDate=${startDate}`;
    }
    if (endDate) {
      url += `&endDate=${endDate}`;
    }
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Tour not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Tour failed: ", error);
    return null;
  }
};

export const EditTour = async (formData: TourUpdateData) => {
  const formDataTour = new FormData();
  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      const value = formData[key as keyof TourUpdateData];

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (key === "schedules") {
            const scheduleItem = item as schedulesItem;
            formDataTour.append(
              `${key}[${index}][startTime]`,
              scheduleItem.startTime
            );
            formDataTour.append(
              `${key}[${index}][Date]`,
              scheduleItem.Date.toString()
            );
            formDataTour.append(
              `${key}[${index}][Description]`,
              scheduleItem.Description
            );
          } else if (key === "images") {
            const imageItem = item as filePathItem;
            formDataTour.append(
              `${key}[${index}][FilePath]`,
              imageItem.FilePath
            );
          }
        });
      } else {
        formDataTour.append(key, value as string);
      }
    }
  }
  try {
    const response = await axiosClient.put(
      `https://webbookingtourapi.azurewebsites.net/api/v1/tour`,
      formDataTour,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response.data) {
      throw new Error("Edit Tour Failed");
    }
    return response.data;
  } catch (error) {
    console.warn("Edit Tour Failed: ", error);
    return null;
  }
};
export const GetListOrderByTour = async (id: string) => {
  try {
    const url = `https://webbookingtourapi.azurewebsites.net/api/v1/order/tour?tourId=${id}`;
    const response = await axiosClient.get(url);
    if (!response.data) {
      throw new Error("List Order not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get List Order failed: ", error);
    return null;
  }
};
