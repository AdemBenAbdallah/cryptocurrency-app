import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cryptocurrencies from "./Pages/Cryptocurrencies";
import Exchanges from "./Pages/Exchanges";
import News from "./Pages/News";
import CryptoDetails from "./Components/CryptoDetails";
import Loader from "./Components/Loader";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/Exchanges" element={<Exchanges />} />
          <Route path="/crypto/:coinID" element={<CryptoDetails />} />
          <Route path="/News" element={<News />} />
          <Route path="/Loader" element={<Loader />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
