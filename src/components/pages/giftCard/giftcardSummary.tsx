"use client";
import React, { useState } from "react";
import Image from "next/image";
import WaitingIcon from "../../../assets/images/waitingIcon.svg";
import styles from "./giftcard.module.css";
import { Button } from "@/components/Button/Button";
import EmailVerified from "@/components/CreateAccount/emailVerified";
import Amazon from "../../../assets/images/Amazon.svg";
import { useRouter } from "next/router";

interface SummaryProps {
  backToHomeClick: () => void;
}

const GiftcardSummary: React.FC<SummaryProps> = ({ backToHomeClick }) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  return (
    <>
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
              <p className={styles.summaryDetails} style={{ marginRight: 31 }}>
                Card Unit:{" "}
              </p>
              <p
                className={styles.summaryDetails}
                style={{ fontFamily: "Satoshi Bold" }}
              >
                50
              </p>
            </div>
            <div className={styles.summaryDetailsWrapper}>
              <p className={styles.summaryDetails} style={{ marginRight: 40 }}>
                Quantity:{" "}
              </p>
              <p
                className={styles.summaryDetails}
                style={{ fontFamily: "Satoshi Bold" }}
              >
                2
              </p>
            </div>
            <div className={styles.summaryLine}></div>
            <div className={styles.summaryDetailsWrapper}>
              <p className={styles.summaryDetails} style={{ marginRight: 40 }}>
                Total:{" "}
              </p>
              <p
                className={styles.summaryDetails}
                style={{ fontFamily: "Satoshi Bold" }}
              >
                NGN 150,000
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
              onClick={() => setSuccess(true)}
              sx={{
                borderRadius: "10px",
                textTransform: "capitalize",
                height: "55px",
                margintTop: "8px",
                width: "40%",
              }}
            >
              Pay from wallet{" "}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default GiftcardSummary;
