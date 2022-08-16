import React from "react";
import { NavLink } from "react-router-dom";
import cartIcon from "../../assets/icons8-shopping-cart-32.png";
import { logoSvg } from "../../assets/LogoSvg";
import { logoMark } from "../../assets/LogoMark";
import { logoMarkArrow } from "../../assets/LogoMarkArrow";
import { connect } from "react-redux";
import { navlinkStyles } from "../../styled/NavbarElements";

const currencyOptions = [
  {
    symbol: "$",
    label: "USD",
  },
  {
    symbol: "£",
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

  dispatchSelectCurrency = () => {};

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
            </span>
          </div>
          <div className="dropdown" onClick={this.handleDropdownClick}>
            <div className="buttons">
              <button type="button" className="dropdownBtn">
                Btn
                <div className="arrows">
                  <i className="caret" id="dropdown-caret">
                    ^
                  </i>
                  <i className="caron" id="dropdown-caron">
                    ˅
                  </i>
                </div>
              </button>
              <img src={cartIcon} alt="shopping cart" />
            </div>
            <ul className="dropdown-menu" id="dropdown-content">
              {currencyOptions.map((opt) => {
                return (
                  <li key={opt.label}>
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
