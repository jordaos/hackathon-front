import React from 'react';
import { Card, CardBody, Label, Input, Container, Row, Col } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class AddMembroForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participante: {
        nome: '',
        email: '',
        telefone: '',
        tamCamisa: 'P'
      },
      disabled: false,
      emailValid: true,
      isFirst: false
    }
  }

  componentWillReceiveProps() {
    if(this.props.index === 0) {
      const participante = this.props.currentUser;
      this.setState({participante, isFirst: true});
    }
  }

  handleChange(field, e) {
    const value = e.target.value;
    let emailValid = true;
    if (field === 'email') {
      const participantesWithThisEmail = this.props.participantes.filter((participante) => {
        return participante.email === value
      });

      if (participantesWithThisEmail.length > 0) {
        emailValid = false;
      }
    }

    const participante = Object.assign({}, this.state.participante, { [field]: value });
    this.setState(Object.assign({}, this.state, { participante, emailValid }));

    this.props.onHandleParticipanteChanges(this.state.participante, this.props.index);
  }

  _handleNomeChange = (e) => {
    if (e.length > 0) {
      const participante = e[0];
      if (this.props.equipes.participantes !== undefined && 
         (this.props.equipes.participantes.filter(p => p.email === participante.email).length > 0 ||
         this.props.participantesNessaEquipe.filter(p => p.email === participante.email).length > 0)) {
          this.setState({ emailValid: false });
      }else if (this.props.participantesNessaEquipe.filter(p => p.email === participante.email).length > 0) {
          this.setState({ emailValid: false });
      } else {
        this.setState({ disabled: true, participante: participante }, () => {
          this.props.onHandleParticipanteChanges(this.state.participante, this.props.index);
        });
      }
    } else {
      this.setState({
        disabled: false, participante: {
          email: '',
          telefone: '',
          tamCamisa: 'P'
        }
      });
    }
  }

  _handleInputChange = (text, event) => {
    const participantesWithThisName = this.props.participantes.filter((participante) => {
      return participante.nome === text
    });
    if (participantesWithThisName.length > 0)
      this.setState({ disabled: true, participante: participantesWithThisName[0] });

    const participante = Object.assign({}, this.state.participante, { nome: text });
    this.setState(Object.assign({}, this.state, { participante }), () => {
      this.props.onHandleParticipanteChanges(this.state.participante, this.props.index);
    });
  }

  render() {
    return (
      <div style={{ margin: '10px 0' }}>
        <Card>
          <CardBody>
            <Container>
              <Row>
                <Col xs="6" hidden={this.state.isFirst}>
                  <Label>Nome</Label>
                  <Typeahead
                    emptyLabel={false}
                    minLength={3}
                    paginate
                    labelKey="nome"
                    value={this.state.participante.nome}
                    options={this.props.participantes}
                    onChange={this._handleNomeChange}
                    onInputChange={this._handleInputChange}
                  />
                </Col>
                <Col xs="6" hidden={!this.state.isFirst}>
                  <Label>Nome</Label>
                  <Input type="text" disabled={true}
                    value={this.state.participante.nome} />
                </Col>
                <Col xs="6">
                  <Label>E-mail</Label>
                  <Input type="text" disabled={this.state.disabled || this.state.isFirst}
                    value={this.state.participante.email}
                    invalid={!this.state.emailValid}
                    onChange={this.handleChange.bind(this, 'email')} />
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col xs="4">
                  <Label>Telefone</Label>
                  <Input type="text" disabled={this.state.disabled || this.state.isFirst}
                    value={this.state.participante.telefone}
                    onChange={this.handleChange.bind(this, 'telefone')} />
                </Col>
                <Col xs="2">
                  <Label for="selectTam">Tamanho da camisa</Label>
                  <Input type="select" disabled={this.state.disabled || this.state.isFirst} 
                    id="selectTam"
                    value={this.state.participante.tamCamisa}
                    onChange={this.handleChange.bind(this, 'tamCamisa')}>
                    <option>P</option>
                    <option>M</option>
                    <option>G</option>
                    <option>GG</option>
                  </Input>
                </Col>
                <Col xs="6">
                  <Label>Foto</Label>
                  <Input type="file" disabled={this.state.disabled || this.state.isFirst}/>
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