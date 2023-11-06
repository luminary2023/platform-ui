import React, { ReactNode, useState } from "react";
import styles from "./About.module.css";
import Innovation from "../../../assets/images/Innovation.svg";
import Improvement from "../../../assets/images/Improvement.svg";
import User from "../../../assets/images/userCentric.svg";
import TeamWork from "../../../assets/images//Teamwork.svg";
import Transparent from "../../../assets/images/Transparency.svg";
import Simplicity from "../../../assets/images/Simplicity.svg";
import Image from "next/image";

const cardDetails = [
  {
    image: Transparent,
    title: "Transparency",
    description:
      "We believe in open communication even in difficult times. We show the right courage by maintaining our credibility and sharing information no matter what.   ",
  },
  {
    image: Innovation,
    title: "Innovation",
    description:
      "We are pace setters and we take the ambitious steps in disrupting and forging a unique path for ourselves towards success.  ",
  },
  {
    image: User,
    title: "User-centric",
    description:
      "We measure our success on how many of our users we are able to put a smile to their face. Our goal is to keep our customers happy and satisfy them at all times.",
  },
  {
    image: Improvement,
    title: "Continuous improvement",
    description:
      "We measure our success on how many of our users we are able to put a smile to their face. Our goal is to keep our customers happy and satisfy them at all times.",
  },
  {
    image: TeamWork,
    title: "Teamwork",
    description:
      "We measure our success on how many of our users we are able to put a smile to their face. Our goal is to keep our customers happy and satisfy them at all times.",
  },
  {
    image: Simplicity,
    title: "Simplicity",
    description:
      "We measure our success on how many of our users we are able to put a smile to their face. Our goal is to keep our customers happy and satisfy them at all times.",
  },
];

const AboutUs = () => {
  return (
    <div className={styles.ourStand}>
      <h3 className={styles.whatWeDo}>What we stand for</h3>
      <p className={styles.whatWeDoSubtitle}>
        At the core of our existence are certain values that define our culture
        and identity. These values go a long way in defining what we do, how we
        do it and how well we manage relationships within and outside the
        company.
      </p>
      <div className={styles.whatWeDoCard} data-aos="zoom-in">
        {cardDetails.map((card, key) => (
          <div key={key} style={{ paddingBottom: "121px" }}>
            <div>
              <Image src={card.image} alt="cardImg" width={60} height={60} />
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
