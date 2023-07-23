import axios from "axios";
import { cookies } from 'next/headers'
export const loginRequest = async (data: any) => {
  try{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, data);
    return res.data;
  } catch(error: any) {
    return error?.response?.data 
  }
}
