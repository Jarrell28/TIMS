import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Link } from "react-router-dom";

import "../css/nav.css";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const MainNav = props => {

  //Logout function
  const logout = () => {
    sessionStorage.removeItem("usertoken");
    window.location.href = "/login";
  }

  return (
    <SideNav
      className="navShadow"
    >
      <SideNav.Toggle />
      {/* TIMS LOGO */}
      <SideNav.Nav selected={props.activePage}>
        <Link to="/">
          <img
            src="images/TIMS-logo-06.svg"
            className="navLogo"
            alt="title or description"
          />
        </Link>

        {/* PRODUCT SEARCH TAB */}
        {/* LINK WITH DROP DOWN*/}
        <NavItem eventKey="products" onClick={props.checkPage}>
          <NavIcon>
            <Link to="/">
              {" "}
              <i className="fa fa-search" style={{ color: "#fff", fontSize: "1.75em" }} />
            </Link>
          </NavIcon>
          <NavText>
            <Link to="/">Product Search</Link>
          </NavText>

          {/* Loops mainNav array from App.js to display sublinks under Product Search */}
          {props.mainNav.map((nav, index) => {
            return (
              <NavItem
                key={"mainNav_Context_" + index}
              // eventKey={"product/barchart-" + index}
              >
                <NavText onClick={() => props.onContextClick(nav.destination)}>
                  {nav.title}
                </NavText>
              </NavItem>

            );
          })}
        </NavItem>


        {/* LAPTOP LOANERS (SINGLE LINK) */}
        <NavItem eventKey="laptop" onClick={props.checkPage}>
          <NavIcon>
            <Link to="/loaners">
              {" "}
              <i
                className="fa fa-laptop"
                style={{ color: "#fff", fontSize: "1.75em" }}
              />
            </Link>
          </NavIcon>
          <NavText className="subTitle">
            <Link to="/loaners">Laptop Checkout</Link>
          </NavText>
          <NavItem eventKey="products/loaners-mac">
            <NavText>Mac</NavText>
          </NavItem>
          <NavItem eventKey="products/loaners-windows">
            <NavText>Windows</NavText>
          </NavItem>
        </NavItem>

        {/* YOUR HISTORY (SINGLE LINK) */}
        <NavItem eventKey="user" onClick={props.checkPage}>
          <NavIcon>
            <Link to="/profile">
              {" "}
              <i
                className="fa fa-user"
                style={{ color: "#fff", fontSize: "1.75em" }}
              />
            </Link>
          </NavIcon>
          <NavText className="subTitle">
            <Link to="/profile">Profile</Link>
          </NavText>
        </NavItem>

        {/* LOGOUT (SINGLE LINK) */}
        <NavItem eventKey="logOut">
          <NavIcon onClick={logout}>
            <i
              className="fa fa-sign-out"
              style={{ color: "#fff", fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText className="subTitle" onClick={logout}>Logout</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default MainNav;
