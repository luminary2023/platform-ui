"use client";
import React, { useState } from "react";

import {
  Box,
  Typography,
  MenuItem,
  TextField,
  Tabs,
  Tab,
  Select,
} from "@mui/material";
import Image from "next/image";
import ConvertCoin from "../../../assets/images/convertLogo.svg";
import Bitcoins from "../../../assets/images/Bitcoins.svg";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Calculator = () => {
  const [value, setValue] = React.useState(0);

  const [crypto, setCrypto] = useState("Bit");
  const [currency, setCurrency] = useState("Usd");

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCrypto = (e: any) => {
    setCrypto(e.target.value as string);
  };
  const handleCurrency = (e: any) => {
    setCurrency(e.target.value as string);
  };
  return (
    <>
      <Box
        sx={{
          width: { lg: "60%", md: "60%", xs: "100%" },
          height: "423px",
          left: "855px",
          top: { lg: "224px", md: "224px", xs: "524px" },
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: {
            lg: "20px 34px 38px 34px",
            md: "20px 34px 38px 34px",
            xs: "20px 15px 38px 15px",
          },
        }}
      >
        <Box
          sx={{
            width: "80%",
            margin: "auto",
            background: "rgba(118, 118, 128, 0.12)",
            borderRadius: "8.91px",
            padding: "2px 2px 2px 2px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChangeTabs}
            aria-label="basic tabs example"
            sx={{
              margin: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Tab
              label=" Cryptocurrency"
              {...a11yProps(0)}
              // active={true}
              sx={{
                background: "white",
                color: "black",
                borderRadius: "6px",
                fontSize: "14px",
                textTransform: "capitalize",
                textAlign: "center",
                padding: {
                  lg: "0px 30px 0px 30px",
                  md: "0px 30px 0px 30px",
                  xs: "0px 5px 0px 30px",
                },
              }}
            />

            <Tab
              label=" Gift cards"
              {...a11yProps(1)}
              sx={{
                fontSize: "14px",
                textTransform: "capitalize",
                textAlign: "center",
                padding: "0px 30px 0px 30px",
              }}
              disabled={true}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography
            sx={{
              fontFamily: "Clash Display Semibold",
              fontStyle: " normal",
              fontWeight: "bold",
              fontSize: "18px",
              color: "#14142B",

              marginBottom: "16px",
            }}
          >
            Select Asset to convert
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "28px",
            }}
          >
            <Select
              value={crypto}
              onChange={handleCrypto}
              // defaultValue={"Bit"}
              sx={{
                background: "#F5F5F5",
                border: "none",
                width: "40%",
                marginRight: "5px",
                height: "57px",
                outline: "none",
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #E8E8E8",
                },
              }}
            >
              <MenuItem value="Bit">
                <Box display="flex" flexDirection="row" alignItems={"center"}>
                  <Image src={Bitcoins} alt="bitcoin" />
                  <Typography marginLeft={"11px"}> Bitcoin</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="ent">
                <Box display="flex" flexDirection="row" alignItems={"center"}>
                  <Image src={Bitcoins} alt="bitcoin" />
                  <Typography marginLeft={"11px"}>Etherium</Typography>
                </Box>
              </MenuItem>
            </Select>

            <TextField
              InputProps={{ disableUnderline: true }}
              variant="outlined"
              placeholder="$10,000"
              sx={{
                width: "100%",
                border: "1px solid #E8E8E8",
                borderRadius: "5px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "28px",
            }}
          >
            <Image src={ConvertCoin} alt="coins" />
          </Box>
          <Typography
            sx={{
              fontFamily: "Clash Display Semibold",
              fontStyle: " normal",
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "32px",
              color: "#14142B",
              marginTop: "32px",
              marginBottom: "16px",
            }}
          >
            You’ll Get
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "34px",
            }}
          >
            <Select
              value={currency}
              onChange={handleCurrency}
              // defaultValue={"Bit"}
              sx={{
                background: "#F5F5F5",
                border: "none",
                width: "40%",
                marginRight: "5px",
                height: "57px",
                outline: "none",
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #E8E8E8",
                },
              }}
            >
              <MenuItem value="Usd">
                <Box display="flex" flexDirection="row" alignItems={"center"}>
                  <Image src={Bitcoins} alt="bitcoin" />
                  <Typography marginLeft={"11px"}> Naira</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="Pound">
                <Box display="flex" flexDirection="row" alignItems={"center"}>
                  <Image src={Bitcoins} alt="bitcoin" />
                  <Typography marginLeft={"11px"}>USD</Typography>
                </Box>
              </MenuItem>
            </Select>
            <TextField
              placeholder="N10,000"
              InputProps={{ disableUnderline: true }}
              variant="outlined"
              sx={{
                width: "100%",
                border: "1px solid #E8E8E8",
                borderRadius: "5px",
                textAlign: "center",
              }}
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Gift cards
        </TabPanel>
      </Box>
    </>
  );
};

export default Calculator;
