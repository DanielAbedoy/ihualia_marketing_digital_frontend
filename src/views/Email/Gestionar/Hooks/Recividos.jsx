import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Input } from 'reactstrap';

const ModalRecividos = props => {

  const toggle = () => props.event_toggle(!props.open);

  const acomodarFecha = (fecha_lg) => {
    const date = fecha_lg.split(" ");
    const time = date[1].split(".");
    return `${date[0]} ${time[0]}`;
  }

  return (
    <Modal size="lg" isOpen={props.open} toggle={toggle} >
      <ModalHeader toggle={toggle}>
        <p className="h3 m-0"><b>Quien lo ha visto</b></p>
      </ModalHeader>
      <ModalBody>

        {props.vistos.length === 0 ?
          <Row>
            <Col md="8" xs="12" className="mx-auto text-center mt-3"><p className="h5"><b>No hay datos para mostrar</b></p></Col>
          </Row>
          :
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
                      const datosC = JSON.parse(contacto.contacto);
                      return (
                        <tr key={indx} >
                          <th scope="row">{(indx + 1)}</th>
                          <td >{datosC.nombre}</td>
                          <td>{datosC.correo}</td>
                          <td>{acomodarFecha(contacto.fecha)}</td>
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

export default ModalRecividos;