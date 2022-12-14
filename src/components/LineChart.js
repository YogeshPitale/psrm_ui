import ReactApexChart from "react-apexcharts";

function LineChart(props) {
  const series = [
    {
      name: "Current Position",
      data: props.dataPoints,
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
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Current Position by Time",
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
        text: "Timestamp (mm:ss*)",
      },
      labels: {
            show: props.dataPoints.length <= 10 ? true : false
          },
    },
    yaxis: {
      type: "numeric",
      tickPlacement: "between",
      title: {
        text: "Current Position in $",
      },
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
}

export default LineChart;
