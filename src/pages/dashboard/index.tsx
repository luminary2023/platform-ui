"use client";
import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import styles from "../../components/pages/dashboard/dashboard.module.css";
import KYC from "../../assets/images/KYC.svg";
import React, { useState, useEffect, FC, useContext } from "react";
import Bank from "../../assets/images/banks.svg";
import Image from "next/image";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import BankDetailsModal from "../../components/pages/dashboard/bankDetailsModal";
import Dashboard from "../../components/pages/dashboard/dashboard";
import CheckIcon from "@mui/icons-material/Check";
import PhoneNumberModal from "../../components/pages/dashboard/phoneNumberModal";
import TransactionPinModal from "../../components/pages/dashboard/transactionPinModal";
import { useThemeContext } from "@/api/useContext/store";
import { profileRequest } from "@/api/profile";
import { userAccountDetails } from "@/api/userAccountDetails";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const Index = () => {
  const { profileData } = useThemeContext();

  const [profile, setProfile] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [openPhoneModal, setOpenPhoneModal] = useState<boolean>(false);
  const [openTransactionPin, setOpenTransactionPin] = useState<boolean>(false);

  const [bankAccount, setBankAccount] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);

  const handleBankAccount = async () => {
    try {
      const response = await userAccountDetails();
      setBankAccount(response);
    } catch (error: any) {
      return error?.response?.data;
    }
  };

  // const bankProgress = () => {
  //   if (bankAccount.length > 0) {
  //     setProgress((progress) => progress + 1);
  //   }
  // };

  const transactionPinSet = () => {
    if (profileData?.isTransactionPinSet === 1) {
      setProgress(+1);
    }
  };

  const phoneNumberSet = () => {
    if (profileData?.isPhoneNumberVerified === 1) {
      setProgress(+2);
    }
  };
  const bankAccountTrue = () => {
    if (bankAccount?.length > 0) {
      setProgress((progress) => progress + 1);
    }
  };

  useEffect(() => {
    // fetchProfile();
    handleBankAccount();
    transactionPinSet();
    phoneNumberSet();
    bankAccountTrue();
  }, [handleBankAccount]);

  const handleBankDetailsModal = () => {
    if (bankAccount.length < 1) {
      setOpen(true);
    } else setOpen(false);
  };

  const progressCheck = () => {
    if (progress === 3) {
      setProfile(false);
    }
  };
  useEffect(() => {
    progressCheck();
  }, [progressCheck]);
  return (
    <DashboardContainer
      title="Dashboard"
      subtitle="An overview of your assets "
    >
      {profile ? (
        <>
          <div className={styles.completeProfile}>
            <h1>Complete your profile</h1>

            <div className={styles.profile}>
              <div>
                <p>
                  Finish setting up your Wallet To buy, sell <br /> and recieve
                  cryto without limits.
                </p>
              </div>

              <Box
                sx={{
                  position: "relative",
                  display: { lg: "flex", md: "flex", xs: "none" },
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    marginLeft: "107px",
                    position: "absolute",
                    fontFamily: "Satoshi Bold",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {progress}/3
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  thickness={8}
                  size={80}
                  sx={{
                    color: progress === 3 ? "green" : "#F2F4FC",

                    width: { xs: "20px", sm: "20px", lg: "100px", xl: "100px" },
                    height: {
                      xs: "20px",
                      sm: "20px",
                      lg: "100px",
                      xl: "100px",
                    },
                    position: "relative",
                    top: "50%",
                    left: "50%",
                    marginTop: "0px",
                    marginRight: "80px",
                  }}
                />
              </Box>
            </div>
          </div>

          <div className={styles.profileSecurity}>
            <Image
              src={KYC}
              alt="secure"
              className={styles.profileSecurityImg}
            />
            <div>
              <h3>KYC Verification</h3>

              <p>
                Submit your Identification documents and increase your wallet
                limits.
              </p>
            </div>
          </div>
          <div
            className={styles.profileSecurity}
            onClick={() => {
              if (profileData.isTransactionPinSet === 0)
                setOpenTransactionPin(true);
            }}
            style={{ cursor: "pointer" }}
          >
            {/* <Image
              src={KYC}
              alt="secure"
              className={styles.profileSecurityImg}
            /> */}
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                background: "#081630",
                // position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "7%",
              }}
            >
              <ReceiptLongIcon
                sx={{
                  color: "#fff",
                  width: "70%",
                }}
              />
            </Box>
            <div>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <h3>Create Transaction Pin</h3>

                {profileData?.isTransactionPinSet === 1 && (
                  <CheckIcon sx={{ color: "green" }} />
                )}
              </Box>

              <p>To be able to transact create transaction pin</p>
            </div>
          </div>

          <div
            className={styles.profileSecurity}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (profileData?.phoneNumber === null) setOpenPhoneModal(true);
            }}
          >
            {/* <Image
              src={KYC}
              alt="secure"
              className={styles.profileSecurityImg}
            /> */}
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                background: "#081630",
                // position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "7%",
              }}
            >
              <PhoneInTalkIcon
                sx={{
                  color: "#fff",
                  width: "70%",
                }}
              />
            </Box>
            <div>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <h3>Verify Phone number</h3>{" "}
                {profileData?.isPhoneNumberVerified === 1 && (
                  <CheckIcon sx={{ color: "green" }} />
                )}
              </Box>
              <p>
                keep your account more secure by entering your phone number.
              </p>
            </div>
          </div>
          <div
            className={styles.profileSecurity}
            style={{ cursor: "pointer" }}
            onClick={handleBankDetailsModal}
          >
            {/* <Image
              src={Bank}
              alt="secure"
              className={styles.profileSecurityImg}
            /> */}
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                background: "#081630",
                // position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "7%",
              }}
            >
              <AccountBalanceIcon
                sx={{
                  color: "#fff",
                  width: "70%",
                }}
              />
            </Box>
            <div>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {" "}
                <h3>Bank Details</h3>{" "}
                {bankAccount?.length > 0 && (
                  <CheckIcon sx={{ color: "green" }} />
                )}
              </Box>
              <p>Recieve money into your prefered bank account.</p>
            </div>
          </div>
          <Button
            color="primary"
            variant="contained"
            sx={{
              textTransform: "initial",
              width: "120px",
            }}
            onClick={() => setProfile(false)}
          >
            Skip for now
          </Button>
        </>
      ) : (
        <Dashboard />
      )}
      <BankDetailsModal open={open} onClose={() => setOpen(false)} />
      <PhoneNumberModal
        open={openPhoneModal}
        onClose={() => setOpenPhoneModal(false)}
      />
      <TransactionPinModal
        open={openTransactionPin}
        onClose={() => setOpenTransactionPin(false)}
      />
    </DashboardContainer>
  );
};
export default Index;
function numberVerificationCode() {
  throw new Error("Function not implemented.");
}
