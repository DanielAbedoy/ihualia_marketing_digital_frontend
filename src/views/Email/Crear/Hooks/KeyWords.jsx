import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ModelContactos from '../../../../models/Contactos';

import globals from '../../../../variables/global';

const KeyWords = (props) => {

  
  const [words, setWords] = useState([]);
  const toggle = () => props.setOpen(!props.open);

  useEffect(() => {
    
    new ModelContactos().getGrupos(require('store').get('cuenta_en_uso').id)
      .then(grupos => {
        let aux = [];
        grupos.forEach(g => {
          g.campos_extra.forEach(c => aux.push({ key: "{{{" +c+"}}}", description:`Esta key le pertenence al grupo #${g.id} - "${g.nombre}"`}))
        });
        setWords([...new globals().key_words_boletin(), ...aux]);
      })
  },[])

  return (
    <Modal size="lg" isOpen={props.open} toggle={toggle} >
      <ModalHeader toggle={toggle}>
        <span className="h3"><b>KewWords</b></span><br />
        <span className="text-muted"><b>Palabras clave que puedes incluir en tus boletines</b></span>
      </ModalHeader>
      <ModalBody>

        <Row>
          <Col >
            <p className="h5"><b>Listado de palabras</b></p>
          </Col>
        </Row>
        <Row>
          <Col md="10" xs="12" className="mx-auto">
            <div className={"table-responsive table-bordered table-hover"} style={{maxHeight:"50vh"}} >
              <table className="table text-center">
                <thead>
                  <tr className="bg-primary">
                    <th>Key</th>
                    <th>Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                  {words.map((w, i) => {
                    return (
                      <tr key={i}>
                        <td><b >{w.key}</b></td>
                        <td>{w.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
       <br />
        <Row>
          <Col>
            <p className="h5 mb-3"><b>Ejemplo de uso:</b></p>
          </Col>
        </Row>
        <Row>
          <Col md="10" xs="12" className="mx-auto">
            <p className="" >
              <b>En redacción:</b><br />
              Hola {'{{{remitente}}}'}, es un gusto saludarle....<br/>
              Siendo hoy {'{{{fecha}}}'} le informo que .....
            </p>
            <p className="my-2 border-top"></p>
            <p>
            <b>Enviado:</b><br />
              Hola Luis Gómez Martínez, es un gusto saludarle....<br/>
              Siendo hoy 7/09/1999 le informo que .....
            </p>
          </Col>
        </Row>

      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Continuar</Button>{' '}
      </ModalFooter>
    </Modal>
  );
}


export default KeyWords;