import axios from "axios";

export const forgotPasswordRequest = async (data: any) => {
  try{
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/password/forgot`, 
      data
    );
    return res.data;
  } catch(error: any) {
    return error?.response?.data 
  }
}

export const verifyPasswordCodeRequest = async (data: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/password/verify-code`,
      data
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const resetPasswordCodeRequest = async (data: any) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/password/reset`,
      data
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};