import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import CartPage from "../containers/CartPage";
// import Navbar from "./Navbar";
// import AllProducts from "./AllProducts";
// import Clothes from "./Clothes";
// import Tech from "./Tech";
import Categories from "./Categories";
import Product from "./Product";
import Navigation from "./Navigation";

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
        <Navigation />
        <div className="main-section">
          <div className="main-section-content" ref={this.pageRef}>
            <Routes>
              <Route path="/" element={<Navigate to="/all"/>}/>
              <Route exact path="/:categoryName" element={<Categories />}/>
              <Route exact path="/:category/:id" element={<Product />} />
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
