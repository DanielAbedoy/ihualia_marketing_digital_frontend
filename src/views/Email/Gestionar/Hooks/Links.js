import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Input } from 'reactstrap';

import ModelEmail from '../../../../models/EmailMarketing';
import EmailMarketing from '../../../../models/EmailMarketing';

const ModalLinks = props => {

  const [contactos, setContactos] = useState([]);
  const toggle = () => props.event_toggle(!props.open);

  const getVistos = e => {
    e.preventDefault();
    const id = props.links.find(link => link.link == e.target.value).id;
    console.log(id);
    new EmailMarketing().get_seenLinks(id)
      .then(contactos => {
        if (contactos !== "error") {
          setContactos(contactos)
        }
      })
  }

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
          <Col md="9" xs="12" className="mx-auto">
            <span className="h5"><b>Links:</b></span>
            <Input type="select" color="primary"
              onChange={getVistos}
            >
              {props.links.map((link, indx) => {
                return (
                  <option key={indx}>{link.link}</option>
                );
              })}
            </Input>
          </Col>
        </Row>

        <br />

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

                  {contactos.map((contacto, indx) => {
                    return (
                      <tr key={indx}>
                        <th scope="row">{(indx+1)}</th>
                        <td >{contacto.id_contacto.nombre}</td>
                        <td>{contacto.id_contacto.correo}</td>
                        <td>{acomodarFecha(contacto.fecha_visto)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </Col>
        </Row>


      </ModalBody>
    </Modal>
  );
}

export default ModalLinks;