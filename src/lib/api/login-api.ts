import axios from "axios";

export const GetTokenUser = async (tokenGoogle: string) => {
  try {
    const formData = new FormData();
    formData.append("tokenGoogle", tokenGoogle);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/identity/token`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!response.data) {
      throw new Error("Token not found in response data");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (
          error.response.data.succeeded == false &&
          error.response.data.messages[0] == "USER_NOT_REGISTER"
        ) {
          return "USER_NOT_REGISTER";
        }
        if (
          error.response.data.succeeded == false &&
          error.response.data.messages[0] == "USER_WAITING"
        ) {
          return "USER_WAITING";
        }
      } else {
        console.error("Non-Axios error:", error);
        return null;
      }
    }
  }
};
interface InfoAccountType {
  name: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  gender: boolean;
  birthday: string;
  address: string;
  role: number;
}
export const SignUpAPI = async (formData: InfoAccountType) => {
  const formTourOrder = new FormData();
  console.log(formData);
  Object.entries(formData).forEach(([key, value]) => {
    formTourOrder.append(key, value);
  });
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/v1/user`,
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
