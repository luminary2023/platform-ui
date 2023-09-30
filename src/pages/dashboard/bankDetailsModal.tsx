import { FC, useEffect, useState, memo } from "react";
import { Box, Typography, Modal, Alert } from "@mui/material";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import { bankRequest } from "@/api/bank";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankDetailsProps } from "@/services/interfaces";
import { saveBankDetails } from "@/api/saveBankDetails";
import { bankDetails } from "@/services/schemaVarification";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "95%", lg: 450, xl: 450 },
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

const BankDetailsModal: FC<Props> = ({ open, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [banks, setBanks] = useState<[]>([]);
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
    formState: { errors },
  } = useForm<BankDetailsProps>({
    resolver: zodResolver(bankDetails),
  });
  const SaveAccountDetails = async (data: BankDetailsProps) => {
    console.log("This is not working", data);
  };

  const fetchBankDetails = async () => {
    try {
      setLoading(true);
      const res = await bankRequest();
      setBanks(res);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    fetchBankDetails();
  }, []);

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
          }}
        >
          Add your bank details{" "}
        </Typography>
        <Typography
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
        </Typography>

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
        <form onSubmit={handleSubmit(SaveAccountDetails)}>
          {/* <select
            // {...register("bankId")}
            style={{
              width: "100%",
              height: "45px",
              borderRadius: "10px",
              paddingLeft: "8px",
              paddingRight: "8px",
              borderColor: "gray",
            }}
          >
            {banks?.map((bank: any) => (
              <option
                value={bank.id}
                key={bank.id}
                placeholder="Choose a bank"
                {...register("bankId")}
              >
                {bank.name}
              </option>
            ))}
          </select> */}

          <Input
            type="text"
            inputmode="numeric"
            placeholder={"Account number"}
            label="Bank account number"
            marginBottom={"8px"}
            labelColor={"#081630"}
            labelSize={"16px"}
            marginTop={"12px"}
            register={{ ...register("accountNumber") }}
            borderColor={errors.accountNumber?.message ? "#DF1111" : ""}
          />
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
              onClick={onClose}
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
              Cancle
            </Button>
            <Button
              color="primary"
              variant={"contained"}
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
              Save account details
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
export default BankDetailsModal;
