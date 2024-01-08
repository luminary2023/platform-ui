import { axiosInstance } from "./axiosClient";

interface Props {
  email: string;
  password: string;
}
export const loginRequest = async ({ email, password }: Props) => {
  try {
    const res = await axiosInstance.post("/login", {
      email,
      password,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
