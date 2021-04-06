import React, { Component, useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Badge, Button } from 'reactstrap';

import ImagenUser from '../../../components/UserImages';

import ModeloMarketing from '../../../models/Marketing.js';
import Cuentas from './Hooks/Cuentas/Cuentas';


class Administrar extends Component {

  state = {
    usuario: '',
  }

  componentDidMount = () => {
    if (!this.props.location.state) {
      this.props.history.push("/usuarios");
      return;
    }
    console.log(this.props.location.state.usuario)
    this.setState({ usuario: this.props.location.state.usuario });
  }

  restart_user = () => {
    new ModeloMarketing().get_user(this.state.usuario.id)
      .then(r => this.setState({ usuario: r }))
  }

  activar_desactivar = () => {
    const c = this.state.usuario;
    new ModeloMarketing().actualizar_user(c.id, { estatus: c.estatus.toLowerCase() === "activo" ? "inactivo" : "activo" })
      .then(r => {
        if (r.data.message) this.restart_user();
      })
  }

  render() {
    const u = this.state.usuario;
    return (
      <div className="animated fadeIn">
        <Card>

          <CardHeader style={{ backgroundColor: "#333333" }}>
            <p className="h3 p-2 text-white"><i className="fa fa-users"></i> Usuarios |</p>
          </CardHeader>
          <CardBody>
            {u !== "" &&
              <>
                <Row>
                  <Col md="12">
                    <p className="h4 mb-0">Administrador de usuario</p>
                    <p className="h6 text-muted">Puedes activar o desactivar elusuario, y puedes asignarle o quitar cuentas</p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md="6" xs="12" className="text-center mx-auto">
                    <Badge className="m-0 cursor-p" onClick={this.activar_desactivar}
                      color={u.estatus.toLowerCase() === "activo" ? "info" : "success"}>
                      {u.estatus.toLowerCase() === "activo" ? "Desactivar" : "Acitivar"}
                    </Badge> <Badge className="ml-1 cursor-p" color="danger"> Eliminar</Badge>
                    <p className="h4">Datos</p>
                    <hr />
                    <img src={u.imagen} /><br />
                    <p className="m-0"><b>Nombre: </b>{u.nombre}</p>
                    <p className="m-0"><b>Usuario: </b>{u.usuario}</p>
                    <p className="m-0"><b>Correo: </b>{u.correo}</p>
                    <p className="m-0"><b>Estatus: </b><span className={u.estatus.toLowerCase() === "activo" ? "text-success" : "text-danger"}>{u.estatus}</span></p>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col md="10" xs="12" className="mx-auto">
                    <Cuentas usuario={u} cuentas={u.cuentas} restart={()=>this.restart_user()} />
                  </Col> 
                </Row>
              </>
            }
          </CardBody>
        </Card>
      </div>
    );
  }


}

export default Administrar;