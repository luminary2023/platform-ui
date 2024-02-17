"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "../../../components/Button/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BarcodeModal from "./cryptoBarcodeModal";

interface Props {
  open: boolean;
  onClose: () => void;
  payValue: any;
  network: any;
  asset: any;
  receiveValue: any;
  handleCryptoModal: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function CryptoModal({
  open,
  onClose,
  payValue,
  network,
  asset,
  receiveValue,
  handleCryptoModal,
}: Props) {
  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: 500,
              float: "right",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            X
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: "20px", fontWeight: 700 }}
          >
            Confirm Sale
          </Typography>
          <Typography sx={{ textAlign: "center", color: "#6C757D", mt: 1 }}>
            Confirm the details of your trade
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "15px",
            }}
          >
            <Typography sx={{ color: "#6C757D", fontSize: "14px" }}>
              Asset
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>{asset?.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "15px",
            }}
          >
            <Typography sx={{ color: "#6C757D", fontSize: "14px" }}>
              Network
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>{network?.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "15px",
            }}
          >
            <Typography sx={{ color: "#6C757D", fontSize: "14px" }}>
              You Send
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>{payValue}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "15px",
            }}
          >
            <Typography sx={{ color: "#6C757D", fontSize: "14px" }}>
              You Get
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>N{receiveValue}</Typography>
          </Box>
          <Button
            color="primary"
            variant="contained"
            sx={{ width: "100%", transform: "initial", mt: "30px" }}
            onClick={() => {
              onClose(), handleCryptoModal();
            }}
          >
            Proceed
          </Button>
        </Box>
      </Modal>
      {/* <BarcodeModal open={isOpen} onClose={handleClose} /> */}
    </div>
  );
}
