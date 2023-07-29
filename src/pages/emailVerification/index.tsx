import React, { useState } from "react";
import EmailLogo from "../../assets/images/EmailIcon.svg";
import styles from "./email.module.css";
import Image from "next/image";
import { Button } from "../../components/Button/Button";
import BackArrow from "../../assets/images/arrow-left.svg";
import { useRouter } from "next/router";
import EmailVerified from "@/components/CreateAccount/emailVerified";
import Icon from "../../assets/images/emailVerifiedIcon.svg";
import Input from "@/components/InputField";
import { emailVerificationRequest } from "@/api/emailVerification";
import { setCookie } from "cookies-next";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";

interface ErrorProps {
  status: string;
  message: string;
  statusCode: number;
}

interface CodeProps {
  verificationCode: number;
  email: string;
  onSubmit: any;
}

const EmailCodeVarification = () => {
  const [verification, setVerification] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errs, setErrs] = useState<ErrorProps>({
    status: "",
    message: "",
    statusCode: 0,
  });
  const router = useRouter();

  const handleEmailVerification = () => {
    router.push("/dashboard");
  };
  return (
    <>
      {verification ? (
        <div className={styles.emailSection}>
          {error && <Toast text={errs?.message} marginBottom={40} />}

          <Image src={EmailLogo} alt="email" width="56" height="56" />
          <h1>Check your email</h1>
          <p>We sent a verification link to olivia@untitledui.com</p>

          {/* <div className={styles.emailCodeVarify}>
            <Input placeholder={""} type={"text"} className={styles.code} />
            <Input placeholder={""} type={"text"} className={styles.code} />
            <Input placeholder={""} type={"text"} className={styles.code} />
            <Input placeholder={""} type={"text"} className={styles.code} />
          </div> */}
          <Button color="primary" variant="contained" type="submit">
            {loading ? <Loading /> : "Verify code"}
          </Button>

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
