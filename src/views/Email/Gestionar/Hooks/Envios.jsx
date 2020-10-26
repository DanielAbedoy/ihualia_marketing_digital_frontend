import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Input } from 'reactstrap';
import ModelEmail from '../../../../models/EmailMarketing';

const ModalEnvios = props => {

  const toggle = () => props.event_toggle(!props.open);

  return (
    <Modal size="lg" isOpen={props.open} toggle={toggle} >
      <ModalHeader toggle={toggle}>
        <p className="h3 m-0"><b>Enviado a...</b></p>
      </ModalHeader>
      <ModalBody>

        {props.enviados.length === 0 ?
          <Row>
            <Col md="8" xs="12" className="mx-auto text-center mt-3"><p className="h5"><b>No hay datos para mostrar</b></p></Col>
          </Row>
          :
          <Row>
            <Col md="12" xs="12" className="mx-auto">

              <div style={{ maxHeight: "65vh", minHeight: "65vh" }} className="table-responsive">
                <table className="table table-hover">
                  <thead className="bg-primary">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Correo</th>
                      <th scope="col">Grupo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.enviados.map((contacto, indx) => {
                      return (
                        <tr key={indx}>
                          <th scope="row">{(indx + 1)}</th>
                          <td >{contacto.contacto.nombre}</td>
                          <td>{contacto.contacto.correo}</td>
                          <td>{contacto.grupo.nombre}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </Col>
          </Row>
        }
      </ModalBody>
    </Modal>
  );
}

export default ModalEnvios;