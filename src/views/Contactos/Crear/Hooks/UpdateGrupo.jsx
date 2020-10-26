import React, { useState } from 'react';
import { render } from 'react-dom';
import { Row, Col, Card, CardHeader, CardBody, Input, Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import alerts  from '../../../../components/Alerts';

import ModelContactos from '../../../../models/Contactos';

const UpdateGrupo = props => {

  const [nombreGrupo, setNombreGrupo] = useState('');
  const [nuevoCampo, setNuevoCampo] = useState('');


  const  actualizarNombreGrupo = async (e) => {
    e.preventDefault();
    if (nombreGrupo === '') {
      ///new alerts().error("Debe agregar un nombre", 2000)
      alert("Debej agregar el nuevo nombre")
      return;
    }

    const resp = await new ModelContactos().cambiar_nombre_grupo(props.id_grupo, nombreGrupo);
      
    if (resp !== "error") {
      alert("Actualizado");
    } else {
      alert("Error al cambiar nombre")
    }

  }

  const agregarNuevoCampo = async e => {
    e.preventDefault();
    if (nuevoCampo === '') {
      ///new alerts().error("Debe agregar un nombre", 2000)
      alert("Debej agregar el nombre del campo")
      return;
    }
    //Agregar el campo a "campo-extra" si existe el campo saltar
    await new ModelContactos().add_campo_extra(nuevoCampo.toLocaleLowerCase());

    //Relacionar el campo con el grupo
    const relacion_resp = await new ModelContactos().add_campo_grupo(nuevoCampo.toLocaleLowerCase(), props.id_grupo)
    if (relacion_resp === "Created") {
      //Relacionar el campo con el contacto y dar valor de "-" (TODOS LOS CONTACTOS DEL GRUPO)
      const contactos = await new ModelContactos().getContactosDelGrupo(props.id_grupo);

      contactos.forEach((contacto,i) => {
        new ModelContactos().set_valor_campo_contacto(nuevoCampo.toLocaleLowerCase(), contacto.contacto.id,"-");
        if (i + 1 === contactos.length) alert("Campo agregado");
      });

    } else {
      alert("Error al agregar el campo");
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