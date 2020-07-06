import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, FormGroup, Label, Row } from 'reactstrap';

import NuevoCampo from './FormNuevoCampo.js';

class FormContacto extends Component {

  constructor(props) {
    super(props)
    this.state = {
      valsInputs: [],

    }
    this.getValoresInputs.bind(this);
    this.validar.bind(this)
  }

  darValor = (e) => {
    e.preventDefault()

    let aux = this.state.valsInputs;
    aux[e.target.id] = e.target.value;
    this.setState({ valsInputs: aux });
  }

  getValoresInputs = (e) => {
    e.preventDefault();

    let valores = this.state.valsInputs;
    let len = this.props.inputs.length;

    let aux = []
    for (let i = 0; i < len; i++) {
      aux.push("");
    }

    for (let i = 0; i < valores.length; i++) {
      aux[i] = valores[i];
      if (aux[i] === undefined) aux[i] = "";
    }
    this.setState({ valsInputs: aux }, () => {
      this.validar(this.state.valsInputs);
    });
  }


  //Funcion para validar que esten completos los campos
  validar = (arr) => {
    let flag = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "") flag = false;
    }



    if (flag) {
       //Validadcion
        //Si se modifica en el modelo la poscicion del correo AQUI ESTA EL ERROR 
        //YA QUE AQUI REVICE EL CORREO PERO NO ALGORITMICAMENTE SINO POR DEDUCCION SE TENDRA QUE SABER LA POSICION DEL CORREO EN EL ARREGLO QUE SE REGRESA
        let correo = arr[1];
        let exp_reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!exp_reg.test(correo)) {
            alert("Se debe agregar un correo real")
            return;
        }

      this.props.action(arr);
      this.reiniciarCampos()
      alert("Se agrego correctamente")
    } else alert("De ingresar todos los campos");
  }

  reiniciarCampos = () => {
    let camps = [...document.getElementsByTagName("input")];
    camps.forEach((input) => {
      input.value = "";
    })
    this.setState({ valsInputs: [] })
  }

  action_nuevo_campo = (str) => {
    this.props.action_campo(str);
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center ">
          <Col md="10" lg="10" xl="10" xs="12" sm="12">
            <Card className="bg-secondary">
              <CardBody className="p-4">
                <Form xs="12" sm="12"  >
                  <Row>
                    <Col md="12" xs="12" className="mb-3">
                      <p className="h4 text-dark">Campos </p>
                    </Col>
                  </Row>
                  <hr />
                  <Row >
                    {this.props.inputs.map((campo, i) => {
                      return (
                        <Col key={i} lg="6" md="6" sm="12" xs="12">
                          <FormGroup >
                            <Label for={campo}><b> {campo.toUpperCase()}:</b></Label>
                            <Input className="text-center" type="input" name={campo} id={i}
                              onChange={this.darValor}
                            />
                          </FormGroup>
                        </Col>
                      );
                    })}
                  </Row>
                  <Row>
                    <Col lg="6" md="6" sm="12" xs="12" className="mx-auto mt-3">
                      <Button onClick={this.getValoresInputs} color="success" block>Agregar a la tabla</Button>
                    </Col>
                  </Row>
                </Form>
                <br /><hr />
                <NuevoCampo
                  action={this.action_nuevo_campo}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FormContacto;