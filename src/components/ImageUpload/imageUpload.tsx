"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "../pages/giftCard/giftcard.module.css";
import Image from "next/image";

interface ImageUploadProps {
  handleFile: any;
  setImage: any;
  image: any;
}

const hiddenInputStyle: React.CSSProperties = {
  display: "none",
};

const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

const ImageUpload: React.FC<ImageUploadProps> = ({
  handleFile,
  setImage,
  image,
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  const handleRemoveImage = (index: number) => {
    setImage((prevImages: any) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <>
      <div className={styles.GCDUploadWrapper}>
        <input
          type="file"
          ref={hiddenInputRef}
          onChange={handleFile}
          style={hiddenInputStyle}
          multiple
          accept="image/jpeg, image/png, image/gif"
        />
        <CloudUploadIcon
          style={{ cursor: "pointer", color: "#E8E8E8", fontSize: 50 }}
          onClick={handleIconClick}
        />
        {/* <button onClick={handleUpload}>Upload Image(s)</button> */}
      </div>
      <div>
        {image.map((image: any, index: any) => (
          <div key={index} style={{ display: "inline-block", margin: "8px" }}>
            <Image
              src={URL.createObjectURL(image)}
              alt={`Selected ${index + 1}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUpload;
