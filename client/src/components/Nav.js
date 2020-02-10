import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '../css/nav.css';
import logo from '../images/TIMS-logo-06.svg';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const MainNav = () => {
    return (
        <SideNav

            onSelect={(selected) => {
                // Add your code here
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="products">

            <img src={logo} className="navLogo" alt='title or description' />

                {/* PRODUCT SEARCH TAB */}
                {/* LINK WITH DROP DOWN*/}
                <NavItem eventKey="products">
                    <NavIcon>
                        <i className="fa fa-search" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Product Search
                    </NavText>
                    <NavItem eventKey="products/linechart">
                        <NavText>Laptops</NavText>
                    </NavItem>
                    <NavItem eventKey="products/barchart">
                        <NavText>Desktops</NavText>
                    </NavItem>
                    <NavItem eventKey="products/barchart">
                        <NavText>Docking Stations</NavText>
                    </NavItem>
                    <NavItem eventKey="products/barchart">
                        <NavText>Hard Drives</NavText>
                    </NavItem>
                    <NavItem eventKey="products/barchart">
                        <NavText>Batteries</NavText>
                    </NavItem>
                    <NavItem eventKey="products/barchart">
                        <NavText>Ram</NavText>
                    </NavItem>
                </NavItem>


                {/* LAPTOP LOANERS (SINGLE LINK) */}
                <NavItem eventKey="laptop">
                    <NavIcon>
                        <i className="fa fa-laptop" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText className="subTitle">Laptop Checkout</NavText>
                </NavItem>


                {/* YOUR HISTORY (SINGLE LINK) */}
                <NavItem eventKey="history">
                    <NavIcon><i className="fas fa-history" style={{ fontSize: '1.75em' }} /></NavIcon>
                    <NavText>Your History</NavText>
                </NavItem>



                {/* LOGOUT (SINGLE LINK) */}
                <NavItem eventKey="logOut">
                    <NavIcon>
                        <i className="fas fa-sign-out-alt" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText className="subTitle">Logout</NavText>
                </NavItem>

            </SideNav.Nav>
        </SideNav>
    )
}

export default MainNav;