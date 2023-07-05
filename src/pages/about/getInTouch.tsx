"use client";
import React from "react";
import styles from "./About.module.css";
import Image from "next/image";
import UpperArrow from "../../assets/images/upDropDownArrow.svg";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import { useForm } from "react-hook-form";

const GetInTouch = () => {
  const { handleSubmit, register } = useForm();

  const handleMessage = () => {
    console.log("good");
  };
  return (
    <div className={styles.getInTouchContainer}>
      <h1 className={styles.getInTouchTitle}>Become Part of Something Great</h1>
      <div className={styles.getInTouchAppointment}>
        <div className={styles.getInTouchForm}>
          <div className={styles.formTitle}>
            <h3>Get in touch</h3>
            <p>You can reach us anytime at admin@customer.co</p>
          </div>
          <div className={styles.formArrow}>
            <Image src={UpperArrow} alt="arrow" />
          </div>
        </div>
      </div>
      <div className={styles.formControl}>
        <form onSubmit={handleSubmit(handleMessage)}>
          <div className={styles.groupForm}>
            <div>
              <label className={styles.formLabel}>First name</label>
              <Input
                placeholder="First name"
                type="text"
                {...register("firstName")}
              />
            </div>
            <div className={styles.formInputBox}>
              <label className={styles.formLabel}>Last name</label>
              <Input
                placeholder="Last name"
                type={"text"}
                {...register("lastName")}
              />
            </div>
          </div>
          <div className={styles.formInputBox}>
            <label className={styles.formLabel}>Email</label>
            <Input
              placeholder="you@company.com"
              type={"email"}
              {...register("email")}
            />
          </div>
          <div className={styles.formInputBox}>
            <label className={styles.formLabel}>Phone number</label>
            <Input
              placeholder="+1 (555) 000-0000"
              type="number"
              {...register("phoneNumber")}
            />
          </div>
          <div className={styles.formInputBox}>
            <label className={styles.formLabel}>Message</label>
            <br />
            <textarea
              className={styles.textarea}
              {...register("messages")}
              required
            ></textarea>
          </div>
          <Button
            fullWidth={true}
            color="primary"
            variant="contained"
            sx={{ borderRadius: "29px", textTransform: "capitalize" }}
            type="submit"
          >
            Send message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GetInTouch;
