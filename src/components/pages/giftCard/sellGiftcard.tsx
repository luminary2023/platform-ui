"use client";
import React, { useEffect, useMemo, useState } from "react";

import giftcardStyles from "./giftcard.module.css";
import styles from "../../../pages/wallet/wallet.module.css";
import Input from "@/components/InputField";
import RightDrawer from "@/components/drawer";
import SellGiftCardDrawer from "./sellGiftCardDrawer";
import { AllGiftCardCategories } from "@/api/allGiftCardCategories";
import { GiftCardCurrency } from "@/api/giftCardCategoriesCurrency";

const SellGiftcard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [giftcardCurrency, setGiftcardCurrency] = useState();
  console.log(giftcardCurrency, "currency");

  console.log(selectedGiftCard, "giftcard selcted", selectedId);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCardDrawer = async () => {
    setIsOpen(true);
    const res = await GiftCardCurrency();
    setGiftcardCurrency(res);
  };

  const GitfCardCategories = async () => {
    try {
      const response = await AllGiftCardCategories();
      setSelectedGiftCard(response);
    } catch (error: any) {
      error?.results.data;
    }
  };
  useEffect(() => {
    GitfCardCategories();
  }, []);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search Giftcard category"
        searchInput
        inputStyles={{
          height: 55,
          padding: "15px 15px 15px 40px",
        }}
      />
      <h2
        className={styles.transactionsTitle}
        style={{ margin: "32px 0 20px 0" }}
      >
        Select Giftcard
      </h2>
      <div className={giftcardStyles.wrapper}>
        {selectedGiftCard.map((giftcard) => {
          console.log(giftcard);
          return (
            <div key={giftcard.id}>
              <img
                src={giftcard.image}
                alt="amazon"
                width={200}
                onClick={handleCardDrawer}
              />
            </div>
          );
        })}
      </div>

      <RightDrawer
        open={isOpen}
        onClose={toggleDrawer}
        title="Sell GiftCard"
        subTitle="We buy all giftcards"
      >
        <SellGiftCardDrawer
          selectedId={selectedId}
          btnOnClick={() => {
            setIsOpen(false);
          }}
        />
      </RightDrawer>
    </div>
  );
};

export default SellGiftcard;
