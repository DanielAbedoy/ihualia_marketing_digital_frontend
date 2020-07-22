import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Navbar } from 'reactstrap';

import Administrador from './Administrador/Administrador.js';
import Modelo from '../../models/Marketing.js';


class Usuarios extends Component {

  state = {
    usuarios: [],
    tipo_usuario: ''
  }


  componentDidMount = () => this.peticion_usuarios();

  peticion_usuarios = () => {
    new Modelo().get_usuarios_cliente(require('store').get('usuario_guardado').id_cliente)
      .then(r => this.setState({ usuarios: r, tipo_usuario:require('store').get('usuario_guardado').tipo }))
  }

  administrar_usuario = (e) => {
    new Modelo().getUsuario(e.target.id)
      .then(r => {
        this.props.history.push({
          pathname: '/usuarios/administrar',
          state: r
        })
      })
  }

  render() {
    if (this.state.tipo_usuario.toLowerCase() === "administrador") {
      return (<><Administrador /></>);
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <p className="h3 p-2"><i className="fa fa-users"></i> Usuarios |</p>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col md="12">
                      <div className={"table-responsive table-bordered table-hover"} >
                        <table className="table text-center">
                          <thead>
                            <tr className="thead-dark">
                              <th>Nombre</th>
                              <th>Usuario</th>
                              <th>Correo</th>
                              <th>Estatus</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.usuarios.map((usuario, i) => {
                              return (
                                <tr key={i}>
                                  <td>{usuario.nombre}</td>
                                  <td>{usuario.usuario}</td>
                                  <td>{usuario.correo}</td>
                                  <td className={usuario.estatus.toLowerCase() == "activo" ? "bg-success" : "bg-danger"} >{usuario.estatus}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Usuarios;
