import React from 'react';
import { Col, Row, CustomInput } from 'reactstrap';

const SetAccionComponent = props => {

  const darAccion = (value) => {
    props.setAccion(value);
  }

  return (
    <Row>
      <Col md="8" xs="12" className="mx-auto">
        <p className="h4 mb-3"><b>② Seleccionala acción</b></p>
        <Row>
          <Col md="6" xs="12" className="mx-auto">
            <CustomInput
              onClick={()=> darAccion("Importar")}
              id="exampleCustomSwitch" type="radio" name="rb_accion" label="Importar" />
          </Col>
          <Col md="6" xs="12" className="mx-auto">
            <CustomInput
              onClick={()=> darAccion("Exportar")}
              id="exampleCustomSwitch1" type="radio" name="rb_accion" label="Exportar" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SetAccionComponent;