import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import Loaner from "./pages/Loaner";
import Equipment from "./pages/Equipment";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


// class component allows state to be used
class App extends Component {
  state = {
    //Used to filter equipment page via categories
    productContext: 0,
    activePage: "products"
  };

  componentDidMount() {
    //checks current page displays appropriate data
    this.checkPage();
  }

  //Updates productContext when clicking sublink in product ul to filter data
  onContextClick = context => {
    this.setState({ productContext: context });
  };

  //checks current page updates activePage variable to determine data to be displayed
  checkPage = () => {
    const currentPage = window.location.pathname;
    let activePage;
    switch (currentPage) {
      case "/":
        activePage = "products"
        break;
      case "/loaners":
        activePage = "laptop"
        break;
      case "/profile":
        activePage = "user"
        break;
      default:
        activePage = "products"
        break;
    }

    this.setState({ activePage });
  }

  render() {
    //Nav Array to create submenu under products ul
    const mainNav = [
      {
        title: "All",
        destination: 0
      },
      {
        title: "Laptops",
        destination: 1
      },
      {
        title: "Desktops",
        destination: 2
      },
      {
        title: "Docking Stations",
        destination: 3
      },
      {
        title: "Hard Drives",
        destination: 4
      },
      {
        title: "Batteries",
        destination: 5
      },
      {
        title: "Ram",
        destination: 6
      },
      {
        title: "Mouse",
        destination: 7
      },
      {
        title: "Keyboard",
        destination: 8
      }
    ];

    return (
      <Router>
        <div className="App">
          <Switch>
            {/* Route for Equipment Page */}
            <Route
              exact
              path="/"
              render={props => (
                <Equipment
                  productContext={this.state.productContext}
                  onContextClick={this.onContextClick}
                  mainNav={mainNav}
                  checkPage={this.checkPage}
                  activePage={this.state.activePage}
                />
              )}
            />
            {/* Route for Loaners Page */}
            <Route
              exact
              path="/loaners"
              render={props => (
                <Loaner
                  productContext={this.state.productContext}
                  onContextClick={this.onContextClick}
                  mainNav={mainNav}
                  checkPage={this.checkPage}
                  activePage={this.state.activePage}
                />
              )}
            />
            {/* Route for Login Page */}
            <Route exact path="/login" component={Login} />
            {/* Route for Profile Page */}
            <Route
              exact
              path="/profile"
              render={props => (
                <Profile
                  productContext={this.state.productContext}
                  onContextClick={this.onContextClick}
                  mainNav={mainNav}
                  checkPage={this.checkPage}
                  activePage={this.state.activePage}
                />
              )}
            />
            {/* If incorrect route, routs to home page */}
            <Route path="*">
              <Redirect to='/' />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
