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

  const getCampos = () => {
    let c = [...headers.slice(),...props.grupo.campos_extra];
    let h = [];
    c.forEach(campo => h.push({ label: campo.toUpperCase(), key: campo.toLowerCase() }))
    setHeaders(h);
  }

  const getContactos = async () => {
    const contactos = await new ModelContactos().getContactosDelGrupo(props.grupo.id);
    setData(contactos);
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
                filename={`Contactos_Grupo_${props.grupo.nombre}.csv`}
                className="btn btn-block mt-4 text-white"
                style={{height:"40px",backgroundColor:"rgba(44,96,186,0.95)"}}
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
