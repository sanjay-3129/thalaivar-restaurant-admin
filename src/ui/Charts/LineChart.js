import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const LineChart = (props) => {
  // const [labels, setLabels] = useState(null);
  // const [data, setData] = useState(null);
  // const [config, setConfig] = useState(null);

  useEffect(() => {
    let labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let stat = props.stat;
    if (props.filter.type === "month") {
      // labels = ["week1", "week2", "week3", "week4"];
      labels = [];
      for (let i = 0; i < stat.onlineStat.length; i++) {
        if (i < 9) {
          labels.push("0" + (i + 1));
        } else {
          labels.push(i + 1);
        }
      }
    } else if (props.filter.type === "day") {
      labels = [
        "6-8am",
        "8-10am",
        "10-11.50am",
        "12-2pm",
        "2-4pm",
        "4-6pm",
        "6-8pm",
        "8-10pm",
        "10-11.59pm",
        "12-6am"
      ];
    }
    let data = {
      labels: labels,
      datasets: [
        {
          label: "Online",
          data: stat.onlineStat,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1
        },
        {
          label: "DineIn",
          data: stat.dineInStat,
          fill: false,
          borderColor: "tomato",
          tension: 0.1
        }
      ]
    };
    // setConfig();
    let config = {
      type: "line",
      data: data,
      options: {}
    };

    const chart = new Chart(document.getElementById("lineChart"), config);
    // when component unmounts
    return () => {
      chart.destroy();
    };
  }, [props.stat]);

  // useEffect(() => {
  //   const chart = new Chart(document.getElementById("lineChart"), config);
  //   // when component unmounts
  //   return () => {
  //     chart.destroy();
  //   };
  // }, []);

  return (
    <div className="lineChart">
      <h1>Orders - {props.filter.value}</h1>

      <br />

      <canvas id="lineChart"></canvas>
    </div>
  );
};

export default LineChart;
