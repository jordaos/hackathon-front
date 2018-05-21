import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import "react-table/react-table.css";

class ListEquipe extends Component {
  constructor() {
    super();
    this.state = {
      equipes: [],
      token: ''
    }

    this._URL = "https://hackathon174.herokuapp.com/equipe/";
  }

  componentDidMount() {
    this.setState({ token: localStorage.getItem('token') }, () => {
      axios.defaults.headers.common['Authorization'] = this.state.token;
      axios.get(this._URL)
        .then(res => {
          const equipes = res.data.map(obj => obj);
          this.setState({ equipes });
        });
    });
  }

  render() {
    return (
      <div className="root">
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
              <li className="nav-item active">
                <Link className="nav-link" to="/hackathon/add">Adicionar Hackathon</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/participante/list">Listar participantes</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/equipe/list">Listar equipes</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li>
                <Button color="dark" onClick={this.handleClick}>Sair</Button>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main">
          <div className="container">
            <div className="row">
              <ReactTable
                style={{width: '100%'}}
                data={this.state.equipes}
                columns={[
                  {
                    Header: "Nome",
                    accessor: "nome"
                  },
                  {
                    Header: "Data de inscrição",
                    accessor: "data"
                  },
                  {
                    Header: 'Ações',
                    accessor: 'id',
                    Cell: row => (
                      <Link role="button" to={'/equipe/' + row.value + '/participante'} className="btn btn-primary btn-sm" >Ver participantes</Link>
                    )
                  }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </div>
            <hr />
          </div>
        </main>

        <footer className="container">
          <p>&copy; Jordão Macedo. <a href="https://jordaos.github.io/">@jordaos</a></p>
        </footer>
      </div>
    );
  }
}

export default ListEquipe;