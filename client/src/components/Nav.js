import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

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
            <SideNav.Nav defaultSelected="home">


                {/* PRODUCT SEARCH TAB */}
                {/* LINK WITH DROP DOWN*/}
                <NavItem eventKey="products">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
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
                <NavItem eventKey="history">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText className="subTitle">Laptop Checkout</NavText>
                </NavItem>


                {/* YOUR HISTORY (SINGLE LINK) */}
                <NavItem eventKey="history">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>Your History</NavText>
                </NavItem>


                {/* LOG OUT (SINGLE LINK) */}
                <NavItem eventKey="history">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>Log Out</NavText>
                </NavItem>

            </SideNav.Nav>
        </SideNav>
    )
}

export default MainNav;