"use client";
import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from '../wallet/wallet.module.css'
import giftcardStyles from './giftcard.module.css'
import SellGiftcard from "./sellGiftcard";
import GiftcardHome from "./giftcardHome";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const GiftcardTabPanel = (props: TabPanelProps) => {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const GiftCard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <DashboardContainer title="Gift Cards">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="giftcard tab"
              // textColor="#FD6E6A"
              // indicatorColor="#FD6E6A"
            >
              <Tab label="Home" {...a11yProps(0)} />
              <Tab label="Sell Giftcards" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <GiftcardTabPanel value={value} index={0}>
           <GiftcardHome />
          </GiftcardTabPanel>
          <GiftcardTabPanel value={value} index={1}>
           <SellGiftcard />
          </GiftcardTabPanel>
        </Box>
      </DashboardContainer>
    </>
  );
};

export default GiftCard;
