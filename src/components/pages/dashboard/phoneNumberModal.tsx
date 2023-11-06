import { FC, useEffect, useState, memo } from "react";
import { Box, Typography, Modal, Alert } from "@mui/material";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneNumberProps } from "@/services/interfaces";
import { verifyPhoneNumber } from "@/services/schemaVarification";
import Loading from "@/components/Loading";
import OtpInput from "@/components/OtpInput/otpInput";
import backArrow from "../../../assets/images/arrow-left.svg";

import Image from "next/image";
import { useRouter } from "next/router";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "50%", lg: 450, xl: 450 },
  bgcolor: " #fff",
  border: "none",
  borderRadius: "24px",
  padding: {
    xs: "40px 40px 40px 40px",
    sm: "40px 40px 40px 40px",
    lg: "40px 60px 40px 60px",
    xl: "40px 60px 40px 60px",
  },
  outline: "none",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const PhoneNumberModal: FC<Props> = ({ open, onClose }) => {
  const router = useRouter();
  const reload = () => window.location.reload();
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState("");
  const onChange = (value: string) => setOtp(value);
  const [phoneNumberVerification, setPhoneNumberVerification] = useState(true);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    unregister,
    formState: { errors },
  } = useForm<phoneNumberProps>({
    resolver: zodResolver(verifyPhoneNumber),
  });

  const handlePhoneNumber = async (data: phoneNumberProps) => {
    setLoading(true);
    console.log(data);
    setPhoneNumberVerification(false);
    setLoading(false);
  };

  const handleOnClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      // onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {phoneNumberVerification ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h1"
                sx={{
                  fontFamily: "Satoshi Bold",
                  fontSize: { xs: "14px", sm: "18px", lg: "20px", xl: "20px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px;",
                }}
              >
                Phone number verification
              </Typography>{" "}
              <Typography sx={{ cursor: "pointer" }} onClick={handleOnClose}>
                X
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(handlePhoneNumber)}>
              <Input
                type="text"
                placeholder={"Enter phone number"}
                maxLength={"11"}
                aria-label="Demo number input"
                // label="Phone number"
                marginBottom={"20px"}
                labelColor={"#081630"}
                labelSize={"16px"}
                marginTop={"12px"}
                register={{ ...register("phoneNumber") }}
                borderColor={errors.phoneNumber?.message ? "#DF1111" : ""}
                onKeyPress={(event: any) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />

              <Button
                color="primary"
                variant={"contained"}
                // disabled={phoneNumber?.length < 9}
                sx={{
                  textTransform: "initial",
                  color: "#fff",
                  fontFamily: " Satoshi Light",
                  fontSize: "13px",
                  borderRadius: "10px",
                  width: "100%",
                  height: "38px",
                  background: "#505050",
                }}
                type="submit"
              >
                {loading ? <Loading /> : "Verify number"}
              </Button>
            </form>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                mb: "5px",
              }}
            >
              <Image
                src={backArrow}
                alt="back"
                onClick={() => {
                  setPhoneNumberVerification(true);
                }}
                style={{ cursor: "pointer" }}
              />
              <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
                Phone number verification
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#667085",
                fontFamily: "Satoshi Light",
                fontSize: { xs: "14px", sm: "14px", lg: "16px", xl: "16px" },
                textAlign: "center",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
                marginBottom: "16px",
              }}
            >
              Code has been sent to your number{" "}
            </Typography>
            <OtpInput value={otp} valueLength={6} onChange={onChange} />
            <Button
              color="primary"
              variant={"contained"}
              // disabled={phoneNumber?.length < 9}
              sx={{
                textTransform: "initial",
                color: "#fff",
                fontFamily: " Satoshi Light",
                fontSize: "13px",
                borderRadius: "10px",
                width: "100%",
                height: "38px",
                background: "#505050",
                marginTop: "20px",
              }}
              type="submit"
            >
              {loading ? <Loading /> : "Verify number"}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};
export default PhoneNumberModal;
