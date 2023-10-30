"use client";
import { useEffect, useState } from "react";
import ProfileSettings from "../index";
import { Box, Typography } from "@mui/material";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import backArrow from "../../../assets/images/arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { profileRequest } from "@/api/profile";

const Profile = () => {
  const router = useRouter();

  const [profileData, setProfileData] = useState<any>();

  const fetchProfile = async () => {
    try {
      const res = await profileRequest();
      setProfileData(res);
    } catch (error: any) {
      error?.response?.data;
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <ProfileSettings>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            mb: "25px",
          }}
        >
          <Image
            src={backArrow}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
            Account Information
          </Typography>
        </Box>

        <Input
          type={"text"}
          label="First Name"
          bgColor={"#F2F2F2"}
          marginBottom={"8px"}
          labelColor={"#081630"}
          labelSize={"16px"}
          readOnly={true}
          value={profileData?.firstName}
          // register={{ ...register("accountNumber") }}
          // borderColor={
          //   errors.accountNumber?.message ? "#DF1111" : ""
          // }
        />

        <Input
          readOnly={true}
          type={"NGN 15,000"}
          label="Last Name"
          bgColor={"#F2F2F2"}
          marginBottom={"8px"}
          labelColor={"#081630"}
          labelSize={"16px"}
          value={profileData?.lastName}

          // value={selectedBankDetails?.accountName}
          // register={{ ...register("accountName") }}

          // borderColor={errors.accountName?.message ? "#DF1111" : ""}
        />

        <Input
          readOnly={true}
          value={profileData?.email}
          // value={"luminaryexchange@gmail.com"}
          type={"text"}
          label="Email"
          bgColor={"#F2F2F2"}
          marginBottom={"8px"}
          labelColor={"#081630"}
          labelSize={"16px"}
          // value={selectedBankDetails?.accountName}
          // register={{ ...register("accountName") }}

          // borderColor={errors.accountName?.message ? "#DF1111" : ""}
        />

        <Input
          // readOnly={true}
          // value={"081234556789"}
          readOnly={true}
          value={profileData?.phoneNumber}
          type={"email"}
          label="Phone"
          bgColor={"#F2F2F2"}
          marginBottom={"8px"}
          labelColor={"#081630"}
          labelSize={"16px"}
          // value={selectedBankDetails?.accountName}
          // register={{ ...register("accountName") }}

          // borderColor={errors.accountName?.message ? "#DF1111" : ""}
        />
        {/* <Button
          color="primary"
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            textTransform: "capitalize",
            mt: "10px",
          }}
        >
          Update
        </Button> */}
      </ProfileSettings>
    </>
  );
};

export default Profile;