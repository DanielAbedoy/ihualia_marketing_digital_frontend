import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row, Input, CustomInput } from 'reactstrap';

class ModalCompleteStatus extends Component{

  state = {
    toggle: false
  }

  toggle = () => this.setState({ toggle: !this.state.toggle });

  _onSalirButton = e => {
    e.preventDefault();

    window.location.reload(true);
  }

  

  render() {
    return (
      
      <Modal modalClassName="bg-dark text-dark" size="lg" isOpen={this.state.toggle} >
        <ModalBody>
          
          <Row>
            <Col md="7" xs="10" className="mx-auto border border-success p-3">
              <p className="text-center h4 m-0 p-0"> Todo ha salido con éxito </p>
              <p className="text-center m-0 p-0"> Algun parrafo adicional </p>
            </Col>
          </Row>

          {this.props.show_component}

          <Row>
            <Col md="6" xs="8" className="mx-auto p-2">
              <Button block color="success" onClick={this._onSalirButton}>Terminar</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      
    );
  }
}

export default ModalCompleteStatus;