import { axiosInstance } from "./axiosClient";

export const giftcardTable = async () => {
  try {
    const res = await axiosInstance.get("/giftcards/transactions");
    return res.data?.results?.data || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
