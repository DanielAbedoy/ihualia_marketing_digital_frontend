import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Input, Collapse } from 'reactstrap';
import ModalComp from './Modal';



const Boletos = ({ boletos }) => {

  const [open, setOpen] = useState(false);


  return (
    <Row>
      <Col md="12" className="bg-h-primary rounded d-flex flex-column justify-content-center align-items-center text-white text-center py-3 shadow-h-hov"
        style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}
      >
        <p className="display-4"><b><i className="fa fa-male"></i></b></p>
        <p className="h5"><b>Info. Asistentes</b></p>
      </Col>

      <ModalComp open={open} setOpen={setOpen} boletos={boletos} />
    </Row>
  );
}

export default Boletos;