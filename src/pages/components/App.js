import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProductsListing from "../containers/AllProductsListing";
import ClothesListing from "../containers/ClothesListing";
import TechListing from "../containers/TechListing";
// import WrappedDetailsPage from "../containers/ProductDesc";
import DetailsPage from "../containers/ProductDesc";
import CartPage from "../containers/CartPage";
import Navbar from "./Navbar";
// import { Query } from "react-apollo";
import { connect } from "react-redux";
// import { queryAllData } from "../../redux/index";
import { queryCommand } from "../../gql/Query";
import TestComponent from "./Test";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shadedHeight: 0 };
    this.pageRef = React.createRef();
  }

  componentDidMount() {
    console.log(
      "what's this",
      this.pageRef.current?.scrollHeight,
      this.state.shadedHeight
    );
    if (this.pageRef.current?.scrollHeight !== this.state.shadedHeight) {
      this.setState((prevState) => {
        return {
          ...prevState,
          shadedHeight: this.pageRef.current?.scrollHeight,
        };
      });
    }
  }

  // componentDidUpdate(prevState) {
  //   console.log(
  //     "height",
  //     prevState.shadedHeight,
  //     this.pageRef.current.scrollHeight
  //   );
  //   if (prevState.shadedHeight == this.pageRef.current?.scrollHeight) return;
  // }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="main-section">
          <div className="main-section-content" ref={this.pageRef}>
            <Routes>
              <Route exact path="/" element={<TestComponent />} />
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
                path="/Categories/:category/:id"
                element={<DetailsPage />}
              />
              <Route exact path="/CartPage" element={<CartPage />} />
            </Routes>
          </div>
          <div
            className={
              this.props.freezeState.freeze ? "main-section-overlay" : ""
            }
            style={{ height: `${this.state.shadedHeight}px` }}
          ></div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({ freezeState: state.freezeState });

export default connect(mapStateToProps)(App);
