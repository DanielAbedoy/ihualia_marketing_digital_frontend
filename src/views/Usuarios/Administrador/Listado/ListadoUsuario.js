import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import NavBar from '../navbar.js';
import Modelo from '../../../../models/Marketing.js';

class ListadoUsuario extends Component {

  state = {
    usuarios: []
  }

  componentDidMount = () => {
    if (require('store').get('usuario_guardado').tipo.toLowerCase() !== "administrador") this.props.history.pus('/usuarios');
    this.peticion_usuarios()
  };

  peticion_usuarios = () => {
    new Modelo().get_usuarios_cliente(require('store').get('usuario_guardado').id_cliente)
      .then(r => {
        console.log(r)
        this.setState({ usuarios: r })
      })
  }

  administrar_usuario = (e) => {
    new Modelo().getUsuario(e.target.id)
      .then(r => {
        this.props.history.push({
          pathname: '/usuarios/administrar',
          state:r
        })
      })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <NavBar

                />

              </CardHeader>
              <CardBody>
              <Row>
                    <Col md="12">
                      <p className="h4 mb-0">Usuarios de la empresa</p>
                      <p className="h6 text-muted">Todos los usuarios pertenecientes a la empresa, puedes administrarlos</p>
                    </Col>
                  </Row>
                  <hr />
                <Row>
                  <Col md="12">
                    <div className={"table-responsive table-bordered table-hover"} >
                      <table className="table text-center">
                        <thead>
                          <tr className="bg-primary">
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Estatus</th>
                            <th>Opciones</th>
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
                                <td className="">
                                  <i id={usuario.correo} onClick={this.administrar_usuario} className="fa fa-cog border rounded bg-primary p-1" style={{ cursor: "pointer" }}></i>
                                </td>
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

export default ListadoUsuario;