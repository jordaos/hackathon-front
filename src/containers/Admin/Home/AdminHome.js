import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackathons: [],
      userEmail: localStorage.getItem('userEmail'),
      token: localStorage.getItem('token')
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.encerrar = this.encerrar.bind(this);
    
    this._URL = "https://hackathon174.herokuapp.com";
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = this.state.token;
    axios.get(`${this._URL}/hackathon/`)
      .then(res => {
        const hackathons = res.data.map(obj => obj);
        this.setState({ hackathons });
      });
  }

  handleClick() {
    localStorage.setItem('token', '');
    localStorage.setItem('userEmail', '');
    window.location.reload();
  }

  modalEncerrar(id, e) {
    this.setState({
      hackathonId: id
    });
    this.toggle();
  }

  encerrar() {
    var self = this;
    axios.put(`${this._URL}/hackathon/${self.state.hackathonId}/encerrar`)
      .then(res => {
        axios.get(`${self._URL}/hackathon/`)
          .then(res => {
            const hackathons = res.data.map(obj => obj);
            self.setState({ hackathons });
          });
        self.toggle();
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
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
          <div className="jumbotron">
            <div className="container">
              <h1 className="display-3">Bem-vindo!</h1>
              <p>Aqui você pode gerenciar as hackathons.</p>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.hackathons.map((el, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{el.id}</th>
                        <td>{el.nome}</td>
                        <td>{el.data}</td>
                        <td>
                          <Button color="danger" hidden={el.encerrado} size="sm" onClick={this.modalEncerrar.bind(this, el.id)}>Encerrar</Button> {' '}
                          <Link className="btn btn-warning btn-sm" hidden={el.encerrado} to={'/hackathon/edit/' + el.id} role="button">Editar</Link> {' '}
                          <Link className="btn btn-primary btn-sm" to={'/hackathon/' + el.id + '/equipe'} role="button">Ver equipes</Link>
                        </td>
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



        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Deseja mesmo encerrar as inscrições para essa hackathon?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.encerrar}>Sim</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Não</Button>
          </ModalFooter>
        </Modal>

        <footer className="container">
          <p>&copy; Jordão Macedo. <a href="https://jordaos.github.io/">@jordaos</a></p>
        </footer>
      </div>
    );
  }
}

export default AdminHome;
