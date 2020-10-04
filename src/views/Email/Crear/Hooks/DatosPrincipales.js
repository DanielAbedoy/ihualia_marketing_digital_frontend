import React, { useState } from 'react';
import { Col, Input, Row, FormGroup, CustomInput, Button } from 'reactstrap';

const DatosIniciales = props => {

  const [publicacion, setPublicacion] = useState('');

  const horas = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00",
    "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
    "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
    "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];


  return (
    <Col md="12">
      <Row>
        <Col md="7" xs="12" className="mx-auto">
          <span className="h5">Asunto del Boletin</span>
          <Input id="txt_asunto" className="mt-2" type="text" placeholder="motivo del boletin"
            onChange={e => props.event_setDatos({ asunto: e.target.value })}
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
                    onClick={e => {
                      setPublicacion('ahora');
                      props.event_setDatos({ programacion: "ahora" })
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
                    onClick={e => {
                      setPublicacion('programar');
                      props.event_setDatos({ programacion: "programar" })
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
                  onChange={e => props.event_setDatos({ fecha: e.target.value })}
                />
              </Col>

              <Col md="5" xs="12" >
                <Input id="txt-fecha-programacion" className="mt-2 text-center" type="select"
                  onChange={e => props.event_setDatos({ hora: e.target.value })}
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
      </Row>
    </Col>
  );
}

export default DatosIniciales;