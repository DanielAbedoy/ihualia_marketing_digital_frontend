import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';

import NavBar from '../navbar.js';
import Formulario from './Formulario.js';
import Cuentas from './Cuentas.js';
import Modelo from '../../../../models/Marketing';

class CrearUsuario extends Component {

  crear = () => {
    //Validar
    if (!this.validar_datos_usuario(this.formulario.get_datos())) return;

    const value = this.validar_cuentas_asignadas(this.cuentas.get_cuentas());
    if (value === 1) { //Cuentas erroneas
      alert("Debe seleccionar un cargo para todas las cuentas asignadas")
      return;
    }


    if (value === 2) { //Sin cuentas asignadas
      if (window.confirm("¿ Seguro que desea crear el usuario sin cuentas asignadas ?")) {
        //Crear usuario (Colaborador)
        new Modelo().nuevo_usuario(this.acomodar_datos(this.formulario.get_datos()))
          .then(r => {
            if (r.statusText === "Created") {
              alert("Creado con éxito")
              this.props.history.push('/usuarios')
            }
          })
      }
    } else { //Todo bien
      //Crear usuario (Colaborador)
      new Modelo().nuevo_usuario(this.acomodar_datos(this.formulario.get_datos()))
        .then(r => r.data.correo)
        .then(r => {
          
          this.cuentas.get_cuentas().forEach(c => {
            const data = {
              tipo: c.cargo,
              id_usuario: r,
              id_cuenta: c.id
            }
            new Modelo().nuevo_usuario_cuenta(data)
              .then( (r)=>{})
          });

          alert("Creado con éxito")
          this.props.history.push('/usuarios')
        })
        
    }
  }

  validar_datos_usuario = (datos) => {
    for (const dato in datos) {
      if (datos[dato] === '') {
        alert("Debe agregar todos los datos");
        return false;
      }

    }

    //Validadcion de las contraseñas
    if (datos.passw1 === '' && datos.passw2 === '') {
      alert("Necesita ingresar alguna contraseña.");
      return false;
    } else if (datos.passw2 === '' && datos.passw1 !== '') {
      alert("Necesita repetir la contraseña.");
      return false;
    } else if (datos.passw1 === '') {
      alert("Necesita ingresar alguna contraseña.");
      return false;
      //Verificando que sean las mismas contraseñas
    } else if (datos.passw1 !== datos.passw2) {
      alert("Las contraseñas no son las mismas.");
      return false;
    }

    //Correp
    let exp_reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!exp_reg.test(datos.correo)) {
      alert("Se debe agregar un correo real")
      return false;
    }


    return true;
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

  acomodar_datos = (datos) => {
    const datos_usuario = {
      correo: datos.correo,
      usuario: datos.usuario,
      password: datos.passw1,
      nombre: datos.nombre,
      tipo: "Colaborador",
      estatus: "Activo",
      imagen: datos.imagen,
      id_cliente: require('store').get('usuario_guardado').id_cliente,
    };

    return datos_usuario;
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
                < Row>
                  <Col md="12">
                    <p className="h4 text-center"> Datos del Usuario </p>
                  </Col>
                </Row>
                <hr />
                < Row>
                  <Col md="7" xs="12" className="mx-auto">
                    <Formulario
                      ref={element => { this.formulario = element }}
                    />
                  </Col>
                </Row>
                <hr />
                < Row>
                  <Col md="12">
                    <p className="h4 text-center"> Cuentas a Asignarle </p>
                  </Col>
                </Row>
                <hr />

                <Row>
                  <Cuentas
                    ref={element => { this.cuentas = element }}
                  />
                </Row>
                <hr />
                <Row>
                  <Col md="6" xs="8" className="mx-auto">
                    <Button onClick={this.crear} block color="success"> Crear Usuario</Button>
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

export default CrearUsuario;