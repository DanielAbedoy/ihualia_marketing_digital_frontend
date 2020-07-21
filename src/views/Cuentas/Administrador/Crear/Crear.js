import React, { Component } from 'react';
import { Row, Col, CardHeader, CardBody, Card, Input, Button } from 'reactstrap';

import AsignarUsuarios from '../components/AsignarUsuarios';
import Modelo from '../../../../models/Marketing.js';

import NavBar from '../navbar.js';

class Crear extends Component{

  state = {
    nombre_cuenta:'',
  }

  crear = (e) => {
    e.preventDefault();
    //Validar //0 sin nombre - 1 sin usuarios - 2 sin cargos - 3 todo bien
    const usuarios = this.comp_asignar.get_usuarios();
    const result = this.validar(usuarios);
    if (result === 0) {
      alert("Debe agregar un nombre a la cuenta")
      return;
    }
    if (result === 2) {
      alert("Debe asignar un cargo a todos los usuarios")
      return; 
    }


    if (result === 1) {
      if (window.confirm("¿ Seguro que desea crear la cuenta sin usuarios ?")) {
        const datos = {
          nombre: this.state.nombre_cuenta,
          estatus: 'Activo',
          id_cliente: require('store').get('usuario_guardado').id_cliente
        }
        new Modelo().nueva_cuenta(datos)
          .then((r) => {
            if (r.statusText === 'Created') alert("Creada con éxito");
            this.props.history.push('/cuentas');
          });
        return;
      }
    }
    if (result === 3) {
      const datos = {
        nombre: this.state.nombre_cuenta,
        estatus: 'Activo',
        id_cliente: require('store').get('usuario_guardado').id_cliente
      }
      new Modelo().nueva_cuenta(datos)
        .then(r => r.data.id)
        .then(r => {
          usuarios.forEach(u => {
            const data = {
              tipo: u.cargo,
              id_usuario: u.correo,
              id_cuenta: r
            }
            new Modelo().nuevo_usuario_cuenta(data)
              .then(r => r)
          });
          alert("Creada con éxito")
          this.props.history.push('/cuentas')
        });
      
    }


  }

  validar = (usuarios) => {
    //Validar campo
    if (this.state.nombre_cuenta === "") return 0;
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

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <NavBar />
              </CardHeader>
              <CardBody>

              < Row>
                  <Col md="12">
                    <p className="h4 text-center"> Nombre de la Cuenta </p>
                  </Col>
                </Row>
                < Row>
                  <Col md="7" xs="12" className="mx-auto">
                    <Input type="text" placeholder="Escribe el nombre ..."
                      onChange={(e)=>{this.setState({nombre_cuenta:e.target.value})}}
                    />
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <AsignarUsuarios
                    ref={element => { this.comp_asignar = element }}
                  />
                </Row>
              
                <Row>
                  <Col md="5" xs="9" className="mx-auto">
                    <Button onClick={this.crear} block color="success" > Crear Cueta</Button>
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

export default Crear;