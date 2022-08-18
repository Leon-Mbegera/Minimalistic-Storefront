import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProductsListing from "../containers/AllProductsListing";
import ClothesListing from "../containers/ClothesListing";
import TechListing from "../containers/TechListing";
import WrappedDetailsPage from "../containers/ProductDesc";
import Navbar from "./Navbar";
import { Query } from "react-apollo";
import { connect } from "react-redux";
// import { queryAllData } from "../../redux/index";
import { queryCommand } from "../../gql/Query";
import TestComponent from "./Test";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            // path="/Categories/All"
            // element={<AllProductsListing />}
            element={<TestComponent />}
          />
          <Route
            exact
            path="/Categories/All"
            element={<AllProductsListing />}
          />
          <Route
            exact
            path="/Categories/Clothes"
            element={<ClothesListing />}
          />
          <Route exact path="/Categories/Tech" element={<TechListing />} />
          <Route
            exact
            path="/Categories/:Category/:Product"
            element={<WrappedDetailsPage />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
