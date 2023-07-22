import React from "react";
import EmailLogo from "../../assets/images/EmailIcon.svg";
import styles from "./email.module.css";
import Image from "next/image";
import { Button } from "../Button/Button";
import BackArrow from "../../assets/images/arrow-left.svg";
import { useRouter } from "next/router";

const EmailCodeVarification = () => {
  const router = useRouter();
  return (
    <div className={styles.emailSection}>
      <Image src={EmailLogo} alt="email" width="56" height="56" />
      <h1>Check your email</h1>
      <p>We sent a verification link to olivia@untitledui.com</p>
      <div className={styles.emailCodeVarify}>
        <div className={styles.code}>3</div>
        <div className={styles.code}>0</div>
        <div className={styles.code}>6</div>
        <div className={styles.code}>6</div>
      </div>
      <Button color="primary" variant="contained">
        {" "}
        Verify code
      </Button>
      <div className={styles.sent}>
        <p>Didn’t receive the email?</p>

        <h6 className={styles.resend}>Click to resend</h6>
      </div>

      <div className={styles.goBack} onClick={() => router.push("/")}>
        <Image src={BackArrow} alt="backArrow" />
        <p>Back to create account</p>
      </div>
    </div>
  );
};

export default EmailCodeVarification;
