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
import TradeInfoModal from "@/components/TradeInfoModal";
import Loading from "@/components/Loading";
import { useThemeContext } from "@/api/useContext/store";

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
  const { cryptoTableData, loading } = useThemeContext();

  const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const closeCardInfo = () => {
    setIsOpen(false);
  };
  const [cardInfo, setCardInfo] = useState<any>("");

  const handleTransactionDetails = (crypto: any) => {
    setCardInfo({ ...crypto });
    setIsOpen(true);
    console.log(crypto, "crypto");
  };
  //Pagination //
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const currentPost = cryptoTableData?.slice(firstIndex, lastIndex);

  // const pageNumber = [];
  // const npage = Math.ceil(cryptoTableData.length / recordsPerPage)
  // for (let i = 1; 1 <= Math.ceil(cryptoTableData.length / PrevPage); i++)
  //   pageNumber.push(i);
  // const npage = Math.ceil(cryptoTableData.length / recordsPerPage)
  // const numbers = [...Array(npage + 1).keys()].slice(1)

  return (
    <>
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

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "25px",
              mb: "25px",
            }}
          >
            <Loading />
          </Box>
        ) : (
          <TableContainer>
            {cryptoTableData?.length === 0 ? (
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
                <TableBody sx={{ textAlign: "center", cursor: "pointer" }}>
                  {Array.isArray(currentPost || [])
                    ? (currentPost || [])?.map((crypto: any) => (
                        <TableRow
                          key={crypto.id}
                          onClick={() => handleTransactionDetails(crypto)}
                        >
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
              // showLastButton
              // count={cryptoTableData?.length}
              // defaultPage={currentPage}
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
      </Box>
      <TradeInfoModal
        open={isOpen}
        onClose={closeCardInfo}
        title="Crypto Transaction information"
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
            {cardInfo.asset?.name}
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
          <Typography sx={{ fontSize: "16px" }}>
            {cardInfo.assetAmount}
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
            Network
          </Typography>
          <Typography sx={{ fontSize: "16px" }}>
            {cardInfo.network?.name}
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
            Total Amount
          </Typography>
          <Typography sx={{ fontSize: "16px" }}>
            {cardInfo.payableAmount}
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
          <Typography sx={{ fontSize: "16px", color: Color[cardInfo.status] }}>
            {cardInfo.status}
          </Typography>
        </Box>
      </TradeInfoModal>
    </>
  );
};

export default TransactionTable;
