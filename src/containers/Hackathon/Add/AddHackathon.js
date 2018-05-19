import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'

class AddHackathon extends Component {
  constructor() {
    super();
    this.state = {
      hackathon: {nome: '', descricao: '', local: '', data: '', numParticipantesEquipe: 0, numEquipes: 0}
    }
    this.onSubmit = this.onSubmit.bind(this);

    this._URL = "http://localhost:8080/hackathon/";
  }

  onSubmit () {
    axios.post(this._URL, this.state.hackathon)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(field, e) {
    const hackathon = Object.assign({}, this.state.hackathon, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {hackathon}));
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="nomeEvento">Nome do evento</Label>
          <Input type="text" id="nomeEvento" 
            value={this.state.hackathon.nome}
            onChange={this.handleChange.bind(this, 'nome')}/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Descrição</Label>
          <Input type="textarea" id="description" 
            value={this.state.hackathon.descricao}
            onChange={this.handleChange.bind(this, 'descricao')}/>
        </FormGroup>
        <FormGroup>
          <Label for="local">Local</Label>
          <Input type="text" id="local" 
            value={this.state.hackathon.local}
            onChange={this.handleChange.bind(this, 'local')}/>
        </FormGroup>
        <FormGroup>
          <Label for="data">Data</Label>
          <Input type="text" placeholder="dd/mm/yyyy" id="data" 
            value={this.state.hackathon.data}
            onChange={this.handleChange.bind(this, 'data')}/>
        </FormGroup>
        <FormGroup>
          <Label for="numParticipantesEquipe">Número de participantes por equipe</Label>
          <Input type="number" id="numParticipantesEquipe" 
            value={this.state.hackathon.numParticipantesEquipe}
            onChange={this.handleChange.bind(this, 'numParticipantesEquipe')}/>
        </FormGroup>
        <FormGroup>
          <Label for="numEquipes">Número de equipes</Label>
          <Input type="number" id="numEquipes" 
            value={this.state.hackathon.numEquipes}
            onChange={this.handleChange.bind(this, 'numEquipes')}/>
        </FormGroup>
        <Button onClick={this.onSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default AddHackathon;