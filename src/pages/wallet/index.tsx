import DashboardContainer from "../../components/DashboardNavigation/dashboardContainer";
import styles from "./wallet.module.css"

import React from "react";
import { Button } from "../../components/Button/Button";
import Input from "../../components/InputField";
import { Select, SelectChangeEvent, MenuItem, Menu, Fade,} from "@mui/material";
import { bankData, quickActionsData } from "../../services/data";
import EastIcon from "@mui/icons-material/East";
import AppTable from "../../components/Table";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from "next/image";

const Wallet = () => {
  const [bank, setBank] = React.useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SelectChangeEvent<typeof bank>) => {
    const {
      target: { value },
    } = event;
    setBank(typeof value === "string" ? value.split(",") : value);
  };

  const tableHeaderData = [
    "Date",
    "Beneficiary",
    "Bank",
    "Country",
    "Amount",
    "Status",
    "",
  ];

  return (
    <div style={{ background: "#F6F6F6" }}>
      <DashboardContainer title="Wallet">
        <div className={styles.topContent}>
          <div
            className={styles.topContentOne}
          >
            <div className={styles.walletBalanceContainer}>
              <div>
                <p className={styles.walletBalanceTitle}>
                  Total Wallet Balance
                </p>
                <p className={styles.walletBalance}>NGN 320,000.00</p>
              </div>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    width: 150,
                    Padding: "16px 32px",
                    borderRadius: 2,
                    height: 48,
                  }}
                >
                  Fund Wallet
                </Button>
              </div>
            </div>
            <div className={styles.transactionsContainer}>
              <h2 className={styles.transactionsTitle}>Quick Actions</h2>
              <p className={styles.transactionsSubtitle}>
                Use the quick action to perform basic transactions. You can buy
                data and pay bills
              </p>
              <div className={styles.quickActionsWrapper}>
                {quickActionsData.map((item) => (
                  <div key={item.id}>
                    <div className={styles.quickActionsContainer} style={{background: item.background}}>
                      <p>Coming soon...</p>
                    </div>
                    <p className={styles.quickActionsText}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.withdrawContainerWrapper} >
            <div className={styles.withdrawContainer}>
              <h3 className={styles.tableTitle}>Withdraw Funds</h3>
              <p className={styles.inputLabel}>Select Bank</p>
              <Select
                value={bank}
                onChange={handleChange}
                placeholder="Choose a bank"
                sx={{ 
                  height: "40px", 
                  width: "100%", 
                  marginBottom: "13px",
                  backgroundColor: "#F6F6F6"
                }}
              >
                {bankData.map((bank, index) => (
                  <MenuItem key={index} value={bank}>
                    {bank}
                  </MenuItem>
                ))}
              </Select>
              <Input
                placeholder={"0123456789"}
                type={"text"}
                label="Account Number"
                bgColor={"#F6F6F6"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}
              />
              <Input
                placeholder={"0123456789"}
                type={"NGN 15,000"}
                label="Amount"
                bgColor={"#F6F6F6"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: "10px",
                  textTransform: "capitalize",
                  height: "61px",
                }}
              >
                Withdraw <EastIcon style={{ marginLeft: 9, color: "#ffff" }} />
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.tableContainer }>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 className={styles.tableTitle}>History</h1>
            <div className={styles.filterWrapper}>
            <p>All</p>
            <div onClick={handleClick} style={{cursor: 'pointer'}}>
              <KeyboardArrowDownIcon />
            </div>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Newest</MenuItem>
              <MenuItem onClick={handleClose}>Oldest</MenuItem>
            </Menu>
            </div>
          </div>
          <AppTable tableHeaderData={tableHeaderData} />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default Wallet;
