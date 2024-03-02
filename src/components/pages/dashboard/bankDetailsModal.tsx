import { FC, useEffect, useState, memo } from "react";
import { Box, Typography, Modal, Alert } from "@mui/material";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import { bankRequest } from "@/api/bank";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankDetailsProps } from "@/services/interfaces";
import { bankDetails } from "@/services/schemaVarification";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";
import { addBankAccount } from "@/api/addBankAccount";
import { resolveAccount } from "@/api/resolveAccountNumber";

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
  bankAccountTrue: any;
}

interface ErrorProps {
  status: string;
  message: string;
  statusCode: number;
  errors: any;
}

const BankDetailsModal: FC<Props> = ({ open, onClose, bankAccountTrue }) => {
  const reload = () => window.location.reload();
  const [loading, setLoading] = useState<boolean>(false);
  const [banks, setBanks] = useState<[]>([]);
  const [accountBankName, setAccountBankName] = useState<BankDetailsProps>();
  const [error, setError] = useState<boolean>(false);
  const [errs, setErrs] = useState<ErrorProps>({
    status: "",
    message: "",
    statusCode: 0,
    errors: "",
  });

  const {
    handleSubmit,
    register,
    reset,
    watch,
    unregister,
    formState: { errors },
  } = useForm<BankDetailsProps>({
    resolver: zodResolver(bankDetails),
  });

  const SaveAccountDetails = async (data: BankDetailsProps) => {
    setLoading(true);
    const res = await addBankAccount(data);
    setLoading(false);
    bankAccountTrue();
    setError(false);
    setErrs(res);
    setError(true);
    reset();
    setTimeout(async () => {
      setError(false);
      onClose();
    }, 1000);

    // reload();
  };

  const fetchBankDetails = async () => {
    try {
      const res = await bankRequest();
      setBanks(res);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };
  const accountNumber = watch("accountNumber");
  const bankId = watch("bankId");

  useEffect(() => {
    fetchBankDetails();
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = { accountNumber, bankId };
        const parseResult = bankDetails.safeParse(data);
        if (parseResult.success) {
          const response = await resolveAccount(data);
          setAccountBankName(response);
          setLoading(false);
        }
      } catch (error: any) {
        error?.response?.data;
      }
    };

    fetchData();
  }, [accountNumber, bankId]);
  const handleAccountBankName = () => {
    setError(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h1"
          sx={{
            fontFamily: "Satoshi Bold",
            fontSize: { xs: "20px", sm: "22px", lg: "24px", xl: "24px" },
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "28px;",
            marginBottom: "16px",
          }}
        >
          Add your bank details{" "}
        </Typography>
        {/* <Typography
          sx={{
            color: "#667085",
            fontFamily: "Satoshi Light",
            fontSize: { xs: "14px", sm: "14px", lg: "16px", xl: "16px" },

            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          Add your bank details{" "}
        </Typography> */}
        {error && (
          <Toast
            text={errs?.errors?.[0].message || errs?.message}
            success={errs?.message === "Bank account added successfully."}
            marginBottom={40}
            color={
              errs.message === "Bank account added successfully."
                ? "green"
                : "DF1111"
            }
            border={
              errs.message === "Bank account added successfully."
                ? "1px solid green"
                : "1px solid #DF1111"
            }
          />
        )}

        <form onSubmit={handleSubmit(SaveAccountDetails)}>
          <Typography
            sx={{
              color: "#344054",
              fontFamily: "Satoshi Light",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
              marginBottom: "8px",
            }}
          >
            Bank name
          </Typography>

          <select
            style={{
              width: "100%",
              height: "45px",
              borderRadius: "10px",
              paddingLeft: "8px",
              paddingRight: "8px",
              borderColor: "gray",
              color: "#667085",
            }}
            {...register("bankId")}
            placeholder="Choose a bank"
            onClick={fetchBankDetails}
          >
            <option value="">{loading ? "loading... " : "Choose bank"}</option>
            {banks?.map((bank: any) => (
              <option value={bank.id} key={bank.id} placeholder="Choose a bank">
                {bank.name}
              </option>
            ))}
          </select>

          <Input
            type="text"
            placeholder={"Account number"}
            maxLength="10"
            label="Bank account number"
            marginBottom={"8px"}
            labelColor={"#081630"}
            labelSize={"16px"}
            marginTop={"12px"}
            register={{ ...register("accountNumber") }}
            borderColor={
              errors.accountNumber?.message
                ? "#DF1111"
                : accountNumber?.length === 10 && !accountBankName?.accountName
                ? "red"
                : ""
            }
            onKeyPress={(event: any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {accountNumber &&
          accountNumber.length === 10 &&
          bankId &&
          accountBankName?.accountName ? (
            <Input
              placeholder={"Account name"}
              type="text"
              value={accountBankName?.accountName}
              readOnly={true}
              label="Account name"
              marginBottom={"8px"}
              labelColor={"#081630"}
              labelSize={"16px"}
              marginTop={"12px"}
              bgColor="#EBEDF2"
            />
          ) : (
            ""
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                lg: "row",
                xl: "row",
              },
              justifyContent: "space-between",
              marginTop: "40px",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Button
              color="secondary"
              variant={"contained"}
              onClick={() => {
                handleAccountBankName(), reset();
              }}
              sx={{
                textTransform: "initial",
                color: "#000",
                fontFamily: " Satoshi Light",
                fontSize: "13px",
                borderRadius: "29px",
                border: "1px solid  #000",
                width: "155px",
                height: "38px",
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant={"contained"}
              disabled={
                !accountNumber ||
                accountNumber?.length != 10 ||
                !bankId ||
                !accountBankName?.accountName
              }
              sx={{
                textTransform: "initial",
                color: "#fff",
                fontFamily: " Satoshi Light",
                fontSize: "13px",
                borderRadius: "29px",
                width: "160px",
                height: "38px",
                background: "#505050",
              }}
              type="submit"
            >
              {loading ? <Loading /> : "Save account details"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
export default BankDetailsModal;
