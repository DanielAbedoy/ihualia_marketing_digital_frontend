import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, InputGroup, InputGroupAddon,  InputGroupText } from 'reactstrap';

class ModalPassword extends Component {

  state = {
    modal: false,
    passw1: '',
    passw2: '',

  }

  toggle = () => this.setState({ modal: !this.state.modal });

  actualizar = (e) => {
    
    //Validadcion de las contraseñas
    if (this.state.passw1 === '' && this.state.passw2 === '') {
      return alert("Necesita ingresar alguna contraseña."); 
      
    }else if(this.state.passw2 === '' && this.state.passw1 !== ''){
      return alert("Necesita repetir la contraseña.");
    } else if (this.state.passw1 === '') {
      return alert("Necesita ingresar alguna contraseña.");
      
      //Verificando que sean las mismas contraseñas
    } else if (this.state.passw1 !== this.state.passw2) {
      return alert("Las contraseñas no son las mismas.");
    }

      if (window.confirm("¿ Seguro que deseas cambiar tu contraseña ?")) {
        const user_new = this.props.usuario;
        user_new.password = this.state.passw1;
        user_new.imagen = this.props.imagen;
        this.toggle();
        this.props.event(user_new);
      }
    

  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Cambiar Contraseña</ModalHeader>
          <ModalBody>


            <Row>
              <Col md="12">
              <InputGroup className="mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" placeholder="Nuevo contraseña" autoComplete="password"
                    onChange={e => this.setState({ passw1: e.target.value })}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <InputGroup className="mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" placeholder="Repite la contraseña" autoComplete="password"
                    onChange={e => this.setState({ passw2: e.target.value })}
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

export default ModalPassword;