"use client";
import { useEffect, useState, FC } from "react";
import ProfileSettings from "../index";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import backArrow from "../../../assets/images/arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { userAccountDetails } from "@/api/userAccountDetails";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteAccount } from "@/api/deleteAccount";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  p: 4,
};
interface Props {
  id: any;
}
const BankInformation: FC<Props> = ({ id }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);

  const [bankId, setBankId] = useState("");
  const [bankDetails, setBankDetails] = useState<any[]>([]);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setBankId("");
    setOpenModal(false);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: any) => {
    setBankId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleBankDetails = async () => {
    try {
      const response = await userAccountDetails();
      setBankDetails(response);
    } catch (error: any) {
      return error?.response?.data;
    }
  };
  useEffect(() => {
    handleBankDetails();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const response = await DeleteAccount(bankId);
      setBankDetails(response);
      await handleBankDetails();
      await handleClose();
      await handleCloseMenu();
    } catch (error: any) {
      return error?.response?.data;
    }
  };

  return (
    <>
      <ProfileSettings>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            mb: "25px",
          }}
        >
          <Image
            src={backArrow}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
            Bank Information{" "}
          </Typography>
        </Box>

        {bankDetails.map((bank: any) => (
          <Box
            key={bank.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #DADADA",
              mb: "20px",
            }}
          >
            <Box>
              <Box
                sx={{
                  mb: "8px",
                  fontFamily: "sans-serif",
                }}
              >
                {bank.bank.name}
              </Box>
              <Box
                sx={{
                  color: "#AFAFAF",
                  fontFamily: "sans-serif",
                }}
              >
                {bank.accountName}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  fontFamily: "sans-serif",
                }}
              >
                {bank.accountNumber}
              </Box>

              <Box>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, bank.id)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleOpenModal}>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        ))}
      </ProfileSettings>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ textAlign: "center", fontSize: "20px", fontWeight: "700" }}
          >
            Delete Bank Details
          </Typography>
          <Typography
            sx={{ mt: 2, textAlign: "center", fontSize: "15px", mb: 2 }}
          >
            Are you sure you want to delete this bank details
          </Typography>
          <Button
            onClick={() => handleDeleteAccount()}
            color="success"
            variant="contained"
            type="submit"
            fullWidth={true}
          >
            Delete
          </Button>
          <Typography
            onClick={() => handleClose()}
            sx={{
              mt: 2,
              textAlign: "center",
              fontSize: "15px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            No, return to settings
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default BankInformation;
