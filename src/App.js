import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WrappedProductListing from "./pages/ProductListing";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WrappedProductListing />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
