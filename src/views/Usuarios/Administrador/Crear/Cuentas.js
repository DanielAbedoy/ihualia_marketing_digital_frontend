import React, { Component } from 'react';
import { Col, Card, CardHeader, CardBody, Row, Toast, ToastHeader, ToastBody, Button, Input, Badge, Form, FormGroup, Label } from 'reactstrap';

import Modelo from '../../../../models/Marketing.js';

class Cuentas extends Component {

  state = {
    cuentas: [],
    cuentas_asignadas: [],
  }

  componentDidMount = () => this.peticion_cuentas();

  peticion_cuentas = () => {
    new Modelo().get_cuentas_cliente(require('store').get('usuario_guardado').id_cliente)
      .then(r => this.setState({ cuentas: r },()=>{this.clasificar_cuentas()}))
  }

  asignar_cuenta = (e,cuenta) => {
    e.preventDefault();

    //buscar si ya existe la cuenta
    if (this.buscar_cuenta(cuenta.id)) return;

    this.setState({ cuentas_asignadas: [...this.state.cuentas_asignadas.slice(), cuenta] });

  }

  buscar_cuenta = (new_id) => {

    const find = this.state.cuentas_asignadas.filter(c => c.id == new_id);
    if (find.length === 0) return false;
    else return true;
  }

  quitar_cuenta = (e) => {
    e.preventDefault();
    const filters = this.state.cuentas_asignadas.filter(c => c.id != e.target.id);
    this.setState({cuentas_asignadas:filters})
  }

  dar_cargo = (e,cuenta, cargo) => {
    this.state.cuentas_asignadas.filter((c) => {
      if (c.id == cuenta.id) c.cargo = cargo;
    })
  }

  get_cuentas = () => this.state.cuentas_asignadas;

  clasificar_cuentas = () => {
    
    if (this.props.cuentas_propias === undefined) return;

    let new_arr = [];
    const cuentas_sin_asignar = this.state.cuentas.slice();
    cuentas_sin_asignar.forEach(c => {
      let b = false;
      this.props.cuentas_propias.forEach(n => {
        if (c.id === n.id) b = true;
      })
      if (!b) new_arr.push(c);
    });

    this.setState({cuentas:new_arr})
  }

  
  

  render() {
    return (
      <>
        <Col md="6" xs="12">
          <Card>
            <CardHeader>
              <p className="h5 text-center"> Cuentas</p>
            </CardHeader>
            <CardBody>
              <Row>
                {this.state.cuentas.map((cuenta, indx) => {
                  return (
                    <Col key={indx} className="text-center text-dark mx-auto p-0 bg-info" md="12" xs="12">
                      <Toast className="mx-auto">
                        <ToastHeader>
                          Clave de la Cuenta: {cuenta.id}
                        </ToastHeader>
                        <ToastBody>
                          <b>Nombre:</b> {cuenta.nombre}<br />
                          <b>Estatus:</b> <span className={cuenta.estatus.toLowerCase() == "activo" ? "text-success" : "text-danger"} >{cuenta.estatus}</span><br />
                        </ToastBody>
                        <Row>
                          <Col className="p-2 mx-auto" md="6" xs="12">
                            <Button block color="success" onClick={(e)=>this.asignar_cuenta(e,cuenta)}>Asignar</Button>
                          </Col>
                        </Row>
                      </Toast>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col md="6" xs="12">
          <Card>
            <CardHeader>
              <p className="h5 text-center"> Asignación</p>
            </CardHeader>
            <CardBody>
            <Row>
                {this.state.cuentas_asignadas.map((cuenta, indx) => {
                  return (
                    <Col key={indx} className="text-center text-dark mx-auto p-0 bg-info" md="12" xs="12">
                      <Toast className="mx-auto">
                        <ToastHeader>
                         Clave de la Cuenta: {cuenta.id}
                         <Badge id={cuenta.id} onClick={this.quitar_cuenta} style={{cursor:"pointer"}} className="ml-1" color="danger"> Quitar</Badge>   
                        </ToastHeader>
                        <ToastBody>
                          <b>Nombre:</b> {cuenta.nombre}<br />
                          <b>Estatus:</b> <span className={cuenta.estatus.toLowerCase() == "activo" ? "text-success" : "text-danger"} >{cuenta.estatus}</span><br />
 {/*                          <Input
                            onChange={this.dar_cargo}
                            className="mt-1" id={cuenta.id} type="text" placeholder="Cargo: (Responsable) (Apoyo)"
                          /> */}
                          <Form>
                        <b>Cargo:</b>
                        <FormGroup check>
                          <Label check>
                                <Input  type="radio" value="Responsable" name="radio1"
                                  onClick={(e)=>this.dar_cargo(e,cuenta,"responsable")} />{' '}
                              Responsable
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                                <Input  type="radio" value="Apoyo" name="radio1"
                                  onClick={(e)=>this.dar_cargo(e,cuenta,"apoyo")} />{' '}
                              Apoyo
                            </Label>
                        </FormGroup>
                      </Form>

                        </ToastBody>
                      </Toast>
                    </Col>
                  );
                })}
              </Row>

            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Cuentas;