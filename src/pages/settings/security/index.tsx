"use client";
import React from "react";
import Settingss from "..";
import ProfileSettings from "../index";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import Input from "@/components/InputField";
import { Button } from "@/components/Button/Button";
import backArrow from "../../../assets/images/arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Security = () => {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <ProfileSettings>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            mb: "25px",
          }}
        >
          <Image
            src={backArrow}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
            Login & Security{" "}
          </Typography>
        </Box>
        {/* <div>
          <Accordion
            sx={{
              background: "transparent",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
                Change Transaction Pin
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Input
                // readOnly={true}
                type={"number"}
                label="Enter Old PIN"
                bgColor={"#F2F2F2"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}

                // value={selectedBankDetails?.accountName}
                // register={{ ...register("accountName") }}

                // borderColor={errors.accountName?.message ? "#DF1111" : ""}
              />

              <Input
                // readOnly={true}

                type={"number"}
                label="Enter New PIN"
                bgColor={"#F2F2F2"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}
                // value={selectedBankDetails?.accountName}
                // register={{ ...register("accountName") }}

                // borderColor={errors.accountName?.message ? "#DF1111" : ""}
              />

              <Input
                // readOnly={true}

                type={"number"}
                label="Confirm PIN"
                bgColor={"#F2F2F2"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}
                // value={selectedBankDetails?.accountName}
                // register={{ ...register("accountName") }}

                // borderColor={errors.accountName?.message ? "#DF1111" : ""}
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  textTransform: "capitalize",
                  mt: "10px",
                }}
              >
                Update
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              background: "transparent",
              border: "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Change Password</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div> */}
        <div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              background: "transparent",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
                Change Transaction Pin
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Input
                // readOnly={true}
                type={"number"}
                label="Enter Old PIN"
                bgColor={"#F2F2F2"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}

                // value={selectedBankDetails?.accountName}
                // register={{ ...register("accountName") }}

                // borderColor={errors.accountName?.message ? "#DF1111" : ""}
              />

              <Input
                // readOnly={true}

                type={"number"}
                label="Enter New PIN"
                bgColor={"#F2F2F2"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}
                // value={selectedBankDetails?.accountName}
                // register={{ ...register("accountName") }}

                // borderColor={errors.accountName?.message ? "#DF1111" : ""}
              />

              <Input
                // readOnly={true}

                type={"number"}
                label="Confirm PIN"
                bgColor={"#F2F2F2"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}
                // value={selectedBankDetails?.accountName}
                // register={{ ...register("accountName") }}

                // borderColor={errors.accountName?.message ? "#DF1111" : ""}
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  textTransform: "capitalize",
                  mt: "10px",
                }}
              >
                Update
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{
              background: "transparent",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ fontWeight: "700", color: "#13111F" }}>
                Change Password
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Input
                // readOnly={true}
                type={"text"}
                label="Enter Old Password"
                bgColor={"#F2F2F2"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}

                // value={selectedBankDetails?.accountName}
                // register={{ ...register("accountName") }}

                // borderColor={errors.accountName?.message ? "#DF1111" : ""}
              />

              <Input
                // readOnly={true}

                type={"text"}
                label="Enter New Password"
                bgColor={"#F2F2F2"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}
                // value={selectedBankDetails?.accountName}
                // register={{ ...register("accountName") }}

                // borderColor={errors.accountName?.message ? "#DF1111" : ""}
              />

              <Input
                // readOnly={true}

                type={"text"}
                label="Confirm New Password"
                bgColor={"#F2F2F2"}
                marginBottom={"8px"}
                labelColor={"#081630"}
                labelSize={"16px"}
                // value={selectedBankDetails?.accountName}
                // register={{ ...register("accountName") }}

                // borderColor={errors.accountName?.message ? "#DF1111" : ""}
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  textTransform: "capitalize",
                  mt: "10px",
                }}
              >
                Update
              </Button>
            </AccordionDetails>
          </Accordion>
        </div>
      </ProfileSettings>
    </>
  );
};

export default Security;
