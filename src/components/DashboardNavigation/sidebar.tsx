"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Typography, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";
import styles from "./sidebar.module.css";

const links = [
  { path: "/dashboard", title: "Dashboard", icon: <DashboardOutlinedIcon /> },
  { path: "/wallet", title: "Wallet", icon: <WalletOutlinedIcon /> },
  {
    path: "/crypto",
    title: "Crypto",
    icon: <CurrencyBitcoinIcon />,
  },
  {
    path: "/giftCard",
    title: "Gift Cards",
    icon: <CardGiftcardOutlinedIcon />,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const handleClick = (href: string) => {
    router.push(href);
  };

  const logout = () => {
    deleteCookie("logged");
    deleteCookie("token");
    deleteCookie("name");
    deleteCookie("value");
    router.push("/");
  };
  useEffect(() => {
    setTimeout(() => {
      logout();
    }, 3300000);
  }, []);
  return (
    <Box
      sx={{
        width: {
          xs: "20%",
          sm: "22%",
          lg: "20%",
          xl: "20%",
        },
        height: {
          xs: "100vh",
          sm: "100vh",
          lg: "100vh",
          xl: "100vh",
        },
        background: "#081630",

        paddingRight: {
          xs: "12px",
          sm: "12px",
        },
        position: { xs: "fixed", sm: "fixed", lg: "fixed", xl: "fixed" },
      }}
    >
      {/* <Typography
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
      > */}
      <div className={styles.logo}>
        <Image
          src={Logo}
          alt="logo"
          width={200}
          className={styles.logo}
          style={{
            position: "relative",
            top: "-30px",
            display: "flex",
            margin: "auto",
            // display: "block",
            justifyContent: "center",
          }}
        />
      </div>
      {/* </Typography> */}
      {links.map((link) => (
        <Box
          color={currentRoute === link.path ? "#FD6E6A" : "#FFFFFF"}
          key={link.path}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
            marginBottom: "29px",
            cursor: "pointer",
            marginLeft: {
              xs: "20px",
              lg: "55px",
            },
            marginTop: { lg: "0px", sm: "30px", xs: "30px" },
            "&:hover": {
              backgroundImage: ` var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "#FD6E6A",
            },
          }}
          onClick={() => handleClick(link.path)}
        >
          <Box

          // style={{
          //   color: currentRoute === link.path ? "#FD6E6A" : "#ffff",
          // }}
          >
            {link.icon}
          </Box>

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
              // "&:hover": {
              //   color: {
              //     backgroundImage: ` var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))`,
              //     WebkitBackgroundClip: "text",
              //     WebkitTextFillColor: "transparent",
              //   },
              // },
            }}
          >
            {link.title}
          </Typography>
        </Box>
      ))}
      <Box
        onClick={logout}
        sx={{
          display: "flex",
          color: "red",
          marginLeft: {
            xs: "20px",
            lg: "55px",
          },
          position: "absolute",
          top: "90%",
        }}
      >
        <LogoutIcon
          sx={{
            color: "red",
          }}
        />
        <Box
          sx={{
            marginBottom: "29px",
            cursor: "pointer",

            fontSize: "16px",
            fontFamily: "Satoshi Light",
            fontStyle: "normal",
            fontWeight: "bold",
            marginLeft: { xs: "10px", sm: "13px", lg: "27px" },
            display: {
              xs: "none",
              sm: "block",
              md: "block",
              lg: "block",
              xl: "block",
            },
          }}
        >
          Logout
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
