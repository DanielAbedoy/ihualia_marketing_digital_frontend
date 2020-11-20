import React from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';

import urls from '../../../../models/urls';

const Contenido = ({ open, setOpen, preguntas, datos }) => {

  return (
    <Modal size="lg" isOpen={open} toggle={() => setOpen(!open)}>
      <ModalHeader toggle={() => setOpen(!open)}>
        <Row>
          <Col md="12">
            <p className="h3 m-0"><b>Contenido</b></p>
            <p className="text-muted h6 m-0"><b>Observa las preguntas que redactaste</b></p>
          </Col>
        </Row>
      </ModalHeader>
      <ModalBody>
        <Row className="mt-3 px-lg-5 px-xs-2">
          <Col md="12">

            <Row className="p-0 shadow rounded border-top border-primary mb-4">
              <Col md="5" xs="12" className="p-0">
                <img width="100%" src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${datos.id}&imagen=${datos.imagen}`} alt="" />
              </Col>
              <Col md="7" xs="12" className="px-4 d-flex flex-column justify-content-center">
                <p className="h4"><b>{datos.nombre}</b></p>
                <p className=""><b>{datos.presentacion}</b></p>
                <p className="text-muted"><i>{datos.instrucciones}</i></p>
              </Col>
            </Row>
            <Row>
              <Col md="10" xs="12" className="mx-auto">
              {preguntas.data.map((p, i) => {
              return (
                <React.Fragment key={i}>
                  {p.subTipo === "texto" ?
                    <p  ><b>{p.n}.- {p.pregunta}</b></p>
                    :
                    <>
                      <p ><b>Pregunta {p.n}.-</b></p>
                      <img width="60%" src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${datos.id}&imagen=${p.pregunta}`} alt="" />
                    </>
                  }
                  {p.tipo === "singletext" || p.tipo === "comentario" ?
                    <p className="m-0 text-muted"> - {p.respuesta}</p>
                    :
                    <>
                      {p.opciones.map((o, j) => {
                        if (p.tipo === "imageselector") {
                          return (
                            <React.Fragment key={j}>
                              <img width="40%" src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${datos.id}&imagen=${o.opcion}`} alt="" />
                              <p className="m-0 text-muted">{o.check ? "CORRECTA" : ""}</p>
                            </React.Fragment>
                          )
                        }
                        return (
                          <React.Fragment key={j}>
                            <p className="m-0 text-muted">- {o.opcion} - {o.check ? "CORRECTA" : "INCORRECTA"}</p>
                          </React.Fragment>
                        )
                      })}
                    </>
                  }
                  <p className="border"></p>
                </React.Fragment>
              );
            })}

              </Col>
            </Row>
            
            <Row className="p-0 shadow rounded border-bottom border-primary mt-4">
              <Col md="12" className="p-4 d-flex flex-column justify-content-center">
                <p className="h6"><b>{datos.despedida}</b></p>
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default Contenido;
