import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockDetailsPage, StockOverviewPage } from "./Pages/index";
import "./App.scss";
function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/" element={<StockOverviewPage />} />
          <Route path="/details/:symbol" element={<StockDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

//! make the details page responsive and write README file and commit changes

export default App;
