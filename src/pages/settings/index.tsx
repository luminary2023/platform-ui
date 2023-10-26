"use client";
import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import { Avatar, Box, Button, Typography } from "@mui/material";
// import React, { Children } from "react";
// import { Props } from "../../services/interfaces";
import React, { PropsWithChildren, FC } from "react";
// import SidebarSettings from "./settingSidebar";

import SettingSidebar from "./settingSidebar";
import backArrow from "../../assets/images/arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  children?: React.ReactNode;
  // title: string;
}

const ProfileSettings: FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <div style={{ background: "#F6F6F6", height: "100vh" }}>
      <DashboardContainer title="Settings">
        <Box
          sx={{
            display: "flex",
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
              height: "100%",
              pl: "5%",

              pr: "5%",
            }}
          >
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                mb: "30px",
              }}
            >
              <Image
                src={backArrow}
                alt="back"
                onClick={() => router.back()}
                style={{ cursor: "pointer" }}
              />
              <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
                {title}
              </Typography>
            </Box> */}

            {children}
          </Box>
        </Box>
      </DashboardContainer>
    </div>
  );
};

export default ProfileSettings;
