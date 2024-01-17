"use client";

import Box from "@mui/material/Box";
import { Button } from "../../../components/Button/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellCryptoSchema } from "@/services/schemaVarification";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";
import { useState } from "react";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  payValue: any;
  network: any;
  asset: any;
  receiveValue: any;
  sellCrypto: any;
  handleFile: any;
  loading: boolean;
  setError: any;
  error: boolean;
  errs: any;
  image: any;
  setImage: any;
}

interface SellCryptoProps {
  assetId: string;
  networkId: string;
  assetAmount: string;
  proof: string;
  transactionPin: string;
  comment: string;
  image: any;
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
  overflow: "scroll",
};

export default function UploadImage({
  open,
  onClose,
  image,
  sellCrypto,
  handleFile,
  setError,
  loading,
  error,
  errs,
  setImage,
}: Props) {
  const {
    reset,
    formState: { errors },
  } = useForm<SellCryptoProps>({
    resolver: zodResolver(sellCryptoSchema),
  });

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {error && (
            <Toast
              text={errs?.message || errs?.errors?.message}
              success={
                errs?.message === "Place crypto sell order successfully."
              }
              marginBottom={40}
              border={
                errs?.message === "Place crypto sell order successfully."
                  ? "1px solid green"
                  : "1px solid #DF1111"
              }
            />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
              Upload transaction proof
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: 500,
                float: "right",
                cursor: "pointer",
              }}
              onClick={() => {
                onClose(), reset(), setImage(""), setError(false);
              }}
            >
              X
            </Typography>
          </Box>
          <input
            type="file"
            name="image"
            onChange={handleFile}
            accept="image/*"
            style={{
              marginTop: "25px",
              marginBottom: "25px",
            }}
          />

          <img
            src={image}
            width={150}
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent: "center",
              margin: "auto",
            }}
          />

          <Button
            color="primary"
            variant="contained"
            sx={{ width: "100%", transform: "initial", mt: "30px" }}
            onClick={sellCrypto}
          >
            {loading ? <Loading /> : "Proceed"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
