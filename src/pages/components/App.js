import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProductsListing from "./pages/AllProductsListing";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllProductsListing />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
