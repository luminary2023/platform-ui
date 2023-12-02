import axios from "axios";
import { getCookie } from "cookies-next";

export const numberVerificationCode = async (data: { phoneNumber: string }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-code/phone-number`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data || {};
  } catch (error: any) {
    return error?.response?.data;
  }
};
