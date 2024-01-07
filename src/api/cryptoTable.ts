import axios from "axios";
import { getCookie } from "cookies-next";

export const cryptoTable = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/crypto/transactions`,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data?.results.data || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
