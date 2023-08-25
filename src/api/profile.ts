import axios from "axios";
import { getCookie } from "cookies-next";

export const profileRequest = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
