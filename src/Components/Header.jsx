import React from "react";
import "../Style/Header.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <h1>
          <b>Marvel</b> information portal
        </h1>
        <ul>
          <NavLink to="/">Characters</NavLink>
          <span>/</span>
          <NavLink to='/Comics'>Comics</NavLink>
        </ul>
      </header>
    </>
  );
}

export default Header;
