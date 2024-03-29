import axios from "axios";
export const codeVerificationRequest = async (data: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/verify`,
      data
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
