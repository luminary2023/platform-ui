import axios from "axios";
import { getCookie } from "cookies-next";

export const DeleteAccount = async (id: any) => {
  try {
    const res = await axios.delete(
      `https://luminary-3m9s.onrender.com/api/v1/banks/account/${id}`,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data?.results || [];
  } catch (error: any) {
    return error?.response?.data;
  }
};
