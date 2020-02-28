import React, { Component } from 'react';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import MainNav from './components/MainNav';

import Loaner from './pages/Loaner'
import Equipment from './pages/Equipment';

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
        title: "Laptops",
        destination: "towers"
      },
      {
        title: "Desktops",
        destination: "desktops"
      },
      {
        title: "Docking Stations",
        destination: "docking-stations"
      },
      {
        title: "Hard Drives",
        destination: "hard-drives"
      },
      {
        title: "Batteries",
        destination: "batteries"
      },
      {
        title: "Ram",
        destination: "ram"
      },
      {
        title: "Mouse",
        destination: "mouse"
      },
      {
        title: "Keyboard",
        destination: "keyboard"
      },
    ]

    return (
      <Router>

        <div className="App" >
          <MainNav onContextClick={this.onContextClick}
            mainNav={mainNav}
            productContext={this.state.productContext} />

          <Switch>
            <Route exact path="/" component={Equipment} />
            <Route exact path="/loaners" component={Loaner} />
            {/* <Route exact path="/books/:id" component={Detail} /> */}
            {/* <Route component={NoMatch} /> */}
          </Switch>

        </div>
      </Router >
    )
  }
}

export default App;
