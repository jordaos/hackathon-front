import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminHome extends Component {
  render() {
    return (
      <div>
        <header>
          <div>
            <h3 className="text-center">Hack<span className="text-success">athon</span></h3>
            <nav className="nav nav-masthead justify-content-center">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/hackathon/add">Adicionar Hackathon</Link>
            </nav>
          </div>
        </header>

        <footer>
          <div>
            <p>Feito por <a href="https://jordaos.github.io/">Jordão Macedo</a>.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default AdminHome;
