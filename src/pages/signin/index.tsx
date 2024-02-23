"use client";
import React, { useEffect, useState } from "react";
import styles from "./Signin.module.css";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/InputField";
import PageTitleStyles from "@/components/PageTitle/PageTitle.module.css";
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Login } from "@/services/schemaVarification";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequest } from "@/api/login";
import Loading from "@/components/Loading";
import Toast from "../../components/Toast";
import { deleteCookie, setCookie } from "cookies-next";
import { ErrorProps } from "@/services/interfaces";
import { getCookie } from "cookies-next";
import jwt, { JwtPayload } from "jsonwebtoken";
// import isTokenExpired from "@/api/axiosClient";

interface LoginProps {
  password: string;
  email: string;
}

const SignIn = () => {
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
  } = useForm<LoginProps>({
    resolver: zodResolver(Login),
  });

  const handleLogin = async (data: LoginProps) => {
    setLoading(true);
    const res = await loginRequest(data);
    setLoading(false);
    if (res?.statusCode === 200 && res.status === "Success") {
      setCookie("token", res.token.token);
      // localStorage.setItem("token", res.token.token);
      router.push("/dashboard");
      setError(false);
    }
    setErrs(res);
    setError(true);
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinLeftWrapper}>
        {error && (
          <Toast
            text={errs?.message}
            success={errs?.message === "Logged In Successfully."}
            marginBottom={40}
            color={
              errs?.message === "Logged In Successfully." ? "green" : "DF1111"
            }
            border={
              errs?.message === "Logged In Successfully."
                ? "1px solid green"
                : "1px solid #DF1111"
            }
          />
        )}
        <div style={{ marginBottom: 32 }}>
          <PageTitle
            title={"Welcome back"}
            subtitle={"Welcome back! Please enter your details."}
          />
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            placeholder="Jondoe@mail"
            type="text"
            label="Email"
            register={{ ...register("email") }}
            marginBottom="24px"
            borderColor={errors?.email?.message ? "#DF1111" : ""}
          />

          <Input
            placeholder=""
            type="password"
            label="Password"
            marginBottom="24px"
            register={{ ...register("password") }}
            borderColor={errors?.password?.message ? "#DF1111" : ""}
          />

          <p
            className={styles.forgotPasswordText}
            onClick={() => router.push("/forgotPassword")}
          >
            Forgot password
          </p>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              textTransform: "capitalize",
            }}
          >
            {loading ? <Loading /> : "Sign-In"}
          </Button>
        </form>
        <p className={`${PageTitleStyles.subtitle} ${styles.createAccount}`}>
          Don’t have an account?{" "}
          <span
            className={styles.createText}
            onClick={() => router.push("/signup")}
          >
            {" "}
            Create account
          </span>
        </p>
      </div>
      <div className={styles.signinRightWrapper}></div>
    </div>
  );
};

export default SignIn;
