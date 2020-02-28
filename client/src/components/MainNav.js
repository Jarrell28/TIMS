import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Link } from 'react-router-dom';

import '../css/nav.css';
// import logo from '../images/TIMS-logo-06.svg';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const MainNav = (props) => {
    return (
        <SideNav
        className= "navShadow"
            onSelect={(selected) => {
                // Add your code here
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="products">

                <Link to="/"><img src="images/TIMS-logo-06.svg" className="navLogo" alt='title or description' /></Link>

                {/* PRODUCT SEARCH TAB */}
                {/* LINK WITH DROP DOWN*/}
                <NavItem eventKey="products">
                    <NavIcon>
                        <Link to="/"> <i className="fa fa-search" style={{ fontSize: '1.75em' }} /></Link>
                    </NavIcon>
                    <NavText><Link to="/">
                        Product Search
                        </Link></NavText>

                    {props.mainNav.map((nav, index) => {
                        return <NavItem key={"mainNav_Context_" + index} eventKey="products/barchart">
                            <NavText onClick={() => props.onContextClick(nav.destination)}>
                                {nav.title}
                            </NavText>
                        </NavItem>
                    })}

                </NavItem>


                {/* LAPTOP LOANERS (SINGLE LINK) */}
                <NavItem eventKey="laptop">
                    <NavIcon>
                        <Link to="/loaners"> <i className="fa fa-laptop" style={{ color: "#fff", fontSize: '1.75em' }} /></Link>
                    </NavIcon>
                    <NavText className="subTitle"><Link to="/loaners">Laptop Checkout</Link></NavText>
                    <NavItem eventKey="products/loaners-mac">
                        <NavText>Mac</NavText>
                    </NavItem>
                    <NavItem eventKey="products/loaners-windows">
                        <NavText>Windows</NavText>
                    </NavItem>
                </NavItem>


                {/* YOUR HISTORY (SINGLE LINK) */}
                <NavItem eventKey="history">
                    <NavIcon><i className="fa fa-history" style={{ color: "#fff", fontSize: '1.75em' }} /></NavIcon>
                    <NavText>Your History</NavText>
                </NavItem>



                {/* LOGOUT (SINGLE LINK) */}
                <NavItem eventKey="logOut">
                    <NavIcon>
                        <i className="fa fa-sign-out" style={{ color: "#fff", fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText className="subTitle">Logout</NavText>
                </NavItem>

            </SideNav.Nav>
        </SideNav >
    )
}

// axios call
// component did mount
// .map function

// filter by categories

// laptops category
// componentDidMount() {
//     axios.get("/category/:id").then(response => {
//         console.log(response.data)
//         response.data.forEach(item => {
//             item.techName = item.tech.name
//         })
//         this.setState({ rowData: response.data })
//     });



export default MainNav;