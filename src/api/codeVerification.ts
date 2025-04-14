import axios from "axios";
export const codeVerificationRequest = async (data: any) => {
  try {
    const res = await axios.post(
      `https://luminary-3m9s.onrender.com/api/v1/account/verify`,
      data
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
