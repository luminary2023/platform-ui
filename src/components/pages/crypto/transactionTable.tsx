"use client";
import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const cryptoTransaction = [
  {
    type: "Received",
    amount: "12ETH",
    status: "Pending",
  },
  {
    type: "Exchange",
    amount: "12ETH",
    status: "Completed",
  },
  {
    type: "Send",
    amount: "12ETH",
    status: "Error",
  },
  {
    type: "Send",
    amount: "12ETH",
    status: "Requested",
  },
];
const Color: Record<string, string> = {
  Requested: "#F7931A",
  Error: "#E73434",
  Completed: "#5FDA24",
  Pending: "#6338DC",
};
const bgColor: Record<string, string> = {
  Requested: "#FFF4E7",
  Error: "#FFE9E9",
  Completed: "#E8FFDD",
  Pending: "#F4F0FF",
};

const TransactionTable = () => {
  return (
    <Box
      sx={{
        width: { md: "35%", lg: "35%", xs: "100%" },
        height: "100%",
        background: "#fff",
        padding: "24px",
        borderRadius: "16px",
      }}
    >
      <Typography
        sx={{
          color: "#111",
          fontSize: "22px",
          fontStyle: "normal",
          fontWeight: 700,
          mb: "10px",
        }}
      >
        {" "}
        Transactions
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "700" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptoTransaction.map((crypto) => (
              <TableRow key={crypto.type}>
                <TableCell
                  sx={{
                    fontSize: "12px",
                    color: "#111",

                    // fontFamily: { Satoshi },
                  }}
                >
                  {crypto.type}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "12px",
                    color: "#111",
                    // fontFamily: { Satoshi },
                  }}
                >
                  {crypto.amount}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "12px",
                    color: Color[crypto.status],
                    background: bgColor[crypto.status],
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  {crypto.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionTable;
