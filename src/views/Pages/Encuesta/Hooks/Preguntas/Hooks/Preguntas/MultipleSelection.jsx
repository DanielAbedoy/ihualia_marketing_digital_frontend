import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'reactstrap';
import urls from '../../../../../../../models/urls';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const MultipleSelection = ({ posicion, content, encuesta, setDatos, datos, calificacion }) => {


  const setResponse = (e, op) => {
    let sup = { ...datos, [posicion]: { respuesta: { ...datos[posicion].respuesta, [op]: e.target.checked }, estatus: "" } };
    setDatos(getCalificacion(sup));
  }

  useEffect(() => {
    let r = {};
    content.opciones.forEach(o => {
      r = { ...r , [o.opcion]: datos[posicion].respuesta[o.opcion] || false }
    })
    getCalificacion({ ...datos, [posicion]: { respuesta: r, estatus: 0 } });
  },[])

  const getCalificacion = (sup) => {
    if (!calificacion) return sup;
    let f = true;
    content.opciones.forEach(o => {
      if (o.check) {if (!sup[posicion].respuesta[o.opcion]) f = false;}
      else {if (sup[posicion].respuesta[o.opcion]) f = false}
    })
    if (f) return { ...datos, [posicion]: { respuesta: { ...sup[posicion].respuesta }, estatus: "correcta" } }
    return {...datos,[posicion]: { respuesta: { ...sup[posicion].respuesta}, estatus: "incorrecta" }};
  }

  return (
    <Row className="my-3">
      <Col md="12" className="rounded shadow bg-white p-3">

        {content.subTipo === "texto" ?
          <p className="h5"><b>{posicion}.- {content.pregunta}</b></p>
          :
          <Row>
            <Col md="8" xs="12" className="mx-auto p-0">
              <p className="h5"><b>Pregunta {posicion}.</b></p>
              <img width="100%" src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${encuesta}&imagen=${content.pregunta}`} alt="img question" />
            </Col>
          </Row>
        }
        <br />

        {content.opciones.map((op, i) => {
          return (
            <Row key={i} className="m-0 px-3">
              <FormControlLabel
                control={<Checkbox onChange={e => setResponse(e, op.opcion)} color="primary" checked={datos[posicion].respuesta[op.opcion] || false} />}
                label={op.opcion}
              />
            </Row>
          );
        })}
      </Col>
    </Row>
  );
}

export default MultipleSelection;