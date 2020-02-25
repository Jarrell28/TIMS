import React from 'react';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import MainNav from './components/MainNav';

import Loaner from './pages/Loaner'
import Equipment from './pages/Equipment';
import FormPage from './components/login';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App" >
        <MainNav />

        <Switch>
          <Route exact path="/" component={Equipment} />
          <Route exact path="/loaners" component={Loaner} />
          <Route exact path="/login" component={FormPage} />
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>

      </div>
    </Router >
  )
}

export default App;
