import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%,
  height: 80px;
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  z-index: 10;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
`;

export const navlinkStyles = {
  textDecoration: "none",
  textTransform: "uppercase",
};
