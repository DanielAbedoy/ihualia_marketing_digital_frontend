import React, { useState, useContext } from 'react';
import { Col, Row, Input, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import ModelEncuestas from '../../../../models/Encuestas'
import { useEffect } from 'react';
import { SessionContext } from '../../../../sessionContext';


const DatosIniciales = ({setEncuesta, close, encuesta, datosBorrador}) => {

  const context = useContext(SessionContext);
  const [datos, setDatos] = useState({ nombre: "", presentacion: "", instrucciones: "", estatus: "borrador" });
  const [creado, setCreado] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    if (datosBorrador.nombre) {
      setDatos({ ...datos, ...datosBorrador });
      setCreado(true);
    }
  },[datosBorrador])

  const validar = () => {
    if (datos.nombre === "" || datos.presentacion === "" || datos.instrucciones === "") {
      addToast("Debes agregar toda la información", { appearance: "info", autoDismiss: true });
      return false;
    }
    return true;
  }
  
  const crear = async () => {
    if (!validar()) return;
    const cuenta = context.cuenta.id;
    const resp = await new ModelEncuestas().add_encuesta({ ...datos, cuenta: cuenta });
    if (resp.statusText === "Created") {
      addToast("Creado correctamente", { appearance: "success", autoDismiss: true });
      setCreado(true);
      setEncuesta(resp.data);
      close();
    } else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
  }

  const modificar = async () => {
    if (!validar()) return;
    const resp = await new ModelEncuestas().modificar_encuesta(encuesta.id,datos);
    if (resp.statusText === "OK") {
      addToast("Modificado correctamente", { appearance: "success", autoDismiss: true });
      setEncuesta(resp.data);
      close();
    } else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
  }

  return (
    <Row>
      <Col md="9" xs="12" className="mx-auto">
        <span className="h5">Nombre</span>
        <Input className="mt-2" type="text"
          value={datos["nombre"]}
          onChange={e => {if(e.target.value.length <= 35 ) setDatos({ ...datos, nombre: e.target.value })}}
        /><br />

        
      <span className="h5">Presentacion</span>
        <Input className="mt-2" type="textarea" style={{height:"120px"}}
          value={datos["presentacion"]}
          onChange={e => setDatos({ ...datos, presentacion: e.target.value })}
        /><br />
        

        <span className="h5">Instrucciones para responder</span>
        <Input className="mt-2" type="textarea" style={{height:"120px"}}
          value={datos["instrucciones"] }
          onChange={e => setDatos({ ...datos, instrucciones: e.target.value })}
        /><br />

      </Col>
      <Col md="9" xs="12" className=" mx-auto mt-3">
          <Row>
            <Col md="4" xs="6" className="ml-auto">
              {creado ?
                <Button block style={{backgroundColor:"#F1BF00"}} onClick={modificar} className="text-white" ><b>Modificar</b></Button>
                :
                <Button block style={{backgroundColor:"#FF7F50"}} onClick={crear} className="text-white" ><b>Continuar</b></Button>
              }
            </Col>
          </Row>
        </Col>

    </Row>
  );
}

export default DatosIniciales;

