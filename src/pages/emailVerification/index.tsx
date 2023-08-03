import React, { useEffect, useState } from "react";
import EmailLogo from "../../assets/images/EmailIcon.svg";
import styles from "./email.module.css";
import Image from "next/image";
import { Button } from "../../components/Button/Button";
import BackArrow from "../../assets/images/arrow-left.svg";
import { useRouter } from "next/router";
import EmailVerified from "@/components/CreateAccount/emailVerified";
import Icon from "../../assets/images/emailVerifiedIcon.svg";
import Input from "@/components/InputField";
import { setCookie } from "cookies-next";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";
import OtpInput from "@/components/OtpInput/otpInput";
import { codeVerificationRequest } from "@/api/codeVerification";

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
  const [errs, setErrs] = useState<ErrorProps>({
    status: "",
    message: "",
    statusCode: 0,
    errors: "",
  });
  const [otp, setOtp] = useState("");
  const onChange = (value: string) => setOtp(value);
  const router = useRouter();
  const handleEmailVerification = () => {
    router.push("/dashboard");
  };
  const [email, setEmail] = useState("");
  useEffect(() => {
    const emailValue = sessionStorage.getItem("email");
    if (emailValue) {
      setEmail(emailValue);
    } else {
      router.replace("/signup");
    }
  }, []);

  const codeVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await codeVerificationRequest({
      verificationCode: otp,
      email,
    });
    setLoading(false);
    if (res?.statusCode === 200 && res.status === "Success") {
      setCookie("logged", "true");
      setVerification(false);
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
          <p>We sent a verification link to {email}</p>

          <form onSubmit={codeVerification}>
            <div className={styles.emailCodeVarify}>
              <OtpInput value={otp} valueLength={6} onChange={onChange} />
            </div>
            <Button color="primary" variant="contained" type="submit">
              {loading ? <Loading /> : "Verify code"}
            </Button>
          </form>

          <div className={styles.sent}>
            <p>Didn’t receive the email?</p>

            <h6 className={styles.resend}>Click to resend</h6>
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
            "Your password has been successfully reset. Click below to log in magically."
          }
          backToText={"Back to create account"}
          routerPath={""}
          btnOnClick={handleEmailVerification}
          icon={Icon}
        />
      )}
    </>
  );
};

export default EmailCodeVarification;
