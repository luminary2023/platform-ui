"use client";
import React from "react";
import styles from "./Convert.module.css";
import Navbar from "../../components/Navbar";
import { Container } from "@mui/material";
import Calculator from "./calculator";
import Image from "next/image";
import Ellipse from "../../assets/images/ellipse.svg";

export default function Converter() {
  return (
    <div className={styles.heroSection}>
      <Navbar />
      <div className={styles.convertionDiv} data-aos="fade-right">
        <div className={styles.content}>
          <h1 className={styles.realtime}>Realtime Asset Conversion</h1>
          <p className={styles.description}>
            Seamlessly convert and view data, currency, and measurements
            instantly, enhancing efficiency and accuracy.
          </p>
        </div>

        <Calculator data-aos="fade-left" />
      </div>

      <div className={styles.ellipsImage}>
        <Image src={Ellipse} alt="Ellipse" />
      </div>
    </div>
  );
}
