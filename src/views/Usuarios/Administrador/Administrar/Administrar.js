import React, { Component, useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Badge, Button } from 'reactstrap';

import NavBar from '../navbar';
import ImagenUser from '../../../../components/UserImages';

import Modelo from '../../../../models/Marketing.js';
import Cuentas from '../Crear/Cuentas';
import { element } from 'prop-types';

class Administrar extends Component {

  state = {
    usuario: {
      nombre: '',
      usuario: '',
      correo: '',
      estatus: ''
    },
    dupla_imagen: '',
    cuentas: [],
    nueva_asignacion: false,
  }


  componentDidMount = () => {
    if (require('store').get('usuario_guardado').tipo.toLowerCase() !== "administrador") this.props.history.pus('/usuarios');
    try {

      let user = this.props.location.state.usuario;

      const img = ImagenUser.filter(w => w.nombre === user.imagen)
      const nom_img = user.imagen;
      user.imagen = img[0].direccion;

      this.setState({ usuario: user, dupla_imagen: nom_img }, () => this.peticion_cuentas())
    } catch (e) {
      this.props.history.push('/usuarios');
    }
  }

  peticion_cuentas = () => {
    new Modelo().get_cuentas_usuario(this.state.usuario.correo)
      .then(cuentas => this.setState({ cuentas: cuentas }))
  }

  desactivar_activar = (e) => {
    if (this.state.usuario.estatus === 'Activo') {
      if (this.state.usuario.correo === require('store').get('usuario_guardado').correo) {
        alert("¡ No pudes desactivar tu cuenta !")
        return;
      }
    }


    //Inactivor
    let datos = this.state.usuario;
    datos.imagen = this.state.dupla_imagen;
    if (this.state.usuario.estatus.toLowerCase() === 'activo') {
      datos.estatus = "Inactivo";
      new Modelo().actualizar_usuario(datos.correo, datos)
        .then(r => {
          if (r.statusText === "OK") this.props.history.push({ pathname: '/usuarios' })
        });
    } else {
      datos.estatus = "Activo";
      new Modelo().actualizar_usuario(datos.correo, datos)
        .then(r => {
          if (r.statusText === "OK") this.props.history.push({ pathname: '/usuarios' })
        });
    }
  }

  eliminar_cuenta = (e) => {
    e.preventDefault();

    if (this.state.usuario.correo === require('store').get('usuario_guardado').correo) {
      alert("¡ No pudes eliminar tu cuenta !")
      return;
    }

    if (window.confirm("¿ Seguro que desea eliminar el usuario ?")) {
      new Modelo().eliminar_usuario(this.state.usuario.correo)
        .then(r => {
          alert("Eliminada con exito")
          this.props.history.push('/usuarios');
        })

    }

  }

  asignar_cuentas = async(e) => {
    //Validar
    e.preventDefault();
    const value = this.validar_cuentas_asignadas(this.cuentas.get_cuentas());
    if (value === 2) { //Cuentas erroneas
      alert("Debe asignar almenos una cuenta")
      return;
    }
    if (value === 1) { //Cuentas erroneas
      alert("Debe asignar un cargo a todas las cuentas")
      return;
    }

    let cuentasAsignadas = [];
    this.cuentas.get_cuentas().forEach(c => cuentasAsignadas.push({ id: c.id, tipo: c.cargo }))
    await new Modelo().add_cuentas_user(this.state.usuario.correo, cuentasAsignadas);
    
    alert("Asignado con éxito")
    this.props.history.push('/usuarios/listado')
  }

  validar_cuentas_asignadas = (cuentas) => {
    if (cuentas.length === 0) return 2; //Sin cuentas Asignadas

    let flag = false;
    for (let i = 0; i < cuentas.length; i++) {
      if (cuentas[i].cargo === undefined) return 1;
      if (cuentas[i].cargo.toLowerCase() === "responsable") flag = true;
      if ((cuentas[i].cargo.toLowerCase() === "apoyo")) flag = true;
      if (!flag) return 1;
    }

    return 0;
  }

  desvincular_usuario = (e) => {
    e.preventDefault();

    if (window.confirm("¿ Seguro que desea desvincular el usuario de la cuenta ?")) {
      new Modelo().desvincular_usuario_cuenta(e.target.id, this.state.usuario.correo)
        .then(r => {
          if (r.statusText === "No Content") alert("Desvinculada con éxito");
          this.props.history.push('/usuarios');
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
                <p className="h4 mb-0">Administrador de usuario</p>
                <p className="h6 text-muted">Puedes activar o desactivar elusuario, y puedes asignarle o quitar cuentas</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="6" xs="12" className="text-center mx-auto">
                <Badge onClick={this.desactivar_activar} style={{ cursor: "pointer" }} className="m-0"
                  color={this.state.usuario.estatus.toLowerCase() === "activo" ? "info" : "success"}>
                  {this.state.usuario.estatus.toLowerCase() === "activo" ? "Desactivar" : "Acitivar"}
                </Badge> <Badge onClick={this.eliminar_cuenta} style={{ cursor: "pointer" }} className="ml-1" color="danger"> Eliminar</Badge>
                <p className="h4">Datos</p>
                <hr />
                <img src={this.state.usuario.imagen} /><br />
                <p className="m-0"><b>Nombre: </b>{this.state.usuario.nombre}</p>
                <p className="m-0"><b>Usuario: </b>{this.state.usuario.usuario}</p>
                <p className="m-0"><b>Correo: </b>{this.state.usuario.correo}</p>
                <p className="m-0"><b>Estatus: </b><span className={this.state.usuario.estatus.toLowerCase() === "activo" ? "text-success" : "text-danger"}>{this.state.usuario.estatus}</span></p>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col md="10" xs="12" className="mx-auto">
                <Row>
                  <Col md="10" xs="12" className="mx-auto text-center">
                    <p className="h4">Cuentas Asignadas <i className="fa fa-plus-square text-success" aria-hidden="true"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => { this.setState({ nueva_asignacion: !this.state.nueva_asignacion }) }}
                    ></i></p>
                  </Col>
                </Row>
                <Row>
                  {this.state.cuentas.map((cuenta, i) => {
                    return (
                      <Col key={i} lg="4" md="4" sm="6" xs="6" className="border border-dark rounded p-1 text-center ">
                        <p className="m-0"><b>Clave: </b>{cuenta.id} <Badge id={cuenta.id} onClick={this.desvincular_usuario} style={{ cursor: "pointer" }} className="ml-1" color="danger"> Quitar</Badge></p>
                        <p className="m-0"><b>Nombre: </b>{cuenta.nombre}</p>
                        <p className="m-0"><b>Estatus: </b>{cuenta.estatus}</p>
                        <p className="m-0"><b>Cargo: </b>{cuenta.tipo}</p>
                      </Col>
                    );
                  })}
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
            <p className="h4 text-center">Asignar Nuevas Cuentas</p>
          </Col>
          <Cuentas
            ref={element => { this.cuentas = element }}
            cuentas_propias={this.state.cuentas}
          />
          <Col md="4" xs="8" className="mx-auto">
            <Button block color="success" onClick={this.asignar_cuentas} >Asignar Cuentas</Button>
          </Col>
        </Row>
      );
    }
  }

}

export default Administrar;