import React, { Component } from 'react';
import { Row, Col, CardHeader, CardBody, Card, Button, Badge } from 'reactstrap';

import NavBar from '../navbar.js';
import Modelo from '../../../../models/Marketing.js'
import AsignarUsuario from '../components/AsignarUsuarios.js';

class Administrar extends Component {

  state = {
    cuenta: {
      id: '',
      nombre: '',
      estatus: '',
      id_cliente: ''
    },
    usuarios: [],
    nueva_asignacion: false
  }



  componentDidMount = () => {

    if (require('store').get('usuario_guardado').tipo.toLowerCase() !== "administrador") this.props.history.push('/cuentas');

    try {
      this.setState({ cuenta: this.props.location.state.cuenta }, () => {
        new Modelo().get_usuarios_cuenta(this.state.cuenta.id)
          .then(users => this.setState({ usuarios: users }))
      })

    } catch (e) {
      this.props.history.push('/cuentas')
    }
  }

  desactivar_activar = (e) => {
    e.preventDefault();

    if ((require('store').get('cuenta_en_uso') !== undefined)) {
      if ((require('store').get('cuenta_en_uso').id + "") === e.target.id) {
        return alert("No puedes desactivar esta cuenta porque está en uso");
      }
    }

    const estatus = this.state.cuenta.estatus.toLowerCase() === "activo" ? "Inactivo" : "Activo";

    const datos = {
      nombre: this.state.cuenta.nombre,
      estatus: estatus,
      id_cliente: this.state.cuenta.id_cliente
    }

    new Modelo().actualizar_cuenta(this.state.cuenta.id, datos)
      .then(r => {
        if (r.statusText === "OK") alert("Actializado con éxito");
        this.props.history.push('/cuentas');
      })

  }

  eliminar_cuenta = (e) => {
    if (window.confirm("¿ Seguro que desea eliminar la cuenta ?")) {
      new Modelo().eliminar_cuenta(this.state.cuenta.id)
        .then(r => {
          if (r.statusText === "No Content") alert("Elimiinada con éxito");
          this.props.history.push('/cuentas');
        })
    }
  }

  asignar_cuentas =async (e) => {
    e.preventDefault();
    //Validar //0 sin nombre - 1 sin usuarios - 2 sin cargos - 3 todo bien
    const usuarios = this.component_asig.get_usuarios();
    const result = this.validar(usuarios);
    if (result === 2) {
      alert("Debe asignar un cargo a todos los usuarios")
      return;
    }

    if (result === 1) {
      return alert("Debe asignar almenos un usuario nuevo")
    }
    if (result === 3) {

      /* usuarios.forEach(u => {
        const data = {
          tipo: u.cargo,
          id_usuario: u.correo,
          id_cuenta: this.state.cuenta.id
        }
        new Modelo().nuevo_usuario_cuenta(data)
          .then(r => r)
      });*/
      

      let nuevosUsuarios = [];
      usuarios.forEach(u => nuevosUsuarios.push({ user: u.correo, tipo: u.cargo }))
      await new Modelo().add_users_cuenta(this.state.cuenta.id, nuevosUsuarios)
      alert("Asigandos con éxito")
      this.props.history.push('/cuentas/listado') 

    }


  }

  validar = (usuarios) => {
    //Validar cargos
    if (usuarios.length === 0) return 1;

    let b = false;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].cargo === undefined) return 2;
      if (usuarios[i].cargo === "Responsable") b = true;
      if (usuarios[i].cargo === "Apoyo") b = true;
      if (!b) return 2;
    }

    return 3;
  }

  desvincular_cuenta = (e) => {
    e.preventDefault();

    if (window.confirm("¿ Seguro que desea desvincular el usuario de la cuenta ?")) {
      new Modelo().desvincular_usuario_cuenta(this.state.cuenta.id, e.target.id)
        .then(r => {
          if (r.statusText === "No Content") alert("Desvinculada con éxito");
          this.props.history.push('/cuentas');
        })
    }

  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <NavBar />
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="12">
                <p className="h4 mb-0">Administrador de cuentas</p>
                <p className="text-muted">Puedes desactivar o activar la cuenta, eliminarla, y quitar o asignar nuevos usuarios</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="6" xs="12" className="text-center mx-auto">
                <Badge id={this.state.cuenta.id} onClick={this.desactivar_activar} style={{ cursor: "pointer" }} className="m-0"
                  color={this.state.cuenta.estatus.toLowerCase() === "activo" ? "info" : "success"}>
                  {this.state.cuenta.estatus.toLowerCase() === "activo" ? "Desactivar" : "Acitivar"}
                </Badge> <Badge id={this.state.cuenta.id} onClick={this.eliminar_cuenta} style={{ cursor: "pointer" }} className="ml-1" color="danger"> Eliminar</Badge>
                <p className="h4">Datos</p>
                <p className="m-0"><b>Cleve: </b>{this.state.cuenta.id}</p>
                <p className="m-0"><b>Nombre: </b>{this.state.cuenta.nombre}</p>
                <p className="m-0"><b>Estatuu: </b>{this.state.cuenta.estatus}</p>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col md="10" xs="12" className="mx-auto">
                <Row>
                  <Col md="10" xs="12" className="mx-auto text-center">
                    <p className="h4">Trabajadores <i className="fa fa-plus-square text-success" aria-hidden="true"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => { this.setState({ nueva_asignacion: !this.state.nueva_asignacion }) }}
                    ></i></p>
                  </Col>
                </Row>
                <Row>

                  <Col className="mx-auto" lg="12" md="12" sm="12" xs="12">
                    <div className={"table-responsive table-bordered table-hover"} >
                      <table className="table text-center">
                        <thead>
                          <tr className="thead-dark">
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Estatus</th>
                            <th>Cargo</th>
                            <th>Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.usuarios.map((usuario, i) => {
                            return (
                              <tr key={i}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.correo}</td>
                                <td className={usuario.estatus.toLowerCase() == "activo" ? "bg-success" : "bg-danger"} >{usuario.estatus}</td>
                                <td>{usuario.tipo}</td>
                                <td className="m-0">
                                  <i id={usuario.correo} onClick={this.desvincular_cuenta} className="fa fa-times border rounded bg-danger p-1 mr-2" style={{ cursor: "pointer" }}></i>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Col>

                </Row>
              </Col>
            </Row>
            <hr />

            {this.component_asignar()}


          </CardBody>
        </Card>
      </div>
    );
  }


  component_asignar = () => {
    if (this.state.nueva_asignacion) {
      return (
        <Row>
          <Col md="12">
            <p className="h4 text-center">Asignar Nuevos Usuarios </p>
          </Col>
          <AsignarUsuario
            ref={element => { this.component_asig = element }}
            usuarios_propios={this.state.usuarios}
          />
          <Col md="4" xs="8" className="mx-auto">
            <Button block color="success" onClick={this.asignar_cuentas} >Asignar Usuarios</Button>
          </Col>
        </Row>
      );
    }
  }

}

export default Administrar;