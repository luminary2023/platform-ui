import axios from "axios";
import { getCookie } from "cookies-next";

export const PhoneNumberVerification = async (data: {
  phoneNumber: string | null;
  verificationCode: string;
}) => {
  try {
    const res = await axios.post(
      `https://luminary-3m9s.onrender.com/api/v1/auth/verify/phone-number`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data || {} || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};

