import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

const ResetPassword = () => {
  const router = useRouter();
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<any>("");

  useEffect(() => {
    const a = sessionStorage.getItem("email");
    setEmail(a);
  }, []);

  return (
    <>
      {!resetSuccess ? (
        <div className={styles.forgotPasswordContainer}>
          <div className={styles.forgotPasswordContent}>
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
            <div
              className={styles.forgotPasswordInput}
              style={{ marginBottom: 0 }}
            >
              <Input
                placeholder="Enter your Password "
                label="Password"
                type="password"
              />
            </div>
            <div className={styles.forgotPasswordInput}>
              <Input
                placeholder="Enter your Password "
                label="Confirm password"
                type="password"
              />
            </div>
            <Button
              color="primary"
              variant="contained"
              fullWidth={false}
              sx={{
                textTransform: "capitalize",
                width: "340px",
              }}
              onClick={() => setResetSuccess(true)}
            >
              Reset password
            </Button>
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
