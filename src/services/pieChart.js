import { useEffect } from "react";
import { Box } from "@mui/material";

import { Chart } from "chart.js";
function PieChart() {
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        datasets: [
          {
            data: [20, 15, 15],
            borderColor: ["#4880FF", "#FC555F", "#FFC400"],
            backgroundColor: ["#4880FF", "#FC555F", "#FFC400"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });
  }, []);
  return (
    <Box position="relative">
      <canvas id="myChart" style={{ width: "100%", height: "100%" }}></canvas>
    </Box>
  );
}
export default PieChart;
