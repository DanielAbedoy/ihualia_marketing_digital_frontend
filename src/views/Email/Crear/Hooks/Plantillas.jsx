import React, { useState } from 'react';
import { Col, Row,  Card, CardHeader } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import ModelEmail from '../../../../models/EmailMarketing';

import plantillas_data from '../plantillas_data';

const Plantillas = props => {

  const { addToast } = useToasts();

  const cambiarPlantilla = async (plantilla) => {
    const resp = await new ModelEmail().modificar_boletin(props.boletin.id, { contenido: "", links:"" });
    if (resp.statusText === "OK") {
      props.setBoletin(resp.data);
      props.event_setPlantilla(plantilla)
    } else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
  }
  
  return (
    <>
      {props.plantilla === '' ?
        <Col md="12">
          <Row>
            {props.boletin.contenido !== "" ?
              <Col md="7" xs="12" className="mx-auto mb-3">
                <p className="text-right m-0"><u className="cursor-p" onClick={()=>props.event_setPlantilla(props.boletin.contenido)} > Cancelar</u></p>
              </Col> : <></>
            }
            <Col md="7" xs="12" className="mx-auto mb-3">
              <span className="h5">Selecciona la plantilla de tu agrado</span>
            </Col>

            <Col md="8" xs="12" className="mx-auto">
              <Row >

                {plantillas_data.map((plantilla, indx) => {
                  return (
                    <Col key={indx} md="6" xs="12">
                      <Card style={{ cursor: "pointer" }} onClick={()=>cambiarPlantilla(plantilla)}>
                        <CardHeader className="p-0 bg-white overflow-auto" style={{ maxHeight: "220px", minHeight: "220px" }}>
                          <img width="100%" src={plantilla.imagen} alt={plantilla.nombre} />
                        </CardHeader>

                        <p className="h6 text-center">
                          {plantilla.nombre}
                        </p>

                      </Card>
                    </Col>
                  );
                })}

              </Row>
            </Col>

          </Row>
        </Col>
        :
        <></>
      }
    </>

  );
}

export default Plantillas;