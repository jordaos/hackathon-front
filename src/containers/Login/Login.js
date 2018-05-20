import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: '',
        password: ''
      }
    }
    this.onSubmit = this.onSubmit.bind(this);

    this._URL = "http://localhost:8080/login/";
  }

  onSubmit () {
    axios.post(this._URL, this.state.user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(field, e) {
    const user = Object.assign({}, this.state.user, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {user}));
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="email">E-mail</Label>
          <Input type="text" id="email" 
            value={this.state.user.email}
            onChange={this.handleChange.bind(this, 'email')}/>
        </FormGroup>
        <FormGroup>
          <Label for="password">Senha</Label>
          <Input type="text" id="password" 
            value={this.state.user.password}
            onChange={this.handleChange.bind(this, 'password')}/>
        </FormGroup>
        <Button onClick={this.onSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default Login;