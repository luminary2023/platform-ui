"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "../../../components/Button/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageUploading from "react-images-uploading";
import { sellCryptoApi } from "@/api/sellCrypto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellCryptoSchema } from "@/services/schemaVarification";

interface Props {
  open: boolean;
  onClose: () => void;
  handleCrypto: () => void;
}

interface SellCryptoProps {
  assetId: string;
  networkId: string;
  assetAmount: string;
  proof: string;
  transactionPin: string;
  comment: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function UploadImage({ open, onClose, handleCrypto }: Props) {
  const [sellCrypto, setSellCrypto] = useState({});
  console.log(sellCrypto);

  const [images, setImages] = useState([]);
  const maxNumber = 3;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleSellCrypto = async (data: SellCryptoProps) => {
    handleCrypto();
    const response = await sellCryptoApi(data);
    if (response?.statusCode === 201 && response.status === "Created") {
      alert("Successful Transaction");
    }
    setSellCrypto(response);
    console.log(sellCrypto);
    console.log(data);
  };
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<SellCryptoProps>({
    resolver: zodResolver(sellCryptoSchema),
  });
  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(handleSellCrypto)}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                Upload transaction proof
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 500,
                  float: "right",
                  cursor: "pointer",
                }}
                onClick={onClose}
              >
                X
              </Typography>
            </Box>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI

                <div className="upload__image-wrapper">
                  &nbsp;
                  {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="image-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginBottom: "20px",
                      }}
                    >
                      <img src={image["data_url"]} alt="" width="60%" />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <button
                          onClick={() => onImageUpdate(index)}
                          style={{
                            marginRight: "15%",
                          }}
                        >
                          Update
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  <div
                    //   style={isDragging ? { color: "red" } : undefined}
                    style={{
                      width: "100%",
                      color: "primary",
                      textAlign: "center",
                      textDecoration: "underline",
                      marginTop: "20px",
                      cursor: "pointer",
                    }}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {images.length < 1 && " Upload image"}
                  </div>
                </div>
              )}
            </ImageUploading>

            <Button
              color="primary"
              variant="contained"
              sx={{ width: "100%", transform: "initial", mt: "30px" }}
              type="submit"
            >
              Proceed
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
