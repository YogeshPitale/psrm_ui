import React from "react";
import ReactApexChart from "react-apexcharts";

const DynamicLineChart = (props) => {
  const series = [
    {
      name: "Current Position",
      data: props.dataPoints.slice(-15),
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      animations: {
             enabled: false,
             easing: 'easeinout',
             speed: 500,
             animateGradually: {
                 enabled: false,
                 delay: 500
             },
             dynamicAnimation: {
                 enabled: true,
                 speed: 500
             }
         },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Current Position by Timestamp",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      type: "numeric",
      tickPlacement: "between",
      title: {
        text: "Timestamp (hh:mm:ss*)",
      },
      // labels: {
      //   show: props.dataPoints.length <= 10 ? true : false,
      // },
    },
    yaxis: {
      type: "numeric",
      tickPlacement: "between",
      title: {
        text: "Current Position",
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
        width={"100%"}
      />
    </div>
  );
};

export default DynamicLineChart;
