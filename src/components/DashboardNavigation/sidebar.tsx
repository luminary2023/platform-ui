"use client";
import React, { FC } from "react";
import { useRouter } from "next/router";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { Typography, Box } from "@mui/material";

const links = [
  { path: "/dashboard", title: "Dashboard", icon: <DashboardOutlinedIcon /> },
  { path: "/wallet", title: "Wallet", icon: <WalletOutlinedIcon /> },
  {
    path: "/giftCard",
    title: "Gift Cards",
    icon: <CardGiftcardOutlinedIcon />,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <Box
      sx={{
        width: {
          xs: "20%",
          sm: "22%",
          lg: "22%",
          xl: "22%",
        },
        height: {
          xs: "100wh",
          sm: "100vh",
          lg: "100vh",
          xl: "100vh",
        },
        background: "#081630",
        paddingRight: {
          xs: "12px",
          sm: "12px",
        },
      }}
    >
      <Typography
        sx={{
          color: "#FFF",
          fontSize: {
            xs: "14px",
            sm: "24px",
            lg: "24px",
            xl: "24px",
          },
          marginTop: {
            xs: "24px",
            sm: "24px",
            lg: "53px",
            xl: "53px",
          },
          fontFamily: "Clash Display Light",
          fontStyle: " normal",
          fontWeight: "bold",
          lineHeight: "16px",
          textAlign: "center",
          marginBottom: "105px",
        }}
      >
        LumiApp
      </Typography>
      {links.map((link, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "29px",
            marginLeft: {
              xs: "20px",
              lg: "44px",
            },
          }}
          onClick={() => handleClick(link.path)}
        >
          <span
            style={{
              color: currentRoute === link.path ? "#FD6E6A" : "#ffff",
            }}
          >
            {link.icon}
          </span>

          <Typography
            color={
              currentRoute === link.path
                ? {
                    backgroundImage: ` var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : "#ffff"
            }
            sx={{
              marginLeft: { xs: "10px", sm: "13px", lg: "27px" },
              fontSize: "16px",
              fontFamily: "Satoshi Light",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "normal",
              letterSpacing: "0.5px",
              cursor: "pointer",
              display: {
                xs: "none",
                sm: "block",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
            {link.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
