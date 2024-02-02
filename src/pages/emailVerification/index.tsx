"use client";
import React, { useEffect, useState } from "react";
import EmailLogo from "../../assets/images/EmailIcon.svg";
import styles from "./email.module.css";
import Image from "next/image";
import { Button } from "../../components/Button/Button";
import BackArrow from "../../assets/images/arrow-left.svg";
import { useRouter } from "next/router";
import EmailVerified from "@/components/CreateAccount/emailVerified";
import Icon from "../../assets/images/emailVerifiedIcon.svg";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";
import OtpInput from "@/components/OtpInput/otpInput";
import { codeVerificationRequest } from "@/api/codeVerification";
import { resendVerificationCodeRequest } from "@/api/resendCodeVerification";
import { verifyPasswordCodeRequest } from "@/api/password";

interface ErrorProps {
  status: string;
  message: string;
  statusCode: number;
  errors: any;
}

interface CodeProps {
  verificationCode: number;
  email: string;
  data: any;
}

const EmailCodeVarification: React.FC<CodeProps> = () => {
  const [verification, setVerification] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [errs, setErrs] = useState<ErrorProps>({
    status: "",
    message: "",
    statusCode: 0,
    errors: "",
  });
  const [otp, setOtp] = useState("");
  const onChange = (value: string) => setOtp(value);
  const router = useRouter();
  const fromForgotPasswordPage = router.query.from === "forgot-password";

  const handleEmailVerification = () => {
    if (fromForgotPasswordPage) {
      router.push("resetPassword");
    } else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    const emailValue = sessionStorage.getItem("email");
    if (emailValue) {
      setEmail(emailValue);
    } else {
      router.replace("/signup");
    }
  }, [router]);

  const codeVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = fromForgotPasswordPage
      ? await verifyPasswordCodeRequest({
          email,
          resetPasswordCode: otp,
        })
      : await codeVerificationRequest({
          verificationCode: otp,
          email,
        });

    setLoading(false);

    if (res?.statusCode === 200 && res.status === "Success") {
      fromForgotPasswordPage &&
        sessionStorage.setItem("forgotpasswordOtp", otp);
      setVerification(false);
      setError(false);
    }
    setErrs(res);
    setError(true);
  };

  const handleResendOtp = async (e: any) => {
    e.preventDefault();
    const res = await resendVerificationCodeRequest({ email });
    if (res?.statusCode === 200 && res.status === "Success") {
      setError(false);
    }
    setErrs(res);
    setError(true);
  };

  return (
    <>
      {verification ? (
        <div className={styles.emailSection}>
          {error && (
            <Toast
              text={errs?.errors?.[0].message || errs?.message}
              marginBottom={40}
            />
          )}

          <Image src={EmailLogo} alt="email" width="56" height="56" />
          <h1>Check your email</h1>
          <p>
            We sent a verification code to {email}, if you can't find it check
            your spam.
          </p>

          <form onSubmit={codeVerification}>
            <div className={styles.emailCodeVarify}>
              <OtpInput value={otp} valueLength={6} onChange={onChange} />
            </div>
            <Button color="primary" variant="contained" type="submit">
              {loading ? <Loading /> : "Verify code"}
            </Button>
          </form>

          <div className={styles.sent}>
            <p>Didnt receive the email?</p>

            <h6 className={styles.resend} onClick={handleResendOtp}>
              Click to resend
            </h6>
          </div>

          <div className={styles.goBack} onClick={() => router.push("/signup")}>
            <Image src={BackArrow} alt="backArrow" />
            <p>Back to create account</p>
          </div>
        </div>
      ) : (
        <EmailVerified
          title={"Email verified"}
          subTitle={
            "You email has been successfully verified. Click below to log in magically."
          }
          backToText={`Back to ${
            fromForgotPasswordPage ? "forgot password" : "create account"
          }`}
          routerPath={""}
          btnOnClick={handleEmailVerification}
          icon={Icon}
        />
      )}
    </>
  );
};

export default EmailCodeVarification;
