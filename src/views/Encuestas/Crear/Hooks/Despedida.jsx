import React, { useState } from 'react';
import { Col, Row, Input, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

import ModelEncuestas from '../../../../models/Encuestas'


const Despedida = ({encuesta, openPreguntas,ir, url}) => {

  const [datos, setDatos] = useState({ despedida: "" });
  const { addToast } = useToasts();

  const validar = () => {
    if (datos.despedida === "") {
      addToast("Debes agregar toda la información", { appearance: "info", autoDismiss: true });
      return false;
    }
    
    const j_son = JSON.parse(encuesta.preguntas_json);

    if (j_son.ponderacion !== encuesta.ponderacion) {
      addToast("Debes generar de nuevo las preguntas ya que cambiaste el estatus de la ponderación", { appearance: "info", autoDismiss: true });
      openPreguntas();
      return false;
    }

    return true;
  }

  const publicar = async () => {
    if (!validar()) return;
  
    const _url = url();
    const resp = await new ModelEncuestas().modificar_encuesta(encuesta.id, {...datos, estatus:"publicado", url:_url });
    if (resp.statusText === "OK") {
      confirmAlert({
        title: "Agregado Correctamente",
        message: `Ahora puedes compartir la encuesta con todos solo comparte el link: "${_url}" tambien puedes gestionar sus estadisticas`,
        buttons:[{label:"Continuar", onClick:()=> ir()}]
      })

    } else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });


  }

  return (
    <Row>
      <Col md="9" xs="12" className="mx-auto">

      <span className="h5">Despedida</span>
        <Input id="txt_despedida" className="mt-2" type="textarea" height="220px"
          value={datos["presentacion"]}
          onChange={e => setDatos({ ...datos, despedida: e.target.value })}
        /><br />
        
      </Col>
      <Col md="9" xs="12" className=" mx-auto mt-3">
          <Row>
            <Col md="4" xs="6" className="ml-auto">
                <Button onClick={publicar} block style={{backgroundColor:"#FF7F50"}} className="text-white" ><b>Publicar</b></Button>
            </Col>
          </Row>
        </Col>

    </Row>
  );
}

export default Despedida;

