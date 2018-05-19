import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
      formValid: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleParticipanteChanges = this.onHandleParticipanteChanges.bind(this);

    this._URL = "http://localhost:8080/equipe/";
    this._URLHACKA = "http://localhost:8080/hackathon/";
    this._URLPARTICIPANTE = "http://localhost:8080/participante/";
  }

  componentDidMount() {
    axios.get(`${this._URLHACKA}${this.state.hackathonId}`)
      .then(res => {
        const hackathon = res.data;
        this.setState({ hackathon });
      });

    axios.get(`${this._URLHACKA}${this.state.hackathonId}/equipes`)
      .then(res => {
        const equipes = res.data;
        this.setState({ equipes });
      });
    
    axios.get(`${this._URLPARTICIPANTE}`)
      .then(res => {
        const participantes = res.data;
        this.setState({ participantes });
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
        fieldValidationErrors.jaCadastrado = 'Um dos participantes já está em uma equipe.';
        self.setState({
          formErrors: fieldValidationErrors
        });
      });
  }

  handleChange(field, e) {
    const value = e.target.value;
    this.setState({[field]: value},
      () => { this.validateField(field, value) });
  }

  onHandleParticipanteChanges(participante, index) {
    this.state.participantesNessaEquipe[index] = participante;
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let nomeEquipeValid = this.state.nomeEquipeValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
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
    return(error.length === 0 ? false : true);
  }


  render() {
    return (
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
            participantes={this.state.participantes}
            equipes={this.state.equipes}
            participantesNessaEquipe={this.state.participantesNessaEquipe}
            onHandleParticipanteChanges={this.onHandleParticipanteChanges}/>
        )}

        <FormGroup>
          <FormErrors formErrors={this.state.formErrors} />
        </FormGroup>

        <Button onClick={this.onSubmit} disabled={!this.state.formValid}>Submit</Button>
      </Form>
    );
  }
}

export default AddEquipe;