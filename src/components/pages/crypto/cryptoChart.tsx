// import GenerateData from "@/services/cryptoChart";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  ButtonGroup,
  Button,
} from "@mui/material";
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
          <select
            style={{
              padding: "10%",
              borderRadius: "10px",
              border: "1px solid #ECECEC",
              outline: "none",
            }}
          >
            <option>BTC</option>
            <option>ETH</option>
            <option>TRM</option>
          </select>
        </FormControl>
        <Box
          sx={{
            height: "57px",
            background: "#F3F3F3",
            width: "293.807px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 15px 0px 15px",
          }}
        >
          <Button
            sx={{
              textTransform: "initial",
              "&:hover": {
                backgroundColor: "#081630",
                color: "#fff",
              },
            }}
          >
            Day
          </Button>
          <Button
            sx={{
              textTransform: "initial",
              "&:hover": {
                backgroundColor: "#081630",
                color: "#fff",
              },
            }}
          >
            Week
          </Button>
          <Button
            sx={{
              textTransform: "initial",
              "&:hover": {
                backgroundColor: "#081630",
                color: "#fff",
              },
            }}
          >
            Month
          </Button>
          <Button
            sx={{
              textTransform: "initial",
              "&:hover": {
                backgroundColor: "#081630",
                color: "#fff",
              },
            }}
          >
            Year
          </Button>
        </Box>
      </Box>
      {/* <GenerateData /> */}
    </Box>
  );
};

export default CryptoChart;
