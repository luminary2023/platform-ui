import axios from "axios";
import { getCookie } from "cookies-next";

export const saveBankDetails = async (data: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banks/account`,
      data

      // { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
