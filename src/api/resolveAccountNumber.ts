import { axiosInstance } from "./axiosClient";

interface Props {
  accountNumber: string;
  bankId: string;
}

export const resolveAccount = async ({ accountNumber, bankId }: Props) => {
  try {
    const res = await axiosInstance.post("/banks/account/resolve", {
      accountNumber,
      bankId,
    });
    return res.data?.results;
  } catch (error: any) {
    return error?.response?.data;
  }
};
