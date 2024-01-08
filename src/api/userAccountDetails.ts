import { axiosInstance } from "./axiosClient";

export const userAccountDetails = async () => {
  try {
    const res = await axiosInstance.get("/banks/account/");
    return res.data?.results || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
