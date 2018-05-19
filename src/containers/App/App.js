import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './../Home/Home';
import AddHackathon from '../Hackathon/Add/AddHackathon';
import './App.css';
import AddEquipe from '../Equipe/Add/AddEquipe';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/hackathon/add" component={AddHackathon} />
            <Route exact path="/equipe/add" component={AddEquipe} />
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
