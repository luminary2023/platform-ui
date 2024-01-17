"use client";
import React, { useState } from "react";
import Image from "next/image";
import WaitingIcon from "../../../assets/images/waitingIcon.svg";
import styles from "./giftcard.module.css";
import { Button } from "@/components/Button/Button";
import EmailVerified from "@/components/CreateAccount/emailVerified";
import Amazon from "../../../assets/images/Amazon.svg";
import { useRouter } from "next/router";
import { Modal, Box } from "@mui/material";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};
interface SummaryProps {
  backToHomeClick: () => void;
  open: boolean;
  onClose: () => void;
  nairaRate: any;
  giftcardQuantity: any;
  cardAmount: any;
  receiveValue: any;
  handleSellGiftcard: () => void;
  loading: any;
  success: boolean;
  errs: any;
  error: boolean;
  cardImage: any;
  cardName: string;
}

export default function SummaryModal({
  open,
  onClose,
  backToHomeClick,
  nairaRate,
  giftcardQuantity,
  cardAmount,
  receiveValue,
  handleSellGiftcard,
  loading,
  success,
  errs,
  error,
  cardImage,
  cardName,
}: SummaryProps) {
  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {error && (
            <Toast
              text={errs?.message}
              success={
                errs?.message === "Place giftcard sell order successfully."
              }
              marginBottom={40}
              color={
                errs?.message === "Place giftcard sell order successfully."
                  ? "green"
                  : "DF1111"
              }
              border={
                errs?.message === "Place giftcard sell order successfully."
                  ? "1px solid green"
                  : "1px solid #DF1111"
              }
            />
          )}

          {success ? (
            <EmailVerified
              title={"Wait for Verification"}
              subTitle={`NGN${receiveValue} worth of ${cardName} sold.`}
              routerPath={""}
              btnOnClick={backToHomeClick}
              icon={WaitingIcon}
              btnText="Back to Home"
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={cardImage} alt={"giftcard"} width={150} height={100} />
              <p className={styles.tableTitle} style={{ marginTop: 36 }}>
                {cardName} Gift Card
              </p>
              <div className={styles.summaryWrapper}>
                <div className={styles.summaryDetailsWrapper}>
                  <p
                    className={styles.summaryDetails}
                    style={{ marginRight: 31 }}
                  >
                    Card Unit:{" "}
                  </p>
                  <p
                    className={styles.summaryDetails}
                    style={{ fontFamily: "Satoshi Bold" }}
                  >
                    {cardAmount}
                  </p>
                </div>
                <div className={styles.summaryDetailsWrapper}>
                  <p
                    className={styles.summaryDetails}
                    style={{ marginRight: 40 }}
                  >
                    Quantity:{" "}
                  </p>
                  <p
                    className={styles.summaryDetails}
                    style={{ fontFamily: "Satoshi Bold" }}
                  >
                    {giftcardQuantity}
                  </p>
                </div>
                <div className={styles.summaryDetailsWrapper}>
                  <p
                    className={styles.summaryDetails}
                    style={{ marginRight: 40 }}
                  >
                    Rate:{" "}
                  </p>
                  <p
                    className={styles.summaryDetails}
                    style={{ fontFamily: "Satoshi Bold" }}
                  >
                    {nairaRate}
                  </p>
                </div>
                <div className={styles.summaryLine}></div>
                <div className={styles.summaryDetailsWrapper}>
                  <p
                    className={styles.summaryDetails}
                    style={{ marginRight: 40 }}
                  >
                    Total:{" "}
                  </p>
                  <p
                    className={styles.summaryDetails}
                    style={{ fontFamily: "Satoshi Bold" }}
                  >
                    NGN {receiveValue}
                  </p>
                </div>
              </div>
              <div className={styles.summaryButtonWrapper}>
                <Button
                  color="primary"
                  type="submit"
                  onClick={backToHomeClick}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    height: "55px",
                    margintTop: "8px",
                    background: "rgba(235, 87, 87, 0.10)",
                    width: "40%",
                    color: "#DC3545",
                  }}
                >
                  Cancel trade{" "}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={handleSellGiftcard}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    height: "55px",
                    margintTop: "8px",
                    width: "40%",
                  }}
                >
                  {loading ? <Loading /> : "Pay to wallet"}
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
