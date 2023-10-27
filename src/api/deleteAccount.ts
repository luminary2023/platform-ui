import axios from "axios";
import { getCookie } from "cookies-next";

export const DeleteAccount = async (id: any) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/banks/account/${id}`,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data?.results || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
