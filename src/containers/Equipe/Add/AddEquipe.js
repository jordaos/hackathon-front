import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import AddMembroForm from '../../../components/AddMembroForm';
import FormErrors from '../../../components/FormErrors';
import './AddEquipe.css';

class AddEquipe extends Component {
  constructor(props) {
    super();
    this.state = {
      nomeEquipe: '',
      hackathonId: props.match.params.id,
      equipes: [],
      participantes: [],
      participantesNessaEquipe: [],
      hackathon: { nome: '', descricao: '', local: '', data: '', numParticipantesEquipe: 0, numEquipes: 0 },
      formErrors: { nomeEquipe: '', jaCadastrado: '' },
      nomeEquipeValid: false,
      participantesValid: false,
      formValid: false,
      currentUser: {
        id: 0,
        nome: '',
        email: '',
        telefone: '',
        tamCamisa: '',
        userEmail: localStorage.getItem('userEmail')
      },
      token: localStorage.getItem('token'),
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleParticipanteChanges = this.onHandleParticipanteChanges.bind(this);

    this._URL = "http://localhost:8080/equipe/";
    this._URLHACKA = "http://localhost:8080/hackathon";
    this._URLPARTICIPANTE = "http://localhost:8080/participante";
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = this.state.token;
    axios.get(`${this._URLHACKA}/${this.state.hackathonId}`)
      .then(res => {
        const hackathon = res.data;
        this.setState({ hackathon });
      });

    axios.get(`${this._URLHACKA}/${this.state.hackathonId}/equipes`)
      .then(res => {
        const equipes = res.data;
        this.setState({ equipes });
      });

    axios.get(`${this._URLPARTICIPANTE}`)
      .then(res => {
        const participantes = res.data;
        this.setState({ participantes });
      });

    axios.get(`${this._URLPARTICIPANTE}/currentUser`)
      .then(res => {
        const currentUser = res.data;
        this.setState({ currentUser }, () => {
          this.onHandleParticipanteChanges(this.state.currentUser, 0);
        });
      });
  }

  onSubmit() {
    const equipe = {
      nome: this.state.nomeEquipe,
      hackathon: this.state.hackathon,
      participantes: this.state.participantesNessaEquipe
    }
    var self = this;
    axios.post(this._URL, equipe)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        let fieldValidationErrors = self.state.formErrors;
        fieldValidationErrors.jaCadastrado = error.response.data;
        self.setState({
          formErrors: fieldValidationErrors
        });
      });
  }

  handleChange(field, e) {
    const value = e.target.value;
    this.setState({ [field]: value },
      () => { this.validateField(field, value) });
  }

  onHandleParticipanteChanges(participante, index) {
    const participantesNessaEquipe = this.state.participantesNessaEquipe;
    participantesNessaEquipe[index] = participante;

    this.setState({
      participantesNessaEquipe
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nomeEquipeValid = this.state.nomeEquipeValid;

    switch (fieldName) {
      case 'nomeEquipe':
        const equipesWithThisName = this.state.equipes.filter((equipe) => {
          return equipe.nome === value
        });
        nomeEquipeValid = equipesWithThisName.length === 0;
        fieldValidationErrors.nomeEquipe = nomeEquipeValid ? '' : 'Nome da equipe já existe';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nomeEquipeValid: nomeEquipeValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.nomeEquipeValid });
  }

  errorClass(error) {
    return (error.length === 0 ? false : true);
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
            </ul>
            <ul className="navbar-nav">
              <li>
                <Button color="dark" onClick={this.handleClick}>Sair</Button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="row">
          <div className="col-md-12 order-md-1">
            <h4 className="mb-3">Formulário de cadastro</h4>
            <Form>
              <FormGroup>
                <Label for="nomeEquipe">Nome da equipe</Label>
                <Input type="text" id="nomeEquipe" invalid={this.errorClass(this.state.formErrors.nomeEquipe)}
                  value={this.state.nomeEquipe}
                  onChange={this.handleChange.bind(this, 'nomeEquipe')} />
              </FormGroup>

              {[...Array(this.state.hackathon.numParticipantesEquipe)].map((x, i) =>
                <AddMembroForm key={i}
                  index={i}
                  currentUser={this.state.currentUser}
                  participantes={this.state.participantes}
                  equipes={this.state.equipes}
                  participantesNessaEquipe={this.state.participantesNessaEquipe}
                  onHandleParticipanteChanges={this.onHandleParticipanteChanges} />
              )}

              <FormGroup>
                <FormErrors formErrors={this.state.formErrors} />
              </FormGroup>

              <Button onClick={this.onSubmit} disabled={!this.state.formValid}>Submit</Button>
            </Form>
          </div>
        </div>

        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p>&copy; Jordão Macedo. <a href="https://jordaos.github.io/">@jordaos</a></p>
        </footer>
      </div>
    );
  }
}

export default AddEquipe;