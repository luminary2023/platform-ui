import React, { FC } from "react";
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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DownArrow from "../../assets/images/DownArrow.svg";
import Image from "next/image";
interface Props {
  title: string;
  subtitle: string;
}

const Header: FC<Props> = ({ title, subtitle='' }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#081630",
            fontSize: "30px",
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
          <SearchOutlinedIcon
            style={{
              color: "#6F6C99",
              width: "31px",
              height: "31px",
              flexShrink: "0",
              cursor: "pointer",
            }}
          />
          <Box
            sx={{
              display: "inline-flex",
              padding: "6px 12px 6px 9px",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              marginLeft: "15px",
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
              15
            </Typography>
          </Box>

          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{
              width: "30px",
              height: "30px",
              marginLeft: "15px",
              cursor: "pointer",
            }}
          />
          <Typography
            sx={{
              color: " #6F6C99",
              fontSize: " 13px",
              fontFamily: "Satoshi Light",
              fontStyle: "normal",
              fontWeight: 500,
              marginLeft: "15px",
            }}
          >
            Pixelz Warrios
          </Typography>
          <Box sx={{ marginLeft: "15px" }}>
            <Image
              src={DownArrow}
              alt="arrow"
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />

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
              <MenuItem onClick={handleClose}>Wallet</MenuItem>
              <MenuItem onClick={handleClose}>Gift Card</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          color: "#6C757D",
          fontSize: "16px",
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
