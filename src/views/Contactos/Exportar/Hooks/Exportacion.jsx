import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { CSVLink } from 'react-csv';
import ModelContactos from '../../../../models/Contactos';

const ExportacionComponent = props => {

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState(["id", "nombre", "correo"]);

  useEffect(() => {
    getCampos();
    getContactos();
  }, [])

  const getCampos = async () => {
    const _campos = await new ModelContactos().getCamposGrupo(props.id_grupo);
    let c = headers.slice();
    _campos.forEach(campo => { c.push(campo.campo_extra.toLowerCase()) });

    let h = [];
    c.forEach(campo => {
      h.push({ label: campo.toUpperCase(), key: campo.toLowerCase() })
    })
    setHeaders(h);
  }

  const getContactos = async () => {
    const contactos = await new ModelContactos().getContactosDelGrupo(props.id_grupo);
    
    let d = [];
    contactos.forEach(contacto => {
      let obj = { id: contacto.contacto.id, nombre: contacto.contacto.nombre, correo: contacto.contacto.correo };
      contacto.contacto.campos_extra.forEach(c_e => {
        const campo_valor = JSON.parse(c_e);
        obj = { ...obj, [`${campo_valor["campo"]}`]: campo_valor["valor"] }
      })
      d.push(obj);
    })
    setData(d);
  }




  return (
    <Row>
      <Col md="8" xs="12" className="mx-auto">
        <p className="h4"><b>③ Exportar contactos</b></p>
        <p className="h5">Se descargara un documento .CSV que continene {data.length} contactos</p>

        <Row>
          <Col md="5" xs="8" className="mx-auto">


            {data.length > 0 ?
              <CSVLink
                data={data}
                headers={headers}
                filename={`Contactos_Grupo_Clave_${props.id_grupo}.csv`}
                className="btn btn-primary btn-block mt-4"
                style={{height:"40px"}}
              >
                Descargar
                </CSVLink>
              :
              <></>}

          </Col>
        </Row>

      </Col>
    </Row>
  );
}

export default ExportacionComponent;
