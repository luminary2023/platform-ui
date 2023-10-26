"use client";
import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import { Box, Button, Typography } from "@mui/material";
// import React, { Children } from "react";
// import { Props } from "../../services/interfaces";
import React, { PropsWithChildren, FC } from "react";
// import SidebarSettings from "./settingSidebar";
// import { useRouter, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LockIcon from "@mui/icons-material/Lock";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const SettingSidebar = () => {
  //   const pathName = usePathname();
  const router = useRouter();
  const currentRoute = router.pathname;

  const navLinks = [
    {
      path: "/settings/profile",
      name: "Profile",
      icon: <PeopleAltIcon />,
    },
    {
      path: "/settings/bank",
      name: "Bank Information",
      icon: <AccountBalanceIcon />,
    },
    {
      path: "/settings/security",
      name: "Login & Security",
      icon: <LockIcon />,
    },
    {
      path: "/",
      name: "Terms and Conditions",
      icon: <LibraryBooksIcon />,
    },
    {
      path: "/",
      name: "Privacy Policy",
      icon: <PrivacyTipIcon />,
    },
  ];
  const handleClick = (href: string) => {
    router.push(href);
  };
  return (
    <Box sx={{ background: "#F6F6F6" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {navLinks.map((link) => (
          <Box key={link.name}>
            <Box
              color={currentRoute === link.path ? "#FD6E6A" : ""}
              onClick={() => handleClick(link.path)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #DADADA",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "18px",
                },
              }}
            >
              <Box
                sx={{
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    color: currentRoute === link.path ? "#FD6E6A" : "",
                  }}
                >
                  {link.icon}
                </span>
                <Typography
                  fontWeight="600"
                  color={
                    currentRoute === link.path
                      ? {
                          backgroundImage: ` var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                      : ""
                  }
                >
                  {link.name}
                </Typography>
              </Box>
              <KeyboardArrowRightIcon />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SettingSidebar;
