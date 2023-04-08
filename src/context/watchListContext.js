import { useState, createContext, useEffect } from "react";

const WatchListContext = createContext();

const WatchListContextProvider = ({ children }) => {
  const storedWatchList = localStorage.getItem("watchList");
  const initialWatchList = storedWatchList
    ? JSON.parse(storedWatchList)
    : ["GOOGL", "MSFT", "AMZN"];
  const [watchList, setWatchList] = useState(initialWatchList);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
  };

  const deleteStock = (stock) => {
    setWatchList(
      watchList.filter((element) => {
        return element !== stock;
      })
    );
  };

  return (
    <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {children}
    </WatchListContext.Provider>
  );
};

export { WatchListContext, WatchListContextProvider };
