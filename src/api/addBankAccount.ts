import { axiosInstance } from "./axiosClient";

interface Props {
  bankId: string;
  accountNumber: string;
}

export const addBankAccount = async ({ bankId, accountNumber }: Props) => {
  try {
    const res = await axiosInstance.post("/banks/account", {
      bankId,
      accountNumber,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
