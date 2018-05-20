import React, { Component } from 'react';
import axios from 'axios';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class ListEquipe extends Component {
  constructor() {
    super();
    this.state = {
      equipes: [],
      token: ''
    }

    this._URL = "http://hackathon174.herokuapp.com/equipe/";
  }

  componentDidMount() {
    this.setState({token: localStorage.getItem('token')}, () => {
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
      <div>
        <ReactTable
          data={this.state.equipes}
          columns={[
            {
              Header: "Nome",
              accessor: "nome"
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default ListEquipe;