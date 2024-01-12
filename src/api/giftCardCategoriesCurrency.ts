import { axiosInstance } from "./axiosClient";

export const GiftCardCurrency = async () => {
  try {
    const res = await axiosInstance.get(
      "/giftcards/categories/:giftcardCategoryId/currencies"
    );
    return res.data?.results?.currencies || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
