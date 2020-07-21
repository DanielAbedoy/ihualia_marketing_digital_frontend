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
      .then(r => r.data.results)
      .then(r => this.setState({ cuentas: r },()=>{this.clasificar_cuentas()}))
  }

  asignar_cuenta = (e) => {
    e.preventDefault();

    //buscar si ya existe la cuenta
    if (this.buscar_cuenta(e.target.id)) return;

    new Modelo().get_cuenta(e.target.id)
      .then((r) => {
        if (this.state.cuentas_asignadas.length === 0) this.setState({ cuentas_asignadas: [r.data]});
        else {
          let arr = this.state.cuentas_asignadas.slice();
          arr.push(r.data);
          this.setState({cuentas_asignadas:arr})
        }
        
      })

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

  dar_cargo = (e) => {
    this.state.cuentas_asignadas.filter((c) => {
      if (c.id == e.target.id) c.cargo = e.target.value;
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
                            <Button id={cuenta.id} block color="success" onClick={this.asignar_cuenta}>Asignar</Button>
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
                            <Input id={cuenta.id} type="radio" value="Responsable" name="radio1" onClick={this.dar_cargo} />{' '}
                              Responsable
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input  id={cuenta.id} type="radio" value="Apoyo" name="radio1" onClick={this.dar_cargo}/>{' '}
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