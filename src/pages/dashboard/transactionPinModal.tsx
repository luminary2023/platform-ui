import { FC, useEffect, useState, memo } from "react";
import { Box, Typography, Modal, Alert } from "@mui/material";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import { bankRequest } from "@/api/bank";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankDetailsProps, TransactionPinProps } from "@/services/interfaces";
import { bankDetails, transactionPin } from "@/services/schemaVarification";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";
import { addBankAccount } from "@/api/addBankAccount";
import { resolveAccount } from "@/api/resolveAccountNumber";
import { createTransactionPin } from "@/api/createTransactionPin";

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

interface ErrorProps {
  status: string;
  message: string;
  statusCode: number;
  errors: any;
}

const TransactionPinModal: FC<Props> = ({ open, onClose }) => {
  const reload = () => window.location.reload();
  const [loading, setLoading] = useState<boolean>(false);
  const [createPin, setCreatePin] = useState<any>({});
  const [error, setError] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    unregister,
    formState: { errors },
  } = useForm<TransactionPinProps>({
    resolver: zodResolver(transactionPin),
  });

  const handleTransactionPin = async (data: TransactionPinProps) => {
    try {
      setLoading(true);
      const response = await createTransactionPin(data);
      setCreatePin(response);
      setError(true);
      setLoading(false);

      if (createPin?.message === "Transaction pin is set successfully.") {
        setTimeout(async () => {
          onClose();
        }, 1500);
      }
      // reload();
    } catch (error: any) {
      return error?.response?.data;
    }
    // setLoading(true);
  };

  const handleOnClose = () => {
    onClose();
    setError(false);
    reset();
  };

  return (
    <>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* {createPin?.length >= 0 ? ( */}
          <>
            {createPin.length}
            {error && (
              <Toast
                text={createPin?.message}
                success={
                  createPin?.message === "Transaction pin is set successfully."
                }
                marginBottom={40}
                color={
                  createPin?.message === "Transaction pin is set successfully."
                    ? "green"
                    : "DF1111"
                }
                border={
                  createPin?.message === "Transaction pin is set successfully."
                    ? "1px solid green"
                    : "1px solid #DF1111"
                }
              />
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "18px",
                justifyItems: "center",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h1"
                sx={{
                  fontFamily: "Satoshi Bold",
                  fontSize: {
                    xs: "20px",
                    sm: "22px",
                    lg: "24px",
                    xl: "24px",
                  },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "28px;",
                  textAlign: "center",
                }}
              >
                Create Transaction Pin
              </Typography>{" "}
              <Typography sx={{ cursor: "pointer" }} onClick={handleOnClose}>
                X
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(handleTransactionPin)}>
              <Input
                type="password"
                placeholder={"Create Pin"}
                maxLength="4"
                label="Create Transaction Pin"
                marginBottom={"20px"}
                labelColor={"#081630"}
                labelSize={"16px"}
                marginTop={"12px"}
                register={{ ...register("pin") }}
                borderColor={errors.pin?.message ? "#DF1111" : ""}
              />
              <Input
                type="password"
                placeholder={"Confirm Pin"}
                maxLength="4"
                label="Confirm Transaction Pin"
                marginBottom={"20px"}
                labelColor={"#081630"}
                labelSize={"16px"}
                register={{ ...register("confirmPin") }}
                borderColor={errors.confirmPin?.message ? "#DF1111" : ""}
              />

              <Button
                color="primary"
                variant={"contained"}
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
                {loading ? <Loading /> : "Create Pin"}
              </Button>
            </form>
          </>
          {/* ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "18px",
                justifyItems: "center",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h1"
                sx={{
                  fontFamily: "Satoshi Bold",
                  fontSize: {
                    xs: "18px",
                    sm: "18px",
                    lg: "20px",
                    xl: "20px",
                  },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "1px;",
                  textAlign: "center",
                }}
              >
                Pin has been added!
              </Typography>{" "}
              <Typography sx={{ cursor: "pointer" }} onClick={handleOnClose}>
                X
              </Typography>
            </Box>
          )} */}
        </Box>
      </Modal>
    </>
  );
};
export default TransactionPinModal;
