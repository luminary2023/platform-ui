import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import styles from "./dashboard.module.css";
import Security from "../../assets/images/security.svg";
import KYC from "../../assets/images/KYC.svg";
import React, { useState, FC } from "react";
import Bank from "../../assets/images/banks.svg";
import Image from "next/image";
import { Button, Box } from "@mui/material";
import BankDetailsModal from "./bankDetailsModal";
import Dashboard from "./dashboard";

const Index = () => {
  const [profile, setProfile] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DashboardContainer
      title="Dashboard"
      subtitle="An overview of your assets "
    >
      {profile ? (
        <>
          <div className={styles.profile}>
            <div>
              <h1>Complete your profile</h1>
              <p>
                Finish setting up your P3 Wallet To buy, sell <br /> and recieve
                cryto without limits.
              </p>
            </div>
          </div>

          <div className={styles.profileSecurity}>
            <Image
              src={Security}
              alt="secure"
              style={{ marginRight: "40px" }}
            />
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h3>More security</h3>

                <Box
                  sx={{
                    background:
                      "var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))",
                    paddingRight: "8px",
                    paddingLeft: "8px",
                    color: "#fff",
                    borderRadius: 5,
                    marginLeft: "7px",
                    fontSize: "10px",
                    textAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    height: "25px",
                  }}
                >
                  Coming soon
                </Box>
              </Box>
              <p>
                keep your account more secure by entering your phone number.
              </p>
            </div>
          </div>
          <div className={styles.profileSecurity}>
            <Image src={KYC} alt="secure" style={{ marginRight: "40px" }} />
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h3>KYC verification</h3>

                <Box
                  sx={{
                    background:
                      "var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))",
                    paddingRight: "8px",
                    paddingLeft: "8px",
                    color: "#fff",
                    borderRadius: 5,
                    marginLeft: "7px",
                    fontSize: "10px",
                    textAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    height: "25px",
                  }}
                >
                  Coming soon
                </Box>
              </Box>
              <p>
                Submit your Identification documents and increase your P3 wallet
                limits.
              </p>
            </div>
          </div>
          <div className={styles.profileSecurity}>
            <Image src={Bank} alt="secure" style={{ marginRight: "40px" }} />
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
              width: "12%",
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
