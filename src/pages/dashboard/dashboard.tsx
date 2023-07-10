import React, { useState } from "react";
import styles from "./dashboard.module.css";
import { Box, Select, MenuItem, Typography, TextField } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Button } from "../../components/Button/Button";
import Image from "next/image";
import Bitcoins from "../../assets/images/Bitcoins.svg";
import Analysis from "../../assets/images/Analysis.svg";
import TreadingUp from "../../assets/images/trendingUp.svg";
import ICN from "../../assets/images/Icn.svg";
import Line from "../../assets/images/BarLine.svg";

const Dashboard = () => {
  const [currency, setCurrency] = useState("Usd");

  const handleCurrency = (e: any) => {
    setCurrency(e.target.value as string);
  };
  return (
    <div className={styles.dashboardSection}>
      <div className={styles.dashboardTransactionAnalysis}>
        <div className={styles.dashboardAnalysis}>
          <div className={styles.portfolioBalance}>
            <div className={styles.portfolioBg}>
              <h2>$107,216</h2>
              <p>Total Portfolio Balance</p>
              <div className={styles.percentage}>
                <Image src={TreadingUp} alt="percent" />

                <p>16.5%</p>
              </div>
            </div>
            <div className={styles.totalBalance}>
              <select>
                <option className={styles.option}>Today</option>
              </select>
              <div className={styles.seeAll}>
                See All{" "}
                <EastIcon
                  style={{
                    color: "#000",
                    width: "16px",
                    height: "16px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.transactionDone}>
            <div className={styles.transactionBg}>
              <h2>$107,216</h2>
              <p>Total Transaction Done</p>
              <div className={styles.percentage}>
                <Image src={TreadingUp} alt="percent" />

                <p>16.5%</p>
              </div>
            </div>
            <div className={styles.totalBalance}>
              <select>
                <option className={styles.option}>Today</option>
              </select>
              <div className={styles.seeAll}>
                See All{" "}
                <EastIcon
                  style={{
                    color: "#000",
                    width: "16px",
                    height: "16px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardQuickBuy}>
          <div className={styles.transactionAnaly}>
            <h1>Transaction Analysis</h1>

            <select>
              <option className={styles.option}>This Week</option>
            </select>
          </div>
          <div className={styles.analysis}>
            <Image src={Analysis} alt="analysis" />
            <div className={styles.crytoList}>
              <div className={styles.crytoAnalysis}>
                <div className={styles.cryptoCircleList}>
                  <div className={styles.circleBlue}></div>
                  <h4>Crypto</h4>
                </div>
                <h5>45%</h5>
              </div>
              <div className={styles.crytoAnalysis}>
                <div className={styles.cryptoCircleList}>
                  <div className={styles.circleYellow}></div>
                  <h4>Gift Cards</h4>
                </div>
                <h5>15%</h5>
              </div>
              <div className={styles.crytoAnalysis}>
                <div className={styles.cryptoCircleList}>
                  <div className={styles.circleRed}></div>
                  <h4>Withdrawals</h4>
                </div>
                <h5>15%</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.quickBuy}>
        <div className={styles.dashboardQuickBuy}>
          <h3>Quick Buy</h3>
          <p style={{ marginBottom: "8px" }}>Select Asset</p>

          <Select
            value={currency}
            onChange={handleCurrency}
            defaultValue={"Bit"}
            sx={{
              background: "#F5F5F5",
              width: "100%",
              height: "54px",
              outline: "none",
              boxShadow: "0px 4px 50px 5px rgba(0, 0, 0, 0.05)",
              marginBottom: "8px",
              border: "1px solid #E8E8E8",
            }}
          >
            <MenuItem value="Usd">
              <Box display="flex" flexDirection="row" alignItems={"center"}>
                <Image src={Bitcoins} alt="bitcoin" />
                <Typography marginLeft={"11px"}> Naira</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="Pound">
              <Box display="flex" flexDirection="row" alignItems={"center"}>
                <Image src={Bitcoins} alt="bitcoin" />
                <Typography marginLeft={"11px"}>USD</Typography>
              </Box>
            </MenuItem>
          </Select>
          <p style={{ marginBottom: "8px" }}>Amount</p>
          <TextField
            sx={{
              background: "#F5F5F5",
              width: "100%",
              height: "54px",
              outline: "none",
              boxShadow: "0px 4px 50px 5px rgba(0, 0, 0, 0.05)",
              marginBottom: "8px",
              border: "1px solid #E8E8E8",
            }}
            type="number"
          />
          <Button
            color="primary"
            variant="contained"
            sx={{
              borderRadius: "8px",
              textTransform: "capitalize",
              width: "100%",
              height: "58px",
              marginTop: "14px",
            }}
          >
            Buy <EastIcon style={{ marginLeft: 9, color: "#fff" }} />
          </Button>
        </div>
        <div className={styles.dashboardQuickBuy}>
          {/* <marquee> */}
          <div className={styles.crytoRate}>
            <div className={styles.cryptoBTC}>
              <div className={styles.cryptoName}>
                <p>BTC</p>
                <Image src={ICN} alt="icn" style={{ marginRight: "14.3px" }} />
                <p>USD</p>
                <p>5.23%</p>
                <Image
                  src={Line}
                  alt="line"
                  style={{ marginRight: "14.3px" }}
                />

                <p>ETH</p>
                <Image src={ICN} alt="icn" style={{ marginRight: "14.3px" }} />
                <p>USD</p>
                <p>5.23%</p>
                <Image
                  src={Line}
                  alt="line"
                  style={{ marginRight: "14.3px" }}
                />
                <p>BTC</p>
                <p>USD</p>
                <p>5.23%</p>
              </div>
            </div>
          </div>
          <div className={styles.cryptoName}>
            <h3>7.356,67</h3>
            <h3>7.356,67</h3>
            <h3>7.356,67</h3>
          </div>
          {/* </marquee> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;