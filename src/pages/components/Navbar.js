import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavMenu, NavLink } from "../../styled/NavbarElements";

class Navbar extends React.Component {
  <>
    <Nav>
      <NavMenu>
        <NavLink to="/">All</NavLink>
        <NavLink to="/Clothes">Clothes</NavLink>
        <NavLink to="/Tech">Tech</NavLink>
      </NavMenu>
    </Nav>
  </>
}

export default Navbar;
