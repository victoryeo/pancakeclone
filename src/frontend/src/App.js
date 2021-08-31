import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Trade } from './pages/Trade';
import { Pool } from './pages/Pool';
import SideBar from './components/SideBar';

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />

        <SideBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/trade" component={Trade} />
          <Route path="/pool" component={Pool} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
