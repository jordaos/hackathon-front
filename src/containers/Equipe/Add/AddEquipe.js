import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import AddMembroForm from '../../../components/AddMembroForm';

class AddEquipe extends Component {
  constructor() {
    super();
    this.state = {
      equipe: {nome: ''}
    }
    this.onSubmit = this.onSubmit.bind(this);

    this._URL = "http://localhost:8080/equipe/";
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

        <AddMembroForm />
        
        <Button onClick={this.onSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default AddEquipe;