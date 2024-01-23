"use client";
import { Box, Typography } from "@mui/material";
import { useState, FC } from "react";
import styles from "./Drawer.module.css";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string | undefined;
  subTitle: string;
  drawerWidth?: string;
  closeIcon?: boolean;
}

const RightDrawer: FC<Props> = ({
  open,
  onClose,
  children,
  title,
  subTitle,
  drawerWidth = "",
  closeIcon = false,
}) => {
  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        direction="right"
        className="bla bla bla"
        style={{
          width: drawerWidth || "32%",
          height: "100%",
          overflow: "scroll",
        }}
      >
        {!closeIcon ? (
          <Box
            sx={{
              background: "#081630",
              height: "85px",
              textAlign: "center",
              paddingTop: "5%",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "12px" }}>
              {subTitle}
            </Typography>
          </Box>
        ) : (
          <div
            onClick={onClose}
            className={styles.closeIcon}
          >
            X
          </div>
        )}
        <Box
          sx={{
            padding: "8%",
          }}
        >
          {children}
        </Box>
      </Drawer>
    </>
  );
};

export default RightDrawer;
