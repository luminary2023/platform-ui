"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Modal,
  Box,
} from "@mui/material";
import styles from "./giftcard.module.css";
import WalletStyles from "../../../pages/wallet/wallet.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import ImageUpload from "@/components/ImageUpload/imageUpload";
import GiftcardSummary from "./giftcardSummary";
import { GiftCardCurrency } from "@/api/giftCardCategoriesCurrency";

interface SellGifcardDrawerProps {
  btnOnClick: () => void;
  selectedId: any;
}

const bankData = [
  {
    id: 1,
    name: "Naira",
  },
  {
    id: 1,
    name: "Dollar",
  },
];

interface SelectFields {
  [key: string]: string;
}

const initialSelectFields: SelectFields = {
  currency: "",
  gitcardType: "",
  subcategory: "",
};

const SellGiftCardDrawer: React.FC<SellGifcardDrawerProps> = ({
  btnOnClick,
  selectedId,
}) => {
  const [selectFields, setSelectFields] =
    useState<SelectFields>(initialSelectFields);
  const [step, setStep] = useState<1 | 2>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [giftcardCurrency, setGiftcardCurrency] = useState<any[]>([]);
  console.log(giftcardCurrency.length, "giftcard");

  // useEffect(() => {
  //   handleGiftcardCurrencyApi(selectedId);
  // }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setSelectFields((prevSelectFields) => ({
      ...prevSelectFields,
      [id]: value,
    }));
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <h1
            className={WalletStyles.transactionsTitle}
            style={{ textAlign: "center", fontSize: 30, margin: "0 0 25px 0" }}
          >
            Trade Initiated
          </h1>
          <GiftcardSummary backToHomeClick={() => setModalOpen(false)} />
        </Box>
      </Modal>
      <div style={{ display: "flex", marginBottom: 50 }}>
        <p
          className={styles.GCDSteps}
          style={{
            // backgroundImage:
            //   step === 1
            //     ? "var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))"
            //     : "none",
            color: step === 2 ? "rgba(31, 39, 57, 0.7)" : "#FFC600 ",
          }}
          onClick={() => setStep(1)}
        >
          Currency & Giftcard Types
        </p>
        <KeyboardArrowRightIcon style={{ color: "rgba(31, 39, 57, 0.70)" }} />
        <p
          className={styles.GCDSteps}
          style={{
            color: step === 1 ? "rgba(31, 39, 57, 0.7)" : "#FFC600 ",
          }}
        >
          Upload images
        </p>
      </div>
      {step === 1 && (
        <div>
          <label className={styles.GCDSelectLabel}>Currency</label>
          <select
            onChange={handleChange}
            className={styles.GCDSelect}
            placeholder="Select currency"
            value={selectFields?.currency}
            id="currency"
          >
            <option value="" disabled>
              Select currency
            </option>
            {bankData?.map((bank: any) => (
              <option value={bank.name} key={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>

          <label className={styles.GCDSelectLabel}>Giftcard type</label>
          <select
            onChange={handleChange}
            className={styles.GCDSelect}
            placeholder="Select currency"
            value={selectFields?.gitcardType}
            id="gitcardType"
          >
            <option value="" disabled>
              Select giftcard type
            </option>
            {bankData?.map((bank: any) => (
              <option value={bank.name} key={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>

          <label className={styles.GCDSelectLabel}>Sub-category</label>
          <select
            onChange={handleChange}
            className={styles.GCDSelect}
            placeholder="Select currency"
            value={selectFields?.subcategory}
            id="subcategory"
          >
            <option value="" disabled>
              Select currency
            </option>
            {bankData?.map((bank: any) => (
              <option value={bank.name} key={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              placeholder="Enter Card amount"
              type="text"
              label=""
              marginBottom="24px"
              inputStyles={{
                width: "100%",
              }}
            />
            <Input
              placeholder="How many"
              type="text"
              label=""
              inputStyles={{
                width: "100%",
              }}
              marginBottom="24px"
            />
          </div>
          <div style={{ textAlign: "center", margin: "30px" }}>
            <p>You would get:</p>
            <h1 className={styles.GCDAmount}>NGN 0.00</h1>
            <p
              style={{ color: "#17A2B8", fontSize: "14px" }}
              className={styles.GCDAmount}
            >
              Rate: 400
            </p>
          </div>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            onClick={() => setStep(2)}
            sx={{
              borderRadius: "10px",
              textTransform: "capitalize",
              height: "61px",
              margintTop: "8px",
            }}
          >
            Proceed{" "}
          </Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <Input
            placeholder="Card E-code..."
            type="text"
            label="E-code"
            inputStyles={{
              width: "100%",
            }}
            marginBottom="24px"
          />
          <p style={{ color: "#1F2739", fontSize: 16 }}>Upload card images</p>
          <ImageUpload />
          <Input label="Password" type="password" />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="I confirm that all the filled details are correct"
              sx={{ color: "#6C757D" }}
            />
          </FormGroup>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            onClick={() => {
              setStep(1);
              setModalOpen(true);
              btnOnClick();
            }}
            sx={{
              borderRadius: "10px",
              textTransform: "capitalize",
              height: "61px",
              margintTop: "8px",
              marginTop: 10,
            }}
          >
            Trade Giftcard{" "}
          </Button>
        </div>
      )}
    </>
  );
};

export default SellGiftCardDrawer;
