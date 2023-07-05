import React, { useState } from 'react'
import { useRouter } from "next/router";

import ForgotPasswordIcon from "../../assets/images/forgot.svg";
import Image from "next/image";
import PageTitle from '@/components/PageTitle';
import Input from '@/components/InputField';
import { Button } from "@/components/Button/Button";
import styles from './forgotPassword.module.css'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import BackStyles from '../signin/Signin.module.css'
import EmailVerified from '@/components/CreateAccount/emailVerified';
// import EmailIcon from "../../assets/images/Emailicon.svg";
import EmailIcon from '../../assets/images/EmailIcon.svg'

import './forgotPassword.module.css'


const ForgotPassword = () => {

  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false)

  return (
    <>
      {success ? (
        <EmailVerified 
          title={"Check your email"} 
          subTitle={"We sent a password reset link to olivia@jane.com"} 
          backToText={"Back to log in"} 
          routerPath={"/signin"}    
          btnOnClick={() => {}} 
          icon={EmailIcon} 
        />
      ) : (
        <div className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordContent}>
        <div style={{marginBottom: 24}}><Image src={ForgotPasswordIcon} alt="Forgot Password Icon" /></div>
        <PageTitle title={'Forgot password?'} subtitle={'No worries, we’ll send you reset instructions.'} />
        <div className={styles.forgotPasswordInput}>
          <Input 
            placeholder='Enter your email '
            label='Email'
            type='text'
            
          />
       </div>
        <Button
            color="primary"
            variant="contained"
            fullWidth={false}
            sx={{
              textTransform: "capitalize",
              width: '340px'
            }}
            onClick={() => setSuccess(true)}
          >
            Reset password
          </Button>
          <div className={BackStyles.forgotPasswordText} style={{ alignItems: 'center', marginTop: 34}} onClick={() => router.push('/signin')}>
            <KeyboardBackspaceSharpIcon fontSize="medium" color="disabled"/><p style={{marginLeft: 10}}>Back to log in</p>
          </div>
        </div>
    </div>
      )}
    </>
  )
}

export default ForgotPassword;