import DashboardContainer from "@/components/DashboardNavigation/dashboardContainer";
import { Box } from "@mui/material";

import React from "react";

const index = () => {
  return (
    <Box>
      <DashboardContainer
        title="Dashboard"
        subtitle="An overview of your assets "
      >
        Dashboard
      </DashboardContainer>
    </Box>
  );
};

export default index;
