import axios from "axios";
import { getCookie } from "cookies-next";

export const bankRequest = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banks`
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
