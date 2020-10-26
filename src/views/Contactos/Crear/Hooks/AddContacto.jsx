import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';

import TextField from '@material-ui/core/TextField'

import ModelContactos from '../../../../models/Contactos';

const AddContacto = props => {

  const [campos, setCampos] = useState([]);
  const [nuevoContacto, setNuevoContacto] = useState({});
  useEffect(() => {
    getCampos();
  }, [])



  const getCampos = () => {
    const { id_grupo } = props;
    const campos = ["id", "nombre", "correo"];
    new ModelContactos().getCamposGrupo(id_grupo)
      .then(campos_api => {
        campos_api.forEach(campo => {
          campos.push(campo.campo_extra);
        });
        setCampos(campos);
      })
  }


  const validacionNuevoContacto = () => {
    
    let f = false;
    campos.forEach((campo, i) => {
      if (i !== 0) {
        if (nuevoContacto[`${campo.toLowerCase()}`]) {
          if (nuevoContacto[`${campo.toLowerCase()}`] === '') f = true;
        } else f = true;
      }
    })
    if (f) {
      alert("Debe agrgar todos los campo");
      return undefined;
    }
    return true;
  }

  const crearNuevoContacto = e => {
    e.preventDefault();

    if (validacionNuevoContacto()) {
      const data_prin = { nombre: nuevoContacto.nombre, correo: nuevoContacto.correo };
      let campos_extra = [];

      for (let i = 3; i < campos.length; i++) {
        campos_extra.push({ nombre: campos[i], valor: nuevoContacto[`${campos[i]}`] });
      }

      new ModelContactos().crearNuevoContacto(props.id_grupo,data_prin,campos_extra) 
        .then(response => {
          if (response === "OK") {
            alert("Creado correctamente");
            
            //Limpiar campos
            limpiarCampos();
          }
        })
    }
  }

  const limpiarCampos = () => {
    setNuevoContacto({})
  }

  return (
    <Row>
      <Col md="12" className="border border-dark my-2"></Col>
      <Col md="12">
        <p className="h5"><b>● Nuevo contacto</b></p>

        <Row>
          {campos.map((campo, i) => {
            if (i === 0) return;
            return (
              <Col key={i} md="10" xs="12" className="mx-auto">
                <TextField
                  id={`txt-${campo}`}
                  value={nuevoContacto[`${campo}`] || ""}
                  onChange={e => setNuevoContacto({ ...nuevoContacto, [`${campo}`]: e.target.value })}
                  size="small" className="my-2" style={{ width: "100%" }} label={campo.toUpperCase()} />
              </Col>
            );
          })}
        </Row>
        <Row className="mt-2">
          <Col md="6" xs="12" className="mx-auto">
            <Button
              onClick={crearNuevoContacto}
              outline color="success" block> Agregar Contacto </Button>
          </Col>
        </Row>


      </Col>
    </Row>
  );

}

export default AddContacto;