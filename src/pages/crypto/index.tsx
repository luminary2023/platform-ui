"use client";
import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import BuyIcon from "../../assets/images/cryptoBuyIcon.svg";
import SellIcon from "../../assets/images/cryptoSellIcon.svg";
import Withdraw from "../../assets/images/cryptoWithdrawIcon.svg";
import TransactionTable from "@/components/pages/crypto/transactionTable";
import CryptoChart from "@/components/pages/crypto/cryptoChart";
import { useState } from "react";

const Crypto = () => {
  return (
    <div style={{ background: "#F6F6F6", height: "100vh" }}>
      <DashboardContainer title="Crypto">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "65%",
              height: "100%",
              display: "initial",
              gap: 8,
            }}
          >
            <Box
              sx={{
                height: "100%",
                background: "#fff",
                padding: "24px",
                borderRadius: "16px",
              }}
            >
              <Typography
                sx={{
                  color: "#6C757D",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                Choose an Action
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  marginTop: "10px",
                  gap: 4,
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #FD6E6A",
                    width: "30%",
                    height: "113px",
                    borderRadius: "5px",
                    background: "#FEF4E6",
                  }}
                >
                  <Image
                    src={BuyIcon}
                    alt="buy"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "15%",
                    }}
                  />
                  <Typography textAlign={"center"} mt={1}>
                    Buy
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #007C5B",
                    width: "30%",
                    height: "113px",
                    borderRadius: "5px",
                    background: "#ECFCE5",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={SellIcon}
                    alt="buy"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "15%",
                    }}
                  />
                  <Typography textAlign={"center"} mt={1}>
                    Sell
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #F2C94C",
                    width: "30%",
                    height: "113px",
                    borderRadius: "5px",
                    background: "#FAFCE0",
                  }}
                >
                  <Image
                    src={Withdraw}
                    alt="buy"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "15%",
                    }}
                  />
                  <Typography textAlign={"center"} mt={1}>
                    Withdraw
                  </Typography>
                </Box>
              </Box>
            </Box>
            <CryptoChart />
          </Box>
          <TransactionTable />
        </Box>
      </DashboardContainer>
    </div>
  );
};

export default Crypto;
