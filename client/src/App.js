import React, { Component } from 'react';
import MainNav from './components/Nav';
import Carousel from './components/Carousel';


class App extends Component {

  render() {
  return(
    <div className = "App" >
      <MainNav />
      <Carousel />
    </div>
  );
  }
}

export default App;
