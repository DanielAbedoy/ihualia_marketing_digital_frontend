import React, { useState } from 'react';
import { render } from 'react-dom';
import { Row, Col, Card, CardHeader, CardBody, Input, Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { useToasts } from 'react-toast-notifications';

import ModelContactos from '../../../../models/Contactos';

const UpdateGrupo = props => {

  const [nombreGrupo, setNombreGrupo] = useState('');
  const [nuevoCampo, setNuevoCampo] = useState('');
  const { addToast } = useToasts();

  const  actualizarNombreGrupo = async (e) => {
    e.preventDefault();
    if (nombreGrupo === '') {
      addToast("Debes agregar el nombre", { appearance: "info", autoDismiss: true });
      return;
    }

    const resp = await new ModelContactos().cambiar_nombre_grupo(props.id_grupo, nombreGrupo);
      
    if (resp !== "error") {
      addToast("Actualizado correctamente", { appearance: "success", autoDismiss: true });
      setNombreGrupo("");
      props.reload();
    } else {
      addToast("Algo ocurrio mal", { appearance: "error", autoDismiss: true });
    }

  }

  const agregarNuevoCampo = async e => {
    e.preventDefault();
    if (nuevoCampo === '') {
      addToast("Debes agregar el nombre", { appearance: "info", autoDismiss: true });
      return;
    }
    //Agregar el campo a "campo-extra" si existe el campo saltar
    const resp = await new ModelContactos().add_campo_extra(nuevoCampo.toLocaleLowerCase(), props.id_grupo);
    if (resp === "OK") {
      addToast("Agregado correctamente", { appearance: "success", autoDismiss: true });
      setNuevoCampo("");
      props.reload();
    }
  }


  return (
    <Row>
      <Col md="12" className="border border-dark my-2"></Col>
      <Col md="12">
        <p className="h5"><b>● Actulizar Grupo</b></p>
        <Row className="mt-2">
          <Col md="10" xs="12" className="mx-auto">
            <TextField
              value={nombreGrupo}
              onChange={e => setNombreGrupo(e.target.value)}
              size="small" className="my-2" style={{ width: "100%" }} label="Nuevo nombre" />
          </Col>
          <Col md="2" xs="4" className="mx-auto pt-2">
            <Button 
              onClick={actualizarNombreGrupo} color="primary"
              className="mt-auto" outline block> <i className="fa fa-pencil"></i></Button>
          </Col>
        </Row>
      </Col>

      <Col md="12" className="border border-dark my-2"></Col>

      <Col md="12">
        <p className="h5"><b>● Agregar nuevo campo de información</b></p>

        <Row className="mt-2">
          <Col md="10" xs="12" className="mx-auto">
            <TextField
              value={nuevoCampo}
              onChange={e => setNuevoCampo(e.target.value)}
              size="small" className="my-2" style={{ width: "100%" }} label="Nombre del campo" />
          </Col>
          <Col md="2" xs="4" className="mx-auto pt-2">
            <Button 
              onClick={agregarNuevoCampo} 
              color="primary" className="mt-auto" outline block> <i className="fa fa-plus"></i></Button>
          </Col>
        </Row>


      </Col>
    </Row>
  );

}

export default UpdateGrupo;