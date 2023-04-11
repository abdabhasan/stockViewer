import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finnHub from "../../APIs/finnHub";
import { StockChart, StockData, Logo } from "../../Components/index";
import "./StockDetailsPage.scss";
const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index]),
    };
  });
};

const StockDetailsPage = () => {
  const [chartData, setChartData] = useState();
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;
      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),

          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        console.log(responses);
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [symbol]);

  return (
    <main className="stock-details-page">
      {chartData && (
        <div className="row">
          <div className="col-md-8 mt-3 position-relative">
            <StockChart chartData={chartData} symbol={symbol} />
          </div>
          <div className="col-md-4   logo-container">
            <div className="row" style={{ height: "33.33%" }}>
              <Logo />
            </div>
            <div className="row">
              <StockData symbol={symbol} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default StockDetailsPage;
