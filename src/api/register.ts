import { axiosInstance } from "./axiosClient";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const RegisterRequest = async ({
  firstName,
  lastName,
  email,
  password,
}: Props) => {
  try {
    const res = await axiosInstance.post("/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
