import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader, Input, Collapse } from 'reactstrap';
import Tabla from './Tabla';

const ModalComp = ({ open, setOpen, boletos, asistentes }) => {

  const [openTable, setOpenTable] = useState(true);

  return (
    <Modal size="xl" isOpen={open} toggle={() => setOpen(!open)}>
      <ModalHeader toggle={() => setOpen(!open)}>
        <p className="m-0 h5"><b>Asistentes</b></p>
        <p className="m-0 text-muted h6"><b>Ve la información de los asistentes del evento</b></p>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="11" xs="12" className="mx-auto py-3 d-flex flex-column justify-content-center" >
            <Collapse isOpen={openTable} >
              <Tabla asistentes={asistentes} boletos={boletos} />
            </Collapse>
          </Col>          
        </Row>
      </ModalBody>
    </Modal>
  );
}


export default ModalComp;