import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const PieChart = (props) => {
  useEffect(() => {
    const labels = ["Online", "Dine-In"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Revenue",
          data: [props.stat.onlineRevenue, props.stat.dineInRevenue],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)"
          ],
          hoverOffset: 4
        }
      ]
    };

    const config = {
      type: "pie",
      data: data,
      options: {}
    };
    const chart = new Chart(document.getElementById("pieChart"), config);
    // when component unmounts
    return () => {
      chart.destroy();
    };
  }, [props.stat]);

  return (
    <div className="piechart">
      <h1>Total Revenue</h1>
      <br />
      <canvas id="pieChart"></canvas>
    </div>
  );
};

export default PieChart;
