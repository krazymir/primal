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
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
          </a>
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
