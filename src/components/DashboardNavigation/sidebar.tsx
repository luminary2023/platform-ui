import React, { FC } from "react";
import { useRouter } from "next/router";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Typography, Box } from "@mui/material";

const links = [
  { path: "/dashboard", title: "Dashboard" },
  { path: "/wallet", title: "Wallet" },
  { path: "/giftCard", title: "Gift Cards" },
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
          sm: "25%",
          lg: "20%",
          xl: "20%",
        },
        height: {
          xs: "175vh",
          sm: "175vh",
          lg: "100vh",
          xl: "100vh",
        },
        background: "#081630",
        paddingLeft: {
          xs: "1px",
          sm: "12px",
        },
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
            sm: "16px",
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
              sm: "26px",
              lg: "44px",
              xl: "44px",
            },
          }}
          onClick={() => handleClick(link.path)}
        >
          <DashboardOutlinedIcon
            style={{
              color: currentRoute === link.path ? "#FD6E6A" : "#ffff",
            }}
          />
          ;
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
              marginLeft: "27px",
              fontSize: "16px",
              fontFamily: "Satoshi Light",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "normal",
              letterSpacing: "0.5px",
              cursor: "pointer",
              display: {
                xs: "none",
                sm: "none",
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
