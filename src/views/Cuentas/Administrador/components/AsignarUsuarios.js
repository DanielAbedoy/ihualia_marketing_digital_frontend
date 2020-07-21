import React, { Component } from 'react';
import { Col, Row, Card, CardBody, CardHeader, Toast, ToastBody, ToastHeader, Badge, Input, FormGroup, Label, Form } from 'reactstrap';

import Modelo from '../../../../models/Marketing.js';

class AsignarUsuario extends Component {

  state = {
    usuarios: [],
    usuarios_asignados: [],
  }

  componentDidMount = () => this.peticion_usuarios();


  peticion_usuarios = () => {
    new Modelo().get_usuarios_cliente(require('store').get('usuario_guardado').id_cliente)
      .then(r => this.setState({ usuarios: r },()=>{this.clasificar_usuarios()}))
  }

  asignar_usuario = (e) => {
    //Verificando si existe el elemento
    const find = this.state.usuarios_asignados.filter(u => u.correo == e.target.id);
    if (find.length > 0) return;

    const usuario = this.state.usuarios.filter(u => u.correo == e.target.id);
    const asignados = this.state.usuarios_asignados.slice();
    asignados.push(usuario[0]);
    this.setState({ usuarios_asignados: asignados });
  }

  quitar_usuario = (e) => {
    const arr = this.state.usuarios_asignados.filter(u => u.correo != e.target.id);
    this.setState({usuarios_asignados:arr})
  }

  dar_cargo = (e) => {
    this.state.usuarios_asignados.filter(u => {
      if (u.correo == e.target.id) {
        u.cargo = e.target.value;
      }
    });
  }

  get_usuarios = () => this.state.usuarios_asignados;

  clasificar_usuarios = () => {
    if (this.props.usuarios_propios === undefined) return;
    
    let usuarios_sin_asignar = this.state.usuarios.slice();
    let new_arr = [];
    usuarios_sin_asignar.forEach(u => {
      let b = false;
      this.props.usuarios_propios.filter(f => {
        if (u.correo == f.correo) b = true;
      });
      if (!b) new_arr.push(u);
    });
    this.setState({ usuarios: new_arr });

  }
  


  render() {
    return (
      <>
        <Col md="6" xs="12" className="mx-auto">
          {/* Usuarios */}
          <Card>
            <CardHeader>
              <p className="h4 text-center m-0"> Usuarios</p>
            </CardHeader>
            <CardBody>
              {this.state.usuarios.map((usuario, indx) => {
                return (
                  <Toast key={indx} className="mx-auto">
                    <ToastHeader>
                      <p className="m-0"><b>Nombre: </b>{usuario.nombre}
                        <Badge id={usuario.correo} onClick={this.asignar_usuario} style={{ cursor: "pointer" }} className="ml-1" color="success"> Asignar</Badge>
                      </p>
                    </ToastHeader>
                    <ToastBody>
                      <p className="m-0"><b>Usuario: </b>{usuario.usuario}</p>
                      <p className="m-0"><b>Correo: </b>{usuario.correo}</p>
                      <p className="m-0"><b>Estatus: </b>{usuario.estatus}</p>
                    </ToastBody>
                  </Toast>
                );
              })}
            </CardBody>
          </Card>
        </Col>

        <Col md="6" xs="12" className="mx-auto">
          {/* Asignacion */}
          <Card>
            <CardHeader>
              <p className="h4 text-center"> Asignación</p>
            </CardHeader>
            <CardBody>
              {this.state.usuarios_asignados.map((usuario, indx) => {
                return (
                  <Toast key={indx} className="mx-auto">
                    <ToastHeader>
                      <p className="m-0"><b>Nombre: </b>{usuario.nombre}
                        <Badge id={usuario.correo} onClick={this.quitar_usuario} style={{ cursor: "pointer" }} className="ml-1" color="danger"> Quitar</Badge>
                      </p>
                    </ToastHeader>
                    <ToastBody>
                      <p className="m-0"><b>Correo: </b>{usuario.correo}</p>

                      <Form>
                        <b>Cargo:</b>
                        <FormGroup check>
                          <Label check>
                            <Input id={usuario.correo} type="radio" value="Responsable" name="radio1" onClick={this.dar_cargo} />{' '}
                              Responsable
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input  id={usuario.correo} type="radio" value="Apoyo" name="radio1" onClick={this.dar_cargo}/>{' '}
                              Apoyo
                            </Label>
                        </FormGroup>
                      </Form>

                    </ToastBody>
                  </Toast>
                );
              })}
            </CardBody>
          </Card>
        </Col>

      </>
    );
  }
}

export default AsignarUsuario;