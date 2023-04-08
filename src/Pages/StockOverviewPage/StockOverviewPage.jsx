import { Search, StockList, Logo } from "../../Components/index";
import { WatchListContextProvider } from "../../context/watchListContext";
import "./StockOverviewPage.scss";
const StockOverviewPage = () => {
  return (
    <div className="row h-100">
      <div className="col-4  logo-container">
        <Logo />
      </div>
      <div className="col-8 stock-list-container d-flex justify-content-center align-items-center flex-column">
        <WatchListContextProvider>
          <Search />
          <StockList />
        </WatchListContextProvider>
      </div>
    </div>
  );
};

export default StockOverviewPage;
