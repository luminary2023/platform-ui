"use client";
import React, { PropsWithChildren, FC } from "react";
import { Box } from "@mui/material";
import Sidebar from "./sidebar";
import Header from "./header";
import { Props } from "../../services/interfaces";
const SidebarContainer: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  subtitle = "",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",

        position: "relative",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "#F6F6F6",

          width: "100%",
          padding: {
            xs: "18px 6px 6px 8px",
            sm: "18px 6px 6px 240px",
            lg: "38px 36px 36px 300px",
            xl: "38px 36px 36px 300px",
          },
          paddingLeft: { lg: "300px" },
        }}
      >
        <Header title={title} subtitle={subtitle} />
        {children}
      </Box>
    </Box>
  );
};

export default SidebarContainer;
