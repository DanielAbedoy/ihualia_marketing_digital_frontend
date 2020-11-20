import React from 'react';
import { Row, Col } from 'reactstrap';

import urls from '../../../../models/urls'

const Inicio = ({id ,nombre, presentacion, instrucciones, imagen, anonima, continuar}) => {
  
  return (
    <Row className="m-0 p-0" style={{overflow:"hidden", position:"relative", height:"100%"}}>
    
      <Col md="12" className="m-0 p-0"
        style={{
          height:"100%",
          position: "absolute",
          backgroundImage: `url("${new urls().supporserver()}/encuestas/getimg/?encuesta=${id}&imagen=${imagen}")`,
          backgroundSize:"cover", transform:"scale(1.4)", backgroundPosition:"center center", filter:"blur(8px)"
        }}
      >
      </Col>
      <Col md="10" xs="12" style={{height:"100%"}} className="mx-auto">
        <Row style={{ height: "100%" }}>
          <Col className="d-flex align-items-center justify-content-center">
            <div style={{width:"100%", backgroundColor:"white", boxShadow:"0px 5px 10px -1px rgba(0,0,0,0.75)" }} className="p-0 my-3" >
              <Row className="m-0 p-0" style={{height:"100%"}}>
                <Col md="5" xs="12" className="m-0 p-0">
                  <img width="100%" height="100%" src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${id}&imagen=${imagen}`} alt="imagen-principal"/>
                </Col>
                <Col md="7" xs="12" style={{ height: "100%" }} className="p-3 d-flex flex-column">
                  <p className="h1"><b>{nombre}</b></p>
                  <p className="h5">{presentacion}</p>
                  <p className="text-muted"><b>{instrucciones}</b></p>
                  {anonima ?
                    <p className="text-right"><i>La encuesta es totalmente anónima.</i></p>
                    :
                    <></>
                  }
                  <div onClick={()=>continuar()} style={{width:"50%"}} className="mx-auto btn-h bg-h-success text-white align-self-end">
                    <b>Comenzar</b>
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

export default Inicio;