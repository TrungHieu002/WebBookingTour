import { UserData } from "@/pages/Profile-page";
import { axiosClient } from "./config/axios-client";
// import axios from "axios";
export const GetProfile = async () => {
  try {
    const response = await axiosClient.get(
      `https://webbookingtourapi.azurewebsites.net/api/v1/user/profile`
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
export const EditProfile = async (formData: UserData) => {
  const formDataProfile = new FormData();
  console.log(formData);
  Object.entries(formData).forEach(([key, value]) => {
    formDataProfile.append(key, value);
  });
  console.log("api edit", formDataProfile);
  try {
    const response = await axiosClient.put(
      `https://webbookingtourapi.azurewebsites.net/api/v1/user/profile`,
      formDataProfile,
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
