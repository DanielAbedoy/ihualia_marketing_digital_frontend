import React from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Imagenes from '../../../../components/UserImages';

const ModalPerfil = ({ open, setOpen, datos }) => {

  return (
    <Modal size="lg" isOpen={open} toggle={() => setOpen(!open)}>

      <ModalHeader style={{backgroundColor:"#333333"}} toggle={() => setOpen(!open)}>
        <p className="text-white h5 m-0"><b><i className="fa fa-user"></i> Perfil</b></p>
      </ModalHeader>

      <ModalBody>
        <Row className="py-4">
          <Col md="10" xs="12" className="mx-auto d-flex flex-column">

            <img src={Imagenes.find(i => i.nombre == datos.imagen).direccion} alt="image perfil" width="10%" className="mx-auto" />
            <br />

            <p className="text-center h5"><b>{datos.nombre}</b></p>

            <p className="text-center m-0">{datos.usuario}</p>
            <p className="text-center m-0">{datos.correo}</p>
            <p className="text-center">{datos.tipo}</p>

            <p className="text-center">
              {datos.descripcion}  
            </p>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );

}

export default ModalPerfil;