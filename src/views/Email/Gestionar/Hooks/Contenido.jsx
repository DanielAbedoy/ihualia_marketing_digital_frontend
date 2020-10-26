import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row,Col } from 'reactstrap';
import Parser from 'html-react-parser';

const ModalContenido = props => {

  const toggle = () => props.event_toggle(!props.open);

  return (
    <Modal size="lg" isOpen={props.open} toggle={toggle} >
      <ModalHeader toggle={toggle}>
        <p className="h3 m-0"><b>Contenido del correo que enviaste</b></p>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="12" md="12" className="mx-auto my-4 p-3 ">
            <div>
              {props.contenido ? Parser(props.contenido) : ""}
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default ModalContenido;