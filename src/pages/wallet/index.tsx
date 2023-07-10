import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import styles from "./wallet.module.css";

import React from "react";
import { Button } from "@/components/Button/Button";
import Input from "@/components/InputField";
import { Select, SelectChangeEvent, MenuItem } from "@mui/material";
import { bankData } from "../../services/data";
import EastIcon from "@mui/icons-material/East";
import AppTable from "@/components/Table";

const Wallet = () => {
  const [bank, setBank] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof bank>) => {
    const {
      target: { value },
    } = event;
    setBank(typeof value === "string" ? value.split(",") : value);
  };

  const tableHeaderData = [
    'Date',
    'Beneficiary',
    'Bank',
    'Country',
    'Amount',
    'Status'
  ]

  return (
    <div style={{ background: "#F6F6F6" }}>
      <DashboardContainer title="Wallet">
        <div className={styles.topContent}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "45%" }}
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
              <p className={styles.transactionsSubtitle}>Use the quick action to perform basic transactions. You can buy data and pay bills</p>
            </div>
          </div>
          <div className={styles.withdrawContainer}>
            <h3>Withdraw Funds</h3>
            <Select
              value={bank}
              onChange={handleChange}
              placeholder="Choose a bank"
              sx={{ height: "40px", width: "100%", marginBottom: "24px" }}
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
              // bgColor={"#FAFCE0"}
              marginBottom={"8px"}
            />
            <Input
              placeholder={"0123456789"}
              type={"NGN 15,000"}
              label="Amount"
              bgColor={"#F5F5F5"}
              marginBottom={"8px"}
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
              // onClick={() => router.push("/signup")}
            >
              Withdraw <EastIcon style={{ marginLeft: 9, color: "#ffff" }} />
            </Button>
          </div>
        </div>
        <div>
          <h1 className={styles.tableTitle}>History</h1>
          <AppTable tableHeaderData={tableHeaderData} />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default Wallet;
