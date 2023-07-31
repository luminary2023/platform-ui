import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { Button } from "@/components/Button/Button";
import Input from "@/components/InputField";
import { useForm } from "react-hook-form";
import AuthFooter from "@/components/AuthFooter/authFooter";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp } from "@/services/schemaVarification";
import { SignupProps } from "../../services/interfaces";
import { RegisterRequest } from "@/api/register";
import Toast from "../../components/Toast";
import Loading from "@/components/Loading";
import { setCookie } from "cookies-next";
import { emailVerificationRequest } from "@/api/emailVerification";

interface ErrorProps {
  status: string;
  message: string;
  statusCode: number;
  errors: any;
}

export default function Index() {
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
  } = useForm<SignupProps>({
    resolver: zodResolver(SignUp),
  });

  const handleRegistration = async (data: SignupProps) => {
    setLoading(true);
    const res = await RegisterRequest(data);
    setLoading(false);
    if (res?.statusCode === 201 && res.status === "Created") {
      setCookie("logged", "true");
      emailVerificationRequest(data);
      router.push("/emailVerification");
      setError(false);
    }
    setErrs(res);
    setError(true);
  };

  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.createAccount}>
          <div className={styles.formContent}>
            {error && (
              <Toast
                text={errs?.errors?.[0].message || errs?.message}
                marginBottom={40}
              />
            )}

            <h1 className={styles.title} style={{ marginBottom: "24px" }}>
              Create account
            </h1>
            <form onSubmit={handleSubmit(handleRegistration)}>
              <div
                className={styles.groupForm}
                style={{ marginBottom: "24px" }}
              >
                <div className={styles.inputNames}>
                  <Input
                    placeholder="First"
                    type="text"
                    label="First name*"
                    register={{ ...register("firstName") }}
                    borderColor={errors?.firstName?.message ? "#DF1111" : ""}
                  />
                </div>
                <div className={styles.inputNames}>
                  <Input
                    placeholder="Last"
                    type={"text"}
                    label="Last name*"
                    register={{ ...register("lastName") }}
                    borderColor={errors?.lastName?.message ? "#DF1111" : ""}
                  />
                </div>
              </div>
              <div
                className={styles.formInputBox}
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Enter your email"
                  type={"email"}
                  label="Email*"
                  register={{ ...register("email") }}
                  borderColor={errors?.email?.message ? "#DF1111" : ""}
                />
              </div>
              <div
                className={styles.formInputBox}
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Create a password"
                  type="password"
                  label="Password*"
                  register={{ ...register("password") }}
                  borderColor={errors?.password?.message ? "#DF1111" : ""}
                />

                <p
                  style={{
                    color: " #667085",
                    marginTop: "8px",
                    fontSize: "14px",
                    fontFamily: "Satoshi Light",
                  }}
                >
                  Must be at least 8 characters.
                </p>
              </div>

              <Button
                fullWidth={true}
                color="primary"
                variant="contained"
                sx={{ textTransform: "initial", marginBottom: "32px" }}
                type="submit"
              >
                {loading ? <Loading /> : "Create account"}
              </Button>
            </form>
            <div className={styles.accountUser}>
              <h4 className={styles.accountUsers}>Already have an account?</h4>
              <div
                className={styles.logIn}
                onClick={() => router.push("/signin")}
              >
                Log in
              </div>
            </div>
          </div>
          <AuthFooter />
        </div>

        <div className={styles.createimg}></div>
      </div>
    </>
  );
}
