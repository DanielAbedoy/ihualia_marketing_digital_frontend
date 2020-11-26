import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Collapse, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import Variables from '../../../../variables/global';
import ModelEvento from '../../../../models/Eventos';


const FechaHora = props => {

  const { addToast } = useToasts();
  const [creado, setCreado] = useState(false);
  const [open, setOpen] = useState(true);
  const [datos, setDatos] = useState(
    { fecha_hora_inicio: "", fecha_hora_fin: "", zona_horaria: "" }
  );

  useEffect(() => {
    
    if (props.evento.fecha_hora_fin === undefined || props.evento.fecha_hora_fin === null) return;

    const d = props.evento;
    let fI = d.fecha_hora_inicio.split("T");
    let fF = d.fecha_hora_fin.split("T");

    setDatos({ ...datos, fecha_hora_inicio: `${fI[0]}T${fI[1].split("-")[0]}`, fecha_hora_fin: `${fF[0]}T${fF[1].split("-")[0]}`, zona_horaria: d.zona_horaria });
    setCreado(true);

  }, [props.evento])
  
  const crear = async () => {
    if (!validar()) return;

    const resp = await new ModelEvento().modificar_evento(props.evento.id, datos)
    if (resp.statusText === "OK") {
      addToast("Guardado correctamente", { appearance: "success", autoDismiss: true })
      setCreado(true);
      setOpen(false);
      props.setEvento(resp.data)
    } else addToast("Algo salio mal", { appearance: "error", autoDismiss: true })

  }


  const validar = () => {

    if (datos.fecha_hora_inicio === "" || datos.fecha_hora_fin === "" || datos.zona_horaria === "") {
      addToast("Debes llenar toda la información", { appearance: "info", autoDismiss: true })
      return false;
    }
    let date = new Date();
    const ini = datos.fecha_hora_inicio.split("T");
    const fin = datos.fecha_hora_fin.split("T");
    if (date > ini[0] || date > fin[0] || ini[0] > fin[0]) {
      addToast("Las fechas no son correctas", { appearance: "info", autoDismiss: true })
      return false;
    }

    if (ini[0] === fin[0] && (ini[1] > fin[1] || ini[1] === fin[1])) {
      addToast("Las horas no son correctas", { appearance: "info", autoDismiss: true })
      return false;
    }



    return <tr>;</tr>

  }

  return (
    <Col md="9" xs="12" className="mx-auto">
      <p className="h3 mb-4"><b> <i className="fa fa-clock-o"></i> Fecha y Hora</b>
        {creado ?
          <i
            className={`fa fa-${!open ? "chevron-down" : "chevron-up"} float-right p-1`}
            style={{ cursor: "pointer" }}
            onClick={e => setOpen(!open)}
          ></i> : <></>
        }
      </p>
      <Collapse isOpen={open}>
        <Row>
          <Col md="9" xs="12" className="mx-auto">
            <span className="h5">Fecha y Hora de Inicio</span><br />
            <Input
              id="fecha_ini" value={datos.fecha_hora_inicio} value={datos.fecha_hora_inicio}
              onChange={e => setDatos({ ...datos, fecha_hora_inicio: e.target.value })}
              className="mt-2" type="datetime-local" /><br />


            <span className="h5">Fecha y Hora de Finalización</span><br />
            <Input
              id="fecha_fin" value={datos.fecha_hora_fin}
              onChange={e => setDatos({ ...datos, fecha_hora_fin: e.target.value })}
              className="mt-2" type="datetime-local" /><br />

            <Input
              id="cbox_zona"
              value={datos.zona_horaria}
              onChange={e => setDatos({ ...datos, zona_horaria: e.target.value })}
              className="mt-2" type="select" >
              <option  >Busca la zona horaria de la ubicacacion del evento</option>
              {new Variables().zonas_horarias().map((z, i) => {
                return (
                  <option key={i} > {z} </option>
                );
              })}
            </Input>
            <br />

          </Col>

          <Col md="12">
            <Row>
              <Col md="4" xs="7">
                <Button onClick={crear} color={creado ? "info" : "success"} block >{creado ? "Modificar" : "Continuar"}</Button>
              </Col>
            </Row>
          </Col>


        </Row>
      </Collapse>
      <Row><Col md="12" className="border border-light my-4"></Col></Row>
    </Col>
  );
}

export default FechaHora;