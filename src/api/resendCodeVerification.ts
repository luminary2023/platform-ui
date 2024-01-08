import { axiosInstance } from "./axiosClient";

interface Props {
  email: string;
}
export const resendVerificationCodeRequest = async ({ email }: Props) => {
  try {
    const res = await axiosInstance.post("/account/resend-code", { email });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
