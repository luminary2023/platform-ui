"use client";
import React, { FC } from "react";
import Image from "next/image";
import styles from "./Card.module.css";

interface CardProps {
  image: any;
  title: string;
  subtitle: string;
}

const Card: FC<CardProps> = ({ image, title, subtitle }) => {
  return (
    <div className={styles.container}>
      <Image src={image} alt={""} />
      <h1 className={styles.CardTitle}>{title}</h1>
      <p className={styles.CardSubTitle}>{subtitle}</p>
    </div>
  );
};

export default Card;
