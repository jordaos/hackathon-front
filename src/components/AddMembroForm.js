import React from 'react';
import { Card, CardBody, Label, Input, Container, Row, Col } from 'reactstrap';

class AddMembroForm extends React.Component {
  render() {
    return (
      <div style={{margin: '10px 0'}}>
        <Card>
          <CardBody>
            <Container>
              <Row>
                <Col xs="6">
                  <Label>Nome</Label>
                  <Input type="text" />
                </Col>
                <Col xs="6">
                  <Label>E-mail</Label>
                  <Input type="text" />
                </Col>
              </Row>
              <Row style={{marginTop: '10px'}}>
                <Col xs="4">
                  <Label>Telefone</Label>
                  <Input type="text" />
                </Col>
                <Col xs="2">
                  <Label for="selectTam">Tamanho da camisa</Label>
                  <Input type="select" id="selectTam">
                    <option>P</option>
                    <option>M</option>
                    <option>G</option>
                    <option>GG</option>
                  </Input>
                </Col>
                <Col xs="6">
                  <Label>Foto</Label>
                  <Input type="file" />
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AddMembroForm;