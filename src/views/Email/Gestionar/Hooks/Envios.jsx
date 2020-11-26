import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Input } from 'reactstrap';
import ModelEmail from '../../../../models/EmailMarketing';

const ModalEnvios = props => {

  const toggle = () => props.event_toggle(!props.open);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.contactos.length === 0) return;
    let c = [];
    props.enviados.forEach(e => c.push(props.contactos.find(c => c.id == e)));
    setData([...c]);
  }, [props.contactos, props.enviados])


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
                    {data.map((contacto, indx) => {
                      return (
                        <tr key={indx}>
                          <th scope="row">{(indx + 1)}</th>
                          <td >{contacto.nombre}</td>
                          <td>{contacto.correo}</td>
                          <td>{contacto.grupo}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td ><b>Total:</b></td>
                      <td><b>{data.length}</b></td>
                      <td></td>
                    </tr>
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