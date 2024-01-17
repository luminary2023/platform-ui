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

interface Props {
  open: boolean;
  onClose: () => void;
  payValue: any;
  network: any;
  asset: any;
  receiveValue: any;
  handleCryptoModal: any;
}

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
          {success ? (
            <EmailVerified
              title={"Wait for Verification"}
              subTitle={"NGN150,000 worth of Amazon Giftcard sold."}
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
              <Image src={Amazon} alt={"giftcard"} />
              <p className={styles.tableTitle} style={{ marginTop: 36 }}>
                Amazon Gift Card
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
