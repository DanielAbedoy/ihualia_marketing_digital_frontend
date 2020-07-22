import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, InputGroup, InputGroupAddon,  InputGroupText } from 'reactstrap';

class ModalNombre extends Component {

  state = {
    modal: false,
    nombre: '',

  }

  toggle = () => this.setState({ modal: !this.state.modal });

  actualizar = (e) => {
    e.preventDefault();
    if (this.state.nombre === "" || this.state.nombre === this.props.usuario.nombre) {
      alert("Debe agregar un nuevo nombre");
      return;
    } else {
      if (window.confirm("¿ Seguro que deseas cambiar tu nombre ?")) {
        const user_new = this.props.usuario;
        user_new.nombre = this.state.nombre;
        user_new.imagen = this.props.imagen;
        this.toggle();
        this.props.event(user_new);
      }
    }

  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Cambiar Nombre</ModalHeader>
          <ModalBody>


            <Row>
              <Col md="12">
                <p className="h6"> <b>Nombre Actual:</b> {this.props.usuario.nombre} </p>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <InputGroup className="mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-id-card-o"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="Nuevo nombre" autoComplete="nombre"
                    onChange={e => this.setState({ nombre: e.target.value })}
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

export default ModalNombre;