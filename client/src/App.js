import React, { Component } from 'react';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import MainNav from './components/Nav';
import Carousel from './components/Carousel';
import CarouselHeadlines from './components/CarouselHeadlines';
import SearchBar from './components/SearchBar';

import Loaner from './pages/Loaner'
import Equipment from './pages/Equipment';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App" >
          <MainNav />
          <SearchBar />
          <CarouselHeadlines />
          <Carousel />
          <Switch>
            <Route exact path="/" component={Equipment} />
            <Route exact path="/loaner" component={Loaner} />
            {/* <Route exact path="/books/:id" component={Detail} /> */}
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
