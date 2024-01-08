import { axiosInstance } from "./axiosClient";

export const bankRequest = async () => {
  try {
    const res = await axiosInstance.get("/banks");
    return res.data?.results || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
