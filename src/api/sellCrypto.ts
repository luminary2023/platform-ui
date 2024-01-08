import axios from "axios";
import { getCookie } from "cookies-next";

export const sellCryptoApi = async (data: {
  assetId: string;
  networkId: string;
  assetAmount: string;
  proof: string;
  transactionPin: string;
  comment: string;
}) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/crypto/sell`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    return res.data || {};
  } catch (error: any) {
    return error?.response?.data;
  }
};
