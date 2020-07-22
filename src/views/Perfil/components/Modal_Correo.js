import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, InputGroup, InputGroupAddon,  InputGroupText } from 'reactstrap';

import Modelo from '../../../models/Marketing.js';

class ModalCorreo extends Component {

  state = {
    modal: false,
    correo: '',
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  actualizar = (e) => {
    e.preventDefault();
    if (this.state.correo === "" || this.state.correo === this.props.usuario.correo) {
      alert("Debe agregar un nuevo usuario");
      return;
    } else {
      if (window.confirm("¿ Seguro que deseas cambiar tu usuario ?")) {
        const c = this.props.usuario.correo;
        let user = this.props.usuario;
        user.correo = this.state.correo;
        user.imagen = this.props.imagen;

        //Paso uno traer relacion entre cuentas del nusuario
        new Modelo().get_cuentas_usuario(c)
          .then(r => r.data)
          .then(cuentas => {
            //Paso 1 Actualizar usuario
            new Modelo().actualizar_usuario(c, user)
              .then(r => {
                if (r.statusText === "OK") {
                
                  require('store').set('usuario_guardado',r.data);

                  cuentas.forEach(cuenta => { //Relacionar nuevo usuario con las cuentas
                    let data = {
                      tipo: cuenta.tipo,
                      id_usuario: r.data.correo,
                      id_cuenta: cuenta.id_cuenta
                    }
                    new Modelo().nuevo_usuario_cuenta(data)
                      .then(r=> r)
                  });
                }
                new Modelo().eliminar_usuario(c) //Eliminar el antiguo usuario
                  .then(r => {
                    if (r.statusText === "No Content") {
                      alert("Actualizado con éxito");
                      window.location.reload(true);
                    }
                  })
              })
              .catch(e => alert("Error: ", e));

          })
        
        
        
      }
    }

  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Cambiar Usuario</ModalHeader>
          <ModalBody>


            <Row>
              <Col md="12">
                <p className="h6"> <b>Correo Actual:</b> {this.props.usuario.correo} </p>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <InputGroup className="mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      @
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="Nuevo correo" autoComplete="usuario"
                    onChange={e => this.setState({ correo: e.target.value })}
                  />
                </InputGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.actualizar}>Confirmar</Button>{' '}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalCorreo;