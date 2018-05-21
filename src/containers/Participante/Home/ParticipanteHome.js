import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Badge } from 'reactstrap';
import axios from 'axios';

class ParticipanteHome extends Component {
  constructor() {
    super();
    this.state = {
      hackathons: [],
      equipes: [],
      hackathonsParticipando: [],
      userEmail: localStorage.getItem('userEmail'),
      token: localStorage.getItem('token')
    }
    this._URL = "https://hackathon174.herokuapp.com";
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = this.state.token;
    axios.get(`${this._URL}/hackathon/`)
      .then(res => {
        const hackathons = res.data.map(obj => obj);
        this.setState({ hackathons });
      });

    axios.get(`${this._URL}/participante/hackathons`)
      .then(res => {
        const hackathonsParticipando = res.data.map(obj => obj);
        this.setState({ hackathonsParticipando });
      }).catch(function (error) {
        console.log(error.response);
      });

    axios.get(`${this._URL}/participante/equipes`)
      .then(res => {
        const equipes = res.data.map(obj => obj);
        this.setState({ equipes });
      }).catch(function (error) {
        console.log(error.response);
      });
  }

  handleClick() {
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');
    window.location.reload();
  }

  handleClickCancelSubscription(id, ev) {
    axios.get(`${this._URL}/equipe/${id}/cancelar`)
      .then(res => {
        console.log("Ok");
      }).catch(function (error) {
        console.log(error.response);
      });
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
            </ul>
            <ul className="navbar-nav">
              <li>
                <Button color="dark" onClick={this.handleClick}>Sair</Button>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main">
          <div className="jumbotron">
            <div className="container">
              <h1 className="display-3">Bem-vindo!</h1>
              <p>Aqui você pode acessar as hackathons e inscrever-se nelas.</p>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Equipe</th>
                    <th>Data da inscrição</th>
                    <th>Hackathon</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.equipes.map((el, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{el.id}</th>
                        <td>{el.nome}</td>
                        <td>{el.data}</td>
                        <td>{el.hackathon.nome}</td>
                        <td>
                          <Button color="danger" hidden={!el.participando} size="sm" onClick={this.handleClickCancelSubscription.bind(this, el.id)}>Cancelar inscrição</Button>
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </Table>
            </div>
            <div className="row">
              {this.state.hackathons.map((hackathon, i) => {
                var participando = this.state.equipes.some(e => (e.hackathon.id === hackathon.id && e.participando));
                return (
                  <div className="col-md-4" key={i}>
                    <h2>{hackathon.nome}</h2>
                    <p>{hackathon.descricao}</p>
                    <p hidden={!hackathon.encerrado}><Badge color="danger">Encerrado</Badge></p>
                    <p hidden={hackathon.encerrado || participando}>
                      <Button color="success" tag={Link} to={`/hackathon/${hackathon.id}/equipe/add`} >Participar</Button>
                    </p>
                  </div>
                )
              })
              }
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

export default ParticipanteHome;
