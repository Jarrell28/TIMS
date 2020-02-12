import React, { Component } from 'react';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import MainNav from './components/Nav';
import Carousel from './components/Carousel';
import CarouselHeadlines from './components/CarouselHeadlines';
import InventoryTable from './components/InventoryTable';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/equipment").then(response => {
      console.log(response.data)
      response.data.forEach(item => {
        item.category = item.Category.name
      })
      this.setState({ rowData: response.data })
    });
  }


  render() {
    return (
      <div className="App" >
        <MainNav />
        <CarouselHeadlines />
        <Carousel />

        <InventoryTable rowData={this.state.rowData} />
      </div>
    )

  }
}

export default App;
