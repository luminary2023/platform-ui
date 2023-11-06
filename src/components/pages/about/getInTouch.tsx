"use client";
import React from "react";
import styles from "./About.module.css";
import Image from "next/image";
import UpperArrow from "../../../assets/images/upDropDownArrow.svg";
// import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import Input from "@/components/InputField";
import { getInTouch } from "@/services/schemaVarification";
import { zodResolver } from "@hookform/resolvers/zod";

interface getInTouchProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  messages: string;
}

const GetInTouch = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<getInTouchProps>({
    resolver: zodResolver(getInTouch),
  });

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
              <Input
                label="First name"
                placeholder="First name"
                type="text"
                register={{ ...register("firstName") }}
                borderColor={errors?.firstName?.message ? "#DF1111" : ""}
              />
            </div>
            <div className={styles.formInputBox}>
              <Input
                placeholder="Last name"
                label="Last name"
                type={"text"}
                register={{ ...register("lastName") }}
                borderColor={errors?.lastName?.message ? "#DF1111" : ""}
              />
            </div>
          </div>
          <div className={styles.formInputBox}>
            <Input
              label="Email"
              placeholder="you@company.com"
              type={"email"}
              register={{ ...register("email") }}
              borderColor={errors?.email?.message ? "#DF1111" : ""}
            />
          </div>
          <div className={styles.formInputBox}>
            <Input
              label="Phone number"
              placeholder="+1 (555) 000-0000"
              type="number"
              register={{ ...register("phoneNumber") }}
              borderColor={errors?.phoneNumber?.message ? "#DF1111" : ""}
            />
          </div>
          <div className={styles.formInputBox}>
            <label className={styles.formLabel}>Message</label>
            <br />
            <textarea className={styles.textarea}></textarea>
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
