import React, { FC } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Modal,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: " #fff",
  border: "none",
  borderRadius: "24px",
  padding: "40px 60px 40px 60px",
  outline: "none",
};
const banks = [
  "Gtb",
  "Uba",
  "First Bank",
  "Access",
  "Fidelity",
  "Unity",
  "Zenith",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const BankDetailsModal: FC<Props> = ({ open, onClose }) => {
  const [bank, setBank] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof bank>) => {
    const {
      target: { value },
    } = event;
    setBank(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h1"
          sx={{
            fontFamily: "Satoshi Bold",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "28px;",
          }}
        >
          Add your bank details{" "}
        </Typography>
        <Typography
          sx={{
            color: "#667085",
            fontFamily: "Satoshi Light",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          Add your bank details{" "}
        </Typography>
        <Typography
          sx={{
            color: "#344054",
            fontFamily: "Satoshi Light",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "20px",
            marginBottom: "8px",
          }}
        >
          Bank name
        </Typography>
        <Select
          value={bank}
          onChange={handleChange}
          placeholder="Choose a bank"
          sx={{ height: "40px", width: "100%", marginBottom: "24px" }}
        >
          {banks.map((bank, index) => (
            <MenuItem key={index} value={bank}>
              {bank}
            </MenuItem>
          ))}
        </Select>
        <Typography
          sx={{
            color: "#344054",
            fontFamily: "Satoshi Light",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "20px",
            marginBottom: "8px",
          }}
        >
          Bank account number
        </Typography>
        <Input type="number" placeholder={"Account number"} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <Button
            color="secondary"
            variant={"contained"}
            onClick={onClose}
            sx={{
              textTransform: "initial",
              color: "#000",
              fontFamily: " Satoshi Light",
              fontSize: "13px",
              borderRadius: "29px",
              border: "1px solid  #000",
              width: "155px",
              height: "38px",
            }}
          >
            Cancle
          </Button>
          <Button
            color="primary"
            variant={"contained"}
            sx={{
              textTransform: "initial",
              color: "#fff",
              fontFamily: " Satoshi Light",
              fontSize: "13px",
              borderRadius: "29px",
              width: "160px",
              height: "38px",
              background: "#505050",
            }}
          >
            Save account details
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default BankDetailsModal;
