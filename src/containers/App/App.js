import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './../Home/Home';
import AddHackathon from '../Hackathon/Add/AddHackathon';
import './App.css';
import AddEquipe from '../Equipe/Add/AddEquipe';
import ListHackathon from '../Hackathon/List/ListHackathon';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/hackathon" component={ListHackathon} />
            <Route exact path="/hackathon/:id/equipe/add" component={AddEquipe} />
            <Route exact path="/hackathon/add" component={AddHackathon} />
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
