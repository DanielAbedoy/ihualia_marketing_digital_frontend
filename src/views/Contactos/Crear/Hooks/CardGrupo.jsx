import React, { useState } from 'react';
import { Button, Row, Col, Card, CardBody, CardHeader, Collapse } from 'reactstrap'
import Badge from '@material-ui/core/Badge';

import AddContacto from './AddContacto.jsx';
import UpdateGrupo from './UpdateGrupo.jsx';

import ModelContactos from '../../../../models/Contactos';

const GrupoComponent = (props) => {
  const { grupo, indx} = props;
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const deleteGrupo =async () => {
    if (window.confirm("Seguro que quires eliminar el grupo")) {
      const r = await new ModelContactos().remove_grupo(grupo.id);
      if (r === "No Content") alert("Eliminado correctamente");
      else alert("Algo salio mal")
    }
  }

  return (

<Col md={openAdd || openUpdate ? "8" : "6"} xs="12" className="mx-auto" style={openAdd || openUpdate ? { transition:"0.5s ease"} : {transition:"0.5s ease"}}>
    {/* <Col  md={openAdd || openUpdate ? "8" : "6"} xs="12" className="mx-auto" style={openAdd || openUpdate ? { transition: "width 10s" } : {}}> */}
      {/* <Col key={indx} md="6" xs="12" className="mx-auto"> */}
      <Card style={openAdd || openUpdate ? { boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)" } : {}}>
        <CardHeader className="bg-primary">
          <span className="h5"><b>{grupo.nombre}</b></span>
          {openAdd || openUpdate ?
            <Badge className="ml-auto float-right" color="secondary" overlap="circular" badgeContent="X"
              style={{ cursor: "pointer" }} onClick={() => { setOpenAdd(false); setOpenUpdate(false)}}
            ></Badge>
            :
            <></>
          }

        </CardHeader>
        <CardBody>

          <Row>
            <Col md="12">
              <span className="h5"><b>ID: </b> <span className="text-muted">{grupo.id}</span></span><br />
              <span className="h5"><b>Nombre: </b> <span className="text-muted">{grupo.nombre}</span></span>
              <Row className="mt-3">
                <Col md="2" xs="4" className="ml-auto">
                  <span className="h4 bg-success d-block rounded text-white text-center"
                    style={{ cursor: "pointer",boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)" }}
                    onClick={() => setOpenAdd(!openAdd)}
                  ><b><i className="fa fa-user-plus"></i>  </b></span>
                </Col>
                <Col md="2" xs="4" >
                  <span className="h4 bg-info d-block rounded text-white text-center"
                    style={{ cursor: "pointer",boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)" }}
                    onClick={() => setOpenUpdate(!openUpdate)}
                  ><b><i className="fa fa-pencil"></i>  </b></span>
                </Col>
                <Col md="2" xs="4">
                  <span className="h4 bg-danger d-block rounded text-white text-center"
                    style={{ cursor: "pointer", boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)" }}
                    onClick={deleteGrupo}
                  ><b><i className="fa fa-trash"></i>  </b></span>
                </Col>
              </Row>

            </Col>
          </Row>

          <Collapse isOpen={openAdd}>
            <AddContacto
              id_grupo={grupo.id}
              campos_extra={grupo.campos_extra}
            />

          </Collapse>
          <Collapse isOpen={openUpdate}>
            <UpdateGrupo
              id_grupo={grupo.id}
            />
          </Collapse>
        </CardBody>
      </Card>
    </Col>
  );
}

export default GrupoComponent;