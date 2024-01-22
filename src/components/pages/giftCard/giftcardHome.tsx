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
  const [giftcardsTable, setGiftcardsTable] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentPost = giftcardsTable.slice(firstIndex, lastIndex);

  const GCACTIONS: actionProps[] = [
    {
      id: 1,
      title: "Buy",
      icon: BuyGiftCardIcon,
      onClick: () => {},
      backgroundColor: "#FEF4E6",
      borderColor: "1px solid var(--Linear-1, #FD6E6A)",
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
          {/* <div className={styles.giftCardAmount}>
            # 500,000
            <span className={styles.giftCardAmountSub}># 500,000</span>
          </div> */}
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
                    <TableRow
                      key={giftcard.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                  ))}
                </TableBody>
              </Table>
              <Pagination
                variant="outlined"
                shape="rounded"
                // showFirstButton
                count={currentPost.length}
                defaultPage={currentPage}
                // hideNextButton={false}
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
    </div>
  );
};

export default GiftcardHome;
