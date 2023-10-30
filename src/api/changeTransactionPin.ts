import { BankDetailsProps } from "@/services/interfaces";
import axios from "axios";
import { getCookie } from "cookies-next";

export const ChangeTransactionPin = async (data: {
  newPin: number;
  currentPin: number;
}) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction/pin/change`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
