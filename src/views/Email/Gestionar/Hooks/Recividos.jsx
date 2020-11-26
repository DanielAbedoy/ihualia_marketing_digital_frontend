import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Input } from 'reactstrap';

const ModalRecividos = props => {

  const toggle = () => props.event_toggle(!props.open);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.contactos.length === 0) return;
    let c = [];
    props.vistos.forEach(e => c.push({ ...props.contactos.find(c => c.id == e.id_contacto), fecha_visto: e.fecha_visto }));
    setData([...c]);
  }, [props.contactos, props.vistos])

  const acomodarFecha = (fecha_lg) => {
    const date = fecha_lg.split("T");
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

                    {data.map((contacto, indx) => {
                      return (
                        <tr key={indx} >
                          <th scope="row">{(indx + 1)}</th>
                          <td >{contacto.nombre}</td>
                          <td>{contacto.correo}</td>
                          <td>{acomodarFecha(contacto.fecha_visto)}</td>
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

export default ModalRecividos;