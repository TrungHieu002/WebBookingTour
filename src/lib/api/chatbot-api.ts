import axios from "axios";

export const GetAI = async (message: string) => {
  try {
    const url = `https://webbookingtourapi.azurewebsites.net/api/ai?message=${message}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("AI not found in response data");
    }
    return response.data;
  } catch (error) {
    console.warn("Get AI failed: ", error);
    return null;
  }
};
