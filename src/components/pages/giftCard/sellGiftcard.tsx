"use client";
import React, { useState } from "react";
import Card from "@/components/Card";
import Image from "next/image";
import Amazon from "../../../assets/images/Amazon.svg";
import Amex from "../../../assets/images/Amex.svg";
import giftcardStyles from "./giftcard.module.css";
import styles from "../../../pages/wallet/wallet.module.css";
import Input from "@/components/InputField";
import RightDrawer from "@/components/drawer";
import SellGiftCardDrawer from "./sellGiftCardDrawer";

interface CardProps {
  id: number;
  image: any;
  name: string;
}

const giftCardArray: CardProps[] = [
  {
    id: 1,
    name: "Amazon",
    image: Amazon,
  },
  {
    id: 2,
    name: "Amex",
    image: Amex,
  },
  {
    id: 3,
    name: "Amazon",
    image: Amazon,
  },
];

const SellGiftcard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<CardProps | null>(
    null
  );
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
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
        {giftCardArray.map((data) => (
          <div
            className={giftcardStyles.container}
            key={data?.id}
            onClick={() => {
              setSelectedGiftCard(data);
              setIsOpen(true);
            }}
          >
            <Image src={data?.image} alt={"giftcard"} />
          </div>
        ))}
      </div>
      <RightDrawer
        open={isOpen}
        onClose={toggleDrawer}
        title={selectedGiftCard?.name}
        subTitle=""
      >
        <SellGiftCardDrawer
          btnOnClick={() => {
            setIsOpen(false);
          }}
        />
      </RightDrawer>
    </>
  );
};

export default SellGiftcard;
