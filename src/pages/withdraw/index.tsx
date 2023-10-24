"use client";
import Input from "@/components/InputField";
import { Typography, Box, Paper } from "@mui/material";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import backArrow from "../../assets/images/arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import SuccessModal from "./successModal";

const WidthdrawDetails = [
  {
    bank: "Guaranty Trust Bank",
    accountNumber: "009099509950",
    accountName: "John okunola",
    amount: "50,000",
    processFee: "10",
  },
];

export default function Index() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Box
      sx={{
        paddingTop: "30px",
        background: "#F6F6F6",
        height: { lg: "100%", md: "100%", sx: "100vh" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Image
          src={backArrow}
          alt="back"
          onClick={() => router.back()}
          style={{ cursor: "pointer" }}
        />
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "30px",
            color: "#1F2739",
            fontWeight: 600,
            // fontFamily: "Clash Display",
          }}
        >
          Review
        </Typography>
        <Typography></Typography>
      </Box>
      <Box
        sx={{
          margin: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            margin: "auto",
            marginTop: "30px",
            width: { lg: "35%", md: "50%", xs: "95%" },
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          {WidthdrawDetails.map((account) => (
            <Box key={account.bank}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Bank
                </Typography>
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  {account.bank}
                </Typography>
              </Box>
              <hr
                style={{
                  marginTop: "19px",
                  marginBottom: "19px",
                  color: "#E8E8E8",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Account Number
                </Typography>
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  {account.accountNumber}
                </Typography>
              </Box>
              <hr
                style={{
                  marginTop: "19px",
                  marginBottom: "19px",
                  color: "#E8E8E8",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Account Name
                </Typography>
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  {account.accountName}
                </Typography>
              </Box>
              <hr
                style={{
                  marginTop: "19px",
                  marginBottom: "19px",
                  color: "#E8E8E8",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Amount
                </Typography>
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  NGN{account.amount}
                </Typography>
              </Box>
              <hr
                style={{
                  marginTop: "19px",
                  marginBottom: "19px",
                  color: "#E8E8E8",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Processing Fee
                </Typography>
                <Typography
                  sx={{
                    color: "#1F2739",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  NGN{account.processFee}
                </Typography>
              </Box>
            </Box>
          ))}
        </Paper>
        <Box
          sx={{
            margin: "auto",
            marginTop: "24px",
            width: { lg: "35%", md: "50%", xs: "95%" },
            borderRadius: "16px",
            padding: "16px",
            background:
              "linear-gradient(135deg, rgba(253, 110, 106, 0.20) 0%, rgba(255, 198, 0, 0.20) 100%)",
          }}
        >
          <Input type="password" label="Please Enter Transaction Pin" />
        </Box>
        <Box
          sx={{
            margin: "auto",
            marginTop: "5px",
            width: { lg: "50%", md: "50%", xs: "100%" },
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <Button
            fullWidth={true}
            color="primary"
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            Confirm{" "}
          </Button>
        </Box>
      </Box>
      <SuccessModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
}
