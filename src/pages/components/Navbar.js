import React from "react";
// import { Nav, NavMenu, NavLink } from "../../styled/NavbarElements";
import { Link } from "react-router-dom";

const currencyOptions = [
  {
    label: "$",
    value: "USD",
  },
  {
    label: "€",
    value: "EUR",
  },
  {
    label: "¥",
    value: "YEN",
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
            <div className="dropdown" onClick={this.handleDropdownClick}>
              <button type="button" className="dropdownBtn">
                Btn
              </button>
              <ul className="dropdown-menu" id="dropdown-content">
                {currencyOptions.map((opt) => {
                  return (
                    <li key={opt.value}>
                      {opt.label} {opt.value}
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
