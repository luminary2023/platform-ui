import React, {FC} from "react";
import styles from "./email.module.css";
import Image from "next/image";
import { Button } from "../Button/Button";
import BackArrow from "../../assets/images/arrow-left.svg";
import { useRouter } from "next/router";
import { EmailVerifiedProps } from '@/services/interfaces'


const EmailVerified: FC<EmailVerifiedProps> = ({title, subTitle, backToText, actionType, routerPath, btnOnClick, icon}) => {
  const router = useRouter();
  return (
    <div className={styles.emailSection}>
      <Image src={icon} alt="email" width="56" height="56" />
      <h1>{title}</h1>
      <p>{subTitle}</p>
      <Button color="primary" variant="contained" onClick={btnOnClick}>
        {" "}
        Continue
      </Button>
      {actionType !== 'reset password'  && <div className={styles.sent}>
        <p>Didn’t receive the email?</p>
        <h6 className={styles.resend}>Click to resend</h6>
      </div>}
      <div className={styles.goBack} onClick={() => router.push(`/${routerPath}`)}>
        <Image src={BackArrow} alt="backArrow" />
        <p>{backToText}</p>
      </div>
    </div>
  );
};

export default EmailVerified;
