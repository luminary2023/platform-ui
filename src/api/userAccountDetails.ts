import axios from "axios";
import { getCookie } from "cookies-next";

export const userAccountDetails = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banks/account/`,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data?.results || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
