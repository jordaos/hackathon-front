import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class AdminHome extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
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
            <h5 className="text-center">Administrador</h5>
            <nav className="nav nav-masthead justify-content-center">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/hackathon/add">Adicionar Hackathon</Link>
              <Link className="nav-link" to="/hackathon">Listar Hackathons</Link>
              <Button color="link" onClick={this.handleClick}>Sair</Button>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default AdminHome;
