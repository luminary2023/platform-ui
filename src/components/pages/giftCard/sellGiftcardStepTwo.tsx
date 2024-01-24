"use client";
import ImageUpload from "@/components/ImageUpload/imageUpload";
import Input from "@/components/InputField";
import { Button } from "@mui/material";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tradeGiftcardSchema } from "@/services/schemaVarification";
// import { sellGiftcard } from "@/api/sellGiftcard";
import axios from "axios";
import Loading from "@/components/Loading";
import SummaryModal from "./summaryModal";
import { useRouter } from "next/router";
import { sellGiftcard } from "@/api/sellGiftcard";
import { ErrorProps } from "@/services/interfaces";

interface tradeGiftcardProps {
  eCode: string;
  // transactionPin: string;
}

interface Props {
  nairaRate: any;
  giftcardQuantity: any;
  cardAmount: any;
  nairaRateId: any;
  receiveValue: any;
  cardImage: string;
  cardName: string;
}

const SellGiftcardStepTwo: FC<Props> = ({
  nairaRate,
  giftcardQuantity,
  cardAmount,
  nairaRateId,
  receiveValue,
  cardImage,
  cardName,
}) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errs, setErrs] = useState<ErrorProps>({
    status: "",
    message: "",
    statusCode: 0,
    errors: "",
  });
  const router = useRouter();

  const preset_key = "luminaryExchange";
  const cloud_name = "dgmaqh6lu";

  const handleFile = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => setImage(res.data?.secure_url))
      .catch((err) => err.error?.data);
  };
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<tradeGiftcardProps>({
    resolver: zodResolver(tradeGiftcardSchema),
  });

  const eCode = watch("eCode");
  const handleTradeGiftcard = async () => {
    try {
      setIsOpen(true);
    } catch (error: any) {
      error.results?.data;
    }
  };
  const handleSellGiftcard = async () => {
    try {
      setLoading(true);
      const res = await sellGiftcard({
        amount: cardAmount,
        quantity: giftcardQuantity,
        comment: eCode,
        attachments: [image].flat() as string[],
        giftcardSubCategoryId: nairaRateId,
      });

      setLoading(false);
      if (
        res.status === "Created" &&
        res.message === "Place giftcard sell order successfully."
      ) {
        setSuccess(true);
      } else {
        setErrs(res);
        setError(true);
      }
    } catch (error: any) {
      error.results?.data;
    }
  };

  const handleHome = () => {
    setSuccess(false);
    setIsOpen(false);

    router.push("/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleTradeGiftcard)}>
        <div>
          <Input
            placeholder="Card E-code..."
            type="text"
            label="E-code"
            inputStyles={{
              width: "100%",
            }}
            marginBottom="24px"
            borderColor={errors.eCode?.message ? "#DF1111" : ""}
            register={register("eCode")}
            onKeyPress={(event: any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <p style={{ color: "#1F2739", fontSize: 16 }}>Upload card images</p>
          {/* <ImageUpload
            handleFile={handleFile}
            setImage={setImage}
            image={image}
          /> */}

          <input
            type={"file"}
            multiple
            onChange={handleFile}
            style={{
              marginTop: "25px",
              marginBottom: "25px",
            }}
          />

          {/* <img
            src={image}
            alt="image"
            width={150}
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              display: "flex",
              justifyContent: "center",
              margin: "auto",
            }}
          /> */}
          {/* <Input
            label="Transaction pin"
            type="password"
            borderColor={errors.transactionPin?.message ? "#DF1111" : ""}
            register={register("transactionPin")}
            onKeyPress={(event: any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            maxLength="4"
          /> */}
          {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="I confirm that all the filled details are correct"
              sx={{ color: "#6C757D" }}
            />
          </FormGroup> */}
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={image.length === 0}
            sx={{
              borderRadius: "10px",
              textTransform: "capitalize",
              height: "61px",
              margintTop: "8px",
              marginTop: 10,
            }}
          >
            Trade Giftcard
          </Button>
        </div>
      </form>
      <SummaryModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        backToHomeClick={handleHome}
        giftcardQuantity={giftcardQuantity}
        cardAmount={cardAmount}
        receiveValue={receiveValue}
        nairaRate={nairaRate}
        handleSellGiftcard={handleSellGiftcard}
        loading={loading}
        success={success}
        errs={errs}
        error={error}
        cardImage={cardImage}
        cardName={cardName}
      />
    </div>
  );
};

export default SellGiftcardStepTwo;
