import React, { useState, useEffect } from 'react';
import { Col, Input, Row, FormGroup, CustomInput, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import store from 'store';

import ModelEmail from '../../../../models/EmailMarketing';

const DatosIniciales = props => {

  const [publicacion, setPublicacion] = useState('');
  const [datos, setDatos] = useState({});
  const { addToast } = useToasts();
  const [creado, setCreado] = useState(false);

  const horas = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00",
    "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
    "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
    "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];

  useEffect(() => {
    if (props.setDatos !== '') {
      setCreado(true);
      setDatos({ ...datos,asunto: props.setDatos.asunto, programacion: props.setDatos.tipo_publicacion });
      if (props.setDatos.tipo_publicacion !== "enviado") {
        setPublicacion('programar');
        document.getElementById("exampleCustomSwitch2").checked = true;
      }
      else {
        setPublicacion('ahora');
        document.getElementById("exampleCustomSwitch").checked = true;
      }
    }
  },[props.setDatos])

  const guardar = async (e) => {
    e.preventDefault();
    //Validar que todo este completo
    if (!validar()) return;
    //Crear el boletincomo borrador mandar datos al padre
    const id_cuenta = require('store').get("cuenta_en_uso").id;
    const tipo = datos.programacion === 'programar' ? "programado" : "enviado";
    const response = await new ModelEmail().add_boletin(datos.asunto, tipo, "null", "borrador", id_cuenta);
    if (response !== "Error") {
      setCreado(true);
      props.setFecha({ date: datos.fecha, hour: datos.hora });
      props.event_setDatos(response);
      addToast("Todo salio correcatamente", { appearance: "success", autoDismiss: true });
    }else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
  }

  const validar = () => {
    if (!datos.asunto || !datos.programacion) {
      addToast("Debe agregar todos los datos", { appearance: "error", autoDismiss: true });
      return false;
    }

    if (datos.programacion === "programar") {
      if (!datos.fecha || !datos.hora) {
        addToast("Debe agregar todos los datos", { appearance: "error", autoDismiss: true });
        return false;
      } 
    }
    return true;
  }

  const modificar = async () => {
    if (!validar()) return;

    let datosI = props.getInfo;
    const tipo = datos.programacion === 'programar' ? "programado" : "enviado";
    const d = { asunto: datos.asunto, tipo_publicacion: tipo, contenido: datosI.contenido, estatus: datosI.estatus, id_cuenta: datosI.id_cuenta };
    const response = await new ModelEmail().update_boletin(datosI.id, d);
    if (response !== "Error") {
      props.setFecha({ date: datos.fecha, hour: datos.hora });
      props.event_setDatos(response, { date: datos.fecha, hour: datos.hora });
      addToast("Todo salio correcatamente", { appearance: "success", autoDismiss: true });
    }else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
  }


  return (
    <Col md="12">
      <Row>
        <Col md="7" xs="12" className="mx-auto">
          <span className="h5">Asunto del Boletin</span>
          <Input id="txt_asunto" className="mt-2" type="text" placeholder="motivo del boletin"
            //onChange={e => props.event_setDatos({ asunto: e.target.value })}
            value={datos["asunto"] ? datos["asunto"] : ""}
            onChange={e => setDatos({ ...datos, asunto: e.target.value })}
          /><br />
        </Col>

        <Col md="7" xs="12" className="mx-auto mb-3">
          <span className="h5">¿ Cuando quieres que se publique ?</span>
        </Col>

        <Col md="7" xs="12" className="mx-auto">
          <Row>
            <Col className="mx-auto" md="6" xs="6">
              <FormGroup>
                <div className="mx-auto">
                  <CustomInput
                    className="h6"
                    onChange={e => {
                      setPublicacion('ahora');
                      //props.event_setDatos({ programacion: "ahora" })
                      setDatos({ ...datos, programacion: "ahora" })
                    }}
                    type="radio" id="exampleCustomSwitch" name="customSwitch" label="Publicar ahora mismo"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col className="mx-auto" md="6" xs="6">
              <FormGroup>
                <div>
                  <CustomInput
                    className="h6"
                    onChange={e => {
                      setPublicacion('programar');
                      //props.event_setDatos({ programacion: "programar" })
                      setDatos({ ...datos, programacion: "programar" })
                    }}
                    type="radio" id="exampleCustomSwitch2" name="customSwitch" label="Publicación programada"
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Col>


        {publicacion === 'programar' ?
          <Col md="7" xs="12" className="mx-auto">
            <span className="h5">Selecciona la fecha y hora de publicación</span>
            <Row>
              <Col md="7" xs="12" >
                <Input id="txt-fecha-programacion" className="mt-2" type="date"
                  value={datos["fecha"] ? datos["fecha"] : ""}
                  //onChange={e => props.event_setDatos({ fecha: e.target.value })}
                  onChange={e => setDatos({ ...datos, fecha: e.target.value })}
                />
              </Col>

              <Col md="5" xs="12" >
                <Input id="txt-hora-programacion" className="mt-2 text-center" type="select"
                  //onChange={e => props.event_setDatos({ hora: e.target.value })}
                  value={datos["hora"] ? datos["hora"] : ""}
                  onChange={e => setDatos({ ...datos, hora: e.target.value })}
                >
                  {horas.map((hora, indx) => {
                    return (
                      <option key={indx}>{hora}</option>
                    );
                  })}
                </Input>
              </Col></Row>
            <br />
          </Col>

          :
          <></>
        }
        <Col md="7" xs="12" className=" mx-auto mt-3">
          <Row>
            <Col md="4" xs="6" className="ml-auto">
              {creado ?
                <Button block color="info" onClick={modificar} >Modificar</Button>
                :
                <Button block color="success" onClick={guardar} >Continuar</Button>
              }
            </Col>
          </Row>
        </Col>

      </Row>
    </Col>
  );
}

export default DatosIniciales;