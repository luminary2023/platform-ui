import { axiosInstance } from "./axiosClient";

interface Props {
  newPin: number;
  currentPin: number;
}

export const ChangeTransactionPin = async ({ newPin, currentPin }: Props) => {
  try {
    const res = await axiosInstance.put("/transaction/pin/change", {
      newPin,
      currentPin,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
