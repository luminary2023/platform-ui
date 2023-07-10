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
// import Stack from '@mui/material/Stack';
// import GtBank from '../../assets/images/gtbank.svg'
import Tag from "../Tag";

interface AppTableProps {
  tableHeaderData: any;
}

function createData(
  date: string,
  beneficiary: string,
  bank: string,
  country: string,
  amount: string,
  status: string
) {
  return { date, beneficiary, bank, country, amount, status };
}

const rows = [
  createData(
    "6/19/14",
    "Cameron Williamson",
    "Guaranty Trust Bank",
    "Nigeria",
    "120,000",
    "completed"
  ),
  createData(
    "6/19/14",
    "Cameron Williamson",
    "Guaranty Trust Bank",
    "Nigeria",
    "120,000",
    "completed"
  ),
  createData(
    "6/19/14",
    "Cameron Williamson",
    "Guaranty Trust Bank",
    "Nigeria",
    "120,000",
    "completed"
  ),
  createData(
    "6/19/14",
    "Cameron Williamson",
    "Guaranty Trust Bank",
    "Nigeria",
    "120,000",
    "completed"
  ),
  createData(
    "6/19/14",
    "Cameron Williamson",
    "Guaranty Trust Bank",
    "Nigeria",
    "120,000",
    "completed"
  ),
];

// const title = () => {
//   switch (route) {
//     case "newMessage":
//       return "New Message"
//     case "newContact":
//       return "New Contact"
//     case "importContacts":
//       return "Import Contacts"
//     case "newContactGroup":
//       return "New Contact Group"
//     default:
//       return ""
//   }
// }

const AppTable: React.FC<AppTableProps> = ({ tableHeaderData }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              borderRadius: "8px 8px 0px 0px",
              background: "#F6F6F6",
              // width: '100%'
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
            {rows.map((row) => (
              <TableRow
                key={row.date}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
                  }}
                >
                  {row.beneficiary}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Satoshi Regular",
                  }}
                >
                  {row.bank}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#787389",
                    fontFamily: "Satoshi Regular",
                  }}
                >
                  {row.country}
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
                <TableCell>
                  <Tag type="link" />
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

export default AppTable;

// const rows = ["6/9/14", "Cameron", "gt", "Nigeria", "120,000", "completed"];
