import { Typography, Box, Modal } from "@mui/material";
import { FC } from "react";
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/router";
import SuccessIcon from "../../assets/images/successIcon.svg";
import Image from "next/image";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "16px",
  p: 4,
  boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.05)",
};

interface Props {
  open: boolean;
  onClose: () => void;
}
const SuccessModal: FC<Props> = ({ open, onClose }) => {
  const router = useRouter();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Image
          src={SuccessIcon}
          alt="success"
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        />
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: 700,
            color: "#1F2739;",
            mb: "16px",
          }}
        >
          Withdraw successful.
        </Typography>

        <Button
          fullWidth={true}
          color="primary"
          variant="contained"
          onClick={() => router.push("/wallet")}
        >
          Back to home
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
