"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "../../../components/Button/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageUploading from "react-images-uploading";
import { sellCryptoApi } from "@/api/sellCrypto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellCryptoSchema } from "@/services/schemaVarification";

interface Props {
  open: boolean;
  onClose: () => void;
  payValue: any;
  network: any;
  asset: any;
  receiveValue: any;
  sellCrypto: any;
  handleFile: any;
  image: any;
}

interface SellCryptoProps {
  assetId: string;
  networkId: string;
  assetAmount: string;
  proof: string;
  transactionPin: string;
  comment: string;
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
  payValue,
  network,
  asset,
  receiveValue,
  sellCrypto,
  handleFile,
  image,
}: Props) {
  // const [images, setImages] = useState([]);
  const maxNumber = 3;

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<SellCryptoProps>({
    resolver: zodResolver(sellCryptoSchema),
  });
  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              onClick={onClose}
            >
              X
            </Typography>
          </Box>
          <input type="file" name="image" onChange={handleFile} />

          <Button
            color="primary"
            variant="contained"
            sx={{ width: "100%", transform: "initial", mt: "30px" }}
            onClick={sellCrypto}
          >
            Proceed
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
