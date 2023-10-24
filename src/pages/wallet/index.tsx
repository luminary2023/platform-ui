import DashboardContainer from "../../components/DashboardNavigation/dashboardContainer";
import styles from "./wallet.module.css";

import React, { useState, useEffect, FC } from "react";
import { Button } from "../../components/Button/Button";
import Input from "../../components/InputField";
import { Select, SelectChangeEvent, MenuItem, Menu, Fade } from "@mui/material";
import { quickActionsData } from "../../services/data";
import EastIcon from "@mui/icons-material/East";
import AppTable from "../../components/Table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { userAccountDetails } from "@/api/userAccountDetails";
import { Typography } from "@mui/material";
import BankDetailsModal from "../dashboard/bankDetailsModal";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { withdrawDetails } from "@/services/schemaVarification";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileRequest } from "@/api/profile";

const Wallet = () => {
  const router = useRouter();

  const [bank, setBank] = React.useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [bankDetails, setBankDetails] = useState<[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<any>({});
  const [error, setError] = useState<null | string>(null);

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
  const {
    handleSubmit,
    register,
    reset,
    watch,
    unregister,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(withdrawDetails),
  });

  const handleBankDetails = async () => {
    try {
      const response = await userAccountDetails();
      setBankDetails(response);
    } catch (error) {
      setError(error ? "error" : "");
    }
  };
  const profile = async () => {
    try {
      const response = await profileRequest();
      setWalletBalance(response);
    } catch (error) {
      setError(error ? "error" : "");
    }
  };
  useEffect(() => {
    handleBankDetails();
    profile();
  }, []);

  const handleWithdraw = () => {
    router.push("/withdraw");
  };

  return (
    <div style={{ background: "#F6F6F6" }}>
      <DashboardContainer title="Wallet">
        <div className={styles.topContent}>
          <div className={styles.topContentOne}>
            <div className={styles.walletBalanceContainer}>
              <div>
                <p className={styles.walletBalanceTitle}>
                  Total Wallet Balance
                </p>
                {show ? (
                  <p className={styles.walletBalance}>
                    {walletBalance?.wallet?.balance}
                  </p>
                ) : (
                  <p className={styles.walletBalance}>**********</p>
                )}
              </div>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setShow(!show)}
                  sx={{
                    textTransform: "capitalize",
                    width: 150,
                    Padding: "16px 32px",
                    borderRadius: 2,
                    height: 48,
                  }}
                >
                  {show ? "Hide" : "Show"}
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
                    <div
                      className={styles.quickActionsContainer}
                      style={{ background: item.background }}
                    >
                      <p>Coming soon...</p>
                    </div>
                    <p className={styles.quickActionsText}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.withdrawContainerWrapper}>
            <div className={styles.withdrawContainer}>
              <div className={styles.withdrawFunds}>
                <h3 className={styles.tableTitle}>Withdraw Funds</h3>

                <div
                  style={{
                    color: "#F7931A",
                    fontSize: "16px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  + Add Account
                </div>
              </div>
              {/* <p className={styles.inputLabel}>Select Bank</p> */}
              <form onSubmit={handleSubmit(handleWithdraw)}>
                <Typography
                  sx={{
                    color: "#344054",
                    fontFamily: "Satoshi Light",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                    marginBottom: "8px",
                  }}
                >
                  Select Bank
                </Typography>
                <select
                  placeholder="Choose a bank"
                  style={{
                    width: "100%",
                    height: "45px",
                    borderRadius: "10px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    border: "1px solid var(--Line, #E8E8E8)",
                    color: "#667085",
                    background: "#F5F5F5",
                    marginBottom: "8px",
                  }}
                >
                  {/* {bankDetails?.map((account: any) => (
                    <option key={account.accountName}>
                      {account?.bank?.name}
                    </option>
                  ))} */}
                </select>
                {/* {bankDetails && ( */}
                <Input
                  placeholder={"0123456789"}
                  type={"text"}
                  label="Account Number"
                  bgColor={"#F6F6F6"}
                  marginBottom={"8px"}
                  labelColor={"#081630"}
                  labelSize={"16px"}
                  readOnly={true}
                  // value={bankDetails.}
                />
                {/* )} */}
                <Input
                  readOnly={true}
                  placeholder={"0123456789"}
                  type={"NGN 15,000"}
                  label="Account Name"
                  bgColor={"#F6F6F6"}
                  marginBottom={"8px"}
                  labelColor={"#081630"}
                  labelSize={"16px"}
                />
                <Input
                  placeholder={"NGN"}
                  type={"NGN 15,000"}
                  label="Amount"
                  bgColor={"#F6F6F6"}
                  marginBottom={"8px"}
                  labelColor={"#081630"}
                  labelSize={"16px"}
                  register={{ ...register("amount") }}
                  borderColor={errors.amount?.message ? "#DF1111" : ""}
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  onClick={handleWithdraw}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    height: "61px",
                  }}
                >
                  Withdraw{" "}
                  <EastIcon style={{ marginLeft: 9, color: "#ffff" }} />
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className={styles.tableTitle}>History</h1>
            <div className={styles.filterWrapper}>
              <p>All</p>
              <div onClick={handleClick} style={{ cursor: "pointer" }}>
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
      <BankDetailsModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Wallet;
