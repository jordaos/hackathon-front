import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axios from 'axios'

class AddHackathon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackathon: { nome: '', descricao: '', local: '', data: '', numParticipantesEquipe: 0, numEquipes: 0 },
      modal: false,
      cadastroError: false,
      userEmail: localStorage.getItem('userEmail'),
      token: localStorage.getItem('token')
    }
    this.onSubmit = this.onSubmit.bind(this);

    this._URL = "http://localhost:8080";
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = this.state.token;

    if(this.props.match.params.hackathon !== undefined && this.props.match.params.hackathon !== null) {
      const hackathonId = this.props.match.params.hackathon;
      axios.get(`${this._URL}/hackathon/${hackathonId}`)
        .then(res => {
          const hackathon = res.data;
          this.setState({ hackathon });
        });
    }
  }

  onSubmit() {
    var self = this;
    axios.post(`${this._URL}/hackathon/`, this.state.hackathon)
      .then(function (response) {
        self.setState({ modal: true });
      })
      .catch(function (error) {
        self.setState({ cadastroError: true });
        setTimeout(() => {
          self.setState({ cadastroError: false });
        }, 3000);
      });
  }

  handleChange(field, e) {
    const hackathon = Object.assign({}, this.state.hackathon, { [field]: e.target.value });
    this.setState(Object.assign({}, this.state, { hackathon }));
  }

  render() {
    return (
      <div className="container root">
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

        <div className="row">
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Formulário de cadastro</h4>
            <Form>
              <FormGroup>
                <Label for="nomeEvento">Nome do evento</Label>
                <Input type="text" id="nomeEvento"
                  value={this.state.hackathon.nome}
                  onChange={this.handleChange.bind(this, 'nome')} />
              </FormGroup>
              <FormGroup>
                <Label for="description">Descrição</Label>
                <Input type="textarea" id="description"
                  value={this.state.hackathon.descricao}
                  onChange={this.handleChange.bind(this, 'descricao')} />
              </FormGroup>
              <FormGroup>
                <Label for="local">Local</Label>
                <Input type="text" id="local"
                  value={this.state.hackathon.local}
                  onChange={this.handleChange.bind(this, 'local')} />
              </FormGroup>
              <FormGroup>
                <Label for="data">Data</Label>
                <Input type="text" placeholder="dd/mm/yyyy" id="data"
                  value={this.state.hackathon.data}
                  onChange={this.handleChange.bind(this, 'data')} />
              </FormGroup>
              <FormGroup>
                <Label for="numParticipantesEquipe">Número de participantes por equipe</Label>
                <Input type="number" id="numParticipantesEquipe"
                  value={this.state.hackathon.numParticipantesEquipe}
                  onChange={this.handleChange.bind(this, 'numParticipantesEquipe')} />
              </FormGroup>
              <FormGroup>
                <Label for="numEquipes">Número de equipes</Label>
                <Input type="number" id="numEquipes"
                  value={this.state.hackathon.numEquipes}
                  onChange={this.handleChange.bind(this, 'numEquipes')} />
              </FormGroup>
              <Alert color="danger" isOpen={this.state.cadastroError} toggle={this.onDismiss}>
                Erro ao tentar cadastrar a hackathon.
              </Alert>
              <Button onClick={this.onSubmit}>Submit</Button>
            </Form>
          </div>
        </div>

        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p>&copy; Jordão Macedo. <a href="https://jordaos.github.io/">@jordaos</a></p>
        </footer>

        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}>Cadastro realizado com sucesso!</ModalHeader>
          <ModalBody>
            O que você deseja fazer agora?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" tag={Link} to="/" >Página inicial</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddHackathon;