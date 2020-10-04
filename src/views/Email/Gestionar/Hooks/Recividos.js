import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Input } from 'reactstrap';

const ModalRecividos = props => {

  const toggle = () => props.event_toggle(!props.open);

  const acomodarFecha = (fecha_lg) => {
    const date = fecha_lg.split('T')[0].split("-");
    const time = fecha_lg.split('T')[1].split('.')[0];

    return `${date[2]}/${date[1]}/${date[0]}  ${time} `;
  }

  return (
    <Modal size="lg" isOpen={props.open} toggle={toggle} >
      <ModalHeader toggle={toggle}>
        <p className="h3 m-0"><b>Quien lo ha visto</b></p>
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
          <Col md="10" xs="12" className="mx-auto">

            <div style={{ maxHeight: "65vh", minHeight: "65vh" }} className="table-responsive"> 
              <table className="table table-hover">
                <thead className="bg-primary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Fecha de recivido</th>
                  </tr>
                </thead>
                <tbody>

                  {props.vistos.map((contacto, indx) => {
                    return (
                      <tr key={indx} >
                        <th scope="row">{(indx +1)}</th>
                        <td >{contacto.id_contacto.nombre}</td>
                        <td>{contacto.id_contacto.correo}</td>
                        <td>{acomodarFecha(contacto.fecha_visto)}</td>
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

export default ModalRecividos;