"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Fade,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DownArrow from "../../assets/images/DownArrow.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useThemeContext } from "@/api/useContext/store";
import { profileRequest } from "@/api/profile";
import { refreshTokenApi } from "@/api/refreshToken";

interface Props {
  title: string;
  subtitle: string;
}

const Header: FC<Props> = ({ title, subtitle = "" }) => {
  // const { profileData } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileData, setProfileData] = useState<any>({});

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const fetchProfile = async () => {
    try {
      const res = await profileRequest();
      setProfileData(res);
    } catch (error: any) {
      error?.response?.data;
    }
  };
  // const [refreshTokens, setRefreshToken] = useState("");
  // console.log(profileData, "expired", refreshTokens);

  // const fetchToken = async (refreshToken: any) => {
  //   if (profileData.exp) {
  //     const newToken = await refreshTokenApi(refreshToken);
  //     setRefreshToken(newToken);
  //   }
  // };
  useEffect(() => {
    fetchProfile();
    // fetchToken(refreshToken);
    // window.addEventListener("beforeunload", (ev) => {
    //   ev.preventDefault();
    //   deleteCookie("token");
    // });
    // window.addEventListener("beforeunload");
  }, []);

  const logout = () => {
    deleteCookie("logged");
    deleteCookie("token");
    deleteCookie("name");
    deleteCookie("value");
    router.push("/");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",

          position: "relative",
        }}
      >
        <Typography
          sx={{
            color: "#081630",
            fontSize: {
              xs: "18px",
              sm: "18px",
              lg: "30px",
              xl: "30px",
            },
            fontFamily: "Clash Display Semibold",
            fontStyle: "normal",
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <SearchOutlinedIcon
            style={{
              color: "#6F6C99",
              width: "31px",
              height: "31px",
              flexShrink: "0",
              cursor: "pointer",
            }}
          /> */}
          <Box
            sx={{
              display: "inline-flex",
              padding: {
                xs: "3.375px 6.5px 2.625px 5.063px",
                sm: "3.375px 6.5px 2.625px 5.063px",
                lg: "6px 12px 6px 9px",
                xl: "6px 12px 6px 9px",
              },
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              marginRight: "15px",
              borderRadius: "14px",
              cursor: "pointer",
              background:
                "var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))",
            }}
          >
            <NotificationsIcon
              style={{ color: "#fff", width: "15px", height: "15px" }}
            />
            <Typography
              sx={{
                fontSize: "12px",
                fontFamily: "Satoshi",
                fontStyle: " normal",
                fontWeight: 500,

                color: "#fff",
              }}
            >
              0
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            onClick={handleClick}
          >
            <Avatar
              sx={{
                width: { xs: "24px", sm: "24px", lg: "30px", xl: "30px" },
                height: { xs: "24px", sm: "24px", lg: "30px", xl: "30px" },
                // marginLeft: { xs: "10px", sm: "10px", lg: "15px", xl: "15px" },
                fontSize: { xs: "13px", sm: "13px", md: "15px", lg: "17px" },
                cursor: "pointer",
                display: "flex",
              }}
            >
              {profileData?.firstName?.[0]}
              {profileData?.lastName?.[0]}
            </Avatar>
            {/* <Typography
              // onClick={handleClick}
              style={{ cursor: "pointer" }}
              sx={{
                color: " #6F6C99",
                fontSize: " 13px",
                fontFamily: "Satoshi Light",
                fontStyle: "normal",
                fontWeight: 500,

                display: {
                  xs: "none",
                  sm: "block",
                  lg: "block",
                  xl: "block",
                },
              }}
            >
              {profileData?.firstName[0]} {profileData?.lastName[0]}
            </Typography> */}
            <Box>
              <Image
                src={DownArrow}
                alt="arrow"
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={() => router.push("/wallet")}
              sx={{
                fontSize: {
                  xs: "13px",
                  md: "14px",
                  lg: "14px",
                },
              }}
            >
              Wallet
            </MenuItem>
            <MenuItem
              onClick={() => router.push("/crypto")}
              sx={{
                fontSize: {
                  xs: "13px",
                  md: "14px",
                  lg: "14px",
                },
              }}
            >
              Crypto
            </MenuItem>
            <MenuItem
              onClick={() => router.push("/giftCard")}
              sx={{
                fontSize: {
                  xs: "13px",
                  md: "14px",
                  lg: "14px",
                },
              }}
            >
              Gift Card
            </MenuItem>
            <MenuItem
              onClick={() => router.push("/settings")}
              sx={{
                fontSize: {
                  xs: "13px",
                  md: "14px",
                  lg: "14px",
                },
              }}
            >
              Settings
            </MenuItem>

            <MenuItem
              onClick={logout}
              sx={{
                fontSize: {
                  xs: "13px",
                  md: "14px",
                  lg: "14px",
                },
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Typography
        sx={{
          color: "#6C757D",
          fontSize: {
            xs: "12px",
            sm: "12px",
            lg: "16px",
            xl: "16px",
          },
          fontFamily: "Satoshi Light",
          fontStyle: "normal",
          fontWeight: 500,
          marginBottom: "52px",
        }}
      >
        {subtitle}
      </Typography>
    </>
  );
};

export default Header;
