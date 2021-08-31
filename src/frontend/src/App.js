import React, {useEffect, useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Trade } from './pages/Trade';
import { Pool } from './pages/Pool';
import SideBar from './components/SideBar';
import getWeb3 from './web3/getWeb3'

const App = () => {
  const [myWeb3, setMyWeb3] = useState();

  useEffect(() => {
    console.log('component mounted');
    async function getW3() {
      try {
        let web3 = await getWeb3
        console.log(web3)
        setMyWeb3(web3)
      } catch( err ) {
        console.warn('Error in web3 initialization.', err)
      }
    }
    getW3()
    return () => console.log('component is being removed');
  }, []);

  useEffect(() => {
    console.log(myWeb3)
    async function getAcct() {
      console.log(myWeb3.eth)
      let accounts = await myWeb3.eth.getAccounts()
      console.log(accounts[0])
    }
    if (myWeb3 != undefined) {
      getAcct()
    }
  }, [myWeb3])

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
