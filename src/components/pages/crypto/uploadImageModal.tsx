"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "../../../components/Button/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageUploading from "react-images-uploading";

interface Props {
  open: boolean;
  onClose: () => void;
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

export default function UploadImage({ open, onClose }: Props) {
  const [images, setImages] = useState([]);
  const maxNumber = 3;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
                  {images.length < 1 ? " Upload image" : " Upload more images"}
                </div>
              </div>
            )}
          </ImageUploading>
          {images.length > 0 && (
            <Button
              color="primary"
              variant="contained"
              sx={{ width: "100%", transform: "initial", mt: "30px" }}
            >
              Proceed
            </Button>
          )}
          {/* <Button
            color="primary"
            variant="contained"
            sx={{ width: "100%", transform: "initial", mt: "30px" }}
          >
            Proceed
          </Button> */}
        </Box>
      </Modal>
    </div>
  );
}
