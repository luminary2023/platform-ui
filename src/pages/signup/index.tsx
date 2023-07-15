import React from "react";
import styles from "./SignUp.module.css";
import { Button } from "@/components/Button/Button";
import Input from "@/components/InputField";
import { useForm } from "react-hook-form";
import AuthFooter from "@/components/AuthFooter/authFooter";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp } from "@/services/schemaVarification";
import { SignupProps } from "../../services/interfaces";

export default function Index() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupProps>({
    resolver: zodResolver(SignUp),
  });
  const handleRegistration = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.createAccount}>
          <div className={styles.formContent}>
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
                Create account
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
