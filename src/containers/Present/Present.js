import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Present.css';

class Present extends Component {
  constructor() {
    super();
    this.state = {
      hackathons: [],
    }
    this._URL = "http://localhost:8080/hackathon/";
  }

  componentDidMount() {
    axios.get(this._URL)
      .then(res => {
        const hackathons = res.data.map(obj => obj);
        this.setState({ hackathons });
      });
  }

  renderHackathons() {
    var divs = [];
    const size = this.state.hackathons.length;
    for (var i = 1; i <= 3; i++) {
      var idx = size - i;
      if (idx >= 0) {
        divs.push(
          <div className="col-md-4" key={i}>
            <h2>{this.state.hackathons[idx].nome}</h2>
            <p>{this.state.hackathons[idx].descricao}</p>
          </div>
        );
      }
    }
    return divs;
  }

  render() {
    return (
      <div className="root">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="/">Hack<span className="text-success">athon</span></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cadastro">Cadastre-se</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main">
          <div className="jumbotron">
            <div className="container">
              <h1 className="display-3">Hello, world!</h1>
              <p>Aqui você pode acessar as hackathons e inscrever-se nelas.</p>
              <p><Link className="btn btn-primary btn-lg" to="/login" role="button">Login &raquo;</Link></p>
            </div>
          </div>

          <div className="container">
            <h1 className="text-center">Últimas Hackathons</h1>
            <div className="row">
              {this.renderHackathons()}
            </div>
            <hr />
          </div>
        </main>

        <footer className="container">
          <p>&copy; Jordão Macedo. <a href="https://jordaos.github.io/">@jordaos</a></p>
        </footer>
      </div>
    );
  }
}

export default Present;
