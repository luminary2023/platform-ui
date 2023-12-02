"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "../../../components/Button/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UploadImage from "./uploadImageModal";

interface Props {
  open: boolean;
  onClose: () => void;
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

export default function BarcodeModal({ open, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
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
            Payment Details{" "}
          </Typography>
          <Typography sx={{ textAlign: "center", color: "#6C757D", mt: 1 }}>
            To complete your purchase
          </Typography>
          <Typography sx={{ textAlign: "center", color: "#6C757D", mt: 1 }}>
            Transfer
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: 700,
              mt: 1,
            }}
          >
            4USSD
          </Typography>
          <Typography sx={{ textAlign: "center", color: "#6C757D", mt: 1 }}>
            To
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: 700,
              mt: 1,
            }}
          >
            TCBtE7jcrtWLnHn3bM9BNgiZrUeqnSf7wX
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "15px",
              fontWeight: 500,
              mt: 1,
              textDecoration: "underline",
            }}
          >
            Copy wallet address
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "#6C757D",
              mt: 1,

              fontSize: "15px",
            }}
          >
            or scan the code below
          </Typography>

          <Button
            color="primary"
            variant="contained"
            sx={{ width: "100%", transform: "initial", mt: "30px" }}
            onClick={() => {
              onClose(), handleOpen();
            }}
          >
            Proceed
          </Button>
        </Box>
      </Modal>
      <UploadImage open={isOpen} onClose={handleClose} />
    </div>
  );
}
