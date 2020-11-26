import React, { useState, useEffect } from 'react';
import { Col, Row, CustomInput, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import ModeloContactos from '../../../../models/Contactos';

import Enviar from './Enviar';

const Grupos = ({ boletin, setBoletin, plantilla, history }) => {

  const [grupos, setGrupos] = useState([]);
  const { addToast } = useToasts();
  const [gruposSelec, setGruposSelec] = useState([]);

  useEffect(() => {
    get_grupos();
  }, [])



  const get_grupos = async () => {
    const grupos_ = await new ModeloContactos().getContactosGruposCuenta(require('store').get('cuenta_en_uso').id);
    setGrupos(grupos_)
  }

  const setGruposSeleccionados = () => {

    const grupos_seleccionados = [];
    grupos.forEach(grupo => {
      if (document.getElementById(`switch-grupo${grupo.id}`).checked) grupos_seleccionados.push(grupo);
    });

    setGruposSelec([...grupos_seleccionados]);
  }



  return (
    <>
      {plantilla !== '' ?
        <Col md="12">
          <Row>
            <Col md="7" xs="12" className="mx-auto">
              <span className="h5">Grupos</span>
            </Col>

            <Col md="7" xs="12" className="mx-auto">
              <Row>
                {grupos.map((grupo, indx) => {
                  return (
                    <Col key={indx} md="12" xs="12" className="my-2 p-2 rounded bg-info text-white h5" style={{ boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.75)" }} >
                      <CustomInput onChange={e => { setGruposSeleccionados() }} type="switch" id={`switch-grupo${grupo.id}`} label={`${grupo.nombre}`} />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
          {gruposSelec.length !== 0 ?
            <Enviar
              boletin={boletin}
              grupos={gruposSelec}
              history={history}
            />
            : <></>
          }
        </Col>
        :
        <></>
      }
    </>

  );
}

export default Grupos;