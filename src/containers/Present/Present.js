import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Present extends Component {
  render() {
    return (
      <div>
        <header>
          <div>
            <h3 className="text-center">Hack<span className="text-success">athon</span></h3>
            <nav className="nav nav-masthead justify-content-center">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/">Contato</Link>
              <Link className="nav-link" to="/login">Login</Link>
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

export default Present;
