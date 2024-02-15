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
import { numberVerificationCode } from "@/api/phoneNumberVerificationCode";
import Toast from "@/components/Toast";
import { ErrorProps } from "@/services/interfaces";
import { PhoneNumberVerification } from "@/api/verifyPhoneNumber";

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
  const [phoneNumberVerification, setPhoneNumberVerification] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<ErrorProps>({
    status: "",
    message: "",
    statusCode: 0,
    errors: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [errs, setErrs] = useState(false);
  const onChange = (value: string) => setOtp(value);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<phoneNumberProps>({
    resolver: zodResolver(verifyPhoneNumber),
  });

  const handlePhoneNumber = async (data: phoneNumberProps) => {
    const payload = {
      phoneNumber: `+234${data.phoneNumber.slice(1)}`,
      verificationCode: data.verificationCode,
    };

    // try {
    setLoading(true);
    const response = await numberVerificationCode(payload);
    setPhoneNumber(response);

    if (response.message === "Verification code sent successfully.") {
      setPhoneNumberVerification(false);
      setError(false);
      setLoading(false);
      sessionStorage.setItem("phoneNumber", data.phoneNumber);
    }
    setLoading(false);
    setPhoneNumber(response);
    setError(true);

    // } catch (error: any) {
    //   return error?.response?.data;
    // }
  };

  const handleOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const number = sessionStorage.getItem("phoneNumber");
    const res = await PhoneNumberVerification({
      phoneNumber: number,
      verificationCode: otp,
    });
    setPhoneNumber(res);
    setError(true);
    setLoading(false);
    setTimeout(async () => {
      setError(false);
      onClose();
    }, 2000);

    sessionStorage.clear();
  };

  const handleOnClose = () => {
    reset();
    onClose();
    setError(false);
    setPhoneNumberVerification(true);
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
            {error && (
              <Toast
                text={phoneNumber?.errors?.[0].message || phoneNumber.message}
                success={phoneNumber?.status === "Success"}
                marginBottom={40}
                color={phoneNumber?.status === "Success" ? "green" : "DF1111"}
                border={
                  phoneNumber?.status === "Success"
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
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  handleOnClose(), reset();
                }}
              >
                X
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(handlePhoneNumber)}>
              <Input
                type="text"
                placeholder={"08100000000"}
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
                  if (!/[0-9 +]/.test(event.key)) {
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
                justifyContent: "space-between",

                // gap: 5,
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
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              > */}
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h1"
                sx={{
                  fontFamily: "Satoshi Bold",
                  fontSize: {
                    xs: "14px",
                    sm: "18px",
                    lg: "20px",
                    xl: "20px",
                  },
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
              {/* </Box> */}
            </Box>
            <Typography
              sx={{
                // color: "green",
                fontFamily: "Satoshi Light",
                fontSize: { xs: "14px", sm: "14px", lg: "16px", xl: "16px" },
                textAlign: "center",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
                marginBottom: "16px",
              }}
              color={`${
                phoneNumber.message === "Verification code sent successfully."
                  ? "green"
                  : phoneNumber.message ===
                    "Your phone number have been verified."
                  ? "green"
                  : "red"
              }`}
            >
              {phoneNumber.message}
            </Typography>
            <form onSubmit={handleOTP}>
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
                Verify
              </Button>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
};
export default PhoneNumberModal;
