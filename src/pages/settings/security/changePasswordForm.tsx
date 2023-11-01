"use client";
import { useState } from "react";
import ProfileSettings from "../index";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordProps } from "@/services/interfaces";
import { changePasswordValidation } from "@/services/schemaVarification";

import Toast from "@/components/Toast";
import { ChangePassword } from "@/api/changePassword";
import Loading from "@/components/Loading";

const ChangePasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [password, setPassword] = useState<any>({});
  console.log(password);

  const {
    handleSubmit,
    register,
    reset,

    formState: { errors },
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(changePasswordValidation),
  });

  const handleChangePassword = async (data: {
    newPassword: string;
    currentPassword: string;
  }) => {
    try {
      setLoading(true);
      const response = await ChangePassword(data);
      setPassword(response);
      setLoading(false);
      setError(true);
      console.log(data);
    } catch (error: any) {
      error?.response?.data;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        {error && (
          <Toast
            text={password?.message}
            success={password?.message === "Changed password successfully."}
            marginBottom={40}
            color={
              password.message === "Changed password successfully."
                ? "green"
                : "DF1111"
            }
            border={
              password.message === "Changed password successfully."
                ? "1px solid green"
                : "1px solid #DF1111"
            }
          />
        )}
        <Input
          type={"text"}
          label="Enter Old Password"
          bgColor={"#F2F2F2"}
          marginBottom={"8px"}
          labelColor={"#081630"}
          labelSize={"16px"}
          register={{ ...register("currentPassword") }}
          borderColor={errors.currentPassword?.message ? "#DF1111" : ""}
        />

        <Input
          type={"text"}
          label="Enter New Password"
          bgColor={"#F2F2F2"}
          marginBottom={"8px"}
          labelColor={"#081630"}
          labelSize={"16px"}
          register={{ ...register("newPassword") }}
          borderColor={errors.newPassword?.message ? "#DF1111" : ""}
        />

        <Input
          type={"text"}
          label="Confirm New Password"
          bgColor={"#F2F2F2"}
          marginBottom={"8px"}
          labelColor={"#081630"}
          labelSize={"16px"}
          register={{ ...register("confirmPassword") }}
          borderColor={errors.confirmPassword?.message ? "#DF1111" : ""}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            textTransform: "capitalize",
            mt: "10px",
          }}
        >
          {loading ? <Loading /> : "Update"}
        </Button>
      </form>
    </>
  );
};

export default ChangePasswordForm;
