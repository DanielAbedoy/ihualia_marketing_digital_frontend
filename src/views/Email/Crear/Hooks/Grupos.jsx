import React, { useState, useEffect } from 'react';
import { Col,  Row,  CustomInput } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import ModeloContactos from '../../../../models/Contactos';

const Grupos = props => {

  const [grupos, setGrupos] = useState([]);
  const { addToast } = useToasts();

  useEffect(() => {
    get_grupos();
  },[])



  const get_grupos = () => {
    new ModeloContactos().getGrupos(require('store').get('cuenta_en_uso').id)
      .then(gruposR => {
        if (gruposR) {
          //grupos.forEach(grupo => { grupos_ids.push(grupo.id); str_grupos_ids += `${grupo.id},` });    
          gruposR.map(grupo => {
            new ModeloContactos().getContactosDelGrupo(grupo.id)
              .then(contactos => {
                if (contactos) grupo.contactos = contactos;
                setGrupos(gruposR)
              })
          });
        };
      })
    
  }

  const setGruposSeleccionados = () => {

    const grupos_seleccionados = [];
    grupos.forEach(grupo => {
      if (document.getElementById(`switch-grupo${grupo.id}`).checked) grupos_seleccionados.push(grupo);
    });

    //validar
    if (!validar(grupos_seleccionados)) props.event_setGrupos([])
    else props.event_setGrupos(grupos_seleccionados);
    
  }

  const validar = (arr) => {
    if (arr.length === 0) {
      addToast("Debe agregar los grupos", { appearance: "info", autoDismiss: true });
      return false;
    }
    return true;
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
                    <Col key={indx} md="12" xs="12" className="my-2 p-2 rounded bg-info text-white h5" style={{boxShadow:"0px 0px 10px 1px rgba(0,0,0,0.75)"}} >
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