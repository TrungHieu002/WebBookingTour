import { axiosClient } from "./config/axios-client";

export const UploadImage = async (file: File) => {
  const formDataFile = new FormData();
  formDataFile.append("file", file);
  try {
    const response = await axiosClient.post(
      `${import.meta.env.VITE_BACKEND}/api/v1/upload/cloudinary`,
      formDataFile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response.data) {
      throw new Error("Upload image Failed");
    }
    return response.data;
  } catch (error) {
    console.warn("Upload image Failed", error);
    return null;
  }
};
