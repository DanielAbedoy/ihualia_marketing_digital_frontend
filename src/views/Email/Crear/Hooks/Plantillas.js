import React, { useState } from 'react';
import { Col, Input, Row, FormGroup, CustomInput, Button, Card, CardHeader, CardFooter } from 'reactstrap';

import plantillas_data from '../plantillas_data';

const Plantillas = props => {


  const onSeleccionarPlantila = (e, plantilla) => {
    e.preventDefault();

    props.event_setPlantilla(plantilla);
  }

  return (
    <>
      {props.plantilla === '' ?
        <Col md="12">
          <Row>
            <Col md="7" xs="12" className="mx-auto mb-3">
              <span className="h5">Selecciona la plantilla de tu agrado</span>
            </Col>

            <Col md="8" xs="12" className="mx-auto">
              <Row >

                {plantillas_data.map((plantilla, indx) => {
                  return (
                    <Col key={indx} md="6" xs="12">
                      <Card style={{ cursor: "pointer" }} onClick={e => onSeleccionarPlantila(e, plantilla)}>
                        <CardHeader className="p-0 bg-white overflow-auto" style={{maxHeight:"220px", minHeight:"220px" }}>
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