import React, { Component } from 'react';
import { Card, CardBody, FormGroup, Label, Input } from 'reactstrap';

class AddMembroForm extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <FormGroup>
              <Label>Nome</Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label>E-mail</Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label>Foto</Label>
              <Input type="file" />
            </FormGroup>
            <FormGroup>
              <Label>Telefone</Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label for="selectTam">Tamanho da camisa</Label>
              <Input type="select" id="selectTam">
                <option>P</option>
                <option>M</option>
                <option>G</option>
                <option>GG</option>
              </Input>
            </FormGroup>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AddMembroForm;