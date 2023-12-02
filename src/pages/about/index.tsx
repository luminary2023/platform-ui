"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import Ellipse from "../../assets/images/ellipse.svg";
import styles from "../../components/pages/about/About.module.css";
import Footer from "@/components/Footer/Footer";
import AboutUs from "@/components/pages/about/aboutUs";
import GetInTouch from "@/components/pages/about/getInTouch";

export default function About() {
  return (
    <div>
      <div className={styles.heroSection}>
        <div style={{ padding: "60px 80px" }}>
          <Navbar />
          <div className={styles.content}>
            <p className={styles.about}>ABOUT US</p>
            <h1 className={styles.title}>
              Simple, Transparent and Secure way of trading
            </h1>
          </div>
        </div>
        <div
          className={styles.ellipsImage}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <Image src={Ellipse} alt="Ellipse" width="1280" />
        </div>
      </div>
      <div className={styles.missionContainer}>
        <h1 className={styles.mission} data-aos="flip-left">
          Our Mission
        </h1>
        <p className={styles.missionDiscrib} data-aos="flip-left">
          Our mission is to empower Africans to unlock capital value through
          multi-currency savings while growing their finances
        </p>
      </div>
      {/* <AboutUs /> */}
      <GetInTouch />
      <Footer />
    </div>
  );
}
