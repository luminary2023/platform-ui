import React from "react";
import styles from "./Signin.module.css";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/InputField";
import PageTitleStyles from '@/components/PageTitle/PageTitle.module.css'
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinLeftWrapper}>
        <div style={{ marginBottom: 32 }}>
          <PageTitle
            title={"Welcome back"}
            subtitle={"Welcome back! Please enter your details."}
          />
        </div>
        <Input
          placeholder="Jondoe@mail"
          type="text"
          label="Email"
          marginBottom="24px"
        />
        <Input
          placeholder=""
          type="password"
          label="Password"
          marginBottom="24px"
        />
        <p className={styles.forgotPasswordText} onClick={() => router.push('/forgotPassword')}>Forgot password</p>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            textTransform: "capitalize",
          }}
        >
          Sign-In
        </Button>
        <p className={`${PageTitleStyles.subtitle} ${styles.createAccount}`}>Don’t have an account? <span className={styles.createText} onClick={() => router.push('/signup')}> Create account</span></p>
      </div>
      <div className={styles.signinRightWrapper}></div>
    </div>
  );
};

export default SignIn;
