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

        <Row className="mb-3">
          <Col md="4" xs="12" className="ml-auto">
            <span className="h5"><b>Organizar por:</b></span>
            <Input type="select" color="primary">
              <option>Grupo</option>
              <option>Abecedario</option>
              <option>ID</option>
            </Input>
          </Col>
        </Row>

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
                        <th scope="row">{(indx+1)}</th>
                        <td >{contacto.contacto.nombre}</td>
                        <td>{contacto.contacto.correo}</td>
                        <td>{contacto.grupo.nombre}</td>
                      </tr>
                    );
                  })}

                  <tr >
                    <th scope="row">1</th>
                    <td ><b>Nommbre Apellido</b></td>
                    <td>Correo</td>
                    <td><b>Grupo del contacto</b></td>
                  </tr>

                </tbody>
              </table>
            </div>

          </Col>
        </Row>


      </ModalBody>
    </Modal>
  );
}

export default ModalEnvios;