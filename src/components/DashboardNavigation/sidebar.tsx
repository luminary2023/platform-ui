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
        width: "270px",
        height: "100vh",
        background: "#081630",
        padding: "53px",
      }}
    >
      <Typography
        sx={{
          color: "#FFF",
          fontSize: "24px",
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
