/*

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import React from 'react';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';

function App(){
	return (
		<div className="App">
			<BrowserRouter>
				<div>
					<div className="header">
						<NavLink exact activeClassName="active" to="/"> Home </NavLink>
						<NavLink activeClassName="active" to="/login"> Login </NavLink><small>(Access without token only)</small>
						<NavLink activeClassName="active" to="/dashboard"> Dashboard </NavLink><small>(Access with token only)</small>
					</div>
					<div className="content">
						<Switch>
              				<Route exact path="/" component={Home} />
              				<Route path="/login" component={Login} />
              				<Route path="/dashboard" component={Dashboard} />
            			</Switch>
					</div>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App;
