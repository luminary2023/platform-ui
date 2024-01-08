import { axiosInstance } from "./axiosClient";

export const cryptoTable = async () => {
  try {
    const res = await axiosInstance.get(" /crypto/transactions");
    return res.data?.results.data || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
