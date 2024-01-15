import { axiosInstance } from "./axiosClient";

export const GiftCardCurrency = async (id: any) => {
  try {
    const res = await axiosInstance.get(
      `/giftcards/categories/${id}/currencies`
    );
    return res.data?.results?.currencies || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
