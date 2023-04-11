import { useState, useEffect, useContext } from "react";
import finnHub from "../../APIs/finnHub";
import { WatchListContext } from "../../context/watchListContext";
import { useNavigate } from "react-router-dom";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StockList.scss";
const StockList = () => {
  const [stock, setStock] = useState([]);
  const { watchList, deleteStock } = useContext(WatchListContext);
  const changeColor = (change) => (change > 0 ? "success" : "danger");
  const navigate = useNavigate();

  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

  const handleStockSelect = (symbol) => {
    navigate(`details/${symbol}`);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        console.log(data);
        if (isMounted) {
          setStock(data);
        }
      } catch (err) {}
    };
    fetchData();
    return () => (isMounted = false);
  }, [watchList]);

  return (
    <main className="container  form-container rounded my-3">
      <div className="table-responsive">
        <table className="table hover m-2">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Last</th>
              <th scope="col">Chg</th>
              <th scope="col">Chg%</th>
              <th scope="col">High</th>
              <th scope="col">Low</th>
              <th scope="col">Open</th>
              <th scope="col">Close</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((stockData) => {
              return (
                <tr
                  key={stockData.symbol}
                  className="table-row "
                  onClick={() => {
                    handleStockSelect(stockData.symbol);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <th scope="row">{stockData.symbol}</th>
                  <td>{stockData.data.c}</td>
                  <td className={`text-${changeColor(stockData.data.d)}`}>
                    {stockData.data.d}
                    {renderIcon(stockData.data.d)}
                  </td>
                  <td className={`text-${changeColor(stockData.data.dp)}`}>
                    {stockData.data.dp} {renderIcon(stockData.data.dp)}
                  </td>
                  <td>{stockData.data.h} </td>
                  <td>{stockData.data.l} </td>
                  <td>{stockData.data.o} </td>
                  <td>{stockData.data.pc} </td>
                  <button
                    className="btn btn-sm d-inline-block delete-button "
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStock(stockData.symbol);
                    }}
                  >
                    X
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default StockList;
