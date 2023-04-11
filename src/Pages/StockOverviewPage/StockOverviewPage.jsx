import { Search, StockList, Logo } from "../../Components/index";
import { WatchListContextProvider } from "../../context/watchListContext";
import "./StockOverviewPage.scss";
const StockOverviewPage = () => {
  return (
    <div className="row h-100">
      <div className="col-lg-4  logo-container">
        <Logo />
      </div>
      <div className="col-lg-8 stock-list-container d-flex  align-items-center flex-column">
        <WatchListContextProvider>
          <Search />
          <StockList />
        </WatchListContextProvider>
      </div>
    </div>
  );
};

export default StockOverviewPage;
