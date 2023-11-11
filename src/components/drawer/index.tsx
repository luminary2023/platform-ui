import { Box, Typography } from "@mui/material";
import { useState, FC } from "react";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subTitle: string;
}

const RightDrawer: FC<Props> = ({
  open,
  onClose,
  children,
  title,
  subTitle,
}) => {
  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        direction="right"
        className="bla bla bla"
        style={{ width: "32%", height: "100%", overflow: "scroll" }}
      >
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
