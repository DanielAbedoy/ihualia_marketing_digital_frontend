import React from 'react';
import { Row, Col } from 'reactstrap';

const InfoCard = ({ color, title, description, button, fn }) => {

  return (
    <Row style={{ height: "100%" }} className="p-3">
      <Col style={{
        boxShadow: "0px 0px 25px -7px rgba(0,0,0,0.75)", borderRadius: "10px",
        background: `linear-gradient(174deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 80%, rgba(91,191,233,1) 82%, ${color || "rgba(43,180,226,1)"} 100%)`,
        minHeight: "100%"
      }}>
        <Row>
          <Col md="12" className="mt-4">
            <p className="text-center text-primary h2 m-0">
              {title}
            </p>

          </Col>
        </Row>
        {/* Icono */}
        <hr />
        {/* Title */}
        <Row>
          <Col md="12" className="mt-4">
            <p className="text-center h5 text-muted m-0">
              <i>{description}</i>
            </p>
          </Col>
        </Row>
        {/* Descripcion */}
        {/* Un enlace */}

        {button ?
          <>
            <br /><br />
            <Row className="align-self-end mb-4">
              <Col md="12" className="mt-4">
                <p onClick={fn}
                  style={{
                    cursor: "pointer",
                    //backgroundColor: `${color || "rgba(43,180,256,1)"}`
                    backgroundColor: color ? "rgba(43,180,256,1)" : "#21f077d9"
                  }}
                  className="text-white p-2 shadow-lg h3 rounded-pill text-center "
                ><b>{button}</b></p>

              </Col>
            </Row>
          </>
          : <></>
        }


      </Col>
    </Row>
  );
}

export default InfoCard;