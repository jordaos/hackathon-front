import React, { Component } from 'react';
import { Alert, Button, Form, Input } from 'reactstrap';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      },
      authError: false
    }
    this.onSubmit = this.onSubmit.bind(this);

    this._URL = "http://localhost:8080/login";
  }

  onSubmit() {
    var self = this;
    axios.post(this._URL, this.state.user)
      .then(function (response) {
        localStorage.setItem('token', response.data.split(' ')[1]);
        localStorage.setItem('userEmail', self.state.user.email);
        self.props.history.push('/');
      })
      .catch(function (error) {
        console.log(error);
        self.setState({ authError: true });
        setTimeout(() => {
          self.setState({ authError: false });
        }, 3000);
      });
  }

  handleChange(field, e) {
    const user = Object.assign({}, this.state.user, { [field]: e.target.value });
    this.setState(Object.assign({}, this.state, { user }));
  }

  render() {
    return (
      <Form className="form-signin">
        <Alert color="danger" isOpen={this.state.authError} toggle={this.onDismiss}>
          E-mail e/ou senha inválido(s)!
        </Alert>
        <h1 className="h3 mb-3 font-weight-normal text-center">Hack<span className="text-success">athon</span></h1>
        <Input type="email" id="email"
          placeholder="E-mail"
          value={this.state.user.email}
          onChange={this.handleChange.bind(this, 'email')} />
        <Input type="password" id="password"
          placeholder="Senha"
          value={this.state.user.password}
          onChange={this.handleChange.bind(this, 'password')} />

        <Button onClick={this.onSubmit} block color="success">Submit</Button>
      </Form>
    );
  }
}

export default Login;