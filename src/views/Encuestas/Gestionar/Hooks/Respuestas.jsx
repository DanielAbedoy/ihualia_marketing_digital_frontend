import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader, Collapse } from 'reactstrap';

import urls from '../../../../models/urls';
import Tabla from './Tabla';

const Contenido = ({ open, setOpen, preguntas, encuestados, datos }) => {


  const RowQuestion = ({ pregunta, encuestados }) => {

    const [open, setOpen] = useState(false);

    return (
      <>
        {pregunta.subTipo === "texto" ?
          <p  ><b>{pregunta.n}.- {pregunta.pregunta}</b></p>
          :
          <>
            <p ><b>Pregunta {pregunta.n}.-</b></p>
            <img width="60%" src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${datos.id}&imagen=${pregunta.pregunta}`} alt="" />
          </>
        }
        <p className="text-right"><u onClick={()=>setOpen(!open)} style={{cursor:"pointer"}}>Ver tabla</u></p>
        <Row>
          <Col md="12">
            <Collapse isOpen={open}>
              <Row>
                <Col md="12">
                  <Tabla encuestados={encuestados} n={pregunta.n} ponderacion={true} anonima={false} 
                    tipo={pregunta.tipo === "imageselector" ? "imagen" : "texto"}
                    encuesta={datos.id}
                  />
                </Col>
              </Row>
            </Collapse>
          </Col>
        </Row>

        <p className="border"></p>
      </>
    );

  }


  return (
    <Modal size="lg" isOpen={open} toggle={() => setOpen(!open)}>
      <ModalHeader toggle={() => setOpen(!open)}>
        <Row>
          <Col md="12">
            <p className="h3 m-0"><b>Respuesta</b></p>
            <p className="text-muted m-0"><b>Observa las respuestas de los encuestados</b></p>
          </Col>
        </Row>
      </ModalHeader>
      <ModalBody>
        <Row className="mt-3 px-lg-5 px-xs-2">
          <Col md="10" xs="12" className="mx-auto">
            {preguntas.data.map((p, i) => <RowQuestion pregunta={p} key={i} encuestados={encuestados} />)}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default Contenido;