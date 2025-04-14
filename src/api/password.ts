import axios from "axios";

export const forgotPasswordRequest = async (data: any) => {
  try{
    const res = await axios.post(
      `https://luminary-3m9s.onrender.com/api/v1/password/forgot`, 
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
      `https://luminary-3m9s.onrender.com/api/v1/password/verify-code`,
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
      `https://luminary-3m9s.onrender.com/api/v1/password/reset`,
      data
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};