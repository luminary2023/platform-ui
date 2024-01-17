"use client";
import React, { useEffect, useMemo, useState } from "react";

import giftcardStyles from "./giftcard.module.css";
import styles from "../../../pages/wallet/wallet.module.css";
// import Input from "@/components/InputField";
import RightDrawer from "@/components/drawer";
import SellGiftCardDrawer from "./sellGiftCardDrawer";
import { AllGiftCardCategories } from "@/api/allGiftCardCategories";
import { GiftCardCurrency } from "@/api/giftCardCategoriesCurrency";
import { IconButton, Input, InputBase, Box, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SellGiftcard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardImage, setCardImage] = useState("");
  const [cardName, setCardName] = useState("");

  const [selectedGiftCard, setSelectedGiftCard] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState("");

  const [searchItem, setSearchItem] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 20;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentPost = selectedGiftCard.slice(firstIndex, lastIndex);

  const handleInputChange = (e: any) => {
    const searchItem = e.target.value;
    setSearchItem(searchItem);
    if (searchItem === "") {
      return GitfCardCategories();
    }
    const filteredItems = selectedGiftCard.filter((giftcard) =>
      giftcard.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    setSelectedGiftCard(filteredItems);
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCardDrawer = async (id: any) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const GitfCardCategories = async () => {
    try {
      const response = await AllGiftCardCategories();
      setSelectedGiftCard(response);
    } catch (error: any) {
      error?.results.data;
    }
  };
  useEffect(() => {
    GitfCardCategories();
  }, []);

  return (
    <div>
      <Box
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          background: "#fff",
          borderRadius: "8px",
          outline: "none",
          border: "1px solid #d0d5dd",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Giftcard category"
          inputProps={{ "aria-label": "Search Giftcard category" }}
          onChange={handleInputChange}
          value={searchItem}
          type="text"
        />
      </Box>

      <div
        className={styles.transactionsTitle}
        style={{ margin: "32px 0 20px 0" }}
      >
        Select Giftcard
      </div>
      <div className={giftcardStyles.wrapper}>
        {currentPost.map((giftcard) => {
          return (
            <div key={giftcard.id}>
              <img
                src={giftcard.image}
                alt="amazon"
                width={200}
                onClick={() => {
                  handleCardDrawer(giftcard.id),
                    setCardImage(giftcard.image),
                    setCardName(giftcard.name);
                }}
              />
            </div>
          );
        })}
      </div>
      <Pagination
        variant="outlined"
        shape="rounded"
        // showFirstButton
        count={currentPost.length}
        defaultPage={currentPage}
        // hideNextButton={false}
        sx={{
          color: "#007C5B",
          mt: "20px",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, newPage) => setCurrentPage(newPage)}
      />

      <RightDrawer
        open={isOpen}
        onClose={toggleDrawer}
        title="Sell GiftCard"
        subTitle="We buy all giftcards"
      >
        <SellGiftCardDrawer
          cardImage={cardImage}
          cardName={cardName}
          selectedId={selectedId}
          btnOnClick={() => {
            setIsOpen(false);
          }}
        />
      </RightDrawer>
    </div>
  );
};

export default SellGiftcard;
