import React from 'react';
import { Row, Col } from 'reactstrap';

import urls from '../../../../models/urls'

const Despedida = ({imagen, ir, mensage, encuesta}) => {
  

  return (
    <Row className="m-0 p-0" style={{overflow:"hidden", position:"relative", height:"100%"}}>
    
      <Col md="12" className="m-0 p-0"
        style={{
          height:"100%",
          position: "absolute",
          backgroundImage: `url("${new urls().supporserver()}/encuestas/getimg/?encuesta=${encuesta}&imagen=${imagen}")`,
          backgroundSize:"cover", transform:"scale(1.4)", backgroundPosition:"center center", filter:"blur(8px)"
        }}
      >
      </Col>
      <Col md="6" xs="11" style={{height:"100%"}} className="mx-auto">
        <Row style={{ height: "100%" }}>
          <Col className="d-flex align-items-center justify-content-center">
            <div style={{width:"100%", backgroundColor:"white", boxShadow:"0px 5px 10px -1px rgba(0,0,0,0.75)" }} className="p-0 my-3" >
              <Row className="m-0 p-0" style={{height:"100%"}}>
                <Col md="12" style={{ height: "100%" }} className="p-4 d-flex flex-column mx-auto">
                  <p className="h2 "><b>Éxito !!!</b></p>
                  <p className="h5 text-center"><b>{mensage}</b></p>
                  <div onClick={()=>ir()} style={{width:"50%"}} className="mx-auto my-4 btn-h bg-h-success text-white align-self-end">
                    <b>Salir</b>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
      
    </Row>
  );
}

export default Despedida;