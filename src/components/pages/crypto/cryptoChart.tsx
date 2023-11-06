import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

const CryptoChart = () => {
  return (
    <Box
      sx={{
        height: "100%",
        background: "#fff",
        padding: "24px",
        borderRadius: "16px",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl sx={{ width: "25%" }}>
          <Select>
            <MenuItem defaultValue={"btc"}>BTC</MenuItem>
            <MenuItem value={"eth"}>ETH</MenuItem>
            <MenuItem value={"trm"}>TRM</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            height: "57px",
            background: "#F3F3F3",
            width: "293.807px",
            borderRadius: "10px",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default CryptoChart;
