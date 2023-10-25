import axios from "axios";
import { getCookie } from "cookies-next";

export const DeleteAccount = async (userBankId: any) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banks/account/:userBankId`,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data?.results || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
