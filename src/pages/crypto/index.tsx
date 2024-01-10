"use client";

import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Button } from "../../components/Button/Button";
import BuyIcon from "../../assets/images/cryptoBuyIcon.svg";
import SellIcon from "../../assets/images/cryptoSellIcon.svg";
import Withdraw from "../../assets/images/cryptoWithdrawIcon.svg";
import TransactionTable from "@/components/pages/crypto/transactionTable";
import CryptoChart from "@/components/pages/crypto/cryptoChart";
import { useState, useEffect, useMemo } from "react";
import RightDrawer from "@/components/drawer";
import { useRouter } from "next/router";
import Input from "@/components/InputField";
import CryptoModal from "@/components/pages/crypto/cryptoModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellCryptoValidation } from "@/services/schemaVarification";
import { cryptoProps } from "@/services/interfaces";
import { CryptoAsset } from "@/api/cryptoAsset";
import BarcodeModal from "@/components/pages/crypto/cryptoBarcodeModal";
import UploadImageModal from "@/components/pages/crypto/uploadImageModal";
import { sellCryptoApi } from "@/api/sellCrypto";
import axios from "axios";

const Crypto = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openBarcodeModal, setOpenBarcodeModal] = useState(false);
  const [openCryptoModal, setOpenCryptoModal] = useState(false);
  const [openUploadImage, setOpenUploadImageModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [image, setImage] = useState();
  const preset_key = "732132719217354";
  const cloud_name = "dgi4ygmix";

  function handleFile(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<cryptoProps>({
    resolver: zodResolver(sellCryptoValidation),
    mode: "onChange",
  });
  const assetId = watch("asset");
  const networkId = watch("network");
  const payValue = watch("pay");
  const comment = watch("comment");
  const proof = watch("comment");
  const transactionPin = watch("pin");

  const asset = useMemo(() => {
    if (assets?.length < 0) {
      return null;
    }
    return assets?.find((a) => a.id === assetId);
  }, [assets, assetId]);

  const network = useMemo(() => {
    if (!asset) {
      return null;
    }
    return asset.networks?.find((n: any) => n.id === networkId);
  }, [asset, networkId]);

  const receiveValue = useMemo(() => {
    return (payValue || 0) * (asset?.sellRate || 1);
  }, [asset, payValue]);

  const sellCrypto = async () => {
    const response = await sellCryptoApi({
      assetId,
      networkId,
      assetAmount: payValue,
      transactionPin,
      proof,
      comment,
    });
    console.log(
      assetId,
      networkId,
      payValue,
      transactionPin,
      proof,
      comment,
      "asettttt"
    );
    console.log(response);
    if (response.status === "Success" && response.statusCode === "200") {
      alert("Successful");
    }
  };

  const handleCrypto = async (data: cryptoProps) => {
    setOpenCryptoModal(true);
  };
  const handleCryptoModal = async () => {
    setOpenCryptoModal(false);
    setOpenBarcodeModal(true);
  };
  const handleBarcodeModal = async () => {
    setOpenBarcodeModal(false);
    setOpenUploadImageModal(true);
  };

  const handleAsset = async () => {
    const response = await CryptoAsset();
    setAssets(response);
  };

  useEffect(() => {
    handleAsset();
  }, []);

  return (
    <div style={{ background: "#F6F6F6", height: "100vh" }}>
      <DashboardContainer title="Crypto">
        <Box
          sx={{
            display: { md: "flex", lg: "flex", xs: "column" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "65%",
              height: "100%",
              display: "initial",
              gap: 8,
            }}
          >
            <Box
              sx={{
                height: "100%",
                background: "#fff",
                padding: "24px",
                borderRadius: "16px",
              }}
            >
              <Typography
                sx={{
                  color: "#6C757D",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                Choose an Action
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  marginTop: "10px",
                  gap: { md: 4, lg: 4, xs: 4 },
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #FD6E6A",
                    width: "30%",
                    height: "113px",
                    borderRadius: "5px",
                    background: "#FEF4E6",
                    display: { xs: "none", md: "block", lg: "block" },
                  }}
                >
                  <Image
                    src={BuyIcon}
                    alt="buy"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "15%",
                    }}
                  />
                  <Typography textAlign={"center"} mt={1}>
                    Buy coming soon
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #007C5B",
                    width: { md: "30%", lg: "30%", xs: "100%" },
                    height: "113px",
                    borderRadius: "5px",
                    background: "#ECFCE5",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#F3F3F3",
                      color: "#007C5B",
                    },
                  }}
                  onClick={toggleDrawer}
                >
                  <Image
                    src={SellIcon}
                    alt="buy"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "15%",
                    }}
                  />
                  <Typography textAlign={"center"} mt={1}>
                    Sell
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #F2C94C",
                    width: { md: "30%", lg: "30%", xs: "100%" },
                    height: "113px",
                    borderRadius: "5px",
                    background: "#FAFCE0",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#F3F3F3",
                      color: "#007C5B",
                    },
                  }}
                  onClick={() => router.push("wallet")}
                >
                  <Image
                    src={Withdraw}
                    alt="buy"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "15%",
                    }}
                  />
                  <Typography textAlign={"center"} mt={1}>
                    Withdraw
                  </Typography>
                </Box>
              </Box>
            </Box>
            <CryptoChart />
          </Box>
          <TransactionTable />
        </Box>
      </DashboardContainer>

      <RightDrawer
        open={isOpen}
        onClose={toggleDrawer}
        title="Sell Crypto"
        subTitle="Transfer funds into your wallet"
      >
        <form onSubmit={handleSubmit(handleCrypto)}>
          <Box sx={{ mb: "30px" }}>
            <Typography
              sx={{
                color: "#344054",
                fontFamily: "Satoshi Light",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                marginBottom: "8px",
              }}
            >
              Asset
            </Typography>
            <select
              style={{
                width: "100%",
                height: "45px",
                borderRadius: "10px",
                paddingLeft: "8px",
                paddingRight: "8px",
                border: `${
                  errors.asset?.message
                    ? "1px solid #DF1111"
                    : "1px solid #E8E8E8"
                }`,
                color: "#667085",
                outline: "none",
              }}
              {...register("asset")}
              // onClick={handleAsset}
            >
              <option value="" hidden>
                Choose Asset{" "}
              </option>

              {assets?.map((asset: any) => (
                <option key={asset.id} value={asset.id}>
                  {asset?.name}
                </option>
              ))}
            </select>
          </Box>
          <Box sx={{ mb: "30px" }}>
            <Typography
              sx={{
                color: "#344054",
                fontFamily: "Satoshi Light",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                marginBottom: "8px",
              }}
            >
              Select Network
            </Typography>
            <select
              style={{
                width: "100%",
                height: "45px",
                borderRadius: "10px",
                paddingLeft: "8px",
                paddingRight: "8px",
                border: `${
                  errors.network?.message
                    ? "1px solid #DF1111"
                    : "1px solid #E8E8E8"
                }`,
                color: "#667085",
                outline: "none",
              }}
              {...register("network")}
              onChange={(e) =>
                setSelectedNetwork(asset?.networks[e.target.selectedIndex - 1])
              }
            >
              <option value="" hidden>
                Choose Asset{" "}
              </option>

              {asset?.networks.map((network: any) => (
                <option key={network.name} value={network.id}>
                  {network.name}
                </option>
              ))}
            </select>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>
              <Input
                label="You pay"
                placeholder="0"
                borderColor={errors.pay?.message ? "#DF1111" : ""}
                register={register("pay")}
                type={"text"}
                onKeyPress={(event: any) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Box>
            <Box>
              <Input
                label=" To receive"
                type={"text"}
                placeholder="NGN"
                readOnly={true}
                value={receiveValue}
              />
            </Box>
          </Box>
          <Box sx={{ mt: "30px", mb: "30px" }}>
            <Input
              label="  Transaction Pin"
              type={"password"}
              register={{ ...register("pin") }}
              borderColor={errors.pin?.message ? "#DF1111" : ""}
              onKeyPress={(event: any) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              maxLength="4"
            />
          </Box>
          {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="I confirm that all the filled details are correct"
              sx={{ color: "#6C757D", fontSize: "1px" }}
            />
          </FormGroup> */}
          <Input
            label="Comment"
            placeholder="Add comment"
            borderColor={errors.comment?.message ? "#DF1111" : ""}
            register={register("comment")}
            type={"text"}
          />

          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ width: "100%", transform: "initial", mt: "30px" }}
          >
            Sell
          </Button>
        </form>
      </RightDrawer>

      <CryptoModal
        onClose={() => setOpenCryptoModal(false)}
        open={openCryptoModal}
        handleCryptoModal={handleCryptoModal}
        payValue={payValue}
        network={network}
        asset={asset}
        receiveValue={receiveValue}
      />
      <BarcodeModal
        open={openBarcodeModal}
        onClose={() => setOpenBarcodeModal(false)}
        handleBarcodeModal={handleBarcodeModal}
        payValue={payValue}
        network={network}
        asset={asset}
        receiveValue={receiveValue}
        walletAddress={selectedNetwork}
      />
      <UploadImageModal
        open={openUploadImage}
        onClose={() => setOpenUploadImageModal(false)}
        payValue={payValue}
        network={network}
        asset={asset}
        receiveValue={receiveValue}
        sellCrypto={sellCrypto}
        handleFile={handleFile}
        image={image}
      />
      {/* <input type="file" name="image" onChange={handleFile} /> */}
    </div>
  );
};

export default Crypto;
