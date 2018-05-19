import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios'

class ListHackathon extends Component {
  constructor() {
    super();
    this.state = {
      hackathons: []
    }

    this._URL = "http://localhost:8080/hackathon/";
  }

  componentDidMount() {
    axios.get(this._URL)
      .then(res => {
        const hackathons = res.data.map(obj => obj);
        this.setState({ hackathons });
      });
  }

  render() {
    return (
      <ListGroup>
        {this.state.hackathons.map(hackathon =>
          <ListGroupItem key={hackathon.id} tag="a" href={"/hackathon/" + hackathon.id + "/equipe/add"}>{hackathon.nome}</ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

export default ListHackathon;