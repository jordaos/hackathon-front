import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';

class ParticipanteHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackathons: [],
      token: '',
      userEmail: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this._URL = "http://localhost:8080/participante/";
  }

  componentDidMount() {
    this.setState({token: localStorage.getItem('token'), userEmail: localStorage.getItem('userEmail')}, () => {
      axios.defaults.headers.common['Authorization'] = this.state.token;
      axios.get(`${this._URL}hackathons`)
        .then(res => {
          const hackathons = res.data.map(obj => obj);
          this.setState({ hackathons });
        });
    });
  }

  handleClick() {
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');
    window.location.reload();
  }

  render() {
    return (
      <div>
        <header>
          <div>
            <h3 className="text-center">Hack<span className="text-success">athon</span></h3>
            <h5 className="text-center">Participante</h5>
            <nav className="nav nav-masthead justify-content-center">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/hackathon">Listar Hackathons</Link>
              <Button color="link" onClick={this.handleClick}>Sair</Button>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default ParticipanteHome;
