import { axiosInstance } from "./axiosClient";

interface Props {
  newPassword: string;
  currentPassword: string;
}
export const ChangePassword = async ({
  newPassword,
  currentPassword,
}: Props) => {
  try {
    const res = await axiosInstance.put("/password/change", {
      newPassword,
      currentPassword,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
