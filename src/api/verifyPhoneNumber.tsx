import axios from "axios";
import { getCookie } from "cookies-next";

export const PhoneNumberVerification = async (data: {
  phoneNumber: string | null;
  verificationCode: string;
}) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify/phone-number`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data || {} || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
