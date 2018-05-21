import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import axios from 'axios';

class ParticipanteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participantes: [],
      userEmail: localStorage.getItem('userEmail'),
      token: localStorage.getItem('token')
    }

    this.handleClick = this.handleClick.bind(this);
    this._URL = "http://localhost:8080";
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = this.state.token;


    if (this.props.match.params.equipeId !== undefined && this.props.match.params.equipeId !== null) {
      const equipeId = this.props.match.params.equipeId;
      axios.get(`${this._URL}/equipe/${equipeId}/participantes`)
        .then(res => {
          const participantes = res.data.map(obj => obj);
          this.setState({ participantes });
        });
    } else {
      axios.get(`${this._URL}/participante/`)
        .then(res => {
          const participantes = res.data.map(obj => obj);
          this.setState({ participantes });
        });
    }
  }

  handleClick() {
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');
    window.location.reload();
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
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/hackathon/add">Adicionar Hackathon</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/participante/list">Listar usuários</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li>
                <Button color="dark" onClick={this.handleClick}>Sair</Button>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main">
          <div className="container">
            <div className="row">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.participantes.map((el, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{el.id}</th>
                        <td>{el.nome}</td>
                        <td>{el.email}</td>
                        <td>{el.telefone}</td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </Table>
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

export default ParticipanteList;
