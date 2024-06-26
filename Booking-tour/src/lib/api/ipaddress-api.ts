import axios from "axios";
export const getIpAddress = async () => {
  try {
    const response = await axios.get("https://geolocation-db.com/json/");
    if (!response.data.IPv4) {
      throw new Error("IP address not found in response data");
    }
    return response.data.IPv4;
  } catch (error) {
    console.warn("Get IP failed: ", error);
    return null;
  }
};
