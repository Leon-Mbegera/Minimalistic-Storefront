import React from "react";
import { Nav, NavMenu, NavLink } from "../../styled/NavbarElements";

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
        <Nav>
          <NavMenu>
            <NavLink to="/">All</NavLink>
            <NavLink to="/Clothes">Clothes</NavLink>
            <NavLink to="/Tech">Tech</NavLink>
          </NavMenu>
          <div className="dropdown" onClick={this.handleDropdownClick}>
            <button type="button">Btn</button>
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
          {/* <div>Shopping cart icon goes here ... </div> */}
        </Nav>
      </>
    );
  }
}

export default Navbar;
