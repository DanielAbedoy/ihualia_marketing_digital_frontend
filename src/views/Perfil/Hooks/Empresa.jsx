import React, {useState, useEffect,useContext} from 'react';
import { Row, Col } from 'reactstrap';

import ModelMarketing from '../../../models/Marketing';
import { SessionContext } from '../../../sessionContext';

const Empresa = ({}) => {
  
  const context = useContext(SessionContext)
  const [info, setInfo] = useState({ razon_social: "", dominio: "", direccion: "", telefono: "", giro: "", id: "" });

  useEffect(() => {
    new ModelMarketing().get_empresa(context.cliente)
      .then(info => setInfo({ ...info }))
  },[])

  return (
    <Row className="mt-4">
      <Col md="12">
        <p className="h4 mb-4"><b>Mi Empresa</b></p>

        <Row className="mx-0 my-4 p-0">

          <Col md="9" xl="7" xs="12" className="rounded mx-auto p-2 shadow-h-hov">

            <Row className="m-0 p-0">
              <div className="mx-3 p-5 rounded-circle shadow"></div>
              <div className="d-flex flex-column">
                <p className="h6 mt-auto mb-0"><b>{info.razon_social}</b></p>
                <p className="mb-0"><b>{info.dominio}</b></p>
              </div>
            </Row>
            <Row className="my-2 border mx-0 p-0"></Row>
            <Row className="px-4 py-3 flex-column">

              <p className="m-0">{info.direccion}</p>
              <p className="m-0">{info.giro}</p>
              <p className="m-0">{info.telefono}</p>

            </Row>
            
          </Col>
          
        </Row>
        
      </Col>
    </Row>
  );
}

export default Empresa;