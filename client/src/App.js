import React, { Component } from 'react';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import MainNav from './components/MainNav';


import Loaner from './pages/Loaner'
import Equipment from './pages/Equipment';
import Login from './pages/Login';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Context } from 'ag-grid-community';


// class component allows state to be used
class App extends Component {
  state = {
    productContext: "all"
  }

  onContextClick = context => {
    this.setState({ productContext: context })
  }

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
      },

    ]

    return (
      <Router>
        <div className="App">
          <MainNav onContextClick={this.onContextClick}
            mainNav={mainNav}
            productContext={this.state.productContext} />

          <Switch>
            <Route exact path="/" render={props =>
              (<Equipment productContext={this.state.productContext} />)
            } />
            <Route exact path="/loaners" component={Loaner} />
            <Route exact path="/login" component={Login} />

            {/* <Route exact path="/books/:id" component={Detail} /> */}
            {/* <Route component={NoMatch} /> */}
          </Switch>

        </div>
      </Router >
    )
  }
}

export default App;
