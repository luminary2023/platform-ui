import { axiosInstance } from "./axiosClient";

interface Props {
  pin: number;
}

export const createTransactionPin = async ({ pin }: Props) => {
  try {
    const res = await axiosInstance.post("/transaction/pin/set", { pin });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
