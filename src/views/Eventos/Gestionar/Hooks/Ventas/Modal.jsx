import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody,ModalHeader, Input, Collapse } from 'reactstrap';
import Tabla from './Tabla';

const ModalComp = ({ open, setOpen, boletos }) => {

  const [openTable, setOpenTable] = useState(true);

  return (
    <Modal size="lg" isOpen={open} toggle={() => setOpen(!open)}>
      <ModalHeader toggle={() => setOpen(!open)}>
        <p className="m-0 h5"><b>Información General</b></p>
        <p className="m-0 text-muted h6"><b>Ve la información general del evento</b></p>
      </ModalHeader>
      <ModalBody>
        <Row>

        
          
        </Row>
      </ModalBody>
    </Modal>
  );
}


export default ModalComp;