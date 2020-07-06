import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Input, Label, Button } from 'reactstrap';

class FormAdmin extends Component {


  constructor(props) {
    super(props);

    this.state = {
      campos: [],
      valsInputs: [],
    }

    this.darValor.bind(this);
  }


  setValores = (camp, arr) => {
    this.setState({
      campos: camp,
      valsInputs: arr,
    })
  }

  //Funcion para que cuando cambie de texto en algun input lo cambie en el state
  darValor = (e) => {
    e.preventDefault()
    let aux = this.state.valsInputs;
    
    let n = e.target.id.substring(2, 3)
    aux[n] = e.target.value;

    this.setState({ valsInputs: aux });
  }


  bt_actualizar = (e) => {
    e.preventDefault();

    let vals = [];
    for (let i = 0; i < this.state.valsInputs.length; i++) {
      let eleme = document.getElementById(("in" + i));
      vals.push(eleme.value);
    }

    this.setState({ valsInputs: vals }, () => {
      this.props.action_actualizar(this.state.valsInputs);
    });
  }

  bt_eliminar = (e) => {
    e.preventDefault();
    let vals = [];
    for (let i = 0; i < this.state.valsInputs.length; i++) {
      let eleme = document.getElementById(("in" + i));
      vals.push(eleme.value);
    }

    this.setState({ valsInputs: vals }, () => {
      this.props.action_eliminar(this.state.valsInputs);
    });
  }


  reiniciarCampos = () => {
    let camps = [...document.getElementsByTagName("input")];
    camps.forEach((input) => {
      input.value = "";
    })
    this.setState({ valsInputs: [] })
  }

  render() {
    if (this.props.campos.length === 0) return (<></>);
    return (
      <Col md="12">
        <Form xs="12" sm="12"  >
          <hr />
          <Row>
            <Col md="12" xs="12" className="mb-3">
              <p className="h4 text-dark">Campos </p>
            </Col>
          </Row>
          <Row >
            {this.props.campos.map((campo, i) => {
              return (
                <Col key={i} lg="6" md="6" sm="12" xs="12">
                  <FormGroup >
                    <Label for={campo}><b> {campo.toUpperCase()}:</b></Label>
                    {this.showInputs(campo,i)}
                  </FormGroup>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col lg="6" md="6" sm="12" xs="12" className="mx-auto mt-3">
              <Button onClick={this.bt_actualizar} color="primary" block>Actualizar</Button>
            </Col>
            <Col lg="6" md="6" sm="12" xs="12" className="mx-auto mt-3">
              <Button onClick={this.bt_eliminar}color="danger" block>Eliminar</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }


  showInputs = (campo, i) => {
    let value = this.state.valsInputs[i];
    if (i === 0) {
      return (
        <Input disabled className="text-center border-bottom" type="text" name={campo} id={"in" + i} value={value || ''}
          onChange={this.darValor}
        />
      );
    }
    else {
      return (
        <Input className="text-center border-bottom" type="text" name={campo} id={"in"+i} value={value || ''}
          onChange={this.darValor}
        />
      )
    }
  }

}

export default FormAdmin;