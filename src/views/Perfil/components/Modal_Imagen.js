import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';

import user_images from '../../../components/UserImages.js';

class ModalImagen extends Component {

  state = {
    modal: false,
    imagen: '',

  }

  toggle = () => this.setState({ modal: !this.state.modal });

  nueva_imagen = (e) => {
    e.preventDefault();
    if (this.state.imagen === "") {
      alert("Debe seleccionar una imagen");
      return;
    } else {
      if (window.confirm("¿ Seguro que deseas cambiar la imagen ?")) {
        const user_new = this.props.usuario;
        user_new.imagen = this.state.imagen;
        this.toggle();
        this.props.event(user_new);
      }
    }
    
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Cambiar Imagen</ModalHeader>
          <ModalBody>
            <p> <b>Selecciona la nueva Imagen</b></p>

            <Row>
              {user_images.map((imagen, indx) => {
                if (imagen.nombre === this.props.imagen_actual) return (<span key={indx}></span>);
                return (
                  <Col key={indx} lg="3" md="3" sm="4" xs="4" >
                    <img id={imagen.nombre} alt={imagen.nombre} title={imagen.nombre} src={imagen.direccion}
                      className="m-1"
                      style={{ 'cursor': "pointer", 'borderStyle': "solid", 'borderColor': "black" }}
                      onClick={(e) => {
                        if (this.state.imagen !== "") {
                          const elem = document.getElementById(this.state.imagen);
                          elem.style.borderColor = "black";
                        }
                        const elem = document.getElementById(e.target.id);
                        elem.style.borderColor = "green";
                        this.setState({ imagen: imagen.nombre })
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.nueva_imagen}>Confirmar</Button>{' '}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalImagen;