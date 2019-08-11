import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AboutPage from './AboutPage';
import Primal from './Primal';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Prime calculator</Link>
          <Link to="/about">About</Link>
        </header>
        <div>
              <Route exact path="/" component={Primal} />
              <Route exact path="/about" component={AboutPage} />
          </div>
      </div>
    </Router>
  );
}

export default App;
