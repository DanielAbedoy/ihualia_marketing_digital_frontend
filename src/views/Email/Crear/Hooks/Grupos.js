import React, { useState, useEffect } from 'react';
import { Col, Input, Row, FormGroup, CustomInput, Button } from 'reactstrap';

import ModeloContactos from '../../../../models/Contactos'
import { element } from 'prop-types';

const Grupos = props => {

  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    get_grupos();
  },[])



  const get_grupos = () => {
    new ModeloContactos().getGrupos(require('store').get('cuenta_en_uso').id)
      .then(grupos => {
        if (grupos) setGrupos(grupos);
      })
  }

  const setGruposSeleccionados = () => {

    const grupos_seleccionados = [];
    grupos.forEach(grupo => {
      if (document.getElementById(`switch-grupo${grupo.id}`).checked) grupos_seleccionados.push(grupo);
    });
    props.event_setGrupos(grupos_seleccionados)
  }


  return (
    <>
      {props.plantilla !== '' ?
        <Col md="12">
          <Row>
            <Col md="7" xs="12" className="mx-auto">
              <span className="h5">Grupos</span>
            </Col>

            <Col md="7" xs="12" className="mx-auto">
              <Row>
                {grupos.map((grupo, indx) => {
                  return (
                    <Col key={indx} md="6" xs="9" className="my-3">
                      <CustomInput onChange={e=>{setGruposSeleccionados()}} type="switch" id={`switch-grupo${grupo.id}`} label={`${grupo.nombre}`} />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Col>
        :
        <></>
      }
    </>

  );
}

export default Grupos;