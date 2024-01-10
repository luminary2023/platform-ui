import { axiosInstance } from "./axiosClient";

interface Props {
  assetId: string;
  networkId: string;
  assetAmount: string;
  proof: string;
  transactionPin: string;
  comment: string;
}

export const sellCryptoApi = async ({
  assetId,
  networkId,
  assetAmount,
  proof,
  transactionPin,
  comment,
}: Props) => {
  try {
    const res = await axiosInstance.post("/crypto/sell", {
      assetId,
      networkId,
      assetAmount,
      proof,
      transactionPin,
      comment,
    });
    return res.data || {};
  } catch (error: any) {
    return error?.response?.data;
  }
};
