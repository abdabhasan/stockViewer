import Chart from "react-apexcharts";
import { useState } from "react";
import { ChartButtons } from "../index";
import "./StockChart.scss";

const StockChart = ({ chartData, symbol }) => {
  const { day, week, year } = chartData;
  const [dateFormat, setDateFormat] = useState("7d");

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const color =
    determineTimeFormat()[determineTimeFormat().length - 1].y -
      determineTimeFormat()[0].y >
    0
      ? "#03d069"
      : "#ed3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  return (
    <>
      <Chart options={options} series={series} type="area" width={"90%"} />
      <div className="chart-buttons">
        <ChartButtons dateFormat={dateFormat} setDateFormat={setDateFormat} />
      </div>
    </>
  );
};

export default StockChart;
