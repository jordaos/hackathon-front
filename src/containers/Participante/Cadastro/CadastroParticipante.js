import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class CadastroParticipante extends Component {
  constructor() {
    super();
    this.state = {
      participante: {
        nome: '',
        email: '',
        password: '',
        telefone: '',
        tamCamisa: ''
      },
      cadastroError: false,
      modal: false
    }
    this._URL = "https://hackathon174.herokuapp.com/participante/";
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(field, e) {
    const participante = Object.assign({}, this.state.participante, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {participante}));
  }

  onSubmit() {
    var self = this;
    axios.post(this._URL, this.state.participante)
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
              <li className="nav-item">
                <a className="nav-link" href="/">Home </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/cadastro">Cadastre-se</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="row">
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Formulário de cadastro</h4>
            <form className="needs-validation" noValidate>
              <div className="row">
                <div className="col-md-12 mb-12">
                  <label htmlFor="firstName">Nome</label>
                  <input type="text" className="form-control" id="firstName" 
                    placeholder="" required 
                    value={this.state.participante.nome}
                    onChange={this.handleChange.bind(this, 'nome')}/>
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email">E-mail</label>
                <input type="email" className="form-control" id="email" 
                  placeholder="you@example.com" 
                  value={this.state.participante.email}
                  onChange={this.handleChange.bind(this, 'email')}/>
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password">Senha</label>
                <input type="password" className="form-control" 
                  id="password" required 
                  value={this.state.participante.password}
                  onChange={this.handleChange.bind(this, 'password')}/>
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="foto">Foto <span className="text-muted">(Opicional)</span></label>
                <input type="file" className="form-control" id="foto" />
              </div>

              <div className="row">
                <div className="col-md-6 mb-6">
                  <label htmlFor="telefone">Telefone</label>
                  <input type="text" className="form-control" id="telefone" required 
                    value={this.state.participante.telefone}
                    onChange={this.handleChange.bind(this, 'telefone')}/>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-6 mb-6">
                  <label htmlFor="state">Tamanho da camisa</label>
                  <select className="custom-select d-block w-100" id="state" required
                    value={this.state.participante.tamCamisa}
                    onChange={this.handleChange.bind(this, 'tamCamisa')}>
                    <option value="">Selecione</option>
                    <option>P</option>
                    <option>M</option>
                    <option>G</option>
                    <option>GG</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
              </div>
              <br />
              <Alert color="danger" isOpen={this.state.cadastroError} toggle={this.onDismiss}>
                Erro ao tentar cadastrar o participante.
              </Alert>
              <hr className="mb-4" />
              <Button onClick={this.onSubmit} block color="primary">Cadastrar-se</Button>
            </form>
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
            <Button color="primary" tag={Link} to="/login" >Login</Button>{' '}
            <Button color="secondary" tag={Link} to="/" >Página inicial</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CadastroParticipante;
