import axios from "axios";

export const GetLocationHome = async () => {
  try {
    const url = `https://webbookingtourapi.azurewebsites.net/api/v1/location?pageSize=8&isExport=false`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Location not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Location failed: ", error);
    return null;
  }
};
export const GetLocationById = async (id: string) => {
  try {
    const url = `https://webbookingtourapi.azurewebsites.net/api/v1/location/${id}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Location not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get Location failed: ", error);
    return null;
  }
};
