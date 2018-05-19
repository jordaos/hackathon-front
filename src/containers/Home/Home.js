import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link> | 
        <Link to="/hackathon">Hackathons</Link> | 
        <Link to="/hackathon/add">Add Hackathon</Link>
      </div>
    );
  }
}

export default Home;
