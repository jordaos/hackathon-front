import React, { Component } from 'react';
import Present from './../Present/Present';
import AdminHome from './../Admin/Home/AdminHome'
import ParticipanteHome from '../Participante/Home/ParticipanteHome';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: '',
      token: ''
    }
  }

  componentDidMount() {
    this.setState({token: localStorage.getItem('token'), userEmail: localStorage.getItem('userEmail')});
  }

  section() {
    if (this.state.token === '') {
      return <Present />
    } else if (this.state.userEmail === 'adm@admin.com') {
      return <AdminHome />
    } else {
      return <ParticipanteHome />
    }
  }

  render() {
    return (
      <div>
        {this.section()}
      </div>
    );
  }
}

export default Home;