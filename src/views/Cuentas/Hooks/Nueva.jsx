import React, {useState} from 'react';
import { Row, Col, Input } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import Asignacion from './AsigUsuarios';
import ModelMarketing from '../../../models/Marketing';

const Nueva = ({ close, cliente }) => {


  const [datos, setDatos] = useState({ nombre: "" });
  const [usurarios, setUsuarios] = useState([]);
  const { addToast } = useToasts();

  const validar = () => {
    if (datos.nombre === "") {
      addToast("Debes agregar un nombre", {appearance:"info",autoDismiss:true});
      return false;
    }

    if (usurarios.length !== 0) {
      for (let i = 0; i < usurarios.length; i++) {
        if (usurarios[i].cargo === "") {
          addToast("Debes agregar elcargo a todos los usuarios asignados",{appearance:"info",autoDismiss:true});
          return false;
        }
      }
    }
    return true;
  }

  const crear = async () => {
    if (!validar()) return;
    const resp = await new ModelMarketing().add_new_cuenta({...datos, cliente: cliente}, usurarios);
    if (resp.data.message) {
      addToast("Creada correctamente", { appearance: "success", autoDismiss: true });
      close();
    } else {
      addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
    }
  }

  return (
    <Row>
      <Col md="12">
        <Row className="mb-3">
          <div onClick={crear} className="ml-auto btn-h bg-h-success px-3 py-1 text-white">
            <i className="fa fa-floppy-o"></i> <b>Crear</b>
          </div>
          <div onClick={() => close()} className="ml-2 btn-h bg-h-primary px-3 py-1 text-white">
            <i className="fa fa-ban"></i> <b>Cancelar</b>
          </div>
        </Row>

        <Row>
          <Col md="12" className="mb-3">
            <p className="h6"><b>Nombre de la cuenta</b></p>
            <Input type="text" value={datos.nombre} onChange={e => setDatos({ ...datos, nombre: e.target.value })} /> 
          </Col>

          <Col md="12" className="mt-3">
            <p className="h6"><b>Asigna los usuarios y su cargo (Opcional)</b></p>
            
            <Asignacion setUsuarios={(us) => setUsuarios(us)} />
          </Col>

        </Row>

      </Col>

    </Row>
  );
}

export default Nueva;