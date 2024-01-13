import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { Box, MenuItem, Menu, Fade } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Button } from "../../Button/Button";
import Image from "next/image";
import TreadingUp from "../../../assets/images/trendingUp.svg";
import ICN from "../../../assets/images/Icn.svg";
import Line from "../../../assets/images/BarLine.svg";
import PieChart from "../../../services/pieChart";
import DashboardTable from "../../Table/tableTwo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import tableStyles from "../../../pages/wallet/wallet.module.css";
import AmazonCard from "../../../assets/images/Amazon.svg";
import AmericanCard from "../../../assets/images/americanCard.svg";
import MediaCard from "../../../assets/images/mediaCard.svg";
import { profileRequest } from "@/api/profile";
import { useThemeContext } from "@/api/useContext/store";

const giftCards = [
  {
    Image: AmazonCard,
  },
  {
    Image: AmericanCard,
  },
  {
    Image: MediaCard,
  },
  {
    Image: MediaCard,
  },
];

const Dashboard = () => {
  // const { profileData } = useThemeContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profileData, setProfileData] = useState<any>({});
  // const [error, setError] = useState<boolean>(false);

  const fetchProfile = async () => {
    try {
      const res = await profileRequest();
      setProfileData(res);
    } catch (error: any) {
      return error?.response?.data;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const tableHeaderData = [
    "Date",
    "Type",
    "Asset",
    "Description",
    "Amount",
    "Status",
  ];

  return (
    <div>
      <div className={styles.dashboardSection}>
        <div className={styles.dashboardTransactionAnalysis}>
          <div className={styles.dashboardAnalysis}>
            <div className={styles.portfolioBalance}>
              <div className={styles.portfolioBg}>
                <h2>NGN {profileData?.wallet?.balance}</h2>
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
              <PieChart />

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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "17px",
              }}
            >
              <Box>
                <h3>Quick Buy</h3>
              </Box>
              <Box
                sx={{
                  background:
                    "var(--linear-1, linear-gradient(135deg, #FD6E6A 0%, #FFC600 100%))",
                  padding: 1,
                  color: "#fff",
                  borderRadius: 5,
                  marginLeft: "7px",
                  fontSize: "14px",
                }}
              >
                Coming soon
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "112px",
                alignItems: "center",
                justifyContent: "space-between",
                alignSelf: "stretch",
                marginTop: "32px",
                marginBottom: "32px",
              }}
            >
              {giftCards.map((giftcard, key) => (
                <Box
                  key={key}
                  sx={{
                    padding: "13px 10.25px 13px 10px",
                    borderRadius: " 20px",
                    border: "1px solid var(--e-0-e-0-e-0, #E0E0E0)",
                    background: "#FFF",
                  }}
                >
                  <Image src={giftcard.Image} alt="amazon" />
                </Box>
              ))}
            </Box>

            <Button
              color="primary"
              variant="contained"
              disabled={true}
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
            <div className={styles.crytoRate}>
              <div className={styles.figures}>
                <div className={styles.cryptoName}>
                  <p>BTC</p>
                  <Image
                    src={ICN}
                    alt="icn"
                    style={{ marginRight: "14.3px" }}
                  />
                  <p>USD</p>
                  <p style={{ color: "#E3507A", fontSize: "10px" }}>5.23%</p>
                </div>
                <h3>7.356,67</h3>
              </div>
              <Image src={Line} alt="line" style={{ marginRight: "14.3px" }} />
              <div className={styles.figures}>
                <div className={styles.cryptoName}>
                  <p>ETH</p>
                  <Image
                    src={ICN}
                    alt="icn"
                    style={{ marginRight: "14.3px" }}
                  />
                  <p>USD</p>
                  <p style={{ color: "#2BB596", fontSize: "10px" }}>5.23%</p>
                </div>
                <h3>7.356,67</h3>
              </div>
              <Image src={Line} alt="line" style={{ marginRight: "14.3px" }} />
              <div className={styles.figures}>
                <div className={styles.cryptoName}>
                  <p>ETH</p>
                  <Image
                    src={ICN}
                    alt="icn"
                    style={{ marginRight: "14.3px" }}
                  />
                  <p>USD</p>
                  <p style={{ color: "#E3507A", fontSize: "10px" }}>5.23%</p>
                </div>
                <h3>7.356,67</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={tableStyles.tableContainer}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className={tableStyles.tableTitle}>History</h1>
          <div className={tableStyles.filterWrapper}>
            <p>All</p>
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              <KeyboardArrowDownIcon />
            </div>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Newest</MenuItem>
              <MenuItem onClick={handleClose}>Oldest</MenuItem>
            </Menu>
          </div>
        </div>
        <DashboardTable tableHeaderData={tableHeaderData} />
      </div>
    </div>
  );
};

export default Dashboard;
