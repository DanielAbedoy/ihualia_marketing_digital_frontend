import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, InputGroup, InputGroupAddon,  InputGroupText } from 'reactstrap';

class ModalUsuario extends Component {

  state = {
    modal: false,
    usuario: '',

  }

  toggle = () => this.setState({ modal: !this.state.modal });

  actualizar = (e) => {
    e.preventDefault();
    if (this.state.usuario === "" || this.state.usuario === this.props.usuario.usuario) {
      alert("Debe agregar un nuevo usuario");
      return;
    } else {
      if (window.confirm("¿ Seguro que deseas cambiar tu usuario ?")) {
        const user_new = this.props.usuario;
        user_new.usuario = this.state.usuario;
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
          <ModalHeader toggle={this.toggle}>Cambiar Usuario</ModalHeader>
          <ModalBody>


            <Row>
              <Col md="12">
                <p className="h6"> <b>Usuario Actual:</b> {this.props.usuario.usuario} </p>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <InputGroup className="mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" placeholder="Nuevo usuario" autoComplete="usuario"
                    onChange={e => this.setState({ usuario: e.target.value })}
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

export default ModalUsuario;