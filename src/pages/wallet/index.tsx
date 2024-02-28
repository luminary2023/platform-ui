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
// import { useThemeContext } from "@/api/useContext/store";
import Loading from "@/components/Loading";
import { refreshTokenApi } from "@/api/refreshToken";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useThemeContext } from "@/api/useContext/store";

interface WithdrawProps {
  accountNumber: string;
  accountName: string;
}

const Wallet = () => {
  const {
    // bankAccount,
    // profileData,
    // selectedBankDetails,
    // setSelectedBank,
    withdrawAmount,
    setWithdrawAmount,
    setSelectedBankDetails,
  } = useThemeContext();
  const router = useRouter();

  const { profileData } = useThemeContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [bankAccount, setBankAccount] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [accountCheck, setAccountCheck] = useState(true);
  // const [profileData, setProfileData] = useState<any>({});

  const handleBankAccount = async () => {
    try {
      // setLoading(true);
      const response = await userAccountDetails();
      setBankAccount(response);
      // setLoading(false);
    } catch (error: any) {
      return error?.response?.data;
    }
  };
  const selectedBankDetails = useMemo(() => {
    if (!selectedBank || (bankAccount?.length || 0) <= 0) {
      return {};
    }

    return (
      bankAccount?.find((b: any) => b.accountNumber === selectedBank) || {}
    );
  }, [selectedBank, bankAccount]);

  // const fetchProfile = async () => {
  //   try {
  //     const res = await profileRequest();
  //     setProfileData(res);
  //     setAccountCheck(false);
  //   } catch (error: any) {
  //     error?.response?.data;
  //   }
  // };
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
  const accountNumber = watch("accountNumber");
  const accountName = watch("accountName");

  useEffect(() => {
    // fetchProfile();
    handleBankAccount();
  }, []);

  const [accountInfo, setAccountInfo] = useState(true);

  // const setTimerLoading = useMemo(() => {
  //   setTimeout(() => {
  //     setAccountInfo(false);
  //   }, 3000);
  // }, []);

  const setTimerLoading = () => {
    setTimeout(() => {
      setAccountInfo(false);
    }, 13000);
  };

  const handleWithdraw = async () => {
    setLoading(true);
    const data = { bank, amount, selectedBankDetails };
    setWithdrawAmount(amount);
    setSelectedBankDetails(selectedBankDetails);
    const parseResult = withdrawDetails?.safeParse(data);
    setLoading(false);
    if (parseResult.success) router.push("/withdraw");
  };
  const minimumAmount = 1000;
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
                    NGN {profileData?.wallet?.balance}
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
                    width: "100%",
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
                      <p style={{ textAlign: "center" }}>Coming soon...</p>
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

                {/* {loading ? <Loading /> : ""} */}

                {bankAccount?.length > 0 && (
                  <Typography
                    sx={{
                      color: "#F7931A",
                      fontSize: { md: "14px", lg: "16px", xs: "8px" },
                      cursor: "pointer",
                      textDecoration: "underline",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => setOpenModal(true)}
                  >
                    + Add Another Account
                  </Typography>
                )}
              </div>

              {accountInfo ? (
                <>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: "50px",
                      mb: "50px",
                    }}
                  >
                    <Loading />
                  </Typography>
                  {setTimerLoading()}
                </>
              ) : bankAccount?.length < 1 ? (
                <Typography
                  sx={{
                    color: "#F7931A",
                    fontSize: { md: "14px", lg: "16px", xs: "8px" },
                    cursor: "pointer",
                    textDecoration: "underline",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    mt: "50px",
                    mb: "50px",
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  <GroupAddIcon sx={{ width: "60px", height: "60px" }} />
                </Typography>
              ) : (
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
                      outline: "none",
                      background: "#F5F5F5",
                      marginBottom: "8px",
                    }}
                    {...register("bank")}
                    onChange={handleChange}
                  >
                    <option value="" hidden>
                      Choose bank
                    </option>
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
                        register={{ ...register("accountNumber") }}
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
                        register={{ ...register("accountName") }}
                        borderColor={
                          errors.accountName?.message ? "#DF1111" : ""
                        }
                      />
                    </Box>
                  </Box>
                  <Input
                    placeholder={"NGN"}
                    type={"text"}
                    label="Amount"
                    bgColor={"#F6F6F6"}
                    // marginBottom={"18px"}
                    labelColor={"#081630"}
                    labelSize={"16px"}
                    register={{ ...register("amount") }}
                    borderColor={errors.amount?.message ? "#DF1111" : ""}
                    onKeyPress={(event: any) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <Typography
                    marginBottom={"18px"}
                    color={`${amount < minimumAmount ? "#DF1111" : "#081630"}`}
                    sx={{ fontSize: "10px" }}
                  >
                    Minimum: N1000
                  </Typography>

                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    // onClick={handleWithdraw}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "capitalize",
                      height: "61px",
                      margintTop: "8px",
                    }}
                    disabled={amount < minimumAmount}
                  >
                    {loading ? <Loading /> : "Withdraw"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
        {/* <div className={styles.tableContainer}>
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
        </div> */}
      </DashboardContainer>
      <BankDetailsModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Wallet;
