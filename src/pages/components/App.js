import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProductsListing from "../containers/AllProductsListing";
import ClothesListing from "../containers/ClothesListing";
import TechListing from "../containers/TechListing";
import WrappedDetailsPage from "../containers/ProductDesc";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { queryAllData } from "../../redux/index";

class App extends React.Component {
  componentDidMount() {
    console.log("App.js has mounted");
    queryAllData();
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            // path="/Categories/All"
            element={<AllProductsListing />}
          />
          <Route
            exact
            path="/Categories/All/:id"
            element={<WrappedDetailsPage />}
          />
          <Route
            exact
            path="/Categories/Clothes"
            element={<ClothesListing />}
          />
          <Route exact path="/Categories/Tech" element={<TechListing />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps)(App);
