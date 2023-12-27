"use client";
import DashboardContainer from "../../components/DashboardNavigation/dashboardContainer";
import styles from "./wallet.module.css";
import React, { useState, useEffect, FC, useMemo } from "react";
import { Button } from "../../components/Button/Button";
import Input from "../../components/InputField";
import { MenuItem, Menu, Fade, Box } from "@mui/material";
import { quickActionsData } from "../../services/data";
import EastIcon from "@mui/icons-material/East";
import AppTable from "../../components/Table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { userAccountDetails } from "@/api/userAccountDetails";
import { Typography } from "@mui/material";
import BankDetailsModal from "../../components/pages/dashboard/bankDetailsModal";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { withdrawDetails } from "@/services/schemaVarification";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileRequest } from "@/api/profile";
import { useThemeContext } from "@/api/useContext/store";

const Wallet = () => {
  const {
    bankAccount,
    walletBalance,
    selectedBankDetails,
    setSelectedBank,
    withdrawAmount,
    setWithdrawAmount,
  } = useThemeContext();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedBank(value);
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(withdrawDetails),
  });

  const bank = watch("bank");
  const amount = watch("amount");

  const handleWithdraw = () => {
    const data = { bank, amount };
    const parseResult = withdrawDetails?.safeParse(data);
    if (parseResult.success) router.push("/withdraw");
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
                    NGN {walletBalance?.wallet?.balance}
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

                <Typography
                  sx={{
                    color: "#F7931A",
                    fontSize: { md: "16px", lg: "16px", xs: "11px" },
                    cursor: "pointer",
                    textDecoration: "underline",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  {bankAccount ? " + Add Another Account" : " + Add Account"}
                </Typography>
              </div>

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
                    // borderBlock: "none",
                    border: `${
                      errors.bank?.message ? "1px solid  #DF1111" : "none"
                    } `,
                    color: "#667085",
                    background: "#F5F5F5",
                    marginBottom: "8px",
                  }}
                  {...register("bank")}
                  onChange={handleChange}
                >
                  <option value="">Choose bank</option>
                  {Array.isArray(bankAccount || [])
                    ? (bankAccount || [])?.map((account: any) => (
                        <option
                          key={account.accountNumber}
                          value={account.accountNumber}
                        >
                          {account?.bank?.name}
                        </option>
                      ))
                    : ""}
                </select>

                <Box
                  sx={{
                    display: { lg: "flex", md: "flex", xs: "" },
                    // justifyContent: "space-between",
                    width: "100%",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Input
                      type={"text"}
                      label="Account Number"
                      bgColor={"#F6F6F6"}
                      marginBottom={"8px"}
                      labelColor={"#081630"}
                      labelSize={"16px"}
                      readOnly={true}
                      value={selectedBankDetails?.accountNumber}
                      // register={{ ...register("accountNumber") }}
                      borderColor={
                        errors.accountNumber?.message ? "#DF1111" : ""
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Input
                      readOnly={true}
                      type={"NGN 15,000"}
                      label="Account Name"
                      bgColor={"#F6F6F6"}
                      marginBottom={"8px"}
                      labelColor={"#081630"}
                      labelSize={"16px"}
                      value={selectedBankDetails?.accountName}
                      // register={{ ...register("accountName") }}

                      borderColor={errors.accountName?.message ? "#DF1111" : ""}
                    />
                  </Box>
                </Box>
                <Input
                  placeholder={"NGN"}
                  type={"text"}
                  label="Amount"
                  bgColor={"#F6F6F6"}
                  marginBottom={"18px"}
                  labelColor={"#081630"}
                  labelSize={"16px"}
                  register={{ ...register("amount") }}
                  borderColor={errors.amount?.message ? "#DF1111" : ""}
                  value={withdrawAmount}
                  onChange={(e: any) => setWithdrawAmount(e.target.value)}
                  onKeyPress={(event: any) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
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
                    margintTop: "8px",
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
