import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { Row, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

const CambiarPassword = ({open, setOpen}) => {
  
  const [datos, setDatos] = useState({ actual: "", nueva: "", confirmacion: "" });
  const { addToast } = useToasts();

  const validar = () => {
    if (datos.nueva !== datos.confirmacion) {
      addToast("Las contraseñas nuevas no coinciden", { appearance: "info", autoDismiss: true });
      return false;
    }
    return true;
  }

  const cambiar = () => {
    if (!validar()) return;
    console.log(datos);
  }

  return (
    <Modal size="md" isOpen={open} toggle={() => setOpen(!open)}>
      
      <ModalHeader toggle={() => setOpen(!open)} style={{ backgroundColor: "#333333" }} className="text-white">
        <p className="h5 m-0"><b>Cambiar contraseña</b></p>
      </ModalHeader>

      <ModalBody>

        <Row className="p-4 flex-colum">

          <p className="h6">Contraseña actual</p>
          <Input type="password" className="mb-4"/>
          

          <p className="h6">Contraseña nueva</p>
          <Input type="password" className="mb-2" />

          <p className="h6">Confirmar contraseña</p>
          <Input type="password"  />
        </Row>

        <Row className="mt-2 px-4">
          <div onClick={cambiar} className="btn-h bg-h-primary text-white ml-auto px-3 py-1">
            <b> <i className="fa fa-floppy-o"></i> Cambiar</b>
          </div>
          <div onClick={()=> setOpen(!open)} className="btn-h bg-h-danger text-white ml-2 px-3 py-1">
            <b> <i className="fa fa-ban"></i> Cancelar</b>
          </div>
        </Row>
        
      </ModalBody>
    </Modal>
  );

}

export default CambiarPassword;