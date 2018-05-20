import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './../Home/Home';
import AddHackathon from '../Hackathon/Add/AddHackathon';
import './App.css';
import AddEquipe from '../Equipe/Add/AddEquipe';
import ListHackathon from '../Hackathon/List/ListHackathon';
import Login from '../Login/Login';

class App extends Component {
  render() {
    return (
        <Router>
          <div style={{display: 'contents'}}>
            <Route exact path="/" component={Home} />
            <Route exact path="/hackathon" component={ListHackathon} />
            <Route exact path="/hackathon/:id/equipe/add" component={AddEquipe} />
            <Route exact path="/hackathon/add" component={AddHackathon} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
    );
  }
}

export default App;
