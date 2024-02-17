"use client";
import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Modal,
  Box,
} from "@mui/material";
import styles from "./giftcard.module.css";
import BackArrow from "../../../assets/images/arrow-left.svg";
import { useRouter } from "next/router";
import Image from "next/image";

import WalletStyles from "../../../pages/wallet/wallet.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import ImageUpload from "@/components/ImageUpload/imageUpload";
// import GiftcardSummary from "./giftcardSummary";
import { GiftCardCurrency } from "@/api/giftCardCategoriesCurrency";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  giftcardSchema,
  tradeGiftcardSchema,
} from "@/services/schemaVarification";
import { giftcardProps } from "@/services/interfaces";
import { GiftCardType } from "@/api/GiftcardType";
import { GiftCardSubCategory } from "@/api/giftcardSubCategory";
import SellGiftcardStepTwo from "./sellGiftcardStepTwo";

interface SellGiftcardDrawerProps {
  btnOnClick: () => void;
  selectedId: any;
  cardImage: string;
  cardName: string;
  // routerPath: string;
}

const SellGiftCardDrawer: React.FC<SellGiftcardDrawerProps> = ({
  btnOnClick,
  selectedId,
  cardImage,
  cardName,

  // routerPath,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [giftcardCurrency, setGiftcardCurrency] = useState<any[]>([]);
  const [currencyId, setCurrencyId] = useState("");

  const [giftcardType, setGiftcardType] = useState<any[]>([]);
  const [giftcardTypeId, setGiftcardTypeId] = useState("");

  const [giftcardSubCategory, setGiftcardSubCategory] = useState<any[]>([]);

  const [nairaRate, setNairaRate] = useState<any>();
  const [nairaRateId, setNairaRateId] = useState<any>();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<giftcardProps>({
    resolver: zodResolver(giftcardSchema),
  });

  const router = useRouter();
  const giftcardQuantity = watch("quantity");
  const cardAmount = watch("cardAmount");

  const receiveValue = useMemo(() => {
    return (giftcardQuantity || 0) * (nairaRate || 1) * (cardAmount || 1);
  }, [nairaRate, giftcardQuantity, cardAmount]);

  const handleCardCurrency = async (id: any) => {
    const res = await GiftCardCurrency(id);
    setGiftcardCurrency(res);
  };

  const handleGiftcardType = async (selectedId: any, currencyId: any) => {
    const res = await GiftCardType(selectedId, currencyId);
    setGiftcardType(res);
  };

  const handleSubCategory = async (
    selectedId: any,
    currencyId: any,
    giftcardTypeId: any
  ) => {
    const res = await GiftCardSubCategory(
      selectedId,
      currencyId,
      giftcardTypeId
    );
    setGiftcardSubCategory(res);
  };

  const handleBack = () => {
    setStep(1);
  };

  useEffect(() => {
    handleCardCurrency(selectedId);
    handleGiftcardType(selectedId, currencyId);
    handleSubCategory(selectedId, currencyId, giftcardTypeId);
  }, [selectedId, currencyId, giftcardTypeId]);

  const handleGiftcardValidation = () => {
    setStep(2);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-150%, -150%)",
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
          {/* <GiftcardSummary backToHomeClick={() => setModalOpen(false)} /> */}
        </Box>
      </Modal>
      <div style={{ display: "flex", marginBottom: 50 }}>
        {step === 2 ? (
          <Box sx={{ cursor: "pointer", marginRight: "2px" }}>
            <Image src={BackArrow} alt="backArrow" onClick={handleBack} />
          </Box>
        ) : (
          ""
        )}
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
      <form onSubmit={handleSubmit(handleGiftcardValidation)}>
        {step === 1 && (
          <div>
            <label className={styles.GCDSelectLabel}>Currency</label>
            <select
              className={styles.GCDSelect}
              placeholder="Select currency"
              {...register("currency")}
              style={{
                border: `${
                  errors.currency?.message
                    ? "1px solid #DF1111"
                    : "1px solid #E8E8E8"
                }`,
                color: "#667085",
                outline: "none",
              }}
              onChange={(e) =>
                setCurrencyId(giftcardCurrency[e.target.selectedIndex - 1]?.id)
              }
            >
              <option value="" hidden>
                Select currency
              </option>
              {giftcardCurrency?.map((currency) => {
                return (
                  <option value={currency.name} key={currency.id}>
                    {currency.name}
                  </option>
                );
              })}
            </select>

            <label className={styles.GCDSelectLabel}>Giftcard type</label>
            <select
              className={styles.GCDSelect}
              placeholder="Select currency"
              {...register("giftcardType")}
              style={{
                border: `${
                  errors.giftcardType?.message
                    ? "1px solid #DF1111"
                    : "1px solid #E8E8E8"
                }`,
                color: "#667085",
                outline: "none",
              }}
              onChange={(e) =>
                setGiftcardTypeId(giftcardType[e.target.selectedIndex - 1]?.id)
              }
            >
              <option value="" hidden>
                Select type
              </option>
              {giftcardType?.map((type) => {
                return <option key={type.id}>{type.name}</option>;
              })}
            </select>

            <label className={styles.GCDSelectLabel}>Sub-category</label>

            <select
              className={styles.GCDSelect}
              placeholder="Select category"
              {...register("SubCategory")}
              style={{
                border: `${
                  errors.SubCategory?.message
                    ? "1px solid #DF1111"
                    : "1px solid #E8E8E8"
                }`,
                color: "#667085",
                outline: "none",
              }}
              onChange={(e) => {
                setNairaRate(
                  giftcardSubCategory[e.target.selectedIndex - 1]?.nairaRate
                ),
                  setNairaRateId(
                    giftcardSubCategory[e.target.selectedIndex - 1]?.id
                  );
              }}
            >
              <option value="" hidden>
                Select category
              </option>
              {giftcardSubCategory?.map((sub: any) => (
                <option value={sub.range} key={sub.id}>
                  {sub.range}
                </option>
              ))}
            </select>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "5px",
              }}
            >
              <Input
                placeholder="Enter Card amount"
                type="text"
                label="Enter Card amount"
                marginBottom="24px"
                inputStyles={{
                  width: "100%",
                }}
                borderColor={errors.cardAmount?.message ? "#DF1111" : ""}
                register={register("cardAmount")}
                onKeyPress={(event: any) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <Input
                placeholder="How many"
                type="text"
                label="How many card"
                inputStyles={{
                  width: "100%",
                }}
                marginBottom="24px"
                borderColor={errors.quantity?.message ? "#DF1111" : ""}
                register={register("quantity")}
                onKeyPress={(event: any) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <div style={{ textAlign: "center", margin: "30px" }}>
              <p>You would get:</p>
              <h1 className={styles.GCDAmount}>NGN {receiveValue}</h1>
              <p
                style={{ color: "#17A2B8", fontSize: "14px" }}
                className={styles.GCDAmount}
              >
                Rate {nairaRate}
              </p>
            </div>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
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
      </form>

      {step === 2 && (
        <SellGiftcardStepTwo
          nairaRate={nairaRate}
          nairaRateId={nairaRateId}
          giftcardQuantity={giftcardQuantity}
          cardAmount={cardAmount}
          receiveValue={receiveValue}
          cardImage={cardImage}
          cardName={cardName}
          src={undefined}
        />
      )}
    </>
  );
};

export default SellGiftCardDrawer;
