import React, { Component } from 'react';
import Present from './../Present/Present';
import AdminHome from './../Admin/Home/AdminHome'
import ParticipanteHome from '../Participante/Home/ParticipanteHome';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: localStorage.getItem('userEmail'),
      token: localStorage.getItem('token')
    }
  }

  section() {
    if (this.state.token === '' || this.state.token === null) {
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
