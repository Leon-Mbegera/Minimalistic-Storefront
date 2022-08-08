import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProductsListing from "../containers/AllProductsListing";
import ClothesListing from "../containers/ClothesListing";
import TechListing from "../containers/TechListing";
import Navbar from "./Navbar";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<AllProductsListing />} />
          <Route exact path="/Clothes" element={<ClothesListing />} />
          <Route exact path="/Tech" element={<TechListing />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
