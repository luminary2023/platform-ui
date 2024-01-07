import * as React from "react";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import ReceiveIcon from "../../assets/images/receive.svg";
import SendIcon from "../../assets/images/send.svg";
import styles from "../Tag/tag.module.css";

import Tag from "../Tag";

interface AppTableProps {
  tableHeaderData: any;
}

interface AppTableTagProps {
  text: string;
}

const singleData = [
  {
    date: "6/11/14",
    type: "Received",
    assest: "Apple Gift card",
    description: "the description of the transaction",
    amount: "120,000",
    status: "completed",
  },
  {
    date: "6/01/14",
    type: "Send",
    assest: "Apple Gift card",
    description: "the description of the transaction",
    amount: "120,000",
    status: "completed",
  },
  {
    date: "6/12/14",
    type: "Received",
    assest: "Apple Gift card",
    description: "the description of the transaction",
    amount: "120,000",
    status: "completed",
  },
  {
    date: "8/19/14",
    type: "Send",
    assest: "Apple Gift card",
    description: "the description of the transaction",
    amount: "120,000",
    status: "completed",
  },
];

export const TableTag: React.FC<AppTableTagProps> = ({ text }) => (
  <div
    className={styles.TagTwoContainer}
    style={{
      background:
        text === "Received" ? "rgb(204 244 233)" : "rgba(220, 53, 69, 0.20)",
    }}
  >
    <Image src={text === "Received" ? ReceiveIcon : SendIcon} alt="icon" />
  </div>
);

const DashboardTable: React.FC<AppTableProps> = ({ tableHeaderData }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              borderRadius: "8px 8px 0px 0px",
              background: "#F6F6F6",
            }}
          >
            <TableRow>
              {tableHeaderData?.map((header: string, index: any) => (
                <TableCell
                  sx={{
                    color: "#787389",
                    fontFamily: "Clash Display SemiBold",
                  }}
                  key={index}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {singleData.map((row) => (
              <TableRow key={row.date}>
                <TableCell
                  sx={{
                    color: "#787389",
                    fontFamily: "Satoshi Regular",
                  }}
                >
                  {row.date}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#787389",
                    fontFamily: "Satoshi Regular",
                    position: "relative",
                    textAlighn: "center !important",
                  }}
                >
                  <>
                    <TableTag text={row.type} />
                    {row.type}
                  </>
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Satoshi Regular",
                  }}
                >
                  {row.assest}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#787389",
                    fontFamily: "Satoshi Regular",
                  }}
                >
                  {row.description}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#787389",
                    fontFamily: "Satoshi Regular",
                  }}
                >
                  {row.amount}
                </TableCell>
                <TableCell>
                  <Tag text={row.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 26,
          fontSize: 15,
          fontFamily: "Satoshi Regular",
        }}
      >
        <p>Page 6 of 11</p>
        <Pagination
          shape="rounded"
          count={11}
          defaultPage={6}
          sx={{
            color: "#007C5B",
          }}
        />
      </div>
    </>
  );
};

export default DashboardTable;
