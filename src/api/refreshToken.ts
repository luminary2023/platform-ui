import { axiosInstance } from "./axiosClient";
import { getCookie } from "cookies-next";

interface Props {
  refreshToken: any;
}
export const refreshTokenApi = async ({ refreshToken }: Props) => {
  // const token = getCookie("token");
  try {
    const res = await axiosInstance.post("/refresh", {
      refreshToken,
    });
    console.log(res);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
