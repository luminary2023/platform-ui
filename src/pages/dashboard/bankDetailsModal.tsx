import React, { FC } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Modal,
  SelectChangeEvent,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
          }}
        >
          Bank name
        </Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            displayEmpty
            value={bank}
            onChange={handleChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Chose a bank</em>;
              }

              return selected.join(", ");
            }}
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
            }}
          >
            Bank name
          </Typography>
        </FormControl>
      </Box>
    </Modal>
  );
};
export default BankDetailsModal;
