import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class ListHackathon extends Component {
  constructor() {
    super();
    this.state = {
      hackathons: [],
      token: '',
      userEmail: '',
      modal: false,
      hackathonId: 0
    }

    this._URL = "http://hackathon174.herokuapp.com/hackathon/";
    this.toggle = this.toggle.bind(this);
    this.encerrar = this.encerrar.bind(this);
  }

  componentDidMount() {
    this.setState({token: localStorage.getItem('token'), userEmail: localStorage.getItem('userEmail')}, () => {
      axios.defaults.headers.common['Authorization'] = this.state.token;
      axios.get(this._URL)
        .then(res => {
          const hackathons = res.data.map(obj => obj);
          this.setState({ hackathons });
        });
    });
  }

  modalEncerrar(id, e) {
    this.setState({
      hackathonId: id
    });
    this.toggle();
  }

  encerrar() {
    var self = this;
    axios.put(`${this._URL}${self.state.hackathonId}/encerrar`)
      .then(res => {
        axios.get(self._URL)
          .then(res => {
            const hackathons = res.data.map(obj => obj);
            self.setState({ hackathons });
          });
        self.toggle();
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  isEncerrado(e, id) {
    const hackathon = this.state.hackathons.filter(h => h.id === id)[0];
    return hackathon !== undefined && hackathon.encerrado;
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.state.hackathons}
          columns={[
            {
              Header: "Nome",
              accessor: "nome"
            },
            {
              Header: "Data",
              accessor: "data"
            },
            {
              Header: "Ações",
              accessor: "id",
              Cell: row => (
                <div>
                  <Label hidden={!this.isEncerrado(this, row.value)}>Encerrado</Label>
                  <Link to={"/hackathon/" + row.value + "/equipe/add"} hidden={this.isEncerrado(this, row.value) || this.state.userEmail === 'adm@admin.com'}>Participar</Link>
                  <Link to={"/hackathon/" + row.value + "/equipe"} hidden={this.state.userEmail !== 'adm@admin.com'}>Visualizar</Link>
                  <Button color="danger" hidden={this.isEncerrado(this, row.value) && (this.state.userEmail !== 'adm@admin.com')} onClick={this.modalEncerrar.bind(this, row.value)}>Encerrar</Button>
                </div>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Deseja mesmo encerrar as inscrições para essa hackathon?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.encerrar}>Sim</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Não</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ListHackathon;