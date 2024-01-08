import { axiosInstance } from "./axiosClient";

export const profileRequest = async () => {
  try {
    const res = await axiosInstance.get("/auth/profile");
    return res.data?.results || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
