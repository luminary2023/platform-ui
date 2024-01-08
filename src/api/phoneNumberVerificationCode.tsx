import { axiosInstance } from "./axiosClient";

interface Props {
  phoneNumber: string;
}

export const numberVerificationCode = async ({ phoneNumber }: Props) => {
  try {
    const res = await axiosInstance.post("/auth/send-code/phone-number", {
      phoneNumber,
    });
    return res.data || {};
  } catch (error: any) {
    return error?.response?.data;
  }
};
