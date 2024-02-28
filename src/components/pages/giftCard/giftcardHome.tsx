"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./giftcard.module.css";
import Image from "next/image";
import BuyGiftCardIcon from "../../../assets/images/buy-giftcard.svg";
import SellGiftCardIcon from "../../../assets/images/sell-giftcard.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { giftcardTableHead } from "@/services/data";
import { giftcardTable } from "@/api/giftcardTable";
import { Box, Pagination, Typography } from "@mui/material";
import TradeInfoModal from "@/components/TradeInfoModal";

interface GiftCardHomeProps {
  sellOnClick: () => void;
}

interface actionProps {
  title: string;
  icon: any;
  onClick: () => void;
  backgroundColor: string;
  borderColor: string;
  id: number;
}

const Color: Record<string, string> = {
  Error: "#E73434",
  Completed: "#5FDA24",
  Pending: "#6338DC",
};

const statusStyle = (text: string) => {
  let className = "";

  switch (text) {
    case "Pending":
      className = styles.pending;
      break;
    case "Completed":
      className = styles.completed;
      break;
    case "Error":
      className = styles.error;
      break;
    default:
      className = "";
  }
  return className;
};

const GiftcardHome: FC<GiftCardHomeProps> = ({ sellOnClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeCardInfo = () => {
    setIsOpen(false);
  };

  const [giftcardsTable, setGiftcardsTable] = useState<any>([]);
  // const giftcardInfo = giftcardTable?.[0]
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentPost = giftcardsTable?.slice(firstIndex, lastIndex);

  const GCACTIONS: actionProps[] = [
    {
      id: 1,
      title: "Buy",
      icon: BuyGiftCardIcon,
      onClick: () => {},
      borderColor: "1px solid #F3F3F3",
      backgroundColor: "#F3F3F3",
    },
    {
      id: 2,
      title: "Sell",
      icon: SellGiftCardIcon,
      onClick: sellOnClick,
      borderColor: "1px solid var(--Primary, #007C5B)",
      backgroundColor: "#ECFCE5",
    },
  ];

  const giftcardTransactionTable = async () => {
    const response = await giftcardTable();
    setGiftcardsTable(response);
  };

  useEffect(() => {
    giftcardTransactionTable();
  }, []);
  const [cardInfo, setCardInfo] = useState<any>("");

  const handleTransactionDetails = (giftcard: any) => {
    setCardInfo({ ...giftcard });
    setIsOpen(true);
  };

  return (
    <div>
      <Box
        sx={{
          display: { lg: "flex", md: "flex", xs: "column" },
          gap: 5,
        }}
      >
        {/* <div className={styles.sectionWrapper}> */}
        <div className={styles.homeSectionOne}>
          <p className={styles.action}>Choose an Action</p>
          <div className={styles.actionWrapper}>
            {GCACTIONS.map((item: actionProps) => (
              <>
                <div
                  className={styles.actionBox}
                  onClick={item?.onClick}
                  key={item?.id}
                  style={{
                    background: item?.backgroundColor,
                    border: item?.borderColor,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "11px",
                      flexDirection: "column",
                    }}
                  >
                    <Image src={item?.icon} alt="icon" />
                    <p style={{ color: "#081630" }} className={styles.action}>
                      {item?.title}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className={styles.homeSectionTwo}>
          <h1 className={styles.tableTitle}>Transactions</h1>
          {giftcardsTable.length === 0 ? (
            <Typography
              sx={{
                fontSize: "13px",
                textAlign: "center",
                mt: "15px",
                mb: "15px",
                textDecoration: "underline",
                margin: "auto",
              }}
            >
              No transaction yet
            </Typography>
          ) : (
            <TableContainer>
              <Table sx={{ width: "100%" }} aria-label="giftcard table">
                <TableHead>
                  <TableRow>
                    {giftcardTableHead.map((item, i) => (
                      <TableCell className={styles.tableHead} key={i}>
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPost.map((giftcard: any) => (
                    <>
                      <TableRow
                        key={giftcard.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                        onClick={() => handleTransactionDetails(giftcard)}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className={styles.tableData}
                          sx={
                            {
                              // position: "relative",
                              // left: "15px",
                            }
                          }
                        >
                          <>
                            {
                              giftcard.giftcardSubCategory
                                ?.giftcardCategoriesCurrenciesType
                                ?.giftcardCategory?.name
                            }
                          </>
                        </TableCell>
                        <TableCell className={styles.tableData}>
                          <>{giftcard.amount}</>
                        </TableCell>
                        <TableCell className={styles.tableData}>
                          {giftcard.rate}
                        </TableCell>
                        <TableCell className={styles.tableData}>
                          {giftcard.totalAmount}
                        </TableCell>
                        <TableCell className={styles.tableData}>
                          <div
                            className={`${styles.statusTag} ${statusStyle(
                              giftcard.status
                            )}`}
                          >
                            {giftcard.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                variant="outlined"
                shape="rounded"
                // showFirstButton
                // count={currentPost.length}
                defaultPage={currentPage}
                hideNextButton={recordsPerPage < 7 ? false : true}
                sx={{
                  color: "#007C5B",
                  mt: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(_, newPage) => setCurrentPage(newPage)}
              />
            </TableContainer>
          )}
        </div>
        {/* </div> */}
      </Box>
      <TradeInfoModal
        open={isOpen}
        onClose={closeCardInfo}
        title="Giftcard Transaction information"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "40px",
          }}
        >
          <Typography
            sx={{ color: "#081630", fontSize: "14px", fontWeight: 700 }}
          >
            Giftcard
          </Typography>
          <Typography sx={{ fontSize: "16px" }}>
            {
              cardInfo.giftcardSubCategory?.giftcardCategoriesCurrenciesType
                ?.giftcardCategory?.name
            }
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "15px",
          }}
        >
          <Typography
            sx={{ color: "#081630", fontSize: "14px", fontWeight: 700 }}
          >
            Amount
          </Typography>
          <Typography sx={{ fontSize: "16px" }}>{cardInfo.amount}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "15px",
          }}
        >
          <Typography
            sx={{ color: "#081630", fontSize: "14px", fontWeight: 700 }}
          >
            Rate
          </Typography>
          <Typography sx={{ fontSize: "16px" }}>{cardInfo.rate}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "15px",
          }}
        >
          <Typography
            sx={{ color: "#081630", fontSize: "14px", fontWeight: 700 }}
          >
            Quantity
          </Typography>
          <Typography sx={{ fontSize: "16px" }}>{cardInfo.quantity}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "15px",
          }}
        >
          <Typography
            sx={{ color: "#081630", fontSize: "14px", fontWeight: 700 }}
          >
            Total Amount
          </Typography>
          <Typography sx={{ fontSize: "16px" }}>
            {cardInfo.totalAmount}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "15px",
          }}
        >
          <Typography
            sx={{ color: "#081630", fontSize: "14px", fontWeight: 700 }}
          >
            Status
          </Typography>

          <Typography
            // color={`${
            //   cardInfo.status === "Pending"
            //     ? "#6338dc"
            //     : cardInfo.status === "Completed"
            //     ? "#5fda24"
            //     : cardInfo.status === "Error"
            //     ? "#e73434"
            //     : ""
            // } `}
            sx={{ fontSize: "16px", color: Color[cardInfo.status] }}
          >
            {cardInfo.status}
          </Typography>
        </Box>
      </TradeInfoModal>
    </div>
  );
};

export default GiftcardHome;
