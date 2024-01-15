import { axiosInstance } from "./axiosClient";

export const GiftCardType = async (selectedId: any, currencyId: any) => {
  try {
    const res = await axiosInstance.get(
      `giftcards/categories/${selectedId}/currencies/${currencyId}/types`
    );
    return res.data?.results?.types || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
