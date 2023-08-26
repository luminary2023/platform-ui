"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "@/services/schemaVarification";
import { ErrorProps } from "@/services/interfaces";
import { forgotPasswordRequest } from "@/api/password";

import ForgotPasswordIcon from "../../assets/images/forgot.svg";
import Image from "next/image";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import styles from "./forgotPassword.module.css";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import BackStyles from "../signin/Signin.module.css";

import "./forgotPassword.module.css";
import Toast from "@/components/Toast";
import { setCookie } from "cookies-next";
import Loading from "@/components/Loading";

interface ForgotPasswordProps {
  email: string;
}

const ForgotPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errs, setErrs] = useState<ErrorProps>({
    status: "",
    message: "",
    statusCode: 0,
    errors: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordProps>({
    resolver: zodResolver(forgotPassword),
  });


  const handleForgortPassword = async (data: ForgotPasswordProps) => {
    setLoading(true);
    const res = await forgotPasswordRequest(data);
    setLoading(false);
    if (res?.statusCode === 200 && res.status === "Success") {
      sessionStorage.setItem("email", data.email);
      router.push({
        pathname: "/emailVerification",
        query: { from: "forgot-password" },
      });
      setError(false);
    }
    setErrs(res);
    setError(true);
  };

  return (
    <>
      <div className={styles.forgotPasswordContainer}>
        <div className={styles.forgotPasswordContent}>
          {error && <Toast text={errs?.message} marginBottom={40} />}
          <div style={{ marginBottom: 24 }}>
            <Image src={ForgotPasswordIcon} alt="Forgot Password Icon" />
          </div>
          <PageTitle
            title={"Forgot password?"}
            subtitle={"No worries, we’ll send you reset instructions."}
          />
          <form onSubmit={handleSubmit(handleForgortPassword)}>
            <div className={styles.forgotPasswordInput}>
              <Input
                placeholder="Enter your email "
                label="Email"
                type="text"
                register={{ ...register("email") }}
                borderColor={errors?.email?.message ? "#DF1111" : ""}
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
    </>
  );
};

export default ForgotPassword;
