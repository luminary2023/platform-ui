"use client";
import React, { useState } from "react";
import ProfileSettings from "../index";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import backArrow from "../../../assets/images/arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeTransactionPinProps } from "@/services/interfaces";
import { changeTransactionPinValidation } from "@/services/schemaVarification";
import { ChangeTransactionPin } from "@/api/changeTransactionPin";
import Toast from "@/components/Toast";
import ChangePasswordForm from "./changePasswordForm";
import Loading from "@/components/Loading";

const Security = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [changePin, setChangePin] = useState<any>({});
  const [error, setError] = useState<boolean>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ChangeTransactionPinProps>({
    resolver: zodResolver(changeTransactionPinValidation),
  });

  const handleChangeTransactionPin = async (data: {
    newPin: number;
    currentPin: number;
  }) => {
    try {
      setLoading(true);
      const response = await ChangeTransactionPin(data);
      setChangePin(response);
      setLoading(false);
      setError(true);
    } catch (error: any) {
      error?.response?.data;
    }
  };

  return (
    <>
      <ProfileSettings>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { md: 10, lg: 10, xs: 5 },
            mb: "25px",
          }}
        >
          <Image
            src={backArrow}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          <Typography
            sx={{
              fontWeight: "700",
              backgroundImage: ` var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Login & Security{" "}
          </Typography>
        </Box>
        <div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              background: "transparent",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              onClick={() => {
                setError(false), reset();
              }}
            >
              <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
                Change Transaction Pin
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={handleSubmit(handleChangeTransactionPin)}>
                {error && (
                  <Toast
                    text={changePin?.message}
                    success={
                      changePin?.message ===
                      "Changed transaction pin successfully."
                    }
                    marginBottom={40}
                    color={
                      changePin.message ===
                      "Changed transaction pin successfully."
                        ? "green"
                        : "DF1111"
                    }
                    border={
                      changePin.message ===
                      "Changed transaction pin successfully."
                        ? "1px solid green"
                        : "1px solid #DF1111"
                    }
                  />
                )}
                <Input
                  type={"password"}
                  maxLength="4"
                  label="Enter Current PIN"
                  bgColor={"#F2F2F2"}
                  marginBottom={"8px"}
                  labelColor={"#081630"}
                  labelSize={"16px"}
                  register={{ ...register("currentPin") }}
                  borderColor={errors.currentPin?.message ? "#DF1111" : ""}
                  onKeyPress={(event: any) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />

                <Input
                  type={"password"}
                  maxLength="4"
                  label="Enter New PIN"
                  bgColor={"#F2F2F2"}
                  marginBottom={"8px"}
                  labelColor={"#081630"}
                  labelSize={"16px"}
                  register={{ ...register("newPin") }}
                  borderColor={errors.newPin?.message ? "#DF1111" : ""}
                  onKeyPress={(event: any) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />

                <Input
                  type={"password"}
                  label="Confirm PIN"
                  maxLength="4"
                  bgColor={"#F2F2F2"}
                  marginBottom={"8px"}
                  labelColor={"#081630"}
                  labelSize={"16px"}
                  register={{ ...register("confirmPin") }}
                  borderColor={errors.confirmPin?.message ? "#DF1111" : ""}
                  onKeyPress={(event: any) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    textTransform: "capitalize",
                    mt: "10px",
                  }}
                >
                  {loading ? <Loading /> : "Update"}
                </Button>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{
              background: "transparent",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
                Change Password
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ChangePasswordForm />
            </AccordionDetails>
          </Accordion>
        </div>
      </ProfileSettings>
    </>
  );
};

export default Security;
