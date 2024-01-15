import { axiosInstance } from "./axiosClient";

export const GiftCardSubCategory = async (
  selectedId: any,
  currencyId: any,
  giftcardTypeId: any
) => {
  try {
    const res = await axiosInstance.get(
      `giftcards/categories/${selectedId}/currencies/${currencyId}/types/${giftcardTypeId}/sub`
    );
    return res.data?.results || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
