import { axiosInstance } from "./axiosClient";

interface Props {
  amount: string;
  quantity: string;
  comment: string;
  attachments: [];
  giftcardSubCategoryId: string;
}
export const sellGiftcard = async ({
  amount,
  quantity,
  comment,
  attachments,
  giftcardSubCategoryId,
}: Props) => {
  try {
    const res = await axiosInstance.post("/giftcards/sell", {
      amount,
      quantity,
      comment,
      attachments,
      giftcardSubCategoryId,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
