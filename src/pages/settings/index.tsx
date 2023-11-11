"use client";
import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { FC } from "react";
import SettingSidebar from "./settingSidebar";

interface Props {
  children?: React.ReactNode;
}

const ProfileSettings: FC<Props> = ({ children }) => {
  return (
    <div style={{ background: "#F6F6F6", height: "100vh" }}>
      <DashboardContainer title="Settings">
        <Box
          sx={{
            display: { md: "flex", lg: "flex", xs: "column" },
            justifyContent: "space-between",
            position: "relative",
            // gap: 8,
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderRight: "1px solid #DADADA",
              pr: "5%",
            }}
          >
            <Avatar
              sx={{
                height: "100px",
                width: "100px",
                borderRadius: "100px",
                background: "grey",
                margin: "auto",
                marginBottom: "10px",
              }}
            />
            <SettingSidebar />
          </Box>

          <Box
            sx={{
              width: "100%",
              overflow: "scroll",
              height: "100wh",
              pl: { md: "5%", lg: "5%", xs: "none" },
              pr: { md: "5%", lg: "5%", xs: "none" },
              mt: { xs: "25px", md: "none", lg: "none" },
              mb: { xs: "20px", md: "none", lg: "none" },
            }}
          >
            {children}
          </Box>
        </Box>
      </DashboardContainer>
    </div>
  );
};

export default ProfileSettings;
