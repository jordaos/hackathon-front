import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import AddMembroForm from '../../../components/AddMembroForm';
import './AddEquipe.css';

class AddEquipe extends Component {
  constructor(props) {
    super();
    this.state = {
      equipe: {
        nome: ''
      },
      hackathonId: props.match.params.id,
      hackathon: {nome: '', descricao: '', local: '', data: '', numParticipantesEquipe: 0, numEquipes: 0}
    }
    this.onSubmit = this.onSubmit.bind(this);

    this._URL = "http://localhost:8080/equipe/";
    this._URLHACKA = "http://localhost:8080/hackathon/";
  }

  componentDidMount() {
    axios.get(`${this._URLHACKA}/${this.state.hackathonId}`)
      .then(res => {
        const hackathon = res.data;
        this.setState({ hackathon });
      });
  }

  onSubmit () {
    
  }

  handleChange(field, e) {
    const equipe = Object.assign({}, this.state.equipe, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {equipe}));
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="nomeEquipe">Nome da equipe</Label>
          <Input type="text" id="nomeEquipe" 
            value={this.state.equipe.nome}
            onChange={this.handleChange.bind(this, 'nome')}/>
        </FormGroup>

        {[...Array(this.state.hackathon.numParticipantesEquipe)].map((x, i) =>
          <AddMembroForm key={i}/>
        )}
        
        <Button onClick={this.onSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default AddEquipe;