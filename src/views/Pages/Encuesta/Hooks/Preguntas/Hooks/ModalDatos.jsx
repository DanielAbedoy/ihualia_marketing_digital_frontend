import React from 'react';
import { Modal, ModalBody, Row, Col, Input } from 'reactstrap'
import { useToasts } from 'react-toast-notifications';

const ModalDatos = ({open, setOpen, info ,setInpoPersonal, responder}) => {
  
  const { addToast } = useToasts();

  const validar = () => {
    if (info.correo === "" || info.nombre === "") {
      setOpen(!open);
      addToast("Debes llenar correctamente la información", { appearance: "info", autoDismiss: true });
      return false;
    }
    return true;
  }

  const send = () => {
    if (!validar()) return;
    responder();
  }

  return (
    <Modal size="lg" isOpen={open} toggle={()=> setOpen(!open)}>
      <ModalBody>

        <Row>
          <Col md="12">
            <p className="h3 m-0"><b>Datos</b></p>
            <p className="text-muted m-0"><b>Para finalizar solo coloca tus datos</b></p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md="8" xs="11" className="mx-auto my-2">
            <p className="h5"><b>Nombre</b></p>
            <Input style={{width:"100%"}} type="text" onChange={e => setInpoPersonal({...info, ["nombre"]: e.target.value})} />
          </Col>
          <Col md="8" xs="11" className="mx-auto my-2">
            <p className="h5"><b>Correo</b></p>
            <Input style={{width:"100%"}} type="text" onChange={e => setInpoPersonal({...info, ["correo"]: e.target.value})} />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md="5" xs="9" className="my-2 mx-auto">
            <div onClick={send} className="btn-h bg-success text-white"> Mandar </div>
          </Col>
          <Col md="5" xs="9" className="my-2 mx-auto">
            <div onClick={() => setOpen(!open)} className="btn-h bg-danger text-white"> Cancelar </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default ModalDatos;