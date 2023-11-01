import { BankDetailsProps } from "@/services/interfaces";
import axios from "axios";
import { getCookie } from "cookies-next";

export const ChangePassword = async (data: {
  newPassword: string;
  currentPassword: string;
}) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/password/change`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
