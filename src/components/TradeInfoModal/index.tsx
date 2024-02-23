"use client";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellCryptoSchema } from "@/services/schemaVarification";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
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
  //   overflow: "scroll",
};

export default function TradeInfoModal({
  open,
  onClose,
  children,
  title,
}: Props) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "8px",
            }}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
              {title}
            </Typography>
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
          </Box>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
