"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ForgotPasswordIcon from "../../assets/images/forgot.svg";
import VerifiedIcon from "../../assets/images/emailVerifiedIcon.svg";
import Image from "next/image";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import styles from "../forgotPassword/forgotPassword.module.css";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import BackStyles from "../signin/Signin.module.css";
import EmailVerified from "@/components/CreateAccount/emailVerified";
import { resetPassword } from "@/services/schemaVarification";
import Toast from "@/components/Toast";
import { resetPasswordCodeRequest } from "@/api/password";
import Loading from "@/components/Loading";
import { ErrorProps } from "@/services/interfaces";


interface ResetPasswordProps {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const router = useRouter();
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<any>("");
  const [resetPasswordCode, setResetPasswordCode] = useState<any>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errs, setErrs] = useState<ErrorProps>({
    status: "",
    message: "",
    statusCode: 0,
  });


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordProps>({
    resolver: zodResolver(resetPassword),
  });


  const handleReset = async (data: any) => {
    if (data.password !== data.confirmPassword){
      setError(true)
      setErrorMsg("Password don't match")
    } else {
      setError(false)
      setLoading(true);
      setErrorMsg('')
      const res = await resetPasswordCodeRequest({
        email,
        resetPasswordCode,
        newPassword: data?.confirmPassword
      });
      setLoading(false);
      if (res?.statusCode === 200 && res?.status === "Success") {
        setError(false);
        setResetSuccess(true)
      }
      setErrs(res);
      setError(true);
    }
  };

  useEffect(() => {
    const userEmail = sessionStorage.getItem("email");
    const userOtp = sessionStorage.getItem("forgotpasswordOtp");
    setResetPasswordCode(userOtp);
    setEmail(userEmail);
  }, []);

  return (
    <>
      {!resetSuccess ? (
        <div className={styles.forgotPasswordContainer}>
          <div className={styles.forgotPasswordContent}>
          {error && <Toast text={errorMsg || errs?.message} marginBottom={40} />}
            <div style={{ marginBottom: 24 }}>
              <Image src={ForgotPasswordIcon} alt="Forgot Password Icon" />
            </div>
            <div style={{ width: 340, textAlign: "center" }}>
              <PageTitle
                title={"Set new password"}
                subtitle={
                  "Your new password must be different to previously used passwords."
                }
              />
            </div>
            <form onSubmit={handleSubmit(handleReset)}>
              <div
                className={styles.forgotPasswordInput}
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="Enter your Password "
                  label="Password"
                  type="password"
                  register={{ ...register("password") }}
                  borderColor={errors?.password ? "#DF1111" : ""}
                />
              </div>
              <div className={styles.forgotPasswordInput}>
                <Input
                  placeholder="Enter your Password "
                  label="Confirm password"
                  type="password"
                  register={{ ...register("confirmPassword") }}
                  borderColor={errors?.confirmPassword ? "#DF1111" : ""}
                />
              </div>
              <Button
                color="primary"
                variant="contained"
                fullWidth={false}
                type="submit"
                sx={{
                  textTransform: "capitalize",
                  width: "340px",
                }}
              >
                {loading ? <Loading /> : "Reset password"}
              </Button>
            </form>
            <div
              className={BackStyles.forgotPasswordText}
              style={{ alignItems: "center", marginTop: 34 }}
              onClick={() => router.push("/signin")}
            >
              <KeyboardBackspaceSharpIcon fontSize="medium" color="disabled" />
              <p style={{ marginLeft: 10 }}>Back to log in</p>
            </div>
          </div>
        </div>
      ) : (
        <EmailVerified
          title={"Password reset"}
          subTitle={
            "Your password has been successfully reset. Click below to log in magically."
          }
          backToText={"Back to log in"}
          actionType={"reset password"}
          routerPath={"/signin"}
          btnOnClick={() => {}}
          icon={VerifiedIcon}
        />
      )}
    </>
  );
};

export default ResetPassword;
