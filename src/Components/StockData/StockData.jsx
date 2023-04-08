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
    return () => (isMounted = false);
  }, [symbol]);

  return (
    <div>
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
          <div className="col">
            <div>
              <span className="fw-bold">name: {stockData.name}</span>
            </div>
            <div>
              <span className="fw-bold">country: {stockData.country}</span>
            </div>
            <div>
              <span className="fw-bold">ticker: {stockData.ticker}</span>
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: {stockData.exchange}</span>
            </div>
            <div>
              <span className="fw-bold">
                Industry: {stockData.finnhubIndustry}
              </span>
            </div>
            <div>
              <span className="fw-bold">IPO: {stockData.ipo}</span>
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">
                MarketCap: {stockData.marketCapitalization}
              </span>
            </div>
            <div>
              <span className="fw-bold">
                Shares Outstanding:{stockData.sharesOutstanding}
              </span>
            </div>
            <div>
              <span className="fw-bold">url:{stockData.url}</span>
              <a href={stockData.weburl}>{stockData.weburl}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockData;
