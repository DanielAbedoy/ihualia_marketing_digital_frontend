import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Input } from 'reactstrap';

import ModelEmail from '../../../../models/EmailMarketing';
import EmailMarketing from '../../../../models/EmailMarketing';

const ModalLinks = props => {

  const [contactos, setContactos] = useState([]);
  const toggle = () => props.event_toggle(!props.open);

  const getVistos = e => {
    e.preventDefault();
    if (e.target.value === "none") { setContactos([]); return; }
    let link = props.links.find(l => l.id == e.target.value);
    setContactos(link.vistos)
  }

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

        {props.links.length === 0 ?
          <Row>
            <Col md="8" xs="12" className="mx-auto text-center mt-3"><p className="h5"><b>No agregaste links en tu boletin </b></p></Col>
          </Row>
          :
          <>
            <Row className="mb-3">
              <Col md="9" xs="12" className="mx-auto">
                <span className="h5"><b>Links:</b></span>
                <Input type="select" color="primary"
                  onChange={getVistos}
                >
                  <option value="none" >Selecciona el link...</option>
                  {props.links.map((link, indx) => {
                    return (
                      <option value={link.id} key={indx}>{link.link}</option>
                    );
                  })}
                </Input>
              </Col>
            </Row>
            <br />
            {contactos.length === 0 ?
              <Row>
                <Col md="8" xs="12" className="mx-auto text-center mt-3"><p className="h5"><b>No hay datospara mostrar</b></p></Col>
              </Row>
              :
              <Row>
                <Col md="10" xs="12" className="mx-auto">

                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="bg-primary">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Correo</th>
                          <th scope="col">Fecha de visto</th>
                        </tr>
                      </thead>
                      <tbody>

                        {contactos.map((c, indx) => {
                          let datos = JSON.parse(c);
                          let datosC = JSON.parse(datos.contacto);
                          return (
                            <tr key={indx} >
                              <th scope="row">{(indx + 1)}</th>
                              <td >{datosC.nombre}</td>
                              <td>{datosC.correo}</td>
                              <td>{acomodarFecha(datos.fecha)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                </Col>
              </Row>
            }
          </>
        }
      </ModalBody>
    </Modal>
  );
}

export default ModalLinks;