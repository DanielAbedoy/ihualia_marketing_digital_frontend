import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import urls from '../../../../../../../models/urls';

const SingleText = ({ posicion, content, encuesta, setDatos, datos, calificacion }) => {

  const onChangetInput = (e) => setDatos({
    ...datos,
    [posicion]: { respuesta: e.target.value, estatus: getCalificacion(e.target.value) }
  });

  const getCalificacion = (valor) => {
    if (!calificacion) return "";
    if (valor.toLowerCase() === content.respuesta.toLowerCase()) return "correcta";
    return "incorrecta";
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
        <Input
          value={datos[posicion] ? datos[posicion].respuesta : ""}
          onChange={onChangetInput}
          type="text" style={{ width: "100%" }} placeholder="Escribe tu respuesta" />
      </Col>
    </Row>
  );
}

export default SingleText;