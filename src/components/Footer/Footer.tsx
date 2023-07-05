import React from "react";
import styles from "@/styles/Home.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.companyInfo}>
        <h1 className={styles.companyTitle}>LumiApp</h1>
        <p className={styles.companySubTitle}>
          © 2022 P3wallet. All rights reserved.
        </p>
      </div>
      <div className={styles.footerLinkWrapper}>
        <p>Term of service</p>
        <p>Privacy policy</p>
      </div>
    </div>
  );
};

export default Footer;
