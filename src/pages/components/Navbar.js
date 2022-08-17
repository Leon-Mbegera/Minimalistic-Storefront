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

const currencyOptions = [
  {
    symbol: "$",
    label: "USD",
  },
  {
    symbol: "€",
    label: "EUR",
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

  handleCurrencyChange = (option) => {
    console.log("option", option, currencyChange(option));
    this.props.dispatch(currencyChange(option));
    // console.log("the store", store.getState());
  };

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-links">
            <NavLink
              to="/Categories/All"
              style={navlinkStyles}
              className={({ isActive }) =>
                isActive ? "active-navlink" : "navbar-link"
              }
            >
              All
            </NavLink>
            <NavLink
              to="/Categories/Clothes"
              style={navlinkStyles}
              className={({ isActive }) =>
                isActive ? "active-navlink" : "navbar-link"
              }
            >
              Clothes
            </NavLink>
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
          <div>
            <span className="main-logo">
              {logoSvg}
              <span className="logo-mark">{logoMark}</span>
              <span className="logo-mark-arrow">{logoMarkArrow}</span>
              <span className="background-svg">{belowLogo}</span>
            </span>
          </div>
          <div className="dropdown" onClick={this.handleDropdownClick}>
            <div className="buttons">
              <button type="button" className="dropdownBtn">
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
              <div className="cartOverlay-cart">
                <span className="black-cart">{blackCart}</span>
                <span className="left-black-wheel">{blackWheel}</span>
                <span className="right-black-wheel">{blackWheel}</span>
              </div>
            </div>
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
});

export default connect(mapStateToProps)(Navbar);
