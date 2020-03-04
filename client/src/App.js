import React, { Component } from "react";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import MainNav from "./components/MainNav";

import Loaner from "./pages/Loaner";
import Equipment from "./pages/Equipment";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// class component allows state to be used
class App extends Component {
  state = {
    productContext: 0
  };

  onContextClick = context => {
    this.setState({ productContext: context });
  };

  render() {
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
          {/* <MainNav onContextClick={this.onContextClick}
            mainNav={mainNav}
            productContext={this.state.productContext} /> */}

          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Equipment
                  productContext={this.state.productContext}
                  onContextClick={this.onContextClick}
                  mainNav={mainNav}
                />
              )}
            />
            <Route
              exact
              path="/loaners"
              render={props => (
                <Loaner
                  productContext={this.state.productContext}
                  onContextClick={this.onContextClick}
                  mainNav={mainNav}
                />
              )}
            />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/profile"
              render={props => (
                <Profile
                  productContext={this.state.productContext}
                  onContextClick={this.onContextClick}
                  mainNav={mainNav}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
