import React from "react";
import { NavLink } from "react-router-dom";
import { blackCart, blackWheel } from "../../assets/blackShoppingCart";
import { up, down } from "../../assets/updownArrows";
import {
  logoSvg,
  belowLogo,
  logoMark,
  logoMarkArrow,
} from "../../assets/logoIcon";
import { connect } from "react-redux";
import { currencyChange } from "../../redux";
import { navlinkStyles } from "../../styled/NavbarElements";
import CartOverlay from "../containers/CartOverlay";
import { sneakQuantity } from "../../Utils/utilities";

const currencyOptions = [
  {
    symbol: "$",
    label: "USD",
  },
  {
    symbol: "£",
    label: "GBP",
  },
  {
    symbol: "A$",
    label: "AUD",
  },
  {
    symbol: "¥",
    label: "JPY",
  },
  {
    symbol: "₽",
    label: "RUB",
  },
];

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOverlayOpen: false, isDropdownOpen: false };
    this.currencyRef = React.createRef();
    this.overlayRef = React.createRef();
    this.checkIfClickedOutside = this.checkIfClickedOutside.bind(this);
  }

  checkIfClickedOutside = (e) => {
    console.log(
      "and you ?",
      this.state.isOverlayOpen,
      this.overlayRef.current,
      !this.overlayRef.current.contains(e.target),
      e
    );
    if (
      this.state.isOverlayOpen &&
      this.overlayRef.current &&
      !this.overlayRef.current.contains(e.target)
    ) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isOverlayOpen: !prevState.isOverlayOpen,
        };
      });
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.checkIfClickedOutside);
  }

  // componentDidUpdate(prevProps, prevState, event) {
  //   console.log(
  //     "these two",
  //     prevState.isOverlayOpen,
  //     this.state.isOverlayOpen,
  //     event
  //   );
  //   if (prevState.isOverlayOpen !== this.state.isOverlayOpen) {
  //     this.checkIfClickedOutside(event);
  //   }
  // }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.checkIfClickedOutside);
  }

  showCartOverlay = () => {
    this.setState((prevState) => ({
      ...prevState,
      isOverlayOpen: !prevState.isOverlayOpen,
    }));
  };

  handleDropdownClick = () => {
    const ele = document.getElementById("dropdown-content");
    const caron = document.getElementById("dropdown-caron");
    const caret = document.getElementById("dropdown-caret");
    ele.classList.toggle("show");
    caron.classList.toggle("hidden-arrow");
    if (caret.classList.contains("caret")) {
      caret.classList.remove("caret");
      caret.classList.add("visible-arrow");
    } else {
      caret.classList.remove("visible-arrow");
      caret.classList.add("caret");
    }
  };

  // handleCartOverlay = () => {
  //   const cartOverlay = document.getElementById("cartOverlay-content");
  //   cartOverlay.classList.remove("show");
  // };

  handleCurrencyChange = (option) => {
    this.props.dispatch(currencyChange(option));
  };

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-links">
            <div>
              <NavLink
                to="/Categories/All"
                style={navlinkStyles}
                className={({ isActive }) =>
                  isActive ? "active-navlink" : "navbar-link"
                }
              >
                All
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/Categories/Clothes"
                style={navlinkStyles}
                className={({ isActive }) =>
                  isActive ? "active-navlink" : "navbar-link"
                }
              >
                Clothes
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/Categories/Tech"
                style={navlinkStyles}
                className={({ isActive }) =>
                  isActive ? "active-navlink" : "navbar-link"
                }
              >
                Tech
              </NavLink>
            </div>
          </div>
          <div className="logo">
            <span className="main-logo">
              {logoSvg}
              <span className="logo-mark">{logoMark}</span>
              <span className="logo-mark-arrow">{logoMarkArrow}</span>
              <span className="background-svg">{belowLogo}</span>
            </span>
          </div>
          <div className="dropdown">
            <div className="buttons">
              <button
                type="button"
                className="dropdownBtn"
                onClick={this.handleDropdownClick}
              >
                {this.props.currency.symbol}
                <div className="arrows">
                  <span className="caret" id="dropdown-caret">
                    {up}
                  </span>
                  <span className="caron" id="dropdown-caron">
                    {down}
                  </span>
                </div>
              </button>
              <ul className="dropdown-menu" id="dropdown-content">
                {currencyOptions.map((opt) => {
                  return (
                    <li
                      key={opt.label}
                      onClick={() => this.handleCurrencyChange(opt)}
                    >
                      {opt.symbol} {opt.label}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="cartOverlay-div" ref={this.overlayRef}>
              <div
                className="cartOverlay-cart"
                onClick={() => this.showCartOverlay()}
              >
                <span className="black-cart">{blackCart}</span>
                <span className="left-black-wheel">{blackWheel}</span>
                <span className="right-black-wheel">{blackWheel}</span>
                <div
                  className={
                    sneakQuantity(this.props.cartData.cart)
                      ? "sneak-count"
                      : "hide-count"
                  }
                >
                  {sneakQuantity(this.props.cartData.cart)}
                </div>
              </div>
              {this.state.isOverlayOpen ? (
                <div className="cartOverlay-wrapper">
                  <CartOverlay />
                </div>
              ) : null}
            </div>
          </div>
        </nav>
      </>
    );
  }
}

window.onclick = function (event) {
  if (!event.target.matches(".dropdownBtn")) {
    let ele = document.getElementById("dropdown-content");
    let caron = document.getElementById("dropdown-caron");
    const caret = document.getElementById("dropdown-caret");
    if (
      ele.classList.contains("show") &&
      caron.classList.contains("hidden-arrow")
    ) {
      ele.classList.remove("show");
      caron.classList.remove("hidden-arrow");
    }
    if (caret.classList.contains("visible-arrow")) {
      caret.classList.remove("visible-arrow");
      caret.classList.add("caret");
    }
  }
};

const mapStateToProps = (state) => ({
  currency: state.selectedCurrency,
  cartData: state.cartData,
});

export default connect(mapStateToProps)(Navbar);
