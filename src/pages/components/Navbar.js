import React from "react";
import { Link } from "react-router-dom";
import cartIcon from "../../assets/icons8-shopping-cart-32.png";
import { logoSvg } from "../../assets/LogoSvg";
import { logoMark } from "../../assets/LogoMark";
import { logoMarkArrow } from "../../assets/LogoMarkArrow";

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
    ele.classList.toggle("show");
  };

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-div">
            <div>
              <Link to="/">All</Link>
              <Link to="/Clothes">Clothes</Link>
              <Link to="/Tech">Tech</Link>
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
                </button>
                <img src={cartIcon} />
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
          </div>
          {/* <div>Shopping cart icon goes here ... </div> */}
        </nav>
      </>
    );
  }
}

window.onclick = function (event) {
  if (!event.target.matches(".dropdownBtn")) {
    let ele = document.getElementById("dropdown-content");
    if (ele.classList.contains("show")) ele.classList.remove("show");
  }
};

export default Navbar;
