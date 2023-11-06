"use client";
import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import styles from "../../components/pages/dashboard/dashboard.module.css";
import KYC from "../../assets/images/KYC.svg";
import React, { useState, useEffect, FC } from "react";
import Bank from "../../assets/images/banks.svg";
import Image from "next/image";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import BankDetailsModal from "../../components/pages/dashboard/bankDetailsModal";
import Dashboard from "../../components/pages/dashboard/dashboard";
import { userAccountDetails } from "@/api/userAccountDetails";
import CheckIcon from "@mui/icons-material/Check";
import PhoneNumberModal from "../../components/pages/dashboard/phoneNumberModal";
import TransactionPinModal from "../../components/pages/dashboard/transactionPinModal";

const Index = () => {
  const [profile, setProfile] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [openPhoneModal, setOpenPhoneModal] = useState<boolean>(false);
  const [openTransactionPin, setOpenTransactionPin] = useState<boolean>(false);

  const [bankDetails, setBankDetails] = useState<[]>([]);
  const [createPin, setCreatePin] = useState<any>({});

  const handleBankDetails = async () => {
    try {
      const response = await userAccountDetails();
      setBankDetails(response);
    } catch (error: any) {
      return error?.response?.data;
    }
  };

  const handleBankDetailsModal = () => {
    if (bankDetails.length < 1) {
      setOpen(true);
    } else setOpen(false);
  };
  // const data: TransactionPinProps;
  useEffect(() => {
    handleBankDetails();
  }, []);

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
                  Finish setting up your P3 Wallet To buy, sell <br /> and
                  recieve cryto without limits.
                </p>
              </div>

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
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
                  {bankDetails.length === null ? "0" : "1"}/3
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  thickness={8}
                  size={80}
                  sx={{
                    color: "#F2F4FC",
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
                Submit your Identification documents and increase your P3 wallet
                limits.
              </p>
            </div>
          </div>
          <div
            className={styles.profileSecurity}
            onClick={() => setOpenTransactionPin(true)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={KYC}
              alt="secure"
              className={styles.profileSecurityImg}
            />
            <div>
              <h3>Create Transaction Pin</h3>

              <p>To be able to transact create transaction pin</p>
            </div>
          </div>

          <div
            className={styles.profileSecurity}
            style={{ cursor: "pointer" }}
            onClick={() => setOpenPhoneModal(true)}
          >
            <Image
              src={KYC}
              alt="secure"
              className={styles.profileSecurityImg}
            />
            <div>
              <h3>Verify Phone number</h3>

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
            <Image
              src={Bank}
              alt="secure"
              className={styles.profileSecurityImg}
            />
            <div>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {" "}
                <h3>Bank Details</h3>{" "}
                {bankDetails.length > 0 && (
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
