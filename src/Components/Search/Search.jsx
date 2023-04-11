import { useState, useEffect, useContext } from "react";
import finnHub from "../../APIs/finnHub";
import { WatchListContext } from "../../context/watchListContext";
import "./Search.scss";
const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock } = useContext(WatchListContext);

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul className={`dropdown-menu   ${dropDownClass}`}>
        {results.map((result) => {
          return (
            <li
              key={result.symbol}
              className="dropdown-item"
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
            >
              {result.description}
              {result.symbol}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });

        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);
  return (
    <div className="search-container w-50 p-3 mt-5 mb-5 rounded mx-auto">
      <div className="form-floating dropdown rounded ">
        <input
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search a stock</label>

        {renderDropdown()}
      </div>
    </div>
  );
};

export default Search;
