import { axiosInstance } from "./axiosClient";

export const CryptoAsset = async () => {
  try {
    const res = await axiosInstance.get("/assets");
    return res.data?.results || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
