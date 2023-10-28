import React from "react";
import Card from "@/components/Card";
import Image from "next/image";
import Amazon from "../../assets/images/Amazon.svg";
import Amex from "../../assets/images/Amex.svg"
import giftcardStyles from "./giftcard.module.css";
import styles from "../wallet/wallet.module.css";
import Input from "@/components/InputField";

const ImageArray = [
  Amex,
  Amazon,
  Amazon,
  Amex,
  Amazon,
]

const SellGiftcard = () => {
  return (
    <>
      <Input type="text" placeholder="Search Giftcard category" />
      <h2 className={styles.transactionsTitle} style={{margin: '32px 0 20px 0'}}>Select Giftcard</h2>
      <div className={giftcardStyles.wrapper}>
        {ImageArray.map((image, i) => (
          <div className={giftcardStyles.container} key={i}>
          <Image src={image} alt={"giftcard"} />
        </div>
        ))}
      </div>
    </>
  );
};

export default SellGiftcard;
