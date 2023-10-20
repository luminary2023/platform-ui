import { BankDetailsProps } from "@/services/interfaces";
import axios from "axios";
import { getCookie } from "cookies-next";

export const resolveAccount = async (data: {
  accountNumber: string;
  bankId: string;
}) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banks/account/resolve`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data?.results;
  } catch (error: any) {
    return error?.response?.data;
  }
};
