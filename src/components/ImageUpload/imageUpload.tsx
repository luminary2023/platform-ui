"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "../pages/giftCard/giftcard.module.css";

interface ImageUploadProps {}

const hiddenInputStyle: React.CSSProperties = {
  display: "none",
};

const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

const ImageUpload: React.FC<ImageUploadProps> = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).filter((file) =>
        allowedImageTypes.includes(file.type)
      );
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleIconClick = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => {
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
          onChange={handleImageChange}
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
        {selectedImages.map((image, index) => (
          <div key={index} style={{ display: "inline-block", margin: "8px" }}>
            <img
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
