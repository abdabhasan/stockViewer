import { useState, useEffect } from "react";
import finnHub from "../../APIs/finnHub";
import "./StockData.scss";
const StockData = ({ symbol }) => {
  let isMounted = true;
  const [stockData, setStockData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        console.log(response);
        if (isMounted) {
          setStockData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    //! this is a bug if i use this code stockData doesn't show idk why
    //!return () => (isMounted = false);
  }, [symbol]);

  return (
    <div>
      {stockData && (
        <div className="row data-container d-flex flex-column fs-5 p-4 mt-5">
          <div className="col">
            <div>
              <span>name: </span>
              {stockData.name}
            </div>
            <div>
              <span>country: </span>
              {stockData.country}
            </div>
            <div>
              <span>ticker: </span>
              {stockData.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span>Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span>Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span>IPO: </span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span>MarketCap: </span>
              {stockData.marketCapitalization}
            </div>
            <div>
              <span>Share Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockData;
