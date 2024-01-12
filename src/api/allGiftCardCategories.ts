import { axiosInstance } from "./axiosClient";

export const AllGiftCardCategories = async () => {
  try {
    const res = await axiosInstance.get(
      "/giftcards/categories?page=1&perPage=20&search=amazon"
    );
    return res.data?.results?.data || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
