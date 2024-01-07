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
import { useState, FC, useEffect } from "react";
import RightDrawer from "@/components/drawer";
import { useRouter } from "next/router";
import Input from "@/components/InputField";
import CryptoModal from "@/components/pages/crypto/cryptoModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellCryptoValidation } from "@/services/schemaVarification";
import { cryptoProps } from "@/services/interfaces";
import { CryptoAsset } from "@/api/cryptoAsset";

const Crypto = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const asset = watch("asset");
  const network = watch("network");
  const payValue = watch("pay");
  console.log(payValue);

  const handleCrypto = async (data: cryptoProps) => {
    handleOpen();
  };

  const handleAsset = async () => {
    const response = await CryptoAsset();
    setAssets(response);
  };
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
              onClick={handleAsset}
            >
              <option disabled>Choose Asset </option>

              {assets?.map((asset: any) => (
                <option key={asset.id}>{asset?.name}</option>
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
              onClick={handleAsset}
            >
              {assets?.map((cryptoNetworks: any, index: any) => (
                <option key={index}>
                  {cryptoNetworks.networks.map((network: any) => (
                    <option key={network.name}>
                      {network.name}
                      {console.log(cryptoNetworks.sellRate, "selling")}
                    </option>
                  ))}
                </option>
              ))}
            </select>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>
              <Input
                label="You pay"
                placeholder="NGN"
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
                value={payValue}
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
        open={open}
        onClose={handleClose}
        payValue={payValue}
        network={network}
        asset={asset}
      />
    </div>
  );
};

export default Crypto;
