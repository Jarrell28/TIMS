import React, { Component } from 'react';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Button } from 'reactstrap';

import MainNav from './components/MainNav';
import Carousel from './components/Carousel';
import CarouselHeadlines from './components/CarouselHeadlines';
import SearchBar from './components/SearchBar';
import SlickSlider from './components/SlickSlider';

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

          {/* <div className="container"> */}
          {/*<Carousel /> */}
          <SlickSlider />
          <CarouselHeadlines />
          <SearchBar />

          {/* </div> */}
          <Switch>
            <Route exact path="/" component={Equipment} />
            <Route exact path="/loaners" component={Loaner} />
            {/* <Route exact path="/books/:id" component={Detail} /> */}
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
