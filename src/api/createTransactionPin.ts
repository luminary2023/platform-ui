import { BankDetailsProps } from "@/services/interfaces";
import axios from "axios";
import { getCookie } from "cookies-next";

export const createTransactionPin = async (data: { pin: number }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction/pin/set`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
