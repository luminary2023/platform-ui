import React from "react";
import { Box } from "@mui/material";

const authFooter = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: "20px",
        position: "fixed",
        bottom: "0",
      }}
    >
      <Box
        sx={{
          color: "#667085",
          fontSize: "14px",
          fontWeight: 400,
        }}
      >
        © P3wallet
      </Box>
      {/* <Box
        sx={{
          color: "#667085",
          fontSize: "14px",
          fontWeight: 400,
        }}
      >
        Terms. privacy
      </Box> */}
    </Box>
  );
};

export default authFooter;
