import React from "react";
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
import { TableTag } from "@/components/Table/tableTwo";

interface actionProps {
  title: string;
  icon: any;
  onClick: () => void;
  backgroundColor: string;
  borderColor: string;
  id: number;
}

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
    onClick: () => {},
    borderColor: "1px solid var(--Primary, #007C5B)",
    backgroundColor: "#ECFCE5",
  },
];

function createData(
  type: string,
  giftcard: string,
  amount: string,
  naira: string,
  status: string
) {
  return { type, giftcard, amount, naira, status };
}

const rows = [
  createData("Received", "Amazon", "2000", "15000", "Pending"),
  createData("Send", "Amazon", "2000", "15000", "Completed"),
  createData("Received", "Amazon", "2000", "15000", "Error"),
  createData("Send", "Amazon", "2000", "15000", "Pending"),
];

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

const GiftcardHome = () => {
  return (
    <div>
      <div className={styles.sectionWrapper}>
        <div className={styles.homeSectionOne}>
          <div className={styles.giftCardAmount}>
            # 500,000
            <span className={styles.giftCardAmountSub}># 500,000</span>
          </div>
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
                {rows.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className={styles.tableData}
                      sx={{
                        position: "relative",
                        left: "15px",
                      }}
                    >
                      <>
                        <TableTag text={row.type} />
                        {row.type}
                      </>
                    </TableCell>
                    <TableCell align="right" className={styles.tableData}>
                      {row.giftcard}
                    </TableCell>
                    <TableCell align="right" className={styles.tableData}>
                      {row.amount}
                    </TableCell>
                    <TableCell align="right" className={styles.tableData}>
                      {row.naira}
                    </TableCell>
                    <TableCell align="right" className={styles.tableData}>
                      <div
                        className={`${styles.statusTag} ${statusStyle(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default GiftcardHome;
