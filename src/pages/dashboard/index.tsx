"use client";
import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import styles from "./dashboard.module.css";
import Security from "../../assets/images/security.svg";
import KYC from "../../assets/images/KYC.svg";
import React, { useState, FC } from "react";
import Bank from "../../assets/images/banks.svg";
import Image from "next/image";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import BankDetailsModal from "./bankDetailsModal";
import Dashboard from "./dashboard";
// import CircularProgressWithLabel from "../../services/dashboardProgress";

interface ProgressProps {
  thickness: number;
}

const Index: FC<ProgressProps> = ({ thickness }) => {
  const [profile, setProfile] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 35
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
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
                  0/3
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
              src={Security}
              alt="secure"
              // style={{ marginRight: "40px" }}
              className={styles.profileSecurityImg}
            />
            <div>
              <h3>More security</h3>

              <p>
                keep your account more secure by entering your phone number.
              </p>
            </div>
          </div>
          <div className={styles.profileSecurity}>
            <Image
              src={KYC}
              alt="secure"
              className={styles.profileSecurityImg}
            />
            <div>
              <h3>KYC verification</h3>

              <p>
                Submit your Identification documents and increase your P3 wallet
                limits.
              </p>
            </div>
          </div>
          <div className={styles.profileSecurity}>
            <Image
              src={Bank}
              alt="secure"
              className={styles.profileSecurityImg}
            />
            <div onClick={() => setOpen(true)}>
              <h3 style={{ cursor: "pointer" }}>Bank details</h3>
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
    </DashboardContainer>
  );
};

export default Index;
