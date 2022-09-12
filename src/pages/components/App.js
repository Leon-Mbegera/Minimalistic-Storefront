import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsPage from "../containers/ProductDesc";
import CartPage from "../containers/CartPage";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import AllProducts from "./AllProducts";
import Clothes from "./Clothes";
import Tech from "./Tech";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shadedHeight: 0, isLoading: true };
    this.pageRef = React.createRef();
  }

  componentDidMount() {
    if (this.pageRef.current?.scrollHeight !== this.state.shadedHeight) {
      this.setState((prevState) => {
        return {
          ...prevState,
          shadedHeight: this.pageRef.current?.scrollHeight,
        };
      });
    }
  }

  componentDidUpdate() {
    if (this.state.shadedHeight !== this.pageRef.current?.scrollHeight) {
      this.setState((prevState) => {
        return {
          ...prevState,
          shadedHeight: this.pageRef.current?.scrollHeight,
        };
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="main-section">
          <div className="main-section-content" ref={this.pageRef}>
            <Routes>
              <Route exact path="/" element={<AllProducts />} />
              <Route exact path="/Categories/Clothes" element={<Clothes />} />
              <Route exact path="/Categories/Tech" element={<Tech />} />
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
