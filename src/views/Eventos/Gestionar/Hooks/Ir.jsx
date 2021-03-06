import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Input } from 'reactstrap';

const Asistentes = (props) => {


  return (
    <Row>
      <Col md="12" className="bg-events-light rounded d-flex flex-column justify-content-center align-items-center text-white text-center py-3 shadow-h-hov"
        style={{ cursor: "pointer" }} onClick={() => props.ir()}
      >
        <p className="display-4"><b><i className="fa fa-paper-plane"></i></b></p>
        <p className="h5"><b>Ir al evento</b></p>
      </Col>
    </Row>
  );
}

export default Asistentes;