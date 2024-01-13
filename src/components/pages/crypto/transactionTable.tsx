"use client";
import { FC, useEffect, useState } from "react";
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cryptoTable } from "@/api/cryptoTable";

const Color: Record<string, string> = {
  Transferred: "#F7931A",
  Error: "#E73434",
  Completed: "#5FDA24",
  Pending: "#6338DC",
};
const bgColor: Record<string, string> = {
  Transferred: "#FFF4E7",
  Error: "#FFE9E9",
  Completed: "#E8FFDD",
  Pending: "#F4F0FF",
};

const TransactionTable = () => {
  const [cryptoTableData, setCryptoTableData] = useState<any[]>([]);

  //Pagination //
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentPost = cryptoTableData.slice(firstIndex, lastIndex);

  // const pageNumber = [];
  // const npage = Math.ceil(cryptoTableData.length / recordsPerPage)
  // for (let i = 1; 1 <= Math.ceil(cryptoTableData.length / PrevPage); i++)
  //   pageNumber.push(i);
  // const npage = Math.ceil(cryptoTableData.length / recordsPerPage)
  // const numbers = [...Array(npage + 1).keys()].slice(1)

  const cryptoTransactions = async () => {
    const response = await cryptoTable();
    setCryptoTableData(response);
  };
  useEffect(() => {
    cryptoTransactions();
  }, []);
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
        {cryptoTableData.length === 0 || cryptoTableData.length === null ? (
          <Typography
            sx={{
              fontSize: "13px",
              textAlign: "center",
              mt: "15px",
              mb: "15px",
              textDecoration: "underline",
            }}
          >
            No transaction yet
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "700" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: "700" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: "700" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ textAlign: "center" }}>
              {Array.isArray(currentPost || [])
                ? (currentPost || [])?.map((crypto) => (
                    <TableRow key={crypto.id}>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          color: "#111",
                        }}
                      >
                        {crypto.asset?.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          color: "#111",
                        }}
                      >
                        {crypto.assetAmount}
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
                  ))
                : ""}
            </TableBody>
          </Table>
        )}
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
            justifyContent: "space-between",
          }}
          onChange={(_, newPage) => setCurrentPage(newPage)}
        />
      </TableContainer>
    </Box>
  );
};

export default TransactionTable;
